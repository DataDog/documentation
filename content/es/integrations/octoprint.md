---
app_id: octoprint
app_uuid: f076efc3-c1c7-4e0a-b0dc-92870d655211
assets:
  dashboards:
    OctoPrint Overview: assets/dashboards/octoprint_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: octoprint.printer_state
      metadata_path: metadata.csv
      prefix: octoprint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10201
    source_type_name: OctoPrint
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: gwaldo@gmail.com
  support_email: gwaldo@gmail.com
categories:
- herramientas de desarrollo
- recopilación de logs
- orquestación
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md
display_on_public_website: true
draft: false
git_integration_title: octoprint
integration_id: octoprint
integration_title: Datadog OctoPrint
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: octoprint
public_title: Datadog OctoPrint
short_description: Monitorizar OctoPrint, una interfaz web para gestionar impresoras
  3D
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar OctoPrint, una interfaz web para gestionar impresoras 3D
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog OctoPrint
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [OctoPrint][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para instalar el check de OctoPrint en tu host ejecutando:

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-octoprint==<VERSION>
```

**Nota**: La dirección `VERSION` figura en la parte superior de esta página.

#### Instalar desde la fuente (opcional)

1. Instala el [kit de herramientas para desarrolladores][3] en cualquier máquina.

2. Ejecuta `ddev release build octoprint` para crear el paquete.

3. [Descarga el Datadog Agent][4].

4. Sube el artefacto de compilación a cualquier host con un Agent y
 ejecuta `datadog-agent integration install -w
 path/to/octoprint/dist/datadog_octoprint*.whl`.

### Configuración

1. Desde la interfaz web de OctoPrint, crea una clave de API para utilizarla con Datadog. Puedes encontrarla en Settings --> Application Keys (Configuración --> Claves de aplicación).

2. Edita el archivo `octoprint.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent. Pega la clave de API de OctoPrint como valor de `octo_api_key`. Consulta el [octoprint.d/conf.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración.

3. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `octoprint` en la sección Checks.

### Logs

Por defecto, esta integración asume que estás utilizando la imagen [OctoPi][8] que está preconfigurada para ejecutar OctoPrint desde Raspberry Pi.

Los logs que recopila por defecto (y su localizaciones por defecto) son:

- Log de la aplicación de OctoPrint: `/home/pi/.octoprint/logs`
- Log de la cámara web de OctoPrint: `/var/log/webcamd.log`
- Log de proxy HA: `/var/log/haproxy.log`

Cualquiera de estos elementos, o todos ellos, pueden cambiarse o eliminarse modificando el archivo `conf.yaml` de la integración.

#### Procesamiento de logs

OctoPrint utiliza su propio formato de log (no un formato de objeto). Para hacer uso de los logs, crea un pipeline de procesamiento de logs con algunas reglas de parseo, por ejemplo:

1. Pipeline principal: "OctoPrint"
    1. Pipeline secundario 1: "OctoPrint Print Job"
        1. Regla del analizador Grok:
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. Pipeline secundario 2: "General OctoPrint Log"
        1. Regla del analizador Grok:
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

Para más información, consulta la [documentación de procesamiento de logs de Datadog][9].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "octoprint" >}}


### Eventos

OctoPrint no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "octoprint" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].


[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/es/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/