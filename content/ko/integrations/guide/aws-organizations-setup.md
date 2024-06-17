---
description: AWS Organization용 Datadog AWS 통합 설정 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: 가이드
  text: AWS 통합 트러블슈팅
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: 블로그
  text: AWS 모니터링의 주요 메트릭
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: 블로그
  text: Datadog 클라우드 보안 상태 관리 소개
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: 블로그
  text: Datadog 클라우드 워크로드 보안을 통해 실시간으로 인프라스트럭처 보호
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: 블로그
  text: Datadog 보안 모니터링 공지
kind: 가이드
title: AWS Organization용 다계정 설정 AWS 통합
---

## 개요

이 가이드에서는 AWS Organization 내에 여러 계정이 있을 경우 [AWS 통합][8]을 설정하는 방법을 설명합니다.

Datadog에서 제공하는 CloudFormation StackSet 템플릿을 사용하면 Organization 또는 OU(Organizational Unit) 내 AWS 계정 모두에 필요 IAM 역할 및 연결 정책을 생성하는 과정을 자동화할 수 있어 수동 설정을 할 필요가 없습니다. 설정한 후에는 통합에서 자동으로 AWS 메트릭과 이벤트를 수집하여 인프라스트럭처를 모니터링할 수 있습니다.

Datadog CloudFormation StackSet에서는 다음 단계를 실행합니다.

1. AWS Organization 또는 Organization Unit에 있는 모든 계정에 Datadog AWS CloudFormation Stack을 배포합니다.
2. 자동으로 필요 IAM 역할과 정책을 대상 계정에 생성합니다.
3. 계정의 AWS 리소스에서 AWS CloudWatch 메트릭과 이벤트 데이터 수집을 자동으로 시작합니다.
4. AWS 인프라스트럭처에서 메트릭 수집을 비활성화하는 옵션이 있습니다. 이 기능은 CCM(Cloud Cost Management)이나 CSM Misconfigurations(Cloud Security Management Misconfigurations) 사용 사례에 적용됩니다.
5. (선택 사항) CMS Misconfigurations를 구성해 AWS 계정의 리소스 구성 오류를 모니터링합니다.

**참고**: StackSet에서는 AWS 계정의 로그 포워딩을 설정하지 않습니다. 로그를 설정하려면 [Log Collection][2] 가이드에 안내된 단계를 따르세요.


## 사전 필수 조건

1. **관리 계정 액세스**: AWS 사용자가 AWS 관리 계정에 액세스할 수 있어야 합니다.
2. **계정 관리자가 AWS Organizations를 신뢰할 수 있는 액세스로 설정해야 함**: [AWS Organizations에 신뢰할 수 있는 액세스 활성화][3]를 참고해 StackSets와 Organizations 간 신뢰할 수 있는 액세스가 가능하도록 설정하세요. 그래야 서비스 관리형 권한을 사용해 스택을 생성하고 배포할 수 있습니다.

## 설정

시작하려면 Datadog의 [AWS 통합 구성 페이지][1]로 이동해 **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet**를 클릭하세요.

**Launch CloudFormation StackSet**를 클릭하세요. 그러면 AWS Console이 실행되고 새 CloudFormation StackSet이 로딩됩니다. AWS에서 `Service-managed permissions`을 기본 값 설정으로 두세요.

AWS 콘솔에서 아래 단계에 따라 StackSet을 생성하고 배포합니다.

1. **템플릿 선택**  
Datadog AWS 통합 구성 페이지에서 템플릿 URL을 복사해 StackSet의 `Specify Template` 파라미터에 사용합니다.


2. **StackSet 세부 사항 지정**
    - Datadog AWS 통합 구성 페이지에서 Datadog API 키를 선택해 StackSet `DatadogApiKey` 파라미터에 사용합니다.
    - Datadog AWS 통합 구성 페이지에서 Datadog App 키를 선택해 StackSet `DatadogAppKey` 파라미터에 사용합니다.

    - *선택 사항:*
       a. [Cloud Security Management Misconfigurations][5](CSM Misconfigurations)를 활성화하여 클라우드 환경, 호스트, 컨테이너에 구성 오류나 보안 위험이 없는지 스캔합니다.
       b. AWS 인프라스트럭처를 모니터링하고 싶지 않을 경우에 메트릭 수집을 비활성화합니다. 이 설정은 [Cloud Cost Management][6](CCM)나 [CSM Misconfigurations][5]의 특정 사용 사례의 경우에만 적합합니다.

3. **StackSet 옵션 구성**
**Execute configuration** 옵션을 `Inactive`로 유지해 StackSet에서 한 번에 하나를 실행할 수 있도록 합니다.

4. **배포 옵션 설정**
    - `Deployment targets`을 설정해 Datadog 통합을 Organization 전체에 배포하거나 하나 이상의 Organizational Units에 배포할 수 있습니다.


  - `Automatic deployment`를 활성화한 상태로 유지해 Organization이나 OU에 추가된 새 계정에도 Datadog AWS 통합이 자동 배포되도록 합니다.

 - **Specify regions** 아래 각 AWS 계정에 배포하고자 하는 단일 리전을 선택하세요.

 **참고**: StackSet에서 생성하는 전역 IAM 리소스는 리전 전용이 아닙니다. 이 단계에서 여러 리전을 선택하면 배포가 실패합니다.

  - **Deployment options** 아래 기본 설정을 순차(sequential)로 설정해 StackSets 운영이 한 번에 한 리전에 배포되도록 하세요. 

5. **검토**
    **Review** 페이지로 이동해 **Submit**을 클릭하세요. 그러면 Datadog StackSet 생성 절차가 시작됩니다. 통합할 계정 개수에 따라서 몇 분 정도 걸릴 수 있습니다. 다음 단계로 넘어가기 전에 StackSet에서 리소스를 모두 성공적으로 생성했는지 확인하세요.

    스택을 생성한 후, Datadog의 AWS 통합 구성 페이지로 돌아가 **Done**을 클릭하세요. 새롭게 통합된 AWS 계정에서 메트릭과 이벤트를 받는 데 몇 분 정도 걸릴 수 있습니다.


## 개별 AWS 서비스용 통합 지원

모니터링 중인 각 AWS 계정에서 사용할 수 있는 하위 통합의 전체 목록을 보려면 [통합 페이지][4]를 참고하세요. Datadog로 데이터를 전송 중인 하위 통합의 경우 통합에서 데이터를 수신할 때 자동으로 설치됩니다.

## 로그 전송

StackSet에서는 AWS 계정의 로그 포워딩을 설정하지 않습니다. 로그를 설정하려면 [Log Collection][2] 가이드에 안내된 단계를 따르세요.

## AWS 통합 언인스톨

Organization에 있는 모든 AWS 계정과 리전에서 AWS 통합을 언인스톨하려면 먼저 StackInstances 전체를 삭제한 후에 StackSet을 삭제하세요. 생성한 StackInstances와 StackSet을 삭제하려면 [스택 세트 삭제][7]에 안내된 단계에 따르세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /ko/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /ko/integrations/#cat-aws
[5]: /ko/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/ko/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/