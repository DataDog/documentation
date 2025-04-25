---
aliases:
- /ja/service_management/workflows/datastore/
- /ja/service_management/app_builder/datastore/
disable_toc: false
further_reading:
- link: service_management/app_builder/build
  tag: ドキュメント
  text: アプリの構築
- link: service_management/workflows/build
  tag: ドキュメント
  text: ワークフローの構築
title: データストア
---

{{< callout url="https://docs.google.com/forms/d/1NvW3I0Ep-lQo4FbiSwOEjccoFsS9Ue2wYiYDmCxKDYg/viewform?edit_requested=true" btn_hidden="false" header="プレビューを試してみましょう！">}}
データストアはプレビュー版です。こちらのフォームからアクセスをリクエストしてください。
{{< /callout >}}

## 概要

Actions データストアは、Datadog の App Builder とワークフロー自動化製品内で拡張性のある構造化データストレージソリューションを提供します。これは CRUD (Create, Read, Update, Delete) 操作をサポートし、外部データベースを必要とせず永続的なデータを最適に保存するために、Datadog のエコシステムとシームレスに統合されます。

データストアにはアプリやワークフロー、あるいは Datadog アプリの UI を使用してアクセスできます。


## 前提条件

Actions データストアを操作するには、Datadog アカウントに以下の[権限][6]が必要です (Datadog Standard Role に含まれています):

* `actions_datastore_read` - Actions データストア内のデータを読み取る権限。
* `actions_datastore_write` - データストア内のデータを追加、編集、削除するなど、データを変更する権限。

[Actions データストア UI][1] を使用する場合、Datadog Standard Role に含まれる以下の権限も必要です:

* `actions_datastore_manage` - データストア自体の作成、更新、削除など、Actions データストアを管理する権限。


## データストアを作成する

データストアを作成するには:

1. [Datastore ページ][1]に移動します。
1. **+ New Datastore** をクリックします。
1. データストアに **Name** (名前) 、**Primary Key** (主キー) 、任意で **Description** (説明) を入力します。Primary Key は、各行が固有の値を持つ列名である必要があります。
1. _オプション_ で、データストアに初期データを読み込むには、以下のいずれかの方法で CSV ファイルをコピーします:
   * UI にファイルをドラッグ＆ドロップする。
   * **browse files** をクリックして、コンピュータ上のファイルを選択する。
   * コンピュータ上の CSV ファイルをコピーし、<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> で貼り付ける。

   CSV ファイルにはヘッダー行が含まれており、その中に Primary Key と一致する列が存在する必要があります。
1. **Create** をクリックします。
1. リストにデータストアを表示するには、**Refresh Results** をクリックします。

データストアにデータを追加した後、以下の操作ができます:

* ヘッダーの **Search** ボックスを使用してデータストアを検索する。
* 列名をクリックして、その列のデータでソートする。


## データストアを編集する

データストアを編集するには、[Datastore ページ][1]で該当のデータストアを探します。以下の操作が可能です:

* 行を追加する場合は、**+ (プラス)** アイコンをクリックします。各フィールドの値を入力し、**Create** をクリックします。
* 既存の行の主キー以外の値を編集するには、該当行にカーソルを合わせ、**Pencil (Edit)** アイコンをクリックします。変更したい値を編集し、**Save** をクリックします。
* 既存の行を削除するには、該当行にカーソルを合わせ、**Trash (Delete)** アイコンをクリックします。確認画面で **Delete** をクリックします。


## データストアを参照する

ワークフローまたはアプリでデータストアの値を使用するには:

1. [Datastore ページ][1]で目的のデータストアを探します。
1. データストアのヘッダーにある **Copy Datastore UUID** ボタンをクリックします。
1. この UUID を使用して、ワークフローまたはアプリでデータストアを参照します。[Delete item][2]、[Get item][3]、[List items][4]、あるいは [Put item][5] アクションを使用し、**Datastore ID** に UUID を指定してください。


## データストアを削除する

データストアを削除するには、削除したいデータストアのヘッダーにある **Trash (Delete Datastore)** アイコンをクリックし、**Confirm** をクリックして確定します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/datastore
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.deleteDatastoreItem
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.getDatastoreItem
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.listDatastoreItems
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.dd.apps_datastore/com.datadoghq.dd.apps_datastore.putDatastoreItem
[6]: /ja/account_management/rbac/permissions/?tab=ui#app-builder--workflow-automation