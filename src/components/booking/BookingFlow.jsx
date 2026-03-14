import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollWindowTo(top) {
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

function scrollNodeToTop(node, offset = 12) {
  if (!node) return
  const top = Math.max(window.scrollY + node.getBoundingClientRect().top - offset, 0)
  scrollWindowTo(top)
}

function scrollNodeIntoView(node, block = 'start') {
  if (!node) return
  node.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block,
  })
}

function addDays(offset) {
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() + offset)
  return date
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Vul je naam in.'
      return null
    case 'email':
      if (!value.trim()) return 'Vul je e-mailadres in.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Gebruik een geldig e-mailadres.'
      return null
    case 'phone':
      if (!value.trim()) return 'Vul je telefoonnummer in.'
      if (value.replace(/[^\d+]/g, '').length < 8) return 'Gebruik een geldig telefoonnummer.'
      return null
    default:
      return null
  }
}

export function BookingFlow({ brand, bookingFlow }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [dayId, setDayId] = useState('')
  const [slotId, setSlotId] = useState('')
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    note: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const shellRef = useRef(null)
  const slotSectionRef = useRef(null)
  const firstInputRef = useRef(null)
  const slotScrollTimerRef = useRef(null)
  const focusTimerRef = useRef(null)

  const days = bookingFlow.days.map((day) => {
    const date = addDays(day.offset)
    return {
      ...day,
      date,
      shortWeekday: new Intl.DateTimeFormat('nl-NL', {
        weekday: 'short',
      }).format(date),
      shortDate: new Intl.DateTimeFormat('nl-NL', {
        day: 'numeric',
        month: 'short',
      }).format(date),
      fullDate: new Intl.DateTimeFormat('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(date),
    }
  })

  const selectedDay = days.find((day) => day.id === dayId)
  const selectedSlot = selectedDay?.slots.find((slot) => slot.id === slotId)
  const selectedGoal = bookingFlow.details.goalOptions.find(
    (goal) => goal.id === details.goal,
  )
  const isConfirmation = stepIndex === bookingFlow.steps.length - 1
  const activeStep = bookingFlow.steps[stepIndex]

  useEffect(() => {
    scrollNodeToTop(shellRef.current)

    if (stepIndex === 1 && firstInputRef.current) {
      focusTimerRef.current = window.setTimeout(() => {
        firstInputRef.current?.focus({ preventScroll: true })
      }, prefersReducedMotion() ? 0 : 260)
    }

    return () => {
      if (focusTimerRef.current) {
        window.clearTimeout(focusTimerRef.current)
      }
    }
  }, [stepIndex])

  useEffect(() => {
    return () => {
      if (slotScrollTimerRef.current) {
        window.clearTimeout(slotScrollTimerRef.current)
      }
      if (focusTimerRef.current) {
        window.clearTimeout(focusTimerRef.current)
      }
    }
  }, [])

  function updateDetails(field, value) {
    setDetails((current) => ({ ...current, [field]: value }))
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((current) => ({ ...current, [field]: error }))
    } else {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  function handleBlur(field) {
    setTouched((current) => ({ ...current, [field]: true }))
    const error = validateField(field, details[field])
    setErrors((current) => ({ ...current, [field]: error }))
  }

  function handleDaySelect(nextDayId) {
    setDayId(nextDayId)
    setSlotId('')

    if (slotScrollTimerRef.current) {
      window.clearTimeout(slotScrollTimerRef.current)
    }

    slotScrollTimerRef.current = window.setTimeout(() => {
      scrollNodeIntoView(slotSectionRef.current, 'start')
    }, prefersReducedMotion() ? 0 : 140)
  }

  function handleSlotSelect(nextSlotId) {
    setSlotId(nextSlotId)
    setStepIndex(1)
  }

  function validateDetails() {
    const nextErrors = {}

    const nameErr = validateField('name', details.name)
    if (nameErr) nextErrors.name = nameErr

    const emailErr = validateField('email', details.email)
    if (emailErr) nextErrors.email = emailErr

    const phoneErr = validateField('phone', details.phone)
    if (phoneErr) nextErrors.phone = phoneErr

    if (!details.goal) {
      nextErrors.goal = 'Kies waar je vooral hulp bij wilt.'
    }

    if (!details.consent) {
      nextErrors.consent = bookingFlow.details.consentError
    }

    setErrors(nextErrors)
    setTouched({ name: true, email: true, phone: true, goal: true, consent: true })
    return Object.keys(nextErrors).length === 0
  }

  function handleContinue() {
    if (stepIndex === 1) {
      if (!validateDetails()) return
      setStepIndex(2)
    }
  }

  function handleBack() {
    if (stepIndex === 0) return
    setStepIndex((current) => current - 1)
  }

  return (
    <main id="main-content" className="booking-page-shell">
      <section ref={shellRef} className="booking-shell section-card">
        <div className="booking-shell__header">
          <h1>{bookingFlow.headline}</h1>
          <ul className="trust-row" aria-label="Geruststelling">
            {bookingFlow.trustPills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <ProgressMeter steps={bookingFlow.steps} activeIndex={stepIndex} />

        <SelectionSummary
          labels={bookingFlow.summaryLabels}
          day={selectedDay ? capitalize(selectedDay.fullDate) : bookingFlow.summaryPlaceholders.day}
          time={selectedSlot?.label || bookingFlow.summaryPlaceholders.time}
          goal={selectedGoal?.title || bookingFlow.summaryPlaceholders.goal}
          stepIndex={stepIndex}
        />

        <div className="booking-shell__body">
          {stepIndex === 0 ? (
            <ScheduleStep
              bookingFlow={bookingFlow}
              days={days}
              dayId={dayId}
              slotId={slotId}
              selectedDay={selectedDay}
              onDaySelect={handleDaySelect}
              onSlotSelect={handleSlotSelect}
              slotSectionRef={slotSectionRef}
            />
          ) : null}

          {stepIndex === 1 ? (
            <DetailsStep
              bookingFlow={bookingFlow}
              details={details}
              errors={errors}
              touched={touched}
              updateDetails={updateDetails}
              onBlur={handleBlur}
              firstInputRef={firstInputRef}
            />
          ) : null}

          {isConfirmation ? (
            <ConfirmationStep
              brand={brand}
              bookingFlow={bookingFlow}
              day={selectedDay}
              slot={selectedSlot}
              name={details.name}
              goal={selectedGoal}
            />
          ) : null}
        </div>

        {stepIndex === 1 ? (
          <div className="booking-shell__actions">
            <button
              className="ghost-link booking-shell__action booking-shell__action--ghost"
              type="button"
              onClick={handleBack}
            >
              Terug
            </button>
            <button
              className="cta-button booking-shell__action"
              type="button"
              onClick={handleContinue}
            >
              {activeStep.cta}
            </button>
          </div>
        ) : null}
      </section>
    </main>
  )
}

function ProgressMeter({ steps, activeIndex }) {
  return (
    <ol className="booking-progress" aria-label="Boekingsstappen">
      {steps.map((step, index) => {
        const state =
          index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'upcoming'

        return (
          <li key={step.id} className={`booking-progress__step booking-progress__step--${state}`}>
            <span className="booking-progress__index">{index + 1}</span>
            <span className="booking-progress__label">{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}

function SelectionSummary({ labels, day, time, goal, stepIndex }) {
  return (
    <section className="booking-summary" data-step={stepIndex} aria-label="Huidige selectie">
      <div className="booking-summary__item">
        <span className="summary-panel__label">{labels.day}</span>
        <strong>{day}</strong>
      </div>
      <div className="booking-summary__item">
        <span className="summary-panel__label">{labels.time}</span>
        <strong>{time}</strong>
      </div>
      <div className="booking-summary__item">
        <span className="summary-panel__label">{labels.goal}</span>
        <strong>{goal}</strong>
      </div>
    </section>
  )
}

function ScheduleStep({
  bookingFlow,
  days,
  dayId,
  slotId,
  selectedDay,
  onDaySelect,
  onSlotSelect,
  slotSectionRef,
}) {
  return (
    <div className="booking-step-stack" data-step="schedule">
      <div className="booking-copy-block">
        <p className="eyebrow">STAP 1</p>
        <h2>{bookingFlow.schedule.title}</h2>
        <p className="section-intro">{bookingFlow.schedule.intro}</p>
      </div>

      <div className="booking-reassurance-row">
        {bookingFlow.schedule.reassurance.map((item) => (
          <span key={item} className="mini-note">
            {item}
          </span>
        ))}
      </div>

      <div className="day-grid">
        {days.map((day) => (
          <button
            key={day.id}
            className={`day-card${dayId === day.id ? ' day-card--selected' : ''}`}
            type="button"
            onClick={() => onDaySelect(day.id)}
            aria-pressed={dayId === day.id}
          >
            <span className="day-card__badge">{day.badge}</span>
            <strong>{capitalize(day.shortWeekday)}</strong>
            <span>{day.shortDate}</span>
            <small>{capitalize(day.fullDate)}</small>
          </button>
        ))}
      </div>

      <div ref={slotSectionRef} className="slot-stage slot-stage--compact">
        <div className="slot-stage__header">
          <p className="eyebrow">TIJDSLOT</p>
          <h3>
            {selectedDay
              ? `Beschikbaar op ${selectedDay.shortWeekday} ${selectedDay.shortDate}`
              : bookingFlow.schedule.emptySlotsTitle}
          </h3>
          <p className="support-line">{bookingFlow.schedule.slotHint}</p>
        </div>

        <div className="slot-grid">
          {(selectedDay?.slots ?? []).map((slot) => (
            <button
              key={slot.id}
              className={`slot-card slot-card--${slot.state}${
                slotId === slot.id ? ' slot-card--selected' : ''
              }`}
              type="button"
              data-state={slot.state}
              onClick={() => onSlotSelect(slot.id)}
              aria-pressed={slotId === slot.id}
            >
              <strong>{slot.label}</strong>
              <span className="slot-note">{slot.note}</span>
            </button>
          ))}
        </div>

        {selectedDay ? (
          <p className="auto-advance-hint">Kies een tijdslot om direct door te gaan</p>
        ) : null}
      </div>
    </div>
  )
}

function DetailsStep({ bookingFlow, details, errors, touched, updateDetails, onBlur, firstInputRef }) {
  function fieldClass(field) {
    if (!touched[field]) return ''
    return errors[field] ? ' field-invalid' : ' field-valid'
  }

  return (
    <div className="booking-step-stack">
      <div className="booking-copy-block">
        <p className="eyebrow">STAP 2</p>
        <h2>{bookingFlow.details.title}</h2>
        <p className="section-intro">{bookingFlow.details.intro}</p>
      </div>

      <div className="booking-reassurance-row">
        {bookingFlow.details.reassurance.map((item) => (
          <span key={item} className="mini-note">
            {item}
          </span>
        ))}
      </div>

      <div className="booking-form-grid">
        <label className="field-block">
          <span>{bookingFlow.details.nameLabel}</span>
          <input
            ref={firstInputRef}
            type="text"
            className={fieldClass('name')}
            value={details.name}
            onChange={(event) => updateDetails('name', event.target.value)}
            onBlur={() => onBlur('name')}
            autoComplete="name"
            placeholder="Bijvoorbeeld Patrick Weurding"
          />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}
        </label>

        <label className="field-block">
          <span>{bookingFlow.details.emailLabel}</span>
          <input
            type="email"
            className={fieldClass('email')}
            value={details.email}
            onChange={(event) => updateDetails('email', event.target.value)}
            onBlur={() => onBlur('email')}
            autoComplete="email"
            placeholder="jij@email.nl"
          />
          {errors.email ? <small className="field-error">{errors.email}</small> : null}
        </label>

        <label className="field-block">
          <span>{bookingFlow.details.phoneLabel}</span>
          <input
            type="tel"
            className={fieldClass('phone')}
            value={details.phone}
            onChange={(event) => updateDetails('phone', event.target.value)}
            onBlur={() => onBlur('phone')}
            autoComplete="tel"
            placeholder="06 12345678"
          />
          {errors.phone ? <small className="field-error">{errors.phone}</small> : null}
        </label>

        <div className="field-block">
          <span>{bookingFlow.details.goalLabel}</span>
          <div className="goal-chip-grid" role="group" aria-label={bookingFlow.details.goalLabel}>
            {bookingFlow.details.goalOptions.map((goal) => (
              <button
                key={goal.id}
                className={`goal-chip${details.goal === goal.id ? ' goal-chip--selected' : ''}`}
                type="button"
                onClick={() => updateDetails('goal', goal.id)}
                aria-pressed={details.goal === goal.id}
              >
                {goal.title}
              </button>
            ))}
          </div>
          {errors.goal ? <small className="field-error">{errors.goal}</small> : null}
        </div>

        <label className="field-block field-block--full">
          <span>{bookingFlow.details.noteLabel}</span>
          <textarea
            rows="4"
            value={details.note}
            onChange={(event) => updateDetails('note', event.target.value)}
            placeholder="Bijvoorbeeld: ik wil vet verliezen zonder mijn hele week om te gooien."
          />
        </label>

        <label className="consent-card field-block--full">
          <input
            type="checkbox"
            checked={details.consent}
            onChange={(event) => updateDetails('consent', event.target.checked)}
          />
          <span>{bookingFlow.details.consentLabel}</span>
        </label>
        {errors.consent ? <small className="field-error">{errors.consent}</small> : null}
      </div>
    </div>
  )
}

function ConfirmationStep({ brand, bookingFlow, day, slot, name, goal }) {
  return (
    <div className="booking-confirmation">
      <p className="eyebrow">{bookingFlow.confirmation.eyebrow}</p>
      <h2>{bookingFlow.confirmation.title}</h2>
      <p className="section-intro">{bookingFlow.confirmation.body}</p>

      <div className="confirmation-highlight">
        <div>
          <span className="summary-panel__label">{bookingFlow.summaryLabels.day}</span>
          <strong>{day ? capitalize(day.fullDate) : ''}</strong>
        </div>
        <div>
          <span className="summary-panel__label">{bookingFlow.summaryLabels.time}</span>
          <strong>{slot?.label}</strong>
        </div>
        <div>
          <span className="summary-panel__label">{bookingFlow.summaryLabels.goal}</span>
          <strong>{goal?.title}</strong>
        </div>
      </div>

      <div className="confirmation-highlight confirmation-highlight--secondary">
        <div>
          <span className="summary-panel__label">Naam</span>
          <strong>{name}</strong>
        </div>
        <div>
          <span className="summary-panel__label">Volgende stap</span>
          <strong>{bookingFlow.confirmation.nextStepLabel}</strong>
        </div>
        <div>
          <span className="summary-panel__label">Locatie</span>
          <strong>{brand.streetAddress}, {brand.location}</strong>
        </div>
      </div>

      <div className="confirmation-list">
        {bookingFlow.confirmation.nextSteps.map((item) => (
          <article key={item} className="info-card confirmation-list__item">
            <span className="icon-chip" aria-hidden="true">
              ✓
            </span>
            <p>{item}</p>
          </article>
        ))}
      </div>

      <div className="booking-confirmation__links">
        <a className="ghost-link" href={brand.phoneHref}>
          {bookingFlow.fallbackCallLabel}
        </a>
        <Link className="ghost-link" to="/">
          {bookingFlow.footerBackLabel}
        </Link>
      </div>
    </div>
  )
}
