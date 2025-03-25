import { useForm } from '@tanstack/react-form';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { authClient } from '~/lib/auth-client';
import { Button } from '~/components/ui/button';
import { FieldInfo } from '~/components/ui/field-info';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { PasswordInput } from '~/components/ui/password-input';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const Route = createFileRoute('/(auth)/_layout/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: '/',
      });
      if (error) {
        toast.error(error.message ?? 'Unable to login, please try again later');
      } else {
        router.invalidate();
      }
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <div className='w-full max-w-xs'>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
        </div>
        <div className='grid gap-6'>
          <form.Field name='email'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Your Email'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name='password'>
            {field => (
              <div className='grid gap-2'>
                <Label htmlFor={field.name}>Password</Label>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  placeholder='Your Password'
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button isLoading={isSubmitting} disabled={!canSubmit} type='submit' className='w-full'>
                Login
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
