---
aliases:
- /ko/serverless/troubleshooting/connect_invoking_resources/
title: Lambda 함수를 호출하는 리소스에 대한 심층적인 가시성
---

{{< img src="serverless/serverless-view.png" alt="서버리스 보기" >}}

기본적으로 서버리스 뷰는 서버리스 리소스를 서비스별로 그룹화하여 애플리케이션의 각 부분이 어떻게 실행되는지 시각화할 수 있도록 도와줍니다. 각 서비스 별로 해당 서비스에 속한 함수와 이를 호출한 리소스 (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis)가 표시됩니다.

서비스별 그룹화가 기본으로 설정되어 있으나 AWS CloudFormation 스택 이름, 설정한 다른 태그 (예: 팀, 프로젝트, 환경)를 기준으로 리소스를 그룹화할 수 있습니다.

## 구성

 Lambda 함수를 처음으로 계측하려면 [서버리스 설치 설명서][1]를 따르세요.

다음 조건이 모두 충족되면 관리형 리소스가 자동으로 AWS Lambda 함수에 연결됩니다:
- 함수는 Node.js 또는 Python Lambda 런타임으로 작성됩니다.
- [Datadog의 X-Ray 통합이 포함된 APM][2]이 함수에 구성되고, [AWS X-Ray 세그먼트를 강화하도록 설정된 Datadog의 Lambda 라이브러리][3], **또는** [Datadog 추적 라이브러리가 포함된 APM][2](`dd-trace`)이 함수에 구성됩니다.
- 함수를 호출하는 관리 리소스는 다음 중 하나입니다: API Gateway, SQS, SNS, EventBridge, Kinesis, DynamoDB, S3.
- 사용자의 함수는 Datadog의  Lambda 라이브러리 최신 버전 (Node의 경우 `v3.46.0` 이상, Python의 경우 `v28` 이상)으로 계측됩니다.

[1]: /ko/serverless/installation
[2]: /ko/serverless/distributed_tracing#choose-your-tracing-library
[3]: /ko/integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries