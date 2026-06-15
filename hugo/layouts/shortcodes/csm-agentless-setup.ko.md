## 구성

환경에 에이전트 없는 스캐너를 배포하는 방법에는 두 가지가 있습니다. [Terraform][6]을 이용해 수동으로 배포하거나 [AWS 통합][7]에서 CloudFormation을 사용하는 방법이 있습니다.

**참고**: 에이전트 없는 스캐닝을 사용할 때 클라우드에 스캐너를 실행하는 추가 비용이 발생합니다. Datadog에서는 비용을 최적화하면서 12시간마다 스캔하고 싶을 경우 Terraform을 기본 템플릿으로 하여 에이전트 없는 스캐닝을 설정할 것을 권고합니다. 이 방법으로 리전간 네트워킹도 피할 수 있습니다.

스캐너 비용 예상치를 보려면 [Datadog 영업팀][7]이나 [고객 성공][8] 담당자에게 문의하세요.

### Terraform

호스트가 250개 이상인 큰 리전의 경우 리전별로 스캐너를 생성해 계정간 스캔을 이용하는 것이 계정별 스캐너를 구성하는 것보다 더 비용 효율적입니다.

**옵션 1(추천)**: 에이전트 없는 스캐너 전용 계정을 생성하고 스캔 가능 클라우드 리소스가 있는 각 리전에 스캐너를 배포하세요. 이 옵션에서는 Datadog가 중앙 클라우드 계정을 생성하고 이 계정에 스캐닝 인스터스를 추가합니다.

다음 다이어그램은 에이전트 없는 스캐너를 중앙 클라우드 계정에 배포했을 때의 작동 방식을 나타냅니다.

<img src="/images/security/agentless_scanning/agentless_vulnerability_advanced.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in a central Cloud account" width="90%">

**옵션 2**: 에이전트 없는 스캐너 전용 계정을 생성하지 _않고_ 스캔 가능 클라우드 리소스가 있는 각 리전에 스캐너를 배포합니다. 이 옵션을 선택하면 내 환경에 중앙 클라우드 계정이 이미 존재하며, 이 계정에 스캐닝 인스턴스를 추가할 수 있습니다.

#### 설치

구체적인 설정 지침을 보려면 [Terraform으로 에이전트 없는 스캐너 활성화][5]를 참고하세요.

### AWS 통합

Datadog의 AWS 통합 내에서 CloudFormation 템플릿을 선택하고 조직의 [원격 구성][4]을 활성화하면 Datadog에서 필요한 IAM 권한으로 템플릿을 업데이트하고 AWS 계정마다 스캐너 하나를 배포해 리전 전체를 모두 스캐닝합니다. 그 후 Datadog에서 EBS 볼륨을 스캔해 [SBOM(Software Bill of Materials)][2]을 생성하고 SBOM을 Datadog [취약성 관리][3]로 재전송합니다. 그러면 사용자는 이 취약성 관리 페이지에서 취약성을 조사하고 해결할 수 있습니다.

계정 별로 호스트가 250개 미만일 경우 수동 설정(Terraform) 옵션보다 이 방법이 비용 효율적이기 때문에 이 방법을 추천합니다.

다음 다이어그램은 에이전트 없는 스캐너를 각 Cloud 계정 내에 배포했을 때의 작동 방식을 나타냅니다.

<img src="/images/security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="Diagram of Agentless Scanning showing the Agentless scanner is deployed in each Cloud account" width="90%">

**참고**: 스캐닝된 실제 데이터는 내 인프라스트럭처에 남고 스캐닝 결과만 Datadog로 보고됩니다.

## 에이전트 없는 스캐닝 비활성화
CloudFormation 템플릿을 통해 에이전트 없는 스캐닝을 비활성화하려면 역할이나 EC2 스캐너 인스턴스를 제거하세요.

## 리소스 제외

AWS에서 볼륨이나 Lambda 리소스를 제외하려면 `DatadogAgentlessScanner:false` 태그를 설정하세요.



[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md
[6]: /security/cloud_security_management/setup/agentless_scanning/#terraform
[7]: /security/cloud_security_management/setup/agentless_scanning/#aws-integration
[7]: mailto:sales@datadoghq.com
[8]: mailto:success@datadoghq.com

