---
further_reading:
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de logs
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
kind: documentación
title: Recopilar logs de Google Cloud con una suscripción Pub/Sub Push
---

<div class="alert alert-danger">
Esta página describe características obsoletas con información de configuración relevante para suscripciones legacy Pub/Sub Push útiles para solucionar problemas o para modificar configuraciones de legacy. Utiliza una suscripción  <strong>Pull</strong> con la plantilla Datadog Dataflow para reenviar tus logs de Google Cloud a Datadog en su lugar. Consulta <a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">la colección de logs</a> en la página de integración de Google Cloud para obtener instrucciones.
</div>

## Información general

Esta guía describe cómo reenviar logs desde los servicios de Google Cloud a Datadog a través de una suscripción **Push** a un tema [Google Cloud Pub/Sub][1].

Para recopilar logs de las aplicaciones que se ejecutan en GCE o GKE, también puedes utilizar  el [Datadog Agent ][2].

**Nota**: Si tienes una [VPC de Google Cloud][3] en tu entorno de Google Cloud, la suscripción **Push** no podrá acceder a puntos finales fuera de la VPC.

## Ajustes

### Requisitos previos

La [integración de Google Cloud Platform][4] se ha instalado correctamente.

### Crear un tema de Cloud Pub/Sub

1. Ve a la [Consola de Cloud Pub/Sub][5] y crea un nuevo tema.

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="Crear un tema sin una subscripción por defecto" style="width:80%;">}}

2. Dale a ese tema un nombre explícito como `export-logs-to-datadog` y haz clic en **Crear**.

**Advertencia**: Los pub/subs están sujetos a [cuotas y limitaciones de Google Cloud][6]. Si el número de logs que tienes es superior a esas limitaciones, Datadog te recomienda dividir tu logs en varios temas. Consulta [la sección de monitorizar el reenvío de logs](#monitorizar-el-reenvío-de-logs) para obtener información sobre cómo configurar la monitorización de notificaciones si te acercas a esos límites.

### Reenvía logs a Datadog con una suscripción Cloud Pub/Sub

1. En la consola [Cloud Pub/Sub][5], selecciona **Suscripciones** en el menú de navegación de la izquierda. Haz clic en **Crear suscripción**.
2. Crea una ID de suscripción y selecciona el tema que creaste anteriormente.
3. Selecciona el método `Push` e introduce el siguiente comando, sustituyendo `<Datadog_API_KEY>` por el valor de una [clave API de Datadog][7] válida: 
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**Nota**: Asegúrate de que el selector `Datadog site` de la derecha de la página esté configurado en tu [sitio de Datadog][8] antes de copiar el comando anterior.

4. Configura cualquier opción adicional, como **Caducidad de la suscripción**, **Fecha límite de acuse de recibo**, **Duración de la retención del mensaje** o **Carta muerta**.
5. En **Política de reintento**, selecciona **Reintentar tras retraso exponencial**.
6. Haz clic en **Crear** en la parte inferior.

El Pub/Sub está listo para recibir logs de Google Cloud Logging y reenviarlos a Datadog.

### Exportar logs desde Google Cloud

1. Ve a [la página del Explorador de Google Cloud logs ][9] y filtra los logs que deben exportarse.
2. Desde la pestaña de **loguear Router**, selecciona **Crear sumidero**.
3. Indica un nombre para el sumidero.
4. Elige **Cloud Pub/Sub** como destino y selecciona el pub/sub que se creó a tal efecto.
   **Nota**: El pub/sub puede estar ubicado en un proyecto diferente.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

5. Haz clic en **Crear sumidero** y espera a que aparezca el mensaje de confirmación.

**Nota**: Es posible crear varias exportaciones desde Google Cloud Logging al mismo Pub/Sub con diferentes sumideros.

## Monitorizar el reenvío de logs

Los pub/subs están sujetos a [cuotas y limitaciones de Google Cloud][6]. Si el número de logs que tienes es superior a esas limitaciones, Datadog te recomienda dividir tu logs en varios temas, utilizando diferentes filtros.

Para recibir una notificación automática cuando alcances esta cuota, activa [la integración de métricas de Pub/Sub][10] y configura un monitor de métricas `gcp.pubsub.subscription.num_outstanding_messages` . Filtra este monitor en la suscripción que exporta logs a Datadog para asegurarte de que nunca supere los 1000, como en el siguiente ejemplo:

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Monitorización de Pub Sub" style="width:80%;">}}

### Muestreo de logs

Opcionalmente, puedes muestrear logs mientras realizas la consulta utilizando la [función de muestreo][11]. Por ejemplo, para incluir sólo el 10% de los logs, utiliza `sample(insertId, 0.1)`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/pubsub/docs/overview
[2]: /es/agent/
[3]: https://cloud.google.com/vpc
[4]: /es/integrations/google_cloud_platform/#installation
[5]: https://console.cloud.google.com/cloudpubsub/topicList
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[8]: /es/getting_started/site/
[9]: https://console.cloud.google.com/logs/viewer
[10]: https://docs.datadoghq.com/es/integrations/google_cloud_pubsub/
[11]: https://cloud.google.com/logging/docs/view/logging-query-language#sample