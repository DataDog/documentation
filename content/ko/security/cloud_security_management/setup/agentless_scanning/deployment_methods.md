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
title: Agentless Scanning 배포하기
---

이 가이드에서는 클라우드 환경에 맞게 Agentless Scanning에 적합한 배포 토폴로지를 선택하도록 도와줍니다. 설정 지침은 [Agentless Scanning 활성화][3]를 참고하세요.

## 개요

Datadog는 다음 가이드라인을 추천합니다.
- 여러 계정이 있는 환경에서는 전용 스캐너 계정을 사용하세요.
- 호스트가 150개 이상인 각 리전에 스캐너를 배포하세요.
- [Cloud Storage Scanning][1]을 사용하는 경우, 데이터 스토어(예: S3 버킷 또는 RDS 인스턴스)가 있는 각 리전에 스캐너를 배포하세요.

<div class="alert alert-info">스캐너는 수집된 패키지 목록과 호스트 메타데이터(호스트이름, EC2/VM/Compute Engine 인스턴스 식별자)만 Datadog으로 전송합니다. 스캐닝한 모든 데이터는 인프라에 머물러 있습니다.</div>

## 클라우드 계정 및 리전 구성

사용할 배포 토폴로지는 스캔할 클라우드 계정 개수(AWS 계정, Azure 구독, 또는 GCP 프로젝트)와 커버할 리전에 따라 결정됩니다.

- **Cloud 계정**: 단일 계정을 스캔해야 할 경우, 해당 계정에 하나 이상의 스캐너를 바로 배포하세요. 또는 전용 스캐너 계정을 사용하고 위임 역할을 사용해 다른 계정을 스캔할 수 있는 권한을 부여하세요. 이것을 **계정간 스캐닝**이라고 합니다.
- **리전**: 스캐너 하나로 어떤 리전에 있는 호스트이든 스캔할 수 있습니다(자체 리전 외 포함).  그러나 리전간 스캐닝에는 데이터 전송 비용이 듭니다. 추가 스캐너 배포 여부는 각 리전에 있는 호스트 개수에 따라 달라집니다.

이 탭에는 배포 토폴로지를 구성하는 방법에 관한 정보가 포함되어 있습니다. 먼저 스캔이 필요한 계정 개수 탭을 클릭하고 커버해야 하는 리전 개수에 관해 더 알아보세요.

{{< tabs >}}
{{% tab "단일 계정" %}}

스캔해야 하는 계정이 1개인 경우, 해당 계정에 1개 이상의 스캐너를 바로 배포하세요.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="여러 리전을 커버하는 1개 계정에 Agentless 스캐너가 적용된 Agentless Scanning 사례" width="40%" >}}

### 배포해야 하는 스캐너 개수 결정

스캐너 하나로 어떤 리전에 있는 호스트이든 스캔할 수 있습니다(자체 리전 외 포함).  리전간 스캐닝에는 데이터 전송 비용이 듭니다. 따라서 추가 스캐너 배포 여부는 각 리전에 있는 호스트 개수에 따라 달라집니다.

- **전체 리전간 호스트가 150개 이하일 경우**: 리전 1개에 스캐너 1개를 배포하는 것이 가장 비용 효율적인 설정입니다. 원격 호스트를 스캐닝하는데 드는 리전간 데이터 전송 비용이 추가 스캐너를 실행하는 고정 비용보다 적습니다.
- **특정 리전에 호스트가 150개 이상일 경우**: 해당 리전에 전용 스캐너를 배포하세요. 임계값을 고려하면 로컬 스캔으로 아낀 송신비가 스캐너를 실행하는 비용보다 더 큽니다.
- **임계값을 초과하는 여러 리전의 경우**: 호스트가 150개 이상인 각 리전에 스캐너를 1개씩 배포하세요. 임계값 아래의 리전은 가까운 리전간 스캐닝으로 스캔할 수 있습니다.

Datadog은 적합한 리전 스캐너로 스캔을 라우팅하여 리전간 비용을 최소화합니다.

#### 스캐너 용량 한도

각 스캐너는 클라우드 공급자 API 할당량에 따른 처리량 한도가 있습니다.

| 한도 | 값 |
|-------|-------|
| 리전별 계정당 최대 스캐너 수 | 4 (하드 캡, AWS와 같은 클라우드 공급자는 계정 및 리전당 동시 스냅샷 수를 100개로 제한함) |
| 스캔 간격 | 12시간마다 |

<div class="alert alert-danger">리전당 Autoscaling Group(ASG)의 희망 수량을 스캐너 4대 초과로 설정하지 마세요. 클라우드 공급업체의 동시 스냅샷 제한으로 인해 스캐너는를 추가하더라도 스냅샷을 생성할 수 없습니다.</div>

{{% /tab %}}
{{% tab "여러 계정" %}}

### 어떤 계정에 스캐너를 배포할 지 결정

Datadog에서는 **전용 스캐너 계정**을 사용해 스캐너를 배포하고 **계정간 위임 역할**을 사용해 스캐너에게 대상 계정에 액세스할 수 있는 권한을 부여할 것(스캐너 계정 포함)을 권장합니다.

AWS Organization의 경우, [CloudFormation StackSet][1]을 사용해 모든 멤버 계정에 위임 역할을 배포하여 계정간 스캐닝 온보딩을 자동화하세요.

다음 다이어그램은 중앙 계정(계정 4)에서의 계정간 스캔 방식을 보여줍니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="중앙 클라우드 계정에 배포된 Agentless 스캐너를 보여주는 Agentless 스캔 다이어그램" width="90%" >}}

**계정간 권한을 부여하고 싶지 않을 경우**, 각 계정에 스캐너를 배포하세요. 이 경우, 각 스캐너가 계정 내에서 계정간 스캔을 실행하기 때문에 비용이 더 높아집니다.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Agentless 스캐너가 각 Cloud 계정에 배포됨을 보여주는 Agentless Scanning 다이어그램" width="90%" >}}

### 배포해야 하는 스캐너 개수 결정

스캐너 하나로 어떤 리전에 있는 호스트이든 스캔할 수 있습니다(자체 리전 외 포함).  리전간 스캐닝에는 데이터 전송 비용이 듭니다. 따라서 추가 스캐너 배포 여부는 각 리전에 있는 호스트 개수에 따라 달라집니다.

- **전체 리전간 호스트가 150개 이하일 경우**: 리전 1개에 스캐너 1개를 배포하는 것이 가장 비용 효율적인 설정입니다. 원격 호스트를 스캐닝하는데 드는 리전간 데이터 전송 비용이 추가 스캐너를 실행하는 고정 비용보다 적습니다.
- **특정 리전에 호스트가 150개 이상일 경우**: 해당 리전에 전용 스캐너를 배포하세요. 임계값을 고려하면 로컬 스캔으로 아낀 송신비가 스캐너를 실행하는 비용보다 더 큽니다.
- **임계값을 초과하는 여러 리전의 경우**: 호스트가 150개 이상인 각 리전에 스캐너를 1개씩 배포하세요. 임계값 아래의 리전은 가까운 리전간 스캐닝으로 스캔할 수 있습니다.

Datadog은 적합한 리전 스캐너로 스캔을 라우팅하여 리전간 비용을 최소화합니다.

#### 스캐너 용량 한도

각 스캐너는 클라우드 공급자 API 할당량에 따른 처리량 한도가 있습니다.

| 한도 | 값 |
|-------|-------|
| 리전별 계정당 최대 스캐너 | 4 (하드 캡, AWS와 같은 클라우드 공급자는 계정 및 리전당 동시 스냅샷 수를 100개로 제한함)
 |
| 스캔 간격 | 12시간 마다 |

<div class="alert alert-danger">리전당 Autoscaling Group(ASG)의 희망 수량을 스캐너 4대 초과로 설정하지 마세요. 클라우드 공급업체의 동시 스냅샷 제한으로 인해 추가 스캐너는 스냅샷을 생성할 수 없습니다.</div>

[1]: /ko/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## 엔터프라이즈 네트워킹 고려 사항

기본적으로 스캐너는 배포 중에 새로운 VPC를 생성합니다. 만약 조직에서 Terraform을 사용 중이며 VPC 생성을 제한하는 서비스 제어 정책(SCP)이 설정되어 있다면, 설정 시 [사용자 지정 VPC(custom VPC)][2] 옵션을 선택하여 새 VPC를 만드는 대신 기존 VPC를 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /ko/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /ko/security/cloud_security_management/setup/agentless_scanning/enable#setup