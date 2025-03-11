---
aliases:
- /ko/integrations/sumologic/
categories:
- notifications
- event management
custom_kind: 통합
dependencies: []
description: Sumo Logic에서 Datadog으로 로그를 보내고 Datadog 알림을 Sumo Logic으로 보내세요.
doc_link: https://docs.datadoghq.com/integrations/sumologic/
draft: false
git_integration_title: sumo_logic
has_logo: true
integration_id: ''
integration_title: Sumo Logic
integration_version: ''
is_public: true
manifest_version: '1.0'
name: sumo_logic
public_title: Datadog-Sumo Logic 통합
short_description: Sumo Logic에서 Datadog으로 로그를 보내고 Datadog 알림을 Sumo Logic으로 보냅니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog은 두 가지 방법으로 Sumo Logic과 통합됩니다. 즉, Sumo Logic 로그 데이터를 Datadog 이벤트 스트림에 전달할 수 있고, Sumo Logic을 Datadog 경고 및 이벤트의 알림 채널로 사용할 수 있습니다. 즉, 각 서비스는 서로에게 정보를 제공할 수 있습니다.

## 설정

### 설치

#### Datadog에서 Sumo Logic으로 전송

1. 관리자 권한이 있는 사용자로 Sumo Logic에 로그인합니다.
2. 메인 메뉴에서 **Manage** -> **Collection**을 선택합니다.
3. 왼쪽 상단에 있는 **Add Collector** 링크를 클릭합니다. {{< img src="integrations/summologic/integrations-sumo-hostedcollector.png" alt="호스팅된 컬렉션" popup="true">}}
4. **Hosted Collector**를 선택합니다.
5. 이름을 입력하고 필요할 경우 설명, 카테고리 및 시간대를 입력합니다. 입력이 완료되면 **Save**를 클릭합니다.
6. Cloud APIs에서 **HTTP**를 클릭합니다. 컬렉터에 대해 적합한 양식을 작성한 후 **Save**를 클릭합니다.
7. 다음 대화 상자에 제공된 URL을 복사합니다.
8. Datadog의 [Sumo Logic Integration 설정][1] 화면으로 이동합니다.
9. 컬렉터에 할당할 이름과 위에서 복사한 URL을 입력합니다.
10. Datadog에서 Sumo Logic으로 메시지를 보내려면 **@sumologic-{YOUR COLLECTOR NAME}** 형식을 사용하세요.

#### Datadog에서 Sumo Logic으로 전송

1. 관리자 권한이 있는 사용자로 Sumo Logic에 로그인합니다.
2. 메인 메뉴에서 **Manage** -> **Connections**를 선택합니다.
3. **Add** 버튼을 클릭합니다.
4. **Datadog** 버튼을 클릭합니다. {{< img src="integrations/summologic/integrations-sumo-connectiontype.png" alt="Datadog 버튼 클릭" popup="true">}}
5. 연결에 이름을 지정하고 필요할 경우 설명을 추가합니다. URL에 다음을 입력합니다.

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<DATADOG_API_KEY>
    ```

6. 필요에 따라 페이로드를 맞춤설정할 수 있습니다. 사용 가능한 변수에 대해 알아보려면 **Help** 링크를 클릭하세요.
7. **Test Connection**을 클릭합니다.  Event Stream에 다음과 유사한 새 항목이 표시되어야 합니다. {{< img src="integrations/summologic/integrations-sumo-event.png" alt="테스트 이벤트" popup="true">}}
8. 이상이 없음을 확인한 후 **Save**를 클릭합니다.
9. Sumo Logic에서 검색을 저장하고 검색 일정을 선택합니다.
10. **Alert Type**으로 Webhook를 선택합니다. 그리고 웹훅 목록에서 새 Datadog 연결을 선택합니다. 필요한 경우 페이로드를 사용자 정의하고 **Alert Condition**을 변경하여 결과 수가 0보다 큰 경우에만 알림을 보냅니다. {{< img src="integrations/summologic/integrations-sumo-savesearch.png" alt="호스팅된 컬렉션" popup="true">}}

[1]: https://app.datadoghq.com/integrations/sumo_logic