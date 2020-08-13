import React from "react"
import { Link } from 'gatsby'
import Layout from "../components/layout"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <p>
          Yay, you submitted the form! Woohoo!
        </p>
      </div>
      <div>
        <Link to="/" >For a simpler form, click here</Link>
      </div>
      <div>
        <Link to="/medium" >For a bit more complex form, click here</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
