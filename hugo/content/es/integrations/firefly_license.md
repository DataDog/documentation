---
algolia:
  subcategory: Integraciones de Marketplace
app_id: firefly-license
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc777
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
  vendor_id: firefly
categories:
- automatización
- nube
- configuración y despliegue
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: firefly_license
integration_id: firefly-license
integration_title: Firefly
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: firefly_license
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: firefly-license
  short_description: 'Plan de inicio de Firefly: hasta 6000 activos'
  unit_price: 699
public_title: Firefly
short_description: Actualiza tu nube
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Actualiza tu nube
  media:
  - caption: Dashboard de IaC
    image_url: images/FF-dashboard.png
    media_type: imagen
  - caption: Inventario completo en la nube
    image_url: images/FF-inventory.png
    media_type: imagen
  - caption: Codificación automática
    image_url: images/FF-codification.png
    media_type: imagen
  - caption: Detectar y corregir desviaciones
    image_url: images/FF-fix-drifts.png
    media_type: imagen
  - caption: Detectar y corregir infracciones de política
    image_url: images/FF-insights.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Firefly
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Firefly es una solución de gestión de activos en la nube que ayuda a los equipos de la nube a descubrir su huella en la nube (incluidos AWS, GCP, Kubernetes y Datadog), transformar automáticamente los recursos en infraestructura como código, y detectar desviaciones y violaciones de política para asegurarse de que su nube está alineada con su estado deseado.
Firefly ayuda a los equipos a hacer que sus activos de Datadog sean inmutables, versionables, escalables y supervisados gestionándolos como código en cualquier herramienta de infraestructura como código (IaC) de su elección.

### Inventario completo en la nube
Obtén un inventario con capacidad de búsqueda completa de todos los activos de Datadog junto con otros activos en la nube, como AWS, K8s, GCP, Okta, etc.

### Codificación automática
Con la [integración de Firefly y Datadog][2], puedes convertir automáticamente en código uno o varios activos de Datadog, incluidas las especificaciones de Terraform, Pulumi, Cloudformation y CDK.

### Detectar y corregir desviaciones
Obtén notificaciones en tiempo real de cualquier discrepancia entre tu Infrastructure-as-Code y tu estado real en la nube, y envía una corrección directamente a tu repositorio cuando se produce la desviación.

### Detectar y corregir infracciones de políticas 
Utiliza el motor de políticas unificado de Firefly para encontrar errores de configuración peligrosos o desaprovechamientos costosos y recibe alertas sobre infracciones de políticas, tanto de políticas personalizadas como preconfiguradas.

## Agent
¿Tienes alguna duda? Envía un correo electrónico a [contact@gofirefly.io][1] o utiliza el chat de la aplicación.

[1]: mailto:contact@gofirefly.io
[2]: https://app.datadoghq.com/integrations/firefly

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/firefly-license" target="_blank">adquiere esta aplicación en el Marketplace</a>.