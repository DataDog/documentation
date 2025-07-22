Usa este procesador para añadir un nombre de campo y el valor de una variable de entorno al mensaje del log.

Para configurar este procesador:

1. Define una [consulta de filtro](#filter-query-syntax). Solo se procesan los logs que coinciden con la consulta de filtro especificada. Todos los logs, independientemente de si coinciden con la consulta del filtro o no, se envían al siguiente paso del pipeline.
1. Introduce el nombre del campo para la variable de entorno.
1. Introduce el nombre de la variable de entorno.
1. Haz clic en **Add Enviroment Variable (Añadir variable de entorno)** si deseas añadir otra variable de entorno.

##### Variables de entorno bloqueadas

Las variables de entorno que coincidan con alguno de los siguientes patrones no podrán añadirse a los mensajes del log porque esta podría contener datos confidenciales.

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

La variable de entorno se compara con el patrón y no con la palabra literal. Por ejemplo, `PASSWORD` bloquea las variables de entorno como `USER_PASSWORD` y `PASSWORD_SECRET` para que no se añadan a los mensajes del log.

##### Lista de permisos

Después de haber añadido procesadores a tu pipeline y haber hecho clic en **Next: (Siguiente:) Install (Instalar)**, en el campo **Add environment variable processor(s) allowlist (Añadir variables de entorno del procesador a la lista de permitidos)**, introduce una lista separada por comas de las variables de entorno de las que quieres extraer valores y utilizar con este procesador.

La lista de permitidos se almacena en la variable deentorno `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.