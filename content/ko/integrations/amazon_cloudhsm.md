---
categories:
- cloud
- aws
- 로그 수집
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_cloudhsm.md
description: Datadog 조직에서 HSM 감사 로그 모으기
has_logo: true
integration_id: amazon-cloudhsm
integration_title: AWS CloudHSM
is_public: true
custom_kind: integration
name: amazon_cloudhsm
public_title: Datadog-AWS Cloudhsm 통합
short_description: Datadog 조직에서 HSM 감사 로그 모으기
---

## 개요

내 계정의 HSM이 AWS CloudHSM 명령줄 도구나 소프트웨어 라이브러리를 통해 명령을 수신할 경우, 명령 실행을 감사 로그 형태로 기록합니다. HSM 감사 로그에는 HSM 생성 및 삭제, HSM 로그인 및 로그아웃, 사용자 및 키 관리를 포함한 클라이언트 실행 관리 명령 전체가 포함되어 있습니다. HSM 상태 변경에 영향을 준 작업과 관련해 신뢰할 수 있는 전체 기록을 볼 수 있습니다.

Datadog는 Lambda 함수를 통해 AWS CloudHSM와 통합되어 있습니다. Lambda 함수가 CloudHSM 로그를 Dataog의 로그 관리 솔루션으로 보냅니다.

## 설정

### 로그 수집

#### 로그 사용

CloudHSM에는 기본값으로 감사 로그가 활성화되어 있습니다.

#### 로그를 Datadog로 보내기

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][1]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. Trigger Configuration에서 **CloudWatch Logs** 트리거를 선택하세요. 
4. 내 CloudHSM 로그를 포함하고 있는 CloudWatch 로그 그룹을 선택하세요.
5. 필터 이름을 입력하세요.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[Log Explorer][2]로 이동해 로그를 탐색하세요.

AWS Services 로그를 수집하는 방법에 관한 자세한 정보는 [Datadog Lambda Function으로 AWS Services 로그 보내기][3]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][4]에 문의하세요.

[1]: /ko/logs/guide/forwarder/
[2]: https://app.datadoghq.com/logs
[3]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[4]: /ko/help/