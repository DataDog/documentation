---
aliases:
- /es/serverless/datadog_lambda_library/go/
- /es/serverless/installation/go
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar Serverless Monitoring
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar problemas de Serverless Monitoring
- link: serverless/custom_metrics/
  tag: Documentación
  text: Envío de métricas personalizadas desde aplicaciones serverless
kind: documentation
title: Instrumentación de aplicaciones serverless de Go
---

<div class="alert alert-warning">Si todavía utilizas tus funciones de Lambda de Go con el tiempo de ejecución <code>go1.x</code> y no puedes migrar al tiempo de ejecución <code>provided.al2</code>, debes <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrumentar mediante el Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar mediante la Extensión Lambda de Datadog.</div>

<div class="alert alert-warning">Si despliegas tus funciones de Lambda en una VPC sin acceso a la Internet pública, puedes enviar datos <a href="/agent/guide/private-link/">con AWS PrivateLink</a> para el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien <a href="/agent/configuration/proxy/">mediante un proxy</a>, en caso de que uses cualquier otro sitio.</div>

## Instalación

{{< tabs >}}
{{% tab "Serverless Framework" %}}

El [Complemento serverless de Datadog][1] configura automáticamente tus funciones para enviar métricas, trazas (traces) y logs a Datadog mediante la [Extensión Lambda de Datadog][2].

Para instalar y configurar el Complemento serverless de Datadog, sigue estos pasos:

### Instala el Complemento serverless de Datadog:

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Actualiza tu archivo `serverless.yml`:

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

Para rellenar los parámetros:
- Reemplaza `<DATADOG_SITE>` por el [sitio de Datadog][3] al que quieres enviar la telemetría.
- Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][4] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `apiKey` y configurar la clave de la API de Datadog en texto sin formato.

Para obtener más información y parámetros adicionales, consulta la [documentación acerca del complemento][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Instalar la Extensión Lambda de Datadog

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Reemplaza `<TAG>` por un número de versión específico (por ejemplo, `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Alpine también es compatible con números de versión específicos (como `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) o con `latest-alpine`. Puedes ver una lista completa de posibles etiquetas (tags) en el [repositorio de Amazon ECR][1].

2. Configurar las variables de entorno obligatorias

    - Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).
    - Configura `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][2] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `DD_API_KEY` y configurar la clave de la API de Datadog en texto sin formato.
    - De manera opcional, puedes configurar `DD_UNIVERSAL_INSTRUMENTATION: true` para aprovechar las ventajas de las [configuraciones avanzadas][3], como capturar las cargas útiles de solicitud y respuesta de Lambda e inferir tramos (spans) de APM de los eventos de Lambda entrantes.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/serverless/configuration/
{{% /tab %}}
{{% tab "Custom" %}}
### Instalar la Extensión Lambda de Datadog

[Añade la Lambda Layer][1] de la Extensión Lambda de Datadog a tus funciones de Lambda, con el formato del ARN definido según tu región y arquitectura de AWS:

```sh
# Usa este formato para Lambda de x86 con un despliegue en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda de arm64 con un despliegue en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda de x86 con un despliegue en regiones GovCloud de AWS
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda de arm64 con un despliegue en regiones GovCloud de AWS
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```

Reemplaza `<AWS_REGION>` por una región de AWS válida, como `us-east-1`.

### Configurar las variables de entorno obligatorias

- Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el sitio [SITE] correcto del lado derecho).
- Configura `DD_API_KEY_SECRET_ARN` con el ARN del secreto de AWS siempre que hayas almacenado la [clave de la API de Datadog][2] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el testeo, puedes usar `DD_API_KEY` y configurar la clave de la API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Instalar la biblioteca Lambda de Datadog

```
go get github.com/DataDog/datadog-lambda-go
```

### Actualizar el código de la función de Lambda

```go
package main

import (
    "context"
    "net/http"
    "time"

    ddlambda "github.com/DataDog/datadog-lambda-go"
    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Envuelve tu controlador de Lambda
    lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, _ events.APIGatewayProxyRequest) (string, error) {
    // Rastrea una solicitud HTTP
    req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
    client := http.Client{}
    client = *httptrace.WrapClient(&client)
    client.Do(req)

    // Envía una métrica personalizada
    ddlambda.Metric(
        "coffee_house.order_value",      // Nombre de la métrica
        12.45,                           // Valor de la métrica
        "product:latte", "order:online", // Etiquetas asociadas
    )

    // Crea un tramo personalizado
    s, _ := tracer.StartSpanFromContext(ctx, "child.span")
    time.Sleep(100 * time.Millisecond)
    s.Finish()
    return "ok", nil
}

}
```

## ¿Qué toca hacer ahora?

- ¡Excelente! Ya puedes consultar métricas, logs y trazas en la [página de inicio Serverless][1].
- Activa la [monitorización de amenazas][4] para recibir alertas sobre los atacantes que tienen tu servicio como objetivo.
- Consulta la [guía de solución de problemas][2] si tienes dificultades para recopilar la telemetría
- Consulta las [configuraciones avanzadas][3] para saber cómo hacer lo siguiente:
    - conectar la telemetría mediante etiquetas;
    - recopilar telemetría para Amazon API Gateway, SQS, etc.;
    - capturar las cargas útiles de solicitud y respuesta de Lambda;
    - vincular los errores de tus funciones de Lambda con tu código fuente;
    - filtrar o borrar información confidencial de logs o trazas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/
[4]: /es/security/application_security/enabling/serverless/?tab=serverlessframework