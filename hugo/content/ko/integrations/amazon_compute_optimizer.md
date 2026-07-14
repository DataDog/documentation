---
aliases:
- /ko/integrations/aws-compute-optimizer
- /ko/integrations/aco
categories:
- cloud
- aws
custom_kind: integration
dependencies: []
description: 사용자가 워크로드 크기를 적절하게 조정하는 데 도움이 되는 리소스 구성 권장 사항을 제공합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_compute_optimizer/
draft: false
git_integration_title: amazon_compute_optimizer
has_logo: true
integration_id: amazon-compute-optimizer
integration_title: AWS Compute Optimizer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_compute_optimizer
public_title: Datadog-AWS Compute Optimizer
short_description: 사용자가 워크로드 크기를 적절하게 조정하는 데 도움이 되는 리소스 구성 권장 사항을 제공합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Compute Optimizer는 사용자가 워크로드 크기를 적절하게 조정할 수 있도록 리소스 구성 권장 사항을 제공하는 웹 서비스입니다.

이 통합을 통해 Datadog Agent의 메모리 사용률 데이터를 사용하여 AWS Compute Optimizer에서 더 나은 EC2 인스턴스 유형 권장 사항을 얻을 수 있습니다. Compute Optimizer에 대한 자세한 내용은 AWS 설명서의 [What is AWS Compute Optimizer?][1]를 참조하세요.

## 설정

### 설치

#### AWS
1. AWS Compute Optimizer 콘솔에서 **Accounts** 페이지로 이동하여 외부 메트릭 수집에 대한 계정 수준 기본 설정을 `Datadog`로 설정합니다.
2. 강화된 권장 사항을 얻으려는 각 AWS 계정에 대해 단계 #1를 반복합니다.

#### Datadog
3. 아직 설정하지 않았다면 원하는 각 AWS 계정에 대해 [Amazon Web Services 통합을 먼저][2] 설정하세요.
4. Compute Optimizer의 강화된 권장 사항에 포함하려면 EC2 인스턴스에 [Datadog Agent[3]를 설치하세요.
5. [Datadog - AWS Compute Optimizer 통합][4]을 설치합니다.

모든 단계가 완료된 후 AWS Compute Optimizer의 권장 사항이 Datadog의 메모리 사용률 데이터를 사용하는 데 **최대 30시간**이 걸릴 수 있습니다.

#### 검증
EC2 인스턴스에 대한 권장 사항 표에서 Datadog이 `External metrics source`로 참조되는지 확인합니다.

{{< img src="integrations/amazon_compute_optimizer/compute_optimizer.png" alt="3개의 인스턴스가 나열되어 있고 각 인스턴스의 외부 메트릭 소스 열 아래에 Datadog 링크가 있는 Compute Optimizer Recommendations에 대한 AWS 대시보드" popup="true">}}

## 작동 방식

[Datadog의 AWS 통합][2]과 [Datadog Agent][3]가 모니터링하는 모든 EC2 인스턴스에 대해, Datadog은 잠재적으로 비용 절감으로 이어질 수 있는 향상된 인스턴스 권장 사항을 제공하기 위해 Agent의 메모리 사용률 데이터를 AWS Compute Optimizer로 전송합니다.

**참고:** Datadog 메모리 사용률 메트릭은 AWS 계정이 아닌 AWS Compute Optimizer 서비스와 직접 통합됩니다. Datadog은 AWS 계정과 직접 상호 작용하지 않으므로 이 통합에는 추가 IAM 권한이 필요하지 않습니다.


## 수집한 데이터

### 메트릭

AWS Compute Optimizer 통합은 메트릭을 포함하지 않습니다.

### 이벤트

AWS Compute Optimizer 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS Compute Optimizer 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/ko/agent/
[4]: https://app.datadoghq.com/integrations/amazon-compute-optimizer/
[5]: https://docs.datadoghq.com/ko/help/