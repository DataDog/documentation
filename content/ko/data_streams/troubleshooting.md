---
description: 데이터 스트림 모니터링 트러블슈팅
kind: 설명서
title: 데이터 스트림 모니터링 트러블슈팅
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
   데이터 스트림 모니터링은 {{< region-param key="dd_site_name" >}} 사이트에서 이용할 수 없습니다.
</div>
{{% /site-region %}}


본 페이지에서는 데이터 스트림 모니터링 설정 및 사용의 일반적인 문제에 대해 설명하고 해결 방법을 알아봅니다. 각 릴리즈에는 개선 및 수정 사항이 포함되어 있으므로, Datadog은 사용하는 Datadog 추적 라이브러리를 항상 최신 버전으로 유지하시기를 권장합니다.

## 일반적인 문제 진단
### 서비스가 DSM 맵에 표시되지 않습니다.

[설정 지침][1]을 준수했는데도 DSM 맵 또는 개요 페이지에 서비스가 표시되지 않는다면 다음 요구 사항을 충족했는지 확인합니다.
* Datadog 에이전트 v7.34.0 버전 이상을 실행 중입니다.
* 서비스가 Kafka 또는 RabbitMQ에서 직접 프로듀싱 및 소비됩니다.
* 다음 추적 라이브러리 에이전트 버전을 실행 중입니다.
   * 자바(Java): 에이전트 v1.9.0 이상
   * .NET: 트레이서 v2.28.0 이상(.NET Core, .NET Framework)
   * Go (매뉴얼 계측): 데이터 스트림 라이브러리 v0.2 이상


### 엔드 투 엔드 레이턴시 메트릭이 부정확합니다.

경로에서 레이턴시를 계산하려면 경로를 통과하는 메시지가 단일 스레드여야 합니다. 데이터 파이프라인의 메시지가 멀티 스레드인 경우 수동 계측이 필요하며, 이는 현재 [Go 애플리케이션][2] 및 [자바(Java) 애플리케이션][3]에서 사용 가능합니다. .NET용 수동 계측이 필요한 경우 [지원 팀][8]에 문의하세요.

경로 탭에 **이 경로의 레이턴시 값은 추정치일 수 있습니다**라는 메시지가 표시되면 [계측 지침][4] 문서를 참조하세요.


### Kafka 메트릭이 누락됨
애플리케이션이 자바(Java)에서 실행 중인 경우, 자바(Java) 에이전트 v1.9.0 이상을 실행 중이며, 프로듀서 및 컨슈머 서비스가 모두 계측되는지 확인합니다.

애플리케이션이 .NET 또는 Go에서 실행되는 경우, Kafka 메트릭을 채우려면 [Kafka 컨슈머 통합][5]이 필요합니다.

### RabbitMQ 메트릭이 누락됨
[RabbitMQ 통합][6]이 올바르게 설정되었는지 확인합니다.

### 대기열 메트릭이 누락됨
대기열 탭을 채우려면 [Kafka 통합][7]에 메트릭에 대한 자체 호스트, MSK 및 Confluent 플랫폼/클라우드 환경을 설정해야 합니다.

### 클러스터 태그가 표시되지 않음
클러스터 태그는 환경에 따라 다음과 같이 다르게 설정됩니다.
* 셀프 호스트 Kafka: `kafka_cluster` 태그를 Kafka 브로커와 동일한 클러스터에서 실행되는 에이전트 설정에 추가하고, 키는 `kafka_cluster`로 값은 클러스터 이름으로 설정합니다.
* Amazon MSK: [MSK 통합][9]이 활성화되면 클러스터 정보가 자동으로 DSM에 전파됩니다. MSK는 DSM에 클러스터를 `cluster_name`로 전송합니다.
* Confluent 클라우드: DSM으로 계측한 클러스터에 [Confluent 클라우드 통합][10]이 설정되어 있는 경우, 클러스터 정보는 자동으로 DSM에 전파됩니다.
* Confluent 플랫폼: 상단의 자체 호스트 Kafka와 마찬가지로 에이전트 설정에 `kafka_cluster` 태그를 반드시 추가해야 합니다. 

[1]: /ko/data_streams/#setup  
[2]: /ko/data_streams/go/
[3]: https://github.com/DataDog/dd-trace-java/blob/76f25aedf70254cb04d55eedbed6e12921c6e509/dd-trace-api/src/main/java/datadog/trace/api/experimental/DataStreamsCheckpointer.java#L25
[4]: /ko/data_streams/#setup
[5]: /ko/integrations/kafka/?tab=host#kafka-consumer-integration
[6]: /ko/integrations/rabbitmq/?tab=host
[7]: /ko/integrations/kafka/?tab=host
[8]: /ko/help/
[9]: https://docs.datadoghq.com/ko/integrations/amazon_msk/ 
[10]: https://docs.datadoghq.com/ko/integrations/confluent_cloud/