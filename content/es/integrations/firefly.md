---
app_id: firefly
app_uuid: 58481132-c79e-4659-8064-7cdaabbbc999
assets: {}
author:
  homepage: https://gofirefly.io
  name: Firefly
  sales_email: contact@gofirefly.io
  support_email: contact@gofirefly.io
categories:
- automatización
- nube
- configuración y despliegue
- herramientas de desarrollo
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/firefly/README.md
display_on_public_website: true
draft: false
git_integration_title: firefly
integration_id: firefly
integration_title: Firefly
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: firefly
public_title: Firefly
short_description: Actualiza tu nube
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Category::Cloud
  - Categoría::Configuración y despliegue
  - Categoría::Herramientas de desarrollo
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Actualiza tu nube
  media:
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
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
Firefly es una solución de gestión de recursos en la nube que ayuda a los equipos Cloud a descubrir su huella en la nube (incluidos AWS, GCP, Kubernetes y Datadog), a transformar automáticamente los recursos en Infrastructure-as-Code y a detectar desviaciones e infracciones de políticas, para asegurarse de que su nube corresponde al estado deseado.
Firefly ayuda a los equipos a hacer que sus recursos Datadog sean inmutables, versionados, escalables y monitorizados, gestionándolos como código en cualquier herramienta Infrastructure-as-Code (IaC) de su elección.

### Inventario completo en la nube
Obtén un inventario con capacidad de búsqueda completa de todos los activos de Datadog junto con otros activos en la nube, como AWS, K8s, GCP, Okta, etc.

### Codificación automática
Convierte automáticamente en código uno o varios recursos Datadog, incluidas las especificaciones de Terraform, Pulumi, Cloudformation y CDK.

### Detectar y corregir desviaciones
Obtén notificaciones en tiempo real de cualquier discrepancia entre tu Infrastructure-as-Code y tu estado real en la nube, y envía una corrección directamente a tu repositorio cuando se produce la desviación.

### Detectar y corregir infracciones de políticas 
Utiliza el motor de políticas unificado de Firefly para encontrar errores de configuración peligrosos o desaprovechamientos costosos y recibe alertas sobre infracciones de políticas, tanto de políticas personalizadas como preconfiguradas.

## Configuración

### Configurar la integración de Firefly y Datadog
1. Crea una nueva clave de aplicación y una clave API Datadog.
2. En la interfaz de usuario de Firefly, ve a: **Settings > Integrations > Datadog** (Parámetros > Integraciones > Datadog).
3. Copia la tecla de aplicación y pégala en la línea correspondiente.
4. Copia la clave API y pégala en la línea correspondiente.
5. Haz clic en **Done** (Listo).

## Soporte
¿Tienes alguna duda? Envía un correo electrónico a [contact@gofirefly.io][1] o utiliza el chat de la aplicación.

[1]: mailto:contact@gofirefly.io