---
app_id: visual-studio
app_uuid: ee8a2962-c923-492c-9198-c851f520a0e0
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: visualstudio
integration_id: visual-studio
integration_title: Visual Studio
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: visualstudio
public_title: Visual Studio
short_description: Extensión Datadog para Visual Studio
supported_os:
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Windows
  - Categoría::Herramientas de desarrollo
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Extensión Datadog para Visual Studio
  media:
  - caption: Seguimiento de errores en Visual Studio
    image_url: images/overview.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
  support: README.md#Soporte
  title: Visual Studio
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

La [extensión Datadog para Visual Studio][1] te ayuda a mejorar tu software proporcionándote información a nivel de código directamente en el IDE, basada en datos de observabilidad en tiempo real:

- Logs
- Elaboración de perfiles
- Seguimiento de errores
- CI Visibility
- Protección de las aplicaciones y las API
- Análisis estático

## Configuración

### Instalación

1. Descarga e instala la extensión desde el [Marketplace Visual Studio][2].
2. En Visual Studio, ve a **Tools > Options > Datadog** (Herramientas > Opciones > Datadog).
3. Inicia sesión con tu cuenta de Datadog.

### Configuración

Selecciona los servicios Datadog correspondientes a tu proyecto en la configuración del complemento.

1. Abre una solución en Visual Studio.
2. Ve a **Extensions > Datadog > Linked Services** (Extensiones > Datadog > Servicios vinculados).
3. Añade servicios y guarda tu solución.

### Referencias adicionales

- [Extensión Datadog en el Marketplace Microsoft][2]

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3] o abre un [incidente en GitHub][4].

[1]: https://docs.datadoghq.com/es/developers/ide_integrations/visual_studio/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[3]: https://docs.datadoghq.com/es/help/
[4]: https://github.com/DataDog/datadog-for-visual-studio