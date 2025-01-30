---
description: Configuration ページで LLM アプリケーションのトピックと評価を構成する方法をご紹介します。
further_reading:
- link: /llm_observability/terms/
  tag: ドキュメント
  text: 評価について
- link: /llm_observability/submit_evaluations/
  tag: ドキュメント
  text: 評価の提出方法について
- link: /llm_observability/setup
  tag: ドキュメント
  text: Learn how to set up LLM Observability
title: 構成
---

## 概要

LLM アプリケーションは、[Configuration ページ][1]で、パフォーマンスやセキュリティを最適化する設定を行うことができます。

トピック
: 無関係または悪意のある入力を識別・除外することで、LLM アプリケーションが意図した目的に集中できるようにします。

評価
: Datadog が品質、セキュリティ、安全性といった観点から LLM アプリケーションを判定できるようにします。評価を有効にすることで、アプリケーションの応答の有効性を判定し、パフォーマンスとユーザーの安全性を高い水準で維持することができます。

LLM Observability でセットアップした LLM アプリケーションを選択し、トピックや評価をカスタマイズしてください。

{{< img src="llm_observability/configuration.png" alt="LLM Observability における LLM アプリケーションの構成設定の例" style="width:100%;" >}}

`Language Mismatch` (言語の不一致) 以外の[すぐに使える評価](#select-evaluations)を有効にすると、入力と出力が OpenAI に共有されます。

<div class="alert alert-warning">すぐに使える評価を有効にすることで、LLM Observability の提供および改善を目的として、Datadog が OpenAI LLC と貴社のデータを共有することを承認することになります。OpenAI は、貴社のデータをトレーニングやチューニングには使用しません。質問や OpenAI 依存の機能を無効化したい場合は、アカウント担当者にご連絡ください。</div>

## トピックを入力

トピックを入力するには、編集アイコンをクリックしてキーワードを追加します。例えば、インシデント管理用の LLM アプリケーションには、`observability` (可観測性) や `software engineering` (ソフトウェアエンジニアリング)、`incident resolution` (インシデント解決) などのキーワードを追加します。

トピックは複数の単語を含めることができ、できるだけ具体的かつ説明的なものにしてください。例えば、e コマースストアでの顧客対応を行うアプリケーションの場合、「e コマースストアでの家具購入に関する顧客からの質問」といったトピックを使用します。

## 評価の選択

評価を有効にするには、Quality や Security and Safety セクションで、LLM アプリケーションを評価したいそれぞれの評価項目のトグルをクリックしてください。評価の詳細については、[用語と概念][2]をご覧ください。

評価を有効にすると、プロンプトと応答のデータが OpenAI と共有されます。ゼロデータ保持 (ZDR) ポリシーに基づき、OpenAI は Datadog から送信されたデータをトレーニング目的で使用しません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/config
[2]: /ja/llm_observability/terms/