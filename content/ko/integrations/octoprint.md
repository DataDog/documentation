---
app_id: octoprint
app_uuid: f076efc3-c1c7-4e0a-b0dc-92870d655211
assets:
  dashboards:
    OctoPrint Overview: assets/dashboards/octoprint_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: octoprint.printer_state
      metadata_path: metadata.csv
      prefix: octoprint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10201
    source_type_name: OctoPrint
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: gwaldo@gmail.com
  support_email: gwaldo@gmail.com
categories:
- 개발 툴
- 로그 수집
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md
display_on_public_website: true
draft: false
git_integration_title: octoprint
integration_id: octoprint
integration_title: Datadog OctoPrint
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: octoprint
public_title: Datadog OctoPrint
short_description: 3D 프린터 관리용 웹 인터페이스 OctoPrint 모니터링하기
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: 3D 프린터 관리용 웹 인터페이스 OctoPrint 모니터링하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog OctoPrint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 검사는 Datadog 에이전트를 통해 [OctoPrint][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

다음을 실행하여 호스트에 OctoPrint 점검을 설치합니다.

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-octoprint==<VERSION>
```

**참고**: `VERSION`은 본 페이지 상단에 명시되어 있습니다.

#### 소스로부터 설치(옵션)

1. 모든 머신에 [개발자 툴킷][3]을 설치합니다.

2. `ddev release build octoprint`를 실행하여 패키지를 빌드합니다.

3. [Datadog 에이전트를 다운로드][4]합니다.

4. 빌드 아티팩트를 에이전트가 있는 호스트에 업로드합니다.
 `datadog-agent integration install -w
 path/to/octoprint/dist/datadog_octoprint*.whl`를 실행합니다.

### 설정

1. OctoPrint 웹 인터페이스에서 Datadog에서 사용할 API 키를 생성합니다. 본 키는 '설정 --> 애플리케이션 키'에서 확인할 수 있습니다.

2. 에이전트 설정 디렉토리의 루트의 `conf.d/` 폴더에서 `octoprint.d/conf.yaml` 파일을 편집합니다. OctoPrint API키를 `octo_api_key` 값으로 붙여넣습니다. 사용할 수 있는 설정 옵션을 모두 보려면 [octoprint.d/conf.yaml 샘플][5]을 참고하세요.

3. [에이전트를 재시작하세요][6].

### 검증

[에이전트 상태 하위 명령을 실행][7]하고 점검 섹션에서 `octoprint`를 찾으세요.

### 로그

기본적으로 본 통합은 라즈베리 파이(Raspberry Pi)에서 OctoPrint를 실행하도록 사전 설정된 [OctoPi][8] 이미지를 사용한다고 가정합니다.

기본적으로 수집하는 로그(및 기본 위치)는 다음과 같습니다.

- OctoPrint 앱 로그: `/home/pi/.octoprint/logs`
- OctoPrint Webcam 로그: `/var/log/webcamd.log`
- HA 프록시 로그: `/var/log/haproxy.log`

통합의 `conf.yaml` 파일을 수정하여 해당 항목의 일부 또는 전부를 변경하거나 삭제할 수 있습니다.

#### 로그 처리

OctoPrint는 자체 로그 형식을 사용합니다(오브젝트 형식이 아님). 해당 로그를 사용하려면 다음 예시처럼 파싱 규칙으로 로그 처리 파이프라인을 생성하세요.

1. 주요 파이프라인: "OctoPrint"
    1. 하위 파이프라인 1: "OctoPrint 프린트 작업"
        1. Grok 파서 규칙:
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. 하위 파이프라인 2: "OctoPrint 일반 로그"
        1. Grok 파서 규칙:
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

자세한 내용을 확인하려면 [Datadog 로그 처리 문서][9]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "octoprint" >}}


### 이벤트

OctoPrint는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "octoprint" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.


[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/ko/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/assets/service_checks.json
[12]: https://docs.datadoghq.com/ko/help/