---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Use RUM & Session Replay for Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alerting With Conversion Rates
title: Enable RUM on Your Shopify Store
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

5. Under the **Layout** directory, find the main file of your theme **theme.liquid**. Click the file to edit it.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Shopify ストアで RUM を有効にする" style="width:30%;">}}

6. `<head>` タグ内に SDK コードスニペットを追加して、ブラウザ RUM SDK を初期化します。どのインストール方法を選択するかについては、[RUM ブラウザモニタリングドキュメント][1]を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Enable RUM on your Shopify store" >}}

7. **Save** ボタンをクリックして変更を保存します。

The updated looks like the following in the Shopify UI:

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Shopify ストアで RUM を有効にする" style="width:50%;">}}

テーマコードの編集に関する詳細は [Shopify のドキュメント][2]を参照してください。

## 探索を始める

ブラウザ RUM SDK を初期化したら、Shopify ストアでリアルユーザーモニタリングを使い始めることができます。

たとえば、次のようなことができます。

- データに基づいてストアを改善するための意思決定を行うことで、
顧客の行動に関する貴重な洞察を得ることができます
- [セッションリプレイ][3]を使ってブラウザの記録でリッチ化されたセッションを見ることでコンバージョンを増加させます。
- Use [funnel analysis][4] to better understand the customer journey, or
- 新たにキャプチャされたセッションから[メトリクスを生成][5]します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /ja/real_user_monitoring/session_replay/browser/
[4]: /ja/product_analytics/journeys/funnel_analysis
[5]: /ja/real_user_monitoring/platform/generate_metrics/