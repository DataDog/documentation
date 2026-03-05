---
aliases:
- /ko/integrations/google_cloud_vertex_ai
app_id: google-cloud-vertex-ai
categories:
- cloud
- data stores
- google cloud
- log collection
- ai/ml
custom_kind: integration
description: 개발자가 최소한의 전문 지식과 노력만으로 뛰어난 품질의 맞춤형 머신 러닝 모델을 학습시킬 수 있도록 지원합니다.
further_reading:
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Google Cloud Vertex AI 모니터링
media: []
title: Google Cloud Vertex AI
---
## 개요

Google Cloud Vertex AI는 머신러닝 개발자, 데이터 과학자, 데이터 엔지니어가 프로젝트 구상부터 배포까지
빠르고 비용 효율적으로 진행할 수 있도록 지원합니다. 머신러닝에 관한 최소한의 지식과 노력만으로 
뛰어난 품질의 맞춤형 모델을 학습시킬 수 있습니다.

## 설정

### 설치

#### 메트릭 수집

Google Cloud Vertex AI는 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/) 패키지에 포함되어 있습니다.
아직 설치하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하여 기본 제공 메트릭 수집을 시작하세요.

#### 설정

Vertex AI 레이블을 태그로 수집하려면 Cloud Asset Viewer 역할을 활성화하세요.

[서비스 계정 가장](https://cloud.google.com/iam/docs/service-account-overview#impersonation) 및 자동 프로젝트 검색 기능을 사용하여 Datadog을 [Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/)와 통합할 수 있습니다.

이 방법을 사용하면 관련 프로젝트에 IAM 역할을 할당하여 서비스 계정에 표시되는 모든 프로젝트를 모니터링할 수 있습니다. 
이러한 역할을 프로젝트에 개별적으로 할당하거나 조직 또는 폴더 수준에서 이러한 역할을 할당하여 
Datadog이 프로젝트 그룹을 모니터링하도록 설정할 수 있습니다. 이러한 방식으로 역할을 할당하면 
Datadog이 향후 그룹에 추가될 수 있는 새 프로젝트를 포함해 지정된 범위의 모든 프로젝트를 
자동으로 검색하고 모니터링할 수 있습니다.

#### 로그 수집

Google Cloud Vertex AI 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Vertex AI 로그를 다음 Pub/Sub 토픽으로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Vertex AI 로그를 필터링하세요.
1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.aiplatform.executing_vertexai_pipeline_jobs** <br>(gauge) | 실행 중인 파이프라인 작업 수.|
| **gcp.aiplatform.executing_vertexai_pipeline_tasks** <br>(gauge) | 실행 중인 파이프라인 작업 수.|
| **gcp.aiplatform.featureonlinestore.online_serving.request_count** <br>(count) | 수신된 요청 수.|
| **gcp.aiplatform.featureonlinestore.online_serving.serving_bytes_count** <br>(count) | 제공된 응답 바이트 수.<br>_byte로 표시_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.avg** <br>(count) | 평균 서버측 요청 지연 시간.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.samplecount** <br>(count) | 서버측 요청 지연 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featureonlinestore.online_serving.serving_latencies.sumsqdev** <br>(count) | 서버측 요청 지연 시간의 제곱 편차 합.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featureonlinestore.running_sync** <br>(gauge) | 특정 시점에 실행 중인 동기화 횟수.|
| **gcp.aiplatform.featureonlinestore.serving_data_ages.avg** <br>(count) | 제공 데이터 연령의 평균 측정값(초). 현재 시간에서 동기화된 시간을 뺀 값입니다.<br>_second로 표시_ |
| **gcp.aiplatform.featureonlinestore.serving_data_ages.samplecount** <br>(count) | 제공 데이터 연령 측정값(초)의 샘플 수. 현재 시간에서 동기화된 시간을 뺀 값입니다.<br>_second로 표시_ |
| **gcp.aiplatform.featureonlinestore.serving_data_ages.sumsqdev** <br>(count) | 제공 데이터 연령 측정값(초)의 제곱 편차 합. 현재 시간에서 동기화된 시간을 뺀 값입니다.<br>_second로 표시_ |
| **gcp.aiplatform.featureonlinestore.serving_data_by_sync_time** <br>(gauge) | 동기화된 타임스탬프별 Feature Online Store의 데이터 상세 분석.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_cpu_load** <br>(gauge) | Feature Online Store 노드의 평균 CPU 부하.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_cpu_load_hottest_node** <br>(gauge) | Feature Online Store에서 가장 사용량이 높은 노드의 CPU 부하.|
| **gcp.aiplatform.featureonlinestore.storage.bigtable_nodes** <br>(gauge) | Feature Online Store 노드의 수(Bigtable).|
| **gcp.aiplatform.featureonlinestore.storage.multi_region_bigtable_cpu_load** <br>(gauge) | 다중 리전 복제본가 있는 Feature Online Store 노드의 평균 CPU 부하.|
| **gcp.aiplatform.featureonlinestore.storage.multi_region_bigtable_nodes** <br>(gauge) | 다중 리전 복제본이 있는 Feature Online Store(Bigtable) 노드의 수.|
| **gcp.aiplatform.featureonlinestore.storage.optimized_nodes** <br>(gauge) | Feature Online Store 노드의 수(최적화됨).|
| **gcp.aiplatform.featureonlinestore.storage.stored_bytes** <br>(gauge) | Feature Online Store에 저장된 바이트.<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.cpu_load** <br>(gauge) | Featurestore 온라인 스토리지 노드의 평균 CPU 부하.|
| **gcp.aiplatform.featurestore.cpu_load_hottest_node** <br>(gauge) | Featurestore 온라인 스토리지에서 가장 사용량이 높은 노드의 CPU 부하.|
| **gcp.aiplatform.featurestore.node_count** <br>(gauge) | Featurestore 온라인 스토리지의 노드 수.|
| **gcp.aiplatform.featurestore.online_entities_updated** <br>(count) | Featurestore 온라인 스토리지에 업데이트된 엔티티 수.<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.avg** <br>(count) | EntityType별 평균 온라인 데이터 제공 지연 시간.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.samplecount** <br>(count) | EntityType별 온라인 데이터 제공 지연 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featurestore.online_serving.latencies.sumsqdev** <br>(count) | EntityType별 온라인 데이터 제공 지연 시간의 제곱 편차 합.<br>_millisecond로 표시_ |
| **gcp.aiplatform.featurestore.online_serving.request_bytes_count** <br>(count) | EntityType별 요청 크기<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.online_serving.request_count** <br>(count) | EntityType별 Featurestore 온라인 데이터 제공 횟수.|
| **gcp.aiplatform.featurestore.online_serving.response_size** <br>(count) | EntityType별 응답 크기<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.storage.billable_processed_bytes** <br>(gauge) | 처리된 오프라인 데이터에 대해 청구된 바이트 수.<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.storage.stored_bytes** <br>(gauge) | Featurestore에 저장된 바이트.<br>_byte로 표시_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_processed_count** <br>(count) | 오프라인 스토리지에 처리된 스트리밍 쓰기 요청 수.|
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.avg** <br>(count) | 쓰기 API가 호출된 후 오프라인 스토리지에 기록될 때까지 걸린 평균 시간(초).<br>_second로 표시_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.samplecount** <br>(count) | 쓰기 API가 호출된 후 오프라인 스토리지에 기록될 때까지 걸린 시간(초)의 샘플 수.<br>_second로 표시_ |
| **gcp.aiplatform.featurestore.streaming_write.offline_write_delays.sumsqdev** <br>(count) | 쓰기 API가 호출된 후 오프라인 스토리지에 기록될 때까지 걸린 시간(초)의 제곱 편차 합.<br>_second로 표시_ |
| **gcp.aiplatform.generate_content_input_tokens_per_minute_per_base_model** <br>(count) | 기본 모델별, 프로젝트당, 분당 콘텐츠 입력 토큰을 생성합니다.|
| **gcp.aiplatform.generate_content_requests_per_minute_per_project_per_base_model** <br>(count) | 기본 모델별, 프로젝트당, 분당 콘텐츠 요청을 생성합니다.|
| **gcp.aiplatform.matching_engine.cpu.request_utilization** <br>(gauge) | 매치 서버 컨테이너에서 현재 사용 중인 요청 CPU의 비율.|
| **gcp.aiplatform.matching_engine.current_replicas** <br>(gauge) | DeployedIndex가 사용하는 활성 복제본의 수.|
| **gcp.aiplatform.matching_engine.current_shards** <br>(gauge) | DeployedIndex의 샤드 수.|
| **gcp.aiplatform.matching_engine.memory.used_bytes** <br>(gauge) | 매치 서버 컨테이너에 사용된 메모리(바이트).<br>_byte로 표시_ |
| **gcp.aiplatform.matching_engine.query.latencies.avg** <br>(count) | 평균 서버측 요청 지연 시간.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.query.latencies.samplecount** <br>(count) | 서버측 요청 지연 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.query.latencies.sumsqdev** <br>(count) | 서버측 요청 지연 시간의 제곱 편차 합.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.query.request_count** <br>(count) | 수신된 요청 수.|
| **gcp.aiplatform.matching_engine.stream_update.datapoint_count** <br>(count) | 성공적으로 업서트 또는 삭제된 데이터 포인트 수.|
| **gcp.aiplatform.matching_engine.stream_update.latencies.avg** <br>(count) | 사용자가 UpsertDatapointsResponse 또는 RemoveDatapointsResponse를 수신하고 해당 업데이트가 적용될 때까지의 평균 지연 시간.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.stream_update.latencies.samplecount** <br>(count) | 사용자가 UpsertDatapointsResponse 또는 RemoveDatapointsResponse를 수신하고 해당 업데이트가 적용될 때까지의 지연 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.stream_update.latencies.sumsqdev** <br>(count) | 사용자가 UpsertDatapointsResponse 또는 RemoveDatapointsResponse를 수신하고 해당 업데이트가 적용될 때까지의 지연 시간의 제곱 편차 합.<br>_millisecond로 표시_ |
| **gcp.aiplatform.matching_engine.stream_update.request_count** <br>(count) | 스트림 업데이트 요청 횟수.|
| **gcp.aiplatform.online_prediction_dedicated_requests_per_base_model_version** <br>(count) | 기본 모델 버전별, 프로젝트당, 분당 온라인 예측 전용 요청 수.|
| **gcp.aiplatform.online_prediction_dedicated_tokens_per_base_model_version** <br>(count) | 기본 모델 버전별, 프로젝트당, 분당 온라인 예측 전용 토큰 수.|
| **gcp.aiplatform.online_prediction_requests_per_base_model** <br>(count) | 기본 모델별, 프로젝트당, 분당 온라인 예측 요청 수.<br>_request으로 표시_ |
| **gcp.aiplatform.online_prediction_tokens_per_minute_per_base_model** <br>(count) | 기본 모델별, 프로젝트당, 분당 온라인 예측 토큰.|
| **gcp.aiplatform.pipelinejob.duration** <br>(gauge) | 현재 실행 중인 파이프라인 작업의 런타임 초(생성부터 종료까지).<br>_second로 표시_ |
| **gcp.aiplatform.pipelinejob.task_completed_count** <br>(count) | 완료된 PipelineTask의 누적 수.|
| **gcp.aiplatform.prediction.online.accelerator.duty_cycle** <br>(gauge) | 배포된 모델 복제본에 할당되어 현재 사용 중인 CPU의 비율. 머신 유형에 다중 CPU가 있는 경우 100%를 초과할 수도 있습니다. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_fraction으로 표시_ |
| **gcp.aiplatform.prediction.online.accelerator.memory.bytes_used** <br>(gauge) | 배포된 모델 복제본에 할당된 엑셀러레이터 메모리 양.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.cpu.utilization** <br>(gauge) | 배포된 모델 복제본에 할당되어 현재 사용 중인 CPU의 비율. 머신 유형에 다중 CPU가 있는 경우 100%를 초과할 수도 있습니다. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_fraction으로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.accelerator.duty_cycle** <br>(gauge) | 지난 샘플링 기간 엑셀러레이터가 실제로 처리 작업을 수행한 시간의 평균 비율.|
| **gcp.aiplatform.prediction.online.deployment_resource_pool.accelerator.memory.bytes_used** <br>(gauge) | 배포 리소스 풀 복제본에 할당된 엑셀러레이터 메모리 양.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.cpu.utilization** <br>(gauge) | 배포 리소스 풀 복제본에 할당되어 현재 사용 중인 CPU의 비율. 머신 유형에  다중 CPU가 있는 경우 100%를 초과할 수 있습니다.<br>_percent로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.memory.bytes_used** <br>(gauge) | 배포 리소스 풀 복제본에 할당되어 현재 사용 중인 메모리 양.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.network.received_bytes_count** <br>(count) | 네트워크를 통해 배포 리소스 풀 복제본이 수신한 바이트 수.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.network.sent_bytes_count** <br>(count) | 네트워크를 통해 배포 리소스 풀 복제본이 전송한 바이트 수.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.deployment_resource_pool.replicas** <br>(gauge) | 배포 리소스 풀에서 사용하는 활성 복제본 수.|
| **gcp.aiplatform.prediction.online.deployment_resource_pool.target_replicas** <br>(gauge) | 배포 리소스 풀에 필요한 활성 복제본의 목표 수.|
| **gcp.aiplatform.prediction.online.error_count** <br>(count) | 온라인 예측 오류의 수.<br>_error로 표시_ |
| **gcp.aiplatform.prediction.online.memory.bytes_used** <br>(gauge) | 배포된 모델 복제본에 할당되어 현재 사용 중인 메모리 양. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.network.received_bytes_count** <br>(count) | 배포된 모델 복제본이 네트워크를 통해 수신한 바이트 수. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.network.sent_bytes_count** <br>(count) | 배포된 모델 복제본이 네트워크를 통해 전송한 바이트 수. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_byte로 표시_ |
| **gcp.aiplatform.prediction.online.prediction_count** <br>(count) | 온라인 예측 수.<br>_prediction으로 표시_ |
| **gcp.aiplatform.prediction.online.prediction_latencies.avg** <br>(gauge) | 배포된 모델의 평균 온라인 예측 지연 시간.<br>_microsecond로 표시_ |
| **gcp.aiplatform.prediction.online.prediction_latencies.samplecount** <br>(count) | 공개 배포 모델의 온라인 예측 지연 시간. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_microsecond로 표시_ |
| **gcp.aiplatform.prediction.online.private.prediction_latencies.avg** <br>(gauge) | 프라이빗 배포 모델의 평균 온라인 예측 지연 시간.<br>_microsecond로 표시_ |
| **gcp.aiplatform.prediction.online.private.prediction_latencies.samplecount** <br>(count) | 프라이빗 배포 모델의 온라인 예측 지연 시간. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 360초 동안 표시되지 않습니다.<br>_microsecond로 표시_ |
| **gcp.aiplatform.prediction.online.private.response_count** <br>(count) | 프라이빗 배포 모델의 온라인 예측 응답 수.<br>_response로 표시_ |
| **gcp.aiplatform.prediction.online.replicas** <br>(count) | 배포된 모델이 사용한 활성 복제본의 수. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 120초 동안 표시되지 않습니다.<br>_worker로 표시_ |
| **gcp.aiplatform.prediction.online.response_count** <br>(count) | 온라인 예측 고유 응답 코드의 수.<br>_response로 표시_ |
| **gcp.aiplatform.prediction.online.target_replicas** <br>(count) | 배포된 모델에 필요한 활성 복제본의 목표 수. 매 60초마다 샘플링됩니다. 샘플링 후 데이터는 최대 120초 동안 표시되지 않습니다.<br>_worker로 표시_ |
| **gcp.aiplatform.publisher.online_serving.character_count** <br>(count) | 누적 입력/출력 문자 수.|
| **gcp.aiplatform.publisher.online_serving.characters.avg** <br>(count) | 입력/출력 문자 수의 평균 분포.|
| **gcp.aiplatform.publisher.online_serving.characters.samplecount** <br>(count) | 입력/출력 문자 수 분포의 샘플 수.|
| **gcp.aiplatform.publisher.online_serving.characters.sumsqdev** <br>(count) | 입력/출력 문자 수 분포의 제곱 편차 합.|
| **gcp.aiplatform.publisher.online_serving.consumed_throughput** <br>(count) | 소진율을 고려한 전체 처리량(문자 수 기준).|
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.avg** <br>(count) | 요청 수신 후 클라이언트에 첫 번째 토큰을 반환할 때까지 소요된 평균 시간.<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.samplecount** <br>(count) | 요청 수신 후 클라이언트에 첫 번째 토큰을 반환할 때까지 소요된 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.first_token_latencies.sumsqdev** <br>(count) | 요청 수신 후 클라이언트에 첫 번째 토큰을 반환할 때까지의 소요된 시간의 제곱 편차 합.<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_count** <br>(count) | 모델 호출 횟수(예측 요청).|
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.avg** <br>(count) | 평균 모델 호출 지연 시간(예측 지연 시간).<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.samplecount** <br>(count) | 모델 호출 지연 시간의 샘플 수(예측 지연 시간).<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.model_invocation_latencies.sumsqdev** <br>(count) | 모델 호출 지연 시간의 제곱 편차 합(예측 지연 시간).<br>_millisecond로 표시_ |
| **gcp.aiplatform.publisher.online_serving.token_count** <br>(count) | 누적 입력/출력 토큰 수.|
| **gcp.aiplatform.publisher.online_serving.tokens.avg** <br>(count) | 입력/출력 토큰 수의 평균 분포.|
| **gcp.aiplatform.publisher.online_serving.tokens.samplecount** <br>(count) | 입력/출력 토큰 수 분포의 샘플 수.|
| **gcp.aiplatform.publisher.online_serving.tokens.sumsqdev** <br>(count) | 입력/출력 토큰 수 분포의 제곱 편차 합.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model` 한도를 초과하려 시도한 횟수.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model`의 현재 한도.|
| **gcp.aiplatform.quota.generate_content_input_tokens_per_minute_per_base_model.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_input_tokens_per_minute_per_base_model`의 현재 사용량.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model` 한도를 초과하려 시도한 횟수.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`의 현재 한도.|
| **gcp.aiplatform.quota.generate_content_requests_per_minute_per_project_per_base_model.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/generate_content_requests_per_minute_per_project_per_base_model`의 현재 사용량.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version` 한도를 초과하려 시도한 횟수.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version`의 현재 한도.|
| **gcp.aiplatform.quota.online_prediction_dedicated_requests_per_base_model_version.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_requests_per_base_model_version`의 현재 사용량.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version` 한도를 초과하려 시도한 횟수.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version`의 현재 한도.|
| **gcp.aiplatform.quota.online_prediction_dedicated_tokens_per_base_model_version.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_dedicated_tokens_per_base_model_version`의 현재 사용량.|
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_requests_per_base_model` 한도를 초과하려 시도한 횟수.<br>_error로 표시_ |
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_requests_per_base_model`의 현재 한도.<br>_request로 표시_ |
| **gcp.aiplatform.quota.online_prediction_requests_per_base_model.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_requests_per_base_model`의 현재 사용량.<br>_request로 표시_ |
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.exceeded** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model` 한도를 초과하려 시도한 횟수.|
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.limit** <br>(gauge) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model`의 현재 한도.|
| **gcp.aiplatform.quota.online_prediction_tokens_per_minute_per_base_model.usage** <br>(count) | 할당량 메트릭 `aiplatform.googleapis.com/online_prediction_tokens_per_minute_per_base_model`의 현재 사용량.|

### 서비스 점검

Google Cloud Vertex AI는 서비스 점검을 포함하지 않습니다.

### 이벤트

Google Cloud Vertex AI는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}