---
aliases:
- /ko/logs/faq/how-to-remap-custom-severity-values-to-the-official-log-status
further_reading:
- link: logs/log_collection/#custom-log-collection
  tag: 설명서
  text: 에이전트로 로그 수집하는 방법 알아보기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
title: 공식 로그 상태에 커스텀 심각도 값 리매핑하기
---

기본적으로 [로그 상태 리매퍼][1]는 [Syslog 심각도 표준][2]에 따라 결정됩니다.
그러나 다른 심각도 값을 사용하는 시스템이 있고 해당 시스템의 심각도 값으로 공식 로그 상태를 리매핑하고 싶을 수 있습니다.
커스텀 값과 예측 값의 매핑을 정의하는 [카테고리 프로세서][3]를 사용하면 공식 로그 상태를 리매핑할 수 있습니다.

이 페이지에서는 공식 로그 상태를 리매핑하는 두 가지 방법(Bunyan 레벨과 웹 액세스 로그)을 설명합니다.

## 웹 액세스 로그

요청 상태 코드는 로그 상태를 결정하는 데 사용됩니다. Datadog 통합에서는 다음 매핑을 사용합니다.

* 2xx: OK
* 3xx: Notice
* 4xx: Warning
* 5xx: Error

Datadog에서는 로그 상태 코드가 `http.status_code` 속성에 저장된다고 가정합니다.
파이프라인에 카테고리 프로세서를 추가해 위 매핑을 반영하는 새 속성을 만드세요.

{{< img src="logs/guide/category_processor.png" alt="카테고리 프로세서" >}}

그 후 새로 만든 속성을 사용하는 상태 리매퍼를 추가하세요.

{{< img src="logs/guide/log_status_remapper.png" alt="로그 상태 리매퍼" >}}

## Bunyan 레벨

Bunyan 레벨은 Syslog와 비슷하지만, Syslog 레벨에서 10을 곱한 수입니다.

* 10 = TRACE
* 20 = DEBUG
* 30 = INFO
* 40 = WARN
* 50 = ERROR
* 60 = FATAL

Datadog에서는 Bunyan 레벨이 `bunyan_level` 속성에 저장된다고 가정합니다.
파이프라인에 카테고리 프로세서를 추가해 위 매핑을 반영하는 새 속성을 만드세요.

{{< img src="logs/guide/category_processor_bunyan.png" alt="카테고리 프로세서 Bunyan" >}}

그 후 새로 만든 속성을 사용하는 상태 리매퍼를 추가하세요.

{{< img src="logs/guide/status_remapper_bunyan.png" alt="로그 상태 리매퍼 Bunyan" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /ko/logs/log_configuration/processors/#category-processor