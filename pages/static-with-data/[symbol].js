import { useRouter } from "next/router";

const INDEX_URL = "https://api.exchangerate.host/symbols";
const RATE_URL =
  "https://api.exchangerate.host/timeseries?base=GBP&start_date=2022-11-22&end_date=2022-12-01&symbols=";

const Rate = ({ symbol, rates, currentTimestamp }) => {
  const router = useRouter();

  return (
    <section>
      <h1>Latest exchange rate for GBP-{symbol}</h1>
      <small>
        <code>{RATE_URL + symbol}</code>
      </small>
      <hr />
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <table style={{ width: "200px" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Date</th>
                <th style={{ textAlign: "right" }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rates).map((key, idx) => (
                <tr key={idx}>
                  <td>{key}</td>
                  <td style={{ textAlign: "right" }}>{rates[key][symbol]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <p>Current timestamp: {currentTimestamp}</p>
        </>
      )}
    </section>
  );
};

export async function getStaticPaths() {
  const res = await fetch(INDEX_URL);
  const data = await res.json();
  const { symbols } = data;

  const paths = Object.keys(symbols)
    .slice(0, 10)
    .map((symbol) => ({
      params: { symbol },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(RATE_URL + params.symbol);
  const timeseries = await res.json();

  return {
    props: {
      symbol: params.symbol,
      rates: timeseries.rates,
      currentTimestamp: new Date().toLocaleString(),
    },
  };
}

export default Rate;
