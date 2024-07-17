---
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/legacy/GettingStarted-v1.md
title: (Heredado) Rastreo de aplicaciones Ruby
---
<div class="alert alert-warning">Esta documentación corresponde a la gema <code>ddtrace</code> v1.x. Si estás utilizando la gema <code>Datadog</code> v2.0 o posterior, consulta la documentación más reciente sobre el <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/">rastreo de aplicaciones Ruby</a>.</div>

`ddtrace` es el cliente de rastreo de Datadog para Ruby. Se utiliza para rastrear solicitudes a medida que circulan a través de servidores web,
bases de datos y microservicios, para que los desarrolladores tengan una amplia visibilidad de los cuellos de botella y las solicitudes problemáticas.

## Para empezar

**Si estás actualizando desde una versión 0.x, consulta nuestra [guía de actualización](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10).**

Para ver la documentación general de APM, consulta nuestra [documentación de configuración][setup docs].

Para obtener más información sobre el aspecto de APM una vez que la aplicación envía información a Datadog, consulta [Términos y conceptos][visualization docs].

Para ver la documentación de la API de biblioteca, consulta nuestra [documentación de YARD][yard docs].

Para contribuir, consulta las [directrices para contribuciones][contribution docs] y la [guía de desarrollo][development docs].

[documentos de configuración]: https://docs.datadoghq.com/tracing/
[documentos de desarrollo]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[documentos de visualización]: https://docs.datadoghq.com/tracing/glossary/
[documentos de contribución]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[documentos de desarrollo]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[documentos de yard]: https://www.rubydoc.info/gems/ddtrace/

## Requisitos de compatibilidad

Para ver una lista completa de la compatibilidad de Datadog con la biblioteca de Ruby, consulta los [requisitos de compatibilidad][1].

## Instalación

Añadir la función de rastreo a tu aplicación Ruby sólo requiere unos pocos pasos:

1. Configuración del rastreo en el Datadog Agent
2. Instrumentación de tu solicitud
3. Conexión de tu aplicación al Datadog Agent

### Configuración del rastreo en el Datadog Agent

Antes de instalar `ddtrace`, [instala el Datadog Agent](https://docs.datadoghq.com/agent/), al que `ddtrace` enviará datos de rastreo.

Luego, configura el Datadog Agent para aceptar trazas (traces). Para ello:

 - Configura `DD_APM_ENABLED=true` en el entorno del Agent.

O

 - Añade `apm_enabled: true` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file).

*Además, en entornos contenedorizados...*

 - Configura `DD_APM_NON_LOCAL_TRAFFIC=true` en el entorno del Agent.

O

 - Añade `apm_non_local_traffic: true` en el [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file).

Consulta las instrucciones de configuración específicas para [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby) o [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection) para asegurarte de que el Agent está configurado para recibir trazas (traces) en un entorno contenedorizado.

#### Configuración del consumo de datos de rastreo

Por defecto, el Datadog Agent escuchará trazas (traces) vía HTTP en el puerto `8126`.

Puedes cambiar el protocolo o el puerto en que el Agent escucha datos de rastreo utilizando lo siguiente:

**Para HTTP sobre TCP**:

 - Configura `DD_APM_RECEIVER_PORT=<port>` en el entorno del Agent.

O

 - Añade `apm_config: receiver_port: <port>` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

 **Para sockets de dominio Unix (UDS)**:

 - Configura `DD_APM_RECEIVER_SOCKET=<path-to-socket-file>`.

O

 - Añade `apm_config: receiver_socket: <path-to-socket-file>` al [archivo de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

### Instrumentación de tu solicitud

#### Aplicaciones Rails o Hanami

1. Añade la gema `ddtrace` a tu archivo Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. Instala la gema con `bundle install`.

3. Crea un archivo `config/initializers/datadog.rb` que contenga:

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Con este bloque puedes:

      - [Añadir parámetros de configuración adicionales](#additional-configuration)
      - [Activar o reconfigurar la instrumentación](#integration-instrumentation)

#### Otras aplicaciones Ruby 

Si tu aplicación no utiliza las gemas compatibles (Rails o Hanami) anteriores, puedes configurarla de la siguiente manera:

1. Añade la gema `ddtrace` a tu archivo Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Instala la gema con `bundle install`.
3. `require` cualquier [biblioteca o marco compatible](#integration-instrumentation) que deba instrumentarse.
4. Añade `require 'ddtrace/auto_instrument'` a tu aplicación. Nota: Esto debe hacerse después de requerir cualquier bibliotecas o marco compatible.

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

5. Añade un bloque de configuración a tu aplicación:

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Con este bloque puedes:

      - [Añadir parámetros de configuración adicionales](#additional-configuration)
      - [Activar o reconfigurar la instrumentación](#integration-instrumentation)

#### Configuración de OpenTracing

1. Añade la gema `ddtrace` a tu archivo Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Instala la gema con `bundle install`.
3. En tu archivo de configuración de OpenTracing, añade lo siguiente:

    ```ruby
    require 'opentracing'
    require 'datadog/tracing'
    require 'datadog/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

4. Añade un bloque de configuración a tu aplicación:

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

   Con este bloque puedes:

      - [Añadir parámetros de configuración de Datadog adicionales](#additional-configuration)
      - [Activar o reconfigurar la instrumentación de Datadog](#integration-instrumentation)

#### Configuración de OpenTelemetry

Puedes enviar trazas de OpenTelemetry directamente al Datadog Agent (sin `ddtrace`) mediante OTLP. Para obtener más detalles, consulta nuestra documentación sobre [consumo de OTLP en el Datadog Agent](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent).

### Conexión de tu aplicación al Datadog Agent

Por defecto, `ddtrace` se conectará al Agent utilizando la primera configuración disponible en la lista de prioridades:

1. A través de cualquier parámetro de configuración proporcionado explícitamente (nombre de host/puerto/transporte)
2. A través del socket de dominio Unix (UDS) localizado en `/var/run/datadog/apm.socket`
3. A través de HTTP sobre TCP a `127.0.0.1:8126`

Si tu Datadog Agent escucha en cualquiera de estas localizaciones, no debería ser necesario realizar ninguna otra configuración.

Si tu Agent se ejecuta en un host o contenedor diferente al de tu aplicación o si quieres enviar trazas (traces) utilizando un protocolo diferente, debes configurar tu aplicación en consecuencia.

  - [Cómo enviar datos de rastreo al Agent vía HTTP sobre TCP](#changing-default-agent-hostname-and-port)
  - [Cómo enviar datos de rastreo al Agent a través del socket de dominio Unix (UDS)](#using-the-unix-domain-socket-uds-adapter)

### Pasos finales de la instalación

Tras la configuración, tus servicios aparecerán en la [página de servicios APM](https://app.datadoghq.com/apm/services) en unos minutos. Obtén más información sobre [el uso de la interfaz de usuario APM][visualization docs].

## Instrumentación manual

Si no utilizas una instrumentación de marco compatible, es posible que quieras instrumentar tu código manualmente.

Para rastrear cualquier código Ruby, puedes utilizar el método `Datadog::Tracing.trace`:

```Ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # Envuelve el código que quieras instrumentar con este bloque
  # También puedes modificar el tramo (span) aquí.
  # Por ejemplo, cambiar el nombre del recurso, configurar etiquetas (tags), etc...
end
```

Donde `name` debe ser una `String` que describa el tipo genérico de operación que se está realizando (por ejemplo `'web.request'` o `'request.parse'`)

Y `options` son los siguientes argumentos de palabra clave opcionales:

| Clave | Tipo | Descripción | Predeterminado |
| --------------- | ----------------------- | --- | --- |
| `autostart`     | `Bool`                  | Si la medición del tiempo debe iniciarse automáticamente o no. Si esto es `false`, el usuario debe llamar a `span.start`. | `true` |
| `continue_from` | `Datadog::TraceDigest`  | Continúa una traza originada en otro contexto de ejecución. TraceDigest describe el punto de continuación. | `nil` |
| `on_error`      | `Proc`                  | Anula el comportamiento de gestión de errores, cuando un tramo (span) genera un error. Se proporcionan `span` y `error` como argumentos. Por defecto, define el error en el tramo (span). | `proc { |span, error| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`                | Nombre del recurso o acción en que se está operando. Las trazas con el mismo valor de recurso se agruparán a efectos de métricas (pero seguirán siendo visibles de forma independiente). Suele ser específico de un dominio, como una URL, consulta, solicitud, etc. (por ejemplo, `'Article#submit'`, `http://example.com/articles/list`). | `name` del tramo. |
| `service`       | `String`                | Nombre del servicio al que pertenece este tramo (por ejemplo `'my-web-service'`) | Rastreador `default-service`, `$PROGRAM_NAME` o `'ruby'` |
| `start_time`    | `Time`                  | Punto en el que realmente comienza el tramo. Es útil cuando se rastrean eventos que ya han ocurrido. | `Time.now` |
| `tags`          | `Hash`                  | Etiquetas adicionales que deben añadirse al tramo. | `{}` |
| `type`          | `String`                | Tipo de tramo (como `'http'`, `'db'`, etc.) | `nil` |

Se recomienda especialmente configurar `service` y `resource` como mínimo. El l Datadog Agent descartará cualquier tramo sin un `service` o `resource` como `nil`.

Ejemplo de instrumentación manual en acción:

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # Traza llamada por activerecord
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Añade algunas etiquetas de APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Rastrea la representación de la plantilla
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Rastreo asíncrono

Puede que no siempre sea posible envolver un bloque de código con `Datadog::Tracing.trace`. Es posible que algunas instrumentaciones basadas en eventos o notificaciones sólo te avisen cuando comienza o termina un evento.

Para rastrear estas operaciones, puedes rastrear codificar de forma asíncrona llamando a `Datadog::Tracing.trace` sin un bloque:

```ruby
# Algunos marcos de instrumentación llaman después de que termina un evento...
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

Llamar a `Datadog::Tracing.trace` sin un bloque hará que la función devuelva uns `Datadog::Tracing::SpanOperation` que está iniciada, pero no terminada. Puedes modificar este tramo como prefieras y luego cerrarlo `finish`.

*No debes dejar ningún tramo sin terminar.* Si queda algún tramo abierto cuando termina el rastreo, se descartará la traza. Puedes [activar el modo de depuración](#additional-configuration) para comprobar si existen advertencias, si sospechas que esto podría estar ocurriendo.

Para evitar esta situación al gestionar el inicio/fin de eventos, puedes utilizar `Datadog::Tracing.active_span` para obtener el tramo activo en ese momento.

```ruby
# Por ej. ActiveSupport::Llamadas de notificación cuando empieza un evento
def start(name, id, payload)
  # Inicia un tramo
  Datadog::Tracing.trace(name)
end

# Por ej. ActiveSupport::Llamadas de notificación cuando termina un evento
def finish(name, id, payload)
  # Busca el tramo activo en ese momento (thread-safe)
  current_span = Datadog::Tracing.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### Enriquecimiento de trazas a partir de métodos anidados

Puedes etiquetar información adicional al tramo activo en ese momento utilizando cualquier método. Ten en cuenta, sin embargo, que si se llama al método y no hay ningún tramo activo en ese momento, el `active_span` será nulo.

```ruby
# Por ej. agregando etiquetas al tramo activo

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

También puedes obtener la traza activa en ese momento utilizando el método `active_trace`. Este método devolverá `nil` si no hay ninguna traza activa.

```ruby
# Por ej. accediendo a la traza activa

current_trace = Datadog::Tracing.active_trace
```

## Instrumentación de la integración

Muchas de los bibliotecas y marcos más populares son compatibles desde el primer momento, por lo que pueden instrumentarse de forma automática. Aunque no se activan automáticamente, pueden activarse y configurarse fácilmente a través de la API `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Activa y configura una integración
  c.tracing.instrument :integration_name, **options
end
```

Las `options` son argumentos de palabra clave para configuraciones específicas de las integraciones.

Para ver la lista de las integraciones disponibles y sus versiones compatibles, consulta la [compatibilidad de la integración con Ruby][2].

Para ver la lista de las opciones de configuración para las integraciones disponibles, consulta:

#### CI Visibility

Para Datadog CI Visibility, la instrumentación de bibliotecas puede activarse y configurarse a través de la siguiente API `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Activa y configura una integración
  c.ci.instrument :integration_name, **options
end
```

Las `options` son argumentos de palabra clave para configuraciones específicas de las integraciones.

Para ver la lista de las integraciones disponibles y sus versiones compatibles, consulta la [compatibilidad de la integración de CI con Ruby][2].

### Action Cable

La integración Action Cable rastrea mensajes emitidos y acciones de canales.

Puedes habilitarlo a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_cable
end
```

### Action Mailer

La integración Action Mailer proporciona rastreo para las acciones Rails 5 de Action Mailer.

Puedes habilitarlo a través de `Datadog.configure`:

```ruby
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `email_data` | Añadir o no metadatos adicionales de carga útil de correo electrónico a tramos `action_mailer.deliver`. Los campos incluyen `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']`. | `false` |

### Action Pack

La mayoría de las veces, Action Pack se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_pack
end
```

### Action View

La mayoría de las veces, Action View se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| ---| --- | --- |
| `template_base_path` | Se utiliza cuando se analiza el nombre de la plantilla. Si no almacenas tus plantillas en la carpeta `views/`, es posible que necesites cambiar este valor. | `'views/'` |

### Active Job

La mayoría de las veces, Active Job se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'active_job'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_job
end

ExampleJob.perform_later
```

### Serializadores de Active Model

La integración de serializadores de Active Model rastrea el evento `serialize` para la versión 0.9 y superiores y el evento `render` para la versión 0.10 y superiores.

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_model_serializers
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

### Active Record

La mayoría de las veces, Active Record se configura como parte de un marco web (Rails, Sinatra...), pero puede configurarse solo:

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Descripción                                                                                                                                                                                       | Predeterminado                                    |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `service_name` | Sobreescribe el nombre del servicio para la instrumentación de la consulta SQL. La instrumentación de la consulta de la instanciación de Active Record siempre utiliza el nombre del servicio configurado de la aplicación. | Nombre del adaptador de base de datos (por ejemplo, `'mysql2'`) |

**Configuración de los parámetros de rastreo por base de datos**

Puedes configurar parámetros de rastreo por conexión de base de datos utilizando la opción `describes`:

```ruby
# Proporciona una opción `:describes` con una clave de conexión.
# Cualquiera de las siguientes claves son aceptables y equivalentes entre sí.
# Si se proporciona un bloque, éste devuelve un objeto Parámetros que
# acepta cualquiera de las opciones de configuración enumeradas anteriormente.

Datadog.configure do |c|
  # Símbolo que coincide con tu conexión de base de datos en config/database.yml
  # Sólo disponible si utilizas Rails con ActiveRecord.
  c.tracing.instrument :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # Patrón de configuración de bloque.
  c.tracing.instrument :active_record, describes: :secondary_database do |second_db|
second_db.service_name = 'secondary-db'
  end

  # Cadena de conexión con los siguientes parámetros de conexión:
  # adaptador, nombre de usuario, host, puerto, base de datos
  # Los demás campos se ignoran.
  c.tracing.instrument :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # Hash con los siguientes parámetros de conexión:
  # adaptador, nombre de usuario, host, puerto, base de datos
  # Los demás campos se ignoran.
  c.tracing.instrument :active_record, describes: {
      adapter: 'mysql2',
      host: '127.0.0.1',
      port: '3306',
      database: 'mysql',
      username: 'root
    },
    service_name: 'secondary-db'

  # Si utilizas la gema `makara`, es posible emparejar el `role` de conexión:
  c.tracing.instrument :active_record, describes: { makara_role: 'primary' }, service_name: 'primary-db'
  c.tracing.instrument :active_record, describes: { makara_role: 'replica' }, service_name: 'secondary-db'
end
```

También puedes crear configuraciones basadas en la coincidencia parcial de los campos de conexión de la base de datos:

```ruby
Datadog.configure do |c|
  # Coincide con cualquier conexión en el host `127.0.0.1`.
  c.tracing.instrument :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # Coincide con cualquier conexión `mysql2`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # Coincide con cualquier conexión `mysql2` con la base de datos `reports`.
  #
  # En caso de varias configuraciones `describe` coincidentes, se aplicará la última.
  # En este caso, se configurará una conexión con `mysql` del adaptador y `reports` de la base de datos
  # `service_name: 'reports-db'`, y no con `service_name: 'mysql-db'`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

Cuando varias configuraciones de `describes` coincidan con una conexión, se aplicará la última regla configurada que coincida.

Si ActiveRecord rastrea un evento que utiliza una conexión que coincide con una clave definida por `describes`, utilizará los parámetros de rastreo asignados a esa conexión. Si la conexión no coincide con ninguna de las conexiones descritas, utilizará los parámetros predeterminados definidos por `c.tracing.instrument :active_record`.

### Active Support

La mayoría de las veces, Active Support se configura como parte de Rails, pero puede activarse por separado:

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave             | Descripción                                                                                                                                                                                        | Predeterminado                |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| `cache_service` | Nombre de la aplicación que ejecuta la instrumentación de `active_support`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `active_support-cache` |

### AWS

La integración con AWS rastrea cada interacción (por ejemplo, llamadas a la API) a través de servicios AWS (S3, ElastiCache, etc.).

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# Perform traced call
Aws::S3::Client.new.list_buckets
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                     | Descripción                                                                                                                                                                             | Predeterminado |
|----------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name` | `DD_TRACE_AWS_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `aws`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `aws`   |
| `peer_service` | `DD_TRACE_AWS_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                    | `nil`   |



### Concurrent Ruby

La integración con Concurrent Ruby añade compatibilidad para la propagación de contexto cuando se utiliza `::Concurrent::Future` y `Concurrent::Async`, y asegura que el código rastreado dentro de `Future#execute` y `Concurrent::Async#async` tendrá el conjunto de elementos principales correcto.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
# Dentro del inicializador Rails initializer o equivalente
Datadog.configure do |c|
  # Corrige mediante parches ::Concurrent::Future para que utilice ExecutorService que propaga el contexto
  c.tracing.instrument :concurrent_ruby
end

# Transfiere contexto al código ejecutado dentro de Concurrent::Future
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end

# Transfiere contexto al código ejecutado dentro de Concurrent::Async
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

### Cucumber

La integración con Cucumber rastrea todas las ejecuciones de escenarios y pasos cuando se utiliza el marco `cucumber`.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
require 'cucumber'
require 'ddtrace'

# Configura la integración con Cucumber predeterminada
Datadog.configure do |c|
  c.ci.instrument :cucumber, **options
end

# Ejemplo de cómo adjuntar etiquetas del escenario al tramo activo
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si se deben rastrear los tests de Cucumber. Es útil para desactivar temporalmente el rastreo. `true` o `false` | `true` |
| `service_name` | Nombre de servicio utilizado para la instrumentación de `cucumber` | `'cucumber'` |
| `operation_name` | Nombre de operación utilizado para la instrumentación de `cucumber`. Es útil si quieres renombrar métricas de rastreo automáticas, por ejemplo `trace.#{operation_name}.errors`. | `'cucumber.test'` |

### Dalli

La integración con Dalli rastreará todas las llamadas a tu servidor `memcached`:

```ruby
require 'dalli'
require 'ddtrace'

# Configura el comportamiento de rastreo predeterminado de Dalli
Datadog.configure do |c|
  c.tracing.instrument :dalli, **options
end

# Configura el comportamiento de rastreo de Dalli para un solo cliente
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                       | Descripción                                                                                                                                                                               | Predeterminado     |
|----------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `command_enabled` | `DD_TRACE_MEMCACHED_COMMAND_ENABLED` | Recopila comandos como la etiqueta `memcached.command`. Es posible que el comando `keys` contenga información sensible. | `false` |
| `service_name` | `DD_TRACE_DALLI_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `dalli`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `memcached` |
| `peer_service` | `DD_TRACE_DALLI_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`       |


### DelayedJob

La integración con DelayedJob utiliza ganchos de ciclo de vida para rastrear ejecuciones y colas de tareas.

Puedes activarlo a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `error_handler` | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Elasticsearch

La integración con Elasticsearch rastreará cualquier llamada a `perform_request` en el objeto `Client`:

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :elasticsearch, **options
end

# Realiza una consulta a Elasticsearch
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'

# En caso de que quieras anular la configuración global de una instancia de cliente determinada
Datadog.configure_onto(client.transport, **options)
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                               | Descripción                                                                                                                                                                                       | Predeterminado         |
|----------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| `service_name` | `DD_TRACE_ELASTICSEARCH_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `elasticsearch`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `elasticsearch` |
| `peer_service` | `DD_TRACE_ELASTICSEARCH_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                              | `nil`           |
| `quantize`     |                                       | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo.       | `{}`            |


### Ethon

La integración con `ethon` rastrea cualquier solicitud HTTP a través de objetos `Easy` o `Multi` . Ten en cuenta que este integración también admite bibliotecas `Typhoeus`, basadas en `Ethon`.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :ethon, **options

  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                       | Descripción                                                                                                                                                                               | Predeterminado |
|-----------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name`        | `DD_TRACE_ETHON_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `ethon`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `ethon` |
| `peer_service`        | `DD_TRACE_ETHON_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                           | `false` |



### Excon

La integración de `excon` está disponible a través del middleware `ddtrace`:

```ruby
require 'excon'
require 'ddtrace'

# Configura el comportamiento de rastreo predeterminado de Excon
Datadog.configure do |c|
  c.tracing.instrument :excon, **options

  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

connection = Excon.new('https://example.com')
connection.get
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                       | Descripción                                                                                                                                                                               | Predeterminado |
|-----------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name`        | `DD_TRACE_EXCON_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `excon`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `excon` |
| `peer_service`        | `DD_TRACE_EXCON_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                           | `false` |
| `error_handler`       |                               | Un `Proc` que acepta un parámetro `response`. Si se evalúa con un valor *truthy*, el tramo del rastreo se marca como error. Por defecto sólo se marcan como errores las respuestas 5XX.                    | `nil`   |


**Configurar las conexiones para utilizar diferentes configuraciones**

Si utilizas varias conexiones con Excon, puedes dar a cada una de ellas diferentes parámetros, configurando sus constructores con middleware:

```ruby
# Envuelve el stack tecnológico de middleware predeterminado con el middleware de rastreo de Datadog
Excon.new(
  'http://example.com',
  middlewares: Datadog::Tracing::Contrib::Excon::Middleware.with(options).around_default_stack
)

# Inserta el middleware dentro de un stack tecnológico de middleware personalizado.
# NOTA: ¡El middleware de rastreo debe insertarse después del ResponseParser!
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Tracing::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

Donde `options` es un Hash que contiene cualquiera de los parámetros enumerados en la tabla anterior.

### Faraday

La integración de `faraday` está disponible a través del middleware `ddtrace`:

```ruby
require 'faraday'
require 'ddtrace'

# Configura el comportamiento de rastreo predeterminado de Faraday
Datadog.configure do |c|
  c.tracing.instrument :faraday, **options

  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

# En caso de que quieras anular la configuración global de una instancia de cliente determinada
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, **options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                         | Descripción                                                                                                                                                                                 | Predeterminado   |
|-----------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_FARADAY_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `faraday`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `faraday` |
| `peer_service`        | `DD_TRACE_FARADAY_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                        | `nil`     |
| `distributed_tracing` |                                 | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                         | `true`    |
| `split_by_domain`     |                                 | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                             | `false`   |
| `error_handler`       |                                 | Un `Proc` que acepta un parámetro `response`. Si se evalúa con un valor *truthy*, el tramo del rastreo se marca como error. Por defecto sólo se marcan como errores las respuestas 5XX.                      | `nil`     |
| `on_error` | Gestor de errores personalizado que se invoca cuando una solicitud genera un error. Con `span` y `error` como argumentos. Establece un error en el tramo por defecto. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Grape

La integración de Grape añade la instrumentación a los endpoints y filtros de Grape. Esta integración puede funcionar en conjunto con otras integraciones como Rack y Rails.

Para activar tu integración, utiliza el método `Datadog.configure` antes de definir tu aplicación Grape:

```ruby
# api.rb
require 'grape'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :grape, **options
end

# Luego, define tu aplicación
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave              | Var ent                  | Descripción                                                                                                                   | Predeterminado |
|------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------|
| `enabled`        | `DD_TRACE_GRAPE_ENABLED` | Define si Grape debe ser rastreado. Es útil para desactivar temporalmente el rastreo. `true` o `false`                           | `true`  |
| `error_statuses` |                          | Define un código de estado o un rango de códigos de estado que deben marcarse como errores. `'404,405,500-599'` o `[404,405,'500-599']` | `nil`   |


### GraphQL

La integración de GraphQL activa la instrumentación para las consultas de GraphQL.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
# En el inicializador Rails o equivalente
Datadog.configure do |c|
  c.tracing.instrument :graphql, schemas: [YourSchema], **options
end

# Luego, ejecuta una consulta GraphQL
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

El método `instrument :graphql` acepta los siguientes parámetros. Se pueden sustituir opciones adicionales por `options`:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `schemas` | Requerido. Matriz de objetos `GraphQL::Schema` para rastrear. El rastreo se añadirá a todos los esquemas enumerados, utilizando las opciones proporcionadas para esta configuración. Si no proporcionas ninguna, no se activará el rastreo. | `[]` |
| `service_name` | Nombre de servicio utilizado parala instrumentación de GraphQL | `'ruby-graphql'` |

**Configuración manual de esquemas de GraphQL**

Si prefieres configurar individualmente los parámetros del rastreador para un esquema (por ejemplo, si tienes varios esquemas con diferentes nombres de servicios), en la definición del esquema, puedes añadir lo siguiente [utilizando la API de GraphQL](http://graphql-ruby.org/queries/tracing.html):

```ruby
# Esquema basado en clases
class YourSchema < GraphQL::Schema
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

```ruby
# Esquema .define-style
YourSchema = GraphQL::Schema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

O puedes modificar un esquema ya definido:

```ruby
# Esquema basado en clases
YourSchema.use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
)
```

```ruby
# Esquema .define-style
YourSchema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

*NO* `instrument :graphql` en `Datadog.configure` si eliges la configuración manual, para evitar el doble rastreo. Estas dos formas de configurar el rastreo de GraphQL se consideran mutuamente excluyentes.

### gRPC

La integración de `grpc` añade interceptores de cliente y servidor, que se ejecutan como middleware antes de ejecutar la llamada al procedimiento remoto del servicio. Como las aplicaciones gRPC suelen estar distribuidas, la integración comparte información de rastreo entre el cliente y el servidor.

Para configurar tu integración, utiliza el método `Datadog.configure` de la siguiente manera:

```ruby
require 'grpc'
require 'ddtrace'

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

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                      | Descripción                                                                                                                                                                              | Predeterminado                                                            |
|-----------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `service_name`        | `DD_TRACE_GRPC_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `grpc`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `grpc`                                                             |
| `peer_service`        | `DD_TRACE_GRPC_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                     | `nil`                                                              |
| `distributed_tracing` |                              | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                      | `true`                                                             |
| `server_error_handler`       |                              | Gestor de errores personalizado que se invoca cuando se produce un error. Un `Proc` que acepta los parámetros `span` y `error`. Establece el error en el tramo por defecto.                                         | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |
| `client_error_handler`       |                              | Gestor de errores personalizado que se invoca cuando se produce un error. Un `Proc` que acepta los parámetros `span` y `error`. Establece el error en el tramo por defecto.                                         | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

Aviso de obsolescencia:
- `error_handler` será eliminado. Utiliza `server_error_handler` en su lugar.

**Configurar clientes para que utilicen diferentes parámetros**

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

La integración se asegurará de que `configured_interceptor` defina una configuración de rastreo única para esa instancia de cliente.

### hanami

La integración de `hanami` instrumentará el enrutamiento, la acción y la representación de tu aplicación hanami. Para habilitar la instrumentación de `hanami`, se recomienda instrumentar automáticamente con

```
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

y crear un archivo inicializador en tu carpeta `config/initializers`:

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `service_name` | Nombre de servicio para la instrumentación de `hanami`. | `nil` |


### http.rb

La integración de http.rb rastreará cualquier llamada HTTP a través de la gema http.rb.

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httprb, **options
  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                                  | Descripción                                                                                                                                                                                | Predeterminado     |
|-----------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `service_name`        | `DD_TRACE_HTTPRB_SERVICE_NAME`           | Nombre de la aplicación que ejecuta la instrumentación de `httprb`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `httprb`    |
| `peer_service`        | `DD_TRACE_HTTPRB_PEER_SERVICE`           | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                       | `nil`       |
| `distributed_tracing` |                                          | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                        | `true`      |
| `split_by_domain`     |                                          | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                            | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | Rango o matriz de códigos de estado HTTP que deben rastrearse como errores.                                                                                                                       | `400...600` |


### httpclient

La integración de httpclient rastreará cualquier llamada HTTP a través de la gema httpclient.

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httpclient, **options
  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                                  | Descripción                                                                                                                                                                                    | Predeterminado      |
|-----------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name`        | `DD_TRACE_HTTPCLIENT_SERVICE_NAME`       | Nombre de la aplicación que ejecuta la instrumentación de `httpclient`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `httpclient` |
| `peer_service`        | `DD_TRACE_HTTPCLIENT_PEER_SERVICE`       | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                           | `nil`        |
| `distributed_tracing` |                                          | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                            | `true`       |
| `split_by_domain`     |                                          | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                                | `false`      |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | Rango o matriz de códigos de estado HTTP que deben rastrearse como errores.                                                                                                                           | `400...600`  |


### httpx

`httpx` conserva su [propia integración con `ddtrace`](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter):

```ruby
require "ddtrace"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.tracing.instrument :httpx

  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end
```

### Kafka

La integración de Kafka proporciona un rastreo de la gema `ruby-kafka`:

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'active_support/notifications' # required to enable 'ruby-kafka' instrumentation
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :kafka
end
```

### Minitest

La integración con Minitest rastrea todas las ejecuciones de tests cuando se utiliza el marco para tests `minitest`.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
require 'minitest'
require 'ddtrace'

# Configura la integración predeterminada con Minitest
Datadog.configure do |c|
  c.ci.instrument :minitest, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si los tests de Minitest deben rastrearse. Es útil para deshabilitar temporalmente el rastreo. `true` o `false` | `true` |
| `service_name` | Nombre de servicio utilizado para la instrumentación de `minitest` | `'minitest'` |
| `operation_name` | Nombre de operación utilizado para la instrumentación de `minitest`. Es útil si quieres renombrar métricas de rastreo automáticas, por ejemplo `trace.#{operation_name}.errors`. | `'minitest.test'` |

### MongoDB

La integración rastrea cualquier `Command` que se envía desde el [controlador de Ruby MongoDB](https://github.com/mongodb/mongo-ruby-driver) a un clúster de MongoDB. Por extensión, los Object Document Mappers (ODM) como Mongoid se instrumentan automáticamente si utilizan el controlador oficial de Ruby. Para activar la integración, simplemente:

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mongo, **options
end

# Crea un cliente MongoDB y utilízalo como de costumbre
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# En caso de que quieras anular la configuración global de una instancia de cliente determinada
Datadog.configure_onto(client, **options)
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                       | Descripción                                                                                                                                                                                 | Predeterminado                                          |
|----------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `service_name` | `DD_TRACE_MONGO_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `mongo`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration)   | `mongodb`                                        |
| `peer_service` | `DD_TRACE_MONGO_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                        | `nil`                                            |
| `quantize`     |                               | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo. | `{ show: [:collection, :database, :operation] }` |

**Configuración de los parámetros de rastreo por conexión**

Puedes configurar los parámetros de rastreo por conexión a través de la opción `describes`:

```ruby
# Proporciona una opción `:describes` con una clave de conexión.
# Cualquiera de las siguientes claves son aceptables y equivalentes unas con otras.
# Si se proporciona un bloque, genera un objeto Parámetros que
# acepta cualquiera de las opciones de configuración enumeradas anteriormente.

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

La integración de MySQL2 rastrea cualquier comando SQL enviado a través de la gema `mysql2`.

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                        | Descripción                                                                                                                                                                                                                                                                                                                                                             | Predeterminado      |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name`        | `DD_TRACE_MYSQL2_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `mysql2`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration)                                                                                                                                                                              | `mysql2`     |
| `peer_service`        | `DD_TRACE_MYSQL2_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                                                                                                                    | `nil`        |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`      | Modo de propagación de comentarios SQL para la monitorización de bases de datos. <br />(ejemplo: `disabled`\| `service`\| `full`). <br /><br />**Importante**: *Ten en cuenta que al habilitar la propagación de comentarios SQL se almacenan datos potencialmente confidenciales (nombres de servicios) en las bases de datos a las que pueden acceder terceros a quienes se haya concedido acceso a las bases de datos.* | `'disabled'` |
| `on_error` | | Gestor de errores personalizado que se invoca cuando MySQL genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores gestionados a nivel de aplicación. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
### Net/HTTP

La integración de Net/HTTP rastreará cualquier llamada HTTP utilizando el módulo estándar lib Net::HTTP.

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :http, **options

  # también puedes especificar un nombre de servicio diferente para nombres de hosts que coinciden con una expresión regular (regex)
  c.tracing.instrument :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Only necessary if split_by_domain is true by default
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                            | Descripción                                                                                                                                                                                  | Predeterminado     |
|-----------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `service_name`        | `DD_TRACE_NET_HTTP_SERVICE_NAME`   | Nombre de la aplicación que ejecuta la instrumentación de `net/http`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `net/http`  |
| `peer_service`        | `DD_TRACE_NET_HTTP_PEER_SERVICE`   | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                         | `nil`       |
| `distributed_tracing` |                                    | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                          | `true`      |
| `split_by_domain`     |                                    | Utiliza el dominio de la solicitud como nombre de servicio cuando se configura como `true`.                                                                                                                              | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTP_ERROR_STATUS_CODES` | Rango o matriz de códigos de estado HTTP que deben rastrearse como errores.                                                                                                                         | `400...600` |

Si quieres configurar cada objeto de conexión individualmente, puedes utilizar `Datadog.configure_onto` como se indica a continuación:

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```

### OpenSearch

La integración de OpenSearch rastreará cualquier llamada a `perform_request` en el objeto `Client`:

```ruby
require 'opensearch'
require 'ddtrace'

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

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                            | Descripción                                                                                                                                                                                    | Predeterminado      |
|----------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name` | `DD_TRACE_OPENSEARCH_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `opensearch`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `opensearch` |
| `peer_service` | `DD_TRACE_OPENSEARCH_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                           | `nil`        |
| `quantize`     |                                    | Hash que contiene las opciones de cuantificación. Puede incluir `:show` con una matriz de claves para no cuantificar (o `:all` para omitir la cuantificación), o `:exclude` con una matriz de claves para excluir por completo.    | `{}`         |

### Postgres

La integración de Postgres rastrea cualquier comando SQL enviado a través de la gema `pg`.
* `exec`, `exec_params`, `exec_prepared`;
* `async_exec`, `async_exec_params`, `async_exec_prepared`; o,
* `sync_exec`, `sync_exec_params`, `sync_exec_prepared`

```ruby
require 'pg'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                    | Descripción                                                                                                                                                                                                                                                                                                                                                             | Predeterminado      |
|-----------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `enabled` || Define si Postgres debe rastrearse. | `true` |
| `service_name`        | `DD_TRACE_PG_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `pg`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration)                                                                                                                                                                                  | `pg`         |
| `peer_service`        | `DD_TRACE_PG_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                                                                                                                                                                                                    | `nil`        |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`  | Modo de propagación de comentarios SQL para la monitorización de bases de datos. <br />(ejemplo: `disabled`\| `service`\| `full`). <br /><br />**Importante**: *Ten en cuenta que al habilitar la propagación de comentarios SQL se almacenan datos potencialmente confidenciales (nombres de servicios) en las bases de datos a las que pueden acceder terceros a quienes se haya concedido acceso a las bases de datos.* | `'disabled'` |
| `error_handler` || Gestor de errores personalizado que se invoca cuando MySQL genera un error. Con `span` y `error` como argumentos. Establece el error en el tramo por defecto. Es útil para ignorar errores gestionados a nivel de aplicación. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Presto

La integración de Presto rastrea cualquier comando SQL enviado a través de la gema `presto-client`.

```ruby
require 'presto-client'
require 'ddtrace'

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

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                        | Descripción                                                                                                                                                                                | Predeterminado  |
|-----------------------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `service_name`        | `DD_TRACE_PRESTO_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `presto`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `presto` |
| `peer_service`        | `DD_TRACE_PRESTO_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                       | `nil`    |


### Qless

La integración con Qless utiliza ganchos de ciclo de vida para rastrear ejecuciones de tareas.

Para añadir el rastreo a una tarea Qless:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :qless, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                 | Descripción                                                    | Predeterminado |
|----------------|-------------------------|----------------------------------------------------------------|---------|
| `tag_job_data` | `DD_QLESS_TAG_JOB_DATA` | Habilita el etiquetado con argumentos de tareas . `true` para activarlo y `false` para desactivarlo. | `false` |
| `tag_job_tags` | `DD_QLESS_TAG_JOB_TAGS` | Habilita el etiquetado con etiquetas de tareas . `true` para activarlo y `false` para desactivarlo.      | `false` |

### Que

La integración de Que es un middleware que rastrea ejecuciones de tareas.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave             | Var ent                         | Descripción                                                                                                                                                                 | Predeterminado                                                            |
|-----------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `enabled`       | `DD_TRACE_QUE_ENABLED`          | Define si Que debe ser rastreado. Es útil para desactivar temporalmente el rastreo. `true` o `false`                                                                           | `true`                                                             |
| `tag_args`      | `DD_TRACE_QUE_TAG_ARGS_ENABLED` | Habilita el etiquetado del campo de argumentos de una tarea. `true` para activarlo y `false` para desactivarlo.                                                                                                       | `false`                                                            |
| `tag_data`      | `DD_TRACE_QUE_TAG_DATA_ENABLED` | Habilita el etiquetado del campo de datos de una tarea. `true` para activarlo y `false` para desactivarlo.                                                                                                       | `false`                                                            |
| `error_handler` |                                 | Gestor de errores personalizado que se invoca cuando un trabajo genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

### Racecar

La integración con Racecar permite rastrear tareas de Racecar.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                         | Descripción                                                                                                                                                                                 | Predeterminado   |
|-----------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_RACECAR_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `racecar`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `racecar` |
|
### Rack

La integración de Rack proporciona un middleware que rastrea todas las solicitudes antes de que lleguen al marco o la aplicación subyacente. Responde a la interfaz mínima de Rack, proporcionando valores razonables que pueden recuperarse a nivel de Rack.

Este integración se activa automáticamente con marcos web como Rails. Si utilizas una aplicación Rack sencilla, habilita la integración con tu `config.ru`:

```ruby
# Ejemplo de config.ru
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rack, **options
end

use Datadog::Tracing::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `application` | Tu aplicación Rack. Necesaria para `middleware_names`. | `nil` |
| `distributed_tracing` | Habilita el [rastreo distribuido](#distributed-tracing) para que la traza de este servicio se conecte con la traza de otro servicio, si se reciben encabezados de rastreo. | `true` |
| `headers` | Hash de encabezados de solicitud o respuesta HTTP para añadir como etiquetas a la`rack.request`. Acepta las claves `request` y `response` con valores de matriz, por ejemplo `['Last-Modified']`. Añade las etiquetas `http.request.headers.*` y `http.response.headers.*`, respectivamente. Esta opción anula las `DD_TRACE_HEADER_TAGS` globales. Para obtener más información, consulta la [aplicación de etiquetas de encabezados a tramos raíz][header tags]. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | Habilita esta opción si quieres utilizar la última clase de middleware ejecutada como nombre de recurso para el tramo `rack`. Si se habilita junto con la instrumentación de `rails`, `rails` tiene prioridad al definir el nombre de recurso `rack` del controlador de `rails` activo, cuando corresponda. Requiere la opción `application` para su uso. | `false` |
| `quantize` | Hash que contiene las opciones de cuantificación. Puede incluir `:query` o `:fragment`. | `{}` |
| `quantize.base` | Define el comportamiento de la base de la URL (esquema, host, puerto). Puede ser `:show`, para conservar la base de la URL en la etiqueta `http.url` y no definir la etiqueta `http.base_url`, o `nil`, para eliminar la base de la URL de la etiqueta `http.url` por defecto, dejando una ruta y definiendo `http.base_url`. Esta opción debe estar anidada dentro de la opción `quantize`. | `nil` |
| `quantize.query` | Hash que contiene opciones para la parte de consulta de la cuantificación de la URL. Puede incluir `:show` o `:exclude`. Consulta las opciones a continuación. La opción debe estar anidada dentro de la opción `quantize`. | `{}` |
| `quantize.query.show` | Define qué valores deben mostrarse siempre. Puede ser una matriz de cadenas, `:all`, para mostrar todos los valores, o `nil`, para no mostrar ningún valor. Esta opción debe estar anidada dentro de la opción `query`. | `nil` |
| `quantize.query.exclude` | Define qué valores deben eliminarse por completo. Puede ser una matriz de cadenas, `:all`, para eliminar la cadena de consulta por completo, o `nil`, para no excluir nada. Esta opción debe estar anidada dentro de la opción `query`. | `nil` |
| `quantize.query.obfuscate` | Define el comportamiento de redacción de la cadena de consulta. Puede ser un hash de opciones, `:internal`, para utilizar parámetros de ofuscación interna por defecto, o `nil`, para deshabilitar la ofuscación. Ten en cuenta que la ofuscación es una operación cadena-valor, no una operación clave-valor. Cuando está habilitada, `query.show` pasa por defecto a `:all`, si no se define. Esta opción debe estar anidada dentro de la opción `query`. | `nil` |
| `quantize.query.obfuscate.with` | Define la cadena por la que se sustituirán las coincidencias ofuscadas. Puede ser una cadena. Esta opción debe estar anidada dentro de la opción `query.obfuscate`. | `'<redacted>'` |
| `quantize.query.obfuscate.regex` | Define la expresión regular con la que se redactará la cadena de consulta. Puede ser una expresión regular (Regexp), o `:internal`, para utilizar la expresión regular (Regexp) interna por defecto, que redacta datos sensibles bien conocidos. Cada coincidencia se redacta por completo sustituyéndola por `query.obfuscate.with`. Esta opción debe estar anidada dentro de la opción `query.obfuscate`. | `:internal` |
| `quantize.fragment` | Define el comportamiento de los fragmentos de URL. Puede ser `:show`, para mostrar fragmentos de URL, o `nil`, para eliminarlos. Esta opción debe estar anidada dentro de la opción `quantize`. | `nil` |
| `request_queuing` | Realiza un seguimiento del tiempo que pasan las solicitudes HTTP en la cola del servidor frontend. Para obtener más información, consulta [Cola de solicitudes HTTP](#http-request-queuing). | `false` |
| `web_service_name` | Nombre de servicio para tramos de cola de solicitudes del servidor frontend. (por ejemplo, `'nginx'`) | `'web-server'` |

Aviso de obsolescencia:
- `quantize.base` cambiará por defecto de `:exclude` a `:show` en una futura versión. Se recomienda el cambio voluntario a `:show`.
- `quantize.query.show` cambiará su valor por defecto a `:all` en una versión futura, junto con `quantize.query.obfuscate`, que cambiará a `:internal`. Se recomienda el cambio voluntario a estos valores futuros.

**Configuración del comportamiento de cuantificación de URL**

```ruby
Datadog.configure do |c|
  # Comportamiento predeterminado: todos los valores se cuantifican, la base se elimina, el fragmento se elimina.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by
  # http://example.com:8080/path?categories[]=1&categories[]=2 --> /path?categories[]

  # Elimina la base URL (esquema, host, puerto)
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :exclude }

  # Muestra la base URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :show }

  # Muestra valores para cualquier parámetro de cadena de consulta que coincida con 'category_id' exactly
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by
  c.tracing.instrument :rack, quantize: { query: { show: ['category_id'] } }

  # Muestra todos los valores para cualquier parámetro de cadena de consulta
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { show: :all } }

  # Excluye por completo cualquier parámetro de cadena de consulta que coincida con 'sort_by' exactly
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id
  c.tracing.instrument :rack, quantize: { query: { exclude: ['sort_by'] } }

  # Excluye por completo la cadena de consulta
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path
  c.tracing.instrument :rack, quantize: { query: { exclude: :all } }

  # Muestra fragmentos URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { fragment: :show }

  # Ofusca la cadena de consulta, para mostrar todos los valores por defecto
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: {} } }

  # Ofusca la cadena de consulta utilizando la expresión regular (regex) proporcionada, para mostrar todos los valores por defecto
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { regex: /category_id=\d+/ } } }

  # Ofusca la cadena de consulta utilizando una cadena de redacción personalizada
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?REMOVED&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { with: 'REMOVED' } } }
end
```

### Rails

La integración de Rails rastreará solicitudes, llamadas a bases de datos, representación de plantillas y operaciones de lectura/escritura/eliminación de caché. La integración hace uso de la instrumentación de Active Support y escucha a la API de notificación para que cualquier operación instrumentada por la API sea rastreada.

Para habilitar la instrumentación Rails, crea un archivo inicializador en tu carpeta `config/initializers`:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `distributed_tracing` | Habilita el [rastreo distribuido](#distributed-tracing) para que la traza de este servicio se conecte con la traza de otro servicio, si se reciben encabezados de rastreo. | `true` |
| `request_queuing` | Realiza un seguimiento del tiempo que pasan las solicitudes HTTP en la cola del servidor frontend. Para obtener más información, consulta [Cola de solicitudes HTTP](#http-request-queuing). | `false` |
| `middleware` | Añade el middleware de rastreo a la aplicación Rails. Configúralo como `false`, si no quieres que se cargue el middleware. | `true` |
| `middleware_names` | Permite que cualquier solicitud de middleware en cortocircuito muestre el nombre del middleware como recurso para la traza. | `false` |
| `service_name` | Nombre de servicio utilizado al rastrear las solicitudes de aplicación (en el nivel de `rack`) | `'<app_name>'` (deducido del espacio de nombres de tu aplicación Rails) |
| `template_base_path` | Se utiliza cuando se analiza el nombre de la plantilla. Si no almacenas tus plantillas en la carpeta `views/`, es posible que necesites cambiar este valor. | `'views/'` |

**Versiones compatibles**

| Versiones de MRI  | Versiones de JRuby | Versiones de Rails |
| ------------- | -------------- | -------------- |
|  2.1          |                |  3.2 - 4.2     |
|  2.2 - 2.3    |                |  3.2 - 5.2     |
|  2.4          |                |  4.2.8 - 5.2   |
|  2.5          |                |  4.2.8 - 6.1   |
|  2.6 - 2.7    |  9.2           |  5.0 - 6.1     |
|  3.0 - 3.2    |                |  6.1           |

### Rake

Puedes añadir la instrumentación en tus tareas de Rake activando la integración de `rake` y
proporcionando una lista de las tareas de Rake que deben instrumentarse.

**Evita instrumentar tareas de Rake de ejecución prolongada, ya que estas tareas pueden agregar grandes trazas
a la memoria que nunca se vacían hasta que la tarea termina.**

Para tareas de ejecución prolongada, utiliza la [instrumentación manual](#manual-instrumentation) con las rutas de código recurrentes.

Para activar el rastreo de tareas de Rake, agrega lo siguiente a su `Rakefile`:

```ruby
# En la parte superior de tu Rakefile:
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # Haz algunas tareas relacionadas con trabajos aquí...
end

Rake::Task['my_task'].invoke
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si las tareas de Rake deben rastrearse. Es útil para deshabilitar temporalmente el rastreo. `true` o `false` | `true` |
| `quantize` | Hash que contiene opciones para la cuantificación de los argumentos de la tarea. Consulta más abajo para obtener más detalles y ejemplos. | `{}` |
| `service_name` | Nombre de servicio utilizado para la instrumentación de `rake` | `'rake'` |
| `tasks` | Nombres de las tareas de Rake a instrumentar | `[]` |

**Configuración del comportamiento de la cuantificación de tareas**

```ruby
Datadog.configure do |c|
  # Dada una tarea que acepta :una, :dos, :tres...
  # Invocada con 'foo', 'bar', 'baz'.

  # Comportamiento predeterminado: se cuantifican todos los argumentos.
  # Etiqueta `rake.invoke.args` --> ['?']
  # Etiqueta `rake.execute.args`--> { una: '?', dos: '?', tres: '?' }
  c.tracing.instrument :rake

  # Muestra valores de cualquier argumento coincidente :exactamente dos
  # Etiqueta `rake.invoke.args` --> ['?']
  # Etiqueta `rake.execute.args` --> { una: '?', dos: '?', tres: '?' }
  c.tracing.instrument :rake, quantize: { args: { show: [:two] } }

  # Muestra todos los valores de todos los argumentos.
  # Etiqueta `rake.invoke.args` --> ['foo', 'bar', 'baz']
  # Etiqueta `rake.execute.args` --> { una: 'foo', dos: 'bar', tres: 'baz' }
  c.tracing.instrument :rake, quantize: { args: { show: :all } }

  # Excluye por completo cualquier argumento coincidente :exactamente tres
  # Etiqueta `rake.invoke.args` --> ['?']
  # Etiqueta `rake.execute.args` --> { una: '?', dos: '?' }
  c.tracing.instrument :rake, quantize: { args: { exclude: [:three] } }

  # Elimina los argumentos por completo
  # Etiqueta `rake.invoke.args` --> ['?']
  # Etiqueta `rake.execute.args` --> {}
  c.tracing.instrument :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

La integración de Redis rastrea llamadas simples y también pipelines.

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Ejecuta comandos de Redis
redis = Redis.new
redis.set 'foo', 'bar'
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave            | Var ent                       | Descripción                                                                                                                                                                               | Predeterminado |
|----------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name` | `DD_TRACE_REDIS_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `redis`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `redis` |
| `peer_service` | `DD_TRACE_REDIS_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                      | `nil`   |
| `command_args` | `DD_REDIS_COMMAND_ARGS`       | Muestra los argumentos del comando (por ejemplo, `key` en `GET key`) como nombre y etiqueta del recurso. Si es `false`, sólo se muestra el nombre del comando (por ejemplo, `GET`). | false |


**Configuración de los parámetros de rastreo por instancia**

Con Redis v5 o anterior:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # Habilitar la instrumentación de la integración sigue siendo un requisito
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
require "ddtrace"

redis = RedisClient.config(custom: { datadog: { service_name: "my-custom-redis" } }).new_client

Datadog.configure do |c|
  c.tracing.instrument :redis # Habilitar la instrumentación de la integración sigue siendo un requisito
end

redis.call('PING')
```

Con Redis v5 o anterior:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # Habilitar la instrumentación de la integración sigue siendo un requisito
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

**Configuración de los parámetros de rastreo por conexión**

Puedes configurar los parámetros de rastreo por conexión a través de la opción `describes`:

```ruby
# Proporciona una opción `:describes` con una clave de conexión.
# Cualquiera de las siguientes claves son aceptables y equivalentes unas con otras.
# Si se proporciona un bloque, devuelve un objeto Parámetros que
# acepta cualquiera de las opciones de configuración enumeradas anteriormente.

Datadog.configure do |c|
  # Configuración por defecto para cualquier cliente de Redis
  c.tracing.instrument :redis, service_name: 'redis-default'

  # Configuración que coincide con un socket Unix dado.
  c.tracing.instrument :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # Para las conexiones de red, sólo se consideran estos campos durante el emparejamiento:
  # esquema, host, puerto, base de datos
  # Se ignoran otros campos.

  # Cadena de conexión de red
  c.tracing.instrument :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.tracing.instrument :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # Hash de cliente de red
  c.tracing.instrument :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # Sólo un subconjunto de hashes de conexión
  c.tracing.instrument :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.tracing.instrument :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

Cuando varias configuraciones de `describes` coincidan con una conexión, se aplicará la última regla configurada que coincida.

### Resque

La integración de Resque utiliza ganchos de Resque que envuelven el método `perform`.

Para añadir el rastreo a una tarea de Resque:

```ruby
require 'resque'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `error_handler` | Gestor de errores personalizado que se invoca cuando una tarea genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Rest Client

La integración de `rest-client` está disponible a través del middleware de `ddtrace`:

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                             | Descripción                                                                                                                                                                                     | Predeterminado       |
|-----------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `service_name`        | `DD_TRACE_REST_CLIENT_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `rest_client`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration) | `rest_client` |
| `peer_service`        | `DD_TRACE_REST_CLIENT_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                            | `nil`         |
| `distributed_tracing` |                                     | Habilita el [rastreo distribuido](#distributed-tracing)                                                                                                                                             | `true`        |
| `split_by_domain`     |                                     | Utiliza el dominio de solicitud como nombre de servicio cuando se establece en `true`.                                                                                                                                 | `false`       |

### Roda

La integración de Roda rastrea solicitudes.

La integración de **Roda**  puede habilitarse a través de `Datadog.configure`. Se recomienda utilizar esta integración con **Rack** a través de `use Datadog::Tracing::Contrib::Rack::TraceMiddleware` para el rastreo distribuido.

```ruby
require "roda"
require "ddtrace"

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

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `service_name` | Nombre de servicio para la instrumentación de `roda`. | `'nil'` |

### RSpec

La integración con RSpec rastrea todas las ejecuciones de ejemplos de grupos y de ejemplos cuando se utiliza el marco `rspec`.

Para activar tu integración, utiliza el método `Datadog.configure`:

```ruby
require 'rspec'
require 'ddtrace'

# Configura la integración RSpec por defecto
Datadog.configure do |c|
  c.ci.instrument :rspec, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si los tests de RSpec deben rastrearse. Es útil para deshabilitar temporalmente el rastreo. `true` o `false` | `true` |
| `service_name` | Nombre de servicio utilizado para la instrumentación de `rspec` | `'rspec'` |
| `operation_name` | Nombre de operación utilizado para la instrumentación de `rspec`. Es útil si quieres renombrar métricas de rastreo automáticas, por ejemplo `trace.#{operation_name}.errors`. | `'rspec.example'` |

### Sequel

La integración de Sequel rastrea consultas realizadas a tu base de datos.

```ruby
require 'sequel'
require 'ddtrace'

# Conéctate a la base de datos
database = Sequel.sqlite

# Crea una tabla
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.tracing.instrument :sequel, **options
end

# Realiza una consulta
articles = database[:articles]
articles.all
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `service_name` | Nombre de servicio para la instrumentación de `sequel`. | Nombre del adaptador de base de datos (por ejemplo, `'mysql2'`) |

**Configuración de las bases de datos para utilizar diferentes parámetros**

Si utilizas varias bases de datos con Sequel, puedes dar a cada una de ellas una configuración diferente al establecer sus respectivos objetos `Sequel::Database`:

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# Configura cada base de datos con diferentes nombres de servicios
Datadog.configure_onto(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure_onto(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

La integración de Shoryuken es un middleware que rastrea ejecuciones de tareas.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `tag_body` | Etiqueta tramos con el cuerpo del mensaje SQS `true` o `false` | `false` |
| `error_handler` | Gestor de errores personalizado que se invoca cuando una tarea genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Sidekiq

La integración de Sidekiq es un middleware del lado del cliente y del lado del servidor que rastrea la cola de tareas y ejecuciones, respectivamente.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `distributed_tracing` | Al activar el [rastreo distribuido](#distributed-tracing) se crea una relación primario-secundario entre el tramo `sidekiq.push` y el tramo `sidekiq.job`. <br /><br />**Importante**: Habilitar el rastreo_distribuido para el procesamiento asíncrono puede dar lugar a cambios drásticos en tu gráfico de trazas. Tales casos incluyen trabajos de duración prolongada, trabajos reintentados y trabajos programados en un futuro lejano. Asegúrate de inspeccionar tus trazas después de habilitar esta característica.* | `false` |
| `tag_args` | Habilita el etiquetado con argumentos de tareas . `true` para activarlo y `false` para desactivarlo. | `false` |
| `error_handler` | Gestor de errores personalizado que se invoca cuando una tarea genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize` | Hash que contiene las opciones para la cuantificación de los argumentos de la tarea. | `{}` |

### Sinatra

La integración de Sinatra rastrea solicitudes y la representación de plantillas.

Para empezar a utilizar el cliente de rastreo, asegúrate de importar `ddtrace` y `instrument :sinatra` después de `sinatra` o `sinatra/base`, y antes de definir tu aplicación/rutas:

#### Aplicación clásica

```ruby
require 'sinatra'
require 'ddtrace'

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
require 'ddtrace'

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

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `distributed_tracing` | Habilita el [rastreo distribuido](#distributed-tracing) para que la traza de este servicio se conecte con la traza de otro servicio, si se reciben encabezados de rastreo. | `true` |
| `headers` | Hash de encabezados de solicitud o respuesta HTTP para añadir como etiquetas a la`rack.request`. Acepta las claves `request` y `response` con valores de matriz, por ejemplo `['Last-Modified']`. Añade las etiquetas `http.request.headers.*` y `http.response.headers.*`, respectivamente. Esta opción anula las `DD_TRACE_HEADER_TAGS` globales. Para obtener más información, consulta la [aplicación de etiquetas de encabezados a tramos raíz][header tags]. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | Anteponer el nombre del script al nombre del recurso | `false` |

### Sneakers

La integración de  Sneakers es un middleware que rastrea ejecuciones de tareas.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si Sneakers debe rastrearse. Es útil para deshabilitar temporalmente el rastreo. `true` o `false` | `true` |
| `tag_body` | Habilita el etiquetado de mensajes de tareas . `true` para activarlo y `false` para desactivarlo. | `false` |
| `error_handler` | Gestor de errores personalizado que se invoca cuando una tarea genera un error. Se proporcionan `span` y `error` como argumentos. Define el error en el tramo por defecto. Es útil para ignorar errores transitorios. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Stripe

La integración de Stripe rastrea solicitudes de la API de Stripe.

Puedes habilitarla a través de `Datadog.configure`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave | Descripción | Predeterminado |
| --- | ----------- | ------- |
| `enabled` | Define si Stripe debe rastrearse. Es útil para deshabilitar temporalmente el rastreo. `true` o `false` | `true` |

### Sucker Punch

La integración de `sucker_punch` rastrea todas las tareas programadas:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch
end

# Se rastrea la ejecución de esta tarea
LogJob.perform_async('login')
```

### Trilogy

La integración de Trilogy rastrea cualquier comando SQL enviado a través de la gems `trilogy`.

```ruby
require 'trilogy'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :trilogy, **options
end

client = Trilogy.new(host: "localhost", username: "root")
client.query("SELECT * FROM users WHERE group='x'")
```

Las `options` son los siguientes argumentos de palabra clave:

| Clave                   | Var ent                        | Descripción                                                                                                                                                                                                                                                                                                                                                             | Predeterminado      |
|-----------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_TRILOGY_SERVICE_NAME` | Nombre de la aplicación que ejecuta la instrumentación de `trilogy`. Puede ser anulado por `global_default_service_name`. [Para obtener más detalles, consulta *Configuración adicional*](#additional-configuration)  | `trilogy` |
| `peer_service`        | `DD_TRACE_TRILOGY_PEER_SERVICE` | Nombre del servicio externo al que se conecta la aplicación                                                                                                                                         | `nil`     |

## Configuración adicional

Para cambiar el comportamiento por defecto de `ddtrace`, por orden de prioridad (siendo 1 la prioridad más alta), puedes utilizar lo siguiente:

1. [Configuración remota](https://docs.datadoghq.com/agent/remote_config).
2. Opciones definidas dentro de un bloque `Datadog.configure`, por ejemplo:
    ```ruby
    Datadog.configure do |c|
      c.service = 'billing-api'
      c.env = ENV['RACK_ENV']

      c.tracing.report_hostname = true
      c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
    end
    ```
3. Variables de entorno.

**Si se define un valor de prioridad superior para una opción, configurar esa opción con un valor de prioridad inferior no cambiará su valor efectivo.**

Por ejemplo, si `tracing.sampling.default_rate` está configurado mediante [configuración remota](#remote-configuration), cambiar su valor a través del bloque `Datadog.configure` no tendrá ningún efecto.

**Opciones de configuración disponibles:**

| Parámetro                                                 | Var ent                                                 | Predeterminado                      | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------------------|---------------------------------------------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Global**                                              |                                                         |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `agent.host`                                            | `DD_AGENT_HOST`                                         | `127.0.0.1`                  | Nombre de host del Agent al que se enviarán los datos de traza.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `agent.port`                                            | `DD_TRACE_AGENT_PORT`                                   | `8126`                       | Puerto de host del Agent al que se enviarán los datos de traza. Si la [configuración del Agent](#configuring-trace-data-ingestion) configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.                                                                                                                                                                                                                                                                                                        |
|                                                         | `DD_TRACE_AGENT_URL`                                    | `nil`                        | Configura el endpoint de la URL donde se envían las trazas. Tiene prioridad sobre `agent.host` y `agent.port`. Si la [configuración del Agent](#configuring-trace-data-ingestion) configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, entonces `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.                                                                                                                                                                                                                                                               |
| `diagnostics.debug`                                     | `DD_TRACE_DEBUG`                                        | `false`                      | Habilita o deshabilita el modo de depuración. Imprime logs con información detallada. **NO recomendado para entornos de producción u otros entornos confidenciales.** Para obtener más detalles, consulta [Depuración y diagnóstico](#debugging-and-diagnostics).                                                                                                                                                                                                                                                                                                                                                                                   |
| `diagnostics.startup_logs.enabled`                      | `DD_TRACE_STARTUP_LOGS`                                 | `nil`                        | Imprime la configuración de inicio y los diagnósticos para registrar. Para evaluar el estado del rastreo al inicio de la aplicación y obtener más detalles, consulta [Depuración y diagnóstico](#debugging-and-diagnostics).                                                                                                                                                                                                                                                                                                                                                                                                |
| `env`                                                   | `DD_ENV`                                                | `nil`                        | Tu entorno de aplicación. (Por ejemplo, `production`, `staging`, etc.) Este valor se drfine como una etiqueta en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `service`                                               | `DD_SERVICE`                                            | *Nombre de archivo de Ruby*              | El nombre de servicio por defecto de tu aplicación. (Por ejemplo, `billing-api`). Este valor se establece como una etiqueta en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tags`                                                  | `DD_TAGS`                                               | `nil`                        | Etiquetas personalizadas en pares de valores separados por `,` (por ejemplo, `layer:api,team:intake`). Estas etiquetas se configuran en todas las trazas. Para más detalles, consulta [Entorno y etiquetas](#environment-and-tags).                                                                                                                                                                                                                                                                                                                                                                                                         |
| `time_now_provider`                                     |                                                         | `->{ Time.now }`             | Cambia cómo se recupera la hora. Para obtener más detalles, consulta [Configuración del proveedor de tiempo](#setting-the-time-provider).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `version`                                               | `DD_VERSION`                                            | `nil`                        | La versión de tu aplicación (por ejemplo, `2.5`, `202003181415`, `1.3-alpha`, etc.). Este valor se establece como una etiqueta en todas las trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `telemetry.enabled`                                     | `DD_INSTRUMENTATION_TELEMETRY_ENABLED`                  | `true`                       | Permite habilitar el envío de datos de telemetría a Datadog. Puede deshabilitarse, como se documenta [aquí](https://docs.datadoghq.com/tracing/configure_data_security/#telemetry-collection).                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Rastreo**                                             |                                                         |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.contrib.peer_service_mapping`                  | `DD_TRACE_PEER_SERVICE_MAPPING`                         | `nil`                        | Define la reasignación de la etiqueta `peer.service` a través de toda la instrumentación. Proporciona una lista de `old_value1:new_value1, old_value2:new_value2, ...`                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.contrib.global_default_service_name.enabled`   | `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`     | `false`                      | Cambia el valor por defecto de `service_name` al nombre de servicio de la aplicación en toda la instrumentación. Se utiliza con [servicios Beta inferidos](https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `tracing.distributed_tracing.propagation_extract_first` | `DD_TRACE_PROPAGATION_EXTRACT_FIRST` | `false` | Sal inmediatamente en el primer formato de propagación válido detectado. Para obtener más detalles, consulta [Rastreo distribuido](#distributed-tracing). |
| `tracing.distributed_tracing.propagation_extract_style` | `DD_TRACE_PROPAGATION_STYLE_EXTRACT`                    | `['Datadog','tracecontext']` | Formatos de propagación de rastreo distribuido para extraer. Anula `DD_TRACE_PROPAGATION_STYLE`. Para obtener más detalles, consulta [Rastreo distribuido](#distributed-tracing).                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.distributed_tracing.propagation_inject_style`  | `DD_TRACE_PROPAGATION_STYLE_INJECT`                     | `['Datadog','tracecontext']` | Formatos de propagación de rastreo distribuido para inyectar. Anula `DD_TRACE_PROPAGATION_STYLE`. Para obtener más detalles, consulta [Rastreo distribuido](#distributed-tracing).                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.distributed_tracing.propagation_style`         | `DD_TRACE_PROPAGATION_STYLE`                            | `nil`                        | Formatos de propagación de rastreo distribuido para extraer e inyectar. Para obtener más detalles, consulta [Rastreo distribuido](#distributed-tracing).                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tracing.enabled`                                       | `DD_TRACE_ENABLED`                                      | `true`                       | Habilita o deshabilita el rastreo. Si se configura como `false`, la instrumentación seguirá ejecutándose, pero no se enviará ninguna traza al Trace Agent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.header_tags`                                   | `DD_TRACE_HEADER_TAGS`                                  | `nil`                        | Registra los encabezados HTTP como etiquetas de tramo. Para obtener más información, consulta [Aplicar etiquetas de encabezado en tramos raíz][header tags].                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.instrument(<integration-name>, <options...>)`  |                                                         |                              | Activa la instrumentación para una biblioteca específica. Para obtener más detalles, consulta [Instrumentación de la integración](#integration-instrumentation).                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.log_injection`                                 | `DD_LOGS_INJECTION`                                     | `true`                       | Inyecta información de [correlación de trazas](#trace-correlation) en logs de Rails, si está presente. Admite el generador de logs por defecto (`ActiveSupport::TaggedLogging`), `lograge` y `semantic_logger`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tracing.partial_flush.enabled`                         |                                                         | `false`                      | Habilita o deshabilita la descarga parcial. La descarga parcial envía las partes completadas de una traza al Agent. Se utiliza cuando se rastrean instrumentos de tareas de duración prolongada (por ejemplo, tareas) con muchos tramos.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tracing.partial_flush.min_spans_threshold`             |                                                         | `500`                        | El número de tramos que deben completarse en una traza antes de que la descarga parcial envíe esos tramos completados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.sampler`                                       |                                                         | `nil`                        | Sólo para uso avanzado. Define una instancia personalizada de `Datadog::Tracing::Sampling::Sampler`. Si se proporciona, el rastreador utilizará este muestreador para determinar el comportamiento del muestreo. Para obtener más detalles, consulta [Muestreo personalizado](#custom-sampling).                                                                                                                                                                                                                                                                                                                                                |
| `tracing.sampling.default_rate`                         | `DD_TRACE_SAMPLE_RATE`                                  | `nil`                        | Configura la frecuencia de muestreo del rastreo entre `0.0` (0%) y `1.0` (100%). Para obtener más detalles, consulta [Muestreo del lado de la aplicación](#application-side-sampling).                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tracing.sampling.rate_limit`                           | `DD_TRACE_RATE_LIMIT`                                   | `100` (por segundo)           | Establece un número máximo de trazas por segundo a muestrear. Establece un límite de frecuencia para evitar los excesos de volumen de consumo en caso de picos de tráfico.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.sampling.rules`                                | `DD_TRACE_SAMPLING_RULES`                               | `nil`                        | Define reglas de muestreo a nivel de traza, comparándolas con el tramo raíz local. El formato es una `String` con JSON, que contiene una matriz de objetos. Cada objeto debe tener un atributo flotante `sample_rate` (entre 0,0 y 1,0, inclusive) y, opcionalmente, atributos de cadena `name`, `service`, `resource` y `tags`. `name`, `service`, `resource` y `tags` controlan a qué trazas se aplica esta regla de muestreo; si todos ellos están ausentes, esta regla se aplica a todas las trazas. Las reglas se evalúan por orden de declaración en la matriz; sólo se aplica la primera regla que coincida. Si no se aplica ninguna, se aplica `tracing.sampling.default_rate`. |
| `tracing.sampling.span_rules`                           | `DD_SPAN_SAMPLING_RULES`,`ENV_SPAN_SAMPLING_RULES_FILE` | `nil`                        | Establece reglas de [muestreo de tramo único](#single-span-sampling). Estas reglas te permiten conservar tramos incluso cuando sus respectivas trazas se eliminan.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.trace_id_128_bit_generation_enabled`           | `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`           | `true`                       | `true` para generar ID de trazas de 128 bits y `false` para generar ID de trazas de 64 bits                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.report_hostname`                               | `DD_TRACE_REPORT_HOSTNAME`                              | `false`                      | Añade etiquetas de nombres de host a trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.test_mode.enabled`                             | `DD_TRACE_TEST_MODE_ENABLED`                            | `false`                      | Habilita o deshabilita el modo de test, para utilizar el rastreo en conjuntos de tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tracing.test_mode.trace_flush`                         |                                                         | `nil`                        | Objeto que determina el comportamiento de descarga de trazas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### Generación de logs personalizada

Por defecto, todos los logs son procesados por el generador de logs de Ruby por defecto. Cuando utilices Rails, deberías ver los mensajes en tu archivo del log de aplicación.

Los mensajes de logs de clientes de Datadog están marcados con `[ddtrace]`, por lo que deberías poder aislarlos de otros mensajes.

Además, es posible anular el generador de logs predeterminado y sustituirlo por uno personalizado. Para ello, utiliza la configuración `log`.

```ruby
f = File.new("my-custom.log", "w+") # Log messages should go there
Datadog.configure do |c|
  c.logger.instance = Logger.new(f) # Overriding the default logger
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

#### Entorno y etiquetas

Por defecto, el Trace Agent (no esta biblioteca, sino el programa que se ejecuta en segundo plano recopilando datos de varios clientes) utiliza las etiquetas establecidas en el archivo de configuración del Agent. Puedes configurar la aplicación para que etiquete automáticamente tus trazas y métricas, con las siguientes variables de entorno:

 - `DD_ENV`: Tu entorno de aplicación (por ejemplo `production`, `staging`, etc.)
 - `DD_SERVICE`: El nombre de servicio por defecto de tu aplicación (por ejemplo `billing-api`)
 - `DD_VERSION`: La versión de tu aplicación (por ejemplo, `2.5`, `202003181415`, `1.3-alpha`, etc.)
 - `DD_TAGS`: Etiquetas personalizadas en pares de valores separados por `,` (por ejemplo `layer:api,team:intake`)
    - Si `DD_ENV`, `DD_SERVICE` o `DD_VERSION` están definidos, anularán cualquier etiqueta `env`/`service`/`version` respectiva definida en `DD_TAGS`.
    - Si `DD_ENV`, `DD_SERVICE` o `DD_VERSION` NO están definidos, se utilizarán etiquetas definidas en `DD_TAGS` para rellenar `env`/`service`/`version` respectivamente.

Estos valores también pueden anularse a nivel del rastreador:

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

Esto te permite definir este valor por aplicación, por lo que puedes tener, por ejemplo, varias aplicaciones que informen sobre diferentes entornos en el mismo host.

Las etiquetas también pueden establecerse directamente en tramos individuales, lo que sustituirá a cualquier etiqueta conflictiva definida a nivel de aplicación.

#### Depuración y diagnóstico

Se sugieren dos medios diferentes de generación de diagnósticos para el rastreo:

##### Habilitación del modo de depuración

Si se cambia la biblioteca al modo de depuración, se obtendrán logs detallados y completos sobre la actividad de rastreo, incluidos los errores eliminados. Este resultado puede ser útil para identificar errores o confirmar el envío de trazas al Agent.

Puede habilitarlo a través de `diagnostics.debug = true` o `DD_TRACE_DEBUG`.

```ruby
Datadog.configure { |c| c.diagnostics.debug = true }
```

**NO recomendamos el uso de esta función en producción u otros entornos sensibles**, ya que puede ser muy verboso bajo carga. Es mejor utilizarla en un entorno controlado donde se pueda controlar la carga de la aplicación.

##### Habilitación de logs de inicio

Los logs de inicio generan un informe del estado de rastreo cuando la aplicación se configura inicialmente. Esto puede ser útil para confirmar que la configuración y la instrumentación se han habilitado correctamente.

Puede habilitarlo a través de `diagnostics.startup_logs.enabled = true` o `DD_TRACE_STARTUP_LOGS`.

```ruby
Datadog.configure { |c| c.diagnostics.startup_logs.enabled = true }
```

Por defecto, se habilitará siempre que `ddtrace` detecte que la aplicación se está ejecutando en un entorno que no es un entorno de desarrollo.

### Muestreo

Consulta [Mecanismos de consumo](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby) para ver la lista de
todas las opciones de muestreo disponibles.

#### Muestreo prioritario

El muestreo prioritario decide si se mantiene una traza utilizando un atributo de prioridad propagado para trazas distribuidas. Su valor indica al Agent y al backend lo importante que es la traza.

El muestreador puede establecer la prioridad en los siguientes valores:

 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_REJECT`: El muestreador decidió automáticamente rechazar la traza.
 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_KEEP`: El muestreador decidió automáticamente conservar la traza.

El muestreo prioritario está habilitado por defecto. Habilitarlo garantiza que las trazas muestreadas distribuida serán completas. Una vez habilitado, el muestreador asignará automáticamente una prioridad de 0 o 1 a las trazas, dependiendo de su servicio y volumen.

También puedes establecer esta prioridad manualmente para descartar una traza que no te interese o conservar una importante. Para ello, configura la `TraceOperation#sampling_priority` como:

 - `Datadog::Tracing::Sampling::Ext::Priority::USER_REJECT`: Se pide al usuario que rechace la traza.
 - `Datadog::Tracing::Sampling::Ext::Priority::USER_KEEP`: El usuario ha solicitado conservar la traza.

Cuando no se utiliza el [rastreo distribuido](#distributed-tracing), se puede cambiar la prioridad en cualquier momento, siempre que la traza esté incompleta. Pero tiene que hacerse antes de cualquier propagación de contexto (fork, llamadas RPC) para que sea útil en un contexto distribuido. Cambiar la prioridad después de que el contexto se haya propagado hace que diferentes partes de una traza distribuida utilicen diferentes prioridades. Algunas partes podrían conservarse, otras podrían rechazarse, y esto puede causar que la traza se almacene parcialmente y permanezca incompleta.

Por esta razón, si cambia la prioridad, te recomendamos que lo hagas lo antes posible.

Para cambiar la prioridad de muestreo, puedes utilizar los siguientes métodos:

```ruby
# Rechaza la traza activa
Datadog::Tracing.reject!

# Conserva la traza activa
Datadog::Tracing.keep!
```

Es seguro utilizar `Datadog::Tracing.reject!` y `Datadog::Tracing.keep!` cuando no hay trazas activas.

También puedes rechazar una instancia de traza específica:

```ruby
# First, grab the active trace
trace = Datadog::Tracing.active_trace

# Rechaza la traza
trace.reject!

# Conserva la traza
trace.keep!
```

#### Muestreo de tramo único

Puedes configurar la regla de muestreo que te permita conservar tramos a pesar de que sus trazas respectivas hayan sido descartadas por una regla de muestreo a nivel de traza.

Esto permite conservar tramos importantes cuando se aplica el muestreo a nivel de la traza. No es posible eliminar tramos utilizando el muestreo de tramo único.

Para configurarlo, consulta la [documentación sobre mecanismos de consumo](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby#single-spans).

#### Muestreo del lado de la aplicación

Mientras que el Datadog Agent puede muestrear trazas para reducir el uso del ancho de banda, el muestreo del lado de la aplicación reduce la sobrecarga de rendimiento en la aplicación host.

**El muestreo del lado de la aplicación elimina trazas lo antes posible. Esto hace que la página [Controles de consumo](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/) no reciba suficientes datos para informar sobre frecuencias de muestreo precisas. Utilízalo sólo cuando sea primordial reducir la sobrecarga de rastreo.**

Si utilizas esta función, indícanoslo [abriendo una incidencia en GitHub](https://github.com/DataDog/dd-trace-rb/issues/new), para que podamos comprender mejor tu caso de uso y ofrecerte asistencia.

Puedes configurar el *muestreo del lado de la aplicación* con los siguientes parámetros:

```ruby
# Muestreo del lado de la aplicación habilitado: La página Controles de consumo no será precisa.
sampler = Datadog::Tracing::Sampling::RateSampler.new(0.5) # muestreo del 50% de las trazas

Datadog.configure do |c|
  c.tracing.sampler = sampler
end
```

Para obtener más información sobre estos parámetros, consulta [Configuración adicional](#additional-configuration).

### Rastreo distribuido

El rastreo distribuido permite propagar trazas a través de múltiples aplicaciones instrumentadas, de modo que una solicitud puede presentarse como una traza única, en lugar de una traza independiente por servicio.

Para rastrear solicitudes a través de los límites de la aplicación, lo siguiente debe propagarse entre cada aplicación:

| Propiedad              | Tipo    | Descripción                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **ID de rastreo**          | Entero | ID de rastreo. Este valor debe ser el mismo en todas las solicitudes que pertenezcan a la misma traza.                           |
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

**Via HTTP**

Para las solicitudes HTTP entre aplicaciones instrumentadas, estos metadatos de rastreo se propagan mediante el uso de encabezados de solicitudes HTTP:

| Propiedad              | Tipo    | Nombre del encabezado HTTP              |
| --------------------- | ------- | ----------------------------- |
| **ID de rastreo**          | Entero | `x-datadog-trace-id`          |
| **ID de tramo principal**    | Entero | `x-datadog-parent-id`         |
| **Prioridad de muestreo** | Entero | `x-datadog-sampling-priority` |

Tal que:

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

El rastreo es compatible con los siguientes formatos de trazas distribuidas:

 - `Datadog`
 - `tracecontext`: [Contexto de traza W3C](https://www.w3.org/TR/trace-context/)
 - `b3multi`: [Encabezados múltiples B3](https://github.com/openzipkin/b3-propagation#multiple-headers)
 - `b3`: [Encabezado único B3](https://github.com/openzipkin/b3-propagation#single-header)
 - `none`: No-op.

Puedes habilitar/deshabilitar el uso de estos formatos a través de `Datadog.configure`:

```ruby
Datadog.configure do |c|
  # Lista de formatos de encabezados que se deben extraer
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # Lista de formatos de encabezados que se deben inyectar
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

**Activación del rastreo distribuido para integraciones**

Muchas integraciones incluidas en `ddtrace` admiten el rastreo distribuido. El rastreo distribuido está habilitado por defecto en el Agent v7 y en la mayoría de las versiones del Agent v6. Si es necesario, puedes habilitar el rastreo distribuido con los parámetros de configuración.

- Si tu aplicación recibe solicitudes de servicios con el rastreo distribuido activado, debes activar el rastreo distribuido en las integraciones que gestiona estas solicitudes (por ejemplo, Rails)
- Si tu aplicación envía solicitudes a servicios con el rastreo distribuido activado, debes activar el rastreo distribuido en las integraciones que envían estas solicitudes (por ejemplo, Faraday)
- Si tu aplicación envía y recibe solicitudes al desplegar el rastreo distribuido, debe activar todas las integraciones que gestionan estas solicitudes.

Para obtener más detalles sobre cómo activar el rastreo distribuido para integraciones, consulta su documentación:

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

**Utilizando el propagador HTTP**

Para facilitar la propagación de estos metadatos, puedes utilizar el módulo `Datadog::Tracing::Propagation::HTTP`.

En el cliente:

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # Inyecta encabezados de trazas en encabezados de solicitudes (`env` debe ser un Hash)
  Datadog::Tracing::Propagation::HTTP.inject!(trace.to_digest, env)
end
```

En el servidor:

```ruby
trace_digest = Datadog::Tracing::Propagation::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # Haz algo de trabajo web...
end
```

### Cola de solicitudes HTTP

Las trazas que se originan en solicitudes HTTP pueden configurarse para incluir el tiempo que pasan en la cola de un servidor web de frontend o de equilibrador de carga antes de que la solicitud llegue a la aplicación de Ruby.

Esta función está deshabilitada por defecto. Para activarla, debes añadir un encabezado `X-Request-Start` o `X-Queue-Start` desde tu servidor web (es decir, Nginx) antes de activar la función de cola de solicitudes. A continuación, se muestra un ejemplo de configuración de Nginx:

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

A continuación, debes habilitar la función de cola de solicitudes. Las siguientes opciones están disponibles para la configuración de `:request_queuing`:

| Opción             | Descripción |
| ------------------ | ----------- |
| `:include_request` | Un tramo `http_server.queue` será el tramo raíz de una traza, incluyendo el tiempo total empleado para procesar la solicitud, *además* del tiempo empleado para esperar a que la solicitud comience a procesarse. Este es el comportamiento cuando la configuración se define como `true`. Esta es la configuración seleccionada cuando se define como `true`. |
| `:exclude_request` | Un tramo `http.proxy.request` será el tramo raíz de una traza, con la duración `http.proxy.queue` del tramo secundario representando sólo el tiempo de espera para que la solicitud comience a procesarse. *Se trata de una función experimental*. |

Para aplicaciones basadas en Rack, consulta la [documentación](#rack) para obtener más detalles.

### Pipelines de procesamiento

Algunas aplicaciones pueden requerir que las trazas se modifiquen o filtren antes de ser enviadas a Datadog. El pipeline de procesamiento permite crear *procesadores* para definir dicho comportamiento.

#### Filtrado

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanFilter` para eliminar tramos, cuando el bloque se evalúa como verdadero:

```ruby
Datadog::Tracing.before_flush(
  # Elimina tramos que coincidan con un recurso en particular
 Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Elimina tramos que son transferidos al host local
 Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Procesamiento

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanProcessor` para modificar tramos:

```ruby
Datadog::Tracing.before_flush(
  # Elimina el texto coincidente del campo de recursos
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Procesador personalizado

Los procesadores pueden ser cualquier objeto que responda a `#call` aceptando `trace` como argumento (que es una `Array` de los `Datadog::Span`).

Por ejemplo, utilizando la sintaxis abreviada de bloque:

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

En ambos casos, el método del procesador *debe* devolver el objeto `trace`; este valor devuelto se pasará al siguiente procesador en el pipeline.

#### Advertencias

1. Si se eliminan tramos, no se generarán métricas de rastreo, lo que afectará a monitores y dashboards.
2. Al eliminar un tramo, también se eliminan todos los tramos secundarios del tramo eliminado. De este modo, se evitan los tramos huérfanos en el gráfico de trazas.
3. Los [logs en modo de depuración](#enabling-debug-mode) informan del estado de tramos *antes* de que se ejecute el pipeline de procesamiento: los tramos modificados o eliminados mostrarán su estado original en logs en modo de depuración.

### Correlación del rastreo

En muchos casos, como el de la generación de logs, puede ser útil correlacionar los ID de rastreo con otros eventos o flujos de datos, para facilitar las referencias cruzadas.

#### Para la gestión de logs en aplicaciones Rails

##### Automática

Para las aplicaciones de Rails que utilizan el gestor de logs por defecto (`ActiveSupport::TaggedLogging`), `lograge` o `semantic_logger`, la inyección de correlación de rastreo está habilitada por defecto.

Puede deshabilitarse configurando la variable de entorno `DD_LOGS_INJECTION=false`.

#### Para la gestión de logs en aplicaciones Ruby 

Para añadir ID de correlación a tu gestor de logs, añade un formateador de logs que recupere los ID de correlación con `Datadog::Tracing.correlation`, y luego añádelos al mensaje.

Para una correcta correlación con la gestión de logs de Datadog, asegúrate de que lo siguiente está presente en el mensaje del log, en el orden en que aparece:

 - `dd.env=<ENV>`: Donde `<ENV>` es igual a `Datadog::Tracing.correlation.env`. Omítelo si no se ha configurado un entorno.
 - `dd.service=<SERVICE>`: Donde `<SERVICE>` es igual a `Datadog::Tracing.correlation.service`. Omítelo si no se ha configurado ningún nombre servicio por defecto.
 - `dd.version=<VERSION>`: Donde `<VERSION>` es igual a `Datadog::Tracing.correlation.version`. Omítelo si no se ha configurado ninguna versión de la aplicación.
 - `dd.trace_id=<TRACE_ID>`: Donde `<TRACE_ID>` es igual a `Datadog::Tracing.correlation.trace_id` o `0` si no hay ninguna traza activa durante la gestión de logs.
 - `dd.span_id=<SPAN_ID>`: Donde `<SPAN_ID>` es igual a `Datadog::Tracing.correlation.span_id` o `0` si no hay ninguna traza activa durante la gestión de logs.

`Datadog::Tracing.log_correlation` devolverá `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

Si una traza no está activa y el entorno y la versión de la aplicación no están configurados, devolverá `dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0`.

Ejemplo práctico:

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# Cuando no hay ninguna traza activa
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] Esta no es una operación rastreada.

# Cuando hay una traza activa
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] Esta es una operación rastreada.
```

### Configuración de la capa de transporte

Por defecto, `ddtrace` se conectará al Agent utilizando los primeros parámetros disponibles en la lista de prioridades:

1. A través de cualquier parámetro de configuración proporcionado explícitamente (nombre de host/puerto/transporte)
2. A través del socket de dominio Unix (UDS) localizado en `/var/run/datadog/apm.socket`
3. A través de HTTP sobre TCP a `127.0.0.1:8126`

Sin embargo, el rastreador puede configurarse para enviar sus datos de rastreo a destinos alternativos, o mediante protocolos alternativos.

#### Cambio del nombre de host y del puerto por defecto del Agent

Para cambiar el host o puerto del Agent, proporciona `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`.

O dentro de un bloque `Datadog.configure`, proporciona los siguientes parámetros:

```ruby
Datadog.configure do |c|
  c.agent.host = '127.0.0.1'
  c.agent.port = 8126
end
```

Para obtener más información, consulta [Configuración adicional](#additional-configuration).

#### Uso del adaptador Net::HTTP

El adaptador `Net` envía trazas utilizando `Net::HTTP` a través de TCP. Es el adaptador de transporte por defecto.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Nombre de host, puerto y opciones adicionales. :el tiempo de inactividad se mide en segundos.
    t.adapter :net_http, '127.0.0.1', 8126, timeout: 30
  }
end
```

#### Uso del adaptador de socket de dominio Unix (UDS)

El adaptador `UnixSocket` envía trazas utilizando `Net::HTTP` a través del socket Unix.

Para utilizarlo, primero configura tu Trace Agent para escuchar por cada socket Unix, luego configura el rastreador con:

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Proporciona una ruta local para el rastreo del socket de dominio Unix
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### Uso del adaptador de test de transporte

El adaptador `Test` es un transporte no operativo que puede opcionalmente almacenar solicitudes en buffer y se utiliza en conjuntos de tests u otros entornos que no sean de producción.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Configura el transporte en modo no perativo. No se conservan trazas.
    t.adapter :test

    # También puedes proporcionar un buffer para examinar la salida de trazas.
    # El buffer debe responder a '<<'.
    t.adapter :test, []
  }
end
```

#### Uso de un adaptador de transporte personalizado

Los adaptadores personalizados se pueden configurar con:

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Inicializa y transfiere una instancia del adaptador
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### Configuración del proveedor de tiempo

Por defecto, el rastreo utiliza un reloj monotónico para medir la duración de tramos y marcas de tiempo (`->{ Time.now }`) para la hora de inicio y fin.

A la hora de hacer tests, puede ser útil un proveedor de tiempo diferente.

Para cambiar la función que proporciona marcas de tiempo, configura lo siguiente:

```ruby
Datadog.configure do |c|
  # Para Timecop, por ejemplo, `->{ Time.now_without_mock_time }` permite al rastreador utilizar el tiempo transcurrido real.
  c.time_now_provider = -> { Time.now_without_mock_time }
end
```

El cálculo de la duración de tramos seguirá utilizando el reloj monotónico del sistema cuando esté disponible, por lo que no se verá afectado por esta configuración.

### Métricas

El rastreador y sus integraciones pueden producir algunas métricas adicionales que pueden proporcionar información útil sobre el rendimiento de tu aplicación. Estas métricas se recopilan con `dogstatsd-ruby` y pueden enviarse al mismo Datadog Agent al que envías tus trazas.

Configuración de tu aplicación para la recopilación de métricas:

1. [Configura tu Datadog Agent para StatsD](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. Añadir `gem 'dogstatsd-ruby', '~> 5.3'` a tu Gemfile

#### Para el tiempo de ejecución de la aplicación

Si se configuran métricas de tiempo de ejecución, la biblioteca de rastreo recopila y envía automáticamente métricas sobre el estado de tu aplicación.

Para configurar métricas de tiempo de ejecución, añade la siguiente configuración:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # Para habilitar la recopilación de métricas de tiempo de ejecución, configura `true`. Por defecto `false`
  # También puedes definir DD_RUNTIME_METRICS_ENABLED=true para esta configuración.
  c.runtime_metrics.enabled = true

  # También puedes configurar la instancia de Statsd utilizada para enviar métricas de tiempo de ejecución.
  # Statsd se configura automáticamente con los parámetros por defecto si `dogstatsd-ruby` está disponible.
  # Puedes configurar con el host y el puerto del Datadog Agent ; por defecto es 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

Para obtener más detalles sobre la configuración de `Datadog::Statsd`, consulta la [documentación deDogStatsD](https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames).

Las estadísticas son específicas de máquinas virtuales e incluyen:

| Nombre                        | Tipo    | Descripción                                                   | Disponible en       |
| --------------------------  | ------- | ------------------------------------------------------------- | ------------------ |
| `runtime.ruby.class_count`  | `gauge` | Número de clases en el espacio de memoria.                            | CRuby              |
| `runtime.ruby.gc.*`         | `gauge` | Estadísticas de recopilación de residuos: recopiladas en `GC.stat`.      | Todos los tiempos de ejecución       |
| `runtime.ruby.yjit.*`       | `gauge` | Estadísticas YJIT recopiladas en `RubyVM::YJIT.runtime_stats`.  | CRuby (si está habilitado) |
| `runtime.ruby.thread_count` | `gauge` | Número de threads.                                            | Todos los tiempos de ejecución       |
| `runtime.ruby.global_constant_state`        | `gauge` | Generación de caché global constante.                                                                     | CRuby 3.1 o posterior                                                                                     |
| `runtime.ruby.global_method_state`          | `gauge` | [Generación de caché global de métodos](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby 2.x](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |
| `runtime.ruby.constant_cache_invalidations` | `gauge` | Invalidaciones de caché constantes.                                                                         | CRuby 3.2 o anterior                                                                                     |
| `runtime.ruby.constant_cache_misses`        | `gauge` | Fallos de caché constantes.                                                                                | CRuby 3.2 o anterior                                                                                     |


Además, todas las métricas incluyen las siguientes etiquetas:

| Nombre         | Descripción                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | Lenguaje de programación rastreado. (por ejemplo, `ruby`)              |
| `service`    | Lista de servicios asociados a esta métrica.      |

### OpenTracing

Para configurar Datadog con OpenTracing, consulta nuestra sección [Configuración de OpenTracing](#configuring-opentracing) para ver más detalles.

**Configuración de los parámetros del rastreador Datadog**

El rastreador subyacente de Datadog puede configurarse pasando opciones (que coinciden con `Datadog::Tracer`) al configurar el rastreador global:

```ruby
# Donde `options` es un Hash de opciones proporcionadas a Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(**options)
```

También puede configurarse utilizando `Datadog.configure`, proceso descrito en la sección [Configuración adicional](#additional-configuration).

**Activación y configuración de integraciones**

Por defecto, la configuración de OpenTracing con Datadog no activa automáticamente ninguna instrumentación adicional proporcionada por Datadog. Solo recibirás tramos y trazas de la instrumentación de OpenTracing que tengas en tu aplicación.

Sin embargo, la instrumentación adicional proporcionada por Datadog se puede activar junto con OpenTracing utilizando `Datadog.configure`, que puede utilizarse para mejorar aún más tu rastreo. Para activarlo, consulta [Instrumentación de integraciones](#integration-instrumentation) para obtener más detalles.

**Formatos de serialización compatibles**

| Tipo                           | ¿Es compatible? | Información adicional |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Sí        |                        |
| `OpenTracing::FORMAT_RACK`     | Sí        | Debido a la pérdida de resolución en el formato Rack, ten en cuenta que las piezas de equipaje con nombres que contengan caracteres en mayúsculas o `-` se pasarán a caracteres en minúsculas `_` en un viaje de ida y vuelta respectivamente. Recomendamos evitar estos caracteres o acomodar en consecuencia en el extremo receptor. |
| `OpenTracing::FORMAT_BINARY`   | No         |                        |

### Generación de perfiles

`ddtrace` puede producir perfiles que midan el uso de recursos de la aplicación a nivel de método en entornos de producción. Estos perfiles pueden dar una idea de los recursos que se gastan en el código Ruby fuera de la instrumentación de rastreo existente.

**Configuración**

Para empezar con la generación de perfiles, sigue la guía [Habilitar el generador de perfiles Ruby](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/).

#### Solucionar problemas

Si tienes problemas con la generación de perfiles, consulta la [guía para solucionar problemas del generador de perfiles](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=Ruby).

#### Perfiles de tareas Resque

Al crear perfiles de tareas [Resque](https://github.com/resque/resque), debes configurar la opción `RUN_AT_EXIT_HOOKS=1` descrita en la documentación de [Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks).

Sin esta marca, los perfiles de tareas de Resque de corta duración no estarán disponibles, ya que Resque elimina los procesos worker antes de que tengan la oportunidad de enviar esta información.

## Problemas conocidos y configuraciones sugeridas

### Carga útil demasiado grande

Por defecto, Datadog limita el tamaño de las cargas útiles de rastreo para evitar sobrecargas de memoria en las aplicaciones instrumentadas. Como resultado, es posible que las trazas que contienen miles de operaciones no se envíen a Datadog.

Si faltan trazas, habilita el [modo de depuración](#debugging-and-diagnostics) para comprobar si se registran mensajes que contienen `"Dropping trace. Payload too large"`.

Dado que el modo de depuración tiene mucha información, **Datadog no recomienda dejar esto habilitado o habilitarlo durante la producción.** Deshabilítalo después de confirmar. Puedes inspeccionar los [logs del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-log-files/) para buscar mensajes similares.

Si has comprobado que se eliminan trazas debido a grandes cargas útiles, habilita el parámetro [partial_flush](#additional-configuration) para dividir trazas en porciones más pequeñas.

### Nivel de stack tecnológico demasiado profundo

El rastreo de Datadog recopila datos de rastreo añadiendo instrumentación en otras bibliotecas comunes (por ejemplo, Rails, Rack, etc.) Algunas bibliotecas proporcionan API para añadir esta instrumentación, pero otras no. Para añadir instrumentación en bibliotecas en las que falta la API de instrumentación, Datadog utiliza una técnica llamada "monkey-patching" para modificar el código de esa biblioteca.

En Ruby versión 1.9.3 y anteriores, la estrategia del "parche de mono" a menudo implicaba el uso de [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method), también conocido como *reescritura de método*, para reemplazar destructivamente métodos de Ruby existentes. Sin embargo, esta práctica crearía frecuentes conflictos y errores si dos bibliotecas intentan "reescribir" el mismo método. (por ejemplo, dos paquetes APM diferentes intentando Instrumentar el mismo método).

En Ruby 2.0, se introdujo la función [`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend). Esta función evita la reescritura destructiva de métodos y permite múltiples "parches de mono" en el mismo método. Por ello se ha convertido en el medio más seguro y preferido para aplicar "parches de mono" al código.

La instrumentación Datadog utiliza casi exclusivamente la función `Module#prepend` para añadir instrumentación de forma no destructiva. Sin embargo, algunas otras bibliotecas (típicamente las que son compatibles con Ruby 2.0 o anterior) todavía utilizan `alias_method`, lo que puede crear conflictos con la instrumentación Datadog, a menudo generando errores `SystemStackError` o `stack level too deep`.

Como la implementación de `alias_method` existe dentro de esas bibliotecas, Datadog generalmente no puede corregirlas. Sin embargo, existen soluciones alternativas conocidas para algunas bibliotecas:

* `rack-mini-profiler`: [Errores de nivel de stack tecnológico Net::HTTP demasiado profundo](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors).

Para bibliotecas sin una solución alternativa conocida, considera eliminar la biblioteca utilizando `alias` o `Module#alias_method`, o separando las bibliotecas en diferentes entornos para realizar tests.

Si tienes alguna pregunta o quieres informar un problema de este tipo, [ponte en contacto con el servicio de asistencia de Datadog](https://docs.datadoghq.com/help).

### Los workers de Resque se cuelgan al salir

La bifurcación predeterminada de Resque de un proceso por cada tarea puede, en raras situaciones, dar lugar a que los procesos de resque se cuelguen al salir cuando se instrumentan con ddtrace.

Como solución, recomendamos configurar la variable de entorno `FORK_PER_JOB` como `false` para deshabilitar este comportamiento.

Para realizar un análisis, consulta [este problema](https://github.com/DataDog/dd-trace-rb/issues/3015).

<!---->

[etiquetas de encabezados]: https://docs.datadoghq.com/tracing/configure_data_security/#collect-headers
[1]: https://docs.datadoghq.com/es/tracing/trace_collection/compatibility/ruby/
[2]: https://docs.datadoghq.com/es/tracing/trace_collection/compatibility/ruby#integrations
[3]: https://docs.datadoghq.com/es/tracing/trace_collection/compatibility/ruby#ci-visibility-integrations