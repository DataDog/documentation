---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: 블로그
  text: API 목적지 사용 사례 예시가 포함된 AWS 블로그
- link: /logs/guide/reduce_data_transfer_fees
  tag: 가이드
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
site_support_id: amazon_event_bridge
title: Amazon EventBridge API 목적지를 사용하여 이벤트 및 로그를 Datadog에 전송하기
site_support_id: amazon_event_bridge
---

Amazon EventBridge는 이벤트 기반 애플리케이션을 구축할 수 있는 서버리스 이벤트 버스입니다. EventBridge는 AWS 서비스와 통합할 수 있지만 API 목적지 기능을 사용하면 AWS 외부에서 API를 사용하여 데이터를 푸시하고 가져올 수 있습니다. 이 가이드는 이벤트 및 로그를 EventBridge에서 Datadog로 전송하는 단계를 안내합니다. Datadog에서 EventBridge로 이벤트를 푸시하는 방법에 대한 자세한 내용은 [EventBridge 통합 문서][1]를 참조하세요.

## 설정

시작하기 전에 [Datadog 계정][2]과 [API 키][3]가 있어야 하며, [Amazon Eventbridge API 목적지][4]에 액세스할 수 있어야 합니다.

### 설정

1. [Amazon API 목적지 문서 만들기][5] 단계를 따라 Datadog를 API 목적지로 추가합니다.
    - API 키 인증을 사용하고 키 이름은 `DD-API-KEY`, 값은 [Datadog API 키][3]로 지정합니다.
    - 목적지 엔드포인트의 경우 로그에는 `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs`를, 이벤트에는 `https://api.{{< region-param key="dd_site" code="true" >}}/api/v1/events`를 사용하고 HTTP 메서드로 `POST`를 설정합니다. 로그와 이벤트 의 차이점에 대한 자세한 내용은 [데이터 관련 위험 줄이기][8]를 참조하세요.
    - 이벤트 엔드포인트를 사용하는 경우 API 목적지 연결에 `title` 및 `text`를 `body.field` 파라미터로 포함해야 합니다. 이는 이벤트 엔드포인트에 대한 `POST`에 필요한 값입니다. 자세한 내용은 [이벤트 문서 게시하기][9]를 참조하세요.
2. 목적지를 설정한 후에는 Amazon 설명서를 참조하여 [이벤트 브리지 규칙 만들기][10]에서 Datadog를 목적지로 설정합니다.
3. Datadog를 목적지로 설정하는 규칙을 만든 후에는 이벤트를 EventBridge에 게시하여 이벤트를 트리거합니다. Datadog에서 이벤트 를 EventBridge로 푸시하는 방법에 대한 자세한 내용은 [EventBridge 통합 설명서][1]를 참조하세요. 예를 들어, 계정에서 [개체를 S3 버킷에 업로드][11]하여 이벤트 테스트를 트리거하려면 다음 AWS CloudShell 명령을 사용합니다:

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. 이벤트 및 로그 전송이 완료되면, 약 5분 후에 데이터를 전송하는 엔드포인트에 따라 Datadog [로그 콘솔][12] 또는 [이벤트 탐색기][13]에서 데이터를 확인할 수 있습니다.

## 트러블슈팅

Datadog로 전송된 페이로드에 대한 자세한 내용을 확인하고 API 엔드포인트의 응답을 보려면 Amazon SQS 대기열을 설정하세요.
1. [Amazon SQS][14]에서 대기열을 만듭니다.
2. [설정](#configuration) 섹션에서 만든 [EventBridge 규칙][15]으로 이동합니다.
3. **대상** 탭을 선택하고 **편집**을 클릭합니다.
4. **추가 설정** 섹션을 확장합니다.
4. **DLQ(Dead Letter Queue) 대기열** 섹션에서 **현재 AWS 계정에서 DLQ로 사용할 Amazon SQS 대기열을 선택합니다.**
5. 방금 만든 SQS 대기열을 선택합니다.
6. 규칙을 업데이트합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[8]: /ko/data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/ko/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/