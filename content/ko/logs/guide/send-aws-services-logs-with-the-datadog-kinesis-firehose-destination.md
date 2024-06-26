---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: 블로그
  text: Amazon Kinesis Data Firehose 및 Datadog으로 Amazon VPC 플로우 로그 전송
kind: 설명서
title: Datadog Amazon Data Firehose Destination을 사용하여 AWS 서비스 로그 보내기
---

## 개요

CloudWatch Log 그룹에 저장된 AWS 서비스 로그를 Amazon Kinesis Data Stream으로 전달할 수 있으며, 이후 Amazon Data Firehose를 통해 하나 이상의 대상으로 전송할 수 있습니다. Datadog은 Amazon Data Firehose Delivery 스트림의 기본 대상 중 하나입니다.

AWS는 Amazon Data Firehose를 완벽하게 관리하므로 추가 인프라스트럭처를 유지 관리하거나 로그 스트리밍을 위한 설정을 전달할 필요가 없습니다. AWS Firehose 콘솔에서 Amazon Data Firehose 전송 스트림을 설정하거나 CloudFormation 템플릿을 사용하여 대상을 자동으로 설정할 수 있습니다.

## 설정

{{< tabs >}}
{{% tab "Amazon Data Firehose Delivery 스트림" %}}

Datadog에서는 Amazon Data Firehose와 함께 Datadog 대상을 사용할 때 Kinesis Data Stream을 입력으로 사용할 것을 권장합니다. Datadog이 해당 로그의 유일한 소비자가 아닌 경우 로그를 여러 대상으로 전달할 수 있는 기능을 제공합니다. Datadog이 로그의 유일한 대상이거나 이미 로그에 Kinesis Data Stream이 있는 경우 1단계를 무시할 수 있습니다.

1. 선택 사항으로, AWS의 Amazon Kinesis 데이터 스트림 개발자 가이드의 [데이터 스트림 생성하기][1] 섹션을 사용하여 새로운 Kinesis 데이터 스트림을 생성합니다. 스트림에 `DatadogLogStream`과 같이 해당 스트림을 설명하는 이름을 지정합니다.
2. [Amazon Data Firehose][2]로 이동합니다.  
3. **Create Firehose stream**을 클릭합니다.
   a. 소스를 설정합니다: 
      - 로그가 Kinesis Data Stream에서 나오는 경우 `Amazon Kinesis Data Streams`
      - 로그가 클라우드와치(CloudWatch) 로그 그룹에서 직접 수신되는 경우 `Direct PUT`

   b. 대상을 `Datadog`로 설정합니다.  
   c. 전송 스트림 이름을 입력합니다.
   d. **대상 설정**에서 [Datadog 사이트][5]에 해당하는 `Datadog logs` HTTP 엔드포인트 URL을 선택합니다.
   e. API 키를 **API 키** 필드에 붙여넣습니다. [Datadog API 키 페이지][3]에서 API 키를 가져오거나 생성할 수 있습니다.  
   f. 선택 사항으로 **재시도 기간**, 버퍼 설정을 구성하거나 로그에 태그로 첨부한 **파라미터**를 추가합니다.
   **참고**: Datadog은 로그가 한 줄 메시지인 경우 **버퍼 크기**를 `2 MiB` 로 설정할 것을 권장합니다.
   g. **백업 설정**에서 재시도 기간을 초과하는 실패 이벤트를 수신할 S3 백업 버킷을 선택합니다.
   **참고**: 전송 스트림을 통해 실패한 로그가 여전히 Datadog으로 전송되도록 하려면 이 S3 버킷에서 Datadog Forwarder Lambda 함수를 [로그 전달][4]로 설정하세요.
   h. **Create Firehose stream**을 클릭합니다.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

전체 [Kinesis CloudFormation 템플릿][1]을 사용자 정의하고 AWS 콘솔에서 설치합니다.

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## AWS 로그를 Firehose 스트림으로 보내기

CloudWatch Logs는 사용 중인 접근 방식에 따라 Kinesis Data Stream 또는 Amazon Data Firehose 전송 스트림에 데이터를 넣을 수 있는 권한이 필요합니다. [IAM 역할 및 정책을 생성합니다](#create-an-iam-role-and-policy). 그런 다음 Datadog에 수집하려는 CloudWatch 로그 그룹에 새로운 Kinesis 스트림 또는 Amazon Data Firehose 전송 스트림을 구독합니다. 구독은 [AWS 콘솔](#console) 또는 [CLI](#cli)를 통해 생성할 수 있습니다.
**참고**: 각 CloudWatch Log 그룹에는 2개의 구독만 존재할 수 있습니다.

### IAM 역할 및 정책 생성하기

IAM 역할 및 권한 정책을 생성하여 클라우드와치(CloudWatch) 로그가 Kinesis 스트림에 데이터를 입력할 수 있도록 설정합니다.
  1. 이 역할의 **Trust relationships**에서 `logs.amazonaws.com` 또는 `logs.<region>.amazonaws.com`이 서비스 주체로 설정되어 있는지 확인하세요. 예를 들어:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
        "Service": "logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  2. 역할에 연결된 권한 정책이 `firehose:PutRecord`, `firehose:PutRecordBatch`, `kinesis:PutRecord` 및 `kinesis:PutRecords` 작업을 허용하는지 확인하세요. Kinesis Data Stream을 사용하는 경우 **Resource** 필드에 해당 ARN을 지정합니다. Kinesis Data Stream을 사용하지 **않는** 경우 **Resource** 필드에 Amazon Data Firehose 스트림의 ARN을 지정합니다.
  예시:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch",
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      "Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<DELIVERY_STREAM>
    }
  ]
}
```
AWS CLI를 사용한 설정 예시를 보려면 [Kinesis Data Streams를 사용한 구독 필터][2] 예시(3~6단계)를 사용하세요.

### 구독 필터 생성하기

#### CLI

하단의 예는 AWS CLI로 구독 필터를 생성하는 예제입니다.

```
  aws logs put-subscription-filter \
    --log-group-name "<MYLOGGROUPNAME>" \
    --filter-name "<MyFilterName>" \
    --filter-pattern "" \
    --destination-arn "<DESTINATIONARN> (data stream or delivery stream)" \
    --role-arn "<MYROLEARN>"
```

#### 콘솔

AWS 콘솔을 통해 구독 필터를 생성하려면 다음 단계를 따르세요.

1. [클라우드와치(CloudWatch)][1]의 로그 그룹에서 **Subscription filters** 탭을 클릭한 후 **Create**를 클릭합니다.
   - Kinesis Data Stream을 통해 로그를 전송하는 경우 `Create Kinesis subscription filter`를 선택합니다.
   - 로그 그룹에서 Amazon Data Firehose 전송 스트림으로 직접 로그를 전송하는 경우 `Create Amazon Data Firehose subscription filter`를 선택합니다.

2. 해당되는 경우 데이터 스트림 또는 Firehose 전송 스트림, 이전에 생성한 [IAM 역할](#create-an-iam-role-and-policy)을 선택합니다.

3. 구독 필터의 이름을 입력한 후 **Start streaming**을 클릭합니다.

**중요 참고사항**: [Amazon 클라우드와치(CloudWatch) 로그 API 참조][3]에 명시된 대로, 구독 필터의 대상은 로그 그룹과 동일한 계정에 위치해야 합니다.

### 검증

[CloudWatch][1]의 로그 그룹 세부 정보 페이지에 있는 **Subscription filters** 탭을 확인하여 새로운 Kinesis 스트림 또는 Amazon Data Firehose 스트림이 로그 그룹을 구독하는지 확인하세요.

### Datadog에서 로그 찾기

Amazon Data Firehose 전송 스트림을 설정한 후에는 Datadog에서 전송 스트림을 구독한 로그를 분석할 수 있습니다.

모든 로그를 ARN으로 채우려면:

1. Datadog에서 [Log Explorer][5]로 이동합니다.
2. 검색창에 `@aws.firehose.arn:"<ARN>"`을 입력하고 `<ARN>`을 Amazon Data Firehose ARN으로 변경한 다음 구독한 로그를 모두 보려면 **Enter**를 누릅니다.

**참고**: 단일 Kinesis 페이로드는 로그 메시지 65,000개를 넘지 않아야 합니다. 한도를 초과한 로그 메시지는 삭제됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /ko/logs/explorer/