---
aliases:
- /ja/llm_observability/evaluations/sensitive_data_scanner
- /ja/llm_observability/configure/evaluations/sensitive_data_scanner
- /ja/llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations/
- /ja/llm_observability/configure/evaluations/managed_evaluations/security_and_safety_evaluations/
description: LLM アプリケーションのマネージド評価を構成する方法を学びます。
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念について学ぶ
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability のセットアップ方法を学ぶ
title: Sensitive Data Scanner
---
このチェックにより、機密情報が適切かつ安全に処理されていることを確認し、データ漏洩や不正アクセスのリスクを低減します。

{{< img src="llm_observability/evaluations/sensitive_data_scanning_4.png" alt="Agent ObservabilityのSensitive Data Scannerによって検出されたSecurityおよび安全性評価" style="width:100%;" >}}

| 評価ステージ | 評価方法 | 評価定義 |
|---|---|---|
| 入出力で評価済み | Sensitive Data Scanner | [Sensitive Data Scanner][1]を搭載したAgent Observabilityは、すべてのLLMアプリケーションのプロンプトと応答のペアに含まれる機密情報をスキャン、識別、およびマスキングします。これには、個人情報、財務データ、健康記録、またはプライバシーやSecurity上の懸念から保護が必要なその他のデータが含まれます。 |

[1]: /ja/security/sensitive_data_scanner/