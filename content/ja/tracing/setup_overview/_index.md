---
title: Datadog APM を設定する
kind: documentation
description: Datadog APM の開始
aliases:
  - /ja/tracing/setup
  - /ja/tracing/send_traces/
  - /ja/tracing/setup/
  - /ja/tracing/environments/
  - /ja/tracing/setup/environment
  - /ja/tracing/setup/first_class_dimensions
  - /ja/tracing/getting_further/first_class_dimensions/
  - /ja/agent/apm/
---
ほとんどの環境では、以下の 2 つのステップでアプリケーションを構成して[トレース][1]を Datadog に送信できます。

1. APM に Datadog Agent を構成する。

2. Datadog トレーシングライブラリをコードに追加する。

トレースは、Datadog トレーシングライブラリでインスツルメンテーションされたアプリケーションから Datadog Agent へと送信され、その後 Datadog Agent から Datadog へ送られます。

コンテナ化されたサーバーレスまたはその他特定の環境の場合は、トレースを適切に受信するためにトレーサーと Agent の双方で APM 特有のコンフィギュレーションが必要となります。双方のコンポーネントで必ず手順に従って操作してください。

## 言語を選択して設定の手順を確認します。

{{< partial name="apm/apm-languages.html" >}}

<br>

公式ライブラリでまだサポートされていない言語で記述されたアプリケーションを計測する場合は、[コミュニティトレーシングライブラリ][2]のリストを参照してください。

[1]: /ja/tracing/visualization/#trace
[2]: /ja/developers/community/libraries/#apm-tracing-client-libraries