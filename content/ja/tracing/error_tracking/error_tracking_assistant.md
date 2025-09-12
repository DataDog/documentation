---
description: エラー追跡アシスタントについてはご紹介します。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: エラー追跡における Executional Context の使用について
- link: /tracing/error_tracking
  tag: ドキュメント
  text: バックエンドサービスのエラー追跡について
is_beta: true
private: true
title: エラー追跡アシスタント
---

{{< beta-callout url="#" btn_hidden="true" >}}
APM Error Tracking 用の Error Tracking Assistant はプレビュー中です。アクセスをリクエストするには、Support (support@datadoghq.com) に連絡してください。
{{< /beta-callout >}}

## 概要

APM エラー追跡のエラー追跡アシスタントは、エラーの概要を示し、提案されるテストケースや修正によって、それらの解決をサポートします。

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="エラー追跡エクスプローラーの Executional Context" style="width:100%" >}}

## 要件とセットアップ
対応言語
: Python、Java

エラー追跡アシスタントには、[ソースコードインテグレーション][3]が必要です。ソースコードインテグレーションを有効にするには

1. **Integrations** に移動し、上部のナビゲーションバーで **Link Source Code** を選択します。
2. 手順に従って、コミットをテレメトリーに関連付け、GitHub リポジトリを構成します。

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="APM ソースコードインテグレーションのセットアップ" style="width:80%" >}}

### 推奨される追加セットアップ
- アシスタントに実際の本番変数値を提供することで、Python の提案を強化するには、[Python Executional Context Beta][1] に登録してください。
- IDE にテストケースや修正を送信するには、生成された提案で **Apply in VS Code** をクリックし、指示に従って Datadog VS Code Extension をインストールします。

## はじめに
1. [**APM** > **Error Tracking**][4] の順に移動します。
2. エラー追跡の問題をクリックすると、新しい **Generate test & fix** セクションが表示されます。

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="エラー追跡アシスタント" style="width:80%" >}}

## トラブルシューティング

生成された提案が表示されない場合

1. [ソースコードインテグレーション][2]と Github インテグレーションが正しく構成されていることを確認してください。
2. [Python Executional Context Beta][1] に登録することで、エラー追跡アシスタントの提案を強化します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /ja/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking