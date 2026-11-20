---
description: 단계별 가이드에서 사용 가능한 디스크 공간이 지정된 백분율 임계값 아래로 떨어질 때 알림을 보내는 사용 가능한 디스크 공간
  모니터를 만들 수 있습니다.
title: 사용 가능한 디스크 공간 모니터링
---



모니터에 대한 일반적인 시스템 메트릭은 특정 시스템 또는 호스트의 사용 가능한 디스크 공간입니다. 이 가이드는 Datadog로 보고하는 모든 호스트에 대해 호스트의 디스크 여유 공간이 10% 미만으로 떨어지면 알려주는 모니터를 만드는 데 도움이 됩니다.

사용 디스크 공간을 위해 모니터를 생성하는 방법:

1. 탐색 메뉴에서 **Monitors**를 클릭합니다.
2. **New Monitor**를 클릭합니다.
3. 모니터 유형으로 **Metric**을 선택합니다.
     1. **Define the metric** 섹션에서 메트릭에 `system.disk.free`을 사용하고 **avg by**에 `host`를 선택합니다. 쿼리 a입니다.
     2. **Add Query**를 클릭합니다. 이 메트릭의 경우 메트릭에 `system.disk.total`을 사용하고 **avg by**에는 `host` 을 사용합니다. 쿼리 b입니다.
     3. 표시되는 공식에서 `a + b`를 `a/b*100`로 바꿉니다.

         {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="a/b*100 수식을 사용한 system.disk.free 및 system.disk.total의 쿼리 정의" style="width:80%;">}}


     4. **Evaluation Details**에서 원하는 평가 간격을 선택합니다.

         {{< img src="monitors/guide/monitoring_free_disk_space_alert_criteria.png" alt="경고 기준 구성이 임계값 이하로 설정됨, 값은 10." style="width:80%;">}}


5. **Set alert conditions**의 임계값 옵션에서 **below**를 선택하고 **Alert threshold** 필드에 `10`을 입력합니다.
6. **Configure notifications & automations**에서 모니터 이름을 지정한 다음 알림 메시지를 지정합니다. 관련 세부정보와 의미 있는 메시지 템플릿을 포함하세요. 예는 다음과 같습니다.

     ```
       {{#is_alert}} Alert: Free disk space is below {{threshold}}% on {{host.name}}. {{/is_alert}}
       {{#is_warning}} Warning: Free disk space is below {{warn_threshold}}% on {{host.name}}. {{/is_warning}}
       Disk space available: {{value}}%
     ```

7. **Create**을 클릭하여 모니터를 저장합니다.

[1]: https://app.datadoghq.com/monitors/