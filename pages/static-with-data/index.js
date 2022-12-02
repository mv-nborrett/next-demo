import Link from "next/link";

const INDEX_URL = "https://api.exchangerate.host/symbols";

const Index = ({ data }) => {
  const { symbols } = data;

  return (
    <section>
      <h1>Latest exchange rates</h1>
      <small>
        <code>{INDEX_URL}</code>
      </small>
      <hr />
      <ul>
        {Object.keys(symbols)
          .slice(0, 10)
          .map((symbol, idx) => (
            <li key={idx}>
              <Link key={idx} href={`/static-with-data/${symbol}`}>
                {symbol} ({symbols[symbol].description})
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export async function getStaticProps() {
  const res = await fetch(INDEX_URL);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Index;
