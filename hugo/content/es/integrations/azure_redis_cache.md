---
categories:
- azure
- caching
- cloud
custom_kind: integración
dependencies: []
description: Rastrea los aciertos y errores de caché, los desalojos, los clientes
  conectados y mucho más.
doc_link: https://docs.datadoghq.com/integrations/azure_redis_cache/
draft: false
git_integration_title: azure_redis_cache
has_logo: true
integration_id: azure-redis-cache
integration_title: Microsoft Azure Redis Cache
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_redis_cache
public_title: Integración de Datadog y Microsoft Azure Redis Cache
short_description: Rastrea los aciertos y errores de caché, los desalojos, los clientes
  conectados y mucho más.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Redis Cache es una caché de datos gestionados para tus aplicaciones de Azure.

Obtén métricas de Azure Redis Cache para:

- Visualizar el rendimiento de tus Redis Caches.
- Correlacionar el rendimiento de tus Redis Caches con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-redis-cache" >}}


### Eventos

La integración Azure Redis Cache no incluye ningún evento.

### Checks de servicios

La integración Azure Redis Cache no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_redis_cache/azure_redis_cache_metadata.csv
[3]: https://docs.datadoghq.com/es/help/