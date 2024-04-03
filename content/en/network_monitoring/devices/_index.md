---
title: Network Device Monitoring
kind: documentation
description: Gain visibility into your network-connected devices, such as routers, switches, servers, and firewalls.
aliases:
    - /network_performance_monitoring/devices/
further_reading:
    - link: 'https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/'
      tag: 'Knowledge Center'
      text: 'SNMP Monitoring Overview'
    - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
      tag: 'Blog'
      text: 'Monitor SNMP with Datadog'
    - link: 'https://www.datadoghq.com/blog/monitor-meraki/'
      tag: 'Blog'
      text: 'Monitor Cisco Meraki with Datadog'
    - link: 'https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/'
      tag: 'Blog'
      text: 'Monitor datacenters and network devices with Datadog'
    - link: 'https://www.datadoghq.com/blog/network-device-monitoring/'
      tag: 'Blog'
      text: 'Introducing Network Device Monitoring'
    - link: 'https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/'
      tag: 'Blog'
      text: 'Monitor and diagnose network performance issues with SNMP Traps'
algolia:
  tags: ['network device monitoring']
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Device Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Overview

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

Network Device Monitoring gives you visibility into your on-premise and virtual network devices, such as routers, switches, and firewalls. Automatically discover devices on any network, and quickly start collecting metrics like bandwidth utilization, volume of bytes sent, and determine whether devices are up/down.

## Getting started

1. Install the Datadog Agent (usually on a server that is not the monitored device).
2. Configure the SNMP integration by either [monitoring individual devices][1], or using [device autodiscovery][2].
3. Start monitoring your entire network infrastructure on the [Network Devices][7] page.
4. View metrics collected on Datadog's out-of-the-box dashboards:
    - [Overview of all devices monitored][3]
    - [Across the performance on all interfaces][4]
5. Catch issues before they arise with proactive monitoring on any [SNMP metric][5].

## Supported devices

### Generic profile

The generic profile collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, volume sent/received, etc.

### SD-WAN

<div class="alert alert-info">SD-WAN Network Monitoring is in beta.</div>

Datadog provides SD-WAN (Software-Defined Wide Area Network) monitoring for select vendors. SD-WAN is a type of networking technology that uses software-defined networking (SDN) principles to manage and optimize the performance of wide area networks (WANs). It is mainly used to inter-connect remote offices and data centers across different transports (MPLS, Broadband, 5G, and so on). SD-WAN benefits from automatic load balancing and failure detection across these transports. 

Datadog supports the following vendors for SD-WAN network monitoring:

- [Meraki SD-WAN][10]
- Cisco SD-WAN

### Vendor profiles

The following vendor devices are supported with dedicated profiles. If a vendor/device type is supported but the specific model isn't supported, reference the [FAQ page][6] to learn how to customize your own `yaml` profile, or create new [profiles][9] to start monitoring new device models. 

| Vendor | Config files |
| ---  | ----------- |
| 3com | [3com.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml) <br> |
| TP-Link | [tp-link.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml) <br> |
| A10 | [a10.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml) <br> |
| Alcatel-lucent | [alcatel-lucent.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml) <br> |
| Anue | [anue.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml) <br> |
| Apc | [_apc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml) <br>[apc_ups.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml) <br> |
| [Arista](/integrations/snmp_arista/) | [arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml) <br>[_arista.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml) <br> |
| [Aruba](/integrations/snmp_aruba/) | [aruba-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml) <br>[_aruba-base.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml) <br>[aruba-access-point.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml) <br>[aruba.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml) <br> |
| Audiocodes | [audiocodes-mediant-sbc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml) <br> |
| Avaya | [avaya.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml) <br> |
| Avocent | [avocent-acs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml) <br> |
| Avtech | [avtech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml) <br> |
| [Barracuda](/integrations/crest_data_systems_barracuda_waf/) | [barracuda.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml) <br> |
| Bluecat | [bluecat-server.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml) <br> |
| Brocade | [brocade.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml) <br> |
| Brother | [brother.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml) <br> |
| [Chatsworth](/integrations/snmp_chatsworth_products/) | [chatsworth_pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml) <br> |
| Checkpoint | [checkpoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml) <br>[checkpoint-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml) <br> |
| Chrysalis | [chrysalis.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml) <br> |
| [Cisco](/integrations/snmp_cisco/) </br> [Cisco ACI](/integrations/cisco_aci/?tab=host) </br> [Cisco ASA](/integrations/crest_data_systems_cisco_asa/) </br> [Cisco ISE](/integrations/crest_data_systems_cisco_ise/)| [cisco_uc_virtual_machine.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml) <br>[cisco-isr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml) <br>[cisco-3850.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml) <br>[cisco-asa.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml) <br>[cisco-catalyst-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml) <br>[cisco-asa-5525.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml) <br>[cisco-nexus.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml) <br>[cisco_icm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml) <br>[cisco-csr1000v.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml) <br>[cisco-asr.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml) <br>[cisco-sb.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml) <br>[cisco-legacy-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml) <br>[_cisco-metadata.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml) <br>[cisco-ucs.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml) <br>[cisco_isr_4431.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml) <br>[cisco-catalyst.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml) <br>[cisco-ise.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml) <br>[_cisco-wlc.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml) <br> |
| Citrix | [citrix.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml) <br> |
| Cradlepoint | [cradlepoint.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml) <br> |
| Cyberpower | [cyberpower-pdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml) <br> |
| [Dell](/integrations/snmp_dell/) | [dell-poweredge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml) <br>[_dell.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml) <br>[idrac.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml) <br>[isilon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml) <br> |
| Dialogic | [dialogic-media-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml) <br> |
| Dlink | [dlink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml) <br> |
| Eaton | [eaton-epdu.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml) <br> |
| Exagrid | [exagrid.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml) <br> |
| Extreme Networks | [extreme-switching.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml) <br> |
| [F5](/integrations/snmp_f5/) | [f5-big-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml) <br> |
| Fireeye | [fireeye.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml) <br> |
| [Fortinet](integrations/snmp_fortinet/) | [fortinet.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml) <br>[fortinet-fortigate.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml) <br> |
| Gigamon | [gigamon.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml) <br> |
| [HP](integrations/snmp_hewlett_packard_enterprise/) | [hp-ilo4.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo4.yaml) <br>[_hp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml) <br>[hpe-proliant.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml) <br> |
| Huawei | [_huawei.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_huawei.yaml) <br> |
| iXsystems | [ixsystems-truenas.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml) <br> |
| IBM | [ibm.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml) <br> |
| Infinera | [infinera-coriant-groove.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml) <br> |
| [Infoblox](integrations/rapdev_infoblox/) | [infoblox-ipam.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml) <br> |
| [Juniper Networks](/integrations/snmp_juniper/) | [_juniper.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper.yaml) <br>[juniper-ex.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml) <br>[_juniper-junos-generic.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml) <br>[juniper-mx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml) <br>[juniper-srx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-srx.yaml) <br> |
| Kyocera | [kyocera-printer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/kyocera-printer.yaml) <br> |
| Linksys | [linksys.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml) <br> |
| McAfee | [mcafee-web-gateway.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml) <br> |
| [Meraki](/integrations/meraki/) | [meraki-cloud-controller.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml) <br>[meraki.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml) <br> |
| Mikrotik | [mikrotik-router.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml) <br> |
| Nasuni | [nasuni-filer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml) <br> |
| NEC | [nec-univerge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml) <br> |
| NetApp | [netapp.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml) <br> |
| Netgear | [netgear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml) <br> |
| Nvidia | [nvidia.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml) <br> |
| Omron | [omron-cj-ethernet-ip.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml) <br> |
| Opengear | [_opengear.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml) <br> |
| [Palo Alto Networks](integrations/pan_firewall/) | [palo-alto.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml) <br>[_palo-alto.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_palo-alto.yaml) <br> |
| Peplink | [peplink.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml) <br> |
| [pfSense](/integrations/crest_data_systems_pfsense/) | [pf-sense.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml) <br> |
| Raritan | [raritan-dominion.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml) <br> |
| Riverbed | [riverbed.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml) <br> |
| Ruckus | [ruckus.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus.yaml) <br> |
| Server Iron | [server-iron-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml) <br> |
| Servertech | [servertech.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml) <br> |
| Silverpeak | [silverpeak-edgeconnect.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml) <br> |
| Sinetica | [sinetica-eagle-i.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sinetica-eagle-i.yaml) <br> |
| Sophos | [sophos-xgs-firewall.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml) <br> |
| Synology | [synology-disk-station.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml) <br> |
| Tripplite | [tripplite.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite.yaml) <br> |
| Ubiquiti | [_ubiquiti.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml) <br> |
| Velocloud | [velocloud-edge.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml) <br> |
| Vertiv | [_vertiv.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml) <br> |
| VMware | [vmware-esx.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml) <br> |
| Watchguard | [watchguard.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml) <br> |
| Western Digital | [western-digital-mycloud-ex2-ultra.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml) <br> |
| Zebra | [zebra-printer.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml) <br> |
| Zyxel | [zyxel-switch.yaml](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml) <br> |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[4]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[5]: /monitors/types/metric/
[6]: /network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[7]: https://app.datadoghq.com/devices
[8]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/default_profiles
[9]: /network_monitoring/devices/profiles/
[10]: https://app.datadoghq.com/integrations/meraki?search=meraki
