---
further_reading:
- link: /service_management/on-call/
  tag: 문서
  text: Datadog On-Call
title: 스케줄
---

Datadog On-Call에서 스케줄은 팀원들이 페이지에 응답하도록 배정되는 특정 시간을 정의하며, 다양한 시간대와 교대 근무에 따른 팀원의 근무 가능 시간을 구성하고 관리합니다.

### 개념

On-Call 스케줄은 레이어별로 구성되며, 각 레이어는 일주일 중 다른 시간이나 특정한 책임을 맡습니다.

다음 예시 스케줄을 살펴보세요.

{{< img src="service_management/oncall/schedule.png" alt="일본, 유럽, 미국 업무 시간에 따른 배정을 보여주는 샘플 스케줄." style="width:100%;" >}}

4개의 레이어가 있습니다.
- **JP 업무 시간**: DM이라는 이름의 담당자가 매일 시작되는 일본 업무 시간(UTC 기준)을 담당합니다. 월요일부터 금요일까지 매일 반복됩니다.
- **EU 업무 시간**: 다음으로 DB는 유럽 업무 시간을 처리합니다. 월요일부터 금요일까지 매일 반복됩니다.
- **US 업무 시간**: 마지막으로, BS는 매일 미국 업무 종료 시간(UTC 기준)에 온콜을 담당합니다. 월요일부터 금요일까지 매일 반복됩니다.
- **Overrides**: Overrides는 임시 교대 조정 및 휴일과 같은 스케줄 수정을 반영합니다. 자세한 내용은 [Overrides](#overrides)를 참조하세요.

**최종 일정**은 모든 레이어로 구성됩니다. 하위 레이어가 상위 레이어보다 우선합니다.

### 스케줄 생성하기

1. [**On-Call** > **Schedules**][1]로 이동합니다.
1. [**+ New Schedule**][2]을 선택합니다.
1. **Name**을 입력하고 사용하려는 **Schedule Time Zone**을 선택한 후 이 스케줄을 사용할 **Teams**를 선택합니다.
1. 레이어 추가:
   - **Starts**: 일정이 적용되는 날짜와 시간입니다. 이 날짜와 시간 이전에는 근무 시간이 나타나지 않습니다.
   - **Shift length**: 각 교대 근무 시간의 길이(사실상 일정이 반복되는 경우)입니다. 옵션은 다음과 같습니다:
      - _1일_ (24시간)
      - _1주일_ (168시간)
      - _커스텀_
   - **Handoff Time**: 교대 근무가 다음 사람으로 바뀌는 날짜와 시간입니다.
   - **End time**: 이 레이어에 대해 더 이상 교대 근무가 예약되지 않는 날짜와 시간입니다.
   - **Conditions**: 각 교대 근무에 적용되는 시간 조건. 이를 통해 온콜 교대 근무의 시간대를 제한할 수 있습니다. 예: 월요일부터 금요일, 오전 9시부터 오후 5시까지.
   - **Members**: 온콜 담당자 목록. 목록에 추가된 순서대로 교대 근무를 합니다.
1. **생성**을 선택합니다.

### 에스컬레이션 정책 내에서 스케줄 확인하기
지정된 스케줄에 온콜 담당자에게 페이지를 보내려면 에스컬레이션 정책 내에서 스케줄을 확인하면 됩니다. 에스컬레이션 정책을 만들거나 편집할 때 에스컬레이션 단계의 **Notify** 드롭다운 메뉴를 사용하여 원하는 스케줄을 검색하고 선택합니다. 에스컬레이션 정책은 페이지가 트리거될 때 온콜 담당자에게 페이지를 보냅니다.

### Overrides {#overrides}
Overrides는 예정된 온콜 교대 근무에 대한 수정 내용을 반영합니다. 임시 근무 조정 및 휴일과 같은 변경 사항을 적용할 수 있습니다.

{{< img src="service_management/oncall/schedule_override.png" alt="스케줄을 편집할 때 근무 시간이 선택됩니다. Override 버튼이 있는 대화 상자가 나타납니다." style="width:100%;" >}}

교대 근무를 완전히 또는 부분적으로 수정하려면 해당 교대 근무를 선택하고 **Override**를 클릭합니다.

#### Slack 또는 Microsoft Teams에서 수정 요청

On-Call 로테이션에 속해있지만 부재중일 경우 Slack 또는 Microsoft Teams에서 수정을 요청할 수 있습니다. `/dd override`를 입력하고 수정할 기간을 선택한 다음 설명을 추가합니다. 그러면 채널에 요청이 전송됩니다.

{{< img src="service_management/oncall/schedule_override_request.png" alt="Slack에서 Datadog Staging의 메시지는 다음과 같습니다. '@Daljeet has an override request. Schedule: [Primary] Payments & Transactions (payments-transactions). Start: Today, 1:00PM. End: Today, 3:00 PM. Duration: 2h. Note: Doctor's appointment. 수정을 위해 쿠키를 제공합니다.' 메시지 끝에 'Take it'이라는 버튼이 나타납니다." style="width:80%;" >}}

다른 팀원이 **Take it**을 선택하여 요청자의 근무 일정을 수정할 수 있습니다.

### 스케줄 내보내기

Export Shifts 기능을 사용하면 `.webcal` 링크를 사용하여 온콜 스케줄을 원하는 캘린더 앱(예: Google Calendar, Apple Calendar, Outlook)에 통합할 수 있습니다. 여러 로테이션에 참여하든, 교대 근무 외에 개인 시간을 계획하든, 팀 가시성을 높이려는 것이든, 이 기능을 사용하면 항상 최신 버전의 온콜 스케줄을 확인할 수 있습니다.

#### 스케줄 내보내기 및 동기화
1. `.webcal` 링크를 생성하려면 계정에서 [**On-Call** > **Schedules**][1] 섹션으로 이동합니다.
2. **Export My Shifts**를 선택하면 링크가 자동으로 생성됩니다.
3. **Copy Link**를 클릭합니다.
4. 링크를 복사한 후 캘린더 앱에서 사용하세요. 예를 들어:
    - Google Calendar: [Google의 가이드를 확인하세요('Use a link to add a public calendar'아래).][3]
    - Outlook: [캘린더 구독을 위한 Microsoft 가이드를 확인하세요.][4]
    - Apple Calendar: [Mac 또는 iPhone에서 캘린더를 구독하는 방법을 알아보세요.][5]

온콜 스케줄이 변경되면 자동으로 연결된 캘린더에 반영되어 항상 정확한 일정을 파악할 수 있습니다. 새 링크를 생성한 후 이전에 공유한 링크에 대한 액세스를 취소하면 이전 URL이 무효화됩니다.

대부분의 캘린더 앱은 알림을 지원합니다. 즉, 교대 근무가 시작되기 전에 알림을 받을 수 있는 기능이 활성화되어 있지만 [Datadog On-Call 프로필 설정][6]에서 SMS, 푸시 알림 및 이메일을 통해 교대 근무 알림을 구성할 수도 있습니다.

#### 스케줄 내보내기 트러블슈팅

On-Call 스케줄 피드를 Google Calendar로 내보낼 때 문제가 발생하는 경우(예: "URL을 가져올 수 없음") 또는 Outlook("캘린더를 가져올 수 없음. 다시 시도하세요"), URL을 통해 캘린더를 처음 구독할 때 다음 방법을 시도해 보세요.

- URL의 첫 부분 `webcal://`를 `http://` 또는 `https://`로 변경합니다. 예를 들어 `webcal://<your_personal_link>`를 `http://<your_personal_link>`로 변경합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create
[3]: https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
[4]: https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c
[5]: https://support.apple.com/en-us/102301
[6]: /ko/service_management/on-call/profile_settings/