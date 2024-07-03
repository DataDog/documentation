---
algolia:
  tags:
  - airgap
  - airgapped
  - air gap
  - air gapped
  - air-gap
  - air-gapped
aliases:
- /ja/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
further_reading:
- link: /agent/
  tag: Documentation
  text: Learn more about the Datadog Agent
- link: /agent/configuration/proxy/
  tag: Documentation
  text: Learn more about Proxy
title: Installing the Agent on a server with limited internet connectivity
---

[Agent インストール手順][1]で提供される 1 行のインストールコマンドは、正しく機能するためにいくつかの異なるエンドポイントへのアウトバウンド HTTPS アクセスを必要とし、インターネットアクセスが制限されているサーバーでは動作しない可能性があります。具体的には、以下の通りです。

* Debian/Ubuntu システムのインストールの場合
  * https://keys.datadoghq.com - Datadog の公開署名鍵の保管。
  * https://apt.datadoghq.com - Datadog APT のパッケージリポジトリ。
* RedHat および SUSE ベースシステムのインストールの場合
  * https://keys.datadoghq.com - Datadog の公開署名鍵の保管。
  * https://yum.datadoghq.com - Datadog RPM のパッケージリポジトリ。

インターネットに直接アクセスできないサーバーの場合、Agent はプロキシを経由するように構成できます ([Agent Proxy の構成][2]を参照)。インターネットへの接続が制限されているサーバーでは、サーバーの OS に関連するパッケージを使用して Agent をインストールすることができます。[Agent インストール手順][1]には、1 行のインストールコマンドの下にステップバイステップの手順が記載されています。

ターゲットシステムがパッケージリポジトリへの直接アクセスをブロックされている場合、他のサーバーを使用してリポジトリからパッケージをダウンロードし、ターゲットシステムに転送してローカルにインストールします。

Agent 6 の RPM パッケージは [https://yum.datadoghq.com/stable/6/][3] に、Agent 7 の RPM パッケージは [https://yum.datadoghq.com/stable/7/][4] に、DEB パッケージは [https://apt.datadoghq.com/pool/d/da/][5] に掲載されています。

**注**: このパッケージには、Agent とチェック (インテグレーションが有効かどうかに関わらず) を実行するために必要なすべてのリソースがバンドルされています。ハード要件としては、Python 2.7+ と sysstat が必要です。他の依存関係は、どのようなチェックが有効かによって必須となります。

パッケージがターゲットシステムに転送されたら、適切なパッケージマネージャーコマンドを使用してローカルにインストールすることができます。yum の場合、コマンドは次のパターンに従います。

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Debian ベースのディストリビューションで、deb ファイルをカレントディレクトリにインストールするには

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

インストールが完了したら、`datadog.yaml.example` をコピーして `datadog.yaml` ファイルを追加します。次に、`datadog.yaml` を組織の [API キー][6]で更新します。これは 1 つのコマンドで実行できます。

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

次に、お使いのシステムに適したコマンドを使用して、[Agent の起動][7]を行います。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ja/agent/configuration/agent-commands/#start-the-agent