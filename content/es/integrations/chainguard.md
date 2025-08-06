---
app_id: chainguard
app_uuid: 0195624f-3d2a-7db6-ad4d-c1c1ce8a643b
assets:
  dashboards:
    Chainguard Containers Overview: assets/dashboards/chainguard_containers_overview.json
author:
  homepage: https://www.chainguard.dev/
  name: Chainguard
  sales_email: datadog@chainguard.dev
  support_email: support@chainguard.dev
  vendor_id: chainguard
categories:
- contenedores
- kubernetes
- seguridad
- aws
- google cloud
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/chainguard/README.md
display_on_public_website: true
draft: false
git_integration_title: chainguard
integration_id: chainguard
integration_title: Chainguard
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: chainguard
public_title: Chainguard
short_description: Las imágenes mínimas, de contenedor sin CVE de Chainguard permiten
  a los desarrolladores crear un software más seguro.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Security
  - Category::AWS
  - Category::Google Cloud
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Las imágenes mínimas, de contenedor sin CVE de Chainguard permiten
    a los desarrolladores crear un software más seguro.
  media:
  - caption: En dashboard figuran los contenedores que pueden enviarse para la migración
      a Chainguard
    image_url: images/Screenshot 2025-03-06 at 8.48.11 AM.png
    media_type: imagen
  - caption: Chainguard Directory ofrece más de 1200 imágenes, todas 0-CVE y mínimas
    image_url: images/Screenshot 2025-03-04 at 9.31.34 AM.png
    media_type: imagen
  - caption: Cada imagen de Chainguard es segura y mínima
    image_url: images/Screenshot 2025-03-04 at 9.34.35 AM.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Chainguard
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Chainguard permite a los desarrolladores reducir el trabajo de ingeniería asociado a la gestión de vulnerabilidades y exposiciones comunes (CVE), construir sobre una base segura de software de código abierto y agilizar el cumplimiento en toda la empresa frente a marcos críticos para el negocio como FedRAMP, PCI-DSS, SOC2 y otros. Nuestro producto, Chainguard Containers, es mínimo, no contiene CVE y viene equipado con protección vigilada bajo nuestro SLA de remediación. Todas nuestras más de 1200 imágenes se crean desde la source (fuente) y se analizan y revisan periódicamente en busca de CVE.

Esta integración incluye un dashboard predefinido que muestra los contenedores existentes elegibles para la migración a Chainguard Containers. Puedes ver rápidamente los contenedores de larga duración que pueden estar llegando al final de su vida útil y necesitan actualizarse a un contenedor seguro. Además, si eres cliente de CSM Infrastructure Vulnerabilities, puedes ver qué contenedores tienen el mayor número de CVE, lo que indica que deberían migrarse antes a Chainguard.

## Configuración

El dashboard predefinido consulta automáticamente las métricas existentes en el contenedor de Docker recopiladas por el Datadog Agent. No es necesaria ninguna configuración adicional.

Para empezar a utilizar una imagen de Chainguard, visita [Chainguard Images][1], busca la imagen que desees y sigue las instrucciones para extraerla.

## Desinstalación

Para desinstalar el dashboard predefinido, ve al ícono de la integración de Chainguard, ve a la pestaña Configurar y haz clic en **Desinstalar integración**.

Para desinstalar una imagen de Chainguard, elimina todas las referencias a ella en tu configuración y vuelve a la imagen original.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Chainguard][2].


[1]: https://images.chainguard.dev
[2]: https://www.chainguard.dev/contact