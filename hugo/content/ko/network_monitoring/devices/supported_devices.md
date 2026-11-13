---
further_reading:
- link: https://www.datadoghq.com/blog/datacenter-monitoring-dashboards/
  tag: 블로그
  text: Datadog으로 데이터센터와 네트워크 장치 모니터링
- link: https://www.datadoghq.com/blog/network-device-monitoring/
  tag: 블로그
  text: Network Device Monitoring 소개
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: 블로그
  text: SNMP 트랩을 사용하여 네트워크 성능 문제 모니터링 및 진단
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
    name: 벤더/통합
  - id: config_files
    name: 구성 파일
title: 지원되는 장치
---
## 지원되는 장치 {#supported-devices}

아래의 [벤더 프로필](#vendor-profiles) 섹션에는 Datadog이 기본 제공 프로필로 지원하는 네트워크 모니터링 대상 장치가 나열되어 있습니다. Datadog은 [일반 프로필](#generic-profile)을 사용하여 이 목록에 포함되지 않은 장치도 모니터링할 수 있으며, 해당 장치에서 지원하는 경우 기본 메트릭을 수집합니다.

### 일반 프로필 {#generic-profile}

[일반 프로필][114]은 벤더 프로필에서 지원하지 않는 모든 장치의 메트릭을 수집합니다. 메트릭에는 TCP, UDP, IP 메트릭과 대역폭 사용률 및 송수신 데이터량 등의 인터페이스 메트릭이 포함됩니다.

### 벤더 프로필 {#vendor-profiles}

다음 벤더 장치는 전용 프로필을 통해 지원됩니다.
벤더나 장치 유형이 나열되어 있지 않으면 아래의 [문제 해결](#troubleshooting) 섹션을 참조하세요.

**참고**: **Vendor/Integration** 열에 링크가 있는 벤더의 경우 추가 설정 지침, 대시보드 및 향상된 모니터링 기능을 제공하는 전용 통합 페이지가 있습니다. 나열된 모든 벤더는 **Config files** 열에 표시된 구성 파일을 사용하여 SNMP를 통해 지원됩니다.

{{< multifilter-search >}}

## 문제 해결 {#troubleshooting}

벤더나 장치 유형은 지원되지만 특정 모델은 지원되지 않는 경우 다음 방법을 사용할 수 있습니다.

* 새 [프로필][2]을 생성하여 새로운 장치 모델의 모니터링을 시작합니다.

* [Datadog 고객 지원팀][1]에 문의하여 장치 모델에 대한 지원이나 벤더 MIB의 추가 메트릭을 요청합니다. 장치에 액세스할 수 있는 호스트에서 [SNMP walk](#collect-device-data)를 실행하고 그 결과를 요청에 포함합니다.

  해당 장치에서 사용할 수 있는 일반 기본 메트릭을 활용하여 NDM을 계속 사용할 수 있습니다.

* 추가 `sysobjectid` 값을 지원하도록 프로필을 확장합니다.

  예를 들어 다른 유형의 Cisco CSR을 모니터링하려는 경우 ISR 프로필을 직접 수정하여 다음과 같이 `sysobjectid` 값을 추가할 수 있습니다.

  ```
  snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
  ```

  **참고**: 장치의 `sysobjectid`를 모른다면 장치에 액세스할 수 있는 호스트에서 [SNMP walk](#collect-device-data)를 실행합니다. OID `1.3.6.1.2.1.1.2.0`에 대해 반환된 값을 찾아 프로필의 `sysobjectid` 목록에 추가합니다.


### 장치 데이터 수집 {#collect-device-data}

Datadog Agent가 설치되어 있으면 내장 `snmp walk` 명령으로 연결 상태를 확인하고 장치 프로필 요청에 필요한 출력 결과를 수집합니다. 자리표시자를 장치의 SNMP 자격 증명, 주소 및 포트로 바꾼 후 Agent 호스트에서 명령을 실행합니다.

{{< tabs >}}
{{% tab "Linux" %}}

SNMP v2의 경우:

```shell
sudo -u dd-agent datadog-agent snmp walk -v 2 -C <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

SNMP v3의 경우:

```shell
sudo -u dd-agent datadog-agent snmp walk -v 3 -u <USER> -a <AUTH_PROTOCOL> -A <AUTH_KEY> -x <PRIV_PROTOCOL> -X <PRIV_KEY> <IP_ADDRESS>:<PORT> 1.3.6
```

{{% /tab %}}
{{% tab "Windows" %}}

관리자 권한으로 명령 프롬프트를 엽니다.

SNMP v2의 경우:

```bat
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

SNMP v3의 경우:

```bat
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH_PROTOCOL> -A <AUTH_KEY> -x <PRIV_PROTOCOL> -X <PRIV_KEY> <IP_ADDRESS>:<PORT> 1.3.6
```

{{% /tab %}}
{{< /tabs >}}

또는 Net-SNMP가 설치되어 있다면 다음 명령을 실행합니다.

```shell
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

[1]: /ko/network_monitoring/devices/troubleshooting#what-do-i-do-if-datadog-supports-a-vendor-or-device-type-but-my-specific-model-isnt-supported
[2]: /ko/network_monitoring/devices/profiles/
[114]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/generic-device.yaml

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}