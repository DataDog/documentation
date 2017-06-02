---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-SumoLogic Integration
integration_title: SumoLogic
kind: integration
doclevel: basic
---

<!-- 1. Enable the Datadog integration on the Sumo Logic side
2. To send Datadog events and alerts to Sumo Logic, create a new HTTP Collector in Sumo Logic (Manage > Collectors > Add Collector) and copy paste the collector's url. -->

### 概要
{:#int-overview}

次の目的で、Sumo LogicとDatadogを連携します:

* Sumo Logicに蓄積しているログデータをDatadogが取得しているメトリクスと関連付ける
* Sumo Logicへアラート通知を送信する

### 設定
{:#int-configuration}

1. Sumo Logic側(Manage > Collectors > Add Collector)でHTTP Collectorを作成します。
2. umo Logic側で作成したHTTP CollectorのURLを、Datadog側のSumo Logicインテグレーションのタイルに書き込みます。
