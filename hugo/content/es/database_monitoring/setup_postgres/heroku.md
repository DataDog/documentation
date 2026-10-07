---
aliases:
- /es/database_monitoring/guide/heroku-postgres/
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentación
  text: Paquete de compilación de Heroku de Datadog
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Captura de valores de parámetros de consulta SQL
private: true
title: Configuración de Heroku Postgres para la monitorización de bases de datos
---

Esta guía asume que has configurado el [paquete de compilación de Datadog Heroku][1] en tus dynos de aplicación.

[La Monitorización de base de datos de Datadog][2] te permite ver las métricas de consulta y explicar los planes de todas tus bases de datos en un único lugar. Esta guía explica cómo configurar la Monitorización de base de datos para una base de datos gestionada por [Heroku Postgres][3].

*Nota*: Solo las bases de datos en los [planes Standard y Premium][4] publican métricas utilizadas por la integración. No todas las características de la Monitorización de base de datos están disponibles cuando se utiliza con una instancia de Postgres en el plan Hobby.

## Preparación de la base de datos de Postgres

En primer lugar, crea un usuario `datadog` en tu base de datos:

``` shell
# Ensure that you are in the root directory of the application
heroku pg:credentials:create --name datadog

# Attach the new credential to the application
heroku addons:attach <database-name> --credential datadog
```

Al adjuntar la nueva credencial a la aplicación se crea una nueva variable de entorno en tu aplicación con la URL de conexión. Ten en cuenta esa variable de entorno, ya que la utilizarás más adelante.

Inicia sesión en tu base de datos de Postgres utilizando las credenciales predeterminadas y otorga a la credencial `datadog` los permisos adecuados:

``` shell
heroku pg:psql
```

Una vez en el terminal psql, crea el siguiente esquema:

``` sql
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Crea la siguiente función en la base de datos:

``` sql
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

## Configuración de la integración de Postgres

A continuación, configura el Datadog Agent para activar la integración de Postgres, utilizando una de las dos opciones siguientes.

**Opción A**: Utilizar un buildpack para crear una configuración de Postgres estática que no pueda ser modificada. Además, Database Monitoring puede habilitarse a través de este método.

**Opción B**: Crear una configuración de Postgres personalizada con la capacidad de habilitar características adicionales que no están disponibles a través de la configuración estática en la Opción A.

{{< tabs >}}
{{% tab "Option A: Static Configuration" %}}
### Configuración estática

Para permitir que la integración de Postgres recopile métricas estándar, establece `DD_ENABLE_HEROKU_POSTGRES` en true y, a continuación, vuelve a compilar la aplicación:

``` shell
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
git commit --allow-empty -m "enabled postgres integration"
git push heroku main
```

Para habilitar tanto la integración de Postgres como Database Monitoring, establece `DD_ENABLE_HEROKU_POSTGRES` y `DD_ENABLE_DBM` en true:

``` shell
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
heroku config:add DD_ENABLE_DBM=true
git commit --allow-empty -m "enabled postgres integration with DBM"
git push heroku main
```

La integración de Postgres y, si está activada, Database Monitoring, comenzará a recopilar métricas.
{{% /tab %}}

{{% tab "Option B: Custom Configuration" %}}
### Configuración personalizada

<div class="alert alert-danger">
<strong>Importante</strong>: Si has probado primero la opción A y necesitas eliminar las configuraciones <code>DD_ENABLE_HEROKU_POSTGRES</code> y <code>DD_ENABLE_DBM</code>, utiliza los comandos que se indican a continuación:

``` shell
heroku config:unset DD_ENABLE_HEROKU_POSTGRES
heroku config:unset DD_ENABLE_DBM
```
</div>

En primer lugar, busca la cadena de conexión para que el usuario de Datadog se conecte a Postgres al ejecutar `heroku config` y localizar la variable `HEROKU_POSTGRESQL_<COLOR>_URL`.

El componente `<COLOR>` del nombre de la variable difiere según el usuario. En el siguiente ejemplo, el componente `<COLOR>` es `IVORY`. Copia o anota la cadena de conexión que se encuentra en tu variable `HEROKU_POSTGRESQL_<COLOR>_URL`.

``` bash {hl_lines=[9]}
=== immense-scrubland-xxxxx Config Vars
DATABASE_URL:                   postgres://<ADMIN_USER>:<ADMIN_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>
DD_API_KEY:                     *****
DD_DYNO_HOST:                   true
DD_SITE:                        datadoghq.com
HEROKU_APP_DEFAULT_DOMAIN_NAME: immense-scrubland-xxxxx.herokuapp.com
HEROKU_APP_ID:                  9159bc31-f54f-xxxxx-99fc-876f51bfea94
HEROKU_APP_NAME:                immense-scrubland-xxxxx
HEROKU_POSTGRESQL_IVORY_URL:    postgres://<DATADOG_USERNAME>:<DATADOG_USER_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>
HEROKU_RELEASE_CREATED_AT:      2024-10-23T19:18:24Z
HEROKU_RELEASE_VERSION:         v17
HEROKU_SLUG_COMMIT:             383c7b6105fe2a11baeddb9b75703eb1660dd519
HEROKU_SLUG_DESCRIPTION:        Deploy 383c7b61
```

In the root of the project, create a directory for the Postgres configuration called `datadog/conf.d/postgres.d`, containing a file called `conf.yaml`:

``` shell
mkdir -p datadog/conf.d/postgres.d
touch datadog/conf.d/postgres.d/conf.yaml
```

Añada lo siguiente a `conf.yaml`:

``` yaml
init_config:
instances:
  - dbm: true
    host: <DATABASE_ENDPOINT>
    port: <PORT>
    username: <DATADOG_USERNAME>
    password: <DATADOG_USER_PASSWORD>
    dbname: <DB_NAME>
    ssl: True
```

Para localizar manualmente los valores correctos de los marcadores de posición en el archivo YAML, sigue la [Configuración manual](#manual-setup). Para reemplazarlos mediante programación, sigue las instrucciones de [Prerun Script](#prerun-script).

{{% collapse-content title="Configuración manual" level="h5" %}}
#### Configuración manual

Localiza la cadena de conexión `HEROKU_POSTGRESQL_<COLOR>_URL` de arriba. Si necesitas localizar la cadena de nuevo, ejecuta `heroku config`. La cadena de conexión sigue la estructura:

`postgres://<DATADOG_USERNAME>:<DATADOG_USER_PASSWORD>@<DATABASE_ENDPOINT>:<PORT>/<DB_NAME>`.

Utilizando esa estructura, sustituye los parámetros de `conf.yaml`, guarda el archivo y vuelve a desplegar la aplicación Heroku y el agent con los comandos que se indican a continuación:

``` shell
git add .
git commit --allow-empty -m "enable postgres integration"
git push heroku main
```
{{% /collapse-content %}}

{{% collapse-content title="Prerun Script" level="h5" %}}
#### Prerun Script

Utilizando un [prerun script][5], puedes reemplazar mediante programación los valores del parámetro `conf.yaml` antes de iniciar el Datadog Agent. Si todavía no tienes un prerun script, crea un script de shell llamado `prerun.sh` en el directorio `datadog/` en la raíz del proyecto, y añade el script que se muestra a continuación.

**Nota:** En el siguiente ejemplo, la variable de conexión del usuario de Datadog en la configuración Heroku se llama `HEROKU_POSTGRESQL_IVORY_URL`. Sustituye `IVORY` por el componente que aparece como parte de tu variable de conexión.

``` shell
#!/usr/bin/env bash

# Update the Postgres configuration using the Heroku application environment variable
if [ -n "$HEROKU_POSTGRESQL_IVORY_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $HEROKU_POSTGRESQL_IVORY_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<DATABASE_ENDPOINT>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DATADOG_USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DATADOG_USER_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<DB_NAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Haz el despliegue en Heroku:

``` shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

[5]: /es/agent/basic_agent_usage/heroku/#prerun-script
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

La conexión de base de datos ya está configurada. Para habilitar funciones adicionales, como [schema collection][6], consulta las opciones disponibles en el archivo de Postgres [conf.yaml.example][7].

[1]: /es/agent/basic_agent_usage/heroku/
[2]: https://www.datadoghq.com/product/database-monitoring/
[3]: https://devcenter.heroku.com/articles/heroku-postgresql
[4]: https://devcenter.heroku.com/articles/heroku-postgres-plans
[6]: /es/database_monitoring/schema_explorer
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example