---
description: 低レイテンシーで取り込むために、Amazon Data Firehose を介して CloudWatch メトリクスを Datadog にストリーミングします。
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: ドキュメント
  text: メトリクスストリーム - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: ブログ
  text: メトリクスストリームを使用して Amazon CloudWatch メトリクスを収集する
title: AWS CloudWatch Metric Streams と Amazon Data Firehose
---
AWS CloudWatch Metric Streams と Amazon Data Firehose を使用すると、わずか 2 ～ 3 分のレイテンシーで CloudWatch メトリクスを Datadog に取り込むことができます。これは、10 分ごとにメトリクスを更新する Datadog のデフォルトの API ポーリングアプローチよりも大幅に高速です。API ポーリングアプローチの詳細については、[Cloud Metric Delay ドキュメント][1] を参照してください。

## 概要 {#overview}

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="メトリクスのフロー図" responsive="true">}}

1. メトリクスをストリーミングする各 AWS アカウントおよびリージョンで、CloudWatch Metric Stream を作成します。
   - オプションで、ストリーミングする名前空間またはメトリクスのセットを制限できます。
2. Metric Stream を作成すると、Datadog は直ちにストリーミングされたメトリクスの受信を開始し、追加の設定なしで Datadog サイトに表示します。

<div class="alert alert-warning">AWS インテグレーションタイルで設定されたタグフィルタリングは、CloudWatch Metric Streams<b> にも適用</b>されます。</div>

### Metric Streaming と API ポーリングの比較 {#streaming-vs-polling}

CloudWatch Metric Streams を使用する場合と API ポーリングを使用する場合の主な違いは以下のとおりです。

- **2 時間以上遅延して報告されるメトリクス**: メトリクスストリーミングを有効にした後も、API ポーリングは `aws.s3.bucket_size_bytes` や `aws.billing.estimated_charges` のようなメトリクスの収集を継続します。これらは CloudWatch Metric Stream を通じて送信できないためです。

- **メトリクスのメタデータ**: Datadog は引き続き API ポーリングを使用して、ストリーミングされたメトリクスのカスタムタグやその他のメタデータを収集します。これらのメトリクスを確実に受信し続けるため、AWS インテグレーションの設定は変更しないでください。

#### API ポーリングからメトリクスストリームへの切り替え {#switching-from-api-polling-to-metric-streams}
特定の CloudWatch 名前空間のメトリクスを API ポーリング方式ですでに受信している場合、Datadog はこれを自動的に検出し、ストリーミングを開始するとその名前空間のメトリクスのポーリングを停止します。Datadog は引き続き API ポーリングを使用してストリーミングされたメトリクスのカスタムタグやその他のメタデータを収集するため、AWS インテグレーションページの設定は変更しないでください。

#### メトリクスストリームから API ポーリングへの切り替え {#switching-back-from-metric-streams-to-api-polling}

後で特定の AWS アカウントとリージョン、あるいは特定の名前空間のメトリクスをストリーミングしたくないと判断した場合、Datadog は AWS インテグレーションページの設定に基づいて、API ポーリングを使用したそれらのメトリクスの収集を自動的に再開します。AWS アカウントとリージョンのすべてのメトリクスのストリーミングを停止する場合は、本書の [Metric Streaming セクションを無効にする](#disable-metric-streaming)の手順に従います。

#### 移行中のメトリクスの重複の回避 {#avoiding-duplicate-metrics-during-migration}

API ポーリングからメトリクスストリームに移行する際、両方の収集方式が同じメトリクスのデータを送信する重複期間が発生します。これにより、Datadog でメトリクスの値が 2 倍になって表示される可能性があります。

重複を最小限に抑えるには、次の手順を実行します。
1. 目的の名前空間とリージョンに対して Metric Streams を有効にします。
2. Datadog がストリームを検出し、それらの名前空間のポーリングを停止するまで待ちます。この検出には最大 5 分かかる場合がありますが、実際にはアクティブなポーリングクローラーのタイミングによって重複期間がこれより長くなる可能性があります。
3. アクティブ化されたストリームリージョンについて、[AWS インテグレーションページ][5] の **Metric Collection** タブを確認し、移行が完了したことを検証します。
4. 移行中は、既存の AWS インテグレーション設定を変更しないでください。Datadog は引き続き API ポーリングを使用して、ストリーミングされたメトリクスのカスタムタグとメタデータを収集します。

<div class="alert alert-info">
一部のメトリクスは CloudWatch Metric Streams 経由で送信できません。これには以下が含まれます。 <code>aws.s3.bucket_size_bytes</code> および <code>aws.billing.estimated_charges</code>。Datadog は、メトリクスストリームの設定に関係なく、これらを API ポーリング経由で引き続き収集します。
</div>

### 請求 {#billing}

Datadog からメトリクスをストリーミングする場合、追加料金は発生しません。

AWS は、CloudWatch Metric Stream でのメトリクス更新数と、Amazon Data Firehose に送信されるデータ量に基づいて課金します。そのため、ストリーミングしているメトリクスのサブセットに対して、CloudWatch のコストが増加する可能性があります。このため、Datadog では、低レイテンシーが最も必要な AWS メトリクス、サービス、リージョン、アカウントに対してはメトリクスストリームを使用し、それ以外についてはポーリングを使用することを推奨しています。詳細については、[Amazon CloudWatch の料金][2] を参照してください。

ストリーム内の EC2 または Lambda メトリクスは、課金対象のホスト数や Lambda 呼び出し数を増加させる可能性があります (これらのホストや関数が AWS インテグレーションや EC2 の場合の Datadog Agent によってまだ監視されていない場合)。

**注**: CloudWatch でフィルターを作成し、指定したメトリクスのみをストリーミングすることができます。詳細については、[Amazon CloudWatch ユーザーガイド][7] を参照してください。

## セットアップ {#setup}

### 開始する前に {#before-you-begin}

1. [Metric Streaming と API ポーリング](#streaming-vs-polling)セクションをよく読み、Metric Streaming を有効にする前にその違いを理解してください。

2. まだ接続していない場合は、AWS アカウントを Datadog に接続します。詳細については、[CloudFormation セットアップ手順][3] を参照してください。

### インストール {#installation}

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog では、CloudFormation の使用を推奨しています。自動化されていて複数の AWS リージョンを使用している場合に容易であるためです。

**注**: メトリクスストリーミングは、OpenTelemetry 出力形式のみをサポートしています。最新バージョンは v1.0 です。v0.7 もサポートされていますが、メトリクスが欠落する可能性があります。

1. Datadog サイトで、[AWS インテグレーションページ][1] の **Configuration** タブに移動します。
2. メトリクスストリーミングを設定する AWS アカウントをクリックします。
3. **Metric Collection** の下にある **CloudWatch Metric Streams** の **Automatically Using CloudFormation** をクリックして、AWS コンソールでスタックを起動します。
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="AWS インテグレーションページのメトリクス収集タブにある CloudWatch Metric Streams セクション。Automatically Using CloudFormation ボタンが強調表示されています。" responsive="true" style="width:60%;" >}}
4. 必要なパラメーターを入力します。
   - **ApiKey**: [Datadog API キー][2] を追加します。
   - **DdSite**: [Datadog サイト][3] を選択します。サイト:{{< region-param key="dd_site" code="true" >}}
   - **Regions**: メトリクスストリーミング用に設定するリージョンのカンマ区切りの一覧。サポートされているリージョンの全一覧については、[メトリクスストリームの使用][4] 関する AWS ドキュメントを参照してください。
5. オプションのパラメーターを入力します。
   - **FilterMethod**: メトリクスストリーミングに含める名前空間の一覧を含めるか除外するかを選択します。
   - **First/Second/Third Namespace**: 含める、または除外する名前空間を指定します。注: 名前空間の値は、AWS ドキュメントの名前空間列にある値と正確に一致している必要があります。例: AWS/EC2。
6. 「AWS CloudFormation がカスタム名で IAM リソースを作成する可能性があることを認識しています」という確認ボックスにチェックを入れます。
7. **Create Stack** をクリックします。

### 結果 {#results}

スタックが正常に作成されたら、Datadog が変更を認識するまで 5 分間待ちます。完了を確認するには、Datadog の [AWS インテグレーションページ][1] の **Metric Collection** タブに移動し、選択したアカウントに対して有効化されたリージョンが表示されていることを確認します。

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="AWS インテグレーションページの Metric Collection タブにある CloudWatch Metric Streams セクション。1 つのリージョンが有効化されています" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS Console" %}}

AWS Console を使用してメトリクスストリームを設定するには、各 AWS リージョンに対して [CloudWatch Metric Stream][1] を作成します。

**注**: メトリクスストリーミングは、OpenTelemetry 出力形式のみをサポートしています。最新バージョンは v1.0 です。v0.7 もサポートされていますが、メトリクスが欠落する可能性があります。

1. **Quick AWS Partner Setup** を選択し、ドロップダウンメニューから AWS パートナーの送信先として **Datadog** を選択します。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="CloudWatch メトリクスストリームのクイックパートナーセットアップ" responsive="true" style="width:60%;">}}
2. メトリクスのストリーミング先となる Datadog サイトを選択し、[Datadog API キー][2] を入力します。
3. すべての CloudWatch メトリクスをストリーミングするか、特定の名前空間のみをストリーミングするかを選択します。特定のメトリクスを除外するオプションもあります。Monitoring Account を使用している場合は、[クロスアカウントストリーミング][3] を有効にすることもできます。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="CloudWatch メトリクスストリーム" responsive="true" style="width:60%;">}}
4. **統計情報を追加する**の下で、Datadog に送信する AWS パーセンタイルメトリクスを含めます。Datadog がポーリングを通じてサポートするパーセンタイルメトリクスの一覧については、[CloudFormation テンプレート][4] を参照してください。
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="パーセンタイル" responsive="true" style="width:60%;">}}
5. メトリクスストリームに名前を割り当てます。
6. **メトリクスストリームを作成する** をクリックします。

### 結果 {#results-1}

Metric Stream リソースが正常に作成されたことを確認したら、Datadog が変更を認識するまで 5 分間待機します。完了を確認するには、Datadog の [AWS インテグレーションページ][5] の **Metric Collection** タブに移動し、指定した AWS アカウントの **CloudWatch Metric Streams** で有効なリージョンが有効になっていることを確認します。

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="AWS インテグレーションページの Metric Collection タブにある CloudWatch Metric Streams セクション。1 つのリージョンが有効化されています" responsive="true" style="width:60%;">}}

**注**: CloudWatch API のポーリングをすでに有効にしている場合、ストリーミングへの移行により、ストリーミングしている特定のメトリクスが Datadog で二重にカウントされる短い期間 (最大 5 分) が発生する可能性があります。これは、Datadog のクローラーが CloudWatch メトリクスを実行および送信するタイミングと、Datadog がそれらのメトリクスのストリーミングを開始したことを認識してクローラーをオフにするタイミングの差によるものです。

[1]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[5]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### クロスアカウントメトリクスストリーミング {#cross-account-metric-streaming}
クロスアカウントメトリクスストリーミングを使用して、単一の AWS リージョン内の複数の AWS アカウントにまたがるメトリクスを 1 つの Metric Stream に含めます。これは、共通の送信先に対してメトリクスを収集するために必要なストリーム数を削減する上で役立ちます。これを行うには、[ソース][4] アカウントを接続し、AWS 監視アカウントで Datadog へのクロスアカウントストリーミングを有効にします。

この機能が正しく動作するためには、監視アカウントに以下の権限が必要です。
   * oam:ListSinks
   * oam:ListAttachedLinks

**注:** ストリーミングされたメトリクスのカスタムタグやその他のメタデータを収集するには、ソースを Datadog と統合します。

### メトリクスストリーミングを無効にする {#disable-metric-streaming}

特定の AWS アカウントおよびリージョンのメトリクスストリーミングを完全に無効にするには、AWS Metric Stream とその関連リソースを削除する必要があります。Datadog でのメトリクスの損失を防ぐため、以下の削除手順に注意深く従うことが重要です。

[CloudFormation](?tab=cloudformation#installation) を使用してストリーミングを設定した場合:
1. セットアップ中に作成されたスタックを削除します。

[AWS Console](?tab=awsconsole#installation) からストリーミングを設定した場合:
1. 配信ストリームにリンクされている CloudWatch Metric Stream を削除します。
2. ストリームのセットアップ時に作成されたすべてのリソース (ストリームに関連付けられている S3 および Firehose 用の IAM ロールを含む) を削除します。

リソースが削除されたら、Datadog が変更を認識するまで 5 分間待機します。完了を確認するには、Datadog の [AWS インテグレーションページ][5] の**メトリクス収集**タブに移動し、指定した AWS アカウントの **CloudWatch Metric Streams** の下に無効にしたリージョンが表示されていないことを確認します。

### ストリームの健全性を監視する {#monitor-stream-health}

Datadog は、CloudWatch メトリクスストリームからデータを受信すると `datadog.aws_metric_streams.data_received` メトリクスを送信します。このメトリクスを使用して、AWS がメトリクスを送信しており、Datadog がそれを受信していることを確認します。

`datadog.aws_metric_streams.data_received`
: **タイプ**: ゲージ<br>
Datadog が CloudWatch メトリクスストリームからデータを受信したときに `1` の値を報告し、データを受信しない場合は報告しません。`stream_arn`、`stream_name`、`aws_account`、および `region` でタグ付けされます。メトリクスが報告される頻度は、データ量と Firehose 配信ストリームのバッファリング設定によって異なります。

クロスアカウントストリームの場合、メトリクスストリームと Firehose 配信ストリームは監視アカウント内にあります。`aws_account` タグは、メトリクスが収集されるソースアカウントではなく、監視アカウントを識別します。

ストリームがデータを配信しているかどうかをチェックするには、[Metrics Explorer][8] でこのメトリクスをクエリし、`stream_name` または `stream_arn` でグループ化します。

メトリクスはストリームがデータの配信を停止したときには報告されないため、報告状態からデータなしの状態への移行を監視します。[メトリクスモニター][9] を `datadog.aws_metric_streams.data_received` で作成し、`stream_arn` でグループ化して、データ欠落の通知を有効にします。設定手順については、[特定のタグが報告を停止した際のアラートの設定][10] を参照してください。

## トラブルシューティング {#troubleshooting}

Metric Streams または関連リソースの設定中に問題が発生した場合は、[AWS トラブルシューティング][6] を参照してください。Metric Streams が正常に実行されていた後に CloudWatch メトリクスが表示されなくなった場合、問題の原因は Firehose 配信先のエラーである可能性があります。

### Firehose 配信先で発生する永続的なエラー {#persistent-firehose-destination-errors}

CloudWatch メトリクスが Datadog に表示されなくなった場合でも、CloudWatch Metric Stream と Amazon Data Firehose 配信ストリームは `running` 状態を示している可能性があります。これは、Firehose がレコードを配信していない場合でも発生することがあります。

これは、Firehose が [再試行期間][11] 内に Datadog HTTP エンドポイントへレコードを配信できず、かつ S3 バックアップへレコードを書き込めない場合に発生します。両方の配信パスが失敗すると、エンドポイントが再び利用可能になっても、配信ストリームが自動的に HTTP 配信を再開しないことがあります。

配信を診断して復旧するには、以下を行います。

1. 影響を受けている CloudWatch Metric Stream に関連付けられた Firehose 配信ストリームを特定します。次の AWS CLI コマンドを実行して、レスポンス内で `FirehoseArn` を見つけます。

   ```shell
   aws cloudwatch get-metric-stream \
     --name <METRIC_STREAM_NAME> \
     --region <AWS_REGION>
   ```

2. CloudWatch Logs で [Firehose 配信エラーログ][12] を確認します。配信エラーログが有効になっていない場合は、将来の配信エラーをキャプチャできるように有効にします。関連するエラーには、`HttpEndpoint.DestinationException` (HTTP 408 レスポンスなど) や `S3.AccessDenied` が含まれます。
3. CloudWatch コンソールで [Firehose CloudWatch メトリクス][13] を確認します (配信が中断されている間、Datadog ではこれらのメトリクスが表示されない場合があります)。`DeliveryToHttpEndpoint.Success`、`DeliveryToHttpEndpoint.DataFreshness`、`DeliveryToHttpEndpoint.Records`、および `IncomingRecords` をチェックします。
4. Firehose がレコードを受信しても配信されない場合は、S3 バックアップ構成と IAM ロールをチェックします。
   - Firehose が設定されたロールを引き受け、バックアップバケットに書き込めることをチェックします。
   - バケットポリシー、権限の境界、サービスコントロールポリシー (SCP)、および KMS キーポリシーが必要なアクセスを拒否していないことをチェックします。
5. Firehose 配信ストリームの S3 バックアップ設定で構成されたプレフィックスの下にあるバックアップバケットをチェックし、レコードが S3 に到達しているかどうかをチェックします。オブジェクトが書き込まれていない場合は、S3 バックアップパスの権限または設定に問題があることが確認されます。ステップ 2 の配信エラーログに S3 の権限エラーが表示されている場合は、続行する前に修正します。
6. Firehose [UpdateDestination API][14] を使用して Firehose HTTP 送信先設定を更新します (例: 再試行時間を変更するなど)。このような構成の更新により、停止した送信先を再起動できる場合があります。

配信が回復しない場合は、[DDatadog Support][15] に連絡し、以下の情報を提供します。
   - AWS アカウント ID およびリージョン
   - CloudWatch Metric Stream および Firehose 配信ストリームの ARN
   - 配信が停止したおおよその時刻
   - 関連する Firehose エラーログ

**注**: 配信の再起動は新しいレコードにのみ影響し、停止中に失敗したレコードをバックフィル (再取り込み) することはありません。S3 バックアップに書き込まれたレコードは、自動的に Datadog に取り込まれることはありません。

## 関連資料{#further-reading}
 {{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/guide/cloud-metric-delay/
[2]: https://aws.amazon.com/cloudwatch/pricing/
[3]: /ja/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
[8]: https://app.datadoghq.com/metric/explorer
[9]: /ja/monitors/types/metric/
[10]: /ja/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
[11]: https://docs.aws.amazon.com/firehose/latest/dev/retry.html
[12]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-logs.html
[13]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html#fh-http-metrics
[14]: https://docs.aws.amazon.com/firehose/latest/APIReference/API_UpdateDestination.html
[15]: /ja/help/