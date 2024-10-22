---
app_id: rookout
app_uuid: a82a4f89-0690-48cf-bad0-9603fb652f44
assets:
  dashboards:
    rookout_overview: assets/dashboards/rookout_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rookout.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Rookout para Datadog
author:
  homepage: https://rookout.com
  name: Rookout
  sales_email: support@rookout.com
  support_email: support@rookout.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md
display_on_public_website: true
draft: false
git_integration_title: rookout
integration_id: rookout
integration_title: Depuración en directo de Rookout
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rookout
oauth: {}
public_title: Depuración en directo de Rookout
short_description: Recopilación de métricas de tu código en producción utilizando
  Rookout
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
  - Oferta::Extensión de la interfaz de usuario
  configuration: README.md#Configuración
  description: Recopilación de métricas de tu código en producción utilizando Rookout
  media:
  - caption: Demostración de la integración de Rookout en Datadog
    image_url: images/video_thumbnail.png
    media_type: vídeo
    vimeo_id: 642104223
  - caption: Depurador Rookout
    image_url: images/app1.png
    media_type: imagen
  - caption: Configuración de una sesión de depuración de Rookout
    image_url: images/app2.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Depuración en directo de Rookout
---



## Información general

### Descripción

[Rookout][1] es una solución disruptiva para desarrolladores para la depuración nativa en la nube y la recopilación de datos en tiempo real. Los puntos de interrupción sin interrupción de Rookout te permiten recopilar cualquier tipo de datos sobre la marcha sin codificación adicional, nuevos despliegues ni reinicios.

Rookout está diseñado desde cero para la depuración de entornos de producción y de arquitectura moderna, como Kubernetes, microservicios, serverless, y aplicaciones basadas en mallas de servicios.

La integración Rookout te permite recopilar métricas del código que se ejecuta en producción en directo o en cualquier otro sitio entorno, sin necesidad de detenerlo o volver a desplegarlo.

### Uso

La integración Rookout tiene dos componentes:

- Un elemento de menú contextual para tus widgets de dashboard que te permite recopilar puntos de métricas de tu código.
- Un widget personalizado que te muestra todos los puntos de métricas que tienes configurados en Rookout.

**Elemento de menú contextual**

Al hacer clic en un widget de serie temporal que representa uno o más servidores o servicios aparece un nuevo menú contextual.

Al hacer clic en "Set metric points" (Configurar puntos de métricas), se abre la aplicación Rookout y se seleccionan automáticamente las instancias correctas para ti.

**Widget de dashboard personalizado**

Añade el widget de Rookout a tu dashboard para ver dónde has configurado los puntos de métricas.

## Configuración

### Configuración

Para añadir el elemento de menú contextual de Rookout a un widget de serie temporal en tu dashboard, necesitas añadir un filtro de etiquetas (labels) de Rookout a su título.

Por ejemplo, si una serie temporal muestra algunas métricas en un servicio llamado `cartservice`, necesitas que el elemento de menú contextual de Rookout inicie automáticamente una sesión de Rookout con el filtro de etiquetas: `k8s_deployment:cartservice`.

Para ello, añade `[k8s_deployment:cartservice]` al título del widget de serie temporal.

## Datos recopilados

### Métricas

Rookout no incluye métricas.

### Checks de los servicios

Rookout no incluye checks de servicio.

### Eventos

Rookout no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el servicio de asistencia de Rookout][2].

[1]: https://rookout.com
[2]: mailto:support@rookout.com