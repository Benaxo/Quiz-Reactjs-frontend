import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Main() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container'>
        <h1 className='title text-light'></h1>

        <ol>
        <li>Vous serez interrogé sur 10 questions l'une après l'autre.</li>
        <li>10 points sont attribués pour la bonne réponse.</li>
        <li>Chaque question a au minimm trois options. Vous ne pouvez choisir qu'une seule option.</li>
        <li>Vous pouvez revoir et changer les réponses avant la fin du quiz.</li>
        <li>Le résultat sera déclaré à la fin du quiz.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Commencer le Quiz</Link>
        </div>

    </div>
  )
}