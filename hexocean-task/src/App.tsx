import React from 'react';
import Form from './Form.tsx'
import ExForm from './ExForm.tsx'

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <p>
          Hello world!
        </p>
        <Form />
        <ExForm />
      </header>
    </div>
  );
}

export default App;
