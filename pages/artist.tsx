import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import axios from "axios";
import debounce from "lodash/debounce";

const instance = axios.create({
  baseURL: "/.netlify/functions",
});

const artistsReducer = (artists: object[]): Artists[] =>
  artists.slice(0, 5).map((artist: any) => ({
    name: artist.name,
    id: artist.id,
    disambiguation: artist.disambiguation,
  }));
const artistsAlbumsReducer = (artistsAlbums: object[]): ArtistAlbum[] =>
  artistsAlbums
    .map((artistsAlbum: any) => ({
      title: artistsAlbum.title,
      id: artistsAlbum.id,
      status: artistsAlbum.status,
      type: artistsAlbum["primary-type"],
      disambiguation: artistsAlbum.disambiguation,
      releaseDate:
        artistsAlbum["date"] && artistsAlbum["date"].length < 5
          ? artistsAlbum["date"] + "-01-01"
          : artistsAlbum["date"],
    }))
    .slice()
    .sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate));

function mergeArraysById(arr1: any[], arr2: any[]) {
  return arr1.map((item1) => {
    const matchingItem = arr2.find((item2) => item1.id === item2.id);
    if (matchingItem) {
      return { ...item1, ...matchingItem };
    }
    return item1;
  });
}

function deduplicateObjectsByTitle(arr: { title: string }[]) {
  const uniqueObjects = [];
  const seenTitles = new Set();

  for (const obj of arr) {
    if (!seenTitles.has(obj.title.toLocaleLowerCase())) {
      uniqueObjects.push(obj);
      seenTitles.add(obj.title.toLocaleLowerCase());
    }
  }

  return uniqueObjects;
}

type Artists = {
  name: string;
  id: string;
  disambiguation: string;
};
type ArtistAlbum = {
  title: string;
  id: string;
  disambiguation: string;
};

export const Artist: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAlbums, setLoadingAlbums] = useState<boolean>(false);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [selectedArtistAlbums, setSelectedArtistAlbums] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (e: any) => {
    setSearchTerm(e.target.value);
    searchForArtist(e.target.value);
  };

  const searchArtistByQuery = function (value: string) {
    if (!value) return;
    setArtists([])
    const getData = async (debouncedSearchTerm: string) => {
      try {
        setLoading(true);
        const url = "/searchArtistByQuery?query=";
        const data = await instance.get(url + debouncedSearchTerm);
        setArtists(artistsReducer(data.data.response.artists));
        console.log(artists);
        toast.success("Success");
      } catch (error) {
        console.log(error);
        toast.error("Error");
      } finally {
        setLoading(false);
      }
    };
    getData(value);
  };

  const searchForArtist = useCallback(debounce(searchArtistByQuery, 400), []);

  const artistSelectedSet = (id: string) => {
    fetchArtistAlbums(id);
  };

  const fetchArtistAlbums = async (selectedArtist: string) => {
    if (!selectedArtist) return;
    setSelectedArtistAlbums([])
    const getData = async (selectedArtist: string) => {
      try {
        setLoadingAlbums(true);
        const url = "/getArtistAlbumsById?artist_id=";
        const data = await instance.get(url + selectedArtist);
        const albums = deduplicateObjectsByTitle(
          artistsAlbumsReducer(data.data.response["releases"])
        );

        const selectedArtistAlbumsIdsArr = albums.map(
          //@ts-ignore
          (album) => album.id
        );
        console.log("selectedArtistAlbumsIdsArr", selectedArtistAlbumsIdsArr);
        let requests: any[] = [];
        selectedArtistAlbumsIdsArr.forEach((id) => {
          requests.push(
            instance.get("/getArtistAlbumCoverById?album_id=" + id)
          );
        });
        console.log("requests", requests);

        const data2 = await Promise.all(requests);
        const albums2 = data2.map((album) => {
          return {
            images:
              album.data.response.images &&
              album.data.response.images.length > 0
                ? album.data.response.images[0]
                : {},
            id: album.data.response.album_id,
          };
        });

        const mergedAlbums = mergeArraysById(albums, albums2);

        console.log(mergedAlbums);
        setSelectedArtistAlbums(mergedAlbums);
      } catch (error) {
        console.log(error);
        toast.error("Error");
      } finally {
        setLoadingAlbums(false);
      }
    };
    getData(selectedArtist);
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
          value={searchTerm}
          onChange={updateSearchTerm}
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

        {artists.length > 0 && (
          <div className="rounded-lg shadow-md">
            <table className="mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 text-left text-sm outline-1 outline-white dark:text-gray-400 sm:mt-7 sm:w-3/4">
              <thead className="bg-transparent text-xs uppercase text-gray-700 dark:bg-transparent dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Artists Results
                  </th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist) => (
                  <tr
                    key={artist.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:cursor-pointer dark:hover:bg-gray-700"
                    onClick={() => artistSelectedSet(artist.id)}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {artist.name}{" "}
                      {artist.disambiguation && (
                        <span className="text-gray-400">
                          ({artist.disambiguation})
                        </span>
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loadingAlbums && (
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
        {selectedArtistAlbums.length > 0 && (
          <div className="flex flex-wrap rounded-lg shadow-md	mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 outline-1 outline-white sm:mt-7 sm:w-3/4">
            {selectedArtistAlbums.map((album) => (
              <img
                className=""
                key={album?.images?.thumbnails?.["500"]}
                alt=""
                src={album?.images?.thumbnails?.["500"]}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Artist;
