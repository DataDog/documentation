---
further_reading:
- link: /network_monitoring/devices/profiles
  tag: ドキュメント
  text: ネットワークデバイスモニタリングのプロファイルの使用
is_beta: true
kind: documentation
title: NetFlow Monitoring
---

<div class="alert alert-warning">Datadog ネットワークデバイスモニタリングの NetFlow Monitoring は、公開ベータ版です。</div>

## 概要

Datadog で NetFlow Monitoring を使用すると、Netflow 対応デバイスからのフローレコードを視覚化して監視することができます。

## APM に Datadog Agent を構成する

ネットワークデバイスモニタリングで NetFlow Monitoring を使用するには、[Agent][1] のバージョン 7.39 以降を使用していることを確認してください。

**注:** NetFlow データの送信には、[ネットワークデバイスモニタリングからのメトリクス収集][2]の構成は必須ではありませんが、強く推奨されています。

## コンフィギュレーション

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


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/network_monitoring/devices/snmp_metrics/
[3]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent