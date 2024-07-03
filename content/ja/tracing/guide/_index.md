---
aliases:
- /ja/tracing/getting_further/
- /ja/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: Guide
    rank: 50
    subcategory: APM Guides
disable_toc: true
private: true
title: Tracing Guides
---


{{< whatsnext desc="APM の概要" >}}
    {{< nextlink href="tracing/guide/alert_anomalies_p99_database" >}}1. データベースサービス P99 のレイテンシーに関する異常のアラート{{< /nextlink >}}
    {{< nextlink href="tracing/guide/week_over_week_p50_comparison" >}}2. サービスの p50 レイテンシーを前週と比較する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}3. APM メトリクスを追跡し、関連付けるためのダッシュボードを作成する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/slowest_request_daily" >}}4. Web サービスの最も遅いエンドポイントでの最も遅いトレースをデバッグする{{< /nextlink >}}
    <a id="enabling-tracing-tutorials">
    {{< nextlink href="tracing/guide/add_span_md_and_graph_it" >}}5. スパンタグを追加し、アプリケーションのパフォーマンスをフィルタリングしてグループ化する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/instrument_custom_method" >}}6. カスタムメソッドをインスツルメンテーションして、ビジネスロジックを深く可視化する{{< /nextlink >}}
{{< /whatsnext >}}

<br>

### チュートリアル: トレースの有効化

このチュートリアルでは、自動およびカスタム/手動のインスツルメンテーションを備えたサンプルマルチサービスアプリケーションをセットアップし、Datadog APM でトレースを確認するまでのスタックを構成する方法を説明します。チュートリアルは全て同じことを行いますが、プログラミング言語とインフラストラクチャーのセットアップが異なります。あなたの開発・デプロイ環境に最も近いものを選び、APM を始めるための基本を学んでください。

{{< whatsnext desc="Choose your language and environment:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Python Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Python Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Python Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Java Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Java Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Java Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Enabling Tracing for a Java Application on GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Enabling Tracing for a Java Application on AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Java Application in Amazon ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Java Application in Amazon ECS with Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Enabling Tracing for a Java Application with the Admission Controller{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Go Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Go Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Go Application in Amazon ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Go Application in Amazon ECS with Fargate{{< /nextlink >}}

{{< /whatsnext >}}
<br>

{{< whatsnext desc="APM インテグレーションのアクション" >}}
    {{< nextlink href="/tracing/guide/monitor-kafka-queues/" >}}Kafka キューをトレースする{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/trace-php-cli-scripts/" >}}PHP CLI スクリプトをトレースする{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="取り込みサンプリングの構成" >}}
    {{< nextlink href="/tracing/guide/trace_ingestion_volume_control/" >}}取り込みメカニズムによるスパン取り込み量の制御{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/guide/ingestion_sampling_with_opentelemetry/" >}}OpenTelemetry による取り込みサンプリング{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/ingestion_sampling_use_cases/" >}}取り込みサンプリングのユースケース{{< /nextlink >}}
{{< /whatsnext >}}
<br>

{{< whatsnext desc="Tracing Guides" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}Interoperability of OpenTelemetry API and Datadog instrumented traces{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}Configure Apdex Score by Service{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}Primary Operations in Services {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}Discard Health Checks and Other Unwanted Spans by Ignoring Resources{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}DDSketch Based Metrics in APM{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}Send Traces to the Agent by the Tracing API{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}Valid formats of span and trace IDs{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}Installing the trace Agent from source{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}Tracing Client Libraries{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}Setting Primary Tags To Scope{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Decide When to Use Datadog APM and AWS X-Ray {{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}Setting Up APM with C++{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Understand Datadog Trace Retention Policy{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Understand the Difference Between the Agent Host and the Tracer Host{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Setting up APM with Kubernetes Service{{< /nextlink >}}
{{< /whatsnext >}}