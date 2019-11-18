---
aliases:
  - /ja/agent/faq/how-to-monitor-snmp-devices/
assets:
  dashboards: {}
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
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snmp.
name: snmp
public_title: Datadog-SNMP インテグレーション
short_description: ネットワークデバイスから SNMP メトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Simple Network Management Protocol (SNMP) は、ルーター、スイッチ、サーバー、ファイアウォールなど、ネットワークに接続されたデバイスの監視に使用される標準のプロトコルです。このチェックは、ネットワークデバイスから SNMP メトリクスを収集します。

SNMP は、管理するオブジェクトを、OID (オブジェクト識別子) を使用して一意に識別します。OID の形式は階層ツリーパターンになっています。ルートの下は番号 1 の ISO、次のレベルは番号 3 の ORG で、各レベルは `.` で区切られます。

MIB (管理情報ベース) は、OID を可読名に変換する翻訳機として機能すると共に、階層の一部を編成します。ツリーの構造上、ほとんどの SNMP 値の先頭には同じオブジェクトが付加されます。MIB-2 を表す 1.3.6.1.1 は、アップタイム、インターフェイス、ネットワークスタックなどのシステム情報を保持する標準です。1.3.6.1.4.1 は、ベンダー固有の情報を保持します。

## セットアップ
### インストール

SNMP チェックは [Datadog Agent][1] パッケージに含まれています。追加のインストールは必要ありません。

### コンフィグレーション
#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

SNMP チェックは、デフォルトでは何も収集しません。[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `snmp.d/conf.yaml` ファイルを更新して、収集するメトリクスを指定します。使用可能なすべての構成オプションの詳細については、[サンプル snmp.d/conf.yaml][3] を参照してください。

##### SNMP v1、v2 の構成

```yaml
init_config:
  ## @param mibs_folder - 文字列 - 必須
  # mibs_folder: <PATH_TO_ADDITIONAL_MIBS>

  ## @param global_metrics - 要素のリスト - (instance レベルに要素がない場合は必須)
  # global_metrics:
  ## - MIB: <MIB_NAME>
  ##   symbol: <SYMBOL>

instances:
    ## @param ip_address - 文字列 - 必須
  - ip_address: localhost

    ## @param port - 整数 - 必須
    ## デフォルトの SNMP ポート。
    #
    port: 161

    ## @param community_string - 文字列 - 任意
    # community_string: public

    ## @param snmp_version - 整数 - 任意 - デフォルト: 2
    # snmp_version: 2

    ## @param metrics - 要素のリスト - (init_config レベルに要素がない場合は必須)
    metrics:
    - MIB: <MIB_NAME>
      symbol: <SYMBOL>
    - OID: <OID>
      name: <OID_NAME>
      metric_tags:
        - <TAG>
```

##### SNMP v3 の構成

**注**: すべての構成オプションについては、[SNMP ライブラリリファレンス][4]を参照してください。

```yaml
init_config:
  ## @param mibs_folder - 文字列 - 必須
  # mibs_folder: <PATH_TO_ADDITIONAL_MIBS>

  ## @param global_metrics - 要素のリスト - (instance レベルに要素がない場合は必須)
  # global_metrics:
  ## - MIB: <MIB_NAME>
  ##   symbol: <SYMBOL>

instances:
    ## @param ip_address - 文字列 - 必須
  - ip_address: localhost

    ## @param port - 整数 - 必須
    port: 161

    ## @param snmp_version - 整数 - 任意 - デフォルト: 2
    snmp_version: 3

    ## @param user - 文字列 - 必須
    user: <USERNAME>

    ## @param authProtocol - 文字列 - 必須
    authProtocol: <AUTHENTICATION_PROTOCOL>

    ## @param authKey - 文字列 - 必須
    authKey: <AUTHENTICATION_TYPE_KEY>

    ## @param privProtocol - 文字列 - 必須
    privProtocol: <PRIVACY_TYPE>

    ## @param privKey - 文字列 - 必須
    privKey: <PRIVACY_TYPE_KEY>

    ## @param metrics - 要素のリスト - (init_config レベルに要素がない場合は必須)
    metrics:
    - MIB: <MIB_NAME>
      symbol: <SYMBOL>
    - OID: <OID>
      name: <OID_NAME>
      metric_tags:
        - <TAG>
```

* 各 SNMP デバイスを個別のインスタンスとしてリストします。
* インスタンスごとに、選択した SNMP カウンターおよびゲージを `metrics` にリストします。

収集するメトリクスはいくつかの方法で指定できます。例については、[サンプル snmp.d/conf.yaml][3] を参照してください。

* MIB とシンボル
* OID と名前
* MIB とテーブル

##### 独自の MIB の使用

Agent v6.15 以降では、チェックが最初に構成内で MIB の参照を見つけたときに、http://mibs.snmplabs.com/asn1 で
ホストされている MIB が自動的に取得されます。

Datadog Agent で独自の MIB を使用するには、MIB を [PySNMP][5] 形式に変換します。それには、PySNMP に付属する `mibdump.py` スクリプトを使用します。[PySNMP 4.3+][6] で非推奨になった `build-pysnmp-mib` は、`mibdump.py` に置き換えられています。

Datadog Agent v5.14 以降、Agent の PySNMP 依存関係がバージョン 4.25 から 4.3.5 にアップグレードされました ([changelog][7] を参照)。これで、バージョン 5.13.x 以前の Agent に付属している `build-pysnmp-mib` も `mibdump.py` に置き換えられています。

Linux で、`mibdump.py` の場所を検索します。以下を実行してください。

```shell
$ find /opt/datadog-agent/ -type f -name build-pysnmp-mib.py -o -name mibdump.py
/opt/datadog-agent/embedded/bin/mibdump.py
```

Windows の場合は次の例のようになります。

```powershell
C:\>dir mibdump.py /s

Directory of C:\Program Files\Datadog\Datadog Agent\embedded\Scripts
```

Linux では、スクリプトに以下の形式を使用します。

```shell
<PATH_TO_FILE>/mibdump.py \
  --mib-source <PATH_TO_MIB_FILES> \
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ \
  --destination-directory=<PATH_TO_CONVERTED_MIB_PYFILES> \
  --destination-format=pysnmp <MIB_FILE_NAME>
```

Windows Powershell の場合は次の例のようになります。

Agent バージョン <=6.11:

```powershell
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded\python.exe' '<PATH_TO_FILE>\mibdump.py' `
  --mib-source <PATH_TO_MIB_SOURCE> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<PATH_TO_MIB_DESTINATION> `
  --destination-format=pysnmp <MIB_FILE_NAME>
```

Agent バージョン >=6.12:

```powershell
PS> & 'C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe' '<PATH_TO_FILE>\mibdump.py' `
  --mib-source <PATH_TO_MIB_SOURCE> `
  --mib-source http://mibs.snmplabs.com/asn1/@mib@ `
  --destination-directory=<PATH_TO_MIB_DESTINATION> `
  --destination-format=pysnmp <MIB_FILE_NAME>
```

`CISCO-TCP-MIB.my` の使用例:

```
 # /opt/datadog-agent/embedded/bin/mibdump.py --mib-source <PATH_TO_MIB_FILE>  --mib-source http://mibs.snmplabs.com/asn1/@mib@ --destination-directory=/opt/datadog-agent/pysnmp/custom_mibpy/ --destination-format=pysnmp CISCO-TCP-MIB

 Source MIB repositories: <PATH_TO_MIB_FILE>, http://mibs.snmplabs.com/asn1/@mib@
 Borrow missing/failed MIBs from: http://mibs.snmplabs.com/pysnmp/notexts/@mib@
 Existing/compiled MIB locations: pysnmp.smi.mibs, pysnmp_mibs
 Compiled MIBs destination directory: /opt/datadog-agent/pysnmp/custom_mibpy/
 MIBs excluded from code generation: INET-ADDRESS-MIB, PYSNMP-USM-MIB, RFC-1212, RFC-1215, RFC1065-SMI, RFC1155-SMI, RFC1158-MIB, RFC1213-MIB, SNMP-FRAMEWORK-MIB, SNMP-TARGET-MIB, SNMPv2-CONF, SNMPv2-SMI, SNMPv2-TC, SNMPv2-TM, TRANSPORT-ADDRESS-MIB
 MIBs to compile: CISCO-TCP
 Destination format: pysnmp
 Parser grammar cache directory: not used
 Also compile all relevant MIBs: yes
 Rebuild MIBs regardless of age: no
 Dry run mode: no Create/update MIBs: yes
 Byte-compile Python modules: yes (optimization level no)
 Ignore compilation errors: no
 Generate OID->MIB index: no
 Generate texts in MIBs: no
 Keep original texts layout: no
 Try various file names while searching for MIB module: yes
 Created/updated MIBs: CISCO-SMI, CISCO-TCP-MIB (CISCO-TCP)
 Pre-compiled MIBs borrowed:
 Up to date MIBs: INET-ADDRESS-MIB, SNMPv2-CONF, SNMPv2-SMI, SNMPv2-TC, TCP-MIB
 Missing source MIBs:
 Ignored MIBs:
 Failed MIBs:

 # ls /opt/datadog-agent/pysnmp/custom_mibpy/
CISCO-SMI.py CISCO-SMI.pyc CISCO-TCP-MIB.py CISCO-TCP-MIB.pyc

```

[SNMP YAML 構成][8]の `mibs_folder` で目的のパスを指定することで、Agent は、変換された MIB Python ファイルを検索します。

[Agent を再起動][9]すると、Datadog への SNMP メトリクスの送信が開始されます。

##### プロファイル

構成をグループ化するため、このチェックでは、複数のインスタンスでメトリクス定義を再利用するためのプロファイルを定義できます。プロファイルは、構成ファイル内のインラインまたは別のファイルで、メトリクスをインスタンスと同様に定義します。各インスタンスは、ただ 1 つのプロファイルに対応します。たとえば、次のように `init_config` セクションでプロファイルを定義できます。

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

必要な場合は、インスタンスで追加メトリクスを定義できます。これらのメトリクスは、プロファイル内のメトリクスと共に収集されます。

#### コンテナ化
コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][16]のガイドを参照して、次のパラメーターを適用してください。

##### SNMP v1

| パラメーター              | 値                                                                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------                                                        |
| `<INTEGRATION_NAME>`   | `snmp`                                                                                                                                                                                             |
| `<INIT_CONFIG>`        | `{"mibs_folder":"<PATH_TO_ADDITIONAL_MIBS>"}`                                                                                                                                                      |
| `<INSTANCE_CONFIG>`    | ```{"ip_address":"%%host%%", "port":"161", "community_string":"<COMMUNITY_NAME>", "snmp_version":"1", "metrics":[{"MIB":"<MIB_NAME>","symbol":"<SYMBOL>"},{"OID":"<OID>","name":"<OID_NAME>"}]}``` |

##### SNMP v2

| パラメーター              | 値                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------                                                                               |
| `<INTEGRATION_NAME>`   | `snmp`                                                                                                                                                                         |
| `<INIT_CONFIG>`        | `{"mibs_folder":"<PATH_TO_ADDITIONAL_MIBS>"}`                                                                                                                                  |
| `<INSTANCE_CONFIG>`    | ```{"ip_address":"%%host%%", "port":"161", "community_string":"<COMMUNITY_NAME>", "metrics":[{"MIB":"<MIB_NAME>","symbol":"<SYMBOL>"},{"OID":"<OID>","name":"<OID_NAME>"}]}``` |

##### SNMP v3

**注**: すべての構成オプションについては、[SNMP ライブラリリファレンス][4]を参照してください。

| パラメーター              | 値                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      |
| `<INTEGRATION_NAME>`   | `snmp`                                                                                                                                                                                                                                                                                                                 |
| `<INIT_CONFIG>`        | `{"mibs_folder":"<PATH_TO_ADDITIONAL_MIBS>"}`                                                                                                                                                                                                                                                                          |
| `<INSTANCE_CONFIG>`    | ```{"ip_address":"%%host%%", "port":"161", "snmp_version":"3", "user":"<USER_NAME>", "authKey":"<PASSWORD>", "privKey":"<PRIVACY_TYPE_KEY>", "authProtocol":"<AUTHENTICATION_PROTOCOL>", "privProtocol":"<PRIVACY_TYPE>", "metrics":[{"MIB":"<MIB_NAME>","symbol":"<SYMBOL>"},{"OID":"<OID>","name":"<OID_NAME>"}]}``` |


### カスタムメトリクス
SNMP インテグレーションで収集されたメトリクスは、[カスタムメトリクス][10]と見なされ、お客様の[課金][11]に影響します。

### 検証

[Agent の status サブコマンドを実行][12]し、Checks セクションで snmp を探します。

## 収集データ
### メトリクス

SNMP チェックは、指定されたメトリクスを `snmp.*` ネームスペース下に送信します。

### イベント

SNMP チェックには、イベントは含まれません。

### サービスのチェック

**snmp.can_check**:<br>
Agent が SNMP メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

## その他の参考資料


お役に立つドキュメント、リンクや記事:

* [SNMP の汎用/互換 OID リストはありますか][14]
* [SNMP と Datadog を使用した Unifi デバイスの監視][15]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: http://snmplabs.com/pysnmp/docs/api-reference.html#user-based
[5]: http://snmplabs.com/pysnmp/index.html
[6]: https://stackoverflow.com/questions/35204995/build-pysnmp-mib-convert-cisco-mib-files-to-a-python-fails-on-ubuntu-14-04
[7]: https://github.com/DataDog/dd-agent/blob/master/CHANGELOG.md#dependency-changes-3
[8]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example#L3
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[11]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[13]: https://docs.datadoghq.com/ja/help
[14]: https://docs.datadoghq.com/ja/integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
[15]: https://medium.com/server-guides/monitoring-unifi-devices-using-snmp-and-datadog-c8093a7d54ca
[16]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}