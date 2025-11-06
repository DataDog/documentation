---
"aliases":
- "/integrations/awslambda/"
- "/serverless/real-time-enhanced-metrics/"
"categories":
- "aws"
- "cloud"
- "log collection"
- "tracing"
"custom_kind": "integración"
"dependencies": []
"description": "Seguimiento de tiempos de ejecución, errores, recuentos de invocaciones de Lambda y más."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_lambda/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/"
  "tag": "Blog"
  "text": "Monitorizar funciones Lambda"
- "link": "https://www.datadoghq.com/blog/datadog-lambda-layer/"
  "tag": "Blog"
  "text": "Capa Lambda de Datadog: Monitorización de métricas serverless personalizadas"
- "link": "https://www.datadoghq.com/blog/datadog-lambda-extension/"
  "tag": "Blog"
  "text": "Presentación de la extensión Lambda de Datadog"
"git_integration_title": "amazon_lambda"
"has_logo": true
"integration_id": "amazon-lambda"
"integration_title": "AWS Lambda"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_lambda"
"public_title": "Integración AWS Lambda en Datadog"
"short_description": "Seguimiento de tiempos de ejecución, errores, recuentos de invocaciones de Lambda y más."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
<div class="alert alert-danger">Esta página se limita a la documentación para la ingesta de métricas AWS Lambda desde Amazon CloudWatch. Ppara recopilar telemetría directamente de tus funciones Lambda en tiempo real, consulta la <a href="/serverless">documentación de Datadog serverless</a>.</div>

## Información general

AWS Lambda es un sistema informático servicio que ejecuta código en respuesta a eventos y gestiona automáticamente los recursos informáticos que requiere ese código.

Habilita esta integración para empezar a recopilar métricas CloudWatch. En esta página también se describe cómo configurar métricas personalizadas, generar logs y rastrear tus funciones Lambda.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][1].

### Recopilación de métricas

#### Métricas AWS Lambda

1. En la [página de la integración AWS][2], asegúrate de que `Lambda` está habilitado en la pestaña `Metric Collection`.
2. Añade los siguientes permisos a tu [política IAM de Datadog][3] para poder recopilar métricas de AWS Lambda. Para obtener más información, consulta las [políticas de Lambda][4] en el sitio web de AWS.

    | Permiso de AWS            | Descripción                          |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*` | Enumera funciones, metadatos y etiquetas (tags) de Lambda.   |
    | `tag:GetResources` | Aplica etiquetas personalizadas a funciones Lambda. |
    | `cloudtrail:LookupEvents` | Utiliza el historial de CloudTrail para detectar cambios en funciones Lambda. |

3. Instala la [integración AWS Lambda en Datadog][5].

Una vez que lo hagas, visualiza todos tus funciones Lambda en la [vista de Datadog serverless][6]. Esta página reúne métricas, trazas (traces) y logs de tus funciones Lambda AWS que ejecutan aplicaciones serverless en una sola vista. Para obtener más información detallada, consulta la [documentación de Datadog serverless][7].

## Datos recopilados

<div class="alert alert-danger">Cuando se utilizan extensiones AWS Lambda, la métrica de <em>duración</em> informada por AWS incluye la <em>post_runtime_extensions_duration</em> consumida por las extensiones Lambda <a href="https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/">que realizan actividades después de que se devuelve la respuesta de la función</a>. Para monitorizar el rendimiento real de la función, utiliza <em>duration - post_runtime_extensions_duration</em> o la <a href="https://docs.datadoghq.com/serverless/enhanced_lambda_metrics/">métrica Datadog mejorada</a> <em>aws.lambda.enhanced.runtime_duration</em>.</div>

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluyendo, entre otras, el nombre de la función, los grupos de seguridad, etc.

### Métricas
{{< get-metrics-from-git "amazon_lambda" >}}


### Eventos

La integración AWS Lambda recopila eventos de despliegues Lambda de AWS CloudTrail si el [seguimiento del despliegue de Datadog serverless][9] está habilitado.

### Checks de servicios

La integración AWS Lambda no incluye checks de servicios.

### Métricas Lambda mejoradas en tiempo real

Para obtener más información, consulta la [documentación de serverless][10].

### Métricas personalizadas

Para obtener más información, consulta la [documentación de serverless][11].

### APM

Para obtener más información, consulta la [documentación de serverless][12].

### Recopilación de trazas

Para obtener más información, consulta la [documentación de serverless][13].

### Lambda@Edge

Datadog añade automáticamente etiquetas `at_edge`, `edge_master_name` y `edge_master_arn` sobre tus métricas Lambda para ofrecer una vista agregada de las métricas y los logs de tu función Lambda a medida que se ejecutan en localizaciones de Edge.

El rastreo distribuido no es compatible con las funciones Lambda@Edge.

## Monitorización predefinida

La integración AWS Lambda proporciona funciones de monitorización listas para utilizar, para monitorizar y optimizar el rendimiento.

- Dashboard: de AWS Lambda: Obtén información general sobre tus funciones Lambda utilizando el [dashboard: de AWS Lambda][14] predefinido.
- Monitores recomendados: Habilita los [monitores recomendados de AWS Lambda][15] para detectar proactivamente los problemas y recibir alertas oportunas.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [el soporte de Datadog][16].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/integrations/amazon-lambda
[6]: https://app.datadoghq.com/functions
[7]: https://app.datadoghq.com/serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: https://app.datadoghq.com/serverless/deployment_tracking
[10]: https://app.datadoghq.com/serverless/enhanced_lambda_metrics/
[11]: https://app.datadoghq.com/serverless/custom_metrics/#custom-metrics
[12]: https://app.datadoghq.com/serverless/forwarder/
[13]: https://app.datadoghq.com/serverless/distributed_tracing/
[14]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[15]: https://app.datadoghq.com/monitors/recommended
[16]: https://app.datadoghq.com/help/

