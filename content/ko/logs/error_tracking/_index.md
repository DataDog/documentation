---
description: 로그 관리를 위한 오류 추적에 대해 자세히 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog 오류 추적을 통해 애플리케이션 문제 파악
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: 블로그
  text: Datadog 오류 추적으로 로그의 오류 추적 및 분류
- link: /logs/error_tracking/explorer
  tag: 설명서
  text: 오류 추적 탐색기에 대해 알아보기
- link: /monitors/types/error_tracking/
  tag: 설명서
  text: 오류 추적 모니터 만들기
is_beta: true
kind: 설명서
title: 로그 오류 추적
---

## 개요

{{< img src="logs/error_tracking/logs-error-tracking-explorer.png" alt="오류 추적 탐색기 문제 세부 정보" style="width:100%;" >}}

{{% error-tracking-description %}}

[오류 추적 탐색기][3] 설명서에서 주요 오류 추적 기능에 대해 살펴 보세요. Datadog에서 로그 오류 추적 탐색기를 보려면 [**로그** > **오류 추적**][1]으로 이동하세요.

## 설정

로그에 대한 오류 추적은 적절하게 설정된 오류 로그와 스택 트레이스를 처리합니다.

{{< whatsnext desc="로그에 대한 Datadog 오류 추적을 시작하려면 프레임워크에서 해당하는 설명서를 참조하세요." >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}브라우저 및 모바일{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}백엔드{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: /ko/logs/log_collection
[3]: /ko/error_tracking/explorer