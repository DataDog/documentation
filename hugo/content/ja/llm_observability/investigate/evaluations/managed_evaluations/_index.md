---
aliases:
- /ja/llm_observability/evaluations/ootb_evaluations
- /ja/llm_observability/configure/evaluations/ootb_evaluations
- /ja/llm_observability/evaluations/managed_evaluations/
- /ja/llm_observability/configure/evaluations/managed_evaluations/
description: LLM アプリケーションのマネージド評価を構成する方法を学びます。
further_reading:
- link: https://www.datadoghq.com/blog/llm-aws-strands
  tag: ブログ
  text: Datadog LLM Observability を使用して Strands Agents のワークフローを可視化する
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念について学ぶ
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability のセットアップ方法を学ぶ
title: マネージド評価
---
## 概要 {#overview}

マネージド評価は、LLM アプリケーションを評価するための組み込みツールです。Agent Observability は、評価をそれぞれの
スパンに関連付けます。これにより、特定の評価につながった入力と出力を各スパンについて表示できます。

[互換性要件][2]の詳細をご覧ください。

## 新しい評価を作成する {#create-new-evaluations}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1] に移動します。
1. 右上隅にある {{< ui >}}Create Evaluation{{< /ui >}} ボタンをクリックします。
1. 特定のマネージド評価を選択します。これにより、評価エディターウィンドウが開きます。

{{< ui >}}Save and Publish{{< /ui >}} をクリックすると、評価が有効になります。または、{{< ui >}}Save as Draft{{< /ui >}} を選択して、後で編集または有効化することもできます。

## 既存の評価を編集する {#edit-existing-evaluations}

1. [{{< ui >}}AI Observability{{< /ui >}} > {{< ui >}}Evaluations{{< /ui >}}][1] に移動します。
1. 編集する評価にカーソルを合わせ、{{< ui >}}Edit{{< /ui >}} ボタンをクリックします。

### サポート対象のマネージド評価 {#supported-managed-evaluations}

- [言語の不一致][3] - ユーザーの入力とは異なる言語で記述された応答にフラグを立てます
- [機密データスキャン][4] - モデルの入力または出力に機密情報や規制対象情報が存在する場合にフラグを立てます


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/evaluations
[2]: /ja/llm_observability/investigate/evaluations/compatibility
[3]: /ja/llm_observability/investigate/evaluations/language_mismatch
[4]: /ja/llm_observability/investigate/evaluations/managed_evaluations/security_and_safety_evaluations