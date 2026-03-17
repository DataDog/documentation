---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: métricas
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Destino del cliente HTTP
---

{{< product-availability >}}

## Información general

Utiliza el destino de cliente HTTP de Observability Pipelines para enviar logs a un cliente HTTP, como una plataforma de registro o SIEM.

## Configurar el destino

Configura el destino de cliente de HTTP y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

<div class="alert alert-danger">Introduce únicamente los identificadores del URI del cliente HTTP y, si procede, el nombre de usuario y la contraseña para la autorización básica. <b>No</b> introduzcas los valores reales.</div>

1. Introduce el identificador para tu URI de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
1. Selecciona tu estrategia de autorización (**Ninguna**, **Básica** o **Portador**). Si has seleccionado:
    - **Básica**:
        - Introduce el identificador para tu nombre de usuario de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
        - Introduce el identificador para tu contraseña de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
    - **Portador**:
        - Introduce el identificador para tu token de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
1. JSON es el único codificador disponible.

### Ajustes opcionales

#### Activar la compresión

Cambia el interruptor a **Enable Compression** (Activar compresión). Si está activado:
1. GZIP es el único algoritmo de compresión disponible.
1. Selecciona el nivel de compresión que deseas utilizar.

#### Activar TLS

Active el interruptor para habilitar TLS. Si habilitas TLS, se requieren los siguientes archivos de certificado y clave:
- Introduce el identificador para tu contraseña de clave de cliente HTTP. Si lo dejas en blanco, se utilizará el [predeterminado](#set-secrets).
    - **Nota**: Introduce únicamente el identificador de la contraseña de clave. No introduzcas la contraseña real.
- `Server Certificate Path`: la ruta al archivo del certificado que ha sido firmado por el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `CA Certificate Path`: la ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

#### Opciones de almacenamiento en búfer

Activa el interruptor para activar **Buffering Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
- Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
- Si está activado:
    1. Selecciona el tipo de búfer que desees configurar (**Memory** (Memoria) o **Disk** (Disco)).
    1. Introduce el tamaño del búfer y selecciona la unidad.

## Configurar secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Identificador del endpoint de URI del cliente HTTP:
    - El identificador por defecto es `DESTINATION_HTTP_CLIENT_URI`.
- Identificador de frase de contraseña TLS de cliente HTTP (cuando TLS está activado):
    - El identificador por defecto es `DESTINATION_HTTP_CLIENT_KEY_PASS`.
- Si utilizas la autenticación básica:
    - Identificador del nombre de usuario del cliente HTTP:
        - El identificador por defecto es `DESTINATION_HTTP_CLIENT_USERNAME`.
    - Identificador de contraseña del cliente HTTP:
        - El identificador por defecto es `DESTINATION_HTTP_CLIENT_PASSWORD`.
- Si utilizas la autenticación del portador:
    - Identificador de token de portador de cliente HTTP:
        - El identificador por defecto es `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se vacía cuando se produce una de estas condiciones. Consulta [lote de eventos][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 1,000          | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching