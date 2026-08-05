---
app_id: loadrunner-professional
app_uuid: e6b5ab52-139d-4dde-a4ad-94fedeac7f29
assets:
  dashboards:
    loadrunner_professional_overview: assets/dashboards/loadrunner_professional_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - loadrunner.vusers.running
      - loadrunner.vusers.ready
      - loadrunner.vusers.finished
      - loadrunner.vusers.error
      - loadrunner.total.transactions.passed.per.sec
      - loadrunner.transaction.response_time
      - loadrunner.transaction.passed
      - loadrunner.transaction.failed
      - loadrunner.transaction.stopped
      metadata_path: metadata.csv
      prefix: loadrunner.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8492858
    source_type_name: LoadRunner Professional
  logs:
    source: loadrunner
author:
  homepage: https://www.microfocus.com/en-us/products/loadrunner-professional/overview
  name: OpenText
  sales_email: dmcleish@opentext.com
  support_email: MFI-Supportline@opentext.com
categories:
- 테스트
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/README.md
display_on_public_website: true
draft: false
git_integration_title: loadrunner_professional
integration_id: loadrunner-professional
integration_title: LoadRunner Professional
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: loadrunner_professional
public_title: LoadRunner Professional
short_description: LoadRunner Professional 메트릭과 시나리오 실행 정보를 Datadog으로 보내세요
supported_os:
- windows
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Windows
  - 지원 OS::Linux
  - Category::Testing
  - 제공::통합
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: LoadRunner Professional 메트릭과 시나리오 실행 정보를 Datadog으로 보내세요
  media:
  - caption: Controller Design 탭
    image_url: images/controller_design.png
    media_type: image
  - caption: Controller Run 탭
    image_url: images/controller_run.png
    media_type: image
  - caption: Analysis Summary Report
    image_url: images/analysis_summary.png
    media_type: image
  - caption: Vugen New Script
    image_url: images/vugen_new.png
    media_type: image
  - caption: Datadog 구성 창
    image_url: images/datadog_configuration_window.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: LoadRunner Professional
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

OpenText LoadRunner Professional은 다양한 애플리케이션의 성능을 테스트하여, 서비스 출시 전에 문제를 식별하고 해결할 수 있도록 지원하는 부하 테스트 솔루션입니다.

LoadRunner Controller는 LoadRunner Professional 시나리오를 생성하고 관리하는 도구입니다. 시나리오는 각 테스트 세션 동안 발생하는 이벤트를 정의합니다. 에뮬레이션할 사용자 수(가상 사용자 또는 Vuser), 사용자가 하는 작업, 그리고 에뮬레이션을 실행하는 컴퓨터를 제어합니다. 시나리오를 사용하여 부하 테스트를 생성하고 서버의 안정성과 성능을 확인할 수 있습니다.

이러한 통합을 통해 Controller는 시나리오 실행에서 얻은 실시간 메트릭과 데이터를 Datadog으로 푸시합니다.

|   |   |
|---|---|
|__Send scenario information__| 시작 및 종료 시간, 기간, 포함된 스크립트 등 시나리오 실행에 관한 정보를 로그 형태로 보냅니다.
|__Send run metrics__| Vuser 상태 및 트랜잭션 응답 시간과 같은 시나리오 실행에 관한 메트릭을 보냅니다. |

## 설정

Datadog에 데이터를 푸시하도록 LoadRunner Controller를 구성합니다. 시나리오 정보, 실행 메트릭, 또는 둘 다 전송할지 선택할 수 있습니다. 이 통합을 구성하면 미리 구성된 위젯에서 데이터를 확인할 수 있는 Datadog 대시보드가 제공됩니다.

1.  Controller를 엽니다.
2.  Controller 도구 모음에서 __Tools > Datadog Configuration__을 선택합니다.
3.  __Site__ 필드에서 해당 [Datadog 사이트][1]를 선택합니다.
4.  __API key__ 필드에 Datadog이 생성한 [API 키][2]를 입력합니다.
5.  __Test Connection__을 클릭합니다.
6.  연결이 성공하면, Datadog으로 시나리오 정보, 실행 메트릭, 또는 둘 모두를 전송할지 선택합니다.
7.  Controller가 시나리오 정보를 전송하도록 설정하면, 이 통합에 포함된 로그 파이프라인이 자동으로 로그를 처리하고 관련 태그를 추가합니다. 파이프라인에 관한 자세한 내용은 Logs > Pipelines in Datadog에서 확인하세요.
8.  Datadog에서는 __LoadRunner Professional Dashboard__가 통합과 함께 자동으로 설치됩니다. 이 대시보드에는 실행 메트릭과 시나리오 정보(Controller가 전송하도록 구성된 데이터에 따라 다름)를 표시하는 위젯이 포함되어 있습니다.

Controller가 Datadog에 데이터를 푸시하도록 구성되면 Controller에서 시나리오를 실행할 때마다 데이터가 푸시됩니다. Controller가 Datadog에 데이터를 푸시하는 것을 비활성화하려면 __Tools > Datadog Configuration__을 선택하고 Datadog Configuration 대화 상자에서 해당 필드를 삭제하세요.

![Datadog 구성 창][3]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "loadrunner_professional" >}}


### 서비스 점검

LoadRunner Professional은 서비스 점검을 포함하지 않습니다.

### 이벤트

LoadRunner Professional은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [LoadRunner Professional 문서][5]를 참고하거나 [Datadog 지원팀][6]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/getting_started/site/
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/loadrunner_professional/images/datadog_configuration_window.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/metadata.csv
[5]: https://admhelp.microfocus.com/lr
[6]: https://docs.datadoghq.com/ko/help/