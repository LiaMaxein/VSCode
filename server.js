const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hallo, Welt! Was geht? </h1>');
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Du hast eine POST-Anfrage gesendet mit den Daten:
${body}</h1>`);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Nur GET- und POST-Anfragen sind erlaubt.');
} });
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
