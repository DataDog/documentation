---
title: Supported Devices
further_reading:
    - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
      tag: 'Blog'
      text: 'Monitor datacenters and network devices with Datadog'
    - link: 'https://www.datadoghq.com/blog/network-device-monitoring/'
      tag: 'Blog'
      text: 'Introducing Network Device Monitoring'
    - link: 'https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/'
      tag: 'Blog'
      text: 'Monitor and diagnose network performance issues with SNMP Traps'

multifiltersearch:
  headers:
    - name: Vendor
      id: vendor
    - name: Config Files
      id: config_files
    - name: Integration
      id: integration
  data:
    - vendor: 3com
      config_files: '[3com.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml) <br> [3com-huawei.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com-huawei.yaml)'
    - vendor: TP-Link
      config_files: '[tp-link.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml)'
    - vendor: A10
      config_files: '[a10.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml)'
    - vendor: Alcatel-Lucent
      config_files: '[alcatel-lucent.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml)'
    - vendor: Anue
      config_files: '[anue.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml)'
    - vendor: APC
      config_files: '[_apc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml) <br> [apc_ups.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml) <br> [_apc-metadata.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc-metadata.yaml)'
    - vendor: Arista
      config_files: '[arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml) <br> [_arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml)'
      integration: '[Arista](https://docs.datadoghq.com/integrations/snmp_arista/)'
    - vendor: Aruba
      config_files: '[aruba-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml) <br> [_aruba-base.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml) <br> [aruba-access-point.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml) <br> [aruba.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml)'
      integration: '[Aruba](https://docs.datadoghq.com/integrations/snmp_aruba/)'
    - vendor: Audiocodes
      config_files: '[audiocodes-mediant-sbc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml)'
    - vendor: Avaya
      config_files: '[avaya.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml)'
    - vendor: Avocent
      config_files: '[avocent-acs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml)'
    - vendor: Avtech
      config_files: '[avtech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml)'
    - vendor: Barracuda
      config_files: '[barracuda.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml)'
      integration: '[Barracuda](https://docs.datadoghq.com/integrations/crest_data_systems_barracuda_waf/)'
    - vendor: BlueCat
      config_files: '[bluecat-server.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml)'
    - vendor: Brocade
      config_files: '[brocade.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml)'
    - vendor: Brother
      config_files: '[brother.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml)'
    - vendor: Chatsworth
      config_files: '[chatsworth_pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml)'
      integration: '[Chatsworth](https://docs.datadoghq.com/integrations/snmp_chatsworth_products/)'
    - vendor: Checkpoint
      config_files: '[checkpoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml) <br> [checkpoint-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml)'
    - vendor: Chrysalis
      config_files: '[chrysalis.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml)'
    - vendor: Cisco
      config_files: '[cisco-3850.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml) <br> [cisco-csr1000v.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml) <br> [_cisco-metadata.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml) <br> [cisco_uc_virtual_machine.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml) <br> [_cisco-voice.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-voice.yaml)'
      integration: '[Cisco](https://docs.datadoghq.com/integrations/snmp_cisco/)'
    - vendor: Cisco ACI
      config_files: '[cisco-aci.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-aci.yaml)'
      integration: '[Cisco ACI](https://docs.datadoghq.com/integrations/cisco_aci/)'
    - vendor: Cisco ASA
      config_files: '[cisco-asa.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml) <br> [cisco-asa-5525.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml)'
      integration: '[Cisco ASA](https://docs.datadoghq.com/integrations/crest_data_systems_cisco_asa/)'
    - vendor: Cisco ASR
      config_files: '[cisco-asr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml)'
    - vendor: Cisco Catalyst
      config_files: '[cisco-catalyst.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml) <br> [cisco-catalyst-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml)'
    - vendor: Cisco ICM
      config_files: '[cisco_icm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml)'
    - vendor: Cisco ISE
      config_files: '[cisco-ise.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml)'
      integration: '[Cisco ISE](https://docs.datadoghq.com/integrations/crest_data_systems_cisco_ise/)'
    - vendor: Cisco ISR
      config_files: '[cisco-isr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml) <br> [cisco_isr_4431.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml)'
    - vendor: Cisco Nexus
      config_files: '[cisco-nexus.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml)'
    - vendor: Cisco SB
      config_files: '[cisco-sb.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml)'
    - vendor: Cisco UCS
      config_files: '[cisco-ucs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml)'
    - vendor: Cisco WLC
      config_files: '[_cisco-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml) <br> [cisco-legacy-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml)'
    - vendor: Citrix
      config_files: '[citrix.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml)'
    - vendor: Cradlepoint
      config_files: '[cradlepoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml)'
    - vendor: Cyberpower
      config_files: '[cyberpower-pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml)'
    - vendor: Dell
      config_files: '[dell-poweredge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml) <br> [_dell.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml) <br> [idrac.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml) <br> [isilon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml)'
      integration: '[Dell](https://docs.datadoghq.com/integrations/snmp_dell/)'
    - vendor: Dialogic
      config_files: '[dialogic-media-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml)'
    - vendor: D-Link
      config_files: '[dlink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml)'
    - vendor: Eaton
      config_files: '[eaton-epdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml)'
    - vendor: ExaGrid
      config_files: '[exagrid.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml)'
    - vendor: Extreme Networks
      config_files: '[extreme-switching.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml)'
    - vendor: F5
      config_files: '[f5-big-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml)'
      integration: '[F5](https://docs.datadoghq.com/integrations/snmp_f5/)'
    - vendor: FireEye
      config_files: '[fireeye.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml)'
    - vendor: Fortinet
      config_files: '[fortinet.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml) <br> [fortinet-fortigate.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml)'
      integration: '[Fortinet](https://docs.datadoghq.com/integrations/snmp_fortinet/)'
    - vendor: Gigamon
      config_files: '[gigamon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml)'
    - vendor: HP
      config_files: '[hp-ilo.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo.yaml) <br> [_hp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml) <br> [hpe-proliant.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml)'
      integration: '[HP](https://docs.datadoghq.com/integrations/snmp_hewlett_packard_enterprise/)'
    - vendor: Huawei
      config_files: '[huawei.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/huawei.yaml)'
    - vendor: iXsystems
      config_files: '[ixsystems-truenas.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml)'
    - vendor: IBM
      config_files: '[ibm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml)'
    - vendor: Infinera
      config_files: '[infinera-coriant-groove.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml)'
    - vendor: Infoblox
      config_files: '[infoblox-ipam.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml)'
      integration: '[Infoblox](https://docs.datadoghq.com/integrations/rapdev_infoblox/)'
    - vendor: Juniper Networks
      config_files: '[juniper.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper.yaml) <br> [juniper-ex.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml) <br> [_juniper-junos-generic.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml) <br> [juniper-mx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml)'
      integration: '[Juniper Networks](https://docs.datadoghq.com/integrations/snmp_juniper/)'
    - vendor: Linksys
      config_files: '[linksys.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml)'
    - vendor: McAfee
      config_files: '[mcafee-web-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml)'
    - vendor: Meraki
      config_files: '[meraki-cloud-controller.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml) <br> [meraki.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml)'
      integration: '[Meraki](https://docs.datadoghq.com/integrations/meraki/)'
    - vendor: Mikrotik
      config_files: '[mikrotik-router.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml)'
    - vendor: Nasuni
      config_files: '[nasuni-filer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml)'
    - vendor: NEC
      config_files: '[nec-univerge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml)'
    - vendor: NetApp
      config_files: '[netapp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml)'
    - vendor: Netgear
      config_files: '[netgear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml)'
    - vendor: NVIDIA
      config_files: '[nvidia.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml)'
    - vendor: Omron
      config_files: '[omron-cj-ethernet-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml)'
    - vendor: Opengear
      config_files: '[_opengear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml)'
    - vendor: Palo Alto Networks
      config_files: '[palo-alto.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml) <br> [palo-alto-base.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto-base.yaml)'
      integration: '[Palo Alto Networks](https://docs.datadoghq.com/integrations/pan_firewall/)'
    - vendor: Peplink
      config_files: '[peplink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml)'
    - vendor: pfSense
      config_files: '[pf-sense.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml)'
      integration: '[pfSense](https://docs.datadoghq.com/integrations/crest_data_systems_pfsense/)'
    - vendor: Raritan
      config_files: '[raritan-dominion.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml)'
    - vendor: Riverbed
      config_files: '[riverbed.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml)'
    - vendor: Ruckus
      config_files: '[ruckus-zd.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus-zd.yaml)'
    - vendor: Server Iron
      config_files: '[server-iron-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml)'
    - vendor: Servertech
      config_files: '[servertech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml)'
    - vendor: Silverpeak
      config_files: '[silverpeak-edgeconnect.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml)'
    - vendor: Sinetica
      config_files: '[sinetica-eagle-i.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml)'
    - vendor: Sophos
      config_files: '[sophos-xgs-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml)'
    - vendor: Synology
      config_files: '[synology-disk-station.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml)'
    - vendor: Tripplite
      config_files: '[tripplite_pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite_pdu.yaml)'
    - vendor: Ubiquiti
      config_files: '[_ubiquiti.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml)'
    - vendor: Velocloud
      config_files: '[velocloud-edge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml)'
    - vendor: Vertiv
      config_files: '[_vertiv.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml)'
    - vendor: VMware
      config_files: '[vmware-esx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml)'
    - vendor: Watchguard
      config_files: '[watchguard.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml)'
    - vendor: Western Digital
      config_files: '[western-digital-mycloud-ex2-ultra.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml)'
    - vendor: Zebra
      config_files: '[zebra-printer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml)'
    - vendor: Zyxel
      config_files: '[zyxel-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml)'
---

## Supported devices

The [vendor profiles](#vendor-profiles) section below lists the network monitoring devices that Datadog supports with out-of-the-box profiles. Datadog can also monitor devices not included in this list using a [generic profile](#generic-profile), which collects basic metrics if applicable for those devices.

### Generic profile

The [generic profile][114] collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, and volume sent/received.

### Vendor profiles

The following vendor devices are supported with dedicated profiles.
If a vendor or device type isn't listed, see the [Troubleshooting](#troubleshooting) section below.

**Note**: The table below shows two types of support for network devices:
- **Config files**: SNMP profile configuration files that define which metrics to collect from devices. All listed vendors are supported through SNMP.
- **Integration**: Dedicated integration pages with additional setup instructions, dashboards, and enhanced monitoring capabilities. Some vendors have both SNMP profiles and dedicated integrations available.

{{< multifilter-search >}}

## Troubleshooting

If a vendor or device type is supported, but the specific model isn't, you can:

* Create new [profiles][2] to start monitoring new device models.

* Contact [Datadog support][1] to put in a request to support your specific model.

  **Note**: You can continue using NDM, as Datadog collects generic baseline metrics from all devices. If there are unsupported metrics from a vendor MIB, you can send a feature request to Datadog support with the following details: <br></br>

  Run an `snmpwalk` from the requested device and send the following output:

  ```
  snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
  ```

* Extend your profiles to support additional `sysobjectid` values.

  For example, if you want to monitor another type of Cisco CSR, you can modify the ISR profile directly to list another `sysobjectid` like this:

  ```
  snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
  ```

  **Note**: If you do not know the `sysobjectid` of your device, run an `snmpwalk` on a host that can reach your device. Use the output to list the profile to match against


[1]: /network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[2]: /network_monitoring/devices/profiles/
[114]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
