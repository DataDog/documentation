---
aliases:
- /ko/guides/monitors/
- /ko/guides/monitoring/
- /ko/guides/alerting/
- /ko/guides/monitors/the-conditions
- /ko/monitoring
cascade:
  algolia:
    rank: 70
description: 모니터를 생성하고, 중요한 경우 팀에 알리고, 경고 플랫폼을 사용하여 모니터를 관리하세요.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: 릴리스 노트
  text: 최신 Datadog 경고 릴리스를 확인하세요!(앱 로그인 필요)
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: 블로그
  text: '모니터링 101: 중요한 사항에 대한 경고'
- link: /api/v1/monitors/
  tag: Documentation
  text: Datadog 모니터 API
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: 블로그
  text: GitHub 배포 보호 규칙 및 Datadog을 사용하여 실패한 품질 검사를 감지하세요
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 효과적인 모니터 생성에 대한 대화형 세션에 참여하세요
- link: https://www.datadoghq.com/blog/aws-recommended-monitors/
  tag: 블로그
  text: AWS용 권장 모니터로 사전 설정된 알림을 활성화하세요
kind: 설명서
title: 경고
---

## 개요

중요한 변경 사항이 발생한 시점을 알 수 있는 기능 없이는 한 곳에서 모든 인프라스트럭처를 완전하게 모니터링할 수 없습니다. Datadog은 메트릭, 통합 가용성, 네트워크 엔드포인트 등을 능동적으로 점검하는 모니터를 생성할 수 있는 기능을 제공합니다.

경고 플랫폼에서 모니터를 설정하고, 팀에 알리고, 한 눈에 경고를 관리하세요.

**참고**: [Apple App Store][2] 및 [Google Play Store][3]에서 사용할 수 있는 [Datadog Mobile App][1]을 사용하여 모바일 장치에서 모니터를 보고 검색하세요.

## 모니터 생성

Datadog에서 모니터를 생성하려면 다음과 같이 하세요.

1. **Monitors** > **New Monitor**로 이동합니다.
2. 경고하려는 텔레메트리 종류에 해당하는 모니터 유형을 선택합니다. 전체 목록은 [모니터 유형][4]을 참조하세요.
3. [모니터 설정][5]: 메트릭, 이벤트, 로그, 통합 가용성, 네트워크 엔드포인트 등에 대해 경고합니다.

{{< img src="/monitors/create.png" alt="모니터 생성" style="width:90%;">}}

프로그래밍 방식으로 모니터를 생성하려면 [Datadog API][6] 또는 [커뮤니티에서 관리하는 라이브러리][7]를 참조하세요.

## 모니터 내보내기 및 가져오기

모니터의 상태 페이지에서 모니터 정의가 포함된 JSON 파일을 다운로드할 수 있습니다. 설정 톱니바퀴(오른쪽 상단)를 클릭하고 메뉴에서 **Export**를 선택합니다.

기본 탐색에서 *Monitors --> New Monitor --> Import*를 선택하여 Datadog으로 [JSON 모니터 정의를 가져옵니다][8].

## 팀에 알리기

{{< img src="/monitors/notify.png" alt="모니터가 경고할 때 알리기" style="width:90%;">}}

[Monitor Notifications][9]: 모니터를 생성할 때 알림을 설정하여 팀에 문제를 알립니다. 올바른 사람에게 알림을 전달하고, 템플릿 변수를 활용하여 상세정보를 포함하고, 이메일 또는 Slack으로 경고를 보낼 때 스냅샷을 첨부합니다. 애플리케이션 점검 중에 경고를 음소거하려면 [다운타임][10]을 생성하세요.

## 모니터 관리

{{< img src="/monitors/manage.png" alt="모든 모니터 경고 관리" style="width:90%;">}}

[Manage Monitors][11]: 모니터를 같은 위치에서 편집, 복제, 삭제, 음소거 및 해결합니다. 고급 패싯 검색을 사용하여 우선순위가 높은 알림에 집중합니다. Monitor Status 페이지에서 실시간으로 모니터 상세정보 및 경고를 탐색합니다.

## 태그 정책으로 모니터 태그 제어

[모니터 태그 정책][12]은 Datadog 모니터의 태그 및 태그 값에 대한 데이터 유효성 검사를 시행합니다. 다음 규칙 중 하나를 추가하여 예기치 않은 태그가 있는 모니터가 생성되는 것을 방지하세요.
- 필수 값을 가진 태그가 필요한 경우
- 태그만 필요한 경우
- 필수 값을 가진 부수적인 태그

## 모바일 장치에서 모니터 보기 및 검색

[Mobile-Friendly Monitors on iOS and Android][12]: [Apple App Store][2] 및 [Google Play Store][3]에서 사용 가능한 [Datadog Mobile App][1]을 이용해 iOS 또는 Android 장치에서 모니터를 보기, 음소거 및 음소거 해제합니다. 실시간으로 모니터를 필터링하려면 검색창에 쿼리를 작성하세요. [Monitor Saved Views][13]를 사용하여 모바일에서 몇 번의 탭으로 모니터 모음에 액세스할 수도 있습니다.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Mobile App에서 모니터">}}

## 기타 섹션

{{< whatsnext desc=" ">}}
    {{< nextlink href="/service_management/service_level_objectives" >}}<u>서비스 수준 목표</u>: 메트릭 또는 기존 Datadog 모니터를 사용하여 서비스 수준 목표를 생성, 편집 또는 확인합니다.{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>인시던트 관리</u>: 인시던트를 선언하고 관리합니다.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>가이드</u>: 모니터 및 알림에 대한 유용한 문서.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: /ko/monitors/types/
[5]: /ko/monitors/configuration
[6]: /ko/api/latest/monitors/
[7]: /ko/developers/community/libraries/#managing-monitors
[8]: https://app.datadoghq.com/monitors#create/import
[9]: /ko/monitors/notify
[10]: /ko/monitors/downtimes
[11]: /ko/monitors/manage
[12]: /ko/monitors/settings/
[13]: /ko/service_management/mobile/?tab=ios#monitors
[14]: /ko/monitors/manage/search/#saved-view