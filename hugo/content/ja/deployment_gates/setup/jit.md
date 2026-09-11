---
description: 評価リクエストでルールをインラインで送信して Deployment Gates を評価します。Datadog に事前にゲートを作成しておく必要はありません。
further_reading:
- link: /deployment_gates/setup/preconfigured
  tag: ドキュメント
  text: 事前構成済み Deployment Gates をセットアップする
- link: /deployment_gates/explore
  tag: ドキュメント
  text: Deployment Gates エクスプローラーについて学ぶ
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: Deployment Gates API リファレンス
title: Just-In-Time (JIT) Deployment Gates をセットアップする
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates はプレビュー版です。この機能にご興味がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

**Just-In-Time (JIT)** Deployment Gates では、ルールは評価リクエスト内にインラインで定義されます。Datadog に事前にゲートを作成しておく必要がないため、ルールアズコードやデプロイごとの柔軟性に適しています。

Datadog UI、API、または Terraform で管理される永続的なゲートが必要な場合は、[事前構成済み Deployment Gates][5] をご覧ください。

## 構成 {#configuration}

`configuration` の例:

```json
{
  "configuration": {
    "dry_run": false,
    "rules": [
      {
        "type": "monitor",
        "name": "Service monitors",
        "options": {
          "query": "service:transaction-backend env:production",
          "duration": 300
        }
      }
    ]
  }
}
```

トップレベルフィールド:

- `rules` (必須): 1つ以上のルールエントリ。ゲートに合格するには、すべてのルールに合格する必要があります。
- `dry_run`(オプション): `true` の場合、API では常に `pass` が返されますが、UI には実際の評価結果が記録されます。オンボーディングに役立ちます。[初回オンボーディングの推奨事項](#recommendation-for-first-time-onboarding)を参照してください。

各ルールには以下のフィールドがあります。

- `type` (必須): ルールのタイプ。`monitor` または `faulty_deployment_detection`。各タイプが何を評価するかについては、[ルールタイプ](#rule-types)を参照してください。
- `name`(必須): [[Deployment Gates Evaluations] (Deployment Gates の評価)][6] ページに表示される、人間が判読可能なラベル。
- `options`(必須): ルール固有の設定。[ルールタイプ](#rule-types)を参照してください。
- `dry_run`(オプション): ルールごとのドライランのオーバーライド。ゲートレベルの `dry_run` をオーバーライドします。

## ルールタイプ {#rule-types}

完全なスキーマおよび利用可能なすべてのオプションについては、[Deployment Gates API リファレンス][4]を参照してください。

{{< tabs >}}
{{% tab "モニター" %}}
モニタールールは、設定可能な期間にわたって一連のモニターの状態を評価します。評価期間中に以下のいずれかの状態になると失敗します。

- クエリに一致するモニターがない。
- 50 個を超えるモニターがクエリに一致する。
- 一致するいずれかのモニターが `ALERT` または `NO_DATA` の状態である。

**オプション**:

- `query`: [モニターの検索構文][1]に基づくモニター検索クエリ。モニタータグでフィルタリングします。
  - モニターの静的タグ: `service:transaction-backend`
  - モニターのクエリ内のタグ: `scope:"service:transaction-backend"`
  - [モニターグループ][2]内のタグ: `group:"service:transaction-backend"`
- `duration`: 一致するモニターが評価される期間 (秒単位)。デフォルトは 0 です (モニターは即座に評価されます)。最大値は 7200 秒 (2 時間) です。

インラインルールの例:

```json
{
  "type": "monitor",
  "name": "Service monitors",
  "options": {
    "query": "service:transaction-backend env:production",
    "duration": 300
  }
}
```

**注**:
- `group` フィルターは、一致するグループのみを評価します。
- ミュートされたモニターは評価から自動的に除外されます (クエリには常に `muted:false` が含まれます)。

[1]: /ja/monitors/manage/search/
[2]: /ja/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM デプロイメント不良検出" %}}
このルールタイプは、Watchdog の [APM デプロイメント不良検出][1]分析を使用して、デプロイされたバージョンを同じサービスの以前のバージョンと比較します。この分析では以下を検出します。

- 新しいタイプのエラー。
- 以前のバージョンと比較したエラー率の著しい増加。

この分析は、APM で計測されたすべてのサービスに対して自動的に実行されるため、事前の設定は不要です。

**オプション**:

- `duration`: 分析を実行する期間 (秒単位)。分析の信頼性を最適化するため、この値はデプロイ開始後少なくとも 900 秒 (15 分) に設定してください。最大値は 7200 秒 (2 時間) です。
- `allowed_resources`(オプション): 分析に含める [APM リソース][2]。指定した場合、リストされたリソースのみが分析されます。`excluded_resources` とは相互に排他的です。
- `excluded_resources`(オプション): 無視する [APM リソース][2] (低ボリュームや低優先度のエンドポイントなど)。`allowed_resources` とは相互に排他的です。

インラインルールの例:

```json
{
  "type": "faulty_deployment_detection",
  "name": "APM Faulty Deployment Detection",
  "options": {
    "duration": 900,
    "excluded_resources": ["GET /healthcheck"]
  }
}
```

**注**:
- このルールは、[追加のプライマリタグ][3]値ごとに評価されるほか、集計分析でも評価されます。単一のプライマリタグのみを考慮するには、リクエスト属性でそれを `primary_tag` として指定します。
- 新しいエラーとエラー率の増加はリソースレベルで検出されます。
- このルールタイプは、`database` または `inferred service` としてマークされたサービスをサポートしていません。

[1]: /ja/watchdog/faulty_deployment_detection/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## パイプラインからゲートを評価する {#evaluate-a-gate-from-your-pipeline}

デプロイメントパイプラインからいくつかの方法でゲート評価をリクエストできます。`datadog-ci` CLI、Argo Rollouts インテグレーション、および GitHub Action は、キャメルケースのキー (`dryRun`) を使った JSON 設定ファイルでインラインルールを受け付けます。直接 API 呼び出しと汎用スクリプトでは、API スキーマに合わせたスネークケースのキー (`dry_run`) を使用して、同じ設定をリクエストペイロードで送信します。

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] `deployment gate` コマンドは、単一のコマンドで評価を実行します。`--config` フラグを使用して JSON 設定ファイルを渡します。

```bash
datadog-ci deployment gate --service transaction-backend --env production --version 1.2.3 --config ./gate-config.json
```

`gate-config.json` の例:

```json
{
  "dryRun": false,
  "rules": [
    {
      "type": "monitor",
      "name": "Service monitors",
      "options": {
        "query": "service:transaction-backend env:production",
        "duration": 300
      }
    },
    {
      "type": "faulty_deployment_detection",
      "name": "APM Faulty Deployment Detection",
      "options": {
        "duration": 900,
        "excluded_resources": ["GET /healthcheck"]
      }
    }
  ]
}
```

コマンド:

- ゲート評価を開始するためのリクエストを送信し、評価が完了するまでブロックします。
- 評価を待機する時間のタイムアウトを構成できます。
- エラーに対する組み込みの自動再試行機能を備えています。
- 予期しない Datadog エラー時の動作をカスタマイズするための `--fail-on-error` を受け入れます。

`deployment gate` コマンドは、datadog-ci バージョン v3.17.0 以降で使用できます。`--config` フラグには、バージョン v5.19.0 以降が必要です。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` コマンドはプレビューコマンドです。

完全な構成オプションと使用例については、[`deployment gate` コマンドのドキュメント][4]を参照してください。

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
[AnalysisTemplate][1] または [ClusterAnalysisTemplate][1] を作成して、Argo Rollouts Kubernetes リソースから Deployment Gates を呼び出します。このテンプレートは、[datadog-ci deployment gate コマンド][7]を実行して Deployment Gates API とやり取りします。

以下のテンプレートを参考にしてください。

- `<YOUR_DD_SITE>` を [Datadog サイト名][2]に置き換えます (例:{{< region-param key="dd_site" code="true" >}})。
- [API キー][5]と[アプリケーションキー][6]を環境変数として定義します。この例では、`datadog` という名前の [Kubernetes Secret][3] を使用し、`api-key` と `app-key` という 2 つのデータ値を含めています。`valueFrom` の代わりに `value` を使用して、値をプレーンテキストで渡すこともできます。
- `--config` フラグをサポートする datadog-ci イメージバージョン (バージョン v5.19.0 以降) を使用してください。

ゲート設定を ConfigMap に保存し、それをジョブにマウントして、`--config` を CLI に渡します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gate-config
data:
  gate-config.json: |
    {
      "dryRun": false,
      "rules": [
        {
          "type": "monitor",
          "name": "Service monitors",
          "options": {
            "query": "service:transaction-backend env:production",
            "duration": 300
          }
        },
        {
          "type": "faulty_deployment_detection",
          "name": "APM Faulty Deployment Detection",
          "options": {
            "duration": 900,
            "excluded_resources": ["GET /healthcheck"]
          }
        }
      ]
    }
---
apiVersion: argoproj.io/v1alpha1
kind: ClusterAnalysisTemplate
metadata:
  name: datadog-job-analysis
spec:
  args:
    - name: service
    - name: env
    - name: version
  metrics:
    - name: datadog-job
      provider:
        job:
          spec:
            ttlSecondsAfterFinished: 300
            backoffLimit: 0
            template:
              spec:
                restartPolicy: Never
                containers:
                  - name: datadog-check
                    image: datadog/ci:latest
                    env:
                      - name: DD_BETA_COMMANDS_ENABLED
                        value: "1"
                      - name: DD_SITE
                        value: "<YOUR_DD_SITE>"
                      - name: DD_API_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: api-key
                      - name: DD_APP_KEY
                        valueFrom:
                          secretKeyRef:
                            name: datadog
                            key: app-key
                    command: ["/bin/sh", "-c"]
                    args:
                      - datadog-ci deployment gate --service {{ args.service }} --env {{ args.env }} --version {{ args.version }} --config /etc/datadog/gate-config.json
                    volumeMounts:
                      - name: gate-config
                        mountPath: /etc/datadog
                volumes:
                  - name: gate-config
                    configMap:
                      name: gate-config
```

- 分析テンプレートは、Rollout リソースから引数を受け取ることができます (`service`、`env`、`version`)。詳細については、[Argo Rollouts の公式ドキュメント][4]を参照してください。
- `ttlSecondsAfterFinished`は、完了したジョブを 5 分後に削除します。
- `backoffLimit`が 0 に設定されているのは、ゲート評価が失敗した場合にジョブを再試行すべきではないためです。

分析テンプレートを作成した後、それを Argo Rollouts 戦略から参照します。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollouts-demo
  labels:
    tags.datadoghq.com/service: transaction-backend
    tags.datadoghq.com/env: dev
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        ...
        - analysis:
            templates:
              - templateName: datadog-job-analysis
                clusterScope: true # Only needed for cluster analysis
            args:
              - name: env
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/env']
              - name: service
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/service']
              - name: version #Required for APM Faulty Deployment Detection rules
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.labels['tags.datadoghq.com/version']
        - ...
```

[1]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-progressive-delivery
[2]: /ja/getting_started/site/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "GitHub Actions" %}}
[Datadog Deployment Gate GitHub Action][4] は、ワークフローの一部として評価を実行します。ゲート設定ファイルをリポジトリにコミットし、そのパスを `config` 入力で渡します。`config` 入力には、バージョン v2.1.0 以上が必要です。

```yaml
name: Deploy with Datadog Deployment Gate
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Deploy Canary
        run: |
          echo "Deploying canary release for service:'my-service' in 'production'. Version 1.0.1"
          # Your deployment commands here

      - name: Evaluate Deployment Gate
        uses: DataDog/deployment-gate-github-action@v2.1.0
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        with:
          service: my-service
          env: production
          version: 1.0.1
          config: .github/gate-config.json

      - name: Deploy
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

`.github/gate-config.json` の例:

```json
{
  "dryRun": false,
  "rules": [
    {
      "type": "monitor",
      "name": "Service monitors",
      "options": {
        "query": "service:my-service env:production",
        "duration": 300
      }
    },
    {
      "type": "faulty_deployment_detection",
      "name": "APM Faulty Deployment Detection",
      "options": {
        "duration": 900,
        "excluded_resources": ["GET /healthcheck"]
      }
    }
  ]
}
```

アクション:

- ゲート評価を開始するためのリクエストを送信し、評価が完了するまでブロックします。
- 評価を待機する時間のタイムアウトを構成できます。
- エラーに対する組み込みの自動再試行機能を備えています。
- 予期しない Datadog エラー時の動作をカスタマイズするための `fail-on-error` を受け入れます。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。

完全な構成オプションと使用例については、[`DataDog/deployment-gate-github-action` リポジトリ][4]を参照してください。

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "汎用スクリプト" %}}

このスクリプトを開始点として使用してください。このスクリプトは、インライン JIT ルールを使用してゲートを評価します。

以下を置き換えてください。

- `<YOUR_DD_SITE>`: [Datadog サイト名][1] (例:{{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API キー][2]
- `<YOUR_APP_KEY>`: [アプリケーションキー][3]

```bash
#!/bin/sh

# Configuration
MAX_RETRIES=3
DELAY_SECONDS=5
POLL_INTERVAL_SECONDS=15
MAX_POLL_TIME_SECONDS=10800 # 3 hours
API_URL="https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation"
API_KEY="<YOUR_API_KEY>"
APP_KEY="<YOUR_APP_KEY>"

PAYLOAD=$(cat <<EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "$1",
      "env": "$2",
      "version": "$3",
      "configuration": {
        "dry_run": false,
        "rules": [
          {
            "type": "monitor",
            "name": "Service monitors",
            "options": {
              "query": "service:$1 env:$2",
              "duration": 300
            }
          },
          {
            "type": "faulty_deployment_detection",
            "name": "APM Faulty Deployment Detection",
            "options": {
              "duration": 900,
              "excluded_resources": ["GET /healthcheck"]
            }
          }
        ]
      }
    }
  }
}
EOF
)

# Step 1: Request evaluation
echo "Requesting evaluation..."
current_attempt=0
while [ $current_attempt -lt $MAX_RETRIES ]; do
   current_attempt=$((current_attempt + 1))
   RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X POST "$API_URL" \
       -H "Content-Type: application/json" \
       -H "DD-API-KEY: $API_KEY" \
       -H "DD-APPLICATION-KEY: $APP_KEY" \
       -d "$PAYLOAD")

   HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
   RESPONSE_BODY=$(cat response.txt)

   if [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
       echo "Attempt $current_attempt: 5xx Error ($HTTP_CODE). Retrying in $DELAY_SECONDS seconds..."
       sleep $DELAY_SECONDS
       continue
   elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
       echo "Client error ($HTTP_CODE): $RESPONSE_BODY"
       exit 1
   fi

   EVALUATION_ID=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.evaluation_id')
   if [ "$EVALUATION_ID" = "null" ] || [ -z "$EVALUATION_ID" ]; then
       echo "Failed to extract evaluation_id from response: $RESPONSE_BODY"
       exit 1
   fi

   echo "Evaluation started with ID: $EVALUATION_ID"
   break
done

if [ $current_attempt -eq $MAX_RETRIES ]; then
   echo "All retries exhausted for evaluation request, but treating 5xx errors as success."
   exit 0
fi

# Step 2: Poll for results
echo "Polling for results..."
start_time=$(date +%s)
poll_count=0

while true; do
  poll_count=$((poll_count + 1))
  current_time=$(date +%s)
  elapsed_time=$((current_time - start_time))

  if [ $elapsed_time -ge $MAX_POLL_TIME_SECONDS ]; then
      echo "Evaluation polling timeout after ${MAX_POLL_TIME_SECONDS} seconds"
      exit 1
  fi

  RESPONSE=$(curl -s -w "%{http_code}" -o response.txt -X GET "$API_URL/$EVALUATION_ID" \
      -H "DD-API-KEY: $API_KEY" \
      -H "DD-APPLICATION-KEY: $APP_KEY")

  HTTP_CODE=$(echo "$RESPONSE" | tail -c 4)
  RESPONSE_BODY=$(cat response.txt)

  if [ ${HTTP_CODE} -eq 404 ]; then
      echo "Evaluation not ready yet (404), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 500 ]  &&  [ ${HTTP_CODE} -le 599 ]; then
      echo "Server error ($HTTP_CODE) while polling, retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  elif [ ${HTTP_CODE} -ge 400 ] && [ ${HTTP_CODE} -le 499 ]; then
      echo "Client error ($HTTP_CODE) while polling: $RESPONSE_BODY"
      exit 1
  fi

  GATE_STATUS=$(echo "$RESPONSE_BODY" | jq -r '.data.attributes.gate_status')

  if [ "$GATE_STATUS" = "pass" ]; then
      echo "Gate evaluation PASSED"
      exit 0
  elif [ "$GATE_STATUS" = "fail" ]; then
      echo "Gate evaluation FAILED"
      exit 1
  else
      echo "Evaluation still in progress (status: $GATE_STATUS), retrying in $POLL_INTERVAL_SECONDS seconds... (attempt $poll_count, elapsed: ${elapsed_time}s)"
      sleep $POLL_INTERVAL_SECONDS
      continue
  fi
done
```

スクリプト:

- 3 つの入力を受け取ります (`service`、`environment`、`version`)。1 つ以上の APM デプロイメント不良検出ルールが評価される場合は `version` が必要です。
- 評価を開始するためのリクエストを送信し、`evaluation_id` を記録します。HTTP レスポンスコードを処理します。
  - 5xx: サーバーエラー。遅延を伴い再試行します。
  - 4xx: クライアントエラー。評価は失敗します。
  - 2xx: 評価が開始されました。
- 評価が完了するまで、`evaluation_id` を使用して評価ステータスエンドポイントをポーリングします。
  - 5xx: サーバーエラー。遅延を伴い再試行します。
  - 404: 評価がまだ開始されていません。遅延を伴い再試行します。
  - 4xx (404 を除く): クライアントエラー。評価は失敗します。
  - 2xx: `gate_status` をチェックし、完了していない場合は遅延を伴い再試行します。
- 評価が完了するか、最大ポーリング時間 (デフォルトで 10800 秒 = 3 時間) に達するまで、15 秒ごとにポーリングします。
- 初期リクエストですべての再試行が使い果たされた場合 (5xx レスポンス)、API 障害に対する耐性を持たせるため、この結果を成功として扱います。

ご自身のユースケースに合わせてスクリプトを調整してください。`curl` (リクエストの実行用) と `jq` (返された JSON の処理用) を使用します。これらのコマンドが利用できない場合は、スクリプトの冒頭で (たとえば `apk add --no-cache curl jq` を使用して) インストールしてください。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "直接 API 呼び出し" %}}

Deployment Gates の評価は非同期です。評価をトリガーするとバックグラウンドで開始され、進捗状況を追跡するために使用できる評価 ID が返されます。

- まず、Deployment Gates の評価をリクエストします。これによりプロセスが開始され、評価 ID が返されます。
- 次に、評価 ID を使用して評価ステータスエンドポイントを定期的にポーリングし、評価が完了した時点で結果を取得します。10 〜 20 秒ごとのポーリングを推奨します。

以下を置き換えてください。

- `<YOUR_DD_SITE>`: [Datadog サイト名][1] (例:{{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API キー][2]
- `<YOUR_APP_KEY>`: [アプリケーションキー][3]

インラインルール (API 境界では snake_case) を含む `configuration` を渡します。

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>" \
-d @- << 'EOF'
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "production",
      "version": "1.2.3",
      "configuration": {
        "dry_run": false,
        "rules": [
          {
            "type": "monitor",
            "name": "Service monitors",
            "options": {
              "query": "service:transaction-backend env:production",
              "duration": 300
            }
          },
          {
            "type": "faulty_deployment_detection",
            "name": "APM Faulty Deployment Detection",
            "options": {
              "duration": 900,
              "excluded_resources": ["GET /healthcheck"]
            }
          }
        ]
      }
    }
  }
}
EOF
```

ゲート評価が正常に開始された場合、202 HTTP ステータスコードが返されます。

```json
{
   "data": {
       "id": "<random_response_uuid>",
        "type": "deployment_gates_evaluation_response",
        "attributes": {
            "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9"
        }
    }
}
```

`data.attributes.evaluation_id` フィールドには、このゲート評価の一意の識別子が含まれます。

その評価 ID を使用してステータスエンドポイントをポーリングし、ゲート評価のステータスを取得します。

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**注**: 評価をリクエストした直後にこのエンドポイントを呼び出すと、評価がまだ開始されていないために 404 HTTP レスポンスが返される場合があります。数秒後に再試行してください。

200 HTTP レスポンスが返される場合、以下の形式になります。

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_result_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": false
               }
           ]
       }
   }
}
```

`data.attributes.gate_status` フィールドには、以下のいずれかの値を持つ評価結果が含まれます。

- `in_progress`: Deployment Gates の評価は進行中です。ポーリングを続けてください。
- `pass`: Deployment Gates の評価は合格しました。
- `fail`: Deployment Gates の評価は不合格でした。

**注**: `data.attributes.dry_run` フィールドが `true` の場合、`data.attributes.gate_status` フィールドは常に `pass` になります。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## 初回オンボーディングの推奨事項 {#recommendation-for-first-time-onboarding}

Deployment Gates を Continuous Delivery ワークフローに統合する際に評価フェーズを設けることで、この製品が期待どおりに動作していることを、デプロイメントに影響を与える前に確認できます。ドライランモードと [[{{< ui >}}Deployment Gates Evaluations{{< /ui >}}]][6] ページを使用してください。

1. `configuration` で `dry_run: true` を (または CLI 設定ファイルで `dryRun: true` を) 設定します。一部のルールのみをドライランとしてマークするには、ルールごとに `dry_run` を設定します。ドライラン評価では、API では常に `pass` が返されますが、UI には実際の評価結果が記録されます。
2. ゲート評価をデプロイメントプロセスに追加します。ドライランが有効な間は、デプロイメントはゲート結果の影響を受けません。
3. 一定期間 (1 〜 2 週間など) 経過後、[{{< ui >}}Deployment Gates Evaluations{{< /ui >}}] ページでゲートとルールの実行をチェックします。UI には実際のステータスが表示されるため、ゲートがいつ失敗したかや、その理由を確認できます。
4. ゲートの動作が期待どおりであることを確認したら、`dry_run` を `false` に切り替えます。その後、API が実際のステータスを返すようになり、ゲート結果に基づくデプロイメントの昇格やロールバックが開始されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: /ja/api/latest/deployment-gates
[5]: /ja/deployment_gates/setup/preconfigured
[6]: https://app.datadoghq.com/ci/deployment-gates/evaluations