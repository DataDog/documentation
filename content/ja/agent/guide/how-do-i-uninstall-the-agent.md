---
aliases:
- /ja/agent/faq/how-do-i-uninstall-the-agent/
further_reading:
- link: /agent/
  tag: ドキュメント
  text: Datadog Agent の詳細
kind: ガイド
title: Agent のアンインストール
---

お使いのプラットフォームを選択すると、Agent をアンインストールするための専用の手順が表示されます。

## Debian と Ubuntu
**Agent v6 & v7**

```shell
sudo apt-get remove datadog-agent -y
```

> このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/datadog-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

> 以上の要素も削除したい場合は、次のコマンドを使用します。

```shell
sudo apt-get remove --purge datadog-agent -y
```
--- 
**Agent v5**

```shell
sudo apt-get remove datadog-agent -y
```

> このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー
> 以上の要素も削除したい場合は、次のコマンドを使用します。

```shell
sudo apt-get --purge remove datadog-agent -y
```
---

## CentOS、RHEL、Fedora、Amazon Linux
**Agent v6 & v7**

```shell
sudo yum remove datadog-agent
```

> このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/datadog-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

> 以上の要素と Datadog ログファイルも削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
---


**Agent v5**

```shell
sudo yum remove datadog-agent
```

> このコマンドでは、Agent は削除されますが以下は削除されません。

* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

> 以上の要素と Datadog ログファイルも削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
---

## openSUSE と SLES
**Agent v6**

```shell
sudo zypper remove datadog-agent
```

> このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/datadog-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

> 以上の要素と Datadog ログファイルも削除したい場合は、あ次のコマンドを使用します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
---
**Agent v5**

```shell
sudo zypper remove datadog-agent
```

> このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

> 以上の要素と Datadog ログファイルも削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
---

## macOS
**Agent v6 & v7 シングルユーザーインストール**

1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
2. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
3. 次を実行します。

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
launchctl remove com.datadoghq.agent
sudo rm -rf /var/log/datadog
```

その後、マシンを再起動すると、変更が有効になります。

> この方法では、Agent とすべての Agent コンフィグレーションファイルが削除されます。
---
**Agent v6 & v7 システム全体への LaunchDaemon のインストール**

1. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
2. 残りのファイルを削除するには、以下を実行します。

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm -rf /var/log/datadog
```

マシンを再起動すると、変更が有効になります。

> この方法では、Agent とすべての Agent コンフィグレーションファイルが削除されます。
---
**Agent v5**

1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
2. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
3. 次を実行します。

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** #to remove broken symlinks
```

オプションのインストールコマンドを実行して、Agent を起動時に実行させた場合は、以下を実行してアンインストールを終了してください。

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> この方法では、Agent とすべての Agent コンフィグレーションファイルが削除されます。
---

## Windows
**Agent v6 & v7**

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

### 1. プログラムの削除
プログラムの追加と削除を使用して Agent をアンインストールします。

### 2. Powershell
または、以下の Powershell コマンドのいずれかを使用します。
> **注**: Agent のバージョンによっては、強制的に再起動する場合があります。これを防ぐには、`REBOOT=ReallySuppress` を使って再起動しないパラメーターを追加します。

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

`/norestart` の使用:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```
---
**Agent v5**

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

> **注**: Agent < v5.12.0 の場合、Agent のアンインストールには、Agent をインストールした際の**オリジナルアカウント**で行うことが重要です。

### 1. プログラムの削除
プログラムの追加と削除を使用して Agent をアンインストールします。

### 2. Powershell
または、以下の Powershell コマンドを使用します。

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

---