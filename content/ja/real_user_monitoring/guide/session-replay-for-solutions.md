---
description: Learn how to adopt RUM & Session Replay in your Solutions or Support
  organization.
further_reading:
- link: /real_user_monitoring/platform/connect_rum_and_traces/
  tag: Documentation
  text: Learn how to connect RUM with APM traces
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: Learn about Session Replay
- link: /real_user_monitoring/session_replay/browser/developer_tools
  tag: Documentation
  text: Learn about Browser Dev Tools
title: Use Session Replay In Your Technical Support Workflow
---

## 概要

[セッションリプレイ][1]を使用することで、テクニカルソリューションとサポートチームが顧客の問題をより適切にトラブルシューティングできるようになります。RUM とセッションリプレイを使用すると、特定のユーザーセッションを見つけ、ユーザージャーニーを観察し、開発者ツールにアクセスしてイベント、ログ、エラー、および属性を確認することができます。

このガイドでは、組織がワークフローを複製し、ソリューションチームがワークフローにインテグレーションするための資産として使用できるワークフローを説明しています。

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Shopist アプリケーションにおけるユーザーセッションのセッションリプレイ記録" style="width:100%;">}}

## ユーザーの問題を評価する

ある顧客が Datadog を使用して問題に遭遇したと仮定します。テクニカルソリューションチームは、Zendesk や ServiceNow などのサポートソリューションを使用して、この顧客が Synthetic のマルチステップ API テストを更新または保存できないことを報告すると、チケットを作成することができます。

チームは、顧客のテストが更新または保存されないことの追加コンテキストを提供する可能性がある顧客からより多くの情報 (特定のテスト ID および[ブラウザ開発ツール][2]を開いた画面の記録など) を要求する場合があります。コンソールエラーが記録されていない場合、チームはマルチステップ API テストの問題を調査するためのヒントを得られません。

テクニカルソリューションズチームは、次のような質問を理解しようとすることがあります。

- 顧客が経験している正確なエラーは何か？
- 特定の問題を示唆するアプリ内通知 (コンソールエラーやエラーメッセージなど) を顧客が見ているか？
- 顧客はどのボタンをどのような順序でクリックしたのか？顧客がボタンをクリックする前に、予期せぬアクションが発生しなかったか？

## 根本原因の調査

If there were a way to view the customer's user journey in Datadog and see associated backend requests, the Technical Solutions team would have a better understanding of what may be causing this issue.

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="RUM ビューアクションに関連する APM スタックトレース" style="width:100%;">}}

APM インテグレーションを使用すると、Web アプリケーションからのリクエストと対応するバックエンドトレースを接続して、RUM イベントから APM トレースデータにアクセスし、**Errors** タブでバックエンドエラーを明らかにすることができます。

詳しくは、[RUM とトレースの接続][3]をご覧ください。

## セッションリプレイでユーザーセッションを見る

テクニカルソリューションチームは、Zendesk のようなサポートプラットフォームと、RUM & セッションリプレイのような Datadog 製品を接続する内部ツールを持っている場合があります。例えば、Zendesk のコンテキストリンクから [RUM エクスプローラー][4]にリダイレクトし、検索クエリにユーザー ID を自動入力することが可能です。イベントリストから個々のユーザーセッションにフィルターをかけることができます。

テクニカルソリューションチームは、セッションリプレイを使用して Datadog のユーザージャーニーのレプリカを表示し、ブラウザ開発ツールを使用してフロントエンドに表示される可能性のある追加のエラーにアクセスすることができます。フロントエンドのエラーとバックエンドのトレースにアクセスすることで、テクニカルソリューションチームは、RUM & セッションリプレイと APM インテグレーションを使用して、顧客の問題のトラブルシューティングを支援する権限を与えられます。

Click on a user session with a replay recording to observe the user's behavior on the Datadog platform. By using Session Replay, you can locate the corresponding RUM events and identify the specific `click` action to save the multistep API test. Clicking **Save** in the UI triggers the backend call to save the test's configuration.

## バックエンドのトレースからエラーを発見

マルチステップ API テストの APM トレースでエラーを調査していると、テクニカルソリューションチームは `​​https://properties.steps.items.properties.name/` 構成の `maxLength` に関連する `APIInvalidInputError` に遭遇することがあり、これがテスト保存失敗の根本原因であるように思われます。

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="RUM ビューアクションに関連する APM スタックトレース" style="width:100%;">}}

The multistep API test did not save because of a character limit in the step's name. 

## ユーザーの問題を解決する

この顧客の問題を解決するために、テクニカルソリューションチームは、テストを保存できない場合のコンテキストヘルプを備えたマルチステップ API テストワークフローの更新を製品チームに要求することができます。

また、Frontend チームには、テストステップ名の最大文字数制限を超えた場合にユーザーに通知されるように、UI にエラーメッセージを実装することも推奨されるかもしれません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/browser/
[2]: /ja/real_user_monitoring/session_replay/browser/developer_tools/
[3]: /ja/real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer