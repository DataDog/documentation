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
  text: 클라우드 스토리지에 대한 Sensitive Data Scanner 설정
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: 설명서
  text: Agentless Scanning 업데이트
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: 설명서
  text: Agentless Scanning 트러블슈팅
title: Cloud Security Agentless Scanning
---

## 개요

Agentless Scanning은 Datadog Agent를 설치하지 않고도 AWS, Azure, GCP 클라우드 인프라 내의 취약점을 파악할 수 있도록 지원합니다. Datadog은 클라우드 리소스의 가시성을 완벽히 확보하기 위해 Agentless Scanning을 활성화하고, 심층적인 보안 및 옵저버빌리티 컨텍스트를 확보하기 위해 핵심 자산에 Datadog Agent를 단계적으로 설치하는 것을 권장합니다.

<div class="alert alert-info">Agentless Scanning은 Datadog Agent가 설치된 리소스를 제외합니다.</div>

## 작동 방식

다음 다이어그램은 Agentless Scanning 작동 방식을 보여줍니다.

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning 작업 방식을 표여주는 다이어그램" width="90%" >}}

1. Datadog은 12시간 간격으로 자동 스캔 일정을 잡고 [Remote Configuration][2]을 통해 스캔할 리소스를 전송합니다.
   - [Cloud Security Evaluation Filters][15]가 구성된 경우 Agentless Scanning은 이러한 필터를 준수하고 구성된 기준과 일치하는 리소스만 스캔합니다.
2. 서버리스 기능(예: AWS Lambda)의 경우, 스캐너는 함수의 카드를 가져옵니다.
3. 스캐너는 실행 중인 VM 인스턴스에서 사용되는 볼륨의 스냅샷을 생성합니다. 스캐너는 스냅샷이나 함수 코드를 사용해 SBOM을 생성합니다(패키지 및 종속성 목록).
4. SBOM 및 호스트 메타데이터는 Datadog으로 전송됩니다. 기타 데이터(스냅샷, 디스크 컨텐츠, 컨테이너 이미지 등)는 인프라스트럭처에 남아 있습니다. 스냅샷은 삭제됩니다.
5. Datadog은 SBOM을 사용해 리소스의 알려진 취약점을 파악합니다.

이 아키텍처에는 다음과 같은 이점이 있습니다.
- **데이터 프라이버시**: 클라우드 계정에 있는 디스크 컨텐츠, 컨테이너 이미지, 민감한 데이터는 남아 있고, 패키지 메타데이터(SBOM)만 Datadog으로 전송됩니다.
- **데이터 레지던시**: 계정을 넘어 Datadog 인프라스트럭처로 넘어가는 데이터가 없어서 데이터 독립성 컴플라이언스 단계가 간편해 집니다.
- **컴플라이언스**: 스캔 데이터가 내부망 경계 내에 머무르는지 감사자가 확인할 수 있습니다.

데이터 프라이버시에 관한 자세한 정보는 [Datadog에 전송되는 데이터](#what-data-is-sent-to-datadog)를 참조하세요.

<div class="alert alert-info">
  <ul>
    <li>스캐너는 사용자의 인프라스트럭처 내에서 독립된 가상 머신으로 작동하여 기존 시스템과 리소스에 미치는 영향을 최소화합니다.</li>
    <li>AWS의 경우, 워크로드에 따라 스캐너 인스턴스가 자동으로 스케일링됩니다. 스캔할 리소스가 없는 경우, 스캐너 비용은 0이나 클라우드 제공자 비용을 최소화합니다.</li>
    <li>스캐너는 비밀 또는 개인 정보를 인프라스트럭처 외부로 전송하지 않고 안전하게 호스트에서 패키지 목록을 수집합니다.</li>
    <li>스캐너는 클라우드 제공자 API 사용을 제한하여 요금 한도 초과를 예방하고,  필요할 경우 지수 백오프를 사용합니다.</li>
    <li>스캐너 인스턴스는 24시간마다 자동으로 회전되어 최신 이미지를 사용합니다. </li>
  </ul>
</div>

## Datadog에 전송되는 데이터

Datadog는 데이터 보안을 지키기 위하여 디스크 스냅샷을 복사해 사용자 환경 외부로 가져가 분석하는 것이 아니라, 경량 스캐닝 인프라스트럭처를 **클라우드 계정 내**에 배포합니다. Agentless Scanning은 리소스의 스냅샷을 생성하고 로컬 분석을 실행한 후 분석이 완료된 후에 스냅샷을 삭제합니다. Datadog에 전송되는 것은 SBOM(소프트웨어 자재 명세서)인데, 여기에는 패키지와 종속성 목록이 포함되어 있습니다. 사용자의 원시 데이터, 디스크 컨텐츠, 컨테이너 이미지는 사용자의 환경을 아예 벗어나지 않습니다.

Agentless 스캐너는 OWASP [cycloneDX][3] 형식을 사용하여 패키지 목록을 Datadog에 전송합니다. 기밀 정보나 개인 정보는 인프라 외부로 전송되지 않습니다.

Datadog은 다음을 전송하지 **않습니다**.
- 시스템 및 패키지 구성
- 암호화 키 및 인증서
- 로그 및 감사 추적
- 민감한 비즈니스 데이터

## 클라우드 서비스 제공업체 비용

Agentless Scanning은 클라우드 계정 내에서 실행되기 때문에 컴퓨팅 및 네트워킹 비용이 클라우드 제공자의 명세서에 나타납니다. 자체 인프라스트럭처에서 스캔을 실행하는 벤더는 컴퓨팅 비용을 SaaS 수수료에 포함시키지만, 데이터를 자체 환경 내에 유지할 경우 인프라스트럭처 비용을 직접 확인해야 합니다.

비용 절감 방법:
- 호스트가 150개 이상인 리전에 스캐너를 배포하세요. 리전별 스캐너는 리전간 데이터 전송을 피하기 때문에 원격 리전의 호스트를 스캐닝하는 것보다 비용 효율적입니다.
- Terraform [추천 구성][13]을 사용해 리전별로 스캐너를 배포하세요.
- 대량으로 여러 리전에 배포할 경우에는 [Agentless Scanning 배포][16]를 참고해 배포 토폴로지를 선택하세요.

## 스캐너 액세스 제한

스캐너 인스턴스에는 스냅샷 생성, 복사, 볼륨 조회 [권한][4]이 필요합니다. Datadog에서는 다음 가이드에 따라 스캐너를 안전하게 이용할 것을 권장합니다.

- 관리자 등급의 사용자만 스캐너 인스턴스를 이용할 수 있도록 액세스를 제한합니다.
- 스캐너 권한을 최소 권한의 원칙에 따라 설정하여 스캔에 필요한 최소한의 범위로 제한합니다.
- 스캐너와 Datadog 사이의 모든 데이터 전송은 HTTPS를 사용하여 암호화합니다.
- 무인 보안 업데이트를 활성화하고, 24시간마다 인스턴스를 자동으로 회전합니다.
- 스캐너 인스턴스에 대한 인바운드 접속을 허용하지 마세요(보안 그룹 제한).

## Cloud Storage 검사

배포 중 또는 설정 후에 Agentless Scanning 리소스에 [Sensitive Data Scanner][8]를 활성화할 수 있습니다. Sensitive Data Scanner 클라우드 스토리지(예: Amazon S3 버킷)에 있는 민감한 데이터를 카탈로그화 및 분류합니다. 환경에 저장되어 있는 데이터와 파일을 읽기만 하며, 민감한 데이터를 Datadog로 전송하지 않습니다. 

## On-demand Scanning

기본적으로 Agentless Scanning은 12시간마다 리소스를 자동으로 스캔합니다. AWS의 경우, On-Demand Scanning API를 사용하여 특정 리소스(호스트, 컨테이너, Lambda 함수 또는 S3 버킷)를 즉시 스캔하도록 트리거할 수도 있습니다. 자세한 내용은 [On-Demand Scanning API][14] 설명서를 참고하세요.

## 참고 자료

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