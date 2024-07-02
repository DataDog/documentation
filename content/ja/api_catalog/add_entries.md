---
title: Adding Entries to API Catalog
is_beta: true
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog Service Catalog
- link: /tracing/api_catalog/explore_apis/
  tag: Documentation
  text: Exploring APIs
- link: /tracing/api_catalog/monitor_apis/
  tag: Documentation
  text: Monitoring APIs
aliases:
    - /tracing/api_catalog/add_entries
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">API Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 概要

API カタログは、Datadog 組織内のエンドポイントを自動的に発見するために、分散型トレーシング用の APM インスツルメンテーションを使用します。サポートされているライブラリでインスツルメントされたサービスの場合、エンドポイントは自動的に API カタログに入力されます。

自動検出されたエンドポイントを登録するか、OpenAPI ファイルをアップロードして API カタログの全機能を活用してください。

## 自動検出されたエンドポイントの登録

自動検出されたエンドポイントを API にグループ化して、使用状況を追跡し、所有権を設定し、中央から監視ポリシーを管理します。

エンドポイントを登録するには

1. **Explorer** ページから、登録するエンドポイントを選択します。
2. **Register Endpoints** をクリックします。
3. エンドポイントをグループ化したい API を選択します。
4. **Apply** をクリックします。

{{< img src="tracing/api_catalog/api-catalog-register.png" alt="API カタログでエンドポイントを選択し、Register Endpoints ボタンをクリックします。" style="width:65%;" >}}

エンドポイントが登録されると、Datadog は[モニタリング機能][6]の向上のために新しいエンドポイントメトリクスの収集を開始します。

オートディスカバリーは、一部のフレームワークでは使用できません。Datadog の **Learn More** ボタンをクリックして、互換性のステータスを確認してください。それでもエンドポイントが見つからない場合は、エンドポイントを含む定義ファイルをアップロードしてみてください。Datadog は、アップロードされた後にそのエンドポイント定義のデータ収集を自動的に開始します。

## OpenAPI/Swagger ファイルのインポート

すでに所有している API 定義をインポートして、トラフィックを受信しているエンドポイントを確認し、API 定義に基づいてパフォーマンスとデプロイメント情報を取得します。

サポートされているフォーマットは OpenAPI 2 と 3 です。

OpenAPI/Swagger ファイルをインポートするには

1. **Catalog** ページに移動します。
2. **Add API** をクリックします。
3. **Import an API** を選択します。
4. デバイスからインポートする OpenAPI ファイルを選択します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog
[6]: /tracing/api_catalog/monitor_apis/