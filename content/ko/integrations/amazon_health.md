---
categories:
- aws
- cloud
- log collection
- notifications
dependencies: []
description: 거의 실시간으로 AWS 서비스 상태 이벤트를 모니터링하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_health
draft: false
git_integration_title: amazon_health
has_logo: true
integration_id: amazon-health
integration_title: AWS Health
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_health
public_title: Datadog-AWS Health 통합
short_description: AWS 서비스 상태를 모니터링하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Health는 AWS 리소스, 서비스 및 계정 상태에 대한 지속적인 가시성을 제공합니다. 이 통합을 활성화해 Datadog에서 AWS 상태 서비스 이벤트를 참조하세요.

{{< img src="integrations/amazon_health/awshealthevent.png" alt="AWS Health 이벤트" popup="true">}}

**참고**: 본 통합 기능은 비즈니스 또는 엔터프라이즈 지원 플랜을 이용하는 AWS 고객님만 사용하실 수 있습니다.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. AWS Health 데이터를 수집하려면 [Datadog IAM 정책][2]에 다음 권한을 추가하세요. 자세한 정보는 AWS 웹사이트에서 [Health 정책][3]을 참조하세요.

    | AWS 권한                    | 설명                                     |
    | --------------------------------- | ------------------------------------------------ |
    | `health:DescribeEvents`           | 모든 상태 이벤트를 목록화하는 데 사용됩니다.             |
    | `health:DescribeEventDetails`     | 상태 이벤트에 대한 상세 정보를 받습니다.       |
    | `health:DescribeAffectedEntities` | 상태 이벤트에 대해 영향을 받는 AWS 항목을 받습니다. |

2. [Datadog - AWS Health 통합][4]을 설치합니다.

## 수집한 데이터

### 메트릭

AWS Health 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

AWS Health 통합에는 AWS Personal Health 대시보드에서 찾을 수 있는 이벤트가 포함되어 있습니다. 예시에는 진행 중인 이슈, 예정 유지보수 및 계정 알림이 포함됩니다.

### 서비스 점검

AWS Health 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/health/latest/ug/controlling-access.html
[4]: https://app.datadoghq.com/integrations/amazon-health
[5]: https://docs.datadoghq.com/ko/help/