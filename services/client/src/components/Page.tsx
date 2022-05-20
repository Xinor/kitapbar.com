import React from 'react';
import Head from "next/head";

interface IProps {
  title: string;
  children: any;
  className?: string;
}
function Page({ title, children, className = '' }: IProps) {
  return (
    <div className='flex-1 min-h-0'>
      <Head>
        <title>{`Kitapbar | ${title}`}</title>
      </Head>
      <main className={`h-full w-full ${className}`}>
        {children}
      </main>
    </div>
  );
}

export default Page;
