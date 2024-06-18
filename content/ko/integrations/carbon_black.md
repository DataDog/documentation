---
categories:
- 로그 수집
- 보안
ddtype: 크롤러
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md
description: Carbon Black 디펜스 로그 수집
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
has_logo: true
integration_id: carbonblack
integration_title: Carbon Black
is_public: true
custom_kind: integration
name: carbon_black
public_title: Datadog-Carbon Black 통합
short_description: Carbon Black 디펜스 로그 수집
version: '1.0'
---

## 개요

Datadog-Carbon Black 통합을 활용하여 Carbon Black EDR 이벤트 및 알림을 Datadog 로그로 전달합니다.


## 구성

### 설치

Datadog은 Carbon Black의 이벤트 포워더(Forwarder)와 Datadog의 Lambda 포워더(Forwarder)를 사용하여 Carbon Black 이벤트 및 알림을 S3 버킷으로부터 수집합니다.

Carbon Black은 Carbon Black 이벤트 포워더(Forwarder)를 생성하는 데 사용하는 API용 [포스트맨 컬렉션][1]을 제공합니다.

#### 설정

1. [Datadog 포워더(Forwarder)를 설치][2]합니다.
2. [AWS 관리 콘솔에서 버킷을 생성][3]하여 이벤트로 전달합니다. 
3. [Carbon Black 포워더(Forwarder)가 데이터를 기록할 수 있도록 S3 버킷을 설정][4]합니다. 
   - **중요**: S3 버킷의 접두사(prefix) 앞에 이벤트 CB가 들어오는 `carbon-black` 키워드가 반드시 있어야 합니다. 해당 키워드가 있어야만 Datadog가 로그의 소스를 올바르게 인식할 수 있습니다.
5. [Carbon Black 클라우드 콘솔에서 접근 수준을 생성][5]합니다.
6. [Carbon Black 클라우드 콘솔에서 API 키를 생성][6]합니다.
7. 위에서 생성한 키로 다음과 같이 포스트맨 환경변수의 값을 업데이트해 [포스트맨 API를 설정][7]합니다: `cb_url`, `cb_org_key`, `cb_custom_id`, `cb_custom_key`.
8. Carbon Black 알림(`"type": "alert"`)과 엔드포인트 이벤트(`"type": "endpoint.event"`)용으로 각각 다른 이름의 [Carbon Black 이벤트 포워더 두 개][8]를 생성합니다.
9. [S3 버킷에서 트리거되도록 Datadog 포워더(Forwarder)를 설정][9]합니다.


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://documenter.getpostman.com/view/7740922/SWE9YGSs?version=latest
[2]: /ko/logs/guide/forwarder/
[3]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-a-bucket
[4]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-bucket-to-write-events
[5]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-access-level
[6]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-api-key
[7]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-api-in-postman
[8]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-forwarder
[9]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[10]: /ko/help/