---
title: Datadog でトレースの収集を有効にする
kind: ドキュメント
aliases:
  - /ja/tracing/setup/
  - /ja/tracing/environments/
  - /ja/tracing/setup/environment
  - /ja/tracing/setup/first_class_dimensions
  - /ja/tracing/getting_further/first_class_dimensions/
  - /ja/agent/apm/
further_reading:
  - link: tracing/troubleshooting/
    tag: ドキュメント
    text: Datadog Agent によって送信された APM メトリクス
  - link: /agent/docker/apm
    tag: ドキュメント
    text: Docker APM のセットアップ
  - link: '/integrations/amazon_ecs/#trace-collection'
    tag: ドキュメント
    text: ECS EC2 APM のセットアップ
  - link: '/integrations/ecs_fargate/#trace-collection'
    tag: ドキュメント
    text: ECS Fargate APM のセットアップ
---
APM を使用するには、最初に[トレース][1]を Datadog に送信してから[環境を構成](#configure-your-environment)します。Datadog にトレースを送信するために、システムの設定に応じて選択できる複数の方法が用意されています。たとえば、[Datadog Agent をローカルで](#datadog-agent)使用する、[コンテナで](#containers)使用するなど、[さまざまな方法](#additional-environments)があります。APM のすべてのセットアップ手順については、[APM の概要][2]をご覧ください。

## Datadog Agent

APM は、Agent 6 ではデフォルトで使用できます。ローカル以外の（コンテナなどの）環境からトレースを送信する場合は、メインの [`datadog.yaml` コンフィギュレーションファイル][3]で `apm_non_local_traffic: true` を設定してください。

APM に設定可能なすべての項目については、Agent の [`datadog.example.yaml` コンフィギュレーションファイル][4]を参照してください。Agent によって Datadog に送信されるすべてのメトリクスについては、[Datadog Agent によって送信された APM メトリクス][5]を参照してください。Datadog Agent の詳細については、[Agent のドキュメント][6]または [`datadog.yaml` コンフィギュレーションテンプレート][4]を参照してください。

## コンテナ

コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>
注: アプリケーションのインスツルメントが終わると、トレースクライアントがデフォルトでトレースを `localhost:8126` に送信します。

## サーバーレス

### AWS Lambda

Lambda - X-Ray の設定については、[Amazon X-Ray インテグレーションのドキュメントを参照してください][7]

### Google App Engine、AAS

Datadog APM では、稼働中の Agent にトレースデータを送信する必要があります。これを回避し、サーバーレスセットアップでトレースの収集を可能にするには、トレースのトラフィックを外部で受け入れる VM を別途構成してください。

## その他の環境

ほかにも、Agent とコンテナを使用したトレースの収集が可能な環境があります。

### Heroku

Heroku で監視を行うと、トレースがデフォルトで有効になります。Heroku でのトレースの構成について詳しくは、[Heroku Cloud のドキュメント][8]を参照してください。

### Cloud Foundry

Cloud Foundry で監視を行うと、トレースがデフォルトで有効になります。Cloud Foundry でのトレースの構成について詳しくは、[Cloud Foundry のドキュメント][9]を参照してください。

## 環境を構成する

データの報告時に[環境][10]を指定できる方法がいくつかあります。

1. **ホストタグ**: ホストタグを `env:<環境>` の形式で使用し、Agent からのすべてのトレースにそれぞれのタグを付けます。
2. **Agent コンフィギュレーション**: Agent のコンフィギュレーションファイルで、Agent が使用するデフォルトタグを上書きします。これにより、Agent を経由して受信したすべてのトレースがタグ付けされ、ホストタグの値を上書きします。

  ```
  apm_config:
  env: <ENVIRONMENT>
  ```

3. **トレースごと**: [トレース][1]を 1 つ送信するたびに、`env` のメタデータキーを持つ[スパン][11]のいずれかにタグ付けを行うことで、環境を指定できます。これにより、Agent コンフィギュレーションとホストタグの値（あれば）が上書きされます。トレースにタグを割り当てる方法については、[トレースのタグ付けに関するドキュメント][12]を参照してください。

## 次のステップ

次に、[アプリケーションのインスツルメント][13]を行います。APM のすべてのセットアップ手順について詳しくは、[APM の概要][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#trace
[2]: /ja/tracing
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: /ja/tracing/send_traces/agent-apm-metrics
[6]: /ja/agent
[7]: /ja/integrations/amazon_xray/#overview
[8]: /ja/agent/basic_agent_usage/heroku/#installation
[9]: /ja/integrations/cloud_foundry/#trace-collection
[10]: /ja/tracing/guide/setting_primary_tags_to_scope/#definition
[11]: /ja/tracing/visualization/#spans
[12]: /ja/tracing/guide/adding_metadata_to_spans/?tab=java
[13]: /ja/tracing/setup