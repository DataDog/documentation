---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentación
  text: Paquete de compilación de Heroku de Datadog
private: true
title: Configuración de Heroku Postgres para la monitorización de bases de datos
---

Esta guía asume que has configurado el [paquete de compilación de Datadog Heroku][1] en tus dynos de aplicación.

[La Monitorización de base de datos de Datadog][2] te permite ver las métricas de consulta y explicar los planes de todas tus bases de datos en un único lugar. Esta guía explica cómo configurar la Monitorización de base de datos para una base de datos gestionada por [Heroku Postgres][3].

*Nota*: Solo las bases de datos en los [planes Standard y Premium][4] publican métricas utilizadas por la integración. No todas las características de la Monitorización de base de datos están disponibles cuando se utiliza con una instancia de Postgres en el plan Hobby.

En primer lugar, crea un usuario `datadog` en tu base de datos:

```shell
# Asegúrate de estar en el directorio raíz de la aplicación
heroku pg:credentials:create --name datadog

# Adjunta la nueva credencial a la aplicación
heroku addons:attach <database-name> --credential datadog
```

Al adjuntar la nueva credencial a la aplicación se crea una nueva variable de entorno en tu aplicación con la URL de conexión. Ten en cuenta esa variable de entorno, ya que la utilizarás más adelante.

Inicia sesión en tu base de datos de Postgres utilizando las credenciales predeterminadas y otorga a la credencial `datadog` los permisos adecuados:

```shell
heroku pg:psql
```

Una vez en el terminal psql, crea el siguiente esquema:

```
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Crea la siguiente función en la base de datos:

```
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

Por último, configura el Datadog Agent para habilitar el check de Postgres utilizando las nuevas credenciales:

```shell
# Asegúrate de que estás en el directorio raíz de tu aplicación
# Crea la carpeta para la configuración de integraciones en tu código de aplicación
mkdir -p datadog/conf.d/
```

Crea un archivo de configuración llamado `postgres.yaml` con el siguiente contenido (no lo sustituyas por tus credenciales, ya que esto se hace como parte del script de preejecución):

```yaml
init_config:

instances:
  - dbm: true
    host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

Con la variable de entorno que se creó cuando se adjuntó la credencial `datadog` a la aplicación (en el ejemplo siguiente, se supone que es `HEROKU_POSTGRESQL_PINK_URL`), añade lo siguiente al [script de preejecución][5] para reemplazar esos valores antes de iniciar el Datadog Agent:

```bash
#!/usr/bin/env bash

# Actualiza la configuración de Postgres anterior con la variable de entorno de la aplicación de Heroku
if [ -n "$HEROKU_POSTGRESQL_PINK_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_PINK_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Haz el despliegue en Heroku:

```shell
# Haz el despliegue en Heroku
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[1]: /es/agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[5]: /es/agent/basic_agent_usage/heroku/#prerun-script