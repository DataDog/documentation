---
aliases:
- /ko/observability_pipelines/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: Observability Pipelines로 데이터 작업
- link: /observability_pipelines/legacy/configurations/
  tag: 설명서
  text: Observability Pipelines 구성 알아보기
title: (레거시) Observability Pipelines Worker로 Amazon S3 로그 수집
---

## 개요

[Observability Pipelines Worker][1]를 사용하면 여러 소스에서 로그를 수집할 수 있습니다. AWS CloudTrail 또는 CloudWatch와 같이 외부 시스템에서 로그를 수신하는 Amazon S3 버킷이 있는 경우, Worker를 구성해 해당 로그를 수집할 수 있습니다. 이 설정에서는 Observability Pipelines Worker의 Amazon S3 소스를 사용하며, 이를 위해 Amazon SQS 대기열을 구성해서 S3 버킷에서 이벤트 알림을 받아야 합니다. 그러면 Worker로 이벤트 알림이 전해지고, 새 로그 이벤트를 수집합니다.

이 가이드에서는 다음 단계를 설명합니다.

1. [Amazon SQS Topic을 생성해 S3 이벤트 알림 수신](#create-an-amazon-sqs-topic-to-receive-s3-notifications)
2. [S3 버킷에서 이벤트 알림 활성화](#enable-event-notifications-on-the-s3-bucket)
3. [IAM 역할을 생성해 Worker에 필요한 권한만 부여](#create-an-iam-role-for-the-worker)
4. [Worker를 구성해 SQS 대기열에서 알림을 수신하고 S3 버킷에서 로그 수집](#configure-the-worker-to-receive-notifications-from-the-sqs-queue)
5. [Worker를 구성해 배치 처리된 S3 로그 이벤트 분리](#configure-the-worker-to-separate-out-batched-aws-s3-log-events)

## 사전 필수 조건
- Observability Pipelines Worker를 [설치][2] 및 [구성][3]해 소스에서 데이터를 수집하고 대상으로 라우트했습니다.
- [Observability Pipelines 기본][3]에 대해 잘 알고 있습니다.

## Amazon SQS 토픽을 생성해 S3 알림 수신

Amazon SQS 콘솔에서 이 구성과 관련된 새로운 대기열을 프로비저닝합니다. 그러면 변경 사항을 사용 중인 다른 로그 분석 도구와 별도로 구분할 수 있습니다.

1. [Amazon SQS 콘솔][4]로 이동합니다.
2. **Create queue*을 클릭해 이 구성과 관련된 새로운 대기열을 프로비저닝합니다.
3. 대기열 이름을 입력합니다.
4. **Access policy** 섹션에서 **Advanced** 버튼을 클릭합니다.
5. 고급 접근 정책 섹션에 아래 JSON 개체 예시를 복사 및 붙여넣기합니다. 그러면 대기열을 구성하고 S3 버킷에서 이벤트 알림을 전송할 수 있습니다. `${REGION}`, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, `${BUCKET_NAME}`을 관련 AWS 계정 정보, 대기열 이름, 입력한 버킷 이름으로 바꿉니다.
{{< code-block lang="json">}}
  {
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "SQS:SendMessage",
      "Resource": "arn:aws:sqs:${REGION}:${AWS_ACCOUNT_ID}:${QUEUE_NAME}",
      "Condition": {
        "StringEquals": {
          "aws:SourceAccount": "${AWS_ACCOUNT_ID}"
        },
        "StringLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:${BUCKET_NAME}"
        }
      }
    }
  ]
  }
{{< /code-block >}}
6. 다른 대기열 옵션을 기본값으로 남겨둡니다.
7. **Create queue**를 클릭합니다.

## S3 버킷에서 이벤트 알림을 활성화합니다.

1. [Amazon S3 콘솔][5]에서 Worker가 수집해야 하는 로그를 수집 중인 S3 버킷으로 이동합니다.
2. **Properties** 탭을 클릭합니다.
3. **Event notifications** 섹션에서 **Create event notification**를 클릭합니다.
4. 이벤트 이름을 입력합니다.
5. **Event types** 섹션에서 **All object create events**를 클릭합니다. Worker는 개체 생성 이벤트에만 반응하기 때문에 이 이벤트만 구독하면 됩니다.
6. **Destination** 섹션에서 **SQS queue**를 선택하고 앞서 생성한 SQS 대기열을 선택합니다.
7. **Save changes**를 클릭합니다.

이제 SQS 대기열에서 Worker 발신 메시지를 수신하여 처리할 수 있습니다.

"Unable to validate the following destination configurations" 에러가 발생할 경우 SQS  접근 정책을 확인하여 정책을 올바르게 설정하세요.

## Worker에서 IAM 역할 생성

Worker용으로 새로운 IAM 역할을 별도로 생성하여 필요한 권한만 제공합니다.

1. [AWS IAM 콘솔][6]로 이동합니다.
2. 탐색 창에서 **Roles**를 클릭합니다.
3. **Create role**을 클릭합니다.
4. 역할이 연결된 신뢰하는 엔터티 유형을 선택합니다.
5. **Next**를 클릭합니다.
6. **Create policy**을 클릭합니다.
7. **JSON** 탭을 클릭합니다. 역할에 연결되어야 하는 최소 권한을 복사 및 붙여넣기합니다.
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "sqs:DeleteMessage",
                  "s3:GetObject",
                  "sqs:ReceiveMessage",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::${BUCKET_NAME}/*",
                  "arn:aws:s3:::${BUCKET_NAME}",
                  "arn:aws:sqs:${REGION}:${ACCOUNT_ID}:${QUEUE_NAME}"
              ]
          }
      ]
    }
    ```
8. `${REGION`}, `${AWS_ACCOUNT_ID}`, `${QUEUE_NAME}`, `${BUCKET_NAME}`을 관련된 AWS 계정 정보 및 대기열과 사용 중인 버킷 이름으로 변경합니다. 역할을 EC2 인스턴스에 연결하고 싶으면 사용자 별 등 역할 권한을 추가로 수정해야 합니다.
9. **Next: Tags**를 클릭합니다. 옵션으로 태그를 추가할 수도 있습니다.
10. **Next: Review**를 클릭합니다.
11. 정책 이름을 입력합니다.
12. **Create policy**을 클릭합니다.

실행 중인 Observability Pipelines 프로세스에 역할을 적용합니다. 이는 EC2 인스턴스에 역할을 연결하거나 해당 사용자 프로필로 역할을 받아서 할 수 있습니다.

## Worker를 구성하여 SQS 대기열에서 알림 수신

1. 다음 소스 구성 예시를 사용해 Worker를 설정해 다음을 할 수 있습니다.
   a. SQS 이벤트 알림 수신
   b. S3 버킷에서 관련 로그 읽기
   c. 콘솔로 로그 방출
    ```yaml
        sources:
          cloudtrail:
            type: aws_s3
            region: ${REGION}
            sqs:
              queue_url: ${SQS_URL}
      ```
2. `${REGION}`를 AWS 계정 리전으로 변경합니다. `${SQS_URL}`를 SQS 대기열 콘솔의 **Details** 섹션에 있는 HTTP URL로 변경합니다.

옵션을 더 보려면 [Amazon S3 소스 설명서][7]를 참고하세요.

Amazon S3 소스를 설정하면 [변형][8]하고 데이터와 [싱크][9]를 변형하여 사용 사례에 맞도록 대상에 로그를 출력할 수 있습니다. 소스, 변형, 싱크와 관련한 자세한 내용은 [구성][3]을 참고하세요.

## Worker를 구성해 배치 처리된 Amazon S3 로그 이벤트 분리


대부분의 서비스(예: CloudTrail)는 S3에 로그를 전송할 때 배치 처리하여 전송합니다. 이에 따라 Worker에서 수신하는 각 이벤트가 여러 로그로 구성되어 있습니다. 다음 예시에서 `Records`는 로그 이벤트 3개가 함께 배치 처리된 배열입니다.

```json
{
  "Records": [
    {
      "log event 1": "xxxx"
    },
    {
      "log event 2": "xxxx"
    },
    {
      "log event 3": "xxxx"
    }
  ]
}
```

배치 처리된 로그 이벤트를 싱크에서 올바르게 처리하기 위해 개별 이벤트로 분리하려면 다음 `explode`와 `map` 변형을 추가합니다.

```json
transforms:
 explode:
   type: remap
   inputs:
     - cloudtrail
   source: |-
     .message = parse_json!(.message)
     . = unnest!(.message.Records)

 map:
   type: remap
   inputs:
     - explode
   source: |-
     merge!(., .message.Records)
     del(.message)
```

이 예시에서 `parse_json` 함수는 문자열을 JSON으로 파싱합니다.

`unnest` 함수는 배치 처리된 로그 이벤트를 개별 로그 이벤트 배열로 분리합니다.

```
[
   {"Records": {"log event 1": "xxx"}},
   {"Records": {"log event 2": "xxx"}},
   {"Records": {"log event 3": "xxx"}}
]
```

`merge` 함수는 `.Records`에 있는 데이터를 상위 수준에서부터 축소하여 각 로그 이벤트가 개별 로그 줄이 되도록 합니다. `del` 함수는 관련 없는 필드를 제거합니다.

```
{"log event 1": "xxx"}
```
```
{"log event 2": "xxx"}
```
```
{"log event 3": "xxx"}
```

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/#observability-pipelines-worker
[2]: /ko/observability_pipelines/legacy/setup/
[3]: /ko/observability_pipelines/legacy/configurations/
[4]: https://console.aws.amazon.com/sqs/home
[5]: https://console.aws.amazon.com/s3/
[6]: https://console.aws.amazon.com/iam/
[7]: /ko/observability_pipelines/legacy/reference/sources/#awss3
[8]: /ko/observability_pipelines/legacy/reference/transforms/
[9]: /ko/observability_pipelines/legacy/reference/sinks/