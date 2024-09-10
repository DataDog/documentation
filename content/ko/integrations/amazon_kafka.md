---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws.msk.go.threads
      metadata_path: metadata.csv
      prefix: aws.msk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10080
    source_type_name: Amazon Kafka
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_kafka
integration_id: amazon-kafka
integration_title: Amazon MSK(에이전트)
integration_version: 4.6.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_kafka
public_title: Amazon MSK(에이전트)
short_description: Amazon MSK 클러스터 상태와 성능을 모니터링하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon MSK 클러스터 상태와 성능을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MSK(에이전트)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Amazon Managed Streaming for Apache Kafka(MSK)는 Apache Kafka를 이용해 스트리밍 데이터를 처리하는 애플리케이션을 빌드하고 실행하기 쉽게 도와주는 전체 관리형 서비스입니다.

[Datadog 에이전트](#setup) 또는 클라우드와치(CloudWatch)에서 메트릭을 수집하는 [크롤러][1]를 사용해 두 가지 방법으로 이 통합에서 메트릭을 수집할 수 있습니다.

## 설정

에이전트 점검은 Datadog 에이전트를 통해 Apache Kafka([Amazon MSK][2])용 Amazon 관리형 스트리밍을 모니터링할 수 있습니다.

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][3]을 참조하세요.

이 개방형메트릭 기반 통합은 최신 모드(`use_openmetrics`: 참) 및 레거시 모드(`use_openmetrics`: 거짓)으로 구성되어 있습니다. 모든 최신 기능을 가져오려면 Datadog는 최신 모드를 활성화할 것을 권장합니다. 자세한 정보는 [개방형메트릭 기반 통합을 위한 최신 및 레거시 버전 관리][4]를 참조하세요.

### 설치

1. 이미 존재하지 않은 경우 [클라이언트 머신을 생성하세요][5].
2. 클라이언트 머신에 권한 정책 [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][7]가 허용되어 있거나 동급의 [자격 증명][8]을 사용할 수 있는지 확인합니다.
3. MSK상에서 [프로메테우스를 사용한 개방형 모니터링][9]을 활성화하여 JmxExporter 및 NodeExporter를 활성화하세요.
4. 방금 생성한 클라이언트 머신에 [Datadog 에이전트][10]를 설치하세요.

### 설정

1. 에이전트 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `amazon_msk.d/conf.yaml` 파일을 편집해 Amazon MSK 성능 데이터 수집을 시작합니다.

   이 통합에서 제공되는 서비스 점검와 매 메트릭에 추가되는 커스텀 [태그][11]를 포함합니다.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   최신 모드에서 사용 가능한 모든 설정 옵션의 경우 [sample amazon_msk.d/conf.yaml][12]을 참조하세요. 이 통합의 레거시 모드의 경우 [레거시 예시][13]를 참조하세요.

2. [에이전트를 재설치합니다.][14]

### 검증

[에이전트의 상태 하위 명령을 실행][3]하고 점검 섹션에서 `amazon_msk`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_kafka" >}}


### 이벤트

Amazon MSK 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

이 통합에서 제공하는 서비스 점검 목록을 보려면 [service_checks.json][17]을 참조하세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][18]에 문의해 주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog로 Amazon Managed Streaming for Apache Kafka 모니터링][19]

[1]: https://docs.datadoghq.com/ko/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[7]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[8]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[9]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[10]: https://docs.datadoghq.com/ko/agent/
[11]: https://docs.datadoghq.com/ko/getting_started/tagging/
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[14]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[17]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[18]: https://docs.datadoghq.com/ko/help/
[19]: https://www.datadoghq.com/blog/monitor-amazon-msk/