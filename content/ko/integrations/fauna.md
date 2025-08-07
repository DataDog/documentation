---
app_id: fauna
categories:
- 클라우드
- 데이터 저장
- log collection
custom_kind: 통합
description: Datadog에 Fauna 쿼리 로그 가져오기
integration_version: 1.0.0
media:
- caption: Fauna 대시보드 개요
  image_url: images/fauna_dashboard_overview.png
  media_type: image
- caption: Fauna 대시보드 그래프
  image_url: images/fauna_dashboard_2.png
  media_type: image
- caption: Fauna 대시보드 로그
  image_url: images/fauna_dashboard_logs.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Fauna
---
## 개요

Fauna는 완전한 관리 기능을 갖춘 분산형 문서 관계 데이터베이스입니다. 이 통합을 사용하면 Fauna 데이터베이스 쿼리 로그를 Datadog에 스트리밍할 수 있습니다. 이를 통해 실시간으로 쿼리를 확인하고 쿼리에 대한 다음 정보를 확인할 수 있습니다.

1. Fauna 비용 측정
   1. 읽기 작업
   1. 쓰기 작업
   1. 컴퓨팅 작업
1. 쿼리 시간
1. 쿼리 크기 측정
   1. 요청 및 응답 크기
1. 쿼리 형태
   1. 개인 식별 가능 데이터가 제거된 완전한 요청 본문입니다.
1. 쿼리 응답 코드

로그에서 사용 가능한 전체 필드 목록은 [Fauna 쿼리 로그 기록 형식](https://docs.fauna.com/fauna/current/tools/query_log/reference/log_reference)을 참조하세요.

## 설정

### 설치

1. [Fauna 통합 타일](https://app.datadoghq.com/integrations/fauna)에서 'Connect Accounts' 버튼을 클릭하여 OAuth 플로우를 시작하고 Fauna 및 Datadog 계정을 연결합니다.
1. Fauna로 이동하면 연결하려는 계정으로 로그인합니다. 이미 Fauna 계정에 로그인한 경우 이 단계를 건너뛸 수 있습니다.
1. Fauna 생성 통합 페이지로 이동되면 Datadog로 로그를 스트리밍하려는 지역 그룹 또는 데이터베이스를 선택할 수 있습니다. 그런 다음 **Create**을 클릭합니다.
1. Datadog로 이동하면 **Authorize**를 클릭하여 Fauna가 데이터베이스 쿼리 로그를 전송하는 데 사용할 계정의 API 키를 생성하도록 허용합니다.

이 플로우가 완료되면 [Fauna 통합 페이지](https://dashboard.fauna.com/resources/integrations)로 이동되고 활성 통합이 표시됩니다.

다음 10분 동안 [Fauna 개요 대시보드](https://app.datadoghq.com/dashboard/lists?q=Fauna%20Overview)가 시작되어 구성된 지역 그룹 또는 데이터베이스에 발행된 모든 쿼리의 로그를 표시하기 시작합니다.
위에 발행된 쿼리는 'fauna' 서비스 아래의 [Datadog 로그 탐색기](https://docs.datadoghq.com/logs/explorer/)에도 나타납니다.

### 설정

Fauna 통합에 다음 설정을 구성할 수 있습니다.

1. 데이터베이스 쿼리 로그가 전송될 지역 그룹
   1. 해당 통합에 지역 그룹이 활성화된 경우 쿼리 로그가 활성화된 지역 그룹의 모든 데이터베이스로 전송됩니다.
1. 쿼리 로그를 전송받는 데이터베이스
1. 통합 상태(활성, 또는 중단됨). 중단되면 로그가 전송되지 않습니다.

[Fauna 통합 페이지](https://dashboard.fauna.com/resources/integrations)를 방문하여 구성 설정을 업데이트하거나 통합을 제거합니다.

업데이트가 [Fauna 개요 대시보드](https://app.datadoghq.com/dashboard/lists?q=Fauna%20Overview) 및 [Datadog 로그 탐색기(https://docs.datadoghq.com/logs/explorer/)에 표시될 때까지 최대 10분이 소요될 수 있습니다.

### 검증

올바르게 구성되면 10분 내에 [Fauna 개요 대시보드](https://app.datadoghq.com/dashboard/lists?q=Fauna%20Overview) 및 'fauna' 서비스 아래 있는  [Datadog 로그 탐색기](https://docs.datadoghq.com/logs/explorer/)에서 로그를 확인할 수 있습니다.

### 삭제

- [Fauna 통합 페이지](https://dashboard.fauna.com/resources/integrations)를 방문하여 Datadog 통합을 제거합니다.
- 이 통합이 설치 제거되면 이전 인증은 취소됩니다.
- 추가적으로 [API 키 페이지](https://app.datadoghq.com/organization-settings/api-keys)에서 통합 이름을 검색하여 이 통합과 연결된 모든 API 키가 비활성화되었는지 확인합니다. 

## 수집한 데이터

### 로그

Fauna는 통합에서 구성된 데이터베이스 내 모든 쿼리에 대한 로그를 포함합니다.
지역 그룹으로 통합이 구성된 경우 지역 그룹 내에 있는 모든 데이터베이스의 쿼리 로그를 포함합니다.

## 트러블슈팅

도움이 필요하세요? [Fauna 지원 팀](mailto:support@fauna.com)에 문의하세요.