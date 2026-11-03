---
description: AWS Organization용 Datadog AWS 통합 설정 단계
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: 아키텍처 센터
  text: Datadog과 100개 이상의 AWS 계정을 통합하는 가이드
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: 가이드
  text: AWS 통합 문제 해결하기
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: 블로그
  text: AWS 모니터링을 위한 핵심 메트릭
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: 블로그
  text: Datadog Cloud Security Posture Management 소개
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: 블로그
  text: Datadog Cloud Workload Security를 통해 실시간으로 인프라 보호하기
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: 블로그
  text: Datadog Security 모니터링 공지하기
title: AWS Organization용 다계정 설정 AWS 통합
---
## 개요 {#overview}

이 가이드에서는 AWS Organization 내에 여러 계정이 있을 경우 [AWS 통합][8]을 설정하는 방법을 설명합니다.

Datadog이 제공하는 CloudFormation StackSet 템플릿은 Organization 또는 Organizational Unit(OU)에 속한 모든 AWS 계정에 필요한 IAM 역할과 관련 정책을 자동으로 생성하고 Datadog 내에서 계정을 구성하므로 수동 설정이 필요하지 않습니다. 설정이 완료되면 통합이 자동으로 AWS 메트릭과 이벤트를 수집하여 인프라 모니터링을 시작할 수 있습니다.

Datadog CloudFormation StackSet에서는 다음 단계를 실행합니다.

1. AWS Organization 또는 Organizational Unit에 있는 모든 계정에 Datadog AWS CloudFormation Stack을 배포합니다.
2. 자동으로 필요한 IAM 역할과 정책을 대상 계정에 생성합니다.
3. 계정의 AWS 리소스에서 AWS CloudWatch 메트릭과 이벤트 데이터 수집을 자동으로 시작합니다.
4. 필요시 AWS 인프라에 대한 메트릭 수집을 비활성화합니다. 이는 Cloud Cost Management(CCM) 또는 Cloud Security Misconfigurations와 관련된 특정 사용 사례에 유용합니다.
5. 필요시 Cloud Security Misconfigurations를 구성해 AWS 계정의 리소스 구성 오류를 모니터링합니다.

**참고**: StackSet은 AWS 계정에서 로그 전달을 설정하지 않습니다. 로그를 설정하려면 [로그 수집][2] 가이드의 단계를 따르세요.


## 전제 조건 {#prerequisites}

1. **관리 계정 액세스**: AWS 사용자가 AWS 관리 계정에 액세스할 수 있어야 합니다.
2. **계정 관리자가 AWS Organizations를 신뢰할 수 있는 액세스로 설정해야 함**: [AWS Organizations에 신뢰할 수 있는 액세스 활성화][3]를 참고해 StackSets와 Organizations 간 신뢰할 수 있는 액세스가 가능하도록 설정하세요. 그래야 서비스 관리형 권한을 사용해 스택을 생성하고 배포할 수 있습니다.

**참고**: AWS Organizations 다중 계정 설정은 기존에 개별적으로 구성된 AWS 계정 통합에 대한 배포를 지원하지 않습니다. StackSet이 이미 Datadog과 개별적으로 통합된 계정을 대상으로 하는 경우, 기존 계정 통합은 삭제됩니다.

## 설정 {#setup}

시작하려면 Datadog의 [AWS 통합 구성 페이지][1]로 이동해 **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet**을 클릭하세요.

**Launch CloudFormation StackSet**을 클릭하세요. 이렇게 하면 AWS 콘솔이 열리고 새로운 CloudFormation StackSet이 로드됩니다. AWS에서 기본 선택 사항인 `Service-managed permissions`를 유지하세요.  
  
AWS 콘솔에서 아래 단계에 따라 StackSet을 생성하고 배포합니다.

1. **템플릿 선택**  
Datadog AWS 통합 구성 페이지에서 템플릿 URL을 복사해 StackSet의 `Specify Template` 파라미터에 사용합니다.


2. **StackSet 세부 사항 지정**
    - Datadog AWS 통합 구성 페이지에서 Datadog API 키를 선택해 StackSet의 `DatadogApiKey` 파라미터에 사용하세요.
    - Datadog AWS 통합 구성 페이지에서 Datadog APP 키를 선택해 StackSet의 `DatadogAppKey` 파라미터에 사용하세요.

    - *필요시:*  
        1. [Cloud Security Misconfigurations][5]를 활성화하여 클라우드 환경, 호스트 및 컨테이너의 구성 오류 및 보안 위험을 스캔합니다.  
        1. AWS 인프라를 모니터링하지 않으려면 메트릭 수집을 비활성화합니다. 이는 [Cloud Cost Management][6](CCM) 또는 [Cloud Security Misconfigurations][5]와 관련된 특정 사용 사례에만 권장됩니다.

3. **StackSet 옵션 구성**  
**Execution configuration** 옵션을 `Inactive`로 유지하여 StackSet이 한 번에 하나의 작업만 수행하도록 하세요.

4. **배포 옵션 설정**
    - `Deployment targets`를 설정해 Datadog 통합을 Organization 전체에 배포하거나 하나 이상의 Organizational Units에 배포할 수 있습니다.


    - Organization 또는 OU에 추가되는 새 계정에 Datadog AWS 통합을 자동으로 배포하려면 `Automatic deployment`를 활성화된 상태로 유지하세요.

    - **Specify regions**에서 각 AWS 계정에 통합을 배포할 단일 리전을 선택하세요.   
      **참고**: StackSet은 특정 리전에 국한되지 않는 전역 IAM 리소스를 생성합니다. 이 단계에서 여러 리전을 선택하면 배포가 실패합니다. 

    - **Deployment options**의 기본 설정을 순차적으로 설정하여 StackSet 작업이 한 번에 하나의 리전에 배포되도록 하세요.

5. **검토**  
    **Review** 페이지로 이동하여 **Submit**을 클릭하세요. 그러면 Datadog StackSet 생성 프로세스가 시작됩니다. 통합해야 할 계정 수에 따라 몇 분 정도 걸릴 수 있습니다. 진행하기 전에 StackSet이 모든 리소스를 성공적으로 생성했는지 확인하세요.

    스택이 생성된 후 Datadog의 AWS 통합 구성 페이지로 돌아가 **Done**을 클릭하세요. 새로 통합된 AWS 계정에서 메트릭 및 이벤트가 보고되기까지 몇 분이 걸릴 수 있습니다.

6. *(선택 사항)* **AWS 관리 계정 통합**

   [서비스 관리형 권한][10]에 대한 AWS의 제한으로 인해 이 StackSet 설정 후에는 AWS 관리 계정이 자동으로 배포되지 않습니다.
   [Datadog-Amazon Cloudformation][9]의 단계에 따라 AWS 관리 계정을 통합합니다.


## 개별 AWS 서비스의 통합 활성화 {#enable-integrations-for-individual-aws-services}

각 모니터링 대상 AWS 계정에서 활성화할 수 있는 하위 통합의 전체 목록은 [Integrations 페이지][4]를 참조하세요. Datadog으로 데이터를 보내는 모든 하위 통합은 통합으로부터 데이터가 수신되면 자동으로 설치됩니다.

## 로그 전송 {#send-logs}

StackSet은 AWS 계정에서 로그 전달을 설정하지 않습니다. 로그를 설정하려면 [로그 수집][2] 가이드의 단계를 따르세요.

## AWS 통합 제거 {#uninstall-aws-integration}

Organization의 모든 AWS 계정 및 리전에서 AWS 통합을 제거하려면 먼저 모든 StackInstances를 삭제한 다음 StackSet을 삭제하세요. [스택 세트 삭제][7]에 설명된 단계에 따라 생성된 StackInstances와 StackSet을 삭제하세요. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /ko/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /ko/integrations/#cat-aws
[5]: /ko/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/ko/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/ko/integrations/guide/amazon_cloudformation/
[10]: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_DeploymentTargets.html