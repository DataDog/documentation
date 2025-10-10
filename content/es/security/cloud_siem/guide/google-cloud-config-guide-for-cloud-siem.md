---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explorar las reglas de detección por defecto de Cloud SIEM
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentación
  text: Más información sobre Security Signals Explorer
- link: /security/cloud_siem/detection_rules/
  tag: Documentación
  text: Crear nuevas reglas de detección
- link: /integrations/google_cloud_platform/#log-collection
  tag: Documentación
  text: Recopilar logs de Google Cloud Platform
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: Blog
  text: Visualizar la actividad en tu entorno de Google Cloud con Datadog Cloud SIEM
    Investigator
title: Guía de configuración de Google Cloud para Cloud SIEM
---

## Información general

[Datadog Cloud SIEM][1] aplica reglas de detección a todos los logs procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP incluida en la lista de amenazas que se comunica con tus sistemas o una modificación de recursos insegura. Las amenazas aparecen como señales de seguridad en el Security Signals Explorer para su clasificación.

Utilice [Google Cloud Dataflow][2] y la [plantilla de Datadog][3] para reenviar logs desde tus servicios de Google Cloud a Datadog. Esta guía te indicará los siguientes pasos para que puedas empezar a detectar amenazas con tus logs de auditoría de Google Cloud:

1. [Habilitar logs de auditoría de acceso a datos](#enable-data-access-audit-logs)
1. [Crear un tema de publicación/suscripción (Pub/Sub) de Google Cloud y una suscripción pull](#create-a-google-cloud-publishsubscription-pubsub-system) para recibir logs de un sink de log configurado
1. [Crear una cuenta de servicio de trabajo de Dataflow personalizada](#create-a-custom-dataflow-worker-service-account)
1. [Crear un sink de log para publicar Logs al Pub/Sub](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Crear y ejecutar el trabajo de Dataflow](#create-and-run-the-dataflow-job)
1. [Usar Cloud SIEM para clasificar señales de seguridad](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La recopilación de logs de Google Cloud con una suscripción Push Pub/Sub</a> está en proceso de ser obsoleta por las siguientes razones:

- Si dispones de una VPC de Google Cloud, la suscripción Push no puede acceder a endpoints fuera de la VPC.
- La suscripción Push no proporciona compresión ni agrupación por lotes de eventos, por lo que solo es adecuada para un volumen bajo de logs.

La documentación para la suscripción <strong>Push</strong> solo se mantiene para solucionar problemas o para modificar configuraciones legacy. En su lugar, utiliza una suscripción <strong>Pull</strong> con la plantilla de Datadog Dataflow para reenviar tus logs de Google Cloud a Datadog.
</div>

## Habilitar los logs de auditoría de acceso a datos

1. Ve a IAM & Admin Console > [Audit Log][4] (Consola de IAM y administración > Log de auditoría).
1. Selecciona los servicios para los que deseas habilitar los logs de acceso a los datos.
1. En el panel **Log Types** (Tipos de log), activa **Admin Read**, **Data Read** y **Data Write**.
1. Haz clic en **Save** (Guardar).

### Cambiar la configuración por defecto para los nuevos servicios

Si se añade un nuevo servicio de Google Cloud, hereda tu [configuración de auditoría predeterminada][5].

Para garantizar que los logs de auditoría de acceso a datos se captura para los nuevos servicios Google Cloud, modifica tu configuración de auditoría predeterminada:

1. Ve a **IAM & Admin Console > [Audit Log][4]** (Consola de IAM y administración > Log de auditoría).
1. Activa **Admin Read**, **Data Read** y **Data Write**.
1. Haz clic en **Save** (Guardar).

## Crear un sistema de publicación/suscripción (Pub/Sub) de Google Cloud

1. Ve a Pub/Sub > [Topics][5] (Pub/Sub > Temas).
1. Haz clic en **Create Topic** (Crear tema).
1. Introduce un nombre de tema descriptivo. Por ejemplo, `export-audit-logs-to-datadog`.
1. Deja seleccionado **Add a default subscription** (Añadir una suscripción predeterminada), que crea una suscripción con los valores predeterminados de configuración. El nombre de la suscripción se genera automáticamente como el nombre de tu tema con "-sub" añadido. Este nombre de suscripción se utiliza cuando se crea el [trabajo de Dataflow] (#create-and-run-the-dataflow-job) más tarde.
1. Haz clic en **Create** (Crear).

### Crear un tema y una suscripción adicionales para el parámetro outputDeadletterTopic
Crea un tema adicional y una suscripción predeterminada para gestionar cualquier mensaje de log rechazado por la API de Datadog. Este tema se utiliza cuando se configura el [trabajo de Dataflow](#create-and-run-the-dataflow-job) más tarde.

1. Vuelve a Pub/Sub > [Topics][5] (Pub/Sub > Temas).
1. Haz clic en **Create Topic** (Crear tema).
1. Introduce un nombre de tema descriptivo.
1. Deja seleccionado **Add a default subscription** (Añadir una suscripción por defecto).
1. Haz clic en **Create** (Crear).

**Advertencia**: Los pub/subs están sujetos a [cuotas y limitaciones de Google Cloud][6]. Si el número de logs que tienes es superior a esas limitaciones, Datadog te recomienda dividir tu logs en varios temas. Consulta [Monitorizar el reenvío de logs][7] para obtener información sobre cómo configurar un monitor para que te avise cuando estés cerca de esos límites.

### Crear un secreto en el Secret Manager

Datadog recomienda crear un secreto en [Secret Manager][8] con el valor válido de tu clave de API de Datadog. Este secreto se utiliza cuando se configura el [trabajo de Dataflow](#create-and-run-the-dataflow-job) más tarde.

1. Ve a Security > [Secret Manager][8] (Seguridad > Secret Manager).
1. Haz clic en **Create Secret** (Crear secreto).
1. Introduce un nombre para el secreto.
1. Copia tu [clave de API de Datadog][9] y pégala en la sección **Secret Value** (Valor de secreto).
1. Opcionalmente, establece las demás configuraciones en función de tu caso de uso.
1. Haz clic en **Create Secret** (Crear secreto).

## Crear una cuenta de servicio de trabajo personalizada de Dataflow

El comportamiento predeterminado para los trabajadores de pipeline de Dataflow es utilizar la [cuenta de servicio predeterminada de Compute Engine][10] de tu proyecto, que concede permisos a todos los recursos del proyecto. Si estás reenviando logs desde un entorno de producción, crea una cuenta de servicio de trabajo personalizada con solo los roles y permisos necesarios, y asigna esta cuenta de servicio a tus trabajadores de pipeline de Dataflow.

**Nota**: Si no vas a crear una cuenta personalizada de servicio para los trabajadores de pipeline de Dataflow, asegúrate de que la cuenta de servicio predeterminada de Compute Engine tenga los [permisos necesarios](#required-permissions) que se indican a continuación.

1. Accede a la página [Cuenta de servicio][11] de Google Cloud.
1. Selecciona tu proyecto.
1. Haz clic en **Create Service Account** (Crear una cuenta de servicio).
1. Introduce un nombre descriptivo para la cuenta de servicio.
1. Haz clic en **Create and Continue** (Crear y continuar).
1. Añade los siguientes roles:
    ##### Permisos necesarios
    | Rol | Ruta | Descripción |
    | ------------- | ----------- | ----------- |
    | [Administrador de Dataflow][12] | `roles/dataflow.admin` | Permitir que esta cuenta de servicio realice tareas administrativas de Dataflow.
    | [Trabajador de Dataflow][13] | `roles/dataflow.worker` | Permitir que esta cuenta de servicio realice operaciones de trabajo de Dataflow. 
    | [Visor Pub/Sub][14] | `roles/pubsub.viewer` | Permitir a esta cuenta de servicio ver mensajes de la suscripción Pub/Sub con tus logs de Google Cloud
    | [Suscriptor Pub/Sub][15] | `roles/pubsub.subscriber` | Permitir a esta cuenta de servicio consumir mensajes de la suscripción Pub/Sub con tus logs de Google Cloud
    | [Publicador de Pub/Sub][16] | `roles/pubsub.publisher` | Permitir que esta cuenta de servicio publique mensajes fallidos en una suscripción separada, lo que permite analizar o reenviar logs
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | Permitir que esta cuenta de servicio acceda a la clave de API de Datadog en Secret Manager.
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | Permitir que esta cuenta de servicio lea y escriba en el bucket de Cloud Storage especificado para los archivos de preparación |
7. Haz clic en **Continue** (Continuar).
8. Haz clic en **Done** (Listo).

##  Crear un sink de log para publicar logs a Pub/Sub

1. Navega hasta [Logs Explorer][19] de Google Cloud.
1. Selecciona **Log Router** (Enrutador de log) en el menú de la izquierda.
1. Haz clic en **Create Sink** (Crear sink).
1. Introduce un nombre descriptivo para el sink.
1. Haz clic en **Next** (Siguiente).
1. En el menú desplegable **Select Sink Service** (Seleccionar servicio de sink), selecciona **Cloud Pub/Sub topic** (Tema Pub/Sub en la nube).
    **Nota**: El tema Pub/Sub en la nube puede estar ubicado en un proyecto diferente.
1. En **Select a Cloud Pub/Sub topic** (Seleccionar un tema Pub/Sub en la nube), seleccione el Pub/Sub creado anteriormente.
1. Haz clic en **Next** (Siguiente).
1. Introduce un filtro de inclusión para los logs que deseas enviar a Datadog.
1. Haz clic en **Next** (Siguiente).
1. Opcionalmente, introduce un filtro de exclusión para excluir logs que no deseas que se envíen a Datadog.
1. Haz clic en **Create Sink** (Crear sink).

**Nota**: Puedes crear varias exportaciones desde el registro de Google Cloud al mismo tema Pub/Sub con diferentes sinks.

## Crear y ejecutar el trabajo de Dataflow

1. Navega hasta Google Cloud [Dataflow][20].
1. Haz clic en **Create job from template** (Crear trabajo a partir de plantilla).
1. Introduce un nombre para el trabajo.
1. Selecciona un endpoint regional.
1. En el menú desplegable **Dataflow template** (Plantilla de Dataflow), selecciona **Pub/Sub to Datadog** (Pub/Sub a Datadog).
1. En la sección **Required Parameters** (Parámetros requeridos):
      a. En el menú desplegable **Pub/Sub input subscription** (Suscripción de entrada Pub/Sub), selecciona la suscripción predeterminada que se creó anteriormente al crear un nuevo [sistema Pub/Sub](#create-a-google-cloud-publishsubscription-pubsub-system).  
      b. Introduce lo siguiente en el campo **Datadog Logs API URL** (URL de la API de logs de Datadog):
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Nota**: Asegúrate de que el selector de sitio de Datadog situado a la derecha de esta página de documentación está configurado en tu sitio de Datadog antes de copiar la URL anterior.  
      c. En el campo **Output deadletter Pub/Sub topic**, selecciona el [tema adicional](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic) que creaste anteriormente para recibir mensajes rechazados por la API de Datadog.
      d. Especifica una ruta para los archivos temporales en tu bucket de almacenamiento en el campo **Temporary location** (Localización temporal).
1. Si anteriormente [creaste un secreto en Secret Manager](#create-a-secret-in-secret-manager) para tu valor de clave de API de Datadog: 
    a. Haz clic en **Optional Parameters** (Parámetros opcionales) para ver los campos adicionales.  
    b. Introduce el nombre del recurso del secreto en el campo **Google Cloud Secret Manager ID**.
        Para obtener el nombre del recurso, ve a tu secreto en [Secret Manager][8]. Haz clic en tu secreto. Haz clic en los tres puntos bajo **Action** (Acción) y selecciona **Copy resource name**(Copiar nombre de recurso).
    c. Introduce `SECRET_MANAGER` en el campo **Source of the API key passed** (Fuente de la clave de API pasada).
1. Si no utilizas un secreto para el valor de tu clave de API de Datadog:
    - **Recomendado**:
        - Configura `Source of API key passed` en `KMS`.
        - Establece `Google Cloud KMS  key for the API key` como tu ID de clave de Cloud KMS.
        - Establece `Logs API Key` con la clave de API cifrada.
    - **No recomendado**: `Source of API key passed` establecido en `PLAINTEXT` con `Logs API Key` como la clave de API en texto sin formato.
1. Consulta [Parámetros de plantilla][21] en la plantilla de Dataflow para obtener más información sobre otras opciones disponibles.
1. Si has creado una cuenta de servicio personalizada para el trabajador, selecciónala en el menú desplegable **Service account email** (Correo electrónico de la cuenta de servicio).
1. Haz clic en **Run Job** (Ejecutar trabajo).

Consulta nuevos eventos de registro entregados al tema Pub/Sub en la nube en el [Datadog Log Explorer][22].

## Usar Cloud SIEM para clasificar señales de seguridad

Cloud SIEM aplica reglas de detección predefinidas a todos los logs procesados, incluidos los logs de auditoría de Google Cloud que acabas de configurar. Cuando se detecta una amenaza con una regla de detección, se genera una señal de seguridad que se puede ver en el Security Signals Explorer.

- Ve al [Cloud SIEM Signals Explorer][23] para ver y clasificar las amenazas. Consulta Security Signals Explorer para obtener más información.
- También puedes utilizar el [dashboard de log de auditoría de Google Cloud][24] para investigar actividades anómalas.
- Consulta las [reglas de detección predefinidas][25] que se aplican a tus logs.
- Crea [nuevas reglas][26] para detectar amenazas que coincidan con tu caso de uso específico.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /es/integrations/google_cloud_platform/#monitor-the-cloud-pubsub-log-forwarding
[8]: https://console.cloud.google.com/security/secret-manager
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[11]: https://console.cloud.google.com/iam-admin/serviceaccounts
[12]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[13]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[16]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[17]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[18]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[19]: https://console.cloud.google.com/logs/
[20]: https://console.cloud.google.com/dataflow/
[21]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[22]: https://app.datadoghq.com/logs/
[23]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /es/security/default_rules/#cat-cloud-siem
[26]: /es/security/detection_rules/