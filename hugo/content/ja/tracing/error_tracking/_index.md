---
algolia:
  tags:
  - error tracking
description: バックエンドサービスから収集したエラーを検索し、管理する方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: ブログ
  text: サービステレメトリ、Error Tracking、SLO などを一元的に把握する
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Trace Explorer について
- link: /tracing/error_tracking/explorer
  tag: ドキュメント
  text: Error Tracking エクスプローラーについて
- link: /monitors/types/error_tracking/
  tag: ドキュメント
  text: Error Tracking モニターを作成する
title: バックエンドサービスの Error Tracking
---
## 概要 {#overview}

{{< img src="error_tracking/error-tracking-overview-3.png" alt="Error Tracking エクスプローラーにおける課題の詳細" style="width:100%;" >}}

{{% error-tracking-description %}}

## セットアップ {#setup}

Error Tracking は、APM でサポートされているすべての言語で利用できます。追加の SDK や構成の変更は必要ありません。

オプションで、スタックトレース内でコードスニペットを見たい場合は、[GitHub インテグレーション][4] をセットアップしてください。

{{< img src="tracing/error_tracking/inline_code_snippet_2.png" alt="スタックトレースにおけるインラインコードスニペット" style="width:70%;" >}}

リポジトリの構成を始めるには、[ソースコードインテグレーションのドキュメント][6] を参照してください。

## エラースパンを追跡するためにスパン属性を使用する {#use-span-attributes-to-track-error-spans}

Datadog SDK は、インテグレーションやバックエンドサービスのソースコードの手動インスツルメンテーションを通じてエラーを収集します。エラースパンが追跡されるには、`error.stack`、`error.message`、および `error.type` [スパン属性][1] を含み、完全なトレースに属している必要があります。サービス内でエラーが複数回報告された場合、最上位のエラーのみが保持されます。

<div class="alert alert-warning">
Go トレーサーは、v2.7.0 バージョンでスタックトレースの報告に使用される属性を変更しました。
Go トレーサーの古いバージョン (v2.7.0 より前) では、スタックトレースは <code>error.stack</code> スパン属性で報告されます。
v2.7.0 以降では、Go トレーサーはハンドリングスタックトレースを <code>error.handling_stack</code> スパン属性 ( <code>error.stack</code> 現在利用可能な場合はスローイングスタックを保持) で報告します。
詳細は、<a href="/tracing/error_tracking/stack_traces/">Error Tracking におけるスタックトレース</a>を参照してください。
</div>

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="エラーを含むフレームグラフ" style="width:100%;" >}}

Error Tracking は、処理する各エラースパンのフィンガープリントを計算します。フィンガープリントには、エラータイプ、エラーメッセージ、およびスタックトレースを形成するフレームが使用されます。同じフィンガープリントを持つエラーはグループ化され、同じ問題に属します。詳細は、[Trace Explorer のドキュメント][2] を参照してください。

## 追跡されるエラーを制御する {#control-which-errors-are-tracked}

Error Tracking はすべてのエラースパンを自動的に処理しますが、どのエラーを取り込み、どのように管理するかを制御できます。

- **包含ルールと除外ルールでエラーをフィルタリングする**: サービス、環境、エラータイプなどの属性に基づいて、エラーを包含または除外するルールを定義します。[データ収集の管理][7] を参照してください。
- **レート制限を設定する**: 1 日あたりのエラー取り込み量を制御してコストを管理します。[データ収集の管理][7] を参照してください。
- **特定の問題を除外する**: 繰り返し発生する対応不要な課題を `EXCLUDED` としてマークし、収集を停止します。[問題の状態][8] を参照してください。
- **トレース全体をフィルタリングする**: (エラーをフィルタリングするのではなく) トレースが Datadog に送信されないようにします。[APM で不要なリソースを無視する][9] を参照してください。

## トラブルシューティングやデバッグを開始するための問題点を検討する {#examine-issues-to-start-troubleshooting-or-debugging}

Error Tracking は、[Error Tracking エクスプローラー][5] でバックエンドのサービスから収集されたエラーを自動的に分類して表示します。主要機能の概要については、[Error Tracking エクスプローラーのドキュメント][3] を参照してください。

APM から作成される問題には、影響を受けたスパンの分布、最新の最も関連性の高いスタックトレース、スパン属性、ホストタグ、コンテナタグ、およびメトリクスが含まれます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/trace/?tab=spantags#more-information
[2]: /ja/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /ja/tracing/error_tracking/explorer
[4]: /ja/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /ja/integrations/guide/source-code-integration
[7]: /ja/error_tracking/manage_data_collection/
[8]: /ja/error_tracking/issue_states/
[9]: /ja/tracing/guide/ignoring_apm_resources/