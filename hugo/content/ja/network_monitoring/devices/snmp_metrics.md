---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: Network Device Monitoring でのプロファイルの使用
- link: https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/
  tag: ナレッジセンター
  text: SNMP モニタリングの概要
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
title: SNMP メトリクス
---
## インストール {#installation}

Network Device Monitoring は [Datadog Agent][1] パッケージに含まれている SNMP インテグレーションに依存しており、SNMP の 3 つのバージョン (`SNMPv1`、`SNMPv2`、`SNMPv3`) をすべてサポートしています。検出時には、SNMP ポート (デフォルトは 161) がポーリングされます。応答があり、一致するプロファイルがある場合、そのデバイスは検出済みと見なされます。

## 前提条件 {#pre-requisites}

Agent v7.32 以上

## 仕組み {#how-it-works}

次の図は、Datadog Agent と監視対象デバイスの間のデフォルトのポートおよびプロトコルを示しています。SNMP メトリクスについては、Datadog Agent が Autodiscovery、または手動のデバイス IP 構成に基づいてデバイスをポーリングします。NDM が構成された Datadog Agent は、オンプレミスまたはクラウドにデプロイされ、ネットワークから収集したすべてのデバイスおよびネットワークのデータを統合し、HTTPS のポート `443` 経由で Datadog に送信します。これにより、メトリクス、ログ、トレース、モニター、ダッシュボードの統一されたフルスタックの可観測性が提供されます。

{{< img src="/network_device_monitoring/snmp/snmp_device_polling.png" alt="NDM における SNMP デバイスポーリングの流れを示す図。" style="width:90%;" >}}

## 次のステップ {#next-steps}

次の手順に従って、ネットワークデバイスから SNMP メトリクスを収集するように Datadog を構成します。

## 構成 {#configuration}

Datadog ネットワークデバイスモニタリングは、個々のデバイスからのメトリクスの収集、またはサブネット全体のデバイス (一意の IP アドレス) の自動検出をサポートします。

ネットワーク上に存在するデバイスの数、およびネットワークがどれだけ動的か (つまり、デバイスが追加または削除される頻度) に基づき、収集戦略を選択します。

[個々のデバイスの監視](#monitoring-individual-devices)
: 小規模で大部分が静的なネットワーク向け。

[Autodiscovery](#autodiscovery)
: より大規模なネットワークや動的なネットワーク向け。

収集戦略に関係なく、Datadog の [sysObjectID マップデバイスプロファイル][2]を利用して、デバイスから関連するメトリクスを自動的に収集できます。

### 個々のデバイスの監視 {#monitoring-individual-devices}

個々のデバイスを監視するには:

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

- SNMPv3 の場合は、デバイスの IP アドレスおよび SNMPv3 資格情報 (デバイスに応じて) を指定してインスタンスを構成します (例: `user`、`authProtocol`、`authKey`、`privProtocol`、`privKey`)。

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

- [Agentを再起動][5]します。

セットアップ後、Agent は、[Datadog のサポートされるデバイスプロファイル][6]の 1 つとデバイスを照合して、関連するメトリクスを収集します。

セットアップを拡張するには:

* さらにインスタンスを追加して、ネットワーク上のより多くのデバイスからメトリクスを収集します。
* 動的ネットワーク上の多数のデバイスからメトリクスを収集する必要がある場合は、[Autodiscovery](#autodiscovery) を使用します。

### Autodiscovery {#autodiscovery}

個々のデバイスを指定する代わりに、Autodiscovery を使用して、ネットワーク上のすべてのデバイスを自動的に検出できます。

Autodiscovery は、構成されたサブネット上の各 IP をポーリングし、デバイスからの応答を確認します。次に、Datadog Agent は、検出されたデバイスの `sysObjectID` を検索し、それを [Datadog のサポートされるデバイスプロファイル][6]の 1 つにマップします。このプロファイルには、さまざまなタイプのデバイスについて収集される事前定義メトリクスのリストが含まれます。

Network Device Monitoring で Autodiscovery を使用するには

1. Datadog Agent v7.27 以上をインストールするか v7.27 以上にアップグレードします。プラットフォーム固有の手順については、[Datadog Agent][7] のドキュメントを参照してください。

2. [`datadog.yaml`][8] Agentコンフィギュレーションファイルを編集し、Datadog がスキャンするすべてのサブネットを含めます。次のサンプルコンフィグレーションは、Autodiscovery に必要なパラメーター、デフォルト値、および例を示しています。

3. 必要に応じて、Agent の Autodiscovery におけるデバイスの重複排除を有効にします。この機能はデフォルトでは無効になっており、使用するには Agent バージョン 7.67+ が必要です。詳細については、[Agent 構成ファイルの例][11]の `use_deduplication` パラメーターを参照してください。

   ```yaml
   network_devices:
     autodiscovery:
       use_deduplication: true
   ```

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'  # enclose with single quote
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

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
network_devices:
  autodiscovery:
    ## use_deduplication - boolean - optional - default: false
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        snmp_version: 3
        user: 'user'
        authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        authKey: 'fakeKey'  # enclose with single quote
        privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
        privKey: 'fakePrivKey'  # enclose with single quote
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

**注**: Datadog Agent は、検出された各 IP の SNMP チェックを自動的に構成します。検出されたデバイスは、SNMP を使用してポーリングされたときに正常に応答する IP となります。

**注**: この構文を使用するには、Agent 7.54 以上を使用していることを確認してください。以前のバージョンについては、[以前のconfig_template.yaml][9] を参照してください。

### インターフェイス速度のオーバーライド {#override-interface-speed}

デフォルトでは、SNMP チェックでデバイスから検出されたインターフェイス速度が報告されます。物理ポートの速度が実際の回線帯域幅と異なる場合 (たとえば、50 Mbps の回線に対して 1 Gbps の物理ポートが設定されている場合)、`interface_configs` を使用して特定のインターフェイスの受信速度および送信速度をオーバーライドできます。

`snmp.d/conf.yaml` のインスタンス構成に `interface_configs` を追加します。

```yaml
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    interface_configs:
      - match_field: name      # match by interface name or ifIndex
        match_value: eth0      # case-sensitive
        in_speed: 50000000     # inbound speed in bytes per second (50 Mbps)
        out_speed: 50000000    # outbound speed in bytes per second (50 Mbps)
```

使用可能なすべての `interface_configs` オプションについては、[サンプル snmp.d/conf.yaml][4] を参照してください。

## 検証 {#validation}

[Agent の status サブコマンドを実行][10]し、[Checks] (チェック) セクションで `snmp` を探します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /ja/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/network_monitoring/devices/supported_devices
[7]: /ja/agent
[8]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855
[10]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example