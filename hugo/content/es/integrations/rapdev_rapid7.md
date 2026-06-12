---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-rapid7
app_uuid: 388017a0-e4cc-45ad-b038-c2141abf20c1
assets:
  dashboards:
    RapDev rapid7 Investigations: assets/dashboards/rapdev_rapid7_investigations.json
    RapDev rapid7 Overview: assets/dashboards/rapdev_rapid7_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.rapid7.logs.processed
      metadata_path: metadata.csv
      prefix: rapdev.rapid7.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10191
    source_type_name: RapDev Rapid7
  logs:
    source: rapid7
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- recopilación de logs
- marketplace
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_rapid7
integration_id: rapdev-rapid7
integration_title: Rapid7
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_rapid7
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: rapid7
  short_description: Tarifa plana de esta integración
  unit_price: 500
public_title: Rapid7
short_description: Monitoriza tu actividad de investigación y logs de Rapid7
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Marketplace
  - Categoría::Seguridad
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitoriza tu actividad de investigación y logs de Rapid7
  media:
  - caption: Investigaciones
    image_url: images/R7_investigations_dash_redacted.png
    media_type: imagen
  - caption: Estados de alto nivel
    image_url: images/rapdev_rapid7_dashboard_.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Rapid7
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Esta integración rastrea el estado de las investigaciones de Rapid7 que se han abierto y cerrado recientemente. Esta integración se publicará en el flujo de eventos cuando se abra y se cierre un evento, y agregará estos eventos en torno al ID de la investigación.

La parte del log del check (si se ha habilitado) usa la API REST de Rapid7 para consultar los flujos de log de IDR. La integración devuelve todos los logs que no se consideran logs a nivel de plataforma de Rapid7. Estos logs se envían a Datadog. **Nota:** El envío de estos logs puede generar tarifas adicionales en función de tu plan de precios de Datadog, como se describe en la [estructura de precios de Datadog Log Management](https://www.datadoghq.com/pricing/?product=log-management#log-management). Por lo general, estos logs se componen de resúmenes de Agents de endpoints de Rapid7 y los estados de sus procesos en un momento determinado. 

### Dashboards
1. Esta integración cuenta con un dashboard predefinido que resume las investigaciones de Rapid7
2. Esta integración también incluye un dashboard de ejemplo basado en logs. Este dashboard se encuentra disponible al instalar la integración, pero requiere la creación de una faceta para la fuente de log de R7 a fin de comenzar a ver el flujo de datos.

### Eventos
Esta integración genera eventos de Datadog para nuevas investigaciones abiertas o cerradas. La integración rastrea el estado de una investigación en función de su ID y agrega los eventos abiertos y cerrados generados juntos.

### Métricas
El recuento de logs procesados ​​por check se informa como una métrica.

### Recopilación de logs
La recopilación de logs es opcional y se encuentra deshabilitada de manera predeterminada.
Esta integración llama a la API de logs de Rapid7 para consultar todos los logs disponibles en el último intervalo de tiempo. El intervalo de tiempo predeterminado es el último minuto. Puedes especificar los [conjuntos de logs][4] como se detalla en la [Documentación de búsqueda de logs][5] de Rapid7 insightIDR para solo obtener esos logs.

## Ayuda
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[5]: https://docs.rapid7.com/insightidr/log-search/

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-rapid7" target="_blank">adquiere esta aplicación en el Marketplace</a>.