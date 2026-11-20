---
algolia:
  subcategory: Integraciones del Marketplace
app_id: hardware-sentry
app_uuid: daade024-2095-4a73-afe5-35afbe9e2b12
assets:
  dashboards:
    Hardware Sentry - Host: assets/dashboards/host.json
    Hardware Sentry - Main: assets/dashboards/main.json
    Hardware Sentry - Site: assets/dashboards/site.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: hardware_sentry.agent.info
      metadata_path: metadata.csv
      prefix: hardware_sentry.
    service_checks:
      metadata_path: service_checks.json
    source_type_id: 10286
    source_type_name: Hardware Sentry
  logs: {}
  monitors:
    Agent stopped sending metrics: assets/monitors/agent-nodata.json
    Battery charge is low: assets/monitors/low-battery.json
    Connector failed: assets/monitors/connector-failed.json
    Critically high temperature: assets/monitors/critical-temperature.json
    Device errors: assets/monitors/errors.json
    Device is missing: assets/monitors/missing-device.json
    Fan speed is critically low: assets/monitors/critical-fan-speed.json
    Hardware failure is predicted: assets/monitors/predicted-failure.json
    Hardware is degraded: assets/monitors/status-degraded.json
    Hardware is no longer operational: assets/monitors/status-failed.json
    LUN multi-pathing is unavailable: assets/monitors/lun-multipathing.json
    Low fan speed: assets/monitors/low-fan-speed.json
    Low fan speed (%): assets/monitors/low-fan-speed-percent.json
    Network errors is high: assets/monitors/errors-network.json
    Network link is down: assets/monitors/network-link-down.json
    Physical intrusion: assets/monitors/intrusion.json
    Power supply is near its capacity: assets/monitors/power-capacity.json
    Tape drive needs cleaning: assets/monitors/tape-drive-cleaning.json
    Temperature is high: assets/monitors/high-temperature.json
    Voltage is high: assets/monitors/high-voltage.json
    Voltage is low: assets/monitors/low-voltage.json
author:
  homepage: https://sentrysoftware.com
  name: Software Sentry
  sales_email: datadog@sentrysoftware.com
  support_email: support@sentrysoftware.com
  vendor_id: sentry-software
categories:
- gestión de costes
- marketplace
- la red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry_software_hardware_sentry
integration_id: hardware-sentry
integration_title: Hardware Sentry
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: sentry_software_hardware_sentry
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: hardware_sentry.host.configured
  product_id: hardware-sentry
  short_description: El precio de la suscripción mensual se basa en el número de hosts
    monitorizados con Hardware Sentry OpenTelemetry Collector. La suscripción proporciona
    acceso a los servicios de asistencia proporcionados por Sentry Desk.
  tag: host
  unit_label: hosts monitorizados
  unit_price: 8
public_title: Hardware Sentry
short_description: Métricas de hardware y sostenibilidad para más de 100 sistemas
  (Cisco, Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA, Pure, etc.)
supported_os:
- Linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Gestión de costes
  - Categoría::Marketplace
  - Categoría::Red
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Métricas de hardware y sostenibilidad para más de 100 sistemas (Cisco,
    Dell EMC, HPE, Hitachi, Lenovo, NetApp, NVIDIA, Pure, etc.)
  media:
  - caption: El dashboard principal de Hardware Sentry ofrece información general
      del consumo energético y las emisiones de carbono de todos los centros de datos
      y salas de servidores. Aprovecha las métricas recopiladas por Hardware Sentry
      OpenTelemetry Collector.
    image_url: images/dashboard-main.png
    media_type: imagen
  - caption: 'Diagrama de arquitectura: Hardware Sentry OpenTelemetry Collector se
      ejecuta on-premises, monitoriza tus servidores, conmutadores y sistemas de almacenamiento,
      y envía métricas a tu entorno Datadog.'
    image_url: images/architecture.png
    media_type: imagen
  - caption: Para cada host monitorizado, Hardware Sentry monitoriza sus componentes
      electrónicos (CPU, memoria, discos, NIC, sensores, etc.), su consumo de energía
      y sus emisiones de carbono.
    image_url: images/dashboard-host.png
    media_type: imagen
  - caption: Para cada sitio (centro de datos o sala de servidores), se estiman el
      consumo de energía y las emisiones de carbono de 1 día, 1 mes y 1 año. Se recomienda
      la temperatura óptima con su potencial de ahorro energético a lo largo de un
      año.
    image_url: images/dashboard-site.png
    media_type: imagen
  - caption: Todos los problemas de hardware (discos, módulos de memoria, NIC, fuentes
      de alimentación, etc.) se monitorizan con monitores específicos, con mensajes
      detallados.
    image_url: images/events-explorer.png
    media_type: imagen
  - caption: La integración Hardware Sentry viene con una colección de monitores recomendados
      para informar de los problemas de hardware de tu infraestructura.
    image_url: images/triggered-monitors.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hardware Sentry
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

**[Hardware Sentry][1]** es un agente especializado en la monitorización de los componentes de hardware de cualquier servidor, conmutador de red o sistema de almacenamiento en tu centro de datos, que viene con una colección de dashboards y monitores para Datadog.

### Monitorización del hardware

**Hardware Sentry** es un agente de monitorización capaz de informar del estado físico de servidores, conmutadores de red y sistemas de almacenamiento. Recopila métricas periódicamente para informar del estado de cada procesador, controlador, disco o fuente de alimentación, de las temperaturas, la velocidad de los ventiladores, el estado de los enlaces, la velocidad de las tarjetas de red y mucho más.

* **Remoto**: Un agente para la monitorización de cientos de sistemas, a través de SNMP, WBEM, WMI, SSH, IPMI, API REST y más.
* **Multiplataforma**: Más de 100 plataformas compatibles con más de 250 conectores (Cisco, Dell EMC, HP, Huawei, IBM, Lenovo, NetApp, Oracle, Pure, etc.). Para ver la lista completa de las plataformas compatibles, consulta la [documentación de Hardware Sentry][2].
* **Simple**: La monitorización de un sistema requiere un esfuerzo mínimo de configuración para especificar el nombre de host o la dirección IP y las credenciales. **Hardware Sentry** detectará automáticamente el instrumentación disponible e iniciará la monitorización de forma inmediata.
* **Normalizado**: Toda la información necesaria se comunica mediante métricas estandarizadas en Datadog. La misma métrica `hw.temperature`, por ejemplo, se utiliza para representar la temperatura en un administrador de archivos NetApp, un HP BladeSystem, un Dell PowerEdge que ejecute Windows, un Cisco UCS que ejecute Linux o cualquier otra plataforma. Estas métricas siguen las [convenciones semánticas de OpenTelemetry][3].

**Hardware Sentry** viene con monitores predefinidos para detectar e incluso predecir fallos en procesadores, módulos de memoria, discos, tarjetas de red, controladores, fuentes de alimentación, ventiladores, sensores de temperatura y mucho más.

### Informes sobre consumo de energía y huella de carbono

Además de monitorizar el estado físico, **Hardware Sentry** también informa del consumo de energía de cada sistema monitorizado. Combinados con métricas que representan el coste de la electricidad y la densidad de carbono, los dashboards proporcionados informan del uso de electricidad de tu infraestructura en kWh y de su huella de carbono en toneladas de CO2.

**100% software**: No se requieren PDU inteligentes, ¡incluso para sistemas que no están equipados con un sensor de potencia interno!

### Dashboards

Esta integración viene con un conjunto de dashboards que aprovechan las métricas recopiladas por **[Hardware Sentry OpenTelemetry Collector][4]**:

| Dashboard | Descripción |
|---|---|
| Hardware Sentry - Principal | Información general de todos los hosts monitorizados, con especial atención a la sostenibilidad. |
| Hardware Sentry - Sitio | Métricas asociadas a un *sitio* (un centro de datos o una sala de servidores) y sus *hosts* monitorizados |
| Hardware Sentry - Host | Métricas asociadas a un *host* y sus dispositivos internos |

## Agent

Una suscripción a **Hardware Sentry** a través del Marketplace Datadog proporciona acceso a todos los servicios proporcionados por [Sentry Desk][12]:

* Asistencia técnica a través de [Jira Service Management][13]
* Base de conocimientos
* Parches

Al suscribirse, tu organización recibirá una invitación para gestionar tu cuenta de *Sentry Desk*.

### Referencias adicionales:

Más enlaces, artículos y documentación útiles:

- [Seguimiento de tu huella de carbono con la oferta de Hardware Sentry en el Marketplace Datadog][14]

[1]: https://www.sentrysoftware.com/products/hardware-sentry.html
[2]: https://www.sentrysoftware.com/docs/hws-doc/latest/platform-requirements.html
[3]: https://opentelemetry.io/docs/reference/specification/metrics/semantic_conventions/hardware-metrics/
[4]: https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html
[5]: https://www.sentrysoftware.com/docs/hws-doc/latest/integration/datadog.html
[6]: https://www.sentrysoftware.com/downloads/products-for-opentelemetry.html
[7]: https://www.sentrysoftware.com/products/hardware-sentry.html
[8]: https://www.sentrysoftware.com/docs/hws-doc/latest/install.html
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[10]: https://www.sentrysoftware.com/docs/hws-doc/latest/configuration/configure-agent.html
[11]: https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html
[12]: https://www.sentrysoftware.com/desk
[13]: https://sentrydesk.atlassian.net/servicedesk/customer/portals
[14]: https://www.datadoghq.com/blog/sustainability-monitoring-carbon-footprint-hardware-sentry-datadog/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/hardware-sentry" target="_blank">adquiere esta aplicación en el Marketplace</a>.