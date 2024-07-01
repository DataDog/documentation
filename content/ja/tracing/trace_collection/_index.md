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
title: Datadog へのトレースの送信
---

## 概要

Datadog APM を使い始めるには、以下の主要手順に従う必要があります。

1. Datadog Agent をインストールして構成します。
2. アプリケーションをインスツルメントします。

<div class="alert alert-info"><strong>セットアップを簡素化しましょう！</strong><a href="https://docs.datadoghq.com/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> により、Agent のインストールとアプリケーションのインスツルメンテーションをワンステップで行うことができます。</div>

アプリケーションのインスツルメンテーションにより、可観測性データが Agent へ送信され、その後 Agent が Datadog バックエンドにデータを送り UI に表示されます。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM パイプライン">}}

## インスツルメンテーションの種類

アプリケーションのインスツルメンテーションには、主に自動インスツルメンテーションとカスタムインスツルメンテーションの 2 つのアプローチがあります。

### 自動インスツルメンテーション

最小限の手作業でアプリケーションのスパンを作成しましょう。アプリケーションを自動的にインスツルメントするには、以下のいずれかのオプションを使用できます。

- [Single Step Instrumentation (ベータ版)][7]: Datadog Agent をインストールし、APM を有効にし、Linux ホスト、VM、またはコンテナ上のすべてのサービスをインスツルメントするための、1 行のインストールコマンドを実行します。
- [Datadog ライブラリ][8]: Datadog トレーシングライブラリをアプリケーションに追加します。

詳しくは、[自動インスツルメンテーション][5]をご覧ください。

### カスタムインスツルメンテーション

自動インスツルメンテーションではキャプチャされない社内コードや複雑な関数から可観測性データをキャプチャします。アプリケーションをカスタムインスツルメントするには、以下のいずれかのオプションを使用できます。

- [Datadog ライブラリ][9]: Datadog のトレーシングライブラリを使用して、Datadog 内で可観測性を追加、カスタマイズします。
- [OpenTelemetry API][10]: Datadog ライブラリの OpenTelemetry API サポートを使用して、コードのインスツルメンテーションをベンダーニュートラルに行います。

詳しくは、[カスタムインスツルメンテーション][6]をご覧ください。

## APM セットアップチュートリアル

以下のチュートリアルでは、様々なインフラストラクチャーシナリオ上のサンプルアプリケーションに対して、自動インスツルメンテーションとカスタムインスツルメンテーションの両方を用いて、分散型トレーシングを設定する方法を、Datadog トレーシングライブラリを用いて説明します。

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
## その他の参考資料

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
