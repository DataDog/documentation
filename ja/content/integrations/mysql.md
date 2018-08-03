---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-MySQL Integration
integration_title: MySQL
kind: integration
git_integration_title: mysql
doclevel: basic
---

## 概要

次の目的の為に、MySQLのメトリクスをDatadogに送信します:

- データベースのパフォーマンスを可視化する
- MySQLのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [MySQLインテグレーションの設定ファイルサンプル](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example)
* [MySQLインテグレーション checks.d](https://github.com/DataDog/integrations-core/blob/master/mysql/check.py)

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
