---
description: 회귀 감지로 해결된 오류를 자동으로 다시 개시하는 방법 알아보기
further_reading:
- link: /error_tracking/issue_states/
  tag: 설명서
  text: Error Tracking에서 문제 상태 확인
title: 회귀 감지
---

## 개요

회귀란 이전에 해결한 버그나 문제가 예상치 않게 다시 나타나는 것을 의미합니다. Datadog에서 해결된 문제는 회귀 감지를 통해 자동으로 다시 개시되기 때문에 정보를 복제하지 않고 문제 컨텍스트를 모두 확인할 수 있습니다.

## 회귀 감지로 자동 재개시

새 버전의 코드에서 **RESOLVED** 오류가 재발생하거나 버전 없이 코드에서 또 오류가 발생할 경우, Error Tracking에서 회귀를 트리거합니다. 문제가 **FOR REVIEW** 상태가 되고, **Regression** 태그가 추가됩니다.

{{< img src="error_tracking/regression-detection.png" alt="Error Tracking의 회귀 상세 정보" style="width:90%;" >}}

회귀는 오류가 잘 발생하는 곳에 서비스 버전을 고려하여 실행되며, 문제가 **RESOLVED**로 표시된 새 버전에서만 트리거됩니다. 버전 태그로 서비스를 구성하면( [APM][1], [RUM][2], [Logs][3] 지침 참고), 서비스 새 버전에서 동일한 오류를 자동으로 해결합니다.

버전 태그를 설정하지 않은 경우, **RESOLVED**로 표시된 오류가 발생할 경우, 문제가 **Regression**으로 태그됩니다.

또 회귀가 발생할 경우 [모니터][4]에서 알림을 받도록 설정할 수 있습니다.

## 문제 상태 업데이트

문제 목록이나 해당 문제의 상세 내용을 표시하는 패널 등 문제를 확인할 수 있는 곳에서 문제 상태를 확인할 수 있습니다. 문제 상태를 수동으로 업데이트하려면 상태를 클릭하고 드롭다운 메뉴에서 다른 옵션을 선택하세요.

{{< img src="error_tracking/updating-issue-status.png" alt="Error Tracking Issue의 Activity Timeline" style="width:100%;" >}}

## 문제 기록
**Activity Timeline**에서 문제 활동 기록을 확인할 수 있습니다. Error Tracking 문제의 상세 정보 패널에서 **Activity** 탭을 클릭해 Activity Timeline을 확인할 수 있습니다.

{{< img src="error_tracking/issue-status-history.png" alt="Error Tracking Issue의 Activity Timeline" style="width:80%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/deployment_tracking
[2]: /ko/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /ko/getting_started/tagging/unified_service_tagging/
[4]: /ko/monitors/types/error_tracking/