---
title: Instrumentación de las Cloud Run Functions de primera generación
---

## Información general

Esta page (página) explica cómo recopilar trazas, métricas de traces (trazas), métricas de tiempo de ejecución y métricas personalizadas de tus funciones de Cloud Run (primera generación), anteriormente denominadas Cloud Functions.

<div class="alert alert-danger">
<strong>Migración a funciones de Cloud Run de la segunda generación</strong> 
<br/>
Datadog recomienda utilizar las <a href="/serverless/google_cloud_run/functions">funciones de Cloud Run</a>de segunda generación, que ofrecen un rendimiento mejorado, un mejor escalado y una mejor monitorización con Datadog.
<br/><br/>
Google ha integrado funcones de Cloud Run en la interfaz de usuario de Cloud Run. A partir de agosto de 2025, solo será posible crear funciones de la primera generación con Google Cloud CLI, la API o Terraform. Datadog recomienda actualizar tu función de Cloud Run para obtener más características y compatibilidad con Datadog.
</div>

<div class="alert alert-info">
<strong>¿Has configurado tu <a href="/integrations/google-cloud-platform/">integración de Google Cloud</a>?</strong> Datadog recomienda configurar la integración, que recopila métricas y logs de servicios de Google Cloud, antes de proceder a la instrumentación. Recuerda añadir el rol de <code>visualizador de activos de la nube</code> a tu cuenta de servicios y habilitar la API del inventario de activos de la nube en Google Cloud.
</div>


## Configuración

1. Configura la [integración de Google Cloud][6].
1. Habilita la recopilación de logs con el [Método Dataflow][14] para recopilar tus logs de Cloud Function.
1. Configura el rastreo, las métricas de tiempo de ejecución y las métricas personalizadas para el tiempo de ejecución de tu función.

{{< programming-lang-wrapper langs="nodejs,python,java,go" >}}
{{< programming-lang lang="nodejs" >}}
1. **Instalar dependencias**. Ejecuta los siguientes comandos:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recomienda anclar las versiones de paquete y actualizar periódicamente a las últimas versiones de `@datadog/serverless-compat` y de `dd-trace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

   Para obtener más información, consulta [Rastreo de aplicaciones Node.js][1].


2. **Inicia la capa de compatibilidad serverless de Datadog e inicializa el rastreador de Node.js**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal (por ejemplo, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module.
   const tracer = require('dd-trace').init()
   ```

3. (Opcional) **Habilita las métricas del tiempo de ejecución**. Consulta [Métricas del tiempo de ejecución de Node.js][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Envío de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
[2]: /es/tracing/metrics/runtime_metrics/?tab=nodejs
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Instalar dependencias**. Ejecuta los siguientes comandos:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recomienda utilizar las últimas versiones de `datadog-serverless-compat` y de `ddtrace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

   Para obtener más información, consulta [Rastreo de aplicaciones de Python][1].


2. **Inicializa el rastreador de Datadog Python y la capa de compatibilidad serverless**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal:

   ```python
   from datadog_serverless_compat import start
   from ddtrace import tracer, patch_all

   start()
   patch_all()
   ```

3. (Opcional) **Habilita las métricas en tiempo de ejecución**. Consulta [Métricas en tiempo de ejecución de Python][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Envío de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /es/tracing/metrics/runtime_metrics/?tab=python
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Instala dependencias**. Descarga el rastreador de Java Datadog y la capa de compatibilidad serverless:


   Descarga `dd-java-agent.jar` y `dd-serverless-compat-java-agent.jar` que contienen los últimos archivos de clase del rastreador, a una carpeta que sea accesible por tu usuario de Datadog:
   ```shell
   wget -O /path/to/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O /path/to/dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Para conocer formas alternativas de descargar el agente, consulta la [documentación del Datadog Java Agent][4].

   Datadog recomienda utilizar las últimas versiones tanto de `datadog-serverless-compat` como de `dd-java-agent` para asegurarte de tener acceso a las mejoras y correcciones de errores.


2. **Inicializa el rastreador de Java Datadog y la capa de compatibilidad serverless**. Añade `JAVA_TOOL_OPTIONS` a tu variable de entorno en tiempo de ejecución:

   Implementa e [instrumenta en forma automática][1] el rastreador de Java configurando la variable de entorno del tiempo de ejecución para instrumentar tu función de la nube de Java con el rastreador de Datadog Java y la capa de compatibilidad serverless.

   | Nombre      | Valor |
   |-----------| ----- |
   | `JAVA_TOOL_OPTIONS` | `-javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar ` |

3. (Opcional) **Habilita métricas de tiempo de ejecución**. Consulta [Métricas en tiempo de ejecución de Java][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Envío de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[2]: /es/tracing/metrics/runtime_metrics/?tab=java
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java
[4]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=springboot

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   go get github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
   ```

   Datadog recomienda anclar las versiones de los paquetes y actualizar periódicamente a las últimas versiones de `datadog-serverless-compat-go/datadogserverlesscompat` y `dd-trace (traza)-go.v1/ddtrace/trace (traza)` para asegurarte de tener acceso a las mejoras y correcciones de errores.

   Para obtener más información, consulta [Rastreo de aplicaciones de Go][1] y [Capa de compatibilidad serverless de Datadog para Go](https://pkg.go.dev/github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat).


2. **Inicia la capa de compatibilidad serverless de Datadog e inicializa el rastreador de Go**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal (por ejemplo, `main.go`):

   ```go
      import (
          "github.com/DataDog/datadog-go/statsd"
          "github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat"
          "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      )

      func init() {
         datadogserverlesscompat.Start()
         tracer.Start(tracer.WithAgentAddr("127.0.0.1:8126"))
         dogstatsdClient, _ = statsd.New("127.0.0.1:8125")
         functions.HTTP("helloHTTP", helloHTTP)
      }

   ```

3. (Opcional) **Habilita métricas en tiempo de ejecución**. Consulta [Métricas en tiempo de ejecución de Go][2].

4. (Opcional) **Habilita métricas personalizadas**. Consulta [Envío de métricas: DogStatsD][3].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /es/tracing/metrics/runtime_metrics/?tab=go
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Despliega tu función**. Utiliza `gcloud` o Google Console para desplegar tu función de Cloud Run de primera generación:

   Sigue las instrucciones de la [Despliega una función de Cloud Run (primera generación)][10] para utilizar `gcloud function deploy <FUNCTION_NAME> --no-gen2` para desplegar una función de Cloud Run de primera generación.

   Utiliza la marca de `--source` para apuntar al directorio de tu código de la función con `dd-java-agent.jar` y `dd-serverless-compat-java-agent.jar` en el nivel superior.

   Para obtener más información, consulta la documentación [despliegue de funciones de gcloud][11] de Google Cloud para obtener más marcas para el comando de gcloud.

6. **Configura la entrada de Datadog**. Añade las siguientes variables de entorno a la configuración de la aplicación de tus funciones:

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_API_KEY` | Tu [clave de API de Datadog][1]. |
   | `DD_SITE` | Tu [sitio Datadog][2]. Por ejemplo, {{< region-param key=dd_site code="true" >}}. |

7. **Configura el etiquetado de servicios unificados**. Puedes recopilar métricas de tu Cloud Run Function instalando la [integración de Google Cloud][6]. Para correlacionar estas métricas con tus traces (trazas), primero configura las tags (etiquetas) `env`, `service` y `version` en tu recurso en Google Cloud. A continuación, configura las siguientes variables de entorno. Puedes añadir tags (etiquetas) personalizadas como `DD_TAGS`.

   | Nombre         | Valor                                                                                                |
   |--------------|------------------------------------------------------------------------------------------------------|
   | `DD_ENV` | Cómo deseas etiquetar tu variable de entorno para [Etiquetado de servicios unificados][9]. Por ejemplo, `prod`.                  |
   | `DD_SERVICE` | Cómo deseas etiquetar tu servicio para [Etiquetado de servicios unificados][9].                                   |
   | `DD_VERSION` | Cómo deseas etiquetar tu versión para [Etiquetado de Servicios Unificados][9].                                   |
   | `DD_TAGS` | Tus tags (etiquetas) personalizadas separadas por comas. Por ejemplo, `key1:value1,key2:value2`.                            |
   | `DD_SITE` | [Sitio de Datadog][13] - Configura esta tag (etiqueta) si estás en un sitio diferente.  El valor **Predeterminado** es US1 `datadoghq.com` |

8. **Añade etiqueta de servicio en el panel de información**. Etiqueta tu entidad GCP con la etiqueta `service` para correlacionar tus trazas con tu servicio:

   Añade el mismo valor de `DD_SERVICE` a una etiqueta `service` en tu función de nube, dentro del panel de información de tu función.
   | Nombre      | Valor                                                       |
   |-----------|-------------------------------------------------------------|
   | `service` | El nombre de tu servicio que coincida con la variable de entorno `DD_SERVICE`. |

   Para obtener más información sobre cómo añadir etiquetas, consulta la documentación [Configura etiquetas para servicios][12] de Google Cloud.

## Ejemplos de funciones
Los siguientes ejemplos contienen una función de ejemplo con el rastreo y las métricas configuradas.

{{< programming-lang-wrapper langs="nodejs,python,java,go" >}}
{{< programming-lang lang="nodejs" >}}
```js
// Example of a simple Cloud Run Function with traces and custom metrics
// dd-trace must come before any other import.
const tracer = require('dd-trace').init()

require('@datadog/serverless-compat').start();

const functions = require('@google-cloud/functions-framework');

function handler(req, res) {
   tracer.dogstatsd.increment('dd.function.sent', 1, {'runtime':'nodejs'});
   return res.send('Welcome to Datadog💜!');
}
const handlerWithTrace = tracer.wrap('example-span', handler)

functions.http('httpexample',  handlerWithTrace)

module.exports = handlerWithTrace
```
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
```python
# Example of a simple Cloud Run Function with traces and custom metrics
import functions_framework
import ddtrace
from datadog import initialize, statsd

ddtrace.patch(logging=True)
initialize(**{'statsd_port': 8125})

@ddtrace.tracer.wrap()
@functions_framework.http
def dd_log_forwader(request):
   with ddtrace.tracer.trace('sending_trace') as span:
      span.set_tag('test', 'ninja')
      statsd.increment('dd.function.sent', tags=["runtime:python"])
   return "Welcome To Datadog! 💜"
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```java
// Example of a simple Cloud Run Function with traces and custom metrics
package com.example;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import java.io.BufferedWriter;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Example implements HttpFunction {
  @Override
  public void service(HttpRequest request, HttpResponse response) throws Exception {
    StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .hostname("localhost")
            .port(8125)
            .build();
    BufferedWriter writer = response.getWriter();
    Statsd.incrementCounter("dd.function.sent", new String[]{"runtime:java"});
    writer.write("Welcome to Datadog!");
  }
}
```

También puedes instalar el rastreador utilizando la siguiente dependencia de Maven:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cloudfunctions</groupId>
    <artifactId>http-function</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.google.cloud.functions</groupId>
            <artifactId>functions-framework-api</artifactId>
            <version>1.0.1</version>
        </dependency>
        <dependency>
            <groupId>com.datadoghq</groupId>
            <artifactId>java-dogstatsd-client</artifactId>
            <version>4.4.3</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <excludes>
                        <exclude>.google/</exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-antrun-plugin</artifactId>
                <version>1.8</version>
                <executions>
                    <execution>
                        <phase>initialize</phase>
                        <configuration>
                            <tasks>
                                <get src="https://dtdg.co/latest-serverless-compat-java-agent" dest="dd-serverless-compat-java-agent.jar" />
                                <get src="https://dtdg.co/latest-java-tracer" dest="dd-java-agent.jar" />
                            </tasks>
                        </configuration>
                        <goals>
                            <goal>run</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>
</project>
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
```go
# Example of a simple Cloud Run Function with traces and custom metrics
package cloud_function

import (
    "fmt"
    "log"
    "net/http"

    "github.com/DataDog/datadog-go/statsd"
    "github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat"
    _ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
    "github.com/GoogleCloudPlatform/functions-framework-go/functions"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

var dogstatsdClient *statsd.Client

func init() {
    err := datadogserverlesscompat.Start()
    log.Println("Starting datadog serverless compat: ", err)
    tracer.Start(tracer.WithAgentAddr("127.0.0.1:8126"))
    dogstatsdClient, _ = statsd.New("127.0.0.1:8125")
    functions.HTTP("helloHTTP", helloHTTP)
}

// helloHTTP is an HTTP Cloud Function with a request parameter.
func helloHTTP(w http.ResponseWriter, r *http.Request) {
    span := tracer.StartSpan("TEST-SPAN")
    defer span.Finish()

    err := dogstatsdClient.Incr("nina.test.counter", []string{"runtime:go"}, 1)
    if err != nil {
        log.Println("Error incrementing dogstatsd counter: ", err)
    }
    fmt.Fprint(w, "Hello Datadog!")
}
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## ¿Qué toca hacer ahora?

- Puedes ver tus traces (trazas) de Cloud Run Functions en [Trace Explorer ][4]. Busca el nombre del servicio que configuraste en la variable de entorno `DD_SERVICE` para ver tus traces (trazas).
- Puedes utilizar la page (página) [Serverless > Cloud Run Functions][5] para ver tus traces (trazas) enriquecidas con telemetría recopilada por la [integración de Google Cloud][6].

## Solucionar problemas

### Activa logs de depuración

Puedes recopilar [logs de depuración][7] para solucionar problemas. Para configurar logs de depuración, utiliza las siguientes variables de entorno:

`DD_TRACE_DEBUG`
: Activa (`true`) o desactiva (`false`) el registro de depuración para la biblioteca de Datadog Tracing. El valor predeterminado es `false`.

  **Valores**: `true`, `false`

`DD_LOG_LEVEL`
: Configura el nivel de registro para la capa de compatibilidad serverless de Datadog. El valor predeterminado es `info`.

  **Valores**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`


[1]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /es/getting_started/site
[3]: /es/tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/functions?cloud=gcp&entity_view=cloud_functions
[6]: /es/integrations/google_cloud_platform/
[7]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[8]: /es/serverless/google_cloud/google_cloud_run_functions
[9]: /es/getting_started/tagging/unified_service_tagging/
[10]: https://cloud.google.com/functions/1stgendocs/deploy
[11]: https://cloud.google.com/sdk/gcloud/reference/functions/deploy
[12]: https://cloud.google.com/run/docs/configuring/services/labels
[13]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[14]: /es/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#log-collection