---
app_id: lambdatest
app_uuid: 8d4556af-b5e8-4608-a4ca-4632111931c1
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lambdatest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10243
    source_type_name: LambdaTest
  logs:
    source: lambdatest
  oauth: assets/oauth_clients.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: LambdaTest
  sales_email: prateeksaini@lambdatest.com
  support_email: prateeksaini@lambdatest.com
categories:
- 자동화
- ㅊ
- 인시던트
- 문제 추적
- 테스팅
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_on_public_website: true
draft: false
git_integration_title: lambdatest
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lambdatest
public_title: LambdaTest
short_description: 가장 강력한 자동화 테스트 플랫폼
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Containers
  - Category::Incidents
  - 카테고리::이슈 추적
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 가장 강력한 자동화 테스트 플랫폼
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: LambdaTest
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

LambdaTest와 통합하여 팀이 효율적으로 협업하고 테스트할 수 있도록 지원하세요. LambdaTest는 사용자가 2000개 이상의 브라우저, 브라우저 버전 및 운영 체제에서 웹사이트와 웹 앱에 대한 수동 및 자동 테스트를 실행할 수 있는 클라우드 기반 테스트 플랫폼입니다.

LambdaTest는 Selenium, Cypress, TestCafe 등과 같은 수동 및 다양한 자동화 테스트 프레임워크를 지원합니다.

LambdaTest 통합을 사용하면 웹사이트(및 웹 앱)의 크로스 브라우저 테스트를 수행하면서 버그를 기록할 수 있습니다. LambdaTest는 브라우저 버전, OS, 해상도, 댓글, 스크린샷 등 환경 테스트의 세부 정보를 Datadog에 자동으로 포함합니다.

LambdaTest가 제공하는 기능은 다음과 같습니다.

- 클라우드 기반 인프라스트럭처에서 호스팅되는 2000개 이상의 브라우저와 실제 머신에서의 실시간 대화형 테스트를 제공합니다.
- 온라인 자동화 테스트 그리드는 모든 CI/CD 파이프라인을 통해 Selenium 및 Cypress 테스트를 지원하여 QA 팀이 품질 빌드를 더 빠르게 검증하고 출시할 수 있도록 지원합니다.
- 개발자 친화적인 차세대 브라우저로 성능과 반응성이 뛰어난 웹사이트를 빠르게 구축할 수 있습니다.
- 프로젝트 관리, 커뮤니케이션, 코딩 없는 자동화, CI/CD 등을 위한 타사 도구가 포함된 100개 이상의 통합을 제공합니다.
- 도움말은 연중무휴 24시간 채팅 지원 서비스를 제공합니다.
- 100분 무료 자동화 테스트가 제공되는 플랫폼에 평생 무료로 액세스할 수 있습니다.

## 설정

모든 설정은 LambdaTest 대시보드에서 이루어집니다. [LambdaTest-Datadog 통합][1] 설정 설명서를 참조하세요.

### 구성

LambdaTest를 사용하여 Datadog에서 인시던트를 추적하는 방법은 다음과 같습니다.

1. LambdaTest의 로그인 페이지에서 **계정 연결**을 클릭하여 LambdaTest 인증( 통합 )을 시작합니다.
2. LambdaTest 웹사이트의 LambdaTest 계정에 로그인하면 Datadog 인증 페이지로 리디렉션됩니다.
3. **인증**을 클릭하여 통합 프로세스를 완료합니다.
4. 통합 설정이 완료되면 확인 이메일이 전송됩니다.
5. Datadog가 LambdaTest 계정과 통합되면 버그 로깅과 크로스 브라우저 테스트를 시작하세요.

## 삭제

이 통합을 제거하면 이전 권한이 모두 취소됩니다. 

또한 [API 키 관리 페이지][2]에서 통합 이름을 검색하여 이 통합 키와 관련된 모든 API 키가 비활성화되었는지 확인하세요.

## 지원

지원 또는 기능 요청이 필요한 경우 다음 채널을 통해 LambdaTest에 문의하세요.

이메일: support@lambdatest.com
전화: +1-(866)-430-7087
웹사이트: https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=LambdaTest