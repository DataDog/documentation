---
title: AWS Step Functions용 Serverless Monitoring 문제 해결
---
## 트레이스가 보이지 않습니다{#i-cannot-see-any-traces}

#### Step Function이 모든 로그를 보내도록 구성되었는지 확인 {#verify-that-your-step-function-is-configured-to-send-all-logs}
- AWS 콘솔의 Step Function에서 `DD_TRACE_ENABLED` 태그가 `true`로 설정되어 있는지 확인하세요.
- AWS 콘솔에서 Step Function의 로깅 탭을 엽니다. {{< ui >}}Log level{{< /ui >}}이 `ALL`로 설정되어 있고 {{< ui >}}Include execution data{{< /ui >}}가 선택되어 있는지 확인하세요.
- CloudWatch 로그 그룹(로깅 탭에서도 확인 가능)에 동일한 리전의 Datadog Lambda Forwarder에 대한 구독 필터가 있는지 확인하세요.

#### 로그가 Datadog으로 성공적으로 전달되는지 확인 {#verify-that-logs-are-forwarded-successfully-to-datadog}
- Datadog Lambda Forwarder에서 오류 메시지를 확인하세요. API 키와 Datadog 사이트를 올바르게 설정했는지 확인하세요.
- 환경 변수 `DEBUG`를 `DD_LOG_LEVEL`로 설정하여 Datadog Lambda Forwarder에서 `debug` 로그를 활성화하세요.

#### Live Search에서 로그를 검색할 수 있고 DD_TRACE_ENABLED 태그가 있는지 확인 {#verify-that-logs-are-searchable-on-live-search-and-have-dd-trace-enabled-tag}
Datadog에서 [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Log Stream{{< /ui >}}][2]로 이동합니다. `source:stepfunction`을 검색합니다. 상태 머신을 몇 번 트리거해야 할 수도 있습니다. 이전 버전에서 Datadog Lambda Forwarder를 업그레이드해야 하는 경우, 업그레이드 후 Forwarder에 `DD_FETCH_STEP_FUNCTIONS_TAGS` 태그가 `true`로 설정되어 있는지 확인하세요. 업그레이드된 Forwarder에 `DD_FETCH_STEP_FUNCTIONS_TAGS` 태그가 없는 경우, Forwarder가 올바르게 업그레이드되지 않았을 수 있습니다.

이전 단계에 따라 Forwarder 및 상태 머신 태그가 올바르게 설정되면 로그에 `DD_TRACE_ENABLED:true` 태그가 지정됩니다.

#### Step Function이 최신 버전을 사용하고 있는지 확인 {#verify-that-your-step-function-is-using-the-latest-version}
- AWS에서 Step Function API에 대한 업데이트를 릴리스하거나 더 최신 버전의 Step Function 정의를 도입할 수 있습니다. 이전 버전에서는 예상치 못한 로그 형식 지정이나 동작이 발생할 수 있습니다.
- 로그 전달 방식의 불일치를 방지하기 위해 최신 버전의 Datadog Lambda Forwarder를 사용하는 것이 좋습니다.

#### 사용자 지정 로그 파이프라인 사용 시 주의 사항 {#caution-when-using-custom-log-pipelines}
- 사용자 지정 로그 파이프라인은 로그 처리에 유연성을 제공할 수 있지만, 로그 형식을 지나치게 변경하면 이후 단계에서 로그가 파싱되지 않거나 인식되지 않는 등의 문제가 발생할 수 있습니다.
- JSON 형식을 변경하는 Step Function 로그 구조에 중대한 변경 사항을 적용하지 마세요.

## Lambda 트레이스가 Step Function 트레이스와 병합되지 않음 {#lambda-traces-are-not-merging-with-step-function-traces}
- Datadog에서 Lambda 트레이스와 Step Function 트레이스를 모두 볼 수 있는지 확인하세요.
- [트레이스 병합][6] 가이드에 따라 올바른 계층 또는 트레이서 버전을 사용하고 있는지 확인하세요. 또한 상태 머신 정의에서 Lambda 단계가 계측되었는지 확인하세요.
- Step Function을 한 번 실행하고 Lambda 단계의 `TaskScheduled` 이벤트 로그에 [Step Function 컨텍스트 객체][4]의 데이터가 포함된 페이로드가 있는지 확인하세요.
- Lambda에 `DD_TRACE_EXTRACTOR` 환경 변수가 설정되어 있으면 트레이스를 병합할 수 없습니다.

## `aws.stepfunctions` 루트 스팬은 보이지만 단계 스팬은 보이지 않습니다 {#i-can-see-the-awsstepfunctions-root-span-but-i-cannot-see-any-step-spans}
상태 머신의 로깅에서 {{< ui >}}Include execution data{{< /ui >}} 옵션을 활성화하세요. 이 옵션을 활성화하면 실행 입력, 상태 간에 전달되는 데이터, 실행 출력이 로그로 기록됩니다. Datadog 백엔드는 로그를 사용하여 이러한 단계 스팬을 구성합니다.

## 트레이스가 간헐적으로 누락됨 {#traces-are-missing-intermittently}
트레이스를 검색할 때 오른쪽 상단 모서리에서 {{< ui >}}Live Search{{< /ui >}} 옵션을 선택하세요. Live Search에 트레이스가 표시되면 [보존 필터](https://docs.datadoghq.com/ko/tracing/trace_pipeline/trace_retention/#retention-filters)에 '@trace_type:stepfunctions'를 추가하고 원하는 보존율을 설정해 줘. 디버깅을 위해 Datadog은 보존율을 100%로 설정할 것을 권장합니다. 디버깅이 완료되면 필터를 비활성화할 수 있습니다.

## 일부 단계 스팬이 트레이스에서 누락되었습니다 {#some-step-spans-are-missing-in-the-traces}
- Lambda, DynamoDB, StepFunction 및 기타 대부분의 AWS 서비스 작업이 지원됩니다.
- `Wait`, `Choice`, `Success`, `Fail`, `Pass`, `Inline MapState` 및 `Parallel`은 지원되지만 [`Distributed MapState`][8]는 제한적으로 지원됩니다.

## 이전 로그 검색 {#search-historic-logs}
이전 로그 검색을 활성화하려면 전달된 로그에 임시 인덱스를 추가하세요. Datadog에서 로그 [{{< ui >}}Indexes{{< /ui >}}][3] 탭을 엽니다. 오른쪽 상단에 있는 {{< ui >}}New Index{{< /ui >}} 버튼을 클릭합니다.

이름을 선택하고, 인덱스 필터를 `Source:stepfunction`으로 설정하고, 나머지는 기본값으로 둔 다음 저장합니다.

{{< img src="serverless/step_functions/log_index.png" alt="새 로그 인덱스" style="width:80%;" >}}

조직에 제한값이 낮게 설정된 포괄적인 인덱스가 이미 있는 경우, 새 인덱스를 맨 위에 배치합니다.

**참고**: 로그 인덱싱은 트레이스를 가져오는 데 필수 요구 사항이 아니며, 추가 비용이 발생할 수 있습니다. 특정 이슈를 해결하는 경우, 로그를 인덱스로 일시적으로 보내고 디버깅한 다음 나중에 인덱스를 삭제하는 것이 좋습니다. 자세한 내용은 [인덱스][5]를 참조하세요.

## 실행 내 로그 누락 {#missing-logs-within-an-execution}
[제외 필터][7]를 사용하면 특정 `execution_arn`을 가진 모든 로그 중 일정 비율을 제외할 수 있습니다. 제외 필터를 사용해도 트레이스에는 영향을 미치지 않습니다.

다음 예제에서 필터는 `@execution_arn`에 해당하는 로그의 90%를 제외합니다.

{{< img src="serverless/step_functions/exclusion_filter.png" alt="Step Functions라는 이름의 제외 필터입니다. 'Define exclusion query' 상자에 'source:stepfunction'이 표시되어 있습니다. 'Set exclusion percentage' 아래에서 필터가 @execution_arn의 90%를 제외하도록 설정되어 있습니다." style="width:80%;" >}}

## Datadog Lambda Forwarder를 배포하는 사용자 지정 방식 {#customized-way-to-deploy-datadog-lambda-forwarder}
Datadog Lambda Forwarder를 배포하는 사용자 지정 방식을 사용하는 경우, Step Functions 트레이스 활성화를 디버깅하는 데 도움이 되는 몇 가지 팁은 다음과 같습니다.
- Forwarder에서 환경 변수 `DD_FETCH_STEP_FUNCTIONS_TAGS`를 `true`로 설정하세요.
- Datadog 백엔드에서 Step Functions 트레이스 생성을 활성화하려면 Datadog-Forwarder 레이어 버전이 31보다 높아야 합니다. 이 버전은 필수 `DD_TRACE_ENABLED` 태그를 포함하여 상태 머신 태그를 가져올 수 있습니다.
- v3.121.0 이상을 사용하는 Forwarder에서 모든 Step Functions에 대한 트레이스를 활성화하려면 Forwarder 수준에서 `DD_STEP_FUNCTIONS_TRACE_ENABLED` 태그를 설정할 수도 있습니다.
- Forwarder에 대한 IAM 역할에는 `tags:getResources` 권한이 있어야 합니다.
- 상태 머신 CloudWatch 로그 그룹에서 Datadog Forwarder로의 구독 필터를 설정하세요.
- 로그가 Datadog 백엔드에 도달하는지 확인하려면 {{< ui >}}Log Explorer{{< /ui >}} 페이지를 열고 {{< ui >}}Live{{< /ui >}} 검색 기간으로 `source:stepfunction`을 검색하세요(Datadog 로그 수집으로 들어오는 모든 로그가 표시됨). 로그가 보이지 않으면 잘못되었거나 유효하지 않은 API 키와 같은 Datadog Forwarder의 오류 로그가 있는지 확인하세요. 환경 변수 `DD_LOG_LEVEL`을 `DEBUG`로 추가하면 Forwarder 이슈를 디버깅하는 데 도움이 됩니다. Step Functions 로그가 보이면 해당 로그에 `dd_trace_enable:true` 태그가 있는지 확인하세요(모든 태그는 정규화됨). 몇 분 내에 해당 로그와 연결된 Step Function 트레이스를 확인할 수 있습니다.


[1]: /ko/logs
[2]: /ko/logs/livetail
[3]: /ko/logs/pipelines/indexes
[4]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[5]: /ko/logs/log_configuration/indexes/
[6]: /ko/serverless/step_functions/merge-step-functions-lambda/?tab=serverlessframework#merge-step-functions-traces-with-downstream-lambda-traces
[7]: /ko/logs/log_configuration/indexes/#exclusion-filters
[8]: /ko/serverless/step_functions/distributed-maps