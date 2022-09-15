---
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: Documentation
  text: メトリクスストリーム - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: ブログ
  text: メトリクススストリームを使用して Amazon CloudWatch メトリクスを収集する
kind: ガイド
title: Kinesis Data Firehose を使用した AWS CloudWatch メトリクスストリーム
---
{{< site-region region="us3,us5,gov" >}}

**Kinesis Data Firehose を使用した AWS CloudWatch メトリクスストリームは、この Datadog サイトではサポートされていません。**
{{< /site-region >}}

Amazon CloudWatch メトリクスストリームと Amazon Kinesis Data Firehose を使用すると、CloudWatch メトリクスを 2〜3 分のレイテンシーでより速く Datadog に取り込むことができます。これは、10 分ごとに更新されたメトリクスを提供する Datadog の API ポーリングアプローチよりも大幅に高速です。

## 概要

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="メトリクスフロー図" responsive="true">}}

1. メトリクスをストリーミングする各 AWS アカウントとリージョンにこれらの AWS リソースを作成します。
   - メトリクスの配信に失敗した場合の S3 バックアップとともに、メトリクスを Datadog に配信する Kinesis Data Firehose 配信ストリームを作成します。
   - 配信ストリームにリンクされた CloudWatch メトリクスストリームを作成します。
   - オプションで、メトリクスをストリーミングするためのネームスペースの限定されたセットを指定します。
2. これらのリソースを作成すると、Datadog はストリーミングされたメトリクスの受信をすぐに開始し、追加のコンフィギュレーションを必要とせずにそれらを Datadog サイトに表示します。


### Metric Streaming と API ポーリングの比較 {#streaming-vs-polling}

CloudWatch Metric Streams と API ポーリングの主な相違点は以下の通りです。

- **AWS でのネームスペースフィルタリング**: AWS インテグレーションタイルのネームスペースごとのデフォルトとアカウントレベルの設定は、API ポーリングアプローチにのみ適用されます。AWS アカウントの CloudWatch メトリクスストリーム設定を使用して、ストリームにネームスペースを含めたり除外したりするためのすべてのルールを管理します。

- **2 時間以上遅れて報告されるメトリクス**: API ポーリングは、CloudWatch Metric Stream を通して送ることができないため、メトリクスストリーミングを有効にした後も `aws.s3.bucket_size_bytes` や `aws.billing.estimated_charges` などのメトリクスを収集し続けます。

#### API ポーリングからメトリクスストリームへの切り替え
API ポーリングメソッドを通じて特定の CloudWatch ネームスペースのメトリクスを既に受け取っている場合、Datadog は自動的にこれを検出し、ストリーミングを開始するとそのネームスペースのメトリクスポーリングを停止します。Datadog は引き続き API ポーリングを使用して、ストリームされたメトリクスに対してカスタムタグや他のメタデータを収集するため、AWS インテグレーションタイルの構成設定は変更しないままにしておきます。

#### メトリクスストリームから API ポーリングに戻る

AWS アカウントやリージョン、あるいは特定のネームスペースのメトリクスをストリーミングしたくないと後で判断した場合、Datadog は自動的に AWS インテグレーションタイルの構成設定に基づいて、API ポーリングを使用してそれらのメトリクスの収集を再び開始します。AWS アカウントとリージョンのすべてのメトリクスのストリーミングを停止したい場合は、本ドキュメントの[メトリクスストリーミングを無効にするのセクション](#disable-metric-streaming)の指示に従います。

### 課金

メトリクスをストリーミングするための Datadog からの追加料金はありません。

AWS は、CloudWatch メトリクスストリームのメトリクスアップデートの数と Kinesis Data Firehose に送信されたデータボリュームに基づいて課金します。ストリーミングしているメトリクスのサブセットの CloudWatch コストが増加する可能性があるため、Datadog は、より低いレイテンシーが最も必要な AWS サービス、リージョン、アカウントにメトリクスストリームを使用することを優先することをお勧めします。詳細については、[Amazon CloudWatch の価格設定][3]を参照してください。

ストリーム内の EC2 または Lambda メトリクスは、請求対象のホストと Lambda 呼び出しの数を増やす可能性があります (EC2 の場合、これらのホストと関数が AWS インテグレーションまたは Datadog Agent でまだ監視されていない場合)。

## セットアップ

### はじめに

1. [Metric Streaming と API ポーリングの比較](#streaming-vs-polling)のセクションをよく読んで、Metric Streaming を有効にする前に違いを理解してください。

2. まだ接続していない場合は、AWS アカウントを Datadog に接続します。詳細については、[CloudFormation のセットアップ手順][4]を参照してください。

### インストール

{{< tabs >}}
{{% tab "CloudFormation" %}}

複数の AWS リージョンを使用している場合は自動的かつ簡単になるため、Datadog では CloudFormation の使用をお勧めします。

1. Datadog サイトで、[AWS インテグレーションタイル][1]の **Configuration** タブに移動します。
2. AWS アカウントをクリックして、メトリクスストリーミングを設定します。
3. **Metric Collection** の下で、**CloudWatch Metric Streams** タブをクリックします。
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-streams.png" alt="メトリクスストリーム選択タブ" responsive="true" style="width:60%;">}}
4. **Automatically Using CloudFormation** をクリックして、AWS コンソールでスタックの作成を開始します。
5. 必須パラメータを入力します。
   - **ApiKey**: [Datadog API キー][2]を追加します。
   - **DdSite**: [Datadog サイト][3]を選択します。サイトは次のとおりです: {{< region-param key="dd_site" code="true" >}}
   - **Regions**: メトリクスストリーミング用に設定するリージョンのコンマ区切りのリスト。サポートされるリージョンの完全なリストについては、AWS のドキュメント[メトリクスストリームを使用する][4]を参照してください。
6. オプションのパラメータを入力します。
   - **FilterMethod**: メトリクスストリーミングに含めるネームスペースのリストを含めるか除外します。
   - **First/Second/Third Namespace**: 含めるまたは除外するネームスペースを指定します。注: ネームスペースの値は、AWS のドキュメントのネームスペース列の値と正確に一致する必要があります。例: AWS/EC2。
7. "I acknowledge that AWS CloudFormation might create IAM resources with custom names." (AWS CloudFormation がカスタム名で IAM リソースを作成する可能性があることを認めます) という確認ボックスをオンにします。
8. **Create Stack** をクリックします。

### 結果

スタックが正常に作成されたら、Datadog がこれを認識するまで 5 分間待ちます。次に、Datadog の [AWS インテグレーションタイル][1]に移動し、指定した AWS アカウントの "CloudWatch Metric Streams" タブを表示し、アクティブ化されたリージョンを確認して、これが機能していることを確認します。

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="アクティブなリージョン" responsive="true" style="width:60%;">}}


[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS コンソール" %}}

AWS コンソールを使用してメトリクスストリームを設定する場合は、AWS リージョンごとに次の手順に従います。

1. 次の仕様で新しい Kinesis Data Firehose 配信ストリームを作成します。
 - ソースには、“Direct PUT or other sources” を選択します
- 宛先には:
  - サードパーティのサービスプロバイダーを選択: `Datadog`.
  - Datadog サイトに対応するメトリクスのエンドポイント URL を選択: `Datadog metrics - US` または `Datadog metrics - EU`
  - アクセスキーには、[Datadog API キー][1]を入力します。
   - 再試行時間には、`60 seconds` を入力します。
   - S3 バックアップには、`Failed data only` を選択し、バックアップに必要な S3 バケットを選択します。
 - HTTP エンドポイントバッファ条件には:
   - バッファサイズに `4MB`、バッファ間隔に `60 seconds` を入力します。
 - S3 バッファ条件には:
   - バッファサイズに `4MB`、バッファ間隔に `60 seconds` を入力します。
 - S3 圧縮には、`GZIP` を選択します。
 - エラーログを有効にします。
2. 次の手順で [CloudWatch メトリクスストリーム][2]を作成します。
3. すべての CloudWatch メトリクスをストリーミングするか、“Include” または “Exclude” リストで特定のネームスペースを選択するかを選びます。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/cloudwatch-metric-stream.png" alt="Cloudwatch メトリクスストリーム" responsive="true" style="width:60%;">}}
4. ステップ 1 で作成した Firehose を選択して、メトリクスを Datadog に送信するために使用します。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/firehose.png" alt="Firehose" responsive="true" style="width:60%;">}}
5. Kinesis Data Firehose にレコードを配置するための新しいサービスロールを作成します。
6. **出力形式を OpenTelemetry 0.7 に変更します**。
7. Datadog に送信したい AWS のパーセンタイルメトリクスを含むように、追加の統計情報を追加します。Datadog がポーリングでサポートするパーセンタイルメトリクスの一覧は、[CloudFormation テンプレート][4]を参照してください。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="パーセンタイル" responsive="true" style="width:60%;">}}
8. メトリクスストリームに名前を付けます。
9. **Create metric stream** をクリックします。

### 結果

メトリクスストリームリソースが正常に作成されたことを確認したら、Datadog がこれを認識するまで 5 分間待ちます。次に、[Datadog AWS インテグレーションタイル][3]に移動し、指定した AWS アカウントの "CloudWatch Metric Streams" タブを表示し、これが機能していることを確認します。

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-regions.png" alt="アクティブなリージョン" responsive="true" style="width:60%;">}}
**注**: CloudWatch API のポーリングをすでに有効にしている場合、ストリーミングへの移行により、ストリーミングしている特定のメトリクスが Datadog で二重にカウントされる短い期間 (最大 5 分) が発生する可能性があります。これは、Datadog のクローラーが実行されて CloudWatch メトリクスを送信するタイミングと、Datadog がこれらのメトリクスのストリーミングを開始したことを認識してクローラーをオフにするタイミングが異なるためです。


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
{{% /tab %}}
{{< /tabs >}}

### メトリクスストリーミングを無効にする

特定の AWS アカウントとリージョンに対してメトリクスストリーミングを完全に無効にするには、AWS Metric Steam とその関連リソースを削除する必要があります。Datadog のメトリクスの損失を防ぐために、これらの削除手順に注意深く従うことが重要です。

[CloudFormation](?tab=cloudformation#installation) でストリーミングを設定した場合:
1. セットアップ時に作成されたスタックを削除します。

[AWS コンソール](?tab=awsconsole#installation)からストリーミングを設定した場合:
1. 配信ストリームにリンクしている CloudWatch Metric Stream を削除します。
2. Datadog にメトリクスを配信していた Kinesis Data Firehose の配信ストリームを削除します。
3. Firehose にリンクされた失敗メッセージのバックアップ S3 バケットを削除します。
4. ストリームに関連付けられた IAM ロールと、ストリームのセットアップ中に作成された他のすべてのリソースを削除します。

リソースを削除したら 5 分ほど待ち、Datadog の指定した AWS アカウントの “CloudWatch Metric Streams” タブでリージョンとネームスペースが無効になっているか確認します。

## トラブルシューティング
Metric Streams のセットアップまたは関連リソースに関する問題の解決には、[AWS のトラブルシューティング][5]をご覧ください。

## その他の参考資料
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
[2]: /ja/metrics/distributions/#overview
[3]: https://aws.amazon.com/cloudwatch/pricing/
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#setup
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html