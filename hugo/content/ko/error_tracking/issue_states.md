---
further_reading:
- link: /error_tracking/regression_detection/
  tag: 설명서
  text: 회귀 탐지
title: Error Tracking에서 문제 상태 확인
---
## 개요 {#overview}

Error Tracking의 모든 문제는 상태를 통해 문제를 분류하고 우선순위를 지정하거나 불필요한 알림을 해제할 수 있습니다. 상태는 다섯 가지가 있습니다.

- {{< ui >}}FOR REVIEW{{< /ui >}}: 주의가 필요한 새 문제 또는 재발한 문제입니다.
- {{< ui >}}REVIEWED{{< /ui >}}: 지금 또는 나중에 수정해야 할 분류된 문제입니다.
- {{< ui >}}RESOLVED{{< /ui >}}: 수정되었으며 더 이상 발생하지 않는 문제입니다.
- {{< ui >}}IGNORED{{< /ui >}}: 추가 조사나 조치가 필요 없는 문제입니다.
- {{< ui >}}EXCLUDED{{< /ui >}}: 추가 조사가 필요 없으며, 새 오류 수집을 중단하고, 사용량이나 청구에 더 이상 포함되지 않는 문제입니다.

모든 문제는 FOR REVIEW 상태로 시작합니다. Error Tracking은 아래 설명된 경우에 상태를 자동으로 업데이트하며, 사용자가 [수동으로 상태를 업데이트](#updating-an-error-status)할 수도 있습니다. 또한 특정 오류의 상태 변경 [기록을 확인](#issue-history)할 수 있습니다.

아래 다이어그램은 Error Tracking 상태가 자동으로 또는 수동으로 업데이트되는 방식을 보여줍니다.
{{< img src="error_tracking/issue-states-diagram.png" alt="Error Tracking 문제 상태" style="width:75%;" >}}

## 자동 검토 {#automatic-review}

다음 조치 중 하나가 수행되면 Error Tracking에서 문제를 {{< ui >}}REVIEWED{{< /ui >}}로 자동으로 표시합니다.

- 문제가 할당되었습니다.
- 문제에서 작업 항목이 생성되었습니다.

{{< img src="error_tracking/auto-review-actions-2.png" alt="Error Tracking 자동 검토 액션" style="width:75%;" >}}

## 자동 해결 {#automatic-resolution}

Error Tracking은 최근 오류 발생이 없어 비활성 상태이거나 해결된 것으로 보이는 문제를 {{< ui >}}RESOLVED{{< /ui >}}로 자동으로 표시합니다.

- 14일을 초과한 지난 버전에서 문제가 마지막으로 보고되었고, 더 최신 버전이 릴리스되었으나 동일한 오류가 보고되지 않는 경우, Error Tracking은 자동으로 문제를 해결합니다. 서비스에 버전 태그를 구성하여([APM][1], [RUM][2], [Logs][3] 관련 지침 참조) 자동 해결이 서비스 버전을 고려하도록 하세요.
- `version` 태그가 설정되어 있지 않으면, Error Tracking은 지난 14일 동안 해당 문제에 대해 보고된 새로운 오류가 없는 경우 자동으로 문제를 해결합니다.

**참고**: 자동 해결 로직은 `version`을 고려하지 않습니다.

## 회귀 탐지에 의한 자동 재개 {#automatic-re-opening-through-regression-detection}

[회귀 탐지][4]를 참조하세요.

## 문제 상태 업데이트 {#updating-the-issue-status}

문제 상태는 문제 목록이나 특정 문제의 세부 정보 패널 등 문제를 확인할 수 있는 모든 곳에 표시됩니다. 문제 상태를 수동으로 업데이트하려면 상태를 클릭하고 드롭다운 메뉴에서 다른 상태를 선택하세요.

{{< img src="error_tracking/updating-issue-status.png" alt="Error Tracking 문제의 활동 타임라인" style="width:100%;" >}}

## 문제 제외 {#excluding-an-issue}

`EXCLUDED` 상태를 사용하면 특정 오류가 추적되지 않도록 방지하여 해당 오류가 수집되거나 청구 대상에 포함되지 않도록 할 수 있습니다. 이를 통해 복잡한 제외 규칙 없이도 조치할 수 없는 오류나 예상된 실패로 인해 발생하는 문제를 제거할 수 있습니다.

문제를 제외하려면 상태를 클릭하고 드롭다운 메뉴에서 {{< ui >}}EXCLUDED{{< /ui >}}를 선택하세요. 제외된 문제는 {{< ui >}}IGNORED{{< /ui >}} 탭에서 계속 액세스할 수 있습니다. 언제든지 이력을 검토할 수 있습니다.

{{< img src="error_tracking/issue-states-excluded.png" alt="문제 상태 드롭다운에서 제외됨" style="width:100%;" >}}

제외된 문제에 대한 오류 수집을 재개하려면 {{< ui >}}EXCLUDED{{< /ui >}} 이외의 상태를 선택하세요.


## 문제 이력 {#issue-history}
{{< ui >}}Activity Timeline{{< /ui >}}을 사용하여 문제 활동의 이력을 확인하세요. 모든 Error Tracking 문제의 세부 정보 패널에서 {{< ui >}}Activity{{< /ui >}} 탭을 클릭하여 활동 타임라인을 볼 수 있습니다.

{{< img src="error_tracking/issue-status-history-3.png" alt="Error Tracking 문제의 활동 타임라인" style="width:80%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/deployment_tracking
[2]: /ko/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /ko/getting_started/tagging/unified_service_tagging/
[4]: /ko/error_tracking/regression_detection/