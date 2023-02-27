/* eslint-disable jsx-a11y/alt-text */
import styles from '../styles/Home.module.css'

import Head from 'next/head'
import Image from 'next/image'

import Banner from "../components/Banner"
import Card from "../components/Card"
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";


export async function getStaticProps(context) {

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log("props", props);
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };
  return (
    <div className={styles.container}>
      <Head>
      <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favincon.ico'></link>
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt='google'/>
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}></footer>

    </div>
  )
}
