import { Form, Label, NumberField, Submit } from '@redwoodjs/forms'

interface PointFormProps {
  radius: number
  onRadiusChange: (radius: number) => void
  onSubmit: (data: { x: number; y: number; r: number }) => void
}

const PointForm = ({ radius, onRadiusChange, onSubmit }: PointFormProps) => {
  return (
    <Form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label name="x" className="block text-sm font-medium text-gray-700">
          X Coordinate (-5 to 5)
        </Label>
        <NumberField
          name="x"
          validation={{
            required: {
              value: true,
              message: 'X coordinate is required',
            },
            min: {
              value: -5,
              message: 'X must be greater than or equal to -5',
            },
            max: {
              value: 5,
              message: 'X must be less than or equal to 5',
            },
          }}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <Label name="y" className="block text-sm font-medium text-gray-700">
          Y Coordinate (-3 to 5)
        </Label>
        <NumberField
          name="y"
          validation={{
            required: {
              value: true,
              message: 'Y coordinate is required',
            },
            min: {
              value: -3,
              message: 'Y must be greater than or equal to -3',
            },
            max: {
              value: 5,
              message: 'Y must be less than or equal to 5',
            },
          }}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div>
        <Label name="r" className="block text-sm font-medium text-gray-700">
          Radius (1 to 5)
        </Label>
        <NumberField
          name="r"
          value={radius}
          onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
          validation={{
            required: {
              value: true,
              message: 'Radius is required',
            },
            min: {
              value: 1,
              message: 'Radius must be greater than or equal to 1',
            },
            max: {
              value: 5,
              message: 'Radius must be less than or equal to 5',
            },
          }}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>

      <Submit className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        Check Point
      </Submit>
    </Form>
  )
}

export default PointForm
