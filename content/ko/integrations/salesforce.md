---
categories:
- cloud
- 네트워크
custom_kind: integration
dependencies: []
description: Salesforce 실시간 플랫폼 이벤트를 Datadog 로그로 수집하세요.
doc_link: https://docs.datadoghq.com/integrations/salesforce/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/
  tag: 블로그
  text: Datadog를 사용해 Salesforce 로그 모니터링하세요.
git_integration_title: salesforce
has_logo: true
integration_id: ''
integration_title: Salesforce
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce
public_title: Salesforce
short_description: Salesforce 실시간 플랫폼 이벤트를 Datadog 로그로 수집하세요.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/salesforce/salesforce_dashboard.png" alt="Datadog에서 바로 사용 가능한 Salesforce 대시보드" popup="true">}}

## 개요

Salesforce는 고객 관계 관리 서비스를 제공하는 스위트(suite)로, 고객 서비스, 마케팅 자동화, 분석 및 애플리케이션 개발에 중점을 두고 엔터프라이즈 애플리케이션을 보완합니다.

Datadog와 Salesforce를 통합하여 다음과 같은 이점을 얻을 수 있습니다.

- [Datadog 로그 관리][1]를 사용하여 Salesforce 사용자 활동, 플랫폼 액세스 활동 및 보안 로그를 확인하고 파싱합니다.
- Salesforce 플랫폼에서 [이벤트][3]에 대한 [모니터][2]를 설정합니다.
- Datadog [보안 플랫폼][4]을 활용하여 Salesforce 플랫폼 전반에서 위협을 모니터링하고 탐지하세요.
- API 한도 내에서 운영할 수 있도록 Salesforce API 사용량을 모니터링하세요.

## 설정

### 설치

설치할 필요가 없습니다.

### 설정

Salesforce가 Datadog에 데이터를 전송하도록 설정하려면 [Salesforce 이벤트 모니터링][5]에 액세스하고  Salesforce 이벤트에서 스토리지를 활성화한 다음 Salesforce 조직을 Datadog에 연결해야 합니다.

#### 권한

[Salesforce Shield][6]를 사용하는 경우 모든 이벤트에 대한 필수 권한을 보유하게 됩니다. Shield를 사용하지 않는 경우 [이벤트 모니터링 애드온][7]이 필요합니다.

#### 이벤트 스토리지 활성화

플랫폼 또는 실시간 이벤트를 사용하려는 경우 이벤트 관리자에서 이를 설정해야 합니다. 이벤트 로그 파일 이벤트의 경우 이 단계가 필요하지 않습니다.

1. Salesforce 계정에 [로그인][8]합니다(Lightning 인터페이스 사용).
2. **이벤트 관리자**를 검색합니다.
3. 이벤트 관리자 페이지에서 크롤링하려는 각 이벤트에 대해 오른쪽 화살표를 클릭하고 **스토리지 활성화**를 선택합니다. **스트리밍 활성화**는 필요하지 않습니다. 지원되는 이벤트 목록은
[Salesforce 통합 타일][9]의 **플랫폼 이벤트** 섹션에 있는 **설정** 탭에서 확인할 수 있습니다.

#### 조직 연결하기

1. Salesforce 조직에서 고유한 시스템 계정을 만듭니다.
2. [Salesforce 통합 타일][9]의 **설정** 탭 에서 **새 프로덕션 조직** 또는 **새 샌드박스 조직**을 클릭합니다.
3. 이러한 이벤트를 첨부할 커스텀 태그를 쉼표로 구분된 목록으로 설정합니다. 활성화할 이벤트를 선택할 수 있습니다.

    {{< img src="integrations/salesforce/salesforce-1.png" alt="Datadog에서 Salesforce 조직 설정에 성공한 경우 성공 화면" popup="true" style="width:90%" >}}

4. **저장**을 클릭합니다. 그러면 Salesforce 계정 로그인하여 Datadog 액세스 권한을 허용할 것을 요청하는 메시지가 나타납니다.
5. 로그인 플로우를 완료하면 [Salesforce 통합 타일 ][9]의 [ Datadog]로 돌아갑니다. 조직에는 즉시 사용 가능한 기본값 태그 이 포함되어 있습니다.

    {{< img src="integrations/salesforce/salesforce-default-tags.png" alt="Datadog에서 Salesforce 조직 설정에 성공한 경우 성공 화면" popup="true" style="width:90%" >}}

6. 사용하려는 태그를 선택하고 **연결**을 클릭합니다.
7. 나머지 조직을 연결하려면 이 단계를 반복합니다. 추가하려는 조직에 대한 액세스 권한이 있어야 합니다.

**참고**: 기본 태그가 Salesforce 조직 ID를 사용해 추가되어 있지만, 기업에 더 의미 있는 방식으로 [해당 태그][10]를 편집할 수 있습니다.

#### Salesforce 커스텀 개체 추가하기

[Salesforce 커스텀 개체][11]를 Datadog로 수집할 수 있습니다.

1. Salesforce 통합 타일에서 커스텀 개체 섹션을 엽니다.
2. 쉼표(`CustomObject1__c, CustomObject2__c`)로 구분된 Salesforce API 형식(`CustomObject__c`)에서 커스텀 개체를 하나 이상 추가합니다.
3. 다른 Salesforce 이벤트에서와 마찬가지로 이러한 커스텀 개체를 활성화하거나 비활성화합니다.

커스텀 개체는 수정 날짜를 기준으로 로그로 수집됩니다. 모든 커스텀 개체 로그에는 자동으로 `salesforce_custom_object:true` 태그가 지정됩니다.

#### 결과

잠시 후 `salesforce` 소스 아래에 [로그][1]가 나타납니다. Salesforce는 이벤트 로그 파일을 자주 작성하지 않으므로 이벤트 로그 파일 기반 이벤트가 Datadog에 표시될 때까지 한 시간 이상이 소요될 수 있습니다.

{{< img src="integrations/salesforce/salesforce_dashboard_logs.png" alt="바로 사용 가능한 Salesforce 대시보드의 Salesforce 로그 스트림 위젯" popup="true">}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "salesforce" >}}


### 로그

이 통합에서는 [Datadog 로그 관리][1]를 사용하여 Salesforce 사용자 활동, 플랫폼 액세스 활동 및 보안에서 생성된 로그를 볼 수 있습니다. 지원되는 활동의 전체 목록은 [실시간 이벤트 모니터링 데이터 스토리지][13] 및 [EventLogFile 이벤트][14]을 참조하세요." 이 정보는 Salesforce 통합 타일의 **수집된 데이터** 탭에서도 확인할 수 있습니다.

### 서비스 점검

Salesforce 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

이 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

설정 탭 에서 `The authenticated connection does not have access` 오류가 발생하는 경우 요청된 이벤트에 액세스할 수 있는 권한이 누락되었을 수 있습니다. Salesforce에서 Datadog 역할에 대한 관리자 권한을 일시적으로 활성화하여 누락된 액세스 권한을 확인할 수 있습니다.

사용자에게 최소한 다음 권한이 있어야 합니다.

* API 활성화됨
* 구성 및 설정 보기
* 실시간 이벤트 모니터링 이벤트 보기
* 이벤트 로그 파일 보기
* 위협 탐지 이벤트 보기

또한 사용자는 설정에서 선택한 모든 기본 이벤트 개체에 대한 읽기 권한이 있어야 합니다.

도움이 필요하시면 [Datadog 지원팀][15]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/
[2]: https://app.datadoghq.com/monitors/monitor_types/
[3]: https://app.datadoghq.com/events/
[4]: https://app.datadoghq.com/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://www.salesforce.com/editions-pricing/platform/shield
[7]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[8]: https://login.salesforce.com/
[9]: https://app.datadoghq.com/integrations/salesforce
[10]: https://app.datadoghq.com/getting_started/tagging/using_tags/
[11]: https://help.salesforce.com/s/articleView?id=platform.dev_objectcreate_task_parent.htm&type=5
[12]: https://github.com/DataDog/integrations-internal-core/blob/main/salesforce/metadata.csv
[13]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[14]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[15]: https://docs.datadoghq.com/ko/help/