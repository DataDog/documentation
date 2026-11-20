---
description: Squarespace ストアで RUM モニタリングを実装し、顧客の行動を把握してパフォーマンスを追跡し、ユーザーエクスペリエンスを最適化します。
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: ドキュメント
  text: RUM と Session Replay を製品分析に活用する
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: ドキュメント
  text: コンバージョン率でアラートを出す
title: Squarespace ストアで RUM を有効にする
---
## 概要 {#overview}

オンラインストアを成功させるには、顧客がどのように Web ページとやりとりしているかを理解することが重要です。

このガイドでは、Squarespace ストアで Real User Monitoring を設定する方法を説明します。

## セットアップ {#setup}

1. Squarespace の管理パネルにログインし、{{< ui >}}Settings{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

2. {{< ui >}}Settings{{< /ui >}} の下で、{{< ui >}}Advanced{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

3. 開いたメニューで、{{< ui >}}Code Injection{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Squarespace ストアで RUM を有効にする" style="width:30%;">}}

4. {{< ui >}}Header{{< /ui >}} セクション内に SDK コードスニペットを追加して、ブラウザ RUM SDK を初期化します。どのインストール方法を選択すべきかについての詳細は、[RUM ブラウザモニタリングのドキュメント][1]を参照してください。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Squarespace ストアで RUM を有効にする" >}}

5. {{< ui >}}Save{{< /ui >}} ボタンをクリックして変更を保存します。

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Squarespace ストアで RUM を有効にする" style="width:50%;">}}

コード挿入に関する詳細は、[Squarespace のドキュメント][2]を参照してください。

## 探索を始める{#start-exploring}

RUM ブラウザ SDK を初期化したら、Squarespace ストアで Real User Monitoring を使い始めることができます。

たとえば、次のようなことができます。

- データに基づいた意思決定を行ってストアを改善し、
顧客の行動に関する貴重なインサイトを得る
- [Session Replay][3] を使ってブラウザの記録でリッチ化されたセッションを見ることでコンバージョンを増加させる
- [ファネル分析][4] を使ってカスタマージャーニーをより深く理解する、または
- 新たにキャプチャされたセッションから[メトリクスを生成][5]する

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /ja/session_replay/
[4]: /ja/product_analytics/journeys/funnel_analysis/
[5]: /ja/real_user_monitoring/generate_metrics/