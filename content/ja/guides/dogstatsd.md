---
last_modified: 2015/04/02
translation_status: complete
language: ja
title: DogStatsDの解説
kind: documentation
sidebar:
  nav:
    - header: ガイド
    - text: どのように動作するの
      href: "#how-it-works"
    - text: セットアップ
      href: "#set-up"
    - text: メトリクス
      href: "#metrics"
    - text: サンプルレート
      href: "#sample-rates"
    - text: タグ
      href: "#tags"
    - text: 設定
      href: "#configuration"
    - text: データグラム
      href: "#datagram-format"
    - text: ソースコード
      href: "#source"
---

<!-- <p class="aside">
  This tutorial will walk you through instrumenting your application to send
  custom metrics to Datadog. If you need some help as you go, pop by
  <a href="irc://irc.freenode.net/datadog">#datadog on freenode</a>,
  where we'll be happy to answer any questions you might have. (There's a
  <a href="http://webchat.freenode.net/?randomnick=1&channels=datadog&prompt=1">
  web chat client, too</a>.)
</p>

The easiest way to get your custom metrics into Datadog is to send them to DogStatsD,
a metrics aggregation server bundled with the Datadog Agent (in versions 3.0
and above).
DogStatsD implements the
<a href="https://github.com/etsy/statsd">StatsD</a>
protocol, along with a few extensions for special Datadog features. -->

<p class="aside">
  このチュートリアルでは、開発しているアプリケーションからDatadogへカスタムメトリクスを送信する方法を順を追って説明していきます。チュートリアルを読み進めていく上でサポートが必要な場合は、<a href="../../help/">お問い合わせ</a>ページで消化している方法でご連絡ください。
</p>

Datadogにカスタムメトリクスを取り込ませる最も簡単な方法はDogStatsDを使うことです。DogStatsDは、Datadog Agent 3.0以上に同胞されているメトリクス集約サーバです。DogStatsDは、<a href="https://github.com/etsy/statsd">StatsD</a>プロトコルをサポートすると共に、datadog専用の機能にも対応するよう拡張されています。


<!-- ## How It Works

DogStatsD accepts custom application metrics points over
<a href="http://en.wikipedia.org/wiki/User_Datagram_Protocol">UDP</a>,
and then periodically aggregates and forwards the metrics to Datadog, where
they can be graphed on dashboards. Here's a pretty standard DogStatsd setup:
<p>
<img src="/static/images/dogstatsd.png">
</p> -->

<h2 id="how-it-works"></h2>

## どのように動作するの

DogStatsDは、アプリケーションのカスタムメトリクスを<a href="http://en.wikipedia.org/wiki/User_Datagram_Protocol">UDP</a>を使って受信し、集計した後、グラフ化表示のために定期的にDatadog側に送信します。

次に図は、DogStatsDを使ったカスタムメトリクスのグラフ化までの構成図です:

<p>
<img src="/static/images/dogstatsd.png"/>
</p>


<!-- ### Aggregation

DogStatsD's primary function is to aggregate many data points into a single
metric for a given interval of time (ten seconds by default). Let's walk through an
example to understand how this works.

Suppose you want to know how many times you are running a database query,
your application can tell DogStatsD to increment a counter each
time this query is executed. For example:

<%= python <<eof
def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
eof
%>

If this function is executed one hundred times in a flush interval (ten
seconds by default), it will send DogStatsD one hundred UDP packets that say
"increment the 'database.query.count' counter". DogStatsD will aggregate these
points into a single metric value - 100 in this case - and send it to the
server where it can be graphed.

This means expect DogStatsD to produce one point per metric per flush interval
while data is being submitted for that metric. -->

### 集計

DogSt​​atsDの主な機能は、所定の時間間隔（デフォルトでは10秒）に発生するデータポイントの情報を、単一のメトリクスに集計/集約することです。それでは、これがどのように機能するかを理解するための例を見てみましょう。

例えば、データベースクエリを実行している回数を知りたいと仮定します。アプリケーションは、クエリが実行される度に、DogStatsDに対しカウンタを進めることを支持します。

次のようになります:

<%= python <<eof
def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
eof
%>

この関数が、次のメトリクス送信タイミング(デフォルトでは10秒間隔)までに100回実行されたとします。この関数は、100個の、"'database.query.count'を、カウント"というUDPパケットを送信します。
DogStatDは、これらのUDPパケットが送られたデータポイントを集計し、メトリクス値に置き換えます。
今回のケースでは、100ということになります。その上で、Datadogo側に送信し、ダッシュボードでグラフ表示に備えます。

このようにすることにより、計測対象のデータが不規則に発生している状態でも、メトリクス送信タイミングの間隔ごとに一つのメトリクスと値のセットを生成することを保証しています。


<!-- ### Why UDP?

Like StatsD, DogStatsD receives points over UDP. UDP is good fit for application
instrumentation because it is a fire and
forget protocol. This means your application won't stop its actual work to wait for a
response from the metrics server, which is very important if the metrics
server is down or inaccessible. -->

### なぜUDPなのですか。

StatsDと同様にDogSt​​atsDは、UDPを使って計測ポイント情報を受け取ります。UDPは、パケットの到達を管理指定管理していないのでアプリケーションの計測には最適です。パケットの到達管理ないということは、アプリケーションがメトリクスサーバからの応答を待って、実行中の作業を停止し待機状態なる必要がないということです。パッケットの応答を待つ状態がないということは、メトリクスサーバが停止している時やそれにアクセスできない事態が発生した際に実行中のアプリケーションに影響を与えないという観点では、非常に有効です。


<!-- ## Set Up

Once you have the Datadog Agent up and running, grab a DogStatsD client for your
language and you'll be ready to start hacking. Any StatsD client will work
just fine, but using a Datadog StatsD client will give you a few extra features
(namely tags and histograms, but more on that later). -->

<h2 id="set-up"></h2>

## セットアップ

既にDatadog Agentが起動し動作しているなら、開発に使用しているプログラミング言語に対応したDogSt​​atsDクライアントをインストールすれば、準備完了です。もちろん、一般的なStatsDクライアントでも問題なく動作します。しかし、DogStatsDクラアンを利用すれば、いくつかの追加機能(例: tags、histogramsなど)が使えるようになります。


<!-- ### DogStatsD Clients

You can see the list of StatsD clients on our [libraries page](/libraries/).　-->

### DogStatsDクライアントについて

プログラミング言語ごとのDogStatsDクライアントに関しては、[ライブラリー](/ja/libraries/)ページを参照してください。


<!-- ## Metrics

We'll walk through the types of metrics supported by DogStatsD in Python, but
the principles are easily translated into other languages.
DogStatsD supports the following types of metrics: -->

<h2 id="metrics"></h2>

## メトリクス

Pythonを使ってDogStatsDがサポートしているメトリクスのタイプを解説してきます。ここで解説する内容は、他のプログラミング言語でも同様に適用することができます。

DogStatsDは、次のメトリクスタイプに対応しています:


<!-- ### Gauges

Gauges measure the value of a particular thing at a
particular time, like the amount of fuel in a car's gas tank or
the number of users connected to a system.

<%= python <<eof
dog.gauge('gas_tank.level', 0.75)
dog.gauge('users.active', 1001)
eof
%> -->

### Gauges (ゲージ)

車両のガソリンタンク内の燃料量やシステムに接続しているユーザーの数などゲージは、ある時間の対象物の値を測定します。

<%= python <<eof
dog.gauge('gas_tank.level', 0.75)
dog.gauge('users.active', 1001)
eof
%>


<!-- ### Counters

Counters track how many times something happened per second, like the number of
database requests or page views.

<%= python <<eof
dog.increment('database.query.count')
dog.increment('page_view.count', 10)
eof
%> -->

### Counters (カウンタ)

データベースへのリクエストやページビューのようにカウンタは、毎秒の発生回数を追跡します。

<%= python <<eof
dog.increment('database.query.count')
dog.increment('page_view.count', 10)
eof
%>


<!-- ### Histograms

Histograms track the statistical distribution of a set of values, like the
duration of a number of database queries or the size of files uploaded by users. Each
histogram will track the average, the minimum, the maximum, the median
and the 95th percentile.

<%= python <<eof
dog.histogram('database.query.time', 0.5)
dog.histogram('file.upload.size', file.get_size())
eof
%>

Histograms are an extension to StatsD, so you'll need to use a client that
supports them. -->

### Histograms (ヒストグラム)

データベースへのクエリ実行時間やユーザーによってアップロードされたファイルのサイズなどの集計数のように、ヒストグラムは、値の集合の度数分布を追跡します。各ヒストグラムは、平均値、最小値、最大値、中央値及び95パーセンタイルを追跡します。


<%= python <<eof
dog.histogram('database.query.time', 0.5)
dog.histogram('file.upload.size', file.get_size())
eof
%>

ヒストグラムは、StatsDの拡張です。この機能が必要な場合は、DogStatsDクライアントを使用する必要があります。


<!-- ### Sets

Sets are used to count the number of unique elements in a group. If you want to
track the number of unique visitor to your site, sets are a great way to do
that.

<%= python <<eof
dog.set('users.uniques', user.id)
eof
%>

Sets are an extension to StatsD, so you'll need to use a client that
supports them. -->

### Sets (セット)

セットは、グループ内のユニークな要素の数をカウントするために使用します。サイトへのユニークビジター数を追跡したい場合は、セットが最も適しています。

<%= python <<eof
dog.set('users.uniques', user.id)
eof
%>

セットは、StatsDの拡張です。この機能が必要な場合は、DogStatsDクライアントを使用する必要があります。


<!-- ### Timers

StatsD only supports histograms for timing, not generic values (like the size
of uploaded files or the number of rows returned from a query). Timers are
essentially a special case of histograms, so they are treated in the same manner
by DogStatsD for backwards compatibility. -->

### Timers (タイマー)

StatsDの度数分布は、一般的な値(アップロードされたファイルのサイズやクエリから返される行数など)には対応しておらず、時間計測のみにしか使うことができません。時間計測は、度数分布の特殊のケースであり、後方互換のためにDogStatsDでも同じように扱うようになっています。


<!-- ## Sample Rates

The overhead of sending UDP packets can be too great for some performance
intensive code paths. To work around this, StatsD clients support sampling,
that is to say, only sending metrics a percentage of the time. For example:

<%= python <<eof
dog.histogram('my.histogram', 1, sample_rate=0.5)
eof
%>

will only be sent to the server about half of the time, but it will be
multipled by the sample rate to provide an estimate of the real data. -->

<h2 id="sample-rates"></h2>

## サンプルレート

高いパフォーマンスを求められるプリグラムコードの部分では、UDPパケットを送信する部分は大きな負荷になることがあります。この問題を回避するために、DogStatsDクライアントは、サンプルレートの変更をサポートしています。これは、メトリクスの一定割合を指定し、送信回数を削減するとことです。

例えば:

<%= python <<eof
dog.histogram('my.histogram', 1, sample_rate=0.5)
eof
%>

この例では、実際の半分のデータポイントのデータをDogStatsDサーバに送信するよいうになります。しかし、メトリクスの生成には、受信値をサンプルレートの逆数倍し、実際の値の推定するようになっています。


<!-- ## Tags

Tags are a Datadog specific extension to StatsD. They allow you to tag a metric
with a dimension that's meaningful to you and slice and dice along that
dimension in your graphs. For example, if you wanted to measure the
performance of two video rendering algorithms, you could tag the rendering time
metric with the version of the algorithm you used.


Since tags are an extension to StatsD, so you'll need to use a client that
supports them.


<%= python <<eof

# Randomly choose which rendering function we want to use ...
if random() < 0.5:
    renderer = old_slow_renderer
    version = 'old'
else:
    renderer = new_shiny_renderer
    version = 'new'

start_time = time()
renderer()
duration = time() - start_time
dog.histogram('rendering.duration', tags=[version])
eof
%> -->

<h2 id="tags"></h2>

## タグ

タグは、Datadogでのみで使うことができるStatsDへの拡張です。タグは、メトリクスの分類に多面性を持たせ、多種多彩な切り口でのグラフ表示を可能にします。例えば、異なる2つのビデオレンダリングアルゴリズムの性能を測定したい場合は、アルゴリズムのバージョンをメトリクスにタグ付けして識別することができます。

タグは、StatsDの拡張です。この機能が必要な場合は、DogStatsDクライアントを使用する必要があります。

<%= python <<eof

# Randomly choose which rendering function we want to use ...
if random() < 0.5:
    renderer = old_slow_renderer
    version = 'old'
else:
    renderer = new_shiny_renderer
    version = 'new'

start_time = time()
renderer()
duration = time() - start_time
dog.histogram('rendering.duration', tags=[version])
eof
%>


<!-- ## Events
You can post events to your Datadog event stream. You can tag them, set priority and even aggregate them with other events.

Mandatory fields:

  - `title` (String) — Event title.
  - `text` (String) — Event text. Supports line breaks.

Events are aggregated on the Event Stream based on: <br/>
'hostname/event_type/source_type/aggregation_key'<br/>
If `event_type` is empty, the event will be grouped with other events that don't have an `event_type`.

<%= python <<eof

# Post a simple message
statsd.event('There might be a storm tomorrow', 'A friend warned me earlier.')

# Cry for help
statsd.event('SO MUCH SNOW', 'The city is paralyzed!', alert_type='error', tags=['urgent', 'endoftheworld'])
eof
%> -->

## イベント

イベントストリームに、イベントを投稿することができます。更に、それらのイベントにタグ付けし、優先順位を設定し、又たのイベントと集約することできます。

**必須フィールド**：

  - `title` (String) — イベントのタイトル。
  - `text` (String) — イベントテキスト。改行をサポートしています。

イベントは、イベントストリーム上で次の分類によって集約されます：

‘hostname/event_type/source_type/aggregation_key’

`event_type`に情報がない場合、そのイベントは、他の`event_type`が空のイベントとグループ化されます。

<%= python <<eof

# Post a simple message
statsd.event('There might be a storm tomorrow', 'A friend warned me earlier.')

# Cry for help
statsd.event('SO MUCH SNOW', 'The city is paralyzed!', alert_type='error', tags=['urgent', 'endoftheworld'])
eof
%>


<!-- #### Fields
- Mandatory:
  - Event title.
  - Event text. Supports line breaks.
- Optional:
  - `date_happened` (Time, None) — default: None — Assign a timestamp to the event. Default is now when none.
  - `hostname` (String, None) — default: None — Assign a hostname to the event.
  - `aggregation_key` (String, None) — default: None — Assign an aggregation key to the event, to group it with some others.
  - `priority` (String, None) — default: 'normal' — Can be 'normal' or 'low'.
  - `source_type_name` (String, None) — default: None — Assign a source type to the event.
  - `alert_type` (String, None) — default: 'info' — Can be 'error', 'warning', 'info' or 'success'.
  - `tags` - (Array[str], None) — default: None — An array of tags -->

#### 設定項目
- 必須項目:
  - `title` (String) — イベントのタイトル。
  - `text` (String) — イベントテキスト。改行をサポートしています。
- オプション項目:
  - `date_happened` (Time, None) — default: None — イベントにタイムスタンプを付けます。
  - `hostname` (String, None) — default: None — イベントにホスト名を付けます。
  - `aggregation_key` (String, None) — default: None — 他のイベントとグループ分けするために集約用のキーを付けます。
  - `priority` (String, None) — default: 'normal' — 'normal' または 'low'を指定します。
  - `source_type_name` (String, None) — default: None — イベントにソースタイプを付けます。
  - `alert_type` (String, None) — default: 'info' — 'error', 'warning', 'info', 'success'のどれかを指定します。
  - `tags` - (Array\[str\], None) — default: None — タグのリストを付けます。


<!-- ## Configuration

DogStatsD supports the following options, all of which can be tweaked in the
Agent <a href="https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example">
configuration file</a>:

    # The port DogStatsD runs on. If you change this, make your the apps sending to
    # it change as well.
    dogstatsd_port: 8125

    # The number of seconds to wait between flushes to the server.
    dogstatsd_interval: 10 -->

<h2 id="configuration"></h2>

## 設定

DogStatsDでは、UDPパケットの受信ポートとメトリクスの送信間隔を[Datadog Agentの設定ファイル](https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example)内で設定することができます。

    # The port DogStatsD runs on. If you change this, make your the apps sending to
    # it change as well.
    dogstatsd_port: 8125

    # The number of seconds to wait between flushes to the server.
    dogstatsd_interval: 10


<!-- ## Datagram Format

### Metrics

If you want to send metrics to DogStatsD in your own way, here is the format of
the packets:

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

Here's  breakdown of the fields:

- `metric.name` should be a String with no colons, bars or @ characters.
- `value` should be a number
- type should be `c` for Counter, `g` for Gauge, `h` for Histogram, `ms` for
  Timer or `s` for Set.
- sample rate is optional and should be a float between 0 and 1 inclusive.
- tags are optional, and should be a comma seperated list of tags. colons are
  used for key value tags.

Here are some example datagrams and comments explaining them:

    # Increment the page.views counter.
    page.views:1|c

    # Record the fuel tank is half-empty
    fuel.level:0.5|g

    # Sample a the song length histogram half of the time.
    song.length:240|h|@0.5

    # Track a unique visitor to the site.
    users.uniques:1234|s

    # Increment the users online counter tagged by country of origin.
    users.online:1|c|#country:china

    # An example putting it all together.
    users.online:1|c|@0.5|#country:china
 -->

<h2 id="datagram-format"></h2>

## データグラム

### メトリクス

独自の方法でDogSt​​atsDにメトリクスを送信したい場合は、以下がパケットのフォーマットになります:

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

以下は各フィールドの概要:

- `metric.name` ":", "-", "@" 以外の文字列。
- `value` 数字。
- 集約タイプの指定は、`c`はCounter, `g`はGauge, `h`はHistogram, `ms`はTimer, `s`はSet.
- サンプルレートは、オプション指定項目です。 指定する場合は、0~1 の浮動小数点数になります。
- タグは、オプション指定項目です。タグとタグの間位には","が入ります。キーバリューがセットのタグについては、":"を開いただに挟みます。


次は、データグラムのサンプルとその内容の解説です:

    # ページビューのカウンタのインクリメント指示を送信
    page.views:1|c

    # 自動車の燃料タンクの状況が半分になっている計測結果を送信
    fuel.level:0.5|g

    # 発生回数の半分の機会に、歌の時間を計測結果を送信
    song.length:240|h|@0.5

    # サイトへのユニークビジター数の追跡のために、ユーザーIDを送信
    users.uniques:1234|s

    # 国に基づくオンラインユーザーの数をカウントするためのインクリメント指示を送信
    users.online:1|c|#country:china

    # 上記のすべてのコンセプトを取り込んだデータグラムの例
    users.online:1|c|@0.5|#country:china


<!-- ### Events

If you want to send events to DogStatsD in your own way, here is the format of
the packets:

`_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2` -->

### イベント

独自の方法でDogSt​​atsDにイベントを送信したい場合は、以下がパケットのフォーマットになります:

`_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2`


<!-- #### Fields
- Mandatory:
  - `title` — Event title.
  - `text` — Event text. Supports line breaks.
- Optional: `|[key]:[value]`
  - `|d:date_happened` — default: None — Assign a timestamp to the event. Default is the current Unix epoch timestamp when not supplied.
  - `|h:hostname` — default: None — Assign a hostname to the event.
  - `|k:aggregation_key` — default: None — Assign an aggregation key to the event, to group it with some others.
  - `|p:priority` — default: 'normal' — Can be “normal” or “low”.
  - `|s:source_type_name` — default: None — Assign a source type to the event.
  - `|t:alert_type` — default: 'info' — Can be “error”, “warning”, “info” or “success”.
  - `|#tag1:value1,tag2,tag3:value3` — default: None. <strong><em><br/>
  Note: The `:` in tags is part of the tag list string and has no parsing purpose like for the other parameters.</em></strong> -->

#### 設定項目
- 必須項目:
  - `title` — イベントのタイトルを指定できます。
  - `text` — イベントテキストを指定できます。改行をサポートしています。
- オプション項目: `|[key]:[value]`
  - `|d:date_happened` — default: None — イベントにタイムスタンプを指定できます。オプションへの設定がない場合は、現在のUNIX時間が付けられます。
  - `|h:hostname` — default: None — イベントにホスト名を指定できます。
  - `|k:aggregation_key` — default: None — 他のイベントとグループ分けするために集約用のキーを指定できます。
  - `|p:priority` — default: 'normal' — ‘normal’ または ‘low’を指定できます。
  - `|s:source_type_name` — default: None — イベントにソースタイプを指定します。
  - `|t:alert_type` — default: 'info' — ‘error’, ‘warning’, ‘info’, ‘success’が指定できます。
  - `|#tag1:value1,tag2,tag3:value3` — default: None.
  <strong><em><br/>注: それぞれのタグ文字列に含まれる`:`は、タグの一部です。</em></strong>


<!-- ## Source

DogStatsD is open-sourced under the BSD License. Check out the source
[here](https://github.com/DataDog/dd-agent). -->

<h2 id="source"></h2>

## ソースコード

DogStatsDは、BSDライセンスでオープンソースとして公開しています。ソースコードは、githubのDatadogアカウント以下の[dd-agent](https://github.com/DataDog/dd-agent)のリポジトリを参照してください。
