---
description: Shopify ストアで RUM モニタリングを設定し、顧客のインタラクション、パフォーマンス、コンバージョン率を追跡して、eコマースの最適化を行います。
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: ドキュメント
  text: RUM とセッションリプレイを製品分析に活用する
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: ドキュメント
  text: コンバージョン率でアラートを出す
private: true
title: Shopify ストアで RUM を有効にする
---
<div class="alert alert-danger">
<a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Shopify's Checkout Extensibility</a> は RUM トラッキングではサポートされていません。この機能がビジネスニーズに不可欠な場合は、<a href="https://docs.datadoghq.com/help/">Datadog Support</a> にチケットを作成してください。
</div>

## 概要 {#overview}

オンラインストアを成功させるには、顧客がどのように Web ページとやりとりしているかを理解することが重要です。

このガイドでは、Shopify ストアでリアルユーザーモニタリングを設定する方法を説明します。

## セットアップ {#setup}

1. Shopify の管理パネルにログインします。
2. {{< ui >}}Sales channels{{< /ui >}} の下で、{{< ui >}}Online Store{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Shopify ストアで RUM を有効にしてください。" style="width:30%;">}}

3. 新しいメニューが開きますので、{{< ui >}}Themes{{< /ui >}} をクリックしてください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Shopify ストアで RUM を有効にしてください。" style="width:30%;">}}

4. 現在のテーマの {{< ui >}}Edit code{{< /ui >}} ボタンをクリックしてください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Shopify ストアで RUM を有効にしてください。" >}}

5. ディレクトリの下で、{{< ui >}}Layout{{< /ui >}}テーマのメインファイル `theme.liquid` を見つけてください。ファイルをクリックして編集してください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Shopify ストアで RUM を有効にしてください。" style="width:30%;">}}

6. タグ内に `<head>` SDK コードスニペットを追加して、Browser RUM SDK を初期化してください。どのインストール方法を選択すべきかについての詳細は、[RUM Browser Monitoring documentation][1] を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Shopify ストアで RUM を有効にする" >}}

7. {{< ui >}}Save{{< /ui >}} ボタンをクリックして変更を保存してください。

更新後の Shopify UI は次のようになります。

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Shopify ストアで RUM を有効にしてください。" style="width:50%;">}}

テーマコードの編集に関する詳細は [Shopify のドキュメント][2]を参照してください。

## 探索を始めてください{#start-exploring}

ブラウザ RUM SDK を初期化したら、Shopify ストアでリアルユーザーモニタリングを使い始めることができます。

たとえば、次のようなことができます。

- 以下を行うことで、顧客の行動に関する貴重なインサイトを得ることができます。
顧客の行動に関する貴重な洞察を得ることができます
- [Session Replay][3] を使って、ブラウザ録画によるリッチなセッションを確認し、コンバージョンを増加させてください。
- 新たにキャプチャされたセッションから[メトリクスを生成][5]してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /ja/session_replay/
[5]: /ja/real_user_monitoring/platform/generate_metrics/