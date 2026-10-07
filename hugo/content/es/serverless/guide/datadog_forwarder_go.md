---
title: Instrumentación de aplicaciones serverless de Go mediante el Datadog Forwarder
---
## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/go">instrucciones para instrumentar tus funciones de Lambda mediante la Datadog Lambda Extension</a>. Si configuraste Datadog Serverless con el Datadog Forwarder antes que la funcionalidad de Lambda lista para usar, utiliza esta guía para mantener tu instancia.
</div>

## Configuración necesaria

Si todavía no lo hiciste:

- Instala la [integración de AWS][1]. De esta forma, Datadog podrá ingerir las métricas de Lambda desde AWS.
- Instala la [función de Lambda del Datadog Forwarder][2], necesaria para ingerir las trazas (traces), las métricas mejoradas, las métricas personalizadas y los logs de AWS Lambda.

Una vez que tengas instalada la [integración de AWS][1] y el [Datadog Forwarder][2], sigue estos pasos para instrumentar tu aplicación de modo que envíe métricas, logs y trazas a Datadog.

## Configuración

### Instalar

Ejecuta el siguiente comando para instalar la [biblioteca Lambda de Datadog][3] de forma local:

```
go get github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2
```

### Instrumentar

Sigue estos pasos para instrumentar la función:

1. Define la variable de entorno `DD_FLUSH_TO_LOG` y `DD_TRACE_ENABLED` como `true`.
2. Importa los paquetes necesarios en el archivo mediante la declaración del controlador de tu función de Lambda.

    ```go
    package main

    import (
      "github.com/aws/aws-lambda-go/lambda"
      ddlambda "github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2"
      "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
      httptrace "github.com/DataDog/dd-trace-go/contrib/net/http/v2"
    )
    ```
3. Envuelve el controlador de tu función de Lambda con la envoltura de la librería Lambda de Datadog.

    ```go
    func main() {
      // Wrap your lambda handler like this
      lambda.Start(ddlambda.WrapHandler(myHandler, nil))
      /* OR with manual configuration options
      lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
        BatchInterval: time.Second * 15
        APIKey: "my-api-key",
      }))
      */
    }
    ```
4. Utiliza las bibliotecas incluidas para crear tramos (spans) adicionales, conectar logs y trazas y trasladar el contexto de rastreo a otros servicios.
    ```go
    func myHandler(ctx context.Context, event MyEvent) (string, error) {
      // Trace an HTTP request
      req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
      client := http.Client{}
      client = httptrace.WrapClient(&client)
      client.Do(req)

      // Connect your Lambda logs and traces
      currentSpan, _ := tracer.SpanFromContext(ctx)
      log.Printf("my log message %v", currentSpan)

      // Create a custom span
      s, _ := tracer.StartSpanFromContext(ctx, "child.span")
      time.Sleep(100 * time.Millisecond)
      s.Finish()
    }
    ```

### Subscribir

Suscribe la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas y logs a Datadog.

1. [Instala el Datadog Forwarder si todavía no lo hiciste][2].
2. [Suscribe el Datadog Forwarder a los grupos de logs de tu función][4].

### Etiquetar

Aunque es opcional, Datadog recomienda etiquetar las aplicaciones serverless con las etiquetas (tags) `env`, `service` y `version` para el [etiquetado de servicios unificado][5].

## Explorar

Una vez que tienes tu función configurada según los pasos anteriores, puedes consultar tus métricas, logs y trazas en la [página de inicio de Serverless][6].

## Monitorizar la lógica de negocio personalizada

Si quieres enviar una métrica personalizada, consulta el siguiente código de ejemplo:

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  ddlambda "github.com/DataDog/dd-trace-go/contrib/aws/datadog-lambda-go/v2"
)

func main() {
  // Envuelve tu función de controlador
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Envía una métrica personalizada
  ddlambda.Metric(
    "coffee_house.order_value", // Nombre de la métrica
    12.45, // Valor de la métrica
    "product:latte", "order:online" // Etiquetas asociadas
  )

  // Envía una métrica personalizada con marca de tiempo
  ddlambda.MetricWithTimestamp(
    "coffee_house.order_value", // Nombre de la métrica
    12.45, // Valor de la métrica
    time.Now(), // Marca de tiempo, debe estar dentro de los últimos 20 minutos
    "product:latte", "order:online" // Etiquetas asociadas
  )

  req, err := http.NewRequest("GET", "http://example.com/status")

  // Añade los encabezados de rastreo distribuido de Datadog
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```

Obtén más información sobre el [envío de métricas personalizadas][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_web_services/
[2]: /es/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-go
[4]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[5]: /es/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[6]: https://app.datadoghq.com/functions
[7]: /es/serverless/custom_metrics?tab=go
