import Head from 'next/head';
import { Controller, useForm } from 'react-hook-form';
import Input from "@material-ui/core/Input";
import * as React from 'react';
import { Box } from "@mui/system";
import Grid from '@mui/system/Unstable_Grid';
import useSWR from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Layout from '../../components/layout'

export default function create() {
  const validationSchema = Yup.object().shape({
    nameRequired: Yup.string().max(6, 'Name must be at most 6 characters').required('Name is required'),
    emailRequired: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nameRequired: '',
      emailRequired: ''
    }
  });

  const fetcher = (url) => fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: postData.emailRequired, name: postData.nameRequired})
  }).then((res) => {
    return res.json();
  });

  const [postData, setPostData] = React.useState(null);

  const { data, error } = useSWR(
    postData ? `${process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT}/api/users` : null,
    fetcher
  );

  const onSubmit = data => {
    setPostData(data);
  };

  if (error) {
    return (
      <Layout>
        <div>An error has occurred.</div>
      </Layout>
    )
  };
  return (
    <Layout>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box component="span" sx={{ display: 'block' }}>
            <Controller
              name='nameRequired'
              control={control}
              render={({ field }) => <Input{...field} placeholder="Name" />}
            />
            {errors.nameRequired && <span>{errors.nameRequired?.message}</span>}
          </Box>  
          <Box component="span" sx={{ display: 'block' }}>
            <Controller
              name='emailRequired'
              control={control}
              render={({ field }) => <Input{...field} placeholder="Email" />}
            />
            {errors.emailRequired && <span>{errors.emailRequired?.message}</span>}
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            <input type="submit" />
          </Box>
        </form>
      </main>
    </Layout>
  )
}