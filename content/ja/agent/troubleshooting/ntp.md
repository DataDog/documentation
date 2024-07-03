---
aliases:
- /ja/agent/faq/network-time-protocol-ntp-offset-issues
title: Network Time Protocol (NTP) issues
---

以下の問題は、Agent を介してメトリクスを報告するホストの NTP オフセットに関連している可能性があります。

* 不正なアラートのトリガー
* メトリクスの遅延
* メトリクスのグラフの途切れ

ホストの NTP オフセットをチェックするには、使用中の OS に適した手順に従い Agent [ステータスコマンド][1]を実行し、クロックセクションを探します。

```
  Clocks
  ======
    NTP offset: -0.0036 s
    System UTC time: 2015-02-12 22:10:49.524660
```

大幅なオフセットにより、好ましくない影響を受けることがあります。NTP 関連の問題を防ぐには、NTP オフセット用の Datadog のモニターを活用し、ホストでドリフトが見られる際に警告を発するようにします（[NTP インテグレーション][2]のおかげです）。
または、Datadog の[チェック内容のサマリーページ][3]を使い、チェック `ntp.in_sync` を調べ、NTP 関連の問題のあるホスト一覧を確認します。

**注**: ローカルサーバーの時刻が Datadog NTP サーバーに照らし許容範囲であることを Agent が確認できるように、ポート `123` を経由する外行き UDP トラフィックは許可されなければなりません。

## その他の参考資料

{{< whatsnext desc="システムクロックと NTP を同期させる手順は使用中の OS により異なります。">}}
    {{< nextlink href="https://support.microsoft.com/en-us/help/816042/how-to-configure-an-authoritative-time-server-in-windows-server" tag="Windows" >}}Microsoft Windows と NTP サーバーを同期する方法{{< /nextlink >}}
    {{< nextlink href="http://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp" tag="Linux" >}}NTPを使用してクロックを強制的に更新する方法{{< /nextlink >}}
    {{< nextlink href="http://www.freebsd.org/doc/en/books/handbook/network-ntp.html" tag="FreeBSD">}}NTP との時刻同期{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[2]: /ja/integrations/ntp/
[3]: https://app.datadoghq.com/check/summary