---
last_modified: 2015/07/05
translation_status: complete
language: ja
title: Datadog-Event Viewer Integration
integration_title: Event Viewer
kind: integration
doclevel: complete
---

<!-- ### Overview


Connect Event Viewer to Datadog in order to:

- Track system and application events in Datadog.
- Correlate system and application events with the rest of your application. -->

### 概要


次の目的の為に、Event ViewerをDatadogと連携します:

* Datdog内で、システムやアプリケーションに関するイベントを追跡する
* システムやアプリケーションに関するイベントをその他のアプリケーションと関連付ける

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [Event Viewer インテグレーションの設定ファイルサンプ](https://github.com/DataDog/integrations-core/blob/master/win32_event_log/conf.yaml.example)
* [Event Viewer インテグレーション　checks.d](https://github.com/DataDog/integrations-core/blob/master/win32_event_log/checks.py)
