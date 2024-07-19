import React, { useEffect, useState } from "react";
import querystring from "querystring";
import { Buffer } from "buffer";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiLoaderCircle, BiLogoSpotify } from "react-icons/bi";
import styles from "./NowPlaying.module.css";

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const client_id = "538be3355ef94997bdece76e80006d6e";
const client_secret = "244e758f02484656980b11dbd7796e52";
const refresh_token = "AQByBHYCPJWm7m3X5_sWl4dGDNQn86hpuRfC3nGpTu8ITNDLDsfGOVy4TyM6rTf1MPBU7v8Du7Gczh4S6GFlsQoVd_J4FOraGmXKh0vWKlkOziSwdydw1NTBAnmAAYHGsnI"; // Use your actual refresh token

 const getAccessToken = async (client_id, client_secret, refresh_token) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  
  return response.json();
};

const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);
    

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      throw new Error("Unable to Fetch Song");
    } else if (response.status === 204) {
      throw new Error("Currently Not Playing");
    }

    const song = await response.json();
    
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((artist) => artist.name).join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching currently playing song: ", error);
      return error.message.toString();
    } else {
      console.error("Unknown error fetching currently playing song");
      return "Unknown error";
    }
  }
};

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      setNowPlaying(data);
      
    };

    const intervalId = setInterval(() => {
      fetchNowPlaying();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let playerState = "";
  let secondsPlayed = 0,
    minutesPlayed = 0,
    secondsTotal = 0,
    minutesTotal = 0;
  let albumImageUrl = "/images/albumCover.png";
  let title = "";
  let artist = "";

  if (nowPlaying != null && nowPlaying.title) {
    nowPlaying.isPlaying ? (playerState = "PLAY") : (playerState = "PAUSE");
    secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;
    secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
    minutesTotal = Math.floor(secondsTotal / 60);
    secondsTotal = secondsTotal % 60;
    albumImageUrl = nowPlaying.albumImageUrl;
    title = nowPlaying.title;
    artist = nowPlaying.artist;
  } else if (nowPlaying === "Currently Not Playing") {
    playerState = "OFFLINE";
    title = "Pritam is";
    artist = "currently listening to his Mom's yapping";
  } else {
    title = "Wait!!";
    artist = "Lemme Put My Earphones On";
  }

  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    <a
      style={{ textDecoration: "none", color: "white" }}
      href={
        playerState === "PLAY" || playerState === "PAUSE"
          ? nowPlaying.songUrl
          : ""
      }
    >
      <div className={`${styles.nowPlayingCard} flex flex-col md:flex-row items-center md:items-start`}>
        <div className={styles.nowPlayingImage}>
          {playerState === "PLAY" || playerState === "PAUSE" ? (
            <a href={nowPlaying.songUrl}>
              <img src={albumImageUrl} alt="Album" />
            </a>
          ) : (
            <img src={"https://i.gifer.com/8MqP.gif"} alt="Album" />
          )}
        </div>
        <div className={`${styles.nowPlayingDetails} mt-4 md:mt-0 md:ml-4`}>
          <div
            className={`${styles.nowPlayingTitle} ${
              title.length > 15 ? styles.marqueeContent : ""
            }`}
          >
            {playerState === "PLAY" || playerState === "PAUSE" ? (
              <a href={nowPlaying.songUrl}>{title}</a>
            ) : (
              title
            )}
          </div>
          <div className={styles.nowPlayingArtist}>
            {playerState === "PLAY" || playerState === "PAUSE" ? (
              <a href={nowPlaying.artistUrl}>{artist}</a>
            ) : (
              artist
            )}
          </div>
          <div className={styles.nowPlayingTime}>
            {pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:
            {pad(secondsTotal)}
          </div>
        </div>
        <div className={`${styles.nowPlayingState} mt-4 md:mt-0`}>
          {playerState === "PLAY" ? (
            <img
              alt="soundbar"
              src="https://i.gifer.com/YdBO.gif"
              title="Now Listening"
            />
          ) : playerState === "PAUSE" ? (
            <AiOutlinePlayCircle size={40} />
          ) : playerState === "OFFLINE" ? (
            <BiLogoSpotify size={40} />
          ) : (
            <BiLoaderCircle size={40} />
          )}
        </div>
      </div>
    </a>
  );
};

export default NowPlaying;


