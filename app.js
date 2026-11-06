// La aplicación: dos rutas. Se separa del arranque (servidor.js) para poder probarla.
import express from 'express';
import paquete from './package.json' with { type: 'json' };

export const app = express();

// Portada: dice qué versión está desplegada
app.get('/', (req, res) => {
  res.send(`Hola desde la versión ${paquete.version}`);
});

// Salud: la consulta el HEALTHCHECK de la imagen
app.get('/salud', (req, res) => {
  res.json({ estado: 'ok' });
});
