---
code_lang: gcp-service-extensions
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Código fuente
  text: Código fuente de la extensión de servicios de ASM
- link: https://cloud.google.com/service-extensions/docs/overview
  tag: Documentación
  text: Información general de las extensiones de servicios de Google Cloud
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Normas predefinidas de Application Security Management
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Application Security Management
title: Activación de ASM para las extensiones de servicios de GCP
type: lenguaje de código múltiple
---

{{< callout url="#" btn_hidden="true" header="ASM Service Extensions is in Preview" >}}
Para probar la vista previa de extensiones de servicios de ASM para GCP, sigue las instrucciones de configuración que se indican a continuación.
{{< /callout >}}

Puedes activar la seguridad de las aplicaciones con extensiones de servicios de GCP en el Balanceo de carga de GCP Cloud. La integración de las extensiones de servicios de Datadog Application Security Management (ASM) es compatible con la detección y el bloqueo de amenazas.

## Requisitos previos

- El [Datadog Agent ][1] está instalado y configurado para el sistema operativo o contenedor, nube o entorno virtual de tu aplicación.
- [Configura el Agent con configuración remota][2] para bloquear a los atacantes que utilizan la interfaz de usuario Datadog.
- En tu proyecto de GCP, comprueba que tengas el rol de `owner` o `editor` del proyecto o los roles correspondientes de Compute Engine IAM: `compute.instanceAdmin.v1` (para crear instancias) y `compute.networkAdmin` (para configurar el balanceo de carga).
- Un proyecto de GCP con un balanceador de carga de la nube configurado con tus servicios. Tu balanceador de carga de la nube debe ser uno de los [Balanceadores de carga de la aplicación compatibles con globos del tráfico][3].
- Asegúrate de que la API de Compute Engine y la API de servicios de red estén activadas:

  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## Habilitación de la detección de amenazas
### Para empezar

En tu proyecto de GCP, se necesitan múltiples pasos para crear completamente una extensión de servicios. Google Cloud proporciona guías para crear [un servicio de backend de globo][4] y [crear una extensión de servicios como una extensión del tráfico][5].

Para integrar una extensión de servicios con ASM, haz lo siguiente:

1. **Crea una nueva instancia de VM Compute** utilizando la imagen de Datadog Servicie Extensions Docker. La imagen está disponible en [GitHub Registry del rastreador de Datadog Go][6].

   La imagen de Docker expone algunos parámetros:
   | Variable de entorno | Valor predeterminado | Descripción |
   |----------------------------------------|-----------------|-------------------------------------------------------------------|
   | `DD_SERVICE_EXTENSION_HOST` | `0.0.0.0` | Dirección de escucha del servidor gRPC.                                    |
   | `DD_SERVICE_EXTENSION_PORT` | `443` | Puerto del servidor gRPC.                                                 |
   | `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80` | Puerto del servidor HTTP para checks de estado.                               |

   Configura el Datadog Agent para recibir trazas (traces) de la integración utilizando las siguientes variables de entorno:
   | Variable de entorno | Valor predeterminado | Descripción |
   |----------------------------------------|---------------|-----------------------------------------------------------------------|
   | `DD_AGENT_HOST` | `localhost` | Nombre del host donde se ejecuta tu Datadog Agent .                         |
   | `DD_TRACE_AGENT_PORT` | `8126` | Puerto de la colección de trazas (traces) del Datadog Agent.                       |

2. **Añade la máquina virtual a un grupo de instancias no gestionadas**.

   Especifica `http:80` y `grpc:443` (o cualquier otro valor configurado previamente) para las asignaciones de puertos del grupo de instancias.

3. **Actualiza el equilibrador de carga creando un servicio de backend y añadiendo un backend.**

   Crea un servicio de backend de globo que utilice el protocolo HTTP/2 y tenga un check de estado HTTP:
   - Protocolo: `HTTP2`
   - Nombre del puerto: `grpc`
   - Región: `us-west1`
   - Número de puertos con check de estado: `80` (o cualquier otro valor configurado previamente)

   1. Añade el grupo de instancias con el servidor de extensión como backend al servicio de backend.

   2. Crea un globo de Extensión de servicio de tráfico.

      1. En la consola de Google Cloud, ve a **Extensiones de servicios** y crea una nueva extensión de servicio.
      2. Selecciona el tipo de balanceador de carga.
      3. Selecciona `Traffic extensions` como tipo.
      4. Selecciona tus reglas de reenvío.  
    </br>
   3. Cuando crees una nueva Cadena de extensiones, haz lo siguiente:

      1. Para enviar todo el tráfico a la extensión, inserta `true` en la **Condición de coincidencia**.
      2. Para **Tipo de capacidad de programación**, selecciona `Callouts`.
      3. Selecciona el servicio de backend que creaste en el paso anterior.
      4. Selecciona todos los **Eventos** de la lista donde deseas que ASM ejecute la detección.</br>
</br>
{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

## Rastreador de Datadog Go y extensiones de servicios de GCP

  <div class="alert alert-warning">
   <strong>Nota:</strong> La integración de las extensiones de servicios de GCP está construida sobre Datadog Go Tracer. Sigue el mismo proceso de versiones que el rastreador y sus imágenes Docker están etiquetadas con la versión correspondiente del rastreador.
  </div>

  La integración de las extensiones de servicios de GCP utiliza el [Datadog Go Tracer][7] y hereda todas las variables de entorno del rastreador. Puedes encontrar más información en [Configuración de la biblioteca de Go Tracing][8] y en [Configuración de la biblioteca de ASM][9].

## Limitaciones

La funcionalidad disponible para la versión `1.71.0` de extensiones de servicios de GCP tiene las siguientes limitaciones importantes:

* El cuerpo de la solicitud no se inspecciona, independientemente de su tipo de contenido.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/go/
[9]: https://docs.datadoghq.com/es/security/application_security/threats/library_configuration/