---
description: RUM とセッションリプレイをソリューションまたはサポート組織に導入する方法について説明します。
further_reading:
- link: /real_user_monitoring/correlate_with_other_telemetry/apm/
  tag: ドキュメント
  text: RUM と APM トレースとの接続方法について
- link: /session_replay/
  tag: ドキュメント
  text: セッションリプレイについて
- link: /session_replay/dev_tools
  tag: ドキュメント
  text: ブラウザ開発ツールについて
title: テクニカルサポートのワークフローにセッションリプレイを活用する
---
## 概要 {#overview}

[Session Replay][1] を使用して、テクニカルソリューションチームやサポートチームが顧客の問題をより適切にトラブルシューティングできるようにすることができます。RUM & Session Replay を使用すると、特定のユーザーセッションを特定し、ユーザーのジャーニーを観察し、開発者ツールにアクセスしてイベント、ログ、エラー、属性を確認することができます。

このガイドでは、組織がワークフローを複製し、ソリューションチームがワークフローにインテグレーションするための資産として使用できるワークフローを説明しています。

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Shopist アプリケーションにおけるユーザーセッションの Session Replay 録画" style="width:100%;">}}

## ユーザーの問題を評価してください {#assess-user-issues}

ある顧客が Datadog を使用して問題に遭遇したと仮定します。テクニカルソリューションチームは、Zendesk や ServiceNow などのサポートソリューションを使用して、この顧客がマルチステップ API テストを更新または保存できないことを報告すると、チケットを作成することができます。

チームは顧客に対して、テストが更新または保存されないことに関する追加のコンテキストを提供する可能性のある詳細情報 (特定のテスト ID や [Browser Dev Tools][2] を開いた状態の画面録画など) を要求する場合があります。コンソールエラーが記録されていない場合、チームはマルチステップ API テストの問題を調査し始めるためのヒントを得ることができません。

テクニカルソリューションズチームは、次のような質問を理解しようとすることがあります。

- 顧客が経験している正確なエラーは何ですか？
- 顧客は、コンソールエラーやエラーメッセージなど、特定の問題を示唆するアプリ内通知を見ていますか？
- 顧客はどのボタンを、どのような順序でクリックしましたか？顧客がボタンをクリックする前に、予期しないアクションが発生しましたか？

## 根本原因を調査してください {#investigate-the-root-cause}

もし、Datadog で顧客のユーザージャーニーを表示し、関連するバックエンドリクエストを確認する方法があれば、テクニカルソリューションチームはこの問題の原因についてより深く理解することができます。

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="RUM 表示するアクションに関連付けられた APM スタックトレース" style="width:100%;">}}

APM インテグレーションを使用すると、Web アプリケーションからのリクエストと対応するバックエンドトレースを接続して、RUM イベントから APM トレースデータにアクセスし、{{< ui >}}Errors{{< /ui >}} タブでバックエンドエラーを明らかにすることができます。

詳しくは、[RUM とトレースの接続][3]をご覧ください。

## セッションリプレイでユーザーセッションを閲覧してください {#watch-user-sessions-in-session-replay}

テクニカルソリューションチームは、Zendesk のようなサポートプラットフォームと、RUM & Session Replay のような Datadog 製品を接続する社内ツールを持っている場合があります。例えば、Zendesk 内のコンテキストリンクから [RUM エクスプローラー][4] にリダイレクトし、検索クエリにユーザー ID を自動入力することができます。イベントリストから個々のユーザーセッションをフィルタリングします。

テクニカルソリューションチームは、Session Replay を使用して Datadog でユーザー ジャーニーの再現を表示し、ブラウザ開発者ツールを使用してフロントエンドに表示される可能性のある追加のエラーにアクセスすることができます。フロントエンドのエラーとバックエンドのトレースにアクセスできるため、テクニカルソリューションチームは RUM & Session Replay と APM の統合を活用して、顧客の問題のトラブルシューティングを支援できます。

リプレイ記録があるユーザーセッションをクリックして、Datadog プラットフォーム上でのユーザーの行動を観察してください。Session Replay を使用することで、対応する RUM イベントを見つけ、マルチステップ API テストを保存するための特定の `click` アクションを特定することができます。UI で {{< ui >}}Save{{< /ui >}} をクリックすると、テストの構成を保存するためのバックエンド呼び出しがトリガーされます。

## バックエンドのトレースからエラーを発見してください {#uncover-errors-in-backend-traces}

マルチステップ API テストの APM トレースでエラーを調査している際、テクニカルソリューションチームは `​​https://properties.steps.items.properties.name/` 構成の `maxLength` に関連する `APIInvalidInputError` に遭遇する可能性があり、これがテストの保存失敗の根本原因であると考えられます。

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="RUM 表示するアクションに関連付けられた APM スタックトレース" style="width:100%;">}}

マルチステップ API テストが、ステップ名の文字数制限のために保存されませんでした。

## ユーザーの問題を解決してください {#resolve-user-problems}

この顧客の問題を解決するために、テクニカルソリューションチームは、テストを保存できない場合のコンテキストヘルプを備えたマルチステップ API テストワークフローの更新を製品チームに要求することができます。

また、Frontend チームには、テストステップ名の最大文字数制限を超えた場合にユーザーに通知されるように、UI にエラーメッセージを実装することも推奨されるかもしれません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/session_replay/
[2]: /ja/session_replay/dev_tools
[3]: /ja/real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer