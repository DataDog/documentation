---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /ja/security/cloud_security_management/setup/csm_pro/agent/linux/
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: LinuxでのCloud Securityの設定
type: multi-code-lang
---
以下の手順に従って、設定ミスとVulnerability Managementを有効にします。

{{< partial name="security-platform/CSW-billing-note.html" >}}


## 前提条件 {#prerequisites}

- Datadog Agentバージョン`7.46`以降。

## インストール {#installation}

パッケージベースのデプロイメントの場合は、パッケージマネージャーを使用して[Datadog packageをインストール][6]し、下記のファイルを更新してください。

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
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**注**: `enrichment.usage.enabled: true`にはDatadog Agent **7.79.0以降**が必要です。要件については、[ランタイムパッケージの優先順位付け](#runtime-package-prioritization-preview)セクションを参照してください。

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**注**: `languages`アナライザーにはDatadog Agent **7.70以降**が必要です。有効にすると、OSパッケージに加え、npm、pip、Maven/Gradle、NuGet、Goモジュール、Cargo、Bundlerなどのパッケージマネージャーで管理されているアプリケーションライブラリの脆弱性を検出します。`analyzers`フィールドが省略された場合、コンテナイメージについてはOSパッケージのみがスキャンされます。全リストについては、[サポートされているアプリケーションライブラリのパッケージマネージャー](#supported-application-library-package-managers)を参照してください。

### サポートされているアプリケーションライブラリのパッケージマネージャー {#supported-application-library-package-managers}

`languages`アナライザーは、以下のパッケージエコシステムを対象としています。

| エコシステム | パッケージマネージャー / フォーマット |
|-----------|--------------------------|
| Ruby | Bundler、GemSpec |
| Rust | Cargo、Rustバイナリ |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), Gradle lock, Sbt lock |
| JavaScript | npm (package-lock.json), Yarn, pnpm, Node package |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Pythonパッケージ（egg）、pip、Pipenv、Poetry、uv、Condaパッケージ、Conda環境 |
| Go | Goバイナリ、Goモジュール |
| C/C++ | Conan lock |
| Swift / Objective-C | CocoaPods、Swift |
| Dart | PubSpec lock |
| Elixir | Mix lock |
| Julia | Julia |

## ランタイムパッケージの優先順位付け（プレビュー） {#runtime-package-prioritization-preview}

ランタイムパッケージの優先順位付けは、コンテナイメージ内のどのパッケージがランタイムで使用されているかを特定します。これにより、インストールされているが一度も実行されていないパッケージの脆弱性よりも、実際に実行されるコードの脆弱性を優先的に対処できます。

有効にすると、AgentはeBPFを使用してワークロードでのファイルアクセスを監視し、そのイメージの脆弱性調査結果にこれらのシグナルを追加します。

| シグナル | 内容 |
|--------|-------------------|
| パッケージが実行中 | パッケージのファイルが、実行中のプロセスによってアクセスされたことが確認されました。|
| ルートプロセスによってアクセスされました | パッケージが、ルート（UID 0）として実行されているプロセスによってアクセスされました。|
| SUIDバイナリが存在します | パッケージにはSUIDビットが設定されたバイナリが含まれており、特権昇格を可能にする可能性があります。|

*パッケージが実行中*は、[Runtime Prioritization Engine][8]の**到達可能性**ディメンションに情報を提供します。これらのシグナルを直接クエリするには、「[ランタイムシグナルによる調査結果のフィルタリング][9]」を参照してください。

**要件**：
- Datadog Agent **7.79.0以降**。
- Linuxのみ（eBPF依存関係）。サポートされているディストリビューションとカーネルバージョンについては、[Workload Protection setup][10]を参照してください。

ランタイムシグナルは、コンテナイメージの脆弱性調査において、オペレーティングシステムのパッケージマネージャー（`apt`、`yum`、または`apk`）によってインストールされたパッケージに適用されます。

あなたの`enrichment`ファイルの`sbom`セクションに`datadog.yaml`ブロックを追加します。

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

変更を適用した後、Agentを再起動してください。

セットアップを確認するには、[ランタイムシグナル][9]で脆弱性調査をフィルタリングしてください。

**注**：

- また、以下の[Agent install script][5]を使用して、設定ミスとThreat Detectionを自動的に有効にすることもできます。

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Agent install scriptを使用して設定ミスとVulnerability Managementを有効にする場合は、`datadog.yaml`ファイルを手動で更新して、設定ミスについては`host_benchmarks`を、Vulnerability Managementについては`sbom`および`container_image`を有効にする必要があります。

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