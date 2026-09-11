---
categories:
- 로그 수집
- 보안
custom_kind: 통합
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md
description: Carbon Black Defense 로그 수집
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
has_logo: true
integration_id: carbonblack
integration_title: Carbon Black
is_public: true
name: carbon_black
public_title: Datadog-Carbon Black 통합
short_description: Carbon Black Defense 로그 수집
version: '1.0'
---

## 개요

Datadog-Carbon Black 통합을 사용해 Carbon Black EDR 이벤트와 알림을 Datadog 로그로 전송합니다.


## 설정

### 설치

Datadog에서는 Carbon Black 이벤트 포워더와 Datadog의 Lambda 포워더를 사용해 Carbon Black 이벤트를 수집하고 S3 버킷에서 알림을 보냅니다.

Carbon Black에서는 [Postman 수집][1] 기능을 사용해 Carbon Black 이벤트 포워더를 생성할 때 사용하는 API를 수집합니다.

#### 구성

1. [Datadog 포워더를 설치][2]합니다.
2. 이벤트를 전송할 수 있도록 [AWS Management Console에 버킷을 생성][3]합니다.
3. [Carbon Black 포워더가 데이터를 쓸 수 있도록 S3 버킷을 구성][4]합니다.
   - **중요**: S3 버킷에 접두사 키워드 `carbon-black`이 포함되어 있어야 CB 이벤트가 저장됩니다. 그래야 Datadog에서 로그 소스를 제대로 파악할 수 있습니다.
5. [Carbon Black Cloud 콘솔에 액세스 수준을 생성][5]합니다.
6. [Carbon Black Cloud 콘솔에 API 키를 생성][6]합니다.
7. 위에서 생성한 키로 Postman 환경 변수 `cb_url`, `cb_org_key`, `cb_custom_id`, `cb_custom_key` 값을 업데이트하여 [Postman에서 API를 구성][7]합니다.
8. Carbon Black 알림 이벤트(`"type": "alert"`)와 엔드포인트 이벤트(`"type": "endpoint.event"`) 이름을 다르게 설정해 [Carbon Black 이벤트 포워더 이벤트 두 개를 생성][8]합니다.
9. [S3 버킷에서 Datadog 포워더가 트리거되도록 설정][9]합니다.


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