import Head from 'next/head'
import Layout from '../../components/layout'
import useSWR from 'swr';

const fetcher = (url) => fetch(url, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}).then((res) => {
  return res.json();
});

export default function Home() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_EXPRESS_ENDPOINT}/api/users`, fetcher);

  if (data) {
    console.log(data);
  }

  return (
    <Layout title="Users Index">
      <div>This is index</div>
    </Layout>
  )
}
