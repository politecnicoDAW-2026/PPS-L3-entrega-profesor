import { test } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../app.js';

test('la portada responde con la versión', async () => {
  const servidor = app.listen(0);                 // 0: un puerto libre cualquiera
  try {
    const { port } = servidor.address();
    const respuesta = await fetch(`http://localhost:${port}/`);
    assert.equal(respuesta.status, 200);
    assert.match(await respuesta.text(), /versión \d+\.\d+\.\d+/);
  } finally {
    servidor.close();                             // se cierra aunque falle una comprobación
  }
});

test('la ruta de salud responde 200', async () => {
  const servidor = app.listen(0);
  try {
    const { port } = servidor.address();
    const respuesta = await fetch(`http://localhost:${port}/salud`);
    assert.equal(respuesta.status, 200);
  } finally {
    servidor.close();
  }
});
