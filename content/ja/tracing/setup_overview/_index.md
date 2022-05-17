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
description: Datadog APM の開始
kind: documentation
title: Datadog APM を設定する
---

ほとんどの環境では、以下の 2 つのステップでアプリケーションを構成して[トレース][1]を Datadog に送信できます。

1. APM に Datadog Agent を構成する。

2. Datadog トレーシングライブラリをコードに追加する。

トレースは、Datadog トレーシングライブラリでインスツルメンテーションされたアプリケーションから Datadog Agent に、Datadog Agent から Datadog バックエンドに送信され、UI に表示されます。

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="APM パイプライン">}}

コンテナ化されたサーバーレスまたはその他特定の環境の場合は、トレースを適切に受信するためにトレーサーと Agent の双方で APM 特有のコンフィギュレーションが必要となります。双方のコンポーネントで必ず手順に従って操作してください。

## 言語を選択して設定の手順を確認します。

{{< partial name="apm/apm-languages.html" >}}

<br>

公式ライブラリでまだサポートされていない言語で記述されたアプリケーションを計測する場合は、[コミュニティトレーシングライブラリ][2]のリストを参照してください。

トレースを設定したら、[Continuous Profiler を有効にしてプロファイリングデータにアクセスするまであともう少しです][3]。プロファイラーは、Java、Python、Go、Ruby、Node.js、(ベータ) PHP、(ベータ) .NET、(ベータ) Linux で使用できます。

[1]: /ja/tracing/visualization/#trace
[2]: /ja/developers/community/libraries/#apm-tracing-client-libraries
[3]: /ja/tracing/profiler/enabling/