---
title: Supported NDM Devices
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
---

## Supported devices

The [vendor profiles](#vendor-profiles) section below lists the network monitoring devices that Datadog supports with out-of-the-box profiles. Datadog can also monitor devices not included in this list using a [generic profile](#generic-profile), which collects basic metrics if applicable for those devices.

### Generic profile

The [generic profile][114] collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, and volume sent/received.

### Vendor profiles

The following vendor devices are supported with dedicated profiles. If a vendor or device type is supported, but the specific model isn't, you can:
  - Customize your own YAML profile (see the [NDM troubleshooting FAQ page][1] for guidance).
  - Create new [profiles][2] to start monitoring new device models.

| Vendor | Config files |
| ---  | ----------- |
| 3com | [3com.yaml][3] <br> |
| TP-Link | [tp-link.yaml][4] <br> |
| A10 | [a10.yaml][5] <br> |
| Alcatel-lucent | [alcatel-lucent.yaml][6] <br> |
| Anue | [anue.yaml][7] <br> |
| Apc | [_apc.yaml][8] <br>[apc_ups.yaml][9] <br> |
| [Arista][10] | [arista.yaml][11] <br>[_arista.yaml][12] <br> |
| [Aruba][13] | [aruba-switch.yaml][14] <br>[_aruba-base.yaml][15] <br>[aruba-access-point.yaml][16] <br>[aruba.yaml][17] <br> |
| Audiocodes | [audiocodes-mediant-sbc.yaml][18] <br> |
| Avaya | [avaya.yaml][19] <br> |
| Avocent | [avocent-acs.yaml][20] <br> |
| Avtech | [avtech.yaml][21] <br> |
| [Barracuda][22] | [barracuda.yaml][23]<br> |
| Bluecat | [bluecat-server.yaml][23] <br> |
| Brocade | [brocade.yaml][25] <br> |
| Brother | [brother.yaml][26] <br> |
| [Chatsworth][27] | [chatsworth_pdu.yaml][28] <br> |
| Checkpoint | [checkpoint.yaml][29] <br>[checkpoint-firewall.yaml][30] <br> |
| Chrysalis | [chrysalis.yaml][31] <br> |
| [Cisco][32] </br> [Cisco ACI][33] </br> [Cisco ASA][34] </br> Cisco ASR </br> Cisco Catalyst </br> Cisco ICM </br> [Cisco ISE][35] </br> Cisco ISR </br> Cisco Nexus </br> Cisco SB </br> Cisco UCS  </br> Cisco WLC | [cisco-3850.yaml][36]</br> [cisco-asa.yaml][37]  </br>[cisco-asa-5525.yaml][38]  </br>[cisco-asr.yaml][39]  </br>[cisco-catalyst-wlc.yaml][40]  </br>[cisco-catalyst.yaml][41]  </br>[cisco-csr1000v.yaml][42]  </br>[cisco_icm.yaml][43]  </br>[cisco-ise.yaml][44]  </br>[cisco-isr.yaml][45]  </br>[cisco_isr_4431.yaml][46]  </br>[cisco-nexus.yaml][47]  </br>[cisco-sb.yaml][48]  </br>[cisco-ucs.yaml][49]  </br>[_cisco-metadata.yaml][50]  </br>[_cisco-wlc.yaml][51] </br>[cisco-legacy-wlc.yaml][52]  </br>[cisco_uc_virtual_machine.yaml][53] |
| Citrix | [citrix.yaml][54] <br> |
| Cradlepoint | [cradlepoint.yaml][55] <br> |
| Cyberpower | [cyberpower-pdu.yaml][56] <br> |
| [Dell][57] | [dell-poweredge.yaml][58] <br>[_dell.yaml][59] <br>[idrac.yaml][60] <br>[isilon.yaml][61] <br> |
| Dialogic | [dialogic-media-gateway.yaml][62] <br> |
| Dlink | [dlink.yaml][63] <br> |
| Eaton | [eaton-epdu.yaml][64] <br> |
| Exagrid | [exagrid.yaml][65] <br> |
| Extreme Networks | [extreme-switching.yaml][66] <br> |
| [F5][207] | [f5-big-ip.yaml][67] <br> |
| Fireeye | [fireeye.yaml][68] <br> |
| [Fortinet][208] | [fortinet.yaml][70] <br>[fortinet-fortigate.yaml][71] <br> |
| Gigamon | [gigamon.yaml][72] <br> |
| [HP][209] | [hp-ilo4.yaml][73] <br>[_hp.yaml][74] <br>[hpe-proliant.yaml][75] <br> |
| Huawei | [_huawei.yaml][76] <br> |
| iXsystems | [ixsystems-truenas.yaml][77] <br> |
| IBM | [ibm.yaml][78] <br> |
| Infinera | [infinera-coriant-groove.yaml][79] <br> |
| [Infoblox][213] | [infoblox-ipam.yaml][80] <br> |
| [Juniper Networks][210] | [_juniper.yaml][81] <br>[juniper-ex.yaml][82] <br>[_juniper-junos-generic.yaml][83] <br>[juniper-mx.yaml][84]
| Linksys | [linksys.yaml][87] <br> |
| McAfee | [mcafee-web-gateway.yaml][88] <br> |
| [Meraki][7] | [meraki-cloud-controller.yaml][89] <br>[meraki.yaml][90] <br> |
| Mikrotik | [mikrotik-router.yaml][91] <br> |
| Nasuni | [nasuni-filer.yaml][92] <br> |
| NEC | [nec-univerge.yaml][93] <br> |
| NetApp | [netapp.yaml][94] <br> |
| Netgear | [netgear.yaml][95] <br> |
| Nvidia | [nvidia.yaml][96] <br> |
| Omron | [omron-cj-ethernet-ip.yaml][97] <br> |
| Opengear | [_opengear.yaml][98] <br> |
| [Palo Alto Networks][222] | [palo-alto.yaml][100] <br>[_palo-alto.yaml][101] <br> |
| Peplink | [peplink.yaml][102] <br> |
| [pfSense][212] | [pf-sense.yaml][103] <br> |
| Raritan | [raritan-dominion.yaml][104] <br> |
| Riverbed | [riverbed.yaml][105] <br> |
| Ruckus | [ruckus.yaml][106] <br> |
| Server Iron | [server-iron-switch.yaml][107] <br> |
| Servertech | [servertech.yaml][108] <br> |
| Silverpeak | [silverpeak-edgeconnect.yaml][109] <br> |
| Sinetica | [sinetica-eagle-i.yaml][110] <br> |
| Sophos | [sophos-xgs-firewall.yaml][111] <br> |
| Synology | [synology-disk-station.yaml][112] <br> |
| Tripplite | [tripplite.yaml][113] <br> |
| Ubiquiti | [_ubiquiti.yaml][114] <br> |
| Velocloud | [velocloud-edge.yaml][115] <br> |
| Vertiv | [_vertiv.yaml][116] <br> |
| VMware | [vmware-esx.yaml][117] <br> |
| Watchguard | [watchguard.yaml][118] <br> |
| Western Digital | [western-digital-mycloud-ex2-ultra.yaml][119] <br> |
| Zebra | [zebra-printer.yaml][120] <br> |
| Zyxel | [zyxel-switch.yaml][121] <br> |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[2]: /network_monitoring/devices/profiles/
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml
[10]: https://docs.datadoghq.com/integrations/snmp_arista/
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml
[13]: https://docs.datadoghq.com/integrations/snmp_aruba/
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml
[23]: https://docs.datadoghq.com/integrations/crest_data_systems_barracuda_waf/
[23]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml 
[28]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml
[29]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml  
[31]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml
[32]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml 
[33]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml
[34]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml
[35]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml
[36]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml
[37]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml
[38]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml
[39]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml
[40]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml
[41]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml
[42]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml 
[44]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml 
[45]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml 
[47]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml
[48]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml
[50]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml
[51]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml 
[52]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml
[53]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml
[54]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml
[56]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml
[57]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml
[58]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml
[59]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml
[60]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml
[62]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml
[63]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml 
[65]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo.yaml
[66]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml
[67]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-printer.yaml
[68]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp_procurve_switch.yaml
[69]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ht-2000.yaml
[70]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/huawei.yaml
[71]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/huawei_vrp.yaml
[72]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_huawei.yaml
[73]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm_svc.yaml
[74]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm_xiv.yaml
[75]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml
[76]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ifm-ecomatic.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox.yaml
[78]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper.yaml
[79]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/keysight_ixia.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/lantronix.yaml
[81]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/liebert-gxt4.yaml
[82]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/liebert.yaml
[83]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml
[84]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/motorola.yaml
[85]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml
[87]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netmotion.yaml
[88]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netscaler.yaml
[89]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml
[90]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto-base.yaml
[91]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml
[92]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/qnap.yaml
[93]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/qfx-3500.yaml
[94]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/qfx-5120.yaml
[95]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/radware.yaml
[96]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus-zd.yaml
[97]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sentry.yaml
[98]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak.yaml
[99]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sonicwall.yaml
[100]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/starline_pdu.yaml
[101]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology.yaml
[102]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tplink-router.yaml
[103]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite_pdu.yaml
[104]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/twilio-edge.yaml
[105]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ubiquiti-edge.yaml
[106]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/unifi.yaml
[107]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud.yaml
[108]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/versa.yaml
[109]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/viptela.yaml
[110]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml
[111]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/yamaha-router.yaml
[112]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zendesk.yaml
[113]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel.yaml
[114]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}