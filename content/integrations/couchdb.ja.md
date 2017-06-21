---
last_modified: 2015/07/05
translation_status: original
language: ja
title: Datadog-CouchDB Integration
integration_title: CouchDB
kind: integration
doclevel:
---

<!-- ### Overview


Capture CouchDB data in Datadog to:

-  Visualize key CouchDB metrics.
-  Correlate CouchDB performance with the rest of your applications. -->

### 概要


次の目的の為に、CouchDBのメトリクスをDatadogに送信します:

* CouchDBのメトリクスの可視化
* CouchDBのパフォーマンス情報と他アプリケーションの情報を連携

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [CouchDB インテグレーションの設定ファイルサンプル](https://github.com/DataDog/integrations-core/blob/master/couchdb/conf.yaml.example)
* [CouchDB インテグレーション checks.d](https://github.com/DataDog/integrations-core/blob/master/couchdb/check.py)


CouchDBインテグレーションがデフォルトで取得しているメトリクス:

    couchdb.database_writes
    couchdb.database_reads
    couchdb.httpd.requests
    couchdb.httpd_request_methods
    couchdb.httpd_status_codes
    couchdb.httpd.temporary_view_reads
    couchdb.httpd.view_reads
    couchdb.open_databases
    couchdb.open_os_files
    couchdb.request_time
