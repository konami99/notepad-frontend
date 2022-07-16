import Head from 'next/head';
import { Controller, useForm } from 'react-hook-form';
import Input from "@material-ui/core/Input";
import * as React from 'react';
import { Box } from "@mui/system";
import useSWR from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
    setPostData(null);
    return res.json();
  });

  const [postData, setPostData] = React.useState(null);

  const { data, error } = useSWR(
    postData ? 'http://notep-Publi-8VYH2S3SISK0-575312188.us-west-2.elb.amazonaws.com/api/users' : null,
    fetcher
  );

  const onSubmit = data => {
    setPostData(data);
  };

  if (error) return "An error has occurred.";
  return (
    <div className="container">
      <Head>
        <title>New Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </div>
  )
}