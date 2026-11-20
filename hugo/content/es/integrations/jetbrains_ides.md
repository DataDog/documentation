---
app_id: jetbrains-ides
app_uuid: f27e2abf-7827-46f8-bddb-266a0c1acd9f
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
git_integration_title: jetbrains_ides
integration_id: jetbrains-ides
integration_title: IDE JetBrains
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jetbrains_ides
public_title: IDE JetBrains
short_description: Complemento Datadog para IntelliJ IDEA, GoLand, PyCharm, WebStorm
  y PhpStorm
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Herramientas de desarrollo
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Complemento Datadog para IntelliJ IDEA, GoLand, PyCharm, WebStorm y
    PhpStorm
  media:
  - caption: Información sobre Error Tracking en IntelliJ IDEA
    image_url: images/overview.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://plugins.jetbrains.com/plugin/19495-datadog
  support: README.md#Soporte
  title: IDE JetBrains
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

El [complemento Datadog para JetBrains IDE][1] está disponible para IntelliJ IDEA, GoLand, PyCharm, WebStorm y PhpStorm. Te ayuda a mejorar tu software proporcionando información a nivel de código directamente en el IDE, basada en datos de observabilidad en tiempo real de:

- Logs
- Elaboración de perfiles
- Seguimiento de errores
- CI Visibility
- App and API Protection
- Análisis estático

## Configuración

### Instalación

Desde tu JetBrains IDE:

1. Ve a **Settings > Plugins** (Configuración > Complementos).
2. Busca `Datadog`.
3. Haz clic en **Install** (Instalar) para descargar e instalar el plugin en tu entorno de desarrollo integrado.
4. Si recibes un aviso de que Datadog es un plugin de terceros, haz clic en **Accept** (Aceptar).
5. Reinicia el IDE.
6. Cuando se te pida que inicies sesión en Datadog, haz clic en el botón **Log-in** (Iniciar sesión). Tu navegador se abrirá en la página de inicio de sesión en Datadog.

### Configuración

Selecciona los servicios Datadog correspondientes a tu proyecto en la configuración del complemento.

La configuración del complemento se encuentra dentro de la configuración del IDE, en **Datadog**.

### Ver en entorno de desarrollo integrado

La función **View in IDE** (Ver en IDE) proporciona un enlace desde la plataforma Datadog directamente a tus archivos de origen.

### Referencias adicionales

- [Complemento Datadog en el Marketplace de JetBrains][2]

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3] o abre un [incidente en GitHub][4].

[1]: https://docs.datadoghq.com/es/developers/ide_integrations/idea/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog
[3]: https://docs.datadoghq.com/es/help/
[4]: https://github.com/DataDog/datadog-for-intellij-platform