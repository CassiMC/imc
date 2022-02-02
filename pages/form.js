import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Layout from '../components/layout'

export default function Form() {
    const [openLayout, setOpenLayout] = useState(false);
    const [imc, setImc] = useState();

    const closeLayout = async event => {
        setOpenLayout(false)   
    }

    const userInformation = async event => {
        event.preventDefault()
        const res = await fetch('/api/submit_data', {
          body: JSON.stringify({
            name: event.target.name.value,
            weight: event.target.weight.value,
            height: event.target.height.value,
            birth: event.target.birth.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
    
        const result = await res.json()
        setImc(result.imc)
        setOpenLayout(true)   
    }

  return (
    <>
      <Head>
        <title>form</title>
      </Head>
      <div>
          {
              openLayout && <Layout>
                  <h2> Votre IMC est de:{imc} </h2>
                  <p>
                    <button onClick={closeLayout} >Recommencer</button>
                  </p>  
                  <p>
                    <Link href="/form_history"><a onClick={closeLayout}> Voir Historique </a></Link>
                  </p> 
              </Layout> 
              
          }
          {
             !openLayout && <>
               <h1>Form</h1>
      <form onSubmit={userInformation}>
          <p>
          <label htmlFor="name">Entrez votre nom: </label>
          <input id="name" name="name" type="text" autoComplete="name" required />
          </p>
          <p>
          <label htmlFor="weight">Entrez votre Poids(en kg): </label>
          <input id="weight" name="weight" type="text" autoComplete="weight" required />
          </p>
          <p>
          <label htmlFor="height">Entrez votre taille(en mètres): </label>
          <input id="height" name="height" type="text" autoComplete="height" required />
          </p>
          <p>
          <label htmlFor="birth">Entrez votre date de naissance: </label>
          <input id="birth" name="birth" type="date" autoComplete="birth" required />
          </p>
          <p>
          <button type="submit">Submit</button>
          </p>     
      </form>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
              </>
          }
      </div>
    </>
  )
}