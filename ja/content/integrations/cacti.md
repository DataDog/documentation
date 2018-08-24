---
last_modified: 2015/07/01
translation_status: original
language: ja
title: Datadog-Cacti Integration
integration_title: Cacti
kind: integration
doclevel: complete
git_integration_title: cacti
---

<!-- ## Overview

Connect Cacti to Datadog to:

- Visualize Cacti metrics in Datadog.
- Correlate metrics captured by Cacti with the rest of your applications. -->

## 概要

次の目的でCactiのコミット情報をDatadogと連携します:

* Cactiファイルシステムのパフォーマンスの可視化
* Cactiファイルシステムのパフォーマンス情報と他アプリケーションとの情報の連携

<!-- From the open-source Agent:

* [Cacti YAML example](https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example)
* [Cacti checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/cacti.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス収集プログラム:

* [Cactiインテグレーションの設定ファイルサンプル](https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example)
* [Cactiインテグレーション checks.d](https://github.com/DataDog/integrations-core/blob/master/cacti/check.py)
