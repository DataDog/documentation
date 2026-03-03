---
description: Error Tracking の Auto Assign について説明します。
further_reading:
- link: /error_tracking/suspect_commits/
  tag: ドキュメント
  text: 疑わしいコミット
- link: /error_tracking/issue_team_ownership/
  tag: ドキュメント
  text: Issue チーム オーナーシップ
title: 自動割り当て
---

## 概要

Auto Assign は、[疑わしいコミット][1] の作成者に issue を割り当てることで、トリアージを自動化します。

この機能により、関連コードを最も把握している開発者に issue が自動で割り当てられるため、手動のトリアージ作業を減らしつつ解決までの時間を短縮できます。自分のコードが原因の issue が発生すると、すぐに通知されます。

## セットアップ

設定して有効化すると、疑わしいコミットの分析結果に基づいて issue が開発者へ自動的に割り当てられます。

### Source Code Integration の設定

1. [Source Code Integration][2] が有効になっており、設定済みであることを確認してください。
2. [GitHub インテグレーション][3] をインストールしてください。
3. GitHub インテグレーションに求められる権限 (Contents, Members) がすべて付与されていることを確認してください。

**注**: Auto Assign を利用するには、Datadog アカウントと GitHub アカウントを連携させる必要があります。この接続は、スタック トレースのコード スニペットを初めて読み込んだ時点で確立されます。

## 仕組み

エラーが発生すると、Auto Assign は次を実行します:

1. スタック トレースを解析して疑わしいコミットを特定します。
2. そのコミットの作成者を特定します。
3. その開発者に issue を割り当て、通知を送信します。

## 割り当ての管理

Datadog では、各 issue の中で割り当て先の開発者を直接確認できます。必要に応じて、手動で再割り当てして自動割り当てを上書きすることもできます。

{{< img src="error_tracking/ownership-details.png" alt="issue の詳細に表示されるチーム オーナーシップ情報" style="width:80%;" >}}

# 構成

Datadog の [Error Tracking settings page](https://app.datadoghq.com/error-tracking/settings/issues/ownership) に移動して、Auto Assign の設定を管理してください。Auto Assign は、組織全体で一括して有効化 / 無効化できるほか、サービス単位で設定してより細かく制御することもできます。

{{< img src="error_tracking/ownership-config.png" alt="Issue Team Ownership の構成設定" style="width:80%;" >}}
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/error_tracking/suspect_commits/
[2]: /ja/integrations/guide/source-code-integration/
[3]: /ja/integrations/github/
[4]: https://app.datadoghq.com/integrations