---
description: Feature Flags の課金単位である Monthly Flag Configuration Requests (MFCR) と、クライアントサイド
  SDK およびサーバーサイド SDK がそれらをどのように異なる方法で生成するかを理解します。
further_reading:
- link: /feature_flags/concepts/configuration_sources
  tag: ドキュメント
  text: サーバー SDK 構成ソース
- link: /feature_flags/guide/estimating_and_managing_costs
  tag: ドキュメント
  text: Feature Flags のコストの見積もりと管理
- link: /account_management/plan_and_usage/usage_details
  tag: ドキュメント
  text: 使用状況の詳細
- link: /account_management/plan_and_usage/bill_overview
  tag: ドキュメント
  text: 請求の概要
title: Monthly Flag Configuration Requests (MFCR)
---
## 概要 {#overview}

Datadog は、**Monthly Flag Configuration Requests (MFCR)** に基づいて Feature Flags を課金します。MFCR は、SDK がフラグ構成ファイル (フラグ、そのバリアント、ターゲティングルールを含むペイロード) をリクエストするたびにカウントされます。MFCR は、アプリケーションコードがフラグを評価した回数をカウントしません。

Feature Flags SDK は、すでに保持している構成ファイルに対して、メモリ内でローカルにフラグを評価します。評価はネットワーク呼び出しを行わないため、Datadog は評価量によって使用量を測定できません。その代わりに、Feature Flags の課金では、ローカル評価を可能にする構成ファイルを SDK がどれだけ頻繁にリクエストするかを測定します。

## MFCR が生成される仕組み {#what-generates-an-mfcr}

フラグ構成ファイルがリクエストされるたびに MFCR が加算されます。構成リクエストは、次のような場合に発生します。

- **クライアントサイド SDK** が初期化されると、通常はユーザーがモバイルアプリを開くか Web ページを読み込む際に発生します。
- **サーバーサイド SDK** は、定期的な間隔で更新される構成ファイルをチェックします。

リクエスト自体は、配信パスに応じて異なる場所に送信されます。クライアントサイド SDK、およびエージェントレス配信を使用するサーバーサイド SDK は、Fastly 上で実行される Datadog の CDN から直接構成を要求します。Agent 配信を使用するサーバーサイド SDK は、構成を直接リクエストしません。Datadog Agent が Remote Configuration を通じて SDK の代わりにリクエストを行います。サーバーサイド SDK がこれらの配信パスをどのように選択するかについては、[サーバーサイド SDK 構成ソース][1] を参照してください。

SDK をインストールするだけでは、構成リクエストは生成されません。リクエストは、アプリケーションコードが SDK (クライアントサイド) を初期化するか、構成ソース (サーバーサイド) を明示的に選択した後にのみ開始されます。

構成ファイル内のフラグの数は、カウントに影響しません。単一の構成リクエストで、任意の数のフラグを配信できます。[MFCR としてカウントされないもの](#what-doesnt-count-as-an-mfcr)を確認します。

## クライアントサイド SDK とサーバーサイド SDK の課金の比較 {#client-side-vs-server-side-sdk-billing}

クライアントサイド SDK とサーバーサイド SDK では構成リクエストの生成方法が異なるため、MFCR のボリュームへの寄与の仕方も異なります。

### クライアントサイド SDK {#client-side-sdks}

[クライアントサイド SDK][2] は、初期化時に CDN から構成をリクエストします。これは通常、ユーザーがモバイルアプリを開いたり Web ページを読み込んだりした際に発生します。SDK はセッションの残りの期間中にその構成をデバイス上にローカルでキャッシュします。

各リクエストはアプリの起動やページの読み込みに対応しているため、クライアントサイドの MFCR ボリュームはエンドユーザーのトラフィックと密接に連動します。例としては、サンプリングされていない RUM セッションや、クライアントサイド Feature Flags が使用されているプロパティ全体での 1 日あたりのアクティブユーザー数やセッション数などが挙げられます。

### サーバーサイド SDK {#server-side-sdks}

[サーバーサイド SDK][3] は、エンドユーザーのリクエストごとではなく定期的な間隔で構成をリクエストします。そのリクエストは配信パスに応じて、CDN に直接送信されるか (エージェントレス配信)、Datadog Agent を経由して送信されます (Agent 配信)。実行中の各インスタンス (ホスト、コンテナ、サービスなど) は、それぞれ独立して独自の構成リクエストを生成します。その結果、サーバーサイド SDK の MFCR ボリュームは、実行中のインスタンス数とそれらのインスタンスが更新された構成をリクエストする頻度に依存します。それらのインスタンスが処理するエンドユーザーのトラフィック量には依存しません。

単一のサーバーサイド構成リクエストで、大量のエンドユーザーのトラフィックを処理するインスタンスに構成を提供できます。このため、Datadog はサーバーサイド構成リクエストをその実際のカウントの 10 倍として請求します。

### クライアントサイドとサーバーサイドの合計使用量 {#combined-client-side-and-server-side-usage}

クライアントサイド SDK とサーバーサイド SDK の両方を使用する場合、MFCR の合計使用量は両者の合計となります。サーバーサイドの乗数を適用した後、クライアントサイドの構成リクエストをサーバーサイドの構成リクエストに追加します。

## MFCR としてカウントされないもの{#what-doesnt-count-as-an-mfcr}

フラグ評価は MFCR としてカウントされません。SDK が構成ファイルを受信した後は、追加のネットワーク呼び出しを行うことなく、キャッシュされたファイルに対してローカルでフラグを評価します。その結果、以下のようになります。

- 単一の構成リクエストに、任意の数のフラグを含めることができます。
- アプリケーションは、追加の MFCR を生成することなく、それらの各フラグを何度でも評価できます。

## 使用量と請求を表示する {#view-usage-and-billing}

MFCR の使用量と、それが Feature Flags の請求にどのように影響するかを確認するには、[使用状況の詳細][4] および [請求の概要][5] に移動してください。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/concepts/configuration_sources/
[2]: /ja/feature_flags/client/
[3]: /ja/feature_flags/server/
[4]: /ja/account_management/plan_and_usage/usage_details/
[5]: /ja/account_management/plan_and_usage/bill_overview/