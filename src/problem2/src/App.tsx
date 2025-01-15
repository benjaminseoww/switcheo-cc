import { useState, useEffect } from 'react'
import TokenSelect from './components/TokenSelect'
import ConnectWalletButton from './components/ConnectWalletButton'
import prices from '../info'

function App() {
  const [sellToken, setSellToken] = useState<string | null>('USD')
  const [sellAmount, setSellAmount] = useState<number | ''>('')
  const [buyToken, setBuyToken] = useState<string | null>('SWTH')
  const [buyAmount, setBuyAmount] = useState<number | ''>('')
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)

  interface LastUpdatedPayload {
    category: 'BUY' | 'SELL' | '',
    field: 'AMOUNT' | 'TOKEN' | ''
  }

  const emptyLastUpdated : LastUpdatedPayload = {
    category: '',
    field: ''
  }

  const [lastUpdated, setLastUpdated] = useState<LastUpdatedPayload>(emptyLastUpdated)

  const getExchangeRate = (sellToken : string, buyToken : string) => {
    const buyTokenPriceUSD = prices.findLast(e => e.currency.toLowerCase() === buyToken.toLowerCase())?.price
    const sellTokenPriceUSD = prices.findLast(e => e.currency.toLowerCase() === sellToken.toLowerCase())?.price

    return buyTokenPriceUSD && sellTokenPriceUSD ? buyTokenPriceUSD / sellTokenPriceUSD : null
  }

  const getTokenUSDValue = (token : string, quantity : number) => {
    const tokenPriceUSD = prices.findLast(e => e.currency.toLowerCase() === token.toLowerCase())?.price
    const value = tokenPriceUSD ? tokenPriceUSD * quantity : null
    return value ? value.toFixed(2) : ''
  }

  // TODO: logic too complicated
  useEffect(() => {
    if (lastUpdated.category === 'SELL') { // user updated the sell field
      if (sellToken && buyToken && sellAmount) { // get the buy amount

        setBuyAmount('')

        const exchangeRate = getExchangeRate(sellToken, buyToken)
        setExchangeRate(exchangeRate)

        if (exchangeRate) {
          setBuyAmount(Number((sellAmount / exchangeRate).toPrecision(8)))
        }
        setLastUpdated(emptyLastUpdated)
      } else if (sellAmount === '') { // deleted the sell field, clear the buy field
        if (lastUpdated.field === 'AMOUNT') {
          setBuyAmount('')
        }
        if (lastUpdated.field === 'TOKEN' && sellToken && buyToken) {
          const exchangeRate = getExchangeRate(sellToken, buyToken)
          setExchangeRate(exchangeRate)
        }
      }
    } else if (lastUpdated.category === 'BUY') { // user updated the buy field
      if (sellToken && buyToken && buyAmount) { // get the sell amount

        setSellAmount('')

        const exchangeRate = getExchangeRate(sellToken, buyToken)
        setExchangeRate(exchangeRate)

        if (exchangeRate) {
          setSellAmount(Number((buyAmount * exchangeRate).toPrecision(8)))
        }
        setLastUpdated(emptyLastUpdated)
      } else if (buyAmount === '') { // deleted the buy field, clear the sell field
        if (lastUpdated.field === 'AMOUNT') {
          setSellAmount('')
        }
        if (lastUpdated.field === 'TOKEN' && sellToken && buyToken) {
          const exchangeRate = getExchangeRate(sellToken, buyToken)
          setExchangeRate(exchangeRate)
        }
      }
    } else if (lastUpdated.field === 'TOKEN' || lastUpdated.category === '') {
      if (sellToken && buyToken && !sellAmount && !buyAmount) {
        const exchangeRate = getExchangeRate(sellToken, buyToken)
        setExchangeRate(exchangeRate)
      } 
    }
  }, [sellToken, buyToken, sellAmount, buyAmount])

  const handleSellToken = (tokenSymbol : string) => {
    if (tokenSymbol === buyToken) {
      setBuyToken(null)
      setBuyAmount('')
      setSellAmount('')
      setExchangeRate(null)
    }

    setSellToken(tokenSymbol)
    setLastUpdated(
      {
        category: 'SELL',
        field: 'TOKEN'
      }
    )
  }

  const handleBuyToken = (tokenSymbol : string) => {
    if (tokenSymbol === sellToken) {
      setSellToken(null)
      setSellAmount('')
      setBuyAmount('')
      setExchangeRate(null)
    }
    setBuyToken(tokenSymbol)
    setLastUpdated(
      {
        category: 'BUY',
        field: 'TOKEN'
      }
    )
  }

  const handleBuyAmount = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLastUpdated({
      category: 'BUY',
      field: 'AMOUNT'
    })

    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBuyAmount(value === '' ? '' : Number(value));
    }
  }

  const handleSellAmount = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setLastUpdated({
      category: 'SELL',
      field: 'AMOUNT'
    })
    
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setSellAmount(value === '' ? '' : Number(value));
    }
  }

  const handleSwap = () => {
    setSellToken(buyToken)
    setBuyToken(sellToken)
    setSellAmount(buyAmount ? buyAmount : '')
    setBuyAmount(sellAmount ? sellAmount : '')
    setExchangeRate(exchangeRate ? 1 / exchangeRate : null)
  }

  return (
    <div className="h-screen flex items-center justify-center w-screen bg-gray-100">
      <div className="container p-4 flex flex-col gap-y-2 max-w-lg">
        <h2 className="text-4xl font-semibold mb-4 text-center text">Swap</h2>

        <div>
          <div className="flex flex-row p-2 border-grey-100 justify-between gap-x-4 rounded-xl p-4 bg-white"> {/* from box */}
            <div className="flex flex-col min-w-0 gap-y-2">
              <label htmlFor="input-amount">You send</label>
              <input className="shrink h-10 text-3xl focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              autoComplete="off" placeholder="0" type="number" min="0" id="input-amount"
              value={
                sellAmount
              } onChange={handleSellAmount} onKeyDown={e => {
                if (e.key === '-') {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}/>
              <p className="text-md text-gray-400">~${
                  sellToken && sellAmount !== '' ? getTokenUSDValue(sellToken, Number(sellAmount)) : ''
                }</p>
            </div>
            <TokenSelect token={sellToken} handleSetToken={handleSellToken}/>
          </div>

          <div className="relative flex justify-center h-4"> {/* swap button */}
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2
             group w-fit p-2 border-2 border-slate-200 rounded-full transition bg-gray-100 hover:bg-gray-200 hover:drop-shadow-md" onClick={handleSwap}>
              <span className="hidden group-hover:inline">
                <img src={`/arrow-swap-vertical.svg`} className="w-10"/>
              </span>
              <span className="inline group-hover:hidden">
                <img src={`/arrow-down.svg`} className="w-10"/>
              </span>
            </button>
          </div>

          <div className="flex flex-row p-2 border-grey-100 justify-between gap-x-4 rounded-xl p-4 bg-white"> {/* to box */}
            <div className="flex flex-col min-w-0">
              <label htmlFor="output-amount">You get</label>
              <input className="shrink h-10 text-3xl focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              autoComplete="off" placeholder="0" id="output-amount" type="number" min="0"
              value={buyAmount} onChange={handleBuyAmount} onKeyDown={e => {
                if (e.key === '-') {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}/>
              <p className="text-md text-gray-400">~${
                  buyToken && buyAmount !== '' ? getTokenUSDValue(buyToken, Number(buyAmount)) : ''
                }</p>
            </div>
            <TokenSelect token={buyToken} handleSetToken={handleBuyToken}/>
          </div>
        </div>

        <div className="w-fill mb-2">
          {
            sellToken && buyToken && exchangeRate ? (
              <p>1 {buyToken} = {exchangeRate.toPrecision(8)} {sellToken}</p>
            ) : (
              <p>Select token to see exchange rate</p>
            )
          }
        </div>

        <ConnectWalletButton/>
      </div>
    </div>
  )
}

export default App
