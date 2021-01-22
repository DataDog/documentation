---
title: メトリクスのユニット
kind: documentation
aliases:
  - /ja/developers/metrics/metrics_units
further_reading:
  - link: /dashboards/
    tag: ドキュメント
    text: データを可視化して詳細な情報を把握
---
曖昧さをなくしてシステムを合理的に把握するため、Datadog に送信されるメトリクスに次の単位を併記できます。

| type        | 単位                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| バイト       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| 時間        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |
| 割合  | percent_nano / percent / apdex / fraction                                                                                                                                                                                                                                                                                  |
| ネットワーク     | connection / request / packet / segment / response / message / payload / timeout / datagram / route / session                                                                                                                                                                                                              |
| システム      | process / thread / host / node / fault / service / instance / cpu                                                                                                                                                                                                                                                          |
| ディスク        | file / inode / sector / block                                                                                                                                                                                                                                                                                              |
| 一般     | buffer / error / read / write / occurrence / event / time / unit / operation / item / task / worker / resource / garbage collection / email / sample / stage / monitor / location / check / attempt / device / update / method / job / container / execution / throttle / invocation / user / success / build / prediction |
| データベース          | table / index / lock / transaction / query / row / key / command / offset / record / object / cursor / assertion / scan / document / shard / flush / merge / refresh / fetch / column / commit / wait / ticket / question                                                                                                  |
| キャッシュ       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| 金額       | ドル / セント / マイクロドル / ユーロ                                                                                                                                                                                                                                                                                               |
| メモリ      | page / split                                                                                                                                                                                                                                                                                                               |
| 周波数   | hertz / kilohertz / megahertz / gigahertz                                                                                                                                                                                                                                                                                  |
| ログ     | entry                                                                                                                                                                                                                                                                                                                      |
| 温度 | decidegree celsius / degree celsius / degree fahrenheit                                                                                                                                                                                                                                                                                         |
| CPU         | nanocore / microcore / millicore / core / kilocore / megacore / gigacore / teracore / petacore / exacore                                                                                                                                                                                                                   |
| 電力         | nanowatt / microwatt / milliwatt / deciwatt / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                                   |
| 電流         | milliampere / ampere                                                                                                                                                                                    |
| 電位         | millivolt / volt                                                                                                                                                                                      |
| APM         | スパン                                                                                                                                                                                                                                                                                                                       |

下記の Redis ダッシュボードの画面例のように、時系列グラフ、クエリ値ウィジェット、トップリストでは単位が自動的に表示されます。

{{< img src="developers/metrics/units/redis_dash_metrics_units.png" alt="Redis ダッシュボードのメトリクス単位"  style="width:70%;">}}

<mrk mid="160" mtype="seg">時系列グラフ上でカーソルを動かすと、関連する単位が表示されます。</mrk><mrk mid="161" mtype="seg">元データは、わかりやすい表示単位に自動的に変換されます (1 秒未満は ms、毎秒 100 万バイトは MiB/s など)。</mrk>

{{< img src="developers/metrics/units/postgres_commits.png" alt="Postgres コミット"  style="width:70%;">}}

単位は、タイムボードグラフの下部にも表示されます。歯車アイコンのドロップダウンから **Metrics Info** を選択することで、メトリクスの説明を表示できます。

{{< img src="developers/metrics/units/annotated_ops.png" alt="アノテーション付き Ops"  style="width:70%;">}}

メトリクス単位を変更するには、[Metric Summary][1] ページに移動し、**Metadata** セクションで **Edit** をクリックし、ドロップダウンメニューから `bit` や `byte` などの単位を選択します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary