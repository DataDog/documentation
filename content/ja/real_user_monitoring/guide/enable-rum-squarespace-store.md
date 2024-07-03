---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentation
  text: Use RUM & Session Replay for Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentation
  text: Alerting With Conversion Rates
title: Enable RUM on Your Squarespace Store
---

## 概要

オンラインストアを成功させるには、顧客がどのように Web ページとやりとりしているかを理解することが重要です。

このガイドでは、Squarespace ストアでリアルユーザーモニタリングを設定する方法を説明します。

## セットアップ

1. Squarespace の管理パネルにログインし、** Settings** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

2. **Settings** の下にある **Advanced** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

3. 開いているメニューで、**Code Injection** をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

4. **Header** セクション内に SDK コードスニペットを追加して、ブラウザ RUM SDK を初期化します。どのインストール方法を選択するかについては、[RUM ブラウザモニタリングドキュメント][1]を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Enable RUM on your Squarespace store" >}}

5. **Save** ボタンをクリックして変更を保存します。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Squarespace ストアで RUM を有効にする" style="width:50%;">}}

コード挿入に関する詳細は、[Squarespace のドキュメント][2]を参照してください。

## 探索を始める

RUM ブラウザ SDK を初期化したら、Squarespace ストアでリアルユーザーモニタリングを使い始めることができます。

たとえば、次のようなことができます。

- データに基づいてストアを改善するための意思決定を行うことで、
顧客の行動に関する貴重な洞察を得ることができます
- [セッションリプレイ][3]を使ってブラウザの記録でリッチ化されたセッションを見ることでコンバージョンを増加させます。
- Use [funnel analysis][4] to better understand the customer journey, or
- 新たにキャプチャされたセッションから[メトリクスを生成][5]します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /ja/real_user_monitoring/session_replay/browser/
[4]: /ja/product_analytics/journeys/funnel_analysis/
[5]: /ja/real_user_monitoring/generate_metrics/