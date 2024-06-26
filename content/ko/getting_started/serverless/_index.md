---
further_reading:
- link: /agent/basic_agent_usage/
  tag: 설명서
  text: Agent 기본 사용법
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 서버리스 모니터링에 대해 자세히 알아보세요.
kind: 설명서
title: AWS Lambda 서버리스 모니터링 시작하기
---

## 개요

_서버리스(Serverless)_는 개발자가 인프라스트럭처를 자체적으로 관리하는 대신, 클라우드 공급업체를 사용해 애플리케이션과 서비스를 개발하고 실행하는 모델입니다. Datadog [Serverless Monitoring][1]은 서버리스 인프라스트럭처에서 메트릭, 로그, 트레이스를 수집하여 애플리케이션 건전성과 성능을 모니터링하도록 도와줍니다.

이번 가이드에서는 클릭 한 번으로 시작할 수 있는 서버리스 [샘플 앱][2]을 사용해보겠습니다. 이 앱에는 서버리스 모니터링이 사전 설정으로 구성되어 있습니다. 이번 가이드에 따라 샘플 앱에서 문제가 발생했을 때 트러블슈팅하는 방법, 서버리스 모니터링에서 지원하는 시각화 자료의 유형을 알아보시기 바랍니다.

### 샘플 앱 설치하기

1. [CloudFormation Stack을 시작하세요][3]. 이 링크를 사용하면 CloudFormation의 **Create stack** 페이지로 이동합니다.
2. [Datadog API 키][4]와 [Datadog 사이트][5] ({{< region-param key="dd_site" code="true" >}})를 입력하세요.

  {{< img src="getting_started/serverless/aws_create_stack.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

   다음으로 IAM 함수를 확인하고, **Create Stack**을 클릭합니다.

3. 스택이 생성되었다면 Outputs 탭을 엽니다.

  {{< img src="getting_started/serverless/aws_outputs.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

  `ApiGatewayInvokeURL`을 방문해 샘플 앱을 몇 번 호출하세요. 이렇게 하면 "Sent message to SNS" 성공 메시지가 반환됩니다.

각 호출 실행 시에는 다음을 사용합니다.

```python
import boto3, os

def handler(event, context):
    sns = boto3.client('sns')

    sns.publish(
        TopicArn=os.environ.get("SNS_TOPIC_ARN"),
        Message='Message sent to SNS'
        )

    return {
        "body": "Sent message to SNS",
        "statusCode": 200
    }
```

[서버리스 보기에서 샘플 앱 함수를 확인][6]할 수 있습니다.

{{< img src="getting_started/serverless/serverless_view_2024.png" alt="서버리스 모니터링: 서버리스 보기, 탐색기 페이지" style="width:80%;">}}

## 서버리스 보기 화면

서버리스 보기 화면(Serverless View)은 AWS 환경의 모든 서버리스 리소스에서 원격 측정한 데이터를 보여줍니다. 이 페이지를 애플리케이션 모니터링, 디버깅, 최적화의 시작점으로 삼을 수 있습니다.

샘플 앱을 한 번 이상 호출했다면 `datadog-sample-entry-function` 및 `datadog-sample-sqs-consumer-function`이 표시됩니다.

{{< img src="getting_started/serverless/functions_view.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

### 서버리스 인사이트
서버리스 보기 화면에서 가장 오른쪽에 있는 열의 이름은 **Insights**입니다. Datadog는 자동으로 서버리스 애플리케이션에서 발생할 수 있는 문제를 강조 표시해줍니다. [높은 오류율(high errors)][7] 및 [높은 지속 기간(high duration)][8] 등의 문제는 Insights 열에 표시됩니다.



서버리스 샘플 애플리케이션에서는 Datadog에서 [콜드 스타트][9] 문제를 탐지할 가능성이 높습니다. 콜드 스타트는 서버리스 애플리케이션의 트래픽이 갑자기 증가했을 때 발생합니다. 함수에서 이전에 상대적으로 일관성 있는 수량의 요청을 받다가 갑자기 더 많은 요청을 받을 때, 또는 이번 사례와 같이 이전에 비활성화 상태였던 함수가 처음으로 호출되었을 때 발생할 수 있습니다.

## 조사할 오류 만들기

샘플 앱 스택의 `datadog-sample-entry-function`을 수정하여 의도적으로 오류를 만들 수 있습니다.

```python
  # Entry Lambda Function Code
  def handler(event, context):

    raise Exception('Throw an error.')
```

{{< img src="getting_started/serverless/aws_error.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}


변경 사항을 배포하고 샘플 앱을 다시 호출하여, Datadog에서 오류를 어떻게 조사할 수 있는지 살펴보세요.

{{< img src="getting_started/serverless/dd_serverless_view_error.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

`datadog-sample-entry-function`에 오류가 다섯 개 존재한다는 점에 유의하시기 바랍니다.

## 함수 상세 정보
함수를 클릭하면 호출 및 최근 배포와 관련된 상세 정보를 확인할 수 있습니다.

{{< img src="getting_started/serverless/details_error.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

위에서 볼 수 있듯, 상세 정보 화면에는 세 개의 그래프가 있습니다. 사용 가능한 메트릭을 표시하도록 설정할 수 있는데, 기본적으로는 [확장된 Lambda 메트릭][10](호출, 오류, 기간)을 표시하도록 되어 있습니다.

Datadog는 확장 람다 메트릭을 바로 사용할 수 있도록 생성합니다. 낮은 레이턴시, 몇 초 단위의 입도, 콜드 스타트와 커스텀 태그에 대한 상세 메타데이터가 지원됩니다. 또한 기본 [확장된 Lambda 메트릭 대시보드][11]도 볼 수 있습니다.


### 호출
**Invocations** 탭은 함수의 최근 호출 내역을 표시합니다.

각 호출은 트레이스와 연관됩니다. **Open Trace**를 클릭해 각 호출의 트레이스를 확인할 수 있습니다.

{{< img src="getting_started/serverless/dd_flame_graph.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

**Flame Graph** 탭은 정확하게 호출 시간 동안 어떤 일이 일어났는지를 표시합니다. 총 실행 시간 중 가장 높은 퍼센트 비율을 차지하는 서비스가 무엇인지 등을 알아볼 수 있습니다. Flame 그래프는 APIGateway에서 `datadog-sample-entry-function`, SNS, SQS를 거쳐 마지막으로 `datadog-sample-sqs-function`을 통해 전송되는 요청을 보여줍니다.

{{< img src="getting_started/serverless/trace_map.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

**Trace Map** 탭은 서비스 흐름과 서비스의 연관 관계를 시각화합니다.

상세한 트레이스 보기 화면의 아래쪽 절반은 스택 트레이스(stack trace)로, 오류를 발생시킨 코드 라인을 알려줍니다.

```
Traceback (most recent call last):
  File /opt/python/lib/python3.9/site-packages/datadog_lambda/wrapper.py, line 142, in __call__
    self.response = self.func(event, context, **kwargs)
File /var/task/index.py, line 17, in handler
    raise Exception('Throw an error.')
Exception: Throw an error.
```

아래로는 람다 요청과 응답 페이로드를 살펴볼 수 있습니다. Datadog는 모든 람다 호출을 대상으로 이벤트 페이로드를 수집합니다.

### 로그

서버리스 샘플 앱은 기본으로 로그가 활성화되어 있습니다. 각 함수의 로그를 **Logs** 탭에서 살펴볼 수 있습니다.

{{< img src="getting_started/serverless/dd_logs_view.png" alt="두 함수의 클로즈업 화면" style="width:80%;">}}

이러한 로그를 필터링하여 오류만 보거나 [Log Explorer][12]에서 볼 수 있습니다.


[1]: /ko/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ko/getting_started/site
[6]: https://app.datadoghq.com/functions?cloud=aws&text_search=datadog-serverless-sample-app
[7]: https://docs.datadoghq.com/ko/serverless/guide/insights/#high-errors
[8]: https://docs.datadoghq.com/ko/serverless/guide/insights/#high-duration
[9]: https://docs.datadoghq.com/ko/serverless/guide/insights/#cold-starts
[10]: https://docs.datadoghq.com/ko/serverless/enhanced_lambda_metrics
[11]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[12]: https://docs.datadoghq.com/ko/logs/explorer/