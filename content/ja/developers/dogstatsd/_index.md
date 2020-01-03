---
title: DogStatsD
kind: documentation
description: DogStatsD の概要とセットアップ手順
aliases:
  - /ja/guides/dogstatsd/
  - /ja/guides/DogStatsD/
  - /ja/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: メトリクスの詳細
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
DogStatsD は、Datadog Agent に付属するメトリクス集計サービスです。カスタムアプリケーションメトリクスを最も簡単に Datadog に取り込むには、メトリクスを DogStatsD に送信します。DogStatsD は [StatsD][1] プロトコルを実装すると共に、Datadog 固有の以下の拡張機能を提供します。

* ヒストグラムメトリクスタイプ
* サービスチェックとイベント
* タグ付け

StatsD 準拠の任意のクライアントが機能しますが、その場合、[Datadog 固有の拡張機能](#dive-into-dogstatsd)は使用できません。

**注**: DogStatsD は、StatsD の次の機能は実装していません。

* ゲージ差分 ([こちらの記事][2]を参照)
* ネイティブメトリクスタイプとしてのタイマー (ただし、[ヒストグラムとしてサポート][3])

## DogStatsD の動作

DogStatsD は、UDP で[カスタムメトリクス][4]、イベント、サービスチェックを受け付け、それらを定期的に集計して Datadog に転送します。
UDP を使用するため、アプリケーションはメトリクスを DogStatsD に送信した後、応答を待たずに自身の作業を再開できます。DogStatsD を利用できなくなった場合でも、アプリケーションは停止しません。

{{< img src="developers/dogstatsd/dogstatsd.png" alt="dogstatsd"   >}}

DogStatsD は、データを受け取ると共に、フラッシュ間隔と呼ばれる時間間隔でメトリクスごとに複数のデータポイントを 1 つのデータポイントに集計します。次の例では、特定のデータベースクエリが呼び出されるたびに DogStatsD がカウンターをインクリメントするように設定されています。

```python

def query_my_database():
    dog.increment('database.query.count')
    # クエリを実行します ...
```

この関数があるフラッシュ間隔 (デフォルトでは 10 秒) の間に 100 回実行された場合は、「`database.query.count` カウンターをインクリメントせよ」と指示する UDP パケットが 100 個 DogStatsD に送信されます。DogStatsD は、これらのポイントを 1 つのメトリクス値 (この例では 100) に集計し、それを Datadog に送信します。送信された値は保存され、他のメトリクスと共にグラフ作成に使用されます。

## セットアップ

### Agent

まず、`datadog.yaml` ファイルを編集して、次の行のコメントを解除します。
```
use_dogstatsd: true

...

dogstatsd_port: 8125
```

次に、[Agent を再起動][5]します。

デフォルトでは、DogStatsD は UDP ポート **8125** をリスニングします。これを変更する必要がある場合は、[Agent のメイン構成ファイル][6]で `dogstatsd_port` オプションを構成し、クライアントを再起動します。[Unix ドメインソケット][7]を使用するように DogStatsD を構成することもできます。

### コード

多くの言語および環境向けに [DogStatsD クライアントライブラリ][8]が用意されています。汎用の StatsD クライアントを使用して DogStatsD にメトリクスを送信することも**できます**が、前述の Datadog 固有の機能はいずれも使用できません。

Python の場合
```shell
$ pip install datadog
```

Ruby の場合
```shell
$ gem install dogstatsd-ruby
```

インポートすると使用できます。

Python の場合
```python
from datadog import statsd
```

Ruby の場合
```ruby
# ライブラリをインポートします
require 'datadog/statsd'

# statsd クライアントインスタンスを作成します
statsd = Datadog::Statsd.new
```

## DogStatsD の理解

DogStatsD と StatsD の機能はほぼ同じですが、DogStatsD は実装方法が一部異なり、また Datadog 独自の高度な機能が含まれています。使用できるデータの種類、イベント、サービスチェック、タグなど、DogStatsD に含まれる Datadog 固有の拡張機能の詳細については、[データの種類とタグ][9]を参照してください。

DogStatsD が使用するデータグラム形式についてさらに理解を深めたい場合、または独自の Datadog ライブラリを開発したい場合は、[データグラムとシェルの使用][10]を参照してください。ここでは、メトリクスとイベントをコマンドラインから直接送信する方法についても説明しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: https://github.com/DataDog/dd-agent/pull/2104
[3]: /ja/developers/dogstatsd/data_types/#timers
[4]: /ja/developers/metrics/custom_metrics
[5]: /ja/agent/guide/agent-commands
[6]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[7]: /ja/developers/dogstatsd/unix_socket
[8]: /ja/libraries
[9]: /ja/developers/dogstatsd/data_types
[10]: /ja/developers/dogstatsd/datagram_shell