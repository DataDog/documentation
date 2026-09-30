---
title: AWS Step Functions용 향상된 메트릭
---

Datadog은 [AWS에서 통합 메트릭을 수집하는 것][3] 외에도 [AWS Lambda용 향상된 메트릭][1]과 유사하게 AWS Step Functions용 ​​향상된 메트릭을 생성합니다. Enhanced Step Functions 메트릭은 `aws.states.enhanced.*` 네임스페이스에 있다는 점에서 구별됩니다. 향상된 메트릭을 추가하려면 [AWS Step Function 모니터링 설치 지침][3]을 따르고 `DD_ENHANCED_METRICS`를 `true`로 설정합니다.

다음과 같은 향상된 Step Functions 메트릭을 사용할 수 있습니다.

`aws.states.enhanced.execution.started`
: 시작된 총 실행 횟수를 계산합니다.

`aws.states.enhanced.execution.succeeded`
: 성공한 총 실행 횟수를 계산합니다.

`aws.states.enhanced.execution.failed`
: 실패한 총 실행 횟수를 계산합니다.

`aws.states.enhanced.execution.execution_time`
: 개별 실행 시간 분포.

`aws.states.enhanced.task.execution.tasks_started`
: 시작된 총 작업 개수를 계산합니다.

`aws.states.enhanced.task.execution.tasks_succeeded`
: 성공한 총 작업 개수를 계산합니다.

`aws.states.enhanced.task.execution.tasks_failed`
: 실패한 총 작업 개수를 계산합니다.

`aws.states.enhanced.task.execution.task_duration`
: 개별 작업 시간 분포.

`aws.states.enhanced.state.run_duration`
: 상태 실행 시간 게이지.

`aws.states.enhanced.state.duration`
: 재시도를 포함한 상태 실행 시간 게이지.

`aws.states.enhanced.state.invocation_count`
: 상태가 호출된 횟수를 계산합니다.

`aws.states.enhanced.state.retry_count`
: 상태 재시도 횟수 게이지.

[1]: /ko/serverless/aws_lambda/metrics#enhanced-lambda-metrics
[2]: /ko/integrations/amazon_web_services/
[3]: /ko/serverless/step_functions/installation