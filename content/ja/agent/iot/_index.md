---
title: IoT Agent
kind: ドキュメント
beta: true
further_reading:
  - link: /getting_started/agent/
    tag: Documentation
    text: Agent の概要
---
## 概要

Datadog IoT Agent は、IoT デバイスおよび埋め込み型アプリケーションの監視に最適化された、Agent の バージョンです。IoT Agent を使用すると、デジタルディスプレイからセキュリティデバイスまで、画像検知アルゴリズムを実行するさまざまなデバイスを監視することができます。

<div class="alert alert-warning">
IoT Agent は、現在非公開ベータ版でご利用いただけます。アクセスをご希望の場合は、<a href="https://docs.google.com/forms/d/e/1FAIpQLSfaoqr9Pgievq7f2WE6wcQMF1YjsOwiXHbmO2FehUlQwmNu0A/viewform?usp=sf_link">フォーム</a>にご記入ください。
</div>

## 機能

IoT Agent には、以下のシステムチェックが含まれています。IoT デバイスのコンフィギュレーションは、ほかのタイプのホストの場合と同様です。

- [システム][1] (CPU、IO、負荷、メモリ、スワップ、アップタイムを含む)
- [ディスク][2]
- [ネットワーク][3]
- [Systemd][4]
- [NTP][5]

さらに、IoT Agent は以下にも対応します。

- 埋め込み [DogStatsD][6] サーバーを使用したカスタムメトリクスの収集
- [ファイルテーリング][7]、[TCP/UDP][8]、[journald][9] を使用したログ収集

IoT Agent には、Python インタープリターおよび標準 Agent にパッケージ化されているその他のインテグレーションは含まれません。また、APM のトレース、ライブプロセスモニタリング、ネットワークパフォーマンスモニタリングもサポートしていません。

## セットアップ

### 要件

IoT Agent は、x64、arm64 (ARMv8)、ARMv7 アーキテクチャで実行中の Linux デバイスに DEB および RPM パッケージとしてご利用いただけます。

#### リソース

通常、IoT デバイスはクラウドインフラストラクチャーホストより多くのリソース制限があります。IoT Agent は、最低限のフットプリントで最小限のネットワーク帯域幅を消費するよう設計されています。

具体的なリソース要件は、使用状況により異なります。Datadog における IoT Agent (v7.20) 内部テストでは、以下がわかっています。

- CPU: 0.5% (2 Intel Xeon VCPU を使用した VM 上)
- メモリ: 36 MB
- ネットワーク帯域幅: 237 bps アップ / 79 bps ダウン
- ディスク: 63 MB

### インストール

#### 自動

ご使用中のオペレーティングシステムおよびチップセットアーキテクチャに適切な IoT Agent を自動的にダウンロードしてインストールするには、以下のコマンドを使用します。

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="{{< region-param key="dd_site" code="true" >}}" DD_AGENT_MAJOR_VERSION=7 DD_AGENT_FLAVOR=datadog-iot-agent bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

#### 手動

{{< tabs >}}
{{% tab "DEB" %}}

Debian ベースのオペレーティングシステムに IoT Agent を手動でインストールするには、以下のコマンドを実行します。

1. HTTPS を使用してダウンロードするには、`apt` をアップデートして `apt-transport-https` をインストールします。
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. システム上に Datadog deb リポジトリをセットアップし、Datadog の APT キーをインポートします。
    ```bash
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

3. `apt` を更新し、IoT Agent をインストールします。
    ```bash
    sudo apt-get update
    sudo apt-get install datadog-iot-agent
    ```

{{< site-region region="us" >}}

<ol start="4">
  <li><p>コンフィグ例をコピーし、適切な API キーを指定します。</p>
  <pre><code>DD_API_KEY=&lt;YOUR_DD_API_KEY&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>IoT Agent を開始します。</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}
{{< site-region region="eu" >}}

<ol start="4">
  <li><p>コンフィグ例をコピーし、適切な API キーを指定します。</p>
  <pre><code>DD_API_KEY=&lt;YOUR_DD_API_KEY&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Datadog サイトをセットアップします。</p>
  <pre><code>sudo sh -c "sed 's/# site:.*/site: datadoghq.eu/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml</code></pre>
  </li>
  <li><p>IoT Agent を開始します。</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}

{{% /tab %}}
{{% tab "RPM" %}}

RPM ベースのオペレーティングシステムに IoT Agent を手動でインストールするには、以下のコマンドを実行します。

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/<HOST_ARCHITECTURE>
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

    `baseurl` は、ホスト OS に依存します。
    - x86_64 - `https://yum.datadoghq.com/stable/7/x86_64/`
    - arm64 - `https://yum.datadoghq.com/stable/7/aarch64/`
    - ARMv7 - `https://yum.datadoghq.com/stable/7/armv7hl/`

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

{{< site-region region="us" >}}

<ol start="3">
  <li><p>コンフィグ例をコピーし、適切な API キーを指定します。</p>
  <pre><code>DD_API_KEY=&lt;YOUR_DD_API_KEY&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>IoT Agent を開始します。</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}
{{< site-region region="eu" >}}

<ol start="3">
  <li><p>コンフィグ例をコピーし、適切な API キーを指定します。</p>
  <pre><code>DD_API_KEY=&lt;YOUR_DD_API_KEY&gt; ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"</code></pre>
  </li>
  <li><p>Datadog サイトをセットアップします。</p>
  <pre><code>sudo sh -c "sed 's/# site:.*/site: datadoghq.eu/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml</code></pre>
  </li>
  <li><p>IoT Agent を開始します。</p>
  <pre><code>sudo systemctl restart datadog-agent.service</code></pre>
  </li>
</ol>

{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

## CLI

IoT Agent は、標準 Agent と同じ [CLI コマンド][10]をサポートします。

## アンインストール

```shell
sudo apt-get remove datadog-iot-agent -y
```

このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/datadog-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

以上の要素も削除したい場合は、次のコマンドを使用します。

```shell
sudo apt-get remove --purge datadog-iot-agent -y
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/system
[2]: /ja/integrations/disk
[3]: /ja/integrations/network
[4]: /ja/integrations/systemd
[5]: /ja/integrations/ntp
[6]: /ja/developers/dogstatsd
[7]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /ja/agent/logs/?tab=tcpudp#custom-log-collection
[9]: /ja/agent/logs/?tab=journald#custom-log-collection
[10]: /ja/agent/basic_agent_usage/#cli