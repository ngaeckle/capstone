import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { DataContext } from "../contexts/DataProvider"
import { Link } from "react-router-dom"
import NewsCard from "../components/NewsCard"

export default function StockSingle() {
    const {ticker} = useParams()
    const {user} = useContext(AuthContext)
    const {addTicker, getStockData, tickers, getTickerInfo, getTickerNews, check} = useContext(DataContext)
    const [tickerData, setTickerData] = useState({})
    const [tickerNews, setTickerNews] = useState({})
    const [data, setData] = useState({})
    const [loadingState, setLoadingState] = useState("Loading")
    const [entry, setEntry] = useState()
    const [user_owns, setUser_Owns] = useState(false)
    const key = "8ZqCDWHRORWdSjiepJt7vEPyYVCIOzQb"

    // Stolen from codewars
    const commas = num => (+num.toFixed(3)).toString().replace(/\B(?=(\d{3})+(\.|$))/g, ',');

    useEffect(()=>{
        async function handleLoad(){
            let newData = await getStockData(ticker)
            let newTickerData = await getTickerInfo(ticker)
            let newTickerNews = await getTickerNews(ticker)
            setTickerNews(newTickerNews)
            setTickerData(newTickerData)
            setData(newData)
            console.log("Tickers: ", tickers)
            //console.log((tickerData.results.branding.logo_url)+"?&apiKey="+ key)
            for (const a_ticker of tickers){
                if (a_ticker.ticker === ticker){
                    setUser_Owns(true)
                    setEntry(a_ticker.entry)
                    break
                }
                setUser_Owns(false)
            }
            setLoadingState('Loaded')
            
        }
        handleLoad()
    }, [ticker])


    async function handleSubmit(){
        await addTicker(data.ticker.ticker)
    }
    
    return (
        <div className="Back">
        {
            (data.status === "OK" && loadingState == 'Loaded') ?
            <div className="stocksingle">
                <div id="stockheader" style={{backgroundColor: (data.ticker.day.c >= data.ticker.day.o)?"lightgreen":"lightcoral"}}>
                    <h1>{data.ticker.ticker}</h1>
                    <p>{check((data.ticker.todaysChangePerc).toFixed(2))}%</p>
                </div>
                <div id="stockstats">
                    <p>Current Price: ${(data.ticker.min.c).toFixed(2)}</p>
                    <p>Todays Change: ${check((data.ticker.todaysChange).toFixed(2))}</p>
                    <p>Days Open Price: ${data.ticker.day.o}</p>
                    
                </div>
                <div id="stockcontainer">
                <div id="stocknews">
                    <h2>Related Articles</h2>
                    <div id='articlecontainer'>
                    <NewsCard data={tickerNews.results[0]}/>
                    <NewsCard data={tickerNews.results[1]}/>
                    <NewsCard data={tickerNews.results[2]}/>
                    <NewsCard data={tickerNews.results[3]}/>
                    <NewsCard data={tickerNews.results[4]}/>
                    </div>
                </div>
                <div id="stockinfo">
                    <div id="stockinfoheader">
                    <h2>{(tickerData.results.name)}</h2>
                    <img src={(tickerData.results.branding?.icon_url)+"?&apiKey="+key} alt="" style={{width: "50px", height: "auto", borderRadius: "10px", marginLeft: "10px"}}/>
                    </div>
                    <p>{(tickerData.results.description)}</p>
                    <p>Market Cap: ${commas(tickerData.results.market_cap)}</p>
                    <p>Total Employees: {commas(tickerData.results.total_employees)}</p>
                    
                </div>
                </div>
                
                
                
            </div>
            : (loadingState == "Loading") ?
            <div className="loadingcards">
                <h1>Loading</h1>
            </div>
            :
            <div className="errorcards">
                <h1>ERROR</h1>
            </div>
        }
        </div>
    )

}