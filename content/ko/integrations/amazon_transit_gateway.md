---
categories:
- aws
- cloud
- 네트워크
custom_kind: integration
dependencies: []
description: 주요 AWS Transit Gateway 메트릭을 추척하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_transit_gateway/
draft: false
further_reading:
- link: https://www.datadoghq.com/architecture/connect-to-Datadog-over-AWS-privatelink-using-AWS-transit-gateway/
  tag: 아키텍처 센터
  text: AWS Transit Gateway를 사용하여 AWS PrivateLink를 통해 Datadog 연결
git_integration_title: amazon_transit_gateway
has_logo: true
integration_id: ''
integration_title: AWS Transit Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_transit_gateway
public_title: Datadog-AWS Transit Gateway 통합
short_description: 주요 AWS Transit Gateway 메트릭을 추척하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Transit Gateway를 사용하여 가상 프라이빗 클라우드(VPC)와 온프레미스 네트워크를 상호 연결하세요.

Datadog에서 모든 Transit Gateway 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 및 리소스 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭에서 `TransitGateway`가 활성화되어 있는지 확인합니다.
2. AWS Transit Gateway 리소스를 수집하려면 [Datadog IAM 정책][3]에 다음 권한을 추가합니다.

  | AWS 권한                               | 설명                                                                                          |
  | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
  | `ec2:DescribeTransitGateways`                 | 하나 이상의 전송 게이트웨이를 설명할 수 있는 권한 부여                                     |
  | `ec2:DescribeTransitGatewayVPCAttachments`    | 전송 게이트웨이에서 하나 이상의 VPC attachments를 설명할 수 있는 권한 부여                      |
  | `ec2:DescribeTransitGatewayRouteTables`       | 하나 이상의 전송 게이트웨이 라우팅 테이블을 설명할 수 있는 권한 부여                 |
  | `ec2:GetTransitGatewayPrefixListReferences`   | 전송 게이트웨이 라우팅 테이블의 접두사 목록 참조에 대한 정보를 얻을 수 있는 권한 부여|
  | `ec2:SearchTransitGatewayRoutes`              | 전송 게이트웨이 라우팅 테이블에서 경로를 검색할 수 있는 권한 부여                     |

3.  [Datadog - AWS Transit Gateway 통합][4]을 설치하세요.


### 로그 수집

#### Transit Gateway 흐름 로그 로깅 활성화

Transit Gateway 흐름 로그는 S3 버킷 또는 CloudWatch 로그 그룹으로 전송될 수 있습니다.

1. AWS 콘솔에서 모니터링하려는 Transit Gateway로 이동합니다.
2. **Flow logs** 탭으로 이동합니다.
3. **Create flow log**를 클릭합니다.
4. 로그를 보낼 S3 버킷 또는 CloudWatch 로그 그룹을 선택합니다.

**참고**: 자동 로그 파싱을 활성화하려면 S3 버킷 이름에 `transit-gateway` 문자열을 포함하세요.

#### Datadog로 로그 전송

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][5]를 설정합니다.
2. AWS 계정에서 Datadog Forwarder Lambda 함수로 이동합니다. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. **S3** 또는 **CloudWatch Logs** 트리거를 선택하여 트리거를 설정합니다.
4. Transit Gateway 로그가 포함된 S3 버킷 또는 CloudWatch 로그 그룹을 선택합니다.
5. S3의 경우 이벤트 유형은 `All object create events`로 둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

몇 분 후에 Transit Gateway 흐름 로그가 [Log Explorer][6]에 나타납니다.

AWS 서비스 로그 수집에 대한 자세한 내용은 [Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송][7]을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_transit_gateway" >}}


### 이벤트

AWS Transit Gateway 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

AWS Transit Gateway 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-transit-gateway
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/logs/explorer/
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_transit_gateway/amazon_transit_gateway_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/
