---
description: Desactivar Serverless Monitoring para cualquier plataforma en la nube
  compatible.
title: Desactivar Serverless Monitoring
---

En esta página se explica cómo desactivar Datadog Serverless Monitoring.

## AWS

<div class="alert alert-info">Para activar Serverless Monitoring, consulta la documentación de <a href="/serverless/aws_lambda">AWS Lambda</a> o <a href="/serverless/step_functions">AWS Step Functions</a> de Datadog.</div>

Para desactivar Serverless Monitoring para AWS Lambda o AWS Step Functions:

### Desactivar la recopilación de métricas

1. En Datadog, ve al [cuadro de integración de AWS][1].
2. Selecciona tu cuenta AWS a la izquierda.
3. Ve a la pestaña **Metric Collection** (Recopilación de métricas) y desactiva la recopilación de métricas de los servicios AWS que quieres dejar de monitorizar.

   {{< img src="serverless/guide/disable/aws-lambda-off.png" alt="Cuadro de integración de Datadog-AWS, pestaña Metric Collection (Recopilación de métricas). Con 'lambda' en la barra de búsqueda, aparece el servicio AWS Lambda. El conmutador está en posición desactivada." style="width:100%;" >}}
4. **Guarda** tus cambios.

### Desactivar el rastreo

Elimina cualquier biblioteca Lambda Datadog de tus funciones AWS Lambda.

## Azure

<div class="alert alert-info">Para activar Serverless Monitoring, consulta la documentación de <a href="/serverless/azure_app_service">Azure App Service</a>, <a href="/serverless/azure_container_apps">Azure Container Apps</a> o <a href="/serverless/azure_functions">Azure Functions</a> de Datadog.</div>

Para desactivar Serverless Monitoring para Azure App Service, Azure Container Apps o Azure Functions:

### Desactivar la recopilación de métricas

1. En Datadog, ve al [cuadro de integración de Azure][2].
2. Seleccione el registro de su aplicación a la izquierda.
3. Ve a la pestaña **Metric Collection** (Recopilación de métricas) y desactiva la recopilación de métricas de los servicios Azure que quieres dejar de monitorizar.

   {{< img src="serverless/guide/disable/azure-container-off.png" alt="Cuadro de integración de Datadog-Azure, pestaña Metric Collection (Recopilación de métricas). Con 'container apps' en la barra de búsqueda, aparece el servicio Azure Container Apps. El conmutador está en posición desactivada." style="width:100%;" >}}
4. **Guarda** tus cambios.

### Desactivar el rastreo
Si has desplegado el Datadog Agent en un contenedor sidecar, elimínalo. Si estás utilizando `datadog/serverless-init`, elimínalo de tu archivo Docker.

## Google Cloud

<div class="alert alert-info">Para activar Serverless Monitoring, consulta la documentación de <a href="/serverless/google_cloud_run">Google Cloud Run</a> de Datadog.</div>

Para desactivar Serverless Monitoring para contenedores o funciones de Google Cloud Run:

### Desactivar métricas
1. En Datadog, ve al [cuadro de integración de Google Cloud][3].
2. Selecciona tu cuenta de GCP a la izquierda.
3. Ve a la pestaña **Metric Collection** (Recopilación de métricas) y desactiva la recopilación de métricas de los servicios Google Cloud que quieres dejar de monitorizar.

   {{< img src="serverless/guide/disable/gcr-off.png" alt="Cuadro de integración de Datadog-Google Cloud, pestaña Metric Collection (Recopilación de métricas). Con 'cloud run' en la barra de búsqueda, aparecen los servicios Cloud Run y Cloud Run Functions. Ambos conmutadores están en posición desactivada." style="width:100%;" >}}
4. **Guarda** tus cambios.

### Desactivar el rastreo
Si has desplegado el Datadog Agent en un contenedor sidecar, elimínalo utilizando el [comando `uninstrument`][5] de la [CLI Datadog][4]. Si estás utilizando `datadog/serverless-init`, elimínalo de tu archivo Docker.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://app.datadoghq.com/integrations/google-cloud-platform
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-cloud-run#uninstrument