---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-MySQL Integration
integration_title: MySQL
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview} -->

### 概要
{:#int-overview}


<!-- Connect MySQL to Datadog in order to:

- Visualize your database performance
- Correlate the performance of MySQL with the rest of your applications -->

次の目的の為に、MySQLのメトリクスをDatadogに送信します:

- データベースのパフォーマンスを可視化する
- MySQLのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する

<!-- From the open-source Agent:

* [Example](https://github.com/DataDog/dd-agent/blob/master/conf.d/mysql.yaml.example)
* [MySQL checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mysql.py)

The following metrics are collected by default with the MySQL integration:

    mysql.innodb.buffer_pool_size
    mysql.innodb.data_reads
    mysql.innodb.data_writes
    mysql.innodb.os_log_fsyncs
    mysql.net.connections
    mysql.net.max_connections
    mysql.performance.created_tmp_disk_tables
    mysql.performance.open_files
    mysql.performance.queries
    mysql.performance.questions
    mysql.performance.slow_queries
    mysql.performance.table_locks_waited
    mysql.performance.threads_connected -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [MySQLインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/mysql.yaml.example)
* [MySQLインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/mysql.py)

MySQLインテグレーションがデフォルトで取得しているメトリクス:

    mysql.innodb.buffer_pool_size
    mysql.innodb.data_reads
    mysql.innodb.data_writes
    mysql.innodb.os_log_fsyncs
    mysql.net.connections
    mysql.net.max_connections
    mysql.performance.created_tmp_disk_tables
    mysql.performance.open_files
    mysql.performance.queries
    mysql.performance.questions
    mysql.performance.slow_queries
    mysql.performance.table_locks_waited
    mysql.performance.threads_connected
