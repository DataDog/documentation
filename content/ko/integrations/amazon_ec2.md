---
aliases:
- /ko/integrations/awsec2/
- /ko/agent/faq/install-the-agent-with-aws-ssm
categories:
- cloud
- os & system
- aws
- log collection
dependencies: []
description: 리소스 사용량을 추적하고, 상태 점검을 모니터링하는 등 다양한 작업을 수행할 수 있습니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2/
draft: false
git_integration_title: amazon_ec2
has_logo: true
integration_id: amazon-ec2
integration_title: Amazon EC2
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  ec2_cpu_utilization: assets/monitors/ec2_cpu_utilization.json
  ec2_host_ok: assets/monitors/ec2_host_ok.json
  ec2_status_check: assets/monitors/ec2_status_check.json
name: amazon_ec2
public_title: Datadog-Amazon EC2 통합
short_description: 리소스 사용량을 추적하고, 상태 점검을 모니터링하는 등 다양한 작업을 수행할 수 있습니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon EC2(Amazon Elastic Compute Cloud)는 클라우드에서 조정 가능한 컴퓨팅 용량을 제공하는 웹 서비스입니다. 개발자를 위한 웹 규모 클라우드 컴퓨팅이 더 쉽게 가능하도록 설계되었습니다.

이 통합을 활성화해 Datadog에서 모든 EC2 메트릭과 함께 유지관리 일정과 같은 추가 이벤트를 활성화할 수 있습니다.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 설정

1. [AWS 통합 페이지][2]에서 `EC2`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.

2. Amazon EC2 메트릭을 수집하려면 [Datadog IAM 정책][3]에 다음 필수 권한을 추가하세요. 자세한 정보는 AWS 웹사이트의 [EC2 정책][4]을 참조하세요.

    | AWS 권한               | 설명                                                                                                                           |
    | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
    | `ec2:DescribeInstanceStatus` | ELB 통합에서 사용되며, 인스턴스의 상태를 확인합니다. EC2 통합에서 사용되며 모든 인스턴스의 상태를 설명합니다. |
    | `ec2:DescribeSecurityGroups` | SecurityGroup 이름과 커스텀 태그를 ec2 인스턴스에 추가합니다.                                                                    |
    | `ec2:DescribeInstances`      | ec2 인스턴스 및 ec2 클라우드와치 메트릭에 태그를 추가합니다.                                                                          |

3. [Datadog - Amazon EC2 통합][5]을 설치합니다.

**참고**: Datadog를 통해 EC2 인스턴스의 하위 집합을 모니터링하려면 `datadog:true`와 같은 AWS 태그를 EC2 인스턴스에 할당합니다. 그런 다음 [Datadog AWS 통합 페이지][2]의 **메트릭 수집** 탭의 **특정 리소스로 메트릭 수집 제한**에 해당 태그를 지정합니다. 

#### EC2 자동 음소거

Datadog는 선제적으로 클라우드와치(CloudWatch) API의 호스트 상태를 기준으로 EC2 인스턴스의 수동 종료와 AWS 오토스케일링으로 트리거된 인스턴스 종료를 조용히 모니터링할 수 있습니다. 자동 음소거된 EC2 인스턴스는 **자동 음소거된 호스트 표시**에 확인 표시하여 [다운타임 모니터링][6]에 목록화됩니다. 

EC2 통합은 자동 음소거를 실행하려면 반드시 설치해야 하니 참고하세요. 메트릭 수집이 태그 포함 호스트로 제한되면 태그와 일치하는 인스턴스만 자동 음소거됩니다.

예상되는 EC2 인스턴스 종료에 대한 모니터를 음소거하려면 [AWS 통합 페이지][2]에서 **EC2 음소거** 상자를 확인 표시합니다.

{{< img src="integrations/amazon_ec2/aws_ec2_automuting.png" alt="Amazon EC2 자동 음소거" >}}

### AWS SSM(Systems Manager)를 사용해 에이전트 설치

아래 단계에 따라 AWS Systems Manager를 사용해 EC2 인스턴스에서 Datadog 에이전트를 설치합니다. [클라우드 인스턴스에 Datadog 에이전트를 설치해야 하는 이유][7]를 참조해 Amazon EC2 인스턴스에 에이전트를 설치하면 좋은 이유를 알아보세요.

#### Amazon Systems Manager UI(권장)를 통한 에이전트 설치

1. EC2 인스턴스에서 [IAM 역할][8]을 설정하여 [AmazonSSMManagedInstanceCore 권한][9]을 활성화합니다.

2. [AWS SSM 설명서 탭][10]으로 이동합니다.
3. `datadog`를 검색합니다. 참고: AWS 관리 콘솔의 상위 탐색 모음에서 지역을 전환하여 해당 지역의 올바른 설명서를 찾을 수 있습니다.
4. 필요에 따라 Linux 또는 Windows 설명서 중 하나를 선택하세요.
- Linux: datadog-agent-installation-linux
- Windows: datadog-agent-installation-windows

5. 명령 파라미터를 채웁니다.
6. 에이전트를 설치할 대상 인스턴스를 선택합니다.
7. **실행**을 클릭합니다.
8. 확인 상태가 완료될 때까지 기다린 다음 Datadog에서 인프라스트럭처 목록을 점검합니다.

#### 대체 커스텀 에이전트 설치

##### 파라미터 스토어

[파라미터 스토어][11]에서 다음을 사용해 파라미터를 생성합니다.

- 이름: `dd-api-key-for-ssm`
- 설명: (선택 사항)
- 유형: `SecureString`
- KMS 핵심 소스: `My current account`
- KMS 키 ID: 선택한 기본값을 사용합니다.
- 값:  [Datadog API 키][12]

##### 문서

시스템 관리자에서 새로운 [문서][13]를 생성합니다.

- 이름: `dd-agent-install`
- 대상 유형: (선택 항목)
- 문서 유형: `Command document`
- 콘텐츠: `JSON`

Datadog 미국 사이트에 있는 경우 `us-east-1` 등 `runCommand` 아래서 `<AWS_REGION>`으로 업데이트된 파일 [dd-agent-install-us-site.json][14]을 사용합니다. Datadog 유럽 사이트에 있는 경우 대신 [dd-agent-install-eu-site.json][15]을 사용합니다.

##### 명령 실행

[명령 실행][16]에서 **명령 실행** 버튼을 클릭한 다음 아래 단계를 따릅니다.

- **명령 설명서**:
  - 검색 상자를 클릭한 다음 _소유자 -> 내 소유_를 선택합니다.
  - 문서 옆의 라디오 버튼을 클릭합니다.
  - 필요한 경우 **문서 버전**을 선택합니다.
- **대상**:
  - 대상 EC2 인스턴스를 선택합니다.
- **출력 옵션**(선택 항목):
  - **클라우드와치 출력** 확인란을 선택해 모든 문제를 기록합니다.
- **기타 섹션**(선택 항목)
  - 설정에 필요한 대로 다른 섹션을 수정합니다.

**실행** 버튼을 클릭하면 상태가 표시된 확인 페이지가 나타납니다. 완료될 때까지 기다린 다음 Datadog에서 [인프라 목록]을 확인하세요.

### 로그 수집

[Datadog 에이전트][18] 또는 또 다른 [로그 전달자][19]를 사용하여 Datadog에 로그를 전송합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_ec2" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

**참고**: 
   - `aws.ec2.instance_age`는 기본적으로 Datadog - EC2 통합에서 수집되지 않습니다. [Datadog 지원][21]에 문의하여 이 메트릭 수집을 활성화하세요.
   - `aws.ec2.host_ok`는 기본적으로 수집됩니다. Amazon EC2 통합 메트릭 수집을 비활성화한 경우에도 인프라스트럭처 목록에 예기치 않은 호스트가 나타날 수 있습니다. 원치 않는 호스트를 필터링하려면 `datadog:true` 등 AWS 태그를 해당 EC2 인스턴스에 할당합니다. 그런 다음 [Datadog AWS 통합 페이지][2]의 **메트릭 수집** 탭의 **메트릭 수집을 특정 리소스로 제한**에서 해당 태그를 지정합니다. 

### 서비스 검사
{{< get-service-checks-from-git "amazon_ec2" >}}


## 즉시 사용 가능한 모니터링

Amazon EC2 통합은 바로 사용 가능한 모니터링 기능을 제공해 성능을 모니터링하고 최적화할 수 있도록 해줍니다.

- Amazon EC2 개요 대시보드: 바로 사용 가능한 [Amazon EC2 개요 대시보드][23]를 사용해 EC2 인스턴스에 대한 종합적인 개요를 확보하세요.
- 권장 모니터: [권장 Amazon EC2 모니터][24]를 사용해 선제적으로 문제를 감지하고 시기 적절하게 도착하는 알림을 수신합니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원][21]에 문의하세요.

## 참고 자료

- [EC2 모니터링을 위한 핵심 메트릭][25]
- [EC2 메트릭 수집 방법][26]
- [Datadog를 사용해 EC2 인스턴스를 모니터링하는 방법][27]

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-ec2
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://docs.datadoghq.com/ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[9]: https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-permissions.html
[10]: https://docs.aws.amazon.com/systems-manager/latest/userguide/documents.html
[11]: https://console.aws.amazon.com/systems-manager/parameters
[12]: https://app.datadoghq.com/organization-settings/api-keys
[13]: https://console.aws.amazon.com/systems-manager/documents
[14]: https://docs.datadoghq.com/resources/json/dd-agent-install-us-site.json
[15]: https://docs.datadoghq.com/resources/json/dd-agent-install-eu-site.json
[16]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[17]: https://app.datadoghq.com/infrastructure
[18]: https://docs.datadoghq.com/ko/agent/logs/
[19]: https://docs.datadoghq.com/ko/integrations/rsyslog/
[20]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/amazon_ec2_metadata.csv
[21]: https://docs.datadoghq.com/ko/help/
[22]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2/service_checks.json
[23]: https://app.datadoghq.com/dash/integration/60/aws-ec2-overview
[24]: https://app.datadoghq.com/monitors/recommended
[25]: https://www.datadoghq.com/blog/ec2-monitoring
[26]: https://www.datadoghq.com/blog/collecting-ec2-metrics
[27]: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog