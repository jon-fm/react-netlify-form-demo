import React, { useState, useEffect } from 'react'

const NetlifyForm = ({
  formName,
  preSubmit,
  postSubmit,
  formValues,
  children,
}) => {
  /* 

  Automatic Honeypot ✅

  API: 
    formName
    formValues
    
  Optional:
    preSubmit (return true, else no-op)
    postSubmit (no return necessary)
    automaticHoneypot

  TODO:
    Async support for preSub and postSub?
    Honeypot

  */

  // Complicated stuff to keep things well-hidden during runtime (and from bots)
  // but exposed for netlify build bots
  const [inNetlifyBuild, setInNetlifyBuild] = useState(true)
  useEffect(() => {
    setInNetlifyBuild(false)
  }, [])

  // Honeypot Input state
  const [honey, setHoney] = useState('')


  const formEncodeString = (str) => encodeURIComponent(str).replace(/%20/g, '+')

  // Transform object to proper form data
  const encodeData = (obj) => (
    Object.entries(obj)
      .map(pair =>
        formEncodeString(pair[0])
        + '='
        + formEncodeString(pair[1])
      )
      .join('&')
  )



  // Submit via POST then pass back true
  const handleSubmit = async () => {
    return (
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeData({
          ...formValues,
          "form-name": formName,
          infoo: honey
        })
      })
    )
  }

  // Wrapper for pre, submit, post
  const onSubmit = async (e) => {
    e.preventDefault()

    if ((preSubmit && preSubmit()) || !preSubmit) {
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
      ? <form name={formName} onSubmit={onSubmit} data-netlify="true" netlify-honeypot="infoo">
        {children}
      </form>
      : <form onSubmit={onSubmit}>
        {children}
        <p style={{ opacity: '0', position: 'absolute', top: '0', left: '0' }}>
          <input style={{ width: '0', height: '0', zIndex: '-1' }} name="description" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </p>
      </form>
  )
}

export default NetlifyForm
