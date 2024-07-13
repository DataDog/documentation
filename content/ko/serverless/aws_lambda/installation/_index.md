---
aliases:
- /ko/serverless/installation/installing_the_library/
- /ko/serverless/installation
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: 서버리스 모니터링 설정하기
- link: /integrations/amazon_lambda/
  tag: 설명서
  text: AWS Lambda 통합
kind: 설명서
title: AWS Lambda용 서버리스 모니터링 설치
---

## 빠른 시작

Datadog을 처음 사용한다면 먼저 [Datadog 계정에 가입][1]하세요. 그리고 [AWS Lambda][2]에 대한 Datadog 에이전트 설치 지침서에 따라 Lambda 함수를 계측하여 Datadog을 빠르게 시작하세요. 이 단계를 완료하면 Lambda 함수가 실시간 메트릭, 로그 및 트레이스를 Datadog으로 전송하도록 설정됩니다.

{{< beta-callout-private url="https://docs.google.com/forms/d/e/1FAIpQLScw8XBxCyN_wjBVU2tWm-zX5oPIGF7BwUKcLSHY6MJsem259g/viewform?usp=sf_link" >}}
Datadog UI에서 바로 AWS Lambdas를 대량으로 계측하고 싶나요? 참여하려면 곧 출시될 원격 Lambda 계측 프라이빗 베타에 액세스를 요청하세요.
{{< /beta-callout-private >}}

빠른 시작 프로세스는 Lambda 함수를 즉시 설정합니다.  Lambda 함수 영구적으로 계측하려면 다음 섹션의 설치 설명서를 참조하세요.

## 설치 설명서

자세한 설치 설명서를 보려면 아래에서 Lambda 런타임을 선택하세요:

{{< partial name="serverless/getting-started-languages.html" >}}

## 고급 구성

설치를 마치고 텔레메트리 수집을 설정한 후 [고급 설정][3]을 사용하여 다음 작업을 수행할 수 있습니다:

- 태그를 활용한 메트릭, 트레이스, 로그 연결
- API 게이트웨이, AppSync, Step 함수와 같은 AWS 리소스로부터 텔레메트리 수집 
- 개별 Lambda 호출에 대한 요청 및 응답 페이로드 캡처
- 람다 함수의 오류를 소스 코드에 링크
- 로그나 트레이스에서 민감 정보를 필터링 또는 스크러빙

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /ko/serverless/configuration/