---
description: 평가 요청에 규칙을 인라인으로 전송하여 Deployment Gates를 평가하세요. Datadog에 게이트를 미리 생성할 필요가
  없습니다.
further_reading:
- link: /deployment_gates/setup/preconfigured
  tag: 설명서
  text: 사전 구성된 Deployment Gates 설정
- link: /deployment_gates/explore
  tag: 설명서
  text: Deployment Gates 탐색기에 대해 알아보기
- link: /api/latest/deployment-gates
  tag: API 참조
  text: Deployment Gates API 참조
title: JIT(Just-In-Time) Deployment Gates 설정
---
{{< callout url="http://datadoghq.com/product-preview/deployment-gates" >}}
Deployment Gates는 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

**JIT(Just-In-Time)** Deployment Gates를 사용하면 평가 요청에 규칙이 인라인으로 정의됩니다. Datadog에 게이트를 미리 생성할 필요가 없으므로 JIT가 Rules-as-Code 및 배포별 유연성에 적합합니다.

Datadog UI, API 또는 Terraform에서 관리되는 영구 게이트가 필요한 경우 [사전 구성된 Deployment Gates][5]를 참조하세요.

## 구성 {#configuration}

예시 `configuration`:

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

최상위 수준 필드:

- `rules`(필수): 하나 이상의 규칙 항목입니다. 게이트가 통과하려면 모든 규칙을 통과해야 합니다.
- `dry_run` (선택 사항): `true`이면 게이트가 API를 통해 항상 `pass`를 반환하며, 실제 결과는 UI에 기록됩니다. 온보딩에 유용합니다. [첫 온보딩을 위한 권장 사항](#recommendation-for-first-time-onboarding)을 참조하세요.

각 규칙에는 다음과 같은 필드가 있습니다.

- `type`(필수): 규칙 유형, `monitor` 또는 `faulty_deployment_detection`입니다. 각 항목이 평가하는 대상은 [규칙 유형](#rule-types)을 참조하세요.
- `name` (필수): [Deployment Gates Evaluations][6] 페이지에 표시되는 사람이 읽을 수 있는 레이블입니다.
- `options` (필수): 규칙별 설정입니다. [규칙 유형](#rule-types)을 참조하세요.
- `dry_run` (선택 사항): 규칙별 dry-run 재정의입니다. 게이트 수준 `dry_run`을 재정의합니다.

## 규칙 유형 {#rule-types}

전체 스키마 및 사용 가능한 모든 옵션은 [Deployment Gates API 참조][4]를 참조하세요.

{{< tabs >}}
{{% tab "모니터링" %}}
모니터링 규칙은 구성 가능한 기간 동안 모니터링 세트의 상태를 평가합니다. 평가 기간 중 언제든지 다음 상황이 발생하면 실패합니다.

- 쿼리와 일치하는 모니터링이 없습니다.
- 50개 이상의 모니터링이 쿼리와 일치합니다.
- 일치하는 모니터링이 `ALERT` 또는 `NO_DATA` 상태입니다.

**옵션**:

- `query`: [모니터링 검색 구문][1]을 기반으로 하는 모니터링 검색 쿼리입니다. 다음과 같은 모니터링 태그를 기준으로 필터링할 수 있습니다.
  - 모니터링 정적 태그: `service:transaction-backend`
  - 모니터링 쿼리 내 태그: `scope:"service:transaction-backend"`
  - [모니터링 그룹화][2] 내 태그: `group:"service:transaction-backend"`
- `duration`: 일치하는 모니터링을 평가할 기간(초)입니다. 기본값은 0입니다(모니터링이 즉시 평가됨). 최댓값은 7,200초(2시간)입니다.

인라인 규칙 예시:

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

**참고**:
- `group` 필터는 일치하는 그룹만 평가합니다.
- 음소거된 모니터링은 평가에서 자동으로 제외됩니다(쿼리에 항상 `muted:false`가 포함됨).

[1]: /ko/monitors/manage/search/
[2]: /ko/monitors/manage/#triggered-monitors
{{% /tab %}}
{{% tab "APM 잘못된 배포 탐지" %}}
이 규칙 유형은 Watchdog의 [APM 잘못된 배포 탐지][1] 분석을 사용하여 배포된 버전과 동일한 서비스의 이전 버전을 비교합니다. 분석을 통해 탐지되는 사항은 다음과 같습니다.

- 새로운 유형의 오류
- 이전 버전 대비 오류율의 상당한 증가

이 분석은 모든 APM 계측 서비스에 대해 자동으로 수행되며, 사전 설정이 필요하지 않습니다.

**옵션**:

- `duration`: 분석이 실행되는 시간(초)입니다. 최적의 분석 신뢰도를 위해 이 값은 배포 시작 후 900초(15분) 이상이어야 합니다. 최댓값은 7,200초(2시간)입니다.
- `allowed_resources` (선택 사항): 분석에 포함할 [APM 리소스][2]입니다. 지정된 경우 나열된 리소스만 분석됩니다. `excluded_resources`와 상호 배타적입니다.
- `excluded_resources` (선택 사항): 무시할 [APM 리소스][2]입니다(예: 낮은 볼륨 또는 낮은 우선순위 엔드포인트). `allowed_resources`와 상호 배타적입니다.

인라인 규칙 예시:

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

**참고**:
- 이 규칙은 각 [추가 기본 태그][3] 값과 집계 분석에 대해 평가됩니다. 단일 기본 태그만 고려하려면 요청 속성에 `primary_tag`로 지정하세요.
- 리소스 수준에서 새로운 오류 및 오류율 증가가 탐지됩니다.
- 이 규칙 유형은 `database` 또는 `inferred service`로 표시된 서비스를 지원하지 않습니다.

[1]: /ko/watchdog/faulty_deployment_detection/
[2]: /ko/tracing/services/resource_page/
[3]: /ko/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-additional-primary-tags-in-datadog
{{% /tab %}}
{{< /tabs >}}

## 파이프라인에서 게이트 평가 {#evaluate-a-gate-from-your-pipeline}

배포 파이프라인에서 여러 가지 방법으로 게이트 평가를 요청할 수 있습니다. `datadog-ci` CLI, Argo Rollouts 통합 및 GitHub Action은 카멜 케이스 키(`dryRun`)를 사용하여 JSON 구성 파일을 통해 인라인 규칙을 허용합니다. 직접 API 호출 및 일반 스크립트는 API 스키마와 일치하는 스네이크 케이스 키(`dry_run`)를 사용하여 요청 페이로드에서 동일한 구성을 전송합니다.

{{< tabs >}}
{{% tab "datadog-ci CLI" %}}
[datadog-ci][1] `deployment gate` 명령은 단일 명령으로 평가를 실행합니다. `--config` 플래그와 함께 JSON 구성 파일을 전달하세요.

```bash
datadog-ci deployment gate --service transaction-backend --env production --version 1.2.3 --config ./gate-config.json
```

예시 `gate-config.json`:

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

명령:

- 게이트 평가를 시작하기 위한 요청을 전송하고 평가가 완료될 때까지 차단합니다.
- 평가를 기다릴 시간에 대한 구성 가능한 제한 시간을 제공합니다.
- 오류에 대한 자동 재시도 기능이 내장되어 있습니다.
- 예기치 않은 Datadog 오류 발생 시 동작을 사용자 지정하기 위해 `--fail-on-error`를 허용합니다.

`deployment gate` 명령은 datadog-ci 버전 v3.17.0 이상에서 사용할 수 있습니다. `--config` 플래그에는 버전 v5.19.0 이상이 필요합니다.

**필수 환경 변수**:

- `DD_API_KEY`: [API 키][2]입니다.
- `DD_APP_KEY`: [애플리케이션 키][3]입니다.
- `DD_BETA_COMMANDS_ENABLED=1`: `deployment gate` 명령은 미리 보기 명령입니다.

전체 구성 옵션 및 사용 예시는 [`deployment gate` 명령 설명서][4]를 참조하세요.

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#gate

{{% /tab %}}
{{% tab "Argo Rollouts" %}}
[AnalysisTemplate][1] 또는 [ClusterAnalysisTemplate][1]을 생성하여 Argo Rollouts Kubernetes 리소스에서 Deployment Gates를 호출하세요. 이 템플릿은 [datadog-ci 배포 게이트 명령][7]을 실행하여 Deployment Gates API와 상호작용합니다.

아래 템플릿을 시작점으로 사용하세요.

- [Datadog 사이트 이름][2]으로 `<YOUR_DD_SITE>`를 바꿉니다(예: {{< region-param key="dd_site" code="true" >}}).
- [API 키][5] 및 [애플리케이션 키][6]를 환경 변수로 정의합니다. 이 예시에서는 `api-key` 및 `app-key`라는 두 개의 데이터 값을 가진 `datadog`이라는 [Kubernetes 시크릿][3]을 사용합니다. `valueFrom` 대신 `value`를 사용하여 일반 텍스트로 값을 전달할 수도 있습니다.
- `--config` 플래그를 지원하는 datadog-ci 이미지 버전(v5.19.0 이상)을 사용합니다.

게이트 구성을 ConfigMap에 저장한 다음 작업에 마운트하고 `--config`를 CLI에 전달하세요.

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

- 분석 템플릿은 Rollout 리소스(`service`, `env`, `version`)로부터 인수를 받을 수 있습니다. 자세한 내용은 [공식 Argo Rollouts 설명서][4]를 참조하세요.
- `ttlSecondsAfterFinished` 는 완료된 작업을 5분 후에 제거합니다.
- `backoffLimit` 은 0으로 설정됩니다. 게이트 평가가 실패할 경우 작업이 재시도되어서는 안 되기 때문입니다.

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
[Datadog Deployment Gate GitHub Action][4]은 워크플로의 일부로 평가를 실행합니다. 게이트 구성 파일을 리포지토리에 커밋하고 `config` 입력을 통해 해당 경로를 전달하세요. `config` 입력에는 버전 v2.1.0 이상이 필요합니다.

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

예시 `.github/gate-config.json`:

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

액션:

- 게이트 평가를 시작하기 위한 요청을 전송하고 평가가 완료될 때까지 차단합니다.
- 평가를 기다릴 시간에 대한 구성 가능한 제한 시간을 제공합니다.
- 오류에 대한 자동 재시도 기능이 내장되어 있습니다.
- 예기치 않은 Datadog 오류 발생 시 동작을 사용자 지정하기 위해 `fail-on-error`를 허용합니다.

**필수 환경 변수**:

- `DD_API_KEY`: [API 키][2]입니다.
- `DD_APP_KEY`: [애플리케이션 키][3]입니다.

전체 구성 옵션 및 사용 예시는 [`DataDog/deployment-gate-github-action` 리포지토리][4]를 참조하세요.

[1]: https://github.com/DataDog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/deployment-gate-github-action

{{% /tab %}}
{{% tab "일반 스크립트" %}}

이 스크립트를 시작점으로 사용하세요. 해당 스크립트는 인라인 JIT 규칙을 사용하여 게이트를 평가합니다.

다음을 바꾸세요.

- `<YOUR_DD_SITE>`: [Datadog 사이트 이름][1]입니다(예: {{< region-param key="dd_site" code="true" >}}).
- `<YOUR_API_KEY>`: [API 키][2]입니다.
- `<YOUR_APP_KEY>`: [애플리케이션 키][3]입니다.

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

스크립트:

- `service`, `environment`, `version` 등 세 가지 입력을 받습니다. 하나 이상의 APM 잘못된 배포 탐지 규칙이 평가되는 경우 `version`이 필요합니다.
- 평가를 시작하기 위한 요청을 보내고 `evaluation_id`를 기록합니다. 다음과 같이 HTTP 응답 코드를 처리합니다.
  - 5xx: 서버 오류, 지연 후 재시도합니다.
  - 4xx: 클라이언트 오류, 평가에 실패합니다.
  - 2xx: 평가가 시작되었습니다.
- 다음과 같이 평가가 완료될 때까지 `evaluation_id`로 평가 상태 엔드포인트를 폴링합니다.
  - 5xx: 서버 오류, 지연 후 재시도합니다.
  - 404: 평가가 아직 시작되지 않음, 지연 후 재시도합니다.
  - 4xx(404 제외): 클라이언트 오류, 평가에 실패합니다.
  - 2xx: `gate_status`를 검사하고 완료되지 않은 경우 지연 후 재시도합니다.
- 평가가 완료되거나 최대 폴링 시간(기본값: 10,800초 = 3시간)에 도달할 때까지 15초마다 폴링합니다.
- 초기 요청에 대한 모든 재시도가 소진되면(5xx 응답) 스크립트는 API 실패에 유연하게 대응하기 위해 이를 성공으로 처리합니다.

사용 사례에 맞게 스크립트를 조정하세요. 이 스크립트는 `curl`(요청 수행) 및 `jq`(반환된 JSON 처리)를 사용합니다. 이러한 명령을 사용할 수 없는 경우, 스크립트 시작 부분에 설치하세요(예: `apk add --no-cache curl jq` 사용).

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{% tab "직접 API 호출" %}}

Deployment Gates 평가는 비동기식입니다. 평가를 트리거하면 백그라운드에서 시작되며, API는 진행 상황을 추적하는 데 사용할 수 있는 평가 ID를 반환합니다.

- 먼저, Deployment Gates 평가를 요청하면 프로세스가 시작되고 평가 ID가 반환됩니다.
- 그런 다음 평가 ID를 사용하여 주기적으로 평가 상태 엔드포인트를 폴링하여 평가 완료 시 결과를 검색합니다. 10~20초마다 폴링하는 것이 좋습니다.

다음을 바꾸세요.

- `<YOUR_DD_SITE>`: [Datadog 사이트 이름][1]입니다(예: {{< region-param key="dd_site" code="true" >}}).
- `<YOUR_API_KEY>`: [API 키][2]입니다.
- `<YOUR_APP_KEY>`: [애플리케이션 키][3]입니다.

인라인 규칙과 함께 `configuration`을 전달하세요(API 경계에서 snake_case 사용).

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

`data.attributes.evaluation_id` 필드에는 이 게이트 평가에 대한 고유 식별자가 포함되어 있습니다.

평가 ID로 상태 엔드포인트를 폴링하여 게이트 평가 상태를 가져오세요.

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

`data.attributes.gate_status` 필드에는 다음 값 중 하나와 함께 평가 결과가 포함됩니다.

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

Continuous Delivery 워크플로에 Deployment Gates를 통합할 때 평가 단계를 사용하면 배포에 영향을 주기 전에 제품이 예상대로 작동하는지 확인하는 데 도움이 됩니다. dry-run 모드와 [{{< ui >}}Deployment Gates Evaluations{{< /ui >}}][6] 페이지를 사용하세요.

1. `configuration`에서 `dry_run: true`를 설정하거나 CLI 구성 파일에서 `dryRun: true`를 설정합니다. 일부 규칙만 dry-run으로 표시하려면 규칙별로 `dry_run`을 설정하세요. dry-run 평가는 API를 통해 항상 `pass`를 반환하지만 실제 결과는 UI에 기록됩니다.
2. 배포 프로세스에 게이트 평가를 추가합니다. dry-run이 활성화된 동안에는 배포가 게이트 결과의 영향을 받지 않습니다.
3. 일정 기간(예: 1~2주) 후에 {{< ui >}}Deployment Gates Evaluations{{< /ui >}} 페이지에서 게이트 및 규칙 실행을 검사합니다. UI에 실제 상태가 표시되므로 게이트가 실패했을 시점과 그 이유를 확인할 수 있습니다.
4. 게이트 동작이 예상과 같다고 확신하면 `dry_run`을 `false`로 전환합니다. 그 후, API가 실제 상태를 반환하기 시작하고 게이트 결과에 따라 배포가 승격되거나 롤백되기 시작합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: /ko/api/latest/deployment-gates
[5]: /ko/deployment_gates/setup/preconfigured
[6]: https://app.datadoghq.com/ci/deployment-gates/evaluations