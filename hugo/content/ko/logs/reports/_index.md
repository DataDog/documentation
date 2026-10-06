---
title: 예약된 CSV 보고서
---
## 개요 {#overview}

예약된 CSV 보고서를 사용하면 이메일, Slack 또는 Microsoft Teams를 통해 구조화된 데이터 내보내기를 정기적으로 자동 수신할 수 있습니다. 이 기능은 Datadog에 로그인할 필요 없이 주요 메트릭의 주기적인 스냅샷을 제공하여 운영, 규정 준수 및 경영진 이해관계자를 지원합니다.

## 쿼리 정의 {#define-a-query}

CSV 보고서를 예약하려면 쿼리가 다음 조건을 충족해야 합니다.

* 쿼리는 [Log Explorer][1]에서 생성되어야 합니다  
* 쿼리 결과는 {{< ui >}}List{{< /ui >}} 또는 {{< ui >}}Table{{< /ui >}}로 표시되어야 합니다. 다른 시각화 유형은 지원되지 않습니다.  
* 쿼리는 복합 조건 쿼리가 아니어야 합니다([하위 쿼리][2] 사용 불가).
* 쿼리는 [계산된 필드][3] 또는 [참조 테이블][4]을 사용하지 않아야 합니다
* CSV는 최대 50,000 행으로 제한됩니다

## CSV 보고서 예약 {#schedule-a-csv-report}

1. [Log Explorer][1]에서 내보내려는 쿼리를 실행합니다.
2. 쿼리 결과 위에서 {{< ui >}}Download as CSV{{< /ui >}} 옆의 아래쪽 화살표를 클릭한 다음 {{< ui >}}Schedule CSV Report{{< /ui >}}를 선택합니다.

   <!-- TODO: recapture screenshot once the NEW badge is removed from Schedule CSV Report -->
   {{< img src="logs/reports/schedule_csv_report_menu.png" alt="Log Explorer 결과 도구 모음에서 Download as CSV 옆의 드롭다운 메뉴를 펼친 화면으로, Copy, Copy as cURL, Share event, Schedule CSV Report 옵션이 표시되어 있음" style="width:80%;" >}}

3. 열리는 구성 모달에서 보고서 일정을 설정하여 보고서 전송 시기와 빈도를 결정합니다.  
4. 보고서를 구성합니다. 보고서 제목을 정의하고 결과 보고서에 표시될 시간 범위를 결정하도록 기간을 설정합니다. 보고서의 기간은 Log Explorer에 표시되는 기간과 다를 수 있습니다.  
5. 수신자를 추가합니다.
   1. {{< ui >}}Email recipients{{< /ui >}}: 보고서에 이메일 주소를 입력하여 수신자를 추가합니다. Datadog 계정과 연결된 이메일이 수신자로 자동 추가됩니다. 본인을 수신자에서 제거하려면 이메일 위에 마우스를 올리고 옆에 나타나는 휴지통 아이콘을 클릭하세요.  
   2. {{< ui >}}Slack recipients{{< /ui >}}: 사용 가능한 드롭다운에서 Slack 워크스페이스와 채널을 선택하여 Slack 수신자를 추가합니다. Slack 워크스페이스가 보이지 않으면 Datadog [Slack Integration][5]이 설치되어 있는지 확인하세요. Slack 워크스페이스 내의 모든 공개 채널이 자동으로 나열됩니다. 비공개 Slack 채널을 선택하려면 Slack에서 해당 채널에 Datadog Slack 봇을 초대해야 합니다. Slack으로 테스트 메시지를 전송하려면 채널 수신자를 추가하고 {{< ui >}}Send Test Message{{< /ui >}}를 클릭하세요.
   3. {{< ui >}}Microsoft Teams recipients{{< /ui >}}: {{< ui >}}Microsoft Teams{{< /ui >}} 탭을 선택한 다음 사용 가능한 드롭다운에서 {{< ui >}}Tenant{{< /ui >}}, {{< ui >}}Team{{< /ui >}} 및 {{< ui >}}Channel{{< /ui >}}를 선택합니다. Datadog 조직에 [Microsoft Teams integration][7]이 설치되어 있고 Microsoft Teams의 대상 팀에 Datadog 앱이 추가되어 있는지 확인하세요. 테스트 메시지를 전송하려면 채널 수신자를 추가하고 {{< ui >}}Send Test Message{{< /ui >}}를 클릭하세요.

## 보고서 관리 {#managing-reports}

CSV 보고서를 조회하려면 [Log Explorer][1]로 이동하여 {{< ui >}}Reports{{< /ui >}} 탭을 클릭하세요. 

**참고**: 보고서는 [Saved Views][6]와 연결되어 있지 않으며 Reports 탭을 통해서만 액세스할 수 있습니다. 

* 자신만의 보고서 일정을 생성하려면 `CSV Report Schedules Write` 권한이 있어야 합니다.
* 다른 사용자의 보고서 일정을 수정하려면 `CSV Report Schedules Manage` 권한이 있어야 합니다.

보고서를 생성한 후 적절한 권한이 있는 경우 구독, 구독 취소, 일정 편집 및 보고서 삭제를 수행할 수 있습니다. `CSV Report Schedules Write` 또는 `CSV Report Schedules Manage` 권한이 없는 경우 이메일에서 직접 보고서 구독을 취소할 수 있습니다.

## 보고서 조회 {#reports-views}

| 보고서 조회                         | 설명                                                                     | 필수 권한           |
| ----------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| {{< ui >}}Created by you{{< /ui >}} | Log Explorer에서 생성한 모든 예약된 CSV 보고서를 표시합니다.              | `CSV Report Schedules Write`  |
| {{< ui >}}All Reports{{< /ui >}}    | 현재 속한 조직의 Log Explorer에 있는 모든 예약된 CSV 보고서를 표시합니다. | `CSV Report Schedules Manage` |
| {{< ui >}}Subscribed{{< /ui >}}     | 구독 중인 모든 예약된 CSV 보고서를 표시합니다                      | `CSV Report Schedules Write`  |

[1]: https://app.datadoghq.com/logs
[2]: /ko/logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /ko/logs/explorer/calculated_fields/
[4]: /ko/reference_tables/?tab=manualupload
[5]: /ko/integrations/slack/?tab=datadogforslack
[6]: /ko/logs/explorer/saved_views/#saved-views
[7]: /ko/integrations/microsoft_teams/