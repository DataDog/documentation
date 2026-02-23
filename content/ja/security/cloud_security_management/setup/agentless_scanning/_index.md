---
aliases:
- /ja/security/agentless_scanning
- /ja/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: ドキュメント
  text: Cloud Security Vulnerabilities についてもっと読む
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: ドキュメント
  text: クラウドストレージ用に Sensitive Data Scanner をセットアップする
title: Cloud Security Agentless Scanning
---

## 概要

Agentless Scanning は、Datadog Agent をインストールする必要なく、クラウド インフラストラクチャー内に存在する脆弱性への可視性を提供します。Datadog は、クラウド リソース全体の可視性を得る最初のステップとして Agentless Scanning を有効化し、さらに深いセキュリティとオブザーバビリティのコンテキストのために、時間をかけてコア アセットに Datadog Agent をインストールすることを推奨します。

## 仕組み

リソースに対して [Agentless scanning の設定][1] を行うと、Datadog は [Remote Configuration][2] を通じて 12 時間間隔で自動スキャンをスケジュールします。スキャン サイクルの間、Agentless スキャナーは Lambda コードの依存関係を収集し、VM インスタンスのスナップショットを作成します。これらのスナップショットを用いて、Agentless スキャナーはスキャンを実行し、パッケージのリストを生成して Datadog に送信し、Lambda コードの依存関係とともに脆弱性を確認します。スナップショットのスキャンが完了すると、そのスナップショットは削除されます。機密情報や個人情報があなたのインフラストラクチャーの外部に送信されることはありません。

[Cloud Security 評価 フィルター][15] を設定している場合、Agentless Scanning はこれらのフィルターを適用し、設定した条件に合致するリソースだけをスキャンします。

以下の図は、Agentless Scanning がどのように機能するかを示しています。

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Agentless Scanning の動作を示す図" width="90%" >}}

1. Datadog は Remote Configuration を通してスキャン対象リソースを指定し、スキャンをスケジューリングします。

    **注**: スケジュール スキャンでは、すでに [Cloud Security が有効な Datadog Agent がインストールされているホスト](#agentless-scanning-with-existing-agent-installations) は対象外になります。Datadog は 12 時間ごとにリソースを継続的に再スキャンし、潜在的な脆弱性や弱点を最新の状態で把握できるようにします。

2. Lambda 関数に対しては、スキャナが関数のコードを取得します。
3. スキャナーは、稼働中の VM インスタンスで使用されているボリュームのスナップショットを作成します。これらのスナップショットはスキャン実行の基盤となります。スナップショット、またはコードを使用して、スキャナーはパッケージのリストを生成します。
4. スキャンが完了すると、収集されたホストに関する情報とパッケージのリストが Datadog に送信され、その他のデータはあなたのインフラストラクチャー内に留まります。スキャン サイクル中に作成されたスナップショットは削除されます。
5. 収集されたパッケージ一覧と Datadog がアクセス可能な Trivy 脆弱性データベースを活用して、Datadog はリソースおよびコード内で該当する脆弱性を特定します。

**注**:
- スキャナーは、あなたのインフラストラクチャー内で独立した VM インスタンスとして動作し、既存のシステムやリソースへの影響を最小限に抑えます。
- AWS では、スキャナー インスタンスがワークロードに応じて自動的にスケールします。スキャン対象のリソースがない場合は、スキャナーが 0 までスケール ダウンし、クラウド プロバイダーのコストを最小化します。
- スキャナは、インフラストラクチャー外部へ機密情報や個人情報を送信することなく、ホストからパッケージ一覧を安全に収集します。
- スキャナーは、レート制限に達することを防ぐため、クラウド プロバイダー API の使用を制限し、必要に応じて指数バックオフを用います。

## オン デマンド スキャン

デフォルトでは、Agentless Scanning が 12 時間ごとにリソースを自動でスキャンします。さらに On-Demand Scanning API を使えば、ホスト、コンテナ、Lambda 関数、S3 バケットなど、特定のリソースを指定して即時スキャンを実行できます。

次のようなときに便利です。
- 脆弱性が修正済みかどうかを確認したい
- 新しくデプロイしたリソースの結果をすぐに確認したい
- 本番デプロイの前にセキュリティ ポスチャを検証したい

詳細は [On-Demand Scanning API ドキュメント][14] を参照してください。

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

そのため Agentless Scanning は、[Vulnerability Management][5] 向けに設定済みの Datadog Agent が導入されているリソースを、スキャン対象から除外します。これにより Cloud Security は、Vulnerability Management を有効にした Datadog Agent のメリットを損なうことなく、リスクの全体像を漏れなく可視化できます。

以下の図は、既存の Agent インストールがある場合の Agentless Scanning の動作を示しています。

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Cloud Security の Vulnerability Management が有効な Datadog Agent が既にインストールされている環境で、Agentless Scanning がどのように動作するかを示す図" width="90%" >}}

## Cloud Storage のスキャン

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  Amazon S3 バケットと RDS インスタンスのスキャン サポートは Preview で提供中です。参加するには、<strong>Request Access</strong> をクリックしてください。
{{< /callout >}}

[Sensitive Data Scanner][8] を有効にすると、Amazon S3 バケット内の機密データをカタログ化し、分類できます。

Sensitive Data Scanner は、クラウド環境に [Agentless スキャナー][1] をデプロイして機密データを検出します。これらのスキャン用インスタンスは [Remote Configuration][10] を通じてすべての S3 バケットの一覧を取得し、CSV や JSON などのテキスト ファイルを継続的にスキャンするよう設定された手順に従って動作します。Sensitive Data Scanner は [ルール ライブラリ全体][11] を活用して一致箇所を検出します。一致が見つかると、その一致位置がスキャン用インスタンスから Datadog に送信されます。データ ストアとそのファイルはお客様の環境内で読み取られるだけで、機密データそのものが Datadog に送信されることはありません。

また Sensitive Data Scanner は、機密データ ストアに影響する [Cloud Security][9] 検出のセキュリティ上の問題もあわせて提示します。各問題をクリックすると、Cloud Security 内でトリアージと修復対応をそのまま進められます。

## クラウドサービスプロバイダーの費用

Agentless Scanning を使用する場合、スキャナーの実行およびクラウド環境の分析に対して、クラウド プロバイダーの追加コストが発生します。

クラウド構成はクラウド プロバイダーのコストに影響します。通常、[推奨構成][13] を使用した場合、年間あたりスキャン対象ホスト 1 台につき 1 USD 程度です。正確な金額についてはクラウド プロバイダーの情報を参照してください。これらの金額は Datadog の関与なく変更される可能性があります。

複数リージョンに分散した大規模なクラウド ワークロードの場合、リージョン間ネットワークを回避するために、Datadog は [Terraform による Agentless Scanning][6] の設定を推奨します。


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