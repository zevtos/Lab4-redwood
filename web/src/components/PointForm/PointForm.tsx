import React, { useState } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'

interface PointFormProps {
  radius: number
  onRadiusChange: (radius: number) => void
  onSubmit: (data: { x: number; y: number; r: number }) => void
}

const CustomNumberInput = ({
  name,
  value,
  onChange,
  min,
  max,
  required = true,
}: {
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  min: number
  max: number
  required?: boolean
}) => {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '')
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Allow empty string, minus sign, and numbers within range
    if (newValue === '' || newValue === '-' || !isNaN(Number(newValue))) {
      setInputValue(newValue)
      setError('')

      if (newValue === '' || newValue === '-') {
        return
      }

      const numValue = Number(newValue)
      if (numValue < min || numValue > max) {
        setError(`Value must be between ${min} and ${max}`)
      } else if (onChange) {
        onChange(e)
      }
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        required={required}
        className="mt-1 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
      {error && (
        <p className="absolute left-0 mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

const PointForm = ({ radius, onRadiusChange, onSubmit }: PointFormProps) => {
  const [xValue, setXValue] = useState<string>('')
  const [yValue, setYValue] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {

    const x = Number(xValue)
    const y = Number(yValue)
    const r = Number(radius)

    if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
      onSubmit({ x, y, r })
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label
          name="x"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          X Coordinate (-5 to 5)
        </Label>
        <CustomNumberInput
          name="x"
          value={xValue}
          onChange={(e) => setXValue(e.target.value)}
          min={-5}
          max={5}
        />
      </div>

      <div className="space-y-1.5">
        <Label
          name="y"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Y Coordinate (-3 to 5)
        </Label>
        <CustomNumberInput
          name="y"
          value={yValue}
          onChange={(e) => setYValue(e.target.value)}
          min={-3}
          max={5}
        />
      </div>

      <div className="space-y-1.5">
        <Label
          name="r"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Radius (-5 to 5)
        </Label>
        <CustomNumberInput
          name="r"
          value={radius.toString()}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          min={-5}
          max={5}
        />
      </div>

      <Submit className="w-full rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50">
        Check Point
      </Submit>
    </Form>
  )
}

export default PointForm
