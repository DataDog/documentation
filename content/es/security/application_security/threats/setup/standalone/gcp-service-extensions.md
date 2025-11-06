---
code_lang: gcp-service-extensions
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions
  tag: Código fuente
  text: Código fuente de la extensión del servicio de App and API Protection
- link: https://cloud.google.com/service-extensions/docs/overview
  tag: Documentación
  text: Información general de las extensiones de servicios de Google Cloud
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
title: Activación de App and API Protection para las extensiones de servicio de GCP
type: lenguaje de código múltiple
---

{{< callout url="#" btn_hidden="true" header="Las extensiones de App and API Protection Service está en vista previa" >}}
Para probar la vista previa de las extensiones de App and API Protection Service para GCP, sigue las instrucciones de configuración a continuación.
{{< /callout >}}

Puedes activar App and API Protection (AAP) con extensiones de servicio de GCP dentro de GCP Cloud Load Balancing. La integración de Datadog y las extensiones de servicio de App and API Protection proporciona capacidades de detección y bloqueo de amenazas directamente en tu entorno de GCP.

## Requisitos previos

- El [Datadog Agent ][1] está instalado y configurado para el sistema operativo o contenedor, nube o entorno virtual de tu aplicación.
- La [configuración remota][2] está configurada para permitir el bloqueo de atacantes a través de la interfaz de usuario de Datadog.
- En tu proyecto de GCP, tienes el rol `owner` o `editor` del proyecto, o los roles de IAM de Compute Engine relevantes: `compute.instanceAdmin.v1` (para crear instancias) y `compute.networkAdmin` (para configurar el equilibrio de carga).
- Se configura un proyecto de GCP con un Cloud Load Balancer para tus servicios. El Cloud Load Balancer debe ser uno de los [Application Load Balancers compatibles con Traffic Callouts][3].
- Las APIs Compute Engine y Network Services están activadas:

  ```bash
  gcloud services enable compute.googleapis.com networkservices.googleapis.com
  ```

## Habilitación de la detección de amenazas

Para configurar la extensión de servicio de App and API Protection en tu entorno de GCP, utiliza la consola de Google Cloud o los scripts de Terraform y completa los siguientes pasos.

**Nota:** Google Cloud proporciona guías para crear [un servicio de backend de llamada][4] y [configurar una extensión de servicio como extensión de tráfico][5]. Los siguientes pasos utilizan la misma configuración general, pero incluyen configuraciones personalizadas específicas para la integración de App and API Protection de Datadog.

{{< tabs >}}
{{% tab "Google Cloud Console" %}}

1. Crea una instancia de VM Compute utilizando la [imagen de Docker de extensiones de servicio de Datadog App and API Protection][1].

    Consulta [Configuración](#configuration) para conocer las variables de entorno disponibles cuando configures tu instancia de VM.

    <div class="alert alert-info">
      <strong>Note:</strong> Be sure to update your Firewall rules to allow the Load Balancer and Datadog agent to communicate with the Callout VM instance.
    </div>

2. Añade la máquina virtual a un grupo de instancias no gestionadas.

    Especifica `http:80` y `grpc:443` (o los valores que hayas configurado) para las asignaciones de puertos del grupo de instancias.

3. Crea un servicio de backend con la siguiente configuración:
    - Protocolo: `HTTP2`
    - Nombre del puerto: `grpc`
    - Región: selecciona tu región
    - Número de puerto de check de estado: `80` (o el valor que hayas configurado)

4. Añade el grupo de instancias con la VM de extensión de servicio como backend a este servicio de backend.

5. Configura la llamada de Traffic Service Extension:
    1. En la consola de Google Cloud, ve a **Extensiones de servicios** y crea una nueva extensión de servicio.
    2. Selecciona el tipo de balanceador de carga.
    3. Selecciona `Traffic extensions` como tipo.
    4. Selecciona tus reglas de reenvío.
  <br><br>

6. Crear una cadena de extensión

    1. Para enviar todo el tráfico a la extensión, inserta `true` en la **Condición de coincidencia**.
    2. Para **Tipo de capacidad de programación**, selecciona `Callouts`.
    3. Selecciona el servicio de backend que creaste en el paso anterior.
    4. Selecciona todos los **eventos** de la lista en los que deseas que App and API Protection ejecute la detección (encabezados de solicitud y encabezados de respuesta son **obligatorios**).

</br>

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

[1]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
{{% /tab %}}

{{% tab "Terraform" %}}

Puedes utilizar Terraform para automatizar el despliegue de la extensión de servicio de GCP de App and API Protection. Esto simplifica el proceso de configuración de la extensión de servicio para que funcione con tu equilibrador de carga existente.

### Requisitos previos para el despliegue de Terraform

- [Terraform][1] instalado en tu máquina local (versión 1.0.0 o posterior)
- Credenciales de GCP con los permisos adecuados
- Una clave de API de Datadog (utilizada para configurar el Datadog Agent)
- Un GCP Cloud Load Balancer existente para tu aplicación

### Información general de la infraestructura

El despliegue de Terraform creará los siguientes componentes:
- Una VM del Datadog Agent para recopilar trazas con eventos de seguridad
- Una VM que ejecuta la llamada de extensión de servicio de Datadog en un contenedor
- Una regla de firewall que permite la comunicación entre la extensión y el Agent
- Un grupo de instancias no gestionado que contiene la máquina virtual de extensión de servicios
- Un servicio de backend configurado para HTTP/2 con checks de estado
- Una extensión de servicio conectada a tu equilibrador de carga existente

### Pasos de despliegue

El despliegue de la extensión de servicio de App and API Protection requiere varios componentes que funcionan juntos. Vamos a crear un módulo de Terraform que encapsula todos estos componentes, haciendo que el proceso de despliegue sea repetible y más fácil de mantener.

1. Crea un nuevo directorio y los archivos de Terraform necesarios:

    ```bash
    mkdir gcp-aap-service-extension && cd gcp-aap-service-extension
    touch main.tf variables.tf
    ```

2. Añade el siguiente código a tu archivo `main.tf`. Este archivo define todos los componentes de infraestructura necesarios para la extensión de servicio de App and API Protection, incluidas las reglas de red, las instancias de máquina virtual y la configuración del equilibrador de carga:

   ```hcl
   # main.tf

   #----------------------------------------------------------
   # Network Configuration
   #----------------------------------------------------------

   # Firewall rule to allow the Service Extension to communicate with the Datadog Agent
   resource "google_compute_firewall" "aap_se_firewall" {
     name    = "${var.project_prefix}-dd-agent-firewall"
     network = "default"

     allow {
       protocol = "tcp"
       ports    = ["8126"]
     }

     source_tags = ["http-server"]
     target_tags = ["datadog-agent"]
   }

   #----------------------------------------------------------
   # Datadog Agent Configuration
   #----------------------------------------------------------

   # Datadog Agent container configuration
   module "gce-container-datadog-agent" {
     source = "terraform-google-modules/container-vm/google"

     container = {
       image = "public.ecr.aws/datadog/agent:latest"
       env = [
         {
           name = "DD_API_KEY",
           value = var.datadog_agent_api_key,
         },
         {
           name = "DD_ENV",
           value = "dev",
         },
       ]
     }
   }

   # Datadog Agent VM instance that collects traces from the Service Extension
   resource "google_compute_instance" "datadog_agent" {
     name         = "${var.project_prefix}-datadog-agent"
     machine_type = "e2-medium"
     zone         = var.zone

     boot_disk {
       auto_delete = true

       initialize_params {
         image = module.gce-container-datadog-agent.source_image
       }

     }

     network_interface {
       network    = "default"
       subnetwork = var.application_vpc_subnetwork
     }

     metadata = {
       gce-container-declaration = module.gce-container-datadog-agent.metadata_value
       google-logging-enabled    = "true"
     }

     lifecycle {
       create_before_destroy = true
     }

     tags = ["datadog-agent"]
   }

   #----------------------------------------------------------
   # Service Extension Callout Container Configuration
   #----------------------------------------------------------

   # Datadog App and API Protection GCP Service Extension container configuration
   module "gce-container-aap-service-extension" {
     source = "terraform-google-modules/container-vm/google"

     container = {
       image = "ghcr.io/datadog/dd-trace-go/service-extensions-callout:v1.72.1" # Replace with the latest version
       env = [
         {
           name = "DD_AGENT_HOST",
           value = google_compute_instance.datadog_agent.network_interface.0.network_ip,
         }
       ]
     }
   }

   # Service Extension VM instance (callout instance)
   resource "google_compute_instance" "default" {
     name         = "${var.project_prefix}-instance"
     machine_type = "e2-medium"
     zone         = var.zone

     boot_disk {
       auto_delete = true

       initialize_params {
         image = module.gce-container-aap-service-extension.source_image
       }

     }

     network_interface {
       network    = var.application_vpc_network
       subnetwork = var.application_vpc_subnetwork
     }

     metadata = {
       gce-container-declaration = module.gce-container-aap-service-extension.metadata_value
       google-logging-enabled    = "true"
     }

     lifecycle {
       create_before_destroy = true
     }

     # http-server: Allow access on the http server for health checks
     # https-server: Allow access on the 443 port for the AAP Service Extension
     tags = ["http-server", "https-server", "lb-health-check"]
   }

   #----------------------------------------------------------
   # Load Balancer Integration
   #----------------------------------------------------------

   # Unmanaged Instance Group including the App and API Protection Service Extension instance
   resource "google_compute_instance_group" "aap_se_instance_group" {
     name        = "${var.project_prefix}-instance-group"
     description = "Unmanaged instance group for the App and API Protection Service Extension"
     zone        = var.zone

     named_port {
       name = "http"
       port = 80
     }

     named_port {
       name = "grpc"
       port = "443"
     }

     instances = [
       google_compute_instance.default.self_link
     ]
   }

   # Health Check for the Backend Service
   resource "google_compute_health_check" "aap_se_health_check" {
     name                = "${var.project_prefix}-health-check"
     check_interval_sec  = 5
     timeout_sec         = 5
     healthy_threshold   = 2
     unhealthy_threshold = 2

     http_health_check {
       port         = 80
       request_path = "/"
     }
   }

   # Backend Service that points to the Service Extension instance group
   resource "google_compute_backend_service" "se_backend_service" {
     name                  = "${var.project_prefix}-backend-service"
     port_name             = "grpc"
     protocol              = "HTTP2"
     timeout_sec           = 10
     health_checks         = [google_compute_health_check.aap_se_health_check.self_link]
     load_balancing_scheme = "EXTERNAL_MANAGED"

     backend {
       group = google_compute_instance_group.aap_se_instance_group.self_link
     }
   }

   #----------------------------------------------------------
   # GCP Service Extension
   #----------------------------------------------------------

   # GCP Service Extension configuration for traffic interception
   resource "google_network_services_lb_traffic_extension" "default" {
     name        = "${var.project_prefix}-service-extension"
     description = "Datadog App and API Protection Service Extension"
     location    = "global"

     load_balancing_scheme = "EXTERNAL_MANAGED"
     forwarding_rules      = [var.load_balancer_forwarding_rule]

     extension_chains {
       name = "${var.project_prefix}-service-extension-chain"

       match_condition {
         cel_expression = "true" # Match all traffic
       }

       extensions {
         name      = "${var.project_prefix}-service-extension-chain-ext"
         authority = "datadoghq.com"
         service   = google_compute_backend_service.se_backend_service.self_link
         timeout   = "0.5s"
         fail_open = false # If the extension fails, the request is dropped

         # Supported events for the App and API Protection Service Extension
         supported_events = ["REQUEST_HEADERS", "REQUEST_BODY", "RESPONSE_HEADERS", "RESPONSE_BODY"]
       }
     }
   }
   ```


3. Añade el siguiente contenido al archivo `variables.tf`. Este archivo define todas las variables de entrada necesarias para la configuración de Terraform:

   ```hcl
   # variables.tf

   variable "region" {
     description = "The GCP region where resources will be created (e.g., us-central1)"
     type        = string
     validation {
       condition     = length(var.region) > 0
       error_message = "Region cannot be empty."
     }
   }

   variable "zone" {
     description = "The GCP zone where zonal resources will be created (e.g., us-central1-a)"
     type        = string
     validation {
       condition     = length(var.zone) > 0
       error_message = "Zone cannot be empty."
     }
   }

   # Project configuration
   variable "project_prefix" {
     description = "Prefix for the project. All resource names will be prefixed with this value"
     type        = string
     validation {
       condition     = length(var.project_prefix) > 0
       error_message = "Project prefix cannot be empty."
     }
   }

   # Network configuration
   variable "application_vpc_network" {

     description = "Name of the VPC network for the application"
     type        = string
     validation {
       condition     = length(var.application_vpc_network) > 0
       error_message = "VPC network name cannot be empty."
     }
   }

   variable "application_vpc_subnetwork" {

     description = "Name of the VPC subnetwork for the application"
     type        = string
     validation {
       condition     = length(var.application_vpc_subnetwork) > 0
       error_message = "VPC subnetwork name cannot be empty."
     }
   }

   # Authentication and API keys
   variable "datadog_agent_api_key" {
     description = "Datadog API key"
     type        = string
     sensitive   = true
     validation {
       condition     = length(var.datadog_agent_api_key) > 0
       error_message = "Datadog API key cannot be empty."
     }
   }

   # Load balancer configuration
   variable "load_balancer_forwarding_rule" {
     description = "Self link to the forwarding rule for the load balancer"
   }
   ```

4. Incluye el módulo en tu proyecto principal de Terraform. Este ejemplo muestra cómo hacer referencia al módulo creado anteriormente:

   ```hcl
   # main.tf

   module "service_extension" {
     source                        = "./gcp-aap-service-extension"
     zone                          = "us-central1-a"
     region                        = "us-central1"
     project_prefix                = "datadog-aap"
     application_vpc_subnetwork    = "your-subnet-name"
     datadog_agent_api_key         = "your-datadog-api-key"
     load_balancer_forwarding_rule = "projects/your-project/regions/us-central1/forwardingRules/your-lb-rule" # or with a self link on your resource
   }
   ```

5. Despliega la infraestructura ejecutando estos comandos en el directorio donde se encuentran tus archivos de Terraform:

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

### Validación posterior al despliegue

La extensión de servicio inspecciona automáticamente todo el tráfico que pasa por tu equilibrador de carga en busca de amenazas de seguridad.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Vídeo que muestra el explorador de señales y detalles y el explorador de vulnerabilidades y detalles." video="true" >}}

[1]: https://www.terraform.io/
{{% /tab %}}
{{< /tabs >}}

## Configuración

La imagen de Docker de la extensión de servicio de Datadog App and API Protection admite los siguientes ajustes de configuración:

| Variable de entorno                   | Valor por defecto   | Descripción                                                       |
|----------------------------------------|-----------------|-------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | Dirección de escucha del servidor gRPC.                                    |
| `DD_SERVICE_EXTENSION_PORT`            | `443`           | Puerto del servidor gRPC.                                                 |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | Puerto del servidor HTTP para checks de estado.                               |

Configura el contenedor para enviar trazas a tu Datadog Agent utilizando las siguientes variables de entorno:

| Variable de entorno                   | Valor por defecto | Descripción                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Nombre de host donde se ejecuta tu Datadog Agent.                         |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Puerto del Datadog Agent para la recopilación de trazas.                       |

<div class="alert alert-warning">
  <strong>Note:</strong> La integración de las extensiones de servicio de GCP se basa en el Datadog Go Tracer. Sigue el mismo proceso de lanzamiento que el rastreador, y sus imágenes de Docker se etiquetan con la versión del rastreador correspondiente.
</div>

La integración de las extensiones de servicio de GCP utiliza el [Datadog Go Tracer][6] y hereda todas las variables de entorno del rastreador. Encontrarás más opciones de configuración en la [Configuración de la biblioteca de rastreo de Go][7] y [Configuración de la biblioteca de App and API Protection][8].

## Limitaciones

Las extensiones de servicio de GCP tienen las siguientes limitaciones:

* El cuerpo de la solicitud no se inspecciona, independientemente de su tipo de contenido.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://cloud.google.com/service-extensions/docs/lb-extensions-overview#supported-lbs
[4]: https://cloud.google.com/service-extensions/docs/configure-callout-backend-service
[5]: https://cloud.google.com/service-extensions/docs/configure-traffic-extensions
[6]: https://github.com/DataDog/dd-trace-go
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/library_config/go/
[8]: https://docs.datadoghq.com/es/security/application_security/threats/library_configuration/