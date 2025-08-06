---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Front Door.
doc_link: https://docs.datadoghq.com/integrations/azure_frontdoor/
draft: false
git_integration_title: azure_frontdoor
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Front Door
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_frontdoor
public_title: Integración de Datadog y Microsoft Azure Front Door
short_description: Rastrea las métricas principales de Azure Front Door.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Front Door es la moderna Content Delivery Network (CDN) en la nube de Microsoft que proporciona acceso rápido, confiable y seguro entre tus usuarios y el contenido web estático y dinámico de tus aplicaciones en todo el mundo.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Front Door.

**Nota**: El nivel Clásico utiliza el espacio de nombres `azure.network_frontdoors.*` como se muestra a continuación. En los niveles Estándar y Premium, las métricas aparecen en el espacio de nombres `azure.cdn_profiles.*`.


## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_frontdoor" >}}


### Eventos

La integración Azure Front Door no incluye eventos.

### Checks de servicio

La integración Azure Front Door no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_frontdoor/azure_frontdoor_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
