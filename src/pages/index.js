import React, { useState } from "react"
import { Link, navigate } from 'gatsby'
import Layout from "../components/layout"
import NetlifyForm from '../react-ssg-netlify-forms'

const IndexPage = () => {

  // Post-Submit Navigate
  const postSubmit = () => {
    navigate('/hooray')
  }

  // Simple controlled form setup
  const handleChange = e => setFormValues({ ...formValues, [e.target.name]: e.target.value })
  const [formValues, setFormValues] = useState({
    name: '',
    message: ''
  })

  return (
    <Layout>

      <NetlifyForm formName="Very Simple Form" formValues={formValues} postSubmit={postSubmit} recaptcha={false} >
        <div>
          Your Name: <input type="text" name="name" value={formValues.name} onChange={handleChange} required />
        </div>
        <div>
          Message: <textarea name="message" value={formValues.message} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </NetlifyForm>

      <div>
        <Link to="/medium" >For a bit more complex form, click here</Link>
      </div>
      <div>
        <a href="https://github.com/jon-sully/react-netlify-form-demo/blob/master/src/pages/index.js">To see the code, click here!</a>
      </div>
    </Layout>
  )
}


export default IndexPage
