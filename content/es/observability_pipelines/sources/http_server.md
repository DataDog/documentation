---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente del servidor HTTP
---

{{< product-availability >}}

Utiliza la fuente del servidor HTTP/S de Observability Pipelines para recopilar logs HTTP del cliente. Selecciona y configura esta fuente cuando [configures un pipeline][1].

También puedes [enviar logs de AWS con el Datadog Lambda Forwarder a Observability Pipelines](#send-aws-vended-log-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Requisitos previos

{{% observability_pipelines/prerequisites/http_server %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información corresponde a la configuración de la fuente en la interfaz de usuario del pipeline.

Para configurar tu fuente de servidor HTTP/S, introduce lo siguiente:

<div class="alert alert-danger">Introduce únicamente los identificadores de la dirección del servidor HTTP y, si procede, el nombre de usuario y la contraseña para la autorización simple (también conocida como básica) y la contraseña de clave TLS. <b>No</b> introduzcas los valores reales.</div>

1. Introduce el identificador para tu dirección de servidor HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
    - **Nota**: Introduce solo el identificador de la dirección. No introduzcas la dirección real.
1. Selecciona tu estrategia de autorización. Si has seleccionado **Simple**:
    - Introduce los identificadores para tu nombre de usuario y contraseña del servidor HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
1. Selecciona el descodificador que deseas utilizar en los mensajes HTTP. Tus logs de cliente HTTP deben tener este formato. **Nota**: Si seleccionas la decodificación `bytes`, el log sin formato se almacena en el campo `message`.

### Ajustes opcionales

Alterna al interruptor para **Enable TLS** (Activar TLS). Si activas TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][2] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos legible por el grupo o usuario.
- Introduce el identificador para tu contraseña de clave del servidor HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
- `Server Certificate Path`: la ruta al archivo del certificado que ha sido firmado por el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `CA Certificate Path`: la ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS #8).

## Establecer secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Identificador de la dirección del servidor HTTP:
    - Hace referencia a la dirección del socket, como `0.0.0.0:9997`, en la que el worker de Observability Pipelines escucha los logs del cliente HTTP.
    - El identificador por defecto es `SOURCE_HTTP_SERVER_ADDRESS`.
- Identificador de frase de contraseña TLS del servidor HTTP (cuando TLS está activado):
    - El identificador por defecto es `SOURCE_HTTP_SERVER_KEY_PASS`.
- Si utilizas la autenticación simple:
    - Identificador del nombre de usuario del servidor HTTP:
        - El identificador por defecto es `SOURCE_HTTP_SERVER_USERNAME`.
    - Identificador de contraseña del servidor HTTP:
        - El identificador por defecto es `SOURCE_HTTP_SERVER_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Enviar logs de AWS con el Datadog Lambda Forwarder a Observability Pipelines

Para enviar logs de AWS a Observability Pipelines con la fuente del servidor HTTP/S:

- [Configura un pipeline con la fuente del servidor HTTP/S](#set-up-a-pipeline).
- [Despliega el Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Nota**: Esto está disponible para las versiones del worker 2.51 o posteriores.

### Establecer un pipeline

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Despliegue del Datadog Lambda Forwarder

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/