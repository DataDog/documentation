---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: 블로그
  text: API 목적지 사용 사례 예시가 포함된 AWS 블로그
- link: /logs/guide/reduce_data_transfer_fees
  tag: 가이드
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog으로 보내는 방법
site_support_id: amazon-event-bridge
title: Amazon EventBridge API 목적지를 사용하여 이벤트 및 로그를 Datadog에 전송하기
---
Amazon EventBridge는 이벤트 기반 애플리케이션을 구축할 수 있게 해주는 서버리스 이벤트 버스입니다. EventBridge는 AWS 서비스와 통합될 수 있지만, API 목적지 기능을 사용하면 API를 통해 AWS 외부와 데이터를 주고받을 수 있습니다. 이 가이드는 EventBridge에서 Datadog으로 이벤트와 로그를 보내는 단계를 설명합니다. Datadog에서 EventBridge로 이벤트를 푸시하는 방법에 대한 자세한 내용은 [EventBridge 통합 문서][1]를 참조하세요.

## 설정 {#setup}

시작하기 전에 [Datadog 계정][2]과 [API 키][3]가 있어야 하며, [Amazon Eventbridge API 목적지][4]에 액세스할 수 있어야 합니다.

### 구성 {#configuration}

1. [Amazon의 API 목적지 생성 문서][5]에 나온 단계에 따라 Datadog을 API 목적지로 추가합니다.
    - API 키 인증을 사용하고 키 이름은 `DD-API-KEY`, 값은 [Datadog API 키][3]로 지정하세요.
    - 목적지 엔드포인트로 `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` for logs and `https://event-management-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/events` for events, and set `를 사용하고 POST`를 HTTP 메서드로 사용하세요. 로그와 이벤트의 차이점에 대한 자세한 내용은 [데이터 관련 위험 줄이기][8]를 참조하세요.
2. 목적지를 설정한 후에는 Amazon 설명서의 [EventBridge 규칙 만들기][10]를 참고하여 Datadog을 목적지로 설정하는 규칙을 만듭니다.

    If you're using the events endpoint, configure an [input transformer][16] on the target so the rule sends events in the format the endpoint expects. Use the following input path to extract values from the original event:

    ```json
    {
      "detailType": "$.detail-type",
      "source": "$.source",
      "time": "$.time"
    }
    ```

    Then, use the following input template to build the request body:

    ```json
    {
      "data": {
        "type": "event",
        "attributes": {
          "title": <detailType>,
          "message": "<detailType> from <source>",
          "category": "alert",
          "timestamp": <time>,
          "tags": ["source:<source>"],
          "attributes": {
            "status": "ok"
          }
        }
      }
    }
    ```

    Set `status` to `warn` or `error` for events that represent a problem. For AWS events that represent a configuration change, you can instead send `"category": "change"` with a `changed_resource` object. For the full list of accepted fields, see [Post an event][9].
3. Datadog을 목적지로 하여 규칙을 설정한 후, EventBridge에 이벤트를 게시하여 이벤트를 트리거합니다. Datadog에서 EventBridge로 이벤트를 푸시하는 방법에 대한 자세한 내용은 [EventBridge 통합 문서][1]를 참조하세요. 예를 들어, 계정의 [S3 버킷에 객체를 업로드][11]하여 테스트 이벤트를 트리거하려면 다음 AWS CloudShell 명령을 사용하세요.

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. 이벤트와 로그를 전송하기 시작하면 약 5분 후 전송 대상 엔드포인트에 따라 Datadog [Logs Console][12] 또는 [Events Explorer][13]에서 데이터를 확인할 수 있습니다.

## 문제 해결 {#troubleshooting}

Datadog으로 전송된 페이로드에 대한 자세한 내용을 확인하고 API 엔드포인트의 응답을 보려면 Amazon SQS 대기열을 설정하세요.  
1. [Amazon SQS][14]에서 대기열을 만듭니다.
2. [Configuration](#configuration) 섹션에서 만든 [EventBridge 규칙][15]으로 이동합니다.
3. {{< ui >}}Targets{{< /ui >}} 탭을 선택하고 {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
4. {{< ui >}}Additional settings{{< /ui >}} 섹션을 확장합니다. 
4. {{< ui >}}Dead-letter queue{{< /ui >}} 섹션에서 {{< ui >}}Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue{{< /ui >}}를 선택합니다.
5. 방금 만든 SQS 대기열을 선택합니다.
6. 규칙을 업데이트합니다.

## 추가 자료 {#further-reading}

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
[16]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html