---
app_id: go-pprof-scraper
app_uuid: 2b13f6b1-d3ba-4254-93c0-2ceaf783cd85
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10309
    source_type_name: go_pprof_scraper
author:
  homepage: https://www.datadoghq.com
  name: Comunidad
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/README.md
display_on_public_website: true
draft: false
git_integration_title: go_pprof_scraper
integration_id: go-pprof-scraper
integration_title: Go pprof scraper
integration_version: 1.0.4
is_public: true
manifest_version: 2.0.0
name: go_pprof_scraper
public_title: Go pprof scraper
short_description: Recopilar perfiles de programas de Go a través del endpoint /debug/pprof
supported_os:
- linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilar perfiles de programas de Go a través del endpoint /debug/pprof
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Go pprof scraper
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Este check recopila perfiles de aplicaciones Go que exponen el endpoint [`/debug/pprof`][1].

**NOTA**: Es preferible instrumentar servicios con la librería de clientes de creación de perfiles [dd-trace-go][2]. La librería de clientes
ofrece una mejor integración con otros servicios de Datadog, como por ejemplo a través de [zonas de código y filtrado del endpoint][3].
Utiliza esta integración para servicios cuyo código fuente no controles.

**NOTA**: El uso de esta integración da como resultado la facturación para hosts en el servicio de [Continuous Profiler][4] de Datadog.
Para obtener más información sobre la facturación de Continuous Profiler, consulta nuestra [documentación de facturación][5].

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos de contenedores, consulta las [plantillas de integración de Autodiscovery][6] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Si utilizas una versión del Agent >= 7.21/6.21, sigue las instrucciones siguientes para instalar el check de `go_pprof_scraper` en tu host. Consulta la guía dedicada del Agent para [instalar las integraciones comunitarias][7] para instalar checks con un [Agent versión < v7.21/v6.21][8] o el [Docker Agent][9]:

1. [Descarga e inicia el Datadog Agent][10].
2. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

   ```shell
   datadog-agent integration install -t datadog-go-pprof-scraper==<INTEGRATION_VERSION>
   ```
  Puedes encontrar la última versión en la [página de versiones de integraciones de Datadog][11]

   **Nota**: Si fuera necesario, antepón `sudo -u dd-agent` al comando de instalación.

### Configuración

1. Edita el archivo `go_pprof_scraper.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Go. Consulta el [ejemplo de go_pprof_scraper.d/conf.yaml][12] para obtener todas las opciones disponibles de configuración.

2. [Reinicia el Agent][13].

### Validación

[Ejecuta el subcomando de estado del Agent][14] y busca `go_pprof_scraper` en la sección checks.

## Datos recopilados

### Métricas

La integración de Go-pprof-scraper no crea ninguna métrica.

### Eventos

La integración de Go-pprof-scraper no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "go-pprof-scraper" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][16].


[1]: https://pkg.go.dev/net/http/pprof
[2]: https://docs.datadoghq.com/es/profiler/enabling/go/
[3]: https://docs.datadoghq.com/es/profiler/connect_traces_and_profiles/
[4]: https://docs.datadoghq.com/es/profiler/
[5]: https://docs.datadoghq.com/es/account_management/billing/apm_tracing_profiler/
[6]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=agentv721v621
[8]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=agentearlierversions
[9]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=docker
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: https://github.com/DataDog/integrations-extras/tags
[12]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/datadog_checks/go_pprof_scraper/data/conf.yaml.example
[13]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/assets/service_checks.json
[16]: https://docs.datadoghq.com/es/help/
