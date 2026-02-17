---
further_reading:
- link: /service_management/incident_management/investigate/
  tag: 설명서
  text: 인시던트 조사
title: 타임라인
---

## 개요

{{< img src="/service_management/incidents/investigate/timeline/timeline_tab.png" alt="Timeline 탭을 보여주는 인시던트 예시" style="width:100%;" >}}

Incident Timeline은 인시던트 발생 시에 실행된 작업의 주요 정보 출처입니다. 작업이 실행됨에 따라 변경 사항, 변경 담당자, 변경 시간을 기록하기 위해 타임라인에 시간순으로 새로운 셀이 추가됩니다.

기본적으로 타임라인 셀은 `oldest first` 순서대로 정렬되지만 타임라인 상단에 있는 버튼을 사용하여 `newest first`로 변경할 수 있습니다.

## 콘텐츠 유형

각 셀에는 셀이 포함하는 정보의 종류를 나타내는 고유한 콘텐츠 유형이 있습니다.

|  콘텐츠 유형      | 설명                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| 응답자 메모     | 인시던트 대응자가 직접 작성한 메모입니다. 대응자 메모에는 다음과 같은 하위 유형이 있습니다:<br>- *Graph*: 대응자 메모에는 하나 이상의 Datadog 그래프가 포함됩니다<br>- *Link*: 대응자 메모에는 하이퍼링크가 포함됩니다<br>- *Code*: 대응자 메모에는 코드 블록의 Markdown 구문으로 묶인 텍스트가 포함됩니다.
| 인시던트 업데이트    | 인시던트의 속성(상태 및 심각도 포함) 또는 그 영향에 관한 변경 사항.
| 통합 업데이트 | Incident Management 제품의 [통합][1]을 통해 변경된 사항.
| 작업               | Incident Details 페이지의 Remediation 섹션에서 인시던트 작업에 관한 변경 사항.
| 전송된 알림  | 인시던트 대응자가 수동 알림을 보낼 때의 업데이트.

### 응답자 메모

Incident Details 페이지의 섹션 탭 아래에 있는 텍스트 상자를 사용하여 타임라인에 직접 응답자 메모를 추가할 수 있습니다. 또는 [Slack에서 타임라인][2]에 응답자 메모를 추가할 수도 있습니다. 응답자 메모 생성 시 타임스탬프를 사용자 지정하여 타임라인의 시간 순서대로 이전 시점에 관련되었던 중요한 정보를 확인할 수 있습니다.

작성한 응답자 메모의 내용이나 타임스탬프를 편집하거나 완전히 삭제할 수 있습니다. 또한 특정 셀의 링크를 복사하여 팀원과 공유할 수도 있습니다.

### 그래프 셀

그래프 정의는 [Organization Settings][3]에서 활성화된 경우 그래프 공유 URL을 통해 저장됩니다. 그래프 셀이 타임라인에 추가된 후 24시간 동안은 Dashboards, Notebooks, 기타 페이지에서 볼 수 있는 것과 동일한 대화형 호버 상태가 유지됩니다. 타임라인에서 24시간이 지나면 그래프는 그래프가 표시하던 내용을 캡처한 정적 이미지로 대체됩니다. 데이터 보존 기간이 짧은 그래프의 경우, 그래프의 실시간 데이터가 만료된 후에도 백업을 볼 수 있도록 하기 위한 것입니다.

### 이미지

Datadog에서 호스팅할 이미지를 업로드하려면 타임라인 위의 텍스트 상자 필드에 이미지 파일을 끌어다 놓으세요. 그러면 이미지가 타임라인에 개별 셀로 추가됩니다.

또는 기존 셀에 이미지를 추가할 수도 있습니다.
{{< img src="/service_management/incidents/investigate/timeline/timeline_cell_add_image.png" alt="이미지 설명" style="width:100%;" >}}
1. 셀을 편집하려면 연필 아이콘을 클릭합니다.
2. 이미지 아이콘을 클릭하고 파일 디렉터리에서 이미지를 찾습니다.
3. 다음 옵션을 사용하여 Datadog에서 호스팅할 이미지를 업로드할 수 있습니다.
    * 업로드 영역에 이미지 파일을 끌어다 놓습니다.
    * **Choose File**을 클릭하고 파일 디렉터리에서 이미지를 찾습니다.
    * 공개적으로 접근 가능한 이미지의 URL을 붙여넣습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/service_management/incident_management/#integrations
[2]: /ko/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings