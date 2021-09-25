import {useEffect, useState } from "react";
import millify from "millify"
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const CryptoCurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const {data:cryptosList, isFetching} = useGetCryptosQuery(count);
    
    const [cryptos, setcryptos] = useState(cryptosList?.data?.coins);
    const [searchTearm, setSearchTearm] = useState('');
    useEffect(()=>{
        setcryptos(cryptosList?.data?.coins)
        const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTearm.toLowerCase()))
        setcryptos(filteredData)
    },[searchTearm,cryptosList])
    if (isFetching) {
        return <h1>'Loading'</h1>
    }
    const onChange = e => {
        setSearchTearm(e.target.value)
    }
    return (
        <>
       {!simplified && (<div className="search-crypto">
            <Input placeholder='Search Cryptocurrency' onChange={onChange} value={searchTearm}/>
        </div>)}
        <Row gutter={[32,32]} className='crypto-card-container'>
            {cryptos?.map(crypto=>(
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.id}>
                    <Link to={`/crypto/${crypto.id}`}>
                        <Card title={`${crypto.rank}.${crypto.name}`} hoverable extra={<img className='crypto-image' src={crypto.iconUrl} />} >
                        <p>Price: {millify(crypto.price)}</p>
                        <p>Market Cap: {millify(crypto.marketCap)}</p>
                        <p>Daily Change: {millify(crypto.change)}%</p>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default CryptoCurrencies