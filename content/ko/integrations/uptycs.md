---
app_id: uptycs
app_uuid: d27ee4b6-649d-42bd-b7ac-fb40537d7031
assets:
  dashboards:
    Uptycs Events Dashboard: assets/dashboards/uptycs.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10400
    source_type_name: Uptycs
author:
  homepage: https://www.uptycs.com
  name: Uptycs
  sales_email: sales@uptycs.com
  support_email: support@uptycs.com
categories:
- 클라우드
- 협업
- 알림
- 준수
- 보안
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/uptycs/README.md
display_on_public_website: true
draft: false
git_integration_title: uptycs
integration_id: uptycs
integration_title: Uptycs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: uptycs
public_title: Uptycs
short_description: Uptycs에서 알림 및 감지 내용을 수집하세요
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Collaboration
  - Category::Alerting
  - Category::Compliance
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Uptycs에서 알림 및 감지 내용을 수집하세요
  media:
  - caption: Uptycs 이벤트 대시보드
    image_url: images/integration_dashboard_1.png
    media_type: image
  - caption: 호스트 트렌드 그래프별 Uptycs 이벤트
    image_url: images/integration_dashboard_2.png
    media_type: image
  - caption: Datadog 이벤트로 Uptycs 감지 수집
    image_url: images/data_collected_1.png
    media_type: image
  - caption: Datadog 이벤트로 Uptycs 알림 수집
    image_url: images/data_collected_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Uptycs
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Uptycs는 최신 공격 영역 전반에서 위협, 취약점, 오설정, 민감 데이터 노출, 규정 준수 요건에 관해 대응 우선순위를 정합니다. 또한 단일 사용자 인터페이스와 데이터 모델을 통해 이 정보에 접근할 수 있도록 지원하여 위험을 줄입니다. 또 온프레미스 및 클라우드 전반에서 위협 활동의 상관관계를 분석하는 기능이 있어 더욱 기업 보안을 더욱 포괄적으로 강화할 수 있습니다.

보안 솔루션이 필요하신가요? CNAPP, CWPP, CSPM, KSPM, CIEM, CDR, XDR 모두 지원합니다. Detection Cloud로 Google 같은 검색 기능을 활용하고 공격 표면을 보호하세요.

자세한 내용은 [Uptycs 웹사이트][1]에서 확인하세요.

Uptycs 통합을 통해 Uptycs 경고와 감지 내용을 Datadog 이벤트로 수집할 수 있습니다.

### 경고 세부 정보

각 경고에는 다음과 같은 주요 구성 요소가 포함되어 있습니다.
   1. 타이틀
   2. 설명
   3. Id: Uptycs 경고 ID
   4. Uptycs 경고 코드
   5. 경고 심각도 수준
   6. 경고 키 및 값
   7. Asset details: 자산 ID 및 호스트 이름
   8. Uptycs 플랫폼으로 이동하는 Uptycs URL

### 감지 세부 정보

각 감지에는 다음과 같은 주요 구성 요소가 포함됩니다.
   1. 제목 또는 이름
   2. Id: Uptycs 감지 ID
   3. Score: Uptycs가 계산한 점수
   4. Alerts: 감지와 관련된 경고 목록
   5. Events: 감지와 관련된 이벤트 목록
   5. Attack Matrix: 경고 및 이벤트와 관련된 테크닉
   7. Asset details: 자산 ID 및 호스트 이름
   8. Uptycs 플랫폼으로 이동하는 Uptycs URL

## 설정

이 통합을 설정하려면 Uptycs 계정이 있어야 합니다. Uptycs 고객이 아닌 경우 [문의][2]하여 Uptycs 계정을 신청하세요.
Datadog API 키도 필요합니다.

### 설정

1. [Datadog API 키][3]를 생성합니다.
2. Datadog API 키를 사용하여 Uptycs 플랫폼에서 Datadog Integration Destination을 만듭니다.
   1. Configuration > Destinations로 이동합니다.
   2. New destination을 클릭합니다.
   3. **Datadog** 대상 유형을 선택합니다.
   4. 대상 이름, Datadog 도메인, API 키를 입력합니다. 템플릿 필드에 경고 또는 감지용 사용자 지정 템플릿을 추가할 수도 있습니다.

      ![통합 설정 1][4]

   5. **Save**를 클릭합니다.
3. 대상을 설정한 후 해당 대상에 대한 전달 규칙을 만듭니다.
   1. Configuration > Detection Forwarding Rules > New rule로 이동합니다.
   2. 이름과 설명을 입력한 다음 규칙에 대한 관련 기준을 선택합니다.
   3. 'Destinations' 옵션에서 새로 만든 대상을 선택합니다.

      ![통합 설정 2][5]

   4. Enable Rule을 선택하고 **Save**를 클릭합니다.
4. 생성된 대상은 경고 전달에 사용될 수 있습니다.
   1. Configuration > Alert Rules로 이동합니다.
   2. Alert Rule을 선택하거나 여러 규칙을 한꺼번에 선택합니다.
   3. 'Destinations' 옵션에서 새로 만든 대상을 선택합니다.
   4. 'Notify on Every Alert' 및 'Close After Delivery'를 선택합니다.

      ![통합 설정 3][6]

   5. **Save**를 클릭합니다.
6. Uptycs가 경고나 감지를 생성하면 Datadog 이벤트로 전달됩니다.

## 트러블슈팅

도움이 필요하신가요? [고객지원팀][1]에 문의하세요.

[1]: https://www.uptycs.com
[2]: https://www.uptycs.com/about/contact/
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_2.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/uptycs/images/integration_setup_3.png
[7]: mailto:support@uptycs.com