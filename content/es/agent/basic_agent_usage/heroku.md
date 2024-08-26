---
aliases:
- /es/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
dependencies:
- https://github.com/DataDog/heroku-buildpack-datadog/blob/master/README.md
title: Paquete de compilación de Heroku de Datadog
---
Este [paquete de compilación de Heroku][1] instala el Datadog Agent en tu dyno de Heroku para recopilar métricas del sistema, métricas personalizadas de la aplicación y trazas (traces). Si quieres recopilar métricas personalizadas de la aplicación o trazas, debes incluir la [biblioteca de DogStatsD o Datadog APM][2] apropiada según el lenguaje en tu aplicación.

## Instalación

En esta guía, se da por sentado que ya ejecutas tu aplicación en Heroku. Consulta la documentación de Heroku para obtener más información acerca de cómo puedes desplegar tu aplicación en Heroku.

1. Ve a los [parámetros de la API de Datadog][3] y copia tu clave de API de Datadog. Luego, expórtala a una variable de entorno:

   ```shell
   export DD_API_KEY=<YOUR_API_KEY>
   ```

2. Exporta el nombre de tu aplicación a la variable de entorno APPNAME:

   ```shell
   export APPNAME=<YOUR_HEROKU_APP_NAME>
   ```

3. Exporta tu sitio de Datadog a la variable de entorno DD_SITE:

   ```shell
   export DD_SITE={{< region-param key=dd_site code="true" >}}
   ```

4. Añade el paquete de compilación de Datadog a tu proyecto:

   ```shell
   cd <HEROKU_PROJECT_ROOT_FOLDER>

   # Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
   heroku labs:enable runtime-dyno-metadata -a $APPNAME

   # Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
   heroku config:add DD_DYNO_HOST=true

   # Set the DD_SITE env variable automatically
   heroku config:add DD_SITE=$DD_SITE

   # Add this buildpack and set your Datadog API key
   heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
   heroku config:add DD_API_KEY=$DD_API_KEY

   # Deploy to Heroku forcing a rebuild
   git commit --allow-empty -m "Rebuild slug"
   git push heroku main
   ```

Al finalizar este proceso, el Datadog Agent se inicia automáticamente tan pronto como se inician los dynos.

El Datadog Agent proporciona un puerto de escucha en `8125` para las métricas y eventos de statsd/dogstatsd. Las trazas se recopilan en el puerto `8126`.

### Orden de los paquetes de compilación
Tal y como se explica en la sección [Viewing buildpacks][4] (Cómo consultar los paquetes de compilación) de la documentación de Heroku, el último paquete de la lista se usa para determinar el tipo de proceso más adecuado para la aplicación.

Los paquetes de compilación que instalan paquetes APT, como [heroku-buildpack-apt][5] o [puppeteer-heroku-buildpack][6], o los que modifican la carpeta `/app`, como [heroku-buildpack-monorepo][7], hay que añadirlos **antes** que el de Datadog. Por ejemplo, si tu aplicación utiliza los paquetes de compilación `ruby`, `datadog` y `apt`, los `heroku buildpacks` podrían ordenarse así:

```text
1. https://github.com/heroku/heroku-buildpack-apt.git
2. https://github.com/DataDog/heroku-buildpack-datadog.git
3. heroku/ruby
```

## Anclar una versión concreta del paquete de compilación y del Datadog Agent

Heroku recomienda usar siempre la última confirmación disponible de un paquete de compilación. Si necesitas anclar la versión del paquete de compilación, puedes hacerlo definiendo su etiqueta (tag) de lanzamiento:

```
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#<DATADOG_BUILDPACK_RELEASE>
```

Reemplaza `<DATADOG_BUILDPACK_RELEASE>` por el [lanzamiento del paquete de compilación][8] que quieras usar.

El paquete de compilación ancla de forma predeterminada la última versión del Datadog Agent disponible en el momento del lanzamiento. No obstante, si quieres, puedes configurar la variable de entorno `DD_AGENT_VERSION` para anclar una versión anterior del Agent.

## Actualización y recompilación de slug

Para actualizar este paquete de compilación o modificar algunas de sus opciones, tendrás que volver a compilar slug.

Las siguientes opciones exigen una recompilación de slug:

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

Para actualizar este paquete de compilación o cambiar cualquiera de estas opciones, como `DD_AGENT_VERSION`, hay que seguir los siguientes pasos:

```shell
# Set new version of the Agent
heroku config:set DD_AGENT_VERSION=<NEW_AGENT_VERSION> -a <YOUR_APP_NAME>

# Rebuild your slug with the new Agent version:
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

## Configuración

Además de las variables de entorno arriba mencionadas, puedes definir muchas otras:

| Parámetro                    | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *Obligatorio.* Tu clave de API está disponible en la página [Organization Settings -> API Keys][3] (Parámetros de organización -> Claves de API). **Nota**: Nos referimos a la clave de *API*, no a la clave de aplicación.                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_HOSTNAME`              | *Opcional.* **ATENCIÓN**: Definir el nombre de host manualmente puede dar lugar a errores de continuidad en las métricas. Por tanto, *no es recomendable* que definas esta variable. Puesto que los hosts de los dynos son efímeros, es mejor que los monitorices tomando como base las etiquetas `dynoname` o `appname`.                                                                                                                                                                                                                                                       |
| `DD_DYNO_HOST`             | *Opcional.* Establécelo como `true` para usar el nombre del dyno (p. ej., `web.1` o `run.1234`) como nombre de host. Para más información, consulta la [sección dedicada al nombre de host](#hostname) que encontrarás más abajo. Se establece por defecto como `false`.                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS` | *Opcional.* Define etiquetas adicionales y las presenta en forma de una cadena cuyos elementos se separan entre sí por espacios (**Nota**: hasta la versión `1.16` del paquete de compilación, los elementos se separan por comas; este formato se sigue admitiendo para garantizar la compatibilidad con versiones anteriores). Ejemplo: `heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`. El paquete de compilación añade automáticamente las etiquetas `dyno` (que representa el nombre del dyno, como `web.1`) y `dynotype` (que representa el tipo de dyno, como `run` o `web`). Para más información, consulta la [guía de etiquetado][10]. |
| `DD_VERSION`                  | *Opcional.* Define la versión de tu aplicación. Se usa para organizar las trazas en función de la versión.                                                                                                                                          |
| `DD_HISTOGRAM_PERCENTILES` | *Opcional.* Tienes la posibilidad de establecer más percentiles para las métricas de tu histograma. Consulta la documentación acerca de [cómo representar los percentiles de forma gráfica][11].                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | *Opcional.* Cuando está activado, no se ejecuta el Datadog Agent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | *Opcional.* La recopilación de trazas está habilitada por defecto. Establece este parámetro como `false` para deshabilitarla. Si quieres cambiar esta opción, tendrás que volver a compilar slug. Para más detalles, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation).                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | *Opcional.* El Agent de proceso de Datadog está desactivado de forma predeterminada. Establece este parámetro como `true` para activar el Agent de proceso. Si quieres cambiar esta opción, tendrás que volver a compilar slug. Para más detalles, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation).                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | *Opcional.* Si utilizas el servicio app.datadoghq.eu, establece este parámetro como `datadoghq.eu`. Se establece por defecto como `datadoghq.com`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *Opcional.* El paquete de compilación instala de forma predeterminada la última versión 6.x del Datadog Agent que esté disponible en el repositorio del paquete. Usa esta variable para instalar versiones anteriores del Datadog Agent. **Nota**: Es posible que no todas las versiones del Agent estén disponibles. Esta opción tendrá prioridad sobre `DD_AGENT_MAJOR_VERSION`. Si quieres cambiarla, tendrás que volver a compilar slug. Para más detalles, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation).                                           |
| `DD_AGENT_MAJOR_VERSION`   | *Opcional.* El paquete de compilación instala de forma predeterminada la última versión 7.x del Datadog Agent que esté disponible en el repositorio del paquete. Establece esta variable como `6` para instalar la versión 6.x más reciente del Datadog Agent. Consulta la [sección dedicada a las versiones de Python.](#python-and-agent-versions) para obtener más información sobre la relación entre la versión del Agent y la de Python. Si quieres cambiar esta opción, tendrás que volver a compilar slug. Para más detalles, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation).     |
| `DD_DISABLE_HOST_METRICS`  | *Opcional.* El paquete de compilación notifica de forma predeterminada las métricas del sistema del equipo host que ejecuta el dyno. Establece este parámetro como `true` para desactivar la recopilación de métricas del sistema. Para más información, consulta la [sección dedicada a las métricas del sistema](#system-metrics) que encontrarás más abajo.                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *Opcional.* A partir de la versión `6.14.0`, el Datadog Agent está incluido en las versiones `2` y `3` de Python. El paquete de compilación, por su parte, solo conserva una de estas versiones. Establece este parámetro como `2` o `3` para seleccionar la versión de Python que prefieras que conserve el Agent. Si no lo haces, el paquete de compilación se decantará por `2`. Consulta la [sección dedicada a las versiones de Python](#python-and-agent-versions) para obtener más información. Si quieres cambiar esta opción, tendrás que volver a compilar slug. Para más detalles, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation). |
| `DD_HEROKU_CONF_FOLDER`    | *Opcional.* El paquete de compilación busca de forma predeterminada una carpeta `/datadog` en la raíz de tu aplicación para localizar los archivos de configuración que desees incluir. Consulta el [script prerun.sh](#prerun-script). Esta localización puede anularse si estableces este parámetro como tu ruta de preferencia. |
| `DD_ENABLE_HEROKU_REDIS`    | *Opcional.* Defínela como true para permitir la detección automática de la integración de Redis. Consulta la [sección Cómo habilitar la integración de Redis con Datadog](#enabling-the-datadog-redis-integration) para conocer más detalles. |
| `DD_REDIS_URL_VAR`    | *Opcional.* La detección automática de la integración de Redis utiliza de forma predeterminada la cadena de conexión almacenada en `REDIS_URL`. Para anularla, establece esta variable como una lista de nombres de variables, separadas entre sí por comas, que almacenen las cadenas de conexión. Consulta la [sección Cómo habilitar la integración de Redis con Datadog](#enabling-the-datadog-redis-integration) para conocer más detalles. |
| `DD_ENABLE_HEROKU_POSTGRES`    | *Opcional.* Defínela como true para permitir la detección automática de la integración de Postgres. Consulta la [sección Cómo habilitar la integración de Postgres con Datadog](#enabling-the-datadog-postgres-integration) para conocer más detalles. |
| `DD_POSTGRES_URL_VAR`    | *Opcional.* La detección automática de la integración de Postgres utiliza de forma predeterminada la cadena de conexión almacenada en `DATABASE_URL`. Para anularla, establece esta variable como una lista de nombres de variables, separadas entre sí por comas, que almacenen las cadenas de conexión. Consulta la [sección Cómo habilitar la integración de Postgres con Datadog](#enabling-the-datadog-redis-integration) para conocer más detalles. |
| `DD_ENABLE_DBM`    | *Opcional.* Si habilitas la integración de Postgres con Datadog siguiendo [esta guía](#enabling-the-datadog-postgres-integration), debes establecer `DD_ENABLE_DBM` en `true` para habilitar la Monitorización de bases de datos. |

Más documentación disponible en la página dedicada al [Datadog Agent][12].

## Nombre de host

Los dynos de Heroku son efímeros, es decir, pueden transferirse a otros equipos host cada vez que se despliegue código nuevo, que se realicen cambios de configuración o que cambie el requisito o disponibilidad de algún recurso. Esta circunstancia hace que Heroku sea una herramienta flexible y adaptable, pero también puede provocar que se notifique un gran número de hosts en Datadog. Dado que la facturación de Datadog depende del número de hosts y que el paquete de compilación informa por defecto del número de hosts existentes, cabe la posibilidad de que los costes sean más elevados de lo previsto.

Según cuál sea tu caso de uso, puede que te interese definir un nombre de host para agregar hosts y notificar una cantidad más reducida de hosts. Para hacer esto, establece `DD_DYNO_HOST` como `true`. Así, el Agent notificará el nombre de host como nombre de la aplicación y del dyno (p. ej., `appname.web.1` o `appname.run.1234`), de modo que tu count de hosts se aproximará al uso que hagas del dyno. Uno de los inconvenientes es que quizás te encuentres con algunos errores en la continuidad de las métricas cada vez que un dyno entre en un ciclo.

Para que esto funcione como es debido, hay que definir el parámetro `HEROKU_APP_NAME`. La forma más sencilla de hacerlo consiste en [habilitar los metadatos del dyno][13]. **Nota**: Los metadatos del dyno aún no están disponibles en los espacios privados, de modo que tienes que definir `HEROKU_APP_NAME` manualmente.

## Deshabilita el Datadog Agent en los dynos de corta duración

De forma predeterminada, el Datadog Agent se ejecuta en todos los dynos que forman parte de la aplicación, a saber: `scheduler`, `release` o `run`. En muchos casos, las métricas de estos dynos no son necesarias, por lo que conviene deshabilitar el Datadog Agent.

Para deshabilitar el Datadog Agent según el tipo de dyno, adapta el siguiente fragmento de código a los tipos de dyno que no desees monitorizar y añádelo a tu [script prerun.sh](#prerun-script):

```shell
# Disable the Datadog Agent based on dyno type
if [ "$DYNOTYPE" == "run" ] || [ "$DYNOTYPE" == "scheduler" ] || [ "$DYNOTYPE" == "release" ]; then
  DISABLE_DATADOG_AGENT="true"
fi
```

## Métricas del sistema

El paquete de compilación recopila de forma predeterminada las métricas del sistema del equipo host que ejecuta el dyno. Con este paquete de recopilación, no se puede acceder a las métricas del sistema de un dyno en concreto. Para deshabilitar la recopilación de métricas del sistema del host, establece la variable de entorno `DD_DISABLE_HOST_METRICS` como `true`.

Para recopilar las métricas del sistema de tus dynos, debes:

1. habilitar [Heroku Labs: log-runtime-metrics][14],
2. usar la [purga de logs de Datadog][15] para recopilar logs de métricas del enrutador Logplex de Heroku y desviarlos a Datadog, y
3. generar [métricas basadas en logs][16] a partir de los logs recopilados.

## Localizaciones de los archivos

* El Datadog Agent está instalado en `/app/.apt/opt/datadog-agent`
* Los archivos de configuración del Datadog Agent están en `/app/.apt/etc/datadog-agent`
* Los logs del Datadog Agent están en `/app/.apt/var/log/datadog`

## Habilitar integraciones

### Cómo habilitar la integración de Redis con Datadog

Si usas un complemento de Redis en tu aplicación de Heroku (p. ej., Heroku Data for Redis o Redis Enterprise Cloud), puedes habilitar la integración de Redis con Datadog definiendo una variable de entorno:

```
heroku config:set DD_ENABLE_HEROKU_REDIS=true
```

Con esta integración, se da por hecho que se ha definido la URL de conexión de Redis en una variable de entorno denominada `REDIS_URL` (configuración predeterminada de Heroku Data for Redis y otros complementos de Redis).

Si tu URL de conexión se define en una variable de entorno distinta o si quieres configurar más de una instancia de Redis, establece la variable de entorno `DD_REDIS_URL_VAR` como nombres de variables separados por comas de tus cadenas de conexión. Por ejemplo, si utilizas tanto Heroku para Redis como Redis Enterprise Cloud, establece `DD_REDIS_URL_VAR` como corresponda:

```
heroku config:set REDIS_URL="redis://aaaaa:bbbbb@redis-url"
heroku config:set REDISCLOUD_URL="redis://xxxxx:yyyyy@redis-cloud-url"

# This env var must point to other env vars.
heroku config:set DD_REDIS_URL_VAR=REDIS_URL,REDISCLOUD_URL
```

### Cómo habilitar la integración de Postgres con Datadog

Si usas un complemento de Postgres en tu aplicación de Heroku (p. ej., Heroku Postgres), puedes habilitar la integración de Postgres con Datadog definiendo una variable de entorno:

```
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
```

Con esta integración, se da por hecho que se ha definido la URL de conexión de Postgres en una variable de entorno denominada `DATABASE_URL` (configuración predeterminada de Heroku Postgres y otros complementos de Postgres).

Si tu URL de conexión se define en una variable de entorno distinta o si quieres configurar más de una instancia de Postgres, establece la variable de entorno  `DD_POSTGRES_URL_VAR` como nombres de variables separados por comas de tus cadenas de conexión. Por ejemplo, si tienes dos instancias de Postgres y las cadenas de conexión se almacenan en `POSTGRES_URL1` y `POSTGRES_URL2`, establece `DD_POSTGRES_URL_VAR` como corresponda:

```
heroku config:set POSTGRES_URL1="postgres://aaaaa:bbbbb@postgres-url-1:5432/dbname"
heroku config:set POSTGRES_URL2="postgres://xxxxx:yyyyy@postgres-url-2:5432/dbname"

# This env var must point to other env vars.
heroku config:set DD_POSTGRES_URL_VAR=POSTGRES_URL1,POSTGRES_URL2
```

Con el fin de habilitar la [Monitorización de bases de datos][17] para tus instancias de Postgres, concede al Agent acceso a la base de datos siguiendo [estas instrucciones][18], y establece `DD_ENABLE_DBM` en true:

```
heroku config:set DD_ENABLE_DBM=true
```

La Monitorización de bases de datos requiere la creación de credenciales de base de datos para el Datadog Agent, por lo tanto, DBM no se encuentra disponible en los planes de Heroku Postgres Essential Tier.

### Cómo habilitar otras integraciones

Para habilitar cualquier [integración de Datadog<INTEGRATION_NAME>][19]:

* Crea una carpeta `datadog/conf.d` en tu aplicación.
* Para cada integración que quieras habilitar, crea una carpeta `<INTEGRATION_NAME>.d`.
* En esa carpeta, crea un archivo `conf.yaml` con la [configuración de la integración][20].

Tus archivos YAML se copiarán en los directorios de configuración apropiados del Datadog Agent durante el inicio del dyno.

Por ejemplo, para habilitar la [integración de Memcache con Datadog][21], añade el archivo `/datadog/conf.d/mcache.d/conf.yaml` (o `/$DD_HEROKU_CONF_FOLDER/conf.d/mcache.d/conf.yaml`, en caso de que hayas cambiado esta [opción de configuración](#configuration)) en la raíz de tu aplicación:

```yaml
init_config:

instances:
  ## @param url - string - required
  ## url used to connect to the Memcached instance.
  #
  - url: localhost
```

**Nota**: Consulta el archivo [mcache.d/conf.yaml][22] de muestra para ver todas las opciones de configuración disponibles.

### Integraciones de la comunidad

Si la integración que vas a habilitar es una de las [integraciones de la comunidad][23], instala el paquete como parte del [script prerun](#prerun-script).

```
agent-wrapper integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

Por ejemplo, para instalar la [integración de Ping][24], crea el archivo de configuración `datadog/conf.d/ping.d/conf.yaml` y añade la siguiente línea a tu script prerun:

```
agent-wrapper integration install -t datadog-ping==1.0.0
```

### Cómo deshabilitar las integraciones basadas en dynos

Todos los dynos terminarán compartiendo el sistema de archivos de una aplicación de Heroku. Por tanto, si habilitas una integración, se ejecutará en todos los dynos, como `run` o `worker`. En caso de que quieras limitar las ejecuciones de la integración según el nombre o tipo de dyno, puedes hacerlo añadiendo un pequeño fragmento de código en el [script prerun](#prerun-script).

Por ejemplo, si la integración de Gunicorn necesita ejecutarse únicamente en los dynos de tipo `web`, añade lo siguiente a tu script prerun:

```
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi
```

## Habilitar los checks personalizados

Para habilitar tus propios [checks personalizados del Agent][25], crea una carpeta `checks.d` dentro de la carpeta de configuración de Datadog de tu aplicación. A continuación, copia todos los archivos `.py` y `.yaml` de tus checks personalizados en esa carpeta. Tus archivos se copiarán en los directorios de configuración apropiados del Datadog Agent durante el inicio del dyno.

Por ejemplo, si tienes dos checks personalizados, `foo` y `bar`, el árbol de carpetas debería ser así:

```
.
└── app
    └── datadog
        └── checks.d
            ├── foo.py
            ├── foo.yaml
            ├── bar.py
            └── bar.yaml

```

## Script prerun

Además de todas las configuraciones anteriores, también puedes incluir un script prerun (`/datadog/prerun.sh`) en tu aplicación. El script prerun se ejecuta una vez que se han procesado todas las acciones de configuración estándar y justo antes de iniciar el Datadog Agent. Así, puedes modificar las variables de entorno (p. ej., DD_TAGS o DD_VERSION), realizar configuraciones adicionales, instalar integraciones de la comunidad o incluso deshabilitar el Datadog Agent mediante programación.

En el siguiente ejemplo, te mostramos algunas de las cosas que puedes hacer en el script `prerun.sh`:

```shell
#!/usr/bin/env bash

# Disable the Datadog Agent based on dyno type
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# Disable integrations based on dyno type
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi

# Set app version based on HEROKU_SLUG_COMMIT
if [ -n "$HEROKU_SLUG_COMMIT" ]; then
  DD_VERSION=$HEROKU_SLUG_COMMIT
fi

# Install the "ping" community integration
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Limitar los resultados de la consola de Datadog

En algunos casos, puede que te interese limitar la cantidad de logs que el paquete de compilación de Datadog escribe en la consola.

Para limitar los resultados en forma de logs del paquete de compilación, establece la variable de entorno `DD_LOG_LEVEL` como una de las siguientes: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`, `OFF`.

```shell
heroku config:add DD_LOG_LEVEL=ERROR
```

## Archivos binarios opcionales

Para ahorrar espacio de slug, se eliminan los archivos binarios opcionales `trace-agent` y `process-agent` durante la compilación  si `DD_APM_ENABLED` consta como `false`, o si `DD_PROCESS_AGENT` consta como `false` o no está establecido.

Para reducir el tamaño de tu slug, asegúrate de que `DD_APM_ENABLED` conste como `false` (siempre que no uses las funciones de APM) y de que `DD_PROCESS_AGENT` no conste como `true` (siempre que no uses la monitorización de procesos).

## Depuración

Para ejecutar cualquier [comando de información o depuración][26], utiliza el comando `agent-wrapper`.

Por ejemplo, para mostrar el estado de tu Datadog Agent y las integraciones habilitadas, ejecuta lo siguiente:

```shell
agent-wrapper status
```

## Versiones de Python y del Agent

Antes de lanzar la versión `6.14`, el Datadog Agent v6 estaba integrado en la versión `2` de Python. A partir de la versión `6.14`, y a modo de preparación de cara al final del ciclo de vida de la versión `2` de Python, programado para enero de 2020, el Datadog Agent v6 pasó a incluirse en las versiones `2` y `3` de Python para que los clientes tuviesen tiempo suficiente para migrar sus checks personalizados a la versión `3` de Python. El paquete de compilación de Heroku, por su parte, solo conserva una de estas versiones. Establece `DD_PYTHON_VERSION` como `2` o `3` para seleccionar la versión de Python que prefieres que conserve el Agent. De lo contrario, el paquete de compilación se decantará por la versión `2` de Python. Si los checks personalizados que utilizas solo son compatibles con la versión `2` de Python, mígralos a la versión `3` antes de que termine su ciclo de vida.

El Agent v7 solo está incluido en la versión `3` de Python. Si no utilizas checks personalizados o si tus checks personalizados ya han migrado a la versión `3`, pásate al Agent v7 cuanto antes. A partir de la versión `6.15`, los lanzamientos de v7 que tienen esa versión secundaria comparten las mismas funciones, lo que te permite pasar de la una a la otra de forma segura. Es decir, si ejecutas la versión `6.16` y no te hace falta la versión `2` de Python, puedes pasarte a la `7.16` con total seguridad.

## Recopilación de logs de Heroku

El paquete de compilación de Datadog no recopila logs de la plataforma de Heroku. Para configurar la recopilación de logs de Heroku, consulta la [guía dedicada a este tema][15].

## Usar Heroku con imágenes de Docker

Este paquete de compilación solo funciona en los despliegues de Heroku en los que se utiliza el [compilador de slug de Heroku][27]. Si vas a desplegar tu aplicación en Heroku con contenedores de Docker:

1. Añade el Datadog Agent como parte de tu imagen de Docker e inicia el Agent como un proceso diferente en tu contenedor.
2. Establece la siguiente opción de configuración en tu aplicación de Heroku para asegurarte de que Datadog la notifique correctamente como un dyno de Heroku:

```shell
heroku config:add DD_HEROKU_DYNO=true
```

Por ejemplo, si vas a crear tu imagen de Docker con un SO basado en Debian, añade estas líneas a tu `Dockerfile`:

```
# Install GPG dependencies
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Add Datadog repository and signing keys
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_06462314.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_06462314.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_06462314.public
RUN curl -o /tmp/DATADOG_APT_KEY_C0962C7D.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_C0962C7D.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_C0962C7D.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public


# Install the Datadog Agent
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# Copy entrypoint
COPY entrypoint.sh /

# Expose DogStatsD and trace-agent ports
EXPOSE 8125/udp 8126/tcp

# Copy your Datadog configuration
COPY datadog-config/ /etc/datadog-agent/

CMD ["/entrypoint.sh"]
```

En el punto de entrada de tu contenedor de Docker, inicia el Datadog Agent, el APM Agent de Datadog y el Agent de proceso de Datadog:

```
#!/bin/bash

datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml
```

Para obtener más opciones avanzadas en la imagen de Docker, consulta los [archivos de Docker del Datadog Agent][28].

## Contribuir

Consulta las [directrices de contribución][29] para informarte acerca de cómo se abre una incidencia o PR en el [repositorio Heroku-buildpack-datadog][30].

## Historial

Las versiones anteriores de este proyecto se bifurcaron a partir del [proyecto miketheman/heroku-buildpack-datadog][31]. Se reescribió en gran medida para la versión 6 del Datadog Agent. Para ver los cambios y obtener más información, consulta el [log de cambios][32].

## Solucionar problemas

### Cómo obtener el estado del Agent

Si has configurado el paquete de compilación y no obtienes algunos de los datos que esperabas en Datadog, puedes ejecutar el comando de estado para que el Datadog Agent te ayude a encontrar la causa.

```shell
# Export the name of your Heroku application as an environment variable
export APPNAME=your-application-name

heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
# The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

Puedes ignorar las advertencias que indican que no se ha configurado DD_API_KEY. Aunque [Heroku no establezca las variables de configuración de la sesión de SSH](https://devcenter.heroku.com/articles/exec#environment-variables), el proceso del Datadog Agent podrá acceder a ellas sin problema.

Una vez que estés en la sesión de SSH, ejecuta el comando de estado de Datadog.

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

[...]

```

### Depuración

#### No hay datos en Datadog

Asegúrate de que el comando `status` se ejecuta correctamente y de que tu clave de API figura como válida en la sección de este ejemplo:

```
  API Keys status
  ===============
    API key ending with 68306: API Key valid
```

#### Comprueba las integraciones

Para comprobar si la integración que has habilitado se ejecuta correctamente, fíjate en la sección `Collector` y verifica si tu check se está ejecutando como es debido:

```
=========
Collector
=========

  Running Checks
  ==============

[...]
    postgres (5.4.0)
    ----------------
      Instance ID: postgres:e07ef94b907fe733 [OK]
      Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 4,282
      Metric Samples: Last Run: 15, Total: 64,230
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 4,282
      Average Execution Time : 43ms
      Last Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      Last Successful Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver
```

#### Comprueba el APM Agent

Si has instrumentado tu aplicación para adaptarla a APM y no obtienes trazas (traces) en Datadog, puedes comprobar si el APM Agent se ejecuta correctamente y si recopila trazas:

```
[...]
=========
APM Agent
=========
  Status: Running
  Pid: 63
  Uptime: 64702 seconds
  Mem alloc: 10,331,128 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 11 (14,181 bytes)
      Spans received: 33

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:development': 100.0%

[...]
```

### Datadog notifica un mayor número de Agents que de dynos

Asegúrate de que has establecido `DD_DYNO_HOST` como `true` y de que `HEROKU_APP_NAME` tiene un valor configurado para cada aplicación de Heroku. Para más información, consulta la [sección dedicada al nombre de host](#hostname).

### Tras actualizar el paquete de compilación o el Agent, este último notifica errores al iniciarse

Después de actualizar el paquete de compilación o el Agent, debes volver a compilar el slug de tu aplicación. Para más información, consulta la [sección dedicada a la actualización y recompilación de slug](#upgrading-and-slug-recompilation).

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/es/libraries
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app#viewing-buildpacks
[5]: https://github.com/heroku/heroku-buildpack-apt
[6]: https://github.com/jontewks/puppeteer-heroku-buildpack
[7]: https://github.com/lstoll/heroku-buildpack-monorepo
[8]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[10]: https://docs.datadoghq.com/es/tagging/
[11]: https://docs.datadoghq.com/es/dashboards/guide/how-to-graph-percentiles-in-datadog/
[12]: https://docs.datadoghq.com/es/agent
[13]: https://devcenter.heroku.com/articles/dyno-metadata
[14]: https://devcenter.heroku.com/articles/log-runtime-metrics
[15]: https://docs.datadoghq.com/es/logs/guide/collect-heroku-logs
[16]: https://docs.datadoghq.com/es/logs/logs_to_metrics/
[17]: https://docs.datadoghq.com/es/database_monitoring/
[18]: https://docs.datadoghq.com/es/database_monitoring/setup_postgres/selfhosted/?tab=postgres10#grant-the-agent-access
[19]: https://docs.datadoghq.com/es/integrations/
[20]: https://docs.datadoghq.com/es/getting_started/integrations/#configuring-agent-integrations
[21]: https://docs.datadoghq.com/es/integrations/mcache/
[22]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[23]: https://github.com/DataDog/integrations-extras/
[24]: https://github.com/DataDog/integrations-extras/tree/master/ping
[25]: https://docs.datadoghq.com/es/developers/custom_checks/
[26]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[27]: https://devcenter.heroku.com/articles/slug-compiler
[28]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[29]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[30]: https://github.com/DataDog/heroku-buildpack-datadog
[31]: https://github.com/miketheman/heroku-buildpack-datadog
[32]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md
