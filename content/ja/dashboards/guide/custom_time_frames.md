---
kind: ガイド
title: カスタムタイムフレーム
---

## 概要

<div class="alert alert-info">クエリは UTC 時間で実行されますが、クエリの時間枠は<strong>ブラウザのタイムゾーン</strong>に従って選択されます。ダッシュボードの構成アクションから、デフォルトのタイムゾーンと UTC の表示を切り替えることができます。詳細については、<a href="/dashboards/configure/#configuration-actions">ダッシュボード構成のドキュメント</a>を参照してください。</div>

Datadog のビューの多くでは、特定のタイムフレームに合わせたスコープを定めることができます。共通のタイムフレームのリストや、日付の選択に便利なカレンダーピッカーなど、時間の制御に有用な機能が多数揃っています。

月、日、年、時間、分でインクリメントを行うには、タイムフレームの対象部分を選択して `[↑]` および `[↓]` キーで操作します。

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="矢印キーで時間をインクリメント" video="true" width="500" >}}

## サポート対象の構文

### 固定日付

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="固定カスタムタイムフレームを入力" video="true" width="500" >}}

| 形式                       | 例                                         |
|------------------------------|--------------------------------------------------|
| `{MMM/MMMM} D`               | Jan 1<br>January 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | Jan 1, 1:00 pm<br>January 1, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | Jan 1, 2019, 1:00 pm<br>January 1, 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| UNIX 秒タイムスタンプ       | 1577883600                                       |
| UNIX ミリ秒タイムスタンプ  | 1577883600000                                    |

任意の固定日付を範囲の一部として入力できます。例:
  * `1577883600 - 1578009540`
  * `Jan 1 - Jan 2`
  * `6:00 am - 1:00 pm`

### 相対日付

相対日付は時間の経過とともに**更新されるのではなく**、入力時に計算されます。

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="相対カスタムタイムフレームを入力" video="true" width="500" >}}

| 形式                                             | 説明                                                         |
|----------------------------------------------------|---------------------------------------------------------------------|
| `N{unit}`<br> 受付可能な単位のリストは以下をご覧ください | 過去 N 単位の日付を表示します。例: **3 mo** (過去 3 か月)|
| `today`                                            | 今現在の暦日を表示します                     |
| `yesterday`                                        | 1 日前の暦日を表示します                             |
| `this month`                                       | 今現在の暦月を表示します                   |
| `last month`                                       | 1 か月前の暦月を表示します                           |
| `this year`                                        | 今現在の暦年を表示します                    |
| `last year`                                        | 1 年前の暦年を表示します                            |

以下の文字列は相対日付の `{unit}` として利用できます。
  * 分: `m`、`min`、`mins`、`minute`、`minutes`
  * 時間: `h`、`hr`、`hrs`、`hour`、`hours`
  * 日: `d`、`day`、`days`
  * 週: `w`、`week`、`weeks`
  * 月: `mo`、`mos`、`mon`、`mons`、`month`、`months`

### カレンダーに沿った日付

カレンダーに沿った日付は、現在の日を反映して更新されます。

| 形式         | 説明                                      |
|----------------|--------------------------------------------------|
| `week to date` | 月曜日午前 12 時から現在までの週を表示します |
| `month to date`| 月の 1 日から現在までを表示します      |

## URL

ダッシュボードの URL で時間クエリを操作できます。

次のようなダッシュボード URL を考えてみましょう。

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

* `from_ts` パラメーターはクエリ開始時刻の Unix ミリ秒単位のタイムスタンプです。例えば、`1683518770980` です。
* `to_ts` パラメーターはクエリ終了時刻の Unix ミリ秒単位のタイムスタンプです。例えば、`1683605233205` です。
* `live=true` は、クエリが保存または共有されたときに相対時間指定が保持されることを示します。`live=false` を使用することもできます。