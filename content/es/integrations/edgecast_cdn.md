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
custom_kind: integration
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
short_description: Monitorización del tráfico en CDN Edgecast con métricas de Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización del tráfico en CDN Edgecast con métricas de Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Edgecast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

Edgecast es una plataforma de red global que proporciona una red de distribución de contenidos (CDN) y otras soluciones para la computación de frontera, la seguridad de las aplicaciones y la transmisión libre de vídeo. Recopila métricas de Edgecast para monitorizar tu tráfico web por origen.

## Configuración


### Crear cliente de Edgecast 

1. Inicia sesión en tu [cuenta VDMS de Edgecast][1] y ve a la pestaña **Clients** (Clientes).
2. Haz clic en **Create New Client** (Crear nuevo cliente) para abrir el modal Nuevo cliente.
3. Introduce un nombre identificativo único de cliente y haz clic en **Toggle all ec.analytics** (Activar todos los ec.analytics) para permitir que este cliente recopile métricas.
4. Ve a **Settings** (Parámetros) y modifica **JWT Expiration in Seconds* (Expiración de JWT en segundos) a 600.
5. Haz clic en **Save** (Guardar) para guardar este cliente y el valor de los parámetros modificados.

### Configuración

1. Ve a la pestaña de configuración dentro del [cuadro de la integración Edgecast][2] de Datadog.
2. Introduce un nombre identificativo único para este cliente en Datadog. 
3. Pega el ID y el secreto del cliente de Edgecast creado anteriormente.
   * Busca el ID del cliente a continuación del `client_id=`, en la solicitud **Getting an access token** (Obtener token de acceso), en la pestaña **Quick Start** (Inicio rápido) de tu cliente de Edgecast configurado.
   * Busca el secreto del cliente en la pestaña **Client Secrets** (Secretos de clientes) de tu cliente de Edgecast configurado.
4. También puedes añadir etiquetas (tags) personalizadas para asociarlas a todas las métricas recopiladas para esta integración.
   * Las métricas se etiquetan automáticamente con el nombre de Edgecast asociado al origen. 

## Datos recopilados

### Métricas
{{< get-metrics-from-git "edgecast-cdn" >}}


### Eventos

La integración Edgecast no incluye eventos.

### Checks de servicio

La integración Edgecast no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://id.vdms.io
[2]: https://app.datadoghq.com/integrations/edgecast-cdn
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/edgecast_cdn/edgecast_cdn_metadata.csv
[4]: https://docs.datadoghq.com/es/help