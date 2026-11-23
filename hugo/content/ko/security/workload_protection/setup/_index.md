---
aliases:
- /ko/security/workload_protection/setup/agent
- /ko/security/workload_protection/supported_linux_distributions
- /ko/security/threats/supported_linux_distributions
description: Datadog에서 Workload Protection을 활성화한 다음, 보호하려는 워크로드에 Datadog Agent를 배포하세요.
disable_toc: false
title: Workload Protection 설정
---
{{< partial name="security-platform/WP-billing-note.html" >}}

Workload Protection은 Datadog Agent를 통해 런타임 활동을 수집합니다. 설정하려면 Datadog에서 Workload Protection 제품을 활성화한 다음, 보호하려는 워크로드에 Agent를 배포해야 합니다.

Agent가 실행된 후에는 플레이그라운드 스크립트를 사용하여 안전하게 Workload Protection을 체험해 볼 수 있습니다. Agent가 탐지한 위협에 대응할 수 있게 하는 Enforcement 기능은 별도의 액세스 권한이 필요합니다.

Agent가 수집한 활동의 처리 방식에 대해서는 [Workload Protection 작동 방식][6]을 참조하세요.

## 요구 사항 {#requirements}

Workload Protection은 Datadog Agent를 사용하여 워크로드를 모니터링하고 위협 탐지 및 보안 상태 모니터링을 위한 보안 관련 이벤트를 수집합니다.

<div class="alert alert-info">Datadog은 Infrastructure Monitoring이 활성화되지 않은 조직이나 하위 조직에서 Workload Protection을 실행하는 것을 권장하지 않습니다.</div>

### Agent 옵션 {#agent-options}

Workload Protection은 환경 및 운영 체제에 따라 3가지 유형을 제공합니다.
- **Linux**에서는 **eBPF Agent**를 설치하세요. 최상의 성능과 기능 지원을 제공합니다.
- **AWS Fargate**에서는 Datadog Agent를 사이드카로 설치하고 **cws-instrumentation** 트레이서로 워크로드를 계측하세요. Fargate는 eBPF 액세스를 제공하지 않으므로 이 트레이서는 대신 ptrace를 사용합니다.
- **Windows**에서는 Workload Protection Agent가 Windows 드라이버를 설치하여 이벤트와 텔레메트리를 수집합니다.

### Linux 지원 {#linux-support}

Linux의 경우, 일부 클라우드 컴퓨팅 서비스는 eBPF 액세스를 차단하므로 Linux 커널 버전과 배포판 버전, 그리고 기반 클라우드 환경(해당되는 경우)을 확인해야 합니다.

#### 지원되는 Linux 배포판 {#supported-linux-distributions}

| Linux 배포판                                           | 지원되는 버전                    |
|---------------------------------------------------------------|---------------------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04, 24.04 이상 |
| Debian                                                        | 10 이상                         |
| Amazon Linux 2                                                | 커널 4.14 이상               |
| Amazon Linux 2023                                             | 모든 버전                          |
| SUSE Linux 엔터프라이즈 서버                                  | 12 및 15                             |
| Red Hat Enterprise Linux                                      | 7, 8 및 9                           |
| Oracle Linux                                                  | 7, 8 및 9                           |
| CentOS                                                        | 7                                     |
| Google Container Optimized OS (GKE 기본값)                | 93 이상                         |

**참고:**

- 사용자 지정 커널 빌드는 Agent가 올바르게 작동하는 데 필요한 중요한 후크 지점을 수정할 수 있습니다. 지원이 보장되지 않습니다.
- Workload Protection은 Linux 커널 버전 4.14.0 이상이 필요합니다.
- 이전 커널 버전을 사용하는 배포판의 경우, 필요한 eBPF 기능이 백포트되었다면 Workload Protection을 실행할 수 있습니다. 단, 일부 기능은 더 최신 커널 버전이 필요할 수 있으므로 성능이 저하된 모드로 작동합니다. 예를 들어, CentOS/RHEL 7은 백포트된 eBPF 기능이 포함된 커널 3.10을 사용하며 지원되지만, 네트워크 모니터링과 같은 일부 기능은 비활성화됩니다.
- Cilium 또는 Calico와 같은 사용자 지정 Kubernetes 네트워크 플러그인과의 호환성 문제는 [Workload Protection 문제 해결][2]을 참조하세요.

#### 지원되는 클라우드 환경 {#supported-cloud-environments}

| 클라우드 환경                      | 지원 여부 |
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (cws 계측 트레이서 사용)                    |
| Azure Virtual Machines (Azure VMs)      | ✅                    |
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    |

**참고:**

- 이러한 클라우드 환경에서 사용하는 기반 Linux 배포판 및 시스템 구성은 Workload Protection 지원 여부를 결정하는 주요 요소입니다.
- Linux 배포판 및 커널 버전을 선택할 수 있는 클라우드 환경의 경우, 위에 나열된 요구 사항을 충족하는 구성을 선택하세요.

### Windows 지원 {#windows-support}

Workload Protection의 Windows Agent는 Windows Server 2019 이상을 지원합니다.

## Datadog에서 Workload Protection 활성화 {#enable-workload-protection-in-datadog}

Workload Protection을 시작하려면 Datadog에서 Workload Protection 제품을 활성화해야 합니다. 활성화하려면 Datadog 계정에 로그인하고 [시작하기][1]를 클릭하세요. Datadog의 Agent 배포 단계를 따르거나, 자세한 내용을 확인하려면 이 페이지로 돌아올 수 있습니다.

<div class="alert alert-info">Workload Protection을 활성화하려면 Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">권한</a>이 필요합니다.</div>

## Datadog Agent 배포 {#deploy-the-datadog-agent}

### Linux {#linux}

다음 지침에 따라 Datadog Agent에서 Workload Protection의 eBPF Agent를 활성화하세요.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/kubernetes/" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="/security/workload_protection/setup/docker/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/security/workload_protection/setup/ecs_ec2/" src="integrations_logos/amazon_ecs.png" alt="ECS EC2" >}}
  {{< image-card href="/security/workload_protection/setup/linux_ebpf/" src="integrations_logos/linux.png" alt="Linux eBPF" >}}
{{< /card-grid >}}

### AWS Fargate {#aws-fargate}

다음 지침에 따라 AWS Fargate에서 Workload Protection의 cws 계측 트레이서를 설정하세요.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/fargate/" src="integrations_logos/amazon_fargate.png" alt="Amazon Fargate" >}}
{{< /card-grid >}}

### Windows {#windows}

다음 지침에 따라 Datadog Agent에서 Workload Protection의 Windows Agent를 활성화하세요.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/windows/" src="integrations_logos/windows.png" alt="Windows" >}}
{{< /card-grid >}}

## 다음 단계 {#next-steps}

설정 후 Workload Protection을 탐색하거나, 환경에 맞게 Agent를 구성하거나, Automated response에 대한 액세스를 요청할 수 있습니다.

### Workload Protection 살펴보기 {#explore-workload-protection}

Datadog은 Workload Protection을 살펴보고 그 기능을 학습할 수 있는 테스트 플레이그라운드를 제공합니다. 이 플레이그라운드는 테스트 환경에서 안전하게 실행할 수 있는 다양한 시나리오를 제공하며, Workload Protection이 탐지하고 이로부터 사용자를 보호할 수 있는 위협 및 실제 공격을 시뮬레이션합니다. 시작하려면 [플레이그라운드 리포지토리][3]를 참조하세요.

### Agent 구성 {#configure-the-agent}

[고급 Agent 구성 페이지][5]에서는 사용자의 환경과 요구 사항에 더 적합하도록 Agent를 구성하고 조정하는 방법을 설명합니다.

### Automated response 활성화 {#enable-automated-response}

<div class="alert alert-danger">Automated response를 활성화하려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀에 문의하세요.</a></div>

Automated response에 대한 액세스 권한이 부여되면 [Automated response][4] 페이지를 참조하세요.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /ko/security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /ko/security/workload_protection/respond_and_report/#automated-response
[5]: /ko/security/workload_protection/setup/advanced_configuration
[6]: /ko/security/workload_protection/#evaluating-activity