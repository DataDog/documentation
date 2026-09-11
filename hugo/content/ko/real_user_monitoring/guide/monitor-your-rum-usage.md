---
description: RUM 사용량을 모니터링하는 방법과 예상치 못하게 사용량이 급증하거나 사용량 임곗값에 도달했을 때 경고 알림을 받는 방법을
  배우세요.
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: 실시간 사용자 모니터링에 대해 알아보기
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 이벤트 쿼리하는 방법 알아보기
- link: /monitors/
  tag: 설명서
  text: 모니터링에 대해 알아보기
title: RUM 사용량 모니터링
---

## 개요

이 가이드에서는 다음을 이용해 RUM 사용량을 모니터링하는 방법을 설명합니다.

- RUM 예상 사용량 메트릭
- 계정에 저장된 RUM 이벤트

이 가이드에서는 특정 SKU나 애플리케이션 가격에 따른 RUM 세션의 양을 추적하고, 트래픽 급증 알림을 설정하고, 내 세션의 예산 임곗값에 가까워질 때 알림을 받는 방법을 설명합니다. 

## RUM 사용량 메트릭

이 메트릭은 무료이며 15개월 동안 사용할 수 있습니다.

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/estimated-usage-metric-details.png" alt="예상 사용량 메트릭 상세 측면 패널" style="width:90%" >}}

기본적으로 RUM `datadog.estimated_usage.rum.sessions` [메트릭][1]을 사용해 다음 정보의 사용자 세션 개수를 추적할 수 있습니다.

- 애플리케이션 ID: **Application Overview** 페이지에서 사용할 수 있는 애플리케이션 식별
- 서비스: RUM 애플리케이션 내 팀에 주어진 범위
- 소스: 프레임워크를 빌드한 프로그래밍 언어
- SKU: 세션이 소속된 요금 플랜

### 애플리케이션의 세션 개수 추적하기

RUM 애플리케이션이 생성한 세션 개수를 추적하려면 [Dashboard List][2]로 이동해 대시보드를 선택하여 RUM 사용량 추세를 추적할 수 있습니다.

1. **+ Add Widgets**를 클릭해 위젯 및 앱 측면 패널을 엽니다.
2. **Graphs** 아래에 있는 **Timeseries**를 선택하세요.
3. **Graph your data** 아래에서 **Metrics**를 선택하고 드롭다운 메뉴에서 `datadog.estimated_usage.rum.sessions`를 선택하세요.
4. `from` 절에서 추적하고자 하는 애플리케이션 ID를 선택하세요. RUM 애플리케이션 ID는 **Application Overview** 페이지에서 확인할 수 있습니다.
5. 원하는 디스플레이를 설정하고 그래프 이름을 입력하세요.
6. **Save**를 클릭합니다.

### SKU 가격에 따라 세션 개수 추적하기

주어진 RUM SKU 가격에 따라 세션 개수를 추적하려면, [Dashboard List][2]로 이동해 대시보드를 선택하여 RUM 사용량 추세를 추적할 수 있습니다.

1. **+ Add Widgets**를 클릭해 위젯 및 앱 측면 패널을 엽니다.
2. **Graphs** 아래에 있는 **Timeseries**를 선택하세요.
3. **Graph your data** 아래에서 **Metrics**를 선택하고 드롭다운 메뉴에서 `datadog.estimated_usage.rum.sessions`를 선택하세요.
4. `sum` 절의 드롭다운 메뉴에서 `sku` 태그를 선택하세요.
5. 원하는 디스플레이를 설정하고 그래프 이름을 입력하세요.
6. **Save**를 클릭합니다.

## 예상치 못한 급증 알림

[이상 감지 모니터][3]에서 RUM 메트릭을 사용할 수 있습니다.

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notification.png" alt="이상 감지 모니터 알림 메시지 예시" style="width:90%" >}}

이상 감지 모니터를 생성해 예상치 못한 세션의 개수가 급증할 때 알림을 받으려면 다음을 따르세요.

1. RUM 애플리케이션의 **Application Overview** 페이지로 이동해 애플리케이션 ID를 복사하세요.
2. [이상 감지 모니터를 생성][4]합니다.
3. 드롭다운 메뉴에서 `datadog.estimated_usage.rum.sessions` 메트릭을 선택하세요.
4. `from` 절에 RUM 애플리케이션에서 트래픽 급증이나 이벤트 전송 중단이 발생할 경우 알림을 받을 `application.id`를 입력하세요.
5. 알림 조건을 사용 사례에 맞도록 설정하세요(예: 평가 시간 또는 예상 범위를 벗어난 횟수)
6. 작업 지침과 함께 알림 메시지를 설정하세요.

   이 알림 메시지 예시에는 컨텍스트 링크가 포함되어 있습니다.

   ```
   An unexpected amount of sessions has been captured for application.id {{application.id}}.

   1. [Check the session count in the RUM Explorer for this application](https://app.datadoghq.com/rum/explorer?query=%40type%3Asession%20%40application.id%{{application.id}}&viz=timeseries&from_ts=1649824870521&to_ts=1649828470521&live=true).
   2. [Investigate whether this session count is unexpected in a specific geography or device using the query engine](https://docs.datadoghq.com/real_user_monitoring/explorer/group/).
   ```

7. 이 모니터에 권한과 알림 설정을 지정합니다.
8. **생성**을 클릭합니다.

## 고정 임곗값이 있는 RUM 세션 모니터링하기

{{< img src="real_user_monitoring/guide/monitor-your-rum-usage/anomaly-monitor-notifications-warning-rate.png" alt="이상 모니터링에서 경고 수치가 표시된 예시 알림 메시지" style="width:90%" >}}

이상 감지 모니터를 생성하여 세션 개수가 예상치 못하게 급증하고 임곗값에 가까워질 때 알림을 받으려면 다음을 따르세요.

1. [Datadog RUM Explorer][5] 보기로 이동합니다.
2. 모니터링하고자 하는 볼륨을 대표하는 검색 쿼리를 빌드하세요. 사용자 세션 전체를 모니터링하고 싶을 경우에는 쿼리를 빈 상태로 남겨두세요.
3. **Export to monitor**를 클릭하세요.
4. `warning` 또는 `error`로 설정하고자 하는 수치를 정의하세요.
5. 구체적인 알림 메시지를 설정하세요.

   이 알림 메시지 예시에는 작업 지침이 포함되어 있습니다.

   ```
   Shopist.io is sending too many user sessions. Go to the application's codebase and decrease the sample rate. Here is the (documentation)[https://docs.datadoghq.com/real_user_monitoring/guide/sampling-browser-plans] for how to do so.

   {{#is_warning}}@slack-Shopist-alerts {{/is_warning}}

   {{#is_alert}}@pagerduty-shopist{{/is_alert}}
   ```

6. 이 모니터에 권한과 알림 설정을 지정합니다.
7. **생성**을 클릭합니다.

애플리케이션의 어떤 범위(예: `application.id`, `geography`, `device` 등)에서든 세션 양에 관해 알림을 받을 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/usage_metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ko/monitors/types/anomaly/
[4]: https://app.datadoghq.com/monitors#create/anomaly
[5]: https://app.datadoghq.com/rum/explorer?query=%40type%3Asession