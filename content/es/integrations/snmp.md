---
"app_id": "snmp"
"app_uuid": "4fc8e176-17ce-4346-9544-bec30ac47a00"
"assets":
  "dashboards":
    "BGP & OSPF Overview": "assets/dashboards/bgp_ospf_overview.json"
    "Datacenter Overview": "assets/dashboards/datacenter_overview.json"
    "Datadog NDM Environment": "assets/dashboards/ndm_troubleshooting.json"
    "Interface Performance": "assets/dashboards/interface_performance.json"
    "Netflow Monitoring": "assets/dashboards/netflow_monitoring.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "snmp.devices_monitored"
      "metadata_path": "metadata.csv"
      "prefix": "snmp"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "78"
    "source_type_name": "SNMP"
  "monitors":
    "BGP peer state is stuck in an unestablished state": "assets/monitors/bgp_peer_state_stuck.json"
    "Device is down": "assets/monitors/device_down.json"
    "Interface bandwidth usage for incoming traffic is high": "assets/monitors/high_interface_bandwidth_usage_in.json"
    "Interface bandwidth usage for outgoing traffic is high": "assets/monitors/high_interface_bandwidth_usage_out.json"
    "Interface is down on SNMP device": "assets/monitors/interface_down.json"
    "LinkDown Trap Interface is down on SNMP device": "assets/monitors/traps_linkDown.json"
    "SNMP Device is unreachable": "assets/monitors/device_unreachable.json"
    "SNMP device CPU usage is high": "assets/monitors/high_cpu.json"
    "SNMP device memory usage is high": "assets/monitors/high_memory.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
- "notifications"
- "snmp"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/snmp/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "snmp"
"integration_id": "snmp"
"integration_title": "SNMP"
"integration_version": "10.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "snmp"
"public_title": "SNMP"
"short_description": "Recopila métricas de SNMP de tus dispositivos de red."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Red"
  - "Category::Notifications"
  - "Category::SNMP"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Recopila métricas de SNMP de tus dispositivos de red."
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  - "resource_type": "guía"
    "url": "https://datadoghq.dev/integrations-core/tutorials/snmp/introduction/"
  "support": "README.md#Soporte"
  "title": "SNMP"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Simple Network Management Protocol (SNMP) es una norma para la monitorización de dispositivos conectados a la red, como enrutadores, conmutadores, servidores y cortafuegos. Este check recopila métricas de SNMP de tus dispositivos de red.

SNMP utiliza los sysObjectID (Identificadores de objetos de sistema), para identificar de forma única los dispositivos, y los OID (Identificadores de objetos), para identificar de forma única los objetos gestionados. Los OID siguen un patrón de árbol jerárquico: en la raíz está ISO, que tiene el número 1. El siguiente nivel es ORG, que tiene el número 3, y así sucesivamente, con cada nivel separado por un `.`.

Una MIB (Base de información de gestión) actúa como traductor entre los OID y los nombres legibles por humanos y organiza un subconjunto de la jerarquía. Debido a la forma en que está estructurado el árbol, la mayoría de los valores SNMP comienzan con el mismo conjunto de objetos:

* `1.3.6.1.1`(MIB-II) Norma que contiene información del sistema como el tiempo de actividad, las interfaces y el stack tecnológico de red.
* `1.3.6.1.4.1`: Norma que contiene información específica del proveedor.

## Configuración

Para instalar y configurar la integración SNMP, consulta la documentación [Monitorización de dispositivos de red][1].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

* [Monitorización de SNMP con Datadog][2]
* [Introducción a SNMP][3]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/network_monitoring/devices/setup
[2]: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/introduction/
[4]: https://docs.datadoghq.com/help/

