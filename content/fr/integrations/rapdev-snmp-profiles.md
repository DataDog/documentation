---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards":
    "RapDev APC UPS Dashboard": assets/dashboards/rapdev_apc_ups_dashboard.json
    "RapDev Arista Switch Dashboard": assets/dashboards/rapdev_arista_switch_dashboard.json
    "RapDev Barracuda CloudGen Firewall Dashboard": assets/dashboards/rapdev_barracuda_cloudgen_firewall_dashboard.json
    "RapDev Cisco ASA Dashboard": assets/dashboards/rapdev_cisco_asa_dashboard.json
    "RapDev Cisco ASR Dashboard": assets/dashboards/rapdev_cisco_asr_dashboard.json
    "RapDev Cisco CUBE Dashboard": assets/dashboards/rapdev_cisco_cube_dashboard.json
    "RapDev Cisco Catalyst Dashboard": assets/dashboards/rapdev_cisco_catalyst_dashboard.json
    "RapDev Cisco ISR Overview": assets/dashboards/rapdev_cisco_isr_dashboard.json
    "RapDev Cisco Meraki Dashboard": assets/dashboards/rapdev_cisco_meraki_dashboard.json
    "RapDev Cisco UCM Dashboard": assets/dashboards/rapdev_cisco_ucm_dashboard.json
    "RapDev Cisco UCS Dashboard": assets/dashboards/rapdev_cisco_ucs_dashboard.json
    "RapDev Citrix Netscaler Dashboard": assets/dashboards/rapdev_citrix_netscaler_dashboard.json
    "RapDev F5 BigIP Dashboard": assets/dashboards/rapdev_f5_bigip_dashboard.json
    "RapDev Fortinet Fortigate Dashboard": assets/dashboards/rapdev_fortinet_fortigate_dashboard.json
    "RapDev HP iLO Dashboard": assets/dashboards/rapdev_hpe_ilo_dashboard.json
    "RapDev Kemp LoadMaster Dashboard": assets/dashboards/rapdev_kemp_loadmaster_dashboard.json
    "RapDev Palo Alto NextGen Firewall Dashboard": assets/dashboards/rapdev_palo_alto_nextgen_firewall_dashboard.json
    "RapDev SNMP Device Inventory": assets/dashboards/rapdev_snmp_device_inventory.json
    "RapDev Tripplite PDU Dashboard": assets/dashboards/rapdev_tripplite_pdu_dashboard.json
    "RapDev iDRAC Dashboard": assets/dashboards/rapdev_idrac_dashboard.json
    "Rapdev APC PDU Dashboard": assets/dashboards/rapdev_apc_pdu_dashboard.json
  "monitors": {}
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

Vous trouverez ci-dessous la liste des périphériques actuellement pris en charge. Consultez notre site pour obtenir la liste complète et mise à jour des périphériques.

| Fabricant | Modèle                 | Version       |
| ------------ | --------------------- | ------------- |
| Dell         | iDRAC                 | 7             |
| Dell         | iDRAC                 | 8             |
| Dell         | iDRAC                 | 9             |
| HP           | ProLiant Gen8         | iLO 4         |
| HP           | ProLiant Gen9         | iLO 4         |
| HP           | ProLiant Gen10        | iLO 5         |
| APC          | Smart UPS             | Tous           |
| APC          | SmartCard             | Tous           |
| F5           | Big-IP                | 9.4.x à 15.x |
| Cisco        | ASA                   | 5505          |
| Cisco        | ASA                   | 5510          |
| Cisco        | ASA                   | 5525          |
| Cisco        | ASA                   | 5540          |
| Cisco        | UCS                   | M2            |
| Cisco        | UCS                   | M3            |
| Cisco        | UCS                   | M4            |
| Cisco        | Catalyst              | 2960          |
| Cisco        | Catalyst              | 3650          |
| Cisco        | Catalyst              | 4500          |
| Cisco        | Catalyst              | 3750          |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | Nexus                 | 9k            |
| Cisco        | ISR                   | 44XX          |
| Cisco        | ISR                   | 38XX          |
| Cisco        | CUBE                  | IOS           |
| Cisco        | Unified Call Manager  | 8.x à 12.x   |
| Cisco        | ASR                   | Tous           |
| Checkpoint   | GAIA                  | 77 à 80.30   |
| Checkpoint   | Cloud Firewall        | 77 à 80.30   |
| Barracuda    | Next Gen Firewall     | 6, 7, 8       |
| Barracuda    | SPAM Filter           | 6, 7, 8       |
| Palo Alto    | Next Gen Firewall     | 9.x           |
| Nutanix      | Cluster               | Tous           |
| Nutanix      | Container Stats       | Tous           |
| Nutanix      | Controllers           | Tous           |
| Nutanix      | Disks                 | Tous           |
| Nutanix      | Hypervisors           | Tous           |
| Nutanix      | Storage Pools         | Tous           |
| Nutanix      | Virtual Machine Stats | Tous           |
| FortiNet     | FortiGate             | Tous           |
| Cisco        | Meraki                | MR-Series     |
| Cisco        | Meraki                | Z-Series      |
| Cisco        | Meraki                | MX-Series     |
| Cisco        | Meraki                | MS-Series     |
| Dell         | Powerconnect          | 2000          |
| Dell         | Powerconnect          | 3000          |
| Dell         | Powerconnect          | 5000          |
| Dell         | Powerconnect          | 6000          |
| Dell         | Powerconnect          | 7000          |
| Dell         | Powerconnect          | 8000          |
| Dell         | PowerEdge Chassis     | M1000e        |
| Dell         | PowerEdge Chassis     | MX7000        |
| HP           | C7000                 | Tous           |
| Citrix       | Netscaler             | Tous           |
| Kemp         | Loadmaster            | Tous           |
| Arista       | Ethernet Switches     | 7500          |
| Arista       | Ethernet Switches     | 7400          |
| Arista       | Ethernet Switches     | 7300          |
| Arista       | Ethernet Switches     | 7200          |
| Arista       | Ethernet Switches     | 7100          |

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

 - E-mail : integrations@rapdev.io 
 - Chat : [RapDev.io/products](https://rapdev.io/products)
 - Téléphone : 855-857-0222 

---
Développé avec ❤️  à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez-nous](mailto:integrations@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/pricing) pour l'acheter.

