---
app_id: octopus-deploy
app_uuid: 821889b0-d4f9-4136-8059-7b7c42e6bd43
assets:
  dashboards:
    Octopus Deploy Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: octopus_deploy.api.can_connect
      metadata_path: metadata.csv
      prefix: octopus_deploy.
    process_signatures:
    - octopus
    - Octopus.Server
    - Octopus.Server.exe
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24277387
    source_type_name: Octopus Deploy
  logs:
    source: octopus_deploy
  monitors:
    Deployment Failed: assets/monitors/deployment_failed.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuración y despliegue
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/octopus_deploy/README.md
display_on_public_website: true
draft: false
git_integration_title: octopus_deploy
integration_id: octopus-deploy
integration_title: Octopus Deploy
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: octopus_deploy
public_title: Octopus Deploy
short_description: Monitoriza el servidor Octopus Deploy.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Categoría::Configuración y despliegue
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Tipo de datos enviados::Logs
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Monitoriza el servidor Octopus Deploy.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Octopus Deploy
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza tus despliegues de [Octopus Deploy][1] a través del Datadog Agent. Realiza un seguimiento de información como el tiempo medio de despliegue por entorno y la tasa de fallos de despliegue de un proyecto.

## Configuración

Sigue los siguientes pasos para instalar y configurar este check en un Agent basado en hosts. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Octopus Deploy está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional.

### Configuración

1. Crea una [clave de API][4] en tu servidor Octopus.

2. Edita el archivo `octopus_deploy.d/conf.yaml` que se encuentra en la carpeta `conf.d/`, en la raíz del directorio de configuración de tu Agent, para empezar a recopilar tus datos de rendimiento de `octopus_deploy`. Para conocer todas las opciones de configuración disponibles, consulta el [ejemplo de configuración][5].

   **Nota**: Limita el número de proyectos para los que recopilas datos configurando **una** de las secciones `spaces`, `project_groups`, o `projects`. Por ejemplo, el siguiente fragmento limita la recopilación a un máximo de 10 proyectos cuyos nombres empiecen por 'test':

   ```
   projects:
       limit: 10
       include:
       - 'test.*'
   ```

3. [Reinicia el Agent][6].

#### Logs

La integración Octopus Deploy recopila dos tipos de logs: logs de despliegue y logs de servidor.

##### Recopilación de logs de despliegue

Los logs de despliegue se recopilan de las tareas de despliegue y son útiles para depurar despliegues fallidos. Para recopilar logs de despliegue:

1. Habilita la recopilación de logs en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `octopus_deploy.d/conf.yaml`. Por ejemplo:

   ```yaml
   logs:
     - type: integration
       source: octopus_deploy
   ```

##### Recopilación de logs de servidor

Los logs de servidor son información de diagnóstico del propio servidor Octopus. Solo pueden ser recopilados cuando el Datadog Agent se ejecuta en la misma máquina que el servidor Octopus. Para recopilar logs de servidor:

1. Habilita la recopilación de logs en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `octopus_deploy.d/conf.yaml`. Por ejemplo:

   ```yaml
   logs:
     - type: file
       path: /OctopusServer/Server/Logs/OctopusServer.txt
       source: octopus_deploy
   ```

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `octopus_deploy` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "octopus_deploy" >}}


### Eventos

La integración Octopus Deploy no incluye eventos.

### Checks de servicio

La integración Octopus Deploy no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].


[1]: https://octopus.com/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key
[5]: https://github.com/DataDog/integrations-core/blob/master/octopus_deploy/datadog_checks/octopus_deploy/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/octopus_deploy/metadata.csv
[9]: https://docs.datadoghq.com/es/help/