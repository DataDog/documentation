---
aliases:
  - /ja/integrations/awsbeanstalk/
  - /ja/developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: クローラー
dependencies: []
description: Amazon Elastic Beanstalk のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/'
git_integration_title: amazon_elasticbeanstalk
has_logo: true
integration_title: Amazon Elastic Beanstalk
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_elasticbeanstalk
public_title: Datadog-Amazon Elastic Beanstalk インテグレーション
short_description: Amazon Elastic Beanstalk のキーメトリクスを追跡
version: '1.0'
---
## 概要

AWS Elastic Beanstalk は、Apache、Nginx、Passenger、IIS などの使い慣れたサーバーで、Java、.NET、PHP、Node.js、Python、Ruby、Go、および Docker を使用して開発された Web アプリケーションやサービスをデプロイおよびスケーリングするための使いやすいサービスです。

## セットアップ
### インストール

必要に応じて、まず [Amazon Web Services インテグレーション][1]をセットアップします。Elastic Beanstalk メトリクスを受信するには、ご使用の環境で[拡張ヘルスレポート機能を有効][2]にし、[拡張ヘルスメトリクスを CloudWatch に公開][3]するように環境を構成する必要があります。

**注**: これらの設定により、CloudWatch カスタムメトリクス料金が加算されます。

### Datadog Container Agent の構成
Elastic Beanstalk 環境で Docker コンテナを使用する場合は、コンテナ化された Datadog Agent を使用して Docker 使用量を監視します。以下の手順に従って、Datadog Agent コンテナを統合するように環境を構成します。

#### タスク定義
インスタンスごとに複数のコンテナを含む Docker 環境を実行するために、Elastic Beanstalk は Amazon EC2 Container Service (ECS) に依存します。
そのため、ECS 方式でデプロイするコンテナを記述する必要があります。Elastic Beanstalk では、`Dockerrun.aws.json` という名前のファイルを使用してこれを構成します。

`Dockerrun.aws.json` ファイルは Elastic Beanstalk 固有の JSON ファイルで、Docker コンテナセットを Elastic Beanstalk アプリケーションとしてデプロイする方法を記述します。このファイルをマルチコンテナ Docker 環境に使用できます。`Dockerrun.aws.json` は、環境内の各コンテナインスタンスにデプロイされるコンテナと、マウントするコンテナのホストインスタンス上に作成されるデータボリュームを記述します。

`Dockerrun.aws.json` ファイルは、単独で使用することも、他のソースコードと共にアーカイブに圧縮して使用することもできます。`Dockerrun.aws.json` と共にアーカイブされるソースコードは、コンテナインスタンスにデプロイされ、`/var/app/current/` ディレクトリでアクセスできます。構成の `volumes` セクションを使用して、インスタンスで実行されるコンテナのマウントポイントを提供します。また、埋め込みコンテナ定義の `mountPoints` セクションを使用して、コンテナからマウントポイントをマウントします。

以下のコードサンプルは、Datadog Agent を宣言する `Dockerrun.aws.json` を示しています。`containerDefinitions` セクションを、ご使用の [Datadog API キー][4]、タグ (オプション)、および追加のコンテナ定義で更新してください。Datadog EU サイトを使用している場合は、`DD_SITE` を `datadoghq.eu` に設定します。必要に応じて、このファイルを上述の追加コンテンツと共に圧縮できます。このファイルの構文の詳細については、[Beanstalk のドキュメント][5]を参照してください。

**注**: 多くのリソースを使用する場合は、メモリの上限を上げる必要があります。

```json
{
  "AWSEBDockerrunVersion": 2,
  "volumes": [
    {
       "name": "docker_sock",
       "host": {
            "sourcePath": "/var/run/docker.sock"
      }
    },
    {
       "name": "proc",
       "host": {
            "sourcePath": "/proc/"
      }
    },
    {
       "name": "cgroup",
       "host": {
            "sourcePath": "/cgroup/"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "dd-agent",
      "image": "datadog/agent:latest",
      "environment": [
            {
              "name": "DD_API_KEY",
              "value": "<YOUR_DD_API_KEY>"
            },
            {
              "name": "DD_SITE",
              "value": "datadoghq.com"
            },
            {
              "name": "DD_TAGS",
              "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
            }
      ],
      "memory": 256,
      "mountPoints": [
        {
          "sourceVolume": "docker_sock",
          "containerPath": "/var/run/docker.sock",
          "readOnly": false
        },
        {
          "sourceVolume": "proc",
          "containerPath": "/host/proc",
          "readOnly": true
        },
        {
          "sourceVolume": "cgroup",
          "containerPath": "/host/sys/fs/cgroup",
          "readOnly": true
        }
      ]
    }
  ]
}
```

#### 環境の作成

コンテナ定義が完了したら、それを Elastic Beanstalk に送信します。具体的な手順については、AWS Elastic Beanstalk ドキュメント内の [マルチコンテナ Docker 環境][6]を参照してください。

#### DogStatsD

[マルチコンテナ Docker 環境][6]で DogStatsD を使用してアプリケーションコンテナからカスタムメトリクスを収集するには、`Dockerrun.aws.json` に以下の追加を行います。

1. `dd-agent` コンテナの下に環境変数 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` を追加します。

    ```
    {
      "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
      "value": "true"
    }
    ```

2. アプリケーションコンテナの下に `dd-agent` コンテナへのリンクを追加します。

    ```
    "links": [ "dd-agent:dd-agent"]
    ```

詳細については、[DogStatsD と Docker][16] を参照してください。

### 代替 Datadog Agent 構成
以下の手順に従い、[構成ファイル (.ebextensions) による高度な環境のカスタマイズ][7]を使用して、Datadog Agent を Elastic Beanstalk にインストールします。

1.  [アプリケーションソースバンドル][8]のルートに `.ebextensions` という名前のフォルダーを作成します。
2. [99datadog.config][9] を `.ebextensions` にダウンロードします。
3. `option_settings` にある [Datadog API キー][4]の構成を更新します。
4. [Elastic Beanstalk コンソール][10]、[EB CLI][11]、または [AWS CLI][12] でアプリケーションをデプロイします。

#### 追加の設定
[99datadog.config][9] の `"/configure_datadog_yaml.sh"` セクションを更新することで、`datadog.yaml` にさらに設定を追加します。以下のラインで Datadog Process Agent が有効になります。

```
echo -e "process_config:\n  enabled: \"true\"\n" >> /etc/datadog-agent/datadog.yaml
```

## 収集データ
### メトリクス
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


AWS から取得される各メトリクスには、ホスト名やセキュリティグループなど、AWS コンソールに表示されるタグと同じタグが割り当てられます。

### イベント
AWS Elastic Beanstalk インテグレーションには、イベントは含まれません。

### サービスのチェック
AWS Elastic Beanstalk インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

## その他の参考資料
- ブログ記事: [AWS Elastic Beanstalk への Datadog のデプロイ][15]

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[9]: https://docs.datadoghq.com/ja/config/99datadog.config
[10]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[11]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli-ebextensions
[12]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli-ebextensions
[13]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticbeanstalk/amazon_elasticbeanstalk_metadata.csv
[14]: https://docs.datadoghq.com/ja/help
[15]: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk
[16]: https://docs.datadoghq.com/ja/integrations/faq/dogstatsd-and-docker/


{{< get-dependencies >}}