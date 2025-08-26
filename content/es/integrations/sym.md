---
app_id: sym
app_uuid: d81d1dd3-d5e8-4373-98a6-f95b797b3f9d
assets:
  dashboards:
    Sym Overview: assets/dashboards/sym_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sym.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10396
    source_type_name: sym
  logs:
    source: sym
  oauth: assets/oauth_clients.json
author:
  homepage: https://symops.com/
  name: Sym
  sales_email: sales@symops.com
  support_email: support@symops.com
categories:
- seguridad
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sym/README.md
display_on_public_website: true
draft: false
git_integration_title: sym
integration_id: sym
integration_title: Sym
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sym
public_title: Sym
short_description: Enviar logs de auditoría de Sym a Datadog
supported_os:
- windows
- macos
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Supported OS::Linux
  - Category::Security
  - Category::Developer Tools
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Enviar logs de auditoría de Sym a Datadog
  media:
  - caption: Un vídeo de información general de Sym
    image_url: images/sym_video_thumbnail.jpg
    media_type: vídeo
    vimeo_id: 846654213
  - caption: Sym te ayuda a crear flujos de trabajo de acceso y aprobación utilizando
      las herramientas de ingeniería nativas de tu plataforma
    image_url: images/home_hero_image.png
    media_type: imagen
  - caption: Definir y desplegar reglas de acceso en Terraform
    image_url: images/define_deploy.jpg
    media_type: imagen
  - caption: Solicitar, aprobar y denegar en cualquier lugar de Slack
    image_url: images/request_approve.jpg
    media_type: imagen
  - caption: Un ejemplo del dashboard de información general de Sym
    image_url: images/sym_overview_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Sym
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Sym][1] es una plataforma que permite definir automatizaciones sencillas que convierten las políticas de acceso puntuales en flujos de trabajo fáciles de operar, ejecutados en Slack. Define flujos de acceso en Terraform, personalízalos e intégralos con otros sistemas en código, y utiliza nuestra API o Slack App para solicitar y aprobar/denegar accesos.

Esta integración permite a los clientes enviar logs de auditoría de Sym directamente a Datadog utilizando un destino de log de Sym.

Estos logs se envían en tiempo real para cada evento procesado por la plataforma Sym, como `request` o `approve`.

## Configuración

### Instalación

Para configurar la integración de Sym:
1. En el cuadro de integración de Sym Datadog, haz clic en "Connect Accounts" (Conectar cuentas).
2. Datadog te redirigirá a Sym para iniciar el flujo de autorización OAuth. Introduce aquí tu ID de organización de Sym para seguir logueado en Sym.
3. Después de autorizar correctamente, se mostrará un recurso de Terraform `sym_log_destination`. Copia y pega esto en tu configuración de Sym Terraform.

### Configuración

Para obtener más información sobre la configuración de tu destino de log de Datadog en Terraform, consulta la [documentación de Sym][2].

### Validación

Después de haber pasado por Terraform tu destino de log de Datadog, puedes confirmar su existencia con el siguiente comando de la CLI `symflow`:
```
 symflow resources list sym_log_destination
```

## Desinstalación

- Desinstala la integración haciendo clic en el botón Uninstall (Desinstalar) del cuadro de integración.
- Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.
- Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la página Claves de API.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con nosotros en [support@symops.com][3].

[1]: https://symops.com/
[2]: https://docs.symops.com/docs/datadog
[3]: mailto:support@symops.com