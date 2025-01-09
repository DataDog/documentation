---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: AWS Security Hub를 로그로 수집합니다.
doc_link: ''
draft: false
git_integration_title: amazon_security_hub
has_logo: true
integration_id: amazon-security-hub
integration_title: AWS Security Hub
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_security_hub
public_title: Datadog-AWS Security Hub 통합
short_description: AWS Security Hub 이벤트를 로그로 수집합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Security Hub는 AWS의 보안 상태에 대한 종합적인 보기를 제공하며 업계의 보안 표준과 모범 사례와 비교해 사용자 환경을 점검할 수 있도록 지원합니다. 

이 통합은 Datadog에서 모든 AWS Security Hub 로그를 확인할 수 있도록 해줍니다.

**참고**: 또한 AWS 환경에서 추가 이벤트 오케스트레이션을 위해 Datadog 보안 신호를 Security Hub에 전송할 수도 있습니다. [securityhub-eventbridge-example][1] 리포지토리의 지침을 따라 이를 설정하세요.

## 설정

Datadog는 Amazon EventBridge를 사용해 Security Hub 이벤트를 Datadog에 로그로 전송합니다.

1. [Amazon EventBridge][2]로 이동합니다.
2. 새로운 규칙 창 생성에서 **규칙 생성**을 클릭합니다.
3. 이름 및 설명 창에서 이름 필드에 규칙에 대한 이름을 입력합니다. 원하는 경우 설명 필드에 규칙에 대한 설명을 입력합니다.
4. 패턴 정의 창에서 **이벤트 패턴**을 선택한 다음 **서비스별 사전 정의된 패턴**을 선택하여 이벤트 패턴을 빌드합니다.
5. 서비스 공급자 목록에서 **AWS**를 선택합니다.
6. 서비스 이름 목록에서 **SecurityHub**를 선택합니다.
7. 이벤트 유형 목록에서 **모든 이벤트**를 선택합니다.
8. 이벤트 버스 선택 창에서 **AWS 기본 이벤트 버스**를 선택합니다.
9. 대상 선택 창의 대상 목록에서 **람다 함수**를 선택합니다.
10. [Datadog 포워더(Forwarder)][3]를 선택해 Datadog에 로그를 전송합니다.
11. **Create**를 클릭합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://github.com/DataDog/securityhub-eventbridge-example
[2]: https://aws.amazon.com/eventbridge/
[3]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/forwarder/
[4]: https://docs.datadoghq.com/ko/help/