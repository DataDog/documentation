---
description: セットアップとインストールの説明に従って、クラウドワークロードセキュリティを開始します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: ブログ
  text: Datadog クラウドランタイムセキュリティの詳細はこちら
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: ブログ
  text: システムの Linux プロセスからセキュリティ脅威を検出する方法
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'PwnKit の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'Dirty Pipe の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: ブログ
  text: Dirty Pipe の脆弱性を利用したコンテナからの脱却
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: ブログ
  text: DNS ベースの脅威検出でネットワーク層での攻撃をキャッチ
kind: documentation
title: クラウドワークロードセキュリティの概要
---

## 概要

Datadog Agent がクラウドワークロードセキュリティに使用するモニタリングには、2 つのタイプがあります。

1. **ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。
2. **プロセス実行監視**により、ホストやコンテナ上の悪意のあるアクティビティのプロセス実行をリアルタイムで監視します。

## 要件

* Datadog Agent >= 7.27.0
* データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。CWS は以下の Linux ディストリビューションをサポートしています。
  * Ubuntu 18.04+
  * Debian 10+
  * Amazon Linux 2
  * Fedora 26 以上
  * SUSE 15 以降
  * CentOS/RHEL 7.6 以降
  * カスタムカーネルビルドはサポートされていません。

## インストール

{{< tabs >}}
{{< tab "Kubernetes" >}}

1. まだインストールしていない場合は、[Datadog Agent][1] (バージョン 7.27+) をインストールします。

2. `values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # values.yaml file
    datadog:

    # Add this to enable Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true

    # Add this to enable the collection of CWS network events, only for Datadog Agent version 7.36
          network:
            enabled: true
    ```

3. Agent を再起動します。
4. **Cloud SIEM がチェックされている場合、オプションとなります** [こちらの手順][2]に従って、Kubernetes の監査ログを収集します。


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes_audit_logs/
{{< /tab >}}

{{< tab "Docker" >}}

Docker 環境でランタイムセキュリティ Agent と `system-probe` を起動するには、次のコマンドを使用します。

{{< code-block lang="bash" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
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
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=true \ # CWS ネットワークイベントの収集を可能にするため
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{< /tab >}}

{{< tab "Debian" >}}

パッケージベースのデプロイメントでは、Datadog パッケージをデプロイする必要があります。`dkpg -i datadog-agent_7....deb` を実行します。

デフォルトでは、ランタイムセキュリティは無効になっています。有効にするには、datadog.yaml と system-probe.yaml ファイルの両方を適合させる必要があります。これらの構成を有効にするには、以下のコマンドを実行します。

{{< code-block lang="bash" filename="debian-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

# [Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

変更を適用したら、セキュリティ Agent と system-probe の両方を再起動します。

{{< /tab >}}

{{< tab "Fedora/CentOS" >}}

パッケージベースのデプロイメントでは、Datadog パッケージをデプロイする必要があります。`yum/dnf install datadog-agent_7....rpm` を実行します。

{{< code-block lang="bash" filename="fedora-centos-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

# [Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

{{< /tab >}}
{{< /tabs >}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}