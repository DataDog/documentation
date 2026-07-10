---
description: CloudPrem で利用できる Datadog Log Explorer 機能を確認する
title: サポート対象の機能
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}
## 概要

Datadog CloudPrem では、Log Explorer の中核機能をセルフ ホスト環境で利用できます。このページでは、利用可能な機能を整理し、SaaS プラットフォームとの違いを明らかにしながら、ログ ワークフロー設計の参考になる情報をまとめています。

## サポート対象の機能

現在、次のログ機能に対応しています:
- 任意のログ属性に対する全文検索
- List、Timeseries、Top List、Table、Tree Map、Pie Chart、Scatter Plot の可視化
- Fields と Patterns への Group by (monthly timeshift を除く)
- Dashboards
- Log monitors
- [Log Restriction Queries][1] による RBAC
- CSV のダウンロード
- ログから Datadog SaaS に送信されたメトリクスへの相関表示 (逆方向は未対応)
- ログから Datadog SaaS に送信されたトレースへの相関表示 (逆方向は未対応)

## サポート対象外の機能

対応機能は継続的に拡充されています。現時点では、次の機能は利用できません:
- Bits AI SRE
- 複数の保持期間やセグメント分割要件に対応するインデックス管理
- Notebooks
- Federated search
- LiveTail
- Watchdogs

[1]: /ja/api/latest/logs-restriction-queries/