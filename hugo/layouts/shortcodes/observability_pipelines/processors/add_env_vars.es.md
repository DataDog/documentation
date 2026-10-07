Utiliza este procesador para añadir un nombre de campo y el valor de una variable de entorno al mensaje de log.

Para configurar este procesador:

1. Define una [consulta de filtro](#filter-query-syntax). Sólo se procesan los logs que coinciden con la consulta de filtro especificada. Todos los logs, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso del pipeline.
1. Introduce el nombre del campo para la variable de entorno.
1. Introduce el nombre de la variable de entorno.
1. Haz clic en **Add Environment Variable** (Añadir variable de entorno) si deseas añadir otra variable de entorno.

##### Variables de entorno bloqueadas

Las variables de entorno que coincidan con alguno de los siguientes patrones no podrán añadirse a los mensajes de log porque la variable de entorno podría contener datos confidenciales.

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

La variable de entorno coincide con el patrón y no con la palabra literal. Por ejemplo, `PASSWORD` bloquea las variables de entorno como `USER_PASSWORD` y `PASSWORD_SECRET` para que no se añadan a los mensajes de log.