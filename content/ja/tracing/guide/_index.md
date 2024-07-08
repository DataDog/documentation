---
aliases:
- /ja/tracing/getting_further/
- /ja/tracing/guide/ecommerce_and_retail_use_cases/
cascade:
  algolia:
    category: ガイド
    rank: 50
    subcategory: APM ガイド
disable_toc: true
private: true
title: トレースガイド
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

{{< whatsnext desc="言語と環境を選択してください。" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Python アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Python アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Python アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Java アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Java アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Java アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE 上で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Java アプリケーション用の AWS EKS のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Java アプリケーション用の Amazon ECS with EC2 のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Java アプリケーション用の Amazon ECS with Fargate のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Admission Controller を使用して Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホストの Go アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Go アプリケーションとコンテナ内の Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 で Amazon ECS の Go アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate で Amazon ECS の Go アプリケーションのトレースを有効にする{{< /nextlink >}}

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

{{< whatsnext desc="トレーシングガイド" >}}
    {{< nextlink href="/opentelemetry/guide/otel_api_tracing_interoperability/" >}}OpenTelemetry API と Datadog インスツルメンテーショントレースの相互運用性{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm" >}}サービスごとに Apdex スコアを構成する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/configuring-primary-operation" >}}サービスのプライマリオペレーション {{< /nextlink >}}
    {{< nextlink href="tracing/guide/ignoring_apm_resources" >}}リソースを無視してヘルスチェックやその他の不要なスパンを破棄する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/ddsketch_trace_metrics/" >}}APM の DDSketch ベースメトリクス{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/send_traces_to_agent_by_api/" >}}トレーシング API を使用して Agent にトレースを送信する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/span_and_trace_id_format" >}}スパン ID、トレース ID の有効なフォーマット{{< /nextlink >}}
    {{< nextlink href="tracing/guide/trace-agent-from-source" >}}トレース Agent をソースからインストールする{{< /nextlink >}}
    {{< nextlink href="/developers/community/libraries/#apm-distributed-tracing-client-libraries" >}}トレーシングクライアントライブラリ{{< /nextlink >}}
    {{< nextlink href="tracing/guide/setting_primary_tags_to_scope/" >}}スコープにプライマリタグを設定する{{< /nextlink >}}
    {{< nextlink href="tracing/guide/serverless_enable_aws_xray/" >}}Datadog APM と AWS X-Ray の使用タイミングを決定する{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/setting_up_apm_with_cpp/" >}}C++ による APM の設定{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/leveraging_diversity_sampling/" >}}Datadog トレース保持ポリシーの理解{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/agent_tracer_hostnames" >}}Agent ホストとトレーサーホストの違いを理解する{{< /nextlink >}}
{{< nextlink href="/tracing/guide/setting_up_apm_with_kubernetes_service/" >}}Kubernetes Service を使用して APM をセットアップする{{< /nextlink >}}
{{< /whatsnext >}}