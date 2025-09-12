---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
title: AWS 계정 수준 로그 구독
---

## 개요

AWS 환경에서 계정 수준 로그 구독을 사용하면 모든 CloudWatch 로그를 Datadog에 자동으로 전달할 수 있습니다. 따라서 계정 수준 로그 구독을 사용해 새 로그 소스 또는 AWS에서 새 서비스를 출시할 때 로그 전달을 수동으로 구성할 필요가 없습니다. 또 자체 선택 기준이나 필터 패턴을 정의해 전달할 로그를 더욱 세밀하게 제어할 수 있습니다.

## 계정 수준 로그 구독 생성

계정 수준의 로그 구독을 생성하는 방법에는 [CloudFormation](#cloudformation-recommended)과 [수동 설정](#manual)을 통한 두 가지 방법이 있습니다. 가장 간단하게 설정하는 방법은 CloudFormation을 사용하여 선택한 각 지역에서 Amazon Data Firehose 및 관련 리소스를 생성하는 것입니다.

### CloudFormation(권장)

1. CloudFormation 템플릿의 URL을 복사합니다.

{{< code-block lang="bash" filename="" disable_copy="false" >}}
https://datadog-cloudformation-template.s3.amazonaws.com/aws_account_level_logs/main.yaml
{{< /code-block >}}

2. AWS 콘솔에서 [CloudFormation][1]으로 이동합니다.
3. **Create stack**을 클릭합니다.
    - `With new resources (standard)`를 선택합니다.
4. 옵션 선택 시 **Choose an existing template** 및 **Amazon S3 URL**를 선택합니다.
5. **Amazon S3 URL** 필드에 CloudFormation 템플릿의 URL을 붙여넣습니다.
6. **Next**를 클릭합니다.
7. *Stack name** 필드에 `datadog-account-level-logs-stack`과 같은 설명이 포함된 이름을 입력합니다.
8. **ApiKey*** 필드에 유효한 [Datadog API 키][4] 값을 붙여넣습니다.
9. **Regions** 필드에 쉼표로 구분된 AWS 지역 코드 목록(예: `us-east-1`)을 입력하여 계정 수준 로그 구독에 포함할 지역을 입력합니다.
10. **DatadogHttpEndpointUrl** 필드에서 [Datadog 사이트][5]에 해당하는 URL을 선택합니다.
11. **Next**를 클릭합니다.
12. 원하는 대로 추가 스택 옵션을 구성합니다.
13. **Next**를 클릭합니다.
14. 스택 옵션을 검토하고 `I acknowledge that AWS CloudFormation might create IAM resources with custom names` 확인란을 클릭합니다.
15. **Submit**을 클릭합니다.

### 수동

{{< tabs >}}
{{% tab "Lambda Forwarder" %}}

1. 아직 설정하지 않았다면 [Datadog Forwarder][101] Lambda 함수를 설정하세요.
2. [AWS CLI][102]를 사용하여 CloudWatch Logs에 함수 실행 권한을 부여합니다.
   - `<REGION>`을 Datadog Forwarder Lambda 함수가 포함된 지역으로 바꿉니다.
   - `<ACCOUNT_ID>`를 12자리 AWS 계정 ID(대시 제외)로 바꿉니다.

```bash
aws lambda add-permission \
  --region "<REGION>" \
    --function-name "forwarder-function" \
    --statement-id "forwarder-function" \
    --principal "logs.amazonaws.com" \
    --action "lambda:InvokeFunction" \
    --source-arn "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:*" \
    --source-account "<ACCOUNT_ID>"
```

3. 계정 수준 구독 필터 정책을 만듭니다. 아래 제공된 예제에서는 `ERROR` 문자열이 포함된 모든 로그 이벤트가 스트리밍되지만 로그 그룹에 있는 `LogGroupToExclude1` 및 `LogGroupToExclude2` 이벤트는 제외됩니다.
   - `FORWARDER_ARN`을 Datadog Forwarder Lambda 함수의 ARN으로 바꿉니다.

```bash
aws logs put-account-policy \
  --policy-name "ExamplePolicyLambda" \
  --policy-type "SUBSCRIPTION_FILTER_POLICY" \
  --policy-document '{"DestinationArn":"<FORWARDER_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
  --scope "ALL"
```

**참고**: 특정 로그 그룹을 로그 전달에서 제외하려면 [명령 참조][103]에 설명된 대로 `--selection-criteria` 옵션을 사용하세요.

[101]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[102]: https://aws.amazon.com/cli/
[103]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{% tab "Amazon Data Firehose" %}}

#### Amazon Data Firehose를 위한 S3 버킷 및 역할 생성

다음 단계에서는 버킷 및 IAM 역할을 만드는 방법을 안내합니다. 이 역할은 Amazon Data Firehose에 전송 실패 시 Amazon S3 버킷에 데이터를 넣을 수 있는 권한을 부여합니다.

1. [AWS CLI][201]를 사용하여 S3 버킷을 만듭니다. 선택적으로 기존 버킷을 사용할 수 있습니다.
   - `<BUCKET_NAME>`을 S3 버킷의 이름으로 바꿉니다.
   - `<REGION>`을 S3 버킷의 리전으로 바꿉니다.

```
aws s3api create-bucket \
  --bucket MY-BUCKET \
  --create-bucket-configuration LocationConstraint=<REGION>
```

2. 다음 구문을 사용하여 `TrustPolicyForFirehose.json` 파일을 생성합니다.

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "firehose.amazonaws.com" },
    "Action": "sts:AssumeRole"
    } 
}
```

3. 신뢰 정책 파일을 지정하여 IAM 역할을 생성합니다.
   **참고**: 반환된 **Role.Arn** 값은 이후 단계에서 사용됩니다.

```bash
aws iam create-role \
  --role-name FirehosetoS3Role \
  --assume-role-policy-document file://./TrustPolicyForFirehose.json
```

4. 다음 구문을 사용하여 `PermissionsForFirehose.json` 파일을 생성합니다.
   - `<BUCKET_NAME>`을 S3 버킷의 이름으로 바꿉니다.

```bash
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [ 
          "s3:AbortMultipartUpload", 
          "s3:GetBucketLocation", 
          "s3:GetObject", 
          "s3:ListBucket", 
          "s3:ListBucketMultipartUploads", 
          "s3:PutObject" ],
      "Resource": [ 
          "arn:aws:s3:::<BUCKET_NAME>", 
          "arn:aws:s3:::<BUCKET_NAME>/*" ]
    }
  ]
}
```
5. 권한 정책을 역할과 연결합니다.

```bash
aws iam put-role-policy \
  --role-name FirehosetoS3Role \
  --policy-name Permissions-Policy-For-Firehose \
  --policy-document file://./PermissionsForFirehose.json
```

#### Amazon Data Firehose 전송 스트림 생성

다음 단계에서는 Amazon Data Firehose 전송 스트림을 생성하고 구성하는 방법을 안내합니다.

1. AWS 콘솔에서 [Amazon Data Firehose][202]로 이동합니다.
2. **Create Firehose stream**을 클릭합니다.
3. **Source** 필드에서 로그의 소스을 선택합니다.
   - 로그가 Kinesis 데이터 스트림에서 오는 경우 `Amazon Kinesis Data Streams`를 선택합니다.
   - CloudWatch 로그 그룹에서 직접 로그를 가져오는 경우 `Direct PUT`을 선택합니다.
4. **Destination** 필드에서 `Datadog`를 선택합니다.
5. **Source**가 `Amazon Kinesis Data Streams`인 경우 *Source settings**에서 Kinesis 데이터 스트림을 선택합니다.
6. 원하는 경우 Firehose 스트림에 설명이 포함된 이름을 지정합니다.
7. **Destination settings** 섹션에서 [Datadog 사이트][203]에 해당하는 Datadog 로그 HTTP 엔드포인트 URL을 선택합니다.
8. **Authentication*의 경우 유효한 [Datadog API 키][204]가 필요합니다. 둘 중 하나를 사용할 수 있습니다.
     - **Use API key**을 선택하고 **API key** 필드에 키의 값을 붙여넣습니다.
     - **Use AWS Secrets Manager**을 선택하고  **Secret name** 드롭다운에서 유효한 Datadog API 키 값이 포함된 비밀번호를 선택합니다.
9. **Content encoding**에 대해 `GZIP`을 선택합니다.
10. 선택적으로 **Retry duration**, 버퍼 설정을 구성하거나 **Parameters**(로그에 태그로 첨부됨)를 추가할 수 있습니다.  
     **참고**: Datadog 에서는 로그가 한 줄 메시지인 경우 **Buffer size**를 `2` MiB로 설정할 것을 권장합니다.
11. **Backup settings** 섹션에서 재시도 기간을 초과하는 실패한 이벤트를 수신할 S3 버킷을 선택합니다.  
     **참고**: 전송 스트림으로 전달되지 않은 로그가 Datadog 로 계속 전송되도록 하려면 Datadog Fordwarder Lambda 함수를 [이 S3 버킷에서 로그 전달][205]로 설정하세요.
12. **Create Firehose stream**을 클릭합니다.

#### CloudWatch 로그에 대한 역할 생성

다음 단계에서는 CloudWatch 로그에 대한 IAM 역할을 만드는 방법을 안내합니다. 이 역할은 CloudWatch 로그에 Firehose 전송 스트림에 데이터를 넣을 수 있는 권한을 부여합니다.

1. 다음 구문을 사용하여 `./TrustPolicyForCWL.json` 파일을 생성합니다.
   - `<ACCOUNT_ID>`을 12자리 AWS 계정 ID(대시 제외)로 바꿉니다.
   - `<REGION>`을 CloudWatch 로그의 지역으로 바꿉니다.

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "logs.amazonaws.com" },
    "Action": "sts:AssumeRole",
    "Condition": { 
         "StringLike": { 
             "aws:SourceArn": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:*"
         } 
     }
  }
}
```
2. 신뢰 정책 파일을 지정하여 IAM 역할을 생성합니다.

```bash
aws iam create-role \
  --role-name CWLtoKinesisFirehoseRole \
  --assume-role-policy-document file://./TrustPolicyForCWL.json
```
   **참고**: 반환된 **Role.Arn** 값은 이후 단계에서 사용됩니다.

3. 다음 구문을 사용하여 `./PermissionsForCWL.json` 파일을 생성합니다.
   - `<REGION>`을 Datadog 포워더 람다 함수가 포함된 지역으로 바꿉니다.
   - `<ACCOUNT_ID>`를 12자리 AWS 계정 ID(대시 제외)로 바꿉니다.
   - `<DELIVERY_STREAM_NAME>`을 전송 스트림의 이름으로 바꿉니다.

```bash
{
    "Statement":[
      {
        "Effect":"Allow",
        "Action":["firehose:PutRecord"],
        "Resource":[
            "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM_NAME>"]
      }
    ]
}
```

4. 권한 정책을 역할과 연결합니다.

```bash
aws iam put-role-policy \
  --role-name CWLtoKinesisFirehoseRole \
  --policy-name Permissions-Policy-For-CWL \
  --policy-document file://./PermissionsForCWL.json
```

#### CloudWatch Logs 계정 수준 구독 필터 정책 생성

이 단계를 완료하기 전에 Amazon Data Firehose 전송 스트림이 `Active` 상태여야 합니다.

1. CloudWatch Logs 계정 수준 구독 필터 정책을 만듭니다. 이 정책은 선택한 로그 그룹에서 Amazon Data Firehose 전송 스트림으로 실시간 로그 데이터의 흐름을 즉시 시작합니다:
   - `<POLICY_NAME>`을 구독 필터 정책의 이름으로 바꿉니다.
   - `<CLOUDWATCH_LOGS_ROLE>`를 CloudWatch 로그 역할의 ARN으로 바꿉니다.
   - `<DELIVERY_STREAM_ARN>`을 Amazon Data Firehose 전송 스트림의 ARN으로 바꿉니다.

```bash
aws logs put-account-policy \
    --policy-name "<POLICY_NAME>" \
    --policy-type "SUBSCRIPTION_FILTER_POLICY" \
    --policy-document '{"RoleArn":"<CLOUDWATCH_LOGS_ROLE>", "DestinationArn":"<DELIVERY_STREAM_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
    --scope "ALL"
```

**참고**: 특정 로그 그룹을 로그 전달에서 제외하려면 [명령 참조][206]에 설명된 대로 `--selection-criteria` 옵션을 사용하세요.

[201]: https://aws.amazon.com/cli/
[202]: https://console.aws.amazon.com/firehose/home
[203]: /ko/getting_started/site/
[204]: https://app.datadoghq.com/organization-settings/api-keys
[205]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[206]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{< /tabs >}}

### 검증

[Log Explorer][2]로 이동하여 검색 쿼리 `@aws.firehose.arn:"<FIREHOSE_ARN>"`을 입력하면 Amazon Data Firehose에서 전달한 로그를 볼 수 있습니다.
   - `<FIREHOSE_ARN>`을 로그 스트리밍 [Firehose][3]의 ARN으로 바꿉니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudformation/home
[2]: https://app.datadoghq.com/logs
[3]: https://console.aws.amazon.com/firehose/home
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ko/getting_started/site/