---
description: 評価リクエストでルールをインラインで送信してデプロイメントゲートを評価します。Datadog に事前にゲートを作成しておく必要はありません。
further_reading:
- link: /deployment_gates/setup/preconfigured
  tag: ドキュメント
  text: 事前構成されたデプロイメントゲートをセットアップする
- link: /deployment_gates/explore
  tag: ドキュメント
  text: デプロイメントゲートエクスプローラーについて
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: デプロイメントゲート API リファレンス
title: Just-In-Time (JIT) デプロイメントゲートをセットアップする
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
デプロイメントゲートはプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

**Just-In-Time (JIT)**デプロイメントゲートでは、ルールは評価リクエスト内にインラインで定義されます。Datadog に事前にゲートを作成しておく必要がないため、JIT はルールアズコードやデプロイごとの柔軟性に適しています。

Datadog UI、API、または Terraform で管理する永続的なゲートが必要ですか？[事前構成されたデプロイメントゲート][5] を参照してください。

## 構成 {#configuration}

例 `configuration`:

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

最上位のフィールド:

- `rules` (必須): 1 つ以上のルールエントリー。ゲートが合格するには、すべてのルールに合格する必要があります。
- `dry_run`(オプション): `true` の場合、実際の評価結果は UI に記録されますが、ゲートは常に API 経由で `pass` を返します。オンボーディングに役立ちます。[初めてオンボーディングを行う際の推奨事項](#recommendation-for-first-time-onboarding)を参照してください。

各ルールには以下のフィールドがあります:

- `type` (必須): ルールタイプ (`monitor` または `faulty_deployment_detection`)。各ルールの評価内容については、[ルールタイプ](#rule-types)を参照してください。
- `name`(必須): [Deployment Gates Evaluations][6] (デプロイメントゲート評価) ページに表示される、人間が判読可能なラベル。
- `options`(必須): ルール固有の設定。[ルールタイプ](#rule-types)を参照してください。
- `dry_run`(オプション): ルールごとのドライランのオーバーライド。ゲートレベルの `dry_run` をオーバーライドします。

## ルールタイプ {#rule-types}

完全なスキーマおよび利用可能なすべてのオプションについては、[デプロイメントゲート API リファレンス][4]を参照してください。

{{< tabs >}}
{{% tab "モニター" %}}
モニタールールは、構成可能な期間にわたって一連のモニターの状態を評価します。`query` または `monitor_ids` のいずれかでモニターを選択します。この 2 つのオプションは相互に排他的です。評価期間中に以下のいずれかが発生した場合、ルールは失敗する可能性があります。

- 構成された選択条件に一致するモニターグループがありません。
- 明示的なモニター ID が存在しないか、組織で利用できません。
- 構成された選択条件に 300 を超えるモニターが一致しています。
- 一致するモニターグループがいずれも `ALERT` または `NO_DATA` 状態です。

**オプション**:

- `query`: [検索モニター構文][1] に基づくモニター検索クエリ。モニタータグでフィルタリングします。
  - モニターの静的タグ: `service:transaction-backend`
  - モニターのクエリ内のタグ: `scope:"service:transaction-backend"`
  - [モニターのグループ化][2]内のタグ: `group:"service:transaction-backend"`
- `monitor_ids`: 特定のモニターのリスト。各項目には、10 進数のモニター `id` と正確なグループ名からなる `groups` 配列が含まれています。空の `groups` 配列は、そのモニターのすべてのグループを評価します。
- `duration`: 選択したモニターが評価される期間 (秒単位)。デフォルトは 0 です (モニターは即座に評価されます)。最大値は 7200 秒 (2 時間) です。

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

```json
{
  "type": "monitor",
  "name": "Specific monitors",
  "options": {
    "monitor_ids": [
      {"id": "12345678", "groups": []},
      {"id": "87654321", "groups": ["service:api"]}
    ],
    "duration": 300
  }
}
```

**注**:
- `group` クエリフィルターと `monitor_ids[].groups` は、一致するグループのみを評価します。
- 存在しないか、組織で利用できない明示的なモニター ID は、ルールが失敗する原因となります。モニターが存在するもののミュートされているか、選択されたグループにデータがないために除外される場合、ルールは一致するグループがない動作を適用します。
- ミュートされたモニターは、両方の選択モードから自動的に除外されます。

[1]: /ja/monitors/manage/search/
[2]: /ja/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
このルールタイプは、Watchdog の [APM Faulty Deployment Detection][1] 解析を使用して、デプロイバージョンと同一サービスの以前のバージョンを比較します。この解析によって以下が検出されます。

- 新しいエラーのタイプ。
- 以前のバージョンと比較したエラー率の大幅な増加。

解析はすべての APM インスツルメンテーションサービスに対して自動的に実行され、事前の設定は不要です。

**オプション**:

- `duration`: 解析が実行される時間 (秒単位)。最適な解析の信頼性を確保するため、この値はデプロイ開始後少なくとも 900 秒 (15 分) でなければなりません。最大値は 7200 秒 (2 時間) です。
- `allowed_resources`(オプション): 解析に含める [APM リソース][2]。指定された場合、リストにあるリソースのみが解析されます。`excluded_resources` とは相互に排他的です。
- `excluded_resources`(オプション): 無視する [APM リソース][2] (例: 低ボリュームまたは優先度の低いエンドポイント)。`allowed_resources` とは相互に排他的です。

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
- このルールは各 [追加のプライマリタグ][3] の値と集計解析の両方について評価されます。単一のプライマリタグのみを考慮するには、リクエスト属性で `primary_tag` として指定します。
- リソースレベルで新しいエラーやエラー率の増加が検出されます。
- このルールタイプは、`database` または `inferred service` としてマークされたサービスをサポートしていません。

[1]: /ja/watchdog/faulty_deployment_detection/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## パイプラインからゲートを評価する {#evaluate-a-gate-from-your-pipeline}

デプロイメントパイプラインからゲート評価をリクエストするには、いくつかの方法があります。`datadog-ci` CLI、Argo Rollouts インテグレーション、および GitHub Action は、キャメルケースキー (`dryRun`) を使用する JSON 構成ファイルを介してインラインルールを受け入れます。直接 API 呼び出しと汎用スクリプトは、API スキーマと一致するスネークケースキー (`dry_run`) を使用して、リクエストペイロードで同じ更新を送信します。

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] `deployment gate`コマンドは、単一のコマンドで評価を実行します。`--config`フラグを使用して JSON 構成定ファイルを渡します。

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

- ゲート評価を開始するリクエストを送信し、評価が完了するまでブロックします。
- 評価の待機時間を構成できるタイムアウトを提供します。
- エラーに対する組み込みの自動再試行機能があります。
- 予期しない Datadog エラー時の動作をカスタマイズするための `--fail-on-error` を受け付けます。

`deployment gate` コマンドは、datadog-ci バージョン v3.17.0 以上で使用可能です。`--config` フラグにはバージョン v5.19.0 以上が必要です。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` コマンドはプレビュー版コマンドです。

完全な構成オプションと使用例については、[`deployment gate` コマンドのドキュメント][4] を参照してください。

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
[AnalysisTemplate][1] または [ClusterAnalysisTemplate][1] を作成して、Argo Rollouts Kubernetes Resource からデプロイメントゲートを呼び出します。このテンプレートは、[datadog-ci デプロイメントゲートコマンド][7] を実行して、Deployment Gates API とのやり取りを行います。

以下のテンプレートを開始点として使用します。

- `<YOUR_DD_SITE>`を [Datadog サイト名][2] (例:{{< region-param key="dd_site" code="true" >}}) に置き換えます。
- [API キー][5] と [アプリケーションキー][6] を環境変数として定義します。この例では、`datadog` と呼ばれる [Kubernetes Secret][3] と、`api-key` および `app-key` の 2 つのデータ値を使用しています。`value` の代わりに `valueFrom` を使用して、値をプレーンテキストで渡すこともできます。
- `--config` フラグをサポートする datadog-ci イメージバージョン (バージョン v5.19.0 以上) を使用します。

ゲート設定を ConfigMap に保存し、それをジョブにマウントしてから、`--config` を CLI に渡します。

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

- 分析テンプレートは、Rollout リソースから引数 (`service`、`env`、`version`) を受け取ることができます。詳細については、[Argo Rollouts の公式ドキュメント][4] を参照してください。
- `ttlSecondsAfterFinished`は、5 分後に完了したジョブを削除します。
- `backoffLimit`は、ゲートの評価が失敗した場合にジョブを再試行されないよう 0 に設定されています。

分析テンプレートを作成した後、Argo Rollouts 戦略からそれを参照します。

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
[Datadog Deployment Gate GitHub Action][4] は、ワークフローの一部として評価を実行します。ゲート構成ファイルをリポジトリにコミットし、そのパスを `config` 入力で渡します。`config` 入力にはバージョン v2.1.0 以上が必要です。

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

- ゲート評価を開始するリクエストを送信し、評価が完了するまでブロックします。
- 評価の待機時間を構成できるタイムアウトを提供します。
- エラーに対する組み込みの自動再試行機能があります。
- 予期しない Datadog エラー時の動作をカスタマイズするための `fail-on-error` を受け付けます。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。

完全な構成オプションと使用例については、[`DataDog/deployment-gate-github-action` リポジトリ][4] を参照してください。

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "汎用スクリプト" %}}

このスクリプトを開始点として使用します。このスクリプトは、インライン JIT ルールを使用してゲートを評価します。

以下を置き換えます。

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

- 次の 3 つの入力を受け付けます。`service`、`environment`、`version`。1 つ以上の APM Faulty Deployment Detection ルールが評価される場合は、`version` が必要です。
- 評価を開始するためのリクエストを送信し、`evaluation_id` を記録します。HTTP レスポンスコードを処理します。
  - 5xx: サーバーエラー、遅れて再試行します。
  - 4xx: クライアントエラー、評価が失敗します。
  - 2xx: 評価が開始されました。
- 評価が完了するまで、`evaluation_id`を使用して評価ステータスエンドポイントをポーリングします。
  - 5xx: サーバーエラー、遅れて再試行します。
  - 404: 評価がまだ開始されていません。遅れて再試行します。
  - 4xx (404 を除く): クライアントエラー、評価が失敗します。
  - 2xx: `gate_status` をチェックし、完了していない場合は遅れて再試行します。
- 評価が完了するか、最大ポーリング時間 (デフォルトで 10800 秒 = 3 時間) に達するまで 15 秒ごとにポーリングします。
- 初期リクエスト (5xx レスポンス) のすべての再試行が使い果たされた場合、API 障害に対する回復力を確保するため、スクリプトはこれを成功として扱います。

ユースケースに合わせてスクリプトを調整してください。これは `curl` (リクエストを実行) と `jq` (返された JSON を処理) を使用します。これらのコマンドが利用できない場合は、スクリプトの冒頭で (例: `apk add --no-cache curl jq` を使用) インストールしてください。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "直接 API 呼び出し" %}}

デプロイメントゲートの評価は非同期です。評価をトリガーするとバックグラウンドで開始され、API は進捗状況を追跡するために使用できる評価 ID を返します。

- まず、デプロイメントゲート評価をリクエストします。これによってプロセスが開始され、評価 ID が返されます。
- 次に、評価ステータスエンドポイントを評価 ID で定期的にポーリングし、評価が完了した時点で結果を取得します。10 ～ 20 秒ごとのポーリングが推奨されます。

以下を置き換えます。

- `<YOUR_DD_SITE>`: [Datadog サイト名][1] (例:{{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API キー][2]
- `<YOUR_APP_KEY>`: [アプリケーションキー][3]

`configuration` とインラインルール (API 境界では snake_case) を渡します。

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

フィールド `data.attributes.evaluation_id` には、このゲート評価の一意の識別子が含まれます。

評価 ID を使用してステータスエンドポイントをポーリングし、ゲート評価のステータスを取得します。

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**注**: 評価をリクエストした直後にこのエンドポイントを呼び出すと、評価がまだ開始されていないため、404 HTTP レスポンスが返される場合があります。数秒後に再試行してください。

200 HTTP レスポンスが返される場合、その形式は以下の通りです。

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

`data.attributes.gate_status` フィールドには評価結果が含まれ、値は以下のいずれかです。

- `in_progress`: デプロイメントゲート評価は進行中です。ポーリングを続けてください。
- `pass`: デプロイメントゲート評価が成功しました。
- `fail`: デプロイメントゲート評価が失敗しました。

**注**: `data.attributes.dry_run` フィールドが `true` の場合、`data.attributes.gate_status` フィールドは常に `pass` となります。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## 初めてオンボーディングを行う際の推奨事項 {#recommendation-for-first-time-onboarding}

Continuous Delivery ワークフローにデプロイメントゲートを統合する際、評価フェーズを設けることで、デプロイメントに影響を与える前に製品が期待通りに動作していることを確認できます。ドライランモードと [[{{< ui >}}Deployment Gates Evaluations{{< /ui >}}] (デプロイメントゲート評価)][6] ページを使用してください。

1. `configuration` で `dry_run: true` を設定します (または CLI 構成ファイルで `dryRun: true` を設定します)。一部のルールのみをドライランとしてマークするには、ルールごとに `dry_run` を設定します。ドライラン評価は常に API 経由で `pass` を返します。
2. デプロイメントプロセスにゲート評価を追加します。ドライランが有効な間、デプロイメントはゲート結果の影響を受けません。
3. 一定期間 (例: 1 〜 2 週間) 経過後、{{< ui >}}Deployment Gates Evaluations{{< /ui >}} ページでゲートとルールの実行をチェックしてください。UI には実際のステータスが表示されるため、ゲートが失敗したタイミングとその理由を確認できます。
4. ゲートの動作が期待通りであることを確認したら、`dry_run` を `false` に切り替えます。その後、API は実際のステータスを返すようになり、ゲートの結果に基づいてデプロイメントの昇格やロールバックが開始されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: /ja/api/latest/deployment-gates
[5]: /ja/deployment_gates/setup/preconfigured
[6]: https://app.datadoghq.com/ci/deployment-gates/evaluations