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
---

## Supported devices

The [vendor profiles](#vendor-profiles) section below lists the network monitoring devices that Datadog supports with out-of-the-box profiles. Datadog can also monitor devices not included in this list using a [generic profile](#generic-profile), which collects basic metrics if applicable for those devices.

### Generic profile

The [generic profile][114] collects metrics for all devices not supported by a vendor profile. Metrics include TCP, UDP, IP, and interface metrics such as bandwidth utilization, and volume sent/received.

### Vendor profiles

The following vendor devices are supported with dedicated profiles.
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

  **Note**: If you do not know the `sysobjectid` of your device, run an `snmpwalk` on a host that can reach your device. Use the output to list the profile to match against.
<br></br>

| Vendor                                                                                                                                                                                                               | Config files |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ----------- |
| 3com                                                                                                                                                                                                                 | [3com.yaml][3] <br> [3com-huawei.yaml][126] <br>|
| TP-Link                                                                                                                                                                                                              | [tp-link.yaml][4] <br> |
| A10                                                                                                                                                                                                                  | [a10.yaml][5] <br> |
| Alcatel-lucent                                                                                                                                                                                                       | [alcatel-lucent.yaml][6] <br> |
| Anue                                                                                                                                                                                                                 | [anue.yaml][7] <br> |
| Apc                                                                                                                                                                                                                  | [_apc.yaml][8] <br>[apc_ups.yaml][9] [_apc-metadata.yaml][127]<br> |
| [Arista][10]                                                                                                                                                                                                         | [arista.yaml][11] <br>[_arista.yaml][12] <br> |
| [Aruba][13]                                                                                                                                                                                                          | [aruba-switch.yaml][14] <br>[_aruba-base.yaml][15] <br>[aruba-access-point.yaml][16] <br>[aruba.yaml][17] <br> |
| Audiocodes                                                                                                                                                                                                           | [audiocodes-mediant-sbc.yaml][18] <br> |
| Avaya                                                                                                                                                                                                                | [avaya.yaml][19] <br> |
| Avocent                                                                                                                                                                                                              | [avocent-acs.yaml][20] <br> |
| Avtech                                                                                                                                                                                                               | [avtech.yaml][21] <br> |
| [Barracuda][22]                                                                                                                                                                                                      | [barracuda.yaml][23]<br> |
| Bluecat                                                                                                                                                                                                              | [bluecat-server.yaml][24] <br> |
| Brocade                                                                                                                                                                                                              | [brocade.yaml][25] <br> |
| Brother                                                                                                                                                                                                              | [brother.yaml][26] <br> |
| [Chatsworth][27]                                                                                                                                                                                                     | [chatsworth_pdu.yaml][28] <br> |
| Checkpoint                                                                                                                                                                                                           | [checkpoint.yaml][29] <br>[checkpoint-firewall.yaml][30] <br> |
| Chrysalis                                                                                                                                                                                                            | [chrysalis.yaml][31] <br> |
| [Cisco][32] </br> [Cisco ACI][33] </br> [Cisco ASA][34] </br> Cisco ASR </br> Cisco Catalyst </br> Cisco ICM </br> [Cisco ISE][35] </br> Cisco ISR </br> Cisco Nexus </br> Cisco SB </br> Cisco UCS  </br> Cisco WLC | [cisco-3850.yaml][36]</br> [cisco-asa.yaml][37]  </br>[cisco-asa-5525.yaml][38]  </br>[cisco-asr.yaml][39]  </br>[cisco-catalyst-wlc.yaml][40]  </br>[cisco-catalyst.yaml][41]  </br>[cisco-csr1000v.yaml][42]  </br>[cisco_icm.yaml][43]  </br>[cisco-ise.yaml][44]  </br>[cisco-isr.yaml][45]  </br>[cisco_isr_4431.yaml][46]  </br>[cisco-nexus.yaml][47]  </br>[cisco-sb.yaml][48]  </br>[cisco-ucs.yaml][49]  </br>[_cisco-metadata.yaml][50]  </br>[_cisco-wlc.yaml][51] </br>[cisco-legacy-wlc.yaml][52]  </br>[cisco_uc_virtual_machine.yaml][53] </br>[_cisco-voice.yaml][128]|
| Citrix                                                                                                                                                                                                               | [citrix.yaml][54] <br> |
| Cradlepoint                                                                                                                                                                                                          | [cradlepoint.yaml][55] <br> |
| Cyberpower                                                                                                                                                                                                           | [cyberpower-pdu.yaml][56] <br> |
| [Dell][57]                                                                                                                                                                                                           | [dell-poweredge.yaml][58] <br>[_dell.yaml][59] <br> [idrac.yaml][60] <br> [isilon.yaml][61] <br> |
| Dialogic                                                                                                                                                                                                             | [dialogic-media-gateway.yaml][62] <br> |
| Dlink                                                                                                                                                                                                                | [dlink.yaml][63] <br> |
| Eaton                                                                                                                                                                                                                | [eaton-epdu.yaml][64] <br> |
| Exagrid                                                                                                                                                                                                              | [exagrid.yaml][65] <br> |
| Extreme Networks                                                                                                                                                                                                     | [extreme-switching.yaml][66] <br> |
| [F5][67]                                                                                                                                                                                                             | [f5-big-ip.yaml][68] <br> |
| Fireeye                                                                                                                                                                                                              | [fireeye.yaml][69] <br> |
| [Fortinet][70]                                                                                                                                                                                                       | [fortinet.yaml][71] <br>[fortinet-fortigate.yaml][72] <br> |
| Gigamon                                                                                                                                                                                                              | [gigamon.yaml][73] <br> |
| [HP][74]                                                                                                                                                                                                             | [hp-ilo4.yaml][75] <br>[_hp.yaml][76] <br>[hpe-proliant.yaml][77] <br> |
| Huawei                                                                                                                                                                                                               | [_huawei.yaml][78] <br> |
| iXsystems                                                                                                                                                                                                            | [ixsystems-truenas.yaml][79] <br> |
| IBM                                                                                                                                                                                                                  | [ibm.yaml][80] <br> |
| Infinera                                                                                                                                                                                                             | [infinera-coriant-groove.yaml][81] <br> |
| [Infoblox][82]                                                                                                                                                                                                       | [infoblox-ipam.yaml][83] <br> |
| [Juniper Networks][84]                                                                                                                                                                                               | [_juniper.yaml][85] <br>[juniper-ex.yaml][86] <br>[_juniper-junos-generic.yaml][87] <br>[juniper-mx.yaml][88]
| Linksys                                                                                                                                                                                                              | [linksys.yaml][89] <br> |
| McAfee                                                                                                                                                                                                               | [mcafee-web-gateway.yaml][90] <br> |
| [Meraki][91]                                                                                                                                                                                                         | [meraki-cloud-controller.yaml][92] <br>[meraki.yaml][93] <br> |
| Mikrotik                                                                                                                                                                                                             | [mikrotik-router.yaml][94] <br> |
| Nasuni                                                                                                                                                                                                               | [nasuni-filer.yaml][95] <br> |
| NEC                                                                                                                                                                                                                  | [nec-univerge.yaml][96] <br> |
| NetApp                                                                                                                                                                                                               | [netapp.yaml][97] <br> |
| Netgear                                                                                                                                                                                                              | [netgear.yaml][98] <br> |
| NVIDIA                                                                                                                                                                                                               | [nvidia.yaml][99] <br> |
| Omron                                                                                                                                                                                                                | [omron-cj-ethernet-ip.yaml][100] <br> |
| Opengear                                                                                                                                                                                                             | [_opengear.yaml][101] <br> |
| [Palo Alto Networks][102]                                                                                                                                                                                            | [palo-alto.yaml][103] <br>[_palo-alto.yaml][104] <br> |
| Peplink                                                                                                                                                                                                              | [peplink.yaml][105] <br> |
| [pfSense][106]                                                                                                                                                                                                       | [pf-sense.yaml][107] <br> |
| Raritan                                                                                                                                                                                                              | [raritan-dominion.yaml][108] <br> |
| Riverbed                                                                                                                                                                                                             | [riverbed.yaml][109] <br> |
| Ruckus                                                                                                                                                                                                               | [ruckus.yaml][110] <br> |
| Server Iron                                                                                                                                                                                                          | [server-iron-switch.yaml][111] <br> |
| Servertech                                                                                                                                                                                                           | [servertech.yaml][112] <br> |
| Silverpeak                                                                                                                                                                                                           | [silverpeak-edgeconnect.yaml][113] <br> |
| Sinetica                                                                                                                                                                                                             | [sinetica-eagle-i.yaml][114] <br> |
| Sophos                                                                                                                                                                                                               | [sophos-xgs-firewall.yaml][115] <br> |
| Synology                                                                                                                                                                                                             | [synology-disk-station.yaml][116] <br> |
| Tripplite                                                                                                                                                                                                            | [tripplite.yaml][117] <br> |
| Ubiquiti                                                                                                                                                                                                             | [_ubiquiti.yaml][118] <br> |
| Velocloud                                                                                                                                                                                                            | [velocloud-edge.yaml][119] <br> |
| Vertiv                                                                                                                                                                                                               | [_vertiv.yaml][120] <br> |
| VMware                                                                                                                                                                                                               | [vmware-esx.yaml][121] <br> |
| Watchguard                                                                                                                                                                                                           | [watchguard.yaml][122] <br> |
| Western Digital                                                                                                                                                                                                      | [western-digital-mycloud-ex2-ultra.yaml][123] <br> |
| Zebra                                                                                                                                                                                                                | [zebra-printer.yaml][124] <br> |
| Zyxel                                                                                                                                                                                                                | [zyxel-switch.yaml][125] <br> |


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
[22]: https://docs.datadoghq.com/integrations/crest_data_systems_barracuda_waf/
[23]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml
[27]: https://docs.datadoghq.com/integrations/snmp_chatsworth_products/#overview
[28]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml
[29]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml
[31]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml
[32]: https://docs.datadoghq.com/integrations/snmp_cisco/
[33]: https://docs.datadoghq.com/integrations/cisco_aci/?tab=host
[34]: https://docs.datadoghq.com/integrations/crest_data_systems_cisco_asa/
[35]: https://docs.datadoghq.com/integrations/crest_data_systems_cisco_ise/
[36]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml
[37]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml
[38]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml
[39]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml
[40]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml
[41]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml
[42]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml
[43]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml
[44]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml
[45]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml
[46]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml
[47]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml
[48]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml
[49]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml
[50]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml
[51]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml
[52]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml
[53]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml
[54]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml
[55]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml
[56]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml
[57]: https://docs.datadoghq.com/integrations/snmp_dell/
[58]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml
[59]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml
[60]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml
[61]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml
[62]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml
[63]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml
[64]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml
[65]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml
[66]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml
[67]: https://docs.datadoghq.com/integrations/snmp_f5/
[68]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml
[69]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml
[70]: https://docs.datadoghq.com/integrations/snmp_fortinet/
[71]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml
[72]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml
[73]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml
[74]: https://docs.datadoghq.com/integrations/snmp_hewlett_packard_enterprise/
[75]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo.yaml
[76]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml
[77]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml
[78]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/huawei.yaml
[79]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml
[80]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml
[81]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml
[82]: https://docs.datadoghq.com/integrations/rapdev_infoblox/
[83]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml
[84]: https://docs.datadoghq.com/integrations/snmp_juniper/
[85]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper.yaml
[86]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml
[87]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml
[88]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml
[89]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml
[90]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml
[91]: https://docs.datadoghq.com/integrations/meraki/
[92]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml
[93]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml
[94]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml
[95]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml
[96]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml
[97]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml
[98]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml
[99]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml
[100]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml
[101]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml
[102]: https://docs.datadoghq.com/integrations/pan_firewall/
[103]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml
[104]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto-base.yaml
[105]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml
[106]: https://docs.datadoghq.com/integrations/crest_data_systems_pfsense/
[107]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml
[108]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml
[109]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml
[110]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus-zd.yaml
[111]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml
[112]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml
[113]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml
[114]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml
[115]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml
[116]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml
[117]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite_pdu.yaml
[118]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml
[119]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml
[120]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml
[121]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml
[122]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml
[123]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml
[124]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml
[125]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml
[126]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com-huawei.yaml
[127]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc-metadata.yaml
[128]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-voice.yaml

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
