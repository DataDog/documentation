---
description: Datadog AWS インテグレーションのトラブルシューティング手順
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: インテグレーション
  text: AWS インテグレーション
title: AWS インテグレーションのトラブルシューティング
---
## 概要 {#overview}

このガイドは、Datadog [AWS インテグレーション][1]に関連する問題のトラブルシューティングにご利用ください。

## IAM 権限エラー {#iam-permission-errors}

<div class="alert alert-info">
IAM の変更が AWS 全体に伝播するまで、数分かかる場合があります。IAM ロール、ポリシー、または信頼関係を変更した後は、インテグレーションを再検証する前に少なくとも 5 分間待機します。Datadog UI では、変更の伝播後も、最大数時間古い権限エラーが表示され続ける場合があります。
</div>

### Datadog に sts:AssumeRole を実行する権限がない {#datadog-is-not-authorized-to-perform-stsassumerole}

`sts:Assumerole` 権限エラーは、`DatadogAWSIntegrationRole` に関連付けられた信頼ポリシーに問題があることを示します。この問題を解決する方法については、[エラー: Datadog に sts:AssumeRole を実行する権限がない][2]ドキュメントを参照してください。

**注**: 変更の伝播中、このエラーが Datadog UI に数時間表示され続ける場合があります。

### すべての AWS 権限の問題を解決する {#resolve-all-aws-permissions-issues}

AWS インテグレーションページの **Resolve all AWS permissions issues** ボタンを使用すると、CloudFormation QuickStart スタックを使用して Datadog インテグレーション IAM ロールを更新し、不足している権限の問題を解決できます。
**Issues** で、**Resolve All AWS Permissions Issues** をクリックします。これにより、Datadog のパブリック API [エンドポイント][13]を呼び出してインテグレーションに必要な最新の IAM 権限を取得し、それらの権限を含む新しい IAM ポリシーを作成してインテグレーションロールにアタッチする、CloudFormation スタックが起動します。また、`SecurityAudit` AWS マネージドポリシーがアタッチされていない場合は、これもアタッチします。

作成されるポリシーには `datadog-aws-integration-iam-permissions-` プレフィックスが付けられ、その後に一意のハッシュが続くため、事前に構成済みの既存のポリシーとの競合が回避されます。CloudFormation テンプレートは、Datadog のパブリック [cloudformation-template リポジトリ][14]で確認できます。

<div class="alert alert-danger">
<strong>Resolve All AWS Permissions Issues</strong> をクリックした場合、<br>
  - ロールに関する認証の不具合は修正されません (ロール名、外部 ID、または信頼ポリシーの構成により、Datadog が AWS アカウントで認証を行えない場合)<br>
  - 必要な権限を明示的に拒否するサービスコントロールポリシー (SCP) が適用されているケースは修正されません<br>
  - Datadog インテグレーション IAM ロールにアタッチしたポリシーには影響しません<br>
  - 複数回クリックした場合、そのプレフィックスで作成された過去のポリシーは、新しいポリシーが作成される前に削除されます。
</div>

## データの不一致 {#data-discrepancies}

### CloudWatch と Datadog のデータの不一致 {#discrepancy-between-your-data-in-cloudwatch-and-datadog}

以下のセクションでは、注意すべき 3 つの重要な違いと、[不一致を解消する](#reconcile-the-discrepancy)手順について説明します。

#### 1. 時間集計 {#1-time-aggregation}

Datadog は、AWS で選択された時間枠に関係なく、AWS からの生データを 1 秒あたりの値で表示します。これが、Datadog の値が低く見える可能性がある理由です。詳細については、メトリクスドキュメントの[時間集計][20]を参照してください。

#### 2. スペース集計 {#2-space-aggregation}

スペース集計演算子 `min`、`max`、および `avg` は、AWS と Datadog で意味が異なります。AWS では、平均レイテンシー、最小レイテンシー、最大レイテンシーは、AWS が収集する 3 つの異なるメトリクスです。Datadog が AWS CloudWatch からメトリクスをポーリングする場合、平均レイテンシーは Elastic Load Balancer (ELB) ごとに 1 つの時系列として受信されます。

Datadog 内で `min`、`max`、または `avg` を選択するということは、複数の時系列データをどのように組み合わせるかを指定していることになります。たとえば、フィルターなしで `system.cpu.idle` を要求すると、そのメトリクスを報告するホストごとに 1 つの系列が返され、それらの系列をグラフ化するには結合する必要があります。代わりに単一のホストから `system.cpu.idle` を要求した場合、集計は不要であり、平均と最大を切り替えても同じ結果が得られます。

詳細については、メトリクスドキュメントの[スペース集計][21]を参照してください。

#### 3. ディメンションごとのメトリクス {#3-per-dimension-metrics}

一部の AWS CloudWatch メトリクスはディメンションの組み合わせごとに 1 回出力されるため、Datadog で集計すると値が大きく表示されることがあります。たとえば、Classic ELB メトリクス `aws.elb.healthy_host_count` は、アベイラビリティーゾーンごとに個別に報告されます。クロスゾーン負荷分散が有効になっている場合、このメトリクスをすべてのアベイラビリティーゾーンで合計すると、実際の正常なホスト数よりも高い合計値になります。詳細については、[aws.elb.healthy_host_count のカウントが正しくない](#wrong-count-of-awselbhealthy_host_count)を参照してください。

集計値が実際より大きくなるのを避けるため、可能な場合は `_deduped` メトリクスバリアントを使用するか、クエリのスコープを単一のアベイラビリティーゾーンなどの特定のディメンション値に限定してください。`_deduped` バリアントをサポートするロードバランサータイプの全リストについては、[ELB インテグレーションページ][27]を参照してください。

#### 不一致を解消する {#reconcile-the-discrepancy}

1. **CloudWatch** に移動し、**All metrics** を選択します。
2. メトリクスを検索してグラフ化します。
3. **Source** タブを選択して、完全なメトリクスクエリを表示します。

{{< img src="integrations/guide/aws_integration_troubleshooting/cloudwatch-metric-explorer.png" alt="Source タブにメトリクスクエリが表示され、グラフ上のポイントにカーソルを合わせるとメトリクス値とタイムスタンプが表示されている、CloudWatch の All metrics ページ" responsive="true" style="width:90%;" >}}

4. CloudWatch のクエリと Datadog のクエリでスコープが同じであることを確認します。
   - CloudWatch メトリクスクエリで使用される[ディメンション][17]は、Datadog メトリクスクエリで使用されるタグと一致している必要があります。
   - Datadog は 1 分単位の粒度でメトリクスをクエリするため、CloudWatch メトリクスクエリの **Period** も 1 分の精度に設定する必要があります。
   - リージョン
   - メトリクスの名前空間と名前
5. グラフ上のデータポイントにカーソルを合わせると、タイムスタンプと値が表示されます。
6. Datadog グラフで同じ時点を見つけ、値を比較します。値が等しい場合、元の不一致は 2 つのグラフ間の時間集計またはスペース集計のいずれかの違いによるものです。

## メトリクス {#metrics}

### メトリクスの遅延 {#metrics-delayed}

AWS インテグレーションを使用する場合、Datadog は CloudWatch API を介してメトリクスを取得します。AWS の API に存在する制約により、メトリクスに遅延が発生する場合があります。

CloudWatch API は、データを取得するためのメトリクスごとのクロールのみを提供しています。CloudWatch API にはレート制限があり、認証資格情報、リージョン、およびサービスの組み合わせに基づいて変動します。アカウントレベルに応じて、AWS で使用できるメトリクスは異なります。たとえば、AWS の「detailed metrics」を有料で利用している場合、メトリクスをより頻繁に取得できます。この詳細なメトリクスのサービスレベルは粒度にも適用され、一部のメトリクスでは 1 分ごと、それ以外は 5 分ごとに使用可能になります。

メトリクスの遅延を回避するには、ホストに Datadog Agent をインストールしてください。開始方法については、[Datadog Agent のドキュメント][3]を参照してください。Datadogでは、状況に応じてアカウント内の特定のメトリクスを優先し、より迅速に取り込むことができます。詳細については、[Datadog サポート][4]までお問い合わせください。

### 予想されるメトリクスの遅延 {#expected-metric-delays}

AWS でメトリクスが生成されてから Datadog に表示されるまでの遅延は、収集方法によって異なります。

| 収集方法 | 一般的な遅延 | 備考 |
|---|---|---|
| API ポーリング (デフォルト) | 約 10 分 | CloudWatch API のレート制限やアカウントサイズによって遅延が増加する可能性があります。|
| [CloudWatch Metric Streams][23] | 2 ～ 3 分 | Amazon Data Firehose を使用した個別のセットアップが必要です。|
| [Datadog Agent][3] | リアルタイム | CloudWatch を介さず、ホストレベルのメトリクスを直接収集します。|

収集方法による遅延に加え、一部の AWS サービスでは CloudWatch 側で独自のレイテンシーが発生します。

- **S3 Storage Lens** メトリクスは継続的ではなく、毎日公開されます。
- **AWS の請求メトリクス**は数時間遅れて届き、更新頻度も低くなっています。
- **詳細モニタリング**では、EC2 のメトリクスがデフォルトの 5 分間隔ではなく 1 分間隔で提供されますが、AWS でインスタンスごとに有効にする必要があります。

**注**: Datadog は過去のメトリクスデータのバックフィルを行いません。詳細については、[セットアップ後の動作][25]を参照してください。

### メトリクスの欠落{#missing-metrics}

Datadog で期待される AWS メトリクスが表示されない場合は、次のチェックリストを確認します。

1. **IAM 権限を確認します。**`DatadogAWSIntegrationRole` に AWS サービスに必要な権限が含まれていることを確認します。一部のサービスでは、コアインテグレーションポリシーに加えて、サービス固有の権限が必要になります。サービス固有の権限要件については、各[AWS インテグレーションページ][15]を参照してください。
2. **AWS リージョンが有効になっていることを確認します。**[AWS インテグレーションページ][16]で、リソースがデプロイされているリージョンが **General** タブで選択されていることを確認します。メトリクスは、有効になっているリージョンからのみ収集されます。
3. **サービスが CloudWatch にメトリクスを出力していることを確認します。**AWS で CloudWatch コンソールを開き、期待されるメトリクスが存在することを確認します。CloudWatch の API はデータポイントを持つメトリクスのみを返すため、リソースがアイドル状態であるか、アタッチされたコンポーネントがない場合 (例: インスタンスがアタッチされていない ELB)、CloudWatch はそのメトリクスを報告しないことがあります。
4. **サービスに追加の有効化が必要かどうかを確認します。**一部の AWS サービスは、デフォルトでは CloudWatch にメトリクスを出力しないため、AWS コンソールでの追加構成が必要です。完全なリストについては、[コアインテグレーション以外に追加設定が必要な AWS サービスは？][26]を参照してください。
5. **次のポーリングまで待ちます。**詳細な調査を行う前に、少なくとも 1 回の収集サイクルが完了するまで待機します。収集方法別のタイミングについては、[予想されるメトリクスの遅延](#expected-metric-delays)を参照してください。
6. **サービスコントロールポリシー (SCP) を確認します。**アカウントが AWS Organizations に属している場合、組織または組織単位 (OU) レベルで適用された SCP が IAM 権限を上書きし、API 呼び出しをブロックする可能性があります。必要な権限を拒否する SCP が存在しないことを確認します。
7. **権限の境界を確認します。**[権限の境界][30]は、ロールが持つことができる最大権限を設定します。境界に Datadog インテグレーションで必要なアクションが含まれていない場合、インテグレーションロールのポリシーでそのアクションが許可されているように見えても、AWS はそのアクションに対して `AccessDenied` を返します。AWS IAM コンソールでインテグレーションロールを開き、**Permissions boundary** タブで境界がアタッチされているかどうかを確認します。

### aws.elb.healthy_host_count のカウントが正しくない {#wrong-count-of-awselbhealthy-host-count}

ELB でクロスゾーン負荷分散オプションが有効になっている場合、その ELB にアタッチされているすべてのインスタンスは、(CloudWatch 側で) すべてのアベイラビリティーゾーンの一部とみなされます。たとえば、`1a` に 2 つのインスタンスがあり、`1b` に 3 つのインスタンスがある場合、メトリクスにはアベイラビリティーゾーンごとに 5 つのインスタンスが表示されます。
これは直感的ではない場合があるため、メトリクス **aws.elb.healthy_host_count_deduped** および **aws.elb.un_healthy_host_count_deduped** は、このクロスゾーン負荷分散オプションが有効であるかどうかにかかわらず、アベイラビリティーゾーンごとの正常および異常なインスタンスの数を表示します。

## リージョン {#regions}

### リージョンの動作 {#region-behavior}

Datadog は、[AWS インテグレーションページ][16]で選択した AWS リージョンからのみメトリクスを収集します。特定のサービスのデータが表示されない場合は、そのリソースがデプロイされているリージョンが有効になっていることを確認します。

#### 注意点 {#considerations}

- **Global services**: 一部の AWS サービス (IAM、CloudFront、Route 53 など) はグローバルであり、特定のリージョンに紐付けられていません。これらのサービスのメトリクスは、Datadog のリージョン構成に関係なく、通常 `us-east-1` の下に表示されます。
- **リージョンサービス**: ほとんどの AWS サービスはリージョンサービスです。Datadog は、インテグレーションタイルで明示的に有効化されたリージョンのメトリクスのみを収集します。
- **オプトインリージョン**: AWS のオプトインリージョン (`af-south-1`、`ap-east-1`、`me-south-1` など) は、[AWS アカウント設定][22]と Datadog インテグレーションタイルの両方で有効にする必要があります。AWS 側でリージョンが有効になっていない場合、Datadog はそのリージョンからデータを収集できません。
- **新しいリージョン**: 最近追加された AWS リージョンはクロールされますが、Datadog インテグレーション UI や Terraform プロバイダーにはすぐに表示されない場合があります。サポートされているリージョンの最新リストについては、[AWS インテグレーションページ][16]を確認します。

## Datadog UI {#datadog-ui}

### Agent インストール時のホストの重複 {#duplicated-hosts-when-installing-the-agent}

AWS ホストに Agent をインストールする際、Agent の構成でホスト名を手動で指定すると、Datadog のインフラストラクチャーページで数時間ホストが重複して表示されることがあります。重複したホストは数時間後に消え、課金には影響しません。

## Datadog Agent {#datadog-agent}

### IMDS v2 を使用した EC2 メタデータ {#ec2-metadata-with-imds-v2}

コンテナ化された環境では、Kubernetes クラスターで実行されているポッドに IAM ロールや認証情報を割り当てることで、EC2 メタデータエンドポイントが制限されていることが原因である可能性があります。`Kube2IAM` と `kiam` は、これを行うためによく使用される一般的なツールです。これを解決するには、`Kube2IAM` または `kiam` の構成を更新して、このエンドポイントへのアクセスを許可します。

IMDSv2 は、デフォルト構成では、IP ホップ数が 1 を超える接続、つまり IP ゲートウェイを通過した接続を拒否します。ランタイムがコンテナのトラフィックを仮想 IP ゲートウェイ経由で転送するため、Agent がホストのネットワークとは異なるネットワークを使用するコンテナ内で実行されている場合、この問題が発生する可能性があります。これは ECS デプロイメントでよく見られます。以下のオプションでこの問題を解決できる可能性があります。

 * [最大ホップ数を少なくとも `2` に増やす][8]。そうすることで、Agent 以外のコンテナもこのデータにアクセスできるようになるため、IMDS に保存されているデータのセキュリティに影響を与える可能性があります。
 * [`providers.eks.ec2.useHostnameFromFile` を true に設定][9]することで、cloud-init によって検出されたホスト名を使用します。
 * [`agents.useHostNetwork` を true に設定][10]することで、ホストの UTS 名前空間で Agent を実行します。

### IMDS を使用した EC2 ホスト名 {#ec2-hostname-with-imds}

#### 7.64.0 より前の Agent バージョン {#agent-versions-before-7640}

状況によっては、EC2 [IMDSv2][5] の構成により、Agent が必要なメタデータにアクセスできなくなる場合があります。これにより、`agent status` の出力に見られるように、Agent が `aws` ではなく `os` ホスト名プロバイダーにフォールバックする可能性があります。

AWS API は、Agent がデフォルトで使用する IMDSv1 の無効化をサポートしています。この場合で、かつ IMDSv2 が有効でアクセス可能な場合は、[Agent 構成][6]でパラメーター `ec2_prefer_imdsv2` を `true` に設定します (デフォルトは `false` です)。詳細については、[インスタンスメタデータサービスバージョン 2 への移行][7]のドキュメントを参照してください。

Datadog Agent 7.64.0 以降にアップグレードすると、新しいバージョンの Agent はデフォルトで IMDSv2 を使用するため、これらの問題が解決されます。

#### Agent バージョン 7.64.0 以降 {#agent-version-7640-and-after}

v7.64.0 以降、Datadog Agent はデフォルトで IMDSv2 を使用し、失敗した場合は IMDSv1 にフォールバックします。以前の動作に戻すには、ホスト構成で `ec2_imdsv2_transition_payload_enabled` を `false` に設定します。
詳細については、[インスタンスメタデータサービスバージョン 2 への移行][7]のドキュメントを参照してください。

## タグ {#tags}

### タグの収集と伝播の遅延 {#tag-collection-and-propagation-delays}

AWS タグは、インテグレーションのクロールサイクルの一部として収集されます。AWS でタグを適用してからタグが伝播されるまで、AWS サービスやアカウント内のリソース量に応じて、15 分から数時間かかる場合があります。

最近 AWS でタグを追加または変更したにもかかわらず、Datadog に反映されない場合は、以下を確認します。
1. 少なくとも 1 回の完全なクロールサイクルが完了するまで (API ポーリングの場合は約 10 分) 待ちます。
2. 必要なタグ関連の権限 (例: `tag:GetResources`) が `DatadogAWSIntegrationRole` にあることを確認します。
3. リソースタイプがタグ収集をサポートしていることを確認します。Datadog は、[AWS Resource Groups Tagging API][28] を通じてタグを収集します。リソースタイプがサポートされているかどうかを確認するには、AWSドキュメントの[サポートされているリソースタイプ][29]を参照してください。

### Amazon EC2 インテグレーションを削除した後もホストに AWS タグが残る {#hosts-still-have-aws-tags-after-removing-the-amazon-ec2-integration}

AWS インテグレーションを使用して CloudWatch からデータを収集するか、各 EC2 インスタンスに Datadog Agent を直接インストールしてデータとタグを取得できます。これら両方の方法を選択してデータを収集している場合、Datadog のバックエンドは、インテグレーションと Datadog Agent の両方からのデータを単一のホストオブジェクトにマージします。

AWS インテグレーションを削除しても、EC2 インスタンスで Datadog Agent を実行し続けている場合、Datadog アカウント内のホストには、AWS から収集された古いホストタグが引き続き関連付けられます。これは意図された動作であり、AWS インテグレーションまたは Amazon EC2 インテグレーションがまだ有効であることを示すものではありません。

インテグレーションが有効になっているかどうかは、インフラストラクチャーリストからそのホストの「Apps Running」を確認するか、Metrics Catalog を確認してそのホストにスコープを設定したノートブックを作成することで確認します。

デフォルトでは、ホストレベルのタグは AWS ホストに永続的に付与されたままになります。ホストから AWS ホストタグを完全に削除する場合は、以下の方法を使用します。
   - [ホストタグ削除 API エンドポイント][11]を使用して、単一ホストのすべてのユーザー割り当てタグを削除します。
   - [remove_lingering_aws_host_tags.py ツール][12]を使用して、ホストのリスト、またはすべてのホストからすべてのユーザー割り当てタグを削除します。

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /ja/agent/
[4]: /ja/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: /ja/agent/configuration/agent-configuration-files/
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /ja/api/latest/tags/#remove-host-tags
[12]: https://github.com/DataDog/Miscellany/blob/master/remove_lingering_aws_host_tags.py
[13]: https://api.datadoghq.com/api/v2/integration/aws/iam_permissions
[14]: https://github.com/DataDog/cloudformation-template/tree/master/aws_attach_integration_permissions
[15]: /ja/integrations/#cat-aws
[16]: https://app.datadoghq.com/integrations/amazon-web-services
[17]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
[18]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[20]: /ja/metrics/#time-aggregation
[21]: /ja/metrics/#space-aggregation
[22]: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html
[23]: /ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[24]: /ja/integrations/guide/monitor-your-aws-billing-details/
[25]: /ja/getting_started/integrations/aws/#what-to-expect-after-setup
[26]: /ja/integrations/guide/aws-integration-and-cloudwatch-faq/#which-aws-services-require-additional-setup-beyond-the-core-integration
[27]: /ja/integrations/amazon_elb/
[28]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[29]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/supported-services.html
[30]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html