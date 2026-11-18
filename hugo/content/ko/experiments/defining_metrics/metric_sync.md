---
description: YAML에서 실험 메트릭을 정의하고, 변경 사항을 미리 보고, CI에서 Datadog으로 동기화하세요.
further_reading:
- link: /experiments/defining_metrics/
  tag: 문서
  text: 실험 메트릭 생성
- link: /experiments/guide/connecting_a_data_warehouse/
  tag: 문서
  text: 데이터 웨어하우스 연결
- link: /account_management/api-app-keys/
  tag: 문서
  text: API와 애플리케이션 키
title: YAML에서 실험 메트릭 동기화
---
## 개요 {#overview}

실험 메트릭은 수익, 전환율, 페이지 조회수 등 실험을 평가하는 데 사용하는 결과를 정의합니다. 이러한 메트릭을 Datadog에서 수동으로 생성하거나 YAML에서 웨어하우스 메트릭을 정의하세요. Datadog Experiments Metric Sync CLI를 사용하여 YAML 정의를 Datadog으로 동기화하세요.

다음 작업을 수행하려는 경우 Metric Sync를 사용하세요.

- 풀 리퀘스트에서 메트릭 변경 사항 검토
- 메트릭 정의를 버전 제어에서 관리
- 메트릭 변경 사항이 승인된 후 CI에서 적용
- 실험 관련 의사 결정에 사용할 수 있도록 동기화된 메트릭을 기본적으로 인증된 상태로 표시

Metric Sync는 계획 후 적용하는 워크플로를 지원합니다. `plan` 명령은 YAML의 유효성을 검사하고 Datadog에서 적용할 변경 사항을 미리 보여줍니다. `execute` 명령은 YAML의 유효성을 검사하고, 쓰기 작업을 제출한 후 완료될 때까지 기다립니다. 결과에는 변경 건수, 객체 ID, 필드 변경 사항, 차단 사유, 경고 및 확인 가능한 오류 상세정보가 포함됩니다.

## 전제 조건 {#prerequisites}

Metric Sync를 사용하기 전에 다음 항목이 필요합니다.

- Product Analytics 및 Experiments가 활성화된 Datadog 계정
- 연결된 웨어하우스 [데이터 웨어하우스 연결][1]을 참조하세요.
- 소스 쿼리의 열에 매핑할 `User`와 같은 기존 주체 유형
- [계획 및 실행을 위한 권한][7]에 설명된 Product Analytics 쓰기 권한입니다. [Product Analytics 권한][2]을 참조하세요.
- CI 인증을 위한 Datadog API 키 및 애플리케이션 키 [API 키와 애플리케이션 키][3]를 참조하세요.

### 계획 및 실행을 위한 권한 {#permissions-for-plans-and-execution}

`plan`, `execute`, `status` 및 `result` 명령에는 Product Analytics Warehouse Model Write(`product_analytics_warehouse_model_write`)와 Product Analytics Metrics Write(`product_analytics_metrics_write`)가 둘 다 필요합니다. 서버 측 계획은 정의를 변경하지 않지만 실행과 동일한 쓰기 권한이 필요합니다. 계획 전용 애플리케이션 키 범위는 없습니다.

`plan` 및 `execute`의 경우 `options.is_certified: true`에도 Product Analytics Certified Metrics Write(`product_analytics_certified_metrics_write`)가 필요합니다. 이 옵션의 기본값은 `true`입니다. `false`로 설정하면 이 인증 메트릭 요구 사항만 제거됩니다.

자격 증명 없이 YAML을 확인하려면 `metric-sync validate ./metrics`를 실행하세요. 유효성 검사는 로컬에서 실행되며 서버 측 `plan`을 대체하지 않습니다.

<div class="alert alert-warning">쓰기 권한이 있는 애플리케이션 키는 다음 명령을 실행하는 작업을 포함해 신뢰할 수 있는 CI 작업에만 부여하세요. <code>plan</code>.</div>

## CLI 설치 {#install-the-cli}

최신 Metric Sync CLI 릴리스를 설치합니다.

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
```

설치 스크립트는 macOS 또는 Linux를 탐지하고, 해당하는 GitHub 릴리스 아카이브를 다운로드하고, SHA-256 체크섬을 검증한 다음, `metric-sync` 바이너리를 `/usr/local/bin`에 설치합니다. 시스템 권한에 따라 `/usr/local/bin`에 설치할 때 `sudo`가 필요할 수 있습니다. 관리자 권한 없이 설치하려면 `INSTALL_DIR`을 본인이 소유한 디렉터리로 설정하세요.

특정 버전을 설치하거나 다른 디렉터리에 설치하려면 다음을 수행합니다.

```shell
curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | env VERSION=<VERSION> INSTALL_DIR="$HOME/.local/bin" sh
export PATH="$HOME/.local/bin:$PATH"
```

환경 변수를 사용하여 Datadog 자격 증명을 설정합니다.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_APP_KEY=<DATADOG_APPLICATION_KEY>
```

기본적으로 CLI는 `datadoghq.com`에 요청을 보냅니다. 조직에서 다른 Datadog 사이트를 사용하는 경우 `DD_SITE`를 설정합니다.

```shell
export DD_SITE={{< region-param key="dd_site" >}}
```

## 메트릭 정의 생성 {#create-a-metric-definition}

리포지토리의 전용 디렉터리에 하나 이상의 YAML 파일을 생성합니다. CLI는 단일 파일, 여러 파일, 단일 디렉터리 또는 여러 디렉터리를 입력으로 받습니다. 디렉터리를 전달하면 CLI는 숨겨진 하위 디렉터리를 제외하고 `.yaml` 및 `.yml` 파일을 재귀적으로 탐색합니다. 파일마다 YAML 문서를 하나씩 사용하세요. CLI는 `---` 구분 기호 뒤의 빈 문서를 포함하여 동일한 파일 내의 추가 문서를 거부합니다. 추가 정의를 별도의 파일에 저장하고 해당 디렉터리 전체를 제출하세요.

다음 예시에서는 웨어하우스 메트릭 소스 하나와 `metric_type: simple`이 포함된 메트릭 하나를 정의합니다. 메트릭에는 미국(US)과 캐나다(CA)의 이벤트가 포함됩니다. 예시를 사용하기 전에 다음 작업을 수행하세요.

- SQL 쿼리를 웨어하우스에 맞는 쿼리로 바꿉니다. 타임스탬프, 주체 매핑, 측정값 또는 속성에 사용되는 모든 열을 반환합니다.
- YAML 열 이름을 대소문자를 포함하여 쿼리에서 반환하는 이름과 일치시킵니다.
- `User`를 기존 Datadog 주체 유형 이름으로 바꿉니다. Metric Sync는 주체 유형을 생성하지 않습니다.
- 이 정의 세트에 사용할 일관된 `sync_tag`를 선택하고 `reference_url`을 리포지토리 URL로 바꿉니다.
- 조직에 여러 웨어하우스 연결이 있는 경우 최상위 수준 또는 각 소스에서 `warehouse_connection_id`를 설정합니다. 소스 수준 값이 최상위 수준의 값을 재정의합니다. 조직에 연결이 하나만 있는 경우 ID를 생략하면 CLI가 해당 연결을 선택합니다.

```yaml
schema_version: 1
sync_tag: example-checkout
reference_url: https://github.com/example-org/example-repo

warehouse_metric_sources:
  - sync_id: checkout_events
    name: Checkout events
    sql: |
      SELECT user_id, event_timestamp, transaction_timestamp, revenue, country, platform
      FROM analytics.checkout_events
    timestamp_column: event_timestamp
    additional_timestamp_columns:
      - transaction_timestamp
    subject_types:
      - name: User
        column_name: user_id
    measures:
      - sync_id: revenue
        name: Revenue
        column_name: revenue
        column_type: FLOAT
    properties:
      - sync_id: country
        property_name: Country
        property_column: country
        property_type: STRING
      - sync_id: platform
        property_name: Platform
        property_column: platform
        property_type: STRING

metrics:
  - sync_id: checkout_revenue
    name: Checkout revenue
    metric_type: simple
    desired_change: METRIC_INCREASES
    simple_metric_aggregation:
      operation: sum
      measure:
        warehouse_metric_source_sync_id: checkout_events
        measure_sync_id: revenue
      timeframe_start_value: 0
      winsor_upper_percentile: 0.99
      winsorization_strategy: nonzero
      property_filters:
        property:
          warehouse_metric_source_sync_id: checkout_events
          property_sync_id: country
        operation: IS
        values: [US, CA]
```

## 변경 사항 미리 보기 및 동기화 {#preview-and-sync-changes}

각 제출에서는 해당 `sync_tag`로 관리되는 소스와 메트릭의 전체 집합을 정의합니다. 해당 태그로 이미 관리되지만 제출된 파일에 없는 객체는 삭제 후보가 됩니다. 변경되지 않은 정의를 포함하여 해당 태그에 속한 모든 파일을 함께 제출하세요.

| 명령 | 검사 또는 수행 내용 | 정의 변경 여부? |
| ------- | ---------------------- | -------------------- |
| `validate` | YAML 구문과 지원되는 로컬 규칙을 확인합니다. Datadog을 호출하지 않습니다. | 아니요 |
| `plan` | 로컬 검사를 실행한 다음 변경 예정 사항의 서버 측 미리 보기를 요청합니다. | 아니요 |
| `execute` | 로컬 검사를 실행한 다음 정의를 적용하기 위한 작업을 제출합니다. `--no-poll`을 사용하지 않으면 작업이 완료될 때까지 기다립니다. | 예, 작업이 성공한 경우 |

계획이 성공하더라도 외부 소스나 선택한 측정값이 실제로 존재한다는 의미는 아닙니다. Datadog은 `execute` 중에 외부 참조를 확인합니다.

변경 사항을 적용하기 전에 미리 보려면 `plan` 명령을 실행합니다.

```shell
metric-sync plan ./metrics
```

계획 출력에는 작업 ID, 동기화 태그, 상태, 제안된 필드 변경 사항 및 차단 사유가 표시됩니다. 실행하기 전에 이러한 세부 정보를 검토하세요. `plan`, `execute` 및 `result` 명령은 작업이 실패하거나 결과에 차단된 객체 또는 오류가 포함되면 0이 아닌 종료 상태 코드를 반환합니다. 문제 해결을 위해 API 응답을 저장하려면 `--log-file ./metric-sync-plan.log` 옵션을 추가하세요.

계획을 검토한 후 `execute` 명령을 실행하여 변경 사항을 적용합니다.

```shell
metric-sync execute ./metrics
```

`execute` 명령은 로컬 유효성 검사를 수행하고, Datadog에 Metric Sync 쓰기 작업을 제출한 다음 작업이 최종 상태에 도달할 때까지 폴링하고 결과 요약을 출력합니다.

`execute` YAML을 다시 읽고 새 작업을 생성합니다. 저장된 계획을 ID로 참조하여 적용하지는 않습니다. 두 명령에 모두 검토를 마친 동일한 파일과 옵션을 사용하세요.

다음 명령도 실행할 수 있습니다.

```shell
metric-sync validate ./metrics
metric-sync status <METRIC_SYNC_ID>
metric-sync result <METRIC_SYNC_ID>
metric-sync version
```

각 명령의 기능은 다음과 같습니다.

- `status`: ID로 작업을 확인합니다.
- `result`: 최종 상태에 도달한 계획 또는 실행 결과를 가져옵니다.
- `version`: 빌드 메타데이터를 출력합니다.

`--timeout 20m`을 사용하여 기본 명령 시간 제한인 10분을 변경하세요. 완료를 기다리지 않고 제출하려면 `--no-poll` 옵션을 사용한 다음 `status` 및 `result` 명령으로 확인하세요. `--no-poll` 명령이 성공하더라도 제출이 완료되었다는 사실만 확인할 수 있습니다.

### 중단 및 실패한 작업 {#interrupted-and-failed-operations}

실행 작업은 모든 소스 및 메트릭 변경 사항을 함께 적용합니다. 작업이 어느 단계에서든 실패하면 Datadog은 변경 사항을 전혀 적용하지 않습니다.

Datadog이 제출을 수락하면 작업은 CLI와 독립적으로 실행됩니다. CLI를 중지하거나 CI 작업을 취소하거나 명령 시간 초과에 도달해도 서버 작업은 취소되지 않으며, 폴링 오류가 발생했다고 해서 작업이 실패한 것은 아닙니다. 작업 ID(`metric_sync_id`)를 `status` 및 `result`와 함께 사용하여 결과를 확인하세요. 작업 ID는 YAML의 안정적인 `sync_id` 값과 다릅니다.

### 제출 재시도 {#retry-a-submission}

결과를 확인하기 전에 명령이 중지되면 다시 제출하기 전에 다음 단계를 따르세요.

1. 출력된 작업 ID를 사용해 `metric-sync status <METRIC_SYNC_ID>` 명령을 실행합니다.
2. 작업이 여전히 실행 중이면 완료될 때까지 기다립니다.
3. 작업에 성공했다면 재시도할 필요가 없습니다.
4. 작업에 실패했다면 원인을 수정하고 새 멱등성 키를 사용하여 제출합니다.
5. Datadog이 제출을 받았는지 확인할 수 없는 경우 동일한 `--idempotency-key`를 사용하여 동일한 정의와 옵션을 다시 제출합니다.

   ```shell
   metric-sync execute ./metrics --idempotency-key <EXECUTION_KEY>
   ```

제출하기 전에 키를 선택하고 해당 요청을 재시도할 때 다시 사용하세요. 일치하는 키와 요청에 대해 Datadog은 새 작업을 생성하는 대신 기존 작업을 반환합니다. 다른 요청에 키를 재사용하면 충돌이 발생하므로 `plan` 및 `execute`에는 별도의 키를 사용하세요.

`--idempotency-key`를 생략하면 CLI가 키를 생성합니다. CI 작업 재실행이나 새로운 로컬 명령이 다른 키를 생성할 수 있으므로 Datadog에서는 이를 새로운 제출로 처리합니다. 동일한 제출을 재시도하려면 키를 명시적으로 설정하세요.

동일한 파일과 옵션을 제출하는 CI 재시도는 생성된 키를 재사용하고 이전 결과를 반환할 수도 있습니다.

서버 작업에 실패했는데 해당 키를 재사용하면 실패한 같은 작업이 반환됩니다. 원인을 수정하고 다음 시도에는 새 키를 사용하세요.

## GitHub Actions 예시 {#github-actions-example}

다음 워크플로는 풀 리퀘스트에서 `plan`을 실행하고 변경 사항이 `main`에 병합되면 `execute`를 실행합니다.

```yaml
name: Sync Datadog experiment metrics

on:
  pull_request:
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"
      - ".github/workflows/datadog-metric-sync.yml"
  push:
    branches:
      - main
    paths:
      - "metrics/**/*.yaml"
      - "metrics/**/*.yml"

jobs:
  plan:
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Plan metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync plan ./metrics

  execute:
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    concurrency:
      group: metric-sync-example-checkout
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - name: Install Metric Sync CLI
        run: curl -fsSL https://raw.githubusercontent.com/DataDog/experiments-metric-sync-cli/main/install.sh | sh
      - name: Apply metric changes
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_APP_KEY: ${{ secrets.DD_APP_KEY }}
        run: metric-sync execute ./metrics --idempotency-key "example-checkout-execute-${GITHUB_RUN_ID}"
```

Datadog API 키와 애플리케이션 키를 GitHub Actions 시크릿으로 저장하세요. 조직에서 `datadoghq.com` 이외의 Datadog 사이트를 사용하는 경우, 워크플로 환경에 `DD_SITE`를 추가하세요.

이 워크플로의 실행이 중복되지 않도록 동기화 태그마다 동시성 그룹을 사용하세요. 계획 작업은 동일한 리포지토리에서 생성된 풀 리퀘스트에 대해서만 실행됩니다. 포크 리포지토리의 풀 리퀘스트에는 이러한 시크릿이 제공되지 않으므로 해당 기여에 대해서는 자격 증명 없이 `validate`를 실행한 다음 신뢰할 수 있는 워크플로에서 `plan`을 실행하세요.

실행 키에는 동기화 태그, 명령 및 GitHub 실행 ID가 포함되며 해당 워크플로 실행에서 작업을 재실행할 때 실행 키는 동일하게 유지됩니다. 이러한 재시도에 대해 정의와 옵션을 변경하지 마세요. 새로운 워크플로 실행 시에는 다른 키를 사용합니다. 이전 작업이 여전히 실행 중이면 다른 작업을 시작하기 전에 결과를 확인하세요.

## 정의 참조 {#yaml-reference}

### 동기화 태그 및 ID {#sync-tags-and-ids}

`sync_tag`는 함께 관리되는 메트릭 정의 집합을 식별합니다. 독립적으로 관리하려는 각 리포지토리, 팀 또는 메트릭 도메인에 대해 변경되지 않는 `sync_tag`를 사용하세요. 예를 들어, 성장 팀과 결제 팀은 `growth-metrics` 및 `checkout-metrics`와 같은 서로 다른 `sync_tag` 값을 사용하여 서로 다른 리포지토리에서 메트릭을 동기화할 수 있습니다.

`sync_tag` 내에서 각 웨어하우스 메트릭 소스와 메트릭은 고정된 `sync_id`를 갖습니다. 선언된 각 속성과 측정값에도 해당 소스의 각 목록 내에서 고유한 `sync_id`가 필요합니다. 변경되지 않는 ID를 선택하세요. UUID일 필요는 없습니다. 메트릭 집계는 `warehouse_metric_source_sync_id`를 사용하여 웨어하우스 메트릭 소스를 선택합니다. 각 집계는 선언된 측정값, 개별 행 또는 주체 매핑 중 하나도 선택합니다. [측정값 참조][4] 섹션을 참조하세요.

`sync_id`를 변경하면 이전 ID를 가진 객체가 삭제되고 그 자리에 새 객체가 생성될 수 있습니다. 객체 이름을 바꾸려면 `name`을 변경하고 `sync_tag` 및 `sync_id`는 기존 값을 유지하세요.

소스와 해당 종속 메트릭을 두 번에 나누어 제출하여 제거하세요. 먼저 메트릭 정의를 제거하고 소스 및 관련 없는 다른 모든 정의는 유지한 다음 `plan` 및 `execute`를 실행하세요. 그런 다음 소스를 제거하고 나머지 정의를 제출하세요. 소스와 메트릭을 한 번의 작업으로 제거하는 계획은 검증을 통과하더라도 실행 중 실패할 수 있습니다. 소스를 삭제하기 전에 다른 동기화 태그에서 해당 소스를 참조하는 항목도 제거해야 합니다.

작업의 모든 파일은 동일한 `schema_version` 및 `sync_tag`를 사용해야 합니다. 기본값이 적용된 후에는 각 파일의 `options`가 일치해야 합니다. 예를 들어, `is_certified`를 생략하는 것은 해당 값을 `true`로 설정하는 것과 같습니다. 값이 비어 있지 않은 최상위 `reference_url` 및 `warehouse_connection_id` 값도 모든 파일에서 일치해야 합니다.

### YAML로 기존 메트릭 및 소스 관리 {#manage-existing-metrics-with-yaml}

CLI는 기존 메트릭을 YAML로 내보내지 않습니다. 소스 및 메트릭 정의를 사용하여 YAML을 생성한 다음 버전 제어에 저장하세요. 마이그레이션할 때 `existing_id`는 대상 Datadog 조직에 이미 존재하는 객체를 가리킵니다.

YAML로 기존 수동 생성 소스 또는 메트릭을 관리하려면 다음 단계를 따르세요.

1. 전체 정의를 포함하고 변경되지 않는 `sync_id`를 할당합니다.
2. 해당 소스 또는 메트릭의 `existing_id`를 Datadog 객체 UUID로 설정합니다. 이는 YAML에서 지정한 `sync_id`와는 다릅니다.
3. 제출할 모든 파일에서 `options.upgrade_mode: by_id`를 설정한 다음, `plan`을 실행하고 `execute`를 실행하기 전에 변경 사항을 검토합니다.

기존 객체를 동기화 관리 대상으로 편입하면 YAML 정의가 적용되고 해당 객체에 동기화 소유권이 할당됩니다. 이후 동기화에서는 동일한 `sync_tag` 및 `sync_id`를 사용하여 해당 객체를 식별합니다. 유지하려는 설정 및 소스 매핑을 포함하세요. 필드를 생략하면 기본값이 적용되거나 매핑이 제거될 수 있습니다.

채택은 기존 소스 및 메트릭 UUID를 유지하지만, 메트릭 계산이 변경되지 않은 경우에도 `options.is_certified` 설정(기본값 `true`)을 포함한 YAML의 모든 설정을 적용합니다. 이 옵션은 명시적으로 설정하세요. 제출 내의 모든 소스 및 메트릭에 값 하나가 적용되므로 각 객체에 대해 서로 다른 인증 상태를 설정할 수 없습니다.

채택 시 기존 실험 결과를 다시 계산하지 않습니다. 실행 중인 실험에서 사용하는 객체를 채택하기 전에 모든 정의 설정을 검토합니다. 실행 후 Datadog에서 객체 ID, 설정 및 인증을 확인하세요. 채택 후 `options.is_certified`만 변경하는 것으로는 인증이 업데이트되지 않습니다. [CLI 제한 사항][6]을 참조하세요.

### 최상위 필드 {#top-level-fields}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `schema_version` | 예 | `1`이어야 합니다. |
| `sync_tag` | 예 | 이 메트릭 정의 그룹에 대한 고정된 소유권 키 단일 작업의 모든 파일은 동일한 `sync_tag`를 사용해야 합니다.<br>영문자 또는 숫자로 시작해야 하며 영문자, 숫자, 밑줄, 마침표, 콜론 및 하이픈을 포함할 수 있습니다. |
| `reference_url` | 아니요 | 동기화된 메트릭의 소스 리포지토리, 런북 또는 기타 참조 자료의 URL |
| `warehouse_connection_id` | 아니요 | 이번 제출에 포함된 소스에 적용할 기본 웨어하우스 연결 UUID 소스에 연결이 필요하지만 ID가 설정되지 않은 경우, CLI는 조직에 연결이 하나뿐이면 해당 연결을 선택하고, 여러 연결 중 하나를 특정할 수 없으면 오류를 보고합니다. |
| `warehouse_metric_sources` | 아니요 | 메트릭이 사용하는 웨어하우스 SQL 모델 및 측정값 이 태그로 관리되는 소스 중 유지하려는 모든 소스를 포함하세요. |
| `metrics` | 아니요 | 생성하거나 업데이트할 실험 메트릭 이 태그로 관리되는 메트릭 중 유지하려는 모든 메트릭을 포함하세요. |
| `options` | 아니요 | 인증 및 업그레이드 동작과 같은 동기화 옵션 |

### 옵션 {#options}

| 필드 | 기본값 | 설명 |
| ----- | ------- | ----------- |
| `is_certified` | `true` | 동기화된 메트릭을 인증된 상태로 표시합니다. 이 옵션의 기본값은 `true`이므로, `false`로 설정하지 않는 한 메트릭 동기화에 Product Analytics Certified Metrics Write 권한이 필요합니다. |
| `upgrade_mode` | `none` | 객체의 `existing_id`와 함께 `by_id`를 사용하여 해당 객체를 동기화 관리 대상으로 편입합니다. CLI는 이름을 기준으로 편입하는 기능을 지원하지 않습니다. |
| `force_delete` | `false` | 활성 상태이거나 진행 중인 실험에서 참조하고 있어도 삭제할 수 있습니다. 이 동기화 태그에 속하지 않는 메트릭에서 참조하는 소스는 계속 삭제가 차단됩니다. 다른 곳에서 참조하지 않는 객체를 일반적인 방식으로 삭제할 때는 이 옵션이 필요하지 않습니다. |

### 웨어하우스 메트릭 소스 {#warehouse-metric-sources}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `sync_id` | 예 | 이 `sync_tag` 내에서 소스를 식별하는 고정 식별자입니다.<br>영문자 또는 숫자로 시작해야 하며 영문자, 숫자, 밑줄, 마침표, 콜론 및 하이픈을 포함할 수 있습니다. |
| `existing_id` | 아니요 | `options.upgrade_mode: by_id`를 사용하여 동기화 관리 대상으로 편입할 Datadog 웨어하우스 메트릭 소스의 UUID |
| `name` | 예 | Datadog에 표시되는 이름 |
| `description` | 아니요 | 소스에 대한 설명 |
| `sql` | 예 | 메트릭에 사용되는 타임스탬프, 주체 열 및 측정값을 반환하는 SQL 쿼리 |
| `timestamp_column` | 예 | 이벤트 또는 메트릭 타임스탬프를 포함하는 열 |
| `additional_timestamp_columns` | 아니요 | `sql`에서 반환하는 최대 4개의 추가 타임스탬프 열 각 이름에는 공백 이외의 문자가 하나 이상 포함되어야 하며 길이는 255자 이하여야 합니다. 이름은 앞뒤 공백을 제거한 후에도 고유해야 하며 `timestamp_column`을 포함해서는 안 됩니다. 이 항목을 생략하면 소스에 추가 타임스탬프 열이 없는 것으로 처리됩니다. |
| `warehouse_connection_id` | 아니요 | 이 소스에 대한 웨어하우스 연결 UUID 최상위 수준의 값을 재정의합니다. |
| `reference_url` | 아니요 | 소스별 참조 URL |
| `subject_types` | 예 | 소스에 대한 하나 이상의 주체 매핑 |
| `measures` | 아니요 | 메트릭이 집계하는 열 |
| `properties` | 아니요 | 메트릭 이벤트를 필터링하는 데 사용되는 열 소스 SQL에 이러한 열을 포함하세요. |

### 주체 유형 {#subject-types}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `name` | 예 | `User` 또는 `Account`와 같은 Datadog 주체 유형 이름 |
| `column_name` | 예 | 주체 식별자를 포함하는 SQL 결과 열 |

### 측정값 {#measures}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `sync_id` | 예 | 웨어하우스 메트릭 소스 내 고정 식별자 |
| `name` | 예 | Datadog에 표시되는 이름 |
| `column_name` | 예 | SQL 결과 열 이름 |
| `column_type` | 예 | Datadog이 열의 유효성을 검사하고 올바른 메트릭 구성 옵션을 표시하는 데 필요한 항목 지원되는 값은 `STRING`, `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE` 및 `TIMESTAMP`입니다. |
| `description` | 아니요 | 측정값에 대한 설명 |

### 속성 {#properties}

웨어하우스 메트릭 소스에서 필터에 사용할 열을 선언하려면 `properties`를 사용하세요.

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `sync_id` | 예 | 소스의 속성 목록 내 고정 식별자 필터는 `property_sync_id`를 사용해 이를 참조합니다. |
| `property_name` | 예 | Datadog에 표시되는 이름 |
| `property_column` | 예 | SQL 결과 열 이름 |
| `property_type` | 예 | `STRING`과 같은 열 유형 |
| `description` | 아니요 | 속성에 대한 설명 |

이 속성 필드 이름은 API와 일치합니다. 이전 속성 필드 `name`, `column_name`, `column_type`을 `property_name`, `property_column`, `property_type`으로 바꿉니다. CLI는 이전 속성 이름을 거부합니다. 측정값 정의에서는 여전히 `name`, `column_name`, `column_type`을 사용합니다.

Datadog YAML 형식은 Eppo 형식과 다릅니다. 마이그레이션할 때 `fact_sources`, `facts`를 `warehouse_metric_sources`, `measures`로 바꾸고, 이 가이드에 설명된 필드를 사용하도록 속성 정의와 참조를 업데이트합니다.

### 메트릭 {#metrics}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `sync_id` | 예 | 이 `sync_tag` 내에서 메트릭을 식별하는 고정 식별자 |
| `existing_id` | 아니요 | `options.upgrade_mode: by_id`를 사용하여 편입할 Datadog 메트릭 UUID |
| `name` | 예 | Datadog에 표시되는 이름 |
| `description` | 아니요 | 메트릭 설명 |
| `metric_type` | 예 | 지원되는 값은 `simple`, `ratio` 및 `percentile`입니다. |
| `desired_change` | 아니요 | 실험 결과를 해석할 때 사용하는 방향 지원되는 값은 `METRIC_INCREASES` 및 `METRIC_DECREASES`입니다. |
| `format_as_percent` | 아니요 | 메트릭을 백분율로 표시합니다. |
| `reference_url` | 아니요 | 메트릭별 참조 URL |
| `guardrail_cutoff_threshold` | 아니요 | 가드레일 차단 임계값(선택 사항) |

메트릭 유형과 일치하는 집계 필드를 추가합니다.

- `metric_type: simple`의 경우 `simple_metric_aggregation`을 추가합니다.
- `metric_type: ratio`의 경우 `ratio_metric_aggregation`을 추가합니다.
- `metric_type: percentile`의 경우 `percentile_metric_aggregation`을 추가합니다.

<a id="simple-metric-aggregation"></a>

### `simple` 메트릭 집계 {#aggregation-for-simple-metrics}

윈저화 백분위수와 백분위수 메트릭에는 소수 형태의 비율을 사용합니다. 예를 들어, `0.95`는 두 경우 모두 95백분위수를 의미합니다.

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `operation` | 예 | `sum`, `average`, `count` 또는 `countDistinctValue`와 같은 집계 연산 |
| `measure` | 예 | 측정값 참조 |
| `property_filters` | 아니요 | 집계에 포함된 이벤트에 적용할 필터 [필터][5] 섹션을 참조하세요. |
| `timeframe_start_value` | 아니요 | 메트릭 기간의 시작 오프셋 |
| `timeframe_end_value` | 아니요 | 메트릭 기간의 종료 오프셋 |
| `timeframe_unit` | 아니요 | 기간 단위 |
| `winsor_lower_percentile` | 아니요 | 0 이상 1 이하의 하한 윈저화 백분위수 둘 다 설정된 경우 `winsor_upper_percentile`보다 작아야 합니다. |
| `winsor_upper_percentile` | 아니요 | 0 이상 1 이하의 상한 윈저화 백분위수 |
| `winsor_lower_fixed_value` | 아니요 | 하한 고정 윈저화 값 |
| `winsor_upper_fixed_value` | 아니요 | 상한 고정 윈저화 값 |
| `winsorization_strategy` | 아니요 | 지원되는 값은 `all_assigned_subjects`(기본값) 및 `nonzero`입니다. `operation: threshold`의 경우 이 필드를 생략하거나 `all_assigned_subjects`를 사용합니다. |

`additional_timestamp_columns` 또는 `winsorization_strategy`를 생략하면 기존 객체를 업데이트하거나 편입하는 경우에도 위의 기본값이 적용됩니다. 값을 설정하려면 YAML에 이 필드들을 포함하세요.

### 비율 메트릭 집계 {#ratio-metric-aggregation}

`ratio_metric_aggregation`을 사용하여 메트릭을 분자를 분모로 나눈 값으로 정의합니다. `numerator_aggregation` 및 `denominator_aggregation` 모두 `simple_metric_aggregation`과 동일한 필드를 사용하지만, 두 구성 요소 모두 `operation: average`를 지원하지 않습니다.

각 집계에 대해 `winsorization_strategy`를 별도로 설정합니다. 생략할 경우 각 집계는 `all_assigned_subjects`를 사용합니다.

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `numerator_aggregation` | 예 | 분자로 사용하는 집계 |
| `denominator_aggregation` | 예 | 분모로 사용하는 집계 |

비율 메트릭 집계 예시:

```yaml
ratio_metric_aggregation:
  numerator_aggregation:
    operation: sum
    measure:
      warehouse_metric_source_sync_id: checkout_events
      measure_sync_id: revenue
    winsor_upper_percentile: 0.99
    winsorization_strategy: nonzero
  denominator_aggregation:
    operation: count
    measure:
      warehouse_metric_source_sync_id: checkout_events
      kind: each_record
    winsorization_strategy: all_assigned_subjects
```

### 백분위수 메트릭 집계 {#percentile-metric-aggregation}

| 필드 | 필수 | 설명 |
| ----- | -------- | ----------- |
| `measure` | 예 | 측정값 참조 |
| `property_filters` | 아니요 | 집계에 포함된 이벤트에 적용할 필터 [필터][5] 섹션을 참조하세요. |
| `percentile` | 예 | 0 초과 1 미만의 소수 95백분위수를 나타내려면 `0.95`를 사용합니다. |

기간 필드는 백분위수 메트릭의 구성에 사용되지 않습니다.

백분위수 메트릭 집계 예시:

```yaml
percentile_metric_aggregation:
  percentile: 0.95
  measure:
    warehouse_metric_source_sync_id: checkout_events
    measure_sync_id: revenue
```

### 필터 {#filters}

`simple_metric_aggregation`, 비율의 두 구성 요소 중 하나 또는 `percentile_metric_aggregation`에서 `property_filters`를 설정합니다. 모든 필터는 집계의 측정값과 동일한 소스 및 동기화 태그를 참조해야 합니다.

조건이 하나인 경우 단일 필터 객체를 사용합니다.

```yaml
property_filters:
  property:
    warehouse_metric_source_sync_id: checkout_events
    property_sync_id: country
  operation: IS
  values: [US, CA]
```

나열된 값 중 하나라도 포함하려면 `IS`를 사용하고 나열된 값을 제외하려면 `IS_NOT`을 사용합니다. 두 작업 모두 최소 하나의 값이 필요합니다. `property_sync_id`는 소스에 선언된 속성과 일치해야 합니다. 다른 동기화 태그에 속한 소스를 필터링하려면 속성 참조와 집계의 측정값 참조 모두에 `warehouse_metric_source_sync_tag`를 포함합니다.

모든 조건을 충족해야 하는 경우(AND)에는 여러 조건을 평면 목록으로 지정합니다.

```yaml
property_filters:
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: country
    operation: IS
    values: [US]
  - property:
      warehouse_metric_source_sync_id: checkout_events
      property_sync_id: platform
    operation: IS
    values: [web]
```

이 예시에는 국가가 US이고 플랫폼이 web인 이벤트가 포함됩니다. 이 예시에서는 전체 소스 예시에 선언된 `country` 및 `platform` 속성을 사용합니다. 단일 필터나 평면 목록은 API 요청에서 하나의 필터 그룹이 됩니다.

여러 조건 중 하나를 충족하면 되는 경우(OR)에는 중첩 그룹을 사용합니다. 각 그룹 내의 조건은 AND로 연결하고, 별도의 그룹은 OR로 연결합니다.

```yaml
property_filters:
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [US]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [web]
  -
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: country
      operation: IS
      values: [CA]
    - property:
        warehouse_metric_source_sync_id: checkout_events
        property_sync_id: platform
      operation: IS
      values: [mobile]
```

이 예시에는 국가가 US이고 플랫폼이 web이거나, 국가가 CA이고 플랫폼이 mobile인 이벤트가 포함됩니다. 각 그룹에는 최소 하나의 조건이 포함되어야 합니다. 개별 필터와 그룹을 같은 목록에 함께 넣지 마세요.

새 YAML에서 `operation`을 사용합니다. 기존 `operator` 필드는 별칭으로 유지되지만, CLI는 두 필드를 모두 설정한 필터를 거부합니다. 요청은 항상 `operation`을 사용합니다. `001`처럼 숫자로 보이는 값을 포함해 필터 값은 원래 텍스트를 그대로 유지합니다. 다른 YAML 도구에서도 값을 문자열로 유지해야 하는 경우 따옴표로 묶습니다. YAML 앵커와 별칭은 선택 사항이며 단일 문서 내에서 작동합니다.

백분위수 메트릭은 `IS` 또는 `IS_NOT`을 사용하는 속성 필터만 지원합니다. 측정값 필터나 null 검사는 지원하지 않습니다.

### 측정값 참조 {#measure-references}

각 집계는 `warehouse_metric_source_sync_id`로 소스를 선택하고 다음 측정값 선택기 중 하나만 지정해야 합니다.

| 선택기 | 선택 항목 |
| -------- | --------------- |
| `measure_sync_id` | 소스의 `measures` 목록에 선언된 측정값 |
| `kind: each_record` | 소스에서 반환된 각 행 측정값 선언이 필요하지 않습니다. |
| `subject_type_name` | 소스의 `subject_types` 목록에 있는 이름에 매핑된 열 측정값 선언이 필요하지 않습니다. |

`simple_metric_aggregation`, 비율의 두 구성 요소 및 `percentile_metric_aggregation`에서 이 참조 형식을 사용합니다. 집계 연산에 따라 사용할 선택기가 결정됩니다.

- `count`에는 `kind: each_record`가 필요합니다.
- `sum` 및 `average`에는 `measure_sync_id`가 필요합니다.
- `countDistinctValue` `measure_sync_id` 또는 `subject_type_name`을 허용합니다. `each_record`를 사용할 수 없습니다.
- `uniqueSubjects` `subject_type_name`이 필요합니다. 새 정의에는 `countDistinctValue`를 사용합니다.

선언된 측정값을 선택하려면 해당 `sync_id`를 사용합니다.

```yaml
measure:
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

소스에서 반환된 행 수를 계산하려면 다음과 같이 설정합니다.

```yaml
simple_metric_aggregation:
  operation: count
  measure:
    warehouse_metric_source_sync_id: checkout_events
    kind: each_record
  timeframe_start_value: 0
```

고유 사용자 수를 계산하려면 먼저 `User` 주체 유형을 `checkout_events` 소스의 열에 매핑합니다.

```yaml
subject_types:
  - name: User
    column_name: user_id
```

그런 다음 메트릭에서 해당 주체 매핑을 선택합니다.

```yaml
simple_metric_aggregation:
  operation: countDistinctValue
  measure:
    warehouse_metric_source_sync_id: checkout_events
    subject_type_name: User
  timeframe_start_value: 0
```

`User`는 조직에 주체 유형으로 존재해야 합니다. 선택한 이름은 참조된 소스의 `subject_types[].name` 항목과 일치해야 합니다.

다른 동기화 태그에 속한 소스를 참조하려면 세 선택기 중 하나와 함께 `warehouse_metric_source_sync_tag`를 포함합니다.

```yaml
measure:
  warehouse_metric_source_sync_tag: shared-sources
  warehouse_metric_source_sync_id: checkout_events
  measure_sync_id: revenue
```

`validate`를 실행하여 로컬 검사를 수행한 다음 `plan`을 실행하여 변경 사항을 미리 봅니다. 로컬 유효성 검사는 제출된 파일의 소스 매핑을 확인합니다. 명시적으로 지정한 태그가 파일의 `sync_tag`와 같더라도 해당 소스가 제출된 파일에 포함되어 있으면 로컬 매핑을 검사합니다. 외부 참조는 `execute` 실행 중에 확인됩니다. 계획이 성공하더라도 외부 소스나 선택한 측정값이 실제로 존재한다는 의미는 아닙니다.

동기화 API는 `warehouse_metric_measure_id`를 지원하지 않습니다. 원시 측정값 ID를 소스와 앞서 설명한 선택기 중 하나의 조합으로 바꿉니다.

## CLI 제한 사항 {#cli-limitations}

Metric Sync는 웨어하우스 메트릭 소스 및 메트릭을 관리합니다. 웨어하우스 할당(노출) 소스는 관리하지 않으므로 이러한 소스는 Datadog에서 관리하세요.

`options.is_certified`만 변경하면 다른 변경 사항이 없는 기존 소스나 메트릭의 인증 상태는 업데이트되지 않습니다. YAML로 기존 정의를 관리한 후 Datadog에서 인증 상태를 확인하세요. 동기화에 성공했다는 사실만으로 인증 상태가 변경되었다고 단정할 수는 없습니다.

CLI는 기존 정의를 내보내거나 Eppo YAML을 자동으로 변환하지 않습니다. YAML로 기존 메트릭을 관리하기 전에 전체 정의를 생성하고 검토합니다.

기존 객체를 동기화 관리 대상으로 편입하려면 `options.upgrade_mode: by_id`와 함께 `existing_id`를 사용합니다. `upgrade_mode: by_name`만 설정한다고 해서 이름이 일치하는 객체가 편입되지는 않습니다.

## 문제 해결 {#troubleshooting}

| 오류 | 확인할 사항 |
| ----- | ------------- |
| `plan`, `status` 또는 `result`의 경우에도 API는 `403`을 반환합니다. | [계획 및 실행을 위한 권한][7]을 확인하세요. 이러한 명령에는 쓰기 권한이 필요합니다. `is_certified: true`인 `plan` 및 `execute`에도 Product Analytics Certified Metrics Write 권한이 필요합니다. |
| 폴링에 실패하거나 CLI 명령의 시간이 초과되거나 CI 작업이 취소됩니다. | 서버 작업은 계속될 수 있습니다. 저장된 작업 ID로 `status` 및 `result`을 확인하세요. 재시도하려면 동일한 `--idempotency-key`를 사용하여 동일한 파일과 옵션을 다시 제출합니다. [제출 재시도](#retry-a-submission)를 참조하세요. |
| 웨어하우스 연결을 찾을 수 없습니다. | 대상 Datadog 조직에 웨어하우스 연결이 구성되어 있는지 확인합니다. `warehouse_connection_id`를 설정했다면 해당 값이 대상 조직에 속하는지 확인합니다. |
| 주체 유형을 찾을 수 없습니다. | `subject_types[].name` 값이 기존 Datadog 주체 유형과 일치하는지 확인합니다. |
| 작업은 성공했지만 결과에 변경 사항이 표시되지 않습니다. | 서비스가 적용할 변경 사항을 탐지하지 못했습니다. `options.is_certified`만 변경했다면 Datadog에서 인증 상태를 확인합니다. 동기화에 성공했다고 해서 이 설정이 변경되었다는 의미는 아닙니다. 작업이 실패했다고 해서 YAML이 Datadog의 설정과 일치하는 것으로 확인되는 것은 아닙니다. |
| 동기화가 차단되었습니다. | 콘솔 출력에서 객체 상세정보와 차단 사유를 확인합니다. API 응답을 저장하려면 `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync.log`를 실행합니다. 가능한 원인으로는 실험 참조, 동기화 태그에 속하지 않으면서 해당 소스를 참조하는 메트릭, 편입 시 발생하는 충돌 등이 있습니다. 차단된 결과가 발생하면 0이 아닌 종료 상태 코드가 반환됩니다. |
| 작업이 실패했습니다. | `metric-sync result <METRIC_SYNC_ID> --log-file ./metric-sync-result.log`를 실행하여 확인 가능한 오류를 검색하고 API 응답을 검사합니다. 일부 서버 오류에서는 오류 상세정보가 반환되지 않으므로 지원 요청에 사용할 수 있도록 작업 ID를 보관합니다. |
| 로컬 유효성 검사는 통과했지만 `plan`에서 YAML을 거부합니다. | 로컬 검사는 웨어하우스 쿼리를 확인하지 않습니다. 콘솔 출력에서 오류 상세정보를 확인합니다. API 응답을 저장하려면 `metric-sync plan ./metrics --log-file ./metric-sync.log`를 실행합니다. 해당 상세정보를 바탕으로 정의를 수정합니다. |

[1]: /ko/experiments/guide/connecting_a_data_warehouse/
[2]: /ko/account_management/rbac/permissions/#product-analytics
[3]: /ko/account_management/api-app-keys/
[4]: #measure-references
[5]: #filters
[6]: #cli-limitations
[7]: #permissions-for-plans-and-execution