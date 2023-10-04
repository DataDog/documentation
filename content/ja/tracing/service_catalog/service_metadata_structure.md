---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog サービスカタログ
- link: /api/latest/service-definition/
  tag: Documentation
  text: サービス定義 API
- link: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
  tag: GitHub
  text: サービス定義スキーマ
kind: documentation
title: サービスメタデータの構造 (JSON スキーマ)
---

## 概要

サービスカタログは、サービス定義スキーマを使用して、サービスに関する関連するメタデータを保存および表示します。スキーマには、有効な値のみが受け入れられるようにするための検証ルールが組み込まれており、選択したサービスのサイドパネルの **Definition** タブで警告を表示することができます。

スキーマのサポートバージョンは 2 つあります。

- V2 は最も古いバージョンで、`dd-team` などの実験的な機能が含まれていますが、v2.1 では削除されています。
- V2.1 では、サービスのグループ化や、`application`、`tier`、`lifecycle` などのフィールドなど、追加の UI 要素をサポートしています。`Application` は Teams とともにサービスカタログのグループ化変数として使用できます。`Lifecycle` は、`production`、`experimental`、`deprecated` のサービスを区別して、開発段階を示し、異なる信頼性と可用性の要件を適用するのに役立ちます。`Tier` はサービスの重要度を示し、インシデントトリアージの際に優先度を付けます。例えば、`tier 1` は通常、障害が発生すると顧客に重大な影響を与える最も重要なサービスを表し、`tier 4` のサービスは通常、実際の顧客体験に影響を与えません。


最新のアップデート情報については、GitHub のスキーマをご覧ください。

## Service Definition Schema (v2.1)

Service Definition Schema は、サービスの基本情報を格納する構造体です。[GitHub にあるフルスキーマ][1]を参照してください。

#### 例
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.1
dd-service: web-store
team: shopist
contacts:
 - type: slack
   contact: https://datadogincidents.slack.com/archives/C01EWN6319S
application: shopist
description: shopist.com storefront
tier: tier1
lifecycle: production
links:
 - name: Demo Dashboard
   type: dashboard
   url: https://app.datadoghq.com/dashboard/krp-bq6-362
 - name: Common Operations
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Disabling Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Rolling Back Deployments
   type: runbook
   url: https://datadoghq.atlassian.net/wiki/
 - name: Source
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
 - name: Deployment
   type: repo
   provider: github
   url: https://github.com/DataDog/shopist/blob/prod/k8s/dd-trace-demo/templates/rails-storefront-deployment.yaml
 - name: Deployment Information
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
 - name: Service Documentation
   provider: link
   type: doc
   url: https://docs.datadoghq.com/
tags: []
integrations:
 pagerduty:
   service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
外部リソース (オプション)
{{< /code-block >}}

## サービス定義スキーマ (v2)

Service Definition Schema は、サービスの基本情報を格納する構造体です。[GitHub にあるフルスキーマ][2]を参照してください。

#### 例
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
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
    pagerduty: https://example.pagerduty.com/service-directory/XYZYX
外部リソース (オプション)
{{< /code-block >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/schema/blob/main/service-catalog/v2.1/schema.json
[2]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json