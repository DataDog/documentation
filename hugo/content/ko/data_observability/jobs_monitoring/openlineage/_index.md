---
description: 기본 Datadog 통합이 없는 사내 도구, 사용자 지정 파이프라인 및 오케스트레이터의 작업을 모니터링하세요.
further_reading:
- link: /data_observability/
  tag: 문서
  text: Data Observability 개요
- link: /data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
  tag: 문서
  text: OpenLineage Proxy용 Datadog Agent 설정하기
title: OpenLineage를 사용하는 사용자 지정 작업
---
<div class="alert alert-info">OpenLineage를 사용하는 사용자 지정 작업은 미리 보기로 제공되고 있습니다.</div>

## 개요 {#overview}

사용자 지정 작업은 [OpenLineage][1] 표준을 사용하여 작업 및 계보 이벤트를 Datadog으로 전송합니다. 사용자 지정 작업을 통해 다음을 수행할 수 있습니다.

- 실패하거나 오래 실행되는 작업 탐지
- 실패하거나 오래 실행되는 작업의 근본 원인을 파악하고 해결
- 데이터 계보를 통해 업스트림 종속성 및 다운스트림 데이터 소비자를 파악

다음과 같은 경우 사용자 지정 작업을 사용하세요.

- 사내 도구 또는 사용자 지정 ETL 스크립트와 같이 Datadog 기본 통합이 없는 시스템에서 계보를 캡처할 경우
- 기본 Datadog 통합을 사용할 수 없는 작업 또는 오케스트레이터에 대한 계보 이벤트를 전송할 경우

**참고**: 구성을 중앙 집중화하고 모든 애플리케이션에 API 키를 배포하지 않으려면 [Datadog Agent를 OpenLineage 프록시로 설정][4]할 수 있습니다.

## 전제 조건 {#prerequisites}

- Datadog API 키. [API 및 애플리케이션 키][6]를 참조하세요.
- Datadog [사이트 URL][3]. 이 페이지의 예시는 `datadoghq.com`을 사용합니다. 호스트 이름을 사이트의 수집 엔드포인트로 바꾸세요.

## 1단계: `START` 이벤트 전송 {#step-1-send-a-start-event}

다음 옵션 중 하나를 사용하여 [OpenLineage 이벤트][1]를 Datadog으로 전송하세요.

**참고**: Datadog은 실행 이벤트를 처리하기 위해 `jobType` [작업 패싯][5]이 필요합니다.

작업과 데이터셋 간의 계보 에지를 확인하려면 이벤트에 `inputs` 및 `outputs`를 포함하세요. 데이터셋 네임스페이스는 각 플랫폼에 대해 Datadog이 예상하는 형식과 일치해야 합니다. [데이터셋 명명 규칙](#dataset-naming-conventions)을 참조하세요.

{{< tabs >}}
{{% tab "curl을 통한 직접 HTTP" %}}

원시 [OpenLineage RunEvent](https://openlineage.io/docs/spec/run-cycle/)를 JSON으로 Datadog의 수집 엔드포인트에 전송합니다.

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:00:00Z",
        "eventType": "START",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "inputs": [
          {
            "namespace": "postgres://demo-db.example.com:5432",
            "name": "orders.public.orders"
          }
        ],
        "outputs": [
          {
            "namespace": "snowflake://myorg-myaccount",
            "name": "ANALYTICS.PUBLIC.ORDERS"
          }
        ],
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(HTTP 전송)" %}}

수동으로 지정한 HTTP 전송을 사용하는 [OpenLineage Python 클라이언트](https://openlineage.io/docs/client/python)를 사용하세요.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job

client = OpenLineageClient(
    url="https://data-obs-intake.datadoghq.com",
    options=OpenLineageClientOptions(api_key="<DD_API_KEY>")
)

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(Datadog 전송)" %}}

OpenLineage 1.37.0 이상에서는 자동 구성 및 최적화된 이벤트 전송을 위해 [Datadog 전송](https://openlineage.io/docs/client/python#datadog-transport)을 사용하세요.

```python
from datetime import datetime
import uuid
from openlineage.client import OpenLineageClient
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run, InputDataset, OutputDataset
from openlineage.client.facet_v2 import job_type_job
from openlineage.client.transport.datadog import DatadogConfig, DatadogTransport

config = DatadogConfig(
    apiKey="<DD_API_KEY>",
    site="datadoghq.com"  # Change if using a different Datadog site
)

client = OpenLineageClient(transport=DatadogTransport(config))

event = RunEvent(
    eventType=RunState.START,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId=str(uuid.uuid4())),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    inputs=[
        InputDataset(
            namespace="postgres://demo-db.example.com:5432",
            name="orders.public.orders"
        )
    ],
    outputs=[
        OutputDataset(
            namespace="snowflake://myorg-myaccount",
            name="ANALYTICS.PUBLIC.ORDERS"
        )
    ],
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(event)
```

`DatadogConfig` 대신 환경 변수를 사용하여 Datadog 전송을 구성할 수도 있습니다.

```shell
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=datadoghq.com
export OPENLINEAGE__TRANSPORT__TYPE=datadog
```

```python
client = OpenLineageClient.from_environment()
```

{{% /tab %}}
{{< /tabs >}}

## 2단계: `RUNNING` 이벤트 전송(선택 사항) {#step-2-send-a-running-event-optional}

**참고**: 이 단계는 선택 사항입니다. `RUNNING` 이벤트를 사용하면 작업이 완료되기 전에 작업 상태를 확인할 수 있습니다. 작업 완료 상태만 캡처하면 되는 경우 [3단계](#step-3-send-a-complete-or-fail-event)로 건너뛰세요.

작업이 진행되는 동안 `RUNNING` 이벤트를 전송하여 Datadog의 Jobs Monitoring에서 추적하세요. `START` 이벤트와 동일한 `runId`를 사용하세요.

{{< tabs >}}
{{% tab "curl을 통한 직접 HTTP" %}}

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:02:00Z",
        "eventType": "RUNNING",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(HTTP 전송)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(Datadog 전송)" %}}

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

running_event = RunEvent(
    eventType=RunState.RUNNING,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(running_event)
```

{{% /tab %}}
{{< /tabs >}}

## 3단계: `COMPLETE` 또는 `FAIL` 이벤트 전송 {#step-3-send-a-complete-or-fail-event}

작업이 완료되면 `START` 이벤트와 동일한 `runId`를 사용하여 `COMPLETE` 또는 `FAIL` 이벤트를 전송하세요.

{{< tabs >}}
{{% tab "curl을 통한 직접 HTTP" %}}

**성공**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "COMPLETE",
        "run": { "runId": "<RUN_UUID>" },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

**실패**

```shell
curl -X POST "https://data-obs-intake.datadoghq.com/api/v1/lineage" \
  -H "Authorization: Bearer <DD_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
        "eventTime": "2024-01-01T10:05:00Z",
        "eventType": "FAIL",
        "run": {
          "runId": "<RUN_UUID>",
          "facets": {
            "errorMessage": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/1-0-1/ErrorMessageRunFacet.json",
              "message": "Job failed: division by zero",
              "programmingLanguage": "Python",
              "stackTrace": "Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            }
          }
        },
        "job": {
          "namespace": "<YOUR_NAMESPACE>",
          "name": "<YOUR_JOB_NAME>",
          "facets": {
            "jobType": {
              "_producer": "<YOUR_PRODUCER_ID>",
              "_schemaURL": "https://openlineage.io/spec/facets/2-0-3/JobTypeJobFacet.json",
              "processingType": "BATCH",
              "integration": "custom",
              "jobType": "JOB"
            }
          }
        },
        "producer": "<YOUR_PRODUCER_ID>"
      }'
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(HTTP 전송)" %}}

**성공**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**실패**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}

{{% tab "OpenLineage Python 클라이언트(Datadog 전송)" %}}

**성공**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job

complete_event = RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(runId="<RUN_UUID>"),  # same runId as START
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(complete_event)
```

**실패**

```python
from datetime import datetime
from openlineage.client.event_v2 import RunEvent, RunState, Job, Run
from openlineage.client.facet_v2 import job_type_job, error_message_run

fail_event = RunEvent(
    eventType=RunState.FAIL,
    eventTime=datetime.utcnow().isoformat(),
    run=Run(
        runId="<RUN_UUID>",  # same runId as START
        facets={
            "errorMessage": error_message_run.ErrorMessageRunFacet(
                message="Job failed: division by zero",
                programmingLanguage="Python",
                stackTrace="Traceback (most recent call last):\n  File \"job.py\", line 42, in run\n    result = total / count\nZeroDivisionError: division by zero"
            )
        }
    ),
    job=Job(
        namespace="<YOUR_NAMESPACE>",
        name="<YOUR_JOB_NAME>",
        facets={
            "jobType": job_type_job.JobTypeJobFacet(
                processingType="BATCH",
                integration="custom",
                jobType="JOB"
            )
        }
    ),
    producer="<YOUR_PRODUCER_ID>"
)

client.emit(fail_event)
```

{{% /tab %}}
{{< /tabs >}}

## 4단계: Datadog에서 검증 {#step-4-verify-in-datadog}

이벤트를 전송한 후 다음 페이지를 사용하여 Datadog이 이벤트를 수신하고 처리했는지 검증하세요.

- [**작업 개요**][7]: 작업 실행이 시작 시간, 지속 시간 및 상태와 함께 표시되는지 확인하세요.
- [**계보**][9]: 작업 이름을 검색하여 작업과 이벤트에 포함된 데이터셋 간의 연결을 확인하세요.
- [**OpenLineage 이벤트**][12]: 이벤트의 유효성 검사 상태를 확인하세요. `Ok`, `Warning` 또는 `Error` 중 하나로 표시됩니다. 이벤트를 선택하여 Datadog이 수신한 정확한 페이로드를 조회하거나, 유효성 검사 상태별로 필터링하여 성공적으로 처리되지 않은 이벤트의 문제를 해결하세요. 다른 두 보기에서 결과가 예상대로 나타나지 않으면 여기에서 시작하세요.

## 로그를 작업 실행과 상호 연계 {#correlate-logs-with-job-runs}

애플리케이션 로그를 Datadog의 작업 실행과 상호 연계하려면 `@openlineage.run_id` 속성에 OpenLineage 실행 ID를 포함하여 로그를 내보내세요. 해당 값을 OpenLineage 실행 이벤트로 전송하는 `runId`와 동일하게 설정하세요. Datadog은 이 속성을 사용하여 로그를 일치하는 작업 실행과 연결합니다.

실행 ID를 연결하는 방법은 로깅 설정에 따라 다릅니다. 사용자 지정 속성이 포함된 로그를 Datadog으로 전송하는 방법에 대한 자세한 내용은 [로그 수집 및 통합][10]을 참조하세요.

## 데이터셋 명명 규칙 {#dataset-naming-conventions}

사용자 지정 작업의 계보를 Datadog의 기본 통합에서 이미 추적 중인 데이터셋에 연결하려면, Datadog이 해당 플랫폼에 대해 예상하는 정확한 `namespace` 및 `name`을 사용하여 이벤트에 `inputs` 및 `outputs`를 포함하세요. 예를 들어, 사용자 지정 작업의 `outputs`에서 올바른 네임스페이스와 이름을 사용하여 Snowflake 테이블을 참조하면 계보 그래프의 기존 데이터셋 노드에 연결됩니다.

Datadog은 데이터셋을 계정, 데이터베이스, 스키마 및 테이블의 계층 구조로 매핑합니다. 이름의 구성 요소가 예상보다 적은 경우(예: `database.table` 대신 `database.schema.table`), Datadog은 계보 그래프에서 가장 가까운 상위 노드로 폴백합니다.

| 플랫폼   | 네임스페이스                                        | 이름                          |
| ---------- | ------------------------------------------------ | ----------------------------- |
| BigQuery   | `bigquery`                                       | `{project}.{dataset}.{table}` |
| Snowflake  | `snowflake://{org}-{account}`                    | `{database}.{schema}.{table}` |
| Redshift   | `redshift://{aws_account_id}:{region}:{cluster}` | `{database}.{schema}.{table}` |
| PostgreSQL | `postgres://{host}:{port}`                       | `{database}.{schema}.{table}` |
| Databricks | `databricks://{workspace-url}`                   | `{database}.{schema}.{table}` |
| Trino      | `trino://{host}:{port}`                          | `{catalog}.{schema}.{table}`  |
| AWS Glue   | `arn:aws:glue:{region}:{accountId}`              | `{database}.{table}`          |
| S3         | `s3://{bucket}`                                  | `{path}`                      |

여기에 나열되지 않은 플랫폼의 경우 [OpenLineage 명명 규칙][8]을 따르세요.

다음 예시는 PostgreSQL 테이블에서 읽고 Snowflake 테이블에 쓰는 작업을 보여줍니다.

```json
"inputs": [
  {
    "namespace": "postgres://db.example.com:5432",
    "name": "mydb.public.raw_orders"
  }
],
"outputs": [
  {
    "namespace": "snowflake://myorg-myaccount",
    "name": "ANALYTICS.PUBLIC.ORDERS"
  }
]
```

**참고**: 데이터셋 네임스페이스를 인식할 수 없는 경우에도 Datadog은 해당 네임스페이스에 대한 계보 노드를 생성하지만 Data Observability 제품에는 표시하지 않습니다. 데이터셋이 카탈로그 및 계보 그래프에 나타나게 하려면 인식된 네임스페이스 형식을 사용하세요.

## 지원되는 패싯 {#supported-facets}

패싯은 OpenLineage 이벤트에 첨부된 구조화된 메타데이터입니다. 각 패싯에는 `_producer`(패싯을 생성한 시스템을 식별하는 URI)와 `_schemaURL`(JSON 스키마를 참조하는 URI)이 필요합니다.

### `JobTypeJobFacet` {#jobtypejobfacet}

`jobType` 작업 패싯은 **필수**입니다. 이 패싯은 Datadog이 작업을 분류하고 표시하는 방식을 결정합니다.

#### `integration` 값 {#integration-values}

기본 통합에서 아직 지원하지 않는 기술에서 실행되는 작업의 경우, 기본 통합용으로 예약되지 않은 값을 사용하세요(예: `my-pipeline`). 이 값은 Datadog 전반에서 작업 유형을 나타내는 데 사용됩니다. 아래의 예약된 값은 Datadog의 기본 통합에서 사용됩니다. 사용자 지정 작업에 예약된 값을 사용하면 예기치 않은 동작이 발생할 수 있으며 지원되지 않습니다.

| 값          | 플랫폼                                                            |
| -------------- | -------------------------------------------------------------------- |
| `<YOUR_VALUE>` | 사용자 지정 또는 지원되지 않는 플랫폼                                     |
| `SPARK`        | Apache Spark(기본 통합 전용, 사용자 지정 작업에는 사용하지 마세요) |
| `AIRFLOW`      | Apache Airflow                                                      |
| `DBT`          | dbt                                                                 |
| `BIGQUERY`     | Google BigQuery                                                     |
| `SNOWFLAKE`    | Snowflake                                                           |
| `TRINO`        | Trino                                                                |
| `ICEBERG`      | Apache Iceberg                                                      |
| `TABLEAU`      | Tableau                                                             |

#### `processingType` 값 {#processingtype-values}

`BATCH` 또는 `STREAMING`.

#### `jobType` 값 {#jobtype-values}

일반적인 값으로는 `JOB`, `TASK`, `DAG`, `MODEL`, `COMMAND` 및 `QUERY`가 있습니다.

**참고**: `jobType`이 `QUERY`로 설정된 경우, Datadog은 해당 작업에 대한 계보 노드를 생성하지 않습니다.

### 기타 지원되는 패싯 {#other-supported-facets}

| 패싯          | Datadog의 처리 방식                                                                  |
| -------------- | ---------------------------------------------------------------------------------- |
| `parent`       | 계보 그래프에 상위-하위 작업 계층 구조 생성                            |
| `errorMessage` | `error.message` 및 `error.stack` 태그가 포함된 오류 스팬 생성                  |
| `tags`         | 작업 또는 실행에 사용자 지정 태그를 추가합니다. `_dd.ol_service` 값은 Datadog 서비스 이름에 매핑됩니다. |
| `sql`          | SQL 쿼리를 구문 분석하고 마스킹하여 쿼리 이벤트 생성                             |

**참고**: [`tags` 패싯][2]의 각 태그에는 `key`, `value` 및 `source`가 포함되어야 합니다.

사용자 지정 OpenLineage 태그를 Data Job Monitors에서 사용할 수 있게 하려면 `source`를 정확히 `USER`로 설정하세요. `source`가 누락되었거나 다른 태그는 Data Job Monitors에서 사용자 지정 태그로 사용할 수 없습니다.

`job.facets.tags` 및 `run.facets.tags`의 태그는 다르게 작동합니다.

- **작업 패싯 태그**: 기본 작업 트레이스에 태그로 추가되어, Jobs Overview 페이지와 [Trace Explorer][11]에서 이 태그로 필터링할 수 있습니다. `source`가 `USER`인 경우, Data Job Monitors에서도 사용할 수 있습니다. `team` 또는 `owner`와 같은 안정적인 작업 속성에는 작업 패싯 태그를 사용하세요.
- **실행 패싯 태그**: `source`가 `USER`인 경우 Data Job Monitors에서 사용할 수 있습니다. Jobs Overview 페이지나 [Trace Explorer][11]에서 검색 및 필터링을 위한 개별 태그로 추가되지 않습니다. 실행 간에 달라질 수 있는 값에는 실행 패싯 태그를 사용하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/docs/spec/run-cycle/
[2]: https://openlineage.io/spec/facets/1-0-0/TagsRunFacet.json
[3]: /ko/getting_started/site/#access-the-datadog-site
[4]: /ko/data_observability/jobs_monitoring/openlineage/datadog_agent_for_openlineage/
[5]: https://openlineage.io/docs/spec/facets/job-facets/job-type/
[6]: /ko/account_management/api-app-keys/
[7]: https://app.datadoghq.com/data-jobs
[8]: https://openlineage.io/docs/spec/naming/
[9]: https://app.datadoghq.com/data-obs/lineage
[10]: /ko/logs/log_collection/
[11]: /ko/tracing/trace_explorer/?tab=listview
[12]: https://app.datadoghq.com/data-obs/settings/open-lineage