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
- マーケットプレイス
- snmp
"creates_events": false
"ddtype": "crawler"
"dependencies": []
"display_name": "RapDev SNMP プロファイル"
"draft": false
"git_integration_title": "rapdev-snmp-profiles"
"guid": "d6a64068-821a-4e71-b724-b3a395389609"
"integration_id": "rapdev-snmp-profiles"
"integration_title": "RapDev SNMP プロファイル"
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
  "unit_label": SNMP デバイス
  "unit_price": !!float "6.0"
"public_title": "RapDev SNMP プロファイル"
"short_description": "オートディスカバリーのデバイスプロファイルによる SNMP デバイスの監視および可視化。"
"support": "パートナー"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/EULA.pdf
  "legal_email": ddsales@rapdev.io
---


## 概要

[{{< img src="marketplace/rapdev-snmp-profiles/images/video.png" alt="RapDev SNMP プロファイルの紹介" >}}](https://www.youtube.com/watch?v=SVT9hqV7aD4&list=PLa2zzueYDhHrjODIXryBX_RakQIL6nmOh)

RapDev SNMP プロファイルパッケージは 150 以上のデバイスプロファイルをネイティブでサポートしています。事前組み込み型のダッシュボードもサポート対象のすべてのハードウェアデバイスに対応しており、迅速にデバイスを監視することができます。プロファイルのチューニングには数百時間を費やし、シリアルナンバー、ファームウェアのバージョン、ハードウェアのバージョンなど、必要なタグに関連するメトリクスをすべて収集できることを徹底的に確認しました。このインテグレーションのデプロイは数分で完了するため、モニタリング、可視化、アラートの生成をすばやくはじめることができます。

このインテグレーションでは数百種類の YAML プロファイルにアクセスし、多数の新しいダッシュボードをインスタンス上に自動デプロイすることができます。その後、ネイティブの Datadog SNMP オートディスカバリーを使用してサポート対象のハードウェアを自動検知し、ネイティブの Datadog SNMP インテグレーションで OID のポーリングを開始します。
お使いの Datadog Agent や YAML で SNMP プロファイルを管理、編集、修正、更新する必要はありません。これらの作業はすべてインテグレーションにより自動で行われるため、モニタリングとアラートの生成をすぐに開始することができます。

以下のスクリーンショットは、このインテグレーションで利用できるダッシュボードの画像です。

### Cisco Meraki ダッシュボード
{{< img src="marketplace/rapdev-snmp-profiles/images/6.png" alt="スクリーンショット 6" >}}

### Palo Alto ファイアウォールダッシュボード
{{< img src="marketplace/rapdev-snmp-profiles/images/2.png" alt="スクリーンショット 2" >}}

### Dell iDRAC サーバーダッシュボード
{{< img src="marketplace/rapdev-snmp-profiles/images/3.png" alt="スクリーンショット 3" >}}

### サーバーハードウェアについて収集されるタグのサンプル
{{< img src="marketplace/rapdev-snmp-profiles/images/5.png" alt="スクリーンショット 5" >}}

### HP iLO3/4 について収集されるメトリクスのサンプルリスト
{{< img src="marketplace/rapdev-snmp-profiles/images/1.png" alt="スクリーンショット 1" >}}

### Dell iDRAC について収集されるメトリクスのサンプルリスト
{{< img src="marketplace/rapdev-snmp-profiles/images/4.png" alt="スクリーンショット 4" >}}

以下は現在サポートされているデバイスの一覧です。すべてのデバイスについての最新リストは[ウェブサイト](https://www.rapdev.io/products/datadog-snmp-profiles)を参照してください。

| メーカー | モデル                 | バージョン       |
| ------------ | --------------------- | ------------- |
| APC          | Smart UPS             | すべて           |
| APC          | SmartCard             | すべて           |
| Arista       | Switch                | 7xxx          |
| Aruba        | Switch                | すべて           |
| AudioCodes   | Mediant SBC           | すべて           |
| Barracuda    | CloudGen Firewall     | 6、7、8         |
| Brocade      | VDX                   | すべて           |
| チェックポイント   | Gaia/Cloud Firewall   | 77+           |
| Cisco        | ASA                   | 5xxx          |
| Cisco        | ASR                   | すべて           |
| Cisco        | Catalyst              | すべて           |
| Cisco        | CUBE                  | IOS           |
| Cisco        | Nexus                 | 2k            |
| Cisco        | Nexus                 | 3k            |
| Cisco        | Nexus                 | 4k            |
| Cisco        | Nexus                 | 5k            |
| Cisco        | Nexus                 | 6k            |
| Cisco        | Nexus                 | 7k            |
| Cisco        | ISE                   | すべて           |
| Cisco        | ISR                   | 38XX、44xx    |
| Cisco        | Nexus                 | すべて           |
| Cisco        | UCM                   | すべて           |
| Cisco        | UCS                   | M2、M3、M4    |
| Cisco        | WLC                   | すべて           |
| Citrix       | Netscaler             | すべて           |
| Dell         | iDRAC                 | 7、8、9         |
| Dell         | Powerconnect          | OS10          |
| Dell         | Powerconnect          | 3000          |
| F5           | Big-IP                | 9.4.x - 15.x |
| FortiNet     | FortiGate             | すべて           |
| HPE          | ProLiant Gen8〜10      | iLO4、iLO5     |
| HPE          | Switch                |               |
| Ironport     | Mail                  | C3、C6、X1070   |
| Juniper      | SSG                   | すべて           |
| Kemp         | Loadmaster            | すべて           |
| Meraki       | CloudController       | CC            |
| Meraki       | Switch                | MR、MS、MX、Z |
| Nasuni       | Filer                 | すべて           |
| Palo Alto    | NextGen Firewall      | 9.x           |
| ServerTech   | PDU                   | Gen3、Gen4    |
| Sharp        | プリンタ               | すべて           |
| Steelhead    | Riverbed              | CX、EX        |
| VMware       | ESXi                  | 6.x           |

## サポート
サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: integrations@rapdev.io 
 - チャット: [RapDev.io](https://rapdev.io/)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/pricing)してください。

