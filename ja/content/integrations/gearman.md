---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Gearman Integration
integration_title: Gearman
kind: integration
git_integration_title: gearmand
doclevel: complete
---

<!-- ## Overview

Bring Gearman metrics to Datadog to:

- Visualize Gearman performance.
- Know how many tasks are queued or running.
- Correlate the performance of Gearman with the rest of your applications. -->

## 概要

Bring Gearman metrics to Datadog to:
次の目的で、GearmanのメトリクスをDatadogと連携します:

* Greamanのパフォーマンスを可視化する。
* キューに溜まったタスクや進行形のタスクを把握する。
* Gearmanのパフォーマンスを他のアプルケーションと連携し状況を把握する

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Gearmanインテグレーションの設定ファイルサンプル](https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example)
* [Gearmanインテグレーション checks.d](https://github.com/DataDog/integrations-core/blob/master/gearmand/check.py

<!-- The following metrics are collected by default with the Gearman integration:

    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers -->

Gearmanインテグレーションがデフォルトで取得しているメトリクス:
    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers
