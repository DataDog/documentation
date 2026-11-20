---
aliases:
- /ko/tracing/getting_further/
- /ko/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guide
    rank: 50
    subcategory: APM Guides
description: APM 시작하기, 트레이싱 활성화 튜토리얼, 구성 가이드 및 고급 트레이싱 기법에 관한 단계별 가이드입니다.
disable_toc: true
private: true
title: 트레이싱 지침
---
{{< whatsnext desc="APM 시작하기" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. 데이터베이스 서비스의 p99 지연 시간 이상에 대해 알립니다.{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. 서비스의 p50 지연 시간을 주단위로 비교합니다.{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. APM 메트릭을 추적 및 상호 연결하기 위한 대시보드를 생성합니다.{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. 웹 서비스의 가장 느린 엔드포인트에서 가장 느린 트레이스를 디버깅합니다.{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/trace_collection/custom_instrumentation" >}}5. 스팬 태그를 추가하고 애플리케이션 성능을 필터링 및 그룹화합니다.{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. 커스텀 메서드 계측을 통해 비즈니스 논리를 더 깊게 가시화합니다.{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### 튜토리얼: 트레이싱 활성화 {#tutorials-enabling-tracing}

이 튜토리얼은 자동 및 사용자 지정/수동 계측을 사용하여 샘플 다중 서비스 애플리케이션을 설정하고 Datadog APM에서 트레이스가 보일 때까지 스택을 구성하는 과정을 안내합니다. 모든 튜토리얼은 동일한 작업을 수행하지만, 프로그래밍 언어와 인프라 설정이 각각 다릅니다. APM 시작하기의 기본 사항을 알아보려면 사용 중인 개발 및 배포 환경과 가장 유사한 환경을 선택하세요.

{{< whatsnext desc="언어 및 환경 선택:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Datadog Agent와 동일한 호스트에서 Python 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} 컨테이너에서 Python 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}{{< img src="/integrations_logos/python-avatar.png" inline="true" >}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} 컨테이너의 Python 애플리케이션과 호스트의 Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Datadog Agent와 동일한 호스트에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} 컨테이너에서 Java 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} 컨테이너의 Java 애플리케이션과 호스트의 Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-gke-icon.png" inline="true">}} GKE에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-eks-icon.png" inline="true">}} AWS EKS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} EC2 기반 Amazon ECS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Fargate 기반 Amazon ECS에서 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}{{< img src="integrations_logos/java-avatar.png" inline="true">}} Admission Controller를 사용하여 Java 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-host-icon.png" inline="true">}} Datadog Agent와 동일한 호스트에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-container-icon.png" inline="true">}} 컨테이너에서 Go 애플리케이션 및 Datadog Agent에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-ec2-icon.png" inline="true">}} EC2 기반 Amazon ECS에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}{{< img src="integrations_logos/golang-avatar.png" inline="true">}} {{< img src="tracing/guide/tutorials/tutorial-fargate-icon.png" inline="true">}} Fargate 기반 Amazon ECS에서 Go 애플리케이션에 대한 트레이싱 활성화{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="작동 중인 APM 통합" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Kafka 대기열 트레이싱{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}PHP CLI 스크립트 트레이싱{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="수집 샘플링 구성" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}수집 메커니즘을 사용하여 스팬 수집 볼륨 제어{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}OpenTelemetry를 사용한 수집 샘플링{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}수집 샘플링 사용 사례{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/resource_based_sampling/" >}}리소스 기반 샘플링{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="구성 가이드" >}}
    {{< nextlink href="/tracing/guide/remote_config" >}}트레이싱을 위한 Remote Configuration 설정{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="트레이싱 지침" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}서비스별 Apdex 점수 설정{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}서비스 주요 작업 {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}리소스를 무시하여 상태 검사 및 기타 원치 않는 스팬 삭제{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}APM의 DDSketch 기반 메트릭{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}트레이싱 API를 통해 Agent에 트레이스 전송{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}스팬 및 트레이스 ID의 유효한 형식{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}소스에서 트레이스 에이전트 설치{{< /nextlink >}}
    {{< nextlink href="/extend/community/libraries/#apm-distributed-tracing-client-libraries" >}}트레이싱 클라이언트 라이브러리{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}기본 태그를 설정하여 범위 좁히기{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Datadog APM과 AWS X-Ray 사용 시점 결정 {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/serverless_enable_azure_app_insights/" >}}Azure App Insights 통합{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}C++로 APM 설정{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Datadog 트레이스 보존 정책 이해{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}에이전트 호스트와 트레이서 호스트의 차이점 이해{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Kubernetes 서비스로 APM 설정{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/aws_payload_tagging/" >}}AWS 서비스의 요청 및 응답 자동 캡처{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/websocket_observability/" >}}WebSocket Observability{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/service_overrides/" >}}서비스 재정의{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/injectors/" >}}단일 단계 계측에서의 인젝터 동작 이해{{< /nextlink >}}
    {{< nextlink href="/tracing/code_origin/" >}}스팬의 코드 출처{{< /nextlink >}}
{{< /whatsnext >}}