---
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
- link: dynamic_instrumentation/enabling
  tag: ドキュメント
  text: エンドポイントの確認とカタログ登録
- link: dynamic_instrumentation/enabling/java
  tag: ドキュメント
  text: Java
is_beta: true
kind: ドキュメント
title: ダイナミックインスツルメンテーション
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では API カタログはサポートされていません。</div>
{{< /site-region >}}

## 概要

API カタログは、Datadog 組織のすべての環境内のエンドポイントを自動検出するための分散型トレーシングに、APM インスツルメンテーションを利用します。インスツルメンテーションされたサービスおよびサポートされているライブラリのエンドポイントは、API Explorer に自動で入力されます。

## 設定

すでに APM データを消費している Datadog 組織では、追加の設定なしで API カタログを有効にすることができます。APM によってインスツルメンテーションされたサービスやサポートされているライブラリは、自動検出されます。

API カタログ内にいずれかの API やエンドポイントが見当たらない場合は、インスツルメンテーションされていることを確認してください。必要であれば、[Setup ページ][1] の手順に従って、サービスを発見できるようにします。

{{< img src="tracing/api_catalog/api-catalog-setup.png" alt="Java サービスのインスツルメンテーション手順が表示された API Catalog Setup ページ" style="width:80%;" >}}

または、OpenAPI 定義をインポートすることで、API カタログに API を追加することができます。API をインスツルメンテーションしたくない場合や、インスツルメンテーションと自動検出をサポートしていないフレームワークで書かれている場合は、このアプローチが必要です。YAML または JSON の OpenAPI 定義ファイルをインポートするには、[Catalog ページ][4]の **Add an API** をクリックします。 

{{< img src="tracing/api_catalog/api-catalog-setup-import.png" alt="OpenAPI 定義ファイルをインポートするための API Catalog Setup ページ。" style="width:100%;" >}}

API やエンドポイントを登録して API カタログを設定できたら、[API Catalog Explorer ページ][5]でカタログメタデータの確認や追加を開始します。

## 重要な用語

API
: 2 つのアプリケーションが通信できるようにするためのプロトコルとツールのセット。

API エンドポイント
: API で定義された一連のルールを実装するサーバーやサービスのリソースのアドレス (URL) で、多くの場合、HTTP、RESTful API インターフェイスを通じて提供されます。API エンドポイントは、API 呼び出しの応答を行う責任を負っています。<br /><br/>
API カタログでは、API エンドポイントを、HTTP メソッド (例: `GET`)、URL パス (例: `/payment/{shop_id}/purchase`)、このリソースが提供するサービスの名前 (例: `Payments`) として表示します。<br /><br/>
**ベータ版**の API カタログは、**HTTP** エンドポイントのみをサポートしています。

公開 API
: インターネットからアクセス可能な顧客向け API エンドポイント。

非公開 API
: 内部 API とも呼ばれます。組織内の内部利用のみを目的とし、主にバックエンドサービスの通信に使用されます。最も一般的な API の種類です。

パートナー API
: サードパーティ API とも呼ばれます。組織がサービスを提供するために使用する他の組織の公開エンドポイントです (例: Stripe、Google、Facebook)。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /ja/tracing/service_catalog/
[3]: /ja/tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog