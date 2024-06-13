---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: 블로그
  text: AWS Lambda Telemetry API를 통해 확장된 Datadog Lambda 확장 기능
kind: 설명서
title: Lambda 함수 로그 수집 트러블슈팅 가이드
---

Log Explorer에 Datadog 포워더 Lambda 함수에서 전달된 로그가 표시되지 않으면 아래 문제 해결 단계를 따르세요. 이 단계를 수행한 후에도 문제가 계속 발생하면 [Datadog 지원팀에 문의][1]하여 추가 지원을 받으세요.

## 로그가 Datadog으로 전송되나요?

1. [Log Explorer의 Live Tail 보기][2]로 이동합니다.
2. 검색 창에서 필터를 사용하여 Live Tail 보기를 Lambda 함수에서 나오는 로그로만 제한합니다. 몇 가지 일반적인 검색어는 다음과 같습니다.
    * 소스별: 소스는 종종 `source:lambda`, `source:aws`, `source:cloudwatch`로 설정되지만 [Lambda 함수][3]의 `parse_event_source` 함수에서 다른 가능한 소스를 찾을 수 있습니다.
    * 포워더 이름별: Lambda 함수는 전달하는 모든 로그에 `forwardername` 태그를 추가합니다. `forwardername:*` 또는 `forwardername:<FORWARDER_FUNCTION_NAME>`를 검색하여 이 태그를 필터링할 수 있습니다.
3. Live Tail에 로그가 표시되지만 Log Explorer에 표시되지 않는다면 로그 인덱스에 일부 [제외 필터][4]가 설정되어 있다는 의미입니다. 이 필터는 로그를 필터링하고 있습니다.
4. Live Tail에 로그가 표시되지 않으면 로그가 Datadog에 도달하지 않는 것입니다.

## Lambda 함수 Monitoring 탭 확인

[AWS 콘솔에서][5]

1. 포워더 Lambda 함수를 엽니다.

2. Monitoring 탭을 클릭합니다.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Monitoring 탭" style="width:80%;" >}}

3. Monitoring 탭에는 Lambda 함수에 대한 다음 정보를 나타내는 일련의 그래프가 표시됩니다.
    * invocations
    * errors
    * logs

4. **Invocations** 그래프에 데이터 포인트가 표시되지 않으면 함수에 설정한 트리거에 문제가 있을 수 있습니다. [함수 트리거 관리](#manage-your-function-triggers)를 참조하세요. Monitoring 탭을 사용하지 않고 Lambda 호출에 대한 인사이트를 얻으려면 [Datadog에서 Lambda 메트릭 보기](#viewing-lambda-metrics-in-datadog)를 참조하세요.
5. "Error count and success rate" 그래프에 데이터 포인트가 표시되면 [Lambda 함수 로그를 확인](#check-the-lambda-function-logs)하여 어떤 오류 메시지가 보고되는지 확인하세요.

### Datadog에서 Lambda 메트릭 보기

AWS Lambda 메트릭을 활성화한 경우 Datadog 내에서 Lambda 호출 및 오류와 관련된 메트릭을 볼 수 있습니다. 다음 메트릭에는 모두 `functionname` 태그가 지정되어 있습니다.

| 메트릭                        | 설명                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Lambda 함수가 트리거/호출된 횟수                                      |
| `aws.lambda.errors `          | 함수 호출 시 발생한 오류 수                                        |
| `aws.lambda.duration `        | Lambda 함수가 실행을 완료하는 데 걸린 평균 시간(밀리초)  |
| `aws.lambda.duration.maximum` | Lambda 함수 실행을 완료하는 데 걸린 최대 시간(밀리초)  |
| `aws.lambda.throttles`        | 고객 한도를 초과하는 호출 비율로 인해 제한된 호출 시도 횟수 |

이러한 메트릭 및 기타 AWS Lambda 메트릭에 대한 자세한 내용은 [AWS Lambda 메트릭][6]을 참조하세요.

### 함수 트리거 관리

로그를 전달하려면 포워더 Lambda 함수에 트리거(CloudWatch Logs 또는 S3)가 설정되어 있어야 합니다. 트리거가 올바르게 설정되었는지 확인하려면 아래 단계를 따르세요.

1. 로그 소스(CloudWatch 로그 그룹 또는 S3 버킷)가 포워더 Lambda 콘솔의 "Triggers" 목록에 표시되나요? 그렇다면 활성화되어 있는지 확인하세요. 그렇지 않은 경우 아래 단계에 따라 S3 또는 CloudWatch 로그 그룹 콘솔을 확인하세요. Lambda 콘솔에 표시되는 "Triggers" 목록에 모두 포함되지 않을 수 있기 때문입니다.

2. S3 버킷의 경우 버킷의 "Properties" 탭으로 이동하여 "Advanced settings" 및 "Events" 타일까지 아래로 스크롤하거나 아래 AWS CLI 명령을 사용하여 쿼리를 작성합니다. 포워더 Lambda 함수를 트리거하도록 구성된 이벤트 알림이 표시되나요? 그렇지 않은 경우 트리거를 구성해야 합니다.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. CloudWatch 로그 그룹의 경우 "Log group details" 섹션 아래에 있는 로그 그룹 콘솔의 "Subscriptions" 필드로 이동합니다. 또는 아래 AWS CLI 명령을 사용하여 쿼리할 수 있습니다. 포워더 Lambda 함수가 로그 그룹을 구독하지 않는 경우 트리거를 구성해야 합니다.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. 트리거를 [자동][7] 또는 [수동][8]으로 설정합니다.

CloudWatch 로그 그룹의 경우 Datadog 플랫폼 내에서 다음 메트릭을 사용하여 로그가 로그 그룹에서 포워더 Lambda 함수로 전달되는지 확인할 수 있습니다. 메트릭을 확인할 때 `log_group` 태그를 사용하여 데이터를 필터링합니다.

| 메트릭                          | 설명                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | CloudWatch Logs에 업로드된 로그 이벤트 수                                               |
| `aws.logs.forwarded_log_events` | 구독 대상으로 전달된 로그 이벤트 수                                 |
| `aws.logs.delivery_errors`      | 구독 대상으로 전달되지 못한 로그 이벤트 수                    |
| `aws.logs.delivery_throttling`  | 구독 대상으로 전달하기 위해 제한된 로그 이벤트 수                  |

## Lambda 함수 로그 확인

1. Monitoring 탭에서 **View logs in Cloudwatch**를 클릭합니다.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Cloudwatch의 Lambda 로그" style="width:80%;" >}}

2. 가장 최근의 로그 스트림을 찾습니다.

3. 오류가 보이나요? "?ERROR ?Error ?error"를 검색해 보세요.

4. 추가 디버깅을 위해 디버깅 로그를 활성화하려면 포워더 Lambda 함수에서 환경 변수 "DD_LOG_LEVEL"을 "debug"로 설정합니다. 디버깅 로그는 장황하기 때문에 디버깅 후 비활성화하는 것을 잊지 마세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/help
[2]: https://docs.datadoghq.com/ko/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: https://docs.datadoghq.com/ko/logs/indexes/#exclusion-filters
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://docs.datadoghq.com/ko/integrations/amazon_lambda/?tab=awsconsole#metrics
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[8]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers