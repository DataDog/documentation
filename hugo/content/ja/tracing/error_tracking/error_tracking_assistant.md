---
description: Error Tracking Assistant についてはご紹介します。
further_reading:
- link: /monitors/types/error_tracking
  tag: ドキュメント
  text: Error Tracking における Executional Context の使用について
- link: /tracing/error_tracking
  tag: ドキュメント
  text: バックエンドサービスの Error Tracking について
is_beta: true
private: true
title: Error Tracking Assistant
---
{{< callout url="#" btn_hidden="true" >}}
APM Error Tracking 向けの Error Tracking Assistant はプレビュー版です。アクセスをリクエストするには、support@datadoghq.com からサポートにお問い合わせください。
{{< /callout >}}

## 概要 {#overview}

APM Error Tracking の Error Tracking Assistant は、エラーの概要を示し、提案されるテストケースや修正によって、それらの解決をサポートします。

{{< img src="tracing/error_tracking/error_tracking_assistant.mp4" video="true" alt="Error Tracking エクスプローラーの Executional Context" style="width:100%" >}}

## 要件とセットアップ {#requirements-and-setup}
サポート対象言語
: Python、Java

Error Tracking Assistant には [ソースコードインテグレーション][3] が必要です。ソースコードインテグレーションを有効にするには:

1. {{< ui >}}Integrations{{< /ui >}} に移動し、上部のナビゲーションバーで {{< ui >}}Link Source Code{{< /ui >}} を選択します。
2. 手順に従って、コミットをテレメトリに関連付け、GitHub リポジトリを構成します。

{{< img src="tracing/error_tracking/apm_source_code_integration.png" alt="APM ソースコードインテグレーションのセットアップ" style="width:80%" >}}

### 推奨される追加セットアップ {#recommended-additional-setup}
- アシスタントに実際の本番変数値を提供することで、Python の提案を強化するには、[Python Executional Context Beta][1] に登録してください。
- IDE にテストケースや修正を送信するには、生成された提案で {{< ui >}}Apply in VS Code{{< /ui >}} をクリックし、指示に従って Datadog VS Code Extension をインストールします。

## はじめに {#getting-started}
1. [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][4] に移動します。
2. Error Tracking の問題をクリックすると、新しい {{< ui >}}Generate test & fix{{< /ui >}} セクションが表示されます。

{{< img src="tracing/error_tracking/error_tracking_assistant.png" alt="Error Tracking Assistant" style="width:80%" >}}

## トラブルシューティング{#troubleshooting}

生成された提案が表示されない場合

1. [ソースコードインテグレーション][2] と Github インテグレーションが正しく構成されていることを確認してください。
2. [Python Executional Context Beta][1] に登録することで、Error Tracking Assistant の提案を強化します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/error_tracking/executional_context
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: /ja/integrations/guide/source-code-integration
[4]: https://app.datadoghq.com/apm/error-tracking