---
description: 기존 로그 소스를 Datadog으로 보내고 Splunk에서 구축한 검색, 알림 및 대시보드를 변환하세요.
further_reading:
- link: /logs/log_collection/
  tag: 문서
  text: 로그 수집 및 통합
- link: /logs/explorer/search_syntax/
  tag: 문서
  text: 로그 검색 구문
- link: /logs/log_configuration/indexes/
  tag: 문서
  text: 로그 인덱스
title: 마이그레이션
---
## 개요 {#overview}

Datadog Log Management로 전환하는 과정은 로그를 Datadog으로 전송하고 팀이 사용하는 검색, 알림 및 대시보드를 다시 만드는 두 부분으로 나뉩니다.

## 로그를 Datadog으로 전송{#send-your-logs-to-datadog}

[Datadog Agent][1]를 구성하여 파일, 컨테이너 및 네트워크 소스에서 로그를 수집하세요. 로그 수집을 지원하는 [Integrations][2]에는 자체 로그 구성이 포함되어 있습니다.

## 쿼리 및 자산 변환 {#translate-your-queries-and-assets}

로그가 Datadog에 들어오면 [Migration Tools][3]를 사용하여 Splunk Processing Language (SPL)를 Datadog [로그 검색 구문][4]으로 변환하십시오. 한 번에 하나의 쿼리를 변환하거나 Splunk 알림 및 대시보드의 쿼리를 일괄 변환하여 Datadog 모니터 및 대시보드를 생성하는 데 사용할 수 있습니다. Migration Tools는 소스 플랫폼으로 Splunk만 지원합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/logs/
[2]: /ko/integrations/
[3]: /ko/logs/migration/migration_tools/
[4]: /ko/logs/explorer/search_syntax/