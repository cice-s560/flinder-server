# FLINDER

### Variables necesarias

- PORT
- DB_PORT
- DB_URL
- DB_NAME
- SECRET_KEY
- CLIENT_AUTH_CALLBACK_URL
- CLIENT_AUTH_CALLBACK_FAILS
- GOOGLE_CLIENT_CALLBACK
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET
- SPOTIFY_CLIENT_CALLBACK
- GITHUB_CLIENT_CALLBACK
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET

### Dependencias (ENV KEYS)

Es necesario instalar un submódulo de GIT para utilizar las claves de servicios y otras variables antes mencionadas.
El repo donde están es [Flinder Keys](https://github.com/cice-s560/flinder-server-keys/).
Para instalar el submódulo debemos correr este comando:

```
git submodule add -f https://XXXXXXXX
```