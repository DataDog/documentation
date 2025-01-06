---
app_id: meraki
app_uuid: c34bd865-7ddf-4336-9cf2-02e1a2f05bbd
assets:
  dashboards:
    meraki: assets/dashboards/meraki_overview.json
  integration:
    auto_install: false
    metrics:
      check:
      - meraki.devStatus
      - snmp.devStatus
      metadata_path: metadata.csv
      prefix: meraki.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 602
    source_type_name: Meraki
  monitors:
    A Meraki Device Uplink is Failing: assets/monitors/uplink_device_is_failing.json
    A Meraki Device is in an Alerting State: assets/monitors/device_is_in_alert_state.json
    Abnormally High Latency on a Meraki Uplink: assets/monitors/high_latency_on_uplink.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- red
- recopilación de logs
- seguridad
- snmp
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: meraki
integration_id: meraki
integration_title: Cisco Meraki
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: meraki
public_title: Cisco Meraki
short_description: Monitoriza tu entorno de Cisco Meraki con Network Device Monitoring,
  logs y Cloud SIEM
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Network
  - Category::Log Collection
  - Category::Security
  - Category::SNMP
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tu entorno de Cisco Meraki con Network Device Monitoring,
    logs y Cloud SIEM
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/network_monitoring/devices/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-meraki/
  support: README.md#Support
  title: Cisco Meraki
---

<!--  EXTRAIDO DE https://github.com/DataDog/integrations-internal-core -->
<div class="alert alert-info">La integración de Cisco Meraki está en versión beta pública.</div>

## Información general

Esta integración proporciona visibilidad integral de tu entorno de Cisco Meraki mediante la recopilación de métricas para [Network Device Monitoring][1], Network Event Logs y Security Event Logs para [Cloud SIEM][2].

**Network Device Monitoring**

[Network Device Monitoring][1] ayuda a garantizar que el estado general de la infraestructura de red esté a la altura de los estándares al identificar posibles cuellos de botella y errores de configuración del dispositivo.

Esta integración recopila métricas para los siguientes dispositivos:

* _MR (Wireless Access Points):_ rastrea métricas como el recuento de clientes, el estado de la conexión y el rendimiento.
* _MS (Switches):_ monitoriza las métricas de rendimiento del conmutador, como el estado del puerto, el tráfico y las tasas de error.
* _MX (Security Appliances):_ recopila métricas sobre el estado de la VPN, las reglas del firewall y el rendimiento general del dispositivo.

Esta integración extrae dinámicamente etiquetas (tags) de dispositivos y metadatos de entornos de Meraki para explorar fácilmente grupos de dispositivos, localizaciones o tipos de dispositivos específicos.

**Security Event Logs**

[Security Event Logs][3] alerta sobre eventos como detecciones de intrusiones, violaciones de reglas de firewall y detecciones de amenazas de malware para ayudar a identificar y responder a posibles amenazas de seguridad.

Cree sus propias reglas o aproveche las [reglas de Cloud SIEM listas para usar][4] para la detección de amenazas y la respuesta a incidentes en tiempo real.

**Network Event Logs**

[Network Event Logs][5] ayuda a los administradores de red a analizar eventos históricos de red y solucionar problemas de manera eficiente.

Estos logs rastrean los siguientes temas:

* _Cambios de configuración:_ rastrea los cambios en las configuraciones de red para garantizar el cumplimiento y solucionar problemas de conexión.
* _Asociaciones de clientes:_ monitoriza las asociaciones de clientes con puntos de acceso inalámbricos para obtener información sobre la conectividad del usuario.
* _Eventos de estado de la red:_ identifica y aborda problemas que afectan el estado de la red, como la alta pérdida de paquetes en conmutadores específicos.

<br />

Además de los monitores recomendados incluidos con esta integración, se pueden configurar monitores adicionales para notificar a los administradores sobre eventos críticos, lo que permite una gestión proactiva de la red.

Para recopilar métricas de tu Meraki Cloud Controller, configura la [integración de SNMP][6] con el Meraki Profile.


## Configuración

### Instalación

1. En la aplicación, abre el [cuadro de integración de Meraki][7].
1. Haz clic en **+ Add Account**.
1. Elige un nombre para tu cuenta de Meraki.
1. Añade una clave de API de Meraki. Encontrarás instrucciones sobre cómo generar una clave de API de Meraki en [API Dashboard de Cisco Meraki][8].

### Generación de la clave de API de Meraki

1. Dirígete al dashboard de Meraki.
2. Habilita el acceso a la API yendo a Organization > Settings > Dashboard API access.
3. Ve a la página My Profile en el dashboard de Meraki para generar la clave.

### Recopilación de métricas

Para configurar la recopilación de métricas de NDM, se requiere una clave de API de Meraki.

#### Device Tag Filters

Los Device Tag Filters te permiten especificar qué dispositivos se monitorizarán
dentro de NDM. Puedes especificar varias etiquetas separándolas
con una coma. Si no se especifica ninguna etiqueta, se monitorizarán
todos los dispositivos.

### Recopilación de logs

Para configurar la recopilación de logs de eventos de red y logs de eventos de seguridad, se requiere una clave de API de Meraki.

Para obtener más información, consulta la [API Dashboard de Cisco Meraki][9].

## Datos recopilados

### Métricas

<div class="alert alert-info">Los datos de los dispositivos Meraki (MR, MS, MX) en Network Device Monitoring (incluidas las métricas y etiquetas a nivel de red, nivel de dispositivo, nivel de enlace ascendente y nivel de interfaz [puerto del conmutador]) están en versión beta.</div>

Configura la [integración de SNMP][6] con el Meraki Profile para recopilar métricas (con el prefijo `snmp.` en la siguiente tabla) de tus dispositivos Meraki. Como alternativa, crea un [perfil personalizado][10] para recopilar métricas adicionales. Tenga en cuenta que las métricas con el prefijo `meraki.` se recopilan a través de la integración de Meraki de Datadog, habilitada mediante las instrucciones anteriores.

{{< get-metrics-from-git "meraki" >}}

### Eventos

La integración de Meraki no incluye ningún evento.

### Checks de servicio

La integración de Meraki no incluye checks de servicios.

## Solucionar problemas
A veces, Datadog tiene problemas para acceder a Meraki desde sus servidores. Añade las direcciones IP de Datadog a tu lista de direcciones IP permitidas para garantizar que el rastreo funcione como se espera.

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Network Device Monitoring][12]
- [Monitorización de Cisco Meraki con Datadog][13]

[1]: https://app.datadoghq.com/devices
[2]: https://app.datadoghq.com/security/home
[3]: https://developer.cisco.com/meraki/api/get-network-appliance-security-events/
[4]: https://app.datadoghq.com/logs/pipelines?search=meraki
[5]: https://developer.cisco.com/meraki/api/get-network-events/
[6]: https://docs.datadoghq.com/es/integrations/snmp/
[7]: https://app.datadoghq.com/integrations/meraki
[8]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[9]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[10]: https://docs.datadoghq.com/es/network_monitoring/devices/guide/build-ndm-profile/
[11]: https://docs.datadoghq.com/es/help/
[12]: https://docs.datadoghq.com/es/network_monitoring/devices/
[13]: https://www.datadoghq.com/blog/monitor-meraki/