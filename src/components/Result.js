import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';


export default function Result() {

    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)


    /** store user result */
    usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

  return (
    <div className='container'>
        <h1 className='title text-light'></h1>

        <div className='result flex-center'>
            <div className='flex'>
            <span>Nom d'utilisateur</span>
            <span className='bold'>{userId || ""}</span>
        </div>
        <div className='flex'>
            <span>Total des points du Quiz : </span>
            <span className='bold'>{totalPoints || 0}</span>
        </div>
        <div className='flex'>
            <span>Total des questions : </span>
            <span className='bold'>{ queue.length || 0}</span>
        </div>
        <div className='flex'>
            <span>Total des réponses : </span>
            <span className='bold'>{attempts || 0}</span>
        </div>
        <div className='flex'>
            <span>Total des points gagnés : </span>
            <span className='bold'>{earnPoints || 0}</span>
        </div>
        <div className='flex'>
            <span>Résultat du Quiz</span>
            <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Réussi" : "Échoué"}</span>
        </div>
    </div>

    <div className="start">
        <Link className='btn' to={'/'} onClick={onRestart}>Redémarrer</Link>
    </div>

        <div className="container">
            {/* result table */}
            <ResultTable></ResultTable>
        </div>
    </div>
  )
}