#### 1. crea la carpeta Theory para guardar las tasks
#### 2. crea la carpeta Practice para guardar la actividad a desarrollar
#### 3. se crean las carpetas y se instala la dependencia sugerida
     ```
     mkdir -p domain/entities domain/services
     ```
     ```
     mkdir -p infrastructure/repositories
     ```
     ```
     mkdir -p interfaces/controllers
     ```
     ```
     mkdir -p application/use-cases
     ```
     ```
     npm install --save-dev inversify reflect-metadata
     ```
     ```
     npm install express
     ```

     #### para levantar el proyecto
       ```
       node app.js
       ```
#### rutas
     ```Post
     http://localhost:3000/products
     ```
 
    #### en postman 
    ```
    {
       "name": "Monitor",
       "price": 800,
       "category": "Electronica"
    }
    ```
    #### devolvera el objeto con un id ejemplo
    ```
    {
    "id": 1768329941936,
    "name": "Monito2r",
    "price": 450,
    "category": "Electronica"
    }    
    ```


     ```Put
     http://localhost:3000/products/{ID}/price
     ```
     #### el {ID} debe ser modificado con el id que devolvio el Post y usarlo en postman
      ```ejemplo 
      http://localhost:3000/products/{1768329941936}/price
      ``` 
      ```modificar el precio
      {
  
       "price": 454320

      }
      ```