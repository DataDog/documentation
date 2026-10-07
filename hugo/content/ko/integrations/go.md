---
categories:
- 언어
- 추적
custom_kind: 통합
dependencies: []
description: Datadog 클라이언트 라이브러리로 Go 애플리케이션에서 런타임 메트릭을 전송합니다.
doc_link: https://docs.datadoghq.com/integrations/go/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: 블로그
  text: Golang 로그 수집, 표준화, 중앙화하는 방법
- link: https://www.datadoghq.com/blog/go-memory-metrics/
  tag: 블로그
  text: Go 메모리 메트릭 디미스티파이드(demystified)
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
integration_version: ''
is_public: true
manifest_version: '1.0'
name: go
public_title: Datadog-Go 통합
short_description: Datadog 클라이언트 라이브러리로 Go 애플리케이션에서 런타임 메트릭을 전송합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Go 통합으로 Go 애플리케이션 로그, 트레이스, 커스텀 메트릭을 수집 및 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

[DogStatsD으로 Go 커스텀 메트릭 수집하기][1] 전용 지침을 참조하세요.

### 트레이스 수집

[Go 애플리케이션 계측하기][2] 전용 지침을 참조하여 트레이스를 Datadog으로 전송합니다.

### 로그 수집

_에이전트 v6.0+에서 사용 가능_

[Go 로그 수집을 설정][3]하여 로그를 Datadog으로 전달하는 방법을 알아보려면 전용 지침을 참조하세요.

### 프로파일 수집

[Go 프로파일러 활성화][4] 전용 지침을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "go" >}}


### 이벤트

Go 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Go 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/ko/tracing/setup/go/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/go/
[4]: https://docs.datadoghq.com/ko/profiler/enabling/go/
[5]: https://docs.datadoghq.com/ko/help/