---
code_lang: envoy
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Código fuente
  text: Código fuente de la integración de Envoy
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Habilitación de AAP para Envoy
type: lenguaje de código múltiple
---

{{< callout url="#" btn_hidden="true" header="AAP para Envoy está en vista previa" >}}
Para probar la vista previa de AAP para Envoy, sigue las instrucciones de configuración a continuación.
{{< /callout >}}

Puedes activar la seguridad de las aplicaciones para el proxy Envoy. La integración de Datadog y Envoy admite la detección y el bloqueo de amenazas.

## Requisitos previos

- El [Datadog Agent ][1] está instalado y configurado para el sistema operativo o contenedor, nube o entorno virtual de tu aplicación.
- [Configura el Agent con configuración remota][2] para bloquear a los atacantes que utilizan la interfaz de usuario de Datadog.

## Habilitación de la detección de amenazas
### Para empezar

La integración de AAP y Envoy utiliza el filtro de procesamiento externo de Envoy.

1. **Configura Envoy** para utilizar el [filtro de procesamiento externo][3].
Por ejemplo:

   ```yaml
   http_filters:
     # ... other filters
     - name: envoy.filters.http.ext_proc
       typed_config:
         "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
         config:
           grpc_service:
             envoy_grpc:
               cluster_name: datadog_ext_proc_cluster
               timeout: 1s

   clusters:
       # ... other clusters
       - name: datadog_ext_proc_cluster
         type: STRICT_DNS
         lb_policy: ROUND_ROBIN
         http2_protocol_options: {}
         transport_socket:
           name: envoy.transport_sockets.tls
           typed_config:
             "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
         load_assignment:
           cluster_name: datadog_ext_proc_cluster
           endpoints:
             - lb_endpoints:
                 - endpoint:
                     address:
                       socket_address:
                         address: Your Datadog image host from step 2
                         port_value: 443
   ```

    **Nota**: Debes sustituir `Your Datadog image host from step 2` en el ejemplo anterior por el host donde se ejecuta la imagen de Docker de Datadog Envoy. A continuación, configura el host.

    Encontrarás más opciones disponibles de configuración en la [documentación del procesador externo de Envoy][4].

2. **Ejecuta un nuevo contenedor con la imagen de Docker de Datadog Envoy.** La imagen está disponible en el [Registro de GitHub de Datadog][5].

   La imagen de Docker expone algunos ajustes específicos para la integración de Envoy:
   | Variable de entorno | Valor predeterminado | Descripción |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST` | `0.0.0.0` | Dirección de escucha del servidor gRPC.                                    |
   | `DD_SERVICE_EXTENSION_PORT` | `443` | Puerto del servidor gRPC.                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80` | Puerto del servidor HTTP para checks de estado.                               |

   Configura el Datadog Agent para recibir trazas de la integración utilizando las siguientes variables de entorno:
   | Variable de entorno | Valor predeterminado | Descripción |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST` | `localhost` | Nombre del host donde se ejecuta tu Datadog Agent.                         |
   | `DD_TRACE_AGENT_PORT` | `8126` | Puerto del Datadog Agent para la recopilación de trazas.                       |

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles, y el explorador de vulnerabilidades y detalles." video="true" >}}

## Integración del rastreador de Datadog Go y Envoy

  <div class="alert alert-warning">
    <strong>Nota:</strong> La integración de AAP y Envoy está construida sobre el rastreador de Datadog Go. Sigue el mismo proceso de versiones que el rastreador, y sus imágenes de Docker están etiquetadas con la versión correspondiente del rastreador.
  </div>

  La integración de Envoy utiliza el [rastreador de Datadog Go][6] y hereda todas las variables de entorno del rastreador. Puedes encontrar más información en [Configuración de la biblioteca de rastreo de Go][7] y [Configuración de la biblioteca de AAP][8].

## Limitaciones

La funcionalidad disponible para la versión de Envoy `1.71.0` tiene las siguientes limitaciones importantes:

* El cuerpo de la solicitud no se inspecciona, independientemente de su tipo de contenido.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ext_proc_filter
[4]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#extensions-filters-http-ext-proc-v3-externalprocessor
[5]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/es/security/application_security/threats/library_configuration/