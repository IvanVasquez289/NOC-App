# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura limpia con Typescript

# dev

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
```
    PORT=3000

    MAILER_EMAIL=
    MAILER_SECRET_KEY=

    PROD=true
```
3. Ejecutar el comando ```npm install ``` para instalar los modulos de node

4. Levantar las bases de datos con el comando
```
    docker compose up -d
```
5. Ejecutar el comando ```npm run dev ``` para iniciar la app

## Obtener gmail key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords?rapt=AEjHL4Pl7ULsieO6HPx1-WpDwvlm9aH-wTQE4_F6scvzFe4S5i6mMv7zZz5jAeoVBH-vgWAovq4PnCJlt8KnWRWXJqKIdf5Kh73gMyK5Y6QCmW4YC-1wx9U)