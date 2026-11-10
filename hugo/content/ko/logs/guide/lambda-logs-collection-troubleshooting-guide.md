---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: 블로그
  text: AWS Lambda Telemetry API를 통해 확장된 Datadog Lambda 확장 기능
title: Lambda 함수 로그 수집 문제 해결 가이드
---
Log Explorer에서 Datadog Forwarder Lambda 함수가 전달한 로그가 보이지 않으면 아래 문제 해결 단계를 따릅니다. 이 단계를 따른 후에도 문제가 계속되면 [Datadog 지원팀][1]에 문의하여 추가 지원을 받으세요.

## 로그가 Datadog으로 전송되고 있나요? {#are-your-logs-sent-to-datadog}

1. [Log Explorer의 Live Tail 보기][2]로 이동합니다.
2. 검색창에서 필터를 사용하여 Live Tail 보기에 Lambda 함수에서 전송된 로그만 표시되도록 합니다. 몇 가지 일반적인 검색어는 다음과 같습니다.
    * 소스 기준: 소스는 종종 `source:lambda`, `source:aws`, `source:s3` 또는 `source:cloudwatch`로 설정됩니다.
    * Forwarder 이름 기준: Lambda 함수는 전달하는 모든 로그에 `forwardername` 태그를 추가합니다. `forwardername:*` 또는 `forwardername:<FORWARDER_FUNCTION_NAME>`을 검색하여 이 태그를 필터링할 수 있습니다.
3. 로그가 Live Tail에는 표시되지만 Log Explorer에는 표시되지 않는 경우 다음 중 하나가 원인일 수 있습니다(자세한 내용은 [로그 문제 해결 문서][4]를 참조하세요).
   * 로그 인덱스에 이러한 로그를 제외하는 필터가 적용되어 있습니다.
   * 일일 로그 할당량을 초과했습니다.
   * 로그의 타임스탬프가 현재 시각보다 18시간 이상 과거입니다.
4. Live Tail에 로그가 표시되지 않으면 로그가 Datadog에 도달하지 않는 것입니다.

## Lambda 함수의 Permissions 확인 {#check-the-lambda-function-permissions}

권한 문제로 인해 Forwarder가 로그 소스에 액세스하지 못할 수도 있습니다. Lambda 함수는 리소스 기반 정책(Datadog 통합 역할 정책과는 무관)을 사용하여 로그 소스에 대한 액세스 권한을 부여합니다.

다음 명령을 실행하여 Forwarder의 정책을 확인합니다.
   ```
   get-policy command aws lambda get-policy --function-name <FUNCTION_NAME>
   ```

이 명령은 어떤 AWS 서비스 및 리소스(예: 특정 S3 버킷)가 Forwarder 함수를 호출할 수 있는지 지정하는 리소스 기반 정책을 반환합니다.

<div class="alert alert-danger">
정책 문서의 Action 및 Resource 요소는 <a href="/logs/guide/forwarder/?tab=cloudformation#permissions">Datadog Forwarder 권한</a>의 사양과 <strong>정확히 일치해야 합니다</strong>.
</div>

## Lambda 함수의 Monitoring 탭 확인 {#check-the-lambda-function-monitoring-tab}

[AWS 콘솔에서][6]

1. Forwarder Lambda 함수를 엽니다.

2. {{< ui >}}Monitoring{{< /ui >}} 탭을 클릭합니다.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Monitoring 탭" style="width:80%;" >}}

3. Monitoring 탭에는 Lambda 함수에 대한 다음 정보를 나타내는 일련의 그래프가 표시됩니다.
    * 호출
    * 오류
    * 로그

4. {{< ui >}}Invocations{{< /ui >}} 그래프에 데이터 포인트가 표시되지 않으면 함수에 설정한 트리거에 문제가 있을 수 있습니다. [함수 트리거 관리](#manage-your-function-triggers)를 참조하세요. Monitoring 탭을 사용하지 않고 Lambda 호출에 대한 정보를 얻으려면 [Datadog에서 Lambda 메트릭 보기](#viewing-lambda-metrics-in-datadog)를 참조하세요.
5. 'Error count and success rate' 그래프에 데이터 포인트가 표시되면 [Lambda 함수 로그를 확인하여](#check-the-lambda-function-logs) 어떤 오류 메시지가 보고되는지 확인합니다.

### Datadog에서 Lambda 메트릭 보기 {#viewing-lambda-metrics-in-datadog}

AWS Lambda 메트릭을 활성화한 경우 Datadog 내에서 Lambda 호출 및 오류와 관련된 메트릭을 볼 수 있습니다. 다음 메트릭에는 모두 `functionname` 태그가 지정되어 있습니다.

| 메트릭                        | 설명                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Lambda 함수가 트리거/호출된 횟수                                      |
| `aws.lambda.errors `          | 함수 호출 시 발생한 오류 수                                        |
| `aws.lambda.duration `        | Lambda 함수가 실행을 완료하는 데 걸린 평균 시간(밀리초)  |
| `aws.lambda.duration.maximum` | Lambda 함수가 실행을 완료하는 데 걸린 최대 시간(밀리초)  |
| `aws.lambda.throttles`        | 고객 한도를 초과하는 호출 비율로 인해 제한된 호출 시도 횟수 |

이러한 메트릭 및 기타 AWS Lambda 메트릭에 대한 자세한 내용은 [AWS Lambda 메트릭][7]을 참조하세요.

### 함수 트리거 관리 {#manage-your-function-triggers}

로그를 전달하려면 포워더 Lambda 함수에 트리거(CloudWatch Logs 또는 S3)가 설정되어 있어야 합니다. 트리거가 올바르게 설정되었는지 확인하려면 아래 단계를 따르세요.

1. 로그 소스(CloudWatch 로그 그룹 또는 S3 버킷)가 Forwarder Lambda 콘솔의 'Triggers' 목록에 표시됩니까? 표시된다면 활성화되어 있는지 확인합니다. 그렇지 않은 경우 Lambda 콘솔의 'Triggers' 목록에는 일부 트리거가 표시되지 않을 수 있으므로, 아래 단계에 따라 S3 또는 CloudWatch 로그 그룹 콘솔에서 확인합니다.

2. S3 버킷의 경우 버킷의 'Properties' 탭으로 이동하여 'Advanced settings' 및 'Events' 타일까지 아래로 스크롤하거나 다음 AWS CLI 명령을 사용하여 쿼리합니다. Forwarder Lambda 함수를 트리거하도록 구성된 이벤트 알림이 표시됩니까? 그렇지 않은 경우 트리거를 구성해야 합니다.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. CloudWatch 로그 그룹의 경우 로그 그룹 콘솔에서 'Log group details' 섹션의 'Subscriptions' 필드로 이동합니다. 또는 아래 AWS CLI 명령을 사용하여 쿼리할 수 있습니다. 로그 그룹이 Forwarder Lambda 함수의 구독 대상으로 설정되어 있지 않다면 트리거를 구성해야 합니다.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. 트리거를 [자동][8] 또는 [수동][9]으로 설정합니다.

CloudWatch 로그 그룹의 경우 Datadog 플랫폼 내에서 다음 메트릭을 사용하여 로그가 로그 그룹에서 Forwarder Lambda 함수로 전달되는지 확인할 수 있습니다. 메트릭을 볼 때 `log_group` 태그를 사용하여 데이터를 필터링합니다.

| 메트릭                          | 설명                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | CloudWatch Logs에 업로드된 로그 이벤트 수                                               |
| `aws.logs.forwarded_log_events` | 구독 대상으로 전달된 로그 이벤트 수                                 |
| `aws.logs.delivery_errors`      | 구독 대상으로 전달되지 못한 로그 이벤트 수                    |
| `aws.logs.delivery_throttling`  | 구독 대상으로 전달하는 과정에서 스로틀링된 로그 이벤트 수                  |

### 자동 트리거 {#automatic-trigger}

Datadog이 트리거를 자동으로 생성하지 못하는 경우 다음 문제 해결 체크리스트를 확인합니다.

1. Forwarder ARN이 AWS Integration의 Log Collection 탭에 표시되는지 확인합니다.
2. 통합 역할에 [필수 권한][10]이 할당되었는지 확인합니다.
3. 로그 소스가 Lambda 로그 그룹인 경우 Lambda 함수에 [확장 프로그램][11]이 설치되어 있는지 확인합니다.
4. 로그 소스가 CloudWatch 로그 그룹인 경우 이미 구독 대상이 2개(허용되는 최대 수) 설정되어 있지 않은지 확인합니다.

## Lambda 함수 로그 확인 {#check-the-lambda-function-logs}

1. Monitoring 탭에서 {{< ui >}}View logs in Cloudwatch{{< /ui >}}를 클릭합니다.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="CloudWatch의 Lambda 로그" style="width:80%;" >}}

2. 가장 최근의 로그 스트림을 찾습니다.

3. 오류가 표시됩니까? '?ERROR ?Error ?error'를 검색해 보세요.

4. 추가 디버깅을 위해 디버그 로그를 활성화하려면 Forwarder Lambda 함수에서 환경 변수 'DD_LOG_LEVEL'을 'debug'로 설정합니다. 디버깅 로그는 매우 상세하므로 디버깅 후에는 반드시 비활성화해야 합니다.

### Lambda 함수에서 필터링한 로그 {#logs-filtered-by-the-lambda-function}

Lambda Forwarder는 다음 [환경 변수][12]를 사용하여 로그를 필터링합니다.

* INCLUDE_AT_MATCH
* EXCLUDE_AT_MATCH

Forwarder의 DEBUG 로그에서 이러한 변수를 검색하면 특정 로그가 필터로 인해 제외되는지 확인할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/help
[2]: /ko/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: /ko/logs/troubleshooting/
[5]: /ko/logs/guide/forwarder/?tab=cloudformation#permissions
[6]: https://console.aws.amazon.com/lambda/home
[7]: /ko/integrations/amazon_lambda/?tab=awsconsole#metrics
[8]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[9]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[10]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: /ko/serverless/libraries_integrations/extension/
[12]: /ko/logs/guide/forwarder/?tab=cloudformation#log-filtering-optional