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
title: AWS Fargate で Node.js 向け App and API Protection をセットアップしてください
type: multi-code-lang
---
{{% aap/aap_and_api_protection_nodejs_overview %}}

## 前提条件 {#prerequisites}

- AWS Fargate 環境
- Docker によってコンテナ化された Node.js アプリケーション
- 適切な権限で構成された AWS CLI
- Datadog API キー
- Datadog Node.js SDK ([バージョン要件][1]を参照)

## 1. Datadog Agent をインストールしてください {#1-installing-the-datadog-agent}

Fargate タスク定義に Datadog Agent をインストールしてください。

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
        }
      ]
    }
  ]
}
```

## 2. App and API Protection モニタリングを有効にしてください {#2-enabling-app-and-api-protection-monitoring}

{{% aap/aap_and_api_protection_nodejs_navigation_menu %}}

{{% aap/aap_and_api_protection_nodejs_remote_config_activation %}}

### App and API Protection モニタリングを手動で有効にしてください {#manually-enabling-app-and-api-protection-monitoring}

Dockerfile に Datadog Node.js ライブラリが含まれていることを確認してください。

```dockerfile
FROM node:18-alpine

# Install the Datadog Node.js library
RUN npm install dd-trace

# Copy your application files
COPY package*.json ./
COPY . .
RUN npm install

# Start the application with the Datadog SDK
CMD ["node", "--require", "dd-trace/init", "app.js"]
```

{{% collapse-content title="APM トレーシングが有効" level="h4" %}}

App and API Protection の構成を含む Node.js アプリケーション コンテナをタスク定義に追加してください。

```json
{
  "containerDefinitions": [
    {
      "name": "your-nodejs-app",
      "image": "your-nodejs-app-image",
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
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

{{% collapse-content title="APM トレーシングが無効" level="h4" %}}
App and API Protection を有効にしたまま APM トレーシングを無効にするには、APM トレーシング変数を false に設定してください。

App and API Protection の構成を含む Node.js アプリケーション コンテナをタスク定義に追加してください。

```json
{
  "containerDefinitions": [
    {
      "name": "your-nodejs-app",
      "image": "your-nodejs-app-image",
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
        }
      ]
    }
  ]
}
```

{{% /collapse-content %}}

## 3. アプリケーションを実行してください {#3-run-your-application}

更新された構成で Fargate タスクをデプロイしてください。

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs run-task --cluster your-cluster --task-definition your-task-definition
```

{{% aap/aap_and_api_protection_verify_setup %}}

## トラブルシューティング{#troubleshooting}

Node.js アプリケーションの App and API Protection セットアップ中に問題が発生した場合は、[Node.js App and API Protection トラブルシューティングガイド][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility/nodejs
[2]: /ja/security/application_security/setup/nodejs/troubleshooting