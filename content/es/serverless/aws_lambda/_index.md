---
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configurar la monitorización serverless
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración de AWS Lambda
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: Blog
  text: Monitorizar las funciones de AWS Lambda desplegadas con imágenes de contenedor
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: Blog
  text: Prácticas recomendadas para la recopilación y gestión de logs serverless
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: Blog
  text: Diseño de aplicaciones serverless de AWS listas para la producción
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la creación de aplicaciones serverless que sigan
    el AWS Well-Architected Framework
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: Blog
  text: Monitorizar el uso de almacenamiento efímero de las funciones de AWS Lambda
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: Blog
  text: Comprender el rendimiento de las funciones serverless con rastreo de arranque
    en frío
kind: documentación
title: Serverless Monitoring para AWS Lambda
---

Datadog Serverless Monitoring para AWS Lambda te ofrece visibilidad sobre tus funciones de Lambda.

Para empezar, sigue las [instrucciones de instalación][1] para recopilar las métricas, trazas (traces) y logs de tus aplicaciones serverless.

## Cómo funciona

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas mejoradas de AWS Lambda" >}}

Datadog Serverless Monitoring utiliza una biblioteca de Datadog Lambda específica del tiempo de ejecución, junto con la extensión Datadog Lambda, para enviar la telemetría de las funciones de Lambda.

La extensión Datadog Lambda recopila logs a través de CloudWatch, además de trazas, métricas mejoradas y métricas personalizadas de la biblioteca de Datadog Lambda.

## Uso

En las siguientes páginas se describe cómo instalar y configurar Serverless Monitoring para AWS Lambda, incluido cómo utilizar métricas, trazas y logs para obtener una visibilidad completa.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>Instalación</u>: instala Serverless Monitoring para AWS Lambda.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Métricas de Lambda</u>: obtén más información sobre las métricas mejoradas y aprende a enviar métricas personalizadas.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>Rastreo distribuido</u>: utiliza APM y el rastreo distribuido para obtener una imagen contextualizada del rendimiento de tu aplicación.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Recopilación de logs</u>: obtén más información sobre cómo recopilar logs, cómo filtrar logs y cómo conectar logs y trazas.{{< /nextlink >}}
{{< /whatsnext >}}

### Monitorizar todo el stack tecnológico serverless en la vista Serverless

La vista Serverless te permite correlacionar las métricas de alto nivel de los recursos de AWS con las métricas de las funciones de Lambda, de modo que puedas detectar e investigar rápidamente cualquier problema.

De forma predeterminada, la vista Serverless agrupa los recursos serverless por servicio para que puedas visualizar el rendimiento de cada parte de tu aplicación. Puedes ver las funciones que le pertenecen cada servicio, junto con los recursos (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) que las invocaron.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Resolver más rápidamente los errores de las funciones de AWS Lambda mediante la monitorización de las cargas útiles de las invocaciones

Datadog recopila automáticamente las solicitudes y respuestas de todas las invocaciones a funciones, lo que proporciona información clave que puede ayudar a solucionar problemas. Por ejemplo, si se te notifica que una de tus funciones de Lambda está experimentando errores, puedes analizar las cargas útiles de las solicitudes relevantes para buscar parámetros faltantes, direcciones de recursos mal escritas u otras configuraciones erróneas que puedan estar detrás de los errores.

Al identificar las configuraciones erróneas en las solicitudes con errores, puedes reproducir más fácilmente los problemas en tu entorno de desarrollo, y luego ejecutar tests para verificar las correcciones de los errores.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Métricas en tiempo real para crear alertas sobre problemas en el entorno de las funciones de Lambda

Las métricas de Lambda mejoradas de Datadog, que aparecen en Datadog con el prefijo `aws.lambda.enhanced`, están disponibles con un segundo nivel de granularidad y casi en tiempo real. Puedes utilizar las métricas de Lambda mejoradas para crear alertas o SLO sobre arranques en frío, costes estimados de AWS, tiempos de espera, errores de memoria agotada y uso de memoria en todas tus funciones de Lambda. Esto te permite ver los problemas de rendimiento en tus entornos serverless a medida que se producen y solucionarlos sin demora.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Monitorizar los cambios en la configuración serverless con el seguimiento del despliegue

Correlaciona fácilmente los cambios en el código, la configuración y el despliegue serverless con las métricas, trazas y logs de tus funciones para obtener información en tiempo real sobre cómo estos cambios pueden afectar el estado y el rendimiento de tus aplicaciones.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## Capacidades adicionales

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: habilita Continuous Profiler de Datadog para encontrar la línea de código exacta en tu función de Lambda que está creando cuellos de botella.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Protección de las funciones</u>: utiliza Application Security Management (ASM) para proteger tus funciones de las amenazas.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Seguimiento del despliegue</u>: haz un seguimiento de los despliegues para ver cuándo una nueva versión de código o un cambio en la configuración provoca una regresión.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/installation