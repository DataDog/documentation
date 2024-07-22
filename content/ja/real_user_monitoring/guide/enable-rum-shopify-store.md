---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: RUM とセッションリプレイを製品分析に活用する
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: コンバージョン率でアラートを出す
title: Shopify ストアで RUM を有効にする
---

## 概要

オンラインストアを成功させるには、顧客がどのように Web ページとやりとりしているかを理解することが重要です。

このガイドでは、Shopify ストアでリアルユーザーモニタリングを設定する方法を説明します。

## セットアップ

1. Shopify の管理パネルにログインします。
2. **Sales channels** の下にある、**Online Store** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Shopify ストアで RUM を有効にする" style="width:30%;">}}

3. 新しいメニューが開きますので、**Themes** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Shopify ストアで RUM を有効にする" style="width:30%;">}}

4. 現在のテーマの **Edit code** ボタンをクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Shopify ストアで RUM を有効にする" >}}

5. **Layout** ディレクトリの下で、テーマのメインファイル **theme.liquid** を探します。そのファイルをクリックして編集します。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Shopify ストアで RUM を有効にする" style="width:30%;">}}

6. `<head>` タグ内に SDK コードスニペットを追加して、ブラウザ RUM SDK を初期化します。どのインストール方法を選択するかについては、[RUM ブラウザモニタリングドキュメント][1]を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Shopify ストアで RUM を有効にする" >}}

7. **Save** ボタンをクリックして変更を保存します。

更新後、Shopify の UI では以下のように表示されます。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Shopify ストアで RUM を有効にする" style="width:50%;">}}

テーマコードの編集に関する詳細は [Shopify のドキュメント][2]を参照してください。

## 探索を始める

ブラウザ RUM SDK を初期化したら、Shopify ストアでリアルユーザーモニタリングを使い始めることができます。

たとえば、次のようなことができます。

- データに基づいた意思決定を行ってストアを改善することで、
顧客の行動に関する貴重な洞察を得ることができます
- [セッションリプレイ][3]を使ってブラウザの記録でリッチ化されたセッションを見ることでコンバージョンを向上させます。
- [ファネル分析][4]を使ってカスタマージャーニーをより深く理解します。または
- 新たにキャプチャされたセッションから[メトリクスを生成][5]します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /ja/real_user_monitoring/session_replay/
[4]: /ja/real_user_monitoring/funnel_analysis/
[5]: /ja/real_user_monitoring/generate_metrics/