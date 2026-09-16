---
description: Datadog에서 게이트와 규칙을 미리 생성한 다음, 배포 시 서비스 및 환경별로 참조하세요.
further_reading:
- link: /deployment_gates/setup/jit
  tag: 설명서
  text: JIT (Just-In-Time) Deployment Gates 설정하기
- link: /deployment_gates/explore
  tag: 설명서
  text: Deployment Gates 탐색기에 대해 알아보기
- link: /api/latest/deployment-gates
  tag: API 참조
  text: Deployment Gates API 참조
title: 사전 구성된 Deployment Gates를 설정
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates는 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

**사전 구성된** Deployment Gates를 사용하면 게이트와 규칙이 Datadog에 저장되며, 평가 시 서비스 및 환경을 기준으로 참조됩니다. 사전 구성된 게이트는 여러 배포에서 규칙을 공유하거나, Terraform에서 구성을 관리하거나, CI 사용자가 아닌 사용자가 Datadog UI에서 규칙을 편집하도록 하려는 경우에 적합합니다.

배포 구성에서 규칙을 인라인으로 정의하려면 [JIT (Just-In-Time) Deployment Gates][5]를 참조하세요.

## 게이트 생성 {#create-a-gate}

<div class="alert alert-info">Deployment Gates UI를 사용하는 것 외에도 <a href="https://docs.datadoghq.com/api/latest/deployment-gates">Deployment Gates API</a> 또는 <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/deployment_gate">Datadog Terraform provider</a>를 사용하여 프로그래밍 방식으로 게이트와 규칙을 관리할 수 있습니다.</div>

1. [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Deployment Gates{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}}][6]로 이동합니다.
2. {{< ui >}}Create Gate{{< /ui >}}를 클릭합니다.
3. 다음 설정을 구성합니다.
   - {{< ui >}}Service{{< /ui >}}: 서비스 이름입니다(예: `transaction-backend`).
   - {{< ui >}}Environment{{< /ui >}}: 대상 환경입니다(예: `dev`).
   - {{< ui >}}Identifier{{< /ui >}}(필요시, 기본값은 `default`): 동일한 서비스/환경에 있는 여러 게이트에 대한 고유 이름입니다. 다음과 같은 용도로 사용할 수 있습니다.
     - 다양한 배포 전략을 허용합니다(예: `fast-deploy` 또는 `default`).
     - 배포 단계를 구분합니다(예: `pre-deploy` 또는 `post-deploy`).
     - 카나리 스테이지를 정의합니다(예: `pre-deploy` 또는 `canary-20pct`).
   - {{< ui >}}Evaluation Mode{{< /ui >}}: 배포에 영향을 주지 않고 게이트 동작을 테스트하려면 {{< ui >}}Dry Run{{< /ui >}}을 활성화하세요. Dry Run 게이트의 평가는 항상 통과 상태로 응답하지만, 앱 내 결과에서는 실제 평가가 표시됩니다. 이는 배포 파이프라인에 영향을 주지 않고 게이트 동작을 처음 평가할 때 유용합니다.

## 게이트에 규칙 추가 {#add-rules-to-a-gate}

각 게이트는 평가할 하나 이상의 규칙이 필요합니다. 게이트가 성공하려면 모든 규칙이 통과해야 합니다. 각 규칙에 대해 다음을 지정하세요.

1. {{< ui >}}Name{{< /ui >}}: [Deployment Gates Evaluations][7] 페이지에 표시되는 설명 레이블입니다(예: `Check all P0 monitors`).
2. {{< ui >}}Type{{< /ui >}}: {{< ui >}}Monitor{{< /ui >}} 또는 {{< ui >}}Faulty Deployment Detection{{< /ui >}}을 선택합니다.
3. 선택한 규칙 유형에 따른 추가 설정을 구성합니다. 사용 가능한 옵션은 [규칙 유형](#rule-types)을 참조하세요.
4. {{< ui >}}Evaluation Mode{{< /ui >}}: 규칙을 {{< ui >}}Dry Run{{< /ui >}}으로 설정한 경우, 전체 게이트 결과를 계산할 때 해당 규칙의 결과는 반영되지 않습니다.

## 규칙 유형 {#rule-types}

전체 스키마 및 사용 가능한 모든 옵션은 [Deployment Gates API 참조][4]를 참조하세요.

{{< tabs >}}
{{% tab "Monitor" %}}
Monitor 규칙은 구성 가능한 기간 동안 모니터 집합의 상태를 평가합니다. 평가 기간 중 언제든지 다음 상황이 발생하면 실패합니다.

- 쿼리와 일치하는 모니터가 없는 경우
- 쿼리와 일치하는 모니터가 50개를 초과하는 경우
- 일치하는 모니터 중 하나라도 `ALERT` 또는 `NO_DATA` 상태인 경우

##### 구성 설정 {#configuration-settings}

- {{< ui >}}Search Query{{< /ui >}}: [Search Monitor 구문][1]을 기반으로 평가할 모니터를 찾는 데 사용되는 쿼리입니다. 다음 모니터 태그를 기준으로 필터링할 수 있습니다.
  - 모니터 정적 태그: `service:transaction-backend`
  - 모니터 쿼리 내 태그: `scope:"service:transaction-backend"`
  - [모니터 그룹][2] 내 태그: `group:"service:transaction-backend"`
- {{< ui >}}Duration{{< /ui >}}: 일치하는 모니터를 평가할 기간(초)입니다. 기본값은 0입니다. 이 경우 모니터가 즉시 평가됩니다. 최댓값은 7,200초(2시간)입니다.

##### 쿼리 예시 {#example-queries}

- `env:prod service:transaction-backend`
- `env:prod (service:transaction-backend OR group:"service:transaction-backend" OR scope:"service:transaction-backend")`
- `tag:"use_deployment_gates" team:payment`
- `tag:"use_deployment_gates" AND (NOT group:("team:frontend"))`

**참고**:
- `group`필터는 일치하는 그룹만 평가합니다.
- 음소거된 모니터는 평가에서 자동으로 제외됩니다. 쿼리에는 항상 `muted:false`가 포함됩니다.

[1]: /ko/monitors/manage/search/
[2]: /ko/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM Faulty Deployment Detection" %}}
이 규칙 유형은 Watchdog의 [APM Faulty Deployment Detection][1] 분석을 사용하여 배포된 버전과 동일한 서비스의 이전 버전을 비교합니다. 분석을 통해 탐지되는 사항은 다음과 같습니다.

- 새로운 유형의 오류
- 이전 버전 대비 오류율이 크게 증가한 경우

이 분석은 모든 APM 계측 서비스에 대해 자동으로 수행되며, 사전 설정이 필요하지 않습니다.

##### 구성 설정 {#configuration-settings-1}

- {{< ui >}}Operation Name{{< /ui >}}: 서비스의 [APM 기본 작업][3] 설정에서 자동으로 입력됩니다.
- {{< ui >}}Duration{{< /ui >}}: 분석이 실행되는 시간(초)입니다. 분석 신뢰도를 위해 이 값은 배포 시작 후 900초(15분) 이상으로 설정하는 것이 좋습니다. 최댓값은 7,200초(2시간)입니다.
- {{< ui >}}Allowed Resources{{< /ui >}} (필요시): 분석에 포함할 쉼표로 구분된 [APM 리소스][2]입니다. 지정된 경우 목록에 있는 리소스만 분석됩니다. {{< ui >}}Excluded Resources{{< /ui >}}와 상호 배타적입니다.
- {{< ui >}}Excluded Resources{{< /ui >}} (선택 사항): 무시할 쉼표로 구분된 [APM 리소스][2]입니다(예: 낮은 볼륨 또는 낮은 우선순위 엔드포인트). {{< ui >}}Allowed Resources{{< /ui >}}와 상호 배타적입니다.

**참고**:
- 이 규칙은 각 [추가 기본 태그][4] 값과 집계 분석에 대해 평가됩니다. 단일 기본 태그만 고려하려면 [게이트 평가를 요청](#evaluate-a-gate-from-your-pipeline)할 때 지정하세요.
- 리소스 수준에서 새로운 오류 및 오류율 증가가 탐지됩니다.
- 이 규칙 유형은 `database` 또는 `inferred service`로 표시된 서비스를 지원하지 않습니다.

[1]: /ko/watchdog/faulty_deployment_detection/
[2]: /ko/tracing/services/resource_page/
[3]: /ko/tracing/guide/configuring-primary-operation/#primary-operations
[4]: /ko/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## 파이프라인에서 게이트 평가 {#evaluate-a-gate-from-your-pipeline}

게이트를 구성한 후 관련 서비스를 배포할 때 평가를 요청하고, 결과에 따라 배포를 차단하거나 계속할지 결정하세요.

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] `deployment gate` 명령은 단일 명령으로 평가를 실행합니다.

```bash
datadog-ci deployment gate --service transaction-backend --env staging --identifier default
```

Deployment Gate에 APM Faulty Deployment Detection 규칙이 포함된 경우 버전(예: `--version 1.0.1`)도 지정하세요.

이 명령은 다음을 수행합니다.

- 게이트 평가를 시작하기 위한 요청을 전송하고 평가가 완료될 때까지 대기합니다.
- 평가를 기다릴 최대 시간을 구성할 수 있습니다.
- 오류에 대한 자동 재시도 기능이 내장되어 있습니다.
- 예기치 않은 Datadog 오류 발생 시 동작을 사용자 지정하기 위해 `--fail-on-error`을 지원합니다.

`deployment gate` 명령은 datadog-ci 버전 v3.17.0 이상에서 사용할 수 있습니다.

**필수 환경 변수**:

- `DD_API_KEY`: [API 키][2]
- `DD_APP_KEY`: [애플리케이션 키][3]
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` 명령은 베타 명령입니다.

전체 구성 옵션 및 사용 예시는 [`deployment gate` 명령 문서][4]를 참조하세요.

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
Argo Rollouts Kubernetes 리소스에서 [AnalysisTemplate][1] 또는 [ClusterAnalysisTemplate][1]을 생성하여 Deployment Gates를 호출하세요. 이 템플릿은 [datadog-ci 배포 게이트 명령][7]을 실행하여 Deployment Gates API와 상호작용합니다.

아래 템플릿을 시작점으로 사용하세요.

- `<YOUR_DD_SITE>`를 [Datadog 사이트 이름][2]으로 바꿉니다(예: {{< region-param key="dd_site" code="true" >}}).
- [API 키][5] 및 [애플리케이션 키][6]를 환경 변수로 정의합니다. 이 예시에서는 `api-key` 및 `app-key`라는 두 개의 데이터 값을 가진 `datadog`이라는 [Kubernetes 시크릿][3]을 사용합니다. `valueFrom` 대신 `value`를 사용하여 일반 텍스트로 값을 전달할 수도 있습니다.

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

- 분석 템플릿은 Rollout 리소스(예: `service`, `env`, `version`)로부터 인수를 받을 수 있습니다. 자세한 내용은 [공식 Argo Rollouts 문서][4]를 참조하세요.
- `ttlSecondsAfterFinished`는 완료된 작업을 5분 후에 제거합니다.
게이트 평가가 실패할 경우 작업을 재시도하지 않아야 하므로 - `backoffLimit`은 0으로 설정됩니다.

분석 템플릿을 생성한 후 Argo Rollouts 전략에서 이를 참조하세요.

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
[2]: /ko/getting_started/site/
[3]: https://kubernetes.io/docs/concepts/configuration/secret/
[4]: https://argo-rollouts.readthedocs.io/en/stable/features/analysis/#analysis-template-arguments
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "GitHub Actions" %}}
[Datadog Deployment Gate GitHub Action][4]은 워크플로의 일부로 평가를 실행합니다.

기존 배포 워크플로에 `DataDog/deployment-gate-github-action` 단계를 추가하세요:

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

Deployment Gate에 APM Faulty Deployment Detection 규칙이 포함된 경우 버전(예: `version: 1.0.1`)도 지정하세요.

이 액션은 다음을 수행합니다.

- 게이트 평가를 시작하기 위한 요청을 전송하고 평가가 완료될 때까지 대기합니다.
- 평가를 기다릴 최대 시간을 구성할 수 있습니다.
- 오류에 대한 자동 재시도 기능이 내장되어 있습니다.
- 예기치 않은 Datadog 오류 발생 시 동작을 사용자 지정하기 위해 `fail-on-error`을 지원합니다.

**필수 환경 변수**:

- `DD_API_KEY`: [API 키][2]
- `DD_APP_KEY`: [애플리케이션 키][3]

전체 구성 옵션 및 사용 예시는 [`DataDog/deployment-gate-github-action` 리포지토리][4]를 참조하세요.

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "일반 스크립트" %}}

이 스크립트를 시작점으로 사용하세요. 이 스크립트는 인라인 규칙 없이 사전 구성된 게이트를 평가합니다.

다음 값을 바꾸세요.

- `<YOUR_DD_SITE>`: [Datadog 사이트 이름][1](예: {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API 키][2]
- `<YOUR_APP_KEY>`: [애플리케이션 키][3]

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

이 스크립트는 다음을 수행합니다.

- `service`, `environment`, `version` 세 가지 입력을 받습니다. 게이트에 APM Faulty Deployment Detection 규칙이 있는 경우 `version`이 필요합니다. 필요시 `identifier` 및 `primary_tag`를 추가할 수도 있습니다.
- 평가를 시작하기 위한 요청을 보내고 `evaluation_id`를 기록합니다. HTTP 응답 코드는 다음과 같이 처리합니다.
  - 5xx: 서버 오류, 일정 시간 후 재시도합니다.
  - 4xx: 클라이언트 오류, 평가에 실패합니다.
  - 2xx: 평가가 시작되었습니다.
- `evaluation_id`를 사용하여 평가가 완료될 때까지 평가 상태 엔드포인트를 폴링합니다.
  - 5xx: 서버 오류, 일정 시간 후 재시도합니다.
  - 404: 평가가 아직 시작되지 않음, 일정 시간 후 재시도합니다.
  - 4xx(404 제외): 클라이언트 오류, 평가에 실패합니다.
  - 2xx: `gate_status`를 검사하고 완료되지 않은 경우 일정 시간 후 재시도합니다.
- 평가가 완료되거나 최대 폴링 시간(기본값: 10,800초 = 3시간)에 도달할 때까지 15초마다 폴링합니다.
- 초기 요청에서 모든 재시도가 소진되면(5xx 응답) 스크립트는 API 오류에 유연하게 대응하기 위해 이를 성공으로 처리합니다.

사용 사례에 맞게 스크립트를 조정하세요. 이 스크립트는 요청을 수행하는 데 `curl`을 사용하고, 반환된 JSON을 처리하는 데 `jq`를 사용합니다. 이러한 명령을 사용할 수 없는 경우, 스크립트 시작 부분에 설치하세요(예: `apk add --no-cache curl jq` 사용).

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "직접 API 호출" %}}

Deployment Gates 평가는 비동기식입니다. 평가를 트리거하면 백그라운드에서 시작되며, API는 진행 상황을 추적하는 데 사용할 수 있는 평가 ID를 반환합니다.

- 먼저, Deployment Gates 평가를 요청하면 프로세스가 시작되고 평가 ID가 반환됩니다.
- 그런 다음 평가 ID를 사용하여 주기적으로 평가 상태 엔드포인트를 폴링하여 평가 완료 시 결과를 검색합니다. 10~20초마다 폴링하는 것을 권장합니다.

다음 값을 바꾸세요.

- `<YOUR_DD_SITE>`: [Datadog 사이트 이름][1](예: {{< region-param key="dd_site" code="true" >}})
- `<YOUR_API_KEY>`: [API 키][2]
- `<YOUR_APP_KEY>`: [애플리케이션 키][3]

Datadog에 이미 존재하는 게이트에 대한 평가를 요청하세요.

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

선택적 속성:

- `identifier`: 선택 사항이며, 기본값은 `default`입니다.
- `version`: APM Faulty Deployment Detection 규칙에 필요합니다.
- `primary_tag`: 선택 사항이며, APM Faulty Deployment Detection 범위를 선택한 기본 태그로 제한합니다.

**참고**: 404 HTTP 응답은 게이트를 찾을 수 없거나, 게이트는 찾았지만 규칙이 없음을 의미할 수 있습니다.

게이트 평가가 성공적으로 시작되면 202 HTTP 상태 코드가 반환됩니다.

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

`data.attributes.evaluation_id` 필드에는 이 게이트 평가의 고유 식별자가 포함됩니다.

평가 ID를 사용하여 상태 엔드포인트를 폴링하여 게이트 평가 상태를 가져오세요.

```bash
curl -X GET "https://api.<YOUR_DD_SITE>/api/v2/deployments/gates/evaluation/<evaluation_id>" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-H "DD-APPLICATION-KEY: <YOUR_APP_KEY>"
```

**참고**: 평가를 요청한 직후 이 엔드포인트를 호출하면 평가가 아직 시작되지 않아 404 HTTP 응답이 반환될 수 있습니다. 몇 초 후에 다시 시도하세요.

200 HTTP 응답이 반환될 경우 응답의 형식은 다음과 같습니다.

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

`data.attributes.gate_status` 필드에는 평가 결과가 포함되며, 값은 다음 중 하나입니다.

- `in_progress`: Deployment Gates 평가가 아직 진행 중입니다. 폴링을 계속하세요.
- `pass`: Deployment Gates 평가가 통과되었습니다.
- `fail`: Deployment Gates 평가가 실패했습니다.

**참고**: `data.attributes.dry_run` 필드가 `true`인 경우, `data.attributes.gate_status` 필드는 항상 `pass`입니다.

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

## 첫 온보딩을 위한 권장 사항{#recommendation-for-first-time-onboarding}

Continuous Delivery 워크플로에 Deployment Gates를 통합할 때 평가 단계를 사용하면 배포에 영향을 주기 전에 제품이 예상대로 작동하는지 확인하는 데 도움이 됩니다. Dry Run 평가 모드와 [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][7] 페이지를 사용하세요.

1. 서비스에 대한 게이트를 생성하고 {{< ui >}}Evaluation Mode{{< /ui >}}를 {{< ui >}}Dry Run{{< /ui >}}으로 설정합니다.
2. 배포 프로세스에 게이트 평가를 추가합니다. 게이트가 Dry Run 모드인 동안 API는 항상 `pass`를 반환하며, 게이트 결과가 배포에 영향을 주지 않습니다.
3. 일정 기간(예: 1~2주) 후에 {{< ui >}}Deployment Gates Evaluations{{< /ui >}} 페이지에서 게이트 및 규칙 실행을 검사합니다. UI에 실제 상태가 표시되므로 게이트가 실패했을 시점과 그 이유를 확인할 수 있습니다.
4. 게이트가 예상대로 동작한다고 확신하면 게이트를 편집하고 평가 모드를 {{< ui >}}Dry Run{{< /ui >}}에서 {{< ui >}}Active{{< /ui >}}로 전환합니다. 그 후, API가 실제 상태를 반환하기 시작하고 게이트 결과에 따라 배포가 승격되거나 롤백되기 시작합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ko/api/latest/deployment-gates
[5]: /ko/deployment_gates/setup/jit
[6]: https://app.datadoghq.com/ci/deployment-gates/gates
[7]: https://app.datadoghq.com/ci/deployment-gates/evaluations