import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@mui/system/Unstable_Grid';
import { Box } from "@mui/system";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>New User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Box component="span" sx={{ display: 'block' }}>
            <Link href="/">
              <a>
                Home
              </a>
            </Link>
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            <Link href="/users/new">
              <a>
                New User
              </a>
            </Link>
          </Box>
        </Grid>
        <Grid xs={8}>
          { children }
        </Grid>
      </Grid>
    </div>
  );
};