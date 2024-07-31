---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: ネットワークデバイスモニタリングのプロファイルの使用
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: ブログ
  text: Datadog で NetFlow トラフィックデータを監視する
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: ブログ
  text: SNMP トラップによるネットワークパフォーマンスの問題の監視と診断
is_beta: true
title: NetFlow Monitoring
---

## 概要

Datadog で NetFlow Monitoring を使用すると、NetFlow 対応デバイスからのフローレコードを視覚化して監視することができます。

## インストール

ネットワークデバイスモニタリングで NetFlow Monitoring を使用するには、[Agent][1] のバージョン 7.45 以降を使用していることを確認してください。

**注:** NetFlow データの送信には、[ネットワークデバイスモニタリングからのメトリクス収集][2]の構成は必須ではありませんが、この追加データを使用してデバイス名、モデル、ベンダー、インバウンド/アウトバウンドインターフェイス名などの情報でフローレコードをリッチ化できるため、強く推奨されています。

## 構成

NetFlow、sFlow、または IPFIX トラフィックを Agent NetFlow サーバーに送信するようにデバイスを構成するには、Datadog Agent がインストールされている IP アドレス、具体的には `flow_type` と `port` にトラフィックを送信するようデバイスを構成する必要があります。

NetFlow を有効にするために、Agent コンフィグレーションファイル [`datadog.yaml`][3] を編集します。

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # 選択肢: netflow5、netflow9、ipfix、sflow5
        port: 2055            # デバイスはこのポートにトラフィックを送信する必要があります
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

変更内容を保存したら、[Agent を再起動][4]します。

## 集計

Datadog Agent は、情報の大半を維持しつつ、プラットフォームに送信されるレコード数を制限するために、受信した NetFlow データを自動的に集計します。デフォルトでは、集計の間隔は 5 分間で、その間に共通の識別情報 (ソースと宛先アドレスおよびポート、プロトコルなど) をもつフローレコードが集計されます。また、Datadog Agent は、エフェメラルポートを検出して削除することができます。その結果、`port:*` のフローを見ることができます。

## リッチ化

NetFlow データは Datadog のバックエンドにより処理され、デバイスおよびインターフェイスから利用できるメタデータでリッチ化されます。リッチ化は、NetFlow エクスポーターの IP とインターフェイスインデックスに基づいて行われます。再利用されたプライベート IP が競合する可能性に対し、曖昧性を解消するため、Agent コンフィギュレーションファイルごとに異なる `namespace` を構成することができます (`network_devices.namespace` の設定を使用します)。

NetFlow エクスポーターの IP がデバイスの IP の 1 つではあるが、SNMP インテグレーションで構成されたものではない場合、Datadog はエクスポーターの IP が属するデバイスの特定を試み、一意で一致する場合に限り、その情報で NetFlow データをリッチ化します。

## 視覚化

NetFlow のページは[ネットワークデバイスのページ][5]で確認できます。
{{< img src="network_device_monitoring/netflow/netflow_page.png" alt="NetFlowのページ" >}}

このデータはダッシュボードやノートブックなどでも利用でき、より正確なクエリを確認したり、別のデータソースとの相関を見たりすることができます。
{{< img src="network_device_monitoring/netflow/notebook.png" alt="ノートブック" >}}

## 保持

NetFlow データは、デフォルトで 30 日間保持されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/network_monitoring/devices/snmp_metrics/
[3]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/infrastructure/devices?facets=&viewTab=netflow