---
aliases:
- /es/tracing/ruby/
- /es/tracing/languages/ruby/
- /es/tracing/setup/ruby/
- /es/tracing/setup_overview/ruby/
- /es/agent/apm/ruby/
- /es/tracing/setup_overview/setup/ruby
- /es/tracing/trace_collection/ruby
- /es/tracing/trace_collection/dd_libraries/ruby/
code_lang: ruby
code_lang_weight: 15
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/GettingStarted.md
title: Rastreo de aplicaciones Ruby
type: multi-code-lang
---
<div class="alert alert-info">Esta documentación es para gem v2.x de <code>Datadog</code>. Si buscas la documentación de <code>ddtrace</code> gem v1.x, consulta la documentación legacy de <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby_v1/">Rastreo de aplicaciones Ruby</a>.</div>

`datadog` es la biblioteca de rastreo de Datadog para Ruby. Incluye un conjunto de herramientas que proporcionan visibilidad sobre el rendimiento y la seguridad de las aplicaciones Ruby, para permitir a los desarrolladores de Ruby identificar cuellos de botella y otros problemas.

## Empezando

**Si estás actualizando desde una versión 0.x, consulta nuestra [guía de actualización](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10).**

Para la documentación general de APM, consulta nuestra [documentación de configuración][documentos de configuración].

Para obtener más información sobre el aspecto de APM una vez que la aplicación envía información a Datadog, consulta [Términos y conceptos][documentos de visualización].

Para la documentación de la API de biblioteca, consulta nuestra [documentación de YARD][documentos de yard].

Para contribuir, consulta las [directrices de contribución][documentos de contribución] y la [guía de desarrollo][documentos de desarrollo].

[documentos de configuración]: https://docs.datadoghq.com/tracing/
[documentos de desarrollo]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[documentos de visualización]: https://docs.datadoghq.com/tracing/glossary/
[documentos de contribución]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[documentos de desarrollo]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[documentos del yard]: https://www.rubydoc.info/gems/datadog/

## Requisitos de compatibilidad

Para obtener una lista completa de la compatibilidad de Datadog con la biblioteca de Ruby, consulta [Requisitos de compatibilidad][1].

## Instalación

La incorporación de rastreo a tu aplicación Ruby solo requiere unos pocos pasos:

1. Configuración del Datadog Agent para el rastreo
2. Instrumentación de tu aplicación
3. Conexión de tu aplicación al Datadog Agent

### Configuración del Datadog Agent para el rastreo

Antes de instalar `datadog`, [instala el Datadog Agent](https://docs.datadoghq.com/agent/), al que `datadog` enviará datos de traza (trace).

A continuación, configura el Datadog Agent para aceptar trazas (traces). Para ello:

- Fija `DD_APM_ENABLED=true` en el entorno del Agent

O

- Añade `apm_enabled: true` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

_Además, en entornos contenedorizados..._

- Fija `DD_APM_NON_LOCAL_TRAFFIC=true` en el entorno del Agent

O

- Añade `apm_non_local_traffic: true` en el [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file).

Consulta las instrucciones de configuración específica para [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby) o [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection) para asegurar que el Agent esté configurado para recibir trazas en un entorno contenedorizado.

#### Configuración de la ingesta de datos de traza

El Datadog Agent escuchará trazas por HTTP en el puerto `8126` por defecto.

Puedes cambiar el protocolo o puerto que escucha el Agent para los datos de traza utilizando lo siguiente:

**Para HTTP sobre TCP**:

- Fija `DD_APM_RECEIVER_PORT=<port>` en el entorno del Agent

O

- Añade `apm_config: receiver_port: <port>` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

**Para Unix Domain Socket (UDS)**:

- Establece `DD_APM_RECEIVER_SOCKET=<path-to-socket-file>`

O

- Añade `apm_config: receiver_socket: <path-to-socket-file>` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

### Instrumentación de tu aplicación

#### Aplicaciones Rails o Hanami

1. Añade el gem `datadog` a tu Gemfile:

   ```ruby
   source 'https://rubygems.org'
   gem 'datadog', require: 'datadog/auto_instrument'
   ```

2. Instala el gem con `bundle install`

3. Crea un archivo `config/initializers/datadog.rb` que contenga:

   ```ruby
   Datadog.configure do |c|
     # Add additional configuration here.
     # Activate integrations, change tracer settings, etc...
   end
   ```

   Con este bloque puedes:

   - [Añadir ajustes adicionales de configuración](#additional-configuration)
   - [Activar o reconfigurar la instrumentación](#integration-instrumentation)

#### Otras aplicaciones Ruby 

Si tu aplicación no utiliza los gems admitidos (Rails o Hanami) anteriores, puedes configurarla de la siguiente manera:

1. Añade el gem `datadog` a tu Gemfile:

   ```ruby
   source 'https://rubygems.org'
   gem 'datadog'
   ```

2. Instala el gem con `bundle install`
3. `require` cualquier [biblioteca o marco compatible](#integración-Instrumentación) que deban ser instrumentados.
4. Añade `require 'datadog/auto_instrument'` a tu aplicación. _Nota:_ Esto debe hacerse _después_ de requerir cualquier biblioteca o marco compatible.

   ```ruby
   # Example frameworks and libraries
   require 'sinatra'
   require 'faraday'
   require 'redis'

   require 'datadog/auto_instrument'
   ```

5. Añade un bloque de configuración a tu aplicación:

   ```ruby
   Datadog.configure do |c|
     # Add additional configuration here.
     # Activate integrations, change tracer settings, etc...
   end
   ```

   Con este bloque puedes:

   - [Añadir ajustes adicionales de configuración](#additional-configuration)
   - [Activar o reconfigurar la instrumentación](#integration-instrumentation)

#### Configuración de OpenTelemetry

Puedes enviar trazas de OpenTelemetry directamente al Datadog Agent (sin `datadog`) mediante OTLP. Consulta nuestra documentación sobre [Ingesta de OTLP en el Datadog Agent](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent) para obtener más detalles.

### Conexión de tu aplicación al Datadog Agent

Por defecto, `datadog` se conectará al Agent mediante la primera configuración disponible en la lista de prioridades:

1. A través de cualquier ajuste disponible explícitamente en la configuración (nombre de host/puerto/transporte)
2. A través de Unix Domain Socket (UDS) situado en `/var/run/datadog/apm.socket`
3. A través de HTTP sobre TCP a `127.0.0.1:8126`

Si tu Datadog Agent está escuchando en cualquiera de estas localizaciones, no debería ser necesario ninguna otra configuración.

Si tu Agent se ejecuta en un host o contenedor diferente al de tu aplicación, o si deseas enviar trazas a través de un protocolo diferente, deberás configurar tu aplicación en consecuencia.

- [Cómo enviar datos de traza a través de HTTP sobre TCP al Agent](#changing-default-agent-hostname-and-port)
- [Cómo enviar datos de traza a través de Unix Domain Socket (UDS) al Agent](#unix-domain-socket-uds)

### Pasos finales para la instalación

Tras la configuración, tus servicios aparecerán en la [página de servicios de APM](https://app.datadoghq.com/apm/services) en unos minutos. Más información sobre [el uso de la interfaz de usuario de APM][documentos de visualización].

## Instrumentación manual

Si no está utilizando una instrumentación de marco compatible, es posible que desees instrumentar manualmente tu código.

Para rastrear cualquier código de Ruby, puedes utilizar el método `Datadog::Tracing.trace`:

```ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # Encierre este bloque en el código que deseas instrumentar
  # Además, puedes modificar el tramos aquí.
  # Por ejemplo, cambiar el nombre de recurso, configurar etiquetas, etc. ...
end
```

Donde `name` debe ser una `String` que describa el tipo genérico de operación que se está realizando (por ejemplo `'web.request'`, o `'request.parse'`)

Y `options` son los siguientes argumentos de palabra clave opcionales:

| Clave             | Tipo                   | Descripción                                                                                                                                                                                                                                                                                               | Predeterminado                                                            |
| --------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `autostart`     | `Bool`                 | Si la medición del tiempo debe iniciarse automáticamente. Si es `false`, el usuario debe llamar a `span.start`.                                                                                                                                                                                                    | `true`                                                             |
| `continue_from` | `Datadog::TraceDigest` | Continúa una traza que se originó en otro contexto de ejecución. TraceDigest describe el punto de continuación.                                                                                                                                                                                           | `nil`                                                              |
| `on_error`      | `Proc`                 | Anula el comportamiento de gestión de errores, cuando un tramo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto.                                                                                                                                                              | `proc {\| span, error \| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`               | Nombre del recurso o acción sobre el que se está trabajando. Las trazas con el mismo valor de recurso se agruparán para las métricas (pero igual puedes verlas de forma independiente.) Suele ser específico de un dominio, como una URL, consulta, solicitud, etc. (por ejemplo, `'Article#submit'`, `http://example.com/articles/list`). | `name` del tramo.                                                    |
| `service`       | `String`               | El nombre del servicio al que pertenece este tramo (por ejemplo, `'my-web-service'`)                                                                                                                                                                                                                                        | Trazador `default-service`, `$PROGRAM_NAME` o `'ruby'`              |
| `start_time`    | `Time`                 | Cuando el tramo comienza realmente. Es útil cuando se rastrean eventos que ya han ocurrido.                                                                                                                                                                                                                     | `Time.now`                                                         |
| `tags`          | `Hash`                 | Etiquetas adicionales que deben añadirse al tramo.                                                                                                                                                                                                                                                             | `{}`                                                               |
| `type`          | `String`               | El tipo de tramo (como `'http'`, `'db'`, etc.)                                                                                                                                                                                                                                                     | `nil`                                                              |

Es altamente recomendado que establezcas tanto `service` y `resource` como mínimo. Los tramos sin un `service` o `resource` como `nil` será descartado por el Datadog Agent.

Ejemplo de instrumentación manual en acción:

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # Rastrear la llamada activerecord
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Añadir etiquetas de APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Rastrear el renderizado de la plantilla
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Rastreo asíncrono

Puede que no siempre sea posible encerrar un bloque de código con `Datadog::Tracing.trace`. Es posible que algún evento o notificación basado en la instrumentación solo te notifique cuando comienza o termina un evento.

Para rastrear estas operaciones, puedes rastrear el código de forma asíncrona llamando a `Datadog::Tracing.trace` sin un bloque:

```ruby
# Algún marco de instrumentación llama a esto después de que finaliza un evento...
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

Llamar a `Datadog::Tracing.trace` sin un bloque hará que la función devuelva un `Datadog::Tracing::SpanOperation` que está iniciado, pero no terminado. A continuación, puedes modificar este tramo como desees y luego cerrarlo `finish`.

_No debes dejar ningún tramo sin terminar._ Si queda algún tramo abierto cuando la traza finalice, ésta será descartada. Puedes [activar el modo de depuración](#additional-configuration) para buscar avisos si sospechas que esto puede estar ocurriendo.

Para evitar este escenario al manejar eventos de inicio/finalización, puedes utilizar `Datadog::Tracing.active_span` para obtener el tramo activo en ese momento.

```ruby
# Por ejemplo, ActiveSupport::Notifications llama a esto cuando inicia un evento
def start(name, id, payload)
  # Iniciar un tramo
  Datadog::Tracing.trace(name)
end

# Por ejemplo, ActiveSupport::Notifications llama a esto cuando finaliza un evento
def finish(name, id, payload)
  # Recuperar el tramo activo en ese momento (thread-safe)
  current_span = Datadog::Tracing.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```

### Mejora de trazas a partir de métodos anidados

Puedes etiquetar información adicional al tramo activo en ese momento desde cualquier método. Sin embargo, considera que, si se llama al método y no hay ningún tramo activo en ese momento, `active_span` será nulo.

```ruby
# Por ejemplo, añadir una etiqueta a un tramo activo

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

También puedes obtener la traza activa en ese momento con el método `active_trace`. Este método devolverá `nil` si no hay ninguna traza activa.

```ruby
# Por ejemplo, acceder a la traza activa

current_trace = Datadog::Tracing.active_trace
```

## Instrumentación de la integración

Muchas de las bibliotecas y los marcos más populares son compatibles de forma predefinida, por lo que pueden autoinstrumentarse. Aunque no se activan automáticamente, pueden activarse y configurarse en pocos pasos mediante la API `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Activa y configura una integración
  c.tracing.instrument :integration_name, **options
end
```

`options` son argumentos de palabra clave para la configuración específica de la integración.

Para obtener una lista de las integraciones disponibles y sus versiones compatibles, consulta [Compatibilidad de la integración de Ruby][2].

Para obtener una lista de las opciones de configuración de las integraciones disponibles, consulta lo siguiente:

#### CI Visibility

Consulta [Biblioteca de Ruby de Datadog para instrumentar tu pipeline de integración de pruebas e integración continua](https://github.com/Datadog/datadog-ci-rb)

### Action Cable

La integración de Action Cable rastrea mensajes de emisión y acciones de canal.

Puedes activarla a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_cable, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ACTION_CABLE_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Acción Mailer

La integración de Action Mailer ofrece rastreo para las acciones de Rails 5 ActionMailer.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave          | Variable de entorno | Tipo   | Descripción                                                                                                                                                                         | Predeterminado |
| ------------ | - | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ACTION_MAILER_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `email_data` | | `Bool` | Si se añaden o no metadatos adicionales de carga útil de correo electrónico a tramos de `action_mailer.deliver`. Los campos incluyen `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']`. | `false` |

### Action Pack

La mayoría de las veces, Action Pack se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'actionpack'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_pack, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ACTION_PACK_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Action View

La mayoría de las veces, Action View se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'actionview'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                  | Variable de entorno | Tipo     | Descripción                                                                                                                        | Predeterminado    |
| -------------------- | - | ------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `enabled` | `DD_TRACE_ACTION_VIEW_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `template_base_path` | | `String` | Se utiliza cuando se analiza el nombre de la plantilla. Si no almacenas tus plantillas en la carpeta `views/`, puede que necesites cambiar este valor. | `'views/'` |

### Active Job

La mayoría de las veces, Active Job se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'active_job'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_job, **options
end

ExampleJob.perform_later
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ACTIVE_JOB_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Active Model Serializers

La integración de Active Model Serializers rastrea el evento `serialize` para la versión 0.9+ y el evento `render` para la versión 0.10+.

```ruby
require 'active_model_serializers'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_model_serializers, **options
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ACTIVE_MODEL_SERIALIZERS_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Active Record

La mayoría de las veces, Active Record se configura como parte de un marco web (Rails, Sinatra...) sin embargo, puede configurarse solo:

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno | Tipo     | Descripción                                                                                                                                                    | Predeterminado                                    |
| -------------- | - | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `enabled` | `DD_TRACE_ACTIVE_RECORD_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | | `String` | Anula el nombre del servicio para la instrumentación de la consulta SQL. La instrumentación de la creación de instancias de ActiveRecord siempre utiliza el nombre de servicio configurado de la aplicación. | Nombre del adaptador de base de datos (por ejemplo, `'mysql2'`) |

**Configuración de los ajustes de traza por base de datos**

Puedes configurar los ajustes de traza por conexión de base de datos mediante la opción `describes`:

```ruby
# Brindar una opción `:describes` con una clave de conexión.
# Cualquiera de las siguientes claves son aceptables y equivalentes entre sí.
# Si proporcionas un bloque, devuelve un objeto de Configuración que
# acepta cualquiera de las opciones de configuración mencionadas anteriormente.

Datadog.configure do |c|
  # El símbolo coincide con la conexión de tu base de datos en config/database.yml
  # Solo está disponible si estás usando Rails con ActiveRecord.
  c.tracing.instrument :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # Patrón de configuración en bloque.
  c.tracing.instrument :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # Cadena de conexión con los siguientes ajustes de conexión:
  # adaptador, nombre de usuario, host, puerto, base de datos
  # Se ignoran otros campos.
  c.tracing.instrument :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # Hash con los siguientes ajustes de configuración:
  # adaptador, nombre de usuario, host, puerto, base de datos
  # Se ignoran otros campos.
  c.tracing.instrument :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'

  # Si usas el gem `makara`, es posible coincidir en la conexión de `role`:
  c.tracing.instrument :active_record, describes: { makara_role: 'primary' }, service_name: 'primary-db'
  c.tracing.instrument :active_record, describes: { makara_role: 'replica' }, service_name: 'secondary-db'
end
```

También puedes crear configuraciones basadas en la coincidencia parcial de los campos de conexión a la base de datos:

```ruby
Datadog.configure do |c|
  # Coincide cualquier conexión en el host `127.0.0.1`.
  c.tracing.instrument :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # Coincide cualquier conexión `mysql2`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # Coincide cualquier conexión `mysql2` con la base de datos `reports`.
  #
  # En caso de múltiples configuraciones de `describe` coincidentes, aplica la más reciente.
  # En este caso, una conexión con el adaptador `mysql` y la base de datos `reports`
  # se configurará `service_name: 'reports-db'`, no `service_name: 'mysql-db'`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

Cuando varias configuraciones de `describes` coincidan con una conexión, se aplicará la última regla configurada que coincida.

Si ActiveRecord rastrea un evento que utiliza una conexión que coincide con una clave definida por `describes`, utilizará la configuración de traza asignada a esa conexión. Si la conexión no coincide con ninguna de las conexiones descritas, utilizará en su lugar la configuración predeterminada definida por `c.tracing.instrument :active_record`.

### Active Support

La mayoría de las veces, Active Support se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'activesupport'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

`options` son los siguientes argumentos de palabra clave:

| Clave             | Variable de entorno | Tipo     | Descripción                                                                                                                                                                                        | Predeterminado                |
| --------------- | - | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `enabled` | `DD_TRACE_ACTIVE_SUPPORT_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `cache_service` | | `String` | Nombre de la aplicación que ejecuta la instrumentación de `active_support`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `active_support-cache` |

### AWS

La integración de AWS rastreará cada interacción (por ejemplo, llamadas a la API) con servicios de AWS (S3, ElastiCache, etc.).

```ruby
require 'aws-sdk'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# Realizar llamada rastreada
Aws::S3::Client.new.list_buckets
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                     | Tipo     | Descripción                                                                                                                                                                             | Predeterminado |
| -------------- | --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_AWS_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_AWS_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `aws`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `aws`   |
| `peer_service` | `DD_TRACE_AWS_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                    | `nil`   |

### Concurrent Ruby

La integración de Concurrent Ruby añade soporte para la propagación de contexto cuando se utiliza `::Concurrent::Future` y `Concurrent::Async`, y asegura que el código rastreado dentro de `Future#execute` y `Concurrent::Async#async` tenga el conjunto principal correcto.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
# Inside Rails initializer or equivalent
Datadog.configure do |c|
  # Patches ::Concurrent::Future to use ExecutorService that propagates context
  c.tracing.instrument :concurrent_ruby, **options
end

# Pass context into code executed within Concurrent::Future
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end

# Pass context into code executed within Concurrent::Async
class MyClass
  include ConcurrentAsync

  def foo
    Datadog::Tracing.trace('inner') { }
  end
end

Datadog::Tracing.trace('outer') do
  MyClass.new.async.foo
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_CONCURRENT_RUBY_ENABLED` | `Bool` | Si la integración propaga contextos. | `true` |

### Dalli

La integración de Dalli rastreará todas las llamadas a tu servidor `memcached`:

```ruby
require 'dalli'
require 'datadog'

# Configura el comportamiento de rastreo de Dalli
Datadog.configure do |c|
  c.tracing.instrument :dalli, **options
end

# Configura el comportamiento de rastreo de Dalli para un cliente único
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

`options` son los siguientes argumentos de palabra clave:

| Clave               | Variable de entorno                              | Tipo     | Descripción                                                                                                                                                                               | Predeterminado     |
| ----------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enabled` | `DD_TRACE_DALLI_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `command_enabled` | `DD_TRACE_MEMCACHED_COMMAND_ENABLED` | `Bool`   | Recopila comandos como la etiqueta `memcached.command`. El comando `keys` puede contener información potencialmente confidencial.                                                                            | `false`     |
| `service_name`    | `DD_TRACE_DALLI_SERVICE_NAME`        | `String` | Nombre de la aplicación que ejecuta la instrumentación de `dalli`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `memcached` |
| `peer_service`    | `DD_TRACE_DALLI_PEER_SERVICE`        | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`       |

### DelayedJob

La integración de DelayedJob utiliza hooks de ciclo de vida para rastrear las ejecuciones y colas de trabajos.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave        | Variable de entorno | Tipo   | Descripción                                                                                                                                                                 | Predeterminado                                                           |
| ---------- | - | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_DELAYED_JOB_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `on_error` | | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Elasticsearch

La integración de Elasticsearch rastreará cualquier llamada a `perform_request` en el objeto `Client`:

```ruby
require 'elasticsearch/transport'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :elasticsearch, **options
end

# Realiza una consulta a Elasticsearch
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'

# Es caso que desees anular la configuración global de una instancia de cliente particular
Datadog.configure_onto(client.transport, **options)
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                               | Tipo     | Descripción                                                                                                                                                                                       | Predeterminado         |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `enabled` | `DD_TRACE_ELASTICSEARCH_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_ELASTICSEARCH_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `elasticsearch`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `elasticsearch` |
| `peer_service` | `DD_TRACE_ELASTICSEARCH_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                              | `nil`           |
| `quantize`     |                                       | `Hash`   | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo.       | `{}`            |

### Ethon

La integración `ethon` rastreará cualquier solicitud HTTP a través de objetos `Easy` o `Multi`. Ten en cuenta que esta integración también es compatible con la biblioteca `Typhoeus` que se basa en `Ethon`.

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :ethon, **options

  # opcionalmente, especifique un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                       | Tipo     | Descripción                                                                                                                                                                               | Predeterminado |
| --------------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_ETHON_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_ETHON_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `ethon`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `ethon` |
| `peer_service`        | `DD_TRACE_ETHON_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | `Bool`   | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | `Bool`   | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                           | `false` |

### Excon

La integración de `excon` está disponible a través del middleware `datadog`:

```ruby
require 'excon'
require 'datadog'

# Configurar el comportamiento de rastreo de Excon predeterminado
Datadog.configure do |c|
  c.tracing.instrument :excon, **options

  # Opcionalmente, especifica un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end

connection = Excon.new('https://example.com')
connection.get
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                             | Tipo             | Descripción                                                                                                                                                                                                                                                                        | Predeterminado                                                           |
| --------------------- | ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_EXCON_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_EXCON_SERVICE_NAME`       | `String`         | Nombre de la aplicación que ejecuta la instrumentación de `excon`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                          | `excon`                                                           |
| `peer_service`        | `DD_TRACE_EXCON_PEER_SERVICE`       | `String`         | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                               | `nil`                                                             |
| `distributed_tracing` |                                     | `Bool`           | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                                                                                                                | `true`                                                            |
| `split_by_domain`     |                                     | `Bool`           | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                                                                                                    | `false`                                                           |
| `on_error`            |                                     | `Proc`           | Gestor de errores personalizado que se invoca cuando una solicitud genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto.                                                                                                                                           | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `error_status_codes`  | `DD_TRACE_EXCON_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...600]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `400...600`                                                       |

**Ajuste de las conexiones para utilizar diferentes configuraciones**

Si utilizas múltiples conexiones con Excon, puedes dar a cada una de ellas diferentes ajustes configurando sus constructores con middleware:

```ruby
# Encierra el middleware de rastreo de Datadog en el stack de middleware predeterminado
Excon.new(
  'http://example.com',
  middlewares: Datadog::Tracing::Contrib::Excon::Middleware.with(options).around_default_stack
)

# Inserta el middleware en un stack de middleware predeterminado.
# NOTA: El middleware de traza debe insertarse después de ResponseParser.
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Tracing::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

Donde `options` es un hash que contiene cualquiera de los parámetros enumerados en la tabla anterior.

### Faraday

La integración de `faraday` está disponible a través del middleware `datadog`:

```ruby
require 'faraday'
require 'datadog'

# Configura el comportamiento de rastreo predeterminado de Faraday
Datadog.configure do |c|
  c.tracing.instrument :faraday, **options

  # opcionalmente, especifique un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # Solo es necesario si if split_by_domain es true por defecto
  end
end

# En caso que desees anular la configuración global para una instancia de cliente determinada
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:datadog_tracing, **options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                               | Tipo             | Descripción                                                                                                                                                                                                                                                                        | Predeterminado                                                           |
| --------------------- | ------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_FARADAY_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_FARADAY_SERVICE_NAME`       | `String`         | Nombre de la aplicación que ejecuta la instrumentación de `faraday`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                        | `faraday`                                                         |
| `peer_service`        | `DD_TRACE_FARADAY_PEER_SERVICE`       | `String`         | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                               | `nil`                                                             |
| `distributed_tracing` |                                       | `Bool`           | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                                                                                                                | `true`                                                            |
| `split_by_domain`     |                                       | `Bool`           | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                                                                                                    | `false`                                                           |
| `on_error`            |                                       | `Proc`           | Gestor de errores personalizado que se invoca cuando una solicitud genera un error. Con `span` y `error` como argumentos. Establece un error en el tramo por defecto.                                                                                                                                        | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `error_status_codes`  | `DD_TRACE_FARADAY_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...600]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `400...600`                                                       |

### Grape

La integración de Grape añade la instrumentación a los endpoints y filtros de Grape. Esta integración puede funcionar en conjunto con otras integraciones como Rack y Rails.

Para activar tu integración, utiliza el método `Datadog.configure` antes de definir tu aplicación Grape:

```ruby
# api.rb
require 'grape'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :grape, **options
end

# Luego define tu aplicación
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                  | Variable de entorno                             | Tipo             | Descripción                                                                                                                                                                                                                                                                        | Predeterminado     |
| -------------------- | ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enabled` | `DD_TRACE_GRAPE_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `error_status_codes` | `DD_TRACE_GRAPE_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...600]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `500...600` |

### GraphQL

La integración de GraphQL activa la instrumentación para las consultas de GraphQL.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
# Dentro del inicializador de Rails o equivalente
Datadog.configure do |c|
  c.tracing.instrument :graphql, schemas: [YourSchema], **options
end

# Luego ejecuta una consulta de GraphQL
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

El método `instrument :graphql` acepta los siguientes parámetros. Se pueden sustituir opciones adicionales por `options`:

| Clave                      | Variable de entorno | Tipo     | Descripción                                                                                                                                                  | Predeterminado          |
| ------------------------ | - | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `enabled` | `DD_TRACE_GRAPHQL_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `schemas`                | | `Array`  | Matriz de objetos `GraphQL::Schema` (que solo admiten esquemas basados en clases) a rastrear. Si no proporcionas ninguno, el rastreo se aplicará a todos los esquemas. | `[]`             |
| `with_unified_tracer`    | | `Bool`   | Actívalo para instrumentar con el rastreador de `UnifiedTrace`, habilitando el soporte para el Catálogo de API. `with_deprecated_tracer` tiene prioridad sobre esto. Por defecto es `false`, con `GraphQL::Tracing::DataDogTrace` (Añadido en v2.2)  | `false` |
| `with_deprecated_tracer` | | `Bool`   | Actívalo para instrumentar con el `GraphQL::Tracing::DataDogTracing` obsoleto. Por defecto es `false`, con `GraphQL::Tracing::DataDogTrace`                          | `false`          |
| `service_name`           | | `String` | Nombre de servicio utilizado parala instrumentación de GraphQL                                                                                                                | `'ruby-graphql'` |

**Configuración manual de esquemas de GraphQL**

Si prefieres configurar individualmente los ajustes del rastreador para un esquema (por ejemplo, si tienes varios esquemas), en la definición del esquema, puedes añadir lo siguiente [utilizando la API de GraphQL](http://graphql-ruby.org/queries/tracing.html):

Con `GraphQL::Tracing::DataDogTrace`

```ruby
class YourSchema < GraphQL::Schema
  trace_with GraphQL::Tracing::DataDogTrace
end
```

Con `UnifiedTracer` (Añadido en v2.2)

```ruby
class YourSchema < GraphQL::Schema
  trace_with Datadog::Tracing::Contrib::GraphQL::UnifiedTrace
end
```

o con `GraphQL::Tracing::DataDogTracing` (obsoleto)

```ruby
class YourSchema < GraphQL::Schema
  use(GraphQL::Tracing::DataDogTracing)
end
```

**Nota**: Esta integración no admite esquemas de estilo definido. Solo admite esquemas basados en clases.

_NO_ `instrument :graphql` en `Datadog.configure` si eliges configurar manualmente, para evitar el doble rastreo. Estas dos formas de configurar el rastreo de GraphQL se consideran mutuamente excluyentes.

**Añadir etiquetas personalizadas a tramos de Datadog**

Puedes añadir etiquetas personalizadas a tramos de Datadog al desplegar el método `prepare_span` en una subclase y, luego, configurar manualmente tu esquema.

```ruby
class YourSchema < GraphQL::Schema
  module CustomTracing
    include Datadog::Tracing::Contrib::GraphQL::UnifiedTrace
    def prepare_span(trace_key, data, span)
      span.set_tag("custom:#{trace_key}", data.keys.sort.join(","))
    end
  end

  trace_with CustomTracing
end
```

### gRPC

La integración de `grpc` añade interceptores de cliente y servidor, que se ejecutan como middleware antes de ejecutar la llamada al procedimiento remoto del servicio. Como las aplicaciones gRPC suelen estar distribuidas, la integración comparte información de traza entre el cliente y el servidor.

Para configurar tu integración, utiliza el método `Datadog.configure` de la siguiente manera:

```ruby
require 'grpc'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :grpc, **options
end

# Lado del servidor
server = GRPC::RpcServer.new
server.add_http2_port('localhost:50051', :this_port_is_insecure)
server.handle(Demo)
server.run_till_terminated

# Lado del cliente
client = Demo.rpc_stub_class.new('localhost:50051', :this_channel_is_insecure)
client.my_endpoint(DemoMessage.new(contents: 'hello!'))
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                      | Tipo     | Descripción                                                                                                                                                                              | Predeterminado                                                            |
| --------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `enabled` | `DD_TRACE_GRPC_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_GRPC_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `grpc`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `grpc`                                                             |
| `peer_service`        | `DD_TRACE_GRPC_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                     | `nil`                                                              |
| `distributed_tracing` |                              | `Bool`   | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                      | `true`                                                             |
| `on_error`            |                              | `Proc`   | Gestor de errores personalizado que se invoca cuando se produce un error. Un `Proc` que acepta los parámetros `span` y `error`. Establece el error en el tramo por defecto.                                             | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

**Ajuste de los clientes para utilizar diferentes configuraciones**

En situaciones en las que haya varios clientes que llamen a varios servicios distintos, puedes pasar el interceptor de Datadog directamente, de la siguiente manera:

```ruby
configured_interceptor = Datadog::Tracing::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

La integración asegurará que `configured_interceptor` establezca una configuración de rastreo única para esa instancia de cliente.

### hanami

La integración de `hanami` instrumentará el enrutamiento, la acción y el renderizado de tu aplicación hanami. Para activar la instrumentación `hanami`, es recomendado autoinstrumentar con

```
gem 'datadog', require: 'datadog/auto_instrument'
```

y crear un archivo inicializador en tu carpeta `config/initializers`:

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno | Tipo     | Descripción                                | Predeterminado |
| -------------- | - | ------- | ------------------------------------------ | ------- |
| `enabled` | `DD_TRACE_HANAMI_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | | `String` | Nombre de servicio para la instrumentación de `hanami`. | `nil`   |

### http.rb

La integración de http.rb rastreará cualquier llamada HTTP mediante el gem Http.rb.

```ruby
require 'http'
require 'datadog'
Datadog.configure do |c|
  c.tracing.instrument :httprb, **options
  # opcionalmente, especifica un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                              | Tipo             | Descripción                                                                                                                                                                                                                                                                            | Predeterminado     |
| --------------------- | ------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enabled` | `DD_TRACE_HTTPRB_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_HTTPRB_SERVICE_NAME`       | `String`         | Nombre de la aplicación que ejecuta la instrumentación de `httprb`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                             | `httprb`    |
| `peer_service`        | `DD_TRACE_HTTPRB_PEER_SERVICE`       | `String`         | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                                   | `nil`       |
| `distributed_tracing` |                                      | `Bool`           | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                                                                                                                    | `true`      |
| `split_by_domain`     |                                      | `Bool`           | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                                                                                                        | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTPRB_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...**600**]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `400...600` |

### httpclient

La integración httpclient rastreará cualquier llamada HTTP mediante el gem httpclient.

```ruby
require 'httpclient'
require 'datadog'
Datadog.configure do |c|
  c.tracing.instrument :httpclient, **options
  # opcionalmente, especifica un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                                  | Tipo             | Descripción                                                                                                                                                                                                                                                                        | Predeterminado      |
| --------------------- | ---------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `enabled` | `DD_TRACE_HTTPCLIENT_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_HTTPCLIENT_SERVICE_NAME`       | `String`         | Nombre de la aplicación que ejecuta la instrumentación de `httpclient`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                     | `httpclient` |
| `peer_service`        | `DD_TRACE_HTTPCLIENT_PEER_SERVICE`       | `String`         | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                               | `nil`        |
| `distributed_tracing` |                                          | `Bool`           | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                                                                                                                | `true`       |
| `split_by_domain`     |                                          | `Bool`           | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                                                                                                    | `false`      |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...600]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `400...600`  |

### httpx

`httpx` mantiene su [propia integración con `datadog`](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter):

```ruby
require "datadog"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.tracing.instrument :httpx

  # opcionalmente, especifica un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end
```

### Kafka

La integración de Kafka proporciona un rastreo del gem `ruby-kafka`:

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'active_support/notifications' # required to enable 'ruby-kafka' instrumentation
require 'kafka'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :kafka, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_KAFKA_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### MongoDB

La integración rastrea cualquier `Command` que se envía desde el [controlador de MongoDB Ruby](https://github.com/mongodb/mongo-ruby-driver) a un clúster de MongoDB. Por extensión, los Object Document Mappers (ODM) como Mongoid se instrumentan automáticamente si utilizan el controlador oficial de Ruby. Para activar la integración, simplemente:

```ruby
require 'mongo'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :mongo, **options
end

# Crea un cliente de MongoDB y úsalo como siempre
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# En caso que desees anular la configuración global para una instancia de cliente determinado
Datadog.configure_onto(client, **options)
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                       | Tipo     | Descripción                                                                                                                                                                                 | Predeterminado                                          |
| -------------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `enabled` | `DD_TRACE_MONGO_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_MONGO_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `mongo`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)   | `mongodb`                                        |
| `peer_service` | `DD_TRACE_MONGO_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                        | `nil`                                            |
| `quantize`     |                               | `Hash`   | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo. | `{ show: [:collection, :database, :operation] }` |

**Configuración de los ajustes de traza por conexión**

Puedes configurar los ajustes de traza por conexión mediante la opción `describes`:

```ruby
# Proporciona una opción `:describes` con una clave de conexión.
# Cualquiera de las siguientes claves son aceptables y equivalentes entre sí.
# Si se brinda un bloque, devuelve un objeto de configuración que
# acepta cualquier opción de configuración mencionada anteriormente.

Datadog.configure do |c|
  # Cadena de conexión de red
  c.tracing.instrument :mongo, describes: '127.0.0.1:27017', service_name: 'mongo-primary'

  # Expresión regular de conexión de red
  c.tracing.instrument :mongo, describes: /localhost.*/, service_name: 'mongo-secondary'
end

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# La llamada rastreada pertenecerá al servicio `mongo-primary`

client = Mongo::Client.new([ 'localhost:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# La llamada rastreada pertenecerá al servicio `mongo-secondary`
```

Cuando varias configuraciones de `describes` coincidan con una conexión, se aplicará la última regla configurada que coincida.

### MySQL2

La integración de MySQL2 rastrea cualquier comando SQL enviado a través del gem `mysql2`.

```ruby
require 'mysql2'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                        | Tipo     | Descripción                                                                                                                                                                                                                                                                                                                                                              | Predeterminado                                                           |
| --------------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_MYSQL2_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_MYSQL2_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `mysql2`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                                                                                                               | `mysql2`                                                          |
| `peer_service`        | `DD_TRACE_MYSQL2_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                                                                                                                     | `nil`                                                             |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`      | `String` | Modo de propagación de comentarios SQL para la monitorización de base de datos. <br />(ejemplo: `disabled` \| `service`\| `full`). <br /><br />**Importante**: _Ten en cuenta que al activar la propagación de comentarios SQL se almacenan datos potencialmente confidenciales (nombres de servicio) en las bases de datos, a los que pueden acceder terceros con acceso a la base de datos._ | `'disabled'`                                                      |
| `on_error`            |                                | `Proc`   | Gestor de errores personalizado que se invoca cuando MySQL genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores gestionados a nivel de aplicación.                                                                                                                                                              | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Net/HTTP

La integración de Net/HTTP rastreará cualquier llamada HTTP utilizando el módulo estándar lib Net::HTTP.

```ruby
require 'net/http'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :http, **options

  # opcionalmente, especifica un nombre de servicio diferente para nombres de host que coinciden con un regex
  c.tracing.instrument :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Solo es necesario si split_by_domain es true por defecto
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                            | Tipo             | Descripción                                                                                                                                                                                                                                                                        | Predeterminado     |
| --------------------- | ---------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enabled` | `DD_TRACE_HTTP_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_NET_HTTP_SERVICE_NAME`   | `String`         | Nombre de la aplicación que ejecuta la instrumentación de `net/http`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                       | `net/http`  |
| `peer_service`        | `DD_TRACE_NET_HTTP_PEER_SERVICE`   | `String`         | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                               | `nil`       |
| `distributed_tracing` |                                    | `Bool`           | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                                                                                                                | `true`      |
| `split_by_domain`     |                                    | `Bool`           | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                                                                                                    | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTP_ERROR_STATUS_CODES` | `Array`\|`Range` | Define los códigos de estado HTTP que se rastrean como errores. El valor puede ser un rango (`400...600`), o una matriz de rangos/enteros `[403, 500...600]`. Si se configura con la variable de entorno, utiliza un guión para el rango (`'400-599'`) y una coma para añadir un elemento a una matriz (`'403,500-599'`). | `400...600` |

Si deseas configurar cada objeto de conexión individualmente, puedes utilizar `Datadog.configure_onto` como se indica a continuación:

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```

### OpenSearch

La integración de OpenSearch rastreará cualquier llamada a `perform_request` en el objeto `Client`:

```ruby
require 'opensearch'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :opensearch, **options
end

# Realiza una consulta a OpenSearch
client = OpenSearch::Client.new(
  host: 'https://localhost:9200',
  user: 'user',
  password: 'password',
)
client.cluster.health
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                            | Tipo     | Descripción                                                                                                                                                                                    | Predeterminado      |
| -------------- | ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `enabled` | `DD_TRACE_OPENSEARCH_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_OPENSEARCH_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `opensearch`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `opensearch` |
| `peer_service` | `DD_TRACE_OPENSEARCH_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                           | `nil`        |
| `quantize`     |                                    | `Hash`   | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo.    | `{}`         |

### Postgres

La integración de PG rastrea comandos SQL enviados a través del gem `pg` mediante:

- `exec`, `exec_params`, `exec_prepared`;
- `async_exec`, `async_exec_params`, `async_exec_prepared`; o,
- `sync_exec`, `sync_exec_params`, `sync_exec_prepared`

```ruby
require 'pg'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                    | Tipo                                       | Descripción                                                                                                                                                                                                                                                                                                                                                            | Predeterminado                                                           |
| --------------------- | -------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled`             | `DD_TRACE_PG_ENABLED`      | `true`                                     | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_PG_SERVICE_NAME` | `String`                                   | Nombre de la aplicación que ejecuta la instrumentación de `pg`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration)                                                                                                                                                                                 | `pg`                                                              |
| `peer_service`        | `DD_TRACE_PG_PEER_SERVICE` | `String`                                   | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                                                                                                                   | `nil`                                                             |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`  | `String`                                   | Modo de propagación de comentarios SQL para la monitorización de base de datos. <br />(ejemplo: `disabled` \| `service`\| `full`). <br /><br />**Importante**: _Ten en cuenta que al activar la propagación de comentarios SQL se almacenan datos potencialmente confidenciales (nombres de servicio) en las bases de datos, a los que pueden acceder terceros con acceso a la base de datos._ | `'disabled'`                                                      |
| `on_error`            |                            | `Proc`                                     | Gestor de errores personalizado que se invoca cuando PG genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores de Postgres gestionados a nivel de aplicación.                                                                                                                                                 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Presto

La integración de Presto rastrea cualquier comando SQL enviado a través del gem `presto-client`.

```ruby
require 'presto-client'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :presto, **options
end

client = Presto::Client.new(
  server: "localhost:8880",
  ssl: {verify: false},
  catalog: "native",
  schema: "default",
  time_zone: "US/Pacific",
  language: "English",
  http_debug: true,
)

client.run("select * from system.nodes")
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                        | Tipo     | Descripción                                                                                                                                                                                | Predeterminado  |
| -------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `enabled` | `DD_TRACE_PRESTO_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_PRESTO_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `presto`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `presto` |
| `peer_service` | `DD_TRACE_PRESTO_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                       | `nil`    |

### Que

La integración de Que es un middleware que rastreará ejecuciones de trabajo.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave        | Variable de entorno                         | Tipo   | Descripción                                                                                                                                                                 | Predeterminado                                                            |
| ---------- | ------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `enabled`  | `DD_TRACE_QUE_ENABLED`          | `Bool` | Si la integración debe crear tramos.                                                                           | `true`                                                             |
| `tag_args` | `DD_TRACE_QUE_TAG_ARGS_ENABLED` | `Bool` | Activa el etiquetado del campo args de un trabajo. `true` para activado, `false` para desactivado.                                                                                                       | `false`                                                            |
| `tag_data` | `DD_TRACE_QUE_TAG_DATA_ENABLED` | `Bool` | Activa el etiquetado del campo data de un trabajo. `true` para activado, `false` para desactivado.                                                                                                       | `false`                                                            |
| `on_error` |                                 | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

### Racecar

La integración de Racecar permite rastrear los trabajos de Racecar.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                         | Tipo     | Descripción                                                                                                                                                                                 | Predeterminado   |
| -------------- | ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `enabled` | `DD_TRACE_RACECAR_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_RACECAR_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `racecar`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `racecar` |

### Rack

La integración de Rack proporciona un middleware que rastrea todas las solicitudes antes de que lleguen al marco o la aplicación subyacente. Responde a la interfaz mínima de Rack, proporcionando valores razonables que pueden recuperarse a nivel de Rack.

Esta integración se activa automáticamente con marcos web como Rails. Si utilizas una aplicación de Rack sencilla, activa la integración a tu `config.ru`:

```ruby
# ejemplo de config.ru
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rack, **options
end

use Datadog::Tracing::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

`options` son los siguientes argumentos de palabra clave:

| Clave                              | Variable de entorno | Tipo     | Descripción                                                                                                                                                                                                                                                                                                                                                                          | Predeterminado                                          |
| -------------------------------- | - | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `enabled` | `DD_TRACE_RACK_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `application`                    | | [`Rack Application`](https://github.com/rack/rack/blob/800e53fbe15b3424b7a8946b067bf6f2e648d5a8/SPEC.rdoc#label-Rack+applications)      | Tu aplicación de Rack. Obligatorio para `middleware_names`.                                                                                                                                                                                                                                                                                                                              | `nil`                                            |
| `distributed_tracing`            | | `Bool`   | Activa el [rastreo distribuido](#distributed-tracing) para que esta traza de servicio se conecte con una traza de otro servicio si se reciben encabezados de rastreo.                                                                                                                                                                                                                          | `true`                                           |
| `headers`                        | | `Hash`   | Hash de encabezados de solicitud o respuesta HTTP para añadir como etiquetas a la `rack.request`. Acepta las claves `request` y `response` con valores de matriz, por ejemplo, `['Last-Modified']`. Añade etiquetas `http.request.headers.*` y `http.response.headers.*` respectivamente. Esta opción anula la `DD_TRACE_HEADER_TAGS` global, consulta [Aplicar etiquetas de encabezado a tramos raíz][etiquetas de encabezado] para más información. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names`               | | `Bool`   | Activa esta opción si deseas utilizar la última clase de middleware ejecutada como el nombre de recurso para el tramos `rack`. Si se activa junto con la instrumentación de `rails`, `rails` toma precedencia al establecer el nombre de recurso `rack` al controlador de `rails` activo cuando sea aplicable. Requiere la opción `application` para su uso.                                                                     | `false`                                          |
| `quantize`                       | | `Hash`   | Hash que contiene las opciones de cuantificación. Puede incluir `:query` o `:fragment`.                                                                                                                                                                                                                                                                                                       | `{}`                                             |
| `quantize.base`                  | |          | Define el comportamiento para la base de la URL (esquema, host, puerto). Puede ser `:show` para mantener la base de la URL en la etiqueta `http.url` y no establecer la etiqueta `http.base_url`, o `nil` para eliminar la base de la URL de la etiqueta `http.url` por defecto, dejando una ruta y estableciendo `http.base_url`. La opción debe estar anidada dentro de la opción `quantize`.                                                                                   | `nil`                                            |
| `quantize.query`                 | |          | Hash que contiene opciones para la parte de consulta de la cuantificación de la URL. Puede incluir `:show` o `:exclude`. Consulta las opciones a continuación. La opción debe estar anidada dentro de la opción `quantize`.                                                                                                                                                                                                             | `{}`                                             |
| `quantize.query.show`            | |          | Define qué valores deben mostrarse siempre. Puede ser una matriz de cadenas, `:all` para mostrar todos los valores, o `nil` para no mostrar ningún valor. La opción debe estar anidada dentro de la opción `query`.                                                                                                                                                                                                     | `nil`                                            |
| `quantize.query.exclude`         | |          | Define qué valores deben eliminarse por completo. Puede ser una matriz de cadenas, `:all` para eliminar la cadena de consulta por completo, o `nil` para no excluir nada. La opción debe estar anidada dentro de la opción `query`.                                                                                                                                                                               | `nil`                                            |
| `quantize.query.obfuscate`       | |          | Define el comportamiento de redacción de la cadena de consulta. Puede ser un hash de opciones, `:internal` para usar la configuración de enmascaramiento interno por defecto, o `nil` para desactivar el enmascaramiento. Ten en cuenta que el enmascaramiento es una operación cadena-valor, no una operación clave-valor. Cuando está activada, `query.show` pasa por defecto a `:all` si no se cambia la configuración. La opción debe estar anidada dentro de la opción `query`.                   | `nil`                                            |
| `quantize.query.obfuscate.with`  | |          | Define la cadena por la que se sustituirán las coincidencias enmascaradas. Puede ser una cadena. La opción debe estar anidada dentro de la opción `query.obfuscate`.                                                                                                                                                                                                                                                   | `'<redacted>'`                                   |
| `quantize.query.obfuscate.regex` | |          | Define la expresión regular con la que se redactará la cadena de consulta. Puede ser un Regexp, o `:internal` para utilizar el Regexp interno por defecto, que redacta datos confidenciales conocidos. Cada coincidencia se redacta por completo sustituyéndola por `query.obfuscate.with`. La opción debe estar anidada dentro de la opción `query.obfuscate`.                                                                 | `:internal`                                      |
| `quantize.fragment`              | |          | Define el comportamiento de los fragmentos de URL. Puede ser `:show` para mostrar fragmentos de URL, o `nil` para eliminarlos. La opción debe estar anidada dentro de la opción `quantize`.                                                                                                                                                                                                                          | `nil`                                            |
| `request_queuing`                | | `Bool`   | Realiza un seguimiento del tiempo que pasan las solicitudes HTTP en la cola del servidor frontend. Consulta [Cola de solicitudes HTTP](#http-request-queuing) para obtener más información.                                                                                                                                                                                                                                             | `false`                                          |
| `web_service_name`               | | `String` | El nombre de servicio de los tramos de la cola de solicitudes del servidor frontend. (Por ejemplo, `'nginx'`)                                                                                                                                                                                                                                                                                                             | `'web-server'`                                   |

Aviso de obsolescencia:

- `quantize.base` cambiará por defecto de `:exclude` a `:show` en una futura versión. El cambio voluntario a `:show` es recomendado.
- `quantize.query.show` cambiará su valor por defecto a `:all` en una versión futura, junto con `quantize.query.obfuscate`, que cambiará a `:internal`. El cambio voluntario a estos valores futuros es recomendado.

**Configuración del comportamiento de cuantificación de la URL**

```ruby
Datadog.configure do |c|
  # Comportamiento predeterminado: todos los valores se cuantifican, se elimina la base y el fragmento.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by
  # http://example.com:8080/path?categories[]=1&categories[]=2 --> /path?categories[]

  # Elimina la base de la URL (esquema, host, puerto)
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :exclude }

  # Muestra la base de la URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :show }

  # Muestra los valores de cualquier parámetro de la cadena de consulta que coincida exactamente con 'category_id'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by
  c.tracing.instrument :rack, quantize: { query: { show: ['category_id'] } }

  # Muestra todos los valores para todos los parámetros de la cadena de consulta
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { show: :all } }

  # Excluye por completo cualquier parámetro de la cadena de consulta que coincide exactamente con 'sort_by'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id
  c.tracing.instrument :rack, quantize: { query: { exclude: ['sort_by'] } }

  # Elimina la cadena de consulta por completo
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path
  c.tracing.instrument :rack, quantize: { query: { exclude: :all } }

  # Muestra fragmentos de la URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { fragment: :show }

  # Enmascara la cadena de consulta, por defecto muestra todos los valores
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: {} } }

  # Enmascara la cadena de consulta mediante el regex dado, por defecto muestra todos los valores
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { regex: /category_id=\d+/ } } }

  # Enmascara la cadena de consulta mediante una cadena de redacción personalizada
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?REMOVED&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { with: 'REMOVED' } } }
end
```

### Rails

La integración de Rails rastreará rastrear solicitudes, llamadas a bases de datos, renderizado de plantillas y operaciones de lectura/escritura/eliminación de caché. La integración hace uso de la instrumentación de Active Support, escucha a la API de notificación para que cualquier operación instrumentada por la API sea rastreada.

Para activar la instrumentación de Rails, utiliza las [instrucciones de autoinstrumentación de Rails](#rails-or-hanami-applications).

También puedes crear un archivo inicializador en tu carpeta `config/initializers`:

```ruby
# config/initializers/datadog.rb
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno | Tipo     | Descripción                                                                                                                                                 | Predeterminado                                                         |
| --------------------- | - | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `enabled` | `DD_TRACE_RAILS_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `distributed_tracing` | | `Bool`   | Activa el [rastreo distribuido](#distributed-tracing) para que esta traza de servicio se conecte con una traza de otro servicio si se reciben encabezados de rastreo. | `true`                                                          |
| `request_queuing`     | | `Bool`   | Realiza un seguimiento del tiempo que pasan las solicitudes HTTP en la cola del servidor frontend. Consulta [Cola de solicitudes HTTP](#http-request-queuing) para obtener más información.                     | `false`                                                         |
| `middleware`          | | `Bool`   | Añade el middleware de traza a la aplicación de Rails. Establécelo en `false` si no quieres que se cargue el middleware.                                                 | `true`                                                          |
| `middleware_names`    | | `Bool`   | Permite que cualquier solicitud de middleware en cortocircuito muestre el nombre del middleware como un recurso para la traza.                                                 | `false`                                                         |
| `service_name`        | | `String` | Nombre de servicio utilizado al rastrear las solicitudes de aplicación (en el nivel de `rack`)                                                                                   | `'<app_name>'` (deducido del espacio de nombres de tu aplicación de Rails) |
| `template_base_path`  | | `String` | Se utiliza cuando se analiza el nombre de la plantilla. Si no almacenas tus plantillas en la carpeta `views/`, puede que necesites cambiar este valor.                          | `'views/'`                                                      |

**Versiones compatibles**

| Versiones de MRI | Versiones de JRuby | Versiones de Rails |
| ------------ | -------------- | -------------- |
| 2.5          |                | 4.2 a 6.1      |
| 2.6 a 2.7    | 9.2 a 9.3      | 5.0 a 6.1      |
| 3.0 a 3.2    | 9.4            | 6.1            |

### Rake

Puedes añadir la instrumentación en tus tareas de Rake mediante la activación de la integración de `rake` y
al proporcionar una lista de qué tareas de Rake deben ser instrumentadas.

**Evita instrumentar tareas de Rake de larga ejecución, ya que estas tareas pueden agregar grandes trazas
en la memoria que nunca se vacían hasta que la tarea termina.**

Para tareas de larga duración, utiliza la [Instrumentación manual](#manual-instrumentation) en las rutas de código recurrentes.

Para activar el rastreo de tareas de Rake, agrega lo siguiente a tu `Rakefile`:

```ruby
# En la parte superior de tu Rakefile:
require 'rake'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # Haz trabajo de tarea aquí...
end

Rake::Task['my_task'].invoke
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno| Tipo     | Descripción                                                                                              | Predeterminado  |
| -------------- | - | ------- | -------------------------------------------------------------------------------------------------------- | -------- |
| `enabled`      | | `Bool`   | Define si las tareas de Rake deben ser rastreadas. Es útil para desactivar temporalmente el rastreo. `true` o `false` | `true`   |
| `quantize`     | | `Hash`   | Hash que contiene opciones para la cuantificación de los argumentos de la tarea. Consulta más abajo para obtener más detalles y ejemplos.     | `{}`     |
| `service_name` | | `String` | Nombre de servicio utilizado para la instrumentación de `rake`                                                             | `'rake'` |
| `tasks`        | | `Array`  | Nombres de las tareas de Rake a instrumentar                                                                    | `[]`     |
| `enabled` | `DD_TRACE_RAKE_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

**Configuración del comportamiento de la cuantificación de tareas**

```ruby
Datadog.configure do |c|
  # Dada una tarea que acepta :one, :two, :three...
  # Invocado con 'foo', 'bar', 'baz'.

  # Comportamiento por defecto: todos los argumentos se cuantifican.
  # etiqueta `rake.invoke.args`  --> ['?']
  # etiqueta `rake.execute.args` --> { one: '?', two: '?', three: '?' }
  c.tracing.instrument :rake

  # Muestra valores para cualquier argumento que concide con :two exactamente
  # etiqueta `rake.invoke.args`  --> ['?']
  # etiqueta `rake.execute.args` --> { one: '?', two: 'bar', three: '?' }
  c.tracing.instrument :rake, quantize: { args: { show: [:two] } }

  # Muestra todos los valores para todos los argumentos.
  # etiqueta `rake.invoke.args`  --> ['foo', 'bar', 'baz']
  # etiqueta `rake.execute.args` --> { one: 'foo', two: 'bar', three: 'baz' }
  c.tracing.instrument :rake, quantize: { args: { show: :all } }

  # Excluye totalmente todo argumento que coincida con :three exactamente
  # etiqueta `rake.invoke.args`  --> ['?']
  # etiqueta `rake.execute.args` --> { one: '?', two: '?' }
  c.tracing.instrument :rake, quantize: { args: { exclude: [:three] } }

  # Elimina los argumentos por completo
  # etiqueta `rake.invoke.args`  --> ['?']
  # etiqueta `rake.execute.args` --> {}
  c.tracing.instrument :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

La integración de Redis rastreará llamadas simples, así como pipelines.

```ruby
require 'redis'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Realiza comandos de Redis
redis = Redis.new
redis.set 'foo', 'bar'
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                       | Tipo     | Descripción                                                                                                                                                                               | Predeterminado |
| -------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_REDIS_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_REDIS_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `redis`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `redis` |
| `peer_service` | `DD_TRACE_REDIS_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`   |
| `command_args` | `DD_REDIS_COMMAND_ARGS`       | `Bool`   | Muestra los argumentos del comando (por ejemplo, `key` en `GET key`) como nombre y etiqueta del recurso. Si es `false`, solo se muestra el nombre del comando (por ejemplo, `GET`).                                   | false   |

**Configuración de los ajustes de traza por instancia**

Con la versión >= 5 de Redis:

```ruby
require 'redis'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis # Se requiere activar la instrumentación de la integración
end

customer_cache = Redis.new(custom: { datadog: { service_name: 'custom-cache' } })
invoice_cache = Redis.new(custom: { datadog: { service_name: 'invoice-cache' } })

# La llamada rastreada pertenecerá al servicio `customer-cache`
customer_cache.get(...)
# La llamada rastreada pertenecerá al servicio `invoice-cache`
invoice_cache.get(...)
```

Con un `RedisClient` independiente:

```ruby
require "redis-client"
require "datadog"

redis = RedisClient.config(custom: { datadog: { service_name: "my-custom-redis" } }).new_client

Datadog.configure do |c|
  c.tracing.instrument :redis # Enabling integration instrumentation is still required
end

redis.call('PING')
```

Con la versión < 5 de Redis:

```ruby
require 'redis'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis # Se requiere activar la instrumentación de la integración
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure_onto(customer_cache, service_name: 'customer-cache')
Datadog.configure_onto(invoice_cache, service_name: 'invoice-cache')

# La llamada rastreada pertenecerá al servicio `customer-cache`
customer_cache.get(...)
# La llamada rastreada pertenecerá al servicio `invoice-cache`
invoice_cache.get(...)
```

**Configuración de los ajustes de traza por conexión**

Puedes configurar los ajustes de traza por conexión mediante la opción `describes`:

```ruby
# Proporcione una opción `:describes` con una clave de conexión.
# Cualquier de las siguientes claves son aceptables y equivalentes entre sí.
# Si se proporciona un bloque, devuelve un objeto de configuración que
# acepta cualquiera de las opciones de configuración enumeradas anteriormente.

Datadog.configure do |c|
  # La configuración por defecto para cualquier cliente de Redis
  c.tracing.instrument :redis, service_name: 'redis-default'

  # La configuración que coincide con un unix socket dado.
  c.tracing.instrument :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # Para las conexiones de red, solo estos campos se consideran durante la coincidencia:
  # esquema, host, puerto, base de datos
  # Se ignoran otros campos.

  # Cadena de conexión de red
  c.tracing.instrument :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.tracing.instrument :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # Hash de cliente de red
  c.tracing.instrument :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # Solo un subconjunto del hash de conexión
  c.tracing.instrument :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.tracing.instrument :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

Cuando varias configuraciones de `describes` coincidan con una conexión, se aplicará la última regla configurada que coincida.

### Resque

La integración de Resque utiliza hooks de Resque que envuelven el método `perform`.

Para añadir el rastreo a un trabajo de Resque:

```ruby
require 'resque'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave        | Variable de entorno | Tipo   | Descripción                                                                                                                                                                 | Predeterminado                                                           |
| ---------- | - | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_RESQUE_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `on_error` | | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Rest Client

La integración de `rest-client` está disponible a través del middleware de `datadog`:

```ruby
require 'rest_client'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno                             | Tipo     | Descripción                                                                                                                                                                                     | Predeterminado       |
| --------------------- | ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `enabled` | `DD_TRACE_REST_CLIENT_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name`        | `DD_TRACE_REST_CLIENT_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `rest_client`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `rest_client` |
| `peer_service`        | `DD_TRACE_REST_CLIENT_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                            | `nil`         |
| `distributed_tracing` |                                     | `Bool`   | Activa el [rastreo distribuido](#distributed-tracing)                                                                                                                                             | `true`        |
| `split_by_domain`     |                                     | `Bool`   | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                 | `false`       |

### Roda

La integración de Roda rastrea solicitudes.

La integración de **Roda** puede habilitarse a través de `Datadog.configure`. Es recomendado utilizar esta integración con **Rack** a través de `use Datadog::Tracing::Contrib::Rack::TraceMiddleware` para el rastreo distribuido.

```ruby
require "roda"
require "datadog"

class SampleApp < Roda
  use Datadog::Tracing::Contrib::Rack::TraceMiddleware

  Datadog.configure do |c|
    c.tracing.instrument :roda, **options
  end

  route do |r|
    r.root do
      r.get do
        'Hello World!'
      end
    end
  end
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno | Tipo     | Descripción                              | Predeterminado |
| -------------- | - | ------- | ---------------------------------------- | ------- |
| `enabled` | `DD_TRACE_RODA_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | | `String` | Nombre de servicio para la instrumentación de `roda`. | `nil`   |

### Sequel

La integración de Sequel rastrea consultas realizadas a tu base de datos.

```ruby
require 'sequel'
require 'datadog'

# Conectar a la base de datos
database = Sequel.sqlite

# Crear una tabla
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.tracing.instrument :sequel, **options
end

# Realizar una consulta
articles = database[:articles]
articles.all
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno | Tipo     | Descripción                               | Predeterminado                                    |
| -------------- | - | ------- | ----------------------------------------- | ------------------------------------------ |
| `enabled` | `DD_TRACE_SEQUEL_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | | `String` | Nombre de servicio para la instrumentación de `sequel`. | Nombre del adaptador de base de datos (por ejemplo, `'mysql2'`) |

**Configuración de las bases de datos para utilizar diferentes configuraciones**

Si utilizas varias bases de datos con Sequel, puedes dar a cada una de ellas una configuración diferente al establecer sus respectivos objetos `Sequel::Database`:

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# Configura cada base de datos con nombres de servicio diferentes
Datadog.configure_onto(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure_onto(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

La integración de Shoryuken es un middleware del lado del servidor que rastreará ejecuciones de trabajo.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave        | Variable de entorno | Tipo   | Descripción                                                                                                                                                                 | Predeterminado                                                           |
| ---------- | - | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_SHORYUKEN_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `tag_body` | | `Bool` | Etiqueta tramos con el cuerpo del mensaje SQS `true` o `false`                                                                                                                       | `false`                                                           |
| `on_error` | | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Sidekiq

La integración de Sidekiq es un middleware del lado del cliente y del lado del servidor que rastreará la cola de trabajos y ejecuciones, respectivamente.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave                   | Variable de entorno | Tipo   | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                           | Predeterminado                                                           |
| --------------------- | - | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled` | `DD_TRACE_SIDEKIQ_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `distributed_tracing` | | `Bool` | Al activar el [rastreo distribuido](#distributed-tracing) se crea una relación primario-secundario entre el tramo `sidekiq.push` y el tramo `sidekiq.job`. <br /><br />**Importante**: _Habilitar el [rastreo_distribuido] para el proceso asíncrono puede dar lugar a cambios drásticos en tu gráfico de trazas. Tales casos incluyen trabajos de larga duración, trabajos reintentados y trabajos programados en un futuro lejano. Asegúrate de inspeccionar tus trazas después de habilitar esta característica._ | `false`                                                           |
| `on_error`            | | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios.                                                                                                                                                                                                                                                                           | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize`            | | `Hash` | Hash que contiene las opciones para la cuantificación de los argumentos del trabajo.                                                                                                                                                                                                                                                                                                                                                                                            | `{}`                                                              |

### Sinatra

La integración de Sinatra rastrea solicitudes y renderizado de plantillas.

Para empezar a utilizar el cliente de rastreo, asegúrate de importar `datadog` y `instrument :sinatra` después de `sinatra` o `sinatra/base`, y antes de definir tu aplicación/rutas:

#### Aplicación clásica

```ruby
require 'sinatra'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
end

get '/' do
  'Hello world!'
end
```

#### Aplicación modular

```ruby
require 'sinatra/base'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
end

class NestedApp < Sinatra::Base
  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

#### Opciones de instrumentación

`options` son los siguientes argumentos de palabra clave:

| Clave                     | Variable de entorno | Tipo   | Descripción                                                                                                                                                                                                                                                                                                                                                                             | Predeterminado                                          |
| ----------------------- | - | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `enabled` | `DD_TRACE_SINATRA_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `distributed_tracing`   | | `Bool` | Activa el [rastreo distribuido](#distributed-tracing) para que esta traza de servicio se conecte con una traza de otro servicio si se reciben encabezados de rastreo.                                                                                                                                                                                                                             | `true`                                           |
| `headers`               | | `Hash` | Hash de encabezados de solicitud o respuesta HTTP para añadir como etiquetas a la `sinatra.request`. Acepta las claves `request` y `response` con valores de matriz, por ejemplo, `['Last-Modified']`. Añade etiquetas `http.request.headers.*` y `http.response.headers.*` respectivamente. Esta opción anula la `DD_TRACE_HEADER_TAGS` global, consulta [Aplicar etiquetas de encabezado a tramos raíz][etiquetas de encabezado] para más información. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | | `Bool` | Anteponer el nombre del script al nombre del recurso                                                                                                                                                                                                                                                                                                                                                 | `false`                                          |

### Sneakers

La integración de Sneakers es un middleware del lado del servidor que rastreará ejecuciones de trabajo.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave        | Variable de entorno | Tipo   | Descripción                                                                                                                                                                 | Predeterminado                                                           |
| ---------- | - | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled`  | `DD_TRACE_SNEAKERS_ENABLED` | `Bool` | Si la integración debe crear tramos.                                                                      | `true`                                                            |
| `tag_body` | | `Bool` | Activa el etiquetado del mensaje de trabajo. `true` para activado, `false` para desactivado.                                                                                                              | `false`                                                           |
| `on_error` | | `Proc` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Raya

La integración de Stripe rastrea solicitudes de la API de Stripe.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_STRIPE_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Sucker Punch

La integración de `sucker_punch` rastrea todos los trabajos programados:

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch, **options
end

# La ejecución de este trabajo se rastrea
LogJob.perform_async('login')
```

`options` son los siguientes argumentos de palabra clave:

| Clave       | Variable de entorno                         | Tipo   | Descripción                                  | Predeterminado |
| --------- | ------------------------------- | ------ | -------------------------------------------- | ------- |
| `enabled` | `DD_TRACE_SUCKER_PUNCH_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |

### Trilogy

La integración de Trilogy rastrea cualquier comando SQL enviado a través del gem `trilogy`.

```ruby
require 'trilogy'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :trilogy, **options
end

client = Trilogy.new(host: "localhost", username: "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` son los siguientes argumentos de palabra clave:

| Clave            | Variable de entorno                         | Tipo     | Descripción                                                                                                                                                                                 | Predeterminado   |
| -------------- | ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `enabled` | `DD_TRACE_TRILOGY_ENABLED` | `Bool` | Si la integración debe crear tramos. | `true` |
| `service_name` | `DD_TRACE_TRILOGY_SERVICE_NAME` | `String` | Nombre de la aplicación que ejecuta la instrumentación de `trilogy`. Puede ser anulado por `global_default_service_name`. [Consulta _Configuración adicional_ para más detalles](#additional-configuration) | `trilogy` |
| `peer_service` | `DD_TRACE_TRILOGY_PEER_SERVICE` | `String` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                        | `nil`     |

## Configuración adicional

Para cambiar el comportamiento por defecto de `datadog`, por orden de prioridad (siendo 1 la prioridad más alta), puedes utilizar lo siguiente:

1. [Configuración remota](https://docs.datadoghq.com/agent/remote_config).
2. Opciones establecidas dentro de un bloque `Datadog.configure`, por ejemplo:

   ```ruby
   Datadog.configure do |c|
     c.service = 'billing-api'
     c.env = ENV['RACK_ENV']

     c.tracing.report_hostname = true
     c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
   end
   ```

3. variables de entorno.

**Si se establece un valor de prioridad superior para una opción, establecer esa opción con un valor de prioridad inferior no cambiará su valor efectivo.**

Por ejemplo, si `tracing.sampling.default_rate` está configurado por la [Configuración remota](#remote-configuration), cambiar su valor a través del bloque `Datadog.configure` no tendrá ningún efecto.

**Opciones de configuración disponibles:**

| Parámetro                                                | Variable de entorno                                                 | Tipo                                  | Predeterminado                      | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global**                                             |                                                         |                                       |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `agent.host`                                           | `DD_AGENT_HOST`                                         | `String`                              | `127.0.0.1`                  | Nombre de host del Agent al que se enviarán los datos de traza.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `agent.port`                                           | `DD_TRACE_AGENT_PORT`                                   | `Integer`                             | `8126`                       | Puerto de host del Agent al que se enviarán los datos de traza. Si la [configuración del Agent](#configuring-trace-data-ingestion) establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.                                                                                                                                                                                                                                                                                                                                                      |
|                                                        | `DD_TRACE_AGENT_URL`                                    |                                       | `nil`                        | Establece el endpoint de la URL donde se envían las trazas. Tiene prioridad sobre `agent.host` y `agent.port`. Si la [configuración del Agent](#configuring-trace-data-ingestion) establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.                                                                                                                                                                                                                                                                                                             |
| `diagnostics.debug`                                    | `DD_TRACE_DEBUG`                                        | `Bool`                                | `false`                      | Activa o desactiva el modo de depuración. Imprime logs con información detallada. **NO recomendado para entornos de producción u otros entornos confidenciales.** Consulta [Depuración y diagnóstico](#debugging-and-diagnostics) para más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `diagnostics.startup_logs.enabled`                     | `DD_TRACE_STARTUP_LOGS`                                 | `Bool`                                | `nil`                        | Imprime la configuración de inicio y los diagnósticos para loguear. Para evaluar el estado del rastreo al inicio de la aplicación. Consulta [Depuración y diagnóstico](#debugging-and-diagnostics) para obtener más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `env`                                                  | `DD_ENV`                                                | `String`                              | `nil`                        | Tu entorno de aplicación. (Por ejemplo, `production`, `staging`, etc.) Este valor se establece como una etiqueta en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `service`                                              | `DD_SERVICE`                                            | `String`                              | _Nombre de archivo de Ruby_              | El nombre de servicio por defecto de tu aplicación. (Por ejemplo, `billing-api`). Este valor se establece como una etiqueta en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tags`                                                 | `DD_TAGS`                                               | `Hash`                                | `nil`                        | Etiquetas personalizadas en pares de valores separados por `,` (por ejemplo, `layer:api,team:intake`). Estas etiquetas se establecen en todas las trazas. Consulta [entorno y etiquetas](#environment-and-tags) para más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `time_now_provider`                                    |                                                         | `Proc`                                | `->{ Time.now }`             | Cambia cómo se recupera la hora. Consulta [Configurar el proveedor de tiempo](#setting-the-time-provider) para obtener más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `version`                                              | `DD_VERSION`                                            | `String`                              | `nil`                        | La versión de tu aplicación (por ejemplo, `2.5`, `202003181415`, `1.3-alpha`, etc.). Este valor se establece como una etiquetar en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `telemetry.enabled`                                    | `DD_INSTRUMENTATION_TELEMETRY_ENABLED`                  | `Bool`                                | `true`                       | Permite activar el envío de datos de telemetría a Datadog. Puede desactivarse, como se documenta [aquí](https://docs.datadoghq.com/tracing/configure_data_security/#telemetry-collection).                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Rastreo**                                            |                                                         |                                       |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tracing.contrib.peer_service_mapping`                 | `DD_TRACE_PEER_SERVICE_MAPPING`                         | `Hash`                                | `nil`                        | Define la reasignación de la etiqueta `peer.service` a través de toda la instrumentación. Proporciona una lista de `old_value1:new_value1, old_value2:new_value2, ...`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tracing.contrib.global_default_service_name.enabled`  | `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`     | `Bool`                                | `false`                      | Cambia el valor por defecto de `service_name` al nombre de servicio de la aplicación en toda la instrumentación                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.propagation_extract_first`                    | `DD_TRACE_PROPAGATION_EXTRACT_FIRST`                    | `Bool`                                | `false`                      | Sale inmediatamente en el primer formato de propagación válido detectado. Consulta [Rastreo distribuido](#distributed-tracing) para obtener más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `tracing.propagation_style_extract`                    | `DD_TRACE_PROPAGATION_STYLE_EXTRACT`                    | `Array`                               | `['Datadog','tracecontext']` | Formatos de propagación de rastreo distribuido para extraer. Anula `DD_TRACE_PROPAGATION_STYLE`. Consulta el [Rastreo distribuido](#distributed-tracing) para más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.propagation_style_inject`                     | `DD_TRACE_PROPAGATION_STYLE_INJECT`                     | `Array`                               | `['Datadog','tracecontext']` | Formatos de propagación de rastreo distribuido para inyectar. Anula `DD_TRACE_PROPAGATION_STYLE`. Consulta el [Rastreo distribuido](#distributed-tracing) para más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.propagation_style`                            | `DD_TRACE_PROPAGATION_STYLE`                            | `Array`                               | `nil`                        | Formatos de propagación de rastreo distribuido para extraer e inyectar. Consulta [Rastreo distribuido](#distributed-tracing) para obtener más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tracing.enabled`                                      | `DD_TRACE_ENABLED`                                      | `Bool`                                | `true`                       | Activa o desactiva el rastreo. Si se establece en `false`, la instrumentación seguirá ejecutándose, pero no se enviará ninguna traza al Trace Agent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tracing.header_tags`                                  | `DD_TRACE_HEADER_TAGS`                                  | `Array`                               | `nil`                        | Registra los encabezados HTTP como etiquetas de tramo. Consulta [Aplicar etiquetas de encabezado en tramos raíz][etiquetas de encabezado] para obtener más información.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.instrument(<integration-name>, <options...>)` |                                                         |                                       |                              | Activa la instrumentación para una biblioteca específica. Consulta [instrumentación de la integración](#integration-instrumentation) para más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tracing.log_injection`                                | `DD_LOGS_INJECTION`                                     | `Bool`                                | `true`                       | Inyecta información de [Correlación de traza](#trace-correlation) en logs de Rails si está presente. Admite el registrador por defecto (`ActiveSupport::TaggedLogging`), `lograge` y `semantic_logger`.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.partial_flush.enabled`                        |                                                         | `Bool`                                | `false`                      | Activa o desactiva la descarga parcial. La descarga parcial envía las partes completadas de una traza al Agent. Se utiliza cuando se rastrean instrumentos de tareas de larga duración (por ejemplo, trabajos) con muchos tramos.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tracing.partial_flush.min_spans_threshold`            |                                                         | `Integer`                             | `500`                        | El número de tramos que deben completarse en una traza antes de que la descarga parcial envíe esos tramos completados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.sampler`                                      |                                                         | `Datadog::Tracing::Sampling::Sampler` | `nil`                        | Solo para uso avanzado. Establece una instancia personalizada de `Datadog::Tracing::Sampling::Sampler`. Si se proporciona, el rastreador utilizará este muestreador para determinar el comportamiento del muestreo. Consulta [Muestreo personalizado](#custom-sampling) para obtener más detalles.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tracing.sampling.default_rate`                        | `DD_TRACE_SAMPLE_RATE`                                  | `Float`                               | `nil`                        | Establece la frecuencia de muestreo de traza entre `0.0` (0%) y `1.0` (100%).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.sampling.rate_limit`                          | `DD_TRACE_RATE_LIMIT`                                   | `Integer`                             | `100` (por segundo)           | Establece un número máximo de trazas por segundo a muestrear. Establece un límite de frecuencia para evitar los excesos de volumen de ingesta en caso de picos de tráfico.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.sampling.rules`                               | `DD_TRACE_SAMPLING_RULES`                               | `String`                              | `nil`                        | Establece reglas de muestreo a nivel de traza, comparándolas con el tramo raíz local. El formato es una `String` con JSON, que contiene una matriz de objetos. Cada objeto debe tener un atributo flotante `sample_rate` (entre 0,0 y 1,0, ambos inclusive) y, opcionalmente, atributos de cadena `name`, `service`, `resource` y `tags`. `name`, `service`, `resource` y `tags` controlan a qué trazas se aplica esta regla de muestreo; si todos ellos están ausentes, esta regla se aplica a todas las trazas. Las reglas se evalúan por orden de declaración en la matriz; solo se aplica la primera regla que coincida. Si no se aplica ninguna, se aplica `tracing.sampling.default_rate`. |
| `tracing.sampling.span_rules`                          | `DD_SPAN_SAMPLING_RULES`,`ENV_SPAN_SAMPLING_RULES_FILE` | `String`                              | `nil`                        | Establece reglas de [Muestreo de tramo único](#single-span-sampling). Estas reglas te permiten mantener tramos incluso cuando sus respectivas trazas se eliminan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.trace_id_128_bit_generation_enabled`          | `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`           | `Bool`                                | `true`                       | `true` para generar ID de traza de 128 bits y `false` para generar ID de traza de 64 bits                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.report_hostname`                              | `DD_TRACE_REPORT_HOSTNAME`                              | `Bool`                                | `false`                      | Añade una etiqueta de nombre de host a las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.test_mode.enabled`                            | `DD_TRACE_TEST_MODE_ENABLED`                            | `Bool`                                | `false`                      | Activa o desactiva el modo de test, para utilizar el rastreo en conjuntos de test.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.test_mode.trace_flush`                        |                                                         | `Datadog::Tracing::TraceFlush`        | `nil`                        | Objeto que determina el comportamiento de descarga de la traza.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### Registro personalizado

Por defecto, todos los logs son procesados por el registrador de Ruby por defecto. Cuando uses Rails, deberías ver los mensajes en tu archivo de log de aplicación.

Los mensajes de log del cliente de Datadog están marcados con `[datadog]`, por lo que deberías poder aislarlos de otros mensajes.

Además, es posible anular el registrador predeterminado y sustituirlo por uno personalizado. Para ello utiliza la configuración `log`.

```ruby
f = File.new("my-custom.log", "w+") # Los mensajes de log deben ir allí
Datadog.configure do |c|
  c.logger.instance = Logger.new(f) # Anular el registrador predeterminado
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

#### Entorno y etiquetas

Por defecto, el Trace Agent (no esta biblioteca, sino el programa que se ejecuta en segundo plano recopilando datos de varios clientes) utiliza las etiquetas establecidas en el archivo de configuración del Agent. Puedes configurar la aplicación para que etiquete automáticamente tus trazas y métricas, con las siguientes variables de entorno:

- `DD_ENV`: tu entorno de aplicación (por ejemplo `production`, `staging`, etc.)
- `DD_SERVICE`: el nombre de servicio por defecto de tu aplicación (por ejemplo `billing-api`)
- `DD_VERSION`: la versión de tu aplicación (por ejemplo, `2.5`, `202003181415`, `1.3-alpha`, etc.)
- `DD_TAGS`: etiquetas personalizadas en pares de valores separados por `,` (por ejemplo `layer:api,team:intake`)
  - Si `DD_ENV`, `DD_SERVICE` o `DD_VERSION` están definidos, anularán cualquier etiqueta `env`/`service`/`version` respectiva definida en `DD_TAGS`.
  - Si `DD_ENV`, `DD_SERVICE` o `DD_VERSION` NO están definidos, se utilizarán etiquetas definidas en `DD_TAGS` para rellenar `env`/`service`/`version` respectivamente.

Estos valores también pueden anularse a nivel de rastreador:

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

Esto te permite establecer este valor por aplicación, por lo que puedes tener, por ejemplo, varias aplicaciones que informen para diferentes entornos en el mismo host.

Las etiquetas también pueden establecerse directamente en tramos individuales, que sustituirá a cualquier etiqueta conflictiva definida a nivel de aplicación.

#### Depuración y diagnóstico

Se sugieren dos medios diferentes para producir diagnósticos para el rastreo:

##### Activación del modo de depuración

Si se cambia la biblioteca al modo de depuración, se obtendrán logs detallados y completos sobre la actividad de rastreo, incluidos los errores eliminados. Esta salida puede ser útil para identificar errores o confirmar la salida de trazas al Agent.

Puedes activarlo a través de `diagnostics.debug = true` o `DD_TRACE_DEBUG`.

```ruby
Datadog.configure { |c| c.diagnostics.debug = true }
```

**NO recomendamos el uso de esta función en entornos de producción o en otros entornos confidenciales**, ya que puede haber mucha información de carga. Es mejor usar esto en un entorno controlado donde se pueda controlar la carga de la aplicación.

##### Activar logs de inicio

Los logs de inicio producen un informe del estado de rastreo cuando la aplicación se configura inicialmente. Esto puede ser útil para confirmar que la configuración y la instrumentación están activadas correctamente.

Puedes activarlas a través de `diagnostics.startup_logs.enabled = true` o `DD_TRACE_STARTUP_LOGS`.

```ruby
Datadog.configure { |c| c.diagnostics.startup_logs.enabled = true }
```

Por defecto, se activará siempre que `datadog` detecte que la aplicación se está ejecutando en un entorno que no es un entorno de desarrollo.

### Muestreo

Consulta [Mecanismos de ingesta](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby) para una lista de
todas las opciones de muestreo disponibles.

#### Muestreo de prioridades

El muestreo de prioridades decide si se mantiene una traza utilizando un atributo de prioridad propagado para las trazas distribuidas. Su valor indica al Agent y al backend lo importante que es la traza.

El muestreador puede establecer la prioridad en los siguientes valores:

- `Datadog::Tracing::Sampling::Ext::Priority::AUTO_REJECT`: el muestreador decidió automáticamente rechazar la traza.
- `Datadog::Tracing::Sampling::Ext::Priority::AUTO_KEEP`: el muestreador decidió automáticamente conservar la traza.

El muestreo prioritario está activado por defecto. Activarlo asegura que las trazas distribuidas estarán completas. Una vez activado, el muestreador asignará automáticamente una prioridad de 0 o 1 a trazas, según su servicio y volumen.

También puedes establecer esta prioridad manualmente para descartar una traza que no te interese o mantener una importante. Para ello, ajusta `TraceOperation#sampling_priority` en:

- `Datadog::Tracing::Sampling::Ext::Priority::USER_REJECT`: se pide al usuario que rechace la traza.
- `Datadog::Tracing::Sampling::Ext::Priority::USER_KEEP`: el usuario ha solicitado conservar la traza.

Cuando no se utiliza el [rastreo distribuido](#distributed-tracing), se puede cambiar la prioridad en cualquier momento, siempre que la traza esté incompleta. Pero tiene que hacerse antes de cualquier propagación de contexto (fork, llamadas RPC) para que sea útil en un contexto distribuido. Cambiar la prioridad después de que el contexto se haya propagado hace que diferentes partes de una traza distribuida utilicen diferentes prioridades. Algunas partes podrían conservarse, otras podrían rechazarse, y esto puede causar que la traza se almacene parcialmente y permanezca incompleta.

Por esta razón, si cambia la prioridad, te recomendamos que lo hagas lo antes posible.

Para cambiar la prioridad de muestreo, puedes utilizar los siguientes métodos:

```ruby
# Rechaza la traza activa
Datadog::Tracing.reject!

# Conserva la traza activa
Datadog::Tracing.keep!
```

Es seguro utilizar `Datadog::Tracing.reject!` y `Datadog::Tracing.keep!` cuando no hay una traza activa.

También puedes rechazar una instancia de traza específica:

```ruby
# Primero, toma la traza activa
trace = Datadog::Tracing.active_trace

# Rechaza la traza
trace.reject!

# Conserva la traza
trace.keep!
```

#### Muestreo de tramo único

Puedes configurar la regla de muestreo que te permita mantener tramos a pesar de que sus trazas respectivas hayan sido descartadas por una regla de muestreo a nivel de traza.

Esto permite conservar tramos importantes cuando se aplica el muestreo a nivel de traza. No es posible eliminar tramos utilizando el muestreo de tramo único.

Para configurarlo, consulta la [Documentación sobre mecanismos de ingesta](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby#single-spans).

#### Muestreo personalizado

Es posible configurar una estrategia de muestreo completamente personalizada.

En la medida de lo posible, evita el muestreo personalizado y utiliza la [API de muestreo de prioridades](#priority-sampling) junto con las opciones de muestreo proporcionadas en [la configuración adicional](#additional-configuration).
Esto asegurará el más alto nivel de conservación y capacidad de depuración de tus decisiones de muestreo.

Cuando se requiere un muestreo personalizado, hay dos estrategias posibles:

1. [Muestreo de prioridades](#priority-sampling), que es la estrategia de muestreo recomendada y admite todas las configuraciones e informes de muestreo posteriores a la ingesta.

2. Del lado de la aplicación, lo que puede impedir por completo que un tramo se elimine del proceso de Ruby, pero impide
   que el [muestreo postingesta](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/) reciba los datos necesarios para funcionar correctamente.

   Esta estrategia solo debe utilizarse cuando las ganancias en rendimiento y reducción del ancho de banda sean esenciales para el sistema.

   Si utilizas el muestreo del lado de la aplicación, indícalo [abriendo una incidencia en GitHub](https://github.com/DataDog/dd-trace-rb/issues/new), para que podamos comprender mejor tu caso de uso y ofrecerte asistencia.

Puedes configurar el _Muestreo personalizado_ creando un objeto de Ruby que responda a los métodos `sample!` y `sample_rate`:

```ruby
class CustomSampler
   # Establece el estado de muestreo de la traza.
   #
   # Este método *puede* modificar la `trace`, en caso de cambios necesarios basados en la
   # decisión de muestreo (por ejemplo, añadir etiquetas de traza).
   #
   # @param [Datadog::Tracing::TraceOperation] trace
   # @return [void]
  def sample!(trace)
     # Implementa una de las estrategias de muestreo para registrar la decisión de muestreo:
     #
     # 1. Muestreo de prioridades. La página de controles de ingesta será correcta.
     #   a. Mantener el tramo con el muestreo de prioridades.
     trace.keep!
     #   b. O deje el tramo con el muestreo de prioridades.
     trace.reject!

     # O

     # 2. No vacíe el tramo. La página de Controles de ingesta **no será correcta**.
     #    Puede guardar el tiempo de procesamiento y ancho de banda.
     #   a. Vaciar el tramo
     trace.sampled = true
     #   b. No vaciar el tramo
     trace.sampled = false
  end

  # La frecuencia de muestreo, si el muestreador tiene ese concepto. Sino, será `nil`.
  #
  # @param [Datadog::Tracing::TraceOperation] trace
  # @return [Float,nil] sampling ratio between 0.0 and 1.0 (inclusive), or `nil` if not applicable
  def sample_rate(trace)
     # ...
  end
end

Datadog.configure do |c|
  c.tracing.sampler = CustomSampler.new
end
```

Consulta [Configuración adicional](#additional-configuration) para conocer el resto de opciones de muestreo.

### Rastreo distribuido

El rastreo distribuido permite propagar trazas a través de múltiples aplicaciones instrumentadas, de modo que una solicitud puede presentarse como una traza única, en lugar de una traza independiente por servicio.

Para rastrear solicitudes a través de los límites de la aplicación, lo siguiente debe propagarse entre cada aplicación:

| Propiedad              | Tipo    | Descripción                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **ID de traza**          | Entero | ID de la traza. Este valor debe ser el mismo en todas las solicitudes que pertenezcan a la misma traza.                           |
| **ID de tramo principal**    | Entero | ID del tramo en el servicio que origina la solicitud. Este valor siempre será diferente para cada solicitud dentro de una traza. |
| **Prioridad de muestreo** | Entero | Nivel de prioridad de muestreo para la traza. Este valor debe ser el mismo para todas las solicitudes que pertenezcan a la misma traza.     |

Dicha propagación puede visualizarse como:

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000123
  |     Priority:  1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000456
  |     Priority:  1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**Mediante HTTP**

Para las solicitudes HTTP entre aplicaciones instrumentadas, estos metadatos de traza se propagan mediante el uso de encabezados de solicitud HTTP:

| Propiedad              | Tipo    | Nombre del encabezado HTTP              |
| --------------------- | ------- | ----------------------------- |
| **ID de traza**          | Entero | `x-datadog-trace-id`          |
| **ID de tramo principal**    | Entero | `x-datadog-parent-id`         |
| **Prioridad de muestreo** | Entero | `x-datadog-sampling-priority` |

De esta manera:

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000123
  |     x-datadog-sampling-priority: 1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000456
  |     x-datadog-sampling-priority: 1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

#### Formatos de encabezados distribuidos

El rastreo admite los siguientes formatos de traza distribuida:

- `datadog`
- `tracecontext`: [contexto de traza W3C](https://www.w3.org/TR/trace-context/)
- `b3multi`: [encabezados múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers)
- `b3`: [encabezado único B3](https://github.com/openzipkin/b3-propagation#single-header)
- `none`: sin opción.

Puedes activar/desactivar el uso de estos formatos a través de `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Lista de formatos de encabezado que deberían extraerse
  c.tracing.propagation_style_extract = [ 'tracecontext', 'datadog', 'b3' ]

  # Lista de formatos de encabezado que deberían inyectarse
  c.tracing.propagation_style_inject = [ 'tracecontext', 'datadog' ]
end
```

**Activación del rastreo distribuido para integraciones**

Muchas integraciones incluidas en `datadog` admiten el rastreo distribuido. El rastreo distribuido está activado por defecto en el Agent v7 y en la mayoría de las versiones del Agent v6. Si es necesario, puedes activar el rastreo distribuido con los ajustes de configuración.

- Si tu aplicación recibe solicitudes de servicios con el rastreo distribuido activado, debes activar el rastreo distribuido en las integraciones que gestiona estas solicitudes (por ejemplo, Rails)
- Si tu aplicación envía solicitudes a servicios con el rastreo distribuido activado, debes activar el rastreo distribuido en las integraciones que envían estas solicitudes (por ejemplo, Faraday)
- Si tu aplicación envía y recibe solicitudes al desplegar el rastreo distribuido, debe activar todas las integraciones que manejan estas solicitudes.

Para más detalles sobre cómo activar el rastreo distribuido para integraciones, consulta tu documentación:

- [Excon](#excon)
- [Faraday](#faraday)
- [Cliente Rest](#rest-client)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#httprb)
- [httpclient](#httpclient)
- [httpx](#httpx)

#### Uso del propagador HTTP

Para facilitar la propagación de estos metadatos en proceso, puedes utilizar el módulo `Datadog::Tracing::Contrib::HTTP`.

En el cliente:

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # Inyecta encabezados de traza en encabezados de solicitud (`env` debe ser un hash)
  Datadog::Tracing::Contrib::HTTP.inject(trace.to_digest, env)
end
```

En el servidor:

```ruby
trace_digest = Datadog::Tracing::Contrib::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # Hacer trabajo web...
end
```

### Cola de solicitudes HTTP

Las trazas que se originan en solicitudes HTTP pueden configurarse para incluir el tiempo que pasan en la cola de un servidor web de frontend o de equilibrador de carga antes de que la solicitud llegue a la aplicación de Ruby.

Esta función está desactivada por defecto. Para activarla, debes añadir un encabezado `X-Request-Start` o `X-Queue-Start` desde tu servidor web (es decir, Nginx) antes de activar la función de cola de solicitudes. A continuación, se muestra un ejemplo de configuración de Nginx:

```
# /etc/nginx/conf.d/ruby_service.conf
server {
    listen 8080;

    location / {
      proxy_set_header X-Request-Start "t=${msec}";
      proxy_pass http://web:3000;
    }
}
```

Para aplicaciones basadas en Rack, consulta la [documentación](#rack) para más detalles.

### Pipeline de procesamiento

Algunas aplicaciones pueden requerir que las trazas sean alteradas o filtradas antes de enviarse a Datadog. El pipeline de procesamiento permite crear _procesadores_ para definir dicho comportamiento.

#### Filtrado

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanFilter` para eliminar tramos, cuando el bloque se evalúa como verdadero:

```ruby
Datadog::Tracing.before_flush(
  # Eliminar tramos que coinciden con un recurso determinado
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Eliminar tramos que se envían en el tráfico a un host local
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Procesamiento

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanProcessor` para modificar tramos:

```ruby
Datadog::Tracing.before_flush(
  # Elimina el texto coincidente del campo resource
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Procesador personalizado

Los procesadores pueden ser cualquier objeto que responda a `#call` aceptando `trace` como argumento (que es una `Array` de `Datadog::Span`).

Por ejemplo, con la sintaxis abreviada del bloque:

```ruby
Datadog::Tracing.before_flush do |trace|
   # Lógica de procesamiento...
   trace
end
```

Para una clase de procesador personalizada:

```ruby
class MyCustomProcessor
  def call(trace)
    # Lógica de procesamiento...
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

En ambos casos, el método del procesador _debe_ devolver el objeto `trace`; este valor de retorno se pasará al siguiente procesador en el pipeline.

#### Advertencias

1. Si se eliminan tramos, no se generarán métricas de traza, lo que afectará a los monitores y a dashboards.
2. Al eliminar un tramo, también se eliminan todos los tramos secundarios del tramo eliminado. De este modo, se evitan los tramos huérfanos en el gráfico de traza.
3. Los [logs del modo de depuración](#enabling-debug-mode) informan del estado de los tramos _antes_ de que se ejecute el pipeline de procesamiento: los tramos modificados o eliminados mostrarán su estado original en los logs del modo de depuración.

### Correlación de traza

En muchos casos, como en el registro, puede ser útil correlacionar los IDs de traza con otros eventos o flujos de datos, para facilitar las referencias cruzadas.

#### Para el registro en aplicaciones de Rails

##### Automática

Para las aplicaciones de Rails que utilizan el registrador por defecto (`ActiveSupport::TaggedLogging`), `lograge` o `semantic_logger`, la inyección de correlación de traza está activada por defecto.

Puede desactivarse configurando la variable de entorno `DD_LOGS_INJECTION=false`.

#### Para el registro en las aplicaciones de Ruby 

Para añadir IDs de correlación a tu registrador, añade un formateador de log que recupere los IDs de correlación con `Datadog::Tracing.correlation`, y luego añádelos al mensaje.

Para correlacionar con el registro de Datadog con éxito, asegúrate de que los siguientes elementos estén presentes en el mensaje de log, en el orden en que aparecen:

- `dd.env=<ENV>`: donde `<ENV>` es igual a `Datadog::Tracing.correlation.env`. Omítelo si no se ha configurado un entorno.
- `dd.service=<SERVICE>`: donde `<SERVICE>` es igual a `Datadog::Tracing.correlation.service`. Omítelo si no se ha configurado ningún nombre de servicio por defecto.
- `dd.version=<VERSION>`: donde `<VERSION>` es igual a `Datadog::Tracing.correlation.version`. Omítelo si no se ha configurado ninguna versión de la aplicación.
- `dd.trace_id=<TRACE_ID>`: donde `<TRACE_ID>` es igual a `Datadog::Tracing.correlation.trace_id` o `0` si no hay ninguna traza activa durante el registro.
- `dd.span_id=<SPAN_ID>`: donde `<SPAN_ID>` es igual a `Datadog::Tracing.correlation.span_id` o `0` si no hay ninguna traza activa durante el registro.

`Datadog::Tracing.log_correlation` devolverá `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

Si una traza no está activa y la versión y el entorno de la aplicación no están configurados, devolverá `dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0`.

Un ejemplo de ello en la práctica:

```ruby
require 'datadog'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# Cuando no hay una traza activa
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Cuando hay una traza activa
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

### Configuración de la capa de transporte

Por defecto, `datadog` se conectará al Agent mediante la primera configuración disponible en la lista de prioridades:

1. A través de cualquier ajuste disponible explícitamente en la configuración (nombre de host/puerto/transporte)
2. A través de Unix Domain Socket (UDS) situado en `/var/run/datadog/apm.socket`
3. A través de HTTP sobre TCP a `127.0.0.1:8126`

Sin embargo, el rastreador puede configurarse para enviar sus datos de traza a destinos alternativos, o mediante protocolos alternativos.

#### Cambiar el nombre de host y el puerto por defecto del Agent

Para cambiar host o puerto del Agent, proporciona `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`.

O dentro de un bloque `Datadog.configure`, proporciona los siguientes ajustes:

```ruby
Datadog.configure do |c|
  c.agent.host = '127.0.0.1'
  c.agent.port = 8126
end
```

Consulta [Configuración adicional](#additional-configuration) para obtener más información.

#### Métodos de conexión del Agent

El Agent admite la comunicación a través de TCP o Unix Domain Socket (UDS). El rastreador detectará automáticamente el método de conexión del Agent 
basado en la configuración proporcionada.

##### TCP

El rastreador se conectará al Agent a través de TCP si `host` y `port` están configurados, o si se especifica `HTTP/HTTPS` como protocolo en
en `DD_TRACE_AGENT_URL`. TCP es el método de conexión por defecto.

##### Unix Domain Socket (UDS)

Para usarlo, primero configura tu Trace Agent para escuchar por Unix Socket, luego configura el rastreador con:

```ruby
Datadog.configure do |c|
  # Proporcionar una ruta local para rastrear Trace Agent Unix socket
  c.agent.uds_path = '/tmp/ddagent/trace.sock'
end
```

También puedes definir la ruta UDS con la variable de entorno `DD_TRACE_AGENT_URL` estableciendo el protocolo en `unix`:

```bash
DD_TRACE_AGENT_URL=unix:///tmp/ddagent/trace.sock
```

Nota: No puedes mezclar las configuraciones UDS y TCP. Si configuras `c.agent.uds_path`, no debes configurar `c.agent.host`
o `c.agent.port`.

#### Transporte en modo de test

Cuando el modo de test está activado, el rastreador utiliza un adaptador `Test` para el transporte sin elección que, opcionalmente, puede hacer buffer de solicitudes en
conjuntos de test u otros entornos que no sean de producción. Se configura estableciendo `c.tracing.test_mode.enabled` en true.
Este modo solo funciona para el rastreo.

```ruby
Datadog.configure do |c|
  c.tracing.test_mode.enabled = true
end
```

### Configuración del proveedor de tiempo

Por defecto, el trazado utiliza un reloj monotónico para medir la duración de los tramos y marcas temporales (`->{ Time.now }`) para la hora de inicio y finalización.

A la hora de hacer tests, puede ser útil utilizar un proveedor de tiempo diferente.

Para cambiar la función que proporciona marcas temporales, configura lo siguiente:

```ruby
Datadog.configure do |c|
  # Para Timecop, por ejemplo, `->{ Time.now_without_mock_time }` permite al rastreador usar el límite temporal real.
  c.time_now_provider = -> { Time.now_without_mock_time }
end
```

El tramo seguirá utilizando el reloj monotónico del sistema cuando esté disponible, por lo que no se verá afectado por este ajuste.

### Métricas

El rastreador y sus integraciones pueden producir algunas métricas adicionales que pueden proporcionar información útil sobre el rendimiento de tu aplicación. Estas métricas se recopilan con `dogstatsd-ruby`, y pueden enviarse al mismo Datadog Agent al que envías tus trazas.

Para configurar tu aplicación para la recopilación de métricas:

1. [Configura tu Datadog Agent para StatsD](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. Añade `gem 'dogstatsd-ruby', '~> 5.3'` a tu Gemfile

#### Para el tiempo de ejecución de la aplicación

Si se configuran métricas de tiempo de ejecución, la biblioteca de trazas recopilará y enviará automáticamente métricas sobre el estado de la aplicación.

Para configurar métricas de tiempo de ejecución, añade la siguiente configuración:

````ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog'

Datadog.configure do |c|
  # Para habilitar la recopilación de métricas en tiempo de ejecución, configura `true`. Por defecto `false`
  # También puedes establecer DD_RUNTIME_METRICS_ENABLED=true para configurar esto.
  c.runtime_metrics.enabled = true

  # Opcionalmente, puedes configurar la instancia de Statsd utilizada para enviar las métricas de tiempo de ejecución.
  # Statsd se configura automáticamente con los ajustes por defecto si `dogstatsd-ruby` está disponible.
  # Puedes configurar con host y el puerto de Datadog Agent; por defecto es 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

Consulta la [documentación de Dogstatsd](https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames) para más detalles sobre la configuración de `Datadog::Statsd`.

Las estadísticas son específicas de máquinas virtuales e incluirán:

| Nombre                                        | Tipo    | Descripción                                                                                           | Disponible en                                                                                    |
| ------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `runtime.ruby.class_count`                  | `gauge` | Número de clases en el espacio de memoria.                                                                    | CRuby                                                                                           |
| `runtime.ruby.gc.*`                         | `gauge` | Estadísticas de recopilación de elementos no usados: recopilados de `GC.stat`.                                              | Todos los tiempos de ejecución                                                                                    |
| `runtime.ruby.yjit.*`                       | `gauge` | Estadísticas YJIT recopiladas en `RubyVM::YJIT.runtime_stats`.                                          | CRuby (si está activado)                                                                              |
| `runtime.ruby.thread_count`                 | `gauge` | Número de subprocesos.                                                                                    | Todos los tiempos de ejecución                                                                                    |
| `runtime.ruby.global_constant_state`        | `gauge` | Generación de caché constante global.                                                                     | CRuby ≤ 3.1                                                                                     |
| `runtime.ruby.global_method_state`          | `gauge` | [Generación de caché de método global](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby 2.x](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |
| `runtime.ruby.constant_cache_invalidations` | `gauge` | Invalidaciones constantes de la caché.                                                                         | CRuby ≥ 3,2                                                                                     |
| `runtime.ruby.constant_cache_misses`        | `gauge` | Fallos de caché constantes.                                                                                | CRuby ≥ 3.2                                                                                     |

Además, todas las métricas incluyen las siguientes etiquetas:

| Nombre       | Descripción                                        |
| ---------- | -------------------------------------------------- |
| `language` | Lenguaje de programación rastreado. (Por ejemplo, `ruby`)         |
| `service`  | Lista de servicios asociados a esta métrica. |

### Elaboración de perfiles

`datadog` puede producir perfiles que midan el uso de recursos de la aplicación a nivel de método dentro de los entornos de producción. Estos perfiles pueden dar una idea de los recursos que se gastan en el código Ruby fuera de la instrumentación de trazas existentes.

**Configuración**

Para empezar con la elaboración de perfiles, sigue la guía de  [Activación del generador de perfiles de Ruby](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/).

#### Solucionar problemas

Si tienes problemas con la elaboración de perfiles, consulta la [Guía para solucionar problemas del generador de perfiles](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=ruby).

#### Generación de perfiles de trabajos de Resque

Al crear perfiles de trabajos de [Resque](https://github.com/resque/resque), debes configurar la opción `RUN_AT_EXIT_HOOKS=1` descrita en la documentación de [Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks).

Sin este indicador, los perfiles de los trabajos de Resque de corta duración no estarán disponibles, ya que Resque elimina los procesos de trabajador antes de que tengan la oportunidad de enviar esta información.

## Problemas conocidos y configuraciones sugeridas

### Carga útil demasiado grande

Por defecto, Datadog limita el tamaño de las cargas útiles de traza para evitar sobrecargas de memoria en las aplicaciones instrumentadas. Como resultado, es posible que las trazas que contengan miles de operaciones no se envíen a Datadog.

Si faltan trazas, activa el [modo de depuración](#debugging-and-diagnostics) para comprobar si se registran mensajes que contengan `"Dropping trace. Payload too large"`.

Dado que el modo de depuración tiene mucha información, **Datadog no recomienda dejar esto activado o activarlo en la producción.** Desactívalo después de confirmar. Puedes inspeccionar los [logs del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-log-files/) para mensajes similares.

Si has confirmado que se eliminan trazas debido a grandes cargas útiles, activa la opción [descarga_parcial](#additional-configuration) para dividir trazas en fragmentos más pequeños.

### Nivel de stack demasiado profundo

El rastreo de Datadog recopila datos de traza al añadir instrumentación a otras bibliotecas comunes (por ejemplo, Rails, Rack, etc.). Algunas bibliotecas proporcionan APIs para añadir esta instrumentación, pero otras no. Para añadir instrumentación en bibliotecas que carecen de una API de instrumentación, Datadog utiliza una técnica llamada "monkey-patching" para modificar el código de esa biblioteca.

En la versión 1.9.3 y anteriores de Ruby, "monkey-patching" a menudo implicaba el uso de [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method), también conocido como _reescritura de método_, para reemplazar destructivamente los métodos existentes de Ruby. Sin embargo, esta práctica crearía a menudo conflictos y errores si dos bibliotecas intentaran "reescribir" el mismo método. (Por ejemplo, dos paquetes de APM diferentes intentando instrumentar el mismo método).

En Ruby 2.0, se introdujo la función [`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend). Esta característica evita la reescritura destructiva de métodos y permite múltiples "monkey patches" en el mismo método. En consecuencia, se ha convertido en el medio más seguro y preferido para "parchear" código.

La instrumentación de Datadog utiliza casi exclusivamente la función `Module#prepend` para añadir instrumentación de forma no destructiva. Sin embargo, algunas otras bibliotecas (típicamente aquellas que admiten Ruby < 2.0) todavía usan `alias_method` que puede crear conflictos con la instrumentación de Datadog, a menudo resultando en errores `SystemStackError` o `stack level too deep`.

Como el despliegue de `alias_method` existe dentro de esas bibliotecas, Datadog generalmente no puede solucionarlos. Sin embargo, algunas bibliotecas tienen soluciones conocidas:

- `rack-mini-profiler`: [errores de Net::HTTP a nivel de stack muy profundos](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors).

Para bibliotecas sin una solución conocida, considera eliminar la biblioteca utilizando `alias` o `Module#alias_method` o separando bibliotecas en diferentes entornos para realizar tests.

Si tienes alguna pregunta o deseas notificar un problema de este tipo, [ponte en contacto con el servicio de soporte de Datadog](https://docs.datadoghq.com/help).

### Los trabajadores de Resque demoran la salida

La opción predeterminada de Resque de bifurcar un proceso por trabajo, en situaciones poco frecuentes, puede provocar la demora de la salida cuando se instrumenta con `datadog`.

Como solución, recomendamos establecer la variable de entorno `FORK_PER_JOB` en `false` para desactivar este comportamiento.

Consulta [este problema](https://github.com/DataDog/dd-trace-rb/issues/3015) para una discusión del problema.

<!---->

[etiquetas de encabezado]: https://docs.datadoghq.com/tracing/configure_data_security/#collect-headers
[1]: https://docs.datadoghq.com/es/tracing/trace_collection/compatibility/ruby/
[2]: https://docs.datadoghq.com/es/tracing/trace_collection/compatibility/ruby#integrations