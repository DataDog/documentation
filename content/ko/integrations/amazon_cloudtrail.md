---
aliases:
- /ko/integrations/awscloudtrail/
- /ko/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
categories:
- aws
- cloud
- log collection
- security
dependencies: []
description: 의심스러운 AWS 계정 활동에 대해 알리세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Datadog-AWS CloudTrail 통합
short_description: 의심스러운 AWS 계정 활동에 대해 알리세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

<div class="alert alert-warning">
Cloud SIEM을 위해 AWS CloudTrail을 설정하는 경우 <a href="https://docs.datadoghq.com/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem/">Cloud SIEM에 대한 AWS 설정</a>을 참조합니다.
</div>

AWS CloudTrail은 AWS 계정에 대한 감사 트레일을 제공합니다. Datadog는 이 감사 트레일을 읽고 이벤트를 생성합니다. Datadog 이벤트 탐색기에서 이러한 이벤트를 검색하거나 대시보드에 연계하는 데 사용합니다. CloudTrail 이벤트 예시는 다음과 같습니다.

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="cloudtrail 이벤트" popup="true">}}

기타 AWS 서비스에 대한 자세한 정보는 [Amazon Web Services 통합 페이지][1]를 참조하세요.


## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정합니다. 

### 이벤트 수집

**참고**: Datadog CloudTrail 통합은 이벤트가 CloudTrail 버킷을 수집하도록 합니다.

1. Datadog IAM 정책에 다음 권한을 추가해 AWS CloudTrail 이벤트를 수집합니다. CloudTrail 정책에 대한 자세한 정보는 [AWS CloudTrail API 기본 설정][3]을 참조하세요. CloudTrail은 또한 일부 S3 권한이 트레일에 액세스할 수 있도록 해줍니다. **CloudTrail 버킷에서만 요구됩니다.** Amazon S3 정책에 대한 자세한 정보는 [Amazon S3 API 기본 설정][4]을 참조하세요.

    | AWS 권한              | 설명                                                    |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | 트레일과 트레일이 저장된 s3 버킷을 목록화합니다.        |
    | `cloudtrail:GetTrailStatus` | 비활성 트레일을 건너뜁니다.                                          |
    | `s3:ListBucket`             | CloudTrail 버킷의 개체를 목록화하여 사용 가능한 트레일을 확보합니다. |
    | `s3:GetBucketLocation`      | 버킷의 지역을 확보하여 트레일을 다운로드합니다.                 |
    | `s3:GetObject`              | 사용 가능한 트레일을 가져옵니다.                                       |
    | `organizations:DescribeOrganization` | 계정의 조직에 대한 정보를 반환합니다(조직 트레일에 필요). |

   이 정책을 기존 기본 Datadog IAM 정책에 추가합니다.

    ```json
    {
        "Sid": "AWSDatadogPermissionsForCloudtrail",
        "Effect": "Allow",
        "Principal": {
            "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
        },
        "Action": ["s3:ListBucket", "s3:GetBucketLocation", "s3:GetObject"],
        "Resource": [
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
        ]
    }
    ```

   **참고**: 기본 ARN은 기본 AWS 통합에 대한 설치 과정 중 나열되는 항목입니다. CloudTrail 리소스 ARN에 대한 자세한 정보는 [AWS CloudTrail이 IAM과 작동하는 방법][5]에 대한 리소스 섹션을 참조하세요. 정책을 업데이트하는 경우(새로운 항목 추가와 반대), `SID` 또는 `Principal`이 필요하지 않습니다.

2. [Datadog - AWS CloudTrail 통합][6] 설치:
   통합 페이지에서 이벤트 유형을 선택하여 Datadog 이벤트 탐색기에 일반 우선순위(기본 필터)로 표시합니다. Amazon Web Services 페이지에서 설정한 계정 역시 여기에 표시됩니다. 여기에서 언급되지 않은 다른 이벤트를 표시하려면 [Datadog 지원][7] 팀에 문의하세요.

### 로그 수집

#### 로깅 활성화

AWS CloudTrail에서 [트레일을 생성][8]한 다음 로그를 작성할 S3 버킷을 선택합니다.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 AWS 계정에서 [Datadog 포워더 람다 함수][9]를 설정합니다.
2. 설정한 후에는 Datadog Forwarder Lambda 함수로 이동하세요. Function Overview 섹션에서 **Add Trigger**를 클릭합니다.
3. 트리거 설정에 대해 **S3** 트리거를 선택합니다.
4. CloudTrail 로그를 포함하는 S3 버킷을 선택합니다.
5. 이벤트 유형을 `All object create events`로 남겨둡니다.
6. **Add**를 클릭해 Lambda에 트리거를 추가합니다.

[로그 탐색기][10]로 이동해 로그 탐색을 시작합니다.

AWS 서비스 로그 수집에 대한 자세한 정보는 [Datadog 람다 함수를 사용해 AWS 서비스 로그 전송]을 참조하세요.

## 수집한 데이터

### 메트릭

AWS CloudTrail 통합은 메트릭을 포함하지 않습니다.

### 이벤트

AWS CloudTrail 통합은 AWS CloudTrail 감사 트레일을 기준으로 각기 다른 많은 이벤트를 생성합니다. 모든 이벤트는 Datadog [이벤트 탐색기][12]에서 `#cloudtrail`를 사용해 태깅됩니다. 통합 설정에서 우선순위를 설정할 수 있습니다.

일반 우선순위로 설정될 수 있는 CloudTrail 이벤트(기본 필터 아래 이벤트 탐색기에 표시됨):

* apigateway 
* autoscaling 
* cloudformation 
* cloudfront 
* cloudsearch 
* cloudtrail 
* codedeploy 
* codepipeline 
* config 
* datapipeline  
* ds 
* ec2 
* ecs 
* elasticache 
* elasticbeanstalk 
* elasticfilesystem 
* elasticloadbalancing 
* elasticmapreduce 
* iam 
* kinesis 
* lambda 
* monitoring 
* opsworks 
* rds 
* redshift 
* route53 
* s3 
* ses 
* signin 
* ssm

### 서비스 검사

AWS CloudTrail 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

###  CloudTrail 타일이 누락되었거나 목록화된 계정이 없습니다.

먼저 [Amazon Web Services][13] 통합을 설정해야 합니다. 그 뒤 CloudTrail 타일을 설정할 수 있습니다.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[5]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[6]: https://app.datadoghq.com/integrations/amazon-cloudtrail
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[9]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://docs.datadoghq.com/ko/events/
[13]: https://docs.datadoghq.com/ko/integrations/aws/