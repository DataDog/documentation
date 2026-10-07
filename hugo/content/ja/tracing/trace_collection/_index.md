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
description: Datadog APM の利用を開始
further_reading:
- link: tracing/trace_collection/compatibility
  tag: ドキュメント
  text: 互換性要件
- link: /tracing/glossary/
  tag: ドキュメント
  text: APM の用語と概念
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: ブログ
  text: 1 つのコマンドで、Java アプリケーションのエンドツーエンドの可視性を有効化
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Datadog Operator と Admission Controller を使用してアプリケーションをインスツルメントする
title: アプリケーションインスツルメンテーション
---
## 概要 {#overview}
Datadog APM を使用した {{< tooltip glossary="アプリケーション" >}} インスツルメンテーション:

1. **SDK のセットアップ**: アプリケーションに Datadog SDK を追加します。
2. **スパンの作成**: 監視可能性データを {{< tooltip glossary="スパンとして" >}}収集します。

   スパンは、SDK が読み込まれるとすぐに自動生成されます。これは**自動インスツルメンテーション**として知られており、ほとんどのユーザーにとって十分な可視性を提供します。より詳細な制御が必要な場合は、オプションでカスタムスパンを追加できます。

**注**: これらの手順は、[Datadog Agent][5] がインストールされ、トレースを受信するように構成されていることを前提としています。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM パイプライン">}}

## はじめに {#getting-started}

<div class="alert alert-info">
<strong>ベンダー中立のインスツルメンテーションをご希望の場合は、</strong>Datadog で OpenTelemetry を使用するための <a href="/opentelemetry/">OpenTelemetry ドキュメント</a>を参照してください。
</div>

### Single Step Instrumentation (推奨) {#single-step-instrumentation-recommended}

[Single Step Instrumentation][1] (SSI) は、単一のコマンドで Datadog SDK を自動的にインストールおよび構成します。自動インスツルメンテーションは、コード変更なしに、サポートされているフレームワークやライブラリからトレースを即座に収集し始めます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/" >}}Single Step Instrumentation の利用を開始する{{< /nextlink >}}
{{< /whatsnext >}}

### 手動セットアップとカスタムスパン {#manual-setup-and-custom-spans}

監視可能性のニーズが高まるにつれて、より詳細な制御とカスタマイズを追加できます。

**完全な SDK 構成制御:** SDK の動作と構成を詳細に制御する必要がある場合は、[手動管理の Datadog SDK][2] を使用します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}手動管理の Datadog SDK を使用する{{< /nextlink >}}
{{< /whatsnext >}}

**コード変更なしでカスタムスパンを作成する:** [Dynamic Instrumentation][4] を使用して、アプリケーションを再デプロイすることなく Datadog UI からカスタムスパンを作成します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Dynamic Instrumentation でカスタムスパンを追加する{{< /nextlink >}}
{{< /whatsnext >}}

**コード内でカスタムスパンを作成する:** [コードベースのカスタムインスツルメンテーション][3] を追加して、カスタムビジネスロジックをインスツルメントしたり、スパンにアプリケーション固有のメタデータを追加したりできます。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}コードベースのカスタムインスツルメンテーションでカスタムスパンを追加する{{< /nextlink >}}
{{< /whatsnext >}}

これらのオプションは組み合わせることができます。たとえば、Single Step Instrumentation から始め、特定のスパンに対しコードベースのカスタムインスツルメンテーションを追加したり、手動管理の SDK と Dynamic Instrumentation を組み合わせて、デプロイなしでスパンを追加したりすることができます。

## 詳細な比較 {#detailed-comparison}

### SDK のセットアップ {#sdk-setup}

Single Step Instrumentation は、ほとんどのユーザーに推奨される開始方法です。SDK 構成に加えて、より詳細な制御が必要な場合は、代わりに手動管理の SDK を使用できます。

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> (推奨)</th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dd_libraries/">手動管理の SDK</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">仕組み</td>
    <td style="border:1px solid #ccc;">Datadog は、実行時に単一のコマンドで、アプリケーションプロセスに SDK を自動的にインストールして読み込みます。</td>
    <td style="border:1px solid #ccc;">SDK をアプリケーションコードまたはビルドプロセスに直接インストールして構成します。</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">コード変更</td>
    <td style="border:1px solid #ccc;">不要</td>
    <td style="border:1px solid #ccc;">必要</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">セットアップの複雑さ</td>
    <td style="border:1px solid #ccc;">低 - 最小限の設定が必要</td>
    <td style="border:1px solid #ccc;">中 - 環境とビルドの設定が必要</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">構成管理</td>
    <td style="border:1px solid #ccc;">標準のデフォルトにオプションのオーバーライド</td>
    <td style="border:1px solid #ccc;">環境変数とコードによる完全な制御</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">使用するタイミング</td>
    <td style="border:1px solid #ccc;">コードの変更なしでサービス全体に迅速かつ一貫したインスツルメンテーションを行うには、こちらから始めます。</td>
    <td style="border:1px solid #ccc;">SDK の動作と構成を詳細に制御する必要がある場合は、こちらに進みます。</td>
  </tr>
</table>

### スパンのカスタマイズ {#span-customization}

自動インスツルメンテーションは、サポートされているフレームワークやライブラリに対してスパンを自動的に作成し、追加の作業なしで重要な監視可能性を提供します。カスタムコードパスの可視性が必要な場合や、アプリケーション固有のデータでトレースを強化したい場合は、Dynamic Instrumentation またはコードベースのカスタムインスツルメンテーションを使用してカスタムスパンを追加できます。

<table style="width:100%; border-collapse:collapse; border:2px solid #999;">
  <tr style="background-color:#f2f2f2;">
    <th style="border:1px solid #ccc;"></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/dynamic_instrumentation/">Dynamic Instrumentation</a></th>
    <th style="border:1px solid #ccc; font-weight:bold;"><a href="/tracing/trace_collection/custom_instrumentation/">コードベースのカスタムインスツルメンテーション</a></th>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">仕組み</td>
    <td style="border:1px solid #ccc;">Datadog UI でインスツルメンテーションルールを設定します。ルールは実行時に適用されます。</td>
    <td style="border:1px solid #ccc;">アプリケーションコードに明示的なトレース API 呼び出しを追加します。</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">コード変更</td>
    <td style="border:1px solid #ccc;">不要</td>
    <td style="border:1px solid #ccc;">必要</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">デプロイメントの必要性</td>
    <td style="border:1px solid #ccc;">不要</td>
    <td style="border:1px solid #ccc;">必要 (スパンを追加または変更するため)</td>
  </tr>
  <tr>
    <td style="border:1px solid #ccc; font-weight:bold;">使用するタイミング</td>
    <td style="border:1px solid #ccc;">コードの変更や再デプロイなしでカスタムスパンを追加します。</td>
    <td style="border:1px solid #ccc;">複雑なインスツルメンテーションロジックが必要な場合や、スパンをコードに永続的に定義したい場合に、こちらに進みます。</td>
  </tr>
</table>

## APM セットアップチュートリアル{#apm-setup-tutorials}

次のチュートリアルでは、自動インスツルメンテーションおよびカスタムインスツルメンテーションの両方を使用して、さまざまなインフラストラクチャーシナリオでサンプルアプリケーションの分散トレーシングを設定する方法を説明します。

{{< whatsnext desc="ご利用の言語と環境を選択してください。" >}}
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
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Datadog Agent と同じホスト上の Go アプリケーションのトレースを有効にする{{< /nextlink >}}
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