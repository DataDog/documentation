---
algolia:
  subcategory: Integraciones del Marketplace
app_id: automonx-prtg-datadog-alerts
app_uuid: 0ac61364-d76e-4cff-afa8-213c4e952686
assets:
  dashboards:
    PRTG Alerts Dashboard: assets/dashboards/automonx_prtg_events.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20041432
    source_type_name: automonx_prtg_datadog_alerts_integration
  monitors:
    Device is Down due to Ping: assets/monitors/Device-PingDown.json
    'HPE ProLiant System Health: Error caused by lookup value ''Failed'' in channel ''Overall Status''': assets/monitors/ILO-HardwareError.json
    HPE Server is degraded in channel 'Power Supply': assets/monitors/ILO-Degraded.json
    Network Interface Traffic is High: assets/monitors/NetworkInterface-TrafficHigh.json
    Server Available Memory is too Low: assets/monitors/ServerFreeMemory-Down.json
    Server CPU is High: assets/monitors/ServerCPU-Down.json
    Server Disk Utilization is High: assets/monitors/ServerDiskUtil-Down.json
author:
  homepage: https://www.automonx.com/smartnotif
  name: AutoMonX
  sales_email: sales@automonx.com
  support_email: support@automonx.com
  vendor_id: autononx
categories:
- gestión de eventos
- marketplace
- events
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: automonx_automonx_prtg_datadog_alerts_integration
integration_id: automonx-prtg-datadog-alerts
integration_title: Smart Notifications para PRTG
integration_version: ''
is_public: true
legal_terms:
  eula: assets/AutomonX-EULA.pdf
manifest_version: 2.0.0
name: automonx_automonx_prtg_datadog_alerts_integration
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: automonx-prtg-datadog-alerts
  short_description: Precios anuales de la integración Smart Notifications de AutoMonX
  unit_price: 60
public_title: Smart Notifications para PRTG
short_description: Reducir las ruidosas alertas del Monitor de red PRTG con nuestro
  motor Smart Notifications
supported_os:
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Windows
  - Categoría::Gestión de eventos
  - Categoría::Marketplace
  - Categoría::Alertas
  - Oferta::Integración
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Reducir las ruidosas alertas del Monitor de red PRTG con nuestro motor
    Smart Notifications
  media:
  - caption: Integración de Datadog con Smart Notifications de AutoMonX para PRTG
      - Muestreo de eventos de dispositivos de red
    image_url: images/AutoMonX_PRTG_NetworkIn_DD_Event.png
    media_type: imagen
  - caption: Integración de Datadog con Smart Notifications de AutoMonX para PRTG
      - Flujo de eventos de monitorización
    image_url: images/AutoMonX_Events_from_PRTG_to_DD.png
    media_type: imagen
  - caption: Integración de Datadog con Smart Notifications de AutoMonX para PRTG
      - Muestreo de monitores de eventos
    image_url: images/AutoMonX_Event_Monitors.png
    media_type: imagen
  - caption: Integración de Datadog con Smart Notifications de AutoMonX para PRTG
      - Dashboard de eventos
    image_url: images/AutoMonX_Event_Dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Smart Notifications para PRTG
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Mejora tus sistemas y la monitorización de tu red on-prem con nuestra solución adaptada para usuarios del Monitor de red PRTG. Presentamos [Smart Notifications][1] de AutoMonX. Nuestro innovador motor de notificaciones cuenta con un sofisticado mecanismo de filtrado para asegurar que sólo las alertas más críticas lleguen a tu equipo. Nuestra solución perfectamente integrada con Datadog, el Monitor de red PRTG, garantiza notificaciones fiables y centradas, lo que permite a tus administradores de sistemas y de red anticiparse a los problemas.

Esta integración sin código aprovecha inmediatamente tu inversión en la monitorización on-prem y la amplía al ecosistema más amplio de la plataforma de observabilidad de Datadog.

El Monitor de red Paessler PRTG es un software de monitorización TI que ayuda a las empresas a monitorizar todas sus infraestructuras TI, ya sea on-premises, en la nube o en entornos híbridos.

Gracias a su algoritmo de filtrado inteligente, Smart Notifications distingue entre los errores de monitorización y los problemas reales de sistema o red y los dirige al administrador correspondiente (Administrador MonitorOps o Red/Sistemas). Las capacidades de correlación integradas permiten una mayor reducción del ruido durante las interrupciones graves de una red y permiten a los equipos de redes y sistemas centrarse en los problemas de mayor prioridad.

### Eventos
Esta integración envía alertas del Monitor de red PRTG a Datadog como eventos. En el evento se incluyen etiquetas (tags) relevantes para ayudar a delimitar el origen de un problema. Estas etiquetas se configuran del lado de PRTG. 

## Compatibilidad
Si necesitas ayuda, ponte en contacto con [support@automonx.com][3].

[1]: https://www.automonx.com/smartnotif
[2]: http://www.automonx.com/downloads
[3]: mailto:support@automonx.com

---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/automonx-prtg-datadog-alerts" target="_blank">adquiere esta aplicación en el Marketplace</a>.