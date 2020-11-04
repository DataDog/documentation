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
Datadog に[トレース][1]を送信するようアプリケーションを構成するために、Datadog Agent を構成し、[アプリケーションのインスツルメントを行う][2]という 2 つのメインステップを実行します。

お使いの環境に応じて、Datadog Agent の構成方法は異なります。Datadog Agent を[ローカル](#datadog-agent)、[コンテナ](#containers)、および[その他の環境](#additional-environments)にインストールする手順をそれぞれ参照してください。

## Datadog Agent

APM は、Agent 6 ではデフォルトで使用できます。ローカル以外の（コンテナなどの）環境からトレースを送信する場合は、メインの [`datadog.yaml` コンフィギュレーションファイル][3]で `apm_non_local_traffic: true` を設定してください。

APM に設定可能なすべての項目については、Agent の [`datadog.example.yaml` コンフィギュレーションファイル][4]を参照してください。Agent によって Datadog に送信されるすべてのメトリクスについては、[Datadog Agent によって送信された APM メトリクス][5]を参照してください。Datadog Agent の詳細については、[Agent のドキュメント][6]または [`datadog.yaml` コンフィギュレーションテンプレート][4]を参照してください。

## コンテナ

コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

### アプリ内のドキュメントに従ってください (推奨)

デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順は、Datadog アプリ内の[クイックスタート手順][7]に従ってください。

{{< partial name="apm/apm-containers.html" >}}
</br>
注: アプリケーションのインスツルメントが終わると、トレースクライアントがデフォルトでトレースを `localhost:8126` に送信します。

## サーバーレス

### AWS Lambda

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][8]ドキュメントを参照してください。

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

次に、[アプリケーションのインスツルメント][2]を行います。APM の概要とすべての機能、コンフィギュレーションについて詳しくは、[APM の概要][14]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#trace
[2]: /ja/tracing/setup/
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: /ja/tracing/send_traces/agent-apm-metrics/
[6]: /ja/agent/
[7]: https://app.datadoghq.com/apm/docs
[8]: /ja/tracing/serverless_functions/
[9]: /ja/infrastructure/serverless/azure_app_services/#overview
[10]: /ja/agent/basic_agent_usage/heroku/#installation
[11]: /ja/integrations/cloud_foundry/#trace-collection
[12]: /ja/integrations/amazon_elasticbeanstalk/
[13]: /ja/tracing/guide/setting_primary_tags_to_scope/#definition
[14]: /ja/tracing/