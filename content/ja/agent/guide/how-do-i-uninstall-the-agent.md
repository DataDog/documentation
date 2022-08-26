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

{{< tabs >}}
{{% tab "Agent v6 と v7" %}}
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
{{% /tab %}}

{{% tab "Agent v5" %}}
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
{{% /tab %}}
{{< /tabs >}}

## CentOS、RHEL、Fedora、Amazon Linux
{{< tabs >}}
{{% tab "Agent v6 と v7" %}}


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
{{% /tab %}}

{{% tab "Agent v5" %}}
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
{{% /tab %}}
{{< /tabs >}}

## openSUSE と SLES
{{< tabs >}}
{{% tab "Agent v6 と v7" %}}
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
{{% /tab %}}

{{% tab "Agent v5" %}}

```shell
sudo zypper remove datadog-agent
```

このコマンドでは、Agent は削除されますが以下は削除されません。
* `datadog.yaml` コンフィギュレーションファイル
* `/etc/dd-agent` コンフィギュレーションフォルダ内のユーザー作成ファイル
* `/opt/datadog-agent` フォルダ内のユーザー作成ファイル
* `dd-agent` ユーザー

以上の要素と Datadog ログファイルも削除したい場合は、Agent 削除後に次のコマンドを実行します。

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}
## macOS
{{< tabs >}}
{{% tab "Agent v6 と v7" %}}
**シングルユーザーインストール**

Agent とすべての Agent 構成ファイルを削除するには
1. トレイにある骨のアイコンで Datadog Agent を停止して閉じます。
2. Datadog アプリケーションをアプリケーションフォルダからゴミ箱にドラッグします。
3. 次のコマンドを実行します。
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. マシンを再起動すると、変更が有効になります。

**システム全体の LaunchDaemon のインストール**

Agent とすべての Agent 構成ファイルを削除するには
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
3. マシンを再起動すると、変更が有効になります。
{{% /tab %}}

{{% tab "Agent v5" %}}
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
{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "Agent v6 と v7" %}}

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

### プログラムの追加と削除

1. **CTRL** キーと **Esc** キーを押すか、Windows キーで Windows Search を実行します。
1. `add` を検索し、**Add or remove programs** をクリックします。
1. `Datadog Agent` を検索し、**Uninstall** をクリックします。

### PowerShell

**注:** 以下のコマンドを使用する場合は、WinRM を有効にしてください。

以下の PowerShell コマンドのいずれかを使用して、再起動せずに Agent をアンインストールします。
```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

`/norestart` の使用:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}

{{% tab "Agent v5" %}}

Windows で Agent をアンインストールするには、2 つの異なる方法があります。どちらの方法でも Agent は削除されますが、ホスト上の `C:\ProgramData\Datadog` 構成フォルダは削除されません。

> **注**: Agent < v5.12.0 の場合、Agent のアンインストールには、Agent をインストールした際の**オリジナルアカウント**で行うことが重要です。

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

{{% /tab %}}
{{< /tabs >}}