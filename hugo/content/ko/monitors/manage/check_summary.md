---
aliases:
- /ko/monitors/check_summary/
description: Datadog에 보고하는 모든 점검 목록을 봅니다.
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성 방법 알아보기
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
- link: /monitors/manage/
  tag: 설명서
  text: 모니터 관리
title: 점검 요약
---

## 개요

Datadog 점검은 실행 시마다 상태를 보고합니다. [점검 요약 페이지][1]에는 지난 하루 동안 보고된 점검 항목이 표시됩니다. 다음 상태일 수 있습니다.

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## 검색

특정 점검 항목을 찾으려면 점검 요약 페이지에서 `filter checks` 검색 창을 사용하세요. 점검 이름을 클릭하면 상태와 점검 항목과 관련된 태그를 확인할 수 있습니다. 점검 패널 안에 있는 `filter checks` 검색 창을 사용해 목록을 더욱 세밀하게 필터링하세요.

{{< img src="monitors/check_summary/check_search.png" alt="상세 정보 점검" style="width:100%;">}}

## 대시보드

대시보드에서 점검 상태를 확인하려면 [점검 상태 위젯][2]을 활용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /ko/dashboards/widgets/check_status/