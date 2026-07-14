---
aliases:
- /es/integrations/go_pprof_scraper
app_id: go-pprof-scraper
custom_kind: integración
description: Recopilar perfiles de programas de Go a través del endpoint /debug/pprof
integration_version: 1.0.4
media: []
supported_os:
- linux
- macos
- windows
title: Go pprof scraper
---
## Información general

Este check recopila perfiles de aplicaciones de Go que exponen el endpoint [`/debug/pprof`](https://pkg.go.dev/net/http/pprof).

**NOTA**: Es preferible instrumentar los servicios con la biblioteca cliente de creación de perfiles [dd-trace-go](https://docs.datadoghq.com/profiler/enabling/go/). La biblioteca cliente
ofrece una mejor integración con otros servicios de Datadog, como a través de [zonas cubiertas de código y filtrado de endpoint](https://docs.datadoghq.com/profiler/connect_traces_and_profiles/).
Utiliza esta integración para los servicios cuyo código source (fuente) no controlas.

**NOTA**: El uso de esta integración da lugar a la facturación de hosts bajo el servicio [Continuous Profiler](https://docs.datadoghq.com/profiler/) de Datadog.
Para obtener más información sobre la facturación de Continuous Profiler, consulta nuestra [documentación de facturación](https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/).

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Si utilizas una versión del Agent >= 7.21/6.21, sigue las instrucciones siguientes para instalar el check de `go_pprof_scraper` en tu host. Consulta la guía dedicada del Agent para [instalar integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621) para instalar checks con una [versión del Agent \< v7.21/v6.21](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentearlierversions) o el [Docker Agent ](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=docker):

1. [Descarga e inicia el Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest).

1. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

   ```shell
   datadog-agent integration install -t datadog-go-pprof-scraper==<INTEGRATION_VERSION>
   ```

Encontrarás la última versión en la [Page (página) de la versión de integraciones de Datadog](https://github.com/DataDog/integrations-extras/tags)

**Nota**: Si fuera necesario, antepón `sudo -u dd-agent` al comando de instalación.

### Configuración

1. Edita el archivo `go_pprof_scraper.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Go. Consulta [ejemplo de go_pprof_scraper.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/datadog_checks/go_pprof_scraper/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `go_pprof_scraper` en la sección Checks.

## Datos recopilados

### Métricas

La integración de Go-pprof-scraper no crea ninguna métrica.

### Eventos

La integración de Go-pprof-scraper no incluye ningún evento.

### Checks de servicio

**go_pprof_scraper.can_connect**

Devuelve `CRITICAL` si el check no puede alcanzar el endpoint pprof o si APM no está habilitado, devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).