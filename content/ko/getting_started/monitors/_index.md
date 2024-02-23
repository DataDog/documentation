---
aliases:
- /ko/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링 101: 중요한 사항에 대한 알림'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: 학습 센터
  text: 통합가시성 소개
- link: /monitors/types/metric/
  tag: 설명서
  text: 메트릭 모니터
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 효과적인 모니터 생성을 위해 대화형 세션에 참여하세요.
kind: 설명서
title: 모니터 시작하기
---

## 개요

Datadog 알림을 사용하면 메트릭, 통합 가용성, 네트워크 엔드포인트 등을 적극적으로 점검하는 모니터를 만들 수 있습니다. 관찰, 검사 및 개입이 필요한 시스템에 주의하기 위해 모니터를 사용하세요.

이 페이지는 모니터에 대한 소개와 함께 메트릭 모니터 설정 방법을 간략하게 설명합니다. [메트릭 모니터][1]는 특정 메트릭이 특정 임계값보다 높거나 낮을 경우 경고 및 알림을 제공합니다. 예를 들어, 디스크 공간이 부족할 때 메트릭 모니터가 알림을 제공할 수 있습니다.

이 가이드에서는 다음을 다룹니다:
- 모니터 생성 및 설정
- 모니터 알림 설정
- 알림 메시지 맞춤 설정
- 모니터 권한

## 전제 조건

시작하기 전 설치된 Datadog Agent와 연결된 Datadog 계정이 필요합니다. Agent에 대한 자세한 내용은 [Agent  시작 안내서][2]를 참조하거나 **[Integrations > Agent][3]**로 이동하여 설치 지침서를 확인하세요.

Datadog Agent가 실행 중인지 확인하려면 Datadog의 [인프라스트럭처 목록][4]이 입력되어 있는지 확인합니다.

## 모니터 생성

모니터를 생성하려면 **[Monitors > New Monitor > Metric][5]**로 이동합니다.

## 설정

모니터 설정의 주요 구성 요소는 다음과 같습니다:
- **감지 방법**: 알림을 받을 항목을 어떻게 측정하고 있나요? 임계값을 초과하는 메트릭 값, 임계값을 초과하는 값의 변화, 비정상적인 값 또는 다른 어떤 것에 대해 우려하고 있나요?
- **메트릭 정의**: 경고하기 위해 모니터링하는 값은 무엇인가요? 시스템의 디스크 공간? 로그인 시 발생한 오류 횟수?
- **경고 조건**: 엔지니어는 언제 깨워야 하나요?
- **알림**: 알림에 포함해야 하는 정보는 무엇인가요?

### 탐지 방법 선택

메트릭 모니터링을 생성할 때 **Threshold Alert**가 감지 방법으로 자동 선택되어 있습니다. 임계값 알림은 메트릭 값을 사용자가 정의한 임계값과 비교합니다. 이 모니터의 목표는 정적 임계값에 대해 경고하는 것이므로 변경할 필요가 없습니다.

### 메트릭 정의

디스크 용량 부족 시 알림을 받으려면 [디스크 통합][6]에서 `system.disk.in_use` 메트릭을 활용하고, `host` 및 `device`에 대하여 메트릭 평균치를 계산합니다. 

{{< img src="getting_started/monitors/define_the_metric.png" alt="system.disk.in_use avg by host and device에 대한 메트릭 정의" >}}

### 알림 조건 설정

[디스크 통합 설명서][6]에 따르면, `system.disk.in_use`는 *전체 디스크 공간의 일부로서 사용 중인 디스크 공간의 양*을 말합니다. 따라서, 메트릭이 `0.7`이라는 값을 보고하면 용량의 70%를 사용 중이라는 뜻입니다.

디스크 용량 부족 경고를 보내려면 모니터가 메트릭이 임계값 이상(`above`)일 때 트리거해야 합니다. 임계값은 사용자 선호에 따라 결정됩니다. 이번 메트릭의 경우에는 `0`에서 `1` 사이 값이 적절합니다.

다음 임계값을 설정합니다:
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

이 예의 경우 이 섹션의 다른 설정은 기본값으로 유지합니다. 자세한 내용은 [메트릭 모니터][7] 설명서를 참조하세요.

### 알림

이 모니터에 경고가 트리거되면 알림 메시지가 전송됩니다. 이 메시지에는 조건 값, 해결 방법, 또는 알림에 대한 요약이 포함됩니다. 최소한 알림에는 제목과 메시지가 있어야 합니다.

#### 타이틀

타이틀은 각 모니터마다 고유해야 합니다. 다중 알림 모니터이므로, 메시지 템플릿 변수를 사용하여 그룹 요소(`host`와 `device`)에 이름을 사용할 수 있습니다.
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

알림 및 경고 임계값에 따라 조건부 메시지를 추가하려면 메시지에 포함할 수 있는 [알림 변수][8]를 참조하세요.


#### 서비스 및 팀원에게 알림

이메일, Slack, PagerDuty 등을 통해 팀에 알림을 보냅니다. 드롭다운 상자로 팀 구성원과 연결된 계정을 검색할 수 있습니다. 이 상자에 `@notification`가 추가되면 알림이 자동으로 메시지 상자에 추가됩니다:

{{< img src="getting_started/monitors/message_notify.png" alt="조건부 변수가 포함된 메시지 및 @notification" style="width:90%;" >}}

각 섹션에서 `@notification`을 삭제하면 양 섹션 모두에서 삭제됩니다.

다른 섹션은 그대로 두세요. 각 설정 옵션이 수행하는 작업에 대한 자세한 내용은 [모니터 설정][9] 설명서를 참조하세요.

### 권한

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="RBAC 제한 모니터" style="width:90%;" >}}

이 옵션을 사용하여 모니터의 편집 권한을 모니터 작성자 및 조직의 특정 역할로 제한할 수 있습니다. 역할에 대한 자세한 내용은 [역할 기반 액세스 제어][10]를 참조하세요.

## 모바일에서 모니터 및 분류 알림 보기

[Apple App Store][12] 및 [Google Play Store][13]에서 [Datadog 모바일 앱][11]을 다운로드하면 모바일 홈 화면에서 모니터 저장 보기 및 모니터를 확인할 수 있고, 모니터가 표시되지 않도록 설정할 수 있습니다. 이렇게 하면 노트북이나 데스크톱을 사용하지 않고도 작업을 처리하는 데 도움이 됩니다.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모바일 앱에 표시된 인시던트">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/types/metric/
[2]: /ko/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /ko/integrations/disk/
[7]: /ko/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ko/monitors/notify/variables/
[9]: /ko/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /ko/account_management/rbac/
[11]: /ko/service_management/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app