---
aliases:
- /es/tracing/opentracing/ruby
- /es/tracing/manual_instrumentation/ruby
- /es/tracing/custom_instrumentation/ruby
- /es/tracing/setup_overview/custom_instrumentation/ruby
- /es/tracing/trace_collection/custom_instrumentation/ruby
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta manualmente tus aplicaciones Ruby para enviar trazas (traces)
  personalizadas a Datadog.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Instrumentación personalizada de Ruby utilizando la API de Datadog
type: multi-code-lang
---
<div class="alert alert-info">
Si aún no has leído las instrucciones de autoinstrumentación y configuración, lee las <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Instrucciones de configuración de Ruby</a>.
</div>

En esta página, se describen casos de uso para añadir y personalizar la observabilidad con Datadog APM.

## Requisitos

Asegúrate de que necesitas el gem adecuado para tu [versión del rastreador de Ruby][8]:

- Para la versión 2.x, se requiere el gem `datadog`:
  ```ruby
  require 'datadog'
  ```

- Para v1.x, se requiere el gem `ddtrace`:
  ```ruby
  require 'ddtrace'
  ```

## Añadir etiquetas

Añade [etiquetas (tags) de tramo (span)][1] personalizadas a tus [tramos][2] para personalizar tu capacidad de observación dentro de Datadog. Las span tags se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información a nivel de código, como el nivel de comerciante, el importe del pago o el ID de usuario.

### Añadir span tags personalizadas

Añade etiquetas personalizadas a tus tramos correspondientes a cualquier valor dinámico dentro de tu código de aplicación como `customer.id`.

#### Tramos activos

Accede al [tramo][1] activo actual desde cualquier método de tu código.

**Nota**: Si se llama al método y no hay ningún tramo activo, `active_span` es `nil`.

```ruby
# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Obtener el tramo activo y establece customer_id -> 254889
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

#### Instrumentación manual de tramos

Añade [etiquetas][1] directamente a los objetos `Datadog::Span` llamando a `#set_tag`:

```ruby
# Un ejemplo de un endpoint de Sinatra,
# con el rastreo de Datadog de la solicitud.
get '/posts' do
  Datadog::Tracing.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```

[1]: /es/tracing/glossary/#span-tags


### Añadir etiquetas globalmente a todos los tramos

Añade [etiquetas][1] a todos los [tramos][2] configurando el rastreador con la opción `tags`:

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

También puedes utilizar la variable de entorno `DD_TAGS` para establecer etiquetas en todos los tramos de una aplicación. Para más información sobre las variables de entorno de Ruby, lee la [documentación de configuración][3].

### Configuración de errores en un tramo

Hay dos formas de establecer un error en tramo:

- Llama a `span.set_error` e introduce el objeto de excepción. Esto extrae automáticamente el tipo de error, el mensaje y el rastreo.

```ruby
require 'timeout'

def example_method
  span = Datadog::Tracing.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
rescue StandardError => error
  Datadog::Tracing.active_span&.set_error(error)
  raise
ensure
  span.finish
end

example_method()
```

- O utiliza `tracer.trace`, que por defecto establece el tipo de error, el mensaje y el rastreo. Para configurar este comportamiento, puedes utilizar la opción `on_error`, que es el manejador invocado cuando se proporciona un bloque a `trace` y el bloque genera un error. Proc se proporciona con `span` y `error` como argumentos. Por defecto, `on_error` establece un error en el tramo.

Comportamiento por defecto para `on_error`:

```ruby
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
end

Datadog::Tracing.trace('example.trace') do |span|
  example_method()
end
```

Comportamiento personalizado para `on_error`:

```ruby
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog::Tracing.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

## Añadir tramos

Si no estás usando una instrumentación de librería compatible (ver [compatibilidad de librería][4]), puedes instrumentar manualmente tu código. Añade rastreo a tu código utilizando el método `Datadog::Tracing.trace`, que puedes envolver alrededor de cualquier código Ruby.

Para rastrear cualquier código Ruby, puedes utilizar el método `Datadog::Tracing.trace`:

```ruby
Datadog::Tracing.trace(name, resource: resource, **options) do |span|
  # Envuelve este bloque alrededor del código que deseas instrumentar
  # Además, puedes modificar el tramo aquí.
  # Por ejemplo, cambia el nombre de recurso o establece etiquetas
end
```

Donde `name` es una `String` que describe el tipo genérico de operación que se está realizando (por ejemplo `'web.request'`, o `'request.parse'`).

`resource` es una `String` con el nombre de la acción que se está operando. Las trazas con el mismo valor de recurso se agruparán para las métricas. Los recursos suelen ser específicos de un dominio, como una URL, una consulta, una solicitud, etc. (por ejemplo, "Article#submit", http://example.com/articles/list).

Para conocer todas las opciones disponibles en `**options`, consulta la [guía de referencia][5].

### Creación manual de un nuevo tramo

Puedes crear tramos en cualquier bloque de código mediante programación. Los tramos creados de esta manera se integran automáticamente con otros mecanismos de rastreo. En otras palabras, si una traza ya se ha iniciado, el tramo manual tendrá a su llamador como tramo principal. Del mismo modo, cualquier método rastreado llamado desde el bloque de código envuelto tendrá al tramo manual como tramo principal.

```ruby
# Un ejemplo de endpoint de Sinatra,
# con el rastreo de Datadog de la solicitud,
# consulta de base de datos y pasos de renderizado.
get '/posts' do
  Datadog::Tracing.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # Rastrear llamadas a activerecord
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Añade algunas etiquetas de APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Rastrear el renderizado de plantilla
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Posprocesamiento de trazas

Algunas aplicaciones pueden requerir que se alteren o filtren trazas antes de ser enviadas a Datadog. El pipeline de procesamiento permite crear *procesadores* para definir dicho comportamiento.

#### Filtrado

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanFilter` para eliminar tramos, cuando el bloque se evalúa como verdadero:

```ruby
Datadog::Tracing.before_flush(
  # Eliminar tramos que coinciden con un recurso específico
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Eliminar tramos que se envían en el tráfico al host local
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Procesamiento

Puedes utilizar el procesador `Datadog::Tracing::Pipeline::SpanProcessor` para modificar tramos:

```ruby
Datadog::Tracing.before_flush(
  # Eliminar el texto coincidente desde el campo de recurso
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Procesador personalizado

Los procesadores pueden ser cualquier objeto que responda a `#call` aceptando `trace` como argumento (que es una `Array` de `Datadog::Span`).

Por ejemplo, utilizando la sintaxis abreviada de bloque:

```ruby
Datadog::Tracing.before_flush do |trace|
   # Lógica de procesamiento...
   trace
end
```

El siguiente ejemplo implementa un procesador para lograr una lógica compleja de posprocesamiento:

```ruby
Datadog::Tracing.before_flush do |trace|
  trace.spans.each do |span|
    originalPrice = span.get_tag('order.price'))
    discount = span.get_tag('order.discount'))

    # Establece una etiqueta desde un cálculo de otras etiquetas
    if (originalPrice != nil && discount != nil)
      span.set_tag('order.value', originalPrice - discount)
    end
  end
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

En ambos casos, el método del procesador *debe* devolver el objeto `trace`; este valor devuelto se transferirá al siguiente procesador del pipeline.


## Rastrear la configuración del cliente y el Agent

Existen configuraciones adicionales posibles tanto para el cliente de rastreo como para el Datadog Agent para la propagación del contexto con encabezados B3, así como para excluir recursos específicos del envío de trazas a Datadog en el caso que no desees que estas trazas cuenten en métricas calculadas, como checks de estado.

### Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][6] para obtener información.


### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/setup/ruby/#environment-and-tags
[4]: /es/tracing/compatibility_requirements/ruby/
[5]: /es/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: /es/tracing/trace_collection/trace_context_propagation/ruby/
[7]: /es/tracing/security
[8]: https://github.com/DataDog/dd-trace-rb/releases
