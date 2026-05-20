---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Fuente de clientes HTTP
---

{{< product-availability >}}

Utiliza la fuente de clientes HTTP/S de Observability Pipelines para extraer logs del servidor HTTP/S ascendente. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/http_client %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información corresponde a la configuración de la fuente en la interfaz de usuario del pipeline.

Para configurar tu fuente de cliente HTTP/S:


<div class="alert alert-danger">Introduce únicamente los identificadores para la URL del endpoint del cliente HTTP y, si procede, los secretos de tu estrategia de autorización. <b>No</b> introduzcas los valores reales.</div>

1. Introduce el identificador para tu URL de endpoint de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
1. Selecciona tu estrategia de autorización. Si has seleccionado:
   - **Básico**:
      - Introduce el identificador para tu nombre de usuario de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
      - Introduce el identificador para tu contraseña de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
   - **Portador**: introduce el identificador para tu token de portador. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
1. Selecciona el decodificador que deseas utilizar en los mensajes HTTP. Los logs extraídos de la fuente HTTP debe estar en este formato.

### Ajustes opcionales

#### Activar TLS

Alterna al interruptor para **Enable TLS** (Activar TLS). Si activas TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][2] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos legible por el grupo o usuario.
   - Introduce el identificador para tu contraseña de clave de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
         - **Nota**: Introduce únicamente el identificador de la contraseña de clave. No introduzcas la contraseña de clave real.
   - `Server Certificate Path`: la ruta al archivo del certificado que ha sido firmado por tu archivo raíz de autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `CA Certificate Path`: la ruta al archivo de certificado que es tu archivo raíz de autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

#### Ajustes de extracción

- Introduce el intervalo entre extracciones.
   - Tu servidor HTTP debe ser capaz de gestionar solicitudes GET en este intervalo.
   - Dado que las solicitudes se ejecutan simultáneamente, si una extracción tarda más que el intervalo dado, se inicia una nueva extracción, lo que puede consumir recursos adicionales. Establece el tiempo de espera en un valor inferior al intervalo de extracción para evitar que esto ocurra.
- Introduce el tiempo de espera para cada solicitud de extracción.

## Establecer secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Identificador de URL del endpoint del cliente HTTP:
    - Hace referencia al endpoint desde el que el worker de Observability Pipelines recopila los eventos de log.
    - El identificador por defecto es `SOURCE_HTTP_CLIENT_ENDPOINT_URL`.
- Identificador de frase de contraseña TLS de cliente HTTP (cuando TLS está activado):
    - El identificador por defecto es `SOURCE_HTTP_CLIENT_KEY_PASS`.
- Si utilizas la autenticación básica:
    - Identificador del nombre de usuario del cliente HTTP:
        - El identificador por defecto es `SOURCE_HTTP_CLIENT_USERNAME`.
    - Identificador de contraseña del cliente HTTP:
        - El identificador por defecto es `SOURCE_HTTP_CLIENT_PASSWORD`.
- Si utilizas la autenticación del portador:
    - Identificador de token de portador de cliente HTTP:
        - El identificador por defecto es `SOURCE_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/