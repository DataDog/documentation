---
aliases:
- /es/serverless/datadog_lambda_library/go/
further_reading:
- link: /serverless/configuration
  tag: Documentación
  text: Configurar la monitorización serverless
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: Documentación
  text: Solucionar los problemas de la monitorización serverless
- link: serverless/custom_metrics/
  tag: Documentación
  text: Enviar métricas personalizadas desde aplicaciones serverless
kind: documentación
title: Instrumentar aplicaciones serverless de Go
---

<div class="alert alert-warning">Si tus funciones Go Lambda aún utilizan el tiempo de ejecución <code>go1.x</code> y no puedes migrar al tiempo de ejecución <code>provided.al2</code>, deberás <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">instrumentar con el Datadog Forwarder</a>. De lo contrario, sigue las instrucciones de esta guía para instrumentar con la extensión Datadog Lambda.</div>

<div class="alert alert-warning">Si implementas tus funciones lambda en la VPC sin tener acceso a la red pública de Internet, podrás enviar datos mediante <a href="/agent/guide/private-link/">AWS PrivateLink</a>, en caso de que uses el <a href="/getting_started/site/">sitio de Datadog</a> <code>datadoghq.com</code>, o bien mediante un <a href="/agent/proxy/">proxy</a>, en caso de que uses cualquier otro sitio.</div>

## Instalación

{{< tabs >}}
{{% tab "Marco serverless" %}}

El [plugin serverless de Datadog][1] configura automáticamente tus funciones para enviar métricas, trazas y logs a Datadog mediante la [extensión Datadog Lambda][2].

Para instalar y configurar el plugin serverless de Datadog, sigue estos pasos:

### Instala el plugin serverless de Datadog:

```sh
serverless plugin install --name serverless-plugin-datadog
```

### Actualiza tu `serverless.yml`:

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

Para rellenar los marcadores:
- Reemplaza `<DATADOG_SITE>` por tu [sitio de Datadog][3] al que enviar la telemetría.
- Reemplaza `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS siempre que tu [clave de API de Datadog][4] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `apiKey` y configurar la clave de API de Datadog en texto sin formato.

Para obtener más información y parámetros adicionales, consulta la [documentación acerca del plugin][1].

[1]: https://docs.datadoghq.com/es/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/es/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Imagen de contenedor" %}}

1. Instala la extensión Datadog Lambda

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   Reemplaza `<TAG>` por un número de versión específico (ej.: `{{< latest-lambda-layer-version layer="extension" >}}`) o por `latest`. Para ver una lista completa con todas las etiquetas (tags) posibles, dirígete al [repositorio de Amazon ECR][1].

2. Configura las variables de entorno obligatorias

    - Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].
    - Configura `DD_API_KEY_SECRET_ARN` como ARN del secreto de AWS siempre que tu [clave de API de Datadog][2] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `DD_API_KEY` y configurar la clave de API de Datadog en texto sin formato.
    - Además, tienes la posibilidad de configurar `DD_UNIVERSAL_INSTRUMENTATION: true` para aprovechar las [configuraciones avanzadas][3], como capturar las cargas útiles de solicitud y respuesta de Lambda e inferir los tramos de APM a partir de eventos entrantes de Lambda.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/serverless/configuration/
{{% /tab %}}
{{% tab "Personalizado" %}}
### Instala la extensión Datadog Lambda

[Añade la capa Lambda][1] de la extensión Datadog Lambda a tus funciones Lambda usando el formato ARN basado en tu región y arquitectura de AWS:

{{< site-region region="us,us3,us5,eu,gov" >}}
```sh
# Usa este formato para Lambda basado en x86 implementado en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en arm64 implementado en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en x86 implementado en regiones de AWS GovCloud
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en arm64 implementado en regiones de AWS GovCloud
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```sh
# Usa este formato para Lambda basado en x86 implementado en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en arm64 implementado en regiones comerciales de AWS
arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en x86 implementado en regiones de AWS GovCloud
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# Usa este formato para Lambda basado en arm64 implementado en regiones de AWS GovCloud
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}

 Reemplaza `<AWS_REGION>` por una región de AWS válida, como puede ser `us-east-1`.

### Configura las variables de entorno requeridas

- Configura `DD_SITE` como {{< region-param key="dd_site" code="true" >}} [asegúrate de que has seleccionado el sitio (SITE) correcto a la derecha].
- Configura `DD_API_KEY_SECRET_ARN` como ARN del secreto de AWS siempre que tu [clave de API de Datadog][2] se haya almacenado de forma segura. La clave tiene que almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar la prueba, puedes usar `DD_API_KEY` y configurar la clave de API de Datadog en texto sin formato.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Instala la biblioteca Datadog Lambda

```
go get github.com/DataDog/datadog-lambda-go
```

### Actualiza el código de tu función Lambda

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func main() {
  // Encierra tu controlador Lambda
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Traza una solicitud HTTP
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // Envía una métrica personalizada
  ddlambda.Metric(
    "coffee_house.order_value", // Nombre de la métrica
    12.45, // Valor de la métrica
    "product:latte", "order:online" // Etiquetas asociadas
  )

  // Crea un tramo personalizado
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

## ¿Qué toca hacer ahora?

- ¡Enhorabuena! Ya puedes ver métricas, registros y trazas en la [página de inicio de serverless][1].
- Consulta la [guía sobre cómo solucionar los problemas][4] si necesitas ayuda para recopilar la telemetría.
- Consulta las [configuraciones avanzadas][3] para
    - conectar tu telemetría mediante el uso de tags,
    - recopilar la telemetría de Amazon API Gateway, Amazon SQS, etc.,
    - capturar las cargas útiles de solicitud y respuesta de Lambda
    - vincular los errores de tus funciones lambda con tu código fuente,
    - filtrar o borrar información confidencial procedente de logs o trazas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /es/serverless/configuration/