---
aliases:
- /ko/tracing/getting_further/
- /ko/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: 지침
    rank: 50
    subcategory: 애플리케이션 성능 모니터링(APM) 지침
disable_toc: true
kind: 지침
private: true
title: 트레이싱 지침
---


{{< whatsnext desc="APM 시작하기" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. 데이터 서비스 p99 레이턴시의 이상 경고{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. 서비스의 주별 p50 레이턴시 비교{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. APM 메트릭을 추적 및 연관시키는 대시보드 생성{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. 웹서비스의 가장 느린 엔드포인트에서 가장 느린 트레이스를 디버깅{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/guide/add_span_md_and_graph_it" >}}5. 스팬 태그를 추가하고 애플리케이션 성능을 필터 및 그룹화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. 비즈니스 로직의 가시성 확보를 위해 커스텀 방식 계측.{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### 튜토리얼: 트레이싱 활성화

본 튜토리얼에서는 자동 및 사용자 지정/수동 계측을 활용하여 샘플 멀티서비스 애플리케이션을 설정하고, Datadog 애플리케이션 성능 모니터링(APM)에서 트레이스를 확인할 때까지 스택을 설정하는 과정을 알아봅니다. 본 튜토리얼에서는 모두 동일한 작업을 수행하지만 프로그래밍 언어와 인프라스트럭처 설정에 따라 방법은 달라집니다. 고객님의 개발 및 배포 환경과 가장 유사한 방식을 선택하여 애플리케이션 성능 모니터링(APM) 사용 시작의 기본을 알아보세요.

{{< whatsnext desc="언어 및 환경 선택하기:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 파이썬(Python) 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 파이썬(Python) 애플리케이션 및 Datadog 에이전트 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 호스트의 컨테이너 및 애플리케이션의 파이썬(Python) 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 Java 애플리케이션 및 Datadog 에이전트 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> 호스트의 컨테이너 및 애플리케이션의 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE에서 Java 애플리케이션 트레이싱 활성화 {{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> AWS EKS에서 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Amazon ECS에서 EC2로 Java 애플리케이션 트레이싱 활성화 {{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Amazon ECS에서 Fargate로 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> 어드미션 컨트롤러로 Java 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog 에이전트와 동일한 호스트에서 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> 컨테이너의 Datadog 에이전트 및 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Amazon ECS에서 EC2로 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Amazon ECS에서 Fargate로 Go 애플리케이션 트레이싱 활성화{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="APM 통합 실행" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Kafka 큐 트레이싱{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}PHP CLI 스크립트 트레이싱{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="수집 샘플링 설정" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}수집 메커니즘으로 스팬(span) 수집 볼륨 컨트롤{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}OpenTelemetry로 수집 샘플링{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}수집 샘플링 사용 예시{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="트레이싱 지침" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}OpenTelemetry API 및 Datadog 계측 트레이스의 상호운용성{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}서비스별 Apdex 스코어 설정{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}서비스별 기본 작업{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}리소스를 무시하여 서비스 점검 및 기타 원하지 않는 스팬을 폐기{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}APM의 DDSketch 기반 메트릭{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}API 트레이싱으로 에이전트에 트레이스 전송{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}트레이스 ID 및 스팬 유효 형식{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}소스에서 트레이스 에이전트 설치{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}트레이싱 클라이언트 라이브러리{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}기본 태그 범위 설정{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Datadog APM 및 AWS X-Ray 사용 시점 결정{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}C++로 APM 설정{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Datadog 트레이스 보존 정책 이해{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}에이전트 호스트와 트레이서 호스트 간의 차이점 이해{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Kubernetes 서비스로 APM 설정{{< /nextlink >}}
{{< /whatsnext >}}