---
title: Datadog 포워더를 사용하여 .NET 서버리스 애플리케이션 계측하기
---
## 개요

<div class="alert alert-warning">
Datadog 서버리스를 처음 사용하신다면 <a href="/serverless/installation/dotnet">Datadog Lambda 확장을 사용해 Lambda 함수를 계측하는 것에 관한 지침</a>을 따르세요. Lambda가 즉시 사용 가능한 기능을 제공하기 전에 Datadog 포워더를 사용하여 Datadog 서버리스를 설정한 경우, 이 가이드를 사용하여 인스턴스를 유지 관리하세요.
</div>

## 전제 조건

[Datadog 포워더 Lambda 함수][1]는 AWS Lambda 향상된 메트릭, 커스텀 메트릭 및 로그를 수집하는 데 필요합니다.

## X-Ray 추적 사용

1. Lambda 함수에 대해 [AWS X-Ray 액티브 추적][2]을 활성화합니다.
2. [.NET용 AWS X-Ray SDK][3]를 설치합니다.

## Datadog 포워더를 로그 그룹에 연결

Datadog 포워더 Lambda 함수를 각 함수의 로그 그룹에 [연결][4]하여 메트릭, 트레이스 및 로그를 Datadog으로 전송합니다.

## 다음 단계

- 이제 [Serverless Homepage][1]에서 메트릭, 로그, 트레이스를 조회할 수 있습니다.
- [커스텀 비즈니스 로직을 모니터링하기](#monitor-custom-business-logic)위해 샘플 코드를 참조하세요.
- 텔레메트리 수집에 관한 문제가 발생한 경우 [문제 해결 가이드][6]를 참조하세요.

## 커스텀 비즈니스 로직 모니터링

Datadog 포워더를 사용하여 [커스텀 메트릭][7]을 제출하려면 아래 샘플 코드를 참조하세요:

```csharp
var myMetric = new Dictionary<string, object>();
myMetric.Add("m", "coffee_house.order_value");
myMetric.Add("v", 12.45);
myMetric.Add("e", (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds);
myMetric.Add("t", new string[] {"product:latte", "order:online"});
LambdaLogger.Log(JsonConvert.SerializeObject(myMetric));
```


[1]: /ko/serverless/forwarder
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[4]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[5]: https://app.datadoghq.com/functions
[6]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[7]: /ko/serverless/custom_metrics