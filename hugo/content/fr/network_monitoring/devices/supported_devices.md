---
further_reading:
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: Blog
  text: Surveiller des datacenters et des périphériques réseau avec Datadog
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: Blog
  text: Présentation de la fonctionnalité Network Device Monitoring
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Surveiller et résoudre des problèmes de performances réseau avec des interruptions
    SNMP
multifiltersearch:
  data:
  - config_files: '[3com.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml)
      <br> [3com-huawei.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com-huawei.yaml)'
    vendor: 3com
  - config_files: '[tp-link.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml)'
    vendor: TP-Link
  - config_files: '[a10.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml)'
    vendor: A10
  - config_files: '[alcatel-lucent.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml)'
    vendor: Alcatel-Lucent
  - config_files: '[anue.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml)'
    vendor: Anue
  - config_files: '[_apc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml)
      <br> [apc_ups.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml)
      <br> [_apc-metadata.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc-metadata.yaml)'
    vendor: APC
  - config_files: '[arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml)
      <br> [_arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml)'
    vendor: '[Arista](https://docs.datadoghq.com/integrations/snmp_arista/)'
  - config_files: '[aruba-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml)
      <br> [_aruba-base.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml)
      <br> [aruba-access-point.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml)
      <br> [aruba.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml)'
    vendor: '[Aruba](https://docs.datadoghq.com/integrations/snmp_aruba/)'
  - config_files: '[audiocodes-mediant-sbc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml)'
    vendor: Audiocodes
  - config_files: '[avaya.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml)'
    vendor: Avaya
  - config_files: '[avocent-acs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml)'
    vendor: Avocent
  - config_files: '[avtech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml)'
    vendor: Avtech
  - config_files: '[barracuda.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml)'
    vendor: '[Barracuda](https://docs.datadoghq.com/integrations/crest_data_systems_barracuda_waf/)'
  - config_files: '[bluecat-server.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml)'
    vendor: BlueCat
  - config_files: '[brocade.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml)'
    vendor: Brocade
  - config_files: '[brother.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml)'
    vendor: Brother
  - config_files: '[chatsworth_pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml)'
    vendor: '[Chatsworth](https://docs.datadoghq.com/integrations/snmp_chatsworth_products/)'
  - config_files: '[checkpoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml)
      <br> [checkpoint-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml)'
    vendor: Checkpoint
  - config_files: '[chrysalis.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml)'
    vendor: Chrysalis
  - config_files: '[cisco-3850.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml)
      <br> [cisco-csr1000v.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml)
      <br> [_cisco-metadata.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml)
      <br> [cisco_uc_virtual_machine.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml)
      <br> [_cisco-voice.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-voice.yaml)'
    vendor: '[Cisco](https://docs.datadoghq.com/integrations/snmp_cisco/)'
  - config_files: '[cisco-aci.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-aci.yaml)'
    vendor: '[Cisco ACI](https://docs.datadoghq.com/integrations/cisco_aci/)'
  - config_files: '[cisco-asa.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml)
      <br> [cisco-asa-5525.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml)'
    vendor: '[Cisco ASA](https://docs.datadoghq.com/integrations/crest_data_systems_cisco_asa/)'
  - config_files: '[cisco-asr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml)'
    vendor: Cisco ASR
  - config_files: '[cisco-catalyst.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml)
      <br> [cisco-catalyst-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml)'
    vendor: Cisco Catalyst
  - config_files: '[cisco_icm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml)'
    vendor: Cisco ICM
  - config_files: '[cisco-ise.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml)'
    vendor: '[Cisco ISE](https://docs.datadoghq.com/integrations/crest_data_systems_cisco_ise/)'
  - config_files: '[cisco-isr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml)
      <br> [cisco_isr_4431.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml)'
    vendor: Cisco ISR
  - config_files: '[meraki-cloud-controller.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml)
      <br> [meraki.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml)'
    vendor: '[Cisco Meraki](https://docs.datadoghq.com/integrations/meraki/)'
  - config_files: '[cisco-nexus.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml)'
    vendor: Cisco Nexus
  - config_files: '[cisco-sb.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml)'
    vendor: Cisco SB
  - config_files: '[cisco-ucs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml)'
    vendor: Cisco UCS
  - config_files: '[_cisco-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml)
      <br> [cisco-legacy-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml)'
    vendor: Cisco WLC
  - config_files: '[citrix.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml)'
    vendor: Citrix
  - config_files: '[cradlepoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml)'
    vendor: Cradlepoint
  - config_files: '[cyberpower-pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml)'
    vendor: Cyberpower
  - config_files: '[dell-poweredge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml)
      <br> [_dell.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml)
      <br> [idrac.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml)
      <br> [isilon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml)'
    vendor: '[Dell](https://docs.datadoghq.com/integrations/snmp_dell/)'
  - config_files: '[dialogic-media-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml)'
    vendor: Dialogic
  - config_files: '[dlink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml)'
    vendor: D-Link
  - config_files: '[eaton-epdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml)'
    vendor: Eaton
  - config_files: '[exagrid.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml)'
    vendor: ExaGrid
  - config_files: '[extreme-switching.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml)'
    vendor: Extreme Networks
  - config_files: '[f5-big-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml)'
    vendor: '[F5](https://docs.datadoghq.com/integrations/snmp_f5/)'
  - config_files: '[fireeye.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml)'
    vendor: FireEye
  - config_files: '[fortinet.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml)
      <br> [fortinet-fortigate.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml)'
    vendor: '[Fortinet](https://docs.datadoghq.com/integrations/snmp_fortinet/)'
  - config_files: '[gigamon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml)'
    vendor: Gigamon
  - config_files: '[hp-ilo.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo.yaml)
      <br> [_hp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml)
      <br> [hpe-proliant.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml)'
    vendor: '[HP](https://docs.datadoghq.com/integrations/snmp_hewlett_packard_enterprise/)'
  - config_files: '[huawei.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/huawei.yaml)'
    vendor: Huawei
  - config_files: '[ixsystems-truenas.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml)'
    vendor: iXsystems
  - config_files: '[ibm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml)'
    vendor: IBM
  - config_files: '[infinera-coriant-groove.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml)'
    vendor: Infinera
  - config_files: '[infoblox-ipam.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml)'
    vendor: '[Infoblox](https://docs.datadoghq.com/integrations/rapdev_infoblox/)'
  - config_files: '[juniper.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper.yaml)
      <br> [juniper-ex.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml)
      <br> [_juniper-junos-generic.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml)
      <br> [juniper-mx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml)'
    vendor: '[Juniper Networks](https://docs.datadoghq.com/integrations/snmp_juniper/)'
  - config_files: '[linksys.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml)'
    vendor: Linksys
  - config_files: '[mcafee-web-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml)'
    vendor: McAfee
  - config_files: '[mikrotik-router.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml)'
    vendor: Mikrotik
  - config_files: '[nasuni-filer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml)'
    vendor: Nasuni
  - config_files: '[nec-univerge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml)'
    vendor: NEC
  - config_files: '[netapp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml)'
    vendor: NetApp
  - config_files: '[netgear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml)'
    vendor: Netgear
  - config_files: '[nvidia.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml)'
    vendor: NVIDIA
  - config_files: '[omron-cj-ethernet-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml)'
    vendor: Omron
  - config_files: '[_opengear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml)'
    vendor: Opengear
  - config_files: '[palo-alto.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml)
      <br> [palo-alto-base.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto-base.yaml)'
    vendor: '[Palo Alto Networks](https://docs.datadoghq.com/integrations/pan_firewall/)'
  - config_files: '[peplink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml)'
    vendor: Peplink
  - config_files: '[pf-sense.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml)'
    vendor: '[pfSense](https://docs.datadoghq.com/integrations/crest_data_systems_pfsense/)'
  - config_files: '[raritan-dominion.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml)'
    vendor: Raritan
  - config_files: '[riverbed.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml)'
    vendor: Riverbed
  - config_files: '[ruckus-zd.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus-zd.yaml)'
    vendor: Ruckus
  - config_files: '[server-iron-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml)'
    vendor: Server Iron
  - config_files: '[servertech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml)'
    vendor: Servertech
  - config_files: '[silverpeak-edgeconnect.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml)'
    vendor: Silverpeak
  - config_files: '[sinetica-eagle-i.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml)'
    vendor: Sinetica
  - config_files: '[sophos-xgs-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml)'
    vendor: Sophos
  - config_files: '[synology-disk-station.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml)'
    vendor: Synology
  - config_files: '[tripplite_pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite_pdu.yaml)'
    vendor: Tripplite
  - config_files: '[_ubiquiti.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml)'
    vendor: Ubiquiti
  - config_files: '[velocloud-edge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml)'
    vendor: Velocloud
  - config_files: '[_vertiv.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml)'
    vendor: Vertiv
  - config_files: '[vmware-esx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml)'
    vendor: VMware
  - config_files: '[watchguard.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml)'
    vendor: Watchguard
  - config_files: '[western-digital-mycloud-ex2-ultra.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml)'
    vendor: Western Digital
  - config_files: '[zebra-printer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml)'
    vendor: Zebra
  - config_files: '[zyxel-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml)'
    vendor: Zyxel
  headers:
  - id: vendor
    name: Fournisseur/Intégration
  - id: config_files
    name: Fichiers de configuration
title: Appareils pris en charge
---
## Périphériques pris en charge {#supported-devices}

La section [profils fournisseurs](#vendor-profiles) ci-dessous répertorie les périphériques de surveillance réseau que Datadog prend en charge avec des profils prêts à l'emploi. Datadog peut également surveiller les périphériques non inclus dans cette liste à l'aide d'un [profil générique](#generic-profile), qui collecte des métriques de base si elles sont applicables à ces périphériques.

### Profil générique {#generic-profile}

Le [profil générique][114] collecte des métriques pour tous les périphériques non pris en charge par un profil fournisseur. Les métriques comprennent TCP, UDP, IP ainsi que des indicateurs d'interface, tels que l'utilisation de la bande passante et le volume envoyé/reçu.

### Profils fournisseurs {#vendor-profiles}

Les périphériques des fournisseurs suivants sont pris en charge avec des profils dédiés.
Si un fournisseur ou un type de périphérique n'est pas répertorié, consultez la section [Dépannage](#troubleshooting) ci-dessous.

**Remarque** : les fournisseurs avec des liens dans la colonne **Fournisseur/Intégration** disposent de pages d'intégration dédiées avec des instructions de configuration supplémentaires, des dashboards et des fonctionnalités de surveillance améliorées. Tous les fournisseurs répertoriés sont pris en charge via SNMP avec les fichiers de configuration indiqués dans la colonne **Fichiers de configuration**.

{{< multifilter-search >}}

## Dépannage {#troubleshooting}

Si un fournisseur ou un type de périphérique est pris en charge, mais que le modèle spécifique ne l'est pas, vous pouvez :

* Créer de nouveaux [profils][2] pour commencer à surveiller de nouveaux modèles de périphériques.

* Contacter [Datadog Support][1] pour demander la prise en charge de votre modèle de périphérique ou des métriques supplémentaires à partir d'une MIB fournisseur. Exécutez un [SNMP walk](#collect-device-data) depuis un host pouvant atteindre le périphérique et incluez le résultat dans votre demande.

  Vous pouvez continuer à utiliser NDM avec les métriques de base génériques disponibles pour votre périphérique.

* Étendez vos profils pour prendre en charge des `sysobjectid` valeurs supplémentaires.

  Par exemple, si vous souhaitez surveiller un autre type de Cisco CSR, vous pouvez modifier directement le profil ISR pour répertorier une autre `sysobjectid` comme ceci :

  ```
  snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
  ```

  **Remarque** : Si vous ne connaissez pas le `sysobjectid` de votre appareil, exécutez un [SNMP walk](#collect-device-data) depuis un host capable d'atteindre l'appareil. Recherchez la valeur renvoyée pour l'OID `1.3.6.1.2.1.1.2.0` et ajoutez-la à la liste `sysobjectid` du profil.


### Collecter les données de l'appareil {#collect-device-data}

Si le Datadog Agent est installé, utilisez sa commande `snmp walk` intégrée pour vérifier la connectivité et collecter la sortie pour une demande de profil d'appareil. Exécutez la commande sur le host de l'Agent en remplaçant les espaces réservés par les informations d'identification SNMP, l'adresse et le port de l'appareil.

{{< tabs >}}
{{% tab "Linux" %}}

Pour SNMP v2 :

```shell
sudo -u dd-agent datadog-agent snmp walk -v 2 -C <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

Pour SNMP v3 :

```shell
sudo -u dd-agent datadog-agent snmp walk -v 3 -u <USER> -a <AUTH_PROTOCOL> -A <AUTH_KEY> -x <PRIV_PROTOCOL> -X <PRIV_KEY> <IP_ADDRESS>:<PORT> 1.3.6
```

{{% /tab %}}
{{% tab "Windows" %}}

Ouvrez l'invite de commande en tant qu'administrateur.

Pour SNMP v2 :

```bat
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

Pour SNMP v3 :

```bat
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH_PROTOCOL> -A <AUTH_KEY> -x <PRIV_PROTOCOL> -X <PRIV_KEY> <IP_ADDRESS>:<PORT> 1.3.6
```

{{% /tab %}}
{{< /tabs >}}

Alternativement, si Net-SNMP est installé, exécutez :

```shell
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

[1]: /fr/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[2]: /fr/network_monitoring/devices/profiles/
[114]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}