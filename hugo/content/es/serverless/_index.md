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
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: Notas de la versión
  text: Consulta las últimas versiones de Serverless. (Es necesario iniciar sesión
    en la aplicación).
- link: https://www.datadoghq.com/state-of-serverless
  tag: Blog
  text: Estado de Serverless
- link: /serverless/installation/
  tag: Documentación
  text: Instalación de la monitorización serverless
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Monitoriza las aplicaciones del contenedor de Azure con Datadog
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participar en una sesión interactiva para saber más sobre la monitorización
    serverless
title: Serverless
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info">Asegúrate de revisar las discusiones que se desarrollan en el canal <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> en la <a href="https://chat.datadoghq.com/">Comunidad de Slack de Datadog</a>.</div>

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Descubre cómo la monitorización serverless permite a tus equipos mantenerse ágiles y concentrar su tiempo en crear aplicaciones que generen ingresos y, al mismo tiempo, reducir los gastos operativos.
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1] brinda visibilidad completa de todos los servicios administrados que impulsan tus aplicaciones serverless al reunir métricas, logs y trazas (traces) en tiempo real de su informática serverless, así como API, colas, transmisiones y almacenes de datos totalmente gestionados relacionados.

Datadog brinda soluciones para monitorizar [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure Container Apps](#azure-container-apps) y [Google Cloud Run](#google-cloud-run).

### AWS Lambda

[Serverless Monitoring para AWS Lambda][2] te permite correlacionar métricas de alto nivel de los recursos de AWS con las de las funciones Lambda para que puedas detectar problemas rápidamente y comenzar tu investigación.

Las [métricas mejoradas de Lambda][3], que aparecen en Datadog con el prefijo `aws.lambda.enhanced`, están disponibles con una granularidad de segundos y casi en tiempo real. Puedes usar métricas mejoradas de Lambda para alertas o SLOs en arranques en frío, costes estimados de AWS, tiempos de espera, errores de falta de memoria y uso de memoria en todas tus funciones Lambda.

Puedes enviar [métricas personalizadas][4] desde una función Lambda generando métricas a partir de logs y trazas, utilizando la extensión Lambda de Datadog o el forwarder Lambda de Datadog.

Con el [rastreo distribuido][5], puedes conectar tus trazas serverless a métricas para obtener una imagen contextual del rendimiento de tu aplicación. Las bibliotecas de rastreo de Python, Node.js, Ruby, Go, Java y .NET de Datadog admiten el rastreo distribuido para AWS Lambda.

[Deployment Tracking][6] te ayuda a correlacionar el código serverless, la configuración y los cambios de despliegue con métricas, trazas y logs de tus funciones para obtener información en tiempo real sobre cómo estos cambios pueden afectar el estado y el rendimiento de tus aplicaciones.

### AWS Step Functions

AWS Step Functions es un servicio de orquestación serverless que permite a los desarrolladores crear y gestionar flujos de trabajo de aplicaciones de varios pasos en AWS.

Monitorice las métricas y los logs de la [integración de AWS Step Functions][13] para ver la telemetría nativa de la nube dentro de la vista de la aplicación serverless.

Identifica errores y cuellos de botella con las [trazas de ejecución][14]. Las trazas de Step Functions se pueden generar a partir de logs de Step Functions y brindan información de ejecución granular, incluida la ruta de ejecución de la máquina de estados, las entradas y salidas para cada paso y la duración de la ejecución del paso.

Las métricas mejoradas de Step Functions, que aparecen en Datadog con el prefijo `aws.states.enhanced`, están disponibles con una granularidad de segundos y se generan directamente dentro de Datadog.

### Azure App Service

La [extensión Datadog para Azure App Service][7] proporciona capacidades de rastreo para Azure Web Apps.

Utiliza la [vista de Azure App Service][8] para:

- Identificar rápidamente las aplicaciones con alta latencia o errores

- Rastrear la utilización de tus planes de App Service, Web Apps y Function Apps

- Obtener información sobre los costes de tus planes de App Service visualizando la cantidad de instancias activas y viendo cuáles son las aplicaciones en ejecución que envían trazas o logs a Datadog

- Mapear las aplicaciones que se ejecutan en tus planes de App Service para identificar las aplicaciones que pueden estar afectando a los costes o al rendimiento

La extensión de Datadog para Azure App Service proporciona capacidades de rastreo para Azure Web Apps. Para obtener más información sobre cómo configurar el rastreo en Azure, consulta [Azure App Service][7].

### Azure Container Apps

Azure Container Apps es una plataforma serverless totalmente gestionada para desplegar y escalar aplicaciones basadas en contenedores. Datadog proporciona la monitorización y la recopilación de log para Container Apps a través de la [integración Azure][9].

Datadog también ofrece una solución para [instrumentar tus aplicaciones de Container Apps][10] con un Agent específico para permitir el rastreo, las métricas personalizadas y la recopilación directa de logs.

### Google Cloud Run

Google Cloud Run es una solución informática asíncrona, liviana y basada en eventos que te permite crear funciones pequeñas con un solo propósito. Para monitorizar las funciones serverless que se ejecutan en Google Cloud Platform, habilita la [integración de Google Cloud Platform][11].

Datadog también ofrece una solución para [instrumentar tus aplicaciones de Cloud Run][12] con un Agent específico para permitir el rastreo, las métricas personalizadas y la recopilación directa de logs.

## Referencias adicionales

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