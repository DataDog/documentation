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

以下は現在サポートされているデバイスの一覧です。すべてのデバイスについての最新リストはウェブサイトを参照してください。

| メーカー | モデル                 | バージョン       |
| ------------ | --------------------- | ------------- |
| Dell         | iDRAC                 | 7             |
| Dell         | iDRAC                 | 8             |
| Dell         | iDRAC                 | 9             |
| HP           | ProLiant Gen8         | iLO 4         |
| HP           | ProLiant Gen9         | iLO 4         |
| HP           | ProLiant Gen10        | iLO 5         |
| APC          | Smart UPS             | すべて           |
| APC          | SmartCard             | すべて           |
| F5           | Big-IP                | 9.4.x - 15.x |
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
| Cisco        | 統合型コールマネージャー  | 8.x - 12.x   |
| Cisco        | ASR                   | すべて           |
| チェックポイント   | GAIA                  | 77 - 80.30   |
| チェックポイント   | クラウドファイアウォール        | 77 - 80.30   |
| Barracuda    | Next Gen ファイアウォール     | 6、7、8       |
| Barracuda    | SPAM フィルター           | 6、7、8       |
| Palo Alto    | Next Gen ファイアウォール     | 9.x           |
| Nutanix      | クラスター               | すべて           |
| Nutanix      | コンテナ統計       | すべて           |
| Nutanix      | コントローラー           | すべて           |
| Nutanix      | ディスク                 | すべて           |
| Nutanix      | Hypervisor           | すべて           |
| Nutanix      | ストレージプール         | すべて           |
| Nutanix      | 仮想マシン統計 | すべて           |
| FortiNet     | FortiGate             | すべて           |
| Cisco        | Meraki                | MR シリーズ     |
| Cisco        | Meraki                | Z シリーズ      |
| Cisco        | Meraki                | MX シリーズ     |
| Cisco        | Meraki                | MS シリーズ     |
| Dell         | Powerconnect          | 2000          |
| Dell         | Powerconnect          | 3000          |
| Dell         | Powerconnect          | 5000          |
| Dell         | Powerconnect          | 6000          |
| Dell         | Powerconnect          | 7000          |
| Dell         | Powerconnect          | 8000          |
| Dell         | PowerEdge シャーシ     | M1000e        |
| Dell         | PowerEdge シャーシ     | MX7000        |
| HP           | C7000                 | すべて           |
| Citrix       | Netscaler             | すべて           |
| Kemp         | Loadmaster            | すべて           |
| Arista       | イーサネットスイッチ     | 7500          |
| Arista       | イーサネットスイッチ     | 7400          |
| Arista       | イーサネットスイッチ     | 7300          |
| Arista       | イーサネットスイッチ     | 7200          |
| Arista       | イーサネットスイッチ     | 7100          |

## サポート
サポートまたは機能リクエストについては、以下のチャンネルで RapDev.io までお問い合わせください。

 - メール: integrations@rapdev.io 
 - チャット: [RapDev.io/products](https://rapdev.io/products)
 - 電話: 855-857-0222 

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:integrations@rapdev.io)からメッセージをお送りいただければ、Datadog が導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、[こちらをクリック](https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/pricing)してください。

