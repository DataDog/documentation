---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-SQL Server Integration
integration_title: SQL Server
doclevel: basic
kind: integration
---

<!-- ### Overview
{:#int-overview}

Connect SQL Server to Datadog in order to:

- Visualize your database performance.
- Correlate the performance of SQL Server with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的の為に、SQLサーバーとDatadogを連携します:

* SQLサーバーのパフォーマンスの可視化をする
* SQLサーバーのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する

<!-- From the open-source Agent:

* [SQL Server YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/sqlserver.yaml.example)
* [SQL Server checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/sqlserver.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [SQL Serverインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/sqlserver.yaml.example)
* [SQL Serverインテグレーション checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/sqlserver.py)


<!-- The following metrics are collected by default with the SQL Server integration:

    sqlserver.access.page_splits
    sqlserver.buffer.cache_hit_ratio
    sqlserver.buffer.checkpoint_pages
    sqlserver.buffer.page_life_expectancy
    sqlserver.stats.batch_requests
    sqlserver.stats.connections
    sqlserver.stats.lock_waits
    sqlserver.stats.procs_blocked
    sqlserver.stats.sql_compilations
    sqlserver.stats.sql_recompilations -->

 SQL Serverインテグレーションがデフォルトで取得しているメトリクス:
    sqlserver.access.page_splits
    sqlserver.buffer.cache_hit_ratio
    sqlserver.buffer.checkpoint_pages
    sqlserver.buffer.page_life_expectancy
    sqlserver.stats.batch_requests
    sqlserver.stats.connections
    sqlserver.stats.lock_waits
    sqlserver.stats.procs_blocked
    sqlserver.stats.sql_compilations
    sqlserver.stats.sql_recompilations
