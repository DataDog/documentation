---
last_modified: 2017/02/14
translation_status: complete
language: ja
title: メトリックのタイプ
kind: documentation
---

<!-- A metric's Datadog in-app type affects how its data is interpreted in query results and graph visualizations across the app. The metric type visible on the metric summary page is the Datadog in-app type. You should only change the type if you have started submitting this metric with a new type, and should be aware that changing the type may render historical data nonsensical. -->

メトリックの "Datadog in-app type" は、クエリの結果のデータの解釈やグラフ内での可視化に影響を与えます。メトリックの "summary" ページに表示されているメトリックタイプは、この "Datadog in-app type" になります。尚、万が一メトリック タイプの変更をする場合は、そのメトリックの収集開始直後に実施することをお勧めします。理由は、メトリック タイプの変更は、変更以前に収集したデータを無意味にしてしまう可能性があるからです。


<!-- ## How do submission types relate to Datadog in-app types?
Datadog accepts metrics submitted from a variety of sources, and as a result the submission type does not always map exactly to the Datadog in-app type:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|-------------------|-----------------|--------------|
| [API](http://docs.datadoghq.com/api/#metrics) | `api.Metric.send(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.gauge(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.increment(...)` | counter | rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.histogram(...)` | histogram | gauge, rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.set(...)` | set | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.gauge(...)` | gauge | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.increment(...)` | counter | rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.rate(...)` | rate | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.count(...)` | count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.monotonic_count(...)` | monotonic_count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.histogram(...)` | histogram | gauge, rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.set(...)` | set | gauge |
{:.table}
-->

## "submission type" と "Datadog in-app type" の関係は？

Datadogでは、さまざま情報源から提出されたメトリクスを受け入れます。その結果、"submission type" は 常に同じ"Datadog in-app type" にマッピングされるとは限りません。詳しくは以下を参照してください:

| Submission Source | Submission Method (python) | Submission Type | Datadog In-App Type |
|-------------------|-------------------|-----------------|--------------|
| [API](http://docs.datadoghq.com/api/#metrics) | `api.Metric.send(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.gauge(...)` | gauge | gauge |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.increment(...)` | counter | rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.histogram(...)` | histogram | gauge, rate |
| [dogstatsd](http://docs.datadoghq.com/guides/dogstatsd/) | `dog.set(...)` | set | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.gauge(...)` | gauge | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.increment(...)` | counter | rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.rate(...)` | rate | gauge |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.count(...)` | count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.monotonic_count(...)` | monotonic_count | count |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.histogram(...)` | histogram | gauge, rate |
| [agent check](http://docs.datadoghq.com/guides/agent_checks/#sending-metrics) | `self.set(...)` | set | gauge |
{:.table}


<!-- ## What's a use case for changing a metric's type?

1. A user has a metric `app.requests.served` that counts requests served, she accidently submits it via dogstatsd as a `gauge`. The metric's Datadog type is therefore `gauge`.

2. She realizes she should have submitted it as a dogstatsd `counter` metric, that way she can do time aggregation to answer questions like "How many total requests were served in the past day?" by querying `sum:app.requests.served{*}` (this would not make sense for a `gauge`-type  metric.)

3. She likes the name `app.requests.served` so rather than submitting a new metric name with the more appropriate `counter` type, she'll change the type of `app.requests.served`.

    a. She updates her submission code, calling `dogstatsd.increment('app.requests.served', N)` after N requests are served.

    b. She updates the Datadog in-app type via the metric summary page to `rate`.
 -->

## タイプ変更のユースケースと注意点？

1. `app.requests.served` のようなメトリック名でリクエスト処理の数をカウントした後、dogstatsd経由で誤って `gauge` タイプでそのメトリックを送信してしまっていた場合、"Datadog in-app type" は `gauge` タイプになります。

2. その後、「過去1日のリクエスト処理の総数は？」という疑問に答えるために `sum:app.requests.served{*}` というクエリーを設定しようとした際に、dogstatsd経由で `counter` タイプを指定してメトリックを送信するべきであったことに気づきます。(このクエリは、`gauge` タイプのままでは正しき機能しません)

3. このメトリックには`app.requests.served`という名前が最適と考えていたのでこの名前は残し、`counter` タイプに変更して送信することにします。

    a. メトリックを送信するためのコードを変更し、N個のリクエストが処理される毎に `dogstatsd.increment（ 'app.requests.served'、N）`が呼び出されるようにします。
    b. メトリックサマリ-のページで、"Datadog in-app type" を、`rate` に更新します。


<!-- This will cause data submitted before the type change for `app.requests.served` to behave incorrectly because it
was stored in a format to be interpreted as an in-app `gauge` not a `rate`. Data submitted after steps 3a and 3b
will be interpreted properly. If she was not willing to lose the historical data submitted as a `gauge` she would
have created a new metric name with the new type, leaving the type of `app.requests.served` unchanged.
-->

この変更により、タイプ変更前に蓄積された`app.requests.served`の値の挙動がおかしくなります。なぜならば、タイプ変更前は、"Datadog in-app type" で判定された `gauge` タイプで保存されており、`rate` タイプではなかったからです。(タイプ変更後のメトリック値については適切なタイプで保存されています。)

このようにメトリックのタイプを間違えており、それに気がつく前に送信したデータを後の利用のために温存したい場合は、変更後のメトリックに新しいメトリック名を指定し、`app.requests.served`のタイプをそのままにしておくのが得策です。
