import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from "../services/cryptoApi";
const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {
    const count = simplified? 10 :100;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const {data: cryptosList} = useGetCryptosQuery(100);
    const {data, isFetching}= useGetCryptoNewsQuery({newsCategory, count});
    const [cryptoNews,setCryptoNews]=  useState(null);
    useEffect(()=>{
        setCryptoNews(data)
    },[isFetching,newsCategory]);
    const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

    if (!cryptoNews || !cryptoNews.value) {
        return 'Loading...'
    }
    const onChange= value => {
        setNewsCategory(value);
    }

    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select 
                    showSearch 
                    className='select-news'
                    placeholder='Select a Crypto'
                    optionFilterProp='children'
                    onChange={onChange}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {cryptosList?.data?.coins.map(coin=><Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, index)=>(
                <Col xs={24} sm={12} lg={8} key ={index}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='nonReferrer'>
                            <div className="news-image-container">
                                <Title className='news-title' level={4}>
                                    {news.name}
                                </Title>
                                <img style={{maxWidth:"200px",maxHeight:"100px"}} src={news?.image?.thumbnail?.contentUrl||demoImage} alt={news.name} />
                            </div>
                            <p>
                                {news.description>100?`${news.description.substring(0,100)}...`:news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl||demoImage}/>
                                    <Text className="provider-name">{news.provider[0].name}</Text>
                                </div>
                                    <Text>
                                       {moment(news.datePublished).startOf('ss').fromNow()} 
                                    </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News