---
description: Datadog Alibaba Cloud インテグレーションのトラブルシューティングステップ
further_reading:
- link: https://docs.datadoghq.com/integrations/alibaba-cloud/
  tag: 統合
  text: Alibaba Cloud インテグレーション
title: Alibaba Cloud インテグレーションのトラブルシューティング
---
## 概要 {#overview}

このガイドを使用して、Datadog [Alibaba Cloudインテグレーション][1]のトラブルシューティングを行います。設定の問題は、[Alibaba Cloudインテグレーションタイル][2]に表示されます。

## Alibaba Cloudアクセスキーが無効であるか、存在しません {#alibaba-cloud-access-key-is-invalid-or-no-longer-exists}

この問題は、インテグレーション用に設定されたアクセスキーIDまたはアクセスキーシークレットが無効、非アクティブ、または削除されている場合に発生します。

この問題を解決するには：

- アクセスキーが非アクティブな場合は、Alibaba Cloud RAMコンソールで再度有効にします。
- アクセスキーシークレットが無効な場合は、正しいシークレットでDatadogインテグレーションを更新します。
- アクセスキーが存在しない場合、または正しいシークレットが利用できない場合は、Datadogが使用するRAMユーザーの代替アクセスキーを作成してください。新しいキーIDとシークレットをコピーし、DatadogインテグレーションのAlibaba Cloud認証情報を更新してください。手順については、Alibaba Cloudドキュメントの「[Create an AccessKey pair][3]」を参照してください。

次に、RAMユーザーが[Alibaba Cloudインテグレーション][1]で必要な権限を持っていることを確認してください。

## クラウド監視権限が不足しています {#cloud-monitoring-permissions-are-missing}

この問題は、Datadogインテグレーションで使用されるRAMユーザーがCloudMonitorメトリクスをクエリできない場合に発生します。

この問題を解決するには、DatadogインテグレーションRAMユーザーにアタッチされたポリシーに`cms:DescribeMetricList`権限を追加してください。その後、約15分待ってから、DatadogがCloudMonitorメトリクスを受信することを確認してください。

RAMポリシーの編集手順については、「[Grant permissions to a RAM user][4]」を参照してください。

## ログ収集権限が不足しています {#log-collection-permissions-are-missing}

<!-- vale Datadog.words_case_insensitive = NO -->
この問題は、Datadogインテグレーションで使用されるRAMユーザーに、Simple Log サービス (SLS) から読み取るために必要な権限がない場合に発生します。
<!-- vale Datadog.words_case_insensitive = YES -->

この問題を解決するには：

1. Datadog インテグレーション RAM ユーザーにアタッチされているポリシーを確認してください。
2. [SLS RAM アクセス制御権限][8] で説明されている SLS 読み取り権限を追加してください。
3. Datadog によるログ収集対象とするすべての SLS プロジェクトおよびログストアに、そのポリシーが適用されていることを確認してください。

RAMポリシーの編集手順については、「[Grant permissions to a RAM user][4]」を参照してください。

## ACK 用の Prometheus 権限が不足しています {#prometheus-permissions-for-ack-are-missing}

この問題は、Datadog インテグレーションで使用される RAM ユーザーに、Alibaba Cloud Container Service for Kubernetes (ACK) クラスター上で Alibaba Cloud Managed Service for Prometheus を構成するために必要な権限がない場合に発生します。

この問題を解決するには、その RAM ユーザーにアタッチされているポリシーに以下の権限を追加してください。可能な限り、意図したクラスターにポリシーのスコープを限定してください。ポリシーには少なくとも以下を含める必要があります。

- `cs:InstallClusterAddons`
- `cs:UnInstallClusterAddons`

これらの権限により、Datadog は ACK クラスターに `ack-arms-prometheus` アドオンをインストールおよび再インストールできるようになります。

RAMポリシーの編集手順については、「[Grant permissions to a RAM user][4]」を参照してください。リソーススコープのオプションについては、「[InstallClusterAddons][9]」を参照してください。

<!-- vale Datadog.headings = NO -->
## Alibaba Cloud Resource Center が有効になっていません {#alibaba-cloud-resource-center-is-not-enabled}
<!-- vale Datadog.headings = YES -->

この問題は、アカウントで Alibaba Cloud Resource Center が有効になっていない場合に発生します。このサービスを有効にするまで、Datadog はメトリクスを収集できません。

この問題を解決するには：

1. Datadog に接続されている Alibaba Cloud アカウントにサインインしてください。
2. [Resource Center][5] を開いてください。
3. アカウントの Resource Center を有効にしてください。
4. `AliyunResourceCenterReadOnlyAccess` ポリシーを Datadog インテグレーション RAM ユーザーにアタッチしてください。
5. 次の収集サイクルまで約15分待機して、Datadogがメトリクスを受信していることを確認してください。

## Alibaba Cloud API のクォータ制限に達しました {#alibaba-cloud-api-quota-limit-reached}

この問題は、アカウントが Alibaba Cloud API のクォータ制限に達した場合に発生します。これは一時的なリクエストの制限とは異なります。

この問題を解決するには：

1. Alibaba Cloud アカウントのクォータと請求状況を確認してください。
2. 該当する場合は、従量課金制のクォータを有効にするか、未払いの請求問題を解決してください。
3. 既存のクォータが不足している場合は、[クォータの引き上げを申請][6]してください。
4. クォータの変更が反映されるまで待って、Datadogの収集が再開されたことを確認してください。

サポートが必要な場合は、[Datadog サポート][7] にお問い合わせください。

[1]: /ja/integrations/alibaba-cloud/
[2]: https://app.datadoghq.com/integrations?integrationId=alibaba-cloud
[3]: https://www.alibabacloud.com/help/en/ram/user-guide/create-an-accesskey-pair
[4]: https://www.alibabacloud.com/help/en/ram/user-guide/grant-permissions-to-a-ram-user
[5]: https://resourcecenter.console.aliyun.com/
[6]: https://www.alibabacloud.com/help/en/resource-management/user-guide/request-a-quota-increase
[7]: /ja/help/
[8]: https://www.alibabacloud.com/help/en/sls/log-service-ram-access-control-permissions-configuration
[9]: https://www.alibabacloud.com/help/en/ack/ack-managed-and-ack-dedicated/developer-reference/api-cs-2015-12-15-installclusteraddons