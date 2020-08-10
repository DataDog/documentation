---
title: Agent 構成
kind: ドキュメント
aliases:
  - /ja/tracing/setup/
  - /ja/tracing/environments/
  - /ja/tracing/setup/environment
  - /ja/tracing/setup/first_class_dimensions
  - /ja/tracing/getting_further/first_class_dimensions/
  - /ja/agent/apm/
further_reading:
  - link: /tracing/troubleshooting/agent_apm_metrics/
    tag: ドキュメント
    text: Datadog Agent によって送信された APM メトリクス
  - link: /agent/docker/apm/
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

AWS Lambda で Datadog APM を設定するには、[Lambda インテグレーションドキュメント][7]を参照してください。または、[AWS X-Ray][8] を使用して Lambda 関数をトレースすることもできます。

### Azure App Service

Datadog の Azure App Service 向け拡張機能は、Azure Web Apps のトレースもサポートしています。Azure のトレーシング設定について詳しくは、[Azure App Service 拡張機能についてのドキュメント][9]を参照してください。

### Google App Engine

Datadog APM では、稼働中の Agent にトレースデータを送信する必要があります。これを回避し、サーバーレスセットアップでトレースの収集を可能にするには、トレースのトラフィックを外部で受け入れる VM を別途構成してください。

## その他の環境

ほかにも、Agent とコンテナを使用したトレースの収集が可能な環境があります。

### Heroku

Heroku で監視を行うと、トレースがデフォルトで有効になります。Heroku でのトレースの構成について詳しくは、[Heroku Cloud のドキュメント][10]を参照してください。

### Cloud Foundry

Cloud Foundry で監視を行うと、トレースがデフォルトで有効になります。Cloud Foundry でのトレースの構成について詳しくは、[Cloud Foundry のドキュメント][11]を参照してください。

### AWS Elastic Beanstalk

AWS Elastic Beanstalk により監視を行うと、トレースがデフォルトで有効になります。AWS Elastic Beanstalk でのトレースの構成については、[AWS Elastic Beanstalk のドキュメント][12]を参照してください。

## 環境を構成する

[`env` タグとその他のプライマリタグを設定して APM データのスコーピングを行う][13]方法については、ガイドを参照してください。

## 次のステップ

次に、[アプリケーションのインスツルメント][14]を行います。APM のすべてのセットアップ手順については、[APM の概要][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#trace
[2]: /ja/tracing/
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: /ja/tracing/send_traces/agent-apm-metrics/
[6]: /ja/agent/
[7]: /ja/integrations/amazon_lambda/#trace-collection
[8]: /ja/integrations/amazon_xray/#overview
[9]: /ja/infrastructure/serverless/azure_app_services/#overview
[10]: /ja/agent/basic_agent_usage/heroku/#installation
[11]: /ja/integrations/cloud_foundry/#trace-collection
[12]: /ja/integrations/amazon_elasticbeanstalk/
[13]: /ja/tracing/guide/setting_primary_tags_to_scope/#definition
[14]: /ja/tracing/setup/