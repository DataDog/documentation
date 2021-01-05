---
title: 共有
kind: documentation
aliases:
  - /ja/graphing/faq/is-there-a-way-to-share-graphs
  - /ja/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
  - /ja/graphing/dashboards/shared_graph/
further_reading:
  - link: 'https://www.datadoghq.com/blog/dashboard-sharing/'
    tag: ブログ
    text: ダッシュボードを組織外の人と安全に共有する
  - link: /dashboards/
    tag: ドキュメント
    text: Datadog でダッシュボードを作成
  - link: /dashboards/template_variables/
    tag: ドキュメント
    text: テンプレート変数を使用してダッシュボードを強化
  - link: /dashboards/widgets/
    tag: Documentation
    text: ダッシュボードのウィジェットについて
---
## 概要

ダッシュボードやグラフを共有すると、メトリクス、トレース、ログを Datadog の外でビジュアルに表示できます。

## ダッシュボード
URL またはメールリンクでダッシュボードを共有すると、共有ページにはそのダッシュボードのライブの読み取り専用コンテンツが表示されます。

### パブリック URL でダッシュボードを共有する

ダッシュボード全体を公開して共有するには、次の URL を生成します。

1. ダッシュボードのページで、右上の設定歯車をクリックします。
2. **Generate public URL** を選択します。
3. **Time & Variable Settings** で、タイムフレームの希望オプションと、ユーザーがそれを変更できるかどうか、および選択可能なテンプレート変数に表示されるタグを構成します。
4. URL をコピーして、**Done** をクリックします。

### ダッシュボードを個々のメールアドレスと共有する

1 つ以上の特定のメールアドレスを承認してダッシュボードページを表示するには

1. ダッシュボードのページで、右上の設定歯車をクリックします。
2. **Generate public URL** を選択します。
3. このダッシュボードにアクセスできるユーザーを指定するには、**Only specified people** を選択します。
4. ダッシュボードを共有したい人のメールアドレスを入力します。
5. **Time & Variable Settings** で、タイムフレームの希望オプションと、ユーザーがそれを変更できるかどうか、および選択可能なテンプレート変数に表示されるタグを構成します。
6. (オプション) URL をコピーして共有できます。指定されたメールアドレスにもリンク付きのメールが届きます。
7. **Done** をクリックします。

**注**: APM トレースクエリに基づくウィジェットは、公開ダッシュボードにデータを表示しません。ログストリームウィジェットにもデータは表示されませんが、他のログベースのクエリには表示されます。

### 無効化

共有ダッシュボードを無効にするには

1. [ダッシュボードリスト][1]に移動します。
2. アクセスを無効にするダッシュボードを選択します。
3. 右上の設定歯車をクリックします。
4. **Configure sharing** をクリックします。
5. **Revoke public URL** をクリックします。

## グラフ

### 共有

[タイムボード][2]または[スクリーンボード][3]からグラフを共有するには

2. 共有するグラフの右上隅にある鉛筆アイコンをクリックします。
3. *Graph your data* セクションで **Share** タブを選択します。
4. グラフのタイムフレームを選択します。
5. グラフサイズを選択します。
6. 凡例を入れるかどうかを選択します。
7. Generate embed code ボタンを使用して、埋め込みコードを取得します。

{{< img src="dashboards/sharing/share_graph.png" alt="グラフの共有"  style="width:75%;">}}

### 無効化

個々の（埋め込み）グラフの共有に使用されたキーを無効にするには

1. [**Integrations -> Embeds**][4] に移動して、すべての共有グラフのリストを表示します。
2. 共有を停止するグラフの横にある **Revoke** ボタンをクリックします。
3. グラフは **Revoked** リストに移動します。

### 制限の適用

ダッシュボードへのアクセスを IP アドレスごとに制限できます。[Datadog サポート][5]にメールを送信し、IP アドレスにリスト機能が含まれるよう依頼すると、管理者はこの機能を使用して、共有ダッシュボードにアクセスできる IP アドレスのリストを提供できます。これが有効にした後に、組織の[セキュリティページ][6]に対する制限を管理します。

### ダークモード

ダークモードは、個々のユーザーの公開ダッシュボードで利用できます。モードを切り替えるには、右上の太陽または月のアイコンをクリックします。さらに、URL パラメーター `theme` も使用できます。可能な値は `dark` と `light` です。

### TV モード

TV モードは、パブリックスクリーンボードで利用できます。キーボードショートカット `F` を使用するか、右上の TV アイコンをクリックします。

## API

Datadog には、共有グラフ（埋め込み）とやり取りするための[専用 API][7] が用意されています。

| エンドポイント                 | 説明                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [すべての Embed の取得][8]     | これまでに作成された埋め込み可能なグラフのリストを取得します。                     |
| [Embed の作成][9]       | 埋め込み可能なグラフを新しく作成します。                                         |
| [特定の Embed の取得][10] | `embed_id` を指定して、以前に作成した埋め込みの HTML フラグメントを取得します。 |
| [Embed の有効化][11]       | 特定の埋め込みを有効にします。                                             |
| [Embed の無効化][12]       | 特定の埋め込みを無効にします。                                             |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /ja/dashboards/timeboard/
[3]: /ja/dashboards/screenboard/
[4]: https://app.datadoghq.com/account/settings#embeds
[5]: /ja/help/
[6]: https://app.datadoghq.com/account/org_security
[7]: /ja/api/v1/embeddable-graphs/
[8]: /ja/api/v1/embeddable-graphs/#get-all-embeds
[9]: /ja/api/v1/embeddable-graphs/#create-embed
[10]: /ja/api/v1/embeddable-graphs/#get-specific-embed
[11]: /ja/api/v1/embeddable-graphs/#enable-embed
[12]: /ja/api/v1/embeddable-graphs/#revoke-embed