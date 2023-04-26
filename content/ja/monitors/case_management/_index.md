---
further_reading:
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
kind: documentation
title: Case Management
---

## 概要

Datadog Case Management は、問題の追跡、トリアージ、トラブルシューティングを行うための一元的な場所を提供します。アラート、セキュリティシグナル、エラー追跡の問題からケースを作成し、調査することができます。

ケースをユーザーやチームに割り当てることで、ケースのライフサイクルを通じて継続する明確なオーナーシップラインを確立することができます。Datadog のグラフ、ログ、その他のテレメトリーデータ、およびメッセージングや問題追跡アプリなどの外部ツールからの情報をケースに反映させることができます。

## 表示、フィルター、管理

Service Management メニューから [Case Management][1] を探します。

### フィルターケース

**Inboxes** を使用して、ケースのリストを自分の仕事に最も関連性の高いものにフィルターすることができます。Datadog は、あなたに割り当てられたケース、あなたが作成したケース、あなたの[チーム][2]に関連するケースのフィルターを持つ受信トレイを自動的に作成します。

検索クエリに基づいてケースをフィルターするには、カスタム受信トレイを作成します。
1. [Case Management ページ][1]の **Other Inboxes** の横にある **Add** をクリックします。[Create a new inbox][3] ページが表示されます。
1. 受信トレイに**名前**を付けます
1. 検索ボックスで、クエリを入力します。**Inbox Preview** が更新され、現在の検索クエリに一致するケースが表示されます。
1. **Save Inbox** をクリックします。

### 一括アクション

[Case Management ページ][1]から、ケースの一括編集を行います。
1. チェックボックスを使用して、1 つまたは複数のケースを選択します。リストの上部が更新され、一括編集オプションが表示されます。
1. ドロップダウンメニューを使用して、**Set status**、**Assign**、**Set priority**、または **More actions** を実行します。または、**Archive** をクリックします。

## ケースの作成・更新

Datadog のいくつかの場所からケースを作成または更新することができます。
- アラート設定
- セキュリティシグナル
- エラー追跡
- Workflows
- Case Management ページ

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /ja/account_management/teams/
[3]: https://app.datadoghq.com/cases/contexts/new