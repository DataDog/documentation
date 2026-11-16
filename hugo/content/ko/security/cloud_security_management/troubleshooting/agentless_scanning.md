---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning
  tag: 문서
  text: Agentless Scanning 설정
- link: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
  tag: 문서
  text: Agentless Scanning 배포
title: Agentless Scanning 문제 해결
---
## 개요 {#overview}

Agentless Scanning에 문제가 발생하면 다음 문제 해결 지침을 따르세요. 추가 도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.

## 배포 후 결과 없음 {#no-results-after-deployment}

Agentless Scanning을 배포한 후 결과가 즉시 나타나지 않습니다. 첫 번째 결과는 일반적으로 배포 후 30분 이내에 나타납니다. IAM 구성 문제와 같은 드문 경우에는 최대 2시간이 걸릴 수 있습니다.

2시간 후에도 결과가 나타나지 않는 경우:

- 스캐너 인프라가 배포되었는지 확인합니다. 클라우드 공급자 콘솔에서 스캐너 인스턴스가 실행 중인지 확인하세요.
- Agentless Scanning을 설정하는 데 사용한 API 키에서 [Remote Configuration][3]이 활성화되어 있는지 확인하세요. 스캐너는 Remote Configuration을 통해 스캔 지침을 받습니다.
- 클라우드 통합이 올바르게 구성되었는지 확인하세요. [{{< ui >}}Cloud Security Setup{{< /ui >}}][4] 페이지에서 Agentless Scanning이 활성화된 상태로 클라우드 계정이 표시되는지 확인하세요.

## API 키에 대해 Remote Configuration 활성화 {#enable-remote-configuration-on-the-api-key}

구성을 수신할 수 있도록 Agent를 인증하고 권한을 부여하려면 관련 API 키에 대해 Remote Configuration을 활성화하세요. [`api_keys_write`][9] RBAC 권한이 있는 사용자만 API 키에 대해 Remote Configuration을 활성화할 수 있습니다.

**참고:** [`api_keys_write`][9] RBAC 권한은 있지만 Remote Configuration [조직][10] 수준 권한이 없는 경우 새 API 키 또는 기존 API 키에 대해 Remote Configuration을 활성화할 수 없습니다. 기존 API 키에 대해 Remote Configuration을 비활성화할 권한만 있습니다. 조직의 API 키를 보고 관리하려면 Datadog의 [API 키][11]를 참조하세요.

## GCP: 상태 버킷 생성 실패(storage.buckets.create 403) {#gcp-failed-to-create-state-bucket-storagebucketscreate-403}

GCP Cloud Shell 설정이 **"{{< ui >}}Setting up Terraform state storage{{< /ui >}}"**에서 실패하고 다음과 같은 오류가 발생하는 경우:

```
Failed to create state bucket: datadog-agentless-tfstate-<project>
HTTPError 403: ... does not have storage.buckets.create access to the Google Cloud project.
```

스크립트를 실행하는 ID에 스캐너 프로젝트에서 GCS 버킷을 생성하거나 관리할 권한이 없습니다.

**해결 방법(하나 선택):**

1. **스토리지 권한 부여**: 스크립트를 실행하는 사용자(또는 서비스 계정)에게 스캐너 프로젝트에 대한 스토리지 권한을 부여합니다. 예를 들어 해당 프로젝트에 **Storage Admin**(`roles/storage.admin`) 권한을 부여하거나 사용자 지정 역할(`storage.buckets.create`, `storage.buckets.get`, `storage.buckets.update` 포함)을 부여합니다.
2. **기존 버킷 재사용:** 이미 존재하는 버킷을 사용하고(필요한 경우 스토리지 권한이 있는 ID로 생성) 스크립트를 실행할 때 `TF_STATE_BUCKET`을 해당 버킷 이름으로 설정합니다. 스크립트는 Terraform 상태에 기존 버킷을 사용하며 새로 생성하려고 시도하지 않습니다.

## VPC 생성 제한으로 인해 배포 실패 {#deployment-fails-due-to-vpc-creation-restrictions}

조직에서 Terraform을 사용하고 VPC(Virtual Private Cloud) 생성을 제한하는 SCP(Service Control Policies)를 사용하는 경우 스캐너가 기본적으로 새 VPC를 생성하기 때문에 스캐너 배포에 실패합니다.

이 문제를 해결하려면 설정 중에 [**사용자 지정 VPC**][8] 옵션을 사용하여 새 VPC를 생성하는 대신 기존 VPC에 스캐너를 배포하세요.

## 스캐너 인스턴스가 취약한 호스트로 표시됨 {#scanner-instances-appear-as-vulnerable-hosts}

Agentless 스캐너 인스턴스는 스캔을 수행하기 위해 클라우드 계정 내에 배포된 일시적인 EC2 인스턴스(또는 동급 인스턴스)입니다. 표준 운영 체제 이미지(예: 최신 Ubuntu LTS)를 실행하므로 OS 패키지와 관련된 취약점 발견 결과에 나타날 수 있습니다.

이러한 결과는 기본 OS 이미지에서 식별된 취약점을 반영하며 환경의 잘못된 구성을 나타내지 않습니다.

원하는 경우 [{{< ui >}}Cloud Security Vulnerabilities Explorer{{< /ui >}}][2]에서 태그 기반 필터링을 사용하여 Datadog 관리 스캐너 인스턴스를 취약점 보기에서 제외할 수 있습니다.

## Datadog Agent가 있는 호스트가 스캔되지 않음 {#hosts-with-the-datadog-agent-are-not-scanned}

이는 예상된 동작입니다. Agentless Scanning은 [Cloud Security Vulnerabilities][6]가 활성화된 상태에서 Datadog Agent가 설치된 호스트는 제외합니다. 이는 중복 스캔을 방지합니다.

Datadog Agent가 설치되어 있지만 Vulnerabilities 기능이 **활성화되지 않은** 호스트도 Agentless Scanning으로 스캔됩니다.

## 예상치 못한 리전 간 스캔 비용 {#unexpected-cross-region-scanning-costs}

일부 배포 환경에서는 스캐너 및 리소스가 리전 전반에 분산되는 방식에 따라 리전 간 데이터 전송이 클라우드 제공업체의 네트워크 비용을 발생시킬 수 있습니다.

트래픽 지역성을 최적화하려면 호스트가 상당수 포함된 리전에 스캐너를 배포하는 것을 고려하세요. 일반적인 지침으로, 150개를 초과하는 호스트가 있는 각 리전에 스캐너를 배포하는 것이 좋습니다.

권장 배포 토폴로지에 대한 자세한 지침은 [Agentless Scanning 배포][7]를 참조하세요.

## GovCloud 및 FIPS에 사용할 수 없음 {#unavailable-for-govcloud-and-fips}

Agentless Scanning은 GovCloud에서 사용할 수 없으며 FIPS를 준수하지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /ko/remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods#enterprise-networking-considerations
[6]: /ko/security/cloud_security_management/vulnerabilities
[7]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[9]: /ko/account_management/rbac/permissions#api-and-application-keys
[10]: https://app.datadoghq.com/organization-settings/remote-config
[11]: https://app.datadoghq.com/organization-settings/api-keys