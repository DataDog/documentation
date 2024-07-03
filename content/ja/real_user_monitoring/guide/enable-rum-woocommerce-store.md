---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Use RUM & Session Replay for Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alerting With Conversion Rates
title: Enable RUM on Your WooCommerce Store
---

## 概要

オンラインストアを成功させるには、顧客がどのように Web ページとやりとりしているかを理解することが重要です。



このガイドでは、WordPress + WooCommerce ストアでリアルユーザーモニタリングを設定する方法を説明します。

## セットアップ

1. WordPress の管理パネルにログインします。
2. **Plugins** の下にある **Add New** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-1.png" alt="WooCommerce ストアで RUM を有効にする" style="width:30%;">}}

3. **WPCode** を検索し、**Install Now** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-2.png" alt="WooCommerce ストアで RUM を有効にする" style="width:50%;">}}

4. After you've installed WPCode, click on **Activate**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-3.png" alt="WooCommerce ストアで RUM を有効にする" style="width:50%;">}}

5. WordPress のメニューから新しく追加された **Code Snippets** セクションを探し、**Header & Footer** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-4.png" alt="WooCommerce ストアで RUM を有効にする" style="width:30%;">}}

6. **Header** セクション内に SDK コードスニペットを追加して、ブラウザ RUM SDK を初期化し、**Save** ボタンをクリックして変更を保存します。どのインストール方法を選択するかについては、[RUM ブラウザモニタリングドキュメント][1]を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-5.png" alt="Enable RUM on your WooCommerce store" >}}

## 探索を始める

ブラウザ RUM SDK を初期化したら、WooCommerce ストアでリアルユーザーモニタリングを使い始めることができます。

たとえば、次のようなことができます。

- データに基づいてストアを改善するための意思決定を行うことで、
顧客の行動に関する貴重な洞察を得ることができます
- [セッションリプレイ][2]を使ってブラウザの記録でリッチ化されたセッションを見ることでコンバージョンを増加させます。
- Use [funnel analysis][3] to better understand the customer journey, or
- 新たにキャプチャされたセッションから[メトリクスを生成][4]します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: /ja/real_user_monitoring/session_replay/
[3]: /ja/product_analytics/journeys/funnel_analysis
[4]: /ja/real_user_monitoring/platform/generate_metrics/