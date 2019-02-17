# Flinder

**Nota: Esto es un proyecto correspondiente a un ejercicio de estudios, por favor tenga en cuenta que no va a tener soporte ni mejoras (por ahora)**.

Flinder es un sistema básico de autorización desarrollado en express en el que puede realizar las siguientes acciones:  

  - Puede añadir un user
  - Login con estrategia local
  - Check username y email del usuario

### Tecnología

Flinder utiliza algunos sistemas open source para su funcionamiento como son:

* [node.js] - para el backend
* [mongo] - mongo para bases de datos
* [Express] - framework de desarrollo
* [passportjs] - paquete para el middleware de acceso

### Estrategias

* [Local] - Para acceso a la API
* ~~[Netflix] - No se ha podido encontrar la API [Mas info](#Netflix)~~ **(DEPRECADA)**
* [Twitter] - Deberá obtener los datos de acceso desde su Api [Mas info](#Twitter)

### Instalación

Flinder requiere [Node.js](https://nodejs.org/) v4+ to run.

Instale las dependencias

```sh
$ npm install
```

Debe crear las variables de entorno en un archivo .env

* PORT (Puerto en el que el servidor se va a mostrar)

* DB_URL (localhost en caso de servidor local o la url)

* DB_PORT (Puerto de la base de datos Mongo)

* DB_NAME (Nombre de la base de datos Mongo)

* SECRET_KEY (Clave personal única hasheada en SHA256)

* CLIENT_AUTH_CALLBACK_URL (url de redirección exitosa)

* CLIENT_AUTH_CALLBACK_FAILS = (url de redirección en caso de fallo)

* ~~NETFLIX_API_KEY (Clave de API de Netflix [Mas info](#Netflix)~~ **(DEPRECADA)**

* ~~NETFLIX_API_SHARED_SECRET (Clave Secreta de la API de Netflix [Mas info](#Netflix)~~ **(DEPRECADA)**

* ~~CALLBACKURL (Url de vuelta al hacer login [Mas info](#Netflix)~~ **(DEPRECADA)**

* TWITTER_API_KEY (Clave de API de TWITTER [Mas info](#twitter)

* TWITTER_API_SHARED_SECRET (Clave Secreta de la API de TWITTER [Mas info](#twitter)

* TWITTER_CALLBACKURL (Url de vuelta al hacer login [Mas info](#twitter)



### Netflix

He tratado de obtener las variables de alguna api de netflix pero ya no existe [API de Netflix](https://netflix.github.io/). **(DEPRECADA)**

### Twitter

Para el correcto funcionamiento del sistema, deberá completar las claves anteriormente mencionadas desde la [API de Twitter](https://developer.twitter.com/) accediendo y registrando una app. 

Deberá añadir la URL de su callback (Ejemplo: https://{url}/auth/twitter/callback) cambiando el valor de la url y añadirlo a su variable de entorno **TWITTER_CALLBACKURL**

Una vez completado el proceso, el sistema le generará las claves que necesita completar en su entorno, que serán dos:
* API Key -> TWITTER_API_KEY
* Secret key -> TWITTER_API_SHARED_SECRET

Una vez finalizado el proceso podrá acceder.



### Códigos de Error

Para evitar intrusión en el sistema y posibles ataques (no sé si es lo más correcto) el sistema devuelve una serie de códigos de error que puede conocer a continuación:

1. Error 001: Incorrect username
2. Error 002: Incorrect password
3. Error 003: User not found


License

MIT
