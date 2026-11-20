---
app_id: rapdev-snmp-profiles
app_uuid: e82be05a-2fd2-44eb-9297-4fec152925a3
assets:
  dashboards:
    RapDev APC PDU Dashboard: assets/dashboards/rapdev_apc_pdu_dashboard.json
    RapDev APC UPS Dashboard: assets/dashboards/rapdev_apc_ups_dashboard.json
    RapDev Arista Switch Dashboard: assets/dashboards/rapdev_arista_switch_dashboard.json
    RapDev Aruba Switch Dashboard: assets/dashboards/rapdev_aruba_switch_dashboard.json
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
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: snmp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Profils SNMP par RapDev
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
    iDRAC Disk State Monitor: assets/monitors/rapdev_idrac-diskstate.json
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
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- snmp
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev-snmp-profiles
integration_id: rapdev-snmp-profiles
integration_title: Profils SNMP
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev-snmp-profiles
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: snmp.systemServices
  product_id: snmp-profiles
  short_description: Prix unitaire par périphérique
  tag: snmp_device
  unit_label: Périphérique SNMP
  unit_price: 6
public_title: Profils SNMP
short_description: Visualisez vos périphériques SNMP avec les profils de périphérique
  Autodiscovery
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Marketplace
  - Category::SNMP
  - Offering::Integration
  configuration: README.md#Setup
  description: Visualisez vos périphériques SNMP avec les profils de périphérique
    Autodiscovery
  media:
  - caption: Présentation des profils SNMP par RapDev
    image_url: images/video.png
    media_type: video
    vimeo_id: 630489707
  - caption: Dashboard Cisco Meraki
    image_url: images/6.png
    media_type: image
  - caption: Dashboard pour pare-feu Palo Alto
    image_url: images/2.png
    media_type: image
  - caption: Dashboard Dell iDRAC
    image_url: images/3.png
    media_type: image
  - caption: Exemple de tag pour serveurs physiques
    image_url: images/5.png
    media_type: image
  - caption: Exemple de métrique HP iLO3/4
    image_url: images/1.png
    media_type: image
  - caption: Exemple de métrique Dell iDRAC
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Profils SNMP
---


## Présentation

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="Présentation des profils de périphérique SNMP RapDev" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

Le package SNMP Profiles de RapDev prend en charge plus de 150 profils de périphérique de manière native et intègre des dashboards préconfigurés pour vous permettre de surveiller instantanément tous les périphériques pris en charge. Plusieurs centaines d'heures de travail ont été passées à paramétrer les profils afin de recueillir l'ensemble des métriques pertinentes avec les tags requis : numéros de série, versions du firmware, versions du matériel, et bien plus encore. Cette intégration peut être déployée en quelques minutes afin de commencer à surveiller, visualiser et recevoir des alertes sans attendre.

Cette intégration vous donnera accès à des centaines de profils YAML et déploiera automatiquement plusieurs nouveaux dashboards sur votre instance. Elle utilisera ensuite la fonctionnalité Autodiscovery de Datadog pour détecter automatiquement tous les périphériques pris en charge, et commencera à interroger les OID grâce à l'intégration native de SNMP avec Datadog.
Aucune gestion, modification ou mise à jour de vos profils SNMP est nécessaire depuis votre Agent Datadog ou vos fichiers YAML. L'intégration se charge de tout : il ne vous reste plus qu'à surveiller vos périphériques et à attendre de recevoir des alertes.

### Appareils pris en charge
Vous trouverez ci-dessous la liste des périphériques actuellement pris en charge. Consultez notre [site](https://www.rapdev.io/products/datadog-snmp-profiles) pour obtenir la liste complète et actuelle des périphériques.

| Fabricant | Modèle                 | Version       |
| ------------ | --------------------- | ------------- |
| APC          | Smart UPS             | Toutes           |
| APC          | SmartCard             | Toutes           |
| Arista       | Switch                | 7xxx          |
| Aruba        | Switch                | Toutes           |
| AudioCodes   | Mediant SBC           | Toutes           |
| Barracuda    | CloudGen Firewall     | 6,7,8         |
| Brocade      | VDX                   | Toutes           |
| Checkpoint   | Gaia/Cloud Firewall   | 77+           |
| Cisco        | ASA                   | 5xxx          |
| Cisco        | ASR                   | Toutes           |
| Cisco        | Catalyst              | Toutes           |
| Cisco        | CUBE                  | IOS           |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | ISE                   | Toutes           |
| Cisco        | ISR                   | 38XX, 44xx    |
| Cisco        | Nexus                 | Toutes           |
| Cisco        | UCM                   | Toutes           |
| Cisco        | UCS                   | M2, M3, M4    |
| Cisco        | WLC                   | Toutes           |
| Citrix       | Netscaler             | Toutes           |
| Dell         | iDRAC                 | 7,8,9         |
| Dell         | Powerconnect          | OS10          |
| Dell         | Powerconnect          | 3000          |
| F5           | Big-IP                | 9.4.x à 15.x |
| FortiNet     | FortiGate             | Toutes           |
| HPE          | ProLiant Gen8-10      | iLO4,iLO5     |
| HPE          | Switch                |               |
| Ironport     | Mail                  | C3,C6,X1070   |
| Juniper      | SSG                   | Toutes           |
| Kemp         | Loadmaster            | Toutes           |
| Meraki       | CloudController       | CC            |
| Meraki       | Switch                | MR, MS, MX, Z |
| Nasuni       | Filer                 | Toutes           |
| Palo Alto    | NextGen Firewall      | 9.x           |
| ServerTech   | PDU                   | Gen3, Gen4    |
| Sharp        | Printer               | Toutes           |
| Steelhead    | Riverbed              | CX, EX        |
| VMware       | ESXi                  | 6.x           |

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : datadog-engineering@rapdev.io 
 - Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles" target="_blank">Cliquez ici</a> pour l'acheter.