---
further_reading:
- link: /real_user_monitoring/
  tag: ドキュメント
  text: RUM とセッションリプレイについて
title: RUM とセッションリプレイの課金
---
## 概要 {#overview}

このページでは、RUM とセッションリプレイの課金に関するよくある質問とその回答を掲載しています。

## セッションはどのように定義されていますか？{#how-is-a-session-defined}

セッションは、Web またはモバイルアプリケーション上でのユーザーのジャーニーです。セッションには通常、関連するテレメトリを伴う複数のページビューが含まれます。

## セッションはいつ期限切れになりますか？{#when-does-a-session-expire}

セッションは 15 分間操作がないと期限切れになり、その期間は最大 4 時間に制限されています。4 時間経過すると、新しいセッションが自動的に作成されます。

## Session Replay の記録時間はどのくらいですか？{#how-long-are-session-replay-recordings}

Session Replay の記録時間は、セッションの長さによって異なります。例えば、5～8 秒という短い Session Replay を観測している場合、それはユーザーが 5～8 秒後にセッションを終了したことを意味します。

## Datadog の RUM と Session Replay は、どのようなデータを収集するのですか？{#what-data-does-datadog-rum-session-replay-collect}

Datadog は、ユーザーが訪問したすべてのページを、読み込みリソース (XHR、イメージ、CSS ファイル、JS スクリプト)、フロントエンドエラー、クラッシュレポート、長時間のタスクなど、重要なテレメトリと一緒に収集します。これらはすべてユーザーセッションに含まれるデータです。Session Replay については、Datadog は DOM のスナップショットに基づいて iframe を作成します。Datadog は、Datadog Real User Monitoring (RUM) サービスで収集されたセッションの 1,000 件ごとに課金します。

## Datadog はシングルページアプリケーションに対応していますか？{#does-datadog-handle-single-page-applications}

はい、お客様側での設定は不要です。Datadog RUM はページの変化を自動的に追跡します。

## エンドポイントリクエストをエンドツーエンドでどのように表示しますか？{#how-do-you-view-endpoint-requests-end-to-end}

付属の APM インテグレーションを使用して、あらゆる XHR または Fetch リクエストを、対応するバックエンドのトレースに紐付けることができます。

## RUM のブラウザコレクターからのログをどのように表示しますか？{#how-do-you-view-logs-from-the-browser-collector-in-rum}

ブラウザのログは自動的に対応する RUM セッションに紐付けられるため、エンドユーザーのジャーニーで発生したログを監視できます。

## Datadog はクッキーを使用しますか？{#does-datadog-use-cookies}

はい。Datadog は、ユーザーのさまざまなステップをセッションにまとめるためにクッキーを使用します。このプロセスではクロスドメインクッキーは使用されず、アプリケーション外でのユーザーの行動も追跡されません。

## 使用量ページには、Browser RUM & Session Replay プランで課金された RUM セッションが表示されていますが、私のアプリケーションでは Session Replay のキャプチャが構成されていません。{#my-usage-page-shows-rum-sessions-billed-under-the-browser-rum-session-replay-plan-but-i-have-not-configured-capturing-session-recordings-for-my-application}

**Browser RUM & Session Replay**プランは、Session Replay（リプレイ）を有効化します。

- リプレイを収集している場合は、リプレイプランでの課金となります。

- Session Replay のキャプチャを無効にするには、[Session Replay のドキュメント][1]を参照してください。

## モバイルアプリケーションの Web ビューは Session Replay と請求にどのような影響を与えますか？{#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing}

モバイルアプリケーションに Web ビューが含まれており、Web アプリケーションとモバイルアプリケーションの両方を Datadog SDK でインスツルメントしている場合、ブリッジが作成されます。Web ビューを介して読み込まれる Web アプリ上の Browser SDK によって記録されたすべてのイベントは、Mobile SDK に転送されます。これらのイベントは、モバイルアプリケーションで開始されたセッションにリンクされます。

言い換えると、Datadog では 1 つの RUM モバイルセッションのみが表示されるため、請求対象のセッションはその 1 つだけとなります。

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="Datadog SDK を使用して Web アプリケーションとモバイルアプリケーションの両方をインスツルメントしている場合、モバイルセッションに対してのみ課金されます。" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/session_replay/