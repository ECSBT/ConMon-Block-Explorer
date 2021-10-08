import React from 'react';
import styles from '../styles/Datacard.module.css'
import { useState, useEffect } from 'react'
import IDataCard from '../models/IDataCard'
import { TextField } from '@material-ui/core'
// @ts-ignore
import { CircleIndicator } from 'react-indicators'
import { useRouter } from 'next/router'

const BlockDataCard = (props: any) => {
  let ICardData: IDataCard
  let lbTimer: any
  let liveIndicator: any
  let searchVal: any
  let prevBlock:  number

  ICardData =  {
    last_block: '', 
    block_hash: '', 
    block_parent_hash: '', 
    block_miner: '', 
    block_timestamp: '', 
    block_propagation_time: '', 
    block_transactions_count: '', 
    block_size: '', 
    block_difficulty: '', 
    block_nonce: '', 
    block_gas_used: '',
  }

  var [cardData, setCardData] = useState(ICardData)
  var [cardState, setCardState] = useState('last')
  //var [searchState, setSearchState] = useState('last')
  //const router = useRouter()

  async function grabBlock() {
    // Fetch data from external API
    const res = await fetch(`http://172.18.0.12:9001/api/block/${cardState}`)
    const data = await res.json()
    if (data[0].last_block.localeCompare(cardData.last_block) === 0 && cardState === 'last') {
      clearTimeout(lbTimer)
      lbTimer = setTimeout(grabBlock, 1500)
      //console.log('setCardData skipped ' + data[0].last_block)
    } else if (data[0].last_block.localeCompare(cardData.last_block) === 0 && cardState != 'last') {
      clearTimeout(lbTimer)
    } else {
      clearTimeout(lbTimer)
      setCardData(data[0])
      prevBlock = parseInt(cardData.last_block)
      console.log('setCardData called ' + prevBlock)
    }
  }

  function handleChange(val: any) {
    //console.log(val)
    searchVal = val
  }

  //const refreshData = () => {
  //  router.replace(router.asPath)
  //}

  //useEffect(() => {
  //  console.log(cardData)
  //  refreshData
  //}, [cardData])

  useEffect(() => {
    console.log(searchVal)
    //clearTimeout(lbTimer)
    grabBlock()
  })

  switch (cardState) {
    case 'last':
      liveIndicator = `${styles.circleon}`
      break
    default:
      liveIndicator = `${styles.circleoff}`
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.chead}>
          <div className={styles.hl}><TextField type="text" 
            onChange={(e) => handleChange(e.target.value)}
            className={styles.tf}
            placeholder="Block #"
            variant="outlined"
            color="primary"/>
            <a onClick={() => setCardState(searchVal)} className={styles.sb}><span>Search</span></a></div>
          <div className={styles.ht}><h2>Block {cardData.last_block}</h2></div>
          <div className={styles.hr}>
            <a onClick={() => setCardState('last')} className={styles.lb}>
              <span className={liveIndicator} /><span>LIVE</span></a></div>
        </div>
        <div className={styles.cbody}>
          <h3>Block Hash: </h3> &nbsp;
          <p>{cardData.block_hash}</p><br />
          <h3>Parent Hash: </h3> &nbsp;
          <p>{cardData.block_parent_hash}</p><br />
          <h3>Block Miner: </h3> &nbsp;
          <p>{cardData.block_miner}</p><br />
          <h3>Block Timestamp: </h3> &nbsp;
          <p>{cardData.block_timestamp}</p><br />
          <h3>Block Propagation Time: </h3> &nbsp;
          <p>{cardData.block_propagation_time}</p><br />
          <h3>Block Transactions: </h3> &nbsp;
          <p>{cardData.block_transactions_count}</p><br />
          <h3>Block Size: </h3> &nbsp;
          <p>{cardData.block_size}</p><br />
          <h3>Block Difficulty: </h3> &nbsp;
          <p>{cardData.block_difficulty}</p><br />
          <h3>Block Nonce: </h3> &nbsp;
          <p>{cardData.block_nonce}</p><br />
          <h3>Block Gas Used: </h3> &nbsp;
          <p>{cardData.block_gas_used}</p><br />
        </div>
      </div>
    </React.Fragment>
  );
}

//export async function getServerSideProps() {
//  // Fetch data from external API
//  const res = await fetch(`http://172.18.0.12:9001/api/block/last`)
//  const data = await res.json()
//  console.log(data)
//  // Pass data to the page via props
//  return { props: { data } }
//}

export default BlockDataCard