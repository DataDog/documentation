---
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Learn about RUM & Session Replay
title: RUM & Session Replay Billing
---

## 概要

このページでは、RUM とセッションリプレイの課金に関するよくある質問とその回答を掲載しています。

## セッションはどのように定義されますか？

セッションとは、ウェブアプリケーションまたはモバイルアプリケーションでユーザーが行う操作 (カスタマージャーニー) です。通常、セッションには複数ページの表示とそれに関連するテレメトリーが含まれます。

## セッションに期限はありますか？

A session expires after 15 minutes of inactivity, and its duration is limited to 4 hours. After 4 hours, a new session is automatically created.

## How long are Session Replay recordings?

Session Replay recordings can vary based on the session length. For example, if you're observing short, 5-8 second Session Replays, that means the user ended their session after 5-8 seconds.

## Datadog の RUM とセッションリプレイは、どのようなデータを収集するのですか？

Datadog は、エンドユーザーが訪問したすべてのページを、読み込みリソース (XHR、イメージ、CSS ファイル、JS スクリプト)、フロントエンドエラー、クラッシュレポート、長時間のタスクなど、重要なテレメトリーと一緒に収集します。これらはすべてユーザーセッションに含まれるデータです。セッションリプレイでは、Datadog は DOM のスナップショットに基づいて iframe を作成します。Datadog リアルユーザーモニタリング (RUM) サービスで収集されたセッション 1,000 件ごとに課金されます。

## Datadog はシングルページアプリケーションに対応していますか？

はい。お客様側でのコンフィギュレーションは必要ありません。Datadog RUM が自動的にページの変更を追跡します。

## エンドポイントリクエストをエンドツーエンドでどのように表示しますか？

付属の APM インテグレーションを使用して、あらゆる XHR または Fetch リクエストを、対応するバックエンドのトレースに紐付けることができます。

## RUM のブラウザコレクターからのログをどのように表示しますか？

ブラウザのログは自動的に対応する RUM セッションに紐付けられるため、エンドユーザーのジャーニーで発生したログを監視できます。

## Datadog はクッキーを使用しますか？

はい。Datadog ではクッキーを使用して、セッションまでのユーザーのさまざまなステップをまとめます。ただし、クロスドメインクッキーは使用しないほか、アプリケーション外部のユーザーアクションは追跡されません。

## 使用量ページには、Browser RUM & セッションリプレイプランで課金された RUM セッションが表示されていますが、私のアプリケーションではセッション記録のキャプチャが構成されていません。

**Browser RUM & セッションリプレイ**プランは、セッションの記録 (リプレイ) をアンロックします。

- リプレイを収集している場合は、リプレイプランでの課金となります。

- セッションの記録をキャプチャしないようにするには、[セッションリプレイのドキュメント][1]を参照してください。

## How do webviews in mobile applications impact session recordings and billing?

When a mobile application contains webviews and you've instrumented both your web and mobile applications with Datadog SDKs, a bridge is created. All events recorded by the Browser SDK on the web app that are loaded through the webview are forwarded to the Mobile SDK. These events are linked to the session that started on the mobile application.

In other words, only the one RUM mobile session is visible in Datadog and therefore is the only one that is billable.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="If you've instrumented both your web and mobile applications with Datadog SDKs, you are only be billed for the mobile session." >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/browser#disable-session-replay