---
algolia:
  subcategory: Marketplace Integrations
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
    source_type_name: RapDev SNMP Profiles
  monitors:
    Barracuda CPU Monitor: assets/monitors/rapdev_barracuda-cpu.json
    Barracuda Memory Monitor: assets/monitors/rapdev_barracuda-memory.json
    Barracuda Service State Monitor: assets/monitors/rapdev_barracuda-servicestate.json
    CPU Utilization Monitor: assets/monitors/rapdev_cpu_utilization.json
    Fortigate Tunnel Monitor: assets/monitors/rapdev_fortigate_tunnel.json
    Interface Status Monitor: assets/monitors/rapdev_interface_operstatus.json
    Memory Utilization Monitor: assets/monitors/rapdev_memory_utilization.json
    Printer Issue Monitor: assets/monitors/rapdev_printer_issue.json
    iDRAC Bios Status Monitor: assets/monitors/rapdev_idrac-biosstatus.json
    iDRAC CMOS Monitor: assets/monitors/rapdev_idrac-cmos.json
    iDRAC Disk Status Monitor: assets/monitors/rapdev_idrac-diskstatus.json
    iDRAC Fan Status Monitor: assets/monitors/rapdev_idrac-fanstatus.json
    iDRAC LCD Status Monitor: assets/monitors/rapdev_idrac-lcdstatus.json
    iDRAC Memory Status Monitor: assets/monitors/rapdev_idrac-memorystatus.json
    iDRAC NIC Connection Status Monitor: assets/monitors/rapdev_idrac-nicconnectionstatus.json
    iDRAC Overall Power Status Monitor: assets/monitors/rapdev_idrac-overallpowerstatus.json
    iDRAC Overall Storage State Monitor: assets/monitors/rapdev_idrac-overallstoragestate.json
    iDRAC PSU Sensor State Monitor: assets/monitors/rapdev_idrac-psu-sensorstate.json
    iDRAC PSU State Settings Monitor: assets/monitors/rapdev_idrac-psu-statesettings.json
    iDRAC RAID Controller State Monitor: assets/monitors/rapdev_idrac-raidcontrollerstate.json
    iDRAC Temp Sensor Status: assets/monitors/rapdev_idrac-tempsensorstatus.json
    iDRAC Voltage Status Monitor: assets/monitors/rapdev_idrac-voltagestatus.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- network
- snmp
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev-snmp-profiles
integration_id: rapdev-snmp-profiles
integration_title: SNMP Profiles
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev-snmp-profiles
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: snmp.systemServices
  product_id: snmp-profiles
  short_description: Unit price per device
  tag: snmp_device
  unit_label: SNMP Device
  unit_price: 6
public_title: SNMP Profiles
short_description: Observability into SNMP devices with autodiscovery device profiles
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Network
  - Category::SNMP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Observability into SNMP devices with autodiscovery device profiles
  media:
  - caption: RapDev SNMP Profiles Introduction
    image_url: images/video.png
    media_type: video
    vimeo_id: 630489707
  - caption: Cisco Meraki Dashboard
    image_url: images/6.png
    media_type: image
  - caption: Palo Alto Firewalls Dashboard
    image_url: images/2.png
    media_type: image
  - caption: Dell iDRAC Dashboard
    image_url: images/3.png
    media_type: image
  - caption: Server Hardware Tag Example
    image_url: images/5.png
    media_type: image
  - caption: HP iLO3/4 Metric Sample
    image_url: images/1.png
    media_type: image
  - caption: Dell iDRAC Metric Sample
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SNMP Profiles
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## Overview

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="RapDev SNMP Profiles Introduction" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

The RapDev SNMP Profiles package supports over 150 device profiles natively, and has pre-built dashboards for all supported hardware devices to help you monitor them instantly. Several hundred hours have gone into tuning the profiles to ensure that they collect all relevant metrics with the necessary tags, including serial numbers, firmware versions, hardware versions, and more. This integration can be deployed in minutes and start monitoring, visualizing, and alerting immediately.

The integration will give you access to hundreds of YAML profiles, and will auto-deploy a number of new dashboards on your instance. It will then use the native Datadog SNMP Autodiscovery to automatically detect any supported hardware, and start polling the OIDs using the native Datadog SNMP integration.
There is no need for you to manage, edit, modify, or update any SNMP profiles on your Datadog agent or YAML. All of that is taken care of with this integration, and you can simply start monitoring and alerting.

### Supported Devices
Below is a list of the currently supported devices, please visit our [website](https://www.rapdev.io/products/datadog-snmp-profiles) for a full updated list of all devices.

| Manufacturer | Model                 | Version       |
| ------------ | --------------------- | ------------- |
| APC          | Smart UPS             | All           |
| APC          | SmartCard             | All           |
| Arista       | Switch                | 7xxx          |
| Aruba        | Switch                | All           |
| AudioCodes   | Mediant SBC           | All           |
| Barracuda    | CloudGen Firewall     | 6,7,8         |
| Brocade      | VDX                   | All           |
| Checkpoint   | Gaia/Cloud Firewall   | 77+           |
| Cisco        | ASA                   | 5xxx          |
| Cisco        | ASR                   | All           |
| Cisco        | Catalyst              | All           |
| Cisco        | CUBE                  | IOS           |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | ISE                   | All           |
| Cisco        | ISR                   | 38XX, 44xx    |
| Cisco        | Nexus                 | All           |
| Cisco        | UCM                   | All           |
| Cisco        | UCS                   | M2, M3, M4    |
| Cisco        | WLC                   | All           |
| Citrix       | Netscaler             | All           |
| Dell         | iDRAC                 | 7,8,9         |
| Dell         | Powerconnect          | OS10          |
| Dell         | Powerconnect          | 3000          |
| F5           | Big-IP                | 9.4.x to 15.x |
| FortiNet     | FortiGate             | All           |
| HPE          | ProLiant Gen8-10      | iLO4,iLO5     |
| HPE          | Switch                |               |
| Ironport     | Mail                  | C3,C6,X1070   |
| Juniper      | SSG                   | All           |
| Kemp         | Loadmaster            | All           |
| Meraki       | CloudController       | CC            |
| Meraki       | Switch                | MR, MS, MX, Z |
| Nasuni       | Filer                 | All           |
| Palo Alto    | NextGen Firewall      | 9.x           |
| ServerTech   | PDU                   | Gen3, Gen4    |
| Sharp        | Printer               | All           |
| Steelhead    | Riverbed              | CX, EX        |
| VMware       | ESXi                  | 6.x           |

## Support
For support or feature requests please contact RapDev.io through the following channels: 

 - Email: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Phone: 855-857-0222 

---
Made with ❤️  in Boston

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop us a [note](mailto:support@rapdev.io) and we'll build it!!*

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles" target="_blank">Click Here</a> to purchase this application.