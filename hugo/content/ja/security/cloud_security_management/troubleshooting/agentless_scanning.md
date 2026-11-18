---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning
  tag: ドキュメント
  text: エージェントレススキャンのセットアップ
- link: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
  tag: ドキュメント
  text: エージェントレススキャンのデプロイ
title: エージェントレススキャンのトラブルシューティング
---
## 概要{#overview}

エージェントレススキャンで問題が発生した場合は、以下のトラブルシューティングガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## デプロイ後に結果が表示されない {#no-results-after-deployment}

エージェントレススキャンのデプロイ後、結果はすぐには表示されません。最初の結果は通常、デプロイから 30 分以内に表示されます。IAM 構成の問題など、まれなケースでは最大 2 時間かかることがあります。

2 時間経過しても結果が表示されない場合は、次のようにします。

- スキャナーのインフラストラクチャーがデプロイされていることを確認します。クラウドプロバイダーのコンソールで、スキャナーインスタンスが実行されていることをチェックします。
- エージェントレススキャンのセットアップに使用した API キーで [Remote Configuration][3] が有効になっていることを確認します。スキャナーは、Remote Configuration を介してスキャンの指示を受け取ります。
- クラウドインテグレーションが適切に構成されていることを確認します。[[{{< ui >}}Cloud Security Setup{{< /ui >}}] (クラウドセキュリティのセットアップ)][4] ページで、ご使用のクラウドアカウントでエージェントレススキャンが有効になっていることを確認します。

## GCP: Failed to create state bucket (storage.buckets.create 403) {#gcp-failed-to-create-state-bucket-storagebucketscreate-403}

GCP Cloud Shell のセットアップが [**{{< ui >}}Setting up Terraform state storage{{< /ui >}}**] (Terraform 状態ストレージのセットアップ) で、次のようなエラーで失敗する場合:

```
Failed to create state bucket: datadog-agentless-tfstate-<project>
HTTPError 403: ... does not have storage.buckets.create access to the Google Cloud project.
```

スクリプトを実行しているアイデンティティに、スキャナープロジェクト内の GCS バケットを作成または管理する権限がありません。

**修正方法 (いずれかを選択):**

1. **ストレージ権限を付与する**: スクリプトを実行しているユーザー (またはサービスアカウント) に、スキャナープロジェクトでのストレージ権限を付与します。たとえば、そのプロジェクトでの [**Storage Admin**] (ストレージ管理者) (`roles/storage.admin`) 付与するか、`storage.buckets.create`、`storage.buckets.get`、および `storage.buckets.update` を含むカスタムロールを付与します。
2. **既存のバケットを再利用する:** 既存のバケットを使用して (必要に応じて、ストレージ権限を持つアイデンティティでバケットを作成します)、スクリプトを実行する際に `TF_STATE_BUCKET` をそのバケット名に設定します。スクリプトは Terraform 状態に既存のバケットを使用し、新しいバケットの作成を試みません。

## VPC 作成の制限によりデプロイメントが失敗する {#deployment-fails-due-to-vpc-creation-restrictions}

組織で Terraform を使用しており、かつ VPC (仮想プライベートクラウド) の作成を制限する SCP (サービスコントロールポリシー) を使用している場合、スキャナーはデフォルトで新しい VPC を作成するため、スキャナーのデプロイは失敗します。

これを修正するには、セットアップ中に[**カスタム VPC**][8]オプションを使用し、新しい VPC を作成する代わりに既存の VPC にスキャナーをデプロイしてください。

## スキャナーインスタンスが脆弱なホストとして表示される {#scanner-instances-appear-as-vulnerable-hosts}

エージェントレススキャナーインスタンスは、スキャンを実行するためにクラウドアカウント内にデプロイされるエフェメラル EC2 インスタンス (またはそれと同等のもの) です。これらは標準のオペレーティングシステムイメージ (たとえば、最新の Ubuntu LTS) を実行しているため、OS パッケージに関連する脆弱性の検出結果に表示される場合があります。

これらの検出結果には、基盤となる OS イメージで特定された脆弱性が反映されます。ご使用の環境の誤構成を示すものではありません。

必要に応じて、[{{< ui >}}Cloud Security Vulnerabilities Explorer{{< /ui >}}][2] でタグベースのフィルタリングを使用して、Datadog が管理するスキャナーインスタンスを脆弱性ビューから除外できます。

## Datadog Agent のあるホストがスキャンされない {#hosts-with-the-datadog-agent-are-not-scanned}

これは予期された動作です。エージェントレススキャンでは、[Cloud Security Vulnerabilities][6] を有効にして Datadog Agent がインストールされたホストが除外されます。これにより、重複スキャンが防止されます。

Cloud Security Vulnerabilities 機能を**有効にせずに** Datadog Agent をインストールしたホストは、エージェントレススキャンでスキャンされます。

## 予期しないリージョン間スキャンコスト {#unexpected-cross-region-scanning-costs}

一部のデプロイでは、スキャナーとリソースがリージョン間でどのように分散されているかによって、リージョン間のデータ転送がクラウドプロバイダーのネットワークコストを増加させることがあります。

トラフィックの局所性を最適化するには、多数のホストが含まれるリージョンにスキャナーをデプロイすることを検討してください。一般的なガイドラインとして、Datadog では 150 台以上のホストが含まれる各リージョンにスキャナーをデプロイすることを推奨しています。

推奨されるデプロイメントトポロジーに関する詳細なガイダンスについては、「[エージェントレススキャンのデプロイ][7]」を参照してください。

## GovCloud および FIPS では利用できない {#unavailable-for-govcloud-and-fips}

エージェントレススキャンは GovCloud では利用できず、FIPS にも準拠していません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /ja/remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods#enterprise-networking-considerations
[6]: /ja/security/cloud_security_management/vulnerabilities
[7]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc