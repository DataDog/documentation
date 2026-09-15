---
aliases:
- /ja/tracing/llm_observability/evaluations/
- /ja/llm_observability/configuration/
- /ja/llm_observability/evaluations/
- /ja/llm_observability/configure/evaluations/
description: LLM アプリケーションの評価を構成する方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: ブログ
  text: Datadog LLM Observability を使用した LLM プロンプトの追跡、比較、最適化
title: 評価
---
## 概要 {#overview}

Agent Observability には、評価をサポートするためのいくつかの方法が用意されています。これらは、[{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][8] に移動して構成できます。

### カスタム LLM-as-a-judge 評価 {#custom-llm-as-a-judge-evaluations}

[カスタム LLM-as-a-judge 評価][1]を使用すると、自然言語プロンプトを使用して独自の評価ロジックを定義できます。カスタム評価を作成して、主観的または客観的な基準 (トーン、有用性、事実性など) を評価し、トレースやスパン全体で大規模に実行できます。

### マネージド評価{#managed-evaluations}

Datadog は、一般的なユースケースをサポートするために[マネージド評価][2]を構築およびサポートしています。これらは、Agent Observability アプリケーション内で有効化および構成できます。

### エンドユーザーからのフィードバックを送信する {#submit-end-user-feedback}

[エンドユーザーからのフィードバック][13]を使用すると、高評価や低評価、承認された変更、自由記述のコメント、その他のユーザーやエージェントからのフィードバックを Datadog に送信できます。フィードバックは、フィードバック結合キーを使用して、スパン、トレース、セッション、または顧客定義のエンティティに接続できます。

### 外部評価を送信する{#submit-external-evaluations}

Datadog の API を使用して[外部評価][3]を送信することもできます。独自の評価システムを持っているが、評価結果を Datadog 内に集約したい場合は、このアプローチを使用してください。

### カスタム評価者の構築{#building-custom-evaluators}

カスタム評価者を構築する開発者向けの情報は、[評価開発者ガイド][10]を参照してください。

### 評価の統合{#evaluation-integrations}

Datadog は、[NeMo][5] などの一部のサードパーティ評価フレームワークとの統合もサポートしています。

### アノテーションキュー{#annotation-queues}

[Annotation Queues][11] は、LLM トレースの体系的な人間によるレビューのための構造化されたワークフローを提供します。

### Sensitive Data Scanner 統合 {#sensitive-data-scanner-integration}

LLM リクエスト、エージェント、ワークフロー、またはアプリケーションの入出力を評価することに加え、Agent Observability は [Sensitive Data Scanner][6] と統合されており、機密情報を特定して編集することでデータ漏洩の防止を支援します。Sensitive Data Scanner に含まれるすぐに使えるルールのリストについては、[ライブラリルール][12]を参照してください。

### セキュリティ {#security}

{{< learning-center-callout header="AI アプリおよびエージェント向けにリアルタイムのセキュリティガードレールを提供します。" btn_title="プレビューに参加してください" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/ai-security/">}}
  AI Guard は、プロンプトインジェクション、ジェイルブレイク、ツールの悪用、機密データの流出攻撃から、AI アプリとエージェントをリアルタイムで保護するのに役立ちます。今すぐお試しください
{{< /learning-center-callout >}}

### 権限 {#permissions}

評価を構成するには、[`Agent Observability Write` 権限][7]が必要です。

### スパンの取得 {#retrieving-spans}

Agent Observability は、外部評価を実行するためにスパンを取得できる[エクスポート API][9] を提供します。これにより、実行時に評価に関連するデータを追跡する必要がなくなります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
[2]: /ja/llm_observability/investigate/evaluations/managed_evaluations
[3]: /ja/llm_observability/investigate/evaluations/external_evaluations
[5]: /ja/llm_observability/investigate/evaluations/external_evaluations/nemo
[6]: /ja/security/sensitive_data_scanner/
[7]: /ja/account_management/rbac/permissions/#llm-observability
[8]: https://app.datadoghq.com/llm/evaluations
[9]: /ja/llm_observability/investigate/export_api
[10]: /ja/llm_observability/investigate/evaluations/evaluation_developer_guide
[11]: /ja/llm_observability/investigate/annotation_queues
[12]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /ja/llm_observability/investigate/evaluations/end_user_feedback