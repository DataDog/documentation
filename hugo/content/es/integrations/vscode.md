---
app_id: vscode
app_uuid: 93a7b892-5393-4f40-896a-905b553a7669
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
git_integration_title: vscode
integration_id: vscode
integration_title: Visual Studio Code
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vscode
public_title: Visual Studio Code
short_description: Extensión Datadog para VS Code
supported_os:
- Linux
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
  description: Extensión Datadog para VS Code
  media:
  - caption: Seguimiento de errores en VS Code
    image_url: images/overview.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
  support: README.md#Soporte
  title: Visual Studio Code
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

La [extensión Datadog para VS Code][1] te ayuda a mejorar tu software proporcionándote información a nivel de código directamente en el IDE, basada en datos de observabilidad en tiempo real:

- Logs
- Seguimiento de errores
- CI Visibility
- Protección de las aplicaciones y las API
- Synthetics
- Análisis estático

## Configuración

### Instalación

Desde Visual Studio Code:

1. Haz clic en **Plugins** (Complementos) y busca `Datadog` o busca la [extensión Datadog en el Marketplace Microsoft][2].
2. Haz clic en **Install** (Instalar) para descargar e instalar el plugin en tu entorno de desarrollo integrado.
3. Si recibes un aviso de que Datadog es un plugin de terceros, haz clic en **Accept** (Aceptar).
4. Haz clic en **Restart IDE** (Reiniciar entorno de desarrollo integrado).

### Configuración

La configuración del complemento se encuentra dentro de la configuración del IDE, en **Datadog**.

Selecciona los servicios Datadog correspondientes a tu proyecto en la configuración del complemento.

### Referencias adicionales

- [Extensión Datadog en el Marketplace Microsoft][2]

## Compatibilidad

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3] o abre un [incidente en GitHub][4].

[1]: https://docs.datadoghq.com/es/developers/ide_integrations/vscode/
[2]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: https://docs.datadoghq.com/es/help/
[4]: https://github.com/DataDog/datadog-for-vscode