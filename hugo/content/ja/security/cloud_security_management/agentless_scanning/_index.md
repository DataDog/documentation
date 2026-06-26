---
aliases:
- /ja/security/agentless_scanning
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/quick_start
  tag: ドキュメント
  text: Cloud Security Management 向け Agentless Scanning クイックスタート
- link: /security/cloud_security_management/setup/agentless_scanning/terraform
  tag: ドキュメント
  text: Terraform を使用して Agentless Scanning をセットアップする
- link: /security/cloud_security_management/setup/agentless_scanning/cloudformation
  tag: ドキュメント
  text: AWS インテグレーションで Agentless Scanning をセットアップする
- link: https://www.datadoghq.com/blog/agentless-scanning/
  tag: ブログ
  text: Cloud Security Management の Agentless Scanning で数分で脆弱性を検出
- link: /security/vulnerabilities
  tag: ドキュメント
  text: CSM Vulnerabilities についてもっと読む
title: Cloud Security Management Agentless Scanning
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management の Agentless Scanning は、選択された <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

## 概要

Agentless Scanning は、Datadog Agent をインストールする必要なく、クラウド インフラストラクチャー内に存在する脆弱性への可視性を提供します。Datadog は、クラウド リソース全体の可視性を得る最初のステップとして Agentless Scanning を有効化し、さらに深いセキュリティとオブザーバビリティのコンテキストのために、時間をかけてコア アセットに Datadog Agent をインストールすることを推奨します。

## 可用性

以下の表は、サポートされている各クラウド プロバイダーについて、対応するコンポーネントに関連する Agentless Scanning の技術概要です:

| コンポーネント                                       | AWS                                                                                                                                       | Azure                                                                                                                                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| コンテナ レジストリ                            | パブリック ECR レジストリ </br> プライベート ECR レジストリ                                                                                        | -                                                                                                                                                                             |
| オペレーティングシステム                                | Linux                                                                                                                                     | Linux                                                                                                                                                                             |
| ホストファイルシステム                                 | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                              | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                      |
| パッケージマネージャー                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                                    | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          |
| 暗号化                                      | AWS </br> 暗号化なし </br> 暗号化 - プラットフォーム マネージド キー (PMK) </br> 暗号化 - カスタマー マネージド キー (CMK)                           | 暗号化 - プラットフォーム マネージド キー (PMK): Azure Disk Storage Server-Side Encryption、Encryption at host </br> **注**: 暗号化 - カスタマー マネージド キー (CMK) には **対応していません** |
| コンテナランタイム                               | Docker, containerd </br> **注**: CRI-O は**サポートされていません**                                                                             | Docker, containerd </br> **注**: CRI-O は**サポートされていません**                                                                                                                     |
| サーバーレス                                      | AWS Lambda                                                                                                                                | この機能をリクエストするには、[Datadog サポート][12] にお問い合わせください。                                                                                                                                                         |
| アプリケーション言語 (ホストおよびコンテナ内) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                       | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               |

**注**: AMI は Datadog の AWS 連携を使用しているアカウントに保存されている必要があります。そうでない場合、Datadog は AMI の基盤となる Amazon Elastic Block Store (EBS) スナップショットを読み取れないため、AMI をスキャンしたりレポートしたりできません。

## 仕組み

リソースに対して [Agentless scanning の設定][1] を行うと、Datadog は [Remote Configuration][2] を通じて 12 時間間隔で自動スキャンをスケジュールします。スキャン サイクルの間、Agentless スキャナーは Lambda コードの依存関係を収集し、VM インスタンスのスナップショットを作成します。これらのスナップショットを用いて、Agentless スキャナーはスキャンを実行し、パッケージのリストを生成して Datadog に送信し、Lambda コードの依存関係とともに脆弱性を確認します。スナップショットのスキャンが完了すると、そのスナップショットは削除されます。機密情報や個人情報があなたのインフラストラクチャーの外部に送信されることはありません。

以下の図は、Agentless Scanning がどのように機能するかを示しています。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning の動作を示す図" width="90%" >}}

1. Datadog は Remote Configuration を通してスキャン対象リソースを指定し、スキャンをスケジューリングします。

   **注**: スケジュールされたスキャンは、すでに [Cloud Security Management を有効化した Datadog Agent がインストールされている](#agentless-scanning-with-existing-agent-installations)ホストを無視します。Datadog は、潜在的な脆弱性や弱点に関する最新のインサイトを提供するため、12 時間ごとにリソースの継続的な再スキャンをスケジュールします。

2. Lambda 関数に対しては、スキャナが関数のコードを取得します。
3. レジストリのコンテナ イメージについては、スキャナーは標準の OCI API を使用してレイヤーをレジストリから取得し、稼働中のすべてのタスクのイメージをスキャンします。

    **注**: アクセス可能なプライベート レジストリにおける直近の公開済みイメージ 1000 件もスキャン対象として選択されます。

4. スキャナーは、稼働中の VM インスタンスで使用されているボリュームのスナップショットを作成します。これらのスナップショットはスキャン実行の基盤となります。スナップショット、またはコードを使用して、スキャナーはパッケージのリストを生成します。
5. スキャンが完了すると、収集されたホストに関する情報とパッケージのリストが Datadog に送信され、その他のデータはあなたのインフラストラクチャー内に留まります。スキャン サイクル中に作成されたスナップショットは削除されます。
6. 収集されたパッケージ リストと、Datadog が Trivy の脆弱性データベースへアクセスできることを組み合わせて、Datadog はあなたのリソースとコードに影響する該当の脆弱性を特定します。

**注**:
- スキャナーは、あなたのインフラストラクチャー内で独立した VM インスタンスとして動作し、既存のシステムやリソースへの影響を最小限に抑えます。
- スキャナは、インフラストラクチャー外部へ機密情報や個人情報を送信することなく、ホストからパッケージ一覧を安全に収集します。
- スキャナーは、レート制限に達することを防ぐため、クラウド プロバイダー API の使用を制限し、必要に応じて指数バックオフを用います。

## Datadog に送信されるデータ
Agentless スキャナは、OWASP の [cycloneDX][3] フォーマットを使用してパッケージ一覧を Datadog に送信します。機密情報や個人情報がインフラストラクチャー外部に送信されることはありません。

Datadog が**送信しない**情報:
- システムおよびパッケージの構成
- 暗号鍵および証明書
- ログおよび監査証跡
- 機密性の高い業務データ

## セキュリティへの配慮

スキャナー インスタンスには、スナップショットの作成とコピー、およびボリュームの記述を行うための [権限][4] が付与されているため、Datadog は、これらのインスタンスへのアクセスを管理者ユーザーのみに制限することを推奨します。

このリスクをさらに軽減するため、Datadog は以下のセキュリティ対策を実施しています。

- Datadog スキャナはインフラストラクチャー_内部_で動作し、スナップショットやパッケージ一覧を含むすべてのデータは分離され安全に保たれます。
- スキャナと Datadog 間のすべてのデータ送信は、業界標準のプロトコル (HTTPS など) を使用して暗号化され、データの機密性と完全性を確保します。
- Datadog スキャナは最小権限の原則に従って運用されます。つまり、想定機能を効果的に実行するために必要最小限の権限のみが付与されます。
- Datadog はスキャナに付与される権限を慎重に見直し、不必要なデータやリソースへのアクセスが発生しないよう制限しています。
- Datadog スキャナインスタンスには無人セキュリティアップデートが有効になっています。この機能により、重要なセキュリティパッチやアップデートが手動で介入することなく自動的にインストールされます。
- Datadog のスキャナー インスタンスは 24 時間ごとに自動ローテーションされます。このローテーションにより、スキャナー インスタンスは最新の Ubuntu イメージで継続的に更新されます。
- スキャナインスタンスへのアクセスはセキュリティグループによって厳密に制御されます。インバウンドアクセスは許可されず、インスタンスが侵害される可能性を制限します。
- 機密情報や個人情報がインフラストラクチャー外部に送信されることはありません。

## 既存の Agent インストールがある場合の Agentless Scanning

Datadog Agent がインストールされている場合、その Agent はクラウドワークロード内のリスクや脆弱性に対するリアルタイムで深い可視性を提供します。Datadog Agent を完全にインストールすることが推奨されます。

その結果、Agentless Scanning は Datadog Agent がインストールされ、[Vulnerability Management][5] が構成されたリソースをスキャンから除外します。これにより、Cloud Security Management はリスクの全景を完全に把握しつつ、Datadog Agent による Vulnerability Management で得られるメリットを損なうことはありません。

以下の図は、既存の Agent インストールがある場合の Agentless Scanning の動作を示しています。

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="CSM 脆弱性管理が有効な Agent が既にインストールされている場合の Agentless Scanning の動作を示す図" width="90%" >}}

## Cloud Storage のスキャン

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
Amazon S3 バケットおよび RDS インスタンスのスキャニングサポートは Limited Availability です。利用登録するには、<strong>アクセスリクエスト</strong>をクリックしてください。
{{< /callout >}}

[Sensitive Data Scanner][8] が有効な場合、Amazon S3 バケットおよび RDS インスタンス内の機密データをカタログ化および分類することができます。

Sensitive Data Scanner は、[Agentless スキャナ][1]をクラウド環境にデプロイすることで機密データをスキャンします。これらのスキャナインスタンスは [Remote Configuration][10] を介してすべての S3 バケットと RDS インスタンスの一覧を取得し、各データストア内の CSV や JSON といったテキストファイル、およびテーブルを時間をかけてスキャンする指示が設定されています。Sensitive Data Scanner は[すべてのルールライブラリ][11]を活用して一致を検索します。一致が見つかった場合、その位置情報がスキャナインスタンスから Datadog に送信されます。データストアとそのファイルは環境内でのみ読み取られ、機密データが Datadog に送信されることはありません。

Sensitive Data Scanner は機密データの一致を表示するとともに、[Cloud Security Management][9] が検出した機密データストアに影響するセキュリティ問題も表示します。任意の問題をクリックすると、Cloud Security Management 内でトリアージおよび修正を続行できます。

## クラウドサービスプロバイダーの費用

Agentless Scanning を使用する場合、スキャナーの実行およびクラウド環境の分析に対して、クラウド プロバイダーの追加コストが発生します。

クラウド構成はクラウド プロバイダーのコストに影響します。通常、[推奨構成][13] を使用した場合、年間あたりスキャン対象ホスト 1 台につき 1 USD 程度です。正確な金額についてはクラウド プロバイダーの情報を参照してください。これらの金額は Datadog の関与なく変更される可能性があります。

複数リージョンに分散した大規模なクラウド ワークロードの場合、リージョン間ネットワークを回避するために、Datadog は [Terraform による Agentless Scanning][6] の設定を推奨します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/agentless_scanning/quick_start
[2]: /ja/agent/remote_config/?tab=configurationyamlfile
[3]: https://cyclonedx.org/
[4]: /ja/security/cloud_security_management/setup/agentless_scanning/quick_start#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: /ja/security/cloud_security_management/setup/agentless_scanning/terraform
[7]: mailto:success@datadoghq.com
[8]: /ja/sensitive_data_scanner
[9]: /ja/security/cloud_security_management
[10]: /ja/agent/remote_config
[11]: /ja/sensitive_data_scanner/scanning_rules/library_rules/
[12]: /ja/help
[13]: /ja/security/cloud_security_management/agentless_scanning/deployment_methods#recommended-configuration