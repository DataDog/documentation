---
aliases:
  - /ja/agent/faq/how-to-monitor-snmp-devices/
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - notification
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snmp/README.md'
display_name: SNMP
git_integration_title: snmp
guid: 080bb566-d1c8-428c-9d85-71cc2cdf393c
integration_id: snmp
integration_title: SNMP
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
name: snmp
public_title: Datadog-SNMP インテグレーション
short_description: ネットワークデバイスから SNMP メトリクスを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Simple Network Management Protocol (SNMP) は、ルーター、スイッチ、サーバー、ファイアウォールなど、ネットワークに接続されたデバイスの監視に使用される標準のプロトコルです。このチェックは、ネットワークデバイスから SNMP メトリクスを収集します。

SNMP は、sysObjectID (システムオブジェクト識別子) を使用してデバイスを一意に識別し、OID (オブジェクト識別子) を使用して管理するオブジェクトを一意に識別します。OID の形式は階層ツリーパターンになっています。ルートの下は番号 1 の ISO、次のレベルは番号 3 の ORG で、各レベルは `.` で区切られます。

MIB (管理情報ベース) は、OID を可読名に変換する翻訳機として機能すると共に、階層の一部を編成します。ツリーの構造上、ほとんどの SNMP 値の先頭には同じオブジェクトが付加されます。

* `1.3.6.1.1`: (MIB-II) アップタイム、インターフェイス、ネットワークスタックなどのシステム情報を保持する標準です。
* `1.3.6.1.4.1`: ベンダー固有の情報を保持する標準です。

## セットアップ

### インストール

SNMP チェックは [Datadog Agent][1] パッケージに含まれています。追加のインストールは必要ありません。

### 構成

`snmp.d/conf.yaml` ファイル ([Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダー内) のコンフィギュレーションオプションを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル snmp.d/conf.yaml][3] を参照してください。

Datadog SNMP チェックは、個々のデバイスからのメトリクスの収集、またはサブネット全体のデバイス (一意の IP アドレス) の自動検出をサポートします。

どの収集戦略を選択するかは、主にネットワーク上に存在するデバイスの数、およびネットワークがどれだけ動的か (つまり、デバイスが追加または削除される頻度) によって異なります。

- 小規模でほとんど静的なネットワークについては、[個々のデバイスの監視](#monitoring-individual-devices)をご覧ください。
- 大規模なネットワークや動的なネットワークについては、[オートディスカバリー](#autodiscovery)をご覧ください。

収集戦略に関係なく、Datadog の [`sysObjectID` マップデバイスプロファイル](#sysobjectid-mapped-device-profiles)を利用して、デバイスから関連するメトリクスを自動的に収集できます。

#### 個々のデバイスの監視

SNMP インテグレーションを開始する最も簡単な方法は、SNMP デバイスの IP アドレスを指定することです。

SNMPv2 デバイスの場合:

1. i) デバイスの IP アドレス、ii) デバイスの_コミュニティ文字列_を指定してインスタンスを構成します。

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        community_string: "<COMMUNITY_STRING>"
    ```

2. [Agent を再起動します][4]。

SNMPv3 デバイスの場合:

1. i) デバイスの IP アドレス、ii) デバイスの SNMPv3 資格情報、つまり `user` と `auth_protocol`、`auth_key`、`priv_protocol`、`priv_key` のいずれか (デバイスに応じて) を指定してインスタンスを構成します。

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        user: "<USER>"
        ## Configure these as appropriate
        # authProtocol: SHA
        # authKey: "<AUTH_KEY>"
        # privProtocol: AES
        # privKey: "<PRIV_KEY>"
    ```

2. [Agent を再起動します][4]。

次に、Agent は、[Datadog の標準デバイスプロファイル](#metric-definition-by-profile)の 1 つとデバイスを照合して、関連するメトリクスの収集を開始します。

メトリクスがレポートされたら、さまざまな方法で設定を拡張できます。

* さらにインスタンスを追加して、ネットワーク上のより多くのデバイスからメトリクスを収集します。
* 動的ネットワーク上の多数のデバイスからメトリクスを収集する必要がある場合は、[オートディスカバリー](#autodiscovery)の使用を検討してください。

#### オートディスカバリー

個々のデバイスを指定する代わりに、オートディスカバリーを使用して、ネットワーク上のすべてのデバイスを自動的に検出できます。

オートディスカバリーは、構成されたサブネット上の各 IP をポーリングし、SNMP デバイスからの応答を確認します。次に、Datadog Agent は、検出されたデバイスの `sysObjectID` を検索し、それを [Datadog の標準デバイスプロファイル](#metric-definition-by-profile)の 1 つにマップします。これは、さまざまなタイプのデバイスについて収集される事前定義メトリクスのリストで構成されます。

SNMP チェックでオートディスカバリーを使用するには

1. Datadog Agent をインストールまたは v6.16 以上にアップグレードします。プラットフォーム固有の手順については、[Datadog Agent][5] のドキュメントを参照してください。

2. [snmp.d/conf.yaml][3] で SNMP チェックを構成します。以下のパラメーターが利用可能です。必須パラメーター、デフォルト値、および例については、[サンプル構成](#sample-config) を参照してください。

| パラメーター                    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `profiles`                   | 使用するプロファイルのリスト。プロファイルは、Datadog Agent がメトリクスと関連タグを収集する OID のコレクションです。Datadog がサポートするプロファイルの完全なリストは [Github][6] にあります。デフォルトでは、Agent が送信しコンフィギュレーションディレクトリにあるプロファイルはすべて読み込まれます。収集用に特定のプロファイルをカスタマイズするには、`definition_file` の下のファイル名で参照するか、`definition` の下にインラインで記述することができます。OOTB Datadog プロファイルは、名前でリストできます。追加のカスタムプロファイルは、構成内のファイルパスで参照するか、構成ディレクトリにドロップすることができます。 **注**: ジェネリックプロファイルは `generic_router.yaml` で、ルーター、スイッチなどで機能するはずです。 |
| `network_address`            | Agent がデバイスをスキャンおよび検出するために IPv4 表記で記述されたサブネットとマスク。                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `community_string`           | SNMPv1 および SNMPv2 の使用向け                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `snmp_version`               | 使用している SNMP バージョン。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `port`                       | Datadog Agent がリッスンするポート。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `timeout`                    | タイムアウトするまでの秒数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `retries`                    | 失敗するまでの再試行回数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_interval`         | ディスカバリースキャンの間隔。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `discovery_allowed_failures` | 検出されたホストが、検出されたデバイスのリストから削除されるまでに失敗できる回数。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `bulk_threshold`             | BULK リクエストをトリガーするテーブル内のシンボルの数。このパラメーターが対象となるのは、SNMPv > 1 のみです。                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tags`                       | すべての SNMP メトリクスに追加するグローバルタグのリスト。[Datadog でのタグ付け][7]の詳細をご覧ください。                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

##### 構成例

```yaml
init_config:

instances:
  -
    ## @param network_address - 文字列 - 任意
    network_address: "<NETWORK_ADDRESS>"

    ## @param port - 整数 - 任意 - デフォルト: 161
    port: 161

    ## @param community_string - 文字列 - 任意
    community_string: public

    ## @param snmp_version - 整数 - 任意 - デフォルト: 2
    snmp_version: 2

    ## @param timeout - 整数 - 任意 - デフォルト: 1
    timeout: 1

    ## @param retries - 整数 - 任意 - デフォルト: 5
    retries: 5

    ## @param discovery_interval - 整数 - 任意 - デフォルト: 3600
    discovery_interval: 3600

    ## @param discovery_allowed_failures - 整数 - 任意 - デフォルト: 3
    discovery_allowed_failures: 3

    ## @param enforce_mib_constraints - boolean - 任意 - デフォルト: true
    enforce_mib_constraints: true

    ## @param bulk_threshold - 整数 - 任意 - デフォルト: 5
    bulk_threshold: 5

    ## @param tags - key:value 要素のリスト - 任意
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"
```

##### sysObjectID マップデバイスプロファイル

プロファイルを使用すると、SNMP チェックで複数のデバイスタイプまたはインスタンスでメトリクス定義を再利用できます。プロファイルは、構成ファイル内のインラインまたは別のファイルで、メトリクスをインスタンスと同様に定義します。各インスタンスは、ただ 1 つのプロファイルに対応します。たとえば、次のように `init_config` セクションでプロファイルを定義できます。

```yaml
init_config:
  profiles:
    my-profile:
      definition:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
          index: 1
      sysobjectid: '1.3.6.1.4.1.8072.3.2.10'
```

次に、名前を明示してそれを参照するか、sysObjectID 検出を使用します。

```yaml
instances:
   - ip_address: 192.168.34.10
     profile: my-profile
   - ip_address: 192.168.34.11
     # その他は必要ありません。チェックは sysObjectID を問い合わせて、
     # 一致した場合はそのプロファイルを使用します。
```

必要な場合は、インスタンスで追加メトリクスを定義できます。これらのメトリクスは、プロファイル内のメトリクスに加えて収集されます。

#### プロファイルによるメトリクス定義

MIB 依存関係を共有するデバイスが同じプロファイルを再利用できるように、プロファイルは互いに交換して使用できます。たとえば、Cisco c3850 のプロファイルは多くの Cisco スイッチで使用できます。

* [汎用ルーター][8] _(他のプロファイルが一致しない場合のデフォルトプロファイル)_
* [Cisco ASA 5525][9]
* [Cisco c3850][10]
* [Cisco Nexus][11]
* [Cisco Meraki][12]
* [Cisco UC Virtual Machine][13]
* [Cisco ICM][14]
* [Cisco ISR 4431][15]
* [Dell iDRAC][16]
* [Dell Poweredge][17]
* [F5 Big IP][18]
* [Fortinet FortiGate][19]
* [HP iLO4][20]
* [HPE Proliant][21]
* [NetApp][22]
* [Palo Alto][23]
* [Checkpoint Firewall][24]
* [Isilon][25]
* [APC UPS][26]

### 検証

[Agent の status サブコマンドを実行][27]し、Checks セクションで `snmp` を探します。

## 収集データ

SNMP チェックは、指定されたメトリクスを `snmp.*` ネームスペース下に送信します。**収集されるメトリクスは、対応するプロファイルで構成されるインテグレーションに依存します。**

### メトリクス
{{< get-metrics-from-git "snmp" >}}


### イベント

SNMP チェックには、イベントは含まれません。

### サービスのチェック

**snmp.can_check**:<br>
Agent が SNMP メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][29]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

* [Datadog には、SNMP で一般的に使用される/互換性のある OID のリストがありますか？][30]
* [SNMP と Datadog を使用した Unifi デバイスの監視][31]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: https://docs.datadoghq.com/ja/tagging/
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/generic-router.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-asa-5525.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-3850.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco-nexus.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/meraki-cloud-controller.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_uc_virtual_machine.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_icm.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/cisco_isr_4431.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/idrac.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/dell-poweredge.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/f5-big-ip.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/fortinet-fortigate.yaml
[20]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hp-ilo4.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/hpe-proliant.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/netapp.yaml
[23]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/palo-alto.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/checkpoint-firewall.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/isilon.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/profiles/apc-ups.yaml
[27]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[28]: https://github.com/DataDog/integrations-core/blob/master/snmp/metadata.csv
[29]: https://docs.datadoghq.com/ja/help/
[30]: https://docs.datadoghq.com/ja/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids/
[31]: https://medium.com/server-guides/monitoring-unifi-devices-using-snmp-and-datadog-c8093a7d54ca