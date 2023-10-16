---
algolia:
  rank: 80
  tags:
  - fips
  - fips proxy
  - コンプライアンス
  - fedramp
  - govcloud
disable_toc: false
further_reading:
- link: agent/proxy
  tag: Documentation
  text: Agent プロキシのコンフィギュレーション
kind: ガイド
title: Datadog FIPS コンプライアンス
---

{{< callout url="#" btn_hidden="true" >}}
  Datadog Agent FIPS Proxy は、公開ベータ版です。
{{< /callout >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">Datadog Agent FIPS Proxy は、US1-FED リージョンでのみ利用可能です。</a></div>
{{< /site-region >}}

Datadog Agent FIPS Proxy は、Datadog Agent と Datadog 間の通信が FIPS に準拠した暗号化を使用することを保証します。

Datadog Agent FIPS Proxy は、Datadog Agent と同じホストにデプロイする個別分散コンポーネントです。プロキシは、Agent と Datadog インテークとの間の仲介役として機能します。Agent は Datadog Agent FIPS Proxy と通信し、FIPS 140-2 で検証された暗号を使用してペイロードを暗号化し、ペイロードを Datadog にリレーします。

## 対応プラットフォームと制限

Datadog Agent FIPS Proxy のコンプライアンスは、FIPS 140-2 で検証された [Cryptographic Module - Certificate #4024][1] を使用していることに基づいています。検証された動作環境と制限については、関連する[セキュリティポリシー][2]を参照してください。

**セキュリティポリシーおよびより広範な FIPS ガイダンスに準拠した動作環境を確保することは、お客様の責任において行ってください。**

対応プラットフォーム (64 ビット x86 のみ):

|||
| ---  | ----------- |
| ベアメタルと VM | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04|
| クラウドとコンテナ| Amazon ECS<br>AWS EKS (Helm)|

対応製品 (Agent 7.45 以上):

- Metrics
- Logs
- APM トレース
- APM プロファイル
- Instrumentation Telemetry
- Processes
- Orchestrator Explorer
- Runtime Security

Datadog Agent FIPS Proxy は、以下をサポート**していません**。

- サーバーレスモニタリング
- Cluster Agent と Node Agent 間の通信
- Agent インテグレーション
- GovCloud 以外へのアウトバウンド通信

## 前提条件

- 利用可能 TCP ポート範囲: 9803〜9816
- Datadog Agent >= v7.41

## FIPS に対応した Agent のインストール

{{< tabs >}}
{{% tab "Host または VM" %}}

### 新しいホストへの Agent のインストール

Datadog Agent FIPS Proxy と一緒に Datadog Agent をインストールするには、[Datadog Agent インテグレーション][1]ページのワンステップインストール手順に `DD_FIPS_MODE=1` を追加します。例:

```shell
DD_API_KEY=<DD_API_KEY> \
DD_SITE="ddog-gov.com" \
DD_FIPS_MODE=1 \
bash -c "$(curl -L \
   https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

環境変数 `DD_FIPS_MODE` を設定すると、Agent と一緒に FIPS パッケージがインストールされ、Agent がプロキシを使用するように構成されます。この方法を使用する場合、追加の構成手順はありませんが、[インストールを検証する](#verify-your-installation)必要があります。

### Datadog Agent FIPS プロキシを既存の Agent に追加する

以下の手順に従って、既存の Agent インストールに Datadog Agent FIPS プロキシを追加します。

#### Datadog Agent FIPS Proxy パッケージのインストール

1. 以下のコマンドを実行し、Datadog Agent FIPS Proxy をインストールします。

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

1. アップグレードを初めて実行するときは、例のコンフィギュレーションファイルを適切な場所にコピーして、プロキシを再起動します。上流のプロキシ構成に大きな変更がない限り、その後のアップグレードで構成をコピーする必要はありません。
   ```shell
   sudo cp /etc/datadog-fips-proxy/datadog-fips-proxy.cfg.example \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chown dd-agent:dd-agent \
      /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo chmod 640 /etc/datadog-fips-proxy/datadog-fips-proxy.cfg
   sudo systemctl restart datadog-fips-proxy
   ```

#### Datadog Agent FIPS プロキシを使用するように Agent を構成する

Datadog Agent FIPS Proxy パッケージは、US1-FED データセンターで使用するための構成があらかじめ用意されています。既存の Datadog Agent をアップグレードする場合は、プロキシを使用するように Agent を構成する必要があります。

プロキシを使用するように Agent を構成するには、[Agent コンフィギュレーションファイル][2]で `fips.enabled` を `true` に、`fips.https` を `false` に設定します。

```yaml
fips:
  enabled: true
  https: false
```

`fips` 設定は、Agent のバージョン >= 7.41 で利用可能です。この設定が有効な場合、Datadog Agent はすべての通信を Datadog Agent FIPS Proxy にリダイレクトします。この設定は `dd_url` のようなカスタム URL オプションを無視します。

Agent はプロキシとの通信に HTTP を使用するため、`https` オプションは `false` に設定されています。Datadog Agent FIPS Proxy は Agent と同じホストで実行され、その通信を保護するためにホストのセキュリティに依存します。

**ホストのセキュリティとハードニングはお客様の責任です。**

<div class="alert alert-warning"><code>fips.enabled</code> の設定は、Agent のデフォルトで <code>false</code> に設定されています。すべての通信が Datadog Agent FIPS Proxy を介して転送されるようにするには、<code>true</code> に設定する必要があります。<br><br><strong><code>fips.enabled</code> が <code>true</code> に設定されていない場合、Agent は FIPS Compliant ではありません</strong>。</div>

### インストールの検証

アプリでメトリクス、トレース、ログが正しく報告されることを検証します。

メトリクスについては、接続性診断コマンドを実行し、すべてのチェックが通過することを検証します。

```shell
sudo -u dd-agent datadog-agent diagnose datadog-connectivity
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
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/logs/
[4]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: /ja/integrations/journald/#configuration
[6]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Amazon EKS の Helm" %}}
`values.yaml` ファイルに以下の値を設定します。

```yaml
fips:
  enabled: true
  use_https: false
```

`fips` 設定は、Agent のバージョン >= 7.41 で利用可能です。この設定が有効な場合、Datadog Agent はすべての通信を Datadog Agent FIPS Proxy にリダイレクトします。この設定は、`dd_url` などのカスタム URL オプションを無視します。

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

プロキシログが `bind socket` エラーを表示する場合、プロキシはホスト上で既に使用されているポートを使用しようとしています。Datadog Agent FIPS Proxy は、9803 から 9816 までの TCP ポート範囲を使用します。この範囲のポートは、ホスト上で利用可能で、他のサービスによって使用されていない必要があります。

次の例では、Datadog Agent FIPS Proxy は、ポート `9804` のソケットがすでに使用されているため、バインドすることができないことを示しています。

```text
[ALERT] (4518) : Starting frontend metrics-forwarder: cannot bind socket (Address already in use) [0.0.0.0:9804]
[ALERT] (4518) : [/opt/datadog-fips-proxy/embedded/sbin/haproxy.main()] Some protocols failed to start their listeners! Exiting.
```

### Agent がプロキシに接続できない

ネットワークの問題を確認するには、`/var/log/datadog/agent.log` のログを確認するか、以下を実行します。

```shell
datadog-agent diagnose datadog-connectivity
```

以下などのエラーがないか確認します。
```text
connect: connection refused, context deadline exceeded (Client.Timeout exceeded while awaiting headers), or connection reset by peer
```

- [プロキシステータスの確認](#check-the-proxy-status)の手順に従って、Datadog Agent FIPS Proxy が実行していることを検証します。
- プロキシからのポート範囲が Agent からのポート範囲と一致することを検証します。

プロキシが実行されていて、ポート範囲が正しい場合、マシンのローカルファイアウォールが Agent のプロキシへのアクセスをブロックしている可能性があります。9804 から 9816 までの TCP ポートへの接続を許可するようにファイアウォールを設定してください。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4024
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4024.pdf
[3]: /ja/agent/troubleshooting/
[4]: https://ip-ranges.ddog-gov.com/
[5]: /ja/agent/guide/network/#destinations
[6]: /ja/help/