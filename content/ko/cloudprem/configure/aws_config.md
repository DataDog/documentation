---
description: CloudPrem용 AWS 구성 방법
further_reading:
- link: /cloudprem/install/aws_eks/
  tag: 설명서
  text: AWS EKS에 CloudPrem 설치하기
- link: /cloudprem/ingest_logs/
  tag: 설명서
  text: 로그 수집 구성
title: AWS 구성
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 가이드에서는 CloudPrem 배포를 위한 AWS 계정 필수 구성 방법을 다룹니다. AWS EKS에 CloudPrem을 설치하기 전에 이 구성을 완료해야 합니다.

EKS 전체 설치 프로세스는 [AWS EKS 설치 가이드][1]를 참고하세요.

## AWS 전제 조건

AWS에 CloudPrem을 배포하려면 다음을 구성해야 합니다.
- AWS 자격 증명 및 인증
- AWS 리전 선택
- S3 객체 스토리지에 대한 IAM 권한
- RDS PostgreSQL 데이터베이스(권장)
- AWS Load Balancer Controller를 포함한 EKS 클러스터

## AWS 자격 증명

노드를 시작할 때 CloudPrem은 [rusoto\_core::ChainProvider][2]에서 구현한 자격 증명 공급자 체인을 사용하여 AWS 자격 증명을 찾으려고 시도하며 다음 순서로 진행합니다.

1. 환경 변수 `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`(선택 사항).
2. 자격 증명 프로필 파일은 일반적으로 `~/.aws/credentials`에 위치합니다. 또는 설정되고 비어 있지 않은 경우 `AWS_SHARED_CREDENTIALS_FILE` 및 `AWS_PROFILE` 환경 변수에 의해 지정됩니다.
3. 환경 변수 `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI`가 설정되어 있으면 Amazon ECS 컨테이너에서 로드된 Amazon ECS 컨테이너 자격 증명입니다.
4. Amazon EC2 인스턴스에서 사용되는 인스턴스 프로필 자격 증명은 Amazon EC2 메타데이터 서비스를 통해 제공됩니다.

인증 체인에서 자격 증명을 찾을 수 없는 경우 오류가 반환됩니다.

## AWS 리전

CloudPrem은 다음 우선순위에 따라 여러 소스에서 AWS 리전을 찾으려고 시도합니다.

1. **환경 변수**: `AWS_REGION`을 먼저 확인한 후 `AWS_DEFAULT_REGION`.
2. **AWS 구성 파일**: 일반적으로 `~/.aws/config`에 있으며, 설정되어 있고 비어있지 않은 경우`AWS_CONFIG_FILE` 환경 변수가 지정한 경로.
3. **EC2 인스턴스 메타데이터**: 현재 실행 중인 Amazon EC2 인스턴스의 리전 사용
4. **기본값**: 다른 소스에서 리전을 제공하지 않으면 `us-east-1`로 대체.

## S3용 IAM 권한

필수 승인 조치:

* `ListBucket`(버킷에 직접)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

다음은 버킷 정책의 예입니다.

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

## 다음 단계

AWS 구성이 완료된 후:

1. **EKS에 CloudPrem 설치** - [AWS EKS 설치 가이드][1]를 따라 CloudPrem을 배포하세요.
2. **수신 구성** - 외부 액세스용 [수신 구성][3]을 설정하세요.
3. **로그 수집 설정** - CloudPrem으로 로그 전송을 시작하려면 [로그 수집][4]을 구성하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloudprem/install/aws_eks
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: /ko/cloudprem/configure/ingress/
[4]: /ko/cloudprem/ingest_logs/