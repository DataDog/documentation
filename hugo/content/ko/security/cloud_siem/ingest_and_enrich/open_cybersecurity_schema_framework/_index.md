---
aliases:
- /ko/security/cloud_siem/open_cybersecurity_schema_framework
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: 설명서
  text: 로그 처리 파이프라인
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: 블로그
  text: Datadog의 OCSF 프로세서를 사용하여 Cloud SIEM의 모든 로그 정규화
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: 블로그
  text: 'Datadog Cloud SIEM: 보안 운영의 혁신을 주도하다'
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: 블로그
  text: Datadog Cloud SIEM에서 OCSF Common Data Model을 사용하여 데이터 정규화
- link: https://www.datadoghq.com/blog/cloud-siem-claude-compliance-api-integration/
  tag: 블로그
  text: Datadog Cloud SIEM을 사용하여 Claude Enterprise 활동 모니터링하기
title: Datadog의 OCSF(Open Cybersecurity Schema Framework) 공통 데이터 모델
---
## 개요 {#overview}

Cloud SIEM은 클라우드 서비스, 방화벽, 네트워크, 애플리케이션, IT 시스템 등 다양한 소스에서 데이터를 수집하고 분석합니다. 이러한 서비스는 서로 다른 형식으로 데이터를 내보내기 때문에 의미 있는 위협 분석을 수행하려면 로그를 정규화하고 준비하는 데 상당한 노력이 필요한 경우가 많습니다.

OCSF(Open Cybersecurity Schema Framework)는 보안 이벤트 데이터를 구성하고 분류하기 위한 공급업체 중립적 오픈 소스 표준입니다. 이 프레임워크는 플랫폼과 제품 전반에서 보안 로그가 구조화되는 방식을 단순화하고 통합하여 일관된 위협 탐지와 더 빠른 조사를 가능하게 합니다.

Datadog 에서 OCSF 지원이 Datadog Cloud SIEM 에 직접 통합되어 있어 수동 구성 없이도 표준화되고 정규화된 로그 데이터를 얻을 수 있습니다. 수신되는 보안 로그는 기본 제공(OOTB) 파이프라인을 통해 수집 시점에 OCSF 호환 속성으로 자동 보강됩니다. 모든 OCSF 값은 전용 `OCSF` 속성에 포함되며, 로그를 변환하고 보강하는 다른 프로세스 외에도 추가로 제공됩니다. OCSF 를 지원하는 Log Management 통합 목록을 보려면 [지원되는 기본 제공 OCSF 파이프라인](#supported-out-of-the-box-ocsf-pipelines)을 참조하세요. 

Datadog Cloud SIEM의 OCSF 통합 기능을 이용하면 다음이 가능합니다.

* **간소화된 탐지 규칙**: 통합된 속성 구조를 통해 탐지 로직을 한 번만 작성하여 여러 소스에 적용할 수 있습니다.
* **간소화된 조사**: 단일 스키마를 통해 공급자 전반에서 단일 쿼리 분류가 가능하므로 분석가가 소스별 형식을 기억할 필요가 없습니다.
* **소스 간 상관관계 분석**: 탐지 로직을 통해 서로 다른 서비스 간의 이벤트(예: 피싱 및 권한 상승)를 연관시킬 수 있습니다.
* **확장 가능한 통합 유지 관리**: OCSF를 사용하면 새로운 데이터 소스가 추가되더라도 일관된 스키마 기대치를 유지할 수 있습니다.

## OCSF 모델 {#ocsf-model}

보안 데이터를 정규화하기 위해 OCSF는 다음 구성 요소를 기반으로 데이터를 다시 매핑합니다.

1. [데이터 유형, 속성, 객체 및 배열](#data-types-attributes-objects-and-arrays)
1. [이벤트 클래스 및 카테고리](#event-categories-and-classes)
1. [프로필](#profiles)
1. [확장](#extensions)

### 데이터 유형, 속성, 객체 및 배열 {#data-types-attributes-objects-and-arrays}

데이터 유형, 속성, 객체 및 배열은 OCSF 모델의 주요 구성 요소입니다.

| 이름 | 설명 |
| ---- | ----------- |
| 데이터 유형 | 데이터 유형은 데이터 요소를 정수, 문자열, 부동 소수점 숫자 및 부울 값으로 정의합니다.  |
| 속성 | 속성은 프레임워크의 구성 요소입니다. 속성은 소스에 관계없이 데이터에 대한 공통 언어를 제공하는 데 사용됩니다. 모든 속성 목록은 [속성 사전][1]을 참조하세요.  |
| 객체 | 객체는 프로세스, 장치, 사용자, 악성 코드 또는 파일과 같은 엔티티를 나타내는 관련 속성의 모음입니다.  |
| 배열 | 배열은 복합 유형을 포함한 모든 데이터 유형을 지원합니다.  |

### 이벤트 카테고리 및 클래스 {#event-categories-and-classes}

OCSF 모델 내의 보안 이벤트는 카테고리로 구성됩니다. 이는 데이터 유형에 따라 이벤트를 분류하는 상위 수준 그룹입니다. 자세한 정보 및 사용 가능한 카테고리 목록은 [OCSF 카테고리][2]를 참조하세요. 카테고리는 이벤트 클래스로 세분화됩니다. 예를 들어, 'Identity & Access Management' 카테고리에는 [6개의 클래스][3]가 있습니다. 자세한 정보는 [OCSF 이벤트 클래스][4]를 참조하세요.

### 프로필 {#profiles}

프로필은 이벤트 클래스 및 이를 참조하는 객체에 선택적으로 오버레이할 수 있는 속성 클래스입니다. 기존 이벤트 클래스에 추가 정보를 더하며, 이벤트 카테고리와는 독립적입니다. 프로필 목록은 [OCSF 프로필][5]을 참조하고, 자세한 내용은 [OCSF 프로필 설명서][6]를 참조하세요.

### 확장 {#extensions}

OCSF 스키마에 새 속성, 객체, 카테고리, 프로필, 이벤트 클래스와 같은 확장을 선택적으로 추가할 수 있습니다. 자세한 내용은 [OCSF 확장][7]을 참조하세요.

## 지원되는 기본 제공 OCSF 파이프라인 {#supported-out-of-the-box-ocsf-pipelines}

다음 Log Management 통합은 기본 제공 OCSF 파이프라인을 지원합니다.

{{% cloud-siem-supported-ocsf %}}

## 보안 파이프라인 \- OCSF {#view-security-pipelines-ocsf}

Cloud SIEM OCSF 는 Log Management의 [통합 파이프라인][8]에서 로그 데이터를 다시 매핑합니다. 자세한 내용은 [지원되는 기본 제공 OCSF 파이프라인](#supported-out-of-the-box-ocsf-pipelines)을 참조하세요.

소스에 대한 통합 파이프라인 라이브러리를 조회하려면 다음 단계를 따르세요.

1. [로그 파이프라인][9]으로 이동합니다.
1. {{< ui >}}Browse Pipeline Library{{< /ui >}}를 클릭합니다.
1. 관심 있는 통합을 검색하고 클릭합니다(예: Okta).
1. Okta에 대한 OCSF 파이프라인을 조회하려면 Okta 통합 프로세서 목록의 끝으로 스크롤합니다.

소스 통합에 대한 읽기 전용 OCSF 파이프라인을 조회하려면 다음 단계를 따르세요.
1. [로그 파이프라인][9]으로 이동합니다.
1. 파이프라인을 선택합니다.
1. 파이프라인 프로세서 끝에 있는 OCSF 파이프라인으로 스크롤합니다.
1. OCSF 파이프라인을 클릭하여 연결된 재매핑 프로세서를 확인합니다.
1. OCSF 파이프라인의 눈 아이콘을 클릭하여 다음과 같은 정보를 확인합니다.
    - OCSF 스키마 버전
    - 클래스
    - 프로필

**참고**: 메인 파이프라인을 복제하면 OCSF 파이프라인이 Security 파이프라인이 아닌 로그 파이프라인으로 변환됩니다.

## 로그에서 OCSF 데이터 조회 {#view-ocsf-data-in-logs}

로그에서 OCSF 데이터를 조회하려면 다음 단계를 따르세요.
1. [Logs Explorer][10]로 이동합니다.
1. 로그 검색어를 입력합니다.
1. 로그를 클릭합니다.
1. 측면 패널에서 \`ocsf\` JSON 속성까지 아래로 스크롤하여 OCSF 데이터를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/ocsf/ocsf-schema/blob/4a8ad2fa4a1908f1cad2cbf331a1b49efd5001c2/dictionary.json
[2]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#categories
[3]: https://schema.ocsf.io/1.4.0/categories/iam?extensions=
[4]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#event-classes
[5]: https://schema.ocsf.io/1.4.0/profiles
[6]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#profiles
[7]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#extensions
[8]: /ko/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://app.datadoghq.com/logs