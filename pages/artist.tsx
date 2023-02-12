import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import axios from "axios";

export const Artist: NextPage = () => {
  const [artistName, artistNameSet] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(artistName);

  useEffect(() => {
    const getData = setTimeout(() => {
      setDebouncedSearchTerm(artistName);
      setLoading(false);
      if (!artistName) return;
    }, 500);

    return () => clearTimeout(getData);
  }, [artistName]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    const getData = async () => {
      await axios
        .get(
          "/.netlify/functions/searchArtistByQuery?query=" + debouncedSearchTerm
        )
        .then((data) => {
          console.log(data);
          toast.success("Success");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error", error);
        });
    };
    getData();
  }, [debouncedSearchTerm]);

  const handleChange = (artistName: string) => {
    if (artistName) setLoading(true);

    artistNameSet(artistName);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>Vinyl Selector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto mt-10 flex max-w-5xl flex-1 flex-col justify-center px-2 sm:mt-40">
        <span className="mx-auto mb-5 hidden max-w-fit rounded-full border border-gray-800 px-4 py-1 text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:border-gray-700 md:block">
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
        <input
          type="text"
          value={artistName}
          onChange={(event) => handleChange(event.target.value)}
          className="mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 outline-1 outline-white sm:mt-7 sm:w-3/4"
        />

        {loading && (
          <button
            className="z-10 mx-auto mt-7 w-3/4 cursor-not-allowed rounded-2xl border-gray-500 bg-green-500 p-3 text-lg font-medium transition hover:bg-green-400 sm:mt-10 sm:w-1/3"
            disabled
          >
            <div className="flex items-center justify-center text-white">
              <Image
                src="/loading.svg"
                alt="Loading..."
                width={28}
                height={28}
              />
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

export default Artist;
