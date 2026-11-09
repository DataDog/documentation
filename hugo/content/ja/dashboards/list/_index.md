---
description: リストによるダッシュボードの整理と管理
disable_toc: false
further_reading:
- link: dashboards/
  tag: ドキュメント
  text: ダッシュボードの概要
- link: dashboards/guide/maintain-relevant-dashboards
  tag: ガイド
  text: 適切なダッシュボードを維持するためのベストプラクティス
title: Dashboard List
---
## 概要 {#overview}

Dashboard List 機能を使用して、増え続けるダッシュボードコレクションを整理し、効率化します。ダッシュボードをリストにグループ化し、特定のチームに割り当て、重要なダッシュボードをお気に入りとしてマークすることで、主要なビジュアライゼーションに素早くアクセスできます。Teams によるフィルタリング、効率的な管理のための一括操作の実行、複数のダッシュボードへの Teams の割り当てなどの機能を使用して、ダッシュボードの整理をさらに進めます。[Dashboard List ページ][1]で、カスタムダッシュボードや統合ダッシュボードを簡単に探索、作成、管理できます。
ダッシュボードを表示および管理します。
- [{{< ui >}}All Dashboards{{< /ui >}}テーブルを使用して、リストの並べ替え、検索、グループ化を行います。](#view-all-dashboards)
- [リストを使用して、ダッシュボードの表示を整理します。](#lists)

## すべてのダッシュボードを表示{#view-all-dashboards}

{{< ui >}}All Dashboards{{< /ui >}}テーブルには、Datadog 組織内のダッシュボードが一覧表示されます。これには、カスタム作成されたものや、すぐに使用可能なダッシュボードが含まれます。テーブルで複数のダッシュボードを選択して、[Teams](#teams) をダッシュボードに関連付けたり、ダッシュボードを[リスト](#lists)に追加したりするなどの一括操作を実行します。

列ヘッダー {{< ui >}}Name{{< /ui >}}、{{< ui >}}Modified{{< /ui >}}、および {{< ui >}}Popularity{{< /ui >}} で並べ替えることができます。

| 列     | 説明                                                                              |
|------------|------------------------------------------------------------------------------------------|
| スター       | 現在のユーザーがスターを付けたすべてのダッシュボード。                                             |
| 名前       | カスタムダッシュボードまたはプリセットダッシュボードの名前。                                             |
| 作成者     | ダッシュボードの作成者のプロフィールアイコン。                                            |
| Teams      | ダッシュボードに割り当てられた [Teams][2]。                                                   |
| 更新日   | カスタムダッシュボードの最終更新日。                                           |
| 人気度 | 組織内でのダッシュボードの[人気度](#popularity)の相対的な値を示します。          |
| アイコン       | ダッシュボードの種類 (Timeboard または Screenboard) を示すアイコン。                    |


### 人気度 {#popularity}

組織で最も人気のあるダッシュボードには、5 つの人気度バーが表示されます。他のすべてのダッシュボードは、このダッシュボードを基準としています。人気度は、ダッシュボードが受け取るトラフィックの量に基づいています。人気度は毎日更新されます。新しいダッシュボードの人気度バーは、最大 24 時間ゼロのままです。

**注**: 公開ダッシュボード URL のトラフィックは、人気度に反映されません。

## Teams {#teams}

[team filter][3] を使用して、選択したチームが所有するダッシュボードのみを表示します。すべてのダッシュボードの表示に戻るには、選択を解除します。

1 つまたは複数のダッシュボードに関連するチームを編集するには、次の手順を実行します。
1. 変更したい各ダッシュボードの横にあるチェックボックスを選択します。
1. 右上にある {{< ui >}}Edit Teams{{< /ui >}} ドロップダウンを開きます。
1. チェックボックスを使用して、ダッシュボードの適切なチームを選択します。
1. {{< ui >}}Apply Changes{{< /ui >}} をクリックします。

## リスト {#lists}

ダッシュボードリストはダッシュボードをグループ化するため、ユーザーとチームは同一のコンテキスト内でダッシュボードを切り替えることができます。ダッシュボードを [プリセットリスト](#preset-lists) またはカスタムリストに追加できます。

1. Dashboard リストを作成するには、右上にある {{< ui >}}\+ New List{{< /ui >}} をクリックします。
1. 鉛筆アイコンをクリックして、リストのタイトルを変更します。リストのタイトルは、ユーザーの名前に基づいて自動的に設定されます。たとえば、`John's list`。
1. ダッシュボードをリストに追加します。[{{< ui >}}All Dashboards{{< /ui >}}](#view-all-dashboards) テーブルで、ダッシュボードタイトルの横にあるチェックボックスを選択します。次に、ダッシュボードリストの右上隅にある {{< ui >}}Add to{{< /ui >}} ドロップダウンをクリックして、リストを選択します。

左側のサイドバーにはすべてのリストが表示され、チームや検索語句でフィルタリングできます。{{< ui >}}Hide Controls{{< /ui >}} を切り替えて、このサイドバーを非表示にします。

###  お気に入りリスト {#favorite-lists}

お気に入りリストは、現在ログインしているユーザーがスターを付けたダッシュボードリストです。**注**: スターを付けたリストがない場合、{{< ui >}}Favorite Lists{{< /ui >}} カテゴリーは非表示になります。

###  プリセットリスト {#preset-lists}

プリセットリストは、Datadog ですぐに使えるダッシュボードリストです。

|  リスト |  説明 |
|--------------------------|---------------------------------------------------------------------------|
|  すべてのカスタム |  組織のアカウント内のチームメンバーによって作成されたカスタムダッシュボード。|
|  すべてのホスト |  ホストを追加すると Datadog で自動作成されるダッシュボード。             |
|  すべてのインテグレーション |  インテグレーションをインストールすると Datadog で自動作成されるダッシュボード。 |
|  すべての共有 |  認証済みまたは公開リンクの共有が有効になっているダッシュボード。            |
|  作成者: 自分 |  現在のユーザーによって作成されたカスタムダッシュボード。                           |
|  最近削除されたもの |  過去 30 日以内に削除されたダッシュボード。このリストから、[削除されたダッシュボードを復元](#restore-deleted-dashboards)します。|
|  Security and Compliance |  すぐに使用できる Security ダッシュボード。                                      |

###  削除されたダッシュボードの復元 {#restore-deleted-dashboards}

プリセットの {{< ui >}}Recently Deleted{{< /ui >}} リストを使用して、削除されたダッシュボードを復元します。リストから、復元するすべてのダッシュボードを選択し、{{< ui >}}Restore to{{< /ui >}} をクリックします。ダッシュボードの復元先となる特定のリストを選択するか、{{< ui >}}All Custom{{< /ui >}} を選択してカスタムリストなしで復元します。{{< ui >}}Recently Deleted{{< /ui >}} のダッシュボードは、30 日後に完全に削除されます。

{{< img src="dashboards/list/recently_deleted_restore.png" alt="最近削除したリストから削除されたダッシュボードを復元します。" style="width:100%;">}}

## 検索構文 {#search-syntax}

{{< callout url="#" btn_hidden="true" header="プレビュー" >}}
ダッシュボードの検索構文はプレビュー版です。
{{< /callout >}}

ダッシュボードリストページの上部にある検索バーを使用して、名前、作成者、タグ、またはウィジェットの内容でダッシュボードをフィルタリングします。この検索は、フリーテキストクエリ、キー: 値フィルター、ブール演算子、および範囲比較をサポートしています。

### フリーテキスト検索 {#free-text-search}

1 つ以上の単語を入力して、ダッシュボードのタイトル、説明、作成者名、タグ、およびウィジェットの内容を検索します。

- **単一トークン**: `redis` は、タイトル、作成者、タグ、またはウィジェットに "redis" が含まれるダッシュボードと一致します。
- **複数のトークン**: `redis postgres` は `redis AND postgres` と同等であり、両方のトークンが含まれている必要があります。
- **引用符で囲まれたフレーズ**: `"web latency"` は、その正確なフレーズと一致します。
- **ワイルドカード**: `elastic*` は、"elasticsearch"、"elastic-search" などと一致します。

### キー: 値フィルター {#keyvalue-filters}

`key:value` 構文を使用して、結果を特定のフィールドに絞り込みます。

| フィルター | 説明 | 例 |
|--------|-------------|---------|
| `author:<value>` | 作成者のハンドルまたは表示名が | `author:jane.doe` | と一致するダッシュボード
| `title:<value>` | ダッシュボードのタイトル | `title:elasticsearch` |
| `description:<value>` | ダッシュボードの説明 | `description:latency` |
| `team:<value>` | チームのタグ | `team:dashboards-backend` |
| `favorites:true` | スターを付けたダッシュボード | `favorites:true` |
| `type:<value>` | ダッシュボードの種類です。`custom`、`integration`、または `custom_timeboard`、`custom_screenboard`、`integration_timeboard`、`integration_screenboard` などの具体的な値を使用します。| `type:integration` |
| `is_shared:true` | リンク共有が有効なダッシュボード | `is_shared:true` |
| `popularity:<range>` | 人気度スコア (0〜1) | `popularity:>=0.5` |
| `widgets.count:<range>` | ウィジェットの数| `widgets.count:<5` |
| `widgets.title:<value>` | ウィジェットタイトル| `widgets.title:cpu` |
| `widgets.type:<value>` | ウィジェットタイプ| `widgets.type:geomap` |
| `widgets.metrics:<value>` | ウィジェットで使用されるメトリクス| `widgets.metrics:system.cpu.user` |
| `template_variables.name:<value>` | テンプレート変数名| `template_variables.name:service` |
| `template_variables.prefix:<value>` | テンプレート変数のプレフィックス| `template_variables.prefix:env` |
| `template_variables.defaults:<value>` | テンプレート変数のデフォルト値| `template_variables.defaults:prod` |
| `template_variables.available_values:<value>` | 利用可能なテンプレート変数の値| `template_variables.available_values:us-east` |

### ブール演算子 {#boolean-operators}

フィルターを `AND`、`OR`、および `NOT` で結合します (大文字と小文字を区別します)。`-` プレフィックスと `!` プレフィックスは `NOT` と同等です。

| 演算子 | 説明 | 例 |
|----------|-------------|---------|
| `AND` | 両方の条件が一致する必要があります | `type:integration AND team:platform` |
| `OR` | いずれかの条件が一致する必要があります | `k8s OR kubernetes` |
| `NOT` / `-` / `!` |  一致するダッシュボードを除外します | `NOT type:integration` |
| `field:(A OR B)` | 単一フィールド内のいずれかの値に一致します | `team:(backend OR frontend)` |

### 範囲演算子{#range-operators}

数値フィールドには `<`、`>`、`<=`、および `>=` を使用します。

| フィルター | 説明 | 例 |
|--------|-------------|---------|
| `widgets.count:<N` | N 個未満のウィジェット | `widgets.count:<3` |
| `widgets.count:>=N` | N 個以上のウィジェット | `widgets.count:>=10` |
| `popularity:>=N` | しきい値以上の人気度 | `popularity:>=0.2` |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /ja/account_management/teams/
[3]: /ja/account_management/teams/#team-filter