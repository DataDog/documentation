---
further_reading:
- link: /dashboards/guide/graphing_json/
  tag: ガイド
  text: JSON を使用してダッシュボードを構築
title: Split Graph ウィジェット
widget_type: split_group
---

<div class="alert alert-info">Split Graph ウィジェットはスクリーンボードおよび<a href="/dashboards/sharing/shared_dashboards">共有ダッシュボード</a>ではサポートされていません。</div>

## 概要

Split Graph を使用すると、クエリを複数のタグ値ごとに分割して外れ値やパターンを特定できます。この機能を使用して、複数のファセットにわたるメトリクス パフォーマンスを調査したり、複数のタグにわたるイベントを比較したり、動的なビジュアライゼーションを作成できます。

## セットアップ

### Split Graph ウィジェットを作成

ウィジェット トレイのグループ セクションから Split Graph ウィジェットを選択し、ダッシュボードにドラッグすると、一から Split Graph を作成できます。これにより、クエリと分割ディメンションを同時に定義できます。設定オプションの詳細については、[設定](#configuration)セクションを参照してください。

### 既存のウィジェットから Split Graph を作成

既存のウィジェットをタグ値で分割し、**Split Graph** タブを使用して Split Graph を作成することもできます。**Split Graph** タブを開くには、次のいずれかを実行します。
- ダッシュボードに新しいウィジェットを追加し、クエリ エディタ上部の **Split Graph** タブをクリックします。
- ウィジェット コントロール オプションから編集または拡大アイコンを選択してウィジェットをフル スクリーン モードで開き、**Split Graph** タブをクリックします。
- ダッシュボード上のウィジェットのコンテキスト メニューを開き、**Split Graph** を選択します。

**Split Graph** タブでは、グラフの分割方法、グラフ数の上限、並び順を設定できます。
1. 分割ディメンション、表示するグラフ数、表示オプションを編集して Split を調整できます。設定オプションの詳細については、[設定](#configuration)セクションを参照してください。
2. **Save to Dashboard** をクリックすると、新しい Split Graph ウィジェットがダッシュボードの一番下に作成されます。元のウィジェットはダッシュボード上で変更されません。

### Datadog の他の場所から Split Graph を作成

アプリ内で複数値にわたる Split が表示されている場合、その表示をウィジェットとしてダッシュボードにエクスポートできます。
1. **Export to Dashboard** をクリックします。
1. エクスポート モーダルが開き、既存のダッシュボードを検索してウィジェットをエクスポートするか、このウィジェットを含む新しいダッシュボードを作成できます。

## 設定

Split Graph を一から作成する場合やダッシュボード上の既存の Split Graph を編集する場合、グラフと Split の両方を設定できます。

Split Graph エディタは、[**Edit Graph**](#edit-graph) と [**Split Graph**](#edit-split) の 2 つのセクションで構成されています。ウィジェット タイトルを追加するには、エディタ上部のテキスト入力を更新します。

**注**: ウィジェットから Split Graph を作成した場合、**Split Graph** タブでは Split のみを設定できます。クエリを編集するには、いつでも **Edit** タブをクリックしてください。

{{< img src="dashboards/widgets/split_graph/split_graph_tab.png" alt="Split Graph タブに Split Graph の設定オプションが表示される" style="width:100%;" >}}

### グラフを編集

分割する前にグラフ クエリを設定します。分割をサポートする任意の可視化タイプを選択し、グラフの表示方法を変更できます。標準のクエリ エディタと同様に、一からクエリを作成することも可能です。

これらの可視化タイプごとの詳細な設定オプションについては、[ウィジェット][1]ページの各ウィジェット ドキュメントを参照してください。

変更内容は、Split Graph エディタ モーダルの下部にある分割グラフに即座に反映されます。

{{< img src="dashboards/widgets/split_graph/split_graph_editor.png" alt="Split Graph エディタにグラフ クエリの設定と Split Graph の設定オプションが表示される" style="width:100%;" >}}

### グラフを分割

グラフの分割方法や、分割特有の表示オプションを設定するための入力項目が複数あります。

| 設定項目  | 説明     | 
| ---  | ----------- | 
| One graph per | 元のグラフを分割するディメンションを定義するドロップダウンです。  |
| Limit to | 表示するグラフ数と選択する値を指定するオプションです。デフォルトでは、Split Graph ウィジェットが平均値の高い値を動的に選択します。  |
| Sort by | グラフを並び替えるメトリクスまたは属性/ファセットを選択します。**custom** を選択すると、表示するタグを手動で選択できます。  |
| Show Controls | 利用可能なタグ値をすべて表示するサイドバーの表示/非表示を切り替えます。タグ値を手動で選択すると、分割が動的から静的に変わり、選択した値のみが表示されます。動的動作に戻すには、選択をクリアするか **Custom** ボタンをクリックして **Top** または **Bottom** を選択し、並び替えを再有効化します。 |
| Graph Setting | Split Graph 特有の表示オプションです</br>`Graph Size`: Split Graph ウィジェット内の個々のグラフ サイズを 4 種類から選択できます。</br>`Uniform Y-Axes`: ウィジェット内のグラフが同一の y 軸を使用するか、可読性を最大化するために個別に調整するかを選択します。 |

## API

このウィジェットは [Dashboards API][2] で使用できます。以下の表で[ウィジェット JSON スキーマ定義][3]を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/