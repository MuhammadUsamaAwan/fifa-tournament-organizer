import type { AnyFieldApi } from '@tanstack/react-form';

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  console.log(field.state.meta.errors);
  return field.state.meta.isTouched && field.state.meta.errors.length ? (
    <div className='text-destructive text-[0.8rem]'>{field.state.meta.errors.map(e => e.message).join(', ')}</div>
  ) : null;
}
