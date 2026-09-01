---
further_reading:
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: 블로그
  text: '데이터 파이프라인 모니터링 101: 데이터 스택 전반에서 상태 및 성능 추적하기'
title: Dead Letter Queues
---
Data Streams Monitoring(DSM)은 비어 있지 않은 DLQ(데드 레터 대기열)에 대한 가시성을 제공하여 메시지 처리 실패를 모니터링하고 검사할 수 있도록 합니다. 또한 DSM을 사용하면 Datadog에서 이러한 메시지 처리 실패를 직접 해결할 수 있습니다.

<div class="alert alert-info">데드 레터 대기열 모니터링은 Amazon SQS 대기열에서 지원됩니다.</div>

## DLQ 모니터링하기 {#monitor-dlqs}

### 설정 {#setup}
* 메시징 서비스에 대해 [Data Streams Monitoring][1]을 활성화하세요.
* [Datadog-AWS integration][2]을 설치합니다. 이 통합을 통해 권한을 관리합니다.
* Datadog에서 메시지 처리 실패를 해결하려면 추가 설정이 필요합니다. [DLQ 문제 해결](#remediate-dlq-issues) 섹션을 참조하세요.

### 사용량 {#usage}

#### 데드 레터 대기열에 대한 모니터링 생성 {#create-a-monitor-for-a-dead-letter-queue}

대기열이 메시지를 DLQ로 재라우팅하는지 추적하려면 [`data_streams.sqs.dead_letter_queue.messages`][8] 메트릭에 대해 경고하는 [메트릭 모니터링][8]을 생성할 수 있습니다.

대기열의 DLQ에 대한 모니터링을 생성하려면 다음 단계를 따르세요.

1. Datadog에서 [Data Streams Monitoring][4]으로 이동합니다.
2.  {{< ui >}}Explore{{< /ui >}} 탭(기본값)을 선택합니다.
3. 지원되는 대기열을 클릭하여 측면 패널을 엽니다.
4.  {{< ui >}}Dead Letter Queue{{< /ui >}} 탭을 선택합니다.
5.  {{< ui >}}Create Monitor{{< /ui >}}를 클릭하여 모니터링 설정 페이지를 엽니다. 기본 입력값으로도 DLQ가 비어 있지 않을 때 경고하는 모니터링을 생성하기에 충분하지만, 원하는 경우 이 페이지에서 추가 구성을 수행할 수도 있습니다.
6. 페이지 하단의 {{< ui >}}Create{{< /ui >}}를 클릭합니다.

#### 메시지 처리 문제 탐지 {#detect-message-processing-issues}

Data Streams Monitoring을 사용하면 메시지가 처리되지 않은 위치와 영향을 받을 수 있는 다운스트림 서비스를 탐지할 수 있습니다.

* DSM [{{< ui >}}Service Map{{< /ui >}}][6]은 DLQ에 메시지가 있는 대기열을 강조 표시하여 오류가 발생하는 위치를 시각적으로 식별할 수 있도록 돕습니다

* DSM [{{< ui >}}Issues{{< /ui >}}][7] 페이지에는 메시지 처리 문제가 발생하는 모든 대기열이 나열됩니다.

## DLQ 문제 해결 {#remediate-dlq-issues}
[Datadog Actions][5]를 사용하여 Datadog에서 비어 있지 않은 DLQ를 직접 검사하고 해결할 수 있습니다.

### 설정 {#setup-1}
Datadog에서 [연결][9]을 생성하세요. 작업을 수행하려면 IAM 엔터티가 필요합니다. 이 IAM 엔터티는 IAM 사용자(보안 액세스 키 포함) 또는 IAM 역할(`sts:AssumeRole`을 사용하여 맡은)일 수 있으며 다음 권한을 가져야 합니다.
  * `sqs:ReceiveMessage`(_peek_용)
  * `sqs:StartMessageMoveTask`(_redrive_용)
  * `sqs:PurgeQueue`(_purge_용)

이 권한은 모든 SQS 대기열에 전역적으로 적용하거나 특정 대기열로 제한할 수 있습니다.

### 사용량 {#usage-1}

연결을 설정한 후 지원되는 대기열을 클릭하여 측면 패널을 열면 다음 작업을 사용할 수 있습니다.

* {{< ui >}}Peek{{< /ui >}} 실패한 메시지 내용을 검사하고 근본 원인을 파악합니다.
* {{< ui >}}Redrive{{< /ui >}} 메시지를 다시 대기열에 넣어 처리를 재시도합니다.
* {{< ui >}}Purge{{< /ui >}} 더 이상 처리가 필요 없는 메시지를 삭제합니다.

## 문제 해결 {#troubleshooting}
데드 레터 대기열이 정보를 볼 수 없는 경우
* [Datadog-AWS 통합][2]이 설치되었는지 확인하세요.
* AWS 역할이 AWS 관리형 `AmazonSQSReadOnlyAccess` 정책을 사용하는지 확인하세요.
* 역할에 `sqs:ListQueues` 및 `sqs:GetQueueAttributes` 권한이 있는지 확인하세요.

[1]: /ko/data_streams/setup
[2]: /ko/integrations/amazon-web-services/
[3]: /ko/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /ko/monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}