---
title: Metrics Units
aliases:
- /developers/metrics/metrics_units
- /developers/metrics/units/
further_reading:
- link: /dashboards/
  tag: Documentation
  text: Visualize your data to gain insight
- link: /dashboards/guide/unit-override/
  tag: Documentation
  text: Customize your visualizations with unit override
---

## 概要

メトリクス単位は、時系列グラフ、クエリ値ウィジェット、トップリストなどの場所に表示されます。

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Redis ダッシュボードのメトリクス単位" style="width:100%;">}}

時系列グラフでは、任意のグラフにカーソルを合わせると、関連する単位が表示されます。単位は手動で指定する必要がありますが、単位が設定されていない場合は、桁表記 (たとえば、それぞれ千単位、百万単位、十億単位を表す K、M、G) が使用されます。単位が設定されている場合、生データは、関連する桁数を使用して、読み取り可能な表示単位に自動的に変換されます。

たとえば、3,000,000,000 のデータポイントがある場合:

* このデータポイントの単位を指定していない場合は、「3G」と表示されます。
* このデータポイントの単位をバイトに指定した場合、「3GB」と表示されます。

単位は、タイムボードグラフの下部にも表示されます。歯車アイコンのドロップダウンから **Metrics Info** を選択することで、メトリクスの説明を表示できます。

{{< img src="metrics/units/annotated_ops.png" alt="アノテーション付き Ops" style="width:100%;">}}

メトリクス単位を変更するには、[Metric Summary][1] ページに移動し、**Metadata** セクションで **Edit** をクリックし、ドロップダウンメニューから `bit` や `byte` などの単位を選択します。

## 単位リスト

次の単位は、Datadog に送信されたメトリクスに関連付けられている可能性があります。

| type        | 単位                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| バイト       | bit / byte (b) / kibibyte(KiB) / mebibyte (MiB) / gibibyte (GB) / tebibyte (TiB) / pebibyte (PiB) / exbibyte (EiB)                                                                                                                                                                                                         |
| 時間        | nanosecond (ns) / microsecond (μs) / millisecond (ms) / second (s) / minute (min) / hour (hr) / day / week (wk)                                                                                                                                                                                                            |
| 割合  | percent_nano (n%) / percent (%) / apdex / fraction                                                                                                                                                                                                                                                                         |
| ネットワーク     | connection (conn) / request (req) / packet (pkt) / segment (seg) / response (rsp) / message (msg) / payload / timeout / datagram / route / session / hop                                                                                                                                                                   |
| システム      | process (proc) / thread / host / node / fault / service (svc) / instance / cpu                                                                                                                                                                                                                                             |
| ディスク        | file / inode / sector / block (blk)                                                                                                                                                                                                                                                                                        |
| 一般     | buffer / error (err) / read (rd) / write (wr) / occurrence / event / time / unit / operation (op) / item / task / worker / resource (res) / garbage collection (gc) / email / sample (smpl) / stage / monitor / location / check / attempt / device (dev) / update (up) / method (mthd) / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| DB          | table / index (idx) / lock / transaction (tx) / query / row / key / command (cmd) / offset / record / object / cursor / assertion (assert) / scan / document / shard / flush / merge / refresh / fetch / column (col) / commit / wait / ticket / question                                                                  |
| キャッシュ       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| 金額       | dollar ($) / cent (¢) / microdollar (μ$) / euro (€) / pound (£) / pence (p) / yen (¥)                                                                                                                                                                                                                                      |
| メモリ      | page (pg) / split                                                                                                                                                                                                                                                                                                          |
| 周波数   | hertz (Hz) / kilohertz (kHz) / megahertz (MHz) / gigahertz (GHz)                                                                                                                                                                                                                                                           |
| ログ     | entry                                                                                                                                                                                                                                                                                                                      |
| 温度 | decidegree celsius (d°C) / degree celsius (°C) / degree fahrenheit (°F)                                                                                                                                                                                                                                                    |
| CPU         | nanocore (ncores) / microcore (μcores) / millicore (mcores) / core / kilocore (Kcores) / megacore (Mcores) / gigacore (Gcores) / teracore (Tcores) / petacore (Pcores) / exacore (Ecores)                                                                                                                                  |
| 電力       | nanowatt (nW) / microwatt (μW) / milliwatt (mW) / deciwatt (dW) / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                        |
| 電流     | milliampere (mA) / ampere (A)                                                                                                                                                                                                                                                                                              |
| 電位   | millivolt (mV) / volt (V)                                                                                                                                                                                                                                                                                                  |
| APM         | スパン                                                                                                                                                                                                                                                                                                                       |
| SYNTHETICS  | 実行 / ステップ                                                                                                                                                                                                                                                                                                                 |

## 数値のフォーマット

### 単位のないフォーマット

単位のないメトリクスの場合、Datadog は [SI プレフィックス][2] `K`、`M`、`G`、`T` を使用します。`T` の後、数値は指数表記に変換されます。これは微小な数値にも使用されます。デフォルトでは、Datadog は小数点以下 2 桁に丸められます。指数表記の場合、デフォルトは小数点以下ゼロです。

#### 例

| 元の値              | フォーマット済み |
|------------------------|-----------|
| 1                      | 1         |
| 2.7182818284           | 2.72      |
| 1337                   | 1.34K     |
| 31536000               | 31.54M    |
| 4294967296             | 4.29G     |
| 18446744073709552000   | 2e19      |
| 0.001                  | 1e-3      |
| 2.3283064365386963e-10 | 2e-10     |
| 無効                | N/A       |

### 単位処理

単位は、読みやすくするためにグラフ上で自動的にフォーマットされます。

#### 例

| 単位       | ファミリー    | 元の値            | フォーマット済み    |
|------------|-----------|----------------------|--------------|
| バイト       | バイト     | 1                    | 1 B          |
| キビバイト   | バイト     | 1234235              | 1.18 GiB     |
| キビバイト   | バイト     | 45457878236741230000 | 40374.71 EiB |
| ヘルツ      | 周波数 | 6345223              | 6.35 MHz     |
| セント       | お金     | 1337                 | 13.37 $      |
| ナノ秒 | 時間      | 0                    | 0s           |
| 秒     | 時間      | 0.03212              | 32.12ms      |

### 時間のフォーマット

1 分から 1 年までの時間単位は、人間が読みやすいように複数の単位に分割されています。次の規則が適用されます。

- 短い時間は 10 進形式でフォーマットされます。
- 最小の時間単位はナノ秒です。
- 長い時間は、10 進形式の日数としてフォーマットされます。


#### 例

| 元の秒 | フォーマット済み               |
|-------------|-------------------------|
| 0.00123     | 1.23ms                  |
| 0.00012345  | 123.45μs (マイクロ秒) |
| 1.2345e-9   | 1.23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1d                      |
| 96400       | 1d 3h                   |
| 52596400    | 608.75 days             |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
