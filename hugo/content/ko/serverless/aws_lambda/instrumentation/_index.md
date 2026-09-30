---
aliases:
- /ko/serverless/installation/installing_the_library/
- /ko/serverless/installation
- /ko/serverless/aws_lambda/installation
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: Serverless Monitoring 구성
- link: /integrations/amazon_lambda/
  tag: 설명서
  text: AWS Lambda 통합
title: AWS Lambda 애플리케이션 계측
---
## 개요 {#overview}

Datadog Lambda Extension을 사용하여 AWS Lambda 애플리케이션을 계측하여 트레이스, 향상된 메트릭 및 사용자 지정 메트릭을 수집합니다. Datadog Lambda Extension은 호스트 기반 인프라 및 애플리케이션에 대해 Datadog Agent 및 Datadog SDK를 사용하는 것과 유사합니다.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog이 계측된 AWS Lambda 애플리케이션으로부터 텔레메트리를 수신하는 방법을 보여주는 다이어그램입니다. Datadog Lambda Library로 계측된 귀하의 Lambda 애플리케이션은 로그, 트레이스, 향상된 메트릭 및 사용자 정의 메트릭을 Datadog Lambda Extension으로 전송하며, 이 데이터는 Datadog으로 푸시됩니다." style="width:100%;" >}}

## 빠른 시작 {#quick-start}

시작하하기 전 아직 계정이 없으시면 [Datadog 계정에 가입][1]하세요. 그런 다음 AWS Lambda 함수의 계측을 위해 [Fleet Automation의 인앱 설치 흐름][8]을 따르세요. 빠른 시작 구성을 완료하면 함수가 실시간 메트릭, 로그, 트레이스를 Datadog으로 전송할 수 있습니다.

여러 런타임 및 IaC(infrastructure-as-code) 도구를 활용한 배포 방법 지침이 포함된 샘플 애플리케이션은 [GitHub에서 제공][6]됩니다.

빠른 시작 프로세스는 귀하의 Lambda 함수를 즉시 구성합니다. Lambda 함수를 영구적으로 계측하려면 다음 섹션의 자세한 지침을 참조하세요.

## Datadog MCP 서버 사용 {#use-the-datadog-mcp-server}

[Datadog MCP 서버][9]를 사용하여 AI 지원으로 AWS Lambda 컨테이너 모니터링을 설정하세요. 연결한 후 다음과 같은 프롬프트를 시도해 보세요.

```shell
Help me monitor my AWS Lambda functions with Datadog
```

## 계측 지침 {#instrumentation-instructions}

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## 고급 구성 {#advanced-configurations}

계측을 완료하고 텔레메트리 수집을 설정한 후 [AWS Lambda용 Configure Serverless Monitoring][3]을 사용하여 다음 작업을 수행할 수 있습니다.

- 태그를 사용하여 메트릭, 트레이스 및 로그를 연결
- API 게이트웨이, AppSync 및 Step Functions와 같은 AWS 리소스로부터 텔레메트리를 수집
- 개별 Lambda 호출에 대한 요청 및 응답 페이로드 캡처
- Lambda 함수의 오류를 소스 코드에 연결
- 로그나 트레이스에서 민감한 정보를 필터링 또는 스크러빙

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /ko/serverless/aws_lambda/configuration/
[4]: /ko/serverless/aws_lambda/fips-compliance/
[5]: /ko/serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /ko/agentic_onboarding/setup