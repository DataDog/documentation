---
algolia:
  tags:
  - app builder
  - actions
description: アクションとパラメーターの保存と再利用
disable_sidebar: false
disable_toc: false
further_reading:
- link: /actions/workflows/actions/
  tag: ドキュメント
  text: ワークフローのアクションについて学ぶ
- link: /integrations/
  tag: ドキュメント
  text: インテグレーションについて学ぶ
title: アクションの保存と再利用
type: documentation
---
_Saved Actions_ 機能を使用して、アクションのコピーを保存し、再利用します。保存したアクションを新しいステップとしてアプリに挿入したり、保存したアクションを使用して既存のステップのパラメーターを入力したりできます。

<div class="alert alert-info">アクションを保存できるのは、そのアプリの <a href="https://docs.datadoghq.com/actions/app_builder/access_and_auth/#app-permissions"><b>Editor</b> アクセス権がある場合のみです。</a>。</div>

## アクションの保存 {#save-an-action}

1. Datadog で、[**Actions** > **App Builder**][1] に移動し、アプリにカーソルを合わせます。そのアプリのアクションアイコンが {{< ui >}}Last Saved{{< /ui >}} 列の下に表示されます。{{< ui >}}Edit{{< /ui >}} アイコンをクリックします{{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 。
1. {{< ui >}}Actions{{< /ui >}} メニューを、{{< img src="icons/kebab.png" inline="true" style="width:14px;">}} 次に {{< ui >}}Save Action{{< /ui >}} をクリックします。
1. アクションの名前と説明を入力します。
1. 組織内の他のユーザーがアクションにアクセスできるようにする場合は、{{< ui >}}Usable by others in the organization{{< /ui >}} に切り替えます。
1. アクションの構成詳細を検証し、{{< ui >}}Save Action Configuration{{< /ui >}} をクリックします。

## アプリで保存したアクションの使用 {#use-a-saved-action-in-your-app}

1. Datadog で、[**Actions** > **App Builder**][1] に移動し、アプリにカーソルを合わせて {{< ui >}}Edit{{< /ui >}} アイコンをクリックします{{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 。
1. {{< ui >}}Actions{{< /ui >}} メニューをクリックし、{{< img src="icons/kebab.png" inline="true" style="width:14px;">}} {{< ui >}}Use Saved Actions{{< /ui >}} を選択します。
1. リストをブラウズして、探している保存したアクションを見つけます。
1. 保存したアクションを選択し、アプリ内の構成されたステップとして追加します。

## 保存したアクションの管理 {#manage-a-saved-action}

Action Catalog から、保存したアクションを編集、複製、または削除することができます。

<div class="alert alert-info">アクションを作成していない場合、そのアクションを直接削除したり、編集したりすることはできません。代わりに、<b>Clone</b> アイコンを選択して{{< img src="icons/clone-alert-blue.png" inline="true" style="width:14px;">}} アクションをコピーし、構成を変更してください。</div>

保存したアクションを見つけるには:
1. Datadog で、[**Action Catalog**][2] に移動します。
1. [{{< ui >}}Saved Actions{{< /ui >}}] をクリックします。
1. 保存したアクションのリストをブラウズするか、検索バーを使用して名前でアクションを検索します。保存したアクションを編集、複製、または削除するには、そのアクションにカーソルを合わせます。
1. {{< ui >}}Manage Saved Actions{{< /ui >}} をクリックします。
1. アイコンを選択して、保存したアクションを編集、 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}複製、 {{< img src="icons/clone.png" inline="true" style="width:14px;">}}または削除します {{< img src="icons/delete.png" inline="true" style="width:14px;">}} 。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][3] の **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://chat.datadoghq.com/