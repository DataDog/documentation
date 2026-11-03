---
aliases:
- /ja/agent/security/
description: Datadog Agent Security 対策
further_reading:
- link: /data_security/
  tag: ドキュメント
  text: Datadog に送信されるデータの主なカテゴリを確認する
title: Agent Data Security
---
<div class="alert alert-info">このページでは、Datadog に送信されるデータのセキュリティについて説明します。クラウドおよびアプリケーションのセキュリティ製品や機能をお探しの場合は、<a href="/security/" target="_blank">Security</a>セクションをご覧ください。</div>

Datadog サービスへのデータ送信は、ローカルにインストールされた [Agent][1] を使用するか、[HTTP API][2] を通じて行うことができます。Datadog の使用に Datadog Agent が必須というわけではありませんが、大多数のお客様が Agent を活用しています。この記事では、ご利用の環境を安全に保つために利用可能な主なセキュリティ機能と特徴について説明します。

## Agent の分布 {#agent-distribution}

Agent の公式リポジトリおよびバイナリパッケージには署名が施されています。以下の公開鍵のいずれかと照合して、分布チャネルを確認してください。

- Linux DEB パッケージおよびリポジトリメタデータ:
  - [D18886567EABAD8B2D2526900D826EB906462314][18]
  - [5F1E256061D813B125E156E8E6266D4AC0962C7D][15]
  - [D75CEA17048B9ACBF186794B32637D44F14F620E][4]
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE][3]
- Linux RPM パッケージおよびリポジトリメタデータ:
  - [2416A37757B1BB0268B3634B52AFC5994F09D16B][17]
  - [7408BFD56BC5BF0C361AAAE85D88EEA3B01082D3][16]
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915][5]
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3][6]
- MacOS PKG:
  - Apple 証明書のフィンガープリント `FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA`

Debian および Ubuntu では、`datadog-agent` パッケージは `datadog-signing-keys` パッケージとソフト依存関係にあり、これにより上記のキーが APT によって信頼されます。パッケージを更新し続けることで、最新の署名キーがシステムに確実に存在するようにします。

### Windows MSI {#windows-msi}

Windows で Datadog Agent インストーラーファイルの署名を検証するには、`Get-AuthenticodeSignature` の出力を`FormatList` (`fl`) にパイプし、以下を確認します。
- ステータスが有効であること
- 証明書が `Datadog, Inc` によって署名されていること
- 発行者が `DigiCert` であること

たとえば、`ddagent-cli-7.49.1.msi` という名前の .msi ファイルを検証するには、次のようにします。
{{< code-block lang="powershell" >}}
Get-AuthenticodeSignature ddagent-cli-7.49.1.msi | fl
{{< /code-block >}}

コマンドの出力が `A certificate chain could not be built to a trusted root authority` である場合、マシンで DigiCert ルート CA の更新が必要な可能性があります。

## 情報セキュリティ {#information-security}

Datadog Agent は、デフォルトで TLS 暗号化された TCP コネクションを介して Datadog にデータを送信します。バージョン 6 以降、Agent は Datadog への接続時に最小 TLS バージョンを強制するように構成できます。PCI 要件を満たすためなどに強力な暗号化の使用が必要な場合は、Agent v6/7 を使用し、Agent の構成ファイルで `min_tls_version: 'tlsv1.2'` 設定、または Agent 6.39.0/7.39.0 未満の場合は `force_tls_12: true` を設定します。

## ネットワークとプロキシ {#networking-and-proxying}

Datadog は SaaS 製品であるため、監視データを送信するには、ネットワークからパブリックインターネットへのアウトバウンドコネクションを確立する必要があります。トラフィックは、デフォルトで常に Agent から Datadog への TLS 暗号化 TCP コネクションによって開始されます。Datadog から Agent へのセッションが開始されることはありません。必要な Datadog ドメインとポートをリストに追加するためのファイアウォールの設定に関する詳細については、Agent の[ネットワーク][7]ページを参照してください。さらに、パブリックインターネットへの直接接続がないホストや、アウトバウンドトラフィックが制限されているホストを監視する場合は、[プロキシ][8]から監視データを送信することを検討してください。

## Agent ログの難読化 {#agent-logs-obfuscation}

Datadog Agent は、必要に応じて [Agent のトラブルシューティング][9]をサポートするためにローカルログを生成します。安全上の予防措置として、これらのローカルログは、認証情報 (API キー、パスワード、トークンのキーワードなど) を示す可能性のある特定のキーワードやパターンについてフィルタリングされ、ディスクに書き込まれる前に難読化されます。

## ローカル HTTPS サーバー {#local-https-server}

Agent v6/7 は、実行中の Agent と Agent ツール (`datadog-agent` コマンドなど) 間の通信を容易にするために、ローカル HTTPS API を公開しています。API サーバーにはローカルネットワークインターフェース (`localhost/127.0.0.1`) からのみアクセスでき、認証は Agent を実行しているユーザーのみが読み取り可能なトークンを通じて強制されます。ローカル HTTPS API への通信は、`localhost` での盗聴を防ぐために転送時に暗号化されます。

## Agent GUI {#agent-gui}

Agent v6/7 にはデフォルトでグラフィカルユーザーインターフェース (GUI) がバンドルされており、デフォルトの Web ブラウザで起動します。GUI は、Agent の構成ファイルを開く機能を含め、正しいユーザー権限を持つユーザーが起動した場合にのみ起動します。GUI は、ローカルネットワークインターフェース (`localhost/127.0.0.1`) からのみアクセス可能です。最後に、GUI サーバーとのすべての通信の認証や、クロスサイトリクエストフォージェリ (CSRF) 攻撃からの保護に使用されるトークンを GUI が生成および保存するため、ユーザーの Cookie を有効にする必要があります。必要に応じて、GUI を完全に無効にすることも可能です。

## Agent のセキュリティスキャン {#agent-security-scans}

Datadog の Vulnerability Management プログラムには、コアとなるサポートサービスのアクティブスキャンを含め、サポートインフラストラクチャーおよびアプリケーションコンポーネントの定期的な評価が含まれています。Datadog Security チームは、構成やソフトウェアの脆弱性を特定するために定期的にスキャンを実施し、Datadog の Vulnerability Management ポリシーに従って検出結果の修正を追跡します。

特に Container Agent に関しては、Datadog は一般提供 (GA) リリースとリリース候補 (RC) リリースの両方に対して、定期的に脆弱性の静的解析を実施しています。Datadog Container Agent は [Docker Agent][10] で言及されているパブリックレジストリで見つけることができ、さらに Datadog Agent のソースコードはオープンソースです。これにより、お客様は独自のニーズを満たすペースで、好みのツールを使用して脆弱性スキャンを実行できるようになります。これは、Datadog Agent の潜在的な脆弱性を監視したいお客様に必要な可視性を提供します。

Datadog のセキュリティに関するバグを発見したと思われる場合は、[問題を報告][11]を参照してください。
特定の CVE のステータスをチェックするには、[Public Artifact Vulnerabilities ページ][19]をご覧ください。詳細については、通常のサポートプロセスを通じて [Datadog サポート][12]にお問い合わせください。Datadog のウェブサイトからサポートチケットを送信する際は、{{< ui >}}Product type{{< /ui >}} フィールドを {{< ui >}}Vulnerability Inquiry on Datadog Product{{< /ui >}} に設定してください。

## 非特権ユーザーとしての実行 {#running-as-an-unprivileged-user}

デフォルトでは、Agent は Linux 上では `dd-agent` ユーザーとして、[Windows][13] 上では `ddagentuser` アカウントとして実行されます。例外は以下のとおりです。

- `system-probe` は、Linux 上では `root` として、Windows 上では `LOCAL_SYSTEM` として実行されます。
- `process-agent` は、Windows 上では `LOCAL_SYSTEM` として実行されます。
- `security-agent` は、Linux 上では `root` として実行されます。

## シークレット管理 {#secrets-management}

Agent の構成ファイルにシークレットをプレーンテキストで保存することを避けたい場合は、[シークレット管理][14]パッケージを活用できます。このパッケージを使用すると、Agent はユーザーが提供した実行可能ファイルを呼び出してシークレットの取得や復号を処理し、その後 Agent がメモリ内に読み込むことができます。実行可能ファイルは、お好みの鍵管理サービス、認証方法、継続的インテグレーションワークフローに合わせて設計できます。

詳細については、[シークレット管理][14]のドキュメントをご覧ください。

## テレメトリ収集 {#telemetry-collection}

{{< site-region region="gov,gov2" >}}

政府機関以外のサイト上の Agent は、Datadog Agent に関する環境情報、パフォーマンス情報、機能の使用状況情報を収集します。Agent が政府機関のサイトを検出した場合、または [Datadog Agent FIPS Proxy][1] が使用されている場合、Agent はこのテレメトリ収集を自動的に無効にします。そのような検出が不可能な場合 (プロキシが使用されている場合など)、Agent のテレメトリは送信されますが、Datadog のインテークで直ちに破棄されます。

このデータが最初に送信されることを防ぐため、以下の例に示すように、Agent 構成ファイルの `agent_telemetry` 設定を更新して Agent のテレメトリを明示的に無効にすることを Datadog は推奨しています。

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "環境変数" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}
[1]: https://docs.datadoghq.com/ja/agent/configuration/fips-compliance?tab=hostorvm&site=gov
{{< /site-region >}}
{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Datadog は、Datadog Agent に関する環境情報、パフォーマンス情報、および機能の使用状況情報を収集する場合があります。これには、Datadog Agent のサポートおよびさらなる改善を目的とした、難読化されたスタックトレースを含む Datadog Agent の診断ログやクラッシュダンプが含まれる場合があります。

以下の例に示すように、Agent 構成ファイルで `agent_telemetry` 設定を更新することで、このテレメトリ収集を無効にできます。
{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
agent_telemetry:
  enabled: false
```
{{% /tab %}}
{{% tab "環境変数" %}}

```bash
DD_AGENT_TELEMETRY_ENABLED=false
```
{{% /tab %}}
{{< /tabs >}}

**テレメトリコンテンツ:**

最新のテレメトリコンテンツを表示するには、次のコマンドを実行します。

```bash
agent diagnose show-metadata agent-telemetry
```

| メタデータ ([ソース][1]) |
| ---------------------- |
| マシン ID             |
| マシン名           |
| OS                     |
| OS バージョン             |
| Agent バージョン          |

| メトリクス ([ソース][2])                       | 説明                                                                                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **チェック**                                  |                                                                                                                        |
| checks.execution_time                       | チェックの実行時間 (ミリ秒)                                                                                 |
| pymem.inuse                                 | Python インタープリターによって割り当てられたバイト数                                                                    |
| **ログとメトリクス**                        |                                                                                                                        |
| dogstatsd.udp_packets_bytes                 | DogStatsD UDP パケットのバイト数                                                                                            |
| dogstatsd.uds_packets_bytes                 | DogStatsD UDS パケットのバイト数                                                                                            |
| dogstatsd_client.bytes_sent                 | DogStatsD クライアントによって送信された合計バイト数                                                                                  |
| dogstatsd_client.bytes_dropped              | DogStatsD クライアントによって破棄された合計バイト数                                                                               |
| dogstatsd_client.bytes_dropped_queue        | DogStatsD クライアントの送信キューがいっぱいであるために破棄された合計バイト数                                                    |
| dogstatsd_client.bytes_dropped_writer       | DogStatsD クライアントライターが送信できないために破棄された合計バイト数                                                 |
| logs.auto_multi_line_aggregator_flush       | Agent によって集約された複数行ログの数                                                                       |
| logs.auto_multi_line_default_total_lines    | 自動複数行検出のデフォルトに依存するソースに対して、検出アグリゲーターによって処理されたログ行の合計数           |
| logs.auto_multi_line_default_would_combine  | 自動複数行検出がデフォルトで有効になっていた場合に結合される行数                              |
| logs.auto_multi_line_default_would_truncate | 自動複数行検出がデフォルトで有効になっていた場合に切り捨てられるグループ内の行数                   |
| logs.bytes_missed                           | Agent が消費する前に失われたバイトの合計数 (例: ログローテーション後など)                 |
| logs.bytes_sent                             | エンコード前に送信されたバイトの合計数 (該当する場合)                                                              |
| logs.decoded                                | デコードされたログの合計数                                                                                           |
| logs.dropped                                | 破棄されたログの合計数                                                                                           |
| logs.encoded_bytes_sent                     | エンコード後に送信された合計バイト数 (該当する場合)                                                               |
| logs.http_connectivity_check                | HTTP 接続チェックの回数、ステータスでタグ付け (成功または失敗)                                               |
| logs.http_connectivity_failure              | HTTP 接続チェックの失敗回数、根本原因でタグ付け (dns、tls、timeout、connection、http_status、other)    |
| logs.http_connectivity_retry_attempt        | HTTP 接続の再試行回数、ステータスでタグ付け (成功または失敗)                                       |
| logs.restart_attempt                        | Agent の再起動試行回数、ステータスおよびターゲットトランスポートでタグ付け                                             |
| logs.sender_latency                         | HTTP 送信者のレイテンシー (ミリ秒)                                                                                    |
| logs.truncated                              | Agent によって切り捨てられたログの合計数                                                                            |
| logs_destination.destination_workers        | ログ送信先ごとのアクティブな HTTP コネクションの最大数                                                          |
| point.dropped                               | 破棄されたメトリクスの合計数                                                                                        |
| point.sent                                  | 送信されたメトリクスの合計数                                                                                           |
| transactions.input_count                    | 受信トランザクション数                                                                                             |
| transactions.input_bytes                    | 受信トランザクションのペイロードサイズ (バイト単位)                                                                             |
| transactions.success                        | 成功したトランザクション数                                                                                           |
| transactions.success_bytes                  | 成功したトランザクションのペイロードサイズ (バイト単位)                                                                          |
| transactions.requeued                       | トランザクションの再キュー数                                                                                              |
| transactions.retries                        | トランザクションの再試行数                                                                                                |
| **データベース**                                |                                                                                                                        |
| oracle.activity_samples_count               | クエリアクティビティの測定で取得した行数 (収集されたアクティビティサンプル数)                              |
| oracle.activity_latency                     | クエリアクティビティの取得時間 (ミリ秒単位)                                                                        |
| oracle.statement_metrics                    | データベースメトリクスの取得時間 (ミリ秒単位)                                                                      |
| oracle.statement_plan_errors                | 実行計画の取得におけるエラー数                                                                         |
| postgres.collect_activity_snapshot_ms       | アクティビティスナップショットの取得時間 (ミリ秒単位)                                                                          |
| postgres.collect_relations_autodiscovery_ms | Autodiscovery リレーションの収集時間 (ミリ秒単位)                                                               |
| postgres.collect_statement_samples_ms       | ステートメントサンプルの取得時間 (ミリ秒単位)                                                                          |
| postgres.collect_statement_samples_count    | ステートメントサンプル収集のために取得した合計行数                                                                        |
| postgres.collect_stat_autodiscovery_ms      | Autodiscovery 統計の収集時間 (ミリ秒単位)                                                                    |
| postgres.get_new_pg_stat_activity_ms        | `pg_stat_activity` の取得時間 (ミリ秒単位)                                                                         |
| postgres.get_new_pg_stat_activity_count     | 収集するために取得された合計行数 `pg_stat_activity`                                                                       |
| postgres.get_active_connections_ms          | アクティブな接続の取得時間 (ミリ秒単位)                                                                         |
| postgres.get_active_connections_count       | アクティブな接続を取得するために取得した合計行数                                                                           |
| postgres.schema_tables_elapsed_ms           | Postgres スキーマ内のテーブル収集時間                                                                              |
| postgres.schema_tables_count                | Postgres スキーマ内のテーブル総数                                                                                        |
| **API**                                     |                                                                                                                        |
| api_server.request_duration_seconds         | CLI コマンド実行パフォーマンス (実行された場合)                                                                       |
| **イベント**                                  |                                                                                                                        |
| agent_bsod                                  | Agent 関連のブルースクリーン (BSOD) データであり、BugCheck コード、関連する 4 つの引数、およびシンボル化されていないクラッシュ時のコールスタックを含む |
| **Service Discovery**                       |                                                                                                                        |
| service_discovery.discovered_services       | Agent の Service Discovery 機能によって検出されたサービス数                                                   |
| **Autodiscovery**                          |                                                                                                                        |
| autodiscovery.discovery_queue_depth         | 現在、Agent の integration discovery キューにあるサービス数                                                |
| autodiscovery.discovery_results             | 結果 (成功または失敗) 別にタグ付けされた、Agent の integration discovery 試行回数                             |
| **GPU Monitoring**                          |                                                                                                                        |
| gpu.device_total                            | システム内の GPU 総数                                                                                     |
| **APM**                                     |                                                                                                                        |
| trace.enabled                               | trace-agent プロセスが実行中かどうか。                                                                           |
| trace.working                               | trace-agent プロセスがトレースを受信および送信しているかどうか。                                                      |
| **Synthetic Monitoring**                              |                                                                                                                        |
| synthetics_agent.checks_received            | 受信したテストの数                                                                                               |
| synthetics_agent.checks_processed           | 実行されたテストの数                                                                                               |
| synthetics_agent.error_test_config          | テスト構成エラーの数                                                                                           |
| synthetics_agent.traceroute_error           | traceroute エラーの数                                                                                            |
| synthetics_agent.evp_send_result_failure    | 結果送信時のエラー数                                                                                  |
| **Cluster Agent**                           |                                                                                                                        |
| admission_webhooks.mutation_attempts        | Admission Webhook のミューテーション試行回数                                                                          |
| admission_webhooks.library_injection_attempts | ライブラリインジェクションの試行回数                                                                                 |
| admission_webhooks.library_injection_errors | ライブラリインジェクションのエラー数                                                                                     |
| admission_webhooks.patcher_errors           | Admission Webhook patcher のエラー数                                                                             |
| admission_webhooks.rc_provider_configs      | リモート構成プロバイダー設定の数                                                                        |
| admission_webhooks.rc_provider_configs_invalid | 無効なリモート構成プロバイダー設定の数                                                             |
| admission_webhooks.image_resolution_attempts | イメージ解決の試行回数                                                                                   |
| autodiscovery.errors                        | Autodiscovery エラーの数                                                                                         |
| autodiscovery.watched_resources             | Autodiscovery で監視されているリソースの数                                                                              |
| cluster_checks.configs_dispatched           | ディスパッチされたクラスターチェック構成の数                                                                      |
| cluster_checks.configs_dangling             | ダングリング状態のクラスターチェック構成の数                                                                        |
| cluster_checks.configs_info                 | ディスパッチされたクラスターチェックの名前                                                                             |
| cluster_checks.unscheduled_check            | スケジュールされていないクラスターチェックの数                                                                                   |
| instrumentation_controller.resources        | コントローラーによって追跡されている `DatadogInstrumentation` リソースの数                                                 |
| instrumentation_controller.reconciliations  | セクションとステータスでタグ付けされた、`DatadogInstrumentation` セクションの調整試行回数                       |
| language_detection_patcher.patches          | Language Detection Patcher による patches の数                                                                           |
| tagger.stored_entities                      | Tagger に保存されているエンティティの数                                                                                |
| workloadmeta.stored_entities                | WorkloadMeta に保存されているエンティティの数                                                                              |
| workloadmeta.pull_errors                    | WorkloadMeta のプルエラー数                                                                                     |
| appsec_injector.watched_changes             | AppSec injector が監視対象リソースに対して検出した変更の数                                                |
| appsec_injector.sidecar_mutations           | AppSec injector の sidecar admission の結果 (ポッドの変更および削除) の数                                       |
| agent_performance.containers_restarts       | Cluster Agent および Cluster Checks Runner ポッドのコンテナの再起動回数                                      |
| agent_performance.containers_terminated     | 理由別にタグ付けされた、Cluster Agent および Cluster Checks Runner ポッドのコンテナの終了回数                |
| agent_performance.memory_usage              | Cluster Agent および Cluster Checks Runner ポッドのコンテナのランタイムメモリ使用量の合計 (バイト単位)                   |
| agent_performance.memory_limit              | Cluster Agent および Cluster Checks Runner ポッドのコンテナのランタイムメモリ制限の合計 (バイト単位)                  |
| agent_performance.cpu_usage                 | Cluster Agent および Cluster Checks Runner ポッドのコンテナのランタイム CPU 使用量の合計 (CPU コア単位)                  |
| **eBPF**                                    |                                                                                                                        |
| ebpf.core_load_success                      | eBPF CO-RE プログラムの読み込み成功回数                                                                    |
| ebpf.core_load_error                        | eBPF CO-RE プログラムの読み込みエラー回数                                                                         |
| ebpf.core_remoteconfig_success              | リモート構成から BTF (BPF Type Format) データを正常にダウンロードした回数                                 |
| ebpf.core_remoteconfig_error                | リモート構成からの BTF データのダウンロード中に発生したエラーの数                                                        |

該当するメトリクスのみが送信されます。たとえば、DBM が有効になっていない場合、データベース関連のメトリクスは一切送信されません。


[1]: https://github.com/DataDog/datadog-agent/blob/4dc6ed6eb069bdea7e93f2d267ac5086a98c968c/comp/core/agenttelemetry/impl/sender.go#L218-L221
[2]: https://github.com/search?q=repo%3ADataDog%2Fdatadog-agent+content%3A%2Fvar+defaultProfiles%2F+path%3Acomp%2Fcore%2Fagenttelemetry%2Fimpl%2Fconfig.go+content%3A%2Fprofiles%3A%2F+content%3A%2F-+name%3A+checks%2F+content%3A%2Fmetric%3A%2F+content%3A%2Fexclude%3A%2F&type=code

{{< /site-region >}}

### 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/api/
[3]: https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public
[4]: https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public
[5]: https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
[6]: https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
[7]: /ja/agent/faq/network/
[8]: /ja/agent/configuration/proxy/
[9]: /ja/agent/troubleshooting/
[10]: /ja/containers/docker/?tab=standard
[11]: https://www.datadoghq.com/security/?tab=contact
[12]: https://www.datadoghq.com/support/
[13]: /ja/agent/faq/windows-agent-ddagent-user/
[14]: /ja/agent/configuration/secrets-management/
[15]: https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public
[16]: https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
[17]: https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
[18]: https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public
[19]: /ja/data_security/guide/public_artifact_vulnerabilities/