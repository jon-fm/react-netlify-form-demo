import React, { useState } from "react"

import Layout from "../components/layout"
import NetlifyForm from '../components/netlifyForm'

const IndexPage = () => {
  const preSubmit = () => {
    return formValues.email === "foo@bar.com"
  }

  const postSubmit = () => {
    console.log('Sent!')
  }

  const handleChange = e => setFormValues({ ...formValues, [e.target.name]: e.target.value })
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' })

  return (
    <Layout>
      <div>
        {/* 

        API: 
          formName
          formValues
          preSubmit (return true, else no-op)
          postSubmit (no return necessary)
        
        Optional:
          automaticHoneypot

         */}
        <NetlifyForm
          formName="test-form"
          formValues={formValues}
          preSubmit={preSubmit}
          postSubmit={postSubmit}
          automaticHoneypot={true}
        >
          <div>
            Your Name: <input type="text" name="name" value={formValues.name} onChange={handleChange} />
          </div>
          <div>
            Your Email: <input type="email" name="email" value={formValues.email} onChange={handleChange} />
          </div>
          <div>
            Message: <textarea name="message" value={formValues.message} onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </NetlifyForm>
      </div>
    </Layout>
  )
}


export default IndexPage
