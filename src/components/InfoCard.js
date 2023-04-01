import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { DataContext } from "../contexts/DataProvider"
import { Link } from "react-router-dom"

export default function InfoCard(props){
    const {user} = useContext(AuthContext)
    const {addTicker, getStockData, tickers} = useContext(DataContext)
    const [ticker, setTicker] = useState('')
    const [data, setData] = useState({})
    const [loadingState, setLoadingState] = useState("Loading")
    const [entry, setEntry] = useState()
    const [user_owns, setUser_Owns] = useState(false)

    useEffect(()=>{
        async function handleLoad(){
            let newData = await getStockData(props.ticker)
            setData(newData)
            console.log("Tickers: ", tickers)
            for (const ticker of tickers){
                if (ticker.ticker === props.ticker ){
                    setUser_Owns(true)
                    setEntry(ticker.entry)
                    break
                }
                setUser_Owns(false)
            }
            setLoadingState('Loaded')
        }
        handleLoad()
    }, [props.ticker])

    async function handleSubmit(){
        await addTicker(data.ticker.ticker)
        setUser_Owns(true)
        setEntry(data.ticker.min.c)
    }
    
    return (
        <div>
        {
            (data.status === "OK" && loadingState == 'Loaded') ?
            <div className="infocards" style={{backgroundColor: (data.ticker.day.c >= data.ticker.day.o)?"lightgreen":"lightcoral"}}>
                <h1>{data.ticker.ticker}</h1>
                <p>Current Price: ${(data.ticker.min.c).toFixed(2)}</p>
                <p>Todays Open Price: ${data.ticker.day.o}</p>
                {
                    (user.loggedIn && !user_owns && !props.hideLink) ?
                    <div>
                    <button className="btn btn-primary" onClick={handleSubmit} style={{marginBottom: "7px"}}>Purchase</button>
                    </div>
                    : (user.loggedIn && user_owns) ?
                    <p>You bought at ${entry}</p> : <></>
                }
                <Link to={`/stock/${props.ticker}`}>More Info</Link>
                
                
                
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