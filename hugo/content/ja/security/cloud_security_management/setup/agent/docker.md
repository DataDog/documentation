---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/docker
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/docker
code_lang: docker
code_lang_weight: 65
title: Docker での Cloud Security の設定
type: multi-code-lang
---
以下の手順を使用して、設定ミスと Vulnerability Management を有効にします。

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 前提条件 {#prerequisites}

- Datadog Agent バージョン `7.46` 以降。

## インストール {#installation}

以下のコマンドは、Docker 環境で Runtime Security Agent と `system-probe` を起動します:

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_CONTAINER_IMAGE_ENABLE=true
  -e DD_SBOM_ENABLED=true
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true
  -e DD_SBOM_HOST_ENABLED=true
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7

{{< /code-block >}}

## ランタイムパッケージの優先順位付け {#runtime-package-prioritization}

ランタイムパッケージの優先順位付けは、コンテナイメージ内のどのパッケージがランタイムで使用されているかを特定します。これにより、インストールされているが実行されていないパッケージの脆弱性よりも、実際に実行されているコードの脆弱性を優先できます。

有効にすると、Agent は eBPF を使用してワークロード上のファイルアクセスを監視し、そのイメージの脆弱性検索結果にこれらのシグナルを追加します:

| シグナル | その意味 |
|--------|-------------------|
| パッケージが実行中 | パッケージのファイルが、実行中のプロセスによってアクセスされていることが確認されました。|
| ルートプロセスによるアクセス| パッケージがルート権限 (UID 0) で実行されているプロセスによってアクセスされました。|
| SUID バイナリが存在| パッケージに SUID ビットが設定されたバイナリが含まれています。これは権限昇格を可能にする可能性があります。|

*パッケージが実行中*は、[Runtime Prioritization Engine][5] の **到達可能性**ディメンションに情報を提供します。これらのシグナルを直接クエリするには、[ランタイムシグナルによる検索結果のフィルタリング][6]をご覧ください。

**要件**:
- Datadog Agent **7.79.0 以降**。
- Linux のみ (eBPF 依存関係)。サポートされているディストリビューションとカーネルバージョンについては、[Workload Protection のセットアップ][7]をご覧ください。

ランタイムシグナルは、コンテナイメージの脆弱性検索結果において、オペレーティングシステムのパッケージマネージャー (`apt`、`yum`、または `apk`) によってインストールされたパッケージに適用されます。

Docker run コマンドに `DD_SBOM_ENRICHMENT_USAGE_ENABLED=true` を追加します:

{{< code-block lang="shell" >}}
docker run -d --name dd-agent \
  [... other flags ...] \
  -e DD_SBOM_ENABLED=true \
  -e DD_SBOM_CONTAINER_IMAGE_ENABLED=true \
  -e DD_SBOM_ENRICHMENT_USAGE_ENABLED=true \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
{{< /code-block >}}

セットアップを確認するには、[ランタイムシグナル][6]で脆弱性検索結果をフィルタリングします。

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/threats
[3]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[4]: /ja/security/workload_protection/
[5]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[6]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[7]: /ja/security/workload_protection/setup/