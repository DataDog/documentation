---
code_lang: haproxy
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa
  tag: Código fuente
  text: Fuente del código de la integración de HAProxy
- link: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
  tag: Imagen de contenedor
  text: Imagen de Docker de HAProxy SPOA
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de la Protección de aplicaciones y API para HAProxy
---
{{< callout url="https://www.datadoghq.com/product-preview/haproxy-integration/">}}
La Protección de aplicaciones y API para HAProxy está en versión preliminar (Preview). Para registrarse, haga clic en <strong>Solicitar acceso</strong> y complete el formulario.
{{< /callout >}}

Puede habilitar la Protección de aplicaciones y API para sus instancias de HAProxy. La integración de Datadog para HAProxy aprovecha el Stream Processing Offload Engine (SPOE) de HAProxy para inspeccionar y proteger el tráfico para la detección de amenazas en el borde de su infraestructura.

## Requisitos previos {#prerequisites}

- El [Datadog Agent][1] está instalado y configurado para su entorno (servidor, contenedor u orquestador).
- [Configure el Agent con Remote Configuration][2] en la Datadog UI para bloquear a los atacantes.

## Habilitación de la detección de amenazas {#enabling-threat-detection}

### Comience {#get-started}

La integración de App and API Protection para HAProxy utiliza el [Stream Processing Offload Engine][3] (SPOE) de HAProxy para llamar a un Stream Processing Offload Agent (SPOA) de Datadog. El SPOA analiza las solicitudes y respuestas.

Para habilitar la Protección de aplicaciones y API para HAProxy, realice lo siguiente:
1. Implemente el contenedor SPOA de Datadog para HAProxy.
2. Actualice sus archivos de configuración de HAProxy para integrarlos con el SPOA

### Contenedor SPOA {#spoa-container}

Implemente la imagen SPOA de Datadog para HAProxy disponible en el [Datadog GitHub Container Registry][4]. El SPOA escucha las conexiones SPOE de HAProxy y envía eventos de seguridad a su Datadog Agent.

Consulte [Configuración](#configuration) para conocer las opciones de configuración disponibles sobre el contenedor SPOA.

### Archivos de configuración de HAProxy {#haproxy-configuration-files}

Todos los archivos de configuración de HAProxy necesarios están disponibles en la [carpeta del repositorio][8]. Para obtener información sobre las actualizaciones y los cambios en la configuración, consulte el [registro de cambios de configuración][9].

Los siguientes archivos son necesarios para su configuración:

- `spoe.cfg`: Archivo de configuración del motor SPOE principal.
- `global-config.cfg`: Líneas de configuración para incluir en su sección `global`.
- `frontend-config.cfg`: Líneas de configuración para agregar en la parte superior de cada `frontend` que desee proteger.
- `backend.cfg`: Define el backend SPOA utilizado por el motor SPOE.
- `datadog_aap_blocking_response.lua`: Script de Lua para bloquear respuestas.

A continuación se proporciona orientación para configurar cada archivo.

#### spoe.cfg {#spoecfg}

El archivo `spoe.cfg` es responsable de declarar el agente SPOE y su configuración. Este archivo debe guardarse en el disco, por ejemplo en `/usr/local/etc/haproxy/spoe.cfg`. La ubicación de este archivo se referencia a través de la variable de entorno `DD_SPOA_SPOA_CONF_FILE`, la cual se configura dentro de la sección `global`.

Es importante que no se realicen modificaciones personalizadas en este archivo.

#### global-config.cfg {#global-configcfg}

El archivo `global-config.cfg` carga el script de Lua requerido y configura las variables necesarias para la integración. Su contenido debe incorporarse en la sección `global` de su archivo de configuración `haproxy.cfg`.

Puede ajustar los valores según sea necesario para su entorno. Revise los comentarios dentro del archivo para obtener más orientación sobre cada configuración.

#### frontend-config.cfg {#frontend-configcfg}

El archivo `frontend-config.cfg` adjunta el filtro SPOE a su frontend. Esta sección debe colocarse en la parte superior de cada sección `frontend` que desee proteger, antes de otros filtros y del enrutador.

Esta sección garantiza que:
- Los eventos de solicitud y respuesta se envían al SPOA
- Los encabezados de rastreo de Datadog se inyectan cuando corresponde
- El asistente Lua se invoca de forma condicional para el bloqueo

Es importante que no se realicen modificaciones personalizadas en esta parte de la configuración.

#### backend.cfg {#backendcfg}

El archivo `backend.cfg` define el `spoa-backend` utilizado por el motor SPOE y para las comprobaciones de estado. Esta configuración debe añadirse cerca del final de su archivo `haproxy.cfg`.

Asegúrese de modificar la línea `server spoa1 <host>:<port>` para que haga referencia a su instancia de contenedor SPOA implementada.

<div class="alert alert-info">
  <strong>Nota:</strong> Para alta disponibilidad y redundancia, puede configurar varios servidores de agente SPOA añadiendo adicionales <code>server</code> líneas (por ejemplo, <code>server spoa1 ...</code>, <code>server spoa2 ...</code>, etc.). HAProxy equilibrará automáticamente la carga y realizará la conmutación por error entre estos agentes SPOA, garantizando una protección continua incluso si un agente deja de estar disponible.
</div>

#### datadog_aap_blocking_response.lua {#datadog-aap-blocking-responselua}

El script `datadog_aap_blocking_response.lua` es responsable de enviar una respuesta de bloqueo personalizada cuando el SPOA indica a HAProxy que bloquee una solicitud. Este script podría almacenarse en una ubicación como `/etc/haproxy/lua/datadog_aap_blocking_response.lua`, y la directiva `lua-load` en la sección `global` debería hacer referencia a esta ruta.

Es importante que no se realicen modificaciones personalizadas en este archivo.

<div class="alert alert-info">
  <strong>Nota:</strong> Este script Lua no se invoca en cada solicitud procesada por HAProxy. Solo se invoca cuando una solicitud es bloqueada por App and API Protection. Este diseño garantiza un rendimiento óptimo al evitar la sobrecarga de ejecutar código Lua para todas las solicitudes.
</div>

### Validación {#validation}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra Signals explorer y detalles, y Vulnerabilities explorer y detalles." video="true" >}}

## Configuración {#configuration}

El contenedor Datadog HAProxy SPOA admite las siguientes configuraciones de ajuste:

| Variable de entorno                | Valor predeterminado | Descripción                                                                                                   |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | Servidor en el que escuchan el SPOA y el servidor de estado HTTP.                                                         |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | Puerto utilizado por el SPOA que acepta la comunicación con HAProxy.                                                |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | Puerto utilizado para el servidor HTTP para las comprobaciones de estado.                                                              |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | Tamaño máximo de los cuerpos a procesar en bytes. Si `0`, los cuerpos no se procesan. Recomendado: `10000000` (10 MB). |
| `DD_SERVICE`                        | `spoa`        | Nombre del servicio que se muestra en la Datadog UI.                                                                         |

Configure el SPOA para enviar trazas a su Datadog Agent utilizando las siguientes variables de entorno:

| Variable de entorno  | Valor predeterminado | Descripción                      |
| --------------------- | ------------- | -------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | Servidor de un Datadog Agent en ejecución. |
| `DD_TRACE_AGENT_PORT` | `8126`        | Puerto de un Datadog Agent en ejecución. |

### Integración de Datadog Go Tracer y HAProxy {#datadog-go-tracer-and-haproxy-integration}

La integración de HAProxy está construida sobre el [Datadog Go Tracer][5] y hereda todas las variables de entorno del rastreador. Consulte [Configuración del SDK de Go][6] y [Configuración de la biblioteca de protección de aplicaciones y API][7].

<div class="alert alert-info">
  <strong>Nota:</strong> Como el SPOA de Datadog está construido sobre el Datadog Go Tracer, generalmente sigue el mismo proceso de lanzamiento que el tracer, y sus imágenes de Docker están etiquetadas con la versión del tracer correspondiente (por ejemplo, <code>v2.4.0</code>). En algunos casos, es posible que se publiquen versiones de lanzamiento anticipado entre los lanzamientos oficiales del trazador, y estas imágenes están etiquetadas con un sufijo como <code>-docker.1</code>.
</div> <br><br>

## Mantener su configuración actualizada {#keeping-your-configuration-up-to-date}

Debido a que la integración SPOE de HAProxy involucra tanto un componente de tiempo de ejecución (la imagen del contenedor SPOA) como la configuración de HAProxy, las actualizaciones pueden requerir cambios en ambos lugares.

La configuración de referencia de HAProxy y un registro de cambios asociado están disponibles para ayudarle a hacer un seguimiento de las actualizaciones:
- [Directorio de configuración de referencia de HAProxy][8] (motor SPOE, global, fragmentos de frontend/backend, Lua)
- [Registro de cambios de configuración][9]

### Prácticas de actualización recomendadas {#recommended-upgrade-practices}

- Fije su imagen de SPOA a una versión específica y actualice de forma intencional después de revisar el registro de cambios de configuración.
- Centralice la configuración de Datadog para que sea fácilmente actualizable.
- Realice un seguimiento de la configuración de referencia y del registro de cambios, y compare su configuración con la configuración de referencia al actualizar.

## Limitaciones {#limitations}

La integración de HAProxy tiene las siguientes limitaciones:

- El modo asíncrono (observabilidad) no es compatible actualmente.

Para obtener detalles adicionales sobre las compatibilidades de la integración de HAProxy, consulte la [página de compatibilidad de la integración de HAProxy][10].

## Lecturas adicionales {#further-reading}

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