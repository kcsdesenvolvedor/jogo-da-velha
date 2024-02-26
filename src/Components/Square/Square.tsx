import { useState } from 'react';
import './Square.css';

interface ButtonValue {
  id: string,
  value: string,
}


export default function Square({ value, onSquareClick }: {value: ButtonValue, onSquareClick: () => void }) {

  return (
    <button id={value.id} className='square' onClick={onSquareClick}>{ value.value }</button>
  )
}
