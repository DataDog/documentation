---
code_lang: haproxy
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa
  tag: Código fuente
  text: Código fuente de la integración de HAProxy
- link: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
  tag: Imagen del contenedor
  text: Imagen Docker del SPOA HAProxy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Activar App and API Protection para HAProxy
---

{{< callout url="https://www.datadoghq.com/product-preview/haproxy-integration/">}}
App and API Protection para HAProxy está en versión preliminar. Para inscribirte, haz clic en <strong>Solicitar acceso</strong> y rellena el formulario.
{{< /callout >}}

Puedes activar App and API Protection para tus instancias HAProxy. La integración de Datadog HAProxy aprovecha el Stream Processing Offload Engine (SPOE) de HAProxy para inspeccionar y proteger el tráfico y así detectar amenazas en el borde de tu infraestructura.

## Requisitos previos

- El [Datadog Agent][1] está instalado y configurado para el (host, contenedor u orquestador) de tu entorno.
- [Configura el Agent con configuración remota][2] en la interfaz de usuario de Datadog para bloquear a los atacantes.

## Habilitación de la detección de amenazas

### Para empezar

La integración de App and API Protection y HAProxy utiliza el [Stream Processing Offload Engine][3] (SPOE) de HAProxy para llamar al Datadog Stream Processing Offload Agent (SPOA). El SPOA analiza las solicitudes y las respuestas.

Para activar App and API Protection para HAProxy, haz lo siguiente:
1. Despliega el contenedor SPOA HAProxy de Datadog.
2. Actualiza tus archivos de configuración de HAProxy para integrarlos con el SPOA.

### Contenedor SPOA

Despliega la imagen del SPOA HAProxy de Datadog disponible en el [Datadog GitHub Container Registry][4]. El SPOA escucha las conexiones del SPOE desde HAProxy y envía eventos de seguridad a tu Datadog Agent.

Consulta [Configuración](#configuration) para conocer las opciones de configuración disponibles sobre el contenedor SPOA.

### Archivos de configuración de HAProxy

Todos los archivos de configuración necesarios de HAProxy están disponibles en la [carpeta del repositorio][8]. Para obtener información sobre actualizaciones y cambios en la configuración, consulta el [registro de cambios en la configuración][9].

Los siguientes archivos son necesarios para tu configuración:

- `spoe.cfg`: Archivo de configuración del motor SPOE.
- `global-config.cfg`: Líneas de configuración para incluir en tu sección `global`.
- `frontend-config.cfg`: Líneas de configuración para añadir en la parte superior de cada `frontend` que quieras proteger.
- `backend.cfg`: Define el backend SPOA utilizado por el motor SPOE.
- `datadog_aap_blocking_response.lua`: Script Lua para bloquear respuestas.

A continuación se ofrece orientación para configurar cada archivo.

#### spoe.cfg

El archivo `spoe.cfg` se encarga de declarar el agente SPOE y su configuración. Este archivo debe guardarse en disco, por ejemplo en `/usr/local/etc/haproxy/spoe.cfg`. La ubicación de este archivo se indica a través de la variable de entorno `DD_SPOA_SPOA_CONF_FILE`, que se configura en la sección `global`.

Es importante que no se realicen modificaciones personalizadas en este archivo.

#### global-config.cfg

El archivo `global-config.cfg` carga el script Lua requerido y configura las variables necesarias para la integración. Su contenido debe incorporarse a la sección `global` de tu archivo de configuración `HAProxy.cfg`.

Puedes ajustar los valores según sea necesario para tu entorno. Revisa los comentarios del archivo para obtener más información sobre cada parámetro.

#### frontend-config.cfg

El archivo `frontend-config.cfg` adjunta el filtro SPOE a tu frontend. Esta sección debe colocarse en la parte superior de cada sección de `frontend` que quieras proteger, antes de otros filtros y del enrutador.

Esta sección garantiza que:
- Los eventos de solicitud y respuesta se envían al SPOA.
- Las cabeceras de rastreo de Datadog se inyectan cuando corresponde.
- El ayudante Lua se invoca condicionalmente para los bloqueos.

Es importante que no se realicen modificaciones personalizadas en esta parte de la configuración.

#### backend.cfg

El archivo `backend.cfg` define el `spoa-backend` utilizado por el motor SPOE y para las comprobaciones de salud. Esta configuración debe añadirse al final del archivo `HAProxy.cfg`.

Asegúrate de modificar la línea `server spoa1 <host>:<port>` para que haga referencia a tu instancia de contenedor SPOA desplegada.

<div class="alert alert-info">
  <strong>Nota:</strong> Para una alta disponibilidad y redundancia, puedes configurar varios servidores de agentes SPOA añadiendo líneas de <code>servidor</code> adicionales (por ejemplo, <code>server spoa1 ...</code>, <code>server spoa2 ...</code>, etc.). HAProxy balanceará automáticamente la carga y conmutará por error entre estos agentes SPOA, garantizando una protección continua incluso si un agente deja de estar disponible.
</div>

#### datadog_aap_blocking_response.lua

El script `datadog_aap_blocking_response.lua` es responsable de enviar una respuesta de bloqueo personalizada cuando el SPOA ordena a HAProxy que bloquee una solicitud. Este script podría almacenarse en una ubicación como `/etc/haproxy/lua/datadog_aap_blocking_response.lua` y la directiva `lua-load` de la sección `global` debería hacer referencia a esta ruta.

Es importante que no se realicen modificaciones personalizadas en este archivo.

<div class="alert alert-info">
  <strong>Nota:</strong> Este script Lua no se invoca en cada solicitud procesada por HAProxy. Solo se invoca cuando una solicitud está bloqueada por App and API Protection. Este diseño garantiza un rendimiento óptimo al evitar la sobrecarga de ejecutar código Lua para todas las solicitudes.
</div>

### Validación

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Configuración

El contenedor SPOA HAProxy de Datadog admite los siguientes ajustes de configuración:

| Variable de entorno                | Valor por defecto | Descripción                                                                                                   |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | Host en el que escuchan el servidor de salud HTTP y SPOA.                                                         |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | Puerto utilizado por el SPOA que acepta la comunicación con HAProxy.                                                |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | Puerto utilizado por el servidor HTTP para los checks de estado.                                                              |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | Tamaño máximo de los cuerpos a procesar en bytes. Si `0`, los cuerpos no se procesan. Recomendado: `10000000` (10MB). |
| `DD_SERVICE`                        | `spoa`        | Nombre del servicio que aparece en la interfaz de usuario de Datadog.                                                                         |

Configura el SPOA para enviar trazas (traces) a tu Datadog Agent utilizando las siguientes variables de entorno:

| Variable de entorno  | Valor por defecto | Descripción                      |
| --------------------- | ------------- | -------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | Host de un Datadog Agent en ejecución. |
| `DD_TRACE_AGENT_PORT` | `8126`        | Puerto de un Datadog Agent en ejecución. |

### Integración del rastreador Go de Datadog y HAProxy

La integración de HAProxy se basa en el [rastreador Go de Datadog][5] y hereda todas sus variables de entorno. Consulta [Configuración de la biblioteca de rastreo de Go][6] y [Configuración de la biblioteca de App and API Protection][7].

<div class="alert alert-info">
  <strong>Nota:</strong> Como el Datadog SPOA se basa en el rastreador Go de Datadog, generalmente sigue el mismo proceso de versión del rastreador y sus imágenes Docker están etiquetadas con la versión correspondiente del rastreador (por ejemplo, <code>v2.4.0</code>). En algunos casos, pueden publicarse versiones tempranas entre las versiones oficiales del rastreador y estas imágenes se etiquetan con un sufijo como <code>-docker.1</code>.
</div> <br><br>

## Mantener actualizada la configuración

Dado que la integración con el SPOE de HAProxy implica tanto un componente de tiempo de ejecución (la imagen del contenedor SPOA) como la configuración de HAProxy, las actualizaciones pueden requerir cambios en ambos.

La configuración de referencia HAProxy y un registro de cambios asociado están disponibles para ayudarte a monitorizar y realizar un seguimiento de las actualizaciones:
- [Referencia del directorio de configuración de HAProxy][8] (motor SPOE, global, fragmentos frontend/backend, Lua)
- [Registro de cambios de configuración][9]

### Prácticas de actualización recomendadas

- Fija tu imagen SPOA a una versión específica y actualízala intencionadamente tras revisar el registro de cambios de configuración.
- Centraliza la configuración de Datadog para que sea fácilmente actualizable.
- Sigue la configuración de referencia y el registro de cambios, y compare tu configuración con ellos al actualizar.

## Limitaciones

La integración de HAProxy tiene las siguientes limitaciones:

- Actualmente no se admite el modo asíncrono (observabilidad).

Para ver más detalles sobre las compatibilidades de la integración de HAProxy, consulta la [página de compatibilidad de la integración deHAProxy][10].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /es/remote_configuration/
[3]: https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine
[4]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
[5]: https://github.com/DataDog/dd-trace-go
[6]: /es/tracing/trace_collection/library_config/go/
[7]: /es/security/application_security/policies/library_configuration/
[8]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/
[9]: https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md
[10]: /es/security/application_security/setup/compatibility/haproxy