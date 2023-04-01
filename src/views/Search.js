import { useContext, useState, useEffect } from "react"
import InfoCard from "../components/InfoCard"
import { AuthContext } from "../contexts/AuthProvider"
import { DataContext } from "../contexts/DataProvider"



export default function Search(){
    const [data, setData] = useState({})
    const [ticker, setTicker] = useState('')
    const {getStockData} = useContext(DataContext)
    const [currsearch, setCurrSearch] = useState('')
    const [loadingState, setLoadingState] = useState("Loading")

    useEffect(() => {
        async function handleLoad(){
            const data = await getStockData(ticker)
            setData(data)
            setLoadingState('Loaded')
        }
        handleLoad()
    }, [ticker])

    function handleSearch(e){
        e.preventDefault()
        setTicker((currsearch).toUpperCase())
    }

    return (
        <div className="Back">
        <div id='search-main'>
            <form class="d-flex" role="search" onSubmit={(e) => handleSearch(e)}>
            <input class="form-control me-2" type="search" placeholder="Search Tickers" aria-label="Search" onChange={(e)=>(setCurrSearch(e.target.value))}/>
            <button class="btn btn-outline-primary" type="submit">Search</button>
            </form>
            <div>
                {
                    (loadingState === "Loading") ? 
                    <></> :
                    <div id="search-infocard">
                        <InfoCard ticker={ticker}/>
                    </div>

                }
            </div>
        </div>
        </div>
    )
}