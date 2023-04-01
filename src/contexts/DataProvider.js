import { useState, useEffect, createContext, useContext } from "react";
import {getFirestore, getDocs, collection, doc, getDoc, addDoc, collectionGroup, query} from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [tickers, setTickers] = useState([])
    const db = getFirestore()
    const {user} = useContext(AuthContext)
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        async function getMyTickers(){
            const tickerQuery = query(collection(db, 'users', user.uid, "tickers"))

            const querySnapshot = await getDocs(tickerQuery);

            const loadedTickers=[]
            querySnapshot.forEach((doc) => {
                loadedTickers.push({
                    id: doc.id,
                    //uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setTickers(loadedTickers)
            let totaltotal = 0
            for (const ticker of loadedTickers) {
                console.log(ticker)
                const newData = await getStockData(ticker.ticker)
                totaltotal += newData.ticker.min.c-ticker.entry
            }
            setTotal(totaltotal)
        }   
        getMyTickers()
    }, [user])

    async function getTicker(uid, id){
        
        const docRef = doc(db, 'users', uid, "tickers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data()
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            throw new Error
          }
    }


    async function addTicker(ticker){
        let entry = await getStockData(ticker)
        console.log(entry.ticker.min.c)
        const newTicker ={
            ticker,
            entry: entry.ticker.min.c
        }

        const docRef = await addDoc(collection(db, "users", user.uid, 'tickers'), newTicker)

        newTicker.id = docRef.id

        setTickers([
            newTicker,
            ...tickers
        ])

        return newTicker
    }

    function check(num){
        console.log(num)
        let newNum = '+'
        if (String(num)[0] !== '-'){
            newNum+=num
            return newNum
        }
        return num
    }

    const key = "8ZqCDWHRORWdSjiepJt7vEPyYVCIOzQb"

    async function getStockData(symbol){
        const result = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${key}`)
        const data = await result.json()
        console.log(data)
        return data
    }

    async function getTickerInfo(ticker){
        const result = await fetch(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${key}`)
        const data = await result.json()
        return data
    }

    async function getTickerNews(ticker){
        const result = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=${key}`)
        const data = await result.json()
        return data
    }

    const value ={
        addTicker,
        tickers,
        total,
        check,
        getTicker,
        getStockData,
        getTickerNews,
        getTickerInfo
    }

    return (
        <DataContext.Provider value={value}>
            {props.children}    
        </DataContext.Provider>
    )
}