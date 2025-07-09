---
app_id: dns-externo
app_uuid: b41539a6-8222-4d6e-92f9-0a9f8496acdd
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: external_dns.source.endpoints.total
      metadata_path: metadata.csv
      prefix: dns-externo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10075
    source_type_name: DNS externo
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: dns_externo
integration_id: dns-externo
integration_title: DNS externo
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: dns_externo
public_title: DNS externo
short_description: Seguimiento de las métricas de todos tus DNS externos con Datadog
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento de las métricas de todos tus DNS externos con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: DNS externo
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas del servicio DNS externo en tiempo real para visualizar y monitorizar métricas de DNS recopiladas por medio del complemento DNS externo Prometheus de Kubernetes.

Para obtener más información sobre el DNS externo, consulta el [repositorio de Github][1].

## Configuración

### Instalación

El check del DNS externo está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

Edita el archivo `external_dns.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][3], de modo que apunte hacia tu servidor y puerto, y para configurar los archivos maestros para la monitorización. Consulta el [external_dns.d/conf.yaml de ejemplo][4] para conocer todas las opciones de configuración disponibles.

#### Usar la detección de servicios

Si estás utilizando un pod del Datadog Agent por cada nodo de worker Kubernetes, utiliza estas anotaciones de ejemplo en tu pod de dns-externo para recuperar los datos automáticamente:

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- La etiqueta (tag) `externaldns-pod` realiza un seguimiento de la IP del pod del DNS de destino. Las demás etiquetas están relacionadas con el Datadog Agent que sondea la información utilizando la detección automática.
- Las anotaciones de Autodiscovery se realizan en el pod. Para el despliegue, añade las anotaciones a los metadatos de la especificación de la plantilla.

### Validación

[Ejecuta el subcomando de `status` del Agent][5] y busca `external_dns` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "external_dns" >}}


### Eventos

El check del DNS externo no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "external_dns" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/es/help/
