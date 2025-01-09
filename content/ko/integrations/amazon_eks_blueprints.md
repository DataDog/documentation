---
app_id: amazon-eks-blueprints
app_uuid: 4c0828d6-0c41-47d0-aa20-c174773e2bda
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10268
    source_type_name: amazon_eks_blueprints
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- 설정 및 배포
- cog-2
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks_blueprints/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks_blueprints
integration_id: amazon-eks-blueprints
integration_title: Datadog Blueprints 애드온
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks_blueprints
public_title: Datadog Blueprints 애드온
short_description: Amazon EKS Blueprints는 클러스터 설정과 배포 도구를 통합합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS Blueprints는 클러스터 설정과 배포 도구를 통합합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog Blueprints 애드온
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Amazon EKS(Elastic Kubernetes Service)는 관리형 쿠버네티스 서비스로 표준 쿠버네티스 환경에 대해  일정 배포와 유지관리를 자동화해줍니다.

Amazon EKS Blueprints는 클러스터 설정과 배포 도구를 통합하는 프레임워크입니다.

Datadog Blueprints 애드온은 Blueprints를 사용해 Amazon EKS에 Datadog 에이전트를 배포합니다.

## 설정

### 설치

```
npm install @datadog/datadog-eks-blueprints-addon
```

### 사용량

#### 기존 쿠버네티스 기밀 사용

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        // Kubernetes secret holding Datadog API key
        // The value should be set with the `api-key` key in the secret object.
        apiKeyExistingSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

#### AWS Secrets Manager 사용
AWS Secrets Manager를 사용해 Datadog API 키 저장:

```
aws secretsmanager create-secret --name <secret name> --secret-string <api_key> --region <aws region>
```

`apiKeyAWSSecret`를 사용해 이전에 생성된 기밀을 참조합니다.

```js
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { DatadogAddOn } from '@datadog/datadog-eks-blueprints-addon';
const app = new cdk.App();
const addOns: Array<blueprints.ClusterAddOn> = [
    new DatadogAddOn({
        apiKeyAWSSecret: '<secret name>'
    })
];
const account = '<aws account id>'
const region = '<aws region>'
const props = { env: { account, region } }
new blueprints.EksBlueprint(app, { id: '<eks cluster name>', addOns}, props)
```

### 설정

#### 옵션

| 옵션                  |설명                                          | 기본값                       |
|-------------------------|-----------------------------------------------------|-------------------------------|
| `apiKey`                | Datadog API 키                                | ""                            |
| `appKey`                | Datadog 앱 키                                | ""                            |
| `apiKeyExistingSecret`  | API 키가 저장된 기존 쿠버네티스(Kubernetes) 기밀       | ""                            |
| `appKeyExistingSecret`  | 앱 키가 저장된 기존 쿠버네티스(Kubernetes) 기밀      | ""                            |
| `apiKeyAWSSecret`       | API 키가 저장된 AWS Secrets Manager의 기밀   | ""                            |
| `appKeyAWSSecret`       | 앱 키가 저장된 AWS Secrets Manager의 기밀   | ""                            |
| `namespace`             | Datadog 에이전트 설치를 위한 네임스페이스              | "default"                     |
| `version`               | Datadog Helm 차트 버전                   | "2.28.13"                     |
| `release`               | Helm 릴리스 이름                            | "datadog"                     |
| `repository`            | Helm 차트 리포지토리                        | "https://helm.datadoghq.com"  |
| `values`                | 설정 값이 차트에 전달되었습니다. [옵션을 봅니다.][1] | {}                            |


모든 에이전트 설정 옵션에 대해 [Datadog Helm 차트]를 참조하세요. 그런 다음 `values` 옵션을 사용해 해당 값을 전달합니다.

### 메트릭 수집

EKS를 모니터링하려면 다음 Datadog 통합 중 하나를 설정해야 합니다.

- [쿠버네티스][2]
- [AWS][3]
- [AWS EC2][4]

또한, [ELB][5] 등 EKS와 함께 실행하는 기타 AWS 서비스에 대한 통합을 설치하세요.

## 수집한 데이터


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
[2]: https://docs.datadoghq.com/ko/integrations/kubernetes/
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[4]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/ko/help/