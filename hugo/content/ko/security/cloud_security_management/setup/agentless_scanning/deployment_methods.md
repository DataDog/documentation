---
aliases:
- /ko/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: 설명서
  text: Cloud Security Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: 설명서
  text: Agentless Scanning 활성화
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: 설명서
  text: Agentless Scanning 업데이트
title: Agentless Scanning 배포
---
이 가이드는 클라우드 환경을 기반으로 Agentless Scanning에 적합한 배포 토폴로지를 선택하는 데 도움을 줍니다. 설정 지침은 [Agentless Scanning 활성화][3]를 참조하십시오.

## 개요 {#overview}

Datadog은 다음 지침을 권장합니다.
- 다중 계정 환경에는 전용 스캐너 계정을 사용하십시오.
- 150개 이상의 호스트가 포함된 각 리전에 스캐너를 배포하십시오.
- [클라우드 스토리지 스캐닝][1]을 사용하는 경우, 데이터 저장소(예: S3 버킷)가 포함된 각 리전에 스캐너를 배포하십시오.

<div class="alert alert-info">스캐너는 수집된 패키지 목록과 호스트 메타데이터(호스트 이름, EC2/VM/Compute Engine 인스턴스 식별자)만 Datadog으로 전송합니다. 모든 스캔 데이터는 귀하의 인프라 내에 유지됩니다.</div>

## 클라우드 계정 및 리전 구성 {#cloud-account-and-region-configuration}

사용하는 배포 토폴로지는 스캔해야 하는 클라우드 계정(AWS 계정, Azure 구독 또는 GCP 프로젝트)의 수와 해당 계정이 포함하는 리전에 따라 달라집니다.

- **클라우드 계정**: 단일 계정만 스캔하면 되는 경우, 해당 계정에 직접 하나 이상의 스캐너를 배포하십시오. 그렇지 않은 경우, 전용 스캐너 계정을 사용하고 위임된 역할을 사용하여 다른 계정을 스캔할 수 있는 액세스 권한을 부여하십시오. 이를 **계정 간 스캐닝**이라고 합니다.
- **리전**: 단일 스캐너는 자체 리전 외의 리전을 포함하여 모든 리전의 호스트를 스캔할 수 있습니다. 그러나 리전 간 스캐닝은 데이터 전송 비용을 발생시킵니다. 추가 스캐너를 배포할지 여부는 각 리전에 있는 호스트 수에 따라 달라집니다.

이 탭에는 배포 토폴로지를 구성하는 방법에 대한 정보가 포함되어 있습니다. 스캔해야 할 계정 수를 설명하는 탭을 선택한 다음, 커버해야 할 리전 수에 따라 자세한 내용을 확인하십시오.

{{< tabs >}}
{{% tab "단일 계정" %}}

단일 계정만 스캔하면 되는 경우 해당 계정에 직접 하나 이상의 스캐너를 배포하십시오.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="여러 리전을 커버하는 하나의 계정에 적용된 Agentless 스캐너를 보여주는 Agentless Scanning 다이어그램" width="40%" >}}

### 배포할 스캐너 수 결정 {#decide-how-many-scanners-to-deploy}

단일 스캐너는 자체 리전 외의 리전을 포함하여 모든 리전의 호스트를 스캔할 수 있습니다. 리전 간 스캔은 데이터 전송 비용을 발생시키므로 추가 스캐너를 어디에 배포할지 여부는 각 리전에 있는 호스트 수에 따라 달라집니다.

- **모든 리전을 통틀어 총 약 150개 미만의 호스트**: 한 리전에 단일 스캐너를 두는 것이 가장 비용 효율적인 설정입니다. 원격 호스트를 스캔할 때 발생하는 리전 간 데이터 전송 비용은 추가 스캐너를 실행하는 데 드는 고정 비용보다 낮습니다.
- **특정 리전에 ~150개를 초과하는 호스트가 있는 경우**: 해당 리전에 전용 스캐너를 배포하십시오. 이 임계값에서는 로컬에서 스캔하여 절감되는 송신 비용이 스캐너 실행 비용을 능가합니다.
- **임계값을 초과하는 여러 리전**: ~150개 호스트를 초과하는 각 리전에 스캐너를 배포하십시오. 임계값 미만의 리전은 가장 가까운 스캐너에서 리전 간으로 스캔할 수 있습니다.

Datadog은 리전 간 비용을 최소화하기 위해 스캔을 적절한 리전의 스캐너로 자동 라우팅합니다.

#### 스캐너 용량 제한 {#scanner-capacity-limits}

각 스캐너에는 클라우드 제공업체의 API 할당량에 의해 제한되는 처리량 한도가 있습니다.

| 제한 | 값 |
|-------|-------|
| 계정당 및 리전당 최대 스캐너 수 | 4 (하드 캡; AWS와 같은 클라우드 제공업체는 계정당 및 리전당 동시 스냅샷을 100개로 제한함) |
| 스캔 간격 | 12시간마다 |

<div class="alert alert-danger">리전당 스캐너 수가 4개 이상이 되도록 오토스케일링 그룹(ASG)의 희망 용량을 증가시키지 마십시오. 추가 스캐너는 클라우드 제공업체의 동시 스냅샷 제한으로 인해 스냅샷을 생성할 수 없습니다.</div>

{{% /tab %}}
{{% tab "다중 계정" %}}

### 스캐너를 배포할 계정을 결정하십시오 {#decide-which-accounts-to-deploy-scanners-in}

Datadog은 **전용 스캐너 계정**에 스캐너를 배포하고, **계정 간 위임 역할**을 사용하여 스캐너에 대상 계정(스캐너 계정 포함)에 대한 액세스 권한을 부여할 것을 권장합니다.

AWS Organizations의 경우 [CloudFormation StackSet][1]을 사용하여 모든 멤버 계정에 위임 역할을 배포하고 계정 간 스캔을 위한 온보딩을 자동화하십시오.

다음 다이어그램은 중앙 계정(계정 4)에서 계정 간 스캔이 어떻게 수행되는지를 보여줍니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="중앙 클라우드 계정에 배포된 Agentless 스캐너를 보여주는 Agentless 스캔 다이어그램" width="90%" >}}

**계정 간 권한을 부여하지 않으려면** 대신 각 계정에 스캐너를 배포하십시오. 이 경우 각 스캐너가 해당 계정 내에서 리전 간 스캔을 수행하므로 비용이 더 많이 발생합니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="각 클라우드 계정에 배포된 Agentless 스캐너를 보여주는 Agentless 스캔 다이어그램" width="90%" >}}

### 배포할 스캐너 수 결정 {#decide-how-many-scanners-to-deploy-1}

단일 스캐너는 자체 리전 외의 리전을 포함하여 모든 리전의 호스트를 스캔할 수 있습니다. 리전 간 스캔은 데이터 전송 비용을 발생시키므로 추가 스캐너를 어디에 배포할지 여부는 각 리전에 있는 호스트 수에 따라 달라집니다.

- **모든 리전을 통틀어 총 약 150개 미만의 호스트**: 한 리전에 단일 스캐너를 두는 것이 가장 비용 효율적인 설정입니다. 원격 호스트를 스캔하는 데 발생하는 리전 간 데이터 전송 비용이 추가 스캐너를 실행하는 고정 비용보다 낮습니다.
- **특정 리전에 ~150개를 초과하는 호스트가 있는 경우**: 해당 리전에 전용 스캐너를 배포하십시오. 이 임계값에서는 로컬에서 스캔하여 발생하는 송신 비용 절감액이 스캐너 실행 비용보다 큽니다.
- **임계값을 초과하는 여러 리전**: ~150개 호스트를 초과하는 각 리전에 스캐너를 배포하십시오. 임계값 미만의 리전은 가장 가까운 스캐너에서 리전 간 스캔을 수행할 수 있습니다.

Datadog은 리전 간 비용을 최소화하기 위해 적절한 리전 스캐너로 스캔을 자동으로 라우팅합니다.

#### 스캐너 용량 제한 {#scanner-capacity-limits-1}

각 스캐너에는 클라우드 제공업체 API 할당량에 의해 결정되는 처리량 제한이 있습니다.

| 제한 | 값 |
|-------|-------|
| 계정당 및 리전당 최대 스캐너 수 | 4 (하드 캡; AWS와 같은 클라우드 제공업체는 계정당 및 리전당 동시 스냅샷을 100개로 제한함) |
| 스캔 간격 | 12시간마다 |

<div class="alert alert-danger">리전당 스캐너 수가 4개 이상이 되도록 오토스케일링 그룹(ASG)의 희망 용량을 증가시키지 마십시오. 추가 스캐너는 클라우드 제공업체의 동시 스냅샷 제한으로 인해 스냅샷을 생성할 수 없습니다.</div>

[1]: /ko/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## 엔터프라이즈 네트워킹 고려 사항 {#enterprise-networking-considerations}

기본적으로 스캐너는 배포 중에 새 VPC를 생성합니다. 조직에서 Terraform을 사용 중이고 VPC 생성을 제한하는 서비스 제어 정책(SCP)이 있는 경우, 설정 중에 [{{< ui >}}custom VPC{{< /ui >}}][2] 옵션을 사용하여 새 VPC를 생성하는 대신 기존 VPC를 사용하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /ko/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /ko/security/cloud_security_management/setup/agentless_scanning/enable#setup