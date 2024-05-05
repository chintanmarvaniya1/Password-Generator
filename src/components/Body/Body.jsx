import React from 'react'
import { useCallback, useState, useEffect, useRef } from 'react'
import useCureencyData from '../../hooks/useCurrencyData'
import InputBox from "../InputBox.jsx"

function Body() {

    const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCureencyData(from)

  const options = Object.keys(currencyInfo)


  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


    return (
        <div className='bg-custom-primary-dark'>
            <div className="flex justify-center items-center h-screen ">
                <div className=" flex flex-col bg-white shadow-md rounded-md p-6">
                <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()

            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-custom-secondary-dark font-robotoCondensed text-2xl text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
                </div>
            </div>
        </div>
    )
}

export default Body