---
app_id: filemage
app_uuid: e8ffcc16-9430-4d73-8e01-4e135a872384
assets:
  dashboards:
    Filemage Overview Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: filemage.ftp.get
      metadata_path: metadata.csv
      prefix: filemage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10319
    source_type_name: filemage
  logs:
    source: filemage
author:
  homepage: https://dopensource.com/
  name: 커뮤니티
  sales_email: info@dopensource.com
  support_email: tmoore@dopensource.com
categories:
- cloud
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/filemage/README.md
display_on_public_website: true
draft: false
git_integration_title: filemage
integration_id: filemage
integration_title: FileMage
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: filemage
public_title: FileMage
short_description: FileMage 서비스용 Agent 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: FileMage 서비스용 Agent 모니터링
  media:
  - caption: Carousel Logo
    image_url: images/carousel-logo.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: FileMage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 검사는 [FileMage][1]을 모니터링합니다.

## 설정

### 패키지 설치하기

Datadog Agent v7.21 또는 v6.21 이상에서는 아래 지침에 따라 호스트에 Filemage 통합을 설치하세요.
Docker Agent 또는 이전 버전의 Datadog Agent에 설치하려면 [커뮤니티 통합 사용][2]을 참조하세요.

1. 다음 명령어를 실행해 에이전트 통합을 설치하세요.

```shell
datadog-agent integration install -t datadog-filemage==1.0.0
```

2. Agent 기반 [통합][3]과 유사하게 통합을 설정합니다.

### 구성

1. [Agent 구성 디렉터리][4] 루트의 `conf.d/` 폴더에 있는 `filemage.d/conf.yaml.example` 파일을 편집하여 FileMage [메트릭](#metrics) 수집을 시작합니다. 
   완료되면 수정된 파일을 `filemage.d/conf.yaml`으로 저장합니다.  
   사용 가능한 모든 설정 옵션은 [샘플 filemage conf.yaml][5]을 참조하세요.

2. [Agent를 재시작합니다][6].

### 검증

[Agent `status` 하위 명령][7]을 실행하고 실행 중인 검사 섹션에서 `filemage`를 찾습니다.


```text
...

  Running Checks
  ==============

    ...

    filemage (1.0.0)
    ----------------
      Instance ID: filemage:ac55127bf7bd70b9 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/filemage.d/conf.yaml
      Total Runs: 1,298
      Metric Samples: Last Run: 0, Total: 0
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 2, Total: 2,594
      Average Execution Time : 41ms
      Last Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
      Last Successful Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
```


## 수집한 데이터

이 통합 기능은 각 FTP 명령이 실행된 횟수를 추적합니다.

### 메트릭
{{< get-metrics-from-git "filemage" >}}


### 이벤트

FileMage 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [dOpenSource][10]에 문의하세요.


[1]: https://www.filemage.io/
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filemage/datadog_checks/filemage/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/filemage/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filemage/assets/service_checks.json
[10]: https://dopensource.com/