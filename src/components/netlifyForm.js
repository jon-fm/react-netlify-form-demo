import React, { useState, useEffect } from 'react'

const NetlifyForm = ({ formName, preSubmit, postSubmit, formValues, children, ...rest }) => {

  const [inNetlifyBuild, setInNetlifyBuild] = useState(true)
  useEffect(() => {
    setInNetlifyBuild(false)
  }, [])

  // Transform object to proper form data
  const encodeData = (obj) => (
    Object.entries(obj)
      .map(pair =>
        encodeURIComponent(pair[0])
        + '='
        + encodeURIComponent(pair[1])
      )
      .join('&')
      .replace(/%20/g, '+')
  )

  // Submit via POST then pass back true
  const handleSubmit = async () => {
    return (
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeData({ "form-name": formName, ...formValues })
      })
    )
  }

  // Wrapper for pre, submit, post
  const onSubmit = async (e) => {
    e.preventDefault()

    if (preSubmit()) {
      if (await handleSubmit()) {
        postSubmit && postSubmit()
      }
      else {
        throw new Error("Error submitting to Netlify") // Figure out how to handle this better
      }
    }
    else {
      console.log('preSubmit false')
    }
  }

  return (
    inNetlifyBuild
      ? <form name={formName} onSubmit={onSubmit} data-netlify="true">
        {children}
      </form>
      : <form onSubmit={onSubmit}>
        {children}
      </form>
  )
}

export default NetlifyForm
