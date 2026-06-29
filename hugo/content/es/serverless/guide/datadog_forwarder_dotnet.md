---
null
...
---
## Información general

<div class="alert alert-danger">
Si recién empiezas a utilizar Datadog Serverless, sigue las <a href="/serverless/installation/dotnet">instrucciones para instrumentar tus funciones de Lambda mediante la Datadog Lambda Extension</a>. Si ya configuraste Datadog Serverless con el Datadog Forwarder antes que las funcionalidades de Lambda listas para usar, utiliza esta guía para mantener tu instancia.
</div>

## Requisitos previos

Se necesita la [función de Lambda del Datadog Forwarder][1] para ingerir las métricas mejoradas, las métricas personalizadas y los logs de AWS Lambda.

## Habilitar el rastreo de X-Ray

1. Habilita el [rastreo activo de AWS X-Ray][2] para tu función de Lambda.
2. Instala el [AWS X-Ray SDK para .NET][3].

## Suscribir el Datadog Forwarder a grupos de logs

[Suscribe][4] la función de Lambda del Datadog Forwarder a cada uno de los grupos de logs de tu función para enviar métricas, trazas (traces) y logs a Datadog.

## ¿Qué toca hacer ahora?

- Ya puedes consultar métricas, logs y trazas en la [página de inicio de Serverless][5].
- Consulta el código de ejemplo para [monitorizar la lógica de negocio personalizada](#monitor-custom-business-logic).
- Consulta la [guía de solución de problemas][6] si tienes dificultades para recopilar la telemetría.

## Monitorizar la lógica de negocio personalizada

Si quieres enviar una [métrica personalizada][7] mediante el Datadog Forwarder, consulta el siguiente código de ejemplo:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```


[1]: /es/serverless/forwarder
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[4]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[5]: https://app.datadoghq.com/functions
[6]: /es/serverless/guide/troubleshoot_serverless_monitoring/
[7]: /es/serverless/custom_metrics