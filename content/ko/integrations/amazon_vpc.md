---
aliases: []
categories:
- aws
- cloud
- 로그 수집
- 네트워크
dependencies: []
description: Amazon VPC 로그를 수집합니다.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/vpc-security-flowlogs/
  tag: 블로그
  text: Datadog으로 플로우 로그를 모니터링하여 VPC 보안을 유지하세요.
git_integration_title: amazon_vpc
has_logo: false
integration_id: ''
integration_title: Amazon VPC
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_vpc
public_title: Datadog-Amazon VPC 통합
short_description: Amazon VPC 로그를 수집합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Virtual Private Cloud(Amazon VPC)로 가상 네트워크에서 AWS 리소스를 구동할 수 있습니다. VPC 플로우 로그는 VPC의 네트워크 인터페이스를 오가는 IP 트래픽에 대한 정보를 캡처할 수 있는 기능입니다.

## 설정

### 설치

아직 설정하지 않은 경우, 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

논-`aws.vpc.flowlogs.*` Amazon VPC을 수집하는데 추가 단계가 필요하지 않습니다. `aws.vpc.flowlogs.*` 접두사가 붙은 메트릭은  [Datadog VPC 플로우 로그][2] 통합으로 생성됩니다. 플로우 로그 메트릭을 수집하려면 하단의 [로그 수집](#log-collection) 섹션을 확인하세요. 

`aws.vpc.subnet.*` 메트릭의 경우 [Datadog 지원 팀][3]에 문의하여 계정에서 해당 메트릭을 수집할 수 있습니다.

### 로그 수집


#### AWS에서 VPC 플로우 로그용 대상 리소스를 탐색 또는 생성하세요.

Datadog에 전송하기 전 먼저 VPC 플로우 로그를 중간 대상에 전송해야 합니다. Kinesis Data Firehose로 직접 전송하거나 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 저장할 수 있습니다.

부대비용이 적게 들고 비용 효율적인 옵션이므로 Kinesis Data Firehose로 VPC 플로우 로그를 Datadog으로 전송하시기를 권장합니다. 자세한 내용을 확인하려면 [Kinesis Data Firehose에 Amazon VPC Flow 로그 적용][4]하기를 참조하세요.

1. 새 항목을 만들거나 기존 항목을 선택합니다.
   - Kinesis Data Firehose(권장). Datadog으로 로그를 전송하는 기존 Kinesis Data Firehose 전송 스트림이 아직 없는 경우, [ Datadog Kinesis Firehose 대상으로 AWS 서비스 로그 전송하기][5] 지침에 따라 생성합니다. **참고**: 옵션으로 VPC와는 별도로 다른 AWS 계정에서 전송 스트림을 선택하여 중앙 집중식 로그를 수집 및 전달할 수 있습니다.
   - S3 버킷 또는 폴더 경로.
   - 클라우드와치(CloudWatch) 로그 그룹.

**참고**: S3 경로나 클라우드와치(CloudWatch) 로그 그룹 이름의 접두사로 `vpc`를 지정하면 Lambda가 로그의 `vpc` 소스를 자동 태깅합니다.


#### VPC 플로우 로깅 활성화

1. AWS 콘솔에서 모니터링하려는 VPC로 이동합니다.
2. **플로우 로그** 탭 로 이동합니다. 
3. **플로우 로그 생성**을 클릭합니다.
4. `All` 필터를 선택하면 승인된 연결과 거부된 연결을 모두 확인할 수 있습니다.
5. 로그용 대상 유형(Kinesis Data Firehose, S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹)을 선택합니다.
6. 대상 리소스 세부 정보를 입력합니다.
7. **플로우 로그 생성**을 클릭합니다.

#### Datadog에 로그 전송

Kinesis Data Firehose를 대상으로 선택하셨다면 모든 작업이 완료되었습니다!

S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹을 대상으로 선택한 경우:

1. 아직 설정하지 않았다면 AWS 계정에서 [Datadog Forwarder Lambda 함수][6]를 설정하세요.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. **S3** 또는 **클라우드와치(CloudWatch) 로그** 트리거를 선택하여 트리거를 설정합니다.
4. VPC 로그가 포함된 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹을 선택합니다.
5. S3의 경우 이벤트 유형은 `All object create events`로 둡니다. 
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 익스플로러][7]로 이동하여 로그 탐색을 시작합니다.

AWS 서비스 로그를 수집하는 방법에 관한 자세한 정보를 확인하려면 [Datadog Lambda 함수로 AWS 서비스 로그 보내기][8]를 참고하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_vpc" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

Amazon VPC 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon VPC 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:464622532012:applications~Datadog-VPC-Flow-Logs
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-amazon-vpc-flow-logs-kinesis-data-firehose/
[5]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/logs/explorer/
[8]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpc/amazon_vpc_metadata.csv