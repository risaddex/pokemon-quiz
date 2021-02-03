import db from '../../db.json';

function dbHandler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Acess-Control-Allow-Credentials', true);
  res.setHeader('Acess-Control-Allow-Origin', '*');
  res.setHeader('Acess-Control-Allow-Methods', 'GET, OPTIONS, PATCH, POST');

  res.json(db);
}
// permite que compartilhamos nosso db com outros (CORS)
export default dbHandler;
