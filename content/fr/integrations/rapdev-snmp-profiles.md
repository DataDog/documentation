---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev APC PDU Dashboard": assets/dashboards/rapdev_apc_pdu_dashboard.json
    "RapDev APC UPS Dashboard": assets/dashboards/rapdev_apc_ups_dashboard.json
    "RapDev Arista Switch Dashboard": assets/dashboards/rapdev_arista_switch_dashboard.json
    "RapDev Barracuda CloudGen Firewall Dashboard": assets/dashboards/rapdev_barracuda_cloudgen_firewall_dashboard.json
    "RapDev Bluecoat SG Dashboard": assets/dashboards/rapdev_bluecoat_sg_dashboard.json
    "RapDev Checkpoint SVN Dashboard": assets/dashboards/rapdev_checkpoint_svn_dashboard.json
    "RapDev Cisco ASA Dashboard": assets/dashboards/rapdev_cisco_asa_dashboard.json
    "RapDev Cisco ASR Dashboard": assets/dashboards/rapdev_cisco_asr_dashboard.json
    "RapDev Cisco CUBE Dashboard": assets/dashboards/rapdev_cisco_cube_dashboard.json
    "RapDev Cisco Catalyst Dashboard": assets/dashboards/rapdev_cisco_catalyst_dashboard.json
    "RapDev Cisco ISE Dashboard": assets/dashboards/rapdev_cisco_ise_dashboard.json
    "RapDev Cisco ISR Overview": assets/dashboards/rapdev_cisco_isr_dashboard.json
    "RapDev Cisco Meraki Dashboard": assets/dashboards/rapdev_cisco_meraki_dashboard.json
    "RapDev Cisco UCM Dashboard": assets/dashboards/rapdev_cisco_ucm_dashboard.json
    "RapDev Cisco UCS Dashboard": assets/dashboards/rapdev_cisco_ucs_dashboard.json
    "RapDev Cisco WLC Dashboard": assets/dashboards/rapdev_cisco_wlc_dashboard.json
    "RapDev Citrix Netscaler Dashboard": assets/dashboards/rapdev_citrix_netscaler_dashboard.json
    "RapDev Dell VRTX Dashboard": assets/dashboards/rapdev_dell_vrtx_dashboard.json
    "RapDev F5 BigIP Dashboard": assets/dashboards/rapdev_f5_bigip_dashboard.json
    "RapDev Fortinet Fortigate Dashboard": assets/dashboards/rapdev_fortinet_fortigate_dashboard.json
    "RapDev HP iLO Dashboard": assets/dashboards/rapdev_hpe_ilo_dashboard.json
    "RapDev Juniper SSG Dashboard": assets/dashboards/rapdev_juniper_ssg_dashboard.json
    "RapDev Kemp LoadMaster Dashboard": assets/dashboards/rapdev_kemp_loadmaster_dashboard.json
    "RapDev Palo Alto NextGen Firewall Dashboard": assets/dashboards/rapdev_palo_alto_nextgen_firewall_dashboard.json
    "RapDev Printer Dashboard": assets/dashboards/rapdev_printer_dashboard.json
    "RapDev SNMP Device Inventory": assets/dashboards/rapdev_snmp_device_inventory.json
    "RapDev Servertech PDU Gen3 Dashboard": assets/dashboards/rapdev_servertech_pdu_gen3_dashboard.json
    "RapDev Servertech PDU Gen4 Dashboard": assets/dashboards/rapdev_servertech_pdu_gen4_dashboard.json
    "RapDev Tripplite PDU Dashboard": assets/dashboards/rapdev_tripplite_pdu_dashboard.json
    "RapDev iDRAC Dashboard": assets/dashboards/rapdev_idrac_dashboard.json
  "monitors":
    "Barracuda CPU Monitor": assets/monitors/rapdev_barracuda-cpu.json
    "Barracuda Memory Monitor": assets/monitors/rapdev_barracuda-memory.json
    "Barracuda Service State Monitor": assets/monitors/rapdev_barracuda-servicestate.json
    "CPU Utilization Monitor": assets/monitors/rapdev_cpu_utilization.json
    "Fortigate Tunnel Monitor": assets/monitors/rapdev_fortigate_tunnel.json
    "Interface Status Monitor": assets/monitors/rapdev_interface_operstatus.json
    "Memory Utilization Monitor": assets/monitors/rapdev_memory_utilization.json
    "Printer Issue Monitor": assets/monitors/rapdev_printer_issue.json
    "iDRAC Bios Status Monitor": assets/monitors/rapdev_idrac-biosstatus.json
    "iDRAC CMOS Monitor": assets/monitors/rapdev_idrac-cmos.json
    "iDRAC Disk State Monitor": assets/monitors/rapdev_idrac-diskstate.json
    "iDRAC Disk Status Monitor": assets/monitors/rapdev_idrac-diskstatus.json
    "iDRAC Fan Status Monitor": assets/monitors/rapdev_idrac-fanstatus.json
    "iDRAC LCD Status Monitor": assets/monitors/rapdev_idrac-lcdstatus.json
    "iDRAC Memory Status Monitor": assets/monitors/rapdev_idrac-memorystatus.json
    "iDRAC NIC Connection Status Monitor": assets/monitors/rapdev_idrac-nicconnectionstatus.json
    "iDRAC Overall Power Status Monitor": assets/monitors/rapdev_idrac-overallpowerstatus.json
    "iDRAC Overall Storage State Monitor": assets/monitors/rapdev_idrac-overallstoragestate.json
    "iDRAC PSU Sensor State Monitor": assets/monitors/rapdev_idrac-psu-sensorstate.json
    "iDRAC PSU State Settings Monitor": assets/monitors/rapdev_idrac-psu-statesettings.json
    "iDRAC RAID Controller State Monitor": assets/monitors/rapdev_idrac-raidcontrollerstate.json
    "iDRAC Temp Sensor Status": assets/monitors/rapdev_idrac-tempsensorstatus.json
    "iDRAC Voltage Status Monitor": assets/monitors/rapdev_idrac-voltagestatus.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.rapdev.io"
  "name": RapDev.io
"categories":
- marketplace
- snmp
"creates_events": false
"ddtype": "crawler"
"dependencies": []
"display_name": "Profils SNMP par RapDev"
"draft": false
"git_integration_title": "rapdev-snmp-profiles"
"guid": "d6a64068-821a-4e71-b724-b3a395389609"
"integration_id": "rapdev-snmp-profiles"
"integration_title": "Profils SNMP par RapDev"
"is_public": true
"kind": "integration"
"maintainer": "integrations@rapdev.io"
"manifest_version": "1.0.0"
"metric_prefix": "snmp."
"metric_to_check": ""
"name": "rapdev-snmp-profiles"
"pricing":
- "billing_type": tag_count
  "metric": snmp.systemServices
  "tag": snmp_device
  "unit_label": Périphérique SNMP
  "unit_price": !!float "6.0"
"public_title": "Profils SNMP par RapDev"
"short_description": "Surveillez et visualisez vos périphériques SNMP avec les profils de périphérique Autodiscovery."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---


## Présentation

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="Présentation des profils de périphérique SNMP RapDev" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

Le package SNMP Profiles de RapDev prend en charge plus de 150 profils de périphérique de manière native et intègre des dashboards préconfigurés pour vous permettre de surveiller instantanément tous les périphériques pris en charge. Plusieurs centaines d'heures de travail ont été passées à paramétrer les profils afin de recueillir l'ensemble des métriques pertinentes avec les tags requis : numéros de série, versions du firmware, versions du matériel, et bien plus encore. Cette intégration peut être déployée en quelques minutes afin de commencer à surveiller, visualiser et recevoir des alertes sans attendre.

Cette intégration vous donnera accès à des centaines de profils YAML et déploiera automatiquement plusieurs nouveaux dashboards sur votre instance. Elle utilisera ensuite la fonctionnalité Autodiscovery de Datadog pour détecter automatiquement tous les périphériques pris en charge, et commencera à interroger les OID grâce à l'intégration native de SNMP avec Datadog.
Aucune gestion, modification ou mise à jour de vos profils SNMP est nécessaire depuis votre Agent Datadog ou vos fichiers YAML. L'intégration se charge de tout : il ne vous reste plus qu'à surveiller vos périphériques et à attendre de recevoir des alertes.

Vous trouverez ci-dessous quelques captures d'écran des dashboards fournis avec cette intégration.

### Dashboard pour Cisco Meraki
{{< img src="marketplace/rapdev-snmp-profiles/images/6.png" alt="Screenshot6" >}}

### Dashboard pour pare-feu Palo Alto
{{< img src="marketplace/rapdev-snmp-profiles/images/2.png" alt="Screenshot2" >}}

### Dashboard pour serveurs iDRAC Dell
{{< img src="marketplace/rapdev-snmp-profiles/images/3.png" alt="Screenshot3" >}}

### Exemples de tags recueillis pour les serveurs physiques
{{< img src="marketplace/rapdev-snmp-profiles/images/5.png" alt="Screenshot5" >}}

### Exemples de métriques recueillies pour HP iLO3/4
{{< img src="marketplace/rapdev-snmp-profiles/images/1.png" alt="Screenshot1" >}}

### Exemples de métriques recueillies pour serveurs iDRAC Dell
{{< img src="marketplace/rapdev-snmp-profiles/images/4.png" alt="Screenshot4" >}}

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

 - E-mail : integrations@rapdev.io 
 - Chat : [RapDev.io](https://rapdev.io/)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/pricing) pour l'acheter.

