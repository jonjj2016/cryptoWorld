import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { NavBar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News } from './components/';
import './App.css';

const App = () => {
    return (
       <div className = 'app'>
           <div className="navbar">
               <NavBar/>
           </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route exact path='/exchanges' component={Exchanges}/>
                            <Route exact path='/cryptocurrencies' component={CryptoCurrencies}/>
                            <Route exact path='/crypto/:coinId' component={CryptoDetails}/>
                            <Route exact path='/news' component={News}/>
                        </Switch>
                    </div>
                </Layout>
            <div className="footer">
                <Typography.Title level={5} style={{color: 'white',textAlign: 'center'}}>
                    Crypteo World <br />
                    All Rights reserved
                </Typography.Title>
                <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/exchanges'>Exchanges</Link>
                    <Link to='/news'>News</Link>
                </Space>
            </div>
            </div>
       </div>
    )
}

export default App