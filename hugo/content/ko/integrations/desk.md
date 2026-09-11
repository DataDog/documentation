---
categories:
- Collaboration
- issue tracking
custom_kind: 통합
dependencies: []
description: 이벤트 스트림에서 신규, 진행, 중단, 해결된 케이스를 확인하고 토론하세요.
doc_link: https://docs.datadoghq.com/integrations/desk/
draft: false
git_integration_title: desk
has_logo: true
integration_id: desk
integration_title: Desk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: desk
public_title: Datadog-Desk 통합
short_description: 이벤트 스트림에서 신규, 진행, 중단, 해결된 케이스를 확인하고 토론하세요.
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog에 Desk를 연결하여 OOTB 대시보드에서 Salesforce 지원 케이스 데이터를 확인하세요. 대시보드로 다음 작업을 수행할 수 있습니다.

- 이벤트 스트림에서 신규 케이스 이벤트 추적
- 사용자 및 상태별 케이스 통계 시각화
- DevOps 이슈와 지원 티켓 트렌드 확인

자세한 내용을 확인하려면 [Salesforce Desk 통합과 동일한 페이지에서 지원 유지][1]를 참조하세요.

## 설정

### 설정

Desk 계정의 설정 -> API -> 내 애플리케이션 페이지에서 API 애플리케이션을 추가합니다(관리자 권한이 필요할 수도 있습니다).

다음과 같이 양식을 작성하되 마지막 URL 필드 두 개는 비워둡니다. Desk가 애플리케이션 키, 애플리케이션 비밀번호, API 액세스 토큰, API 액세스 토큰 비밀번호를 생성합니다.

{{< img src="integrations/desk/desk_config.png" alt="desk config" popup="true">}}

그런 다음 Datadog 계정에서 [Desk 타일][2]에 회사의 고유 Desk 도메인 이름과 해당 정보를 입력합니다. 설치 버튼을 누르면 모든 설정이 완료됩니다.

설치 후 커스텀 대시보드에서 `desk.*` 메트릭을 선택하거나 제공된 [Desk 대시보드][3]에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "desk" >}}


### 이벤트

Desk 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Desk 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[2]: https://app.datadoghq.com/integrations/desk
[3]: https://app.datadoghq.com/screen/integration/desk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/