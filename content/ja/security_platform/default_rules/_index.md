---
title: OOTB ルール
kind: documentation
type: security_rules
description: Datadog セキュリティプラットフォームルール
aliases:
  - /ja/security_monitoring/default_rules/
disable_sidebar: true
---
[検出ルール][1]は、取り込んだすべてのログに適用される条件付きロジックを定義します。対象期間内において、検出ルールで定義された少なくとも 1 つのケースが一致した場合に Datadog でセキュリティシグナルが生成されます。

Datadog はすぐに使用できる (OOTB) 検出ルールを提供して、攻撃者のテクニックと潜在的な構成ミスを報告するため、セキュリティ体制を改善するための対策を即座に取ることができます。Datadog は継続的に新しいデフォルトの検出ルールを開発しており、これは自動的にアカウントにインポートされます。

**Logs Detection** でフィルタリングしてセキュリティモニタリングルールを表示し、**Logs Detection**  でフィルタリングしてクラウドセキュリティワークロードルールを表示し、**Cloud Configuration** でフィルタリングしてクラウドセキュリティポスチャルールを表示します。

[1]: ../detection_rules