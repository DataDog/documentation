---
code_lang: aws-fargate
code_lang_weight: 60
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: OOTB App and API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
title: AWS Fargate で PHP 用の App and API Protection をセットアップする
type: multi-code-lang
---
{{% app_and_api_protection_php_overview %}}

## 前提条件 {#prerequisites}

- AWS Fargate 環境
- Docker でコンテナ化された PHP アプリケーション
- AWS CLI が適切な権限で設定されています
- Datadog API キー
- Datadog PHP SDK ([バージョン要件][1]を参照)

## 1. Datadog Agent をインストールしてください {#1-installing-the-datadog-agent}

Fargate タスク定義に Datadog Agent をインストールしてください：

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:latest",
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_API_KEY>"
        },
        {
          "name": "DD_APM_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_NON_LOCAL_TRAFFIC",
          "value": "true"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

## 2. App and API Protection モニタリングを有効にしてください {#2-enabling-app-and-api-protection-monitoring}

{{% app_and_api_protection_php_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### App and API Protection モニタリングを手動で有効にしてください {#manually-enabling-app-and-api-protection-monitoring}

Dockerfile に Datadog PHP ライブラリが含まれているか確認してください：

Dockerfile に下記を追加してください：

```dockerfile
# Install dd-trace-php
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all
# Enable appsec
ENV DD_APPSEC_ENABLED=true
# Configure your service
ENV DD_SERVICE=<YOUR_SERVICE_NAME>
ENV DD_ENV=<YOUR_ENVIRONMENT>
```

{{% collapse-content title="APM トレースが有効です" level="h4" %}}

App and API Protection 設定を含む PHP アプリケーションコンテナを含めるようにタスク定義を更新してください：

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM トレースが無効です" level="h4" %}}
App and API Protection を有効にしたまま APM トレースを無効にするには、APM トレース変数を false に設定する必要があります。

App and API Protection 設定を含む PHP アプリケーションコンテナを含めるようにタスク定義を更新してください：

```json
{
  "containerDefinitions": [
    {
      "name": "your-php-app",
      "image": "your-php-app-image",
      "environment": [
        {
          "name": "DD_APPSEC_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_APM_TRACING_ENABLED",
          "value": "false"
        },
        {
          "name": "DD_SERVICE",
          "value": "<YOUR_SERVICE_NAME>"
        },
        {
          "name": "DD_ENV",
          "value": "<YOUR_ENVIRONMENT>"
        },
        {
          "name": "DD_SITE",
          "value": "{{< region-param key=\"dd_site\" >}}"
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. アプリケーションを実行してください {#3-running-your-application}

更新された設定で Fargate タスクをデプロイしてください：

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## トラブルシューティング{#troubleshooting}

PHP アプリケーションの App and API Protection のセットアップ中に問題が発生した場合は、[PHP App and API Protection トラブルシューティングガイド][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/php
[2]: /ja/security/application_security/setup/php/troubleshooting