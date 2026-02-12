---
categories:
- 자동화
- 클라우드
- 설정 및 배포
- 개발 툴
- 메트릭
custom_kind: 통합
dependencies: []
description: Travis CI에 연결하여 빌드 시간, 빌드 상태, 작업 등에 관한 메트릭을 확인하세요.
doc_link: https://docs.datadoghq.com/integrations/travis_ci/
draft: false
git_integration_title: travis_ci
has_logo: true
integration_id: ''
integration_title: Travis CI
integration_version: ''
is_public: true
manifest_version: '1.0'
name: travis_ci
public_title: Datadog-Travis CI 통합
short_description: Travis CI에 연결하여 빌드 시간과 빌드 상태에 관한 메트릭을 확인하세요.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Travis CI는 소프트웨어 프로젝트를 빌드하고 테스트하는 데 사용되는 호스팅형 지속적 통합 서비스입니다. Travis CI에 연결하여 빌드 시간, 빌드 상태, 작업 등에 관한 메트릭을 확인하세요.

## 설정

### 설치

Travis CI 통합을 [통합 타일][1]을 사용하여 설치할 수 있습니다.

### 설정

1. 계정 이름, API 토큰(Travis CI의 프로필 탭에 있음), 프로젝트 유형을 추가하세요. 프로젝트 유형은 다음과 같이 결정됩니다.

    - _Open source_는 travis-ci.org에 연결된 리포지토리입니다.
    - _Private_는 travis-ci.co에 연결된 리포지토리입니다.
    - _Enterprise_는 커스텀 Travis CI 도메인에 연결된 리포지토리입니다.

2. 계정이 Travis CI Enterprise에 속한 경우 커스텀 도메인을 입력합니다.
3. 필요한 경우 "Add row"를 클릭하여 여러 계정을 추가합니다.
4. 'Install'을 클릭합니다(최초 설치 시에만 해당).
5. 해당 API 키를 사용하여 메트릭을 수집하려는 조직과 리포지토리를 추가합니다.
6. 조직 내의 모든 리포지토리의 메트릭을 수집하려면 Project 아래에 `<ORGANIZATION_NAME>/*`을 입력합니다.
7. 'Update Configuration'을 클릭합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "travis_ci" >}}


### 이벤트

Travis CI 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Travis CI 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/travis_ci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/travis_ci/travis_ci_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/
