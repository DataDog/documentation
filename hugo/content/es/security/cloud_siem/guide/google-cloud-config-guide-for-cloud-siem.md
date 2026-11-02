---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explore las reglas de detección predeterminadas de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentación
  text: Obtenga información sobre el Explorador de señales de seguridad
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentación
  text: Crear reglas de detección personalizadas
- link: /integrations/google_cloud_platform/#log-collection
  tag: Documentación
  text: Recopile registros de Google Cloud Platform
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Evalúe, optimice y asegure su pila de IA de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: Blog
  text: Visualice la actividad en su entorno de Google Cloud con Datadog Cloud SIEM
    Investigator
title: Guía de configuración de Google Cloud para Cloud SIEM
---
## Descripción general {#overview}

[Datadog Cloud SIEM][1] aplica reglas de detección a todos los registros procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP listada en inteligencia de amenazas que se comunica con sus sistemas o una modificación de recursos insegura. Las amenazas se muestran como Security Signals en el explorador de Security Signals para su clasificación.

Utilice [Google Cloud Dataflow][2] y la [plantilla de Datadog][3] para reenviar registros desde sus servicios de Google Cloud a Datadog. Esta guía lo lleva a través de los siguientes pasos para que pueda comenzar a detectar amenazas con sus registros de auditoría de Google Cloud:

1. [Habilite los registros de auditoría de acceso a datos](#enable-data-access-audit-logs)
1. [Cree un tema de publicación/suscripción (Pub/Sub) de Google Cloud y una suscripción de extracción](#create-a-google-cloud-publishsubscription-pubsub-system) para recibir registros de un receptor de registros configurado
1. [Cree una cuenta de servicio de trabajador de Dataflow personalizada](#create-a-custom-dataflow-worker-service-account)
1. [Cree un receptor de registros para publicar registros en Pub/Sub](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Cree y ejecute el trabajo de Dataflow](#create-and-run-the-dataflow-job)
1. [Utilice Cloud SIEM para clasificar los Security Signals](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La recopilación de registros de Google Cloud con una suscripción Push de Pub/Sub</a> está en proceso de desuso por las siguientes razones:

- Si tiene una VPC de Google Cloud, la suscripción Push no puede acceder a puntos de conexión fuera de la VPC.
- La suscripción Push no proporciona compresión ni procesamiento por lotes de eventos, por lo que solo es adecuada para un volumen bajo de registros.

La documentación para la suscripción <strong>Push</strong> solo se mantiene para la resolución de problemas o la modificación de configuraciones heredadas. Utilice una suscripción <strong>Pull</strong> con la plantilla de Dataflow de Datadog para reenviar sus registros de Google Cloud a Datadog en su lugar.
</div>

## Habilite los registros de auditoría de acceso a datos {#enable-data-access-audit-logs}

1. Vaya a IAM & Admin Console > [Audit Log][4].
1. Seleccione los servicios para los que desea habilitar los registros de acceso a datos.
1. En el panel **Log Types**, habilite {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}} y {{< ui >}}Data Write{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Cambie la configuración predeterminada para los servicios nuevos {#change-default-configuration-for-new-services}

Si se agrega un servicio nuevo de Google Cloud, este hereda su [configuración de auditoría predeterminada][5].

Para asegurarse de que los registros de auditoría de acceso a datos se capturen para los servicios nuevos de Google Cloud, modifique su configuración de auditoría predeterminada:

1. Vaya a **IAM & Admin Console > [Audit Log][4]**.
1. Habilite {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}} y {{< ui >}}Data Write{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Cree un sistema de publicación/suscripción (Pub/Sub) de Google Cloud {#create-a-google-cloud-publishsubscription-pubsub-system}

1. Vaya a Pub/Sub > [Topics][5].
1. Haga clic en {{< ui >}}Create Topic{{< /ui >}}.
1. Ingrese un nombre de tema descriptivo. Por ejemplo, `export-audit-logs-to-datadog`.
1. Deje seleccionada la opción **Add a default subscription**, que crea una suscripción con valores de configuración predeterminados. El nombre de la suscripción se genera automáticamente como el nombre de su tema con "-sub" añadido al final. Este nombre de suscripción se utiliza cuando crea su [trabajo de Dataflow](#create-and-run-the-dataflow-job) más adelante.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Cree un tema y una suscripción adicionales para el parámetro outputDeadletterTopic {#create-an-additional-topic-and-subscription-for-outputdeadlettertopic-parameter}
Cree un tema adicional y una suscripción predeterminada para manejar cualquier mensaje de registro rechazado por la Datadog API. Este tema se utiliza cuando configura el [trabajo de Dataflow](#create-and-run-the-dataflow-job) más adelante.

1. Vuelva a Pub/Sub > [Topics][5]
1. Haga clic en {{< ui >}}Create Topic{{< /ui >}}.
1. Ingrese un nombre de tema descriptivo.
1. Deje seleccionada la opción **Add a default subscription**.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

**Advertencia**: Los temas de publicación/suscripción están sujetos a [cuotas y limitaciones de Google Cloud][6]. Si la cantidad de registros que tiene es mayor que esas limitaciones, Datadog recomienda que divida sus registros en varios temas. Consulte [Hacer un seguimiento del reenvío de registros][7] para obtener información sobre cómo configurar el seguimiento para recibir notificaciones cuando esté cerca de esos límites.

### Cree un secreto en Secret Manager {#create-a-secret-in-secret-manager}

Datadog recomienda crear un secreto en [Secret Manager][8] con el valor de su clave de API de Datadog válida. Este secreto se utiliza cuando configura el [trabajo de Dataflow](#create-and-run-the-dataflow-job) más adelante.

1. Navegue a Security > [Secret Manager][8].
1. Haga clic en {{< ui >}}Create Secret{{< /ui >}}.
1. Ingrese un nombre para el secreto.
1. Copie su [clave de API de Datadog][9] y péguela en la sección **Secret value**.
1. Opcionalmente, establezca las demás configuraciones según su caso de uso.
1. Haga clic en {{< ui >}}Create Secret{{< /ui >}}.

## Cree una cuenta de servicio de trabajador de Dataflow personalizada {#create-a-custom-dataflow-worker-service-account}

El comportamiento predeterminado para los trabajadores de canalización de Dataflow es utilizar la [cuenta de servicio predeterminada de Compute Engine][10] de su proyecto, la cual otorga permisos a todos los recursos del proyecto. Si está reenviando registros desde un entorno de producción, cree una cuenta de servicio de trabajador personalizada solo con los roles y permisos necesarios, y asigne esta cuenta de servicio a sus trabajadores de canalización de Dataflow.

**Nota**: Si no está creando una cuenta de servicio personalizada para los trabajadores de canalización de Dataflow, asegúrese de que la cuenta de servicio predeterminada de Compute Engine tenga los [permisos requeridos](#required-permissions) a continuación.

1. Navegue a la página de [Cuenta de servicio][11] de Google Cloud.
1. Seleccione su proyecto.
1. Haga clic en {{< ui >}}Create Service Account{{< /ui >}}.
1. Ingrese un nombre descriptivo para la cuenta de servicio.
1. Haga clic en {{< ui >}}Create and Continue{{< /ui >}}.
1. Agregue los siguientes roles:
##### Permisos requeridos
    | Rol | Ruta | Descripción |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  Permite que esta cuenta de servicio realice tareas administrativas de Dataflow
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  Permite que esta cuenta de servicio realice operaciones de trabajos de Dataflow
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | Permite que esta cuenta de servicio visualice mensajes de la suscripción de Pub/Sub con sus registros de Google Cloud
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | Permite que esta cuenta de servicio consuma mensajes de la suscripción de Pub/Sub con sus registros de Google Cloud
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | Permite que esta cuenta de servicio publique mensajes fallidos en una suscripción separada, lo que permite analizar o reenviar los registros
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | Permite que esta cuenta de servicio acceda a la clave de API de Datadog en Secret Manager
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | Permite que esta cuenta de servicio lea y escriba en el bucket de Cloud Storage especificado para el almacenamiento provisional de archivos |
7. Haga clic en {{< ui >}}Continue{{< /ui >}}.
8. Haga clic en {{< ui >}}Done{{< /ui >}}.

##  Cree un receptor de registros para publicar registros en Pub/Sub {#create-a-log-sink-to-publish-logs-to-the-pubsub}

1. Vaya a [Logs Explorer][19] de Google Cloud.
1. Seleccione {{< ui >}}Log Router{{< /ui >}} en el menú lateral izquierdo.
1. Haga clic en {{< ui >}}Create Sink{{< /ui >}}.
1. Ingrese un nombre descriptivo para el receptor.
1. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. En el menú desplegable **Select Sink Service**, seleccione {{< ui >}}Cloud Pub/Sub topic{{< /ui >}}.
    **Nota**: El tema de Cloud Pub/Sub puede estar ubicado en un proyecto diferente.
1. En **Select a Cloud Pub/Sub topic**, seleccione el Pub/Sub creado anteriormente.
1. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. Ingrese un filtro de inclusión para los registros que desea enviar a Datadog.
1. Haga clic en {{< ui >}}Next{{< /ui >}}.
1. Opcionalmente, ingrese un filtro de exclusión para excluir los registros que no desea que se envíen a Datadog.
1. Haga clic en {{< ui >}}Create Sink{{< /ui >}}.

**Nota**: Puede crear múltiples exportaciones desde Google Cloud Logging al mismo tema de Pub/Sub con diferentes receptores.

## Cree y ejecute el trabajo de Dataflow {#create-and-run-the-dataflow-job}

1. Navegue a Google Cloud [Dataflow][20].
1. Haga clic en {{< ui >}}Create job from template{{< /ui >}}.
1. Ingrese un nombre para el trabajo.
1. Seleccione un punto de conexión regional.
1. En el menú desplegable **Dataflow template**, seleccione {{< ui >}}Pub/Sub to Datadog{{< /ui >}}.
1. En la sección **Required Parameters**:
   1. En el menú desplegable **Pub/Sub input subscription**, seleccione la suscripción predeterminada que se creó anteriormente cuando creó un nuevo [sistema Pub/Sub](#create-a-google-cloud-publishsubscription-pubsub-system).
   1. Ingrese lo siguiente en el campo **Datadog Logs API URL**:
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Note**: Ensure that the Datadog site selector on the right of this documentation page is set to your Datadog site before copying the URL above.
   1. En el campo **Output deadletter Pub/Sub topic**, seleccione el [tema adicional](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic) que creó anteriormente para recibir los mensajes rechazados por la Datadog API.
   1. Especifique una ruta para los archivos temporales en su bucket de almacenamiento en el campo **Temporary location**.
1. Si [creó un secreto en Secret Manager](#create-a-secret-in-secret-manager) para el valor de su clave de API de Datadog anteriormente:
   1. Haga clic en {{< ui >}}Optional Parameters{{< /ui >}} para ver los campos adicionales.
   1. Ingrese el nombre del recurso del secreto en el campo **Google Cloud Secret Manager ID**.<br />
      Para obtener el nombre del recurso, vaya a su secreto en [Secret Manager][8]. Haga clic en su secreto. Haga clic en los tres puntos debajo de **Action** y seleccione {{< ui >}}Copy resource name{{< /ui >}}.
   1. Ingrese `SECRET_MANAGER` en el campo **Source of the API key passed**.
1. Si no está utilizando un secreto para el valor de su clave de API de Datadog:
    - **Recomendado**:
        - Establezca `Source of API key passed` en `KMS`.
        - Establezca `Google Cloud KMS  key for the API key` en su ID de clave de Cloud KMS.
        - Establezca `Logs API Key` en la clave de API cifrada.
    - **No recomendado**: `Source of API key passed` establecido en `PLAINTEXT` con `Logs API Key` establecido en la clave de API en texto plano.
1. Consulte [Parámetros de plantilla][21] en la plantilla de Dataflow para obtener detalles sobre otras opciones disponibles.
1. Si creó una cuenta de servicio de trabajador personalizada, selecciónela en el menú desplegable **Service account email**.
1. Haga clic en {{< ui >}}Run Job{{< /ui >}}.

Consulte los nuevos eventos de registro enviados al tema de Cloud Pub/Sub en [Datadog Log Explorer][22].

## Utilice Cloud SIEM para clasificar los Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM aplica reglas de detección preconfiguradas a todos los registros procesados, incluidos los registros de auditoría de Google Cloud que acaba de configurar. Cuando se detecta una amenaza con una regla de detección, se genera una Security Signal que puede visualizarse en Security Signals Explorer.

- Vaya a [Cloud SIEM Signals Explorer][23] para visualizar y clasificar las amenazas. Consulte Security Signals Explorer para obtener más detalles.
- También puede usar el [Google Cloud Audit Log dashboard][24] para investigar actividades anómalas.
- Consulte las [reglas de detección preconfiguradas][25] que se aplican a sus registros.
- Cree [reglas nuevas][26] para detectar amenazas que coincidan con su caso de uso específico.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /es/logs/guide/google-cloud-log-forwarding/#monitor-the-cloud-pubsub-log-forwarding
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
[23]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /es/security/default_rules/#cat-cloud-siem
[26]: /es/security/detection_rules/