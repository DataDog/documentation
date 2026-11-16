---
aliases:
- /es/graphing/infrastructure/cloudfunctions
- /es/graphing/infrastructure/serverless_functions
- /es/graphing/infrastructure/serverless/
- /es/infrastructure/serverless/
- /es/tracing/serverless_functions/datadog_apm
- /es/integrations/amazon_lambda/docs.datadoghq.com/serverless/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /serverless/installation/
  tag: Documentación
  text: Instalación de Serverless Monitoring
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para obtener más información sobre Serverless
    Monitoring
- link: https://www.datadoghq.com/state-of-serverless
  tag: Blog
  text: El estado de Serverless
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Haga un seguimiento de Azure Container Apps con Datadog
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: Notas de la versión
  text: ¡Eche un vistazo a las últimas versiones de Serverless! (Se requiere inicio
    de sesión en la aplicación).
title: Serverless
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info">Asegúrese de consultar las discusiones que tienen lugar en el canal <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> en la <a href="https://chat.datadoghq.com/">comunidad de Slack de Datadog</a>.</div>

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Aprenda cómo Serverless Monitoring permite a sus equipos mantenerse ágiles y concentrar su tiempo en crear aplicaciones que generen ingresos, mientras reducen la carga operativa.
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1] proporciona visibilidad completa de todos los servicios gestionados que impulsan sus aplicaciones serverless al reunir métricas, registros y trazas en tiempo real de su computación serverless, así como de las API, colas, flujos y almacenes de datos totalmente gestionados relacionados.

Datadog proporciona soluciones para hacer un seguimiento de [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure Container Apps](#azure-container-apps) y [Google Cloud Run](#google-cloud-run).

### AWS Lambda {#aws-lambda}

[Serverless Monitoring for AWS Lambda][2] le permite correlacionar métricas de alto nivel de los recursos de AWS con las de las funciones Lambda, para que pueda detectar problemas rápidamente e iniciar su investigación.

[Enhanced Lambda metrics][3], que aparecen en Datadog con el prefijo `aws.lambda.enhanced`, están disponibles con granularidad de un segundo y casi en tiempo real. Puede utilizar las métricas Lambda mejoradas para alertas o SLO sobre arranques en frío, costos estimados de AWS, tiempos de espera, errores de falta de memoria y uso de memoria en todas sus funciones Lambda.

Puede enviar [custom metrics][4] desde una función Lambda generando métricas a partir de registros y trazas, utilizando Datadog Lambda Extension o utilizando Datadog Forwarder Lambda.

Con [Distributed Tracing][5], puede conectar sus trazas sin servidor con métricas para obtener una imagen rica en contexto del rendimiento de su aplicación. Los SDK de Datadog para Python, Node.js, Ruby, Go, Java y .NET admiten el rastreo distribuido para AWS Lambda.

[Deployment Tracking][6] le ayuda a correlacionar los cambios de código, configuración e implementación sin servidor con métricas, trazas y registros de sus funciones para obtener información en tiempo real sobre cómo estos cambios pueden afectar la salud y el rendimiento de sus aplicaciones.

### AWS Step Functions {#aws-step-functions}

AWS Step Functions es un servicio de orquestación sin servidor que permite a los desarrolladores crear y gestionar flujos de trabajo de aplicaciones de varios pasos en AWS.

Hacer un seguimiento de las métricas y registros de la [AWS Step Functions Integration][13] para visualizar la telemetría nativa de la nube dentro de la vista de la aplicación {{< ui >}}Serverless{{< /ui >}}.

Identifique errores y cuellos de botella con las trazas de ejecución [execution traces][14]. Las trazas para Step Functions se pueden generar a partir de los registros de Step Functions y proporcionan información de ejecución granular, incluida la ruta de ejecución de la máquina de estados, las entradas y salidas para cada paso y la duración de la ejecución del paso.

Las métricas mejoradas de Step Function, que aparecen en Datadog con el prefijo `aws.states.enhanced`, están disponibles a nivel de segundo y se generan directamente dentro de Datadog.

### Servicio de Azure App {#azure-app-service}

La [extensión de Datadog para Azure App Service][7] proporciona capacidades de rastreo para Azure Web Apps.

Utilice la [{{< ui >}}Azure App Service{{< /ui >}} view][8] para:

- Identificar rápidamente aplicaciones con alta latencia o errores

- Realizar un seguimiento de la utilización de sus Web Apps, Function Apps y App Service Plans

- Obtener información sobre los costos de sus App Service Plans visualizando la cantidad de instancias activas y viendo cuáles ejecutan aplicaciones que envían trazas o registros a Datadog

- Mapear las aplicaciones que se ejecutan en sus App Service Plans para identificar aplicaciones que pueden estar afectando los costos o el rendimiento

La extensión de Datadog para Azure App Service proporciona capacidades de rastreo para Azure Web Apps. Para obtener más información sobre cómo configurar el rastreo en Azure, consulte [Azure App Service][7].

### Azure Container Apps {#azure-container-apps}

Azure Container Apps es una plataforma sin servidor totalmente administrada para implementar y escalar aplicaciones basadas en contenedores. Datadog proporciona monitoreo y recopilación de registros para Container Apps a través de la [integración de Azure][9].

Datadog también ofrece una solución para [instrumentar sus aplicaciones de Container Apps][10] con un Serverless Agent para habilitar el rastreo, métricas personalizadas y la recopilación directa de registros.

### Google Cloud Run {#google-cloud-run}

Google Cloud Run es una solución de cómputo asíncrona, ligera y basada en eventos que le permite crear funciones pequeñas de un solo propósito. Para hacer un seguimiento de las funciones sin servidor que se ejecutan en Google Cloud Platform, habilite la [integración de Google Cloud Platform][11].

Datadog también ofrece una solución para [instrumentar sus aplicaciones de Cloud Run][12] con un Serverless Agent para habilitar el rastreo, métricas personalizadas y la recopilación directa de registros.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /es/serverless/aws_lambda
[3]: /es/serverless/enhanced_lambda_metrics
[4]: /es/serverless/custom_metrics
[5]: /es/serverless/distributed_tracing
[6]: /es/serverless/deployment_tracking
[7]: /es/serverless/azure_app_service/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /es/integrations/azure/#log-collection
[10]: /es/serverless/azure_container_apps
[11]: /es/integrations/google_cloud_platform/
[12]: /es/serverless/google_cloud_run
[13]: /es/integrations/amazon_step_functions
[14]: /es/serverless/step_functions/installation