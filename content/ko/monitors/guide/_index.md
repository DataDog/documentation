---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: 모니터 가이드
disable_toc: true
kind: 가이드
private: true
title: 모니터 가이드
---

{{< whatsnext desc="경고, 다운타임 및 메시지:" >}}
    {{< nextlink href="monitors/guide/troubleshooting-monitor-alerts" >}}모니터 경고 트러블슈팅{{< /nextlink >}}
    {{< nextlink href="monitors/guide/template-variable-evaluation" >}}템플릿 변수 평가{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-for-value-within-a-range" >}}모니터링 범위{{< /nextlink >}}
    {{< nextlink href="monitors/guide/suppress-alert-with-downtimes" >}}다운타임으로 경고 억제{{< /nextlink >}}
    {{< nextlink href="monitors/guide/alert-on-no-change-in-value" >}}값의 변화가 없을 때 경고{{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-cluster-alert" >}}메트릭 모니터에 대한 클러스터 경고 생성{{< /nextlink >}}
    {{< nextlink href="monitors/guide/create-monitor-dependencies" >}}모니터 종속성 생성{{< /nextlink >}}
    {{< nextlink href="monitors/guide/export-monitor-alerts-to-csv" >}}모니터 경고를 CSV로 내보내기{{< /nextlink >}}
    {{< nextlink href="monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting" >}}특정 태그가 보고를 중지할 때 경고 설정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/recovery-thresholds" >}}복구 기준치{{< /nextlink >}}
    {{< nextlink href="monitors/guide/adjusting-no-data-alerts-for-metric-monitors" >}}메트릭 모니터에 대한 "데이터 없음" 경고 조정{{< /nextlink >}}
    {{< nextlink href="monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime" >}}다운타임에 있었던 모니터의 경고 방지{{< /nextlink >}}
    {{< nextlink href="monitors/guide/reduce-alert-flapping" >}}경고 플래핑 감소{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="monitors/guide/monitor_api_options" >}}모니터 API 옵션{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="일반 가이드:" >}}
    {{< nextlink href="monitors/guide/slo-checklist" >}}SLO 체크리스트{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-set-up-rbac-for-monitors" >}}모니터용 RBAC 설정 방법{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/synthetic-test-monitors" >}}신서틱 테스트에서 모니터를 생성하는 방법{{< /nextlink >}}
    {{< nextlink href="monitors/guide/anomaly-monitor" >}}이상 모니터{{< /nextlink >}}
    {{< nextlink href="monitors/guide/monitor-ephemeral-servers-for-reboots" >}}재부팅을 위한 임시 서버 모니터{{< /nextlink >}}
    {{< nextlink href="monitors/guide/how-to-update-anomaly-monitor-timezone" >}}현지 시간대를 고려하여 이상 감지 모니터를 업데이트하는 방법{{< /nextlink >}}
    {{< nextlink href="monitors/guide/why-did-my-monitor-settings-change-not-take-effect" >}}모니터 설정 변경 사항이 적용되지 않음{{< /nextlink >}}
    {{< nextlink href="monitors/guide/integrate-monitors-with-statuspage" >}}Statuspage와 모니터 통합{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="쿼리:" >}}
    {{< nextlink href="monitors/guide/monitor-arithmetic-and-sparse-metrics" >}}산술 및 희소 메트릭 모니터{{< /nextlink >}}
    {{< nextlink href="monitors/guide/as-count-in-monitor-evaluations" >}}as_count() 모니터 평가{{< /nextlink >}}
{{< /whatsnext >}}