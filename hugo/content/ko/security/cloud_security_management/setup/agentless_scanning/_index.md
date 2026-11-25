---
aliases:
- /ko/security/agentless_scanning
- /ko/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: 설명서
  text: Cloud Security Vulnerabilities에 대해 자세히 알아보기
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

Agentless Scanning은 Datadog Agent를 설치할 필요 없이 AWS, Azure 및 GCP 클라우드 인프라 내에 존재하는 취약성에 대한 가시성을 제공합니다. 클라우드 리소스에 대한 완전한 가시성을 확보하기 위한 첫 번째 단계로 Agentless Scanning을 활성화한 다음 더욱 깊이 있는 보안 및 관측 가능성 관련 컨텍스트를 파악할 수 있도록 핵심 자산에 Datadog Agent를 점진적으로 설치하는 것이 좋습니다.

<div class="alert alert-info">Agentless Scanning은 Cloud Security Vulnerabilities와 Misconfigurations가 모두 활성화된 상태로 Datadog Agent가 실행되는 호스트는 건너뜁니다. Agent가 있는 다른 호스트의 경우, Agentless Scanning은 Agent가 지원하지 않는 기능만 지원합니다. <a href="/security/cloud_security_management/troubleshooting/agentless_scanning#hosts-with-the-datadog-agent-are-not-scanned">문제 해결</a>을 참조하세요.</div>

## 작동 방식 {#how-it-works}

다음 다이어그램에서는 Agentless Scanning이 작동하는 방식을 보여줍니다.

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning 작동 방식을 보여주는 다이어그램" width="90%" >}}

1. Datadog이 12시간 간격으로 자동화된 스캔을 예약하고 [Remote Configuration][2]을 통해 스캔할 리소스를 전송합니다.
   - [Cloud Security 평가 필터][15]가 구성된 경우, Agentless Scanning은 이러한 필터를 준수하며 구성된 기준과 일치하는 리소스만 스캔합니다.
2. 서버리스 함수(예: AWS Lambda)의 경우, 스캐너가 함수의 코드를 가져옵니다.
3. 스캐너가 실행 중인 VM 인스턴스에서 사용되는 볼륨의 스냅샷을 생성합니다. 스냅샷 또는 함수 코드를 사용하여 스캐너는 SBOM(패키지 및 종속성 목록)을 생성합니다.
4. SBOM 및 호스트 메타데이터가 Datadog으로 전송됩니다. 스냅샷, 디스크 콘텐츠, 컨테이너 이미지를 포함한 기타 모든 데이터는 사용자 인프라에 유지됩니다. 스냅샷은 삭제됩니다.
5. Datadog이 SBOM을 사용하여 리소스의 알려진 취약성을 식별합니다.

이 아키텍처는 다음을 제공합니다.
- **데이터 개인정보 보호**: 디스크 콘텐츠, 컨테이너 이미지 및 민감한 데이터가 사용자의 클라우드 계정 내에 유지됩니다. 패키지 메타데이터(SBOM)만 Datadog으로 전송됩니다.
- **데이터 레지던시**: 데이터가 계정 경계를 넘어 Datadog 인프라로 전송되지 않으므로 데이터 주권 요구 사항을 준수하기가 간편해집니다.
- **규정 준수**: 스캔 데이터가 사용자 경계 내에 유지됨을 감사자가 확인할 수 있습니다.

데이터 개인정보 보호에 대한 자세한 내용은 [Datadog으로 전송되는 데이터](#what-data-is-sent-to-datadog)를 참조하세요.

<div class="alert alert-info">
  <ul>
    <li>스캐너는 사용자의 인프라 내에서 별도의 가상 머신으로 작동하여 기존 시스템 및 리소스에 미치는 영향을 최소화합니다.</li>
    <li>AWS의 경우, 스캐너 인스턴스는 워크로드에 따라 자동으로 확장됩니다. 스캔할 리소스가 없으면 클라우드 공급자 비용을 최소화하기 위해 스캐너가 0으로 줄어듭니다.</li>
    <li>스캐너는 기밀 정보나 개인 정보를 사용자 인프라 외부로 전송하지 않고 호스트에서 패키지 목록을 안전하게 수집합니다.</li>
    <li>스캐너는 클라우드 공급자 API 사용을 제한하여 속도 제한에 도달하지 않도록 하며, 필요한 경우 지수 백오프를 사용합니다.</li>
    <li>스캐너 인스턴스는 24시간마다 자동으로 로테이션되어 최신 이미지를 실행합니다.</li>
  </ul>
</div>

## Datadog으로 전송되는 데이터 {#what-data-is-sent-to-datadog}

분석을 위해 디스크 스냅샷을 환경 외부로 복사하는 대신, 데이터를 비공개로 유지하기 위해 Datadog은 **사용자의 클라우드 계정 내부**에 경량 스캔 인프라를 배포합니다. Agentless Scanning은 리소스의 스냅샷을 생성하여 로컬에서 분석하고, 분석이 완료되면 스냅샷을 삭제합니다. Datadog에는 패키지 및 종속성 목록이 포함된 결과 소프트웨어 자재 명세서(SBOM)만 전송합니다. 원시 데이터, 디스크 콘텐츠 및 컨테이너 이미지는 절대 사용자 환경을 벗어나지 않습니다.

Agentless 스캐너는 OWASP [cycloneDX][3] 형식을 사용하여 패키지 목록을 Datadog으로 전송합니다. 기밀 정보나 비공개 개인 정보는 절대 사용자 인프라 외부로 전송되지 않습니다.

Datadog은 다음을 전송하지 **않습니다**.
- 시스템 및 패키지 구성
- 암호화 키 및 인증서
- 로그 및 감사 추적
- 민감한 비즈니스 데이터

## 클라우드 서비스 공급자 비용 {#cloud-service-provider-cost}

Agentless Scanning은 사용자의 클라우드 계정 내부에서 실행되므로 컴퓨팅 및 네트워킹 비용이 클라우드 공급자 청구서에 표시됩니다. 자체 인프라에서 스캔하는 공급업체는 컴퓨팅 비용을 자체 SaaS 요금과 합치지만 데이터를 사용자 환경에 유지하면 인프라 비용을 직접 확인할 수 있습니다.

비용을 절감하려면 다음과 같이 하세요.
- 호스트가 150개를 초과하는 각 리전에 스캐너를 배포합니다. 리전별 스캐너는 리전 간 데이터 전송을 피하므로 원격 리전에서 해당 호스트를 스캔하는 것보다 더 비용 효율적입니다.
- Terraform과 함께 [권장 구성][13]을 사용하여 리전당 하나의 스캐너를 배포합니다.
- 대규모 다중 리전 배포의 경우, 배포 토폴로지 선택에 대한 지침은 [Agentless Scanning 배포][16]를 참조하세요.

## 스캐너 액세스 제한 {#restrict-scanner-access}

스캐너 인스턴스에는 스냅샷을 생성 및 복사하고 볼륨을 설명할 수 있는 [권한][4]이 필요합니다. 스캐너를 보호하기 위해 다음 가이드라인을 따르는 것이 좋습니다.

- 스캐너 인스턴스에 대한 액세스 권한을 관리 사용자로 제한하세요.
- 스캐너 권한을 최소 권한 원칙에 따라 스캔에 필요한 최소한으로 제한하세요.
- 스캐너와 Datadog 간의 모든 데이터 전송을 HTTPS로 암호화하세요.
- 무인 보안 업데이트를 활성화하고 24시간마다 인스턴스를 자동으로 로테이션하세요.
- 스캐너 인스턴스에 대한 인바운드 액세스를 허용하지 마세요(보안 그룹 제한).

## 클라우드 스토리지 스캔 {#cloud-storage-scanning}

배포 중이나 설정 후에 Agentless Scanning 리소스에 대해 [Sensitive Data Scanner][8]를 활성화할 수 있습니다. Sensitive Data Scanner는 클라우드 스토리지(예: Amazon S3 버킷)에 있는 민감한 데이터를 카탈로그화하고 분류합니다. 이 스캐너는 민감한 데이터를 Datadog으로 전송하지 않으면서 사용자 환경에 있는 데이터 저장소와 해당 파일만 읽습니다.

## 온디맨드 스캔 {#on-demand-scanning}

기본적으로 Agentless Scanning은 12시간마다 자동으로 리소스를 스캔합니다. AWS의 경우 온디맨드 스캔 API를 사용하여 특정 리소스(호스트, 컨테이너, Lambda 함수 또는 S3 버킷)에 대한 즉시 스캔을 트리거할 수도 있습니다. 자세한 내용은 [온디맨드 스캔 API][14] 설명서를 참조하세요.

## 추가 자료 {#further-reading}

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