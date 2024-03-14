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
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: 블로그
  text: Amazon Kinesis Data Firehose 및 Datadog으로 Amazon VPC 플로우 로그 전송
kind: 설명서
title: Datadog Kinesis Firehose를 대상으로 AWS 서비스 로그 전송하기
---

## 개요

클라우드와치(CloudWatch) 로그 그룹에 저장된 AWS 서비스 로그를 구독하고 이를 Amazon Kinesis 스트림으로 전달한 다음, 이를 다시 하나 또는 다중 대상에 전달할 수 있습니다. Datadog은 Amazon Kinesis 전송 스트림에 기본값으로 설정된 전송 대상 중 하나입니다.

AWS는 Amazon Kinesis Data Firehose를 완벽하게 관리하므로, 인프라스트럭처 또는 로그 스트리밍용 포워딩 설정을 추가로 유지 관리할 필요가 없습니다. AWS Firehose 콘솔에서 Kinesis Firehose 전송 스트림을 설정하거나 CloudFormation 템플릿을 사용하여 대상을 자동으로 설정합니다.

## 설정

{{< tabs >}}
{{% tab "Kinesis Firehose Delivery stream" %}}

Datadog은 Datadog Kinesis 대상을 사용할 때 Kinesis 데이터 스트림을 입력값으로 사용할 것을 권장합니다. 그러면 Datadog이 해당 로그의 단일 컨슈머가 아닌 경우, 로그를 여러 대상에 전달할 수 있습니다. Datadog이 해당 로그의 유일한 컨슈머인 경우나 로그에 이미 Kinesis 데이터 스트림이 있는 경우 첫 번째 단계를 무시합니다.

1. 선택 사항으로, AWS의 Amazon Kinesis 데이터 스트림 개발자 가이드의 [데이터 스트림 생성하기][1] 섹션을 사용하여 새로운 Kinesis 데이터 스트림을 생성합니다. 스트림에 `DatadogLogStream`과 같이 해당 스트림을 설명하는 이름을 지정합니다.
2. [새 딜리버리 스트림][2]을 생성합니다. 
   a. 소스 설정하기: 
      - 로그가 Kinesis 데이터 스트림에서 수신되는 경우 `Amazon Kinesis Data Streams`
      - 로그가 클라우드와치(CloudWatch) 로그 그룹에서 직접 수신되는 경우 `Direct PUT`

   b. 대상을 `Datadog`로 설정합니다.  
   c. 전송 스트림 이름을 입력합니다.
   d. **대상 설정**에서 [Datadog 사이트][5]에 해당하는 `Datadog logs` HTTP 엔드포인트 URL을 선택합니다.
   e. API 키를 **API 키** 필드에 붙여넣습니다. [Datadog API 키 페이지][3]에서 API 키를 가져오거나 생성할 수 있습니다.  
   f. 선택 사항으로 **재시도 기간**, 버퍼 설정을 구성하거나 로그에 태그로 첨부한 **파라미터**를 추가합니다.
   **참고**: Datadog은 로그가 한 줄 메시지인 경우 **버퍼 크기**를 `2 MiB` 로 설정할 것을 권장합니다.
   g. **백업 설정**에서 재시도 기간을 초과하는 실패 이벤트를 수신할 S3 백업 버킷을 선택합니다.
     **참고**: 스트림 전송 실패 로그가 Datadog로 계속 전송되도록 하려면 해당 S3 버킷에서 Datadog 포워더(Forwarder) Lambda 함수를 [로그 전달][4]로 설정합니다.
   h. **전송 스트림 생성**을 클릭합니다.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "CloudFormation template" %}}

또는, 해당 CloudFormation 템플릿을 사용자 지정하여 AWS 콘솔에서 설치합니다. [Kinesis CloudFormation 템플릿][1] 전문을 참조하세요.

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Kinesis 스트림에 AWS 로그 보내기

Datadog으로 수집하려는 클라우드와치(CloudWatch) 로그 그룹에서 새 Kinesis 스트림을 구독합니다. [로그 그룹 인덱스 페이지][1]의 **구독** 열을 점검하여 로그 그룹에 관한 현재 구독을 확인할 수 있습니다. 하단의 설정에 따라 AWS 콘솔 또는 API를 통해 구독을 생성합니다.
   **참고**: 클라우드와치(CloudWatch) 로그 그룹의 구독은 단 두 개만 가능합니다.

### IAM 역할 및 정책 생성하기

IAM 역할 및 권한 정책을 생성하여 클라우드와치(CloudWatch) 로그가Kinesis 스트림에 데이터를 입력할 수 있도록 설정합니다.
   - 해당 역할의 **신뢰할 수 있는 관계**에서 `logs.amazonaws.com` 또는 `logs.<region>.amazonaws.com`이 서비스 주체로 설정되어 있는지 확인합니다.
   - 해당 역할과 연관된 권한 정책이 `firehose:PutRecord` `firehose:PutRecordBatch`, `kinesis:PutRecord`, `kinesis:PutRecords` 작업을 허용하는지 확인합니다.
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
            "Resource": "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM>"
          }
        ]
      }
      ```

AWS CLI를 사용하여 이를 설정하는 예시를 활용하려면 [Kinesis 활용 구독 필터][2] 예제(3 ~ 6단계)를 확인합니다.

### 구독 필터 생성하기

하단의 예는 AWS CLI로 구독 필터를 생성하는 예제입니다.

    ```
    aws logs put-subscription-filter \
        --log-group-name "<MYLOGGROUPNAME>" \
        --filter-name "<MyFilterName>" \
        --filter-pattern "" \
        --destination-arn "<DESTINATIONARN> (data stream or delivery stream)" \
        --role-arn "<MYROLEARN>"
    ```

AWS 콘솔을 통해 구독 필터를 생성할 수도 있습니다.

1. [클라우드와치(CloudWatch)][1]의 로그 그룹에서 **구독 필터** 탭을 클릭한 후 **생성하기**를 클릭합니다.
   - Kinesis 데이터 스트림을 통해 로그를 전송하는 경우 `Create Kinesis subscription filter`를 선택합니다.
   - 로그 그룹에서 Kinesis Firehose 전송 스트림으로 로그를 직접 보내는 경우 `Create Kinesis Firehose subscription filter`을 선택합니다.

2. 해당되는 경우 데이터 스트림 또는 Firehose 전송 스트림, 이전에 생성한 [IAM 역할](#create-an-iam-role-and-policy)을 선택합니다.

3. 구독 필터의 이름을 입력한 후 **스트리밍 시작**을 클릭합니다.

**중요 참고사항**: [Amazon 클라우드와치(CloudWatch) 로그 API 참조][3]에 명시된 대로, 구독 필터의 대상은 로그 그룹과 동일한 계정에 위치해야 합니다.

### 검증

[클라우드와치(CloudWatch)][1] 로그 그룹 인덱스 페이지에서 **구독** 열을 확인하여 새로운 Kinesis 스트림이 현재 로그 그룹을 구독하는지 확인할 수 있습니다.

### Datadog에서 Amazon Kinesis 로그 검색하기

Amazon Kinesis 전송 스트림을 설정한 후, Datadog에서 전송 스트림이 구독한 로그를 분석할 수 있습니다.

모든 로그를 ARN으로 채우려면:

1. Datadog에서 [로그 익스플로러][5]로 이동하여 구독한 로그를 모두 확인합니다.
2. 검색창에 `@aws.firehose.arn:"<ARN>"`을 입력하고 `<ARN>`을 Amazon Kinesis Data Firehose ARN으로 변경한 다음 **입력**을 누릅니다.

**참고**: 단일 Kinesis 페이로드는 로그 메시지 65,000개를 넘지 않아야 합니다. 한도를 초과한 로그 메시지는 삭제됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /ko/logs/explorer/