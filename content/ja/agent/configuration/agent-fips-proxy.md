---
algolia:
  rank: 80
  tags:
  - fips
  - fips proxy
  - compliance
  - fedramp
  - govcloud
alias:
- /agent/guide/agent-fips-proxy
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentation
  text: Agent Proxy Configuration
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Monitor highly regulated workloads with Datadog's FIPS-enabled Agent
title: Datadog FIPS Compliance
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">The Datadog Agent FIPS Proxy is available only in the US1-FED region.</a></div>
{{< /site-region >}}

The Datadog Agent FIPS Proxy ensures that communication between the Datadog Agent and Datadog uses FIPS-compliant encryption.

The Datadog Agent FIPS Proxy is a separately distributed component that you deploy on the same host as the Datadog Agent. The proxy acts as an intermediary between the Agent and Datadog intake. The Agent communicates with the Datadog Agent FIPS Proxy, which encrypts payloads using a FIPS 140-2 validated cryptography and relays the payloads to Datadog. The Datadog Agent and the Agent FIPS Proxy must be configured in tandem to communicate with one another.

## Supported platforms and limitations

The Datadog Agent FIPS Proxy's compliance is based on its use of the FIPS 140-2 validated [Cryptographic Module - Certificate #4282][1]. See the related [security policy][2] for information about validated operating environments and restrictions.

**It is your responsibility to ensure operating environment compliance with the security policy and wider FIPS guidance.**

Supported platforms (64-bit x86):

|||
| ---  | ----------- |
| Bare metal and VMs | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12 (beta)|
| Cloud and container| Amazon ECS<br>AWS EKS (Helm)|

**Note**: arm64 architecture is available in beta

Supported products (Agent 7.45+):

- Metrics
- Logs
- APM traces
- APM profiles
- Instrumentation Telemetry
- Processes
- Orchestrator Explorer
- Runtime Security

The Datadog Agent FIPS Proxy does **not** support the following:

- Serverless Monitoring
- Communication between Cluster Agent and Node Agents
- Agent integrations
- Outbound communication to anything other than GovCloud

## Prerequisites

- TCP port range available: 9803 to 9818
- Datadog Agent >= v7.41

## Install the Agent with FIPS support

{{< tabs >}}
{{% tab "Host or VM" %}}

### Install the Agent on a new host

To install the Datadog Agent with the Datadog Agent FIPS Proxy, add `DD_FIPS_MODE=1` to the one-step install instructions on the [Datadog Agent Integration][1] page. For example:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Setting the `DD_FIPS_MODE` environment variable installs the FIPS package along with the Agent, and configures the Agent to use the proxy. There are no additional configuration steps if you're using this method, but you should [verify the installation](#verify-your-installation).

### Add the Datadog Agent FIPS proxy to an existing Agent

Follow the steps below to add the Datadog Agent FIPS proxy to an existing Agent installation.

#### Install the Datadog Agent FIPS Proxy package

1. Run the following commands to install the Datadog Agent FIPS Proxy:

   Debian:
   ```shell
   apt-get update && apt-get install datadog-fips-proxy
   ```
   RHEL and Fedora:
   ```shell
   yum makecache && yum install datadog-fips-proxy
   ```
   SLES:
   ```shell
   zypper refresh datadog && zypper install datadog-fips-proxy
   ```

1. The first time you perform an upgrade, copy the example configuration file to the appropriate location and restart the proxy. You do not need to copy the configuration in subsequent upgrades unless there are significant changes in the upstream proxy configuration:
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### Configure the Agent to use the Datadog Agent FIPS proxy

The Datadog Agent FIPS Proxy package comes pre-configured for use with the US1-FED datacenter. If you're upgrading an existing Datadog Agent, you **must** configure the Agent to use the proxy.

To configure the Agent to use the proxy, set `fips.enabled` to `true` and `fips.https` to `false` in the [Agent configuration file][2]:

```yaml
fips:
  enabled: true
  https: false
```

The `fips` setting is available in Agent versions >= 7.41. When the setting is enabled, the Datadog Agent redirects all of its communications to the Datadog Agent FIPS Proxy for supported products. This setting ignores custom URL options, such as `dd_url`.

The `https` option is set to `false` because the Agent uses HTTP to communicate with the proxy. The Datadog Agent FIPS Proxy runs on the same host as the Agent and relies on the host's security for protection of that communication.

**Host security and hardening are your responsibilities.**

<div class="alert alert-warning">The <code>fips.enabled</code> setting defaults to <code>false</code> in the Agent. It must be set to <code>true</code> to ensure all communications are forwarded through the Datadog Agent FIPS Proxy.<br><br><strong>If <code>fips.enabled</code> is not set to <code>true</code>, the Agent is not FIPS Compliant</strong>.</div>

### インストールの検証

アプリでメトリクス、トレース、ログが正しく報告されることを検証します。

メトリクスについては、接続性診断コマンドを実行し、すべてのチェックが通過することを検証します。

```shell
sudo -u dd-agent datadog-agent diagnose --include connectivity-datadog-core-endpoints
# For Agent version < 7.48, run the following command:
# sudo -u dd-agent datadog-agent diagnose datadog-connectivity
```

アプリで報告されるメトリクス、トレース、ログが表示されない場合は、[トラブルシューティング](#troubleshooting-a-bare-metal-or-vm-installation)セクションを参照してください。

### ログの表示

```shell
sudo journalctl -u datadog-fips-proxy
```

#### journald ログ構成

[ログ管理][3]を使用し、Datadog Agent FIPS Proxy のログを Datadog に送信したい場合は、Datadog Agent が journald からログを読み込むように設定します。

1. Agent の[コンフィギュレーションファイル][2]で、`logs_enabled` を `true` に設定し、Logs Agent を有効にします。[構成ディレクトリ][4]に、`fips_proxy.d/conf.yaml` に以下の内容のファイルを作成します。

   ```yaml
   logs:
     - type: journald
       source: datadog-fips-proxy
       include_units:
         - datadog-fips-proxy.service
   ```

1. `dd-agent` ユーザーが `systemd-journal` グループに属していることを確認してください。詳しくは、[journald インテグレーション][5]のドキュメントを参照してください。
1. [Agent を再起動します][6]。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/logs/
[4]: /ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[5]: /ja/integrations/journald/#configuration
[6]: /ja/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Amazon EKS の Helm" %}}
`values.yaml` ファイルに以下の値を設定します。

```yaml
fips:
  enabled: true
  use_https: false
```

The `fips` setting is available in Agent versions >= 7.41. When the setting is enabled, the Datadog Agent redirects all of its communications to the Datadog Agent FIPS Proxy for supported products. This setting ignores custom URL options, such as `dd_url`.

Agent がプロキシと通信するために HTTP を使用するため、`use_https` オプションは `false` に設定されています。Datadog Agent FIPS Proxy は Datadog Agent と同じホスト上で動作し、その通信を保護するためにホストのセキュリティに依存します。

**ホストのセキュリティとハードニングはお客様の責任です。**

<div class="alert alert-warning"><code>fips.enabled</code> の設定は、Agent のデフォルトで <code>false</code> に設定されています。すべての通信が Datadog Agent FIPS Proxy を介して転送されるようにするには、<code>true</code> に設定する必要があります。<br><br><strong><code>fips.enabled</code> が <code>true</code> に設定されていない場合、Agent は FIPS Compliant ではありません</strong>。</div>


{{% /tab %}}

{{% tab "Amazon ECS" %}}

Amazon ECS への FIPS プロキシのインストール方法については、[GOVCLOUD 環境向け FIPS プロキシ][1]をご参照ください。

[1]: /ja/containers/amazon_ecs/#fips-proxy-for-govcloud-environments
{{% /tab %}}

{{< /tabs >}}

## ホストまたは VM のインストールに関するトラブルシューティング

Datadog Agent FIPS Proxy のトラブルシューティングを行うには、以下を検証します。
- Datadog Agent と Datadog Agent FIPS Proxy が実行されている。
- Datadog Agent が、Datadog Agent FIPS Proxy と通信することができる。
- Datadog Agent FIPS Proxy が、Datadog インテークエンドポイントと通信することができる。

### プロキシステータスの確認

Datadog Agent FIPS Proxy の状態に関する情報を取得するには、次のコマンドを実行します。

```shell
sudo systemctl status datadog-fips-proxy
```

プロキシが動作している場合は、以下のような出力になるはずです。
```text
- datadog-fips-proxy.service - Datadog FIPS Proxy
  Loaded: loaded
    (/lib/systemd/system/datadog-fips-proxy.service;
      enabled; vendor preset: enabled)
  Active: active (running) since Tue 2022-07-19 16:21:15 UTC; 1min 6s ago
```

プロキシステータスが `inactive (dead)` の場合、Datadog Agent FIPS Proxy を起動します。

```shell
sudo systemctl start datadog-fips-proxy
```

プロキシステータスが `failed` の場合、Datadog Agent FIPS Proxy はエラーにより起動できませんでした。以下のコマンドを実行し、プロキシログを検索してエラーを探します。

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

### プロキシがソケットをバインドできない

If the proxy logs show a `bind socket` error, the proxy is trying to use a port that is already in use on the host. The Datadog Agent FIPS Proxy uses the TCP port range from 9803 up to and including 9818. Ports in this range must be available on the host and not used by other services.

次の例では、Datadog Agent FIPS Proxy は、ポート `9804` のソケットがすでに使用されているため、バインドすることができないことを示しています。

```text
[ALERT] (4518) : Starting frontend metrics-forwarder: cannot bind socket (Address already in use) [0.0.0.0:9804]
[ALERT] (4518) : [/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] Some protocols failed to start their listeners! Exiting.
```

### Agent がプロキシに接続できない

ネットワークの問題を確認するには、`/var/log/datadog/agent.log` のログを確認するか、以下を実行します。

```shell
datadog-agent diagnose --include connectivity-datadog-core-endpoints
# For Agent version < 7.48, run the following command:
# datadog-agent diagnose datadog-connectivity
```

以下などのエラーがないか確認します。
```text
connect: connection refused, context deadline exceeded (Client.Timeout exceeded while awaiting headers), or connection reset by peer
```

- [プロキシステータスの確認](#check-the-proxy-status)の手順に従って、Datadog Agent FIPS Proxy が実行していることを検証します。
- プロキシからのポート範囲が Agent からのポート範囲と一致することを検証します。

If the proxy is running and the port range is correct, a local firewall on the machine may be blocking the Agent's access to the proxy. Set your firewall to allow connections to TCP ports from 9804 to 9818.

プロキシがアクセス可能であることを検証するには、`curl` を使用します。

```shell
curl http://localhost:9804/
```

詳しくは、[Agent トラブルシューティング][3]をご覧ください。

### Datadog Agent FIPS Proxy が Datadog インテークに接続できない

`502`、`503` などの HTTP エラーがある場合、またはプロキシが空のレスポンスを返す場合、Datadog Agent FIPS Proxy は Datadog バックエンドにトラフィックを転送できないかもしれません。

以下で Datadog Agent FIPS Proxy のログを検証します。

```shell
sudo journalctl -u datadog-fips-proxy --no-pager
```

以下などのエラーがないか、ログを確認します。

```text
haproxy[292759]: [WARNING] (292759) : Server
datadog-api/mothership3 is DOWN, reason: Layer4 timeout, vcheck duration: 2000ms. 0 active and 0 backup servers left. 0 sessions active, 0 requeued, 0 remaining in queue.
[ALERT] (292759) : backend 'datadog-api' has no server available!
```

または

```text
haproxy[1808]: [WARNING] (1808) : Server
datadog-metrics/mothership2 is DOWN, reason: Layer4
connection problem, info: "Connection refused", check duration: 0ms. 0 active and 0 backup servers left. 0
sessions active, 0 requeued, 0 remaining in queue.
haproxy[1808]: [ALERT] (1808) : backend 'datadog-metrics' has no server available!
```

これらのエラーは、Datadog Agent FIPS Proxy がバックエンドシステムに連絡できないことを示しています。おそらく、ファイアウォールによってブロックされているか、他のネットワークの問題によるものです。Datadog Agent FIPS Proxy は、Datadog インテークエンドポイントへのインターネットアクセスが必要です。これらのエンドポイントの IP アドレスは、[API を通じて][4]見つけることができます。

Agent からのアウトバウンド接続については、[ネットワークトラフィック][5]のガイドを参照してください。

問題が解決しない場合は、[Datadog サポート][6]にお問い合わせください。

## よくある質問

**1. Datadog Agent と Datadog Agent FIPS Proxy は同じホストにある必要がありますか？**

はい、Datadog Agent FIPS Proxy と Datadog Agent が同じホスト上にない場合、FIPS コンプライアンスは保持されません。
同様に、`datadog.yaml` で `fips.enabled` オプションが `true` に設定されていない場合は、FIPS コンプライアンスは保持されません。

**2. ホストのハードニングは誰が行うのですか？**

ホストのセキュリティとハードニングは、Datadog のお客様であるあなたに責任があります。

**3. Datadog Agent FIPS Proxy イメージは、ハードニングされていますか？**

提供されるイメージはセキュリティを考慮して構築されていますが、CIS ベンチマーク勧告や DISA STIG 標準に対して評価されたものではありません。

**4. Agent のすべての入出力通信は FIPS に対応していますか？**

Datadog Agent FIPS Proxy は、Agent から発信される Datadog インテーク API エンドポイントを対象とした通信のみを保護します。つまり、Agent で終了する、または Agent から発信される他の形式の通信は、このソリューションでは FIPS に準拠しません。

**5. Cluster Agent と Node Agent 間の通信はすべて FIPS に対応していますか？**

Datadog Agent FIPS Proxy は、Cluster Agent から発信される Datadog インテーク API エンドポイントを対象とした通信のみを保護します。つまり、Cluster Agent で終了する、または Cluster Agent から発信される他の形式の通信は、このソリューションでは FIPS に準拠しません。

**6. デプロイやテストのニーズに合わせて Datadog Agent FIPS Proxy を再構築または再構成しても、FIPS コンプライアンスは維持されますか？**

Datadog Agent FIPS Proxy の再構築、再構成、変更が技術的に動作する設定であっても、Datadog Agent FIPS Proxy がドキュメントで説明されている通りに使用されない場合、Datadog は FIPS コンプライアンスを保証することはできません。

**7. Datadog Agent は、上記のインストールステップのすべてに従わなかったにもかかわらず、正しくデータを送信しています。私のセットアップは FIPS に準拠していますか？**

Datadog Agent FIPS Proxy がドキュメント通りに使用されていない場合、Datadog は FIPS コンプライアンスを保証できません。
正しい構成とは、Datadog Agent が `fips.enabled` オプションを設定して Datadog Agent FIPS Proxy と通信するように構成されていること、および Datadog Agent FIPS Proxy が実行していることです。

**8. Datadog Agent のリリースバージョンは、Datadog Agent FIPS Proxy のリリースバージョンと連動しますか？**

いいえ、Datadog Agent FIPS Proxy のリリースは、Datadog Agent のリリースから切り離されています。Datadog Agent と Datadog Agent FIPS Proxy がサポートするすべての製品を使用するには、Datadog Agent と Datadog Agent FIPS Proxy の両方のバージョンの最新版を使用します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /ja/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /ja/agent/configuration/network/#destinations
[6]: /ja/help/