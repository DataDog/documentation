---
categories:
- automation
- configuration & deployment
- developer tools
- orchestration
- provisioning
dependencies: []
description: 배포를 캡처 및 검색하고 핵심 메트릭 그래프에 오버레이하세요.
doc_link: https://docs.datadoghq.com/integrations/capistrano/
draft: false
git_integration_title: capistrano
has_logo: true
integration_id: capistrano
integration_title: Capistrano
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: capistrano
public_title: Datadog-Capistrano 통합
short_description: 배포를 캡처 및 검색하고 핵심 메트릭 그래프에 오버레이하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[Capistrano][1]는 원격 서버 자동화와 배포 툴로 루비(Ruby)로 작성되었습니다.

Capistrano Datadog 통합을 설치하여 다음 작업을 수행할 수 있습니다.

- 이벤트 스트림에서 이벤트 배포 캡처 및 검색
- 대시보드 내에서 다른 메트릭을 포함하는 이벤트 배포를 오버레이하여 어떤 배포가 애플리케이션의 성능에 영향을 미치는지 식별

제공된 `Capfile`에 대해 이 통합을 활성화하면 완료된 각 Capistrano 작업이 Datadog에 이벤트로 제출됩니다. 역할 정보와 로깅 출력 또한 제출됩니다. 

## 설정

### 설치

`dogapi` 루비(Ruby) 젬을 설치합니다.

```shell
sudo gem install dogapi --version ">=1.10.0"
```

### 설정

Datadog에 전송하려는 작업이 있는 `Capfile` 시작에 다음을 추가합니다.

```text
require "capistrano/datadog"
set :datadog_api_key, "${your_api_key}"
```

### 검증

`Capfile`를 설정한 후 최소 하나의 Capistrano 작업에서 실행합니다.

1. [이벤트 스트림][2]으로 이동합니다.
2. 검색 바에 `sources:capistrano`를 입력하거나 왼쪽에 있는 통합 소스(FROM) 목록에서 'Capistrano'를 클릭합니다.
3. 검색 바에서 `priority:all`를 입력하거나 왼쪽에 있는 우선순위(PRIORITY) 목록에서 '전체'를 클릭합니다. Capistrano는 기본적으로 낮은 우선순위로 제출되므로 기본 이벤트 스트림 보기(중간 우선순위)를 사용해 표시되지 않습니다.

{{< img src="integrations/capistrano/capistranoevents.mp4" video="true" >}}

## 수집한 데이터

### 메트릭

Capistrano 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Capistrano 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Capistrano 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: http://capistranorb.com
[2]: https://app.datadoghq.com/event/stream
[3]: https://docs.datadoghq.com/ko/help/