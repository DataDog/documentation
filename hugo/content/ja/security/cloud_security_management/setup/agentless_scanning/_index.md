---
aliases:
- /ja/security/agentless_scanning
- /ja/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Vulnerabilities についての詳細
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: クラウドストレージ用に Sensitive Data Scanner をセットアップする
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: ドキュメント
  text: Agentless スキャンの更新
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: ドキュメント
  text: Agentless スキャンのトラブルシューティング
title: Cloud Security Agentless スキャン
---
## 概要 {#overview}

Agentless スキャンは、Datadog Agent をインストールすることなく、AWS、Azure、GCP のクラウドインフラストラクチャー内に存在する脆弱性を可視化します。Datadog は、クラウドリソースの完全な可視性を得るための最初のステップとして Agentless スキャンを有効にし、その後、より深いセキュリティとオブザーバビリティのコンテキストを得るためにコアアセットに Datadog Agent をインストールすることを推奨しています。

<div class="alert alert-info">Agentless スキャンは、Cloud Security Vulnerabilities と Misconfigurations の両方が有効な状態で Datadog Agent が実行されているホストをスキップします。Agent がインストールされているその他のホストについては、Agentless スキャンは Agent がカバーしていない機能のみを対象とします。<a href="/security/cloud_security_management/troubleshooting/agentless_scanning#hosts-with-the-datadog-agent-are-not-scanned">トラブルシューティング</a>を参照してください。</div>

## 仕組み {#how-it-works}

Agentless スキャンの仕組みを下図に示します。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless スキャンの仕組みを示す図" width="90%" >}}

1. Datadog は 12 時間間隔で自動スキャンをスケジュールし、[Remote Configuration][2] を介してスキャン対象のリソースを送信します。
   - [Cloud Security Evaluation Filters][15] が構成されている場合、Agentless スキャンはこれらのフィルターに従い、構成された基準に一致するリソースのみをスキャンします。
2. サーバーレス関数 (AWS Lambda など) の場合、スキャナーは関数のコードを取得します。
3. スキャナーは、実行中の VM インスタンスで使用されているボリュームのスナップショットを作成します。スナップショットまたは関数コードを使用して、スキャナーは SBOM (パッケージと依存関係のリスト) を生成します。
4. SBOM とホストメタデータが Datadog に送信されます。スナップショット、ディスクコンテンツ、コンテナイメージを含むその他すべてのデータはインフラストラクチャー内に残ります。スナップショットは削除されます。
5. Datadog は SBOM を使用してリソース内の既知の脆弱性を特定します。

このアーキテクチャにより、以下が提供されます。
- **データプライバシー**: ディスクの内容、コンテナイメージ、機密データは、クラウドアカウント内に残ります。パッケージメタデータ (SBOM) のみが Datadog に送信されます。
- **データレジデンシー**: データがアカウントの境界を越えて Datadog のインフラストラクチャーに送信されることはなく、データ主権要件への準拠が簡素化されます。
- **コンプライアンス**: 監査担当者は、スキャンデータが境界内に残っていることを確認できます。

データプライバシーについての詳細は、[Datadog に送信されるデータ](#what-data-is-sent-to-datadog)を参照してください。

<div class="alert alert-info">
  <ul>
    <li>スキャナーはインフラストラクチャー内で独立した仮想マシンとして動作し、既存のシステムやリソースへの影響を最小限に抑えます。</li>
    <li>AWS の場合、スキャナーインスタンスはワークロードに応じて自動的にスケーリングされます。スキャン対象のリソースがない場合、スキャナーはゼロまでスケーリングされ、クラウドプロバイダーのコストを最小限に抑えます。</li>
    <li>スキャナーは、機密情報や個人情報をインフラストラクチャー外に送信することなく、ホストからパッケージのリストを安全に収集します。</li>
    <li>スキャナーは、クラウドプロバイダー API の使用を制限してレート制限に達しないようにし、必要に応じて指数バックオフを使用します。</li>
    <li>スキャナーインスタンスは 24 時間ごとに自動的に入れ替えられ、常に最新のイメージで実行されます。</li>
  </ul>
</div>

## Datadog に送信されるデータ {#what-data-is-sent-to-datadog}

データプライバシーを守るため、Datadog は分析用のディスクスナップショットを環境外にコピーする代わりに**クラウドアカウント内**に軽量スキャンインフラストラクチャーをデプロイします。Agentless スキャンはリソースのスナップショットを作成してローカルで分析し、分析の完了後にスナップショットを削除します。パッケージと依存関係のリストを含む、分析結果のソフトウェア部品表 (SBOM) のみが Datadog に送信されます。生データ、ディスクの内容、およびコンテナイメージが環境外に出ることはありません。

Agentless スキャナーは、OWASP [cycloneDX][3] 形式を使用して、パッケージのリストを Datadog に送信します。機密情報や個人情報がインフラストラクチャー外に送信されることはありません。

Datadog は以下を送信**しません**。
- システムおよびパッケージの構成
- 暗号化キーおよび証明書
- ログおよび監査証跡
- 機密性の高いビジネスデータ

## クラウドサービスプロバイダーコスト {#cloud-service-provider-cost}

Agentless スキャンはクラウドアカウント内で実行されるため、コンピューティングコストとネットワークコストはクラウドプロバイダーからの請求に含まれます。独自のインフラストラクチャーでスキャンするベンダーはコンピューティングコストを SaaS 料金に含めます。データを環境内に保持する場合は、インフラストラクチャーのコストを直接確認できます。

コストを削減するには、以下を実行します。
- ホストが 150 を超える各リージョンにスキャナーをデプロイします。リージョナルスキャナーを使用するとリージョン間のデータ転送を回避できるため、リモートリージョンからそれらのホストをスキャンするよりも費用対効果が高くなります。
- Terraform で[推奨される構成][13]を使用し、各リージョンに 1 つのスキャナーをデプロイします。
- 大規模なマルチリージョンデプロイメントの場合、デプロイメントトポロジーの選択方法のガイダンスに関する [Agentless スキャンのデプロイ][16]を参照してください。

## スキャナーアクセスを制限する {#restrict-scanner-access}

スキャナーインスタンスには、スナップショットの作成とコピー、およびボリュームの説明を行うための[権限][4]が必要です。Datadog では、スキャナーを安全に保つために以下のガイドラインに従うことを推奨しています。

- スキャナーインスタンスへのアクセスを管理者ユーザーに制限します。
- 最小権限の原則に従い、スキャナー権限をスキャンに必要な最小限に設定します。
- スキャナーと Datadog 間のすべてのデータ転送を HTTPS で暗号化します。
- 無人セキュリティ更新を有効にし、インスタンスを 24 時間ごとに自動的にローテーションします。
- スキャナーインスタンスへのインバウンドアクセスを許可しないでください (セキュリティグループで制限)。

## クラウドストレージスキャン {#cloud-storage-scanning}

デプロイ時またはセットアップ後に、Agentless スキャンのリソースに対して [Sensitive Data Scanner][8] を有効にできます。Sensitive Data Scanner は、クラウドストレージ内の機密データをカタログ化および分類します (Amazon S3 バケットなど)。Datadog に機密データを送信することなくご利用の環境内のデータストアとそのファイルのみを読み取ります。

## オンデマンドスキャン {#on-demand-scanning}

デフォルトでは、Agentless Scanning は 12 時間ごとにリソースを自動的にスキャンします。AWS の場合、オンデマンドスキャン API を使用して、特定のリソース (ホスト、コンテナ、Lambda 関数、または S3 バケット) のスキャンをすぐに開始することもできます。詳細については、[オンデマンドスキャン API][14] のドキュメントを参照してください。

## 参考資料 {#further-reading}

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