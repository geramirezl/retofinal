/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.group(() =>{
  
  Route.group(() =>{
    Route.post("/create", "UsersController.registrar");
    Route.post("/login", "UsersController.login");
    Route.get("getUser/:id","UsersController.getUserbyID")
    Route.post("getUsers","UsersController.getUsers")
    Route.put("updateUser/:id","UsersController.update")
    }).prefix("user");
  Route.group(() =>{
    Route.post("/create", "QuestionsController.registrarPreguntaYRespuestas");
    Route.get("/getQuestions", "QuestionsController.getListarPreguntas");
    Route.delete("/deleteQuestion/:id","QuestionsController.delete");
    Route.put("/updateQuestion/:id","QuestionsController.updateQuestion");
    Route.put("/updateAnswer/:id","AnswersController.updateAnswer");
    Route.get("/getOptions/:id", "AnswersController.listAnswer");
    }).prefix("questions")
  Route.group(() =>{ 
    Route.post("/postquestions","FormsController.registrar");
    Route.get("/getquestions","FormsController.getListarPreguntasyRespuestas");//corregir

  }).prefix("form");
}).prefix("api/v1")

Route.group(() =>{
  Route.post("/registrarDocumentos","TypeDocumentsController.registrar");
  Route.get("/listarDocumentos","TypeDocumentsController.getListarDocumentos");

  Route.post("/registrarRoles","RolesController.registrar");
  Route.get("/listarRoles","RolesController.getListarRoles");

}).prefix("configure")

