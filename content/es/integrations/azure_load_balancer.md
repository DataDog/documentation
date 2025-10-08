---
aliases:
- /es/integrations/azure_loadbalancer
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Load Balancer.
doc_link: https://docs.datadoghq.com/integrations/azure_load_balancer/
draft: false
git_integration_title: azure_load_balancer
has_logo: true
integration_id: azure-load-balancer
integration_title: Microsoft Azure Load Balancer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_load_balancer
public_title: Integración de Datadog y Microsoft Azure Load Balancer
short_description: Rastrea las métricas clave de Azure Load Balancer.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Load Balancer admite escenarios entrantes y salientes, proporciona baja latencia y alto rendimiento, y escala hasta millones de flujos para todas las aplicaciones TCP y UDP.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Load Balancer.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-load-balancer" >}}


### Eventos

La integración Azure Load Balancer no incluye eventos.

### Checks de servicios

La integración Azure Load Balancer no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/es/help/