---
app_id: edgecast-cdn
app_uuid: 2b575f7f-4575-4618-8ebd-f35f7d6a5d22
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: edgecast.request_count
      metadata_path: metadata.csv
      prefix: edgecast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 619
    source_type_name: Edgecast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: edgecast_cdn
integration_id: edgecast-cdn
integration_title: Edgecast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: edgecast_cdn
public_title: Edgecast
short_description: '[Obsoleto] Monitoriza el tráfico de CDN Edgecast con métricas
  de Datadog'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Métricas
  - Oferta::Integración
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Configuración
  description: '[Obsoleto] Monitoriza el tráfico de CDN Edgecast con métricas de Datadog'
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/integrations/edgecast_cdn/
  support: README.md#Soporte
  title: Edgecast
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

**_Aviso crítico_**: La integración de CDN Edgecast está obsoleta debido al cese de servicios de Edgecast.

Edgecast (EdgeCast reds, Inc.) ha cesado sus actividades tras declararse en quiebra.
Esta integración ya no funciona, ya que los servicios subyacentes se han interrumpido.
Se recomienda encarecidamente la migración inmediata a un proveedor de CDN alternativo recomendado.
Algunas alternativas comunes son Cloudflare, Akamai o servicios de Fastly CDN. El cuadro se eliminará el 7 de julio de 2025.

## Configuración

### Configuración

## Datos recopilados

### Métricas

### Eventos

### Checks de servicio

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de soporte de Datadog][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/help