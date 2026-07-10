---
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: 설명서
  text: Cloud Security Misconfigurations
- link: /security/cloud_security_management/vulnerabilities/
  tag: 설명서
  text: Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/
  tag: 설명서
  text: Sensitive Data Scanner
title: Crown Jewels
---
{{< callout url=https://www.datadoghq.com/product-preview/runtime-prioritization-engine/
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
Crown Jewels는 미리 보기로 제공되고 있습니다. 지금 바로 이 양식을 사용하여 요청을 제출하세요.
{{< /callout >}}

## 개요 {#overview}

Crown Jewels는 가장 중요한 클라우드 리소스의 목록으로, Datadog에 이미 전송한 텔레메트리를 분석하여 자동으로 탐지된 것입니다. 이 목록은 Cloud Security 전반에 걸쳐 수정 작업의 우선순위를 정하는 기준이 됩니다. 사용자는 이를 기반으로 Crown Jewels와 연결된 취약점, 구성 오류 및 ID 위험을 다른 탐지 결과와 구분하여 정렬, 필터링 및 할당할 수 있습니다.

대부분의 보안 팀은 처리해야 할 보안 결과가 너무 많습니다. 하지만 어떤 리소스가 가장 중요한지 알면, 우선적으로 대응해야 하는 탐지 결과부터 집중적으로 처리할 수 있습니다.

Datadog는 APM, 로그 및 클라우드 스토리지를 포함한 기존 텔레메트리를 분석하여 초기 목록을 생성합니다. 그 후, 환경에서 가장 중요한 것에 맞게 목록을 조정할 수 있습니다.

## 탐지되는 항목 {#what-gets-detected}

Crown Jewels는 3가지 리소스 유형을 평가합니다.

| 리소스 유형 | 평가되는 데이터 |
|---|---|
| 서비스 | APM으로 계측된 서비스 및 추론된 서비스 |
| 데이터베이스 | APM 및 Database Monitoring을 통해 관찰된 데이터베이스 인스턴스 |
| 버킷 | Agentless Scanning 및 Sensitive Data Scanner에 의해 관찰된 S3 버킷 |

Datadog은 하나 이상의 감지 신호를 통해 해당 리소스가 민감한 데이터를 처리하거나 자격 증명을 보유하거나 환경에서 구조적으로 중요한 위치에 있다고 판단되면 목록에 해당 리소스를 추가합니다.

### 탐지 신호 {#detection-signals}

Crown Jewels는 특정 리소스에 대해 활성화된 텔레메트리 소스를 기반으로만 탐지를 수행할 수 있습니다. 커버리지는 Datadog 계측의 깊이에 따라 확장됩니다. 즉, 계측이 풍부할수록 Datadog이 평가할 수 있는 표면적이 커지고 따라서 자동으로 감지된 목록의 정확도가 높아집니다. 

신호 유형에 대한 텔레메트리 소스가 누락되고 Datadog이 관련 리소스를 자동으로 채울 수 없는 경우에도 리소스를 수동으로 추가할 수 있습니다.

| 신호 | 소스 | 예 |
|---|---|---|
| APM 스팬의 시크릿 | APM용 Sensitive Data Scanner | 스팬 속성에서 AWS 액세스 키가 관찰된 서비스 |
| 로그의 민감한 필드 | 로그용 Sensitive Data Scanner | 로그 이벤트에서 신용카드 번호, 이메일 또는 자격 증명이 감지된 서비스 |
| 민감한 열 이름 | APM용 Sensitive Data Scanner | 열 이름이 `password`, `ssn`, `email` 등인 데이터베이스 |
| 저장된 민감한 데이터 | Agentless Scanning + Sensitive Data Scanner | PII, 자격 증명 또는 기타 민감한 콘텐츠가 포함된 S3 버킷 |
| 서비스 의존성 팬인(fan-in) | APM 서비스 맵 | 많은 서비스가 의존하는 팬인이 높은 서비스는 손상될 경우 광범위한 파급 범위를 가짐 |
| API 트래픽의 민감한 데이터 | App and API Protection | PII와 같은 민감한 데이터가 포함된 엔드포인트를 노출하는 서비스 |

## 목록을 사용하여 탐지 결과 필터링 {#use-the-list-to-filter-findings}

Crown Jewels 목록의 모든 탐지 결과는 `@risk.is_crown_jewel:true` 태그가 지정됩니다. 이 태그는 Datadog의 보안 데이터 모델을 통해 해당 리소스와 연결된 탐지 결과로 전파됩니다. 다음의 모든 항목은 Crown Jewels 탐지 결과로 표시됩니다.

- Crown Jewels 서비스에 연결된 가상 머신의 구성 오류
- Crown Jewels 서비스에서 사용되는 컨테이너 이미지의 취약점

이 전파를 통해 다음 위치에서 `@risk.is_crown_jewel:true`를 필터 또는 패싯으로 사용할 수 있습니다.

- **Vulnerability Explorer**에서 중요한 리소스와 연결된 탐지 결과에 대한 수정 작업에 집중할 수 있습니다.
- **Misconfiguration Explorer**에서 가장 중요한 자산에 대한 강화 작업의 범위를 설정할 수 있습니다.
- **Notifications**에서 Crown Jewel 자산에 대한 알림을 다른 방식으로 라우팅할 수 있습니다.
- **Findings Automation**를 통해 Crown Jewel과 관련된 탐지 결과에 대한 사용자 지정 수정 패턴을 정의할 수 있습니다.

필터는 다른 기준과 결합할 수 있습니다. 예를 들어, Vulnerability Explorer를 `severity:critical` 및 `@risk.is_crown_jewel:true`로 필터링할 수 있습니다.

## 목록 검토 및 수정 {#review-and-edit-the-list}

Crown Jewels를 보려면 **Security** > **Settings** > **Cloud Security** > [**Crown Jewels**][1]로 이동하세요. Datadog은 다음 항목을 포함한 목록을 자동으로 추가합니다.

- 리소스 유형 및 이름.
- 포함을 트리거한 탐지 신호.
- 기본 증거의 요약.

이 자동 생성 목록을 비즈니스에 실제로 중요한 내용을 반영하도록 편집할 수 있는 초안으로 간주하세요. 여기서는 다음을 할 수 있습니다.

중요하다고 생각되는 내용과 일치하지 않는 항목을 - **제거**합니다(예: 중요도가 낮은 URL 문자열로 인해 플래그된 서비스).
Datadog이 자동으로 탐지하지는 못했지만 비즈니스에 중요하다고 판단되는 리소스를 - **추가**하세요.

## 개인정보 보호 및 데이터 처리 {#privacy-and-data-handling}

Crown Jewels는 이미 Datadog으로 전송된 텔레메트리를 기반으로 실행되며, 데이터를 Datadog 계정 외부로 옮기거나 제3자에게 전송하지 않습니다. 탐지는 다른 Cloud Security 데이터와 동일한 리전 인프라에서 실행됩니다.


## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/crown-jewels