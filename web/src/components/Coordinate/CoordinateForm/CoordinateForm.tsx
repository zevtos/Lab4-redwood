import type { EditCoordinateById, UpdateCoordinateInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormCoordinate = NonNullable<EditCoordinateById['coordinate']>

interface CoordinateFormProps {
  coordinate?: EditCoordinateById['coordinate']
  onSave: (data: UpdateCoordinateInput, id?: FormCoordinate['id']) => void
  error: RWGqlError
  loading: boolean
}

const CoordinateForm = (props: CoordinateFormProps) => {
  const onSubmit = (data: FormCoordinate) => {
    props.onSave(data, props?.coordinate?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormCoordinate> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="x"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          X
        </Label>

        <TextField
          name="x"
          defaultValue={props.coordinate?.x}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="x" className="rw-field-error" />

        <Label
          name="y"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Y
        </Label>

        <TextField
          name="y"
          defaultValue={props.coordinate?.y}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="y" className="rw-field-error" />

        <Label
          name="r"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          R
        </Label>

        <TextField
          name="r"
          defaultValue={props.coordinate?.r}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="r" className="rw-field-error" />

        <Label
          name="hit"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hit
        </Label>

        <CheckboxField
          name="hit"
          defaultChecked={props.coordinate?.hit}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="hit" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.coordinate?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CoordinateForm
