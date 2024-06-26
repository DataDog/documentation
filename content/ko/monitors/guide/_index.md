---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: 모니터링 지침
disable_toc: true
kind: 지침
private: true
title: 모니터링 지침
---

{{< whatsnext desc="Alerts, Downtimes, and Messages:" >}}
    {{< nextlink href="monitors/guide/troubleshooting-monitor-alerts" >}}모니터 알림 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="monitors/guide/template-variable-evaluation" >}}템플릿 변수 평가{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-for-value-within-a-range" >}}모니터링 범위{{< /nextlink >}}
    {{< nextlink href="/monitors/guide/scoping_downtimes" >}}다운타임 범위{{< /nextlink >}}
    {{< nextlink href="monitors/guide/alert-on-no-change-in-value" >}}값 변경 없을 시 알림{{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-cluster-alert" >}}메트릭 모니터에 대한 클러스터 알림 생성{{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-monitor-dependencies" >}}모니터 종속성 생성{{< /nextlink >}}
    {{< nextlink href="monitors/guide/export-monitor-alerts-to-csv" >}}CSV로 모니터 알림 내보내기{{< /nextlink >}}
    {{< nextlink href="monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting" >}}특정 태그 보고 중단 시 알림 설정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/recovery-thresholds" >}}복원 임계값{{< /nextlink >}}
    {{< nextlink href="monitors/guide/adjusting-no-data-alerts-for-metric-monitors" >}}메트릭 모니터를 위한 "데이터 없음" 알림{{< /nextlink >}}
    {{< nextlink href="monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime" >}}다운타임 모니터에서 알림 방지{{< /nextlink >}}
    {{< nextlink href="monitors/guide/reduce-alert-flapping" >}}알림 플래핑 감소{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitoring-sparse-metrics" >}}희귀 메트릭 모니터링{{< /nextlink >}}
    {{< nextlink href="monitors/guide/best-practices-for-live-process-monitoring" >}}라이브 프로세스 모니터링 모범 사례{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="monitors/guide/monitor_api_options" >}}모니터 API 옵션{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="일반 가이드:" >}}
{{< nextlink href="monitors/guide/how-to-set-up-rbac-for-monitors" >}}모니터용 RBAC 설정 방법{{< /nextlink >}}
{{< nextlink href="synthetics/guide/synthetic-test-monitors" >}}신서틱 테스트에서 모니터를 만드는 방법{{< /nextlink >}}
{{< nextlink href="monitors/guide/non_static_thresholds" >}}비정적 임계값을 모니터링하는 방법{{< /nextlink >}}
{{< nextlink href="monitors/guide/anomaly-monitor" >}}이상 모니터{{< /nextlink >}}
{{< nextlink href="monitors/guide/monitor-ephemeral-servers-for-reboots" >}}재부팅을 위해 임시 서버 모니터링{{< /nextlink >}}
{{< nextlink href="monitors/guide/how-to-update-anomaly-monitor-timezone" >}}현지 시간대를 고려하여 이상 탐지 모니터를 업데이트하는 방법{{< /nextlink >}}
{{< nextlink href="monitors/guide/history_and_evaluation_graphs" >}}모니터 내역 및 평가 그래프{{< /nextlink >}}
{{< nextlink href="monitors/guide/why-did-my-monitor-settings-change-not-take- effect" >}}모니터 설정 변경 사항이 적용되지 않음{{< /nextlink >}}
{{< nextlink href="monitors/guide/integrate-monitors-with-statuspage" >}}Statuspage와 모니터 통합{{< /nextlink >}}
{{< nextlink href="monitors/guide/github_gating" >}}Datadog 모니터를 사용하여 GitHub 작업 배포 제어{{< /nextlink >}}
{{< nextlink href="monitors/guide/monitoring-available-disk-space" >}}사용 가능한 디스크 공간 모니터링{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="쿼리:" >}}
    {{< nextlink href="/monitors/guide/custom_schedules" >}}사용자 맞춤 스케줄을 추가하여 모니터링 평가 빈도 커스터마이징{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-arithmetic-and-sparse-metrics" >}}산술 및 희소 메트릭 모니터링{{< /nextlink >}}
    {{< nextlink href="monitors/guide/as-count-in-monitor-evaluations" >}}as_count() 모니터링 평가{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor_aggregators" >}}집계자(aggregator) 모니터링{{< /nextlink >}}
{{< /whatsnext >}}