import { useMyContext } from "../context/AppContext.tsx";
import { APP_LOCAL_STORAGE_BG_KEY } from "../constants.ts";

export default function AnimatedBackground() {
  const { animBgUrl, setAnimBgUrl } = useMyContext();

  const imgTag = animBgUrl ? <img src={animBgUrl} className="fixed inset-0 w-full h-full object-cover blur-sm brightness-90 contrast-110 -z-10" /> : null;

  const animBgOptions = [
    { name: "Snow", url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F10%2Fc8%2Fcb%2F10c8cbab6dcc47a0770c9aee22082ea8.gif&f=1&nofb=1&ipt=cc05e15c3b143178a15edce3aa26a24d74edc26405613b055b43429da8eb1d79" },
    { name: "Rain", url: "https://i.pinimg.com/originals/c5/25/08/c52508e40597320d69efce6d9dfc9a41.gif" },
    { name: "Particles", url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F64.media.tumblr.com%2F7bed901bd03ad671815872ce938aa750%2Ftumblr_o7w2veChcr1runoqyo1_540.gif&f=1&nofb=1&ipt=b26a65b344ebc50211bb7c7529d11fb2ed0db78871feb1accf8d37e52c411e08" },
    { name: "Fireflies", url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.tenor.com%2FH6Rhs21XAaoAAAAM%2Fpixel-fireflies.gif&f=1&nofb=1&ipt=ed0b2c0b644188b03cd35ec5698dfd557d7f8a53ee5b1cfda3de25cd6ab6f6a6" },
    { name: "Scanlines", url: "https://i.postimg.cc/5NFWJkWm/scanlines.gif" },
    { name: "Starfield", url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2Fv1.Y2lkPTc5MGI3NjExY2Z5MWU5cnk4aW9ic2RsMml6bDV1a3QxZnU3aDR5MzFxYmZveHlhcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n%2FelcAvTEXkG02d17sr7%2Fgiphy.gif&f=1&nofb=1&ipt=eb29424e949a270b4e4b1b3e1dc8b845b9ea6736a8cd43d1f746b56e99d02630" },
    { name: "Matrix", url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F4%2F21%2FzmaGlS.gif&f=1&nofb=1&ipt=a69d281afc9bd52cfba1d04a2a978d7f7ed64501d401ed13f2d0d81c853f43e0" },
    { name: "Space flight", url: "https://media.tenor.com/ZKAU_q3c6J4AAAAd/bebop-spacecraft.gif" },
    { name: "Ocean at night", url: "https://i.pinimg.com/originals/76/6d/78/766d780bb1040ebdd0535ae75326796b.gif" },
    { name: "Aurora Borealis", url: "https://giffiles.alphacoders.com/222/222033.gif" },
    { name: "Nighttime", url: "https://giffiles.alphacoders.com/223/223158.gif" },
    { name: "Rainy day", url: "https://giffiles.alphacoders.com/206/206272.gif" },
    { name: "Rain in forest", url: "https://giffiles.alphacoders.com/206/206280.gif" },
    { name: "Terra", url: "https://i.pinimg.com/originals/81/14/1e/81141e709aa347df1b8a6f57b46bdff9.gif" },
    { name: "Sun", url: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHR3OG5vMHk0NnVhZGN1am5yNnMyOGM4NHB5OTljM252azV6aHZlaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26AHBssPzsCJRhLDG/giphy.gif" },
    { name: "NASA", url: "https://64.media.tumblr.com/26d9fa44fde6515a51ad085f0f203792/4d76f104474a6cf0-f8/s500x750/ded70722e23a430532890baf2e856ab2459b271f.gif" },
  ];

  const storedInLs = localStorage.getItem(APP_LOCAL_STORAGE_BG_KEY);
  const initialValue = storedInLs === "null" ? "" : storedInLs;

  return (
    <>
      {imgTag}

      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 font-mono text-sm text-emerald-200 transition duration-200 opacity-30 hover:opacity-100">
        <label htmlFor="animated-bg" className="opacity-60">
          background:
        </label>

        <select
          value={animBgUrl ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setAnimBgUrl(value === "none" ? null : value);
            localStorage.setItem(APP_LOCAL_STORAGE_BG_KEY, value === "none" ? "null" : value);
          }}
          id="animated-bg"
          className="bg-black/50 border border-emerald-600/90 text-emerald-200 px-2 py-1 rounded-sm outline-none focus:border-emerald-300 cursor-pointer"
        >
          <option disabled>Animated bg</option>
          <option value="none">None</option>
          {animBgOptions.map((option) => (
            <option key={option.name} value={option.url}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
