---
description: Datadog でゲートとルールを事前に作成し、デプロイ時にサービスおよび環境によってそれらを参照します。
further_reading:
- link: /deployment_gates/setup/jit
  tag: ドキュメント
  text: Just-In-Time (JIT) デプロイメントゲートをセットアップする
- link: /deployment_gates/explore
  tag: ドキュメント
  text: デプロイメントゲートエクスプローラーについて
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: デプロイメントゲート API リファレンス
title: 事前構成されたデプロイメントゲートをセットアップする
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
デプロイメントゲートはプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

**事前構成された**デプロイメントゲートでは、ゲートとルールが Datadog に保持され、評価時にサービスおよび環境によって参照されます。事前構成されたゲートは、多くのデプロイメント間でルールを共有したい場合、Terraform で構成を管理したい場合、または CI ユーザー以外のユーザーに Datadog UI でルールを編集させたい場合に適しています。

デプロイ構成でルールをインラインで定義することをご希望ですか。[Just-In-Time (JIT) デプロイメントゲート][5] を参照してください。

## ゲートを作成する {#create-a-gate}

<div class="alert alert-info">デプロイメントゲート UI の使用に加えて、<a href="https://docs.datadoghq.com/api/latest/deployment-gates">デプロイメントゲート API</a> または <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">Datadog Terraform プロバイダー</a>を使用して、ゲートとルールをプログラムで管理することができます。</div>

1. [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6] の順に移動します。
2. {{< ui >}}Create Gate{{< /ui >}} をクリックします。
3. 次の設定を構成します。
   - {{< ui >}}Service{{< /ui >}}: サービス名 (例: `transaction-backend`)。
   - {{< ui >}}Environment{{< /ui >}}: ターゲット環境 (例: `dev`)。
   - {{< ui >}}Identifier{{< /ui >}} (オプション、デフォルト値は `default`): 同じサービス/環境上の複数のゲートに対する一意の名前。これを使用して、以下を実行します。
     - 異なるデプロイ戦略を許可する (例: `fast-deploy` と `default`)
     - デプロイフェーズを区別する (例: `pre-deploy` と `post-deploy`)
     - カナリーステージを定義する (例: `pre-deploy` と `canary-20pct`)。
   - {{< ui >}}Evaluation Mode{{< /ui >}}: デプロイに影響を与えずにゲートの動作をテストするには、{{< ui >}}Dry Run{{< /ui >}} を有効にしてください。ドライランゲートの評価は常に合格ステータスで応答しますが、アプリ内の結果には実際の評価が反映されます。これは、デプロイパイプラインに影響を与えずにゲート動作の初期評価を行う場合に便利です。

## ゲートにルールを追加する {#add-rules-to-a-gate}

各ゲートには、評価対象となるルールが 1 つ以上必要です。ゲートが成功するには、すべてのルールに合格する必要があります。各ルールについて、以下を指定します。

1. {{< ui >}}Name{{< /ui >}}: [デプロイメントゲート評価][7] ページに表示される説明ラベル (例: `Check all P0 monitors`)。
2. {{< ui >}}Type{{< /ui >}}: {{< ui >}}Monitor{{< /ui >}} または {{< ui >}}Faulty Deployment Detection{{< /ui >}} を選択します。
3. 選択したルールタイプに基づく追加の設定。利用可能なオプションについては、[ルールタイプ](#rule-types)を参照してください。
4. {{< ui >}}Evaluation Mode{{< /ui >}}: ルールが {{< ui >}}Dry Run{{< /ui >}} として設定されている場合、その結果はゲート全体の計算時には考慮されません。

## ルールタイプ {#rule-types}

完全なスキーマおよび利用可能なすべてのオプションについては、[デプロイメントゲート API リファレンス][4] を参照してください。

{{< tabs >}}
{{% tab "モニター" %}}
モニタールールは、構成可能な期間にわたって一連のモニターの状態を評価します。検索クエリまたは明示的なモニターのリストを使用して、モニターを選択します。これらの選択方法は相互に排他的です。評価期間中に以下のいずれかが発生した場合、ルールは失敗する可能性があります。

- 構成された選択条件に一致するモニターグループがありません。
- 明示的なモニター ID が存在しないか、組織で利用できません。
- 構成された選択条件に 300 を超えるモニターが一致しています。
- 一致するモニターグループがいずれも `ALERT` または `NO_DATA` 状態です。

##### コンフィギュレーション設定 {#configuration-settings}

- {{< ui >}}Monitors matching query{{< /ui >}}: [検索モニター構文][1] に基づいてクエリを入力します。モニタータグでフィルタリングします。
  - モニターの静的タグ: `service:transaction-backend`
  - モニターのクエリ内のタグ: `scope:"service:transaction-backend"`
  - [モニターのグループ化][2] 内のタグ: `group:"service:transaction-backend"`
- {{< ui >}}Specific monitors{{< /ui >}}: 個別のモニターを選択し、必要に応じて各モニターの評価対象の正確なグループを選択します。グループが選択されていない場合、そのモニターのすべてのグループが評価されます。
- {{< ui >}}Duration{{< /ui >}}: 選択したモニターが評価される期間 (秒単位)。デフォルトは 0 です (モニターは即座に評価されます)。最大値は 7200 秒 (2 時間) です。

##### クエリの例 {#example-queries}

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

##### 特定のモニター API の例 {#specific-monitors-api-example}

```json
"options": {
  "monitor_ids": [
    {"id": "12345678", "groups": []},
    {"id": "87654321", "groups": ["service:api", "env:prod"]}
  ],
  "duration": 300
}
```

各 `id` は 10 進数で表されるモニター ID です。グループ値は正確なグループ名です。`query` を `monitor_ids` と一緒に送信しないでください。

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

##### コンフィギュレーション設定 {#configuration-settings-1}

- {{< ui >}}Operation Name{{< /ui >}}: サービスの [APM プライマリオペレーション][3] 設定から自動的に入力されます。
- {{< ui >}}Duration{{< /ui >}}: 解析が実行される時間 (秒単位)。最適な解析の信頼性を確保するため、この値はデプロイ開始後少なくとも 900 秒 (15 分) でなければなりません。最大値は 7200 秒 (2 時間) です。
- {{< ui >}}Allowed Resources{{< /ui >}}(オプション): 解析に含める [APM リソース][2] のカンマ区切りのリスト。指定された場合、リストにあるリソースのみが解析されます。{{< ui >}}Excluded Resources{{< /ui >}} とは相互に排他的です。
- {{< ui >}}Excluded Resources{{< /ui >}}(オプション): 無視する [APM リソース][2] のカンマ区切りのリスト (例: 低ボリュームまたは優先度の低いエンドポイント)。{{< ui >}}Allowed Resources{{< /ui >}} とは相互に排他的です。

**注**:
- このルールは各 [追加のプライマリタグ][4] の値と集計解析の両方について評価されます。単一のプライマリタグのみを考慮するには、[ゲート評価をリクエストする](#evaluate-a-gate-from-your-pipeline)際に指定してください。
- リソースレベルで新しいエラーやエラー率の増加が検出されます。
- このルールタイプは、`database` または `inferred service` としてマークされたサービスをサポートしていません。

[1]: /ja/watchdog/faulty_deployment_detection/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## パイプラインからゲートを評価する {#evaluate-a-gate-from-your-pipeline}

ゲートの構成後、関連サービスをデプロイする際に評価をリクエストし、その結果に基づいてデプロイをブロックするか続行するかを決定します。

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] `deployment gate`コマンドは、単一のコマンドで評価を実行します。

```bash
datadog-ci deployment gate --service transaction-backend --env staging --identifier default
```

デプロイメントゲートに APM Faulty Deployment Detection ルールが含まれている場合は、バージョンも指定してください (例: `--version 1.0.1`)。

コマンド:

- ゲート評価を開始するリクエストを送信し、評価が完了するまでブロックします。
- 評価の待機時間を構成できるタイムアウトを提供します。
- エラーに対する組み込みの自動再試行機能があります。
- 予期しない Datadog エラー時の動作をカスタマイズするための `--fail-on-error` を受け付けます。

`deployment gate` コマンドは、datadog-ci バージョン v3.17.0 以降で使用可能です。

**必要な環境変数**:

- `DD_API_KEY`: [API キー][2]。
- `DD_APP_KEY`: [アプリケーションキー][3]。
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` コマンドはベータ版コマンドです。

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

- 分析テンプレートは、Rollout リソースから引数 (`service`、`env`、`version`など) を受け取ることができます。詳細については、[Argo Rollouts の公式ドキュメント][4] を参照してください。
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

デプロイメントゲートに APM Faulty Deployment Detection ルールが含まれている場合は、バージョンも指定してください (例: `version: 1.0.1`)。

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

このスクリプトを開始点として使用します。インラインルールなしで、事前構成されたゲートを評価します。

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

- 次の 3 つの入力を受け付けます。`service`、`environment`、`version`。ゲートに APM Faulty Deployment Detection ルールがある場合は、`version` が必要です。必要に応じて、`identifier` と `primary_tag` を追加することもできます。
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

- `identifier`: オプション、デフォルトは `default`。
- `version`: APM Faulty Deployment Detection ルールに必須です。
- `primary_tag`: オプション。APM Faulty Deployment Detection の分析を選択したプライマリタグに絞り込みます。

**注**: 404 HTTP レスポンスは、ゲートが見つからなかったか、ゲートは見つかったもののルールが存在しないことを意味する場合があります。

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

Continuous Delivery ワークフローにデプロイメントゲートを統合する際、評価フェーズを設けることで、デプロイメントに影響を与える前に製品が期待通りに動作していることを確認できます。ドライラン評価モードと [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][7] ページを使用します。

1. サービスのゲートを作成し、{{< ui >}}Evaluation Mode{{< /ui >}} を {{< ui >}}Dry Run{{< /ui >}} に設定します。
2. デプロイメントプロセスにゲート評価を追加します。ゲートがドライランモードの間、API は常に `pass` を返し、デプロイメントはゲート結果の影響を受けません。
3. 一定期間 (例: 1 〜 2 週間) 経過後、{{< ui >}}Deployment Gates Evaluations{{< /ui >}} ページでゲートとルールの実行をチェックしてください。UI には実際のステータスが表示されるため、ゲートが失敗したタイミングとその理由を確認できます。
4. ゲートの動作が期待通りであることを確認したら、ゲートを編集し、評価モードを {{< ui >}}Dry Run{{< /ui >}} から {{< ui >}}Active{{< /ui >}} に切り替えます。その後、API は実際のステータスを返すようになり、ゲートの結果に基づいてデプロイメントの昇格やロールバックが開始されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ja/api/latest/deployment-gates
[5]: /ja/deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
[7]: https://app.datadoghq.com/ci/deployment-gates/evaluations