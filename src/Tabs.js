import checked_icon from './check_icon.png';
import green_energy from './green_energy.png';


import { useState, useEffect} from "react";

import "./App2.css";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);


  const [mydata,setData]=useState([]);
  const [paid,setPaid]=useState([]);
  const [notPaid,setNotPaid]=useState([]);
  const [totalToPay,setTotalToPay]=useState([]);
  
  const url = 'https://test.soan-solutions.io/Test_front/datas'

  const headers = new Headers()
  const getData=()=>{
    
    fetch(url,{method:"GET",headers: headers})
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson.payments);
        const paid = myJson.payments.filter(bill => bill.payedDate);
        const notPaid =  myJson.payments.filter(bill => !bill.payedDate);
        setPaid(paid);
        setNotPaid(notPaid);
        
      });
  }
  useEffect(()=>{
    getData()
  },[])



  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
      
      
    <div className="container rectangle">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Factures à payer
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Factures payées
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
            {paid && paid.length > 0  && paid.map(item => (
                <ul className="my-row">
                            
                    <li className='checkicon'><img src={checked_icon} alt="check" /></li>
                    <li><div className="billName">{item.invoiceNumber}</div><div className="billDeadline">A régler avant le {item.maxDaysToPay}</div></li>
                    <li>
                        {
                            item.multiPaymentStatus=="AVAILABLE"? <div className="paymentType"><img src={green_energy} /> 3x fois sans frais</div> : ""                          
                        }
                        {
                            item.multiPaymentStatus=="AVAILABLE"? <div className="availability">Disponible</div> : ""                          
                        }

                    </li>
                    <li className="amount">{item.amount} &euro;</li>
                </ul>

                  ))
              }

            <button id="payButton">Payer {totalToPay} &euro;</button>
          
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          {notPaid && notPaid.length > 0  && notPaid.map(item => (
            <ul className="my-row">
                        
                <li><div className="billName">{item.invoiceNumber}</div><div className="billDeadline">Réglé le {item.maxDaysToPay}</div></li>
                <li>
                    {
                        item.multiPaymentStatus=="AVAILABLE"? <div className="paymentType"><img src={green_energy} /> 3x fois sans frais</div> : ""                          
                    }
                    {
                        item.multiPaymentStatus=="AVAILABLE"? <div className="availability">Disponible</div> : ""                          
                    }

                </li>
                <li className="amount">{item.amount} &euro;</li>
            </ul>

                ))
            }
        </div>

      </div>

    </div>
  );
}



export default Tabs;