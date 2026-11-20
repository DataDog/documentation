---
description: 複数の App Builder アプリケーション間で、コンポーネントとクエリのグループをモジュール式テンプレートとして保存し、再利用します。
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
- link: /actions/app_builder/queries/
  tag: ドキュメント
  text: クエリ
title: 再利用可能なモジュール
---
_再利用可能なモジュール_機能を使用して、コンポーネントとクエリのグループをテンプレートとして保存し、App Builder アプリケーション間で再利用します。モジュールにはすべての依存関係が自動的に含まれるため、コンポーネントは正しく機能します。

<div class="alert alert-info">デフォルトのモジュールは読み取り専用です。デフォルトのモジュールを変更するには、まず複製します。</div>

## 再利用可能なモジュールを作成する {#create-a-reusable-module}

再利用可能なモジュールを作成するには、3 つの方法があります。

### コンポーネントパネルから {#from-the-components-panel}
1. アプリの編集中に、展開アイコン (<i class="icon-expand-to-left-wui" style="position:relative; top:4px;"></i>) をクリックしてコンポーネントパネルを開きます。
2. コンポーネントをクリックして選択します。
3. コンポーネントパネルで、メニューアイコン (<i class="icon-config-1" style="position:relative; top:4px;"></i>) をクリックします。
4. {{< ui >}}Create Module{{< /ui >}} をクリックします ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}})。
5. [モジュールの構成][3]。

### コンポーネントのインスタンス名タブから {#from-a-components-instance-name-tab}
1. アプリの編集中に、アプリキャンバス上でコンポーネントを選択します。
2. コンポーネントインスタンス名タブで {{< ui >}}Create Module{{< /ui >}} アイコンをクリックします ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}})。
3. [モジュールの構成][3]。

### 選択したコンポーネントから {#from-selected-components}
1. アプリの編集中に Shift キーを押しながら複数のコンポーネントをクリックして選択します。
2. 右側に表示されるサイドパネルで、{{< ui >}}Create Module{{< /ui >}} をクリックします ({{< img src="actions/app_builder/reusable-module-icon.svg" inline="true">}})。

## モジュールの構成 {#configure-a-module}

モジュールの作成中、モジュールエディターでは、保存前にコンポーネントとクエリのプレビュー、名前と説明の追加、依存関係の確認を行うことができます。

{{< img src="actions/app_builder/app-builder-reusable-module-preview.png" alt="モジュールエディターには、コンポーネントとクエリのプレビューおよび名前と説明フィールドが表示されます。" style="width:100%;">}}

1. 名前と説明を入力します。
2. 自動的に含まれるコンポーネントとクエリを確認します。システムには、ネストされたすべてのクエリの依存関係が含まれます。
3. {{< ui >}}Save Module{{< /ui >}} をクリックします。

## アプリに再利用可能なモジュールを追加する {#add-a-reusable-module-to-an-app}
1. アプリの編集中に、コンポーネントの追加アイコン (<i class="icon-component-wui" style="position:relative; top:4px;"></i>) をクリックします。
2. {{< ui >}}Modules{{< /ui >}} セクションで、モジュールをクリックするか、アプリのキャンバスにドラッグします。


## モジュールの削除 {#delete-a-module}
1. アプリの編集中に、コンポーネントの追加アイコン (<i class="icon-component-wui" style="position:relative; top:4px;"></i>) をクリックします。
2. {{< ui >}}Modules{{< /ui >}} セクションで、削除するモジュールの編集アイコン ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}) をクリックします。
3. モジュールエディターで、{{< ui >}}Delete Module{{< /ui >}} をクリックします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][2] の **#app-builder** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://chat.datadoghq.com/
[3]: /ja/actions/app_builder/components/reusable_modules/#configure-a-module