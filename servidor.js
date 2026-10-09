// Arranca la aplicación en el puerto 3000 (o en el de la variable PUERTO)
import { app } from './app.js';

const puerto = process.env.PUERTO ?? 3000;
app.listen(puerto, () => console.log(`Escuchando en el puerto ${puerto}`));
