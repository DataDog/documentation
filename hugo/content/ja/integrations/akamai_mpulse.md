---
app_id: akamai_mpulse
categories:
- cloud
custom_kind: integration
description: Akamai mPulse を Datadog とインテグレーションします。
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: ブログ
  text: Akamai mPulse のリアル ユーザー モニタリングを Datadog とインテグレーションする
title: Akamai mPulse
---
## 概要

Datadog を Akamai mPulse と接続すると、リアル ユーザー モニタリング (RUM) メトリクスを収集でき、Web サイトのパフォーマンスをエンド ユーザーがどのように体感しているかを可視化できます。CDN やバック エンド インフラのパフォーマンス データとあわせて RUM メトリクスを分析・相関させることで、Web スタック全体を横断した包括的な可視化が可能になります。

Datadog のすぐに使えるダッシュボードとモニターを活用すると、次のことができます:

- 直帰率、ユーザー セッション数、ページ読み込み時間などの主要メトリクスを把握する
- ユーザーに見えている遅延の原因が、フロント エンドなのかバック エンドなのかを切り分ける
- ページ読み込み時間やページ グループを監視する

[Akamai DataStream 2](https://docs.datadoghq.com/integrations/akamai_datastream_2/)、[NGINX](https://docs.datadoghq.com/integrations/nginx/)、[MYSQL](https://docs.datadoghq.com/integrations/mysql/) をはじめとする 600 以上のテクノロジーからのリアル タイム データとメトリクスを関連付け、フロント エンドからバック エンドまでを通した Web スタック全体を可視化する

## セットアップ

### インストール

Datadog の [Akamai mPulse インテグレーションタイル](https://app.datadoghq.com/integrations/akamai-mpulse) からインテグレーションをインストールします。

### 設定

Akamai mPulse インテグレーションの設定には、`apiKey` と `apiToken` が必要です。

#### API キーを生成する

`apiKey` は、mPulse ポータル内でサイトのデータ (ビーコン) を一意に識別するための自動生成値です。

<div class="alert alert-warning">
"Apps" メニュー オプションと `apiKey` 属性は、App Administrators にのみ表示されます。 
</div>

1. `apiKey` は、"Central" ページから確認できます。
1. 左側のパネルで **Apps** をクリックします。
1. 監視したいアプリ名を選択すると設定ページが開き、その中に `apiKey` が表示されます。

#### API トークンを生成する

API トークンについては [Akamai の API トークンに関するドキュメント](https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US) を参照し、そのうえで次の操作を行います:

1. `mpulse.soasta.com` にログインします。
1. 左端のパネルにある My Settings を開きます。
1. API トークンのエリアで "Generate" をクリックします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **akamai.mpulse.bouncerate** <br>(gauge) | サイトを訪れたあと、すぐに離脱した訪問者の割合<br>_単位は percent_ |
| **akamai.mpulse.clientroundtriptime.p50** <br>(gauge) | ブラウザーと Akamai のエッジ サーバー (エンド ユーザーに最も近いサーバー) の間の往復時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.clientroundtriptime.p95** <br>(gauge) | ブラウザーと Akamai のエッジ サーバー (エンド ユーザーに最も近いサーバー) の間の往復時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.dns.p50** <br>(gauge) | DNS 名前解決時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.dns.p95** <br>(gauge) | DNS 名前解決時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.domload.p50** <br>(gauge) | domLoading - navigationStart の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.domload.p95** <br>(gauge) | domLoading - navigationStart の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.domready.p50** <br>(gauge) | domComplete - navigationStart の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.domready.p95** <br>(gauge) | domComplete - navigationStart の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstbyte.p50** <br>(gauge) | ナビゲーション開始から first byte を受け取るまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstbyte.p95** <br>(gauge) | ナビゲーション開始から first byte を受け取るまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstcontentfulpaint.p50** <br>(gauge) | ブラウザーが最初にコンテンツを表示するまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstcontentfulpaint.p95** <br>(gauge) | ブラウザーが最初にコンテンツを表示するまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstinputdelay.p50** <br>(gauge) | ユーザーの最初の操作にページがどれだけ素早く反応できたかを示す時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstinputdelay.p95** <br>(gauge) | ユーザーの最初の操作にページがどれだけ素早く反応できたかを示す時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstlastbyte.p50** <br>(gauge) | first byte から onload (またはページが利用可能と見なされる時点) までの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstlastbyte.p95** <br>(gauge) | first byte から onload (またはページが利用可能と見なされる時点) までの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstpaint.p50** <br>(gauge) | ナビゲーション後にブラウザーが最初に描画するまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.firstpaint.p95** <br>(gauge) | ナビゲーション後にブラウザーが最初に描画するまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.longtaskstime.p50** <br>(gauge) | 50 ms を超えるブラウザー タスクである LongTasks の合計実行時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.longtaskstime.p95** <br>(gauge) | 50 ms を超えるブラウザー タスクである LongTasks の合計実行時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.pageload.p50** <br>(gauge) | ページ読み込み時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.pageload.p95** <br>(gauge) | ページ読み込み時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.pageviews** <br>(count) | ページ ビュー数<br>_単位は view_ |
| **akamai.mpulse.sessions** <br>(count) | ユーザー セッション数<br>_単位は session_ |
| **akamai.mpulse.ssl.p50** <br>(gauge) | SSL ハンドシェイク時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.ssl.p95** <br>(gauge) | SSL ハンドシェイク時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.tcp.p50** <br>(gauge) | TCP 接続時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.tcp.p95** <br>(gauge) | TCP 接続時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetofirstinteraction.p50** <br>(gauge) | ユーザーが最初にページを操作しようとするまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetofirstinteraction.p95** <br>(gauge) | ユーザーが最初にページを操作しようとするまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetointeractive.p50** <br>(gauge) | ユーザーがページを操作できるようになるまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetointeractive.p95** <br>(gauge) | ユーザーがページを操作できるようになるまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetovisuallyready.p50** <br>(gauge) | ページ ビューが利用可能な状態になるまでの時間の 50 パーセンタイル値<br>_単位は millisecond_ |
| **akamai.mpulse.timetovisuallyready.p95** <br>(gauge) | ページ ビューが利用可能な状態になるまでの時間の 95 パーセンタイル値<br>_単位は millisecond_ |

### イベント

Akamai mPulse インテグレーションにはイベントは含まれません。

### サービス チェック

Akamai mPulse インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}