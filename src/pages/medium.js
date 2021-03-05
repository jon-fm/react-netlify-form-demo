import React, { useState } from "react"
import { Link, navigate } from 'gatsby'
import Layout from "../components/layout"
import NetlifyForm from '../react-ssg-netlify-forms'

const IndexPage = () => {

  // Pre-Submit for validations and disabling button
  const [processing, setProcessing] = useState(false)
  const preSubmit = async () => {
    if (formValues.name.length > 0 && formValues.email.length > 0) {
      setProcessing(true)
      // Wait 2 seconds to simulate async delay (maybe user confirmation? or 
      // external checks?)
      await (new Promise(resolve => setTimeout(resolve, 2000)))
      return true
    }
    else {
      return false
    }
  }

  // Post-Submit for navigating to 'Thank You' page .. or maybe displaying 'sent!'
  // text; totally up to you!
  const postSubmit = () => {
    console.log('Sent!')
    setProcessing(false)
    navigate('/hooray')
  }

  // Simple controlled form setup
  const handleChange = e => setFormValues({ ...formValues, [e.target.name]: e.target.value })
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  })

  return (
    <Layout>
      <NetlifyForm
        formName="Medium Complexity Form"
        formValues={formValues}
        preSubmit={preSubmit}
        postSubmit={postSubmit}
        automaticHoneypot={true}
      >
        <div style={{ padding: '10px' }}>
          Your Name: <input type="text" name="name" value={formValues.name} onChange={handleChange} />
        </div>
        <div style={{ padding: '10px' }}>
          Your Email: <input type="email" name="email" value={formValues.email} onChange={handleChange} />
        </div>
        <div style={{ padding: '10px' }}>
          Message: <textarea name="message" value={formValues.message} onChange={handleChange} />
        </div>
        <div style={{ padding: '10px' }}>
          <button disabled={processing} type="submit">Send</button>
        </div>
      </NetlifyForm>
      <div>
        <Link to="/" >For a simpler form, click here</Link>
      </div>
      <div>
        <a href="https://github.com/jon-sully/react-ssg-netlify-forms-demo/blob/master/src/pages/medium.js">To see the code, click here!</a>
      </div>
    </Layout>
  )
}


export default IndexPage
