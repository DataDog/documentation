---
aliases:
- /ja/security/application_security/api-inventory/
description: APIエンドポイントとサービスをカタログ化し、環境全体のAPIセキュリティリスクを評価します。
further_reading:
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: ブログ
  text: 主要なAPIセキュリティリスクを軽減してください。
- link: https://www.datadoghq.com/blog/improve-api-authentication-detection-with-datadog/
  tag: ブログ
  text: DatadogによるAPI認証検出を改善してください。
title: APIインベントリ
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protectionは、Datadog GovernmentサイトUS1-FEDでプレビュー版として提供されています。
</div>
{{< /site-region >}}

[APIインベントリ][1]は、API Postureが環境全体で検出したAPIエンドポイントとサービスの継続的に更新されるカタログです。認証ステータス、公開状況、機密データのフロー、関連する検出結果など、各エンドポイントのセキュリティコンテキストを表示します。

インベントリは2つのエクスプローラーで構成されています。

- **[APIエンドポイント][2]**: APIエンドポイントエクスプローラーは、個々のエンドポイントをカタログ化します。シャドーAPI（API定義がなく、Amazon API Gatewayからも検出されない未ドキュメント化エンドポイント）やオーファンAPI（トラフィックのないドキュメント化されたエンドポイント）を明らかにし、リスクの高いエンドポイントの優先順位付けを支援します。
- **[サービス][3]**: サービスエクスプローラーは、検出結果、脆弱性、ランタイムシグナルをサービスごとに集約するため、各サービスのリスクとセキュリティカバレッジを評価できます。

これらのエンドポイントにおける脆弱性、攻撃、または設定ミスを検出し、対応するには、[API Findings][4]を使用してください。APIエンドポイントエクスプローラーでは、各行に検出結果チップが表示され、それをクリックすると関連する検出結果がAPI Findingsで開きます。

## 詳細はこちら {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /ja/security/application_security/api_posture/api_inventory/api_endpoints/
[3]: /ja/security/application_security/api_posture/api_inventory/services/
[4]: /ja/security/application_security/api_posture/api_findings/