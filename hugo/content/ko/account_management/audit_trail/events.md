---
aliases:
- /ko/account_management/audit_trail_events/
further_reading:
- link: /account_management/audit_trail/
  tag: 설명서
  text: Audit Trail에 대해 자세히 알아보기
title: Audit Trail 이벤트
---

## 개요

[Datadog Audit Trail][1]에서는 Datadog 플랫폼 전체에서 100가지 유형 이상의 감사 이벤트를 기록합니다. 이러한 감사 이벤트는 이벤트 이름 등 다양한 제품 범주로 분류됩니다.

#### 플랫폼 이벤트
- [액세스 관리](#access-management-events)
- [에이전트](#agent)
- [API 요청](#api-request-events)
- [인증](#authentication-events)
- [대시보드](#dashboard-events)
- [통합](#integration-events)
- [모니터](#monitor-events)
- [노트북](#notebook-events)
- [OAuth](#oauth-events)
- [조직 관리](#organization-management-events)
- [보안 알림](#security-notification-events)

#### 제품별 이벤트
- [애플리케이션 성능 모니터링(APM)](#application-performance-monitoring-apm-events)
- [애플리케이션 보안 관리(ASM)](#application-security-management)
- [감사 내역](#audit-trail-events)
- [CI 가시성](#ci-visibility-events)
- [클라우드 보안 플랫폼](#cloud-security-platform-events)
- [로그 관리](#log-management-events)
- [메트릭](#metrics-events)
- [실제 사용자 모니터링](#real-user-monitoring-events)
- [중요한 데이터 스캐너(#sensitive-data-scanner-events)
- [서비스 수준 목표](#service-level-objectives-slo-events)
- [신서틱 모니터링](#synthetic-monitoring-events)
- [레퍼런스 테이블](#reference-table-events)
- [워크플로우](#workflow-events)


감사 내역 설정과 구성에 관한 자세한 내용은 [Audit Trail 문서][2]를 참고하세요.

## 감사 이벤트

### 액세스 관리 이벤트

| 이름        | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [애플리케이션 키][3](서비스 계정 사용자) | 사용자가 서비스 계정 사용자의 애플리케이션 키를 생성, 수정 또는 삭제했습니다. | `@evt.name:"Access Management" @asset.type:application_key` |
| [인증 방법][4](Org) | 사용자가 조직에 허용된 인증 방법과 이전 값 및 새 값을 수정했습니다. | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [이메일][5]       | 계정에서 이메일이 Datadog 계정의 사용자로 추가, 비활성화 또는 확인되었습니다. | `@evt.name:"Access Management" @asset.type:user` |
| [역할 수정됨][6]  | 역할과 이전 및 현재 권한이 수정되었습니다. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [역할이 생성 또는 삭제됨][7] | 조직에서 역할이 생성되거나 삭제되었습니다. | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [역할 액세스 요청][8] | 사용자가 역할과 관련한 액세스 요청과 액세스 요청 값을 생성 또는 삭제했거나 그에 응답했습니다. | `@evt.name:"Access Management" @asset.type:role_request` |
| [사용자 역할][6] | 조직 역할에서 사용자가 추가되거나 삭제되었습니다. | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [비밀번호][9] | 사용자가 조직 비밀번호를 수정했습니다. | `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [제한 정책][86] | 리소스의 제한 정책이 수정되었습니다. | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |

### 에이전트

| 이름  | 감사 이벤트 설명                          | 감사 탐색기에서 쿼리              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [에이전트 플레어 생성됨][87] | 지원 티켓용 Datadog 에이전트 플레어가 생성되었습니다.| `@evt.name:Datadog Agent @action:created @asset.type:agent_flare` |

### API 요청 이벤트

| 이름  | 감사 이벤트 설명                          | 감사 탐색기에서 쿼리              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API 요청][10] | API 요청은 Datadog 플랫폼 전체에서 이루어집니다. | `@evt.name:Request @action:accessed` |

### 애플리케이션 성능 모니터링(APM) 이벤트
| 이름 | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [보존 필터][11] | 사용자가 [보존 필터][12]와 리텐션 필터 설정의 이전 및/또는 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:APM @asset.type:retention_filter` |
| [스팬 기반 메트릭][13] | 사용자가 [스팬 기반 메트릭][14]과 메트릭 설정의 이전 및/또는 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:APM @asset.type:custom_metrics` |
| [패싯][15] | 사용자가 [패싯][16]과 패싯 설정의 이전 및/또는 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:APM @asset.type:facet` |
| [기본 작업 이름][17] | 사용자가 서비스의 [기본 작업 이름][18]과 설정의 이전 및/또는 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:APM @asset.type:service_operation_name` |
| [두 번째 기본 태그][19] | 사용자가 [두 번째 기본 태그][20]와 그 설정의 이전 및/또는 새 값을 추가, 수정 또는 삭제했습니다.  | `@evt.name:APM @asset.type:second_primary_tag` |
| [원격으로 설정된 샘플링 속도][21] | 사용자가 APM 샘플링 속도를 원격으로 설정했습니다.  | `@evt.name:APM @asset.type:samplerconfig` |

### 애플리케이션 보안 관리

{{% audit-trail-asm %}}

### Audit Trail 이벤트

| 이름  | 감사 이벤트 설명                          | 감사 탐색기에서 쿼리              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [CSV로 다운로드][25] | 사용자가 감사 이벤트 목록을 CSV로 내보냅니다. | `@evt.name:Audit Trail @asset.type:audit_events_csv` |

### 인증 이벤트

| 이름                    | 감사 이벤트 설명                                                                    | 감사 탐색기에서 쿼리                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API 키][26](Org 설정)         | Organization Settings 페이지에서 API 키에 액세스하고, 목록을 보고, 생성하거나 삭제할 수 있습니다.        | `@evt.name:Authentication @asset.type:api_key`          |
| [애플리케이션 키][27](조직 설정) | Organization Settings 페이지에서 애플리케이션 키에 액세스하고, 목록을 보고, 생성하거나 삭제할 수 있습니다.| `@evt.name:Authentication @asset.type:application_key`  |
| [공개 API 키][28](조직 설정)  | Organization Settings 페이지에서 공개 API 키에 액세스하고, 목록을 보고, 생성하거나 삭제할 수 있습니다.  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [사용자 로그인][29]                     | 사용자가 Datadog에 로그인하고 인증 방법을 사용했습니다.                                  | `@evt.name:Authentication @action:login`                |

### CI 가시성 이벤트
| 이름                            | 감사 이벤트 설명                                   | 감사 탐색기에서 쿼리                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [리포지토리 기본 분기][30] | 사용자가 리포지토리의 기본 브랜치를 수정했습니다.          | `@evt.name:"CI Visibility" @asset.type:ci_app_repository @action:modified`                                            |
| [테스트 서비스 설정][93]     | 사용자가 테스트 서비스의 설정을 생성하거나 수정했습니다.   | `@evt.name:"CI Visibility" @asset.type:ci_app_test_service_settings (@action:created OR @action:modified)`            |
| [GitHub 계정 설정][94]   | 사용자가 GitHub 계정 설정을 수정했습니다.             | `@evt.name:"CI Visibility" @asset.type:github_opt_ins (@action:modified OR @action:deleted)`                          |
| [제외 필터][95]         | 제외 필터가 수정되었습니다.                    | `@evt.name:"CI Visibility" @asset.type:ci_app_exclusion_filters @action:modified`                                     |
| [품질 게이트 규칙][96]        | 사용자가 품질 게이트 규칙을 생성, 수정 또는 삭제했습니다. | `@evt.name:"CI Visibility" @asset.type:ci_app_quality_gates (@action:created OR @action:modified OR @action:deleted)` |

### 클라우드 보안 플랫폼 이벤트

{{% audit-trail-security-platform %}}

### 대시보드 이벤트

| 이름               | 감사 이벤트 설명                                                                        | 감사 탐색기에서 쿼리                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [대시보드 생성됨][35] | 대시보드와 대시보드의 새 JSON 값이 생성되었습니다.                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [대시보드 삭제됨][36] | 대시보드와 대시보드의 이전 JSON 값이 삭제되었습니다.                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [대시보드 포함됨][37] (Roadie) | Datadog 대시보드가 [타사에 포함][38]되어 사용자가 대시보드를 볼 수 있습니다.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [대시보드 수정됨][39] | 대시보드와 대시보드의 이전 및 새 JSON 값이 수정되었습니다.                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [대시보드 사용자가 추가됨][40] | 사용자가 대시보드에 액세스할 수 있는 사용자 ID와 새 사용자 ID 목록을 추가했습니다.                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [대시보드 사용자가 삭제됨][41] | 사용자가 대시보드에 접근할 수 있는 사용자 ID와 삭제된 사용자 ID의 목록을 삭제하였습니다.       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [공용 URL 액세스됨][42] | 공용 대시보드 URL이 액세스되었습니다.                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[공용 URL이 생성 또는삭제됨][43]  | 대시보드를 볼 수 있는 공용 URL이 생성되거나 삭제되었습니다.                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### 통합 이벤트

| 이름     | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [리소스][44] | 통합에서 리소스(채널, 서비스, 웹후크, 계정, 인스턴스 등)가 추가, 수정 또는 삭제될 때마다 설정의 이전 값과 새 값이 표시됩니다. | `@evt.name:Integration @asset.type:integration` |

### 로그 관리 이벤트
| 이름 | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [아카이브 설정][45] | 사용자가 아카이브 설정과 해당 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:archive` |
| [커스텀 메트릭][46] | 사용자가 로그의 커스텀 메트릭과 커스텀 메트릭 설정의 이전 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [제외 필터 설정][47] | 사용자가 제외 필터 설정과 해당 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [패싯][48] | 사용자가 로그 탐색기에서 패싯과 해당 패싯 설정의 이전 값과 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:facet` |
| [기록 보기][49] | 사용자가 로그 기록 보기와 기록 보기 설정의 이전 및 새 값을 생성, 수정, 중단 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:historical_view` |
| [인덱스 설정][50] | 사용자가 인덱스 설정과 해당 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:index` |
| [로그 파이프라인][51] | 사용자가 로그 파이프라인 또는 중첩 파이프라인 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:pipeline` |
| [프로세서][52] | 사용자가 파이프라인 내의 프로세서와 그 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [쿼리][97](공용베타)| 사용자가 로그 탐색기, 대시보드 또는 공용 API를 통해 로그 관리 목록 쿼리를 실행했습니다. | `@evt.name:"Log Management" @asset.type:logs_query` |
| [제한 쿼리 설정][53] | 사용자가 로그의 제한 쿼리 설정과 해당 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [표준 속성 설정][54] | 사용자가 로그의 표준 속성 설정과 해당 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [CSV로 다운로드][55] | 사용자가 로그 목록을 CSV로 내보냅니다. | `@evt.name:"Log Management" @asset.type:logs_csv` |

### 메트릭 이벤트
| 이름 | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [커스텀 메트릭 생성됨][56] | 사용자가 커스텀 메트릭과 커스텀 메트릭 설정의 새 값을 생성했습니다. | `@evt.name:Metrics @asset.type:metric @action:created` |
| [커스텀 메트릭 삭제됨][57] | 사용자가 커스텀 메트릭과 커스텀 메트릭 설정의 이전 값을 삭제했습니다.  | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [커스텀 메트릭 수정됨][58] | 사용자가 커스텀 메트릭과 커스텀 메트릭 설정의 이전 값 및 새 값을 수정했습니다. | `@evt.name:Metrics @asset.type:metric @action:modified` |

### 모니터링 이벤트

| 이름             | 감사 이벤트 설명                                           | 감사 탐색기에서 쿼리                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [모니터 생성됨][59]  | 모니터와 모니터의 새 JSON 값이 생성되었습니다.                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [모니터 삭제됨][60]  | 모니터와 모니터의 이전 JSON 값이 삭제되었습니다.           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [모니터 수정됨][61] | 모니터와 모니터의 이전 및 새 JSON 값이 수정되었습니다.  | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [모니터 확인됨][62] | 모니터가 확인되었습니다.                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### 노트북 이벤트

| 이름              | 감사 이벤트 설명                                            | 감사 탐색기에서 쿼리                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [노트북 생성됨][63]  | 노트북과 노트북의 새 JSON 값이 생성되었습니다.                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [노트북 삭제됨][64]  | 노트북과 노트북의 이전 JSON 값이 삭제되었습니다.           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [노트북 수정됨][65] | 노트북과 노트북의 이전 및 새 JSON 값이 수정되었습니다. | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth 이벤트

| 이름         | 감사 이벤트 설명                                                                    | 감사 탐색기에서 쿼리                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth 클라이언트][66] | 사용자가 OAuth 클라이언트와 OAuth 클라이언트의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:OAuth @asset.type:oauth_client` |

### 조직 관리 이벤트

| 이름                 | 감사 이벤트 설명                                                       | 감사 탐색기에서 쿼리                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Audit Trail 설정][67] | 사용자가 Audit Trail 설정과 이전 및 새 설정을 수정했습니다. | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |
| [하위 조직 생성됨][92] | 사용자가 기존 Datadog 조직의 새 하위 조직을 생성했습니다.  | `@evt.name:"Organization Management" @asset.type:organization @action:created` |

### 실제 사용자 모니터링 이벤트
| 이름 | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM 애플리케이션 생성됨][68] | 사용자가 RUM 및 해당 애플리케이션 유형(Browser, Flutter, iOS, React Native, Android)에서 애플리케이션을 생성하거나 삭제했습니다. | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM 애플리케이션 수정됨][69] | 사용자가 RUM에서 애플리케이션, 애플리케이션의 새 값, 애플리케이션 유형(Browser, Flutter, iOS, React Native, Android)을 수정했습니다. | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:modified` |

### 보안 알림 이벤트
| 이름                 | 감사 이벤트 설명                                                       | 감사 탐색기에서 쿼리                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [토큰 유출][80] | Datadog에서 유출되어 취소해야 하는 Datadog API 또는 애플리케이션 키를 감지했습니다.| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [로그인 방법 재정의][85] | Datadog에서 조직에 설정된 기본 로그인 방법과 다른 사용자 로그인 방법이 재정의된 것을 감지했습니다.| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [비정상적인 로그인][84] | Datadog에서 비정상적인 로그인 이벤트를 감지했습니다.| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |

### 중요한 데이터 스캐너 이벤트
| 이름 | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [스캐닝 그룹][70] | 사용자가 중요한 데이터 스캐너에서 검사 그룹과 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [스캐닝 규칙][71] | 사용자가 중요한 데이터 스캐너의 검사 그룹의 검사 규칙과 설정의 이전 값 및 새 값을 생성, 수정 또는 삭제했습니다. | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### 서비스 수준 목표(SLO) 이벤트

| 이름          | 감사 이벤트 설명                                                                       | 감사 탐색기에서 쿼리                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][72]           | 사용자가 SLO와 SLO의 이전 값 및 새 값을 생성, 수정 또는 삭제합니다.| `@evt.name:SLO @asset.type:slo`            |
| [SLO 수정][73]| 사용자가 SLO 수정 사항과 이전 및 새 값을 생성, 수정 또는 삭제합니다. | `@evt.name:SLO @asset.type:slo_correction` |


### 신서틱 모니터링 이벤트
| 이름                     | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [프라이빗 위치][66] | 사용자가 신서틱 테스트를 실행하기 위해 프라이빗 위치를 생성하거나 삭제했습니다. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [신서틱 테스트 생성 또는 삭제됨][74] | 사용자가 신서틱 테스트를 생성하거나 삭제했습니다. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [신서틱 테스트 수정됨][75] | 사용자가 신서틱 테스트와 설정의 이전 값 및 새 값을 수정했습니다. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [신서틱 변수][76] | 사용자가 신서틱 변수를 생성, 수정 또는 삭제했습니다. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [신서틱 설정][77] | 사용자가 신서틱 설정(쿼터, PL 액세스)과 이전 및 새 설정 값을 수정했습니다. | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### 레퍼런스 테이블 이벤트
| 이름                     | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [레퍼런스 테이블][78] | 사용자가 레퍼런스 테이블을 생성, 삭제 또는 수정했습니다.  | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [레퍼런스 테이블 파일][79] | 사용자가 레퍼런스 테이블용 파일을 업로드했거나 클라우드 공급자를 통해 파일을 가져왔습니다. | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

### 워크플로우 이벤트
| 이름                     | 감사 이벤트 설명                                          | 감사 탐색기에서 쿼리                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [워크플로우][88] | 사용자가 워크플로우를 생성, 삭제 또는 수정했거나 워크플로우를 실행했습니다.  | `@evt.name:"Workflows" @asset.type:workflow @action:(created OR deleted OR modified OR executed)` |
| [워크플로우 일정][89] | 사용자가 워크플로우 스케줄을 생성, 삭제 또는 수정했습니다. | `@evt.name:"Workflows" @asset.type:workflow_schedule @action:(created OR deleted OR modified)` |
| [워크플로우 액션][90] | 워크플로우 실행 중에 사용자가 Slack 프롬프트에 응답했습니다. | `@evt.name:"Workflows" @asset.type:workflow_action @action:(responded)` |
| [커스텀 연결][91] | 사용자가 연결을 생성, 삭제 또는 수정했습니다.  | `@evt.name:"Custom Connections" @asset.type:custom_connection @action:(created OR deleted OR modified)` |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /ko/account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[12]: /ko/tracing/trace_pipeline/trace_retention/#retention-filters
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[14]: /ko/tracing/trace_pipeline/generate_metrics/
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[16]: /ko/tracing/trace_explorer/facets/
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[18]: /ko/tracing/guide/configuring-primary-operation/
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[20]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Aip_user_denylist
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Ablocking_configuration
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Acompatible_services
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[26]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_repository%20%40action%3Amodified
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[38]: https://roadie.io/docs/integrations/datadog/
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[41]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[80]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apasslist_entry
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apolicy_entry
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Awaf_custom_rule
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy
[87]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40asset.type%3Aagent_flare%20%40action%3Acreated
[88]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow%20%40action%3A%28modified%20OR%20created%20OR%20deleted%20OR%20executed%29
[89]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_schedule%20%40action%3A%28modified%20OR%20created%20OR%20deleted%29
[90]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_action%20%40action%3Aresponded
[91]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Custom%20Connections%22%20%40asset.type%3Acustom_connection
[92]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization%20Management%22%20%40asset.type%3Aorganization%20%40action%3Acreated
[93]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_test_service_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%29
[94]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Agithub_opt_ins%20%28%40action%3Amodified%20OR%20%40action%3Adeleted%29
[95]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_exclusion_filters%20%40action%3Amodified
[96]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[97]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_query