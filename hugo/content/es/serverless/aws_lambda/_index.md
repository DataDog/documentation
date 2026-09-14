---
aliases:
- /es/serverless/aws
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configure Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración de AWS Lambda
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Deshabilite Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=aws#lambda
  tag: Documentación
  text: Envíe trazas de AWS Lambda a Datadog con OTLP
- link: https://www.datadoghq.com/blog/monitoring-lambda-containers/
  tag: Blog
  text: Haga un seguimiento de las funciones de AWS Lambda implementadas mediante
    imágenes de contenedor
- link: https://www.datadoghq.com/blog/manage-serverless-logs-datadog/
  tag: Blog
  text: Prácticas recomendadas para recopilar y administrar registros sin servidor
- link: https://www.datadoghq.com/blog/aws-serverless-application-design/
  tag: Blog
  text: Diseño de aplicaciones sin servidor de AWS listas para producción
- link: https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear aplicaciones sin servidor que sigan el Well-Architected
    Framework de AWS
- link: https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/
  tag: Blog
  text: Haga un seguimiento del uso de almacenamiento efímero de sus funciones de
    AWS Lambda
- link: https://www.datadoghq.com/blog/serverless-cold-start-traces/
  tag: Blog
  text: Comprenda el rendimiento de las funciones sin servidor con Cold Start Tracing
- link: https://www.datadoghq.com/blog/identifying-deprecated-lambda-functions/
  tag: Blog
  text: Identifique funciones Lambda obsoletas con Datadog
- link: https://www.datadoghq.com/blog/monitoring-lwa-with-datadog/
  tag: Blog
  text: Haga un seguimiento de aplicaciones web alojadas en Lambda con la integración
    de Lambda Web Adapter
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Haga un seguimiento de instancias administradas de AWS Lambda con Datadog
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: Centro de aprendizaje
  text: Configure AWS Lambda para Serverless Monitoring con Datadog
title: Serverless Monitoring para AWS Lambda
---
Datadog Serverless Monitoring para AWS Lambda le brinda visibilidad de sus funciones Lambda

Para comenzar, siga las [instrucciones de instalación][1] para recopilar métricas, trazas y registros de sus aplicaciones sin servidor.

## Cómo funciona {#how-it-works}

{{< img src="serverless/serverless_custom_metrics.png" alt="Recopilación de métricas mejoradas de AWS Lambda" >}}

Datadog Serverless Monitoring utiliza una biblioteca Datadog Lambda específica del tiempo de ejecución, en conjunto con Datadog Lambda Extension, para enviar telemetría desde sus funciones Lambda

Datadog Lambda Extension recopila registros de funciones utilizando la API de telemetría de Lambda, eliminando la necesidad de CloudWatch También genera métricas mejoradas. Unifica estas señales de telemetría con trazas de APM, tramos personalizados y métricas personalizadas de Datadog Lambda Library

## Uso {#usage}

Las siguientes páginas describen cómo instalar y configurar Serverless Monitoring para AWS Lambda, incluido cómo utilizar métricas, trazas y registros para una visibilidad completa

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>Instalación</u>: Instale Serverless Monitoring para AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Métricas de Lambda</u>: Lea más sobre las métricas mejoradas y aprenda a enviar métricas personalizadas.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>Trazado distribuido</u>: Utilice APM y el trazado distribuido para obtener una imagen rica en contexto del rendimiento de su aplicación.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Haga un seguimiento de toda su pila sin servidor en la Serverless view {#monitor-your-entire-serverless-stack-in-the-serverless-view}

La Serverless view le permite correlacionar métricas de alto nivel de los recursos de AWS con las de las funciones Lambda, para que pueda detectar problemas rápidamente e iniciar su investigación

De forma predeterminada, Serverless view agrupa sus recursos sin servidor por servicio para ayudarle a visualizar cómo funciona cada parte de su aplicación Para cada servicio, puede ver las funciones que le pertenecen, junto con los recursos (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) que las invocaron.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Resuelva las fallas de las funciones de AWS Lambda más rápido haciendo un seguimiento de las cargas útiles de invocación {#resolve-aws-lambda-function-failures-faster-by-monitoring-invocation-payloads}

Datadog recopila automáticamente las solicitudes y respuestas de funciones para todas sus invocaciones de funciones, proporcionando información clave que puede ayudar a solucionar problemas. Por ejemplo, si se le notifica que una de sus funciones Lambda está experimentando fallas, puede analizar las cargas útiles de solicitud relevantes para verificar si faltan parámetros, si hay direcciones de recursos mal escritas u otras configuraciones incorrectas que puedan estar detrás de las fallas.

Al identificar configuraciones incorrectas en las solicitudes fallidas, puede reproducir problemas más fácilmente en su entorno de desarrollo y luego ejecutar pruebas para verificar las correcciones de errores.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Métricas en tiempo real para alertar sobre problemas en todo su entorno de funciones Lambda {#real-time-metrics-for-alerting-on-issues-across-your-lambda-function-environment}

Las métricas Lambda mejoradas de Datadog, que aparecen en Datadog con el prefijo `aws.lambda.enhanced`, están disponibles con granularidad de un segundo y casi en tiempo real. Puede utilizar las métricas Lambda mejoradas para alertas o SLO sobre arranques en frío, costos estimados de AWS, tiempos de espera, errores de falta de memoria y uso de memoria en todas sus funciones Lambda. Esto le permite ver los problemas de rendimiento en sus entornos sin servidor a medida que ocurren y solucionar problemas sin demora.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Haga un seguimiento de los cambios de configuración sin servidor con el seguimiento de implementaciones {#monitor-serverless-configuration-changes-with-deployment-tracking}

Correlacione fácilmente los cambios de código, configuración e implementación sin servidor con métricas, trazas y registros de sus funciones para obtener información en tiempo real sobre cómo estos cambios pueden afectar la salud y el rendimiento de sus aplicaciones.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## Capacidades adicionales {#additional-capabilities}

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: habilite Continuous Profiler de Datadog para encontrar la línea exacta de código en su función Lambda que está causando cuellos de botella.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Funciones seguras</u>: utilice la protección App y API (AAP) para gestionar las amenazas a sus funciones{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Seguimiento de implementaciones</u>: Haga un seguimiento de las implementaciones para ver cuándo una nueva versión de código o un cambio de configuración provoca una regresión{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/installation