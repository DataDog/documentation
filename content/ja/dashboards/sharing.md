---
title: 共有
kind: documentation
aliases:
  - /ja/graphing/faq/is-there-a-way-to-share-graphs
  - /ja/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
  - /ja/graphing/dashboards/shared_graph/
further_reading:
  - link: /dashboards/
    tag: ドキュメント
    text: Datadog でダッシュボードを作成
  - link: /dashboards/template_variables
    tag: ドキュメント
    text: テンプレート変数を使用してダッシュボードの機能を強化
  - link: /dashboards/widgets
    tag: ドキュメント
    text: ダッシュボードのウィジェットについて
---
## 概要

グラフやスクリーンボードを共有すると、メトリクス、トレース、ログを Datadog の外でビジュアルに表示できます。

## グラフ

### 共有

[タイムボード][1]または[スクリーンボード][2]からグラフを共有するには

2. 共有するグラフの右上隅にある鉛筆アイコンをクリックします。
3. *Graph your data* セクションで **Share** タブを選択します。
4. グラフのタイムフレームを選択します。
5. グラフサイズを選択します。
6. 凡例を入れるかどうかを選択します。
7. Generate embed code ボタンを使用して、埋め込みコードを取得します。

{{< img src="dashboards/sharing/share_graph.png" alt="グラフの共有"  style="width:75%;">}}

### 無効化

個々の（埋め込み）グラフの共有に使用されたキーを無効にするには

1. [**Integrations -> Embeds**][3] に移動して、すべての共有グラフのリストを表示します。
2. 共有を停止するグラフの横にある **Revoke** ボタンをクリックします。
3. グラフは **Revoked** リストに移動します。

## スクリーンボード

### 共有

公開 URL を生成して、スクリーンボード全体を共有します。

1. スクリーンボードのページで、右上の設定歯車をクリックします。
2. **Generate public URL** オプションを選択します。
3. [グローバルタイムセレクター][4]がアクティブな場合、パブリックスクリーンボードのグローバルタイム設定を選択します。
4. URL をコピーして、**Done** をクリックします。

作成された URL には、その特定のスクリーンボードのコンテンツへのライブの読み取り専用アクセスがあります。

**注**: スクリーンボード[テンプレート変数][5]セレクターは、パブリックスクリーンボードにはありません。テンプレート変数の値は、Datadog で設定されたデフォルト値です。さらに、APM およびログクエリに基づくウィジェットは、パブリックスクリーンボードにデータを表示しません。

### 無効化

共有スクリーンボードを無効にするには

1. [ダッシュボードリスト][6]に移動します。
2. アクセスを無効にするスクリーンボードを選択します。
3. 右上の設定歯車をクリックします。
4. **Configure sharing** をクリックします。
5. **Revoke public URL** をクリックします。

### 制限の適用

スクリーンボードへのアクセスを IP アドレスごとに制限できます。[Datadog サポート][7]に電子メールを送り、IP アドレスホワイトリスト機能を有効にしてください。管理者はこの機能を使用して、共有スクリーンボードにアクセスできる IP アドレスのリストを提供できます。有効にしたら、組織の[セキュリティページ][8]に対する制限を管理します。

### ダークモード

ダークモードは、個々のユーザーのパブリックスクリーンボードで利用できます。モードを切り替えるには、右上の太陽または月のアイコンをクリックします。さらに、URL パラメーター `theme` を使用できます。可能な値は `dark` と `light` です。

### TV モード

TV モードは、パブリックスクリーンボードで利用できます。キーボードショートカット `F` を使用するか、右上の TV アイコンをクリックします。

## API

Datadog には、共有グラフ（埋め込み）とやり取りするための[専用 API][9]が用意されています。

| エンドポイント                 | 説明                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [すべての埋め込みの取得][10]     | これまでに作成された埋め込み可能なグラフのリストを取得します。                     |
| [埋め込みの作成][11]       | 埋め込み可能なグラフを新しく作成します。                                         |
| [特定の埋め込みの取得][12] | `embed_id` を指定して、以前に作成した埋め込みの HTML フラグメントを取得します。 |
| [埋め込みの有効化][13]       | 特定の埋め込みを有効にします。                                             |
| [埋め込みの無効化][14]       | 特定の埋め込みを無効にします。                                             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/timeboard
[2]: /ja/dashboards/screenboard
[3]: https://app.datadoghq.com/account/settings#embeds
[4]: /ja/dashboards/screenboards/#global-time-selector
[5]: /ja/dashboards/template_variables
[6]: https://app.datadoghq.com/dashboard/lists
[7]: /ja/help
[8]: https://app.datadoghq.com/account/org_security
[9]: /ja/api/?lang=python#embeddable-graphs
[10]: /ja/api/?lang=python#get-all-embeds
[11]: /ja/api/?lang=python#create-embed
[12]: /ja/api/?lang=python#get-specific-embed
[13]: /ja/api/?lang=python#enable-embed
[14]: /ja/api/?lang=python#revoke-embed