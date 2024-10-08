import './App.css';
import Footer from './footer';
import { useState, useEffect } from "react"
import TimezoneSelect from "react-timezone-select"
import { isValidPhoneNumber, formatPhoneNumber, formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input'

import PhoneInput from 'react-phone-number-input/input';

function App() {
  const [tel, setTel] = useState()
  const [fromUS, setFromUS] = useState(false)
  const [email, setEmail] = useState('')

  const isValidEmail = (email) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      .test(email)
  }

  const [selectedTimezone, setSelectedTimezone] = useState({
    value: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
  )

  const [useMail, setUseMail] = useState(false)

  useEffect(() => {
    setUseMail(Math.random() > 0.5)
  }, [])

  const validInputs = (!(useMail || !fromUS) && isValidPhoneNumber(tel ?? "")) || ((useMail || !fromUS) && isValidEmail(email));

  return (
    <div className="App" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <div className='card-container'>
        <div className='message-container'>
          <h1>Traitshift</h1>
          <p>Thank you for your interest! We are conducting a 2-week study designed to improve your extraversion and to help you become more sociable based on cutting-edge scientific evidence.</p>
          <p>We do this by sending you targeted challenges via SMS or Email.</p>
          <p>To get started, please provide your contact information.</p>
        </div> 
        <div className='input-container'>
          <h2>Join the program</h2>
          <h3>From the US?</h3>
          <label style={{
            fontSize: '1rem',
          }}>
            <input
              style={{
                marginRight: '10px'
              }}
              type="checkbox"
              checked={fromUS}
              onChange={event => setFromUS(event.target.checked)}
            />
            I am from the US 🇺🇸
          </label>

          {
            fromUS && !useMail
              ? <div>
                <h3>Phone number</h3>
                <p>You can only enter a US phone number.</p>
                <PhoneInput country="US" value={tel} onChange={setTel} placeholder="Phone number" />
                {
                  (parsePhoneNumber(tel ?? '') ?? {country: null}).country === 'US'
                  ? null
                  : <p style={{color: 'red'}}>Only valid US phone numbers are accepted.</p>
                }
                {isValidPhoneNumber(tel ?? "") ? <p style={{ color: 'green' }}><b>Valid phone number:</b> {formatPhoneNumberIntl(tel)}<br /> <b>local:</b> {formatPhoneNumber(tel)}</p> : <p style={{ color: 'red' }}><b>Invalid phone number</b></p>}
              </div>
              : <div>
                <h3>Email address</h3>
                <input style={{
                  border: '1px solid hsl(0, 0%, 80%)',
                  borderRadius: '4px',
                  minHeight: '38px',
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0 10px',
                  fontSize: '1rem'
                }} placeholder="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                {isValidEmail(email) ? <p style={{ color: 'green' }}><b>Valid email address:</b> {email}</p> : <p style={{ color: 'red' }}><b>Invalid email address</b></p>}
              </div>
          }
          <h3>Time zone</h3>
          <div className="select-wrapper">
            <TimezoneSelect value={selectedTimezone.value} onChange={setSelectedTimezone} />
          </div>
          <a 
            style={{
            display: 'block',
            padding: '18px',
            backgroundColor: validInputs ? '#333' : 'lightgray',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
            width: '100%',
            fontWeight: 'bold',
            borderRadius: '5px',
            marginTop: '4rem',
            boxSizing: 'border-box',
            pointerEvents: validInputs ? 'auto' : 'none',
            cursor: validInputs ? 'pointer' : 'not-allowed'
          }} href={`https://surveys.osc.lmu.de/${useMail || !fromUS ? 'traitshift-Mail' : 'traitshift-SMS'}?timezone=${selectedTimezone.value}&contact=${useMail || !fromUS ? email : tel}`}>Start</a>
        </div>
        
      </div>
      <Footer text="Department of Psychology, Leopoldstraße 13, 80802 Munich, Germany. Contact: team@traitshift.com. Caspar Schumacher, David Rieger, Alp Kaan Aksu, Thomas Menzel" />
    </div>
  );
}

export default App;
