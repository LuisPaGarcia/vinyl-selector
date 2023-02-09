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
  },
  {
    artist: "Frank Ocean",
    albumName: "Blonde",
    coverHref: "/blonde.jpeg",
  },
  {
    artist: "Twenty One Pilots",
    albumName: "Trench",
    coverHref: "/trench.jpeg",
  },
  {
    artist: "Arctic Monkeys",
    albumName: "AM",
    coverHref: "/am.jpeg",
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Good Kid M.a.a.D. City",
    coverHref: "/gkmc.png",
  },
  {
    artist: "Taylor Swift",
    albumName: "Midnights",
    coverHref: "/midnights.jpeg",
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Untitled Unmastered",
    coverHref: "/untitled-unmastered.jpeg",
  },
  {
    artist: "Kendrick Lamar",
    albumName: "DAMN",
    coverHref: "/damn.jpeg",
  },
  {
    artist: "Kendrick Lamar",
    albumName: "Mr. Morale & the Big Steppers",
    coverHref: "/mr-morale.jpeg",
  },
  {
    artist: "Kendrick Lamar",
    albumName: "To Pimp a Butterfly",
    coverHref: "/tpab.jpeg",
  },
  {
    artist: "Taylor Swift",
    albumName: "folklore",
    coverHref: "/folklore.jpeg",
  },
  {
    artist: "Kanye West",
    albumName: "Donda",
    coverHref: "/donda.jpeg",
  },
  {
    artist: "Metallica",
    albumName: "Master Of Puppets",
    coverHref: "/master-of-puppets.jpeg",
  },
  {
    artist: "Childish Gambino",
    albumName: "Awaken, My Love!",
    coverHref: "/awaken-my-love.jpeg",
  },
  {
    artist: "fun.",
    albumName: "SOME NIGHTS",
    coverHref: "/some-nights.jpeg",
  },
  {
    artist: "Taylor Swift",
    albumName: "Evermore",
    coverHref: "/evermore.jpeg",
  },
];

type Vinyl = {
  artist: string;
  albumName: string;
  coverHref: string;
};

export function randChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [vinyl, setVinyl] = useState<Vinyl>({
    artist: "",
    albumName: "",
    coverHref: "",
  });

  const getRandomVinyl = () => {
    setVinyl(randChoice(vinylData));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>Vinyl Selector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto mt-10 flex max-w-5xl flex-1 flex-col justify-center px-2 sm:mt-40">
        <a
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 hidden max-w-fit rounded-full border border-gray-800 px-4 py-1 text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-700 md:block"
          href="https://twitter.com/nutlope/status/1622988173155368960"
        >
          Press the button and check which vinyl we will play today.
        </a>
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
              Vinyl selected:{" "}<br/>
              <span className="text-green-500">
                {vinyl.artist} - {vinyl.albumName}
              </span>
            </p>
            <img
              className="mx-auto mt-10 text-center text-lg text-gray-500 sm:text-2xl border-4 border-green-500"
              src={vinyl.coverHref}
              alt="vinyl cover"
              width={280}
              height={280}
            />
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
