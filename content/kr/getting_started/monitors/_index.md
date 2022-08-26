---
aliases:
- /kr/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링의 기초: 중요한 경고만 받기'
- link: /monitors/create/types/metric/
  tag: 설명서
  text: 메트릭 모니터링
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
kind: 설명서
title: 모니터링 시작하기
---

## 개요

[메트릭 모니터링][1]을 이용하면 특정 메트릭이 지정한 기준치 이상이거나 이하일 때 경고와 알림을 받을 수 있습니다. 여기에서는 디스크 용량 부족 시 경고를 받을 수 있도록 메트릭 모니터링을 설정하는 방법을 알려드리겠습니다.

## 전제 조건

시작하기 전에 [Datadog Agent][3]가 설치된 호스트와 연동된  [Datadog 계정][2]이 필요합니다. 이를 확인하려면 Datadog에서 [인프라스트럭처 목록][4]을 확인하세요.

## 구성

Datadog에서 [메트릭 모니터링][5]을 설정하려면 메인 내비게이션을 이용해 *Monitors --> New Monitor --> Metric*으로 이동합니다.

### 탐지 방법 선택

메트릭 모니터링을 생성할 때 **Threshold Alert**가 탐지 방법으로 자동 선택되어 있습니다. 이 기준치 경고 방식은 메트릭 값과 사용자가 정의한 기준치를 비교합니다. 기준치 경고 방식의 목표는 정적 기준치에 맞추어 경고를 보내는 것이므로, 변경이 필요하지 않습니다.

### 메트릭 정의

디스크 용량 부족 시 경고를 받으려면 [디스크 통합][6]에서 `system.disk.in_use` 메트릭을 활용하고, `host` 및 `device`에 대하여 메트릭 평균치를 계산합니다. 

{{< img src="getting_started/application/metric_query.png" alt="경고 설정"  >}}

설정이 완료되면 모니터링에서 메트릭을 보고하는 각 `host`, `device`에 대한 개별 경고를 트리거하는 `Multi Alert`를 자동 업데이트합니다.

### 경고 조건 설정

[디스크 통합 설명서][6]에 따르면, `system.disk.in_use`는 *총량의 일부로서 사용 중인 디스크 용량의 양*을 말합니다. 따라서, 메트릭이 `0.7`이라는 값을 보고했다면 장치의 디스크 중 70%를 사용 중이라는 뜻입니다.

디스크 용량 부족 경고를 보내려면 모니터에서 메트릭이 기준치 이상(`above`)일 때 트리거해야 합니다. 기준값은 사용자 선호에 따라 결정됩니다. 이번 메트릭의 경우에는 `0`에서 `1` 사이 값이 적절합니다.

{{< img src="getting_started/application/alert_thresholds.png" alt="경고 설정"  >}}

이번 예시에서, 이 섹션의 다른 설정은 기본값으로 두었습니다. 자세한 정보는 [메트릭 모니터링][7] 문서를 참조하시기 바랍니다.

### Say what's happening

모니터를 저장하기 전에 타이틀과 메시지를 지정해야 합니다.

#### 타이틀

타이틀은 모니터마다 고유한 정보여야 합니다. 이번 모니터링은 멀티 경보 모니터를 사용하므로, 메시지 템플릿 변수를 사용하여 그룹 요소(`host`와 `device`)별로 이름을 지을 수 있습니다.
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### 메시지

메시지를 사용해 팀에게 어떻게 문제를 해결할지 전달할 수 있습니다. 예를 들면 다음과 같습니다.
```text
디스크 용량 확보 방법:
1. 사용하지 않는 패키지 삭제
2. APT 캐시 삭제
3. 불필요한 애플리케이션 삭제
4. 중복 파일 삭제
```

경고 및 주의 기준치에 따른 다양한 메시지를 자세히 알아보려면 [알림][8] 설명서를 참조하시기 바랍니다.

### 팀에 알림 전송하기

이메일, Slack, PagerDuty 등을 사용하여 팀에 알림을 보내려면 이 섹션을 활용하세요. 드롭다운 상자에서 팀원과 연결된 계정을 검색할 수 있습니다. 이 상자에 `@notification`이 추가되어 있는 경우, 알림은 자동으로 메시지 상자에 추가됩니다.

{{< img src="getting_started/application/message_notify.png" alt="메시지와 알림" style="width:70%;" >}}

각 섹션에서 `@notification`를 삭제하면 양 섹션 모두에서 삭제됩니다.

### 권한 허용

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="RBAC 제한 모니터링" style="width:90%;" >}}

이 옵션을 사용하면 모니터링의 수정 권한을 생성자나 조직 내 특정 역할 담당자에게만 제한적으로 허용할 수 있습니다. 역할을 자세히 알아보고 싶은 분은 [역할 기반 액세스 관리][9]를 참조하세요.

## 모바일로 모니터 및 선별(Triage) 경고 확인

[Apple App Store][11] 및 [Google Play Store][12]에서 구할 수 있는 [Datadog 모바일 앱][10]을 다운로드하면 모바일 홈 화면에서 저장된 모니터링 화면을 조회하거나 모니터 보기 및 음소거를 할 수 있습니다. 이는 노트북이나 데스크톱을 이용할 수 없으나 모니터링 결과를 선별할 때 도움이 됩니다.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모바일 앱에 표시된 인시던트">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/monitors/create/types/metric/
[2]: https://www.datadoghq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /kr/integrations/disk/
[7]: /kr/monitors/create/types/metric/?tab=threshold#set-alert-conditions
[8]: /kr/monitors/notify/#conditional-variables
[9]: /kr/account_management/rbac/
[10]: /kr/mobile/
[11]: https://apps.apple.com/app/datadog/id1391380318
[12]: https://play.google.com/store/apps/details?id=com.datadog.app