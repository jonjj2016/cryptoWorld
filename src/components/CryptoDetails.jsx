import {useState} from 'react';
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import { millify } from 'millify';
import { Col, Row, Typography, Select } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import LineChart from './LineChart';

const {Title, Text} = Typography;
const {Option} = Select;

const CryptoDetails = () => {
    const {coinId}= useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const {coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod});
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    const cryptoDetails = data?.data?.coin;
    if(!cryptoDetails||isFetching){
        return 'Loading...'
    }
    const onChange = val => {
        setTimePeriod(val);
    }
    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <Col className='coin-detail-container'>
            <Col className="coin-heading-container">
                <Title level={2} className='coin-name'>
                    {cryptoDetails.name} ({cryptoDetails.slug}) Price
                </Title>
                    <p>
                        {cryptoDetails.name} live price in US dollars.
                        Vew value statistics, market cap and supply.
                    </p>
            </Col>
            <Select 
                defaultValue={timePeriod}
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={onChange}
            >
                {time.map((option, index) => <Option value={option} key={index}>{option}</Option>)}

            </Select>
            <LineChart coinName={cryptoDetails.name} coinHistory= {coinHistory} currentPrice={millify(cryptoDetails.price)}/>
            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overwiew showing the stats of {cryptoDetails.name}
                        </p>
                    </Col>
                    {stats.map(({icon, title, value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>

                        </Col>
                    ))}
                </Col>
                <Col className='other-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Other Statistics
                        </Title>
                        <p>
                            An overwiew showing the stats of all cryptocurrencies
                        </p>
                    </Col>
                    {genericStats.map(({icon, title, value}) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>

                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'>
                        What is {cryptoDetails.name} ?
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading' >
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map(link=>(
                        <Row className='coin-link' key = {link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} rel='noreferrer' target='_blank'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails