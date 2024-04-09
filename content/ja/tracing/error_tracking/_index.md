---
algolia:
  tags:
  - エラー追跡
description: バックエンドサービスから収集したエラーを検索し、管理する方法をご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/service-page/
  tag: GitHub
  text: サービステレメトリー、エラー追跡、SLO などを一元的に把握します
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: トレースエクスプローラーについて
- link: /tracing/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
- link: /monitors/types/error_tracking/
  tag: ドキュメント
  text: エラー追跡モニターを作成する
kind: documentation
title: バックエンドサービスのエラー追跡
---

## 概要

{{< img src="error_tracking/error-tracking-overview.png" alt="エラートラッキングエクスプローラーの問題の詳細画面" style="width:100%;" >}}

{{% error-tracking-description %}}

## 計画と使用

エラー追跡は、APM でサポートされているすべての言語で利用でき、別の SDK を使用する必要はありません。

オプションで、スタックトレース内でコードスニペットを見たい場合は、[GitHub インテグレーション][4]をセットアップしてください。

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="スタックトレース内のインラインコードスニペット" style="width:70%;" >}}

リポジトリの構成を始めるには、[ソースコードインテグレーションのドキュメント][6]を参照してください。

## エラースパンを追跡するために span タグを使用する

Datadog トレーサーは、インテグレーションやバックエンドサービスのソースコードの手動インスツルメンテーションを通じて、エラーを収集します。トレース内のエラースパンは、**エラーがサービスエントリースパン (一番上のサービススパン) に位置する場合**、エラー追跡によって処理されます。このスパンには、追跡対象の `error.stack`、`error.message`、`error.type` [スパンタグ][1]が含まれている必要があります。

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="エラーのあるフレームグラフ" style="width:100%;" >}}

エラー追跡は、エラータイプ、エラーメッセージ、スタックトレースを形成するフレームを使用して、処理する各エラースパンのフィンガープリントを計算します。同じフィンガープリントを持つエラーはグループ化され、同じ問題に属します。詳しくは、[トレースエクスプローラーのドキュメント][2]を参照してください。

## トラブルシューティングやデバッグを開始するための問題点の検討

Error Tracking は、バックエンドサービスから [Error Tracking Explorer][5] に収集されたエラーを自動的に問題に分類します。主な機能を確認するには、[Error Tracking Explorer のドキュメント][3]を参照してください。

APM から作成される問題には、影響を受けたスパンの分布、最新の最も関連性の高いスタックトレース、スパンタグ、ホストタグ、コンテナタグ、およびメトリクスが含まれます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/trace/?tab=spantags#more-information
[2]: /ja/tracing/trace_explorer/trace_view/?tab=spantags
[3]: /ja/tracing/error_tracking/explorer
[4]: /ja/tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /ja/integrations/guide/source-code-integration