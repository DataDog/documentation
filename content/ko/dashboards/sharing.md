---
aliases:
- /ko/graphing/faq/is-there-a-way-to-share-graphs
- /ko/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /ko/graphing/dashboards/shared_graph/
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: 블로그
  text: 조직 외부인과도 안전하게 대시보드 공유하기
- link: /dashboards/
  tag: 설명서
  text: Datadog에서 대시보드 만들기
- link: /dashboards/template_variables/
  tag: 설명서
  text: 템플릿 변수가 있는 대시보드 향상
- link: /dashboards/widgets/
  tag: 설명서
  text: 대시보드용 위젯 살펴보기
kind: 설명서
title: 대시보드 공유하기
---

## 개요

공유 대시보드 및 그래프를 사용하면 Datadog 외부에 지표, 추적 및 로그 시각화를 표시할 수 있습니다.

## 대시보드
URL 또는 이메일 링크로 대시보드를 공유하면 공유 페이지에 해당 대시보드의 실시간 읽기 전용 콘텐츠가 표시됩니다.

### 퍼블릭 URL로 대시보드 공유

전체 대시보드를 공개적으로 공유하려면 URL을 생성합니다.

1. 대시보드 페이지에서 오른쪽 상단의 설정 톱니바퀴를 클릭합니다.
2. **Generate public URL**을 선택합니다.
3. **Time & Variable Settings**에서 원하는 시간 프레임 옵션과 사용자가 변경할 수 있는지 여부, 선택 가능한 템플릿 변수에 대해 표시되는 태그를 설정합니다.
4. URL을 복사하고 **Done**을 클릭합니다.

**참고**: APM 트레이스 쿼리를 기반으로 하는 위젯은 퍼블릭 대시보드에 데이터를 표시하지 않습니다. 로그 스트림 위젯도 데이터를 표시하지 않지만, 다른 로그 기반 쿼리는 표시합니다.

### 개별 이메일 주소가 있는 대시보드 공유

대시보드 페이지를 볼 수 있는 하나 이상의 특정 이메일 주소를 승인하는 방법은 다음과 같습니다.

1. 대시보드 페이지에서 오른쪽 상단의 설정 톱니바퀴를 클릭합니다.
2. **Generate public URL**을 선택합니다.
3. 이 대시보드에 액세스할 수 있는 사람을 나타내려면 **Only specified people**을 선택합니다.
4. 대시보드를 공유하고 싶은 사람의 이메일 주소를 입력합니다.
5. **Time & Variable Settings**에서 원하는 시간 프레임 옵션과 사용자가 변경할 수 있는지 여부, 선택 가능한 템플릿 변수에 대해 표시되는 태그를 설정합니다.
6. (선택 사항) 공유할 URL을 복사합니다. 특정 이메일 주소는 링크가 포함된 이메일도 수신합니다.
7. **Done**을 클릭합니다.

**참고**:
- 대시보드의 허용 목록에 추가된 개인은 이메일로 링크를 받습니다. 1시간 이내에 링크를 클릭하지 않으면 대시보드 랜딩 페이지에서 새 링크를 요청할 수 있습니다. 이메일 주소가 허용 목록에 있는 경우 새 이메일이 전송됩니다.
- 클릭하면 장치에서 최대 30일 동안 대시보드를 볼 수 있습니다. 해당 시간이 만료되면 사용자는 대시보드 랜딩 페이지에서 새 링크를 요청할 수 있습니다. 이메일 주소가 허용 목록에 있는 경우 새 이메일이 전송됩니다.
- 사용자가 허용 목록에서 제거되면 액세스 권한이 제거됩니다.
- APM 트레이스 쿼리를 기반으로 하는 위젯은 공유 대시보드에 데이터를 표시하지 않습니다. 로그 스트림 위젯도 데이터를 표시하지 않지만 다른 로그 기반 쿼리는 표시합니다.

### 취소

공유 대시보드를 취소하는 방법은 다음과 같습니다.

1. [Dashboard List][1]로 이동합니다.
2. 액세스 권한을 취소하려는 대시보드를 선택합니다.
3. 오른쪽 상단의 설정 톱니바퀴를 클릭합니다.
4. **Configure sharing**을 클릭합니다.
5. **Revoke public URL**을 클릭합니다.

### 새로고침 간격

공개적으로 공유된 대시보드는 30초마다 새로고침됩니다. 이 새로고침 간격은 맞춤 설정할 수 없습니다.

## 그래프

### 공유

[Timeboard][2] 또는 [Screenboard][3]에서 그래프를 공유하는 방법은 다음과 같습니다.

2. 공유하려는 그래프의 오른쪽 상단에 있는 연필 아이콘을 클릭합니다.
3. *Graph your data* 섹션에서 **Share** 탭을 선택합니다.
4. 그래프의 시간 프레임을 선택합니다.
5. 그래프 크기를 선택합니다.
6. 범례를 포함할지 여부를 선택합니다.
7. **Generate embed code** 버튼으로 내장 코드를 가져옵니다.

{{< img src="dashboards/sharing/share_graph.png" alt="공유 그래프" style="width:75%;">}}

### 취소

개별(내장) 그래프를 공유하는 데 사용되는 키를 취소하는 방법은 다음과 같습니다.

1. [**Integrations -> Embeds**][4]로 이동하여 모든 공유 그래프 목록을 확인합니다.
2. 공유를 중지하려는 그래프 옆에 있는 **Revoke** 버튼을 클릭합니다.
3. 그래프가 **Revoked** 목록으로 이동됩니다.

### 제한 적용

IP 주소별로 대시보드에 대한 액세스를 제한할 수 있습니다. 관리자가 공유 대시보드에 액세스하는 IP 주소 목록을 제공할 수 있도록 허용하는 IP 주소 포함 목록 기능을 활성화하려면 [Datadog 고객 지원팀][5]으로 이메일을 보내세요. 활성화되면 조직의 [Security][6] 페이지에서 제한을 관리하세요.

### 다크 모드

개인 사용자를 위한 퍼블릭 대시보드에서 다크 모드를 사용할 수 있습니다. 오른쪽 상단에 있는 태양 또는 달 아이콘을 클릭하여 모드를 전환하세요. 또한 URL 매개변수인 `theme`도 사용할 수 있습니다. 사용 가능한 값은 `dark` 및 `light`입니다.

### TV 모드

퍼블릭 스크린보드에서 TV 모드를 사용할 수 있습니다. 키보드 단축키 `F`을(를) 사용하거나, 오른쪽 상단의 TV 아이콘을 클릭하세요.

## API

Datadog에는 공유 그래프(내장)와 상호 작용할 수 있는 [전용 API][7]가 있습니다.

| 엔드포인트                 | 설명                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Get all embeds][8]     | 이전에 만든 내장 그래프 목록을 가져옵니다.                     |
| [Create embed][9]       | 새 내장 그래프를 만듭니다.                                         |
| [Get specific embed][10] | `embed_id`의 이전에 생성된 내장 요소에 대한 HTML 조각을 가져옵니다. |
| [Enable embed][11]       | 특정 내장 요소를 활성화합니다.                                             |
| [Revoke embed][12]       | 특정 내장 요소를 취소합니다.                                             |



{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /ko/dashboards/#timeboards
[3]: /ko/dashboards/#screenboard
[4]: https://app.datadoghq.com/account/settings#embeds
[5]: /ko/help/
[6]: https://app.datadoghq.com/account/org_security
[7]: /ko/api/v1/embeddable-graphs/
[8]: /ko/api/v1/embeddable-graphs/#get-all-embeds
[9]: /ko/api/v1/embeddable-graphs/#create-embed
[10]: /ko/api/v1/embeddable-graphs/#get-specific-embed
[11]: /ko/api/v1/embeddable-graphs/#enable-embed
[12]: /ko/api/v1/embeddable-graphs/#revoke-embed