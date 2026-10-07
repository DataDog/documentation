---
app_id: terraform
app_uuid: 05198ed5-6fe5-417b-8711-e124718e9715
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10153
    source_type_name: terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuración y despliegue
- herramientas para desarrolladores
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/terraform/README.md
display_on_public_website: true
draft: false
git_integration_title: terraform
integration_id: terraform
integration_title: Terraform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: terraform
public_title: Terraform
short_description: Gestionar tu cuenta de Datadog con Terraform
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Herramientas para desarrolladores
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Gestionar tu cuenta de Datadog con Terraform
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Terraform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

El proveedor Terraform Datadog te permite interactuar con la API Datadog a través de una configuración Terraform. Con esta configuración puedes gestionar tus recursos Datadog, como dashboards, monitores, configuraciones de logs, etc.

## Configuración

### Instalación

El proveedor Terraform Datadog está disponible a través del [Registro de Terraform][1].

### Configuración

1. [Instala Terraform][2].
2. Crea un directorio para contener los archivos de configuración de Terraform, por ejemplo: `terraform_config/`.
3. Crea un archivo `main.tf` en el directorio `terraform_config/` con el siguiente contenido:
    ```
    terraform {
      required_providers {
        datadog = {
          source = "DataDog/datadog"
        }
      }
    }

    # Configure the Datadog provider
    provider "datadog" {
      api_key = var.datadog_api_key
      app_key = var.datadog_app_key
    }
    ```

    **Nota**: Si no utilizas el sitio Datadog US1, debes configurar el [parámetro opcional][3] `api_url` con tu [sitio Datadog][4]. Asegúrate de que el selector del sitio de la documentación a la derecha de la página está configurado con tu sitio Datadog correcto y luego utiliza la siguiente URL como valor del parámetro `api_url`:


    ```
    https://api.{{< region-param key="dd_site" code="true" >}}/
    ```


4. Ejecuta `terraform init`. Esto inicializa el directorio que se va a utilizar con Terraform y extrae el proveedor Datadog.
5. Crea cualquier archivo `.tf` en el directorio `terraform_config/` y comienza a crear recursos Datadog. 

## Crear un monitor

Este ejemplo muestra un archivo `monitor.tf` que crea un [monitor de procesos en directo][5].

    ```
    # monitor.tf
    resource "datadog_monitor" "process_alert_example" {
      name    = "Process Alert Monitor"
      type    = "process alert"
      message = "Multiple Java processes running on example-tag"
      query   = "processes('java').over('example-tag').rollup('count').last('10m') > 1"
      monitor_thresholds {
        critical          = 1.0
        critical_recovery = 0.0
      }

      notify_no_data    = false
      renotify_interval = 60
    }
    ```

Ejecuta `terraform apply` para crear este monitor en tu cuenta de Datadog.

## Enviar eventos a Datadog

Al instalar `datadogpy`, tienes acceso a la herramienta de línea de comandos Dogwrap, que puedes utilizar para envolver cualquier comando Terraform y vincularlo a un evento personalizado.

Instala `datadogpy`:
  ```
  pip install datadog
  ```

Para obtener más información, consulta la [biblioteca Python Datadog][6].

Envía un evento `terraform apply`:

  ```
  dogwrap -n "terraform apply" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform apply -no-color"
  ```

Envíe un evento `terraform destroy`:

  ```
  dogwrap -n "terraform destroy" -k $DD_API_KEY --submit_mode all --tags="source:terraform" "terraform destroy -no-color"
  ```

## Datos recopilados

### Métricas

Terraform no incluye métricas.

### Checks de servicio

Terraform no incluye checks de servicio.

### Eventos

Terraform no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs#optional
[4]: https://docs.datadoghq.com/es/getting_started/site/
[5]: https://docs.datadoghq.com/es/monitors/types/process/
[6]: https://github.com/DataDog/datadogpy
[7]: https://docs.datadoghq.com/es/help/