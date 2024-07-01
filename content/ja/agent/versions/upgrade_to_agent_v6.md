---
aliases:
- /ja/agent/faq/upgrade-to-agent-v6
- /ja/agent/guide/upgrade-to-agent-v6
title: Datadog Agent v6 へのアップグレード
---

<div class="alert alert-info">
Agent v7 が利用可能です。 <a href="/agent/versions/upgrade_to_agent_v7">最新バージョンにアップグレードすると</a>新しい機能を利用できます。
</div>

## Agent 6 へのアップグレード

Agent v5 が既にインストールされている場合は、新しい Agent を自動インストールまたはアップグレードするためのスクリプトがあります。このスクリプトは、パッケージリポジトリをセットアップし、Agent パッケージをインストールします。アップグレードの際に、インポートツールが以前のバージョンから既存の `datadog.conf` を検索し、新しい v6 の形式に従って Agent 構成とチェック構成を変換します。以下からご使用のプラットフォームを選択して、具体的な手順を参照してください。[DMG パッケージをダウンロードして手動でインストール](#manual-upgrade)するか、[1 行のインストールスクリプト](#one-step-upgrade)を使用してインストールできます。

## ワンステップアップグレード

{{< tabs >}}
{{% tab "Linux" %}}

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。

以下のコマンドは、Amazon Linux、CentOS、Debian、Fedora、Red Hat、Ubuntu、および SUSE で動作します。
: `DD_UPGRADE=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent6.sh)"`

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、Datadog がそのままの状態での完全な下位互換性は保証できないためです。

{{% /tab %}}
{{% tab "Windows" %}}

Windows プラットフォーム用のワンステップインストールはありません。[手動アップグレード](#manual-upgrade)を参照してください。

{{% /tab %}}
{{% tab "MacOS" %}}

Agent v6 インストーラは、アップグレード時に v5 の構成を自動的に変換できます。

```shell
DD_UPGRADE=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

**注:** インポート処理では、**カスタム** Agent チェックは自動的に移動されません。これは、Datadog がそのままの状態での完全な下位互換性は保証できないためです。

{{% /tab %}}
{{< /tabs >}}

## 手動アップグレード

{{< tabs >}}
{{% tab "Linux" %}}

以下の手動アップグレード手順をご覧ください。

- [Agent 6 へのアップグレード](#upgrade-to-agent-6)
- [ワンステップアップグレード](#one-step-upgrade)
- [手動アップグレード](#manual-upgrade)
  - [Amazon Linux](#amazon-linux)
  - [CentOS](#centos)
  - [Debian](#debian)
  - [Fedora](#fedora)
  - [Red Hat](#red-hat)
  - [Ubuntu](#ubuntu)
  - [SUSE](#suse)

### Amazon Linux

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```shell
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を (再) 起動します。

    * Amazon Linux 2.0:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```shell
    sudo initctl start datadog-agent
    ```

### CentOS

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **注**: [dnf にバグ][1]が発生しているため、CentOS 8.1 では `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。

    * Centos 7 以降:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Debian

1. APT の HTTPS サポートを有効にし、`curl` と `gnupg` をインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. システム上に Datadog API リポジトリをセットアップし、Datadog の APT キーをインポートします。
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Debian 8 またはそれ以前で実行する場合は、鍵束を `/etc/apt/trusted.gpg.d` にコピーします。

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. ローカルの APT キャッシュを更新し、Agent をインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Agent を起動します。
    ```shell
    sudo service datadog-agent start
    ```

### Fedora

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

### Red Hat

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **注**: [dnf にバグ][1]が発生しているため、RHEL 8.1 では `repo_gpgcheck=1` の代わりに `repo_gpgcheck=0` を使用してください。

2. ローカルの Yum リポジトリを更新し、Agent をインストールします。
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。

    * Red Hat 7 以降:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Ubuntu

1. APT の HTTPS サポートを有効にし、`curl` と `gnupg` をインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. システム上に Datadog API リポジトリをセットアップし、Datadog の APT キーをインポートします。
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ubuntu 14 またはそれ以前で実行する場合は、鍵束を `/etc/apt/trusted.gpg.d` にコピーします。

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. ローカルの APT キャッシュを更新し、Agent をインストールします。
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Agent を起動します。

    * Ubuntu 16.04 以降:
    ```shell
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 以前:
    ```shell
    sudo initctl start datadog-agent
    ```

### SUSE

1. 以下の内容で `/etc/zypp/repos.d/datadog.repo` を作成して、システム上に Datadog の Yum リポジトリをセットアップします。
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=1
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. ローカルの Zypper リポジトリを更新し、Agent をインストールします。
  ```shell
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. 構成サンプルを所定の位置にコピーし、適切な API キーを指定します。
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Agent を再起動します。
  ```shell
  sudo systemctl restart datadog-agent.service
  ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

[最新バージョン][1]をダウンロードし、インストールパッケージを実行します。

以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

上記のコマンドで、

* `<OLD_CONFIGURATION_DIRECTORY>` は、`datadog.conf` ファイルが置かれているディレクトリです。
* `<DESTINATION_DIRECTORY>` は、インポートされた `datadog.yaml` が書き込まれるディレクトリです (`<OLD_CONFIGURATION_DIRECTORY>` と同じディレクトリを使用できます)。

**注**: アップグレード時に、`datadog.conf` は自動的に `datadog.yaml` にアップグレードされます。

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
{{% /tab %}}
{{% tab "MacOS" %}}

1. Agent の最新バージョンの DMG パッケージをダウンロードします。リポジトリの[リリースページ][9]にリストされている最新の macOS 版リリースを使用してください。
2. DMG パッケージをインストールします。
3. `/opt/datadog-agent/etc/datadog.yaml` に API キーを追加します。
4. 以下の `import` コマンドを使用して、Agent の構成パスおよび形式を Agent v5 から Agent v6 に移行します。このコマンドは、既存の v5 の `datadog.conf` をパースし、構成オプションを新しい v6 の `datadog.yaml` 形式に変換します。また、現在有効になっているチェックの構成ファイルをコピーします。
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

次に、Datadog Agent アプリケーションを起動します。起動すると、システムトレイにアプリケーションが表示され、そこから Agent を管理できます。Agent v6 には Web ベースの GUI が含まれており、これを使用して Agent 構成ファイルの編集などのさまざまな処理を行うことができます。

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}