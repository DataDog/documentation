---
description: Aprenda a publicar registros en el sistema de mensajería de Google Pub/Sub
  mediante el Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Google Pub/Sub
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Google Pub/Sub de Observability Pipelines para publicar registros en el sistema de mensajería de Google Pub/Sub, de modo que los registros puedan enviarse a servicios descendentes, lagos de datos o aplicaciones personalizadas.

### Cuándo utilizar este destino {#when-to-use-this-destination}

Escenarios comunes en los que podría utilizar este destino:
- Para analytics pipelines: Envíe registros a Google BigQuery, Data Lake o flujos de trabajo de aprendizaje automático personalizados.
- Para procesamiento basado en eventos: Publique registros en un tema de Pub/Sub para que Google Cloud Functions, Cloud Run functions y los trabajos de Dataflow puedan realizar acciones en tiempo real basadas en los datos de registro.

## Requisitos previos {#prerequisites}

Antes de configurar el destino, necesita lo siguiente:

- Suscripción de Pub/Sub: Cree un tema de Pub/Sub y al menos una suscripción para consumir los mensajes.
- Autenticación: Configure un [método de autenticación estándar de Google Cloud][2]. Estas opciones incluyen:
	- Una clave de cuenta de servicio (archivo JSON)
	- Una identidad de carga de trabajo (Google Kubernetes Engine (GKE))
- Roles de IAM:
	- `roles/pubsub.publisher` es necesario para publicar eventos.
	- `roles/pubsub.viewer` se recomienda para las comprobaciones de estado.
		- Si falta el rol, se registra el error `Healthcheck endpoint forbidden` y el Worker continúa como de costumbre.
	- Consulte [Roles de Pub/Sub disponibles][3] para obtener más información.

### Configure una cuenta de servicio para el Worker {#set-up-a-service-account-for-the-worker}

Una cuenta de servicio en Google Cloud es un tipo de cuenta utilizada solo por aplicaciones o servicios.
- Tiene su propia identidad y credenciales (un archivo de clave JSON).
- Usted le asigna roles de IAM para que pueda acceder a recursos específicos.
- En este caso, Observability Pipelines Worker utiliza una cuenta de servicio para autenticarse y enviar registros a Pub/Sub en su nombre.

Para autenticarse mediante una cuenta de servicio:

1. En la consola de Google Cloud, navegue a **IAM & Admin** > **[Cuentas de servicio][4]**.
1. Haga clic en **+ Create service account**.
1. Ingrese un nombre y haga clic en **Create and continue**.
1. Asigne roles:
	- **Pub/Sub Publisher**.
	- **Pub/Sub Viewer**.
1. Haga clic en **Done**.

#### Métodos de autenticación {#authentication-methods}

Después de haber creado la cuenta de servicio con los roles correctos, configure uno de los siguientes métodos de autenticación:

##### Option A: Workload Identity method (for GKE, recommended) {#option-a-workload-identity-method-for-gke-recommended}

1. Vincule la cuenta de servicio a una cuenta de servicio de Kubernetes (KSA).
1. Permita que esa KSA suplante la cuenta de servicio.
1. Anote la KSA para que GKE sepa qué cuenta de servicio utilizar.
1. La autenticación proviene entonces del servidor de metadatos de GCP.

##### Option B: Attach the GSA directly to a VM (for Google Compute Engine) {#option-b-attach-the-gsa-directly-to-a-vm-for-google-compute-engine}

Utilice este método de autenticación si está ejecutando el Observability Pipelines Worker en una VM de Google Compute Engine (GCE).
- Cuando cree o edite la VM, especifique la cuenta de servicio de Google en **Identity and API access** > **Service account**.

##### Option C: Run the service as the GSA (for Cloud Run or Cloud Functions) {#option-c-run-the-service-as-the-gsa-for-cloud-run-or-cloud-functions}

Utilice este método de autenticación si está implementando el Worker como un servicio de Cloud Run o una Cloud Function.
- En la configuración de implementación de Cloud Run o Cloud Functions, establezca la **Execution service account** en la cuenta de servicio de Google que creó.

##### Option D: JSON key method (any environment without identity bindings) {#option-d-json-key-method-any-environment-without-identity-bindings}

1. Abra la nueva cuenta de servicio y navegue a **Keys** > **Add key** > **Create new key**.
1. Elija el formato JSON.
1. Guarde el archivo JSON descargado en una ubicación segura.
1. Después de instalar el Worker, copie o monte el archivo JSON en `DD_OP_DATA_DIR/config/`.
Usted hace referencia a este archivo en el campo {{< ui >}}Credentials path{{< /ui >}} del destino de Google Pub/Sub cuando [configura el destino](#set-up-the-destination) en la Pipelines UI.

## Configuración {#setup}

Configure el destino de Google Pub/Sub cuando [configure un pipeline][9]. Usted puede configurar un pipeline en la [interfaz de usuario][1], usando la [API][10], o con [Terraform][11]. Los pasos en esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Google Pub/Sub en la pipeline UI:

1. Ingrese el nombre del proyecto de destino.
	- Este es el proyecto de GCP donde reside su tema de Pub/Sub.
1. Ingrese el tema.
	- Este es el tema de Pub/Sub al cual publicar los registros.
1. En el menú desplegable {{< ui >}}Encoding{{< /ui >}}, seleccione si desea codificar la salida de su canalización en {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw message{{< /ui >}}.
	- {{< ui >}}JSON{{< /ui >}}: Los registros se estructuran como JSON (recomendado si las herramientas posteriores necesitan datos estructurados).
	- {{< ui >}}Raw{{< /ui >}}: Los registros se envían como cadenas sin formato (conserva el formato original).
1. Si tiene un archivo JSON de credenciales, ingrese la ruta a su archivo JSON de credenciales.
	- Si utiliza un JSON de cuenta de servicio: ingrese la ruta `DD_OP_DATA_DIR/config/<your-service-account>.json`.
	- O establezca la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS`.
	- Las credenciales se administran automáticamente si utiliza [Workload Identity][7] en GKE.

### Configuración opcional {#optional-settings}

#### Habilitar TLS {#enable-tls}

<div class="alert alert-danger">Para la administración de secretos: solo ingrese el identificador de la frase de contraseña de la clave TLS. <b>No</b> ingrese el valor real.</div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

#### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="El destino de Google Pub/Sub con valores de ejemplo" style="width:30%;" >}}

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- (Opcional) Identificador de URL del punto de conexión de Google Pub/Sub:
	- De forma predeterminada, el Worker envía datos al punto de conexión global: `https://pubsub.googleapis.com`.
	- Si su tema de Pub/Sub es específico de una región, configure la URL del punto de conexión alternativo de Google Pub/Sub con el punto de conexión regional. Consulte [Acerca de los puntos de conexión de Pub/Sub][1] para obtener más información. Ingrese la URL del punto de conexión configurada en su administrador de secretos.
	- El identificador predeterminado es `DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.
- Identificador de frase de contraseña TLS de Google Pub/Sub (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_GCP_PUBSUB_KEY_PASS`.

[1]: https://docs.cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints

{{% /tab %}}

{{% tab "Variables de entorno" %}}

#### Endpoints alternativos opcionales de Pub/Sub {#optional-alternative-pubsub-endpoints}

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="La página de instalación que muestra el campo de variable de entorno de Google Pub/Sub" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Solución de problemas {#troubleshooting}

Problemas comunes y soluciones:
- Verificación prohibida
	- Verifique el rol de IAM `roles/pubsub.viewer`.
- Permiso denegado
	- Asegúrese de que la cuenta de servicio tenga `roles/pubsub.publisher`.
- Errores de autenticación
	- Verifique la ruta JSON de las credenciales o la configuración de GKE Workload Identity.
- Eventos descartados
	- Verifique las `pipelines.component_discarded_events_total` y `pipelines.buffer_discarded_events_total` métricas.
	- Aumente el tamaño del búfer o corrija los filtros mal configurados según sea necesario para resolver el problema.
- Latencia alta
	- Reduzca el tamaño del búfer y el tiempo de espera, o escale sus Workers.
- No llegan registros
	- En la configuración de su destino de Google Pub/Sub, verifique cuidadosamente el nombre del tema, el proyecto y el punto de conexión de Pub/Sub (global frente a regional).

## Métricas de salud {#health-metrics}

Para las [métricas de componente][8] y las [métricas de búfer de destino][12] emitidas por todos los destinos, consulte la documentación de [Pipelines Usage Metrics][13]. Para filtrar o agrupar por métricas de destino de Google Pub/Sub, utilice la etiqueta `component_type:gcp_pubsub`.

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Procesamiento por lotes de eventos de destinos][6] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 1,000          | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /es/observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /es/observability_pipelines/configuration/set_up_pipelines/
[10]: /es/api/latest/observability-pipelines/
[11]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[12]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/