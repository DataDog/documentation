---
algolia:
  tags:
  - network device monitoring
aliases:
- /ko/network_performance_monitoring/devices/
description: 라우터, 스위치, 서버 및 방화벽과 같은 네트워크 연결 장치에 대한 가시성을 확보합니다.
further_reading:
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: 지식 센터
  text: SNMP 모니터링 개요
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: 블로그
  text: Datadog으로 SNMP 모니터링하기
- link: https://www.datadoghq.com/blog/monitor-meraki/
  tag: 블로그
  text: Datadog으로 Cisco Meraki 모니터링하기
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: 블로그
  text: Datadog으로 데이터센터와 네트워크 장치 모니터링하기
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: 블로그
  text: 네트워크 장치 모니터링 소개하기
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩으로 네트워크 성능 문제 모니터링 및 진단
kind: 설명서
title: 네트워크 장치 모니터링
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">네트워크 장치 모니터링은 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/673243317/rendition/1080p/file.mp4?loc=external&signature=cadf7020caa33b97a62ecb01216b83e5d04b35a4ca3a1b8b0a22323b9e79d0c3" poster="/images/poster/ndm.png" >}}

<br/>

네트워크 장치 모니터링은 라우터, 스위치 및 방화벽과 같은 온 프레미스 및 가상 네트워크 장치에 대한 가시성을 제공합니다. 모든 네트워크에서 장치를 자동으로 검색하여 대역폭 사용률, 전송된 바이트 수와 같은 메트릭을 빠르게 수집하고 장치의 가동/정지 여부를 확인할 수 있습니다.

## 시작하기

1. Datadog 에이전트를 설치합니다(일반적으로 모니터링되는 장치가 아닌 서버입니다).
2. [개별 장치 모니터링][1] 또는 [장치 자동탐지][2]를 사용하여 SNMP 통합을 설정합니다.
3. [네트워크 장치][3] 페이지에서 전체 네트워크 인프라스트럭처 모니터링을 시작합니다. 
4. Datadog의 기본 제공 대시보드에서 수집된 메트릭 보기:
    - [모니터링하는 전체 장치 개요][4]
    - [전체 인터페이스 성능][5]
5. [SNMP] 메트릭을 선제적으로 모니터링하여 발생할 수 있는 문제를 방지합니다.

## 지원되는 장치

### 일반 프로필

일반 프로필은 벤더 프로필에서 지원되지 않는 모든 장치에 대한 메트릭을 수집합니다. 메트릭에는 TCP, UDP, IP 및 대역폭 사용률, 전송/수신 볼륨 등의 인터페이스 메트릭이 포함됩니다.

### SD-WAN

Datadog는 일부 공급업체를 위해 소프트웨어 정의 광대역 네트워크(SD-WAN) 모니터링을 제공합니다 . SD-WAN은 네트워킹 기술의 유형으로 소프트웨어 정의 네트워크(SDN) 원칙을 사용해 광대역 네트워크(WAN)의 성능을 관리하고 최적화합니다. 주로 각기 다른 전송(MPLS, 브로드밴드, 5G 등)을 사용하는 원격 사무실 및 데이터 센터를 상호 연결하는 데 사용됩니다. SD-WAN는 이러한 전송 모드 간 자동 로드 밸런싱을 제공하고 오류를 감지할 수 있습니다.

Datadog에서는 다음 SD-WAN 네트워크 모니터링 공급업체를 지원합니다.

- [Meraki SD-WAN][7](공개 베타)
- Cisco SD-WAN(비공개 베타)

### 벤더 프로필

다음 공급업체 장치는 전용 프로파일을 사용해 지원됩니다. 공급업체나 장치 유형이 지원되지만 특정 모델이 지원되지 않는 경우 다음을 수행할 수 있습니다.
  - 자체적은 YAML 프로파일을 커스터마이즈합니다(지침은 [NDM 트러블슈팅 FAQ 페이지][8] 참조).
  - 새로운 [프로파일][9]를 생성하여 새로운 장치 모델 모니터링을 시작합니다.

| 벤더 | 설정 파일 |
| ---  | ----------- |
| 3com | [3com.yaml][10] <br> |
| TP-Link | [tp-link.yaml][11] <br> |
| A10 | [a10.yaml][12] <br> |
| Alcatel-lucent | [alcatel-lucent.yaml][13] <br> |
| Anue | [anue.yaml][14] <br> |
| Apc | [_apc.yaml][15] <br>[apc_ups.yaml][16] <br> |
| [Arista][17] | [arista.yaml][18] <br>[_arista.yaml][19] <br> |
| [Aruba][20] | [aruba-switch.yaml][21] <br>[_aruba-base.yaml][22] <br>[aruba-access-point.yaml][23] <br>[aruba.yaml][24] <br> |
| Audiocodes | [audiocodes-mediant-sbc.yaml][25] <br> |
| Avaya | [avaya.yaml][26] <br> |
| Avocent | [avocent-acs.yaml][27] <br> |
| Avtech | [avtech.yaml][28] <br> |
| [Barracuda][200] | [barracuda.yaml][29]<br> |
| Bluecat | [bluecat-server.yaml][30] <br> |
| Brocade | [brocade.yaml][31] <br> |
| Brother | [brother.yaml][32] <br> |
| [Chatsworth][201] | [chatsworth_pdu.yaml][33] <br> |
| Checkpoint | [checkpoint.yaml][34] <br>[checkpoint-firewall.yaml][35] <br> |
| Chrysalis | [chrysalis.yaml][36] <br> |
| [Cisco][202] </br> [Cisco ACI][203] </br> [Cisco ASA][204] </br> Cisco ASR </br> Cisco Catalyst </br> Cisco ICM </br> [Cisco ISE][205] </br> Cisco ISR </br> Cisco Nexus </br> Cisco SB </br> Cisco UCS  </br> Cisco WLC | [cisco-3850.yaml][37]</br> [cisco-asa.yaml][38]  </br>[cisco-asa-5525.yaml][39]  </br>[cisco-asr.yaml][40]  </br>[cisco-catalyst-wlc.yaml][41]  </br>[cisco-catalyst.yaml][42]  </br>[cisco-csr1000v.yaml][43]  </br>[cisco_icm.yaml][44]  </br>[cisco-ise.yaml][45]  </br>[cisco-isr.yaml][46]  </br>[cisco_isr_4431.yaml][47]  </br>[cisco-nexus.yaml][48]  </br>[cisco-sb.yaml][49]  </br>[cisco-ucs.yaml][50]  </br>[_cisco-metadata.yaml][51]  </br>[_cisco-wlc.yaml][52] </br>[cisco-legacy-wlc.yaml][53]  </br>[cisco_uc_virtual_machine.yaml][54] |
| Citrix | [citrix.yaml][55] <br> |
| Cradlepoint | [cradlepoint.yaml][56] <br> |
| Cyberpower | [cyberpower-pdu.yaml][57] <br> |
| [Dell][206] | [dell-poweredge.yaml][58] <br>[_dell.yaml][59] <br>[idrac.yaml][60] <br>[isilon.yaml][61] <br> |
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



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/network_monitoring/devices/snmp_metrics/#monitoring-individual-devices
[2]: /ko/network_monitoring/devices/snmp_metrics/#autodiscovery
[3]: https://app.datadoghq.com/devices
[4]: https://app.datadoghq.com/dash/integration/30409/datacenter-overview
[5]: https://app.datadoghq.com/dash/integration/30417/interface-performance
[6]: /ko/monitors/types/metric/
[7]: /ko/integrations/meraki/
[8]: /ko/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[9]: /ko/network_monitoring/devices/profiles/
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/3com.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tp-link.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/a10.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/alcatel-lucent.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/anue.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_apc.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/apc_ups.yaml
[17]: https://docs.datadoghq.com/ko/integrations/snmp_arista/
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/arista.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_arista.yaml
[20]: https://docs.datadoghq.com/ko/integrations/snmp_aruba/
[21]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-switch.yaml
[22]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_aruba-base.yaml
[23]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba-access-point.yaml
[24]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/aruba.yaml
[25]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/audiocodes-mediant-sbc.yaml
[26]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avaya.yaml
[27]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avocent-acs.yaml
[28]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/avtech.yaml
[29]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/barracuda.yaml
[30]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/bluecat-server.yaml
[31]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brocade.yaml
[32]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/brother.yaml
[33]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chatsworth_pdu.yaml
[34]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint.yaml 
[35]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/checkpoint-firewall.yaml
[36]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/chrysalis.yaml
[37]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-3850.yaml  
[38]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa.yaml
[39]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asa-5525.yaml 
[40]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-asr.yaml
[41]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst-wlc.yaml
[42]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-catalyst.yaml
[43]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-csr1000v.yaml
[44]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_icm.yaml
[45]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ise.yaml
[46]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-isr.yaml
[47]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_isr_4431.yaml
[48]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-nexus.yaml
[49]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-sb.yaml
[50]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-ucs.yaml 
[51]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-metadata.yaml 
[52]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_cisco-wlc.yaml
[53]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco-legacy-wlc.yaml 
[54]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cisco_uc_virtual_machine.yaml
[55]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/citrix.yaml
[56]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cradlepoint.yaml
[57]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/cyberpower-pdu.yaml
[58]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dell-poweredge.yaml 
[59]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_dell.yaml
[60]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/idrac.yaml
[61]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/isilon.yaml
[62]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dialogic-media-gateway.yaml
[63]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/dlink.yaml
[64]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/eaton-epdu.yaml
[65]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/exagrid.yaml
[66]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/extreme-switching.yaml
[67]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/f5-big-ip.yaml
[68]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fireeye.yaml
[70]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet.yaml
[71]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/fortinet-fortigate.yaml
[72]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/gigamon.yaml 
[73]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hp-ilo4.yaml
[74]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_hp.yaml
[75]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/hpe-proliant.yaml
[76]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_huawei.yaml
[77]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ixsystems-truenas.yaml
[78]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ibm.yaml
[79]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infinera-coriant-groove.yaml
[213]:https://docs.datadoghq.com/ko/integrations/rapdev_infoblox/
[80]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/infoblox-ipam.yaml
[81]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper.yaml
[82]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-ex.yaml
[83]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_juniper-junos-generic.yaml
[84]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-mx.yaml
[85]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/juniper-srx.yaml
[86]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/kyocera-printer.yaml
[87]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/linksys.yaml
[88]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mcafee-web-gateway.yaml
[89]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki-cloud-controller.yaml
[90]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/meraki.yaml
[91]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/mikrotik-router.yaml
[92]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nasuni-filer.yaml
[93]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nec-univerge.yaml
[94]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netapp.yaml
[95]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/netgear.yaml
[96]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/nvidia.yaml
[97]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/omron-cj-ethernet-ip.yaml
[98]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_opengear.yaml
[100]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/palo-alto.yaml 
[101]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_palo-alto.yaml
[102]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/peplink.yaml
[103]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/pf-sense.yaml
[104]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/raritan-dominion.yaml
[105]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/riverbed.yaml
[106]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/ruckus.yaml
[107]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/server-iron-switch.yaml
[108]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/servertech.yaml
[109]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/silverpeak-edgeconnect.yaml
[110]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sinetica-eagle-i.yaml
[111]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/sophos-xgs-firewall.yaml
[112]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/synology-disk-station.yaml
[113]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/tripplite.yaml
[114]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_ubiquiti.yaml
[115]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/velocloud-edge.yaml
[116]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/_vertiv.yaml
[117]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/vmware-esx.yaml
[118]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/watchguard.yaml
[119]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/western-digital-mycloud-ex2-ultra.yaml
[120]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zebra-printer.yaml
[121]:https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/zyxel-switch.yaml
[200]: https://docs.datadoghq.com/ko/integrations/crest_data_systems_barracuda_waf/
[201]: https://docs.datadoghq.com/ko/integrations/snmp_chatsworth_products/
[202]: https://docs.datadoghq.com/ko/integrations/snmp_cisco/
[203]: https://docs.datadoghq.com/ko/integrations/cisco_aci/?tab=host
[204]: https://docs.datadoghq.com/ko/integrations/crest_data_systems_cisco_asa/
[205]: https://docs.datadoghq.com/ko/integrations/crest_data_systems_cisco_ise/
[206]: https://docs.datadoghq.com/ko/integrations/snmp_dell/
[207]: https://docs.datadoghq.com/ko/integrations/snmp_f5/
[208]: https://docs.datadoghq.com/ko/integrations/snmp_fortinet/
[209]: https://docs.datadoghq.com/ko/integrations/snmp_hewlett_packard_enterprise/
[210]: https://docs.datadoghq.com/ko/integrations/snmp_juniper/
[211]: https://docs.datadoghq.com/ko/integrations/pan_firewall/
[212]: https://docs.datadoghq.com/ko/integrations/crest_data_systems_pfsense/
[222]:https://docs.datadoghq.com/ko/integrations/pan_firewall/