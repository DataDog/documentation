---
aliases:
- /ja/tracing/setup
- /ja/tracing/send_traces/
- /ja/tracing/setup/
- /ja/tracing/environments/
- /ja/tracing/setup/environment
- /ja/tracing/setup/first_class_dimensions
- /ja/tracing/getting_further/first_class_dimensions/
- /ja/agent/apm/
- /ja/tracing/setup_overview/
- /ja/tracing/trace_collection/library_injection_remote
description: Datadog APM の開始
further_reading:
- link: tracing/trace_collection/compatibility
  tag: ドキュメント
  text: 互換性要件
title: アプリケーションインスツルメンテーション
---

## 概要

Datadog APM を始めるには、次の重要なステップに従う必要があります。

1. Datadog Agent をインストールして構成します。
2. アプリケーションをインスツルメントします。

<div class="alert alert-info"><strong>セットアップを簡素化しましょう！</strong><a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> により、Agent のインストールとアプリケーションのインスツルメンテーションをワンステップで行うことができます。</div>

アプリケーションをインスツルメントすることで、可観測性データが Agent に送信され、その後 Datadog のバックエンドに渡されて UI に表示されます。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM パイプライン">}}

## インスツルメンテーションの種類

アプリケーションをインスツルメントするには、主に自動またはカスタムの {{< tooltip glossary="instrumentation" >}} の 2 つのアプローチがあります。

### 自動インスツルメンテーション

最小限の手動ステップでアプリケーションの {{< tooltip glossary="span" >}} を作成します。自動的にアプリケーションをインスツルメントするには、次のいずれかのオプションを使用できます。

- [Single Step Instrumentation][7]: 1 行のインストールコマンドを実行して Datadog Agent をインストールし、APM を有効化し、Linux ホスト、VM、またはコンテナ上のすべてのサービスをインスツルメントします。
- [Datadog ライブラリ][8]: アプリケーションに Datadog トレーシング ライブラリを追加します。

詳細は[自動インスツルメンテーション][5]を参照してください。

### カスタムインスツルメンテーション

自動インスツルメンテーションでキャプチャされない自社コードや複雑な機能から可観測性データを取得します。カスタムでアプリケーションをインスツルメントするには、次のいずれかのオプションを使用できます。

- [Datadog ライブラリ][9]: Datadog トレーシングライブラリを使用して、Datadog 内で可観測性を追加およびカスタマイズします。
- [OpenTelemetry API][10]: Datadog ライブラリでの OpenTelemetry API サポートを使用して、ベンダーに依存しないコードのインスツルメンテーションを行います。

詳細は[カスタムインスツルメンテーション][6]を参照してください。

{{< callout url="https://www.datadoghq.com/product-preview/service-discovery/" btn_hidden="false" header="サービスディスカバリーは現在プレビュー版として提供されています">}}
サービスディスカバリーは、アプリケーション監視の現状を完全に可視化し、システム内の重大なギャップや途切れたトレースを明らかにします。
{{< /callout >}}


## APM セットアップチュートリアル

以下のチュートリアルでは、Datadog トレーシングライブラリを使用して、自動およびカスタムインスツルメンテーションの両方を備えたさまざまなインフラストラクチャーシナリオで、サンプルアプリケーションの分散型トレーシングをセットアップする方法を案内します。

{{< whatsnext desc="言語と環境を選択してください。" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Python アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Python アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Python アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Java アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Java アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Java アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> AWS EKS で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Amazon ECS with EC2 で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Amazon ECS with Fargate で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Admission Controller で Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホストの Go アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Go アプリケーションとコンテナ内の Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 で Amazon ECS の Go アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /><img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate で Amazon ECS の Go アプリケーションのトレースを有効にする{{< /nextlink >}}

{{< /whatsnext >}}
## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/developers/community/libraries/#apm-tracing-client-libraries
[2]: /ja/tracing/trace_collection/library_injection_local/
[4]: /ja/tracing/trace_collection/dd_libraries/
[5]: /ja/tracing/trace_collection/automatic_instrumentation/
[6]: /ja/tracing/trace_collection/custom_instrumentation/
[7]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[8]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/
[10]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/