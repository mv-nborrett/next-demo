import Link from "next/link";
import { useRouter } from "next/router";

const Locale = () => {
  const router = useRouter();

  return (
    <section>
      <p>My locale is {router.locale}.</p>
      <hr />
      <ul>
        <li>
          <Link href="/locale" locale="en-GB">
            In English
          </Link>
        </li>
        <li>
          <Link href="/locale" locale="fr">
            In French
          </Link>
        </li>
        <li>
          <Link href="/locale" locale="de">
            In German
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Locale;
