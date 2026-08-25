---
app_id: splunk
app_uuid: a3e6047c-501a-4a70-a465-19c0f117d1ac
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 70
    source_type_name: Splunk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- notifications
- event management
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: splunk
integration_id: splunk
integration_title: Splunk
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: splunk
public_title: Splunk
short_description: Splunk에서 이벤트를 캡처하고 핵심 메트릭 그래프에 오버레이합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::알림
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Splunk에서 이벤트를 캡처하고 핵심 메트릭 그래프에 오버레이합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/integrate-splunk-datadog-put-microscope-application-monitoring/
  support: README.md#Support
  title: Splunk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Splunk 로그 모니터링을 연결하면 다음이 가능합니다.

- 보고서와 관련한 알림을 받습니다.
- 기타 메트릭과 보고서를 연계합니다.
- 해당 이벤트와 관련해 팀과 협력합니다.

## 설정

### 설치

Splunk에서 Datadog로 보고서를 받으려면 Splunk 서버에 설치된 `datadog` 파이썬 라이브러리가 필요합니다.

```bash
pip install datadog
```

완료되면 [API 및 애플리케이션 키를 가져온 뒤][1] 다음 `dog-splunk.sh` 스크립트를 \$SPLUNK_HOME/bin/scripts에 드롭합니다.

```bash

export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

스크립트가 실행 가능하며 `splunk` 사용자 및 그룹 소유인지 확인하세요.

스크립트가 있으면 새 보고서를 생성하거나 기존 보고서로 이동합니다. **Edit Schedule**를 클릭한 다음 **Schedule the Report** 옆에 있는 확인란을 확인합니다. **Run a Script** 옵션을 선택한 경우 파일 이름 텍스트 상자에 `dog-splunk.sh`를 입력합니다. **저장**을 클릭하면 이벤트 스트림에 결과가 표시되기 시작합니다.

## 트러블슈팅

`splunkd.log`의 `runshellscript` 매 실행마다 오류 코드가 나타나는 경우 마지막 명령 끝에  `> dog_splunk_trace.txt 2>&1`를 추가해 봅니다. 그러면 `$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt` 파일이 생성되고 문제와 관련한 상세 정보를 제공합니다.

트레이스 파일 `dog: error: unrecognized arguments: OR failed OR severe` 뒤에 `dog` 명령과 관련해 사용량 도움말 등이 포함된 경우, 마지막 줄의 `\$SPLUNK_ARG_3`에 작은 따옴표를 추가합니다.

트레이스 파일에 `pkg_resources.DistributionNotFound` 또는 유사 구문으로 끝나는 트레이스백이 포함된 경우 `dog-splunk.sh` 스크립트 상단에 세 개의 `unset`을 추가합니다.

```bash
#!/bin/bash
unset PYTHONHOME
unset PYTHONPATH
unset LD_LIBRARY_PATH
export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

## 참고 자료

### Knowledge base

스크립트 파일은 Splunk에서 제공하는 변수를 사용합니다. 메시지를 커스터마이징하려면 다음 변수 표를 참조하세요.

|                |                                                                             |
| :------------- | :-------------------------------------------------------------------------- |
| \$SPLUNK_ARG_0 | 스크립트 이름                                                                 |
| \$SPLUNK_ARG_1 | 반환된 이벤트 개수                                                   |
| \$SPLUNK_ARG_2 | 검색어                                                                |
| \$SPLUNK_ARG_3 | 완전한 적격 쿼리문                                                |
| \$SPLUNK_ARG_4 | 저장된 검색 이름                                                        |
| \$SPLUNK_ARG_5 | 트리거 사유(예: "이벤트 수가 1보다 큼")     |
| \$SPLUNK_ARG_6 | 저장된 검색을 확인할 수 있는 브라우저 URL                                        |
| \$SPLUNK_ARG_7 | _버전 3.6에서 제거된 옵션_                                             |
| \$SPLUNK_ARG_8 | 이 검색 결과가 저장된 파일(원시 결과 포함) |

이벤트 텍스트를 수정하고, 예를 들어 Datadog의 @멘션 기능을 사용해, 이 보고 내용을 사람들에게 알릴 수 있습니다.

---

## 참고 자료

- [Datadog 및 Splunk를 사용한 메트릭 및 로그 연계][2]

_이 문서는 2015년 10월 28일에 [Splunk Enterprise AMI on AWS][3]를 사용해 검증되었습니다_

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://www.datadoghq.com/blog/integrate-splunk-datadog-put-microscope-application-monitoring/
[3]: https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3