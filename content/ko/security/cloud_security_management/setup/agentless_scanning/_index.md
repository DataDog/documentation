---
aliases:
- /ko/security/agentless_scanning
- /ko/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: 설명서
  text: Cloud Security Vulnerabilities에 대해 자세히 알아보기
title: Cloud Security Agentless Scanning
---

## 개요

Agentless Scanning은 Datadog Agent를 설치하지 않고도 클라우드 인프라 내의 취약점을 파악할 수 있도록 지원합니다. Datadog은 클라우드 리소스의 가시성을 완벽히 확보하기 위해 Agentless Scanning을 활성화하고, 심층적인 보안 및 옵저버빌리티 컨텍스트를 확보하기 위해 핵심 자산에 Datadog Agent를 단계적으로 설치하는 것을 권장합니다.

## 작동 방식

리소스에 관한 [Agentless Scanning 설정[1] 후, Datadog은 [Remote Configuration][2]을 통해 12시간 간격으로 자동 스캔을 예약합니다. 스캔 주기 동안 Agentless 스캐너는 Lambda 코드 종속성을 수집하고 VM 인스턴스의 스냅샷을 생성합니다. Agentless 스캐너는 이러한 스냅샷을 사용하여 취약점 검사를 위해 패키지 목록과 Lambda 코드 종속성을 생성하고 Datadog으로 전송합니다. 스냅샷 스캔이 완료되면 스냅샷은 삭제됩니다. 기밀 정보나 개인 정보는 인프라 외부로 전송되지 않습니다.

[Cloud Security Evaluation Filters][15]가 구성된 경우 Agentless Scanning은 이러한 필터를 준수하고 구성된 기준과 일치하는 리소스만 스캔합니다.

다음 다이어그램은 Agentless Scanning 작동 방식을 보여줍니다.

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning 작동 방식을 보여주는 다이어그램" width="90%" >}}

1. Datadog은 스캔 일정을 예약하고 Remote Configuration을 통해 스캔할 리소스를 전송합니다.

    **참고**: 예약된 스캔은 [Datadog Agent가 설치되어 있고 Cloud Security가 활성화된](#agentless-scanning-with-existing-agent-installations) 호스트를 무시합니다. Datadog은 잠재적인 취약점 및 보안 위험에 관한 최신 정보를 제공하기 위해 12시간마다 리소스를 지속적으로 재스캔합니다.

2. Lambda 함수의 경우 스캐너는 함수의 코드를 가져옵니다.
3. 스캐너는 실행 중인 VM 인스턴스에서 사용되는 볼륨의 스냅샷을 생성합니다. 이러한 스냅샷을 기반으로 스캔이 실행됩니다. 스캐너는 스냅샷 또는 코드를 사용하여 패키지 목록을 생성합니다.
4. 스캔이 완료되면 수집된 호스트와 관련된 패키지 목록 및 정보가 Datadog으로 전송되며, 나머지 데이터는 모두 사용자 인프라에 남아 있습니다. 스캔 주기 동안 생성된 스냅샷은 삭제됩니다.
5. Datadog은 수집된 패키지 목록과 Trivy 취약점 데이터베이스 접근 권한을 활용하여 리소스 및 코드에서 영향을 받는 취약점을 찾아냅니다.

**참고**:
- 이 스캐너는 인프라 내에서 별도의 VM 인스턴스로 작동하므로 기존 시스템 및 리소스에 미치는 영향을 최소화합니다.
- AWS의 경우 스캐너 인스턴스는 워크로드에 따라 자동으로 확장됩니다. 스캔할 리소스가 없으면 스캐너는 클라우드 제공업체 비용을 최소화하기 위해 0으로 축소됩니다.
- 이 스캐너는 사용자의 인프라 외부로 기밀 정보나 개인 정보를 전송하지 않고 호스트에서 패키지 목록을 안전하게 수집합니다.
- 스캐너는 사용량 제한에 도달하지 않도록 클라우드 제공업체 API 사용을 제한하고, 필요한 경우 지수 백오프를 사용합니다.

## On-demand Scanning

기본적으로 Agentless Scanning은 12시간마다 리소스를 자동으로 스캔합니다. On-Demand Scanning API를 사용하여 특정 리소스(호스트, 컨테이너, Lambda 함수 또는 S3 버킷)를 즉시 스캔하도록 트리거할 수도 있습니다.

다음과 같은 상황에서 유용합니다.
- 취약점이 패치되었는지 확인
- 새로 배포된 리소스 결과를 즉시 확인
- 실제 배포 전에 보안 상태 확인

자세한 내용은 [On-Demand Scanning API 문서][14]를 참고하세요.

## Datadog에 전송되는 데이터
Agentless 스캐너는 OWASP [cycloneDX][3] 형식을 사용하여 패키지 목록을 Datadog에 전송합니다. 기밀 정보나 개인 정보는 인프라 외부로 전송되지 않습니다.

Datadog은 다음을 전송하지 **않습니다**.
- 시스템 및 패키지 구성
- 암호화 키 및 인증서
- 로그 및 감사 추적
- 민감한 비즈니스 데이터

## 보안 고려 사항

스캐너 인스턴스는 스냅샷 생성 및 복사, 볼륨 조회와 관련된 [권한][4]을 부여하기 때문에, Datadog에서는 이러한 인스턴스 접근을 관리자 사용자로만 제한할 것을 권장합니다.

이러한 위험을 완화하기 위해 Datadog은 다음과 같은 보안 조치를 시행합니다.

- Datadog 스캐너는 사용자 인프라 _내부_에서 작동하므로 스냅샷 및 패키지 목록을 포함한 모든 데이터가 격리되고 안전하게 유지됩니다.
- 스캐너와 Datadog 간의 모든 데이터 전송은 데이터의 기밀성과 무결성을 보장하기 위해 업계 표준 프로토콜(예: HTTPS)을 사용하여 암호화됩니다.
- Datadog 스캐너는 최소 권한 원칙에 따라 작동합니다. 즉, 의도된 기능을 효과적으로 하는 데 필요한 최소한의 권한만 받습니다.
- Datadog은 스캐너에 부여되는 권한을 신중하게 검토하고 제한하여 민감한 데이터나 리소스에 불필요하게 접근하지 않고도 스캔할 수 있도록 합니다.
- Datadog 스캐너 인스턴스에서 무인 보안 업데이트가 활성화되어 있습니다. 이 기능은 수동 개입 없이 중요한 보안 패치 및 업데이트를 자동으로 설치합니다.
- Datadog 스캐너 인스턴스는 24시간마다 자동으로 교체됩니다. 이러한 교체를 통해 스캐너 인스턴스는 항상 최신 Ubuntu 이미지로 업데이트됩니다.
- 스캐너 인스턴스 접근은 보안 그룹을 통해 엄격하게 제어됩니다. 스캐너 외부 접근은 허용되지 않으므로 인스턴스 손상 가능성을 최소화합니다.
- 기밀 정보나 개인 정보는 절대 인프라 외부로 전송되지 않습니다.

## 기존 Agent 설치를 활용한 Agentless Scanning

Datadog Agent를 설치하면 클라우드 워크로드에 존재하는 위험 요소와 취약점에 실시간으로 심층적인 가시성을 제공합니다. 따라서 Datadog Agent를 완전히 설치하는 것을 권장합니다.

결과적으로 Agentless Scanning은 Datadog Agent가 설치되고 [Vulnerability Management][5]를 위해 구성된 리소스를 스캔에서 제외합니다. 이러한 방식으로 Cloud Security는 Vulnerability Management가 활성화된 Datadog Agent 설치의 이점을 침해하지 않고 위험 환경에 대한 완벽한 가시성을 제공합니다.

다음 다이어그램은 기존 Agent 설치 환경에서 Agentless Scanning이 작동하는 방식을 보여줍니다.

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Cloud Security Vulnerability Management 기능이 Agent와 함께 이미 설치된 경우 Agentless Scanning이 어떻게 작동하는지 보여주는 다이어그램" width="90%" >}}

## Cloud Storage 검사

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}  Amazon S3 버킷 및 RDS 인스턴스 스캔 지원이 Preview로 제공됩니다. 사용을 원하시면 <strong>액세스 요청</strong>을 클릭하세요.{{< /callout >}}

[Sensitive Data Scanner][8]를 활성화하면 Amazon S3 버킷의 민감한 데이터를 카탈로그화하고 분류할 수 있습니다.

Sensitive Data Scanner는 클라우드 환경에 [Agentless  스캐너][1]를 배포하여 민감한 데이터를 스캔합니다. 이러한 스캔 인스턴스는 [Remote Configuration][10]을 통해 전체 S3 버킷 목록을 수집하고, CSV나 JSON과 같은 텍스트 파일을 시간에 따라 스캔하도록 구성되어 있습니다. Sensitive Data Scanner는 [전체 규칙 라이브러리][11]를 활용하여 일치하는 항목을 찾습니다. 일치하는 항목이 발견되면 스캔 인스턴스는 해당 항목의 위치를 ​​Datadog으로 전송합니다. 데이터 저장소와 해당 파일은 사용자 환경에서만 읽히며, 민감한 데이터는 Datadog으로 다시 전송되지 않습니다.

Sensitive Data Scanner는 민감한 데이터 일치 항목을 표시하는 것 외에도, [Cloud Security][9]가 감지한 민감한 데이터 저장소에 영향을 미치는 보안 이슈를 표시합니다. 이슈를 클릭하면 Cloud Security 내에서 분류하고 해결할 수 있습니다.

## 클라우드 서비스 제공업체 비용

Agentless Scanning을 사용하면 스캐너 실행 및 클라우드 환경 분석의 추가 클라우드 제공업체 비용이 발생합니다.

클라우드 구성은 클라우드 제공업체 비용에 영향을 미칩니다. 일반적으로 [권장 구성][13]을 사용하는 경우 스캔된 호스트당 연간 약 1달러입니다. 정확한 금액은 클라우드 제공업체에게 문의해야 하며, 해당 금액은 Datadog의 개입 없이 변경될 수 있습니다.

여러 리전에 분산된 대규모 클라우드 워크로드의 경우 Datadog에서는 교차 리전 네트워킹을 방지하기 위해 [Terraform을 사용한 Agentless Scanning][6] 설정을 권장합니다.


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