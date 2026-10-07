---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-avd
app_uuid: fcba4622-a19c-4cb7-accf-c2ed8f28fa6a
assets:
  dashboards:
    RapDev - Azure Virtual Desktop Overview: assets/dashboards/rapdev_-_azure_virtual_desktop_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.avd.session_host.active
      metadata_path: metadata.csv
      prefix: rapdev.avd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14602580
    source_type_name: RapDev AVD
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- azure
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_avd
integration_id: rapdev-avd
integration_title: Azure Virtual Desktop
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_avd
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.avd
  product_id: avd
  short_description: Precio unitario por host de sesión AVD.
  tag: host_sesión
  unit_label: Host de sesión AVD
  unit_price: 3
public_title: Azure Virtual Desktop
short_description: Monitorizar tu grupo de hosts Azure Virtual Desktop y el estado
  de las sesiones
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
  - Categoría::Azure
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar tu grupo de hosts Azure Virtual Desktop y el estado de
    las sesiones
  media:
  - caption: Ejemplo de dashboard de información general
    image_url: images/RapDev_AVD_Overview1.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure Virtual Desktop
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Azure Virtual Desktop es un servicio alojado en Azure que proporciona la virtualización de escritorios y aplicaciones. Admite escritorios completos de sesión única y multisesión, además de la capacidad de ejecutar aplicaciones remotas individuales.

La integración Azure Virtual Desktop (AVD) extrae checks del estado de hosts de sesiones, así como información clara sobre recuentos y rendimiento de sesiones. Esta integración complementa la integración en la nube Datadog Azure existente, permitiendo a los clientes utilizar la plataforma de observabilidad unificada de Datadog para correlacionar los datos de Azure Virtual Desktop con otros servicios e infraestructuras de Azure. Con esta visión holística, los equipos pueden identificar y resolver problemas de forma proactiva, optimizar la asignación de recursos y garantizar una experiencia de usuario sin interrupciones.

## Soporte
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][8]
- Ventas: [sales@rapdev.io][9]
- Chat: [rapdev.io][10]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][8] a RapDev y la crearemos!*

[1]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/?tab=azurecli
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access?tabs=portal
[4]: https://portal.azure.com/#view/Microsoft_Azure_WVD/WvdManagerMenuBlade/~/hostpools
[5]: https://learn.microsoft.com/en-us/azure/virtual-desktop/diagnostics-log-analytics#push-diagnostics-data-to-your-workspace
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: mailto:support@rapdev.io
[9]: mailto:sales@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-avd" target="_blank">adquiere esta aplicación en el Marketplace</a>.