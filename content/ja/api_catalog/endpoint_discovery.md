---
aliases:
- /ja/tracing/api_catalog/endpoint_discovery/
further_reading:
- link: /tracing/api_catalog/
  tag: ドキュメント
  text: Datadog API カタログ
is_beta: true
title: APM からのエンドポイントの発見
---

## 概要
サービスにサポートされているトレーサーがインストールされている場合、API カタログはこのサービスから発見されたすべてのエンドポイントで自動的に埋められます。

互換性の問題を確認するには、アプリ内で **Learn More** をクリックし、次に **Troubleshoot** を選択します。
{{< img src="tracing/api_catalog/api-catalog-discovery-learn-more.png" alt="ALT テキスト" style="width:30%;text-align: left;" >}}

## エンドポイントパスを手動で提供する
`datadog.api_catalog.route` タグを追加して、API カタログによるエンドポイントの発見を強制します。
このタグには、各サーバーフレームワークで使用される形式のパステンプレートであるマッチしたルートを含める必要があります。

<div class="alert alert-info">API カタログは次のタグを含まないスパンをフィルタリングします。<ul>
<li> <code>http.method</code>
<li> <code>http.status_code</code></ul>
</div>

## 例
以下の例は、Go と Ruby で各スパンにカスタムタグを追加する方法を示しています。

**Go**\
{{< code-block lang="go" disable_copy="true" >}}
span.SetTag("datadog.api_catalog.route", "/products/:id")
{{< /code-block >}}
**Ruby**\
{{< code-block lang="ruby" disable_copy="true" >}}
Datadog::Tracing.active_trace.set_tag('datadog.api_catalog.route', '/products/:id')
{{< /code-block >}}

このタグを設定した後、スパンにこのタグが表示されます。
{{< img src="tracing/api_catalog/api-catalog-discovery-span.png" alt="ALT テキスト" style="width:100%;" >}}

これにより、エンドポイントが API カタログに表示されます。
{{< img src="tracing/api_catalog/api-catalog-discovery-result.png" alt="ALT テキスト" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[8]: /ja/api/latest/api-management