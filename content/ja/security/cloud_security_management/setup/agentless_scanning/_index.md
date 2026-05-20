---
aliases:
- /ja/security/agentless_scanning
- /ja/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Vulnerabilities の詳細
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: Cloud Storage 向け Sensitive Data Scanner のセットアップ
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: ドキュメント
  text: Agentless Scanning の更新
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: ドキュメント
  text: Agentless Scanning のトラブルシューティング
title: Cloud Security における Agentless Scanning
---

## 概要

Agentless Scanning では、Datadog Agent をインストールしなくても、AWS、Azure、GCP のクラウド インフラストラクチャに潜む脆弱性を把握できます。Datadog では、まず Agentless Scanning を有効にしてクラウド リソース全体を把握できる状態を作り、その後、重要なアセットへ段階的に Datadog Agent を導入して、より深いセキュリティ情報と可観測性データを得ていくことを推奨しています。

<div class="alert alert-info">Agentless Scanning では、Datadog Agent がインストールされているリソースは対象外です。</div>

## 動作のしくみ

次の図は、Agentless Scanning がどのように動作するかを示しています。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning の動作を示す図" width="90%" >}}

1. Datadog では、12 時間おきに自動スキャンを実行し、スキャン対象のリソース情報を [Remote Configuration][2] 経由で送信します。
   - [Cloud Security Evaluation Filters][15] を設定している場合、Agentless Scanning はその条件を尊重し、一致するリソースだけをスキャンします。
2. サーバーレス関数 (AWS Lambda など) の場合、スキャナーは関数コードを取得します。
3. スキャナーは、稼働中の VM インスタンスで使用されているボリュームのスナップショットを作成します。作成したスナップショット、または関数コードをもとに、SBOM (パッケージと依存関係の一覧) を生成します。
4. Datadog に送信されるのは、SBOM とホスト メタデータのみです。スナップショット、ディスクの内容、コンテナ イメージを含むそれ以外のデータは、すべてお客様のインフラストラクチャ内に留まります。スナップショットは削除されます。
5. Datadog は、この SBOM を使ってリソース内の既知の脆弱性を特定します。

このアーキテクチャには、次の利点があります。
- **データ プライバシー**: ディスクの内容、コンテナ イメージ、機微データはクラウド アカウント内に留まります。Datadog に送信されるのは、パッケージ メタデータ (SBOM) のみです。
- **データ レジデンシー**: Datadog のインフラストラクチャ側へアカウント境界をまたいでデータが移動しないため、データ主権に関する要件への準拠が容易になります。
- **コンプライアンス**: 監査担当者は、スキャン データが自社の管理範囲内に留まっていることを確認できます。

データ プライバシーの詳細については、[Datadog に送信されるデータ](#what-data-is-sent-to-datadog) を参照してください。

<div class="alert alert-info">
  <ul>
    <li>スキャナーは、お客様のインフラストラクチャ内で独立した仮想マシンとして動作するため、既存のシステムやリソースへの影響を最小限に抑えられます。</li>
    <li>AWS では、スキャナー インスタンスはワークロードに応じて自動的にスケールします。スキャン対象のリソースがない場合は 0 までスケール ダウンし、クラウド プロバイダーのコストを最小限に抑えます。</li>
    <li>スキャナーは、機密情報や個人情報をインフラストラクチャの外部へ送信することなく、ホスト上のパッケージ一覧を安全に収集します。</li>
    <li>クラウド プロバイダー API の利用は、レート制限に達しない範囲に抑えられており、必要に応じて指数的バックオフを使用します。</li>
    <li>スキャナー インスタンスは 24 時間ごとに自動でローテーションされ、常に最新のイメージで稼働します。</li>
  </ul>
</div>

## Datadog に送信されるデータ

データのプライバシーを守るため、Datadog では分析目的でディスク スナップショットを環境外にコピーするのではなく、軽量なスキャン基盤を **クラウド アカウント内** にデプロイします。Agentless Scanning はリソースのスナップショットを作成し、ローカルで解析を行い、完了後にスナップショットを削除します。Datadog に送信されるのは、結果として得られる SBOM のみで、そこにはパッケージと依存関係の一覧が含まれます。生データ、ディスクの内容、コンテナ イメージが環境外へ出ることはありません。

Agentless スキャナーは、パッケージ一覧を Datadog に送信する際に、OWASP の [cycloneDX][3] 形式を使用します。機密情報や個人情報がインフラストラクチャ外に送信されることはありません。

Datadog へ送信されないもの:
- システムおよびパッケージの設定
- 暗号鍵と証明書
- ログと監査証跡
- 機密性の高い業務データ

## クラウド サービス プロバイダーのコスト

Agentless Scanning はクラウド アカウント内で動作するため、コンピュートとネットワークの費用はクラウド プロバイダーの請求に計上されます。自社インフラでスキャンを実行するベンダーは、こうした計算資源の費用を SaaS 料金に含めることがありますが、データをお客様の環境内に留める設計である分、インフラ コストが請求上はっきり見える形になります。

コストを抑えるには:
- 150 台を超えるホストがあるリージョンごとにスキャナーをデプロイしてください。リージョンごとにスキャナーを配置することでリージョン間のデータ転送を避けられるため、別リージョンからそれらのホストをスキャンするよりもコスト効率が高くなります。
- Terraform と [推奨構成][13] を使い、リージョンごとに 1 台のスキャナーをデプロイしてください。
- 大規模なマルチ リージョン環境では、デプロイ トポロジーの選び方について [Agentless Scanning のデプロイ][16] を参照してください。

## スキャナー アクセスの制限

スキャナー インスタンスがスナップショットの作成とコピー、およびボリューム情報の取得を行うには、[権限][4] が必要です。スキャナーを安全に運用するため、Datadog では次のガイドラインに従うことを推奨しています。

- スキャナー インスタンスにアクセスできるのは、管理者ユーザーのみに限定してください。
- スキャナーの権限は最小権限の原則に従い、スキャンに必要な範囲だけに絞ってください。
- スキャナーと Datadog 間のすべてのデータ通信を HTTPS で暗号化してください。
- 自動セキュリティ アップデートを有効にし、インスタンスは 24 時間ごとに自動でローテーションしてください。
- スキャナー インスタンスへのインバウンド アクセスは許可しないでください (security group で制限)。

## Cloud Storage のスキャン

デプロイ時またはセットアップ後に、Agentless Scanning のリソースに対して [Sensitive Data Scanner][8] を有効にできます。Sensitive Data Scanner は、クラウド ストレージ (Amazon S3 バケットなど) 内の機微データを洗い出して分類します。Datadog に機微データを送信することなく、お客様の環境内にあるデータ ストアとそのファイルだけを読み取ります。

## オンデマンド スキャン

既定では、Agentless Scanning は 12 時間ごとにリソースを自動スキャンします。AWS では、On-Demand Scanning API を使用して、特定のリソース (ホスト、コンテナ、Lambda 関数、または S3 バケット) をすぐにスキャンすることもできます。詳細は、[On-Demand Scanning API][14] のドキュメントを参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /ja/remote_configuration
[3]: https://cyclonedx.org/
[4]: /ja/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /ja/security/sensitive_data_scanner
[9]: /ja/security/cloud_security_management
[10]: /ja/remote_configuration
[11]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /ja/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /ja/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /ja/security/cloud_security_management/setup/agentless_scanning/deployment_methods