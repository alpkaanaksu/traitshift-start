import './App.css';

import { useState, useEffect } from "react"
import TimezoneSelect from "react-timezone-select"
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber, formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'

function App() {
  const [tel, setTel] = useState()
  const [fromUS, setFromUS] = useState(false)
  const [email, setEmail] = useState('')

  const [selectedTimezone, setSelectedTimezone] = useState({
    value: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
  )

  const [useMail, setUseMail] = useState(false)

  useEffect(() => {
    setUseMail(Math.random() > 0.5)
  }, [])

  return (
    <div className="App" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1>Sociability Improvement Program</h1>
        <p>Hi!</p>

        <h3>From the US</h3>
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
              <PhoneInput defaultCountry="US" value={tel} onChange={setTel} />
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
            </div>
        }
        <h3>Time zone</h3>
        <div className="select-wrapper">
          <TimezoneSelect value={selectedTimezone.value} onChange={setSelectedTimezone} />
        </div>
        <a style={{
          display: 'block',
          padding: '10px',
          backgroundColor: 'black',
          color: 'white',
          textDecoration: 'none',
          textAlign: 'center',
          width: '100%',
          fontWeight: 'bold',
          borderRadius: '5px',
          marginTop: '3rem',
          boxSizing: 'border-box',
          pointerEvents: isValidPhoneNumber(tel ?? "") || email ? 'auto' : 'none'
        }} href={`https://surveys.osc.lmu.de/${useMail || !fromUS ? 'MockMockMail' : 'MockMockSMS'}?timezone=${selectedTimezone.value}&contact=${useMail || !fromUS ? email : tel}`}>Start</a>
      </div>
    </div>
  );
}

export default App;
