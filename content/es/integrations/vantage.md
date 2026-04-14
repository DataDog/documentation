---
app_id: vantage
app_uuid: 2784a986-2673-4189-a3b8-320755f6c2b4
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.vantage.sh
  name: Vantage
  sales_email: sales@vantage.sh
  support_email: support@vantage.sh
categories:
- gestión de costes
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: vantage
integration_id: vantage
integration_title: Vantage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: vantage
public_title: Vantage
short_description: 'Importar tus gastos de Datadog y realizar un seguimiento de los
  mismos junto con otros gastos de infraestructura '
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  - Category::Cost Management
  - Category::Cloud
  configuration: README.md#Setup
  description: Importar tus gastos de Datadog y realizar un seguimiento de los mismos
    junto con otros gastos de infraestructura
  media:
  - caption: Costes mensuales de Datadog con presupuesto
    image_url: images/vantage-datadog-budget-forecast.png
    media_type: imagen
  - caption: 'Costes de Datadog: agrupados por servicio'
    image_url: images/vantage-datadog-grouped-report.png
    media_type: imagen
  - caption: Información general de comparación de proveedores
    image_url: images/vantage-datadog-provider-summary.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Vantage
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Vantage es una plataforma de transparencia y optimización de costes en la nube. Esta integración permite a los usuarios de Datadog importar tus costes de Datadog a Vantage y realizar un seguimiento de los mismos junto con tus otros gastos de infraestructura, como AWS, Snowflake y Kubernetes.

## Configuración

### Instalación

Visita [Vantage][1] para registrarte gratuitamente. Una vez registrado, visita la [página de integraciones de Vantage][2] y añade una integración de Datadog. Esto te guiará a través del flujo de Datadog OAUTH2 para conceder a Vantage acceso a tu facturación y a tus datos de uso.

### Configuración

Una vez integrado, comienza a explorar tus costes de Datadog dentro de Vantage. Puedes crear filtros para organizaciones específicas de Datadog y servicios junto con los costes de cualquiera de los otros proveedores de Vantage compatibles.

## Desinstalación

Para eliminar la integración de Datadog de Vantage, ve a la [página de integraciones de Vantage][2] y haz clic en **Remove** (Eliminar). Además, desinstala este integración de Datadog haciendo clic en el botón **Uninstall integration** (Desinstalar integración) que aparece a continuación. Una vez desinstalada este integración, se revocarán todas las autorizaciones anteriores. 

Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado buscando el nombre de la integración en la [página de gestión de claves de API][3].

## Agent

¿Necesitas ayuda? Ponte en en contacto con el [soporte de Vantage][4].


[1]: https://console.vantage.sh
[2]: https://console.vantage.sh/settings/integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Vantage
[4]: mailto:support@vantage.sh