import { useState } from 'react'
import { tokenOptions } from '../../info'

function Token ({tokenSymbol, handleSetToken, closeOverlay} : {
  tokenSymbol : string,
  handleSetToken : (tokenSymbol : string) => void,
  closeOverlay : () => void
}) {
    return (
        <div
          className="flex items-center p-4 hover:bg-gray-200 cursor-pointer rounded-md"
          onClick={() => {
            handleSetToken(tokenSymbol)
            closeOverlay()
          }}
        >
          <img src={`/${tokenSymbol}.svg`} alt="token" className="w-8 h-8 mr-4" />
          <p className="text-xl font-semibold">{tokenSymbol}</p>
        </div>
    )
}

function TokenSelect({handleSetToken, token} : {handleSetToken : (tokenSymbol : string) => void, token : string | null}) {
    const [visible, setVisible] = useState(false)
    const [searchInput, setSearchInput] = useState<string>('')


    const showOverlay = () => {
      setVisible(true)
    } 
    const hideOverlay = () => {
      setVisible(false)
      setSearchInput('')
    } 

    const handleSearchInput = (e : React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
    }

    const handleKeyDown = (event : React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideOverlay()
      }
    };

    const autoFocus = (element: HTMLDivElement) => {
      if (element && !element.contains(document.activeElement)) {
        element.focus();
      }
    };

    return (
        <div className="flex items-center max-w-fit shrink-0">
          <div
            onClick={showOverlay}
            className="px-2 py-1 items-center text-center bg-gray-300 text-black font-semibold rounded-full hover:bg-gray-400 transition flex flex-row"
          > 
            {
              token == null ? 
                (
                  <div className="flex flex-row items-center">
                    <img src={`circle-filled.svg`} alt="token" className="w-6 h-6 mr-1" />
                    <img src={`dropdown-arrow.svg`} alt="dropdown-arrow" className="w-4 h-4" />
                  </div>
              )
              : (<div className="flex flex-row items-center">
                  <img src={`/${token}.svg`} alt="token" className="w-6 h-6 mr-2" />
                  <p className="mr-1">{token}</p>
                  <img src={`dropdown-arrow.svg`} alt="dropdown-arrow" className="w-4 h-4" />
                </div>)
            }
          </div>
    
          {visible && (
            <div
              ref={autoFocus}
              tabIndex={-1} 
              role="dialog"
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={hideOverlay}
              onKeyDown={handleKeyDown}
            >
              <div
                className="h-5/6 w-1/4 min-w-52 max-h-screen bg-white p-6 rounded-lg shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing
              >
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-md font-medium text-gray-600">Select Token</p>
                    <div className="hover:bg-gray-200 p-1 rounded-full cursor-pointer" onClick={hideOverlay}>
                      <img src={`/cross-small.svg`} alt="token" className="w-6 h-6"/>
                    </div>
                  </div>
                  <div>
                    <input type='text' value={searchInput} onChange={handleSearchInput} placeholder='Search token symbol' 
                    className="w-full p-2 mt-2 mb-4 rounded-md border-2"
                    />
                  </div>
                </>
                <div className="overflow-y-auto h-full rounded-md">
                  {tokenOptions.slice()
                  .filter((token) => token.toLowerCase().includes(searchInput.toLowerCase()))
                  .map((token) => (
                    <Token
                      key={token}
                      tokenSymbol={token}
                      handleSetToken={handleSetToken}
                      closeOverlay={hideOverlay}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
    );
}
    
export default TokenSelect;