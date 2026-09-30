---
aliases:
- /es/security/application_security/threats/setup/threat_detection/envoy
- /es/security/application_security/threats_detection/envoy
- /es/security/application_security/setup/threat_detection/envoy
- /es/security/application_security/setup/standalone/envoy
code_lang: envoy
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Código fuente
  text: Código fuente de la integración de Envoy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
title: Habilitación de App y API Protection para Envoy
---
Puede habilitar App y API Protection para el proxy Envoy. La integración de Datadog Envoy cuenta con soporte para la detección y el bloqueo de amenazas.

## Requisitos previos {#prerequisites}

- El [Datadog Agent][1] está instalado y configurado para el sistema operativo o contenedor, la nube o el entorno virtual de su aplicación.
- [Configure el Agent con Remote Configuration][2] para bloquear a los atacantes mediante la interfaz de usuario de Datadog.

## Habilitación de la detección de amenazas {#enabling-threat-detection}
### Comience {#get-started}

La integración de App y API Protection para Envoy utiliza el filtro de procesamiento externo de Envoy.

1. Implemente un nuevo contenedor con la imagen de Docker del Datadog External Processor. La imagen está disponible en el [Datadog GitHub Registry][5].

   Este servicio es un servidor gRPC con el que Envoy se comunica para que App and API Protection analice las solicitudes y respuestas.

   El Datadog External Processor expone algunos ajustes:
   | Variable de entorno                      | Valor predeterminado       | Descripción                                                                                                                              |
   |-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | Dirección de escucha del servidor gRPC.                                                                                                           |
   | `DD_SERVICE_EXTENSION_PORT`               | `443`               | Puerto del servidor gRPC.                                                                                                                        |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | Puerto del servidor HTTP para comprobaciones de estado.                                                                                                      |
   | `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Tamaño máximo de los cuerpos que se procesarán en bytes. Si se establece en `0`, los cuerpos no se procesan. El valor recomendado es `10000000` (10 MB). (Para habilitar completamente el procesamiento de cuerpos, también se debe configurar la opción `allow_mode_override` en la configuración del filtro de procesamiento externo) |
   | `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Habilite el análisis asíncrono. Esto también deshabilita las capacidades de bloqueo. (Para habilitar completamente el modo de observabilidad, esta opción también debe configurarse en la configuración del filtro de procesamiento externo) |
   | `DD_SERVICE`                              | `serviceextensions` | Nombre del servicio que se muestra en la interfaz de usuario de Datadog.                                                                                                    |

   Configure el Datadog Agent para recibir trazas del procesador externo mediante las siguientes variables de entorno:

   | Variable de entorno                   | Valor predeterminado | Descripción                                                                      |
   |----------------------------------------|---------------|----------------------------------------------------------------------------------|
   | `DD_AGENT_HOST`                        | `localhost`   | Nombre de host o IP de su Datadog Agent.                                            |
   | `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas.                                  |

2. Actualice su configuración de Envoy para añadir el [filtro de procesamiento externo][3] a su `http_filters` lista, y defina el clúster gRPC correspondiente en su `clusters` sección. Por ejemplo:

#### Sección de filtros HTTP

   ```yaml
   http_filters:
     # This filter should be the first filter in the filter chain
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         grpc_service:
           envoy_grpc:
             cluster_name: datadog_aap_ext_proc_cluster

           ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
           initial_metadata:
             - key: x-datadog-envoy-integration
               value: '1'

           ## A timeout configuration for the grpc connection exist but is not useful in our case.
           ## This timeout is for all the request lifetime. A timeout on the route is preferred.
           #timeout: 0s

         ## Optional: Enable fail open mode. Default is false.
         ## Normally, if the external processor fails or times out, the filter fails and Envoy
         ## returns a 5xx error to the downstream client. Setting this to true allows requests
         ## to continue without error if a failure occurs.
         failure_mode_allow: true # It won't cause 5xx error if an error occurs.

         ## Mandatory: Only enable the request and response header modes.
         ## If you want to enable body processing, please see the section below.
         processing_mode:
           request_header_mode: SEND
           response_header_mode: SEND

         ## Optional for headers analysis only but **mandatory** for body processing.
         ## The external processor can dynamically override the processing mode as needed instructing
         ## Envoy to forward request and response bodies to the external processor. Body processing is
         ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
         allow_mode_override: true

         ## Optional: Set a timeout by processing message. Default is 200ms.
         ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
         ## with body processing enabled.
         ## Note: This timeout also includes the data communication between Envoy and the external processor.
         ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
         ## the additional possible processing time. Larger payloads will require a longer timeout. 
         #message_timeout: 200ms

         ## Optional: Enable asynchronous mode analysis. Default is false.
         ## This mode will disable all blocking capabilities. The external processor should also be
         ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
         ## Beware, there is no flow control implemented in Envoy
         ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
         #observability_mode: true
         ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
         ## timeout starts when the http request is finished, to let the External Processor
         ## process all processing messages. Default is 5s.
         #deferred_close_timeout: 5s

     # ... other filters
   ```

#### Sección de clústeres

   ```yaml
   clusters:
       # ... other clusters
       - name: datadog_aap_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
             sni: "localhost"
         load_assignment:
           cluster_name: datadog_aap_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: 12.0.0.1 # Replace with the host address of the Datadog External Processor docker image (configured in the next step)
                         port_value: 443
   ```

   **Nota**: Lea atentamente la configuración de ejemplo proporcionada y adáptela para que coincida con su infraestructura y entorno. Puede encontrar más opciones de configuración disponibles en la [documentación del procesador externo de Envoy][4].

3. Validación.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video que muestra Signals explorer y detalles, y Vulnerabilities explorer y detalles." video="true" >}}

## Integración de Datadog Go Tracer y Envoy {#datadog-go-tracer-and-envoy-integration}

El procesador externo está construido sobre el [Datadog Go Tracer][6] y hereda todas las variables de entorno del trazador. Consulte [Configuración del SDK de Go][7] y [Configuración de la biblioteca de protección de aplicaciones y API][8].

<div class="alert alert-info">
  <strong>Nota:</strong> Dado que el procesador externo de Datadog está construido sobre el Datadog Go Tracer, generalmente sigue el mismo proceso de lanzamiento que el trazador, y sus imágenes de Docker están etiquetadas con la versión del trazador correspondiente (por ejemplo, <code>v2.2.2</code>). En algunos casos, es posible que se publiquen versiones de lanzamiento anticipado entre los lanzamientos oficiales del trazador, y estas imágenes están etiquetadas con un sufijo como <code>-docker.1</code>.
</div>

## Limitaciones {#limitations}

La integración de Envoy tiene las siguientes limitaciones:

* La inspección de los cuerpos de solicitud y respuesta es compatible cuando se utiliza la versión de imagen de Datadog External Processor `v2.2.2` o posterior.

Para obtener detalles adicionales sobre las compatibilidades de la integración de Envoy, consulte la [página de compatibilidad de la integración de Envoy][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /es/tracing/guide/remote_config
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: /es/tracing/trace_collection/library_config/go/
[8]: /es/security/application_security/policies/library_configuration/
[9]: /es/security/application_security/setup/compatibility/envoy