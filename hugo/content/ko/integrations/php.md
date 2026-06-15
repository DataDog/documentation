---
categories:
- languages
- log collection
- tracing
custom_kind: 통합
dependencies: []
description: PHP 애플리케이션에서 메트릭, 트레이스, 로그 및 프로필 데이터를 수집하세요.
doc_link: https://docs.datadoghq.com/integrations/php/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: 블로그
  text: Datadog 애플리케이션 성능 모니터링(APM) 및 분산 추적을 사용한 PHP 모니터링
- link: https://www.datadoghq.com/blog/PHP-logging-guide/
  tag: 블로그
  text: PHP 로그 수집, 커스터마이즈 및 분석 방법
git_integration_title: PHP
has_logo: true
integration_id: PHP
integration_title: PHP
integration_version: ''
is_public: true
manifest_version: '1.0'
name: PHP
public_title: 'Datadog-PHP 통합 '
short_description: PHP 애플리케이션에서 메트릭, 트레이스, 로그 및 프로필 데이터를 수집하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog-PHP 통합에서 PHP 애플리케이션 로그, 트레이스, 커스텀 메트릭을 수집하고 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

[DogStatsD를 사용한 PHP 커스텀 메트릭 수집][1]에 대한 설명서를 참조하세요.

### 트레이스 수집

[PHP 애플리케이션 계측][2]에 대한 설명서를 참조하여 Datadog에 트레이스를 전송하세요.

### 로그 수집

* 에이전트 v6.0 이상*에서 사용 가능

Datadog에 로그를 전달하려면 [PHP 로그 수집 설정 방법][3]에 대한 설명서를 참조하세요.

### 프로파일 수집

[PHP 프로파일러 활성화][4]에 대한 설명서를 참조하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/ko/tracing/setup/php/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/php/
[4]: https://docs.datadoghq.com/ko/profiler/enabling/php/
[5]: https://docs.datadoghq.com/ko/help/