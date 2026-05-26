---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino Google Pub/Sub
---

{{< product-availability >}}

## Información general

Utiliza el destino Google Pub/Sub de Observability Pipelines para publicar logs en el sistema de mensajería de Google Pub/Sub, de modo que los puedan enviarse a servicios aguas abajo, lagos de datos o aplicaciones personalizadas.

### Cuándo utilizar este destino

Escenarios habituales en los que podrías utilizar este destino:
- Para pipelines de análisis: Dirige los logs hacia Google BigQuery, Data Lake o flujos de trabajo de machine learning personalizados.
- Para el procesamiento basado en eventos: Publica logs en un tema Pub/Sub para que Google Cloud Functions, Cloud Run Functions y los trabajos de Dataflow puedan llevar a cabo acciones en tiempo real basadas en datos de logs.

## Requisitos previos

Antes de configurar el destino, necesitas lo siguiente:

- Suscripción Pub/Sub: Crea un tema Pub/Sub y al menos una suscripción para consumir los mensajes.
- Autenticación: Configura un [método de autenticación estándar de Google Cloud][2]. Estas opciones incluyen:
    - Una clave de cuenta de servicio (archivo JSON)
    - Una identidad de carga de trabajo (Google Kubernetes Engine (GKE))
- Roles IAM:
    - `roles/pubsub.publisher` para publicar eventos.
    - `roles/pubsub.viewer` se recomienda para controles de estado.
        - Si falta el rol, se registra el error `Healthcheck endpoint forbidden` y el worker procede como de costumbre.
    - Para obtener más información, consulta [Roles de Pub/Sub disponibles][3].

### Crear una cuenta de servicio para el worker

Una cuenta de servicio en Google Cloud es un tipo de cuenta utilizada únicamente por aplicaciones o servicios.
- Tiene su propia identidad y credenciales (un archivo de claves JSON).
- Necesitas asignarle roles IAM para que pueda acceder a recursos específicos.
- En este caso, el worker de Observability Pipelines utiliza una cuenta de servicio para autenticar y enviar logs a Pub/Sub en tu nombre.

Para autenticarse utilizando una cuenta de servicio:

1. En la consola de Google Cloud, ve a **IAM y Admin** > **[Service Accounts (Cuentas de servicio)][4]**.
1. Haz clic en **Create a service account** (Crear una cuenta de servicio).
1. Introduce un nombre y haz clic en **Create and Continue** (Crear y continuar).
1. Asignar roles:
    - **Editor Pub/Sub**
    - **Visor Pub/Sub**
1. Haz clic en **Done** (Listo).

#### Métodos de autenticación

Una vez creada la cuenta de servicio con los roles adecuados, configura uno de los siguientes métodos de autenticación:

##### Opción A: Método de identidad de cargas de trabajo (para GKE, recomendado)

1. Vincula la cuenta de servicio a una cuenta de servicio de Kubernetes (KSA).
1. Permite que la cuenta de servicio sea suplantada por esa KSA.
1. Anota la KSA para que GKE sepa qué cuenta de servicio debe utilizar.
1. La autenticación procede entonces del servidor de metadatos de GCP.

##### Opción B: Adjuntar el GSA directamente a una máquina virtual (para Google Compute Engine)

Utiliza este método de autenticación si ejecutas el worker de Observability Pipelines en una máquina virtual de Google Compute Engine (GCE).
- Cuando crees o edites la máquina virtual, especifica la cuenta de servicio de Google en **Identity and API access** > **Service account** (Identidad y acceso API > Cuenta de servicio).

##### Opción C: Ejecutar el servicio como GSA (para Cloud Run o Cloud Functions)

Utiliza este método de autenticación si vas a desplegar el worker como un servicio Cloud Run o Cloud Function.
- En la configuración de despliegue de Cloud Run o Cloud Functions, configura la **cuenta de servicio de ejecución** en la cuenta de servicio de Google que hayas creado.

##### Opción D: Método de clave JSON (cualquier entorno sin vínculos de identidad)

1. Abre la nueva cuenta de servicio y ve a **Keys** > **Add key** > **Create new key** (Claves > Añadir clave > Crear nueva clave).
1. Elige el formato JSON.
1. Guarda el archivo JSON descargado en una ubicación segura.
1. Después de instalar el worker, copia o monta el archivo JSON en `DD_OP_DATA_DIR/config/`.
Puedes hacer referencia a este archivo en el campo **Credentials path** (Ruta de las credenciales) del destino Google Pub/Sub cuando [configures el destino](#set-up-the-destination) en la interfaz de usuario del pipeline.

## Instalación

Configura el destino Google Pub/Sub y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

### Configurar el destino

1. Introduce el nombre del proyecto de destino.
    - Este es el proyecto GCP donde reside tu tema Pub/Sub.
1. Introduce el tema.
    - Este es el tema Pub/Sub en el que se publicarán los logs.
1. En el menú desplegable **Encoding** (Codificación), selecciona si quieres codificar el resultado de tu pipeline en **JSON** o **Mensaje sin procesar**.
    - **JSON**: Los logs están estructurados como JSON (recomendado si las herramientas aguas abajo necesitan datos estructurados).
    - **Sin procesar**: Los logs se envían como cadenas sin procesar (se conserva el formato original).
1. Si tienes un archivo JSON de credenciales, introduce la ruta a tu archivo JSON de credenciales.
    - Si utilizas una cuenta de servicio JSON: introduce la ruta `DD_OP_DATA_DIR/config/<your-service-account>.json`.
    - O configura la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS`.
    - Las credenciales se gestionan automáticamente si se utilizas la [identidad de cargas de trabajo][7] en GKE.

#### Parámetros opcionales

##### Activar TLS

Cambia el interruptor a **Enable TLS** (Activar TLS) si tu organización requiere conexiones seguras con certificados personalizados.
- `Server Certificate Path`: la ruta al archivo del certificado que fue firmado por el archivo raíz de tu autoridad de certificación (CA) en formato DER o PEM (X.509).
- `CA Certificate Path`: la ruta al archivo de certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

##### Opciones de almacenamiento en buffer

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="Destino Google Pub/Sub con valores de ejemplos" style="width:30%;" >}}

### Configurar secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- (Opcional) Identificador de URL de endpoints de Google Pub/Sub:
    - Por defecto, el worker envía datos al endpoint global: `https://pubsub.googleapis.com`.
    - Si tu tema Pub/Sub es específico de una región, configura la URL del endpoint alternativo de Google Pub/Sub con el endpoint regional. Para obtener más información, consulta [Acerca de los endpoints Pub/Sub][1]. Introduce la URL del punto final configurado en tu gestor de secretos.
    - El identificador por defecto es `DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.
- Identificador de frases de contraseña TLS de Google Pub/Sub (cuando TLS está activado):
    - El identificador por defecto es `DESTINATION_GCP_PUBSUB_KEY_PASS`.

[1]: https://docs.cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints

{{% /tab %}}

{{% tab "Environment Variables" %}}

#### Endpoints Pub/Sub alternativos opcionales

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="Página de instalación que muestra el campo de la variable de entorno de Google Pub/Sub" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## Solucionar problemas

Problemas habituales y soluciones:
- Control de estado prohibido
    - Comprueba el rol IAM `roles/pubsub.viewer`.
- Permiso denegado
    - Asegúrate de que la cuenta de servicio tiene `roles/pubsub.publisher`.
- Errores de autenticación
    - Comprueba la ruta JSON de las credenciales o la configuración de cargas de trabajo de GKE.
- Eventos descartados
    - Comprueba las métricas `pipelines.component_discarded_events_total` y `pipelines.buffer_discarded_events_total`.
    - Aumenta el tamaño del buffer o corrige los filtros mal configurados según sea necesario para resolver el problema.
- Latencia elevada
    - Reduce el tamaño del buffer y el tiempo de espera o escala tus workers.
- No llegan logs
    - En la configuración del destino de Google Pub/Sub, comprueba el nombre del tema, el proyecto y el endpoint de Pub/Sub (global o regional).

## Métricas

### Métricas de estado de los workers

Consulta las [métricas de Observability Pipelines][8] para ver una lista completa de métricas de estado disponibles.

### Métricas de componente

{{% observability_pipelines/metrics/component %}}

### Métricas de buffer (cuando está activado)

{{% observability_pipelines/metrics/buffer/destinations %}}

#### Métricas de buffer obsoletas

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta el [procesamiento de eventos en lotes][6] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 1,000          | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /es/observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/