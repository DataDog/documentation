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
description: Datadog APM の開始

title: Datadog へのトレースの送信
---

ほとんどの環境では、以下の 2 つのステップでアプリケーションを構成して[トレース][1]を Datadog に送信できます。

1. インストール。

2. Datadog トレーシングライブラリをコードに追加する。

トレースは、Datadog トレーシングライブラリでインスツルメンテーションされたアプリケーションから Datadog Agent に、Datadog Agent から Datadog バックエンドに送信され、UI に表示されます。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM パイプライン">}}

コンテナ化されたサーバーレスまたはその他特定の環境の場合は、トレースを適切に受信するためにトレーサーと Agent の双方で APM 特有のコンフィギュレーションが必要となります。双方のコンポーネントで必ず手順に従って操作してください。

## 言語を選択して設定の手順を確認します。

{{< partial name="apm/apm-languages.html" >}}

<br>

公式ライブラリでまだサポートされていない言語で記述されたアプリケーションを計測する場合は、[コミュニティトレーシングライブラリ][2]のリストを参照してください。

トレースを設定したら、[Continuous Profiler を有効にしてプロファイリングデータにアクセスするまであともう少しです][3]。プロファイラーは、Java、Python、Go、Ruby、Node.js、(ベータ) PHP、(ベータ) .NET、(ベータ) Linux で使用できます。

## APM セットアップチュートリアル

以下のチュートリアルでは、様々なインフラストラクチャーシナリオ上で、サンプル Python アプリケーションに分散型トレーシングを設定する手順を、自動およびカスタムインスツルメンテーションの両方を用いて解説します。

{{< whatsnext desc="チュートリアル: トレースの有効化" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}Datadog Agent と同じホスト上の Python アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}コンテナ内の Python アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}コンテナ内の Python アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}Datadog Agent と同じホスト上の Java アプリケーションでトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}コンテナ内の Java アプリケーションと Datadog Agent でトレースを有効にする{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}コンテナ内の Java アプリケーションとホスト上の Agent でトレースを有効にする{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/developers/community/libraries/#apm-tracing-client-libraries
[3]: /ja/profiler/enabling/
