---
app_id: aws-pricing
app_uuid: 74fb11c5-4dea-4b17-acac-2c2453ea6331
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: aws.pricing.amazonecs
      metadata_path: metadata.csv
      prefix: aws.pricing.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10085
    source_type_name: AWS Pricing
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: tsein@brightcove.com
  support_email: tsein@brightcove.com
categories:
- aws
- cloud
- 비용 관리
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md
display_on_public_website: true
draft: false
git_integration_title: aws_pricing
integration_id: aws-pricing
integration_title: AWS Pricing
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: aws_pricing
public_title: AWS Pricing
short_description: 요금 코드별로 서비스에 대한 AWS Pricing 정보를 수집합니다.
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::AWS
  - "\b카테고리::클라우드"
  - Category::Cost Management
  configuration: README.md#Setup
  description: 요금 코드별로 서비스에 대한 AWS Pricing 정보를 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Pricing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 검사는 [AWS에 게시된][1] 요금 정보를 가져와 Datadog 내에서 리소스 활용 비용을 더 쉽게 측정할 수 있도록 해줍니다.

## 설정

AWS Pricing 검사는 [Datadog Agent][2] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 AWS Pricing 검사를 설치하세요. Docker Agent 또는 이전 버전의 Agent와 함께 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 Agent 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-aws_pricing==<INTEGRATION_VERSION>
   ```

2. 통합을 코어 [통합][4]과 유사하게 설정하세요.

### 설정

1. AWS Pricing 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `aws_pricing.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 샘플 [aws_pricing.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

### 검증

[Agent의 하위 명령을 실행][7]하고 Checks 섹션에서 `aws_pricing`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aws_pricing" >}}


### 이벤트

AWS Pricing은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "aws_pricing" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://aws.amazon.com/pricing/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ko/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/