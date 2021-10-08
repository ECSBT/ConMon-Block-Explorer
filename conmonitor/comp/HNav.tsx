import Link from "next/link";

const HNav = () => {
    return (
      <nav>
        <ul >
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/NetStat'>Network Stats</Link>
          </li>
          <li>
            <Link href='/Mining'>Mining</Link>
          </li>
          <li>
            <Link href='/Tx'>Transactions</Link>
          </li>
          <li>
            <Link href='/Poll'>Poll</Link>
          </li>
        </ul>
      </nav>
    )
}

export default HNav