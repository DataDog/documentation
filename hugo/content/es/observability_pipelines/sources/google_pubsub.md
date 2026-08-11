---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente Google Pub/Sub
---

{{< product-availability >}}

Utiliza la fuente Google Pub/Sub de Observability Pipelines para extraer logs del sistema de mensajería Google Cloud Pub/Sub. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/google_pubsub %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información corresponde a la configuración de la fuente en la interfaz de usuario del pipeline.

1. Introduce el nombre del proyecto fuente.
1. Si tienes un archivo JSON de credenciales, introduce la ruta a tu archivo JSON de credenciales. El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. También puedes utilizar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta a las credenciales.
    - Si utilizas la [identidad de cargas de trabajo][2] en Google Kubernetes Engine (GKE), se te proporcionará la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS`.
    - El worker utiliza [métodos de autenticación de Google][4] estándar.
1. Introduce el nombre de la suscripción.
1. Selecciona el decodificador que deseas utilizar (Bytes, GELF, JSON, syslog).
1. Opcionalmente, alterna al interruptor para activar TLS. Si activas TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][3] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos legible por el grupo o usuario.
    - `Server Certificate Path`: La ruta al archivo del certificado que ha sido firmado por el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
    - `CA Certificate Path`: La ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
    - `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS #8).

## Configurar secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

No hay identificadores secretos por defecto para esta fuente.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[3]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[4]: https://cloud.google.com/docs/authentication#auth-flowchart