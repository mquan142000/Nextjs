import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=hanoi&units=metric&appid=803f5760127e023d6961f63939d7ef85"
  );
  
  let data = null;
  
  try {
    data = await res.json();
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }

  return {
    props: {
      data,
    },
  };
}

function Home({ data }) {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Hello C0424G1</h1>
      <p>
        <Link
          href="/gioi-thieu"
          className="text-sky-400 hover:text-sky-900 underline"
        >
          Giới thiệu
        </Link>
      </p>
      <div className="border shadow-md mt-10 py-5 bg-slate-50 flex items-center justify-center space-x-5">
        <Image
          width="100"
          height="100"
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather icon"
        />
        <div>
          <p className="text-5xl font-bold">
            {data.main.temp}
            <sup>°C</sup>
          </p>
        </div>
        <div className="text-slate-400">
          <p>Main: {data.weather[0].main}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {data.wind.speed} km/h</p>
        </div>
      </div>
    </>
  );
}

export default Home;
