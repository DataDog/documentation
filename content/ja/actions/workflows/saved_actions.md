---
algolia:
  tags:
  - workflow
  - workflows/
  - ワークフローの自動化
aliases:
- /ja/workflows/actions_catalog/action_blueprints/
- /ja/service_management/workflows/actions_catalog/saved_actions/
- /ja/service_management/workflows/actions/saved_actions/
- /ja/service_management/workflows/saved_actions
description: アクションとパラメーターの保存と再利用
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: ドキュメント
  text: インテグレーションについて
title: アクションの保存と再利用
type: documentation
---

アクションとそのパラメーターを保存して再利用するには、_Saved Actions_ 機能を使用します。保存したアクションを新しいステップとしてワークフローに挿入したり、既存のステップのパラメーターを入力したりできます。

## アクションの保存

1. ワークフローキャンバスから、保存したいアクションをクリックします。
1. **Saved Actions** アイコンをクリックし、**Save action configurations** を選択します。
1. アクションの名前と説明を入力します。
1. 組織内の誰でもアクションにアクセスできるようにしたい場合は、**Usable by others in the organization** (組織内の他の人が使用可能) に切り替えます。
1. アクションの構成詳細を検証し、**Save Action Configuration** をクリックします。

{{< img src="service_management/workflows/save_action.mp4" alt="後で使用するためにアクションを保存するには、Saved Action アイコンをクリックします。" video="true" width=80% >}}

## 保存したアクションをワークフローで使用する

保存したアクションをワークフローの新しいステップに追加するには
1. ワークフローキャンバスからプラス (`+`) アイコンをクリックし、Saved Actions を選択します。
1. 検索バーを使用するか、リストをブラウズして、探している Saved Action を見つけます。
1. Saved Action を選択し、ワークフローキャンバスの構成されたステップとして追加します。

保存したアクションを使用して既存のステップを構成するには
1. 事前構成済みのアクションを入力したいワークフローのステップを選択します。
1. **Saved Actions** アイコンをクリックし、**Configure using a saved action** を選択します。
1. ステップの構成に使用する Saved Action を選択し、**Use Saved Action** をクリックします。

## 保存したアクションの管理

[Action Catalog][1] タブから、Saved Action のプレビュー、編集、削除ができます。

保存したアクションを見つけるには
1. [Workflow Automation][2] ページから、[**Action Catalog**][1] をクリックします。
1. **Saved Actions** をクリックし、プレビュー、編集、または削除したい Saved Action のリストを参照します。
1. アクションにカーソルを合わせ、**Preview/Edit saved configurations** をクリックすると、アクションのプレビューが表示されます。
1. プレビュー画面でアクションを選択し、編集または削除します。

アクションを作成した本人でない場合、直接編集することはできません。代わりに **Clone** アイコンを選択してコピーし、構成を変更してください。自分が作成していないアクションを削除することはできません。

{{< img src="service_management/workflows/edit_saved_action.png" alt="アクションカタログから保存したアクションをプレビュー、編集、削除します。" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックがありますか？[Datadog Community Slack][3] の **#workflows** チャンネルに参加してください。

[1]: https://app.datadoghq.com/workflow/action-catalog
[2]: https://app.datadoghq.com/workflow/
[3]: https://datadoghq.slack.com/