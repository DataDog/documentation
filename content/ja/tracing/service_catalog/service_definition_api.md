---
aliases:
- /ja/tracing/faq/service_definition_api/
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
- link: /api/latest/service-definition/
  tag: ドキュメント
  text: サービス定義 API
- link: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
  tag: GitHub
  text: サービス定義スキーマ
kind: documentation
title: Datadog Service Definition API によるサービスへのメタデータの追加
---

## 概要

サービスとは、独立した、デプロイ可能なソフトウェアの単位です。Datadog [統合サービスタグ付け][1]は、あらゆるテレメトリータイプにおいて、一貫してサービスオーナーシップを管理・監視するための標準的な方法を提供します。サービスカタログでは、APM、USM、RUM からユーザー定義のサービスエントリーを追加したり、既存のサービスのメタデータを管理することができます。

サービス定義の作成、取得、削除の詳細については、[Service Definitions API リファレンス][8]を参照してください。

## サービス定義スキーマ (v2)

Service Definition Schema は、サービスの基本情報を格納する構造体です。[GitHub にあるフルスキーマ][4]を参照してください。


#### 例
{{< code-block lang="yaml" filename="service.definition.yaml" collapsible="true" >}}
schema-version: v2
dd-service: web-store
team: shopist
contacts:
  - type: slack
    contact: https://exampleincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.examplehq.com/dashboard/krp-bq6-362
  - name: Common Operations
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Disabling Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
  - name: Rolling Back Deployments
    type: runbook
    url: https://examplehq.atlassian.net/wiki/
repos:
  - name: Source
    provider: github
    url: https://github.com/Example/shopist/tree/prod/rails-storefront
  - name: Deployment
    provider: github
    url: https://github.com/Example/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
docs:
  - name: Deployment Information
    provider: link
    url: https://docs.datadoghq.com/
  - name: Service Documentation
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
外部リソース (オプション)
{{< /code-block >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/unified-service-tagging/
[2]: /ja/tracing/service_catalog/
[3]: /ja/account_management/api-app-keys/
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[7]: https://app.datadoghq.com/services/setup
[8]: /ja/api/latest/service-definition/