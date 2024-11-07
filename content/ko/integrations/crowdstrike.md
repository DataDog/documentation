---
categories:
- 클라우드
- 로그 수집
- 로그 수집
- 네트워크
- 보안
custom_kind: 통합
dependencies: []
description: CrowdStrike
doc_link: https://docs.datadoghq.com/integrations/crowdstrike/
draft: false
git_integration_title: crowdstrike
has_logo: true
integration_id: ''
integration_title: CrowdStrike
integration_version: ''
is_public: true
manifest_version: '1.0'
name: crowdstrike
public_title: CrowdStrike
short_description: 실시간 CrowdStrike 감지 이벤트를 수집하고 Datadog 로그로 알림을 보내세요.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[CrowdStrike][1]는 위반 사항, 랜섬웨어, 사이버 공격을 막는 단일 에이전트 솔루션입니다. 엔드포인트, 워크로드, 데이터, ID에 복합적인 가시성을 제공하고 이를 보호해 줍니다.

CrowdStrike 통합을 사용하면 실시간 CrowdStrike 감지 이벤트를 수집하고 Datadog 로그로 알림을 보낼 수 있습니다.

## 설정

### 설치

설치할 필요가 없습니다.

### 설정

#### 이벤트 스트리밍 활성화

[이벤트 스트림][2]에 연결하기 전에 [CrowdStrike 지원 팀에 문의][3]해 내 고객 계정 API 스트리밍을 활성화하세요.

#### CrowdStrike 계정 연결

스트리밍을 활성화한 뒤 CrowdStrike에서 새 API 클라이언트를 추가하세요.

1. Falcone 콘솔에 로그인하세요.
1.  [Support > API Clients and Keys][4]로 이동하세요.
1. **Add new API client**를 클릭하세요.
1. Falcon과 API 작업 로그(예: `Datadog`)에서 내 API  클라이언트를 파악할 수 있는 클라이언트 이름을 입력합니다.
1. (선택 사항) API 클라이언트의 용도와 같은 설명을 입력합니다.
1. API 범위 전체에 **Read** 액세스를 부여합니다.
1. **Add**를 클릭합니다.

#### 로그 수집 활성화

Datadog에서 [CrowdStrike 통합 타이틀][5]에 API 클라이언트 상세정보를 입력합니다.

1.  **Connect a CrowdStrike Account**를 클릭합니다.
1. API 클라이언트 ID, 클라이언트 비밀, API 도메인을 복사 및 붙여 넣습니다.
1. (선택 사항) 쉼표로 구분된 태그 목록을 입력합니다.
1. **Submit**을 클릭합니다.

몇 분 후, 소스 `crowdstrike`와 [로그][6]가 [Crowdstrike Log Overview 대시보드][7]에 나타납니다.

## 수집한 데이터

### 메트릭

CrowdStrike 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

CrowdStrike 통합을 사용하면 Datadog에서 다음 이벤트를 수집합니다.

* 감지 요약
* 방화벽 일치
* ID 보호
* Idp 감지 요약
* 인시던트 요약
* 인증 이벤트
* 감지 상태 업데이트
* IoCs 업로드
* 네트워크 포함 이벤트
* IP 허용 목록 이벤트
* 정책 관리 이벤트
* CrowdStrike 스토어 활동
* 실시간 대응 세션 시작/종료
* 이벤트 스트림 시작/중지

이와 같은 이벤트를 [Crowdstrike Log Overview 대시보드][7]에서 확인할 수 있습니다.

### 서비스 점검

CrowdStrike 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://www.crowdstrike.com/
[2]: https://docs.datadoghq.com/ko/service_management/events/explorer/
[3]: https://supportportal.crowdstrike.com/
[4]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[5]: https://app.datadoghq.com/integrations/crowdstrike
[6]: /ko/logs/
[7]: https://app.datadoghq.com/dash/integration/32115/crowdstrike-overview
[8]: https://docs.datadoghq.com/ko/help/