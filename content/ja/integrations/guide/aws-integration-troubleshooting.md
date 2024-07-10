---
description: Datadog AWS インテグレーションのトラブルシューティングステップ
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: インテグレーション
  text: AWS インテグレーション
title: AWS インテグレーションのトラブルシューティング
---

## 概要

このガイドは、Datadog [AWS インテグレーション][1]に関連する問題のトラブルシューティングにご利用ください。

## IAM 権限エラー

### Datadog に sts:AssumeRole を実行する権限がない

`sts:Assumerole` 権限エラーは、`DatadogAWSIntegrationRole` に関連する信頼ポリシーに問題があることを示しています。この問題を解決する方法については、[エラー: Datadog に sts:AssumeRole を実行する権限がない][2]のドキュメントをご覧ください。

**注**: このエラーは、変更が反映されるまでの数時間、Datadog UI で継続する可能性があります。

## データの不一致

### CloudWatch と Datadog でデータの不一致があるように見える

以下の 2 つの重要な区別に注意する必要があります。

1. Datadog は、AWS で選択された時間枠に関係なく、AWS からの生データを秒単位の値で表示します。そのため、Datadog の値が低く表示されることがあります。

2. `min`、`max`、`avg` は、AWS 内と Datadog 内では意味が異なります。AWS では、平均レイテンシー、最小レイテンシー、最大レイテンシーは、AWS が収集する 3 つの異なるメトリクスです。Datadog が AWS CloudWatch からメトリクスを取得する場合、平均レイテンシーは Elastic Load Balancer (ELB) ごとに単一の時系列として受け取られます。Datadog では、`min`、`max`、`avg` を選択すると、複数の時系列がどのように組み合わされるかを制御することになります。例えば、`system.cpu.idle` をフィルタなしでリクエストすると、そのメトリクスを報告する各ホストについて 1 つの系列を返し、グラフ化するためにこれらの系列を結合する必要があります。代わりに、単一のホストから `system.cpu.idle` をリクエストした場合、集計は必要なく、平均と最大を切り替えても同じ結果になります。

## メトリクス

### メトリクスの遅延

AWS インテグレーションを使用している場合、Datadog は CloudWatch API からメトリクスを取得します。API に関していくつかの制約が存在するため、AWS のメトリクスにわずかな遅延が見られる場合があります。

CloudWatch API で提供されるのは、データを取得するためのメトリクス別のクロールだけです。CloudWatch API にはレート制限があり、認証証明書、リージョン、サービスの組み合わせに基づいて変化します。アカウント レベルにより、AWS で使用できるメトリクスは異なります。たとえば、AWS 上で詳細なメトリクスに対して支払いを行うと、短時間で入手できるようになります。この詳細なメトリクスのサービスのレベルは粒度にも適用され、一部のメトリクスは 1 分ごと、それ以外は 5 分ごとに使用可能になります。

メトリクスの遅延を避けるために、ホストに Datadog Agent をインストールします。[Datadog Agent のドキュメント][3]を参照し、開始してください。Datadog には、状況に応じて、アカウント内の特定のメトリクスに優先順位を付けて、より速く引き込むことができる機能があります。詳しくは、[Datadog サポート][4]にお問い合わせください。

### メトリクスがない

CloudWatch の API は、データポイントとメトリクスのみを返します。そのため、たとえば、ELB に接続されているインスタンスがない場合は、Datadog でこの ELB に関連するメトリクスは表示されないことが予想されます。

### aws.elb.healthy_host_count のカウントに誤りがある

ELB でクロスゾーン負荷分散オプションを有効にすると、この ELB に接続されているすべてのインスタンスは、すべてのアベイラビリティー ゾーンの一部であると見なされます (CloudWatch 側)。例えば、`1a` に 2 個、`ab` に 3 個のインスタンスがある場合、メトリクスはアベイラビリティーゾーンごとに 5 つのインスタンスが表示されます。
このカウンターは直感的でないので、メトリクス **aws.elb.healthy_host_count_deduped** と **aws.elb.un_healthy_host_count_deduped** は、このクロスゾーン負荷分散オプションが有効かどうかに関係なく、アベイラビリティー ゾーンごとに正常または正常でないインスタンスのカウントを表示します。

## Datadog アプリ

### Agent のインストール時にホストが重複する

AWS ホストに Agent をインストールする際、Agent の構成でホスト名を手動で設定すると、数時間の間、Datadog のインフラストラクチャーページで重複したホストが表示されることがあります。重複したホストは数時間後に消え、課金には影響しません。

## Datadog Agent

### IMDS v2 を使用した EC2 メタデータ

EC2 の [IMDSv2][5] の構成によって、Agent がメタデータにアクセスできなくなり、`aws` ではなく `os` ホスト名プロバイダにフォールバックする場合があります (`agent status` の出力に見られるように)。

コンテナ環境では、Kubernetes クラスターで動作するポッドに IAM ロール/認証情報を割り当てることで、EC2 メタデータエンドポイントをロックしていることが問題になる場合があります。`Kube2IAM` と `kiam` は、これを行うために使用される一般的なツールです。これを解決するには、このエンドポイントへのアクセスを許可するように `Kube2IAM` または `kiam` の構成を更新します。

AWS API は、Agent がデフォルトで使用する IMDSv1 を無効にすることをサポートしています。もし、IMDSv2 が有効でアクセス可能な場合、[Agent 構成][6]でパラメーター `ec2_prefer_imdsv2` を `true` に設定 (デフォルトは `false`) してください。詳しくは、[Instance Metadata Service Version 2 の使用への移行][7]のドキュメントを参照してください。

IMDSv2 のデフォルト構成では、IP ホップ数が 1 より大きい接続、つまり、IP ゲートウェイを通過した接続は拒否されます。これは、Agent がホストのネットワーク以外のネットワークを持つコンテナで実行されている場合、ランタイムが仮想 IP ゲートウェイを介してコンテナのトラフィックを転送するため、問題が発生する可能性があります。これは、ECS のデプロイでは一般的です。次のオプションにより、この問題が改善される場合があります。

 * [最大ホップ数を最低でも `2` に増やします][8]。これは、Agent 以外のコンテナが IMDS に保存されているデータにアクセスすることを許可しているため、IMDS に保存されているデータのセキュリティに影響を与える可能性があります。
 * [`providers.eks.ec2.useHostnameFromFile` を true に設定][9]し、cloud-init で検出したホスト名を使用します。
 * [`agents.useHostNetwork` を true に設定][10]し、Agent をホストの UTS ネームスペースで実行します。

## タグ

### Amazon EC2 とのインテグレーションを解除しても、ホストに AWS タグが残っている

AWS インテグレーションを使用して CloudWatch からデータを収集するか、各 EC2 インスタンスに Datadog Agent を直接インストールしてデータとタグを取得することができます。これらの両方の方法でデータを収集する場合、Datadog のバックエンドはインテグレーションと Datadog Agent の両方からのデータを 1 つのホストオブジェクトにマージします。

AWS インテグレーションを削除しても、EC2 インスタンス上で Datadog Agent を実行し続ける場合、Datadog アカウントのホストには、AWS から収集した古いホストタグが引き続き関連付けられます。これは意図した動作であり、AWS インテグレーションまたは Amazon EC2 インテグレーションがまだ有効であることを示すものではありません。

インフラストラクチャーの一覧からそのホストの "Apps Running" を確認するか、メトリクスサマリーを確認し、そのホストをスコープとしたノートブックを作成することで、インテグレーションが有効であることを確認することができます。

ホストから AWS ホストタグを永久に削除したい場合は、[ホストタグの削除 API エンドポイント][11]を使用して行うことができます。

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /ja/agent/
[4]: /ja/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /ja/api/latest/tags/#remove-host-tags