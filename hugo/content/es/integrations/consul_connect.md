---
app_id: consul-connect
app_uuid: 580ac585-9e97-4b4f-ba56-34dba5050e06
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10174
    source_type_name: Consul Connect
  logs:
    source: envoy
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
- recopilación de logs
- rastreo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul_connect/README.md
display_on_public_website: true
draft: false
git_integration_title: consul_connect
integration_id: consul-connect
integration_title: Consul Connect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: consul_connect
public_title: Consul Connect
short_description: Monitoriza los proxies sidecar de Consul Connect Envoy.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Red
  - Categoría::Recopilación de logs
  - Categoría::Contenedores
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza los proxies sidecar de Consul Connect Envoy.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Consul Connect
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Monitoriza tus proxies sidecar de [Consul Connect][1] Envoy con la [integración de Envoy con Datadog][2]. La integración de Consul Connect solo admite [Consul Connect configurado con Envoy][3].

## Configuración

### Instalación

Instala el [Datadog Agent][4] en tus servicios que ejecutan Consul Connect y sigue las instrucciones de [Configuración](#configuration) para tu entorno apropiado.

### Configuración
Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas
1. En Consul Connect, habilita la opción de configuración [`-admin-bind`][1] para configurar el puerto donde se expone la API de administración de Envoy.

2. Habilita la [integración de Envoy][2] para configurar la recopilación de métricas.

##### Recopilación de logs

Sigue las instrucciones del [host de Envoy][3] para configurar la recopilación de logs.

[1]: https://www.consul.io/commands/connect/envoy#admin-bind
[2]: https://docs.datadoghq.com/es/integrations/envoy/?tab=host#metric-collection
[3]: https://docs.datadoghq.com/es/integrations/envoy/?tab=host#log-collection
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

Sigue las [instrucciones en contenedores de Envoy][1] para configurar tu Datadog Agent para Envoy.

##### Recopilación de métricas

1. En Consul Connect, habilita la opción de configuración [`envoy_stats_bind_addr`][2] para garantizar que el endpoint `/stats` esté expuesto en la red pública.

 2. Configura la [integración de Envoy para entornos en contenedores][3] para comenzar a recopilar métricas.

##### Recopilación de logs

Sigue las [instrucciones en contenedores de Envoy][4] para configurar la recopilación de logs.

[1]: https://docs.datadoghq.com/es/integrations/envoy/?tab=containerized#containerized
[2]: https://www.consul.io/docs/connect/proxies/envoy#envoy_stats_bind_addr
[3]: https://docs.datadoghq.com/es/integrations/envoy/?tab=containerized#metric-collection
[4]: https://docs.datadoghq.com/es/integrations/envoy/?tab=containerized#log-collection
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `envoy` en la sección Checks.

## Datos recopilados

### Métricas

Consulta la [documentación de la integración de Envoy][6] para obtener una lista de métricas recopiladas.

### Checks de servicios

Consulta la [documentación de la integración de Envoy][7] para obtener la lista de checks de servicios recopilados.

### Eventos

Consul Connect no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://www.consul.io/docs/connect#connect
[2]: https://docs.datadoghq.com/es/integrations/envoy/
[3]: https://www.consul.io/docs/connect/proxies/envoy#envoy-integration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/es/integrations/envoy/?tab=host#metrics
[7]: https://docs.datadoghq.com/es/integrations/envoy/?tab=host#service-checks
[8]: https://docs.datadoghq.com/es/help/