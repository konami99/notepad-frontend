import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/system/Unstable_Grid'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>New User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid xs={4}>
        </Grid>
        <Grid xs={8}>
          { children }
        </Grid>
      </Grid>
    </div>
  );
};