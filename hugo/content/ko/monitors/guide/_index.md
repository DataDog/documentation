---
cascade:
  algolia:
    category: 가이드
    rank: 20
    subcategory: 모니터 가이드
disable_toc: true
private: true
title: 모니터 가이드
---

{{< whatsnext desc="시작하기:" >}}
    {{< nextlink href="monitors/guide/monitor_best_practices" >}}모니터 모범 사례{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-set-up-rbac-for-monitors" >}}모니터에 RBAC를 설정하는 방법{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor_aggregators" >}}모니터 애그리게이터{{< /nextlink >}}
    {{< nextlink href="monitors/guide/history_and_evaluation_graphs" >}}모니터 기록 및 평가 그래프{{< /nextlink >}}
    {{< nextlink href="monitors/guide/why-did-my-monitor-settings-change-not-take-effect" >}}모니터 설정 변경이 적용되지 않음{{< /nextlink >}}
    {{< nextlink href="monitors/guide/recovery-thresholds" >}}복구 임계값{{< /nextlink >}}
    {{< nextlink href="monitors/guide/alert_aggregation" >}}경고 집계{{< /nextlink >}}
    {{< nextlink href="monitors/guide/notification-message-best-practices" >}}알림 메시지 모범 사례{{< /nextlink >}}

{{< /whatsnext >}}

{{< whatsnext desc="튜토리얼:" >}}
    {{< nextlink href="monitors/guide/create-cluster-alert" >}}메트릭 모니터에 대한 클러스터 경고 생성{{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-monitor-dependencies" >}}모니터 종속성 생성{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/synthetic-test-monitors" >}}합성(Synthetic ) 테스트에서 모니터를 만드는 방법{{< /nextlink >}}
    {{< nextlink href="monitors/guide/reduce-alert-flapping" >}}경고 플래핑 감소{{< /nextlink >}}
    {{< nextlink href="monitors/guide/troubleshooting-monitor-alerts" >}}모니터 경고 문제 해결{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="모니터 구성:" >}}
    {{< nextlink href="monitors/guide/best-practices-for-live-process-monitoring" >}}실시간 프로세스 모니터링모범 사례{{< /nextlink >}}
    {{< nextlink href="monitors/guide/non_static_thresholds" >}}비정적 임계값을 모니터링하는 방법{{< /nextlink >}}
    {{< nextlink href="monitors/guide/anomaly-monitor" >}}이상치 모니터{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitoring-sparse-metrics" >}}희소 메트릭 모니터링{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-arithmetic-and-sparse-metrics" >}}산술 및 희소 메트릭 모니터링{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitoring-available-disk-space" >}}사용 가능한 디스크 공간 모니터링{{< /nextlink >}}
    {{< nextlink href="monitors/guide/adjusting-no-data-alerts-for-metric-monitors" >}}메트릭 모니터에 대한 "No Data" 경고 조정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-update-anomaly-monitor-timezone" >}}로컬 시간대를 고려하여 이상 탐지 모니터를 업데이트하는 방법{{< /nextlink >}}
    {{< nextlink href="/monitors/guide/custom_schedules" >}}모니터 평가 빈도를 맞춤 설정하기 위한 사용자 정 일정 추가{{< /nextlink >}}
    {{< nextlink href="monitors/guide/as-count-in-monitor-evaluations" >}}모니터 평가에서의 as_count(){{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="다운타임:" >}}
    {{< nextlink href="/monitors/guide/scoping_downtimes" >}}다운타임 범위 설정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime" >}}다운타임 상태인 모니터로부터의 경고 방지{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="monitors/guide/monitor_api_options" >}}모니터 API 옵션{{< /nextlink >}}
    {{< nextlink href="monitors/guide/on_missing_data" >}}누락된 데이터 구성으로 마이그레이션하기{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="특정 사용 사례:" >}}
    {{< nextlink href="monitors/guide/alert-on-no-change-in-value" >}}값 변경 없음에 대한 알림{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-for-value-within-a-range" >}}모니터링 범위{{< /nextlink >}}
    {{< nextlink href="monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting" >}}특정 태그가 보고를 중지할 때 알림 설정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-ephemeral-servers-for-reboots" >}}재부팅을 위한 모니터 임시 서버{{< /nextlink >}}
    {{< nextlink href="monitors/guide/integrate-monitors-with-statuspage" >}}Statuspage로 모니터 통합{{< /nextlink >}}
    {{< nextlink href="monitors/guide/github_gating" >}}Datadog 모니터를 사용하여 GitHub Actions 배포 게이팅{{< /nextlink >}}
{{< /whatsnext >}}