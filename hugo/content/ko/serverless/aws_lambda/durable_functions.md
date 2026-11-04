---
description: AWS Lambda Durable Functions용 Datadog Serverless Monitoring을 설정합니다.
further_reading:
- link: https://www.datadoghq.com/blog/trace-aws-lambda-durable-functions/
  tag: 블로그
  text: Datadog을 사용하여 AWS Lambda Durable Functions 추적하기
title: AWS Lambda Durable Functions 모니터링
---
Datadog은 AWS Lambda Durable Functions 실행에 대한 메트릭, 로그 및 트레이스의 전체 가시성을 제공합니다. 단일 보기에서 AWS Lambda Durable Functions를 다른 서버리스 컴퓨팅 서비스와 함께 모니터링하여 병목 현상을 파악하고 오류를 수정할 수 있습니다.

**지원 런타임:** Node.js, Python

## 설정 {#setup}

### Lambda 함수 계측 {#instrument-your-lambda-function}

1. [Lambda 함수 계측 단계][1]를 따르고, Datadog Lambda 라이브러리가 설치되었으며, 추적 및 [로그 수집][9]이 모두 활성화되었는지 확인합니다(로그 수집은 기본적으로 활성화되어 있음). 다음 버전을 사용하세요.

    - Datadog Lambda Extension: v99+
    - Datadog Node.js Lambda 레이어: v142+
    - Datadog Python Lambda 레이어: v127+

2. Datadog Lambda Extension v99를 사용하는 경우 Lambda 함수에 다음 환경 변수를 설정합니다. v100+ 의 경우 기본값이 이미 `5`이므로 명시적으로 설정할 필요가 없습니다.

    ```text
    DD_LAMBDA_DURABLE_FUNCTION_LOG_BUFFER_SIZE=5
    ```

    이 환경 변수는 Datadog Lambda Extension이 로그를 버퍼링하고 Datadog Lambda Library에서 전송한 내구성 있는 실행 컨텍스트로 로그를 보강하도록 설정합니다. 로그가 버퍼링되는 최대 호출 횟수를 지정하는 0 이상의 정수로 값을 설정하세요. 값을 0으로 설정하면 보강 기능이 비활성화되어 내구성 있는 실행이 Datadog에 표시되지 않습니다. v99에서는 기본값이 0이고, v100 이상에서는 기본값이 5입니다.

### 내구성 있는 실행 이벤트 전달 {#forward-durable-execution-events}

**CloudFormation 스택 배포**

내구성 있는 실행 상태 변경 이벤트를 Datadog으로 전달하려면 AWS 계정에 CloudFormation 스택을 배포하세요.

1. 내구성 있는 함수가 실행되는 AWS 계정 및 리전에 로그인한 후, **Launch Stack**을 클릭하여 스택을 엽니다.

    [![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)][2]

2. 다음 파라미터 중 하나만 사용하여 Datadog API 키를 제공합니다.

    - `DdApiKey`: 일반 텍스트 형식의 [Datadog API 키][3]
    - `DdApiKeySecretArn`: Datadog API 키를 값으로 포함하는 AWS Secrets Manager 보안 암호의 ARN
    - `DdApiKeySsmParameterName`: Datadog API 키를 보유한 AWS Systems Manager 파라미터 스토어 `SecureString` 파라미터의 이름

3. `DdSite`를 [Datadog 사이트][4]로 설정합니다. 기본값은 `datadoghq.com`입니다.
4. 필요시 전달할 이벤트를 제한합니다.

    - `Statuses`: 전달할 실행 상태의 쉼표로 구분된 목록입니다. 유효한 값은 `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT`, 및 `STOPPED`입니다. 모든 상태를 전달하려면 이 항목을 비워 두세요.
    - `FunctionArnFilter1`~`FunctionArnFilter5`: 최대 5개의 정규화되지 않은 Lambda 함수 ARN 또는 EventBridge 와일드카드 패턴(예: `arn:aws:lambda:us-east-2:123456789012:function:my-durable-*`). 버전 또는 별칭 접미사를 포함하지 마세요. 해당 리전의 모든 함수에서 발생하는 이벤트를 전달하려면 5개 항목을 모두 비워 두세요
    - `BufferIntervalSeconds`: Amazon Data Firehose 버퍼 간격(초 단위, `60`~`900`, 기본값 `60`). 값이 높을수록 데이터 최신성은 떨어지지만 아웃바운드 요청 수는 줄어듭니다.

5. **Create stack**을 클릭하고 스택 생성이 완료될 때까지 기다립니다.
6. 내구성 있는 함수가 여러 AWS 리전에서 실행되는 경우, 각 리전에서 이 단계를 반복합니다.

**AWS 람다 통합 설치**

Datadog에서 [AWS Lambda 통합][5]을 설치하세요. 이 통합은 전달된 이벤트를 변환하는 기본 제공 로그 파이프라인을 제공합니다.

### 추적 보존 필터 생성{#create-a-trace-retention-filter}

보존 쿼리 `operation_name:aws.durable.execute`를 사용하여 [추적 보존 필터][6]를 생성하세요.

## Datadog에서 쿼리 {#querying-in-datadog}

Lambda 함수 페이지의 **Executions** 탭에는 내구성 있는 실행이 나열됩니다. 아래의 로그 속성, 스팬 태그 및 메트릭을 사용하여 내구성 있는 실행을 검색하거나 대시보드 및 모니터링을 구축하세요.

### 로그 {#logs}

로그 쿼리의 범위를 하나의 함수로 지정하려면 함수 ARN으로 필터링하세요.

```text
@lambda.arn:"<FUNCTION_ARN>"
```

Datadog Lambda Extension은 내구성 있는 함수의 로그에 다음 속성을 추가합니다.

| 로그 속성 | 설명 |
|---|---|
| `@lambda.durable_function.execution_name` | 실행 이름. 하나의 실행에서 생성된 모든 로그를 그룹화합니다. |
| `@lambda.durable_function.execution_id` | 실행 ID. |
실행의 첫 번째 호출에 대한 로그에서는 | `@lambda.durable_function.first_invocation` | `true`, 그 외에는`false`. |
| `@lambda.durable_function.execution_status` | 호출이 종료되었을 때의 실행 상태: `SUCCEEDED`, `FAILED` 또는 `PENDING`. 여기서 `PENDING`은 실행이 일시 중단되었으며 나중에 호출될 때 재개됨을 의미합니다. `END` 로그 또는 [Lambda Managed Instances][10]에서 실행되는 경우 `REPORT` 로그에서 확인합니다. |

예시 쿼리(검색 범위를 하나의 함수로 지정하려면`@lambda.arn:"<FUNCTION_ARN>"` 추가)

- 하나의 내구성이 있는 실행에 대한 모든 로그

    ```text
    @lambda.durable_function.execution_name:"<EXECUTION_NAME>"
    ```

- 각 실행의 `START` 로그(시작 시점 표시)

    ```text
    "START RequestId:" @lambda.durable_function.first_invocation:true
    ```

- 각 실행의 마지막 로그(종료 시점 표시)

    ```text
    "END RequestId:" OR "REPORT RequestId:"
    ```

    Lambda Managed Instances에서는 'END' 로그가 생성되지 않으므로 두 로그를 모두 쿼리하세요.

### 상태 변경 이벤트 {#status-change-events}

CloudFormation 스택에서 전달된 이벤트는 다음 조건과 일치하는 로그로 수신됩니다.

```text
@detail-type:"Durable Execution Status Change"
```

AWS Lambda 통합 파이프라인은 이러한 이벤트를 다음 속성에 매핑합니다.

| 로그 속성 | 설명 |
|---|---|
| `@lambda.durable_function.execution_status` | 다음 중 하나: `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMED_OUT` 또는 `STOPPED`. |
| `@lambda.durable_function.execution_start_time` | 실행이 시작된 시점(UNIX 밀리초 단위). |
| `@lambda.durable_function.execution_end_time` | 실행이 종료 상태에 도달한 시점(UNIX 밀리초 단위). |

`END` 및 `REPORT` 로그는 `TIMED_OUT` 또는 `STOPPED`를 보고할 수 없으므로 이러한 이벤트를 종료 상태의 기준 소스로 취급하세요.

종료 이벤트에는 실행이 완료된 시점의 타임스탬프가 기록되므로, 시간 범위를 선택하면 해당 범위 내에 완료된 실행이 선택됩니다.

### 트레이스 {#traces}

스팬 쿼리의 범위를 하나의 함수로 지정하려면 함수 ARN으로 필터링하세요.

```text
@function_arn:"<FUNCTION_ARN>"
```

**내구성 있는 실행 스팬**

트레이서는 호출당 하나의 `aws.durable.execute` 스팬을 생성하고 실행의 호출들을 하나의 단일 트레이스로 연결합니다.

| 스팬 태그 | 설명 |
|---|---|
| `@aws.durable.execution_arn` | 실행 이름이 포함된 전체 내구성 있는 실행 ARN. 이 스팬에는 실행 이름이 별도의 태그로 포함되지 않습니다. |
| `@aws.durable.invocation_status` | 이 호출이 종료되었을 때의 실행 상태: `succeeded`, `failed` 또는 `pending`. `pending`은 실행이 일시 중단되었다가 이후 호출에서 다시 재개됨을 의미합니다. |
실행을 시작하는 호출에서는 | `@aws.durable.replayed` | `false`, 일시 중단 후 재개되는 각 이후 호출에서는 `true`입니다. |

**Lambda 호출 스팬**

각 호출은 내구성 있는 실행 컨텍스트로 태그가 지정된 표준 `aws.lambda` 스팬을 생성합니다.

| 스팬 태그 | 설명 |
|---|---|
| `@aws.durable.execution_name` | 실행 이름. |
| `@aws.durable.execution_id` | 실행 ID. |
실행의 첫 번째 호출 시 | `@aws.durable.first_invocation` | `true`. |
| `@aws.durable.execution_status` | 호출이 종료되었을 때의 실행 상태: `SUCCEEDED`, `FAILED` 또는 `PENDING`. |

**작업 스팬**

내구성 있는 컨텍스트에서 호출되는 각 작업은 자식 스팬을 생성합니다.

| 작업 이름 | Node.js 메서드 | Python 메서드 |
|---|---|---|
| `aws.durable.step` | `step` | `step` |
| `aws.durable.invoke` | `invoke` | `invoke` |
| `aws.durable.wait` | `wait` | `wait` |
| `aws.durable.wait_for_condition` | `waitForCondition` | `wait_for_condition` |
| `aws.durable.wait_for_callback` | `waitForCallback` | `wait_for_callback` |
| `aws.durable.create_callback` | `createCallback` | `create_callback` |
| `aws.durable.map` | `map` | `map` |
| `aws.durable.parallel` | `parallel` | `parallel` |
| `aws.durable.child_context` | `runInChildContext` | `run_in_child_context` |

| 스팬 태그 | 설명 |
|---|---|
| `@aws.durable.operation_name` | 작업의 이름. |
| `@aws.durable.operation_id` | 작업 단계 ID의 해시 |
| `@aws.durable.operation_attempt` | 재시도 가능한 작업인 `aws.durable.step` 및 `aws.durable.wait_for_condition`의 시도 횟수입니다. `0`은 최초 시도이며, `1`은 첫 번째 재시도입니다. |
| `@aws.durable.replayed` | `true` 작업을 실행하는 대신 체크포인트에 저장된 결과를 가져온 경우 true이며, 저장된 결과가 성공인지 실패인지는 관계없습니다. |
| `@aws.durable.invoke.function_name` | `aws.durable.invoke`스팬의 대상 함수. |

### 메트릭 {#metrics}

AWS는 이러한 내구성 있는 실행 메트릭을 CloudWatch에 게시합니다. 이 메트릭은 [AWS Lambda 통합][5]을 통해 Datadog에 도달하며 `functionname` 태그가 지정됩니다.

| 메트릭 | 설명 | 집계 |
|---|---|---|
| `aws.lambda.durable_execution_started` | 시작된 내구성 있는 실행 수. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_succeeded` | 성공적으로 완료된 내구성 있는 실행 수. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_failed` | 실패로 완료된 내구성 있는 실행 수. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_timed_out` | 시간 초과된 내구성 있는 실행 수. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_stopped` |  `StopDurableExecution` API로 중지된 내구성 있는 실행 수입니다. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_duration` |  내구성 있는 실행이 `RUNNING` 상태에서 소요한 실제 경과 시간(밀리초 단위)입니다. | `avg` |
| `aws.lambda.durable_execution_operations` |  내구성 있는 실행에 의해 수행된 누적 작업 수입니다. 개수로 집계한 | `sum` |
| `aws.lambda.durable_execution_storage_written_bytes` | 내구성 있는 실행에 의해 저장된 누적 데이터 양(바이트 단위)입니다. | `sum` |
| `aws.lambda.approximate_running_durable_executions` |  `RUNNING` 상태에 있는 내구성 있는 실행 수입니다. | `avg` |
| `aws.lambda.approximate_running_durable_executions_utilization` |  내구성 있는 실행 할당량의 사용률(%)입니다. | `avg` |

예를 들어, 한 함수에 대한 실패한 실행을 그래프화 하는 방법은 다음과 같습니다.

```text
sum:aws.lambda.durable_execution_failed{functionname:<FUNCTION_NAME>}.as_count()
```

##  제한 사항 및 피드백 {#limitations-and-feedback}

Node.js 및 Python 이외의 런타임은 지원되지 않습니다. 다른 런타임에서 문제가 발생하면 [datadog-lambda-extension GitHub 리포지토리][7]에서 이슈를 여세요.

CloudFormation 스택에서 문제가 발생하면 [cloudformation-template GitHub 리포지토리][8]에 이슈를 여세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/aws_lambda/instrumentation
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-durable-function-event-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/lambda-durable-function-event-forwarder/latest.yaml
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/getting_started/site/
[5]: /ko/integrations/amazon_lambda/
[6]: /ko/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/cloudformation-template/tree/master/aws_durable_function_event_forwarder
[9]: /ko/serverless/aws_lambda/logs/#enable-log-collection
[10]: /ko/serverless/aws_lambda/managed_instances/