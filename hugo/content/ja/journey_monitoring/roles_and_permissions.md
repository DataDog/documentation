---
description: ジャーニーおよびリンクされたアセットへのアクセスを制御するロール、権限、および制限ポリシーを確認します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/guide/configuring_journeys/
  tag: ドキュメント
  text: Datadog Journey Monitoring でジャーニーを設定します
- link: /account_management/rbac/permissions/
  tag: ドキュメント
  text: Datadog ロール権限の全リストを確認します
title: ロールと権限
---
## 概要 {#overview}

ジャーニーは、Product Analytics、RUM、および Synthetic Monitoring のアセットを接続します。ほとんどのアクションには、Journey Monitoring 権限と、そのアクションが操作する基盤となるアセットの権限の両方が必要です。

## ジャーニーの作成と編集 {#create-and-edit-journeys}

| アクション | 必要なアクセス権 |
|--------|-----------------|
| ジャーニーの作成または編集 | [Journey Monitoring write][perms] |
| ジャーニーの Synthetic テストスイートの作成 | [Journey Monitoring write][perms] および Synthetic Monitoring write |
| コンバージョン率モニターの追加または編集 | [Journey Monitoring write][perms] および monitor write |
| ジャーニー SLO の追加または編集 | [Journey Monitoring write][perms] および SLO write |
| 強くリンクされた RUM 操作の編集 | [Journey Monitoring write][perms] および RUM write |

アセットの作成はベストエフォート型です。[Journey Monitoring write][perms] アクセス権のみでもジャーニーの作成は成功します。Datadog は、そのアセットの権限も保持している場合にのみ、テストスイートなどのリンクされたアセットを作成します。それ以外の場合、Datadog はそれをスキップし、後で追加することができます。テストスイートのないジャーニーも有効な状態です。

## ジャーニーとリンクされたアセットを表示する {#view-journeys-and-linked-assets}

| アクション | 必要なアクセス権 |
|--------|-----------------|
| ジャーニーとその詳細を表示する | [Journey Monitoring read][perms] およびジャーニーの RUM アプリケーションに対する RUM read |
| テストスイート、そのテスト、およびアップタイム SLO を表示する | Synthetic Monitoring read およびスイートに対する読み取り制限ポリシー |
| 強くリンクされた RUM 操作を表示する | [Journey Monitoring read][perms] および RUM read |
| 操作の SLO を表示する | SLO read |
| ジャーニーセッションのリプレイを表示する | RUM read (RUM データアクセス制御の対象) |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[perms]: /account_management/rbac/permissions/#digital-experience-monitoring