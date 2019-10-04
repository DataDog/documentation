---
title: データの種類とタグ
kind: documentation
description: データタイプ、タグ付けなど、DogStatsD の機能の概要
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: DogStatsD 入門
  - link: developers/libraries
    tag: Documentation
    text: 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: DogStatsD ソースコード
---
StatsD がメトリクスのみを受け付けるのに対して、DogStatsD は、Datadog の主要な 3 種類のデータタイプ、すなわちメトリクス、イベント、サービスチェックをすべて受け付けます。ここでは、各データタイプの一般的な使用例を示し、DogStatsD だけが持つタグ付け機能を紹介します。

それぞれの例では、[公式の Datadog Python クライアント][1]を使用して Python で記述されていますが、示されているデータタイプはどれも[他の DogStatsD クライアントライブラリ][2]によって同様にサポートされています。

## メトリクス

カウンター、ゲージ、セットは、StatsD ユーザーにもお馴染みのメトリクスです。ヒストグラムは、DogStatsD 固有のメトリクスです。StatsD にあるタイマーは、DogStatsD ではヒストグラムに含まれます。

### カウンター

カウンターは、何か (たとえば、ページビュー) が **1 秒間に**何回発生したかを追跡します。以下の例では、`render_page` 関数が呼び出されるたびに、`web.page_views` というメトリクスがインクリメントされます。

Python の場合
```python

def render_page():
    """ Web ページをレンダリングします。"""
    statsd.increment('web.page_views')
    return 'Hello World!'
```

Ruby の場合
```ruby
def render_page()
  # Web ページをレンダリングします。
  statsd.increment('web.page_views')
  return 'Hello World!'
end
```

この 1 行のコードで、このデータを Datadog でグラフ化できるようになります。以下に例を示します。

{{< img src="developers/metrics/graph-guides-metrics-page-views.png" alt="graph guides metrics page views" responsive="true" >}}

StatsD のカウンターはフラッシュ間隔で正規化され、1 秒あたりの単位数を報告します。上のグラフで、マーカーは、15 時 24 分ごろに 1 秒あたり 35.33 Web ページビューを報告しています。これに対して、毎秒 1 人がこの Web ページにアクセスした場合、グラフは y = 1 の平らな線になります。値のインクリメントと経時測定については、[ゲージ](#gauges)を参照してください。

任意の数をカウントすることもできます。たとえば、ファイルアップロードサービスによって処理されたバイト数をカウントしたいとします。`upload_file` 関数が呼び出されるたびに、`file_service.bytes_uploaded` というメトリクスをファイルのサイズ分インクリメントするには、次のようにします。

Python の場合
```python

def upload_file(file):
    statsd.increment('file_service.bytes_uploaded', file.size())
    save_file(file)
    return 'File uploaded!'
```

常に増加してリセットされることがないカウンター (たとえば、MySQL の経時的クエリ数) を別のソースから受け取る場合、Datadog は、フラッシュされた値間のレートを追跡します。Datadog で未加工のカウントを取得するには、cumulative sum、integral などの関数を系列に適用します。[Datadog の関数については、こちらを参照してください][3]。

[カウンタータイプについては、メトリクスに関するドキュメント][4]を参照してください。

### ディストリビューション

**この機能はベータ版です。ご使用のアカウントで有効にする方法については、[Datadog のサポートチームまでお問い合わせ][5]ください。**

ディストリビューションは、ヒストグラム (以下を参照) のグローバルバージョンと言えます。複数のホストにまたがって統計的分布を計算することで、データセット全体に対するグローバルなパーセンタイルを算出できます。グローバルディストリビューションは、サービスなどの論理オブジェクトを基底のホストとは無関係に計測することを目的としています。

HTTP リクエストの処理時間を測定するには、メトリクス `dist.dd.dogweb.latency` を使用して、それぞれのリクエスト時間を測定します。

Python の場合
```python
# リクエストの実行時間を追跡します。
start_time = time.time()
results = requests.get('https://google.com')
duration = time.time() - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

Ruby の場合
```ruby
start_time = Time.now
results = Net::HTTP.get('https://google.com')
duration = Time.now - start_time
statsd.distribution('dist.dd.website.latency', duration)
```

上のインスツルメンテーションは、`合計`、`カウント`、`平均`、`最小`、`最大`、`50 パーセンタイル` (中央値)、`75 パーセンタイル`、`90 パーセンタイル`、`95 パーセンタイル`、`99 パーセンタイル`の各データを計算します。これらのメトリクスにより、各リクエスト時間の違いを把握できます。リクエストが平均的にどのくらいの時間を要するかを確認するには、中央値をグラフ化します。大半のリクエストに要する時間を確認するには、95 パーセンタイルをグラフ化します。

{{< img src="graphing/metrics/distributions/dogweb_latency.png" alt="Dogweb latency" responsive="true" >}}

この簡単な例では、500ms を許容可能なリクエスト時間とします。クエリ時間の中央値 (青のグラフ) は、おおむね 100 ミリ秒未満で、適切な値です。95 パーセンタイル (赤のグラフ) は、ときどき 1 秒を超えて急上昇しており、これは容認できない値です。
つまり、大部分のクエリはまったく問題なく実行されているものの、値の最も悪いケースには問題があります。95 パーセンタイルが中央値に近い場合は、ほとんどすべてのリクエストがまったく問題なく動作していると考えることができます。

ディストリビューションの対象は時間の測定に限りません。たとえば、アップロードされたファイルのサイズ、教室でのテストの得点など、あらゆる種類の値の分布の測定に使用できます。

### ゲージ

ゲージは、特定の物事の値を経時的に測定します。たとえば、マシンのメモリの空き容量を追跡するには、その値をメトリクス `system.mem.free` として定期的にサンプリングします。

Python の場合
```python

# メモリの空き容量を 10 秒ごとに記録します。
while True:
    statsd.gauge('system.mem.free', get_free_memory())
    time.sleep(10)
```

Ruby の場合
```ruby
# メモリの空き容量を 10 秒ごとに記録します。
while true do
    statsd.gauge('system.mem.free', get_free_memory())
    sleep(10)
end
```

[ゲージタイプについては、メトリクスに関するドキュメント][6]を参照してください。

### ヒストグラム

ヒストグラムは、DogStatsD 固有のメトリクスです。たとえば、サイトにアップロードされたファイルのサイズなど、あらゆる種類の値の統計的分布を計算します。

```python

from datadog import statsd

def handle_file(file, file_size):
  # ファイルの処理 ...

  statsd.histogram('mywebsite.user_uploads.file_size', file_size)
  return
```

ヒストグラムは、たとえば、次に示すメトリクスクエリの処理時間のようなタイミングデータにも使用できます。

Python の場合
```python

# データベースクエリの実行時間を追跡します。
start_time = time.time()
results = db.query()
duration = time.time() - start_time
statsd.histogram('database.query.time', duration)

# `timed` デコレータは、タイミング関数の省略形です。
@statsd.timed('database.query.time')
def get_data():
    return db.query()
```

Ruby の場合
```ruby
start_time = Time.now
results = db.query()
duration = Time.now - start_time
statsd.histogram('database.query.time', duration)

# `time` ヘルパーは、コードのタイミングブロックの省略形です。
statsd.time('database.query.time') do
  return db.query()
end
```

上のインスツルメンテーションは、以下のメトリクスを生成します。

| メトリクス                             | 説明                             |
|------------------------------------|-----------------------------------------|
| `database.query.time.count`        | このメトリクスがサンプリングされた回数 |
| `database.query.time.avg`          | サンプリングされた値の平均時間      |
| `database.query.time.median`       | サンプリングされた値の中央値                    |
| `database.query.time.max`          | サンプリングされた値の最大値                   |
| `database.query.time.95percentile` | サンプリングされた値の 95 パーセンタイル           |

{{< img src="developers/metrics/graph-guides-metrics-query-times.png" alt="graph guides metrics query times" responsive="true" >}}

この簡単な例では、1 秒を許容可能なクエリ時間とします。クエリ時間の中央値 (紫のグラフ) は、おおむね 100 ミリ秒未満で、適切な値です。しかし、残念ながら、95 パーセンタイル (青のグラフ) はときどき、3 秒近くまで大きく急上昇しており、これは容認できない値です。つまり、大部分のクエリはまったく問題なく実行されているものの、値の最も悪いケースには問題があります。95 パーセンタイルが中央値に近い場合は、ほとんどすべてのクエリがまったく問題なく動作していると考えることができます。

[ヒストグラムタイプについては、メトリクスに関するドキュメント][7]を参照してください。

### タイマー

DogStatsD のタイマーは、ヒストグラムとして実装されています (標準の StatsD に含まれるタイマーと混同しないようにしてください)。タイマーは、コードセクションの実行にかかる時間、ページを完全にレンダリングするまでにかかる時間などのタイミングデータだけを測定します。Python では、デコレータを使用してタイマーを作成します。

```python

from datadog import statsd

@statsd.timed('mywebsite.page_render.time')
def render_page():
  # ページのレンダリング ...
```

または、コンテキストマネージャーを使用します。

```python

from datadog import statsd

def render_page():
  # まず、時間を測定しない部分を記述します。
  boilerplate_setup()

  # ここからタイマーを開始します。
  with statsd.timed('mywebsite.page_render.time'):
    # ページのレンダリング ...
```

どちらを使用する場合でも、DogStatsD はタイマーデータを受け取ると、レンダリング時間の統計的分布を計算し、次のメトリクスを Datadog に送信します。

- `mywebsite.page_render.time.count` - レンダリング時間がサンプリングされた回数
- `mywebsite.page_render.time.avg` - レンダリング時間の平均値
- `mywebsite.page_render.time.median` - レンダリング時間の中央値
- `mywebsite.page_render.time.max` - レンダリング時間の最大値
- `mywebsite.page_render.time.95percentile` - レンダリング時間の 95 パーセンタイル

注意: 内部的には、DogStatsD はタイマーをヒストグラムとして扱います。タイマーとヒストグラムのどちらを使用しても、Datadog には同じデータが送信されます。

### セット

セットは、グループ内のユニーク要素数のカウントに使用されます。次の例では、サイトのユニーク訪問者数をカウントします。

Python の場合
```python

def login(self, user_id):
    # ユーザーのログイン ...
    statsd.set('users.uniques', user_id)
```

Ruby の場合
```ruby
def login(self, user_id)
    # ユーザーのログイン ...
    statsd.set('users.uniques', user_id)
end
```

[セットタイプについては、メトリクスに関するドキュメント][8]を参照してください。

## メトリクスオプション: サンプリングレート

高パフォーマンスを必要とするコードパスにとっては、UDP パケットを送信する際のオーバーヘッドが大きすぎる可能性があるため、DogStatsD クライアントはサンプリングをサポートしています。すなわち、一定割合の時間にのみメトリクスを送信することができます。次のコードは、約半分の時間にのみヒストグラムメトリクスを送信します。

```python

dog.histogram('my.histogram', 1, sample_rate=0.5)
```

DogStatsD は Datadog にメトリクスを送信する前に、`sample_rate` を使用して、
サンプリングを行わなかった場合の値を推定し、メトリクス値を補正します。

**サンプリングレートは、カウンター、ヒストグラム、およびタイマーメトリクスでのみ機能します。**

[レートについては、メトリクスに関するドキュメント][8]を参照してください。

## イベント

DogStatsD は、[Datadog のイベントストリーム][9]にイベントを送信できます。たとえば、Datadog でエラーと例外を確認したい場合は、次のようにします。

```python

from datadog import statsd

def render_page():
  try:
    # ページのレンダリング ...
    # ..
  except RenderError as err:
    statsd.event('Page render error!', err.message, alert_type='error')
```

## サービスのチェック

DogStatsD は、Datadog にサービスチェックを送信できます。チェックを使用して、アプリケーションが依存するサービスのステータスを追跡できます。

Python の場合
```python

from datadog.api.constants import CheckStatus

# アプリケーションのステータスを報告します。
name = 'web.app1'
status = CheckStatus.OK
message = 'Response: 200 OK'

statsd.service_check(check_name=name, status=status, message=message)
```

Ruby の場合
```ruby
# アプリケーションのステータスを報告します。
name = 'web.app1'
status = Datadog::Statsd::OK
opts = {
  'message' => 'Response: 200 OK'
}

statsd.service_check(name, status, opts)
```

サービスチェックが報告されたら、それを使用して[カスタムチェックモニター][10]をトリガーできます。

## タグ付け

DogStatsD に送信するメトリクス、イベント、サービスチェックにタグを追加できます。たとえば、アルゴリズムのバージョンでタイマーメトリクスをタグ付けすると、2 つのアルゴリズムのパフォーマンスを比較できます。

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # 何らかの処理 ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # 何らかの処理 (速度を比較) ...
```

タグ付けは StatsD に対する [Datadog 固有の拡張機能です][2]。

### ホストタグキー

ホストタグは、メトリクスを集計する際に Datadog Agent によって自動的に割り当てられます。Agent ホスト名と一致しないホストタグ付きで送信されたメトリクスは、本来のホストを参照できなくなります。送信されたホストタグは、Agent によって収集されたホスト名や Agent で構成されたホスト名を上書きします。

### ディストリビューション

ディストリビューションはグローバルな性格を持つため、追加のタグ付けツールが提供されています。詳細は、[ディストリビューションメトリクス][11]のページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://datadogpy.readthedocs.io/en/latest
[2]: /ja/libraries
[3]: /ja/graphing/miscellaneous/functions
[4]: /ja/developers/metrics/counts
[5]: /ja/help
[6]: /ja/developers/metrics/gauges
[7]: /ja/developers/metrics/histograms
[8]: /ja/developers/metrics/sets
[9]: /ja/graphing/event_stream
[10]: /ja/monitors/monitor_types/custom_check
[11]: /ja/graphing/metrics/distributions