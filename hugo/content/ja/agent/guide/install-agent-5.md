---
further_reading:
- link: agent/
  tag: ドキュメント
  text: Datadog Agent
private: true
title: Datadog Agent 5 のインストール
---
このガイドでは、Agent 5 のインストールについて説明します。Datadog では、最新機能を利用するために Agent 7 をインストールするか、Agent 7 にアップグレードすることを推奨しています。Agent の最新バージョンのインストールについて詳しくは、[Agent 7 のインストール手順][1]を参照してください。以前のバージョンから Agent 7 にアップグレードする方法については、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## macOS {#macos}

### Agent をインストールする {#install-the-agent}

#### コマンドライン {#command-line}

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Agent を管理するには、`datadog-agent` コマンドを使用します。デフォルトでは、`datadog-agent` バイナリは `/usr/local/bin` にあります。`/opt/datadog-agent/etc/conf.d` で Integrations を有効化または無効化します。

#### GUI {#gui}

1. [DMG パッケージ][3]をダウンロードしてインストールします。
1. `MY_API_KEY` をご使用の Datadog API キーに置き換えて、次の行を `/opt/datadog-agent/etc/datadog.conf` に追加します。
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Agent を管理するには、システムトレイの Datadog Agent アプリを使用します。`/opt/datadog-agent/etc/conf.d` で Integrations を有効化または無効化します。

### Agent の実行動作 {#agent-run-behavior}

デフォルトでは、Agent はログイン時に実行されます。システムトレイの Datadog Agent アプリを使用して無効にすることができます。Agent をシステム起動時に実行する場合は、次のコマンドを使用します。
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### アンインストール {#uninstall}

1. トレイの骨のアイコンを使用して Datadog Agent を停止し、終了します。
1. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
1. 以下を実行します。

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

Agent をシステム起動時に実行するためのオプションのインストールコマンドを実行した場合は、以下のコマンドを実行してアンインストールを完了します。

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows {#windows}

### Agent をインストールする {#install-the-agent-1}

#### GUI {#gui-1}

Datadog Agent インストーラーをダウンロードして実行します。
- [64 ビットインストーラー][4]。
- [32 ビットインストーラー][5]。32 ビットのインストールは、Agent バージョン 5.10.1 以下でのみサポートされています。

Windows インストーラーの利用可能なすべてのバージョンのリンクは、[JSON 形式][6]で提供されています。

#### コマンドライン {#command-line-1}

1. Agent のダウンロード:
   - 新規インストールを行う場合は、[Datadog Agent インストーラー][4]をダウンロードします。
   - 5.12.0 より前の Datadog Agent バージョンからアップグレードする場合は、[EXE インストール方法][7]を使用します。
1. インストーラーをダウンロードしたディレクトリで `cmd.exe` シェルを開き、以下のコマンドを実行します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   オプションで、`TAG` および `HOSTNAME` の値を追加します。

#### Azure へのデプロイ {#deployment-to-azure}

Azure に Agent をインストールする場合は、[Microsoft Azure ドキュメント][8]の手順に従います。

### 5.12 の新しいアップグレード手順 {#new-upgrade-procedure-for-512}

既存のお客様で、5.12 より前の Windows Agent を実行している場合は、デバイスをアップグレードするための手順が追加で必要になることがあります。具体的には、最新の Agent は「マシン単位」でインストールします。以前のバージョンの Agent は、デフォルトでは「ユーザー単位」でインストールしていました。Chef を使用してデプロイする場合は、追加の手順が必要になることがあります。詳細については、「[Windows Agent のインストール][9]」を参照してください。

### アンインストール {#uninstall-1}

Windows で Agent をアンインストールする方法は 2 つあります。どちらの方法も Agent を削除しますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除しません。

**注**: v5.12.0 より前の Agent の場合、Agent のインストールに使用した**元のユーザーアカウント**でアンインストールすることが重要です。そうしないと、完全に削除されない可能性があります。

### プログラムの追加と削除 {#add-or-remove-programs}

1. [**CTRL**] キーと [**Esc**] キーを押すか、Windows キーで Windows Search を実行します。
1. `add` を検索し、[{{< ui >}}Add or remove programs{{< /ui >}}] (プログラムの追加または削除) をクリックします。
1. `Datadog Agent` を検索し、[{{< ui >}}Uninstall{{< /ui >}}] (アンインストール) をクリックします。

### PowerShell {#powershell}

**注:** 下記のコマンドを使用する場合は、WinRM を有効にしてください。

下記の PowerShell コマンドを使用して、再起動せずに Agent をアンインストールします。

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux および Unix {#linux-and-unix}

{{< tabs >}}

{{% tab "Debian" %}}
### ワンステップインストール {#one-step-install}

ワンステップコマンドは、Datadog Agent の APT パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install}

1. HTTPS 経由でダウンロードし、`curl` および `gnupg` をインストールできるように APT を設定します。
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. システムに Datadog Debian リポジトリを設定し、Datadog アーカイブキーリングを作成します。
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. 次のコマンドを実行して、サンプル設定を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を起動します。
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. 次のコマンドを実行して、サンプル設定を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を起動します。
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### アンインストール {#uninstall-2}

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo apt-get remove datadog-agent -y
```

このコマンドは Agent を削除しますが、以下は削除しません。

* `datadog.yaml` 構成ファイル
* `/etc/dd-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除する場合は、Agent 削除後に次のコマンドを実行してください。

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### ワンステップインストール {#one-step-install-2}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-2}

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **注**: i386/i686 アーキテクチャでは、「x86_64」を「i386」に置き換えます。

1. ローカルの yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 設定例を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### アンインストール {#uninstall-3}

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドは Agent を削除しますが、以下は削除しません。

* `datadog.yaml` 構成ファイル
* `/etc/dd-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除する場合は、Agent 削除後に次のコマンドを実行してください。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS および Red Hat" %}}
### ワンステップインストール {#one-step-install-3}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-3}

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **注**: i386/i686 アーキテクチャでは、「x86_64」を「i386」に置き換えます。

1. ローカルの YUM リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. 設定例を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール {#uninstall-4}

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドは Agent を削除しますが、以下は削除しません。

* `datadog.yaml` 構成ファイル
* `/etc/dd-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除する場合は、Agent 削除後に次のコマンドを実行してください。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### ワンステップインストール {#one-step-install-4}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-4}

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **注**: i386/i686 アーキテクチャでは、「x86_64」を「i386」に置き換えます。

1. ローカルの YUM リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. 設定例を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール {#uninstall-5}

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドは Agent を削除しますが、以下は削除しません。

* `datadog.yaml` 構成ファイル
* `/etc/dd-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除する場合は、Agent 削除後に次のコマンドを実行してください。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### ワンステップインストール {#one-step-install-5}

ワンステップコマンドは、Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール {#multi-step-install-5}

1. 以下の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog YUM リポジトリをセットアップします。
   ```conf
   [datadog]
   name=Datadog, Inc.
   enabled=1
   baseurl=https://yum.datadoghq.com/suse/rpm/x86_64
   type=rpm-md
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

1. ローカルの zypper リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. 設定例を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール {#uninstall-6}

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo zypper remove datadog-agent
```

このコマンドは Agent を削除しますが、以下は削除しません。
* `datadog.yaml` 構成ファイル
* `/etc/dd-agent` 構成フォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除する場合は、Agent 削除後に次のコマンドを実行してください。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
**注**: このタブは、従来の Datadog UNIX Agent を対象としています。Datadog では、最新の機能と継続的なサポートを利用するために、[AIX で Agent 7][3] をインストールするか、Agent 7 にアップグレードすることを推奨しています。Agent 7 がサポートする AIX のバージョンについては、「[サポートされているプラットフォーム][4]」を参照してください。

### ワンステップインストール {#one-step-install-6}

ワンステップコマンドは、Datadog Agent の最新の BFF パッケージをインストールし、必要に応じてパスワードの入力を求めます。Agent がマシンにまだインストールされておらず、インストール後に自動的に起動しないようにするには、コマンドを実行する前に、コマンドの先頭に `DD_INSTALL_ONLY=true` を追加します。

`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 以前のインストールからのアップグレード {#upgrade-from-a-previous-installation}

既存の設定を保持したまま Agent をインストールするには、次のコマンドを実行します。

```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

詳細については、「[AIX 用の Datadog UNIX Agent][1]」を参照してください。

### マルチステップインストール {#multi-step-install-6}

1. [datadog-unix-agent][2] リポジトリのリリースから、ご希望の BFF をダウンロードします。
1. `installp` を使用して、ルートとしてアーティファクトをインストールします。
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. 既存の構成ファイルがない場合は、設定例を所定の場所にコピーします。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog Agent に適切な権限があることを確認します。
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent サービスを停止します。
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Agent サービスが停止したことを確認します。
   ```
   sudo lssrc -s datadog-agent
   ```
1. Agent サービスを再起動します。
   ```shell
   sudo startsrc -s datadog-agent
   ```

### アンインストール {#uninstall-7}

Agent をアンインストールするには、次のコマンドを実行します。

インストール済みの Agent を削除するには、次の `installp` コマンドを実行します。

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

注: Agent のアンインストールログは `dd-aix-install.log` ファイルにあります。このロギングを無効にするには、アンインストールコマンドから `-e` パラメーターを削除してください。

[1]: /ja/agent/guide/install-unix-agent-aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: /ja/agent/supported_platforms/aix/
[4]: /ja/agent/supported_platforms/?tab=aix
{{% /tab %}}

{{< /tabs >}}

## クラウドとコンテナ {#cloud-and-containers}

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Agent をインストールする {#install-the-agent-2}
### DaemonSet でインストールする {#install-with-daemonsets}

Kubernetes 1.1.0 以上を実行している場合は、[DaemonSet][1] を利用して、すべてのノードに Datadog Agent を自動的にデプロイできます。

1. API キーを含むシークレットを作成します。このシークレットは、Datadog Agent をデプロイするためにマニフェストで使用されます。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. `dd-agent.yaml` という名前の次のマニフェストを作成します。

   ```yaml
   apiVersion: extensions/v1beta1
   kind: DaemonSet
   metadata:
   name: dd-agent
   spec:
   template:
      metadata:
         labels:
         app: dd-agent
         name: dd-agent
      spec:
         containers:
         - image: gcr.io/datadoghq/docker-dd-agent:latest
         imagePullPolicy: Always
         name: dd-agent
         ports:
            - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
         env:
            - name: DD_API_KEY
               valueFrom:
               secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: KUBERNETES
               value: "yes"
            - name: SD_BACKEND
               value: docker
            # Uncomment this variable if the agent has issues reaching kubelet
            # - name: KUBERNETES_KUBELET_HOST
            #   valueFrom:
            #     fieldRef:
            #       fieldPath: status.hostIP  # Kubernetes >= 1.7
            #       # or
            #       # fieldPath: spec.nodeName  # Kubernetes < 1.7
         resources:
            requests:
               memory: "256Mi"
               cpu: "200m"
            limits:
               memory: "256Mi"
               cpu: "200m"
         volumeMounts:
            - name: dockersocket
               mountPath: /var/run/docker.sock
            - name: procdir
               mountPath: /host/proc
               readOnly: true
            - name: cgroups
               mountPath: /host/sys/fs/cgroup
               readOnly: true
         livenessProbe:
            exec:
               command:
               - ./probe.sh
            initialDelaySeconds: 15
            periodSeconds: 5
         volumes:
         - hostPath:
               path: /var/run/docker.sock
            name: dockersocket
         - hostPath:
               path: /proc
            name: procdir
         - hostPath:
               path: /sys/fs/cgroup
            name: cgroups
   ```

1. DaemonSet をデプロイします。
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">このマニフェストは、Autodiscovery の自動構成機能を有効にします。自動構成を無効にするには、 <code>SD_BACKEND</code> 環境変数の定義を削除します。Autodiscovery の設定方法については、<a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes インテグレーションと Autodiscovery</a> を参照してください。</div>

### Docker コンテナとして Agent を実行する {#run-the-agent-as-a-docker-container}

Kubernetes 1.1.0 以上を実行していない場合、または DaemonSet を使用しない場合は、監視対象の各ノードで Docker コンテナとして Agent を実行します。`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## カスタムメトリクスを送信する {#send-custom-metrics}

DogStatsD を使用して[カスタムメトリクス][2]を送信する予定がある場合:
1. マニフェストの `ports` セクションに `hostPort` を追加して、コンテナの StatsD ポートをノードの IP アドレスにバインドします。
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. ノードの IP に UDP パケットを送信するようにクライアントライブラリを構成します。ブリッジネットワークを使用している場合、アプリケーションコンテナのデフォルトゲートウェイはノードの IP と一致します。Downward API を使用して、ノードのホスト名を環境変数として公開することもできます。

## Agent 構成をカスタマイズする {#customize-your-agent-configuration}

Agent 構成をカスタマイズするには、Agent 5 [docker-dd-agent][3] リポジトリのドキュメントを参照してください。Autodiscovery の構成を調整するには、[Kubernetes インテグレーションと Autodiscovery][4] を参照してください。Autodiscovery を無効にするには、マニフェストから `SD_BACKEND` 環境変数を削除します。

メトリクス、サービスチェック、イベントの収集の詳細については、[Kubernetes インテグレーション][5]のドキュメントを参照してください。

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /ja/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /ja/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### ワンステップインストール {#one-step-install-7}

ワンステップインストールでは、ホストを監視するために Datadog Agent を埋め込んだ Docker コンテナを実行します。Docker インテグレーションはデフォルトで有効になっており、Autodiscovery も自動構成モードで有効になっています。Autodiscovery を無効にするには、ワンステップインストールコマンドから `SD_BACKEND` 変数を削除します。

#### Amazon Linux {#amazon-linux}
`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### その他のオペレーティングシステム {#other-operating-systems}
`MY_API_KEY` をご使用の Datadog API キーに置き換えて、次のコマンドを実行します。

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### トラブルシューティング {#troubleshooting}

ワンステップインストールコマンドが機能しない場合、システムが `cgroup` ディレクトリを予期しない場所にマウントしているか、メモリ管理に CGroups を使用していない可能性があります。Docker チェックが成功するためには、CGroups が必要です。CGroups を有効にするには、[docker-dd-agent][1] リポジトリのドキュメントを参照してください。`cgroup` ディレクトリが予期しない場所にあるためにチェックが失敗する場合は、次のようにします。

1. `mount | grep "cgroup type tmpfs"` を実行して、`cgroup` ディレクトリの場所を取得します。
1. ワンステップインストールコマンドで最初に出現している `/sys/fs/cgroup` を、`cgroup` ディレクトリの場所に置き換えます。

### カスタムメトリクスを送信する {#send-custom-metrics-1}

DogStatsD を使用してカスタムメトリクスを送信するには:
1. インストールコマンドに `-p 8125:8125/udp` オプションを追加します。これにより、コンテナの StatsD ポートがホストの IP アドレスにバインドされます。
1. ホストの IP アドレスに UDP パケットを送信するようにクライアントライブラリを構成します。

### Agent 構成をカスタマイズする {#customize-your-agent-configuration-1}

Agent 構成をカスタマイズするには、Agent 5 [docker-dd-agent][2] リポジトリのドキュメントを参照してください。Autodiscovery の構成を調整するには、[Docker インテグレーションと Autodiscovery][3] を参照してください。Autodiscovery を無効にするには、ワンステップインストールコマンドから `SD_BACKEND` 環境変数を削除します。

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/ja/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux の実行は、Docker ランタイムでサポートされています。インストール手順については、[Docker][1] を参照してください。

Kubernetes 上で CoreOS Tectonic を実行するには、[Kubernetes][2] を参照してください。

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
OpenShift を使用した Datadog のインストールの詳細については、[datadog-openshift][1] リポジトリを参照してください。

[1]: https://github.com/DataDog/datadog-openshift

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

3. ランタイム構成にランタイムを追加します。

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

{{% /tab %}}

{{< /tabs >}}

## 構成管理 {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">Datadog Ansible コレクションは、ほとんどの Debian、RHEL ベースおよび SUSE ベースの Linux ディストリビューション、macOS、Windows をサポートしています。<br>Ansible バージョン 2.10 以上が必要です。</div>

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
   - Datadog Ansible コレクションは、Red Hat によって公式に認定されている [Red Hat Automation Hub][1] からも入手できます。
   - コレクションのインストールが推奨されます。必要に応じて、[スタンドアロンロール][2]を使用して Datadog をインストールすることもできます。

2. ホストに Datadog Agent をデプロイするには、Datadog ロールと API キーをプレイブックに追加します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 5
   ```

   Agent がホストをグループ化できるように、Datadog Agent が追跡しているノードのホスト名のみを使用します。Agent が追跡しているホスト名は、次のコマンドを使用して確認できます。

   ```shell
   service datadog-agent info
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
    datadog_agent_major_version: 5
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

その他の Agent ロールの使用例は、[スタンドアロンロール][3]の GitHub リポジトリを参照してください。

### メトリクスとイベント {#metrics-and-events}

Ansible の実行後に Datadog でメトリクスとイベントを取得するには、Ansible コールバックプロジェクトの [GitHub ページ][4]を参照してください。

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /ja/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info"> <code>datadog_agent</code> モジュールでは Linux ノードのみがサポートされます。<br>Puppet Agent バージョン 2.7 以上が必要です。</a></div>

1. [Puppet Forge][1] から `datadog_agent` モジュールを Puppet サーバーにインストールします。
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
         api_key => "MY_API_KEY"
      }
   }
   ```

   Agent がホストをグループ化できるように、Datadog Agent が追跡しているノードのホスト名のみを使用します。Agent が追跡しているホスト名は、次のコマンドを使用して確認できます。

   ```shell
   service datadog-agent info
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
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Puppet サーバーで Puppet を実行し、必要な依存関係をすべてインストールします。
1. Puppet サーバーを再起動して、Datadog で Puppet データの受信を開始します。

## 特定の Agent チェック {#specific-agent-checks-1}

いずれかのノードで特定の Agent チェックまたはインテグレーションを使用するには、関連する[インテグレーションマニフェスト][2]でコードサンプルを参照してください。Elasticsearch インテグレーションの例を以下に示します。

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => ""
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

[1]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[2]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Chef バージョン 10.14.x 以上が必要です。</a></div>

1. Datadog クックブックを追加します。
   - [Berkshelf][1] を使用している場合は、Berksfile にクックブックを追加します。
      ```shell
      cookbook 'datadog'
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

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 計算式では、Debian ベースおよび RedHat ベースのシステムのみがサポートされます。<br><br>
以下の手順では、Datadog 計算式をベース Salt 環境に追加します。別の Salt 環境に追加するには、 <code>base</code> への参照をご使用の Salt 環境の名前に置き換えます。</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes` を使用してインストールする{#install-using-gitfs-remotes}
1. Salt Master 構成ファイル (デフォルトは `/etc/salt/master`) の `gitfs_remotes` オプションを使用して、Salt Master ノードのベース環境に [Datadog 計算式][1]をインストールします。
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

1. Salt Master ノードで [Datadog 計算式][1]を複製します。
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
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
       agent_version: <AGENT5_VERSION>
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
       agent_version: <AGENT5_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

ログ設定、チェックの例、高度なユースケースについては、計算式の [GitHub リポジトリ][1]を参照してください。
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## ソースからインストールする {#install-from-source}

<div class="alert alert-info">Datadog Agent には python 2.7 および <code>sysstat</code> (Linux 上) が必要です。</div>

ワンステップソースインストールスクリプトを使用します。`MY_API_KEY` をご使用の Datadog API キーに置き換えます。

```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

このスクリプトは、`~/.datadog-agent` にある独自の自己完結型サンドボックスに Agent をインストールします。

インストールを永続化するには、現在の作業ディレクトリに設定されている `$sandbox_dir` で `$sandbox_dir/bin/agent` を実行するように `init` デーモンをセットアップします。サンドボックスディレクトリはポータブルであり、ファイルシステムのどの場所からでも実行できます。サンドボックスディレクトリは、デフォルトで `~/.datadog-agent` に設定されています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /ja/agent/versions/upgrade_to_agent_v7/
[3]: https://install.datadoghq.com/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /ja/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation