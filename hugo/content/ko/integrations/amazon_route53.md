---
aliases:
- /ko/integrations/awsroute53/
categories:
- aws
- cloud
- log collection
- network
- notifications
dependencies: []
description: Route53 메트릭을 추적하고 상태 검사를 모니터링하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_route53/
draft: false
git_integration_title: amazon_route53
has_logo: true
integration_id: ''
integration_title: Amazon Route 53
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_route53
public_title: Datadog-Amazon Route 53 통합
short_description: Route53 메트릭을 추적하고 상태 검사를 모니터링하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_route53/route53_graph.png" alt="route53 graph" popup="true">}}

## 개요

Amazon Route 53은 DNS 및 트래픽 관리뿐만 아니라 상태 점검을 통한 가용성과 성능 모니터링을 제공합니다. Datadog에서 상태 점검 정보를 확인하여 환경 내 기타 메트릭 및 이벤트에 대한 컨텍스트를 제공할 수 있습니다. Route 53의 상태 점검 상태 그래프에 대한 예시 대시보드는 다음과 같습니다.

나머지 AWS 서비스에 대한 정보는 [AWS 타일][1]을 참조하세요.

## 설정

### 설치

아직 설치하지 않으셨다면, [Amazon Web Services 통합을 먼저][1] 설치하시기 바랍니다.

### 메트릭 수집

1. [AWS 통합 페이지[2]에서 `Route53`이 `Metric Collection` 탭에 활성화되어있는지 확인하세요.
2. Amazon Route 53 메트릭을 수집하려면 [Datadog IAM 정책][3]에 해당 권한을 추가하세요.

    - `route53:listHealthChecks`: 사용 가능한 상태 점검을 목록화하세요.
    - `route53:listTagsForResources`: Route53 클라우드와치(CloudWatch) 메트릭에서 커스텀 태그를 추가합니다.

    자세한 정보는 AWS 웹사이트에서 [Route53 정책][4]을 참조하세요.

3. [Datadog - Amazon Route53 통합][5]을 설치하세요.

**참고**: 클라우드와치(CloudWatch)를 사용하는 Amazon Route 53 메트릭을 확보하려면 "US East (N. Virginia)"를 지역으로 선택해야 합니다. 다른 지역을 선택하면 Amazon Route 53 메트릭을 사용할 수 없습니다. 자세한 정보는 [상태 점검 상태 모니터링 및 알림 받기][6]를 참조하세요.

### 로그 수집

Amazon Route 53을 설정하여 Route 53에서 수신하는 쿼리에 대한 다음 정보를 기록합니다.

- 요청된 도메인 또는 하위 도메인
- 요청의 날짜 및 시간
- DNS 레코드 유형(A 또는 AAAA)
- DNS 쿼리에 해당하는 Route 53 에지 위치 
- NoError 또는 ServFail 등 DNS 응답 코드
- VPC를 위한 Resolver 쿼리 로그

####  Route53 DNS 쿼리 로깅 활성화

1. Route 53 AWS 콘솔로 이동한 다음 **호스팅된 존**을 클릭합니다.
2. 로그를 설정하려는 호스팅된 존에 대한 라디오 버튼을 클릭합니다.
3. **상세 정보 보기**를 클릭합니다.
4. **쿼리 로깅 설정**을 클릭합니다.
5. 클라우드와치(CloudWatch) 로그 그룹을 선택하거나 로그를 전송할 새로운 그룹을 생성합니다. “route53”이 로그 그룹 이름에 포함되어 있습니다.

#### Route53 Resolver 쿼리 로깅 활성화

1. 왼쪽에 있는 Route 53 설정 창에서 Resolver 아래에 있는 **쿼리 로깅**을 선택합니다.
2. **쿼리 로깅 설정**을 클릭합니다.
3. Resolver 쿼리에 대한 이름을 입력합니다.
4. Resolver가 쿼리 로그를 전송하길 원하는 클라우드와치(CloudWatch) 로그 그룹을 선택합니다. “route53”이 로그 그룹 이름에 포함되도록 합니다.
5. Resolver 쿼리를 기록하려는 VPC를 추가합니다.
6. 선택적으로 태그를 추가합니다.
7. **쿼리 로깅 설정**을 클릭합니다.

#### Datadog에 로그 보내기

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더(Forwarder) 람다 함수][7]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **클라우드와치 로그** 트리거를 선택합니다.
4. Route53 로그를 포함하는 클라우드와치(CloudWatch) 로그 그룹을 선택합니다.
5. 필터 이름을 입력하세요.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][8]로 이동해 로그를 살펴보기 시작합니다.

AWS 서비스 로그 수집에 대한 자세한 내용은 , [Datadog 람다 함수][9]에 포함된 AWS 서비스 로그 전송]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_route53" >}}


AWS로부터 받은 호스트 이름, 보안 그룹 및 그 외의 모든 메트릭은 AWS 콘솔에 표시되는 태그와 동일한 태그에 배정됩니다.

### 이벤트

Amazon Route 53 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon Route 53 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해 주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-route53
[6]: http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks
[7]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_route53/amazon_route53_metadata.csv
[11]: https://docs.datadoghq.com/ko/help/