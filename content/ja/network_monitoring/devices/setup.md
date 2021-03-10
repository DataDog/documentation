---
title: ネットワークデバイスモニタリングのセットアップ
kind: documentation
aliases:
  - /ja/network_performance_monitoring/devices/setup/
further_reading:
  - link: /network_monitoring/devices/profiles
    tag: Documentation
    text: ネットワークデバイスモニタリングのプロファイルの使用
  - link: 'https://www.datadoghq.com/blog/monitor-snmp-with-datadog/'
    tag: ブログ
    text: Datadog での SNMP モニタリング
---
## インストール

ネットワークデバイスモニタリングは [Datadog Agent][1] パッケージに含まれている SNMP プロトコルを使用します。追加のインストールは必要ありません。

## コンフィギュレーション

Datadog ネットワークデバイスモニタリングは、個々のデバイスからのメトリクスの収集、またはサブネット全体のデバイス (一意の IP アドレス) の自動検出をサポートします。

ネットワーク上に存在するデバイスの数、およびネットワークがどれだけ動的か (つまり、デバイスが追加または削除される頻度) に基づき、収集戦略を選択します。

- 小規模でほとんど静的なネットワークについては、[個々のデバイスの監視](#monitoring-individual-devices)をご覧ください。
- 大規模なネットワークや動的なネットワークについては、[オートディスカバリー](#autodiscovery)をご覧ください。

収集戦略に関係なく、Datadog の [sysObjectID マップデバイスプロファイル][2]を利用して、デバイスから関連するメトリクスを自動的に収集できます。

### 個々のデバイスの監視

個々のデバイスを監視するには

- `snmp.d/conf.yaml` ファイル ([Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダー内) のサブネットと SNMP バージョンを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル snmp.d/conf.yaml][4] を参照してください。

{{< tabs >}}
{{% tab "SNMPv2" %}}

- SNMPv2 の場合 デバイスの IP アドレスおよびデバイスの_コミュニティ文字列_を指定してインスタンスを構成します。

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        community_string: "<COMMUNITY_STRING>"
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- SNMPv3 の場合は、デバイスの IP アドレスおよび SNMPv3 資格情報 (デバイスに応じて) を指定してインスタンスを構成します。例: `user`、`auth_protocol`、`auth_key`、`priv_protocol`、`priv_key`:

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

1. Datadog Agent をインストールまたは v6.16 以上にアップグレードします。プラットフォーム固有の手順については、[Datadog Agent][7] のドキュメントを参照してください。

2. [Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの [snmp.d/conf.yaml][4] ファイルを編集します。

#### 最小限の構成

```yaml
instances:
  - network_address: "<NETWORK_ADDRESS>"
    community_string: "<COMMUNITY_STRING>"
```

#### 拡張構成

以下のサンプルコンフィグレーションは、オートディスカバリーに必要なパラメーター、デフォルト値、そして例を示しています。

{{< code-block lang="yaml" filename="snmp.d/conf.yaml" disable_copy="true" >}}

init_config:
instances:
    ## @param network_address - string - optional
  - network_address: "<NETWORK_ADDRESS>"
    ## @param port - integer - optional - default: 161
    port: 161
    ## @param community_string - string - optional
    community_string: public
    ## @param snmp_version - integer - optional - default: 2
    snmp_version: 2
    ## @param timeout - integer - optional - default: 1
    timeout: 1
    ## @param retries - integer - optional - default: 5
    retries: 5
    ## @param discovery_interval - integer - optional - default: 3600
    discovery_interval: 3600
    ## @param discovery_allowed_failures
    ## integer - optional - default: 3
    discovery_allowed_failures: 3
    ## @param enforce_mib_constraints
    ## boolean - optional - default: true
    enforce_mib_constraints: true
    ## @param bulk_threshold - integer - optional - default: 5
    bulk_threshold: 5
    ## @param tags - list of key:value element - optional
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"

{{< /code-block >}}

## 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `snmp` を探します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /ja/agent
[8]: /ja/agent/guide/agent-commands/#agent-status-and-information