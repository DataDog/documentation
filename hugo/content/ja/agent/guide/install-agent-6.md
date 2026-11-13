---
further_reading:
- link: agent/
  tag: ドキュメント
  text: Datadog Agent
private: true
title: Datadog Agent 6 のインストール
---
このガイドでは、Agent 6 のインストールについて説明します。Datadog では、最新機能を利用するために Agent 7 をインストールするか、Agent 7 にアップグレードすることを推奨しています。Agent の最新バージョンのインストールについて詳しくは、[最新の Agent インストール手順][1]を参照してください。以前のバージョンから Agent 7 にアップグレードする方法については、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## macOS {#macos}

- Datadog Agent バージョン 6 には macOS 10.12 以上が必要です。
- Agent 6.34 は、macOS 10.12 をサポートする最後のリリースです。
- Agent 6.38 は、macOS 向けの最後の Agent 6 リリースです。

### Agent をインストールする {#install-the-agent}

#### コマンドライン {#command-line}

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent はログイン時に実行されます。これは、システムトレイから無効にできます。

#### LaunchDaemon {#launchdaemon}

Datadog Agent は、`DD_SYSTEMDAEMON_INSTALL=true` と `DD_SYSTEMDAEMON_USER_GROUP=username:groupname` を指定することで、システム全体の LaunchDaemon としてインストールできます。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

Agent はシステム起動時に実行されます。`DD_SYSTEMDAEMON_USER_GROUP` 変数を使用して、有効な非ルートユーザーとそのグループを指定する必要があります。Agent プロセスはこのユーザーおよびグループで実行されます。

システム全体の LaunchDaemon インストールでは、システムトレイアプリはサポートされていません。

#### GUI {#gui}

1. [DMG パッケージ][3]をダウンロードしてインストールします。
1. `MY_API_KEY` をご使用の Datadog API キーに置き換えて、次の行を `/opt/datadog-agent/etc/datadog.yaml` に追加します。
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Agent を管理する {#manage-the-agent}

Agent を管理するには、以下を使用します。
- システムトレイの Datadog Agent アプリ (シングルユーザーインストールの場合)。
- `launchctl`(システム全体の LaunchDaemon インストールの場合)。
- `datadog-agent` コマンド。バイナリは `/usr/local/bin` にあります。

`/opt/datadog-agent/etc/conf.d.` でインテグレーションを有効化または無効化します。

## Windows {#windows}

リリース 6.11.0 以降、Windows Agent のコアおよび APM/トレースコンポーネントは、`LOCAL_SYSTEM` アカウントではなく、`ddagentuser` アカウントで実行され、インストール時に作成されます。Datadog Agent バージョン 6.x から 6.11 以上にアップグレードする場合は、アップグレード前に [Windows Agent ユーザー][10]のドキュメントを確認してください。

Windows インストーラーの利用可能なすべてのバージョンのリンクは、[JSON 形式][6]で提供されています。

### Agent をインストールする {#install-the-agent-1}

#### インタラクティブ {#interactive}

1. [Datadog Agent インストーラー][4]をダウンロードして実行します。
1. `datadog-agent-6-latest.amd64.msi` を開き、(管理者として) インストーラーを実行します。
1. プロンプトに従ってライセンス契約に同意し、Datadog API キーを入力します。
1. ご使用の Datadog リージョンを入力します。{{< region-param key=dd_site code="true" >}}。
1. プロンプトが表示されたら、必要に応じて Datadog Agent Manager を起動します。

#### 無人 {#unattended}

1. [Datadog Agent インストーラー][4]をダウンロードして実行します。
1. インストーラーをダウンロードしたディレクトリ内で、以下のいずれかのコマンドを実行します。`MY_API_KEY` はご使用の Datadog API キーに置き換えます。
   - コマンドプロンプト:
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - PowerShell:
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` と `TAGS` はオプションの値です。利用可能なすべてのオプションについては、[Windows Agent ドキュメント][5]を参照してください。

#### Azure へのデプロイ {#deployment-to-azure}

Azure に Agent をインストールする場合は、[Microsoft Azure ドキュメント][8]の手順に従います。

## Linux {#linux}

{{< tabs >}}

{{% tab "Debian" %}}
### ワンステップインストール {#one-step-install}

ワンステップコマンドは、Datadog Agent の APT パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

Agent をインストールするには、`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### マルチステップインストール {#multi-step-install}

1. HTTPS 経由でダウンロードし、`curl` および `gnupg` をインストールできるように APT を設定します。
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. システムに Datadog Debian リポジトリを設定し、Datadog アーカイブキーリングを作成します。
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```

1. Debian 8 以前を実行している場合は、キーリングを `/etc/apt/trusted.gpg.d` にコピーします。
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. ローカルの APT リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent を起動します。
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Ubuntu" %}}
### ワンステップインストール {#one-step-install-1}

ワンステップコマンドは、Datadog Agent の APT パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-1}

1. HTTPS 経由でダウンロードし、`curl` および `gnupg` をインストールできるように APT を設定します。
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. システムに Datadog Debian リポジトリを設定し、Datadog アーカイブキーリングを作成します。
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Ubuntu 14 以前を実行している場合は、キーリングを `/etc/apt/trusted.gpg.d` にコピーします。
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. ローカルの APT リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent を起動します。
   - Ubuntu 16.04 以降:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04:
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### ワンステップインストール {#one-step-install-2}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

1. `MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. Amazon Linux 2022 でバージョン 6.39 以前の Agent をインストールする場合は、Agent に `libxcrypt-compat` パッケージが必要です。
   ```shell
   dnf install -y libxcrypt-compat
   ```

### マルチステップインストール {#multi-step-install-2}

1. x86_64 ホストで、次の構成で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. arm64 ホストで、次の構成で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/aarch64/ 
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 または 6 からアップグレードする場合は、古い RPM GPG キーを削除します。
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. ローカルの yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent を起動します。
   - Amazon Linux 2.0:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Amazon Linux 1.0:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "CentOS および RedHat" %}}
### ワンステップインストール {#one-step-install-3}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### マルチステップインストール {#multi-step-install-3}

1. 次の構成で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=0
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

   **注**: `repo_gpgcheck=0` オプションは、[DNF のバグ][102]に対する回避策です。

1. Agent 5 または Agent 6 の以前のバージョンからアップグレードする場合は、古い RPM GPG キーを削除します。
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. ローカルの yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Agent を起動します。
   - CentOS または Red Hat 7 以降:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - CentOS または Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma、Oracle、Rocky" %}}
### ワンステップインストール {#one-step-install-4}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### マルチステップインストール {#multi-step-install-4}

1. 次の構成で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 または Agent 6 の以前のバージョンからアップグレードする場合は、古い RPM GPG キーを削除します。
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. ローカルの yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent を再起動します。
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### ワンステップインストール {#one-step-install-5}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-5}

1. 次の構成で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 または Agent 6 の以前のバージョンからアップグレードする場合は、古い RPM GPG キーを削除します。
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. ローカルの yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent を再起動します。
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Suse" %}}
### ワンステップインストール {#one-step-install-6}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。
- Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。
- 既存の Agent 構成ファイルがある場合、更新時に既存の値が保持されます。
- 初期インストールプロセス中に、Agent オプションの一部を構成できます。詳細については、[install_script 構成オプション][101]を確認してください。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### マルチステップインストール {#multi-step-install-6}

1. 次の構成で `/etc/zypp/repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=hhttps://yum.datadoghq.com/suse/stable/6/x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Agent 5 または Agent 6 の以前のバージョンからアップグレードする場合は、古い RPM GPG キーを削除します。
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. ローカルの zypper リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. オプションで、Agent 5.17 以上からアップグレードする場合は、既存の Agent 5 構成をインポートします。
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. アップグレードせず、古い構成も使用しない場合は、サンプル構成を所定の場所にコピーして Agent をインストールします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Datadog リージョンを構成します。
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Agent ユーザーの権限が正しいことを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Agent を再起動します。
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{< /tabs >}}

## クラウドとコンテナ {#cloud-and-containers}

{{< tabs >}}

{{% tab "Kubernetes" %}}

Kubernetes クラスターで直接 Datadog Agent を実行し、クラスターとアプリケーションのメトリクス、トレース、およびログの収集を開始します。Helm チャート、[Datadog Operator][101] を使用するか、または [DaemonSet][102] を直接使用して Agent をデプロイできます。さまざまなディストリビューションでの Datadog Agent のインストールに関する詳細については、[Kubernetes ディストリビューションのドキュメント][103]を参照してください。

### Datadog Agent をインストールする {#installing-the-datadog-agent}

カスタムリリース名 `RELEASE_NAME` でチャートをインストールするには、次のようにします。

1. [Helm をインストール][104]します。
1. Datadog Helm リポジトリを追加します。
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. 新しく追加されたチャートの最新バージョンを取得します。
   ```shell
   helm repo update
   ```

1. 空の `values.yaml` ファイルを作成し、必要に応じて[デフォルト値][105]をオーバーライドします。例については、[Datadog `helm-charts` リポジトリ][106]を参照してください。
1. `MY_API_KEY` をご使用の Datadog API キーに置き換えて、Datadog Agent をデプロイします。
   **Helm v3+ の場合**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **Helm v1 または v2 の場合**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   このチャートは、DaemonSet を使用してクラスター内のすべてのノードに Datadog Agent を追加します。インストールが完了するとすぐに、Datadog で、ご使用のアカウントのホストおよびメトリクスのデータの報告が開始されます。

### ログ収集を有効にする {#enabling-log-collection}

Helm でログ収集を有効にするには、次のログ収集構成で `datadog-values.yaml` ファイルを更新します。

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

次に、Datadog Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### トレース収集を有効にする {#enabling-trace-collection}

Kubernetes 環境でアプリケーションのトレースを収集する方法については、専用の [APM 設定ドキュメント][107]を参照してください。

### 参考資料 {#further-reading}

利用可能な Agent 機能の詳細については、[Kubernetes ドキュメント][108]を参照してください。

[101]: /ja/containers/kubernetes/?tab=operator
[102]: /ja/containers/kubernetes/?tab=daemonset
[103]: /ja/containers/kubernetes/distributions/
[104]: https://v3.helm.sh/docs/intro/install/
[105]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[106]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[107]: https://dd-dev-local.datad0g.com/apm/service-setup?architecture=container-based&collection=Helm%20Chart%20%28Recommended%29&environment=kubernetes
[108]: /ja/containers/kubernetes/
{{% /tab %}}

{{% tab "Docker" %}}
### ワンステップインストール {#one-step-install-7}

ワンステップインストールコマンドは、ホストを監視するために Datadog Agent が組み込まれている署名済み Docker コンテナを実行します。Docker インテグレーションはデフォルトで有効になっており、[Autodiscovery][101] も自動構成モードで有効になっています。

<div class="alert alert-info">1 つのノードで複数の Datadog Agent を実行しないでください。複数の Agent を実行すると、予期しない動作が発生する可能性があります。</a></div>

ワンステップインストールを行うには、次のコマンドを実行します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。

Amazon Linux v2 の場合:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

その他のオペレーティングシステムの場合:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

#### トラブルシューティング {#troubleshooting}

ワンステップインストールコマンドが機能しない場合、システムが `cgroup` ディレクトリを予期しない場所にマウントしているか、メモリ管理に CGroups を使用していない可能性があります。Docker チェックが成功するためには、CGroups が必要です。CGroups を有効にするには、[設定ドキュメント][102]を参照してください。

CGroups が有効になっているが、`cgroup` ディレクトリが予期しない場所にあるためにチェックが失敗する場合は、次のようにします。
1. `mount | grep "cgroup type tmpfs"` を実行して、`cgroup` ディレクトリの場所を取得します。
1. ワンステップインストールコマンドで最初に出現している `/sys/fs/cgroup` を、`cgroup` ディレクトリの場所に置き換えます。

### DogStatsD を使用してカスタムメトリクスを送信する {#send-custom-metrics-with-dogstatsd}

デフォルトでは、DogStatsD は localhost のみをリッスンします。他のコンテナからの DogStatsD パケットをリッスンするには、次のようにします。
1. コンテナのパラメーターに `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` を追加します。
1. コンテナのパラメーターに `-p 8125:8125/udp` オプションを追加して、コンテナの statsd ポートをホストの IP にバインドします。
1. UDP パケットをホストの IP に送信するようにクライアントライブラリを構成します。

### Agent 構成をカスタマイズする {#customize-your-agent-configuration}

- Agent の構成の詳細については、「[Docker、containerd、Podman に対応した Docker Agent][103]」を参照してください。
- Autodiscovery を調整するには、[Docker インテグレーションと Autodiscovery][104] を参照してください。

[101]: /ja/containers/docker/integrations/?tabs=docker
[102]: /ja/containers/docker/?tab=standard#setup
[103]: /ja/containers/docker/?tab=standard
[104]: /ja/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux の実行は、Docker ランタイムでサポートされています。インストール手順については、[Docker][1] を参照してください。

Kubernetes 上で CoreOS Tectonic を実行するには、[Kubernetes][2] を参照してください。

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
バージョン 6.1 以降では、Datadog Agent は OpenShift Origin および Enterprise クラスターの監視をサポートしています。ニーズとクラスターのセキュリティの制約に応じて、次の 3 つのデプロイシナリオがサポートされています。

- [制限付き SCC オペレーション][101]
- [ホストネットワーク SCC オペレーション][102]
- [すべての機能に対応したカスタム Datadog][103]

OpenShift をインストールするには、[Kubernetes のインストール手順](?tab=kubernetes#cloud-and-containers)を参照してください。Kubernetes インテグレーションは、デフォルトで OpenShift 3.7.0 以上を対象としています。それより古いバージョンの OpenShift を使用する場合は、追加のインストール手順を完了する必要があります。詳しくは、[OpenShift インテグレーションドキュメント][104]を参照してください。

[101]: /ja/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /ja/integrations/openshift/?tab=helm#host
[103]: /ja/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /ja/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">Datadog Agent BOSH リリースは、Ubuntu および Red Hat のステムセルでのみ動作します。</a></div>

1. Datadog Agent リリースを BOSH Director にアップロードします。

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. ランタイム構成で Datadog をアドオンとして構成します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。

   ```yaml
   # runtime.yml
   ---
   releases:
   - name: datadog-agent
      version: $UPLOADED_VERSION # e.g. 1.0.5140

   addons:
   - name: datadog
   jobs:
   - name: dd-agent
      release: datadog-agent
   properties:
      dd:
         use_dogstatsd: yes
         dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
         api_key: MY_API_KEY
         tags: ["my-cloud-foundry-deployment"] # optional. Add any tags you wish
         # Optionally, enable any Agent Checks here
         # integrations:
         #   directory:
         #     init_config: {}
         #     instances:
         #       directory: "."
   ```

3. [ランタイム構成][101]にランタイムを追加します。

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. 既存のデプロイメントを再デプロイします。
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```
   
[101]: https://bosh.io/docs/runtime-config/   
{{% /tab %}}

{{< /tabs >}}

## 構成管理 {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

Ansible を使用して Agent をインストールするには、Ansible バージョン 2.10 以上が必要です。

<div class="alert alert-info">Datadog Ansible コレクションは、ほとんどの Debian、RHEL ベースおよび SUSE ベースの Linux ディストリビューション、macOS、および Windows に対応しています。<br></div>

### 前提条件{#prerequisites}

#### Windows {#windows-1}
Datadog Ansible コレクションを使用して Windows ホストを管理するには、その前に `ansible.windows` コレクションをインストールする必要があります。

```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE および SLES {#opensuse-and-sles}

Datadog Ansible コレクションを使用して openSUSE/SLES ホストを管理するには、その前に `community.general` コレクションをインストールする必要があります。

```shell
ansible-galaxy collection install community.general
```

### Datadog をインストールする {#install-datadog}

1. Ansible サーバーに Ansible Galaxy から Datadog Ansible コレクションをインストールします。
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - Datadog Ansible コレクションは、Red Hat によって公式に認定されている [Red Hat Automation Hub][101] からも入手できます。
   - コレクションのインストールが推奨されます。必要に応じて、[スタンドアロンロール][102]を使用して Datadog をインストールすることもできます。

2. ホストに Datadog Agent をデプロイするには、Datadog ロールと API キーをプレイブックに追加します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 6
      datadog_site: "datad0g.com"
   ```

   Agent がホストをグループ化できるように、Datadog Agent が追跡しているノードのホスト名のみを使用します。Agent が追跡しているホスト名は、次のコマンドを使用して確認できます。

   ```shell
   sudo datadog-agent status
   ```

## 特定の Agent チェック {#specific-agent-checks}

ノードで特定の Agent チェックまたはインテグレーションを使用するには、`datadog_checks` 変数を使用します。プロセスチェックの例を次に示します。

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 6
    datadog_site: "datad0g.com"
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

その他の Agent ロールの使用例は、[スタンドアロンロール][103]の GitHub リポジトリを参照してください。

### メトリクスとイベント {#metrics-and-events}

Ansible の実行後に Datadog でメトリクスとイベントを取得するには、Ansible コールバックプロジェクトの [GitHub ページ][104]を参照してください。

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /ja/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">バージョン 2.9.0 以降では、 <code>datadog_agent</code> モジュールは Windows ノードと Linux ノードの両方に対応しています。datadog_agent モジュールの以前のバージョンで対応していたのは Linux ノードのみでした。</a></div>

## 要件: {#requirements}
- Puppet Open Source バージョン 4.6 以上、または Puppet Enterprise バージョン 2016.4 以上が必要です。

## Agent をインストールする {#install-the-agent-2}

1. [Puppet Forge][101] から `datadog_agent` モジュールを Puppet サーバーにインストールします。
   - 新規インストールの場合は、`module install command` を実行します。
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - モジュールがすでにインストールされている場合は、アップグレードしてください。
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. ノードに Datadog Agent をデプロイするには、このパラメーター化されたクラスをマニフェストに追加します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   Agent がホストをグループ化できるように、Datadog Agent が追跡しているノードのホスト名のみを使用します。Agent が追跡しているホスト名は、次のコマンドを使用して確認できます。

   ```shell
   sudo datadog-agent status
   ```

3. Puppet サーバーで Datadog へのレポートを有効にします。
   1. 以下のパラメーターを `/etc/puppet/puppet.conf` に追加します。
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. マニフェストで、Puppet サーバーに `puppet_run_reports` オプションを追加します。例:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key => "MY_API_KEY",
            datadog_site => "datad0g.com",
            agent_major_version => 6,
            puppet_run_reports => true,
         }
      }
      ```
1. Puppet サーバーで Puppet を実行し、必要な依存関係をすべてインストールします。
1. Puppet サーバーを再起動して、Datadog で Puppet データの受信を開始します。

## 特定の Agent チェック {#specific-agent-checks-1}

いずれかのノードで特定の Agent チェックまたはインテグレーションを使用するには、関連する[インテグレーションマニフェスト][102]でコードサンプルを参照してください。Elasticsearch インテグレーションの例を以下に示します。

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => "MY_API_KEY",
        datadog_site => "datad0g.com",
        agent_major_version => 6,
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

その他の例や高度なユースケースは、[モジュールの GitHub リポジトリ][103]を参照してください。

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Chef バージョン 10.14.x 以上が必要です。</a></div>

1. Datadog クックブックを追加します。
   - [Berkshelf][101] を使用している場合は、Berksfile にクックブックを追加します。
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - Berkshelf を使用していない場合は、Knife を使用してリポジトリにクックブックをインストールします。
     ```shell
     knife cookbook site install datadog 
     ```

1. ロール、環境、または別のレシピのいずれかで Datadog 固有の属性を設定します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. 更新されたクックブックを Chef サーバーにアップロードします。
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. ノードの `run_list` または `role` にクックブックを追加します。
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. 次に予定されている `chef-client` の実行を待ちます。


詳細および例については、[Agent GitHub リポジトリ][102]を参照してください。

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 計算式では、Debian ベースおよび RedHat ベースのシステムのみがサポートされます。<br><br>
以下の手順では、Datadog 計算式を <code>base</code> Salt 環境に追加します。別の Salt 環境に追加するには、 <code>base</code> への参照をご使用の Salt 環境の名前に置き換えます。</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes` を使用してインストールする{#install-using-gitfs-remotes}
1. Salt Master 構成ファイル (デフォルトは `/etc/salt/master`) の `gitfs_remotes` オプションを使用して、Salt Master ノードのベース環境に [Datadog 計算式][101]をインストールします。
   ```yaml
   fileserver_backend:
   - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
   - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

   gitfs_remotes:
   - https://github.com/DataDog/datadog-formula.git:
     - saltenv:
       - base:
       - ref: 3.0 # Pin here the version of the formula you want to use
   ```

1. Salt Master サービスを再起動します。
   ```shell
   systemctl restart salt-master
   ```
   または 
   ```shell
   service salt-master restart
   ```

### Datadog 計算式を複製してインストールする {#install-by-cloning-the-datadog-formula}

1. Salt Master ノードで [Datadog 計算式][101]を複製します。
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. 複製した計算式を Salt Master 構成ファイル (デフォルトは `/etc/salt/master`) の `file_roots` にあるベース環境に追加します。
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## ホストに Agent をデプロイする {#deploy-the-agent-to-your-hosts}

1. Datadog 計算式をトップファイル (デフォルトは `/srv/salt/top.sls`) に追加します。
   ```yaml
   base:
     '*':
       - datadog
   ```

1. `datadog.sls` pillar ファイルを pillar ディレクトリ (デフォルトは `/srv/pillar/`) に追加し、API キーを追加します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. `datadog.sls` pillar ファイルをトップ pillar ファイル (デフォルトは `/srv/pillar/top.sls`) に追加します。
   ```yaml
   base:
     '*':
       - datadog
   ```

1. いずれかのホストで特定の Agent チェックまたはインテグレーションを使用するには、チェック変数を使用します。ディレクトリインテグレーションの例を以下に示します。
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

ログ設定、チェックの例、高度なユースケースについては、計算式の [GitHub リポジトリ][101]を参照してください。
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## ソースからインストールする {#install-from-source}

[Agent GitHub リポジトリの手順][11]に従い、Docker を使用して Linux で Agent 6 の `.deb` および `.rpm` パッケージをビルドします。

あるいは、[「はじめに」の手順][12]に従って、バージョン 6 の Agent バイナリをビルドすることもできます。

## 参考資料 {#further-reading-1}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: https://s3.amazonaws.com/dd-agent/datadogagent.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
[5]: /ja/agent/basic_agent_usage/windows/
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /ja/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[10]: /ja/agent/guide/windows-agent-ddagent-user/
[11]: https://github.com/DataDog/datadog-agent/blob/main/docs/dev/agent_omnibus.md#building-inside-docker-linux-only-recommended
[12]: https://github.com/DataDog/datadog-agent#getting-started