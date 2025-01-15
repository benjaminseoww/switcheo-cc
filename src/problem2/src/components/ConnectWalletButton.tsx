import { useState } from 'react';

function ConnectWalletButton() {
    const [visible, setVisible] = useState(false)

    const showOverlay = () => {
      setVisible(true)
    } 
    const hideOverlay = () => {
      setVisible(false)
    } 

    return (
        <div>
          <button 
            onClick={showOverlay}
            className="p-4 w-full rounded-xl bg-button-light-blue text-switcheo-blue hover:bg-hover-button-blue"
            >Connect Wallet</button>
    
          {visible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={hideOverlay}
            >
              <div
                className="w-1/4 min-w-52 max-h-screen bg-white p-6 rounded-lg shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing
              >
                <div className="flex items-center justify-between">
                  <p className="text-md font-medium text-gray-600">Connect a Wallet</p>
                  <div className="hover:bg-gray-200 p-1 rounded-full cursor-pointer" onClick={hideOverlay}>
                    <img src={`/cross-small.svg`} alt="token" className="w-6 h-6"/>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    );
}
    
export default ConnectWalletButton;