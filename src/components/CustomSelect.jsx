import { useEffect, useId, useMemo, useRef, useState } from 'react'

function CustomSelect({ value, options, onChange, ariaLabel }) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const listboxId = useId()

  const selected = useMemo(() => {
    return options.find((option) => option.value === value) || options[0]
  }, [options, value])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const onTriggerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="custom-select" ref={rootRef}>
      <button
        type="button"
        className="custom-select-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <span>{selected?.label}</span>
        <span className="custom-select-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul className="custom-select-menu" role="listbox" id={listboxId}>
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`custom-select-option${isSelected ? ' is-selected' : ''}`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
