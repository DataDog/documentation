---
categories:
- cloud
- configuration & deployment
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/cloudcheckr.md
description: 본 통합을 활성화하여 CloudCheckr에서 Datadog 메트릭을 확인하세요.
doc_link: https://docs.datadoghq.com/integrations/cloudcheckr/
further_reading:
- link: https://www.datadoghq.com/blog/rightsizing-cloudcheckr/
  tag: 블로그
  text: 'CloudCheckr + Datadog: 클라우드 리소스의 더 뛰어난 규모 효율화'
has_logo: true
integration_id: cloudcheckr
integration_title: CloudCheckr
is_public: true
custom_kind: integration
name: cloudcheckr
public_title: Datadog-CloudCheckr 통합
short_description: CloudCheckr에 Datadog 메트릭을 추가해 AWS 사용량을 모니터링 및 최적화하세요.
---

## 개요

[CloudCheckr][1]는 맞춤형 권장 비용 및 성능 옵션을 제공하여 AWS 인프라스트럭처를 모니터링 및 최적화할 수 있는 웹 기반 플랫폼입니다.

{{< img src="integrations/cloudcheckr/EC2_Right_Sizing_Report.png" alt="ec2 right sizing report">}}

Datadog-CloudCheckr 통합으로 현재 및 과거 리소스 소비에 근거한 데이터 기반 의사 결정을 내리고 더 빠르고 비용 효율적인 인프라스트럭처를 유지할 수 있습니다.

## 설정

Datadog 계정을 CloudCheckr 계정에 연결하려면 다음을 따릅니다.

- CloudCheckr 확장 프로그램을 클릭합니다.
- [Datadog API 및 애플리케이션 키][2]를 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://spot.io/product/cloudcheckr/
[2]: https://app.datadoghq.com/organization-settings/api-keys