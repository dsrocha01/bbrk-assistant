// server.js
// where your node app starts
console.log('Startando...');



// init project
const express = require("express");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

//https://bbrk-webhook.glitch.me/bbrkwebhook

app.post("/bbrk", function(request, response) {

    console.log('AI!');
    
  var intentName = request.body.queryResult.intent.displayName;

  if (intentName == "bbrk.boasvindas.busca") {
    var parameters = request.body.queryResult.parameters;

    //Parametro inteiro
    var tipoImovel = parameters["tipo-imovel"];
    var quantidadeComodos = parameters["comodos"];
    var bairroP = parameters["bairro"];
    var cidadeP = parameters["cidade"];
    var estadoP = parameters["estado"];
    
    //Quebra do parametro em array
    //var bairroQ = bairroP != "" ? bairroP.split(" ") :"";
    //var cidadeQ = cidadeP != "" ? cidadeP.split(" ") :"";
    //var estadoQ = estadoP != "" ? estadoP.split(" ") :"";
    
    //var bairroQ = splitaString(bairroP);
    //var bairroQ = bairroP.split(" ").map(val => Number(val) + 1);
    
    response.json({
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech:
                    "Certo, já coletei os dados para busca, basta clicar no link a seguir para visualizar o resultado. " 
                }
              },
              {
                basicCard: {
                  title: "Busca de Imóveis Brasil Brokers",
                  //"subtitle": tipoImovel +" "+ quantidadeComodos +" "+ localidade,
                  //"formattedText": "This is a basic card.",
                  image: {
                    url: "https://dev.brasilbrokers.com.br/mina.png",
                    accessibilityText: "Olá, eu sou a Mina !"
                  },
                  buttons: [
                    {
                      title: "  Clique Aqui  ",
                      openUrlAction: {
                        //"url": "https://dev.brasilbrokers.com.br/busca/?tipologia="+tipoImovel+"&dormitorio="+quantidadeComodos+"&localizacao="+localidade
                        url: "https://dev.brasilbrokers.com.br/"
                      }
                    }
                  ],
                  imageDisplayOptions: "CROPPED"
                }
              },
              {
                simpleResponse: {
                  textToSpeech:
                    "Espero que encontre o imóvel que busca, até mais ! ! !"
                }
              }
            ]
          }
        }
      }
    });

    //Variaveis finais
    var bairro = "";
    var cidade = "";
    var estado = "";
    var localidade = "";

    if (tipoImovel != "") {
      //montagem para o bairro formatado
      for (var i = 0; i < bairroQ.length; i++) {
        if (i == 0) {
          bairro += bairroQ[i].toLocaleLowerCase();
        } else {
          bairro += "-" + bairroQ[i].toLocaleLowerCase();
        }
      }

      //montagem para a cidade formatada
      for (var i = 0; i < cidadeQ.length; i++) {
        if (i == 0) {
          cidade += cidadeQ[i].toLocaleLowerCase();
        } else {
          cidade += "-" + cidadeQ[i].toLocaleLowerCase();
        }
      }

      //montagem para o estado formatado
      for (var i = 0; i < estadoQ.length; i++) {
        if (i == 0) {
          estado += estadoQ[i].toLocaleLowerCase();
        } else {
          estado += "-" + estadoQ[i].toLocaleLowerCase();
        }
      }

      localidade = bairro + "|" + cidade + "|" + estado;
      //localidade = "barra-da-tijuca|rio-de-janeiro|rj";

      response.json({
        payload: {
          google: {
            expectUserResponse: true,
            richResponse: {
              items: [
                {
                  simpleResponse: {
                    textToSpeech:
                      "Certo, já coletei os dados para busca, basta clicar no link a seguir para visualizar o resultado."
                  }
                },
                {
                  basicCard: {
                    title: "Busca de Imóveis Brasil Brokers",
                    //"subtitle": tipoImovel +" "+ quantidadeComodos +" "+ localidade,
                    //"formattedText": "This is a basic card.",
                    image: {
                      url: "https://dev.brasilbrokers.com.br/mina.png",
                      accessibilityText: "Olá, eu sou a Mina !"
                    },
                    buttons: [
                      {
                        title: "  Clique Aqui  ",
                        openUrlAction: {
                          //"url": "https://dev.brasilbrokers.com.br/busca/?tipologia="+tipoImovel+"&dormitorio="+quantidadeComodos+"&localizacao="+localidade
                          url: "https://dev.brasilbrokers.com.br/"
                        }
                      }
                    ],
                    imageDisplayOptions: "CROPPED"
                  }
                },
                {
                  simpleResponse: {
                    textToSpeech:
                      "Espero que encontre o imóvel que busca, até mais ! ! !"
                  }
                }
              ]
            }
          }
        }
      });
    }
  }
});


function splitaString(string){
   return string.length > 0 ? string.split(" ") : "";
}

// listen for requests :)
// const listener = app.listen(process.env.PORT, function() {
//   console.log("Your app is listening on port " + listener.address().port);
// });

//let intentMap = new Map();
