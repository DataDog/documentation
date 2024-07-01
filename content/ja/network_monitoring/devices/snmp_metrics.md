---
aliases:
- /ja/network_performance_monitoring/devices/setup/
- /ja/network_monitoring/devices/setup/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: ネットワークデバイスモニタリングのプロファイルの使用
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: ナレッジセンター
  text: SNMP モニタリングの概要
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: GitHub
  text: Datadog での SNMP モニタリング
title: ネットワークデバイスから SNMP メトリクスを収集
---

## インストール

ネットワークデバイスモニタリングは [Datadog Agent][1] パッケージに含まれている SNMP インテグレーションに依存します。Agent v7.32+ を使用していることを確認してください。追加のインストールは必要ありません。

## コンフィギュレーション

Datadog ネットワークデバイスモニタリングは、個々のデバイスからのメトリクスの収集、またはサブネット全体のデバイス (一意の IP アドレス) の自動検出をサポートします。

ネットワーク上に存在するデバイスの数、およびネットワークがどれだけ動的か (つまり、デバイスが追加または削除される頻度) に基づき、収集戦略を選択します。

- 小規模でほとんど静的なネットワークについては、[個々のデバイスの監視](#monitoring-individual-devices)をご覧ください。
- 大規模なネットワークや動的なネットワークについては、[オートディスカバリー](#autodiscovery)をご覧ください。

収集戦略に関係なく、Datadog の [sysObjectID マップデバイスプロファイル][2]を利用して、デバイスから関連するメトリクスを自動的に収集できます。

### 個々のデバイスの監視

個々のデバイスを監視するには

- `snmp.d/conf.yaml` ファイル ([Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダー内) の IP アドレスと追加デバイスのメタデータを (タグとして) 含めます。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル snmp.d/conf.yaml][4] を参照してください。

{{< tabs >}}
{{% tab "SNMPv2" %}}

- SNMPv2 の場合 デバイスの IP アドレスおよびデバイスの_コミュニティ文字列_を指定してインスタンスを構成します。

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      community_string: 'sample-string'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- SNMPv3 の場合は、デバイスの IP アドレスおよび SNMPv3 資格情報 (デバイスに応じて) を指定してインスタンスを構成します。例: `user`、`authProtocol`、`authKey`、`privProtocol`、`privKey`:

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      snmp_version: 3  # optional, if omitted which version of SNMP you are using is auto-detected
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{< /tabs >}}

- [Agent を再起動します][5]。

セットアップしたら、Agent は、[Datadog のデバイスプロファイル][6]の 1 つとデバイスを照合して、関連するメトリクスを収集します。

セットアップを拡張するには

* さらにインスタンスを追加して、ネットワーク上のより多くのデバイスからメトリクスを収集します。
* 動的ネットワーク上の多数のデバイスからメトリクスを収集する必要がある場合は、[オートディスカバリー](#autodiscovery)を使用します。

### オートディスカバリー

個々のデバイスを指定する代わりに、オートディスカバリーを使用して、ネットワーク上のすべてのデバイスを自動的に検出することも可能です。

オートディスカバリーは、構成されたサブネット上の各 IP をポーリングし、デバイスからの応答を確認します。次に、Datadog Agent は、検出されたデバイスの `sysObjectID` を検索し、それを [Datadog のデバイスプロファイル][6]の 1 つにマップします。このプロファイルには、さまざまなタイプのデバイスについて収集される事前定義メトリクスのリストが含まれます。

ネットワークデバイスモニタリングでオートディスカバリーを使用するには

1. Datadog Agent をインストールまたは v7.27 以上にアップグレードします。プラットフォーム固有の手順については、[Datadog Agent][7] のドキュメントを参照してください。

2. [`datadog.yaml`][8] Agent コンフィギュレーションファイルを編集し、Datadog がスキャンするすべてのサブネットを含めます。以下のサンプルコンフィギュレーションは、オートディスカバリーに必要なパラメーター、デフォルト値、そして例を示しています。

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # デバイスの検出に同時に使用されるワーカー数
  discovery_interval: 3600  # 各オートディスカバリーの間隔 (秒)
  loader: core  # SNMP インテグレーションのコアチェック実装を使用します。推奨
  use_device_id_as_hostname: true  # 推奨
  configs:
    - network_address: 10.10.0.0/24  # CIDR サブネット
      loader: core
      snmp_version: 2
      port: 161
      community_string: '***'  # 一重引用符で囲みます
      tags:
      - "key1:val1"
      - "key2:val2"
    - network_address: 10.20.0.0/24
      loader: core
      snmp_version: 2
      port: 161
      community_string: '***'
      tags:
      - "key1:val1"
      - "key2:val2"
```

{{< /tabs >}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # デバイスの検出に同時に使用されるワーカー数
  discovery_interval: 3600  # 各オートディスカバリーの間隔 (秒)
  loader: core  # SNMP インテグレーションのコアチェック実装を使用します。推奨
  use_device_id_as_hostname: true  # 推奨
  configs:
    - network_address: 10.10.0.0/24  # CIDR サブネット
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'  # 選択肢: MD5、SHA、SHA224、SHA256、SHA384、SHA512
      authKey: 'fakeKey'  # 一重引用符で囲みます
      privProtocol: 'AES256'  # 選択肢: DES、AES、AES192、AES192C、AES256、AES256C
      privKey: 'fakePrivKey'  # 一重引用符で囲みます
      tags:
        - 'key1:val1'
        - 'key2:val2'
    - network_address: 10.20.0.0/24
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'
      authKey: 'fakeKey'
      privProtocol: 'AES256'
      privKey: 'fakePrivKey'
      tags:
        - 'key1:val1'
        - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

**注**: Datadog Agent は検出された各 IP の SNMP チェックを自動で構成します。検出されたデバイスは、SNMP を使用してポールされた際に正常に応答する IP となります。

## 検証

[Agent のステータスサブコマンドを実行][9]し、Checks セクションで `snmp` を探します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /ja/agent
[8]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: /ja/agent/guide/agent-commands/#agent-status-and-information