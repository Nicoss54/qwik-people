/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import { Add, Autorenew, LocationCity, ManageAccounts, Phone } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { type Person, type PersonForm } from '~/shared/models/person.model';

interface PeopleCardProps {
  person: Person;

  onDelete(personId?: string): Promise<Person | Person[]>;
}

interface IconButtonProps {
  onClick(): any;
}

interface DialogProps {
  open: boolean;

  onClose(personForm?: PersonForm): any;

  personForm?: PersonForm;
}

export const MuiPeopleCard = qwikify$((props: PeopleCardProps) => {
  const { person, onDelete } = props;
  return (
    <Card raised={true} sx={{ width: '100%', minWidth: '300px' }}>
      <CardHeader
        avatar={<Avatar src={person.photo} sx={{ width: 60, height: 60 }} />}
        title={person.firstname + ' ' + person.lastname}
        subheader={person.email}
      />
      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <Phone sx={{ marginRight: '1rem' }} />
          {person.phone}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <LocationCity sx={{ marginRight: '1rem' }} />
          {person.address?.city}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ManageAccounts sx={{ marginRight: '1rem' }} />
          {person.manager}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" type="button" color="error" variant="outlined" onClick={() => onDelete(person.id)}>
          Delete
        </Button>
        <Button size="small" type="button" color="secondary" variant="outlined">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
});

export const MuiRandomButton = qwikify$((props: IconButtonProps) => {
  const { onClick } = props;
  return (
    <IconButton size="large" color="secondary" onClick={onClick}>
      <Autorenew />
    </IconButton>
  );
});

export const MuiAddButton = qwikify$((props: IconButtonProps) => {
  const { onClick } = props;
  return (
    <IconButton size="large" color="secondary" onClick={onClick}>
      <Add />
    </IconButton>
  );
});

export const MuiCircular = qwikify$(CircularProgress);

export const DialogPersonForm = qwikify$((props: DialogProps) => {
  const { open, onClose, personForm } = props;
  const [form, setForm] = useState({ valid: false, person: personForm });

  return (
    <Dialog open={open} onClose={() => onClose()} classes={{ paper: 'person-dialog' }}>
      <DialogTitle>Create a Person</DialogTitle>
      <DialogContent>
        <PersonFormDialog onPersonChange={setForm} />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onClose()}>
          CLose
        </Button>
        <Button color="primary" onClick={() => onClose(form.person)} disabled={!form.valid}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export function PersonFormDialog(props: { person?: PersonForm; onPersonChange: (form: { valid: boolean; person: PersonForm }) => void }) {
  const { person, onPersonChange } = props;
  const form = useForm({
    defaultValues: {
      ...person,
      photo: person?.photo || 'https://randomuser.me/api/portraits/lego/6.jpg',
    },
    criteriaMode: 'firstError',
    mode: 'all',
  });

  useEffect(() => {
    onPersonChange({ valid: form.formState.isValid, person: form.getValues() as PersonForm });
    const subscription = form.watch(() => {
      onPersonChange({ valid: form.formState.isValid, person: form.getValues() as PersonForm });
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <section style={{ display: 'flex', paddingTop: '1rem', boxSizing: 'border-box' }}>
      <img alt="photo of the person" height="120" width="120" src={form.getValues('photo')} style={{ borderRadius: '50%', marginRight: '1rem' }} />
      <FormProvider {...form}>
        <form style={{ display: 'flex', flexDirection: 'column', flex: 2, gap: '1rem' }}>
          <FormTextField name="firstname" rules={{ required: 'This field is required' }} label="First Name" />
          <FormTextField name="lastname" rules={{ required: 'This field is required' }} label="Last Name" />
          <FormTextField name="email" rules={{ required: 'This field is required' }} label="Email" />
          <FormTextField name="phone" rules={{ required: 'This field is required' }} label="Phone" />
        </form>
      </FormProvider>
    </section>
  );
}

export function FormTextField(props: { rules: Record<string, any>; name: string; label: string }) {
  const { rules, name, label } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          id={name}
          variant="outlined"
          fullWidth
          label={label}
          error={Boolean(errors[name]?.message)}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  );
}
