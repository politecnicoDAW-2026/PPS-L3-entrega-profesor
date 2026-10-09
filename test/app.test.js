import { test } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../app.js';

test('la portada responde con la versión', async () => {
  const servidor = app.listen(0);                 // 0: un puerto libre cualquiera
  const { port } = servidor.address();
  const respuesta = await fetch(`http://localhost:${port}/`);
  assert.equal(respuesta.status, 200);
  assert.match(await respuesta.text(), /versión \d+\.\d+\.\d+/);
  servidor.close();
});
