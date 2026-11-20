---
aliases:
- /ja/security/agentless_scanning
- /ja/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: ドキュメント
  text: クラウドセキュリティの脆弱性について詳しく読む
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: クラウドストレージ用のSensitive Data Scannerをセットアップする
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: ドキュメント
  text: Agentless Scanningの更新
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: ドキュメント
  text: Agentless Scanningのトラブルシューティング
title: クラウドセキュリティ Agentless Scanning
---
## 概要 {#overview}

Agentless Scanningは、Datadog Agentをインストールすることなく、AWS、Azure、GCPのクラウドインフラストラクチャ内に存在する脆弱性を可視化します。Datadogは、クラウドリソースを完全に可視化するための第一歩としてAgentless Scanningを有効にし、その後、より深いセキュリティとオブザーバビリティのコンテキストを得るために、主要な資産にDatadog Agentをインストールすることを推奨しています。

<div class="alert alert-info">Agentless Scanningは、Datadog Agentがインストールされているリソースを除外します。</div>

## 仕組み {#how-it-works}

次の図は、Agentless Scanningの仕組みを示しています。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanningの仕組みを示す図" width="90%" >}}

1. Datadogは12時間間隔で自動スキャンをスケジュールし、[Remote Configuration][2]を通じてスキャン対象のリソースを送信します。
   - [Cloud Security Evaluation Filters][15]が構成されている場合、Agentless Scanningはこれらのフィルターを尊重し、構成された基準に一致するリソースのみをスキャンします。
2. サーバーレス関数（AWS Lambdaなど）の場合、スキャナーは関数のコードを取得します。
3. スキャナーは、実行中のVMインスタンスで使用されているボリュームのスナップショットを作成します。スナップショットまたは関数コードを使用して、スキャナーはSBOM（パッケージと依存関係のリスト）を生成します。
4. SBOMとホストメタデータはDatadogに送信されます。スナップショット、ディスクコンテンツ、コンテナイメージを含むその他のすべてのデータは、お客様のインフラストラクチャ内に留まります。スナップショットは削除されます。
5. DatadogはSBOMを使用して、リソース内の既知の脆弱性を特定します。

このアーキテクチャは以下を提供します。
- **データプライバシー**：ディスクの内容、コンテナイメージ、機密データは、お客様のクラウドアカウント内に留まります。パッケージのメタデータ（SBOM）のみがDatadogに送信されます。
- **データのレジデンシー**：データがアカウントの境界を越えてDatadogのインフラストラクチャに送信されることはなく、データ主権要件への準拠が簡素化されます。
- **コンプライアンス**：監査人は、スキャンデータがお客様の境界内に留まっていることを確認できます。

データプライバシーの詳細については、「[Datadogに送信されるデータ](#what-data-is-sent-to-datadog)」を参照してください。

<div class="alert alert-info">
  <ul>
    <li>スキャナーはお客様のインフラストラクチャ内で独立した仮想マシンとして動作し、既存のシステムやリソースへの影響を最小限に抑えます。</li>
    <li>AWSの場合、スキャナーインスタンスはワークロードに基づいて自動的にスケーリングされます。スキャン対象のリソースがない場合、スキャナーはゼロまでスケーリングされ、クラウドプロバイダーのコストを最小限に抑えます。</li>
    <li>スキャナーは、機密情報や個人情報をインフラストラクチャ外に一切送信することなく、ホストからパッケージのリストを安全に収集します。</li>
    <li>スキャナーは、クラウドプロバイダーAPIの使用を制限してレート制限に達しないようにし、必要に応じて指数バックオフを使用します。</li>
    <li>スキャナーインスタンスは24時間ごとに自動的にローテーションされ、常に最新のイメージが実行されるようになっています。</li>
  </ul>
</div>

## Datadogに送信されるデータ {#what-data-is-sent-to-datadog}

データを非公開に保つため、ディスクスナップショットを分析のために環境外にコピーするのではなく、Datadogは軽量なスキャンインフラストラクチャを**お客様のクラウドアカウント内**にデプロイします。Agentless Scanningはリソースのスナップショットを作成してローカルで分析し、分析完了後にスナップショットを削除します。Datadogには、パッケージと依存関係のリストを含むSBOMのみが送信されます。生のデータ、ディスクの内容、コンテナイメージが環境外に出ることはありません。

エージェントレススキャナーは、OWASP [cycloneDX][3]形式を使用してパッケージのリストをDatadogに送信します。機密情報や個人のプライバシー情報が、お客様のインフラストラクチャの外部に一切送信されることはありません。

Datadogは**送信しません**：
- システムおよびパッケージの構成
- 暗号化キーおよび証明書
- ログおよび監査証跡
- 機密性の高いビジネスデータ

## クラウドサービスプロバイダーのコスト{#cloud-service-provider-cost}

Agentless Scanningはお客様のクラウドアカウント内で実行されるため、コンピューティングおよびネットワークのコストがクラウドプロバイダーの請求書に記載されます。独自のインフラストラクチャでスキャンを行うベンダーはコンピューティングコストをSaaS料金に含めますが、データを環境内に保持することで、インフラストラクチャのコストを直接確認できるようになります。

コストを削減するには：
- 150台以上のホストがある各リージョンにスキャナーをデプロイしてください。リージョナルスキャナーを使用することでリージョン間データ転送を回避でき、リモートリージョンからホストをスキャンするよりも費用対効果が高くなります。
- Terraformを使用した[推奨構成][13]に従い、リージョンごとに1台のスキャナーをデプロイしてください。
- 大規模なマルチリージョンデプロイについては、[Deploying Agentless Scanning][16]を参照し、デプロイトポロジーの選択に関するガイダンスをご確認ください。

## スキャナーへのアクセスを制限する{#restrict-scanner-access}

スキャナーインスタンスには、スナップショットの作成とコピー、およびボリュームの記述を行うための[権限][4]が必要です。Datadogでは、スキャナーを安全に保つために以下のガイドラインに従うことを推奨しています。

- スキャナーインスタンスへのアクセスを管理者ユーザーに制限してください。
- スキャナーの権限は最小権限の原則に従い、スキャンに必要な最小限の範囲に制限してください。
- スキャナーとDatadog間のすべてのデータ送信は、HTTPSを使用して暗号化してください。
- 無人セキュリティアップデートを有効にし、24時間ごとにインスタンスを自動的にローテーションします。
- スキャナーインスタンスへのインバウンドアクセスを許可しないでください（セキュリティグループで制限されています）。

## Cloud Storageのスキャン {#cloud-storage-scanning}

デプロイ時またはセットアップ後に、Agentless Scanningリソースに対して[Sensitive Data Scanner][8]を有効にできます。Sensitive Data Scannerは、クラウドストレージ（Amazon S3バケットなど）内の機密データをカタログ化および分類します。これは環境内のデータストアとそのファイルのみを読み取り、機密データをDatadogに送信することはありません。

## On-Demand Scanning {#on-demand-scanning}

デフォルトでは、Agentless Scanningは12時間ごとにリソースを自動的にスキャンします。AWSの場合、On-Demand Scanning APIを使用して、特定のリソース（ホスト、コンテナ、Lambda関数、またはS3バケット）の即時スキャンをトリガーすることもできます。詳細については、[On-Demand Scanning API][14]のドキュメントを参照してください。

## 関連情報 {#further-reading}

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