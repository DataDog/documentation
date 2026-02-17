---
app_id: cribl-stream
app_uuid: 2ef15aea-af91-4769-940c-2b124e4d04a6
assets:
  dashboards:
    cribl_stream_overview: 자산/대시보드/cribl_stream_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cribl.logstream.health.outputs
      metadata_path: metadata.csv
      prefix: cribl.logstream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10391
    source_type_name: Cribl
author:
  homepage: https://cribl.io
  name: Cribl
  sales_email: sales@cribl.io
  support_email: support@cribl.io
categories:
- aws
- azure
- 클라우드
- containers
- 쿠버네티스(Kubernetes)
- google cloud
- log collection
- 보안
- metrics
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/README.md
display_on_public_website: true
draft: false
git_integration_title: cribl_stream
integration_id: cribl-stream
integration_title: Cribl Stream
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cribl_stream
public_title: Cribl Stream
short_description: 벤더 중립적인 데이터 원격 분석 파이프라인으로 통합 가시성 데이터 수집
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원되는 OS::Linux
  - 지원되는 OS::Windows
  - Submitted Data Type::Metrics
  - Category::AWS
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Google Cloud
  - Category::Log Collection
  - 카테고리::보안
  - Category::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: 벤더 중립적인 데이터 원격 분석 파이프라인으로 통합 가시성 데이터 수집
  media:
  - caption: 변화의 중심인 관찰 가능성
    image_url: images/observability_changes.png
    media_type: 비디오
    vimeo_id: 567294419
  - caption: Datadog용 Cribl Stream 대시보드
    image_url: images/cribl_dashboard_for_datadog.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cribl Stream
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
[Cribl Stream][1]은 머신 데이터 로그, 계측 데이터, 애플리케이션 데이터, 메트릭을 실시간으로 처리하여 원하는 분석 플랫폼으로 전송할 수 있도록 지원합니다. 다음을 수행할 수 있습니다.

- 외부 데이터 원본의 정보로 데이터를 보강하여 데이터에 컨텍스트를 추가하세요.
- 민감한 필드를 삭제, 난독화 또는 암호화하여 데이터를 보호하세요.
- 성능 및 비용 요구 사항에 따라 데이터를 최적화하세요.

자체 호스팅된 Cribl Stream 버전용입니다.

기본 제공 대시보드를 사용하여 초당 이벤트, 초당 바이트, 입력 유형, 출력 유형, 인프라 메트릭과 같은 기본 메트릭으로 스트림의 성능을 확인할 수 있습니다. 이벤트 또는 바이트별 감소율을 모니터링하면, 검색 성능이나 분석 시스템의 라이선스 및 인프라 비용을 개선하는 데 유용합니다.

## 설정
Cribl 스트림 [내부 메트릭][2]을 Datadog API로 전송할 수 있습니다. 

### 설치

#### Datadog
조직 설정에서 [_API Keys_][3]로 이동하여 Cribl이 데이터를 전송할 API 키를 생성합니다.

#### Cribl
1. Cribl에서 _Quick Connects_로 이동하여 _+Add Source_ 버튼을 클릭합니다. 
![step1][4]
2. _System Internal_ 까지 아래로 스크롤하여 _Cribl Internal_  위로 마우스를 가져간 후 _Select Existing_을 선택합니다. _CriblLogs_와 _CriblMetrics_를 모두 활성화합니다.  
 - **참고**: 두 소스 모두 **Routes** 대신 **Quick Connect**가 활성화되어 있어야 합니다.
![step3][5]

3. _+Add Destination_ 버튼을 클릭합니다.
4. _Datadog_ 타일로 스크롤하여 _+Add New_를 클릭합니다.
5. 입력에 이름을 지정합니다(예: Cribl_Datadog).
![step4][6]

6. 다음으로 _Datadog API Key_를 입력하고 Datadog 사이트를 선택합니다.
7. Datadog 태그, 메시지 필드, 소스 또는 호스트 정보를 추가합니다. 자세한 내용은 [Cribl Datadog 목적지 설명서][7]를 참조하세요.
8. _Save_를 클릭하세요.
10. _Passthru_를 선택하여 Cribl Metrics를 Datadog 목적지에 연결합니다.
![step5][8]

![complete][9]

## 삭제
Cribl Stream 대시보드 설정에서 [대시보드 삭제][10] 옵션을 사용하여 Cribl Stream 대시보드를 삭제합니다. 데이터 전송을 중지하려면 Cribl Stream 배포에서 Datadog 목적지를 제거합니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "cribl-stream" >}}

### 이벤트
Cribl Stream 통합에는 이벤트가 포함되지 않습니다.
### 서비스 점검
Cribl Stream 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Cribl 지원팀][12]에 문의하세요.

[1]: https://cribl.io/stream
[2]: http://docs.cribl.io/logstream/sources-cribl-internal/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_3.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_4.png
[7]: https://docs.cribl.io/stream/destinations-datadog
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_6.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_5.png
[10]: https://docs.datadoghq.com/ko/dashboards/#delete-dashboard
[11]: https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/metadata.csv
[12]: https://cribl.io/support