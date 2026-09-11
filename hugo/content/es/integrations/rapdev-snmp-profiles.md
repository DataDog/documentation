---
algolia:
  subcategory: Mercado integraciones
app_id: rapdev-snmp-profiles
app_uuid: e82be05a-2fd2-44eb-9297-4fec152925a3
assets:
  dashboards:
    RapDev APC PDU Dashboard: assets/dashboards/rapdev_apc_pdu_dashboard.json
    RapDev APC UPS Dashboard: assets/dashboards/rapdev_apc_ups_dashboard.json
    RapDev Arista Switch Dashboard: assets/dashboards/rapdev_arista_switch_dashboard.json
    RapDev Aruba Switch Dashboard: assets/dashboards/rapdev_aruba_switch_dashboard.json
    RapDev AudioCodes Controller: assets/dashboards/rapdev_audiocodes_controller.json
    RapDev AudioCodes Controller Virtual Edition: assets/dashboards/rapdev_audiocodes_controller_virtual_edition.json
    RapDev Barracuda CloudGen Firewall Dashboard: assets/dashboards/rapdev_barracuda_cloudgen_firewall_dashboard.json
    RapDev Bluecoat SG Dashboard: assets/dashboards/rapdev_bluecoat_sg_dashboard.json
    RapDev Brocade VDX Dashboard: assets/dashboards/rapdev_brocade_vdx_dashboard.json
    RapDev Checkpoint SVN Dashboard: assets/dashboards/rapdev_checkpoint_svn_dashboard.json
    RapDev Cisco ASA Dashboard: assets/dashboards/rapdev_cisco_asa_dashboard.json
    RapDev Cisco ASR Dashboard: assets/dashboards/rapdev_cisco_asr_dashboard.json
    RapDev Cisco CUBE Dashboard: assets/dashboards/rapdev_cisco_cube_dashboard.json
    RapDev Cisco Catalyst Dashboard: assets/dashboards/rapdev_cisco_catalyst_dashboard.json
    RapDev Cisco Cube Dashboard: assets/dashboards/rapdev_cisco_cube_dashboard.json
    RapDev Cisco ISE Dashboard: assets/dashboards/rapdev_cisco_ise_dashboard.json
    RapDev Cisco ISR Dashboard: assets/dashboards/rapdev_cisco_isr_dashboard.json
    RapDev Cisco ISR Overview: assets/dashboards/rapdev_cisco_isr_dashboard.json
    RapDev Cisco Meraki Dashboard: assets/dashboards/rapdev_cisco_meraki_dashboard.json
    RapDev Cisco UCM Dashboard: assets/dashboards/rapdev_cisco_ucm_dashboard.json
    RapDev Cisco UCS Dashboard: assets/dashboards/rapdev_cisco_ucs_dashboard.json
    RapDev Cisco WLC Dashboard: assets/dashboards/rapdev_cisco_wlc_dashboard.json
    RapDev Citrix Netscaler Dashboard: assets/dashboards/rapdev_citrix_netscaler_dashboard.json
    RapDev Dell VRTX Dashboard: assets/dashboards/rapdev_dell_vrtx_dashboard.json
    RapDev F5 BigIP Dashboard: assets/dashboards/rapdev_f5_bigip_dashboard.json
    RapDev Fortinet Fortigate Dashboard: assets/dashboards/rapdev_fortinet_fortigate_dashboard.json
    RapDev HP iLO Dashboard: assets/dashboards/rapdev_hpe_ilo_dashboard.json
    RapDev Ironport Mail Dashboard: assets/dashboards/rapdev_ironport_mail_dashboard.json
    RapDev Juniper SSG Dashboard: assets/dashboards/rapdev_juniper_ssg_dashboard.json
    RapDev Kemp LoadMaster Dashboard: assets/dashboards/rapdev_kemp_loadmaster_dashboard.json
    RapDev Kemp Loadmaster Dashboard: assets/dashboards/rapdev_kemp_loadmaster_dashboard.json
    RapDev Netapp NAS Dashboard: assets/dashboards/rapdev_netapp_nas_dashboard.json
    RapDev Palo Alto NextGen Firewall Dashboard: assets/dashboards/rapdev_palo_alto_nextgen_firewall_dashboard.json
    RapDev Printer Dashboard: assets/dashboards/rapdev_printer_dashboard.json
    RapDev SNMP Device Inventory: assets/dashboards/rapdev_snmp_device_inventory.json
    RapDev ServerTech PDU Gen3 Dashboard: assets/dashboards/rapdev_servertech_pdu_gen3_dashboard.json
    RapDev ServerTech PDU Gen4 Dashboard: assets/dashboards/rapdev_servertech_pdu_gen4_dashboard.json
    RapDev Servertech PDU Gen3 Dashboard: assets/dashboards/rapdev_servertech_pdu_gen3_dashboard.json
    RapDev Servertech PDU Gen4 Dashboard: assets/dashboards/rapdev_servertech_pdu_gen4_dashboard.json
    RapDev Sophos XG Firewall Dashboard: assets/dashboards/rapdev_sophos_xg_firewall_dashboard.json
    RapDev Steelhead Riverbed Dashboard: assets/dashboards/rapdev_steelhead_riverbed_dashboard.json
    RapDev Tripplite PDU Dashboard: assets/dashboards/rapdev_tripplite_pdu_dashboard.json
    RapDev iDRAC Dashboard: assets/dashboards/rapdev_idrac_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snmp.devices_monitored
      metadata_path: metadata.csv
      prefix: snmp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10122
    source_type_name: Perfiles SNMP de RapDev
  monitors:
    Barracuda memory usage is high: assets/monitors/rapdev_barracuda-memory.json
    CMOS battery has an issue: assets/monitors/rapdev_idrac-cmos.json
    CPU load is high: assets/monitors/rapdev_barracuda-cpu.json
    CPU utilization is high: assets/monitors/rapdev_cpu_utilization.json
    Controller has an issue: assets/monitors/rapdev_idrac-raidcontrollerstate.json
    Disk has an issue: assets/monitors/rapdev_idrac-diskstatus.json
    Fan has an issue: assets/monitors/rapdev_idrac-fanstatus.json
    LCD has an issue: assets/monitors/rapdev_idrac-lcdstatus.json
    Memory DIMM has an issue: assets/monitors/rapdev_idrac-memorystatus.json
    Memory usage is high: assets/monitors/rapdev_memory_utilization.json
    Network port is down: assets/monitors/rapdev_idrac-nicconnectionstatus.json
    Operation status is in a bad state: assets/monitors/rapdev_interface_operstatus.json
    Power supply Sensor has an issue: assets/monitors/rapdev_idrac-psu-sensorstate.json
    Power supply has an issue: assets/monitors/rapdev_idrac-overallpowerstatus.json
    Power supply state settings has an issue: assets/monitors/rapdev_idrac-psu-statesettings.json
    Printer is in alert: assets/monitors/rapdev_printer_issue.json
    Service state changed: assets/monitors/rapdev_barracuda-servicestate.json
    Storage has an issue: assets/monitors/rapdev_idrac-overallstoragestate.json
    System BIOS has an issue: assets/monitors/rapdev_idrac-biosstatus.json
    Temperature sensor has an issue: assets/monitors/rapdev_idrac-tempsensorstatus.json
    VPN tunnel is downr: assets/monitors/rapdev_fortigate_tunnel.json
    Voltage has an issue: assets/monitors/rapdev_idrac-voltagestatus.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- la red
- snmp
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev-snmp-profiles
integration_id: rapdev-snmp-profiles
integration_title: Perfiles SNMP
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev-snmp-profiles
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: snmp.systemServices
  product_id: perfiles snmp
  short_description: Precio unitario por dispositivo
  tag: dispositivo_snmp
  unit_label: Dispositivo SNMP
  unit_price: 6
public_title: Perfiles SNMP
short_description: Capacidad de observación de dispositivos SNMP con perfiles de dispositivos
  de detección automática
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Categoría::Red
  - Categoría::SNMP
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Capacidad de observación de dispositivos SNMP con perfiles de dispositivos
    de detección automática
  media:
  - caption: Presentación de los perfiles SNMP de RapDev
    image_url: images/vídeo.png
    media_type: vídeo
    vimeo_id: 630489707
  - caption: Dashboard de Cisco Meraki
    image_url: images/6.png
    media_type: imagen
  - caption: Dashboard de cortafuegos de Palo Alto
    image_url: images/2.png
    media_type: imagen
  - caption: Dashboard de Dell iDRAC
    image_url: images/3.png
    media_type: imagen
  - caption: Ejemplo de etiquetado de hardware de servidor
    image_url: images/5.png
    media_type: imagen
  - caption: Ejemplo de métrica de HP iLO3/4
    image_url: images/1.png
    media_type: imagen
  - caption: Ejemplo de métrica de Dell iDRAC
    image_url: images/4.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Perfiles SNMP
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## Información general

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="Presentación de perfiles SNMP de RapDev" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

El paquete de perfiles SNMP de RapDev admite más de 150 perfiles de dispositivos de forma nativa y tiene dashboards previamente creados para todos los dispositivos de hardware soportados, para ayudarte a monitorizarlos al instante. Se han dedicado varios cientos de horas en la puesta a punto de los perfiles, para asegurar que recopilen todas las métricas relevantes con las etiquetas (tags) necesarias, incluyendo números de serie, versiones de firmware, versiones de hardware y más. Esta integración se puede desplegar en minutos para empezar a monitorizar, visualizar y alertar inmediatamente.

La integración te dará acceso a cientos de perfiles YAML y desplegará automáticamente una cierta cantidad de nuevos dashboards en tu instancia. Luego, utilizará la detección automática SNMP nativa en Datadog para detectar automáticamente cualquier hardware compatible y comenzará a sondear los identificadores de objetos utilizando la integración SNMP nativa en Datadog.
No necesitas gestionar, editar, modificar o actualizar ningún perfil SNMP en tu Datadog Agent o YAML. Esta integración se encargará de todo eso para que puedas simplemente empezar a monitorizar y alertar.

### Dispositivos compatibles
A continuación se muestra una lista de los dispositivos actualmente compatibles. Para ver una completa lista actualizada de todos los dispositivos, consulta nuestro [sitio web](https://www.rapdev.io/products/Datadog-snmp-profiles).

| Fabricante | Modelo                 | Versión       |
| ------------ | --------------------- | ------------- |
| APC          | Smart UPS             | Todas           |
| APC          | SmartCard             | Todas           |
| Arista       | Switch                | 7xxx          |
| Aruba        | Switch                | Todas           |
| AudioCodes   | Mediant SBC           | Todas           |
| Barracuda    | CloudGen Firewall     | 6,7,8         |
| Brocade      | VDX                   | Todas           |
| Checkpoint   | Cortafuegos Gaia/en la nube   | 77 o posterior           |
| Cisco        | ASA                   | 5xxx          |
| Cisco        | ASR                   | Todas           |
| Cisco        | Catalyst              | Todas           |
| Cisco        | CUBE                  | iOS           |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | ISE                   | Todas           |
| Cisco        | ISR                   | 38XX, 44xx    |
| Cisco        | Nexus                 | Todas           |
| Cisco        | UCM                   | Todas           |
| Cisco        | UCS                   | M2, M3, M4    |
| Cisco        | WLC                   | Todas           |
| Citrix       | Netscaler             | Todas           |
| Dell         | iDRAC                 | 7,8,9         |
| Dell         | Powerconnect          | OS10          |
| Dell         | Powerconnect          | 3000          |
| F5           | Big-IP                | 9.4.x a 15.x |
| FortiNet     | FortiGate             | Todas           |
| HPE          | ProLiant Gen8-10      | iLO4,iLO5     |
| HPE          | Switch                |               |
| Ironport     | Mail                  | C3,C6,X1070   |
| Juniper      | SSG                   | Todas           |
| Kemp         | Loadmaster            | Todas           |
| Meraki       | CloudController       | CC            |
| Meraki       | Switch                | MR, MS, MX, Z |
| Nasuni       | Filer                 | Todas           |
| Palo Alto    | NextGen Firewall      | 9.x           |
| ServerTech   | PDU                   | Gen3, Gen4    |
| Sharp        | Printer               | Todas           |
| Steelhead    | Riverbed              | CX, EX        |
| VMware       | ESXi                  | 6.x           |

## Agent
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales: 

 - Correo electrónico: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222 

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.