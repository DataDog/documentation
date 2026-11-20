---
app_id: pulumi
app_uuid: 7604c52b-dc07-4854-a5e4-799ab62798d8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pulumi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10220
    source_type_name: Pulumi
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pulumi
  sales_email: team@pulumi.com
  support_email: team@pulumi.com
categories:
- aws
- 자동화
- 클라우드
- 설정 및 배포
- 개발 툴
- 오케스트레이션
- 프로비저닝
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pulumi/README.md
display_on_public_website: true
draft: false
git_integration_title: pulumi
integration_id: pulumi
integration_title: Pulumi
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pulumi
public_title: Pulumi
short_description: 선호하는 프로그래밍 언어를 사용하여 모든 클라우드에서 활용할 수 있는 코드형 인프라스트럭처
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Automation
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 선호하는 프로그래밍 언어를 사용하여 모든 클라우드에서 활용할 수 있는 코드형 인프라스트럭처
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pulumi
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Pulumi][1]는 클라우드 엔지니어링 팀이 선호하는 프로그래밍 언어를 사용하여 모든 클라우드에서 클라우드 리소스를 정의, 배포 및 관리할 수 있는 최신 코드형 인프라스트럭처 플랫폼입니다.

Pulumi 통합은 Datadog에서 사용 가능한 모든 클라우드 리소스를 프로비저닝하는 데 사용됩니다. 본 통합은 Datadog에서 자격 증명을 설정하여 리소스를 배포 및 업데이트합니다.

**참고**: 통합의 AWS IAM 권한을 설정해야 이를 변경할 수 있습니다. AWS IAM 권한 설정 단계는 [AWS 통합 문서][2]에서 확인할 수 있습니다.

## 설정

### 설치

[Pulumi Datadog 통합][3]은 Datadog SDK를 사용하여 리소스를 관리 및 프로비저닝합니다.

### 설정

1. [무료 또는 상업용 Pulumi 계정 가입하기][4]

2. [Pulumi 설치하기][5]

3. 인증 토큰을 받은 후 Pulumi Datadog 인증 토큰을 설정하는 다음 두 가지 방법이 있습니다.


다음과 같이 환경 변수 `DATADOG_API_KEY` 및 `DATADOG_APP_KEY`를 설정합니다.

```
export DATADOG_API_KEY=XXXXXXXXXXXXXX && export DATADOG_APP_KEY=YYYYYYYYYYYYYY
```

또는 여러 사용자가 쉽게 액세스할 수 있도록 Pulumi 스택과 같이 저장하고 싶다면 설정을 통해 구성합니다.

```
pulumi config set datadog:apiKey XXXXXXXXXXXXXX --secret && pulumi config set datadog:appKey YYYYYYYYYYYYYY --secret
```

**참고**: `datadog:apiKey` 및 `datadog:appKey`을 설정할 때 `--secret`을 전달하여 올바르게 암호화되도록 합니다.

4. `pulumi new`를 실행하여 인프라스트럭처 스택의 프로젝트 디렉토리를 초기화하고 [API 문서][6]에 따라 새로운 메트릭, 모니터링, 대시보드 또는 기타 리소스를 정의합니다.

5. 코드에서 클라우드 리소스를 정의한 다음 `pulumi up`을 실행하여 Pulumi 프로그램에 정의된 새 리소스를 생성합니다. 

## 수집한 데이터

### 메트릭

Pulumi는 메트릭을 포함하지 않습니다.

### 서비스 점검

Pulumi는 서비스 점검을 포함하지 않습니다.

### 이벤트

Pulumi는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://pulumi.com
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=roledelegation#aws-iam-permissions
[3]: https://www.pulumi.com/docs/intro/cloud-providers/datadog/
[4]: https://www.pulumi.com/pricing/
[5]: https://www.pulumi.com/docs/get-started/
[6]: https://www.pulumi.com/docs/reference/pkg/datadog/
[7]: https://docs.datadoghq.com/ko/help/