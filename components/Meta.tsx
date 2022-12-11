import React from 'react';
import Head from 'next/head';

type Props = {
    title: string;
    keywords: string;
    description: string; 
}

const Meta = ({title, keywords, description} : Props) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
    </div>
  )
}

Meta.defaultProps = {
    title: 'WebDev News',
    keywords: 'web development, programming',
    description: 'Get the latest news in web dev',
}

export default Meta
