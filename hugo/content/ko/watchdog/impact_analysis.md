---
description: Watchdog 영향 분석을 통해 최종 사용자에게 영향을 미치는 애플리케이션 성능 문제를 발견합니다.
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: 블로그
  text: Watchdog 영향 평가로 사용자 영향 범위 이해
- link: real_user_monitoring/explorer/watchdog_insights/
  tag: 설명서
  text: Watchdog Insights for RUM에 대해 알아보기
- link: real_user_monitoring/connect_rum_and_traces/
  tag: 설명서
  text: RUM과 트레이스 연결
title: Watchdog 영향 분석
---

## 개요

Watchdog이 APM 이상을 발견할 때마다 RUM SDK에서 제출된 다양한 레이턴시 및 오류 메트릭을 동시에 분석하여 해당 이상이 사용자가 방문한 웹 또는 모바일 페이지에 부정적인 영향을 미치는지 평가합니다.

Watchdog이 최종 사용자 경험이 영향을 받았다고 판단하면 Watchdog APM 경고에서 관련 영향의 요약을 제공합니다. 여기에는 다음이 포함됩니다.

- 영향을 받는 RUM 보기 목록
- 영향을 받는 예상 사용자 수
- (필요 시 연락하기 위한) 영향을 받는 사용자 목록에 대한 링크

{{< img src="watchdog/watchdog_impact_analysis.mp4" alt="영향을 받는 사용자 및 영향을 받는 보기 수에 대한 자세한 정보를 표시하기 위해 사용자 위로 마우스를 가져가 알약 기호를 보는 사용자"  video=true >}}

이 기능은 모든 APM 및 RUM 사용자에 대해 자동으로 활성화됩니다. Watchdog APM 경고가 최종 사용자 영향과 관계될 때마다, 영향을 받는 **사용자** 및 **경로 보기**가 Watchdog 알림의 **Impacts** 섹션에 나타납니다. 영향을 받는 사용자에게 연락해야 하는 경우 영향을 받는 사용자의 연락처 정보를 보려면 **사용자**를 클릭하세요. 영향을 받는 RUM 보기에 액세스하여 추가 정보를 보려면 **경로 보기**를 클릭하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}