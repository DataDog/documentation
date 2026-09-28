---
aliases:
- /ko/data_streams/live_messages
- /ko/data_streams/messages
- /ko/data_streams/kafka/messages
description: Kafka 콘솔을 사용하여 Kafka 클러스터의 상태를 모니터링하고, 서비스를 토픽에 연결하며, 스키마와 메시지를 검사할 수
  있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/kafka-console/
  tag: 블로그
  text: Kafka 콘솔을 사용하여 스택의 모든 계층에서 발생하는 Kafka 문제 해결하기
title: Kafka 콘솔
---
Data Streams Monitoring의 Kafka 콘솔을 사용하면 Datadog Agent 검사가 Kafka 클러스터에 연결되어 상태 및 성능 메트릭을 수집하기 시작합니다. Kafka 콘솔을 통해 다음을 수행할 수 있습니다.

- **Kafka 상태 모니터링**: 처리량, 지연, 복제 메트릭을 통해 클러스터, 브로커, 토픽, 파티션의 상태를 확인할 수 있습니다.
- **근본 원인 파악**: 구성 및 스키마 변경 사항을 지연, 처리량, 오류와 연관시키고, 문제를 정확한 토픽, 스키마 버전 또는 구성 변경까지 추적할 수 있습니다.
- **서비스를 토픽에 연결**: 연결된 소유자, 리포지토리, On-Call 순환, 트레이스 및 오류 로그와 함께 각 토픽과 상호 작용하는 프로듀서 및 컨슈머를 확인할 수 있습니다.
- **토픽 스키마 및 메시지 검사**: 스키마를 조회하고, 버전을 비교하며, 메시지에 접근하여 잘못된 페이로드를 디버깅하거나 토픽을 탐색할 수 있습니다.
- **경보 및 응답 자동화**: [권장 모니터 템플릿][4]을 사용하고 Kafka 조건이 발생할 때 Workflow Automation 또는 웹훅을 트리거합니다.

시작하려면 [Kafka 콘솔 설정][2]을 참조하세요.

## 워크플로 {#workflows}

### 클러스터 상태 및 성능 모니터링{#monitor-cluster-health-and-performance}

{{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Topics{{< /ui >}}, {{< ui >}}Brokers{{< /ui >}} 탭은 전체 Kafka 인프라의 상태를 표시합니다. 각 토픽에 대해 파티션 수, 복제 부족 및 오프라인 파티션, 메시지 처리량, 소비자 지연 시간을 확인할 수 있습니다.

{{< img src="data_streams/kafka_clusters_overview-2.png" alt="Kafka 콘솔의 클러스터 뷰는 브로커 수, 토픽 이름, 복제 상태 및 메시지 유입률을 포함한 클러스터 목록을 보여줍니다." >}}

토픽을 클릭하면 유입 메시지 속도, 모든 파티션의 최대 지연 시간, 현재 지연 시간이 보존 제한에 도달하고 있는지 여부를 포함한 자세한 요약을 볼 수 있습니다.

{{< img src="data_streams/kafka_topic_summary-2.png" alt="0.8 msg/sec의 유입 메시지 속도, 1.15초의 현재 지연 시간, 지연 시간 대 보존 상태를 보여주는 토픽 상세 요약 페이지" >}}

모든 메트릭에서 Datadog 모니터, SLO 및 대시보드를 생성할 수 있습니다.

### 구성 및 스키마 변경 사항을 상태 메트릭과 상호 연관시키기 {#correlate-configuration-and-schema-changes-with-health-metrics}

변경 이벤트가 처리량 및 지연 시간 그래프에 직접 오버레이되므로 구성 또는 스키마 변경이 성능 저하와 동시에 발생했는지 확인할 수 있습니다.

{{< img src="data_streams/kafka_topics_lag_change-2.png" alt="토픽별 지연 그래프 위에 17:02:42 시점의 topic_config 변경 주석이 오버레이된 토픽 뷰 화면으로, 변경 이벤트와 상호 연관된 급증을 보여줍니다." >}}

정확히 무엇이 변경되었는지 확인하려면 오버레이에서 감지된 변경 사항을 클릭하고 {{< ui >}}View config change{{< /ui >}}를 선택하세요. 

{{< img src="data_streams/lag-by-topic-overlay.png" alt="버전 625와 626을 비교하는 토픽 구성 diff 뷰 화면으로, 1000012에서 1024로 변경된 max.message.bytes가 강조 표시되어 있습니다." >}}

### 프로듀서 및 컨슈머 서비스를 토픽에 연결{#connect-producer-and-consumer-services-to-topics}

각 토픽의 {{< ui >}}Producers{{< /ui >}} 및 {{< ui >}}Consumers{{< /ui >}} 섹션은 어떤 서비스가 해당 토픽을 읽고 쓰는지 보여줍니다. 서비스 위로 마우스를 가져가면 Service Catalog의 소유권 정보(팀, 코드 리포지토리, On-Call 엔지니어, Slack 채널)가 표시됩니다.

{{< img src="data_streams/kafka_topic_service_ownership.png" alt="소유권 팀(Frameworks), 코드 리포지토리, On-Call 엔지니어, Slack 채널 및 상태 정보가 표시된 서비스 패널이 열려 있는 토픽 프로듀서 및 컨슈머 조회 화면" >}}

이 정보를 사용하여 컨슈머가 지연되거나 프로듀서가 잘못 작동할 때 적절한 팀에 문의하세요.

### 토픽 스키마 및 메시지 검사{#inspect-topic-schemas-and-messages}

{{< ui >}}Schema{{< /ui >}} 섹션은 토픽의 키 또는 값에 대한 현재 스키마와 버전 기록을 보여줍니다. 버전 선택기를 사용하여 버전 간 스키마를 비교하세요.

{{< ui >}}Messages{{< /ui >}} 섹션을 통해 파티션 및 오프셋별로 메시지를 검색하여 페이로드를 직접 검사할 수 있습니다. 이는 잘못된 페이로드를 디버깅하거나 스키마 변경 후 메시지 구조를 확인하는 데 유용합니다. 메시지 검색에 필요한 추가 전제 조건 및 권한은 [메시지 검사 활성화][3]를 참조하세요.

{{< img src="data_streams/kafka_schema_messages.png" alt="Protobuf 스키마 정의와 날짜, 파티션, 오프셋, 메시지 값이 포함된 최근 메시지 표를 보여주는 토픽 스키마 및 메시지 조회 화면" >}}

[2]: /ko/data_streams/kafka/setup/
[3]: /ko/data_streams/kafka/setup/#enable-message-inspection
[4]: /ko/data_streams/kafka/monitors_and_automation/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}