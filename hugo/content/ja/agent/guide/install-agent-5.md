---
further_reading:
- link: /agent/basic_agent_usage/
  tag: ドキュメント
  text: Agent の基本的な使い方
private: true
title: Datadog Agent 5 のインストール
---

このガイドでは Agent 5 のインストールを扱います。Datadog では、最新の機能を利用するために Agent 7 のインストールまたはアップグレードを推奨しています。最新バージョンの Agent インストール手順については [Agent 7 のインストール手順][1]を参照してください。以前のバージョンから Agent 7 にアップグレードする方法については、[Datadog Agent v7 へのアップグレード][2]を参照してください。

## macOS

### Agent のインストール

#### コマンドライン

次のコマンドを実行し、`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Agent を管理するには、`datadog-agent` コマンドを使用します。デフォルトでは `datadog-agent` バイナリは `/usr/local/bin` に配置されています。`/opt/datadog-agent/etc/conf.d` でインテグレーションを有効または無効にできます。

#### GUI

1. [DMG パッケージ][3]をダウンロードしてインストールします。
1. `MY_API_KEY` をお使いの Datadog API キーに置き換えて、以下の行を `/opt/datadog-agent/etc/datadog.conf` に追加してください:
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Agent を管理するには、システムトレイの Datadog Agent アプリを使用します。`/opt/datadog-agent/etc/conf.d` でインテグレーションを有効または無効にできます。

### Agent の実行動作

デフォルトでは、Agent はログイン時に起動します。システムトレイの Datadog Agent アプリを使用して Agent を無効にすることができます。起動時に Agent を実行したい場合は、以下のコマンドを使用してください:
{{< code-block lang=“shell” >}}
sudo cp ‘/opt/datadog-agent/etc/com.datadoghq.agent.plist’ /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### アンインストール

1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
1. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
1. 次を実行します。

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

オプションのインストールコマンドを実行して、Agent を起動時に実行させた場合は、以下を実行してアンインストールを終了してください。

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows

### Agent のインストール

#### GUI

以下の Datadog Agent インストーラをダウンロードして実行してください:
- [64-bit インストーラ][4]。
- [32-bit インストーラ][5]。32-bit インストールは Agent バージョン 5.10.1 までのみサポートされます。

Windows インストーラーのすべての利用可能なバージョンへのリンクは、[JSON フォーマット][6]で利用可能です。

#### コマンドライン

1. Agent をダウンロード:
   - 新規インストールの場合は [Datadog Agent インストーラ][4]をダウンロードします。
   - Datadog Agent バージョン 5.12.0 未満からアップグレードする場合は、[EXE インストール方法][7]を使用してください。
1. インストーラをダウンロードしたディレクトリで `cmd.exe` シェルを起動し、次のコマンドを実行します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   必要に応じて、`TAG` や `HOSTNAME` の値を追加できます。

#### Azure へのデプロイ

Azure で Agent をインストールするには、[Microsoft Azure のドキュメント][8]に従ってください。

### 5.12 向けの新しいアップグレード手順

5.12 より前の Windows Agent を実行している既存ユーザーの場合、デバイスをアップグレードするには追加の手順が必要になる場合があります。特に、最新の Agent は「マシン単位」でインストールされますが、以前のバージョンではデフォルトで「ユーザー単位」となっていました。Chef でデプロイしている場合にも追加の手順が必要な場合があります。詳細については、[Windows Agent のインストール][9]を参照してください。

### アンインストール

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

**注**: Agent バージョン 5.12.0 未満の場合、Agent をインストールした**元のアカウント**でアンインストールを行うことが重要です。そうしないと正常に削除されない可能性があります。

### プログラムの追加と削除

1. **CTRL** キーと **Esc** キーを押すか、Windows キーで Windows Search を実行します。
1. `add` を検索し、**Add or remove programs** をクリックします。
1. `Datadog Agent` を検索し、**Uninstall** をクリックします。

### PowerShell

**注:** 以下のコマンドを使用する場合は、WinRM を有効にしてください。

以下の PowerShell コマンドを使用して、再起動せずに Agent をアンインストールします。

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux と Unix

{{< tabs >}}

{{% tab "Debian" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の APT パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. APT が HTTPS を介してダウンロードできるように設定し、`curl` と `gnupg` をインストールします:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. システム上で Datadog Debian リポジトリを設定し、Datadog アーカイブキーリングを作成します:
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
1. Debian 8 またはそれ以前で実行する場合は、鍵束を `/etc/apt/trusted.gpg.d` にコピーします。
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. ローカルの APT リポジトリを更新し、Agent をインストールします:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 以下のコマンドを実行してサンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を起動します。
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の APT パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. APT が HTTPS を介してダウンロードできるように設定し、`curl` と `gnupg` をインストールします:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. システム上で Datadog Debian リポジトリを設定し、Datadog アーカイブキーリングを作成します:
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
1. Debian 8 またはそれ以前で実行する場合は、鍵束を `/etc/apt/trusted.gpg.d` にコピーします。
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. ローカルの APT リポジトリを更新し、Agent をインストールします:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. 以下のコマンドを実行してサンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を起動します。
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo apt-get remove datadog-agent -y
```

このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. 次の内容で `/etc/yum.repos.d/datadog.repo` を作成して、Datadog の YUM リポジトリを設定します:
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

   **注**: i386/i686 アーキテクチャでは、"x86_64" を "i386" に置き換えてください。

1. ローカルの Yum リポジトリを更新し、Agent をインストールします。
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. サンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS と Red Hat" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. 次の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog の YUM リポジトリを設定します:
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

   **注**: i386/i686 アーキテクチャでは、"x86_64" を "i386" に置き換えてください。

1. ローカルの YUM リポジトリを更新し、Agent をインストールします:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. サンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. 次の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog の YUM リポジトリを設定します:
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

   **注**: i386/i686 アーキテクチャでは、"x86_64" を "i386" に置き換えてください。

1. ローカルの YUM リポジトリを更新し、Agent をインストールします:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. サンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo yum remove datadog-agent
```

このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### ワンステップインストレーション

ワンステップコマンドは Datadog Agent の YUM パッケージをインストールし、パスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### マルチステップインストール

1. 次の内容で `/etc/yum.repos.d/datadog.repo` を作成し、Datadog の YUM リポジトリを設定します:
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

1. ローカルの zypper リポジトリを更新し、Agent をインストールします:
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. サンプル設定ファイルを配置します。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Agent を再起動します。
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

```shell
sudo zypper remove datadog-agent
```

このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
* Datadog ログファイル

これらの要素も削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
### ワンステップインストレーション

ワンステップコマンドは最新の BFF パッケージをインストールし、必要に応じてパスワードの入力を求めます。Agent がまだマシンにインストールされておらず、インストール後に自動的に起動させたくない場合は、コマンドを実行する前に `DD_INSTALL_ONLY=true` をコマンドの先頭に付けてください。

以下のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### 以前のインストールからのアップグレード

既存の構成を保持したまま Agent をインストールするには、次のコマンドを実行します:
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

利用可能なインストールスクリプトの環境変数の一覧については、[AIX 用 Agent の基本的な使用方法][1]を参照してください。

### マルチステップインストール

1. [datadog-unix-agent][2] リポジトリのリリースページから、使用したい BFF をダウンロードします:
1. `installp` を使用し、ルート権限でアーティファクトをインストールします:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. 既存のコンフィギュレーションファイルがない場合は、サンプル設定ファイルをコピーします。`MY_API_KEY` を Datadog の API キーに置き換えてください:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Datadog Agent に正しい権限があることを確認します:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Agent サービスを停止します:
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Agent サービスが停止していることを確認します:
   ```
   sudo lssrc -s datadog-agent
   ```
1. Agent サービスを再起動します:
   ```shell
   sudo startsrc -s datadog-agent
   ```

### アンインストール

Agent をアンインストールするには、次のコマンドを実行します。

インストールされている Agent を削除するには、次の `installp` コマンドを実行します。

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

注: Agent のアンインストールログは、`dd-aix-install.log` ファイルに記録されます。このログを無効にするには、アンインストールコマンドの `-e` パラメーターを削除します。

[1]: /ja/agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## クラウドとコンテナ

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Agent のインストール
### DaemonSet を使ってインストール

Kubernetes バージョン 1.1.0 以上を使用している場合は、[DaemonSet][1] を利用してすべてのノードに自動的に Datadog Agent をデプロイできます。

1. まず、API キーを含むシークレットを作成します。このシークレットは Datadog Agent をデプロイするマニフェストで使用されます。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. 次に、`dd-agent.yaml` という名前のマニフェストを以下の内容で作成します:

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

1. DaemonSet をデプロイします:
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">このマニフェストではオートディスカバリーの自動構成機能が有効になっています。自動構成を無効にする場合は、<code>SD_BACKEND</code> 環境変数の定義を削除してください。オートディスカバリーの構成方法については、<a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes Integrations Autodiscovery</a> をご覧ください。</div>

### Docker コンテナとして Agent を実行

Kubernetes 1.1.0 以降を使用していない、または DaemonSet を使用しない場合は、監視対象の各ノード上で Datadog Agent を Docker コンテナとして実行します。次のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## カスタムメトリクスの送信

[カスタムメトリクス][2]を DogStatsD で送信する予定がある場合:
1. マニフェストの `ports` セクションに `hostPort` を追加して、コンテナの StatsD ポートをノードの IP アドレスにバインドします。
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. クライアントライブラリを、UDP パケットをノードの IP に送信するように構成します。bridge ネットワーキングを使用している場合、アプリケーションコンテナのデフォルトゲートウェイがノードの IP と一致します。また、Downward API を使用してノードのホスト名を環境変数として公開することもできます。

## Agent 構成のカスタマイズ

Agent の構成をカスタマイズするには、Agent 5 の [docker-dd-agent][3] リポジトリのドキュメントを参照してください。オートディスカバリーの構成を調整するには、[Kubernetes Integrations Autodiscovery][4] を参照してください。オートディスカバリーを無効にする場合は、マニフェストから `SD_BACKEND` 環境変数を削除してください。

メトリクス、サービスチェック、イベントの収集については、[Kubernetes インテグレーション][5]のドキュメントを参照してください。

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /ja/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /ja/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /ja/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### ワンステップインストレーション

ワンステップインストールでは、Docker コンテナを実行し、そのコンテナ内に組み込まれた Datadog Agent でホストを監視します。Docker インテグレーションはデフォルトで有効になっており、オートディスカバリーも自動設定モードで有効になっています。オートディスカバリーを無効にする場合は、ワンステップインストールコマンドから `SD_BACKEND` 変数を削除してください。

#### Amazon Linux
次のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### その他のオペレーティングシステム
次のコマンドを実行し、`MY_API_KEY` を Datadog の API キーに置き換えてください:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### トラブルシューティング

ワンステップインストールコマンドが正常に動作しない場合、システムが `cgroup` ディレクトリを予期しない場所にマウントしているか、メモリ管理に CGroups を使用していない可能性があります。Docker チェックを正しく動作させるには CGroups が必要です。CGroups を有効にする方法については、[docker-dd-agent][1] リポジトリのドキュメントを参照してください。`cgroup` ディレクトリの予期しない場所が原因でチェックが失敗している場合は:

1. `mount | grep "cgroup type tmpfs"` を実行して、`cgroup` ディレクトリの場所を確認します。
1. ワンステップインストールコマンドで最初に出てくる `/sys/fs/cgroup` を `cgroup` ディレクトリの場所に置き換えます。

### カスタムメトリクスの送信

DogStatsD を使用してカスタムメトリクスを送信するには:
1. インストールコマンドに `-p 8125:8125/udp` オプションを追加します。これにより、コンテナの StatsD ポートがホストの IP アドレスにバインドされます。
1. クライアントライブラリを、UDP パケットをホストの IP アドレスに送信するように構成します。

### Agent 構成のカスタマイズ

Agent の構成をカスタマイズするには、Agent 5 の [docker-dd-agent][2] リポジトリのドキュメントを参照してください。オートディスカバリーの構成を調整するには、[Docker Integrations Autodiscovery][3] を参照してください。オートディスカバリーを無効にする場合は、ワンステップインストールコマンドから `SD_BACKEND` 環境変数を削除してください。

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/ja/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
CoreOS Container Linux を実行している場合、Docker ランタイムがサポートされています。インストール手順については [Docker][1] を参照してください。

CoreOS Tectonic を Kubernetes 上で実行する場合は、[Kubernetes][2] を参照してください。

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
OpenShift で Datadog をインストールする方法については、[datadog-openshift][1] リポジトリを参照してください。

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">Datadog Agent の BOSH リリースは、Ubuntu と Red Hat のステムセルでのみ動作します。</a></div>

1. Datadog Agent リリースを BOSH Director にアップロードしてください:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. ランタイム構成で Datadog をアドオンとして構成します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:

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

3. Runtime を runtime config に追加します:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. 既存のデプロイをすべて再デプロイしてください:
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

{{% /tab %}}

{{< /tabs >}}

## 構成管理

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">Datadog Ansible Collection は、ほとんどの Debian、RHEL ベース、SUSE ベースの Linux ディストリビューション、macOS、および Windows をサポートしています。<br>Ansible バージョン 2.10 以上が必要です。</div>

### 前提条件

#### Windows
Datadog Ansible Collection で Windows ホストを管理する前に、`ansible.windows` コレクションをインストールする必要があります:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE と SLES

Datadog Ansible Collection で openSUSE/SLES ホストを管理する前に、`community.general` コレクションをインストールする必要があります:

```shell
ansible-galaxy collection install community.general
```

### Datadog のインストール

1. Ansible サーバー上で、Ansible Galaxy から Datadog Ansible Collection をインストールします:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - Datadog Ansible Collection は [Red Hat Automation Hub][1] でも提供されており、Red Hat によって正式に認定されています。
   - Collection のインストールが推奨されます。必要に応じて、[スタンドアロンロール][2]を使用して Datadog をインストールすることもできます。

2. ホストに Datadog Agent をデプロイするには、Datadog ロールと API キーをプレイブックに追加します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
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

   Agent がホストを正しくグループ化できるようにするには、Datadog Agent が追跡しているノードのホスト名のみを使用してください。Agent がどのホスト名を追跡しているかは、次のコマンドで確認できます:

   ```shell
   service datadog-agent info
   ```

## 特定の Agent チェック

特定の Agent チェックやインテグレーションをノードで使用するには、`datadog_checks` 変数を利用します。以下は process チェックの例です:
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

Agent ロールの使用例の詳細については、[スタンドアロンロール][3]の GitHub リポジトリを参照してください。

### メトリクスとイベント

Ansible 実行後に Datadog 上でメトリクスやイベントを取得するには、Ansible callback プロジェクトの [Github ページ][4]を参照してください。

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /ja/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info"><code>datadog_agent</code> モジュールは Linux ノードのみをサポートします。<br>Puppet Agent バージョン 2.7 以上が必要です。</a></div>

1. [Puppet Forge][1] から `datadog_agent` モジュールを Puppet サーバーにインストールします。
   - 新規インストールの場合は、`module install command` を実行します:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - 既にモジュールがインストールされている場合は、アップグレードします:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. ノードに Datadog Agent をデプロイするには、このパラメーター付きクラスをマニフェストに追加します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Agent がホストを正しくグループ化できるようにするには、Datadog Agent が追跡しているノードのホスト名のみを使用してください。Agent がどのホスト名を追跡しているかは、次のコマンドで確認できます:

   ```shell
   service datadog-agent info
   ```

3. Puppet サーバーで Datadog へのレポートを有効にします:
   1. `/etc/puppet/puppet.conf` に以下のパラメーターを追加します:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```
   1. マニフェスト内で `puppet_run_reports` オプションを Puppet サーバーに追加します。例:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Puppet サーバー上で Puppet を実行し、必要な依存関係をすべてインストールします。
1. Puppet サーバーを再起動して、Datadog に Puppet データを送信し始めます。

## 特定の Agent チェック

ノードの 1 つで特定の Agent チェックやインテグレーションを使用するには、該当する[インテグレーションマニフェスト][2]を参照してコードサンプルを確認してください。以下は elasticsearch インテグレーションの例です:

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

1. Datadog の cookbook を追加:
   - [Berkshelf][1] を使用している場合は、cookbook を Berksfile に追加してください:
      ```shell
      cookbook 'datadog'
      ```

   - Berkshelf を使用していない場合は、Knife を使ってリポジトリに cookbook をインストールしてください:
     ```shell
     knife cookbook site install datadog 
     ```

1. Datadog 固有の属性をロール、環境、または別のレシピで設定します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. 更新したクックブックを Chef サーバーにアップロードします。
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. cookbook をノードの `run_list` または `role` に追加します:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. 次の `chef-client` スケジュール実行を待ちます。

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">Datadog Saltstack 式は Debian ベースと RedHat ベースのシステムのみサポートしています。<br><br>
以下の手順では、Datadog 式を base の Salt 環境に追加します。別の Salt 環境に追加する場合は、<code>base</code> への参照をその Salt 環境名に置き換えてください。</div>

<!-- vale Datadog.inclusive = NO -->

### `gitfs_remotes` を使用してインストール
1. Salt Master コンフィギュレーションファイル (デフォルトでは `/etc/salt/master`) の `gitfs_remotes` オプションを使用し、Salt Master ノードの base 環境に [Datadog 式][1]をインストールします:
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

1. Salt Master サービスを再起動します:
   ```shell
   systemctl restart salt-master
   ```
   または
   ```shell
   service salt-master restart
   ```

### Datadog 式を複製してインストール

1. Salt Master ノードで [Datadog 式][1]を複製します:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Salt Master コンフィギュレーションファイル (デフォルトでは `/etc/salt/master`) の `file_roots` で、複製した式を base 環境に追加します:
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## ホストに Agent をデプロイ

1. top ファイル (デフォルトでは `/srv/salt/top.sls`) に Datadog 式を追加します:
   ```yaml
   base:
     '*':
       - datadog
   ```

1. pillar ディレクトリ (デフォルトでは `/srv/pillar/`) に `datadog.sls` という pillar ファイルを追加し、API キーを記述します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. top pillar ファイル (デフォルトでは `/srv/pillar/top.sls`) に `datadog.sls` を追加します:
   ```yaml
   base:
     '*':
       - datadog
   ```

1. 特定の Agent チェックやインテグレーションをホストで使用するには、checks 変数を使用します。以下はディレクトリインテグレーションの例です:
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

ログ構成、チェック例、高度な使用例については、式の [Github リポジトリ][1]を参照してください。
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## ソースからのインストール

<div class="alert alert-info">Datadog Agent は Linux 上で python 2.7 と <code>sysstat</code> を必要とします。</div>

ワンステップのソースインストールスクリプトを使用します。`MY_API_KEY` をお使いの Datadog API キーに置き換えてください:
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

スクリプトは Agent を `~/.datadog-agent` にある専用のサンドボックスにインストールします。

インストールを永続化するには、`init` デーモンで `$sandbox_dir/bin/agent` を実行するように設定し、現在の作業ディレクトリを `$sandbox_dir` に設定してください。サンドボックスディレクトリはポータブルで、ファイルシステム上の任意の場所で実行できます。デフォルトではサンドボックスディレクトリは `~/.datadog-agent` に設定されています。

## 参考資料

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