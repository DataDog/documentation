---
aliases:
- /ko/security/agentless_scanning
- /ko/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: 설명서
  text: Cloud Security Vulnerabilities 에 대해 자세히 알아보십시오.
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: 설명서
  text: 클라우드 스토리지를 위한 Sensitive Data Scanner 설정
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: 설명서
  text: Agentless Scanning 업데이트
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: 설명서
  text: Agentless Scanning 문제 해결
title: Cloud Security Agentless Scanning
---
## 개요 {#overview}

Agentless Scanning은 Datadog Agent를 설치할 필요 없이 AWS, Azure 및 GCP 클라우드 인프라 내에 존재하는 취약점에 대한 가시성을 제공합니다. Datadog은 클라우드 리소스에 대한 완전한 가시성을 확보하기 위한 첫 번째 단계로 Agentless Scanning을 활성화하고, 더 깊은 보안 및 관측 가능성 컨텍스트를 위해 시간이 지남에 따라 핵심 자산에 Datadog Agent를 설치할 것을 권장합니다.

<div class="alert alert-info">Agentless Scanning은 Datadog Agent가 설치된 리소스를 제외합니다.</div>

## 작동 방식 {#how-it-works}

다음 다이어그램은 Agentless Scanning이 작동하는 방식을 보여줍니다:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning 작동 방식을 보여주는 다이어그램" width="90%" >}}

1. Datadog은 12시간 간격으로 자동 스캔을 예약하고 [Remote Configuration][2]을 통해 스캔할 리소스를 전송합니다.
   - [Cloud Security Evaluation Filters][15]가 구성된 경우, Agentless Scanning은 이러한 필터를 준수하며 구성된 기준과 일치하는 리소스만 스캔합니다.
2. 서버리스 함수(예: AWS Lambda)의 경우, 스캐너가 함수의 코드를 가져옵니다.
3. 스캐너는 실행 중인 VM 인스턴스에서 사용되는 볼륨의 스냅샷을 생성합니다. 스냅샷 또는 함수 코드를 사용하여 스캐너는 SBOM(패키지 및 종속성 목록)을 생성합니다.
4. SBOM 및 호스트 메타데이터가 Datadog으로 전송됩니다. 스냅샷, 디스크 콘텐츠, Container 이미지를 포함한 기타 모든 데이터는 귀하의 인프라 내에 유지됩니다. 스냅샷은 삭제됩니다.
5. Datadog은 SBOM을 사용하여 리소스의 알려진 취약점을 식별합니다.

이 아키텍처는 다음을 제공합니다:
- **데이터 개인정보 보호**: 디스크 콘텐츠, 컨테이너 이미지 및 민감한 데이터는 귀하의 클라우드 계정 내에 유지됩니다. 패키지 메타데이터(SBOM)만 Datadog으로 전송됩니다.
- **데이터 레지던시**: 데이터가 계정 경계를 넘어 Datadog 인프라로 이동하지 않으므로 데이터 주권 요구 사항 준수가 간소화됩니다.
- **Compliance**: 감사자는 스캔 데이터가 귀하의 경계 내에 유지됨을 확인할 수 있습니다.

데이터 개인정보 보호에 대한 자세한 내용은 [Datadog으로 전송되는 데이터](#what-data-is-sent-to-datadog)를 참조하십시오.

<div class="alert alert-info">
  <ul>
    <li>스캐너는 귀하의 인프라 내에서 별도의 가상 머신으로 작동하여 기존 시스템 및 리소스에 미치는 영향을 최소화합니다.</li>
    <li>AWS의 경우, 스캐너 인스턴스는 워크로드에 따라 자동으로 확장됩니다. 스캔할 리소스가 없으면 스캐너는 0으로 확장되어 클라우드 제공업체 비용을 최소화합니다.</li>
    <li>스캐너는 귀하의 인프라 외부로 기밀 정보나 개인정보를 전송하지 않고 호스트에서 패키지 목록을 안전하게 수집합니다.</li>
    <li>스캐너는 클라우드 제공업체 API 사용을 제한하여 속도 제한에 도달하는 것을 방지하며, 필요한 경우 지수 백오프를 사용합니다.</li>
    <li>스캐너 인스턴스는 24시간마다 자동으로 교체되어 최신 이미지를 실행하도록 보장합니다.</li>
  </ul>
</div>

## Datadog으로 전송되는 데이터 {#what-data-is-sent-to-datadog}

분석을 위해 디스크 스냅샷을 환경 외부로 복사하는 대신, 데이터 개인정보를 보호하기 위해 Datadog은 **귀하의 클라우드 계정 내부**에 경량 스캐닝 인프라를 배포합니다. Agentless Scanning은 리소스의 스냅샷을 생성하여 로컬에서 분석하고, 분석이 완료되면 스냅샷을 삭제합니다. 패키지 및 종속성 목록을 포함하는 결과 SBOM만 Datadog으로 전송합니다. 원시 데이터, 디스크 콘텐츠 및 Container 이미지는 귀하의 환경을 절대 벗어나지 않습니다.

Agentless 스캐너는 OWASP [cycloneDX][3] 형식을 사용하여 패키지 목록을 Datadog으로 전송합니다. 기밀 정보나 개인정보는 귀하의 인프라 외부로 절대 전송되지 않습니다.

Datadog은 다음을 전송하지 **않습니다**:
- 시스템 및 패키지 구성
- 암호화 키 및 인증서
- 로그 및 Audit Trail
- 민감한 비즈니스 데이터

## 클라우드 서비스 제공업체 비용 {#cloud-service-provider-cost}

Agentless Scanning은 귀하의 클라우드 계정 내에서 실행되므로, 컴퓨팅 및 네트워킹 비용이 클라우드 제공업체 청구서에 표시됩니다. 자체 인프라에서 스캔하는 공급업체는 컴퓨팅 비용을 SaaS 요금에 포함하지만, 데이터를 귀하의 환경에 유지한다는 것은 인프라 비용을 직접 확인한다는 것을 의미합니다.

비용 절감 방법:
- 150개 이상의 호스트가 있는 각 리전에 스캐너를 배포하십시오. 리전별 스캐너는 리전 간 데이터 전송을 방지하므로 원격 리전에서 해당 호스트를 스캔하는 것보다 비용 효율적입니다.
- Terraform과 함께 [권장 구성][13]을 사용하여 리전당 하나의 스캐너를 배포하십시오.
- 대규모 다중 리전 배포의 경우, [Agentless Scanning 배포][16]를 참조하여 토폴로지 선택에 대한 지침을 확인하십시오.

## 스캐너 액세스 제한 {#restrict-scanner-access}

스캐너 인스턴스에는 스냅샷을 생성 및 복사하고 볼륨을 설명하기 위한 [권한][4]이 필요합니다. Datadog은 스캐너를 안전하게 유지하기 위해 다음 지침을 따를 것을 권장합니다:

- 관리자 사용자에게만 스캐너 인스턴스에 대한 액세스를 제한하십시오.
- 스캐너 권한을 최소 권한 원칙에 따라 설정하고, 스캔에 필요한 최소한의 권한으로 제한하십시오.
- 스캐너와 Datadog 간의 모든 데이터 전송을 HTTPS로 암호화하십시오.
- 무인 보안 업데이트를 활성화하고 24시간마다 인스턴스를 자동으로 교체하십시오.
- 스캐너 인스턴스에 대한 인바운드 액세스를 허용하지 마십시오(보안 그룹 제한).

## Cloud Storage Scanning {#cloud-storage-scanning}

배포 중 또는 설정 후에 Agentless Scanning 리소스에 대해 [Sensitive Data Scanner][8]를 활성화할 수 있습니다. Sensitive Data Scanner는 클라우드 스토리지(예: Amazon S3 버킷)에 있는 민감한 데이터를 카탈로그화하고 분류합니다. 이 기능은 Datadog으로 민감한 데이터를 전송하지 않고 환경 내의 데이터 저장소와 해당 파일만 읽습니다.

## On-Demand Scanning {#on-demand-scanning}

기본적으로 Agentless Scanning은 12시간마다 자동으로 리소스를 스캔합니다. AWS의 경우, On-Demand Scanning API를 사용하여 특정 리소스(호스트, Container, Lambda 함수 또는 S3 버킷)의 즉시 스캔을 트리거할 수도 있습니다. 자세한 내용은 [On-Demand Scanning API][14] 문서를 참조하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /ko/remote_configuration
[3]: https://cyclonedx.org/
[4]: /ko/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /ko/security/sensitive_data_scanner
[9]: /ko/security/cloud_security_management
[10]: /ko/remote_configuration
[11]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /ko/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /ko/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /ko/security/cloud_security_management/setup/agentless_scanning/deployment_methods