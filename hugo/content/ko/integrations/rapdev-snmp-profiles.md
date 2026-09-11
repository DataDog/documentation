---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-snmp-profiles
app_uuid: e82be05a-2fd2-44eb-9297-4fec152925a3
assets:
  dashboards:
    RapDev APC PDU Dashboard: assets/dashboards/rapdev_apc_pdu_dashboard.json
    RapDev APC UPS Dashboard: assets/dashboards/rapdev_apc_ups_dashboard.json
    RapDev Arista Switch Dashboard: assets/dashboards/rapdev_arista_switch_dashboard.json
    RapDev Aruba Switch Dashboard: assets/dashboards/rapdev_aruba_switch_dashboard.json
    RapDev AudioCodes Controller: assets/dashboards/rapdev_audiocodes_controller.json
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
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snmp.devices_monitored
      metadata_path: metadata.csv
      prefix: snmp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10122
    source_type_name: RapDev SNMP 프로파일
  monitors:
    Barracuda memory usage is high: assets/monitors/rapdev_barracuda-memory.json
    CMOS battery has an issue: assets/monitors/rapdev_idrac-cmos.json
    CPU load is high: assets/monitors/rapdev_barracuda-cpu.json
    CPU utilization is high: assets/monitors/rapdev_cpu_utilization.json
    Controller has an issue: assets/monitors/rapdev_idrac-raidcontrollerstate.json
    Disk has an issue: assets/monitors/rapdev_idrac-diskstatus.json
    Fan has an issue: assets/monitors/rapdev_idrac-fanstatus.json
    LCD has an issue: assets/monitors/rapdev_idrac-lcdstatus.json
    Memory DIMM has an issue: assets/monitors/rapdev_idrac-memorystatus.json
    Memory usage is high: assets/monitors/rapdev_memory_utilization.json
    Network port is down: assets/monitors/rapdev_idrac-nicconnectionstatus.json
    Operation status is in a bad state: assets/monitors/rapdev_interface_operstatus.json
    Power supply Sensor has an issue: assets/monitors/rapdev_idrac-psu-sensorstate.json
    Power supply has an issue: assets/monitors/rapdev_idrac-overallpowerstatus.json
    Power supply state settings has an issue: assets/monitors/rapdev_idrac-psu-statesettings.json
    Printer is in alert: assets/monitors/rapdev_printer_issue.json
    Service state changed: assets/monitors/rapdev_barracuda-servicestate.json
    Storage has an issue: assets/monitors/rapdev_idrac-overallstoragestate.json
    System BIOS has an issue: assets/monitors/rapdev_idrac-biosstatus.json
    Temperature sensor has an issue: assets/monitors/rapdev_idrac-tempsensorstatus.json
    VPN tunnel is downr: assets/monitors/rapdev_fortigate_tunnel.json
    Voltage has an issue: assets/monitors/rapdev_idrac-voltagestatus.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 네트워크
- snmp
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev-snmp-profiles
integration_id: rapdev-snmp-profiles
integration_title: SNMP 프로파일
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev-snmp-profiles
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: snmp.systemServices
  product_id: snmp-profiles
  short_description: 장치당 유닛 비용
  tag: snmp_device
  unit_label: SNMP 장치
  unit_price: 6
public_title: SNMP 프로파일
short_description: 자동탐지 장치 프로파일을 사용한 SNMP 장치 관측 가능성
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Network
  - Category::SNMP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 자동탐지 장치 프로파일을 사용한 SNMP 장치 관측 가능성
  media:
  - caption: RapDev SNMP 프로파일 소개
    image_url: images/video.png
    media_type: 비디오
    vimeo_id: 630489707
  - caption: Cisco Meraki 대시보드
    image_url: images/6.png
    media_type: image
  - caption: Palo Alto 방화벽 대시보드
    image_url: images/2.png
    media_type: image
  - caption: Dell iDRAC 대시보드
    image_url: images/3.png
    media_type: image
  - caption: 서버 하드웨어 태그 예시
    image_url: images/5.png
    media_type: image
  - caption: HP iLO3/4 메트릭 샘플
    image_url: images/1.png
    media_type: image
  - caption: Dell iDRAC 메트릭 샘플
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SNMP 프로파일
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 개요

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="RapDev SNMP 프로파일 소개" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

RapDev SNMP 프로파일 패키지는 기본적으로 150개 이상의 장치 프로필을 지원하며, 지원하는 모든 하드웨어 장치에 대한 기본 내장 대시보드를 갖추고 있어 즉시 모니터링할 수 있도록 도와드립니다. 일련 번호, 펌웨어 버전, 하드웨어 버전 등을 포함한 필요한 태그가 있는 관련 메트릭을 전부 수집할 수 있도록 수백 시간 동안 프로파일을 튜닝했습니다. 본 통합은 단 몇 분 안에 배포되어 모니터링, 시각화 및 경고를 즉시 시작할 수 있습니다.

본 통합으로 수백 개의 YAML 프로파일에 액세스할 수 있으며, 인스턴스에 새로운 대시보드 여러 개를 자동으로 배포할 수 있습니다. 그 다음 기본 Datadog SNMP 자동탐지 기능으로 지원되는 모든 하드웨어를 자동으로 감지하고, 기본 Datadog SNMP 통합으로 OID 폴링을 시작합니다.
Datadog 에이전트 또는 YAML에서 SNMP 프로파일을 관리, 편집, 수정 또는 업데이트할 필요가 없습니다. 모든 작업은 본 통합으로 처리되며 모니터링 및 경고에서 간단히 시작할 수 있습니다.

### 지원되는 장치
아래는 현재 지원되는 장치 목록이며, 모든 장치의 전체 업데이트 목록를 보려면 [웹사이트](https://www.rapdev.io/products/datadog-snmp-profiles)를 방문하세요.

| 제조사 | 모델                 | 버전       |
| ------------ | --------------------- | ------------- |
| APC          | Smart UPS             | 전체           |
| APC          | SmartCard             | 전체           |
| Arista       | Switch                | 7xxx          |
| Aruba        | Switch                | 전체           |
| AudioCodes   | Mediant SBC           | 전체           |
| Barracuda    | CloudGen Firewall     | 6,7,8         |
| Brocade      | VDX                   | 전체           |
| Checkpoint   | Gaia/Cloud Firewall   | 77+           |
| Cisco        | ASA                   | 5xxx          |
| Cisco        | ASR                   | 전체           |
| Cisco        | Catalyst              | 전체           |
| Cisco        | CUBE                  | IOS           |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | ISE                   | 전체           |
| Cisco        | ISR                   | 38XX, 44xx    |
| Cisco        | Nexus                 | 전체           |
| Cisco        | UCM                   | 전체           |
| Cisco        | UCS                   | M2, M3, M4    |
| Cisco        | WLC                   | 전체           |
| Citrix       | Netscaler             | 전체           |
| Dell         | iDRAC                 | 7,8,9         |
| Dell         | Powerconnect          | OS10          |
| Dell         | Powerconnect          | 3000          |
| F5           | Big-IP                | 9.4.x ~ 15.x |
| FortiNet     | FortiGate             | 전체           |
| HPE          | ProLiant Gen8-10      | iLO4,iLO5     |
| HPE          | Switch                |               |
| Ironport     | Mail                  | C3,C6,X1070   |
| Juniper      | SSG                   | 전체           |
| Kemp         | Loadmaster            | 전체           |
| Meraki       | CloudController       | CC            |
| Meraki       | Switch                | MR, MS, MX, Z |
| Nasuni       | Filer                 | 전체           |
| Palo Alto    | NextGen Firewall      | 9.x           |
| ServerTech   | PDU                   | Gen3, Gen4    |
| Sharp        | Printer               | 전체           |
| Steelhead    | Riverbed              | CX, EX        |
| VMware       | ESXi                  | 6.x           |

## 지원
지원 또는 기능 요청은 다음 채널로 RapDev.io에 문의해 주세요.

 - 이메일: support@rapdev.io 
 - 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - 전화: 855-857-0222 

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 중요한 기능이 누락되었나요? [요청 사항](mailto:support@rapdev.io)을 보내주시면 반영하도록 하겠습니다.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.