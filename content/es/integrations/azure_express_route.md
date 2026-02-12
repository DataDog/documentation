---
aliases:
- /es/integrations/azure_expressroute
categories:
- azure
- nube
- network
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure ExpressRoute.
doc_link: https://docs.datadoghq.com/integrations/azure_express_route/
draft: false
git_integration_title: azure_express_route
has_logo: true
integration_id: azure-expressroute
integration_title: Microsoft Azure ExpressRoute
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_express_route
public_title: Integración de Datadog y Microsoft Azure ExpressRoute
short_description: Rastrea las métricas principales de Azure ExpressRoute.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Utiliza el servicio Azure ExpressRoute para extender tus redes locales a la nube de Microsoft a través de una conexión privada facilitada por un proveedor de conectividad.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure ExpressRoute.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-expressroute" }}


### Eventos

La integración Azure ExpressRoute no incluye eventos.

### Checks de servicio

La integración Azure ExpressRoute no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/es/help/