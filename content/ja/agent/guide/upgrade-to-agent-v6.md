---
title: Datadog Agent v6 へのアップグレード
kind: ガイド
aliases:
  - /ja/agent/faq/upgrade-to-agent-v6
---
<div class="alert alert-info">
Datadog Agent v6 を新規インストールする場合は、Agent の<a href="https://app.datadoghq.com/account/settings#agent">インストールプロセス</a>を参照してください。
</div>

## Agent v6 とは

Agent 6 は、Datadog Agent の最新メジャーバージョンです。Agent 5 と Agent 6 の大きな違いは、Agent 6 のコア Agent が Golang で全面的に書き換えられていることです。Golang により、Agent は並行処理を利用できるようになりました。これまで Agent v5 が実行していたフォワーダー、コレクター、DogStatsD の 3 つのプロセスの代わりに、Agent プロセスだけが実行されるようになりました。また、他にも多くのコアの改善が行われています。

* Agent v6 では、Agent v5 と比べてリソースの使用が大幅に改善されました。
  * CPU 使用量が減少しました。
  * メモリ使用量が減少しました。
  * 使用するファイルディスクリプタ数が減少しました。
  * あらゆる面でフットプリントが減少しました。

* Agent 6 は、[さらに 2 つのポート][1]を使用します。
    * `5000`: ランタイムメトリクスの公開用
    * `5001`: [Agent CLI/GUI コマンド][2]用

    **注**: `datadog.yaml` ファイルで、`expvar_port` および `cmd_port` に別のポートを指定できます。

* Agent v6 と [DogStatsD][3] のカスタムビルドがたいへん容易になりました。使用できる構成オプションも増え、ほぼすべての項目を自由に収集対象にしたり、対象から外したりすることができます。

### Agent v6 の新機能

Agent v5 から Agent v6 へのすべての変更内容については、[Datadog Agent の変更点に関するドキュメント][4]を参照してください。以下は、主な機能の改善点です。

* [ディストリビューションメトリクス][5]をサーバー上で直接実行して、実効的なグローバルパーセンタイルを計算できます。(注: この機能は現在ベータ版です。ご使用のアカウントで有効にする方法については、サポートへお問い合わせください。)

* [DogStatsD][3] を UDP ではなく UNIX ソケット経由で使用できます。

* [Windows でライブプロセスモニタリングを使用できます][6]。

* [Prometheus OpenMetrics をネイティブにサポートします][7]。

* [すべてのログを Datadog に送信して、アラート設定、分析、メトリクスとの関連付けなどを行うことができます][8]。

## Agent 6 へのアップグレード

Agent v5 が既にインストールされている場合は、新しい Agent を自動インストールまたはアップグレードするためのスクリプトがあります。このスクリプトは、パッケージリポジトリをセットアップし、Agent パッケージをインストールします。アップグレードの際に、インポートツールが以前のバージョンから既存の `datadog.conf` を検索し、新しい v6 の形式に従って Agent 構成とチェック構成を変換します。ご使用のプラットフォームを選択して、具体的な手順を参照してください。

* [Amazon Linux](#amazon-linux)
* [CentOS](#centos)
* [Debian](#debian)
* [Fedora](#fedora)
* [MacOSx](#macosx)
* [Red Hat](#red-hat)
* [SUSE](#suse)
* [Ubuntu](#ubuntu)
* [Windows](#windows)

### Amazon Linux
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を (再) 起動します。

    * Amazon Linux 2.0:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```
    sudo initctl start datadog-agent
    ```

### CentOS
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```
4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。

    * Centos 7 以降:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl restart datadog-agent
    ```

### Debian
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. APT の HTTPS サポートを有効にします。
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. システム上に Datadog API リポジトリをセットアップし、Datadog の APT キーをインポートします。
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    注: Datadog の APT キーをインポートするために、`dirmngr` をインストールしなければならない場合があります。

3. ローカルの APT キャッシュを更新し、Agent をインストールします。
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Agent を起動します。
    ```
    sudo service datadog-agent start
    ```

### Fedora
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。
    ```
    sudo systemctl restart datadog-agent.service
    ```


### MacOSx

DMG パッケージをダウンロードして手動でインストールするか、1 行のインストールスクリプトを使用してインストールできます。

#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. Agent の最新バージョンの DMG パッケージをダウンロードします。リポジトリの[リリースページ][9]にリストされている最新の macOS 版リリースを使用してください。
2. DMG パッケージをインストールします。
3. `/opt/datadog-agent/etc/datadog.yaml` に API キーを追加します。
4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

次に、Datadog Agent アプリケーションを起動します。起動すると、システムトレイにアプリケーションが表示され、そこから Agent を管理できます。Agent v6 には Web ベースの GUI が含まれており、これを使用して Agent 構成ファイルの編集などのさまざまな処理を行うことができます。

### Red Hat
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。

    * Red Hat 7 以降:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```
    sudo initctl restart datadog-agent
    ```

### SUSE
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫
**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

#### 手動アップグレード

1. 以下の内容で `/etc/zypp/repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
         https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. ローカルの Zypper リポジトリを更新し、Agent をインストールします。
  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。
  ```
  sudo systemctl restart datadog-agent.service
  ```

### Ubuntu
#### ワンステップアップグレード

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。
≪```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```≫

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、そのままの状態での完全な下位互換性は保証できないためです。

### 手動アップグレード

1. APT の HTTPS サポートを有効にします。
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. システム上に Datadog API リポジトリをセットアップし、Datadog の APT キーをインポートします。
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    注: Datadog の APT キーをインポートするために、`dirmngr` をインストールしなければならない場合があります。

3. ローカルの APT キャッシュを更新し、Agent をインストールします。
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Agent を起動します。

    * Ubuntu 16.04 以降:
    ```
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 以前:
    ```
    sudo initctl start datadog-agent
    ```


### Windows

[ここから][10]最新バージョンをダウンロードし、インストールパッケージを実行します。

以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

上記のコマンドで、

* `<OLD_CONFIGURATION_DIRECTORY>` は、`datadog.conf` ファイルが置かれているディレクトリです。
* `<DESTINATION_DIRECTORY>` は、インポートされた `datadog.yaml` が書き込まれるディレクトリです (`<OLD_CONFIGURATION_DIRECTORY>` と同じディレクトリを使用できます)。

**注**: アップグレード時に、`datadog.conf` は自動的に `datadog.yaml` にアップグレードされます。

[1]: /ja/agent/?tab=agentv6#agent-architecture
[2]: /ja/agent/guide/agent-commands
[3]: /ja/developers/dogstatsd/unix_socket
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /ja/developers/metrics/metrics_type
[6]: /ja/graphing/infrastructure/process
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /ja/logs
[9]: https://github.com/DataDog/datadog-agent/releases
[10]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi