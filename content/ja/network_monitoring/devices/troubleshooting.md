---
aliases:
- /ja/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitor SNMP with Datadog
title: NDM Troubleshooting
---

## 概要

Datadog Network Device Monitoring のトラブルシューティングには、以下の情報を使用してください。さらにヘルプが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## 用語

SNMP - Simple network management protocol
: ベアメタルネットワーキングギアに関する情報を収集するために使用されるネットワークプロトコル。

OID - Object identifier
: ポーリングされたときにその値の応答コードを返す、デバイス上の一意の ID またはアドレス。たとえば、OID は CPU またはデバイスのファン速度です。

sysOID - System object identifier
: デバイスタイプを定義する特定のアドレス。すべてのデバイスには、それを定義する一意の ID があります。 たとえば、Meraki ベースの sysOID は `1.3.6.1.4.1.29671` です。

MIB - Managed information base
: MIB に関連する可能性のあるすべての OID とその定義のデータベースまたはリスト。たとえば、`IF-MIB` (interface MIB) には、デバイスのインターフェースに関する説明情報のすべての OID が含まれています。

## よくあるご質問

#### Datadog はどの SNMP バージョンをサポートしていますか？

Datadog は、SNMPv1、SNMPv2、SNMPv3 の 3 つのバージョンの SNMP をすべてサポートしています。

#### Datadog はデバイスを検出するためにどのプロトコルを使用しますか？

Datadog は SNMP を使用してデバイスを検出します。検出中、SNMP ポート (デフォルトは 161) がポーリングされます。一致する応答とプロファイルがある場合、これは検出されたデバイスと見なされます。

#### Datadog は MIB 認証を行いますか？すべての MIB を送信する必要がありますか？Python で MIB を変換するにはどうすればよいですか？

Datadog Agent には MIB がありません。つまり、MIB で何かをする必要はありません。Datadog デバイスプロファイルで収集されたすべてのメトリクスは、MIB がなくても自動的に機能します。

メトリクスまたはカスタムコンフィギュレーションを追加するには、MIB 名、テーブル名、テーブル OID、シンボル、シンボル OID をリストします。次に例を示します。

```yaml
- MIB: EXAMPLE-MIB
    table:
      # メトリクスが由来するテーブルの ID。
      OID: 1.3.6.1.4.1.10
      name: exampleTable
    symbols:
      # 取得するシンボル ('columns') のリスト。
      # 単一の OID と同じ形式。
      # テーブルの各行はこれらのメトリクスを出力します。
      - OID: 1.3.6.1.4.1.10.1.1
        name: exampleColumn1
```

#### デバイスとモデルのペアがサポートされていない場合でも、Network Device Monitoring を使用できますか？

Datadog は、すべてのデバイスから一般的なベースラインメトリクスを収集します。ベンダー MIB からのサポートされていないメトリクスがある場合は、カスタムプロファイルを作成するか、機能リクエストを [Datadog サポート][1]に送信してください。

機能リクエストを送信する場合、Datadog サポートにはリクエストされたデバイスからの `snmpwalk` が必要です。以下を実行し、出力を送信してください。

```
snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6
```

#### ネットワークについて収集されたメトリクスが 1 つしか表示されず、それがゼロで収集されたデバイスの数であるのはなぜですか？

1. デバイスの ACL/ファイアウォールルールを緩和してみてください。
2. Agent が実行されているホストから `snmpwalk -O bentU -v 2c -c <COMMUNITY_STRING> <IP_ADDRESS>:<PORT> 1.3.6` を実行します。応答なしでタイムアウトが発生する場合は、Datadog Agent がデバイスからメトリクスを収集できないように何かによってブロックされている可能性があります。

#### Datadog でサポートされているベンダーまたはデバイスタイプであるにもかかわらず、所有している特定のモデルがサポートされていない場合はどうしたらいいですか？

- [Datadog サポート][1]までご連絡の上、特定のモデルのサポートをご依頼ください。
- 追加の `sysobjectid` 値をサポートするようプロファイルを拡張します。
    たとえば、別のタイプの Cisco CSR を監視する場合、ISR プロファイルを直接修正して、以下のように別の `sysobjectid` をリストアップします。

    ```
        snmpwalk -v 2c -c [community string] [ip address] 1.3.6.1.2.1.1.2
    ```

**注**: デバイスの `sysobjectid` が不明な場合は、インターネットで調べるか、デバイスに到達できるホストで `snmpwalk` を実行します。この結果を使用して、プロファイルをリストアップします。 


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/help