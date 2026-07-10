---
categories:
- languages
- log collection
- tracing
custom_kind: integration
dependencies: []
description: Datadog 클라이언트 라이브러리를 사용하여 Ruby 애플리케이션에서 커스텀 메트릭을 보내세요.
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Rails 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Rails 로그 수집 및 모니터링
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: 블로그
  text: Rails 애플리케이션 로그를 수집, 사용자 정의 및 관리하는 방법
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ruby
public_title: Datadog-Ruby 통합
short_description: Datadog 클라이언트 라이브러리를 사용하여 Ruby 애플리케이션에서 커스텀 메트릭을 보내세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Ruby 통합을 사용하면 Ruby 애플리케이션 로그, 트레이스 및 커스텀 메트릭을 수집하고 모니터링할 수 있습니다.

## 설정

### 메트릭 수집

[DogStatsD로 Ruby 커스텀 메트릭 수집][1]에 관한 설명서를 참조하세요.

### 트레이스 수집

트레이스를 Datadog으로 보내려면 [Ruby 애플리케이션 계측][2]에 대한 설명서를 참조하세요.

### 로그 수집

* 에이전트 v6.0 이상*에서 사용 가능

로그를 Datadog에 전달하려면 [Ruby 로그 수집 설정][3] 방법에 대한 설명서를 참조하세요.

### 프로파일 수집

[Ruby 프로파일러 활성화][4]에 대한 설명서를 참조하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/ko/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/ko/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/ko/profiler/enabling/ruby/
[5]: https://docs.datadoghq.com/ko/help/