---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /ja/security/cloud_security_management/setup/csm_pro/agent/linux/
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Linux での Cloud Security のセットアップ
type: multi-code-lang
---
以下の手順を使用して、Misconfigurations and Vulnerability Management を有効にします。

{{< partial name="security-platform/CSW-billing-note.html" >}}


## 前提条件 {#prerequisites}

- Datadog Agent バージョン `7.46` 以降。

## インストール {#installation}

パッケージベースのデプロイの場合は、パッケージマネージャーで [Datadog パッケージをインストール][6] し、以下のリストにあるファイルを更新します。

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**注**: `enrichment.usage.enabled: true` には Datadog Agent **7.79.0 以降**が必要です。要件については、[ランタイムパッケージの優先順位付け](#runtime-package-prioritization)セクションを参照してください。

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**注**: `languages` アナライザーには Datadog Agent **7.70 以降**が必要です。有効にすると、OS パッケージに加えて、npm、pip、Maven/Gradle、NuGet、Go モジュール、Cargo、Bundler などのパッケージマネージャーによって管理されるアプリケーションライブラリの脆弱性が検出されます。`analyzers` フィールドが省略されている場合、コンテナイメージの OS パッケージのみがスキャンされます。完全なリストについては、[サポートされているアプリケーションライブラリのパッケージマネージャー](#supported-application-library-package-managers)をご覧ください。

### サポートされているアプリケーションライブラリのパッケージマネージャー {#supported-application-library-package-managers}

`languages` アナライザーは、以下のパッケージエコシステムを対象としています。

| エコシステム | パッケージマネージャー/フォーマット |
|-----------|--------------------------|
| Ruby | Bundler、GemSpec |
| Rust | Cargo、Rust バイナリ |
| PHP | Composer |
| Java | Jar、Maven (pom.xml)、Gradle lock、Sbt lock |
| JavaScript | npm (package-lock.json)、Yarn、pnpm、Node パッケージ |
| .NET | NuGet、.NET Core、PackagesProps |
| Python | Python パッケージ (egg)、pip、Pipenv、Poetry、uv、Conda パッケージ、Conda 環境 |
| Go | Go バイナリ、Go モジュール |
| C/C++ | Conan ロック |
| Swift / Objective-C | CocoaPods、Swift |
| Dart | PubSpec ロック |
| Elixir | Mix ロック |
| Julia | Julia |

## ランタイムパッケージの優先順位付け {#runtime-package-prioritization}

ランタイムパッケージの優先順位付けは、コンテナイメージ内のどのパッケージがランタイムで使用されているかを特定します。これにより、インストールされているものの実行されないパッケージの脆弱性よりも、実際に実行されるコードの脆弱性を優先できます。

有効にすると、Agent は eBPF を使用してワークロードでのファイルアクセスを監視し、そのイメージの脆弱性調査結果にこれらのシグナルを追加します。

| シグナル | 内容 |
|--------|-------------------|
| パッケージ実行中 | パッケージのファイルが実行中のプロセスによってアクセスされていることが確認されました。|
| root プロセスによってアクセスされた | パッケージが root として実行されているプロセス (UID 0) によってアクセスされました。|
| SUID バイナリが存在する | パッケージには SUID ビットが設定されたバイナリが含まれており、特権昇格を可能にする可能性があります。|

*パッケージ実行中*は、[Runtime Prioritization Engine][8] の **Reachability** ディメンションをフィードします。これらのシグナルを直接クエリするには、[ランタイムシグナルによる検出結果のフィルタリング][9] を参照してください。

**要件**:
- Datadog Agent **7.79.0 以降**。
- Linux のみ (eBPF 依存関係)。サポートされているディストリビューションおよびカーネルバージョンについては、[Workload Protection のセットアップ][10] を参照してください。

ランタイムシグナルは、コンテナイメージの脆弱性検出結果で、オペレーティングシステムのパッケージマネージャー (`apt`、`yum`、または `apk`) によってインストールされたパッケージに適用されます。

`enrichment` ブロックを `datadog.yaml` ファイルの `sbom` セクションに追加します。

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

変更を適用した後、Agent を再起動してください。

セットアップを検証するには、脆弱性検出結果を [ランタイムシグナル][9] でフィルタリングします。

**注**:

- また、以下の [Agent インストールスクリプト][5] を使用して、誤構成と脅威検出を自動的に有効にすることもできます。

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Agent インストールスクリプトを使用して誤構成および Vulnerability Management を有効にする場合は、`datadog.yaml` ファイルを手動で更新して、誤構成には `host_benchmarks` を、Vulnerability Management には `sbom` および `container_image` を有効にする必要があります。

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/threats
[3]: /ja/security/cloud_security_management/vulnerabilities
[4]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /ja/getting_started/agent/#installation
[6]: /ja/agent/?tab=Linux
[7]: /ja/security/workload_protection/
[8]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[9]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[10]: /ja/security/workload_protection/setup/