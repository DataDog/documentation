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

Agentless Scanning は、Datadog Agent をインストールする必要なく、AWS ホスト、稼働中のコンテナ、Lambda 関数、Amazon Machine Images (AMI) 内に存在する脆弱性を可視化します。Datadog は、クラウドリソースの完全な可視性を得るための第一歩として Agentless Scanning を有効化し、その後、コアとなるアセットに対して Datadog Agent を徐々に導入し、より深いセキュリティおよび可観測性コンテキストを得ることを推奨します。

## 可用性

以下の表は、Agentless Scanning 技術と、それに対応するコンポーネントとの関係を示した概要です。

| コンポーネント                   | 対応テクノロジー                                        |
|-----------------------------|-------------------------------------------------------------|
| クラウドプロバイダー              | AWS                                                         |
| オペレーティングシステム            | Linux                                                       |
| ホストファイルシステム             | Btrfs, Ext2, Ext3, Ext4, xfs                                |
| パッケージマネージャー             | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine) |
| 暗号化                  | AWS </br> Unencrypted </br> Encrypted - Platform Managed Key (PMK) </br> **注**: Encrypted - Customer Managed Key (CMK) は**サポートされていません** |
| コンテナランタイム           | Docker, containerd </br> **注**: CRI-O は**サポートされていません**                                         |
| サーバーレス                  | AWS, AWS Lambda                                             |
| サーバーレス言語        | .Net, Python, Java, Ruby, Node.js, Go                        |

## 仕組み

リソースに対して [Agentless Scanning のセットアップ][1]を行った後、Datadog は [Remote Configuration][2] を通じて 12 時間間隔で自動スキャンをスケジューリングします。スキャンサイクル中、Agentless スキャナは Lambda のコード依存関係を収集し、EC2 インスタンスのスナップショットを作成します。これらのスナップショットを使用して、Agentless スキャナはパッケージの一覧をスキャン・生成し、脆弱性をチェックするとともに、Lambda コード依存関係と一緒に Datadog に送信します。スナップショットのスキャンが完了すると、そのスナップショットは削除されます。機密情報や個人情報はインフラストラクチャー外に送信されることはありません。

以下の図は、Agentless Scanning がどのように機能するかを示しています。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning の動作を示す図" width="90%" >}}

1. Datadog は Remote Configuration を通してスキャン対象リソースを指定し、スキャンをスケジューリングします。

   **注**: スケジュールされたスキャンは、すでに [Cloud Security Management を有効化した Datadog Agent がインストールされている](#agentless-scanning-with-existing-agent-installations)ホストを無視します。Datadog は、潜在的な脆弱性や弱点に関する最新のインサイトを提供するため、12 時間ごとにリソースの継続的な再スキャンをスケジュールします。

2. Lambda 関数に対しては、スキャナが関数のコードを取得します。
3. スキャナは、EC2 インスタンスで使用されている EBS ボリュームのスナップショットを作成します。これらのスナップショットは、スキャンを実行するためのベースとなります。スナップショットやコードを使用して、スキャナはパッケージの一覧を生成します。
4. スキャン完了後、パッケージ一覧および収集したホスト (ホスト名/EC2 インスタンス) に関連する情報が Datadog に送信されます。それ以外のデータはすべてインフラストラクチャー内部に残ります。スキャンサイクル中に作成されたスナップショットは削除されます。
5. 収集されたパッケージ一覧と Datadog がアクセス可能な Trivy 脆弱性データベースを活用して、Datadog はリソースおよびコード内で該当する脆弱性を特定します。

**注**:
- スキャナはインフラストラクチャー内部の別の EC2 インスタンスとして動作し、既存システムやリソースへの影響を最小限に抑えます。
- スキャナは、インフラストラクチャー外部へ機密情報や個人情報を送信することなく、ホストからパッケージ一覧を安全に収集します。
- スキャナは AWS の API 利用を制限し、AWS レート制限に達しないようにし、必要に応じて指数バックオフを行います。

## Datadog に送信されるデータ
Agentless スキャナは、OWASP の [cycloneDX][3] フォーマットを使用してパッケージ一覧を Datadog に送信します。機密情報や個人情報がインフラストラクチャー外部に送信されることはありません。

Datadog が**送信しない**情報:
- システムおよびパッケージの構成
- 暗号鍵および証明書
- ログおよび監査証跡
- 機密性の高い業務データ

## セキュリティへの配慮

スキャナインスタンスは、EBS スナップショットの作成およびコピー、ボリュームの記述を行う[権限][4]を付与されているため、Datadog はこれらのインスタンスへのアクセスを管理者ユーザーに限定することを推奨します。

このリスクをさらに軽減するため、Datadog は以下のセキュリティ対策を実施しています。

- Datadog スキャナはインフラストラクチャー_内部_で動作し、スナップショットやパッケージ一覧を含むすべてのデータは分離され安全に保たれます。
- スキャナと Datadog 間のすべてのデータ送信は、業界標準のプロトコル (HTTPS など) を使用して暗号化され、データの機密性と完全性を確保します。
- Datadog スキャナは最小権限の原則に従って運用されます。つまり、想定機能を効果的に実行するために必要最小限の権限のみが付与されます。
- Datadog はスキャナに付与される権限を慎重に見直し、不必要なデータやリソースへのアクセスが発生しないよう制限しています。
- Datadog スキャナインスタンスには無人セキュリティアップデートが有効になっています。この機能により、重要なセキュリティパッチやアップデートが手動で介入することなく自動的にインストールされます。
- Datadog スキャナインスタンスは 24 時間ごとに自動的にローテーションされます。このローテーションにより、スキャナインスタンスは常に最新の Ubuntu Amazon Machine Image (AMI) で更新されます。
- スキャナインスタンスへのアクセスはセキュリティグループによって厳密に制御されます。インバウンドアクセスは許可されず、インスタンスが侵害される可能性を制限します。
- 機密情報や個人情報がインフラストラクチャー外部に送信されることはありません。

## 既存の Agent インストールがある場合の Agentless Scanning

Datadog Agent がインストールされている場合、その Agent はクラウドワークロード内のリスクや脆弱性に対するリアルタイムで深い可視性を提供します。Datadog Agent を完全にインストールすることが推奨されます。

その結果、Agentless Scanning は Datadog Agent がインストールされ、[Vulnerability Management][5] が構成されたリソースをスキャンから除外します。これにより、Cloud Security Management はリスクの全景を完全に把握しつつ、Datadog Agent による Vulnerability Management で得られるメリットを損なうことはありません。

以下の図は、既存の Agent インストールがある場合の Agentless Scanning の動作を示しています。

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="CSM 脆弱性管理が有効な Agent が既にインストールされている場合の Agentless Scanning の動作を示す図" width="90%" >}}

## Cloud Storage scanning

{{< callout header="Limited Availability" url="https://www.datadoghq.com/private-beta/data-security" >}}
Amazon S3 バケットおよび RDS インスタンスのスキャニングサポートは Limited Availability です。利用登録するには、<strong>アクセスリクエスト</strong>をクリックしてください。
{{< /callout >}}

[Sensitive Data Scanner][8] が有効な場合、Amazon S3 バケットおよび RDS インスタンス内の機密データをカタログ化および分類することができます。

Sensitive Data Scanner は、[Agentless スキャナ][1]をクラウド環境にデプロイすることで機密データをスキャンします。これらのスキャナインスタンスは [Remote Configuration][10] を介してすべての S3 バケットと RDS インスタンスの一覧を取得し、各データストア内の CSV や JSON といったテキストファイル、およびテーブルを時間をかけてスキャンする指示が設定されています。Sensitive Data Scanner は[すべてのルールライブラリ][11]を活用して一致を検索します。一致が見つかった場合、その位置情報がスキャナインスタンスから Datadog に送信されます。データストアとそのファイルは環境内でのみ読み取られ、機密データが Datadog に送信されることはありません。

Sensitive Data Scanner は機密データの一致を表示するとともに、[Cloud Security Management][9] が検出した機密データストアに影響するセキュリティ問題も表示します。任意の問題をクリックすると、Cloud Security Management 内でトリアージおよび修正を続行できます。

## クラウドサービスプロバイダーの費用

Agentless Scanning を使用する場合、クラウド環境でスキャナを稼働させるための追加コストが発生します。12 時間ごとに確実にスキャンを行いつつコストを最適化するために、Datadog はデフォルトテンプレートとして [Terraform を用いた Agentless Scanning][6] のセットアップを推奨します。これにより、クロスリージョンのネットワーキングを回避できます。

スキャナコストの見積もりについては、[Datadog カスタマーサクセスマネージャー][7]までお問い合わせください。

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
[11]: /ja/sensitive_data_scanner/library_rules/