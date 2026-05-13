---
algolia:
  tags:
  - apm automatic instrumentation
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
- /ja/tracing/trace_collection/automatic_instrumentation
description: Datadog APM の開始
further_reading:
- link: tracing/trace_collection/compatibility
  tag: よくあるご質問
  text: 互換性要件
- link: /tracing/glossary/
  tag: よくあるご質問
  text: APM の用語と概念
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: ブログ
  text: Javaアプリケーションのエンドツーエンドの可視性を単一のコマンドで有効にします
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Datadog Operator と Admission Controller を使用してアプリケーションをインスツルメントする
title: アプリケーションインスツルメンテーション
---
## 概要 {#overview}
Application {{< tooltip glossary="インスツルメンテーション" >}} Datadog APMを使用するには、以下の手順が必要です：

1. **SDKのセットアップ**：アプリケーションにDatadog SDKを追加します。
2. **スパンの作成**：可観測性データをキャプチャします。 {{< tooltip glossary="スパン" >}}s.

   スパンは、SDKが読み込まれるとすぐに自動的に生成されます。これは**自動インスツルメンテーション**として知られており、ほとんどのユーザーにとって十分な可視性を提供します。より多くの制御が必要な場合は、オプションでカスタムスパンを追加できます。

**注意**：これらの手順は、[Datadogエージェント][5]がインストールされ、トレースを受信するように構成されていることを前提としています。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APMパイプライン">}}

## はじめに {#getting-started}

<div class="alert alert-info">
<strong>ベンダー中立のインスツルメンテーションを好みますか？</strong>DatadogでOpenTelemetryを使用するための<a href="/opentelemetry/">OpenTelemetryドキュメント</a>を参照してください。
</div>

### 単一ステップインスツルメンテーション（推奨） {#single-step-instrumentation-recommended}

[単一ステップインスツルメンテーション][1]（SSI）は、単一のコマンドでDatadog SDKを自動的にインストールおよび構成します。自動インスツルメンテーションは、コードの変更なしに、サポートされているフレームワークやライブラリからトレースのキャプチャを即座に開始します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/" >}}単一ステップインスツルメンテーションを始めましょう{{< /nextlink >}}
{{< /whatsnext >}}

### 手動セットアップとカスタムスパン {#manual-setup-and-custom-spans}

可観測性のニーズが増えるにつれて、より多くの制御とカスタマイズを追加できます：

**SDKの完全な設定制御のためには:** SDKの動作と設定を詳細に制御する必要がある場合は、[手動管理のDatadog SDK][2]を使用してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}手動管理のDatadog SDKを使用してください{{< /nextlink >}}
{{< /whatsnext >}}

**コード変更なしでカスタムスパンを作成するには:** [Dynamic Instrumentation][4]を使用して、アプリケーションを再デプロイすることなくDatadog UIからカスタムスパンを作成します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Dynamic Instrumentationでカスタムスパンを追加します{{< /nextlink >}}
{{< /whatsnext >}}

**コード内でカスタムスパンを作成するには:** [コードベースのカスタムインスツルメンテーション][3]を追加して、カスタムビジネスロジックをインスツルメンテーションしたり、スパンにアプリケーション固有のメタデータを追加します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}コードベースのインスツルメンテーションでカスタムスパンを追加します{{< /nextlink >}}
{{< /whatsnext >}}

これらのオプションは組み合わせることができます。例えば、シングルステップインスツルメンテーションから始めて、特定のスパンに対してコードベースのカスタムインスツルメンテーションを追加したり、ダイナミックインスツルメンテーションを使用して手動管理のSDKでデプロイなしのスパン追加を行うことができます。

## 詳細な比較 {#detailed-comparison}

### SDKセットアップ {#sdk-setup}

シングルステップインスツルメンテーションは、ほとんどのユーザーに推奨される出発点です。SDKの設定をより詳細に制御する必要がある場合は、代わりに手動管理のDatadog SDKを使用できます:

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/single-step-apm/">シングルステップインスツルメンテーション</a>（推奨）</th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dd_libraries/">手動管理のDatadog SDK</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">仕組み</td>
    <td style="border:1px solid #ccc;">Datadogは、単一のコマンドで、実行時にアプリケーションプロセスにSDKを自動的にインストールして読み込みます。</td>
    <td style="border:1px solid #ccc;">SDKをアプリケーションコードまたはビルドプロセスに直接インストールして設定します。</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">コード変更はありますか？</td>
    <td style="border:1px solid #ccc;">いいえ</td>
    <td style="border:1px solid #ccc;">はい</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">セットアップの複雑さ</td>
    <td style="border:1px solid #ccc;">低 - 最小限の設定が必要</td>
    <td style="border:1px solid #ccc;">中 - 環境とビルドの設定が必要</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">設定管理</td>
    <td style="border:1px solid #ccc;">標準のデフォルトにオプションのオーバーライド</td>
    <td style="border:1px solid #ccc;">環境変数とコードを通じて完全な制御</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">使用するタイミング</td>
    <td style="border:1px solid #ccc;">コードの変更なしでサービス全体に迅速かつ一貫したインスツルメンテーションを行うには、ここから始めてください。</td>
    <td style="border:1px solid #ccc;">SDKの動作と設定を詳細に制御する必要がある場合は、これに進んでください。</td>
  </tr>
</table>

### スパンのカスタマイズ {#span-customization}

自動インスツルメンテーションは、サポートされているフレームワークやライブラリのためにスパンを自動的に作成し、追加の作業なしで重要な可観測性を提供します。カスタムコードパスの可視性が必要な場合や、アプリケーション固有のデータでトレースを強化したい場合は、ダイナミックインスツルメンテーションまたはコードベースのカスタムインスツルメンテーションを使用してカスタムスパンを追加できます：

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dynamic_instrumentation/">Dynamic Instrumentation</a></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">コードベースのカスタムインスツルメンテーション</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">仕組み</td>
    <td style="border:1px solid #ccc;">Datadog UIでインスツルメンテーションルールを設定します。ルールは実行時に適用されます。</td>
    <td style="border:1px solid #ccc;">アプリケーションコードに明示的なトレースAPI呼び出しを追加します。</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">コード変更はありますか？</td>
    <td style="border:1px solid #ccc;">いいえ</td>
    <td style="border:1px solid #ccc;">はい</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">デプロイが必要</td>
    <td style="border:1px solid #ccc;">いいえ</td>
    <td style="border:1px solid #ccc;">はい（スパンを追加または変更するため）</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">使用するタイミング</td>
    <td style="border:1px solid #ccc;">コードの変更や再デプロイなしでカスタムスパンを追加します。</td>
    <td style="border:1px solid #ccc;">複雑なインスツルメンテーションロジックが必要な場合や、スパンをコードに永続的に定義したい場合に進みます。</td>
  </tr>
</table>

## APM セットアップチュートリアル {#apm-setup-tutorials}

以下のチュートリアルでは、さまざまなインフラストラクチャーシナリオで、サンプルアプリケーションの分散型トレーシングを自動およびカスタムインスツルメンテーションを使用して設定する方法を案内します。

{{< whatsnext desc="言語と環境を選択してください：" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Python アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Python アプリケーションと Datadog Agent のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Python アプリケーションとホスト上の Datadog Agent のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Java アプリケーションと Datadog Agent のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> コンテナ内の Java アプリケーションとホスト上の Datadog Agent のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> GKE 上の Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Amazon EKS 上の Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 を使用した Amazon ECS 上の Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate を使用した Amazon ECS 上の Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Admission Controller を使用して Java アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上で Go アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> コンテナ内の Go アプリケーションと Datadog Agent のトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> EC2 を使用した Amazon ECS 上の Go アプリケーションのトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Fargate を使用した Amazon ECS 上の Go アプリケーションのトレースを有効にする{{< /nextlink >}}

{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/single-step-apm/
[2]: /ja/tracing/trace_collection/dd_libraries/
[3]: /ja/tracing/trace_collection/custom_instrumentation/
[4]: /ja/tracing/trace_collection/dynamic_instrumentation/
[5]: /ja/agent/