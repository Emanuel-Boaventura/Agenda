let contato = {
  nome: "emanuel",
  sobrenome: "matos",
  email: "emanuel@123",
  telefone: "12314445",
};

let usuario = {
  userName: "Teiji",
  userPassword: "1234",
  contatos: [contato],
};

// usuario.contatos.push({
//   nome: "jose",
//   sobrenome: "mat",
//   email: "eadfsdfagfel@123",
//   telefone: "128888888845",
// });

function cleanUP() {
  usuario.contatos.map((el) => {
    console.log(el.nome);
  });
  // usuario.contatos.forEach((element) => {
  //   for (let chave in element) {
  //     console.log(element[chave]);
  //   }
  // });
}

cleanUP();
