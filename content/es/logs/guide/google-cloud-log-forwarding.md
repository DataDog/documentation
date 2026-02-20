---
further_reading:
- link: https://www.datadoghq.com/blog/stream-logs-datadog-dataflow-template/
  tag: Blog
  text: Transmitir tus logs de Google Cloud a Datadog con Dataflow
title: Configuración del reenvío de logs de Google Cloud
---

## Información general

El reenvío de logs desde tu entorno de Google Cloud permite la monitorización casi en tiempo real de los recursos y las actividades que tienen lugar en tu organización o carpeta. Puedes configurar [monitores de logs][5] para recibir notificaciones de problemas, utilizar [Cloud SIEM][6] para detectar amenazas o aprovechar [Watchdog][7] para identificar incidentes desconocidos o comportamientos anómalos.

Los logs son reenviados por [Google Cloud Dataflow][4] utilizando la [plantilla Datadog Dataflow][3]. Este método te permite agrupar y comprimir los eventos de logs antes de reenviarlos a Datadog, que es la forma más eficiente de reenviar logs. Puedes especificar qué logs se reenvían utilizando filtros de inclusión y exclusión.

## Instalación

{{% collapse-content title="Inicio rápido (recomendado)" level="h4" id="quick-start-log-setup" %}}
#### Elige el método de configuración del inicio rápido si...

- Estás configurando el reenvío de logs desde Google Cloud por primera vez.
- Prefieres un flujo de trabajo basado en la interfaz de usuario y quieres minimizar el tiempo necesario para crear y configurar los recursos necesarios.
- Quieres automatizar los pasos de configuración en scripts o pipelines de CI/CD.

##### Permisos previos

{{% google-cloud-logging-setup-permissions %}}

##### Instrucciones

1. En el [cuadro de integración con Google Cloud][100], haz clic en el botón **Configure Log Collection** (Configurar la recopilación de logs).
1. Selecciona **Quick Start** (Inicio rápido). Se genera automáticamente un script de instalación, configurado con tus credenciales y tu sitio Datadog.
1. Copia el script de instalación. Puedes ejecutar el script localmente o en Google Cloud Shell:
   - Localmente: Puede ser más rápido, pero requiere tus credenciales de Google Cloud y la [CLI de gcloud][101] instalada en tu máquina.
   - [Google Cloud Shell][102]: Haz clic en **Open Google Cloud Shell** (Abrir Google Cloud Shell) para ejecutar el script.
1. Después de ejecutar el script, vuelve al cuadro de integración con Google Cloud.
1. En la sección **Select Projects** (Seleccionar proyectos), selecciona las carpetas y proyectos desde los que se reenviarán logs. Si seleccionas una carpeta, los logs se reenviarán desde todos sus proyectos secundarios.<br>
   **Nota**: En esta sección solo aparecen las carpetas y proyectos para los que tienes el acceso y los permisos necesarios. Asimismo, las carpetas y proyectos sin nombre para mostrar no aparecen.
1. En la sección **Dataflow Job Configuration** (Configuración del trabajo de Dataflow), especifica las opciones de configuración del trabajo de Dataflow:
   - Selecciona la configuración del despliegue (región de Google Cloud y proyecto para alojar los recursos creados: temas y suscripciones Pub/Sub, un sumidero de enrutamiento de logs, una entrada de Secret Manager, una cuenta de servicio, un bucket de Cloud Storage y un trabajo de Dataflow).
   - Selecciona la configuración del escalado (número de workers y número máximo de workers).
   - Selecciona la configuración del rendimiento (número máximo de solicitudes paralelas y tamaño del lote).
   - Selecciona las opciones de ejecución.
1. En la sección **Advanced Configuration** (Configuración avanzada), especifica opcionalmente el tipo de máquinas virtuales de tus workers de Dataflow. Si no se selecciona ningún tipo de máquina, Dataflow elige automáticamente un tipo de máquina adecuado en función de tus requisitos de trabajo.
1. Opcionalmente puedes especificar filtros de inclusión y exclusión utilizando el [lenguaje de consulta de la generación de logs] de Google Cloud[105].
1. Revisa los pasos a ejecutar en la sección **Complete Setup** (Finalizar configuración). Si todo sale según lo esperado, haz clic en **Complete Setup**.


[100]: https://app.datadoghq.com/integrations/gcp
[101]: https://docs.cloud.google.com/sdk/docs/install
[102]: https://docs.cloud.google.com/shell/docs
[104]: https://docs.cloud.google.com/dataflow/docs/guides/enable-dataflow-prime
[105]: https://cloud.google.com/logging/docs/view/logging-query-language
{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="terraform-log-setup" %}}
#### Elige el método de configuración de Terraform si...

- Gestionas la infraestructura como código y quieres mantener la integración de Datadog Google Cloud bajo control de versiones.
- Necesitas configurar varias carpetas o proyectos de forma coherente con bloques de proveedores reutilizables.
- Quieres un proceso de despliegue repetible y auditable que se adapte a tu entorno gestionado por Terraform.

##### Permisos previos

{{% google-cloud-logging-setup-permissions %}}

##### Instrucciones

{{< tabs >}}
{{% tab "Configuración de Datadog basada en la interfaz de usuario" %}}

1. En el [cuadro de integración con Google Cloud][200], haz clic en el botón **Configure Log Collection** (Configurar la recopilación de logs).
1. Selecciona **Terraform**.
1. En la sección **Select Projects** (Seleccionar proyectos), selecciona las carpetas y proyectos desde los que se reenviarán logs. Si seleccionas una carpeta, los logs se reenviarán desde todos sus proyectos secundarios.<br>
   **Nota**: En esta sección solo aparecen las carpetas y proyectos para los que tienes el acceso y los permisos necesarios. Asimismo, las carpetas y proyectos sin nombre para mostrar no aparecen.
1. En la sección **Dataflow Job Configuration** (Configuración del trabajo de Dataflow), especifica las opciones de configuración del trabajo de Dataflow:
   - Selecciona la configuración del despliegue (región de Google Cloud y proyecto para alojar los recursos creados: temas y suscripciones Pub/Sub, un sumidero de enrutamiento de logs, una entrada de Secret Manager, una cuenta de servicio, un bucket de Cloud Storage y un trabajo de Dataflow).
   - Selecciona la configuración del escalado (número máximo de workers).
   - Selecciona la configuración del rendimiento (número máximo de solicitudes paralelas y tamaño del lote).
   - Selecciona las opciones de ejecución (Streaming Engine está activado por defecto. Lee más sobre sus [ventajas][201]).
1. En la sección **Advanced Configuration** (Configuración avanzada), especifica opcionalmente el tipo de máquinas virtuales de tus workers de Dataflow. Si no se selecciona ningún tipo de máquina, Dataflow elige automáticamente un tipo de máquina adecuado en función de tus requisitos de trabajo.
1. Opcionalmente puedes especificar filtros de inclusión y exclusión utilizando el [lenguaje de consulta de la generación de logs] de Google Cloud[203].


[200]: https://app.datadoghq.com/integrations/gcp
[201]: https://docs.cloud.google.com/dataflow/docs/streaming-engine#benefits
[202]: https://docs.cloud.google.com/dataflow/docs/guides/enable-dataflow-prime
[203]: https://cloud.google.com/logging/docs/view/logging-query-language
{{% /tab %}}

{{% tab "Configuración manual con el módulo Terraform" %}}
Consulta las instrucciones del repositorio [`terraform-gcp-datadog-integration`][300] para configurar y gestionar la infraestructura necesaria a través de Terraform.

[300]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration?tab=readme-ov-file#log-collection-integration---google-cloud-platform-to-datadog
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Manual" level="h4" id="manual-logging-setup" %}}
Las instrucciones de esta sección le guiarán a través del proceso de:

1. Creación de un [tema][401] y una [suscripción pull][402] Pub/Sub para recibir logs de un sumidero de logs configurado.
2. Creación de una cuenta de servicio de worker de Dataflow personalizada para proporcionar [mínimo privilegio][403] a tus workers de pipelines de Dataflow. 
3. Creación de un [sumidero de logs][404] para publicar logs en el tema Pub/Sub.
4. Creación de un trabajo de Dataflow utilizando la [plantilla de Datadog][400] para transmitir logs desde la suscripción Pub/Sub a Datadog.

Tienes control total sobre qué logs se envían a Datadog a través de los filtros de generación de logs que creas en el sumidero de logs, incluidos los logs GCE y GKE. Consulta la [página Lenguaje de consulta de generación de logs][405] de Google para obtener información sobre la escritura de filtros. Para ver un examen detallado de la arquitectura creada, consulta [Transmitir logs desde Google Cloud a Datadog][9] en el Centro de arquitectura en la nube.

**Nota**: Debes activar la **API de flujo de datos** para utilizar Google Cloud Dataflow. Consulta [Activación de API][407] en la documentación de Google Cloud para obtener más información.

Para recopilar logs de aplicaciones que se ejecutan en GCE o GKE, también puedes utilizar el [Datadog Agent][408].

#### 1. Crear un tema y una suscripción Cloud Pub/Sub

1. Ve a la [consola de Cloud Pub/Sub][409] y crea un nuevo tema. Selecciona la opción **Add a default subscription** (Añadir una suscripción por defecto) para simplificar la configuración.

   **Nota**: También puedes configurar manualmente una [suscripción Cloud Pub/Sub][410] con el tipo de entrega **Pull**. Si creas tu suscripción Pub/Sub manualmente, deja la casilla `Enable dead lettering` **desmarcada**. Para obtener más información, consulta [Funciones de Pub/Sub no compatibles][411].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Página Crear un tema en la consola de Google Cloud con la casilla Añadir una suscripción por defecto seleccionada" style="width:80%;">}}

2. Proporciona un nombre explícito para ese tema como `export-logs-to-datadog` y haz clic en **Create** (Crear).

3. Crea un tema adicional y una suscripción por defecto para gestionar cualquier mensaje de log rechazado por la API de Datadog. El nombre de este tema se utiliza en la plantilla de Datadog Dataflow como parte de la configuración de la ruta del [parámetro de plantilla][412] `outputDeadletterTopic`. Cuando hayas inspeccionado y corregido cualquier problema en los mensajes fallidos, reenvíalos al tema `export-logs-to-datadog` original ejecutando un trabajo de [plantilla Pub/Sub a Pub/Sub][413].

4. Datadog recomienda crear un secreto en [Secret Manager][414], con el valor válido de tu clave de API de Datadog, para utilizarlo posteriormente en la plantilla de Datadog Dataflow.

<div class="alert alert-danger">
Las suscripciones Cloud Pub/Sub en la nube están sujetas a las <a href="https://cloud.google.com/pubsub/quotas#quotas">cuotas y limitaciones de Google Cloud</a>. Si el número de logs que tienes supera esas limitaciones, Datadog te recomienda dividir tus logs en varios temas. Consulta la sección <a href="#monitor (noun)-the-cloud-pubsub-log-forwarding">Monitor the Pub/Sub Log Forwarding</a> (Monitorizar el reenvío de logs de Pub/Sub) para obtener información sobre cómo configurar notificaciones de monitor si te acercas a esos límites.
</div>

#### 2. Crear una cuenta de servicio de worker de Dataflow personalizada

El comportamiento predeterminado de los workers de pipelines de Dataflow consiste en utilizar la [cuenta de servicio de Compute Engine por defecto][416] de tu proyecto, que concede permisos a todos los recursos del proyecto. Si estás reenviando logs desde un entorno de **Producción**, deberías crear una cuenta de servicio de worker personalizada con solo los roles y permisos necesarios, y asignar esta cuenta de servicio a tus workers de pipelines de Dataflow.

1. Ve a la página [Cuentas de servicio][417] en la consola de Google Cloud y selecciona tu proyecto.
2. Haz clic en **CREATE SERVICE ACCOUNT** (Crear cuenta de servicio) y asigna un nombre descriptivo a la cuenta de servicio. Haz clic en **CREATE AND CONTINUE** (Crear y continuar).
3. Añade los roles en la tabla de permisos necesarios y haz clic en **DONE** (Listo).

##### Permisos necesarios

[Administrador de Dataflow][418]
: `roles/dataflow.admin` <br> Permite que esta cuenta de servicio realice tareas administrativas de Dataflow.

[Worker de Dataflow][419]
: `roles/dataflow.worker` <br> Permite que esta cuenta de servicio realice operaciones de Dataflow.

[Visor de Pub/Sub][420]
: `roles/pubsub.viewer` <br> Permite que esta cuenta de servicio vea mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Abonado de Pub/Sub][421]
: `roles/pubsub.subscriber` <br> Permite que esta cuenta de servicio consuma mensajes de la suscripción Pub/Sub con tus logs de Google Cloud.

[Editor de Pub/Sub][422]
: `roles/pubsub.publisher`<br> Permite que esta cuenta de servicio publique mensajes fallidos en una suscripción independiente, lo que permite analizar o reenviar logs.

[Secret Manager Secret Accessor][423]
: `roles/secretmanager.secretAccessor` <br> Permite que esta cuenta de servicio acceda a la clave de API de Datadog en Secret Manager.

[Administración de objetos de almacenamiento][424]
: `roles/storage.objectAdmin`<br> Permite que esta cuenta de servicio lea y escriba en el bucket de Cloud Storage especificado para los archivos de staging.

**Nota**: Si no creas una cuenta de servicio personalizada para los workers de pipelines de Dataflow, asegúrate de que la cuenta de servicio predeterminada de Compute Engine tenga los permisos requeridos anteriores.

#### 3. Exportar logs desde un tema Google Cloud Pub/Sub

1. Ve a la [página del Logs Explorer][425] en la consola de Google Cloud.
2. En la pestaña de **Log Router** (Enrutador de logs), selecciona **Create Sink** (Crear sumidero de datos).
3. Indica un nombre para el sumidero de datos.
4. Elige _Cloud Pub/Sub_ como destino y selecciona el tema Cloud Pub/Sub creado para tal fin. **Nota**: El tema Cloud Pub/Sub puede encontrarse en un proyecto diferente.
   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}
5. Elige los logs que quieres incluir en el sumidero con un filtro opcional de inclusión o exclusión. Puedes filtrar los logs con una consulta de búsqueda o utilizar la [función de muestreo][426]. Por ejemplo, para incluir sólo el 10% de los logs con un nivel de `severity` de `ERROR`, crea un filtro de inclusión con `severity="ERROR" AND sample(insertId, 0.1)`.
   {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="Filtro de inclusión de un sumidero de generación de logs de Google Cloud con una consulta de gravedad=ERROR y muestra(insertId, 0.1)" >}}
6. Haz clic en **Create Sink** (Crear sink).

**Nota**: Es posible crear varias exportaciones desde Google Cloud Logging al mismo tema Cloud Pub/Sub con diferentes sumideros.

#### 4. Crear y ejecutar el trabajo de Dataflow

1. Ve a la página [Crear trabajo a partir de una plantilla][427] en la consola de Google Cloud.
2. Asigna un nombre al trabajo y selecciona un endpoint regional de Dataflow.
3. Selecciona `Pub/Sub to Datadog` en el desplegable **Plantilla de Dataflow**. Aparecerá la sección **Parámetros requeridos**.
   1. Selecciona la suscripción de entrada en el desplegable **Pub/Sub input subscription** (Suscripción de entrada Pub/Sub).
   1. Introduce lo siguiente en el campo **Datadog Logs API URL** (URL de la API de logs de Datadog):
      <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

      **Nota**: Asegúrate de que el selector de sitios de Datadog a la derecha de la página está configurado con tu [sitio Datadog][428] antes de copiar la URL de arriba.

   1. Selecciona el tema creado para recibir fallos de mensajes en el desplegable **Output deadletter Pub/Sub topic** (Tema de salida Pub/Sub sin entregar).
   1. Especifica una ruta para los archivos temporales en tu bucket de almacenamiento en el campo **Temporary location** (Ubicación temporal).

      {{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Parámetros requeridos en la plantilla de Datadog Dataflow" style="width:80%;">}}

4. En **Parámetros opcionales**, marca `Include full Pub/Sub message in the payload`.

5. Si creaste un secreto en Secret Manager con el valor de tu clave de API Datadog, como se menciona en el [paso 1](#1-create-a-cloud-pubsub-topic-and-subscription), introduce el **nombre de recurso** del secreto en el campo **ID de Google Cloud Secret Manager**.

   {{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con los campos ID de Google Cloud Secret Manager y Fuente de la clave de API pasada, resaltados" style="width:80%;">}}

   Consulta [Parámetros de plantilla][412] en la plantilla de Dataflow para obtener información detallada sobre el uso de las demás opciones disponibles:

      - `apiKeySource=KMS` con `apiKeyKMSEncryptionKey` configurada con tu ID de clave de [Cloud KMS][429] y `apiKey`, configurada con la clave de API cifrada.
      - **No recomendado**: `apiKeySource=PLAINTEXT` con `apiKey` configurada con la clave de API en texto sin formato.

6. Si creaste una cuenta de servicio de worker personalizada, selecciónala en el desplegable **Correo electrónico de cuenta de servicio**.

   {{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Parámetros opcionales en la plantilla de Datadog Dataflow con el correo electrónico de la cuenta de servicio resaltado" style="width:80%;">}}

7. Haz clic en **RUN JOB** (Ejecutar trabajo).

**Nota**: Si tienes una VPC compartida, consulta la página [Especificar una red y subred][430] en la documentación de Dataflow para obtener directrices sobre cómo especificar los parámetros `Network` y `Subnetwork`.

[400]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[401]: https://cloud.google.com/pubsub/docs/create-topic
[402]: https://cloud.google.com/pubsub/docs/create-subscription
[403]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[404]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[405]: https://cloud.google.com/logging/docs/view/logging-query-language
[406]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[407]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[408]: https://docs.datadoghq.com/es/agent/
[409]: https://console.cloud.google.com/cloudpubsub/topicList
[410]: https://console.cloud.google.com/cloudpubsub/subscription/
[411]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[412]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[413]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[414]: https://console.cloud.google.com/security/secret-manager
[415]: https://cloud.google.com/pubsub/quotas#quotas
[416]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[417]: https://console.cloud.google.com/iam-admin/serviceaccounts
[418]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[419]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[420]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[421]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[422]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[423]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[424]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[425]: https://console.cloud.google.com/logs/viewer
[426]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[427]: https://console.cloud.google.com/dataflow/createjob
[428]: https://docs.datadoghq.com/es/getting_started/site/
[429]: https://cloud.google.com/kms/docs
[430]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
{{% /collapse-content %}}

{{% collapse-content title="Suscripción Pub/Sub Push (legacy)" level="h4" id="pub-sub-push-logging-setup" %}}
<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La recopilación de logs de Google Cloud con una suscripción Pub/Sub Push</a> pronto estará **obsoleta**.

La documentación anterior de la suscripción **Push** sólo se mantiene para solucionar problemas o modificar configuraciones legacy.

Datadog recomienda utilizar una suscripción **Pull** con la plantilla de Datadog Dataflow, tal y como se describe en las secciones de configuración [Inicio rápido](#quick-start-log-setup) y [Terraform](#terraform-log-setup).
{{% /collapse-content %}}

Consulta la guía [Transmitir logs desde Google Cloud a Datadog][1] en el Centro de arquitectura de Google Cloud para obtener una explicación más detallada de los pasos y la arquitectura implicados en el reenvío de logs. Para profundizar en las ventajas de la plantilla Pub/Sub a Datadog, consulta [Transmitir tus logs desde Google Cloud a Datadog con Dataflow][2] en el blog de Datadog.

## Validación

Los nuevos eventos de generación de logs enviados al tema Cloud Pub/Sub aparecen en el [Datadog Log Explorer][8].

**Nota**: Puedes utilizar la [Calculadora de precios de Google Cloud][9] para calcular los posibles costes.

## Monitorizar el reenvío de logs de Cloud Pub/Sub

La [integración de Google Cloud Pub/Sub][10] proporciona métricas útiles para monitorizar el estado del reenvío de logs:

   - `gcp.pubsub.subscription.num_undelivered_messages` para el número de mensajes pendientes de entrega
   - `gcp.pubsub.subscription.oldest_unacked_message_age` para la antigüedad del mensaje no confirmado más antiguo de una suscripción

Utiliza las métricas anteriores con un [monitor de métricas][11] para recibir alertas de los mensajes de tus suscripciones de entrada y salida.

## Monitorizar el pipeline de Dataflow

Utiliza la [integración de Google Cloud Dataflow][12] de Datadog para monitorizar todos los aspectos de tus pipelines de Dataflow. Puedes ver todas tus métricas claves de Dataflow en el dashboard predefinido, enriquecido con datos contextuales, como información sobre las instancias GCE que ejecutan tus cargas de trabajo de Dataflow y el rendimiento de tu Pub/Sub.

También puedes utilizar un [monitor recomendado][13] preconfigurado para definir notificaciones sobre aumentos en el tiempo de backlog de tu pipeline. Para obtener más información, consulta [Monitorizar tus pipelines de Dataflow con Datadog][14] en el blog de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[2]: https://www.datadoghq.com/blog/stream-logs-datadog-dataflow-template/
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://cloud.google.com/dataflow
[5]: /es/monitors/types/log/
[6]: /es/security/cloud_siem/
[7]: /es/watchdog/
[8]: https://app.datadoghq.com/logs
[9]: https://cloud.google.com/products/calculator
[10]: /es/integrations/google-cloud-pubsub/
[11]: /es/monitors/types/metric/
[12]: /es/integrations/google-cloud-dataflow/
[13]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[14]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/