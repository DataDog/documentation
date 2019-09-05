---
title: グラフの共有
kind: documentation
aliases:
  - /ja/graphing/faq/is-there-a-way-to-share-graphs
  - /ja/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Datadog でのダッシュボード作成方法
  - link: graphing/dashboards/template_variables
    tag: Documentation
    text: テンプレート変数でダッシュボードを強化する
  - link: graphing/widgets
    tag: Documentation
    text: ダッシュボードで利用できるすべてのウィジェット
---
## 概要

グラフやスクリーンボードを共有すると、Embed にアクセス制限を適用しつつ、メトリクス、トレース、ログを Datadog の外でビジュアルに表示できます。

## グラフの共有

[タイムボード][1]または[スクリーンボード][2]からグラフを共有するには

1. グラフを選択します。
2. 右上隅にある鉛筆アイコンをクリックして、グラフを編集します。
3. ステップ 2 の Graph your data で、**Share** タブを選択します。
4. グラフの固定タイムフレームを選択します。
5. グラフサイズを選択します。
6. 凡例を入れるかどうかを選択します。
7. Generate embed code ボタンを使用して、埋め込みコードを取得します。

{{< img src="graphing/dashboards/shared_graph/share_graph.png" alt="Shared graph" responsive="true" style="width:75%;">}}

**注**: APM クエリとログクエリには共有機能を使用できません。

## スクリーンボードの共有

次の手順でスクリーンボード全体を共有します。

1. 画面右上の設定歯車をクリックします。
2. Generate public URL オプションをクリックします。
3. 作成された URL を使用すると、このスクリーンボードの内容にだけ読み取り専用でライブアクセスできます。

**注**: [テンプレート][3]を有効にしている場合、共有ビューにテンプレート変数ドロップダウンは表示されず、APM クエリやログクエリに基づくウィジェットにデータは表示されません。

### 制限の適用

Embed へのアクセスを IP アドレスごとに制限できます。[Datadog のサポートチーム][4]に電子メールを送り、IP アドレスホワイトリスト機能を有効にしてください。管理者はこの機能を使用して、共有ダッシュボードにアクセスできる IP アドレスのリストを提供できます。

これらの共有グラフは、提供された iframe を使用して外部向けツールに埋め込んだり、テキストボックス内のソース URL を使用して直接共有したりすることができます。これを外部で使用するために特に必要なアクセス認証はありません。有効にした後の制限の管理は、[組織のセキュリティページ][5]で行います。

**注**: [ダッシュボードテンプレート変数][3]を有効にしている場合、共有ビューにテンプレート変数ドロップダウンは表示されません。オーガニゼーションの外でビューを共有する場合は、テンプレート変数を使用しないことをお勧めします。

## 共有グラフ/スクリーンボードの無効化

### 埋め込みグラフの無効化
グラフの共有に使用されたキーを無効にするには

1. [**Integrations -> Embeds** に移動して][6]、共有されているすべてのグラフをリストします。
2. 共有を停止するグラフの **Revoke** ボタンをクリックします。
3. グラフは **Revoked** リストに移動します。

{{< img src="graphing/dashboards/shared_graph/embedded_graphs.png" alt="Embedded graph" responsive="true" style="width:75%;">}}

### スクリーンボードの無効化

共有スクリーンボードを無効にするには

1. ダッシュボードリストに移動します。
2. アクセスを無効にするスクリーンボードを選択します。
3. 歯車をクリックして、編集します。
4. **Revoke public URL** をクリックします。

## API

Datadog には、Embed とやり取りするための[専用 API][7] が用意されています。

| エンドポイント                 | 説明                                                           |
| :---                     | :----                                                                 |
| [すべての Embed の取得][8]      | これまでに作成された埋め込み可能なグラフのリストを取得します。                  |
| [Embed の作成][9]        | 埋め込み可能なグラフを新しく作成します。                                       |
| [特定の Embed の取得][10] | embed_id を指定して、以前に作成した Embed の HTML フラグメントを取得します。 |
| [Embed の有効化][11]       | 特定の Embed を有効にします。                                             |
| [Embed の無効化][12]       | 特定の Embed を無効にします。                                             |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/dashboards/timeboard
[2]: /ja/graphing/dashboards/screenboard
[3]: /ja/graphing/dashboards/template_variables
[4]: /ja/help
[5]: https://app.datadoghq.com/account/org_security
[6]: https://app.datadoghq.com/account/settings#embeds
[7]: /ja/api/?lang=python#embeddable-graphs
[8]: /ja/api/?lang=python#get-all-embeds
[9]: /ja/api/?lang=python#create-embed
[10]: /ja/api/?lang=python#get-specific-embed
[11]: /ja/api/?lang=python#enable-embed
[12]: /ja/api/?lang=python#revoke-embed