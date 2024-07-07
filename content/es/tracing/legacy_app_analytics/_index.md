---
aliases:
- /es/tracing/visualization/search/
- /es/tracing/trace_search_and_analytics/
- /es/tracing/advanced_usage/
kind: documentación
title: Aplicación Analytics
---

<div class="alert alert-danger">
Esta página describe características obsoletas con información de configuración relevante para aplicaciones Analytics heredadas, útiles para solucionar problemas o para modificar algunas configuraciones antiguas. Para tener un control total sobre tus trazas (traces), utiliza <a href="/tracing/trace_pipeline">controles de consumo y filtros de retención</a>.
</div>

## Migración a nuevas opciones de configuración 

Ve a la [página de control del consumo][1] para ver servicios con configuraciones heredadas. Estas se marcan con el estado `legacy Setup`.

Para migrar a las nuevas opciones de configuración, elimina todas las [opciones de configuración](#app-analytics-setup) de la aplicación Analytics heredadas de los servicios marcados con `legacy Setup`. A continuación, implementa el Datadog Agent y los [mecanismos de muestreo][2] de las bibliotecas de rastreo para enviar trazas.

## Configuración de la aplicación Analytics

Las opciones de configuración de la aplicación Analytics se encuentran en las bibliotecas de rastreo y en el Datadog Agent. En las bibliotecas, los tramos (spans) Analytics de tus servicios se generan [automáticamente](#automatic-configuration) o [manualmente](#custom-instrumentation).

### En bibliotecas de rastreo

#### Configuración automática

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,nginx" >}}
{{< programming-lang lang="java" >}}

La aplicación Analytics está disponible a partir de la versión 0.25.0 del cliente de rastreo Java. Puede habilitarse globalmente para todas las integraciones de **servidores web** con un parámetro de configuración en el cliente de rastreo:

* System Property: `-Ddd.trace.analytics.enabled=true`
* Variable de entorno: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

La aplicación Analytics está disponible a partir de la versión 0.19.0 del cliente de rastreo Python. Habilita globalmente la aplicación Analytics para todas las integraciones de **servidores web** con un parámetro de configuración en el cliente de rastreo:

* Configuración del rastreador: `ddtrace.config.analytics_enabled = True`
* Variable de entorno: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

La aplicación Analytics está disponible a partir de la versión 0.19.0 del cliente de rastreo Ruby y puede habilitarse para todas las integraciones **web** con una marca global:

Para ello, define `DD_TRACE_ANALYTICS_ENABLED=true` en tu entorno o configura:

```ruby
Datadog.configure { |c| c.tracing.analytics.enabled = true }
```

* `true` permite el análisis de todos los marcos de trabajo web.
* `false` o `nil` deshabilita Analytics, excepto para las integraciones que lo habilitan explícitamente. (Por defecto)

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

La aplicación Analytics está disponible a partir de la versión 1.11.0 del cliente de rastreo Go y puede habilitarse globalmente para todas las integraciones **web** utilizando:

* la opción de inicio del rastreador [`WithAnalytics`][1], por ejemplo:

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* a partir de la versión 1.26.0, utilizando la variable de entorno: `DD_TRACE_ANALYTICS_ENABLED=true`

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

La aplicación Analytics está disponible a partir de la versión 0.10.0 del cliente de rastreo Node.js y puede habilitarse globalmente para todas las integraciones web con un parámetro de configuración en el cliente de rastreo:

```javascript
tracer.init({
  analytics: true
})
```

También puedes utilizar el siguiente parámetro de configuración:

* Variable de entorno: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La aplicación Analytics está disponible a partir de la versión 1.1.0 del cliente de rastreo .NET y puede habilitarse globalmente para todas las integraciones **web** con un parámetro de configuración en el cliente de rastreo:

* Variable de entorno o parámetro de aplicación: `DD_TRACE_ANALYTICS_ENABLED=true`

Este ajuste también se puede configurar en código:

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

La aplicación Analytics está disponible a partir de la versión 0.17.0 del cliente de rastreo PHP y puede habilitarse globalmente para todas las integraciones **web** con un parámetro de configuración en el cliente de rastreo:

* Variable de entorno: `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

La aplicación Analytics está disponible a partir de la versión 1.0.0 del cliente de rastreo C++ y puede habilitarse globalmente para todos los tramos de entradas de servicio, configurando la variable de entorno: `DD_TRACE_ANALYTICS_ENABLED` como `true`. **Nota**: Esta configuración también puede definirse directamente en el código:

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<SERVICE_NAME>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{< /programming-lang >}}
{{< programming-lang lang="nginx" >}}

Para habilitar la aplicación Analytics para Nginx:

1. Configura la variable entorno `DD_TRACE_ANALYTICS_ENABLED` como `true`.

2. Añade `env DD_TRACE_ANALYTICS_ENABLED;` al principio de tu archivo `nginx.conf`.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Configuración de servicios adicionales (opcional)

##### Configurar por integración

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales mediante la siguiente configuración:

* System Property: `-Ddd.<integration>.analytics.enabled=true`
* Variable de entorno: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Utilízala junto con la configuración global de cualquier integración que envíe servicios personalizados. Por ejemplo, para los tramos JMS que vienen en servicios personalizados, puedes configurar lo siguiente para habilitar la totalidad del rastreo JMS en la aplicación Analytics:

* System Property: `-Ddd.jms.analytics.enabled=true`
* Variable de entorno: `DD_JMS_ANALYTICS_ENABLED=true`

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1].

[1]: /es/tracing/compatibility_requirements/java/#compatibility
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales mediante la siguiente configuración:

* Configuración del rastreador: `ddtrace.config.<INTEGRATION>.analytics_enabled = True`
* Variable de entorno: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Utilízala junto con la configuración global de cualquier integración que envíe servicios personalizados. Por ejemplo, para los tramos Boto que vienen en servicios personalizados, puedes configurar lo siguiente para habilitar la totalidad del rastreo Boto en la aplicación Analytics:

* Configuración del rastreador: `ddtrace.config.boto.analytics_enabled = True`
* Variable de entorno: `DD_BOTO_ANALYTICS_ENABLED=true`

**Nota**: Varias integraciones requieren una configuración no estándar debido a la implementación específica de la integración del rastreador. Para ver más detalles, consulta la documentación de biblioteca en [Aplicación Analytics][1].

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Es posible habilitar la aplicación Analytics para integraciones.

Para ello, define `DD_<INTEGRATION>_ANALYTICS_ENABLED=true` en tu entorno o configura:

```ruby
Datadog.configure { |c| c.tracing.instrument :integration, analytics_enabled: true }
```

Donde `integration` es el nombre de la integración. Consulta la [lista de integraciones disponibles][1].

* `true` habilita Analytics para este integración, independientemente de la configuración global.
* `false` deshabilita Analytics para este integración, independientemente de la configuración global.
* `nil` remite a la configuración global de Analytics.

[1]: /es/tracing/setup/ruby/#library-compatibility
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics individualmente para cada integración. Como ejemplo, para configurar el paquete estándar `net/http` de la biblioteca, podrías:

```go
package main

import (
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    mux := httptrace.NewServeMux(httptrace.WithAnalytics(true))
    // ...
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales.

Por ejemplo, para habilitar la aplicación Analytics para `express`:

```js
tracer.use('express', {
  analytics: true
})
```

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1].

[1]: /es/tracing/setup/nodejs/#integrations
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales.

* Variable de entorno o parámetro de aplicación: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["<INTEGRATION>"].AnalyticsEnabled = true;
```

Por ejemplo, para habilitar la aplicación Analytics para ASP.NET MVC:

* Variable de entorno o parámetro de aplicación: `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

Or in code:

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1]. **Nota:** En Linux, los nombres de las variables de entorno distinguen entre mayúsculas y minúsculas.

[1]: /es/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Además de la configuración global, puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales mediante la siguiente configuración:

* Variable de entorno: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Utilízala junto con la configuración global de cualquier integración que envíe servicios personalizados. Por ejemplo, para los tramos Symfony que vienen en servicios personalizados, puedes configurar lo siguiente para habilitar la totalidad del rastreo Symfony en la aplicación Analytics:

* Variable de entorno: `DD_SYMFONY_ANALYTICS_ENABLED=true`

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1].

[1]: /es/tracing/setup/php/#integration-names
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Servicios de bases de datos

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}


Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo:

* System Property: `-Ddd.jdbc.analytics.enabled=true`
* Variable de entorno: `DD_JDBC_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo:

* Configuración del rastreador: `ddtrace.config.psycopg.analytics_enabled = True`
* Variable de entorno: `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo:

```ruby
Datadog.configure { |c| c.tracing.instrument :mongo, analytics_enabled: true }
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo:

```go
// Registrar el controlador de bases de datos con Analytics habilitado.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo:

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos, así que debes habilitar la recopilación manualmente para cada integración. Por ejemplo, para habilitar la aplicación Analytics para ADO.NET:

* Variable de entorno o parámetro de aplicación: `DD_AdoNet_ANALYTICS_ENABLED=true`

O el código:

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1]. **Nota:** En Linux, los nombres de las variables de entorno distinguen entre mayúsculas y minúsculas.

[1]: /es/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Por defecto, la aplicación Analytics no registra el rastreo de bases de datos. Puedes habilitar o deshabilitar la aplicación Analytics para integraciones individuales utilizando la siguiente configuración:

* Variable de entorno: `DD_<INTEGRATION>_ANALYTICS_ENABLED=true`

Utilízala junto con la configuración global de cualquier integración que envíe servicios personalizados. Por ejemplo, para:

* Variable de entorno: `DD_MYSQLI_ANALYTICS_ENABLED=true`

Puedes encontrar los nombres de las integraciones en la [tabla de integraciones][1].

[1]: /es/tracing/setup/php/#integrations
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

##### Instrumentación personalizada

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta (tag) `ANALYTICS_SAMPLE_RATE` en un tramo:

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class MyClass {
  @Trace
  void myMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // Span provided by @Trace annotation.
    if (span != null) {
      span.setTag(DDTags.SERVICE, "<SERVICE_NAME>");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```
**Nota:** La aplicación Analytics para tramos con [métodos de rastreo dd][1] o [anotaciones de rastreo][2] puede habilitarse configurando `-Ddd.trace-annotation.analytics.enabled=true`.


[1]: https://docs.datadoghq.com/es/tracing/custom_instrumentation/java/#dd-trace-methods
[2]: https://docs.datadoghq.com/es/tracing/custom_instrumentation/java/#trace-annotations
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` en un tramo:

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `Analytics::TAG_ENABLED` en un tramo:

```ruby
Datadog::Tracing.trace('my.task') do |span|
  # Establecer la frecuencia de muestreo de Analytics en 1.0
  span.set_tag(Datadog::Tracing::Metadata::Ext::Analytics::TAG_ENABLED, true)
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

En el caso de la instrumentación personalizada, se ha añadido una etiqueta especial para habilitar la aplicación Analytics en un tramo, como puede verse a continuación:

```go
span.SetTag(ext.AnalyticsEvent, true)
```

Esto marca el tramo como un evento de aplicación Analytics.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `ANALYTICS` en un tramo:

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `Tags.Analytics` en un tramo:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // enable Analytics on this span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `ANALYTICS_KEY` en un tramo:

```php
<?php
  // ... tu tramo existente que quieres habilitar para la aplicación Analytics
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Las aplicaciones con instrumentación personalizada pueden habilitar la aplicación Analytics configurando la etiqueta `analytics_event` en un tramo:

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Un valor booleano verdadero habilita la aplicación Analytics para el tramo,
// con una frecuencia de muestreo de 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// Un doble valor entre 0.0 y 1.0 habilita la aplicación Analytics
// y configura la frecuencia de muestreo con el valor proporcionado.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### En el Datadog Agent

<div class="alert alert-danger">
En esta sección se describen las funciones obsoletas con información de configuración relevante para aplicaciones Analytics heredadas.
</div>

Para definir la frecuencia de tramos a analizar por servicio, configura lo siguiente en el archivo `datadog.yaml`:
```
apm_config:
  analyzed_rate_by_service:
    service_A: 1
    service_B: 0.2
    service_C: 0.05
```

Para definir la frecuencia de tramos a analizar por servicio y nombre de operación, configura lo siguiente en el archivo `datadog.yaml`: 

```
apm_config:
  analyzed_spans:
    service_A|operation_name_X: 1
    service_A|operation_name_Y: 0.25
    service_B|operation_name_Z: 0.01
```

## Resolución de problemas: Límite máximo de eventos por segundo

Si encuentras el siguiente mensaje de error en tus logs del Agent, significa que tus aplicaciones están emitiendo más de los 200 eventos de rastreo por segundo permitidos por APM.

```
Límite máximo de eventos por segundo alcanzado (actual=300,00/s, máx=200,00/s). Algunos eventos se están descartando (frecuencia de muestreo=0,54). Considere la posibilidad de ajustar las frecuencias de muestreo de eventos.

```

Para aumentar el límite de frecuencia de APM para el Agent, configura el atributo `max_events_per_second` en el archivo de configuración del Agent (debajo de la sección `apm_config:` ). Para despliegues contenedorizados (por ejemplo, Docker o Kubernetes), utiliza la variable de entorno `DD_APM_MAX_EPS`.

**Nota**: Aumentar el límite de la frecuencia de APM podría suponer un aumento de los costes de la aplicación Analytics.


[1]: /es/tracing/trace_pipeline/ingestion_controls/
[2]: /es/tracing/trace_pipeline/ingestion_mechanisms/