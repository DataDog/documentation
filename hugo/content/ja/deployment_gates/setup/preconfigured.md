---
description: Datadog でゲートとルールを事前に作成し、デプロイ時にサービスと環境でそれらを参照します。
further_reading:
- link: /deployment_gates/setup/jit
  tag: ドキュメント
  text: Just-In-Time (JIT) Deployment Gates をセットアップする
- link: /deployment_gates/explore
  tag: ドキュメント
  text: Deployment Gates エクスプローラーについて
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: Deployment Gates API リファレンス
title: 事前構成済みデプロイメントゲートをセットアップする
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates はプレビュー版です。この機能にご興味がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

**事前構成済み**のデプロイメントゲートでは、ゲートとルールが Datadog で保持され、評価時にサービスと環境によって参照されます。事前構成済みゲートは、多くのデプロイでルールを共有したい場合、Terraform で構成を管理したい場合、CI ユーザー以外のユーザーに Datadog UI でルールを編集させたい場合に適しています。

ルールをデプロイ構成においてインラインで定義する場合は、[Just-In-Time (JIT) Deployment Gates][5] を参照してください。

## ゲートを作成する {#create-a-gate}

<div class="alert alert-info">ゲートとルールは、Deployment Gates UI を使用するほか、<a href="https://docs.datadoghq.com/api/latest/deployment-gates">Deployment Gates API</a> または <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">Datadog Terraform プロバイダー</a>を使用してプログラムで管理することもできます。</div>

1. [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6] に移動します。
2. {{< ui >}}Create Gate{{< /ui >}} をクリックします。
3. 次の設定を構成します。
   - {{< ui >}}Service{{< /ui >}}: サービス名 (例: `transaction-backend`)。
   - {{< ui >}}Environment{{< /ui >}}: ターゲット環境 (例: `dev`)。
   - {{< ui >}}Identifier{{< /ui >}} (オプション、デフォルト値は `default`): 同じサービス/環境上の複数のゲートに対する一意の名前。これは次の目的に使用します。
     - 異なるデプロイ戦略を許可する (例: `fast-deploy` と `default`)
     - デプロイフェーズを区別する (例: `pre-deploy` と `post-deploy`)
     - カナリアステージを定義する (例: `pre-deploy` と `canary-20pct`)
   - {{< ui >}}Evaluation Mode{{< /ui >}}: {{< ui >}}Dry Run{{< /ui >}} を有効にすると、デプロイに影響を与えずにゲートの動作をテストできます。ドライランゲートの評価では常に pass ステータスが返されますが、アプリ内の結果には実際の評価が反映されます。これは、デプロイパイプラインに影響を与えずにゲートの動作の初期評価を実行する場合に役立ちます。

## ゲートにルールを追加する {#add-rules-to-a-gate}

各ゲートには、評価するルールが 1 つ以上必要です。ゲートが成功するには、すべてのルールに合格する必要があります。各ルールについて、以下を指定します。

1. {{< ui >}}Name{{< /ui >}}: [[Deployment Gates Evaluations (デプロイメントゲート評価)]][7] ページに表示される説明ラベル (例: `Check all P0 monitors`)。
2. {{< ui >}}Type{{< /ui >}}: {{< ui >}}Monitor{{< /ui >}} または {{< ui >}}Faulty Deployment Detection{{< /ui >}} を選択します。
3. 選択したルールタイプに基づく追加設定。利用可能なオプションについては、[ルールタイプ](#rule-types)を参照してください。
4. {{< ui >}}Evaluation Mode{{< /ui >}}: ルールが {{< ui >}}Dry Run{{< /ui >}} として設定されている場合、その結果はゲート全体の結果を計算する際に考慮されません。

## ルールタイプ {#rule-types}

完全なスキーマおよび利用可能なすべてのオプションについては、[Deployment Gates API リファレンス][4]を参照してください。

{{< tabs >}}
{{% tab "モニター" %}}
モニタールールは、設定可能な期間にわたって一連のモニターの状態を評価します。評価期間中に次のいずれかの状態になると失敗します。

- クエリに一致するモニターがない。
- 50 個を超えるモニターがクエリに一致する。
- 一致するいずれかのモニターが `ALERT` または `NO_DATA` の状態である。

##### 構成設定 {#configuration-settings}

- {{< ui >}}Search Query{{< /ui >}}: 評価するモニターを検索するための[モニターの検索構文][1]に基づくクエリ。モニターのタグでフィルタリングします。
  - モニターの静的タグ: `service:transaction-backend`
  - モニターのクエリ内のタグ: `scope:"service:transaction-backend"`
  - [モニターのグループ化][2]内のタグ: `group:"service:transaction-backend"`
- {{< ui >}}Duration{{< /ui >}}: 一致するモニターを評価する期間 (秒単位)。デフォルトは 0 です (モニターは即座に評価されます)。最大値は 7200 秒 (2 時間) です。

##### クエリの例 {#example-queries}

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

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

##### 構成設定{#configuration-settings-1}

- {{< ui >}}Operation Name{{< /ui >}}: サービスの [APM プライマリオペレーション][3]の設定から自動的に取り込まれます。
- {{< ui >}}Duration{{< /ui >}}: 分析を実行する期間 (秒単位)。分析の信頼性を最適にするため、この値はデプロイ開始後少なくとも 900 秒 (15 分) に設定してください。最大値は 7200 秒 (2 時間) です。
- {{< ui >}}Allowed Resources{{< /ui >}}(オプション): 分析に含める [APM リソース][2]のカンマ区切りリスト。指定した場合、リストに含まれるリソースのみが分析されます。{{< ui >}}Excluded Resources{{< /ui >}} とは相互に排他的です。
- {{< ui >}}Excluded Resources{{< /ui >}}(オプション): 無視する [APM リソース][2]のカンマ区切りリスト (低ボリュームや低優先度のエンドポイントなど)。{{< ui >}}Allowed Resources{{< /ui >}} とは相互に排他的です。

**注**:
- このルールは、[追加のプライマリタグ][4]の値ごとに評価されるほか、集計分析でも評価されます。単一のプライマリタグのみを考慮する場合は、[ゲート評価をリクエスト](#evaluate-a-gate-from-your-pipeline)する際に指定してください。
- 新しいエラーとエラー率の増加は、リソースレベルで検出されます。
- このルールタイプは、`database` または `inferred service` としてマークされたサービスをサポートしていません。

[1]: /ja/watchdog/faulty_deployment_detection/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## パイプラインからゲートを評価する{#evaluate-a-gate-from-your-pipeline}

ゲートの構成後、関連するサービスをデプロイする際に評価をリクエストし、その結果に基づいてデプロイをブロックするか続行するかを決定します。

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] の `deployment gate`コマンドは、単一コマンドで評価を実行します。

```bash
datadog-ci deployment gate --service transaction-backend --env staging --identifier default
```

デプロイメントゲートに APM デプロイメント不良検出ルールが含まれている場合は、バージョンも指定してください (例: `--version 1.0.1`)。

コマンド:

- ゲート評価を開始するためのリクエストを送信し、評価が完了するまでブロックします。
- 評価を待機する時間のタイムアウトを構成できます。
- エラーに対する組み込みの自動再試行機能を備えています。
- 予期しない Datadog エラー時の動作をカスタマイズするために `--fail-on-error` を受け入れます。

`deployment gate` コマンドは、datadog-ci バージョン v3.17.0 以降で使用できます。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` コマンドはベータ版のコマンドです。

完全な構成オプションと使用例については、[`deployment gate` コマンドのドキュメント][4]を参照してください。

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
[AnalysisTemplate][1] または [ClusterAnalysisTemplate][1] を作成して、Argo Rollouts Kubernetes リソースから Deployment Gates を呼び出します。このテンプレートは、[datadog-ci deployment gate コマンド][7]を実行して Deployment Gates API とやり取りします。

下記のテンプレートを開始点として使用してください。

- `<YOUR_DD_SITE>` を実際の [Datadog サイトの名前][2]に置き換えます (例:{{< region-param key="dd_site" code="true" >}})。
- [API キー][5]と[アプリケーションキー][6]を環境変数として定義します。この例では、`datadog` という名前の [Kubernetes Secret][3] を使用し、`api-key` と `app-key` という 2 つのデータ値を含めています。`valueFrom` の代わりに `value` を使用して、値をプレーンテキストで渡すこともできます。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ClusterAnalysisTemplate
metadata:
  name: datadog-job-analysis
spec:
  args:
    - name: service
    - name: env
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
                    image: datadog/ci:v3.17.0
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
                      - datadog-ci deployment gate --service {{ args.service }} --env {{ args.env }} --identifier default
```

- 分析テンプレートは、Rollout リソースから引数 (`service`、`env`、`version` など) を受け取ることができます。詳細については、[Argo Rollouts の公式のドキュメント][4]を参照してください。
- `ttlSecondsAfterFinished`は、完了したジョブを 5 分後に削除します。
- `backoffLimit`は、ゲート評価が失敗した場合にジョブを再試行しないように 0 に設定されています。

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
[Datadog Deployment Gate GitHub Action][4] は、ワークフローの一部として評価を実行します。

既存のデプロイワークフローに `DataDog/deployment-gate-github-action` ステップを追加します。

```yaml
name: Deploy with Datadog Deployment Gate
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
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
          identifier: default

      - name: Deploy
        run: |
          echo "Deployment Gate passed, proceeding with deployment"
          # Your deployment commands here
```

デプロイメントゲートに APM デプロイメント不良検出ルールが含まれている場合は、バージョンも指定してください (例: `version: 1.0.1`)。

アクション:

- ゲート評価を開始するためのリクエストを送信し、評価が完了するまでブロックします。
- 評価を待機する時間のタイムアウトを構成できます。
- エラーに対する組み込みの自動再試行機能を備えています。
- 予期しない Datadog エラー時の動作をカスタマイズするために `fail-on-error` を受け入れます。

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

次に示すスクリプトを開始点として使用してください。このスクリプトは、インラインルールなしで事前構成済みゲートを評価します。

次のように置き換えてください。

- `<YOUR_DD_SITE>`: [Datadog サイトの名前][1] (例:{{< region-param key="dd_site" code="true" >}})
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
      "version": "$3"
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

- 3 つの入力 (`service`、`environment`、`version`) を受け取ります。`version` は、ゲートに APM デプロイメント不良検出ルールがある場合に必要です。必要に応じて、`identifier` と `primary_tag` を追加することもできます。
- 評価を開始するためのリクエストを送信し、`evaluation_id` を記録します。HTTP レスポンスコードを処理します。
  - 5xx: サーバーエラー。遅延を伴い再試行します。
  - 4xx: クライアントエラー。評価は失敗します。
  - 2xx: 評価が開始されました。
- 評価が完了するまで、`evaluation_id` を使用して評価ステータスエンドポイントをポーリングします。
  - 5xx: サーバーエラー。遅延を伴い再試行します。
  - 404: 評価がまだ開始されていません。遅延を伴い再試行します。
  - 4xx (404 を除く): クライアントエラー。評価は失敗します。
  - 2xx: `gate_status` をチェックし、完了していない場合は遅延を伴い再試行します。
- 評価が完了するか、最大ポーリング時間 (デフォルトは 10800 秒 = 3 時間) に達するまで、15 秒ごとにポーリングします。
- 初期リクエストですべての再試行が使い果たされた場合 (5xx レスポンス)、API 障害に対する耐性を持たせるため、この結果を成功として扱います。

実際のユースケースに合わせてスクリプトを調整してください。これには、`curl` (リクエストの実行用) と `jq` (返された JSON の処理用) を使用します。これらのコマンドが利用できない場合は、スクリプトの冒頭でインストールしてください (例: `apk add --no-cache curl jq`)。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "直接 API 呼び出し" %}}

デプロイメントゲートの評価は非同期です。評価をトリガーするとバックグラウンドで開始され、進捗状況を追跡するために使用できる評価 ID が API から返されます。

- まず、デプロイメントゲートの評価をリクエストします。プロセスが開始され、評価 ID が返されます。
- 次に、評価 ID を使用して評価ステータスエンドポイントを定期的にポーリングし、評価が完了した時点で結果を取得します。10 〜 20 秒ごとのポーリングを推奨します。

次のように置き換えてください。

- `<YOUR_DD_SITE>`: [Datadog サイトの名前][1] (例:{{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API キー][2]
- `<YOUR_APP_KEY>`: [アプリケーションキー][3]

Datadog にすでに存在するゲートの評価をリクエストします。

```bash
curl -X POST "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>" \
-d @- << EOF
{
  "data": {
    "type": "deployment_gates_evaluation_request",
    "attributes": {
      "service": "transaction-backend",
      "env": "staging",
      "identifier": "my-custom-identifier",
      "version": "v123-456",
      "primary_tag": "region:us-central-1"
    }
  }
}
EOF
```

オプションの属性:

- `identifier`: オプション。デフォルトは `default` です。
- `version`: APM デプロイメント不良検出ルールに必須です。
- `primary_tag`: オプション。APM デプロイメント不良検出分析のスコープを選択したプライマリタグに絞り込みます。

**注**: 404 HTTP レスポンスは、ゲートが見つからなかったか、ゲートは見つかったがルールが存在しないことを意味する場合があります。

ゲート評価が正常に開始されると、202 HTTP ステータスコードが返されます。

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

評価 ID を使用してステータスエンドポイントをポーリングし、ゲート評価のステータスを取得します。

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**注**: 評価をリクエストした直後にこのエンドポイントを呼び出すと、評価がまだ開始されていないため、404 HTTP レスポンスが返される可能性があります。数秒後に再試行してください。

200 HTTPレスポンスが返される場合、形式は次のようになります。

```json
{
   "data": {
       "id": "<random_response_uuid>",
       "type": "deployment_gates_evaluation_result_response",
       "attributes": {
           "dry_run": false,
           "evaluation_id": "e9d2f04f-4f4b-494b-86e5-52f03e10c8e9",
           "evaluation_url": "https://app.datadoghq.com/ci/deployment-gates/evaluations?index=cdgates&query=level%3Agate+%40evaluation_id%3Ae9d2f14f-4f4b-494b-86e5-52f03e10c8e9",
           "gate_id": "e140302e-0cba-40d2-978c-6780647f8f1c",
           "gate_status": "pass",
           "rules": [
               {
                   "name": "Check service monitors",
                   "status": "fail",
                   "reason": "One or more monitors in ALERT state: https://app.datadoghq.com/monitors/34330981",
                   "dry_run": true
               }
           ]
       }
   }
}
```

`data.attributes.gate_status` フィールドには、次のいずれかの値を持つ評価結果が含まれます。

- `in_progress`: デプロイメントゲートの評価が進行中です。ポーリングを続けてください。
- `pass`: デプロイメントゲートの評価に合格しました。
- `fail`: デプロイメントゲートの評価に失敗しました。

**注**: `data.attributes.dry_run` フィールドが `true` の場合、`data.attributes.gate_status` フィールドは常に `pass` になります。

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## 初回オンボーディングの推奨事項{#recommendation-for-first-time-onboarding}

Deployment Gates を Continuous Delivery ワークフローに統合する際に評価フェーズを設けることで、この製品が期待どおりに動作していることを、デプロイに影響を与えずに確認できます。ドライラン評価モードと [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][7] ページを使用してください。

1. サービスのゲートを作成し、{{< ui >}}Evaluation Mode{{< /ui >}} を {{< ui >}}Dry Run{{< /ui >}} に設定します。
2. ゲート評価をデプロイプロセスに追加します。ゲートがドライランモードの間は、API から常に `pass` が返され、デプロイはゲート結果の影響を受けません。
3. 一定の期間 (1 〜 2 週間な) が経過した後、{{< ui >}}Deployment Gates Evaluations{{< /ui >}} ページでゲートとルールの実行状況をチェックします。UI には実際のステータスが表示されるため、ゲートがいつ失敗したかやその理由を確認できます。
4. ゲートの動作が期待どおりであることを確認したら、ゲートを編集し、評価モードを {{< ui >}}Dry Run{{< /ui >}} から {{< ui >}}Active{{< /ui >}} に切り替えます。以降は、API から実際のステータスが返されようになり、ゲートの結果に基づいてデプロイの昇格またはロールバックが開始されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ja/api/latest/deployment-gates
[5]: /ja/deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
[7]: https://app.datadoghq.com/ci/deployment-gates/evaluations