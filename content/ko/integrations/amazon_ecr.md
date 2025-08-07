---
app_id: amazon_ecr
categories:
- 클라우드
- aws
custom_kind: 통합
description: 주요 Amazon ECR 메트릭을 추적하세요.
title: Amazon ECR
---
## 개요

Amazon Elastic Container Registry(Amazon ECR)는 개발자가 Docker 컨테이너 이미지를 쉽게 저장, 관리 및 배포할 수 있게 해주는 완전관리형 Docker 컨테이너 레지스트리입니다.

Datadog에서 모든 ECR 메트릭을 보려면 이 통합을 활성화하세요.

## 설정

### 설치

If you haven't already, set up the [Amazon Web Services integration](https://docs.datadoghq.com/integrations/amazon_web_services/) first.

### 메트릭 수집

1. In the [AWS integration tile](https://app.datadoghq.com/integrations/amazon-web-services), ensure that `ECR` is checked
   체크되어 있는지 확인하세요.
1. Install the [Datadog - ECR integration](https://app.datadoghq.com/integrations/amazon-ecr).

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **aws.ecr.repository_pull_count** <br>(count) | The total number of pulls for the images in the repository.|

### 이벤트

 ECR 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

ECR 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.