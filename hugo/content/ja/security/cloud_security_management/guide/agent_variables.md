---
aliases:
- /ja/security/cloud_security_management/setup/agent_variables
title: Cloud Security Management Agent 変数
---

Datadog Agent には、Cloud Security Management で有効にできる環境変数がいくつかあります。この記事では、それぞれの環境変数の目的について説明します。

<table>
    <tr>
        <th>変数</th>
        <th>説明</th>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_ENABLED</code></td>
        <td>Cloud Security Posture Management (CSPM) Agent (セキュリティ Agent 内で実行) を有効にします。</td>
    </tr>
    <tr>
        <td><code>DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED</code></td>
        <td>CSPM ホストベンチマークを有効にします。CSPM Agent (<code>DD_COMPLIANCE_CONFIG_ENABLED</code>) が必要です。</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_ENABLED</code></td>
        <td>Cloud Workload Security (CWS) を有効にします。システムプローブとセキュリティ Agent の両方で有効にする必要があります。</td>
    </tr>
    <tr>
        <td><code>DD_SYSTEM_PROBE_ENABLED</code></td>
        <td>アドオン Agent であるシステムプローブを有効にします。トレース Agent やプロセス Agent 同様、vanilla Datadog Agent とは異なる機能をサポートします。主に NPM と CWS と一緒に使用されます。</td>
    </tr>
    <tr>
        <td><code>DD_RUNTIME_SECURITY_CONFIG_REMOTE<br>_CONFIGURATION_ENABLED</code></td>
        <td>デフォルトの Agent ルールの自動更新とカスタム Agent ルールの自動デプロイのためのリモート構成を有効にします。</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_ENABLED</code></td>
        <td>ソフトウェア部品表 (SBOM) 収集サブシステムを有効にします。</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_CONTAINER_IMAGE_ENABLED</code></td>
        <td>コンテナイメージ上での SBOM の収集を有効にします。</td>
    </tr>
    <tr>
        <td><code>DD_CONTAINER_IMAGE_ENABLED</code></td>
        <td>コンテナイメージを収集します。</td>
    </tr>
    <tr>
        <td><code>DD_SBOM_HOST_ENABLED</code></td>
        <td>ホストで SBOM の収集を有効にします。</td>
    </tr>
</table>