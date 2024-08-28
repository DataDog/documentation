---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: Documentación
  text: Paquete de compilación de Heroku
- link: /logs/guide/collect-heroku-logs
  tag: Documentación
  text: Recopilar logs de Heroku
title: Instrumentar una aplicación de Ruby on Rails en Heroku con Datadog
---

Heroku es una plataforma popular entre los desarrolladores de Ruby y, más específicamente, los de Ruby on Rails. Datadog es compatible con Heroku y Ruby, por lo que puedes enviar las métricas, logs y trazas (traces) de tu aplicación de Ruby en Heroku a Datadog.

En esta guía, te explicaremos los pasos necesarios para utilizar una aplicación de Rails desplegada en Heroku y hacer que las métricas, datos de integración, logs y trazas se envíen a Datadog.

## Requisitos previos

En esta guía, se da por hecho lo siguiente:

* Ya tienes una cuenta de Datadog. Si no es así, puedes [registrarte para disfrutar de una prueba gratuita][1].
* Ya tienes una cuenta de Heroku. Si no es así, puedes [registrarte para tener acceso a su plan gratuito][2].
* Tienes instalado [Git][3] en tu sistema local.
* Tienes instalada la [herramienta Heroku CLI][4] en tu sistema local.

## Crea tu aplicación de Heroku y despliega la aplicación de Ruby de muestra

Esta guía utiliza la [aplicación de muestra de Rails de Heroku][5]. Se trata de una aplicación de Rails básica que sigue las directrices del [artículo Starting With Ruby][6] (Empezando con Ruby), donde se ofrece información más detallada sobre cómo desplegar una aplicación de Ruby en Heroku. La presente guía se centra, por tanto, en cómo instrumentar una aplicación de Rails con Datadog.

La aplicación de muestra tiene una dependencia pg que solo se resuelve si tienes [Postgres instalado en tu sistema local][7]. Recuerda instalar Postgres antes de continuar.
Para comprobar que Postgres se ha instalado correctamente, ejecuta el comando `psql`. Este debería devolver un resultado similar al siguiente:

```shell
which psql
/usr/local/bin/psql
```

Obtén el código de la aplicación de muestra y despliégalo, sin modificaciones, en una nueva aplicación de Heroku.

```shell
# Decide a name for your application and export it as an environment variable
# (In this case, the name is ruby-heroku-datadog)
export APPNAME=ruby-heroku-datadog

# Get the sample application code
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Login into Heroku
heroku login

# Create a new application
heroku create -a $APPNAME

# Deploy to Heroku
git push heroku main

# Open the application to check that it works
heroku open -a $APPNAME
```

Tu navegador predeterminado se abrirá con la aplicación de muestra, por lo que deberías ver algo similar a la siguiente interfaz de usuario:

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Aplicación de Ruby de muestra en Heroku" >}}

## Conecta tu cuenta de Datadog a tu aplicación y despliega el Datadog Agent

El primer paso para obtener una observabilidad completa de tu aplicación de Heroku con Datadog es desplegar el Datadog Agent y conectarlo a tu cuenta de Datadog.

Datadog identifica tu cuenta mediante una clave de API. [Inicia sesión en tu cuenta de Datadog][8] y ve a la [sección de claves de API][9]. Copia tu clave de API:

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Sección de claves de API de Datadog" >}}

A continuación, despliega el Datadog Agent en tu aplicación. En esta guía, se utiliza el [paquete de compilación de Heroku de Datadog][10]. Para obtener más información sobre los [paquetes de compilación de Heroku][11] y sus funciones, consulta su documentación oficial.

```shell
# Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
heroku config:add DD_DYNO_HOST=true

# Set your Datadog site (for example, us5.datadoghq.com) 
heroku config:add DD_SITE=$DD_SITE

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Deploy to Heroku forcing a rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

Cuando finalice la compilación, el Datadog Agent comenzará a ejecutarse en tu aplicación. Si quieres asegurarte de que todo está funcionando correctamente, ejecuta el estado del Datadog Agent; para ello, consulta este [anexo](#appendix-getting-the-datadog-agent-status). La sección que deberías observar es esta:

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

Este resultado implica que el Datadog Agent se está ejecutando en tu aplicación de Heroku y que se ha vinculado correctamente a tu cuenta de Datadog.

Si abres el [mapa del host en Datadog][12], podrás ver que tu dyno está enviando información correctamente en Datadog:

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Mapa del host de Datadog" >}}

## Configura integraciones

Datadog incluye más de 400 integraciones listas para usar que recopilan métricas de diferentes stacks tecnológicos. El paquete de compilación de Datadog te permite habilitarlas para tu aplicación de Heroku.

Los cuatro ejemplos siguientes incluyen las configuraciones de integración de Heroku más utilizadas.

### Postgres

Heroku añade a cada aplicación de Rails que se despliega en Heroku una base de datos Postgres mediante un complemento. Verifica que el complemento de Postgres esté habilitado en la aplicación:

 ```shell
heroku addons -a $APPNAME
```
Debería aparecer el siguiente resultado:


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

La aplicación que usamos a modo de ejemplo ya utiliza esa base de datos en su código. Sin embargo, aún no has creado las tablas, así que ejecuta lo siguiente:

```shell
heroku run rake db:migrate -a $APPNAME
```

```bash
Running `rake db:migrate` attached to terminal... up, run.3559
Migrating to CreateWidgets (20140707111715)
== 20140707111715 CreateWidgets: migrating ====================================
-- create_table(:widgets)
   -> 0.0244s
== 20140707111715 CreateWidgets: migrated (0.0247s) ===========================
```

Una vez hecho esto, podrás ver correctamente el endpoint `/widgets` de tu aplicación, que utiliza esa base de datos.

Para habilitar la integración de Postgres con Datadog, obtén las credenciales de la base de datos desde Heroku. Ejecuta el siguiente comando desde el terminal `psql`.

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Cuando se utiliza el paquete de compilación de Datadog, las integraciones se han de habilitar de una manera concreta. Para aprender a habilitar cualquiera de las integraciones, consulta la [documentación sobre el paquete de compilación][13].

Crea una carpeta `datadog/conf.d` en la raíz tu aplicación:

```shell
cd ruby-getting-started
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

Crea un archivo de configuración llamado `postgres.yaml` en el que sustituyas tu host, dbname (nombre de la base de datos), username (nombre de usuario) y password (contraseña) por la información obtenida en el comando anterior:

```yaml
init_config:

instances:
  - host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

En lugar de actualizar la configuración de forma manual, puedes configurar tu integración de Postgres basándote en las variables de entorno de Heroku; para ello, utiliza el [script prerun][14] para reemplazar esos valores antes de iniciar el Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
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
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

Cuando finalice la compilación, el Datadog Agent iniciará el check de Postgres. Si quieres asegurarte de que el check está funcionando correctamente, ejecuta el estado del Datadog Agent; para ello, consulta este [anexo](#appendix-getting-the-datadog-agent-status). La sección que deberías observar es esta:

```bash

[...]

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
    Total Runs: 9
    Metric Samples: Last Run: 15, Total: 135
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 9
    Average Execution Time : 102ms
    Last Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
    Last Successful Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
    metadata:
      version.major: 13
      version.minor: 2
      version.patch: 0
      version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
      version.scheme: semver

[...]
```

Después de comprobar que el check de Postgres se está ejecutando correctamente, puedes comenzar a examinar las métricas de Postgres disponibles en la página [Metrics Summary][15] (Resumen de métricas):

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Navegador de métricas de Datadog" >}}

### Redis

En Redis, asocia el [complemento Redis de Heroku][16] con tu aplicación de Heroku:

```shell
heroku addons:create heroku-redis:hobby-dev
```

Para comprobar que Redis se ha asociado correctamente con tu aplicación, ejecuta el siguiente comando:

 ```shell
heroku addons:info REDIS
```

Debería aparecer un resultado similar al siguiente:

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Ejecuta el siguiente comando para obtener las credenciales de Heroku:

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

Crea un archivo de configuración llamado `/datadog/conf.d/redisdb.yaml` en la raíz de tu aplicación para reemplazar tu host, port (puerto) y password (contraseña) con la información del comando anterior:

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

En lugar de actualizar la configuración de forma manual, puedes configurar tu integración de Redis basándote en las variables de entorno de Heroku; para ello, utiliza el [script prerun][14] para reemplazar esos valores antes de iniciar el Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Redis configuration from above using the Heroku application environment variable
if [ -n "$REDIS_URL" ]; then
  REDISREGEX='rediss?://([^:]*):([^@]+)@([^:]+):([^/]+)$'
  if [[ $REDIS_URL =~ $REDISREGEX ]]; then
    sed -i "s/<YOUR_REDIS_HOST>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
fi
```

Haz el despliegue en Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

Cuando finalice la compilación, el Datadog Agent iniciará el check de Redis. Si quieres asegurarte de que el check está funcionando correctamente, [ejecuta el estado del Datadog Agent](#appendix-getting-the-datadog-agent-status).

Obtendrás el siguiente resultado:

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  redisdb (4.1.0)
  ---------------
    Instance ID: redisdb:eb3a3807075f89f0 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/redisdb.d/conf.yaml
    Total Runs: 3
    Metric Samples: Last Run: 45, Total: 135
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 3
    Average Execution Time : 6ms
    Last Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    Last Successful Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    metadata:
      version.major: 6
      version.minor: 2
      version.patch: 3
      version.raw: 6.2.3
      version.scheme: semver

[...]

```

### Sidekiq

Sidekiq es un marco de procesamiento en segundo plano para Ruby. Si utilizas Sidekiq Pro o Enterprise, puedes instalar la integración de Datadog para Sidekiq.

Instala el paquete `dogstatsd-ruby`:

```shell
gem install dogstatsd-ruby
```

Habilita la recopilación de métricas de Sidekiq Pro en tu inicializador:

```ruby
    require 'datadog/statsd' # gem 'dogstatsd-ruby'

    Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

    Sidekiq.configure_server do |config|
      config.server_middleware do |chain|
        require 'sidekiq/middleware/server/statsd'
        chain.add Sidekiq::Middleware::Server::Statsd
      end
    end
```

Si usas Sidekiq Enterprise y quieres recopilar métricas antiguas, incluye lo siguiente:

```ruby
      Sidekiq.configure_server do |config|
        # history is captured every 30 seconds by default
        config.retain_history(30)
      end
```

Añade esto a tu script [`datadog/prerun.sh`][14]:

```bash
cat << 'EOF' >> "$DATADOG_CONF"

dogstatsd_mapper_profiles:
  - name: sidekiq
    prefix: "sidekiq."
    mappings:
      - match: 'sidekiq\.sidekiq\.(.*)'
        match_type: "regex"
        name: "sidekiq.$1"
      - match: 'sidekiq\.jobs\.(.*)\.perform'
        name: "sidekiq.jobs.perform"
        match_type: "regex"
        tags:
          worker: "$1"
      - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
        name: "sidekiq.jobs.worker.$2"
        match_type: "regex"
        tags:
          worker: "$1"
EOF
```

Haz el despliegue en Heroku:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

Cuando finalice la compilación, el Datadog Agent iniciará el check de Sidekiq. Si quieres asegurarte de que el check está funcionando correctamente, [ejecuta el estado del Datadog Agent](#appendix-getting-the-datadog-agent-status).

### Memcached

Memcached es un sistema distribuido de almacenamiento de objetos en la caché de la memoria muy popular en las aplicaciones de Rails. En el siguiente ejemplo, puedes asociar el [complemento Memcached Cloud de Heroku][17] con tu aplicación de Heroku:

```shell
heroku addons:create memcachedcloud:30
```

Para verificar que Memcached se ha asociado correctamente con tu aplicación, ejecuta el siguiente comando:

```shell
heroku addons | grep -A2 memcachedcloud
```

Obtendrás el siguiente resultado:

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

Para obtener las credenciales de Heroku, ejecuta lo siguiente:

```shell
heroku config | grep MEMCACHEDCLOUD
```

Crea un archivo de configuración llamado `/datadog/conf.d/mcache.yaml` en la raíz de tu aplicación para reemplazar tu host, port (puerto), username (nombre de usuario) y password (contraseña) con la información del comando anterior:

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

En lugar de actualizar la configuración de forma manual, puedes configurar tu integración de Memcached basándote en las variables de entorno de Heroku; para ello, utiliza el [script prerun][14] para reemplazar esos valores antes de iniciar el Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Memcached configuration from above using the Heroku application environment variable
if [ -n "$MEMCACHEDCLOUD_SERVERS" ]; then
  MCACHEREGEX='([^:]+):([^/]+)$'
  if [[ $MEMCACHEDCLOUD_SERVERS =~ $MCACHEREGEX ]]; then
    sed -i "s/<YOUR_MCACHE_HOST>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
    sed -i "s/<YOUR_MCACHE_PORT>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  fi
  sed -i "s/<YOUR_MCACHE_USERNAME>/${MEMCACHEDCLOUD_USERNAME}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  sed -i "s/<YOUR_MCACHE_PASSWORD>/${MEMCACHEDCLOUD_PASSWORD}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
fi
```

Haz el despliegue en Heroku:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

Cuando finalice la compilación, el Datadog Agent iniciará el check de Memcached. Si quieres asegurarte de que el check está funcionando correctamente, [ejecuta el estado del Datadog Agent](#appendix-getting-the-datadog-agent-status).

Obtendrás el siguiente resultado:

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  mcache (2.0.0)
  --------------
    Instance ID: mcache:ca47ee7a0c236107 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/mcache.d/conf.yaml
    Total Runs: 2
    Metric Samples: Last Run: 27, Total: 54
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 2
    Average Execution Time : 9ms
    Last Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    Last Successful Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    metadata:
      version.major: 1
      version.minor: 4
      version.patch: 17
      version.raw: 1.4.17
      version.scheme: semver

[...]

```
## Trazas (traces)

Habilita la instrumentación para obtener un rastreo distribuido de tu aplicación de Ruby en Heroku.

Asegúrate de que te encuentras en la carpeta con el código de la aplicación:

```shell
cd ruby-getting-started
```

Edita tu `Gemfile` y añade el `ddtrace`:

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Instala el GEM con `bundle install`:

```shell
bundle install
```

Antes de confirmar los cambios y enviarlos a Heroku, configura el [etiquetado unificado][18] para la aplicación:

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

Confirma tus cambios y envíalos a Heroku:

```shell
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

Durante la compilación, aparecerán mensajes de error indicando que el rastreador no puede alcanzar el endpoint del APM Agent de Datadog. Esto es normal, ya que durante este proceso, el Datadog Agent aún no se ha iniciado. Por tanto, puedes ignorar estos mensajes:

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

Cuando finalice la compilación, tu aplicación enviará las trazas a Datadog. Puedes comenzar a generar tráfico hacia tu aplicación (por ejemplo, visitando la página /widgets de tu aplicación) para obtener un buen flujo de trazas.

Si quieres asegurarte de que el APM Agent está funcionando correctamente y enviando trazas a Datadog, ejecuta el estado del Datadog Agent; para ello, consulta este [anexo] (#appendix-getting-the-datadog-agent-status). La sección que deberías observar es esta:

```bash
[...]

=========
APM Agent
=========
  Status: Running
  Pid: 54
  Uptime: 85 seconds
  Mem alloc: 13,971,888 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 43 (55,431 bytes)
      Spans received: 129

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:production': 100.0%

  Writer (previous minute)
  ========================
    Traces: 0 payloads, 0 traces, 0 events, 0 bytes
    Stats: 0 payloads, 0 stats buckets, 0 bytes

[...]
```

El resultado anterior demuestra que el APM Agent se está ejecutando correctamente y está enviando trazas a Datadog.

Dirígete a la [sección de trazas de APM][19] para ver tus trazas:

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Trazas de aplicaciones de Ruby en Datadog" >}}

Navega al [catálogo de servicios][20] para ver todos tus servicios de aplicación y una vista de tu servicio de aplicación:

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Service Catalog in Datadog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Ruby application service details page in Datadog" >}}

## Logs

A continuación, configura la purga de logs de Heroku para habilitarlos.

Cuando se utiliza la purga de logs, todos ellos llegan a Datadog desde la misma `ddsource` (normalmente, `heroku`), por lo que no se realiza el parseo automático de logs usando integraciones que no sean de Heroku.

### Genera tus logs de Rails

Para configurar los logs de Rails, Datadog recomienda utilizar Lograge. En esta aplicación de muestra, configúralo de forma que los logs y las trazas estén correlacionados.

Asegúrate de que te encuentras en la carpeta con el código de la aplicación:
```shell
cd ruby-getting-started
```

Edita tu `Gemfile` y añade `lograge`:

```ruby
gem 'lograge'
```

Instala el GEM con `bundle install`:

```shell
bundle install
```

Para configurar Lograge, crea un archivo con el nombre `config/initializers/lograge.rb` y añade lo siguiente:

```ruby
Rails.application.configure do
  # Lograge config
  config.lograge.enabled = true

  # This specifies to log in JSON format
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## Disables log coloration
  config.colorize_logging = false

  # Log to STDOUT
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # Retrieves trace information for current thread
    correlation = Datadog::Tracing.correlation

    {
      # Adds IDs as tags to log output
      :dd => {
        # To preserve precision during JSON serialization, use strings for large numbers
        :trace_id => correlation.trace_id.to_s,
        :span_id => correlation.span_id.to_s,
        :env => correlation.env.to_s,
        :service => correlation.service.to_s,
        :version => correlation.version.to_s
      },
      :ddsource => ["ruby"],
      :params => event.payload[:params].reject { |k| %w(controller action).include? k }
    }
  end
end
```

Haz el despliegue en Heroku:

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### Configura la purga de logs de Heroku

Heroku tiene un enrutador de logs nativo denominado "purga de logs" que recopila logs de todos los dynos que se ejecutan en tu aplicación y los envía a Heroku. Entre estos logs, se incluyen los logs de tu aplicación, los del enrutador de Heroku y los de los dynos del sistema de Heroku. Puedes configurar la purga de logs para enrutarlos hacia Datadog. La purga de logs envía los logs del sistema de Heroku a Datadog desde `ddsource=heroku`.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Vista de logs de Heroku" >}}

Al configurar la purga de logs de Heroku, también se accede a la posibilidad de obtener métricas del sistema de dynos (CPU, memoria) en Datadog.

Para configurar la purga de logs de Heroku desde un terminal, ejecuta lo siguiente:

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

Para obtener métricas del sistema de tus dynos, además de habilitar la purga de logs, debes activar también las [log-runtime-metrics][21]:

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

Después de configurar la purga, tus logs de Heroku aparecerán en la [sección de logs de Datadog][22].

#### Genera métricas de los logs del enrutador de Heroku

Todo el tráfico que se enruta hacia tu aplicación genera un log del enrutador de Heroku:

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Logs del enrutador de Heroku en Datadog" >}}

Como se ha visto, los logs del enrutador de Heroku se parsean de forma automática. Gracias al pipeline de logs de la integración de Heroku, `appname`, `dyno` y `dynotype` se extraen como etiquetas:

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Pipeline de logs de Heroku" >}}

Puedes generar una métrica de latencia basada en esos parámetros parseados.

Ve a Logs -> Generate Metrics (Generar métricas) y haz clic en el botón "+ New Metric" (Nueva métrica):

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="Nueva métrica basada en logs" >}}

Define la consulta como `Source:heroku` para filtrar todos los logs de Heroku. Selecciona el valor `Duration`. Además, querrás poder agrupar esa métrica por `appname`, `dyno`, `dynotype` y `@http.status_code`. Recuerda que las métricas generadas mediante el parseo de logs se consideran métricas personalizadas. Datadog recomienda que se genere tráfico hacia tu aplicación para obtener un buen flujo de nuevas entradas de logs.

Por último, añade un nombre a tu métrica y haz clic en **Create Metric** (Crear métrica):

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="Creación de una nueva métrica basada en logs" >}}

Después de crear la regla, espera unos minutos a que se recopilen las nuevas métricas. A continuación, haz clic en "See in Metric Explorer" (Ver en el navegador de métricas) para visualizar tu nueva métrica:

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="Métricas disponibles basadas en logs" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Vista del navegador de métricas" >}}

#### Genera métricas de Datadog a partir de los logs de métricas de Heroku

Si están configuradas las [log-runtime-metrics][21] para tu aplicación, Heroku generará entradas de logs con métricas del sistema por cada uno de los dynos:

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Entrada de logs del uso de memoria del dyno" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Entrada de logs de uso de la CPU del dyno" >}}

El pipeline de integración de logs de Heroku también parsea estos logs de manera automática. En el proceso, extrae las siguientes `measures`:

```
@heroku.cpu.1m
@heroku.cpu.5m
@heroku.cpu.15m
@heroku.memory.cache
@heroku.memory.quota
@heroku.memory.rss
@heroku.memory.swap
@heroku.memory.total
```

Para obtener más información sobre el significado de cada uno de estos valores, consulta la [documentación oficial de Heroku][23].

Sigue los mismos pasos de la sección anterior para generar métricas con una retención de 15 meses para cada una de esas medidas.

#### Correlaciona logs y trazas

Si sigues las instrucciones de configuración anteriores, los logs enviados desde la purga de logs de Heroku se correlacionan con las trazas.

<div class="alert alert-info">
<strong>Nota</strong>: Heroku genera los logs del enrutamiento y del sistema de Heroku, y no es posible correlacionarlos con las trazas.
</div>

Para comprobar si la configuración se ha realizado correctamente, dirígete a la [vista de logs][24] y verifica que los logs de la aplicación de Rails tengan su traza correlacionada:

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="Correlación de logs y trazas" >}}

## Resumen

En esta guía, se utiliza una aplicación de Rails de muestra, desplegada en Heroku e instrumentada con Datadog para configurar las métricas, las métricas del sistema de dynos, los logs, las trazas y las integraciones.

Para continuar instrumentando tu aplicación con otras integraciones de Datadog, sigue los mismos pasos realizados para la de integración con Postgres, con los archivos de configuración que se encuentran recogidos en la [documentación oficial sobre las integraciones][25].

## Anexo: Cómo consultar el estado del Datadog Agent

Consultar el estado del Datadog Agent es un buen método para confirmar que el Datadog Agent se esté ejecutando correctamente y para depurar posibles problemas. En primer lugar, inicia el SSH en tu dyno con `heroku ps:exec`:

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

Puedes ignorar las advertencias de que `DD_API_KEY` no está configurado, ya que es algo normal. Se debe a que [Heroku no establece variables de configuración para la propia sesión de SSH][26], pero el proceso del Datadog Agent sí puede acceder a ellas.

Una vez que estés en la sesión de SSH, ejecuta el comando de estado de Datadog:

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

  Status date: 2021-04-30 10:49:50.692 UTC (1619779790692)
  Agent start: 2021-04-30 10:32:54.713 UTC (1619778774713)
  Pid: 52
  Go Version: go1.14.12
  Python Version: 3.8.5
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 4
  Log File: /app/.apt/var/log/datadog/datadog.log
  Log Level: info

[...]
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://signup.heroku.com/
[3]: https://git-scm.com/downloads/
[4]: https://devcenter.heroku.com/articles/heroku-cli/
[5]: https://github.com/heroku/ruby-getting-started/
[6]: https://devcenter.heroku.com/articles/getting-started-with-ruby/
[7]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[8]: https://app.datadoghq.com
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/es/agent/basic_agent_usage/heroku/
[11]: https://devcenter.heroku.com/articles/buildpacks/
[12]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1
[13]: https://docs.datadoghq.com/es/agent/basic_agent_usage/heroku/#enabling-integrations
[14]: https://docs.datadoghq.com/es/agent/basic_agent_usage/heroku/#prerun-script
[15]: https://app.datadoghq.com/metric/summary?filter=postgresql
[16]: https://elements.heroku.com/addons/heroku-redis
[17]: https://elements.heroku.com/addons/memcachedcloud
[18]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/
[19]: https://app.datadoghq.com/apm/traces
[20]: https://app.datadoghq.com/services
[21]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[22]: https://app.datadoghq.com/logs/livetail
[23]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[24]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[25]: https://docs.datadoghq.com/es/integrations/
[26]: https://devcenter.heroku.com/articles/exec#environment-variables