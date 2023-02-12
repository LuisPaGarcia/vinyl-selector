import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

const vinylData = [
  {
    artist: "Lorde",
    albumName: "Solar Power",
    coverHref: "/solar-power.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/solar-power.jpeg"
        blurDataURL="/solar-power.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Frank Ocean",
    albumName: "Blonde",
    coverHref: "/blonde.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/blonde.jpeg"
        blurDataURL="/blonde.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Twenty One Pilots",
    albumName: "Trench",
    coverHref: "/trench.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/trench.jpeg"
        blurDataURL="/trench.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Arctic Monkeys",
    albumName: "AM",
    coverHref: "/am.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/am.jpeg"
        blurDataURL="/am.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Good Kid M.a.a.D. City",
    coverHref: "/gkmc.png",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/gkmc.png"
        blurDataURL="/gkmc.png"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Taylor Swift",
    albumName: "Midnights",
    coverHref: "/midnights.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/midnights.jpeg"
        blurDataURL="/midnights.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Untitled Unmastered",
    coverHref: "/untitled-unmastered.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/untitled-unmastered.jpeg"
        blurDataURL="/untitled-unmastered.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kendrick Lamar",
    albumName: "DAMN",
    coverHref: "/damn.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/damn.jpeg"
        blurDataURL="/damn.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Mr. Morale & the Big Steppers",
    coverHref: "/mr-morale.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/mr-morale.jpeg"
        blurDataURL="/mr-morale.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kendrick Lamar",
    albumName: "To Pimp a Butterfly",
    coverHref: "/tpab.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/tpab.jpeg"
        blurDataURL="/tpab.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Taylor Swift",
    albumName: "folklore",
    coverHref: "/folklore.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/folklore.jpeg"
        blurDataURL="/folklore.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Kanye West",
    albumName: "Donda",
    coverHref: "/donda.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/donda.jpeg"
        blurDataURL="/donda.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Metallica",
    albumName: "Master Of Puppets",
    coverHref: "/master-of-puppets.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/master-of-puppets.jpeg"
        blurDataURL="/master-of-puppets.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Childish Gambino",
    albumName: "Awaken, My Love!",
    coverHref: "/awaken-my-love.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/awaken-my-love.jpeg"
        blurDataURL="/awaken-my-love.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "fun.",
    albumName: "SOME NIGHTS",
    coverHref: "/some-nights.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/some-nights.jpeg"
        blurDataURL="/some-nights.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Taylor Swift",
    albumName: "Evermore",
    coverHref: "/evermore.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/evermore.jpeg"
        blurDataURL="/evermore.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
  {
    artist: "Taylor Swift",
    albumName: "lover",
    coverHref: "/lover.jpeg",
    Component: () => (
      <Image
        placeholder="blur"
        className="mx-auto mt-10 border-4 border-green-500 text-center text-lg text-gray-500 sm:text-2xl"
        src="/lover.jpeg"
        blurDataURL="/lover.jpeg"
        alt="vinyl cover"
        width={280}
        height={280}
      />
    ),
  },
];

type Vinyl = {
  artist: string;
  albumName: string;
  coverHref: string;
  Component: () => JSX.Element;
};

let tempArr = vinylData.slice();
function randChoice(arr: Array<Vinyl>) {
  let index = Math.floor(Math.random() * arr.length);
  let item = arr[index];
  arr.splice(index, 1);
  if (arr.length === 0) {
    tempArr = vinylData.slice();
  }
  return item;
}

export const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vinyl, setVinyl] = useState<Vinyl>({
    artist: "",
    albumName: "",
    coverHref: "",
    Component: () => <></>,
  });

  const getRandomVinyl = () => {
    setVinyl(randChoice(tempArr));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>Vinyl Picker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto mt-10 flex max-w-5xl flex-1 flex-col justify-center px-2 sm:mt-40">
        <span
          className="mx-auto mb-5 hidden max-w-fit rounded-full border border-gray-800 px-4 py-1 text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-700 md:block"
        >
          Press the button and check which vinyl we will play today.
        </span>
        <h1 className="max-w-5xl text-center text-4xl font-bold sm:text-7xl">
          Press the button and{" "}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative text-green-500">Pick</span>
          </span>{" "}
          the vinyl we'll play today
        </h1>
        {!loading && (
          <button
            className="z-10 mx-auto mt-7 w-3/4 rounded-2xl border-gray-500 bg-green-500 p-3 text-lg font-medium transition hover:bg-green-400 sm:mt-10 sm:w-1/3"
            onClick={() => getRandomVinyl()}
          >
            Pick Vinyl
          </button>
        )}
        {vinyl.artist && vinyl.albumName && (
          <>
            <p className="mt-10 text-center text-lg text-gray-500 sm:text-2xl">
              Vinyl selected: <br />
              <span className="text-green-500">
                {vinyl.artist} - {vinyl.albumName}
              </span>
            </p>
            <vinyl.Component />
          </>
        )}
        {loading && (
          <button
            className="z-10 mx-auto mt-7 w-3/4 cursor-not-allowed rounded-2xl border-gray-500 bg-green-500 p-3 text-lg font-medium transition hover:bg-green-400 sm:mt-10 sm:w-1/3"
            disabled
          >
            <div className="flex items-center justify-center text-white">
              <img src="/loading.svg" alt="Loading..." width={28} height={28} />
            </div>
          </button>
        )}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
