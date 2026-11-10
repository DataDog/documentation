---
aliases:
- /ja/actions/datastore/create
description: プライマリキーを持つ Datastores を作成し、初期データをシードし、手動編集またはファイルアップロードによって Datastore
  のコンテンツを管理します。
disable_toc: false
further_reading:
- link: actions/app_builder/build
  tag: ドキュメント
  text: アプリの構築
- link: actions/workflows/build
  tag: ドキュメント
  text: Workflows の構築
- link: https://www.datadoghq.com/blog/datadog-datastore/
  tag: ブログ
  text: Datastore を使用して自動化された Workflows やアプリを強化する
title: Datastores の作成と管理
---
[Datastores ページ][1] から Datastores を作成および管理できます。

## Datastore を作成する {#create-a-datastore}

Datastore を作成するには:

1. [Datastores ページ][1]に移動します。
1. [{{< ui >}}\+ New Datastore{{< /ui >}}] をクリックします。
1. Datastore の {{< ui >}}Name{{< /ui >}} を入力します。
1. {{< ui >}}Primary Key{{< /ui >}} を入力するか、ユースケースでプライマリキーが不要な場合は {{< ui >}}Autogenerate a Primary Key{{< /ui >}} のオプションを切り替えます。
   - プライマリキーを入力する場合、そのキーはデータ内の列名である必要があり、各キーの値は一意である必要があります。
   - キーの自動生成を選択すると、Datastore に新しいアイテムを追加する際に独自のキーを指定することはできなくなりますが、既存のアイテムについてはキーを指定して更新することが可能です。
1. 必要に応じて、Datastore の [{{< ui >}}Description{{< /ui >}}] を入力します。
1. _オプションで_、JSON または CSV ファイルから初期データを Datastore にシードできます。以下のいずれかの方法でファイルの内容をアップロードしてください。
   * ファイルを UI にドラッグアンドドロップする。
   * [{{< ui >}}browse files{{< /ui >}}] をクリックして、パソコンからファイルを参照して選択する。
   * パソコン上の CSV ファイルをコピーし、<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> を使って貼り付ける。

   CSV または JSON ファイルには、プライマリキーと一致する列名を含むヘッダー行が必要です。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。確認のポップアップウィンドウが表示され、Datastor から[ワークフローまたはアプリを作成][2]するか、Datastore を表示するといったオプションを選択できます。

### アプリまたはワークフローから作成する {#create-from-an-app-or-workflow}

Datastore のアクションで {{< ui >}}Datastore ID{{< /ui >}} ボタンをクリックし、[{{< ui >}}New Datastore{{< /ui >}}] を選択することで、アプリまたはワークフローから Datastore を作成できます。

{{< img src="actions/datastore/datastore-create.png" alt="[New Datastore] をクリックしてワークフローから Datastore を作成する" style="width:100%;" >}}

## Datastore を編集する{#edit-a-datastore}

### データを手動で編集する {#manually-edit-your-data}

Datastore 内の行を手動で編集するには:
1. [Datastores ページ][1]で、対象の Datastore を見つけてクリックして開きます。
1. 変更する行にカーソルを合わせ、[{{< ui >}}Edit{{< /ui >}}] アイコンをクリックします{{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 。
1. {{< ui >}}JSON{{< /ui >}} または {{< ui >}}Raw text{{< /ui >}} タブを使用して、行内のキーを編集します。

**注:** 行のプライマリキーを手動で編集することはできません。プライマリキーを編集する必要がある場合は、行を削除して追加し直すか、ファイルからデータを再アップロードします。

### ファイルを使用して更新する {#update-using-a-file}

ファイルを使用して Datastore を更新するには:
1. [Datastores ページ][1]で、対象の Datastore を見つけてクリックして開きます。
1. [{{< ui >}}Add Data{{< /ui >}}] をクリックします。
1. データの処理方法のオプションを選択します。
   - [{{< ui >}}Overwrite{{< /ui >}}] を選択すると、テーブル内の既存の行がファイルのデータに置き換えられます。
   - [{{< ui >}}Append{{< /ui >}}] を選択すると、ファイル内の行が既存のデータセットに追加されます。追加オプションでは、データセットに重複するエントリを追加することはできません。
1. [{{< ui >}}Add{{< /ui >}}] をクリックします。

## Datastore を表示する {#view-a-datastore}

Datastore を表示するには、[Datastores ページ][1]で対象の Datastore を見つけてクリックし、表示します。

Datastore を開いた後、以下の操作が可能です。
- データセットを JSON または CSV ファイルにエクスポートする。
- [{{< ui >}}Columns{{< /ui >}}] をクリックして、テーブル列の表示と非表示を切り替える。
- [{{< ui >}}Create{{< /ui >}}] をクリックして、Datastore から[ワークフローまたはアプリを作成][2]する。
- [{{< ui >}}Add data{{< /ui >}}] をクリックして、CSV または JSON ファイルから[データを追加](#edit-a-datastore)する。

{{< ui >}}Table Options{{< /ui >}} ボタンを使用すると、以下の操作が可能です。
- [Datastore の権限][3]を編集する。
- Datastore の UUID をコピーする。これは[複数の Datastore 参照を持つアプリ][4]で役立ちます。
- Datastore を複製する。
- Datastore を削除する。

## 制限事項 {#limitations}

Datastore には以下の制限があります。

- Datastore には最大 100,000 行を格納できます。
- `string` 型のプライマリキー列が必要で、各行を一意に識別する必要があります。
- 各行のサイズは最大 100 KB までです。
- プライマリキーの値は不変であり、行の作成後に変更することはできません。

これらの制限を超えるユースケースがある場合は、[サポート][5]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /ja/actions/datastore/use#create-workflow-app
[3]: /ja/actions/datastore/auth/
[4]: /ja/actions/datastore/use#multiple-datastores
[5]: /ja/help/