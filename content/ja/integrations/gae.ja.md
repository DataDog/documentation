---
last_modified: 2015/07/16
translation_status: original
language: ja
title: Datadog-Google App Engine Integration
integration_title: Google App Engine
kind: integration
doclevel: basic
---

<!-- Install the Google App Engine integration in your Python project to:

* See your Google App Engine services metrics: memcache, task queues, datastores
* See metrics about requests: display percentiles, latency, cost
* Tag Google App Engine metrics by version and compare the performance of different versions

You can also send custom metrics to Datadog. -->

### 概要
{:#int-overview}

次の目的で、Google App EngineインテグレーションをPythonプロジェクトに使用します:

* Google App Engine servicesのメトリクス(memcache, task queues, datastores)をDatadog側でも表示するため。
* リクエストに関するメトリクスを表示するため。(例:display percentiles, latency, cost)
* Google App Engine metricsをバージョンごとにタグ付けし、異なるバージョン間のパフォーマンスの差を比較するため。

又、カスタムメトリクスをDatadogに送信することもできます。
