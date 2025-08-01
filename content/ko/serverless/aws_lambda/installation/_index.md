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
title: AWS Lambda용 서버리스 모니터링 설치
---

## 빠른 시작

Datadog을 처음 사용한다면 먼저 [Datadog 계정에 가입][1]하세요. 그리고 [AWS Lambda][2]에 대한 Datadog 에이전트 설치 지침서에 따라 Lambda 함수를 계측하여 Datadog을 빠르게 시작하세요. 이 단계를 완료하면 Lambda 함수가 실시간 메트릭, 로그 및 트레이스를 Datadog으로 전송하도록 설정됩니다.

<div class="alert alert-info"><a href="https://github.com/DataDog/serverless-sample-app">GitHub에서 제공하는</a> 샘플 애플리케이션에는 여러 런타임과 인프라 코드 도구를 사용해 배포하는 방법이 포함되어 있습니다.</div>

빠른 시작 프로세스는 Lambda 함수를 즉시 설정합니다.  Lambda 함수 영구적으로 계측하려면 다음 섹션의 설치 설명서를 참조하세요.

## 설치 설명서

Node.js 및 Python 런타임의 경우 [원격 계측][5]을 사용하여 AWS Lambda 함수에 계측을 추가하고 안전하게 계측된 상태를 유지할 수 있습니다. 자세한 내용은 [AWS Lambda 원격 계측][5]을 참고하세요.

다른 Lambda 런타임(또는 원격 계측 없이 Node.js 또는 Python 함수를 계측하는 경우)의 경우 자세한 설치 지침을 참고하세요.

{{< partial name="serverless/getting-started-languages.html" >}}

## FIPS 준수 지원

Datadog은 FIPS 준수 Lambda 확장 계층과 런타임별 구성을 통해 AWS Lambda 함수에 대한 FIPS 준수 모니터링을 제공합니다. FIPS 준수 구성 요소는 FIPS 인증 암호화를 구현하고 모든 Datadog 사이트에서 작동하지만, 엔드 투 엔드 FIPS 준수를 위해서는 US1-FED 사이트를 사용해야 합니다. Lambda 함수를 모니터링하는 동안 FIPS 준수를 유지해야 한다면 [AWS Lambda FIPS 준수][4] 페이지에서 자세한 내용을 확인하세요.

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
[4]: /ko/serverless/aws_lambda/fips-compliance/
[5]: /ko/serverless/aws_lambda/remote_instrumentation