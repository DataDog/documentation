---
description: ジャーニーおよびリンクされたアセットへのアクセスを制御するロール、権限、および制限ポリシーを確認します。
further_reading:
- link: /journey_monitoring/
  tag: ドキュメント
  text: Journey Monitoring について
- link: /journey_monitoring/configuring_journeys/
  tag: ドキュメント
  text: Datadog Journey Monitoring でジャーニーを構成する
- link: /account_management/rbac/permissions/
  tag: ドキュメント
  text: Datadog ロール権限の全リストを確認する
title: ジャーニーのロールと権限
---
## 概要 {#overview}

ジャーニーには、[Product Analytics][2]、[Real User Monitoring (RUM)][3]、および [Synthetic Monitoring & Testing][4] のアセットを含めることができます。ジャーニーまたはそのアセットのいずれかを管理するには、対応する [Journey Monitoring の権限][1]と製品権限が必要です。

## ジャーニーの作成と編集 {#create-and-edit-journeys}

| アクション | 必要なアクセス権 |
|--------|-----------------|
| ジャーニーの作成または編集 | Journey Monitoring write |
| ジャーニーの [Synthetic テストスイート][5]の作成 | Journey Monitoring write および Synthetic Monitoring write |
| [RUM オペレーション][6]のリンクまたは編集 | Journey Monitoring write および RUM write |

ジャーニーを作成するには、Journey Monitoring write アクセス権があれば十分です。Datadog が Synthetic テストスイートを作成するのは、Synthetic Monitoring write アクセス権も持っている場合のみです。それ以外の場合、Datadog はテストスイートなしでジャーニーを作成します。必要なアクセス権を取得して、後からテストスイートを追加してください。

## ジャーニーとリンクされたアセットを表示する {#view-journeys-and-linked-assets}

| アクション | 必要なアクセス権 |
|--------|-----------------|
| イベントベースのジャーニーとその詳細を表示する | Journey Monitoring read およびジャーニーの RUM アプリケーションに対する RUM read |
| Synthetics のみのジャーニーを表示する | Journey Monitoring read |
| テストスイート、そのテスト、および [アップタイム SLO][7] を表示する | Synthetic Monitoring read およびスイートに対する読み取り制限ポリシー |
| リンクされた RUM オペレーションを表示する | Journey Monitoring read および RUM read |
| オペレーションの SLO を表示する | SLO read |
| ジャーニーの [Session Replays][8] を表示する | RUM データアクセス制御の対象となる RUM read |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#digital-experience-monitoring
[2]: /ja/product_analytics/
[3]: /ja/real_user_monitoring/
[4]: /ja/synthetics/
[5]: /ja/synthetics/test_suites/
[6]: /ja/real_user_monitoring/operations_monitoring/
[7]: /ja/synthetics/test_suites/#service-level-objectives
[8]: /ja/session_replay/