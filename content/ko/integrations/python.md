---
categories:
- languages
- log collection
- tracing
custom_kind: 통합
dependencies: []
description: 파이썬(Python) 애플리케이션에서 메트릭, 트레이스, 로그 및 프로필 데이터를 수집하세요.
doc_link: https://docs.datadoghq.com/integrations/python/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/tracing-async-python-code/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM)을 사용해 비동기 파이썬(Python) 코드를 추적하세요.
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: 블로그
  text: '파이썬 로그 수집, 커스텀화 및 중앙화 방법 '
git_integration_title: 파이썬(Python)
has_logo: true
integration_id: 파이썬(Python)
integration_title: 파이썬(Python)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: 파이썬(Python)
public_title: 'Datadog-파이썬(Python) 통합 '
short_description: 파이썬(Python) 애플리케이션에서 메트릭, 트레이스, 로그 및 프로필 데이터를 수집하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

파이썬 통합을 사용하면, 파이썬 애플리케이션 로그, 트레이스, 커스텀 메트릭을 수집하고 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

파이썬 커스텀 메트릭과 DogStatsD][1] 전용 설명서를 참조하세요.

### 트레이스 수집

[파이썬 애플리케이션 계측하기][2]에 대한 설명서를 참조하여 Datadog에 트레이스를 전송하세요.

### 로그 수집

_에이전트 v6.0+에서 사용 가능_

[파이썬 로그 수집 설정][3] 방법을 통해 Datadog에 로그를 전달하는 방법은 설명서를 참조하세요.

### 프로파일 수집

[파이썬 프로파일로 활성화][4]를 위한 설명서를 참조하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=python
[2]: https://docs.datadoghq.com/ko/tracing/setup/python/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/python/
[4]: https://docs.datadoghq.com/ko/profiler/enabling/python/
[5]: https://docs.datadoghq.com/ko/help/