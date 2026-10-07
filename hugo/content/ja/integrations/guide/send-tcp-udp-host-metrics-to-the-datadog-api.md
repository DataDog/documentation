---
aliases:
- /ja/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
title: TCP/UDP ホストメトリクスを Datadog API に送信する
---

TCP/UDP 接続に関するインサイトを得るには、Crontab エントリーを介して統計情報を収集し、それらを Datadog プラットフォームに転送できます。

これを行うには、/proc/net/sockstat にある Linux の sockstats を使用してください。

以下は、開始に役立つコードスニペットの例です。

https://gist.github.com/sage-oli-wood/70e0931f037ea0aac132

これは HTTP POST を通じて Datadog にデータを送信します。

より適切な方法は、DogStatsD を使用してメトリクスとイベントを送信することです。cron ジョブを調整して、データを UDP でローカルの Agent に転送するようにできます。詳細はここで確認してください。

これにより、次の情報を取得できます。

* TCP:

||||
|:---|:---|:---|
|in use|  確立された接続の総数 |  integer (number)|
|Orphan|  孤立した TCP 接続 |
(ユーザーファイルハンドルにアタッチされていない) | integer (number)|
|TW | TIME_WAIT 接続 | integer (millisec)|
|Alloc| 割り当てられた TCP ソケット | (すべてのタイプ、例: ESTABLISH、CLOSE_WAIT、TIME_WAIT など)|
|mem| TCP ソケットの総メモリ | integer (KiloBytes)|

* UDP:

||||
|:---|:---|:---|
|inuse|   確立された接続の総数  | 整数|
|mem |UDP ソケットの総メモリ | integer (KB)|