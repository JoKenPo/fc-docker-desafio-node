const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");

const nomes = ["Eduardo", "Wesley", "Marcia", "Daniel", "Camila", "Dany"];
let peoples = [];

app.get("/", async (req, res) => {
  const connection = mysql.createConnection(config);
  const sql = `INSERT INTO people(name) values("${
    nomes[Math.round(Math.random(6) * (5 - 0) + 0)]
  }")`;
  const peopleSQL = `SELECT name FROM people`;

  await connection.query(sql, peopleSQL, async () => {
    await connection.query(peopleSQL, (err, rows) => {
      peoples = rows;
      connection.end();

      res.send(
        `<h1>Full Cycle Rocks!</h1><ul>
        ${peoples.map((people) => {
          return `<li>${people.name}</li>`;
        })}
        </ul>`
      );
    });
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
