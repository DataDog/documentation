---
algolia:
  subcategory: Integraciones del Marketplace
app_id: shoreline-software-license
app_uuid: d1da5605-5ef5-47bc-af8d-16005945e21e
assets: {}
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
  vendor_id: shoreline
categories:
- automatización
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: licencia_shoreline
integration_id: shoreline-software-license
integration_title: Shoreline.io
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: licencia_shoreline
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.shoreline.shoreline
  product_id: software-license
  short_description: Por host/mes. Sin coste adicional por pods o contenedores.
  tag: host
  unit_label: Host
  unit_price: 25
public_title: Shoreline.io
short_description: Crear automatizaciones para reparar monitores activados
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Categoría::Automatización
  - Categoría::Marketplace
  - Oferta::Licencia de software
  configuration: README.md#Configuración
  description: Crear automatizaciones para reparar monitores activados
  media:
  - caption: Dashboard de corrección
    image_url: images/remediation_dashboard.png
    media_type: imagen
  - caption: Ejemplo de configuración de la automatización de la corrección
    image_url: images/automate_remediation.png
    media_type: imagen
  - caption: Ejemplo de depuración y reparación interactivas en toda la flota
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: imagen
  - caption: Ejemplo de detalles de comandos Linux en toda la flota
    image_url: images/fleetwide_linux_command_details.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Shoreline.io
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La automatización de incidentes de Shoreline permite a los ingenieros de DevOps y de fiabilidad del sitio (SRE) **depurar interactivamente a escala** y **crear correcciones** rápidamente para eliminar el trabajo repetitivo.

La función de depuración y reparación te permite ejecutar comandos en tiempo real en toda tu granja de servidores, sin necesidad de shells seguros (SSH) en los servidores de forma individual. Puedes ejecutar todo aquello que pueda escribirse en una interfaz de texto de Linux, como comandos de Linux, secuencias de comandos de shell y llamadas a API de proveedores de nube, y convertir estas sesiones de depuración en automatizaciones conectadas a monitores de Datadog.

La aplicación Shoreline ejecuta automáticamente la automatización cuando se activa monitor, lo que reduce significativamente el tiempo medio de reparación (MTTR) y el trabajo manual.

Shoreline ayuda al personal de guardia a ser tan efectivo como tu mejor ingeniero de fiabilidad del sitio (SRE). Shoreline dota a tu equipo de guardia con herramientas de depuración y acciones de corrección aprobadas, lo que te ayuda a solucionar incidentes más rápidamente con menos escalados y garantiza que los incidentes se solucionen correctamente la primera vez con menos errores.

Para empezar, crea una cuenta de prueba en [Shoreline][1].

## Agent

Para solicitar asistencia y funciones, ponte en contacto con Shoreline a través del siguiente canal:

- Correo electrónico: [support@shoreline.io][2]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Depurar problemas y automatizar la corrección con Shoreline y Datadog][11]
- [Documentación de Shoreline][9]

[1]: https://shoreline.io/datadog?source=DatadogMarketplace
[2]: mailto:support@shoreline.io
[3]: https://docs.shoreline.io/installation
[4]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[5]: https://docs.shoreline.io/installation/kubernetes
[6]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[7]: https://docs.shoreline.io/installation/virtual-machines
[8]: https://docs.shoreline.io/integrations/datadog#install-the-shoreline-integration
[9]: https://docs.shoreline.io/
[10]: https://app.datadoghq.com/account/settings#integrations/shoreline-integration
[11]: https://www.datadoghq.com/blog/shoreline-io-marketplace-datadog/
---
Esta aplicación está disponible a través del Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/shoreline-software-license" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.