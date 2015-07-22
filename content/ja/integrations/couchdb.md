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
{:#int-overview}

Capture CouchDB data in Datadog to:

-  Visualize key CouchDB metrics.
-  Correlate CouchDB performance with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的の為に、CouchDBのメトリクスをDatadogに送信します:

* CouchDBのメトリクスの可視化
* CouchDBのパフォーマンス情報と他アプリケーションの情報を連携


<!-- From the open-source Agent:

* [CouchDB YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/couchdb.yaml.example)
* [CouchDB checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/couchdb.py)

The following metrics are collected by default with the CouchDB integration:

    couchdb.database_writes
    couchdb.database_reads
    couchdb.httpd.requests
    couchdb.httpd_request_methods
    couchdb.httpd_status_codes
    couchdb.httpd.temporary_view_reads
    couchdb.httpd.view_reads
    couchdb.open_databases
    couchdb.open_os_files
    couchdb.request_time -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [CouchDB インテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/couchdb.yaml.example)
* [CouchDB インテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/couchdb.py)


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
