---
aliases:
- /ja/llm_observability/evaluations/quality_evaluations
- /ja/llm_observability/configure/evaluations/quality_evaluations
- /ja/llm_observability/evaluations/managed_evaluations/quality_evaluations
- /ja/llm_observability/configure/evaluations/managed_evaluations/quality_evaluations
- /ja/llm_observability/evaluations/managed_evaluations/language_mismatch/
- /ja/llm_observability/configure/evaluations/language_mismatch/
description: Datadogの言語の不一致評価について学習します。
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: ドキュメント
  text: Agent Observability の用語と概念について学ぶ
- link: /llm_observability/setup
  tag: ドキュメント
  text: Agent Observability のセットアップ方法を学ぶ
title: 言語の不一致
---
このチェックは、LLMがユーザーの使用した言語や方言とは異なる言語で応答を生成した事例を特定します。これは、混乱や誤解を招く可能性があります。このチェックは、LLMの応答がユーザーの言語的な好みやニーズに対して明確で、関連性があり、適切であることを保証します。

言語の不一致は、自然言語のプロンプトに対してのみサポートされています。JSON、コードスニペット、特殊文字などの構造化データが主体の入出力ペアは、言語の不一致としてフラグが立てられません。

{{% collapse-content title="サポート対象言語" level="h5" %}}
アフリカーンス語、アルバニア語、アラビア語、アルメニア語、アゼルバイジャン語、ベラルーシ語、ベンガル語、ノルウェー語（ブークモール）、ボスニア語、ブルガリア語、中国語、クロアチア語、チェコ語、デンマーク語、オランダ語、英語、エストニア語、フィンランド語、フランス語、ジョージア語、ドイツ語、ギリシャ語、グジャラート語、ヘブライ語、ヒンディー語、ハンガリー語、アイスランド語、インドネシア語、アイルランド語、イタリア語、日本語、カザフ語、韓国語、ラトビア語、リトアニア語、マケドニア語、マレー語、マラーティー語、モンゴル語、ノルウェー語（ニーノシュク）、ペルシア語、ポーランド語、ポルトガル語、パンジャーブ語、ルーマニア語、ロシア語、セルビア語、スロバキア語、スロベニア語、スペイン語、スワヒリ語、スウェーデン語、タミル語、テルグ語、タイ語、トルコ語、ウクライナ語、ウルドゥー語、ベトナム語、ヨルバ語、ズールー語
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="Agent Observabilityのオープンソースモデルによって検出された言語の不一致評価" style="width:100%;" >}}

| 評価ステージ | 評価方法 | 評価定義 |
|---|---|---|
| 入力と出力で評価 | オープンソースモデルを使用して評価 | 言語の不一致評価は、各プロンプトと応答のペアが、LLM アプリケーションがユーザーの質問に対してユーザーが使用したのと同じ言語で回答しているかどうかを示します。 |