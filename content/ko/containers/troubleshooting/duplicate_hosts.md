---
title: AWS에서 쿠버네티스(Kubernetes)를 사용해 호스트 복제
---

AWS의 쿠버네티스 환경에서 Datadog 에이전트를 실행하는 경우(EC2에서 완전히 자동 관리 또는 EKS 사용). 복제 호스트와 관련된 문제가 있을 수 있습니다. 한 호스트는 Datadog 에이전트의 호스트 이름을 사용하며 또 다른 호스트는 Datadog AWS 통합으로 수집한 AWS `instance-id`입니다. 

## 백그라운드

호스트 이름 확인을 수행하려면, Datadog 에이전트가 로컬 EC2 메타데이터 엔드포인트를 쿼리하여 EC2 `instance-id`을(를) 감지해야 합니다. 그러면 에이전트가 이 `instance-id`을(를) 호스트 이름 별칭으로 제출합니다. Datadog가 에이전트 데이터와 AWS 통합 데이터를 단일 호스트로 병합합니다.

Datadog 에이전트가 EC2 메타데이터 엔드포인트를 쿼리할 수 없으면 호스트 이름 복제가 발생할 수 있습니다.

## 진단

에이전트 플래어 명령을 사용해 플래어를 생성합니다. 그런 다음 `diagnose.log`을(를) 살펴봅니다. 다음과 같은 오류가 발생할 수 있습니다.

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

## 복구

구성을 업데이트하여 EC2 메타데이터 엔드포인트 액세스를 허용합니다.

IMDSv2를 사용하는 경우 다음 역시 수행해야 합니다.
1. 환경 변수 `DD_EC2_PREFER_IMDSV2`을(를) `true`(으)로 설정합니다. 
2. [호프 제한(hop limit)][1]을 `1`에서 `2`(으)로 높입니다.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html