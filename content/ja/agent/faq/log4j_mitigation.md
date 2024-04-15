---
further_reading:
- link: /integrations/guide/jmx_integrations/
  tag: ドキュメント
  text: どのインテグレーションで Jmxfetch が使われていますか？

title: Log4Shell によるリモートコード実行リスクの軽減
---

バージョン v7.17.0/v6.17.0 と v7.32.2/v6.32.2 の間の Datadog Agent を使用している場合、 Log4Shell が提示する脆弱性 (CVE-2021-44228 と CVE-2021-45046) による影響を受ける可能性があります。v7.17.0/v6.17.0 以前の Agent を使用している場合、JMS Appender でログを取るように log4j を構成していなければ、この脆弱性の影響を受けることはありません (Agent がサポートしていないオプションですが、構成していた場合は、Appender を無効にしてください)。

**脆弱性を緩和する最善の方法は、Datadog Agent を v7.32.3 (v6.32.3) 以降にアップグレードすることです。**

お使いの Agent のバージョンが不明な場合は、[お使いの Agent のバージョンが脆弱かどうか確認する](#seeing-if-your-agent-version-is-vulnerable)をご覧ください。

## Agent をアップグレードする

ホストやコンテナで Datadog Agent コアを 2 つのマイナーバージョン間で更新するには、[プラットフォーム用のインストールコマンド][1]を実行します。

## Agent のバージョンアップができない場合

現時点で Agent をアップグレードできない場合は、以下の手順で [JndiLookup.class を削除する](#delete-jndilookupclass)か、[環境変数を実装](#set-log4j_format_msg_no_lookups-environment-variable) (JMXFetch プロセスまたは Agent プロセスの `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`) して脆弱性を一部緩和してください。

# JndiLookup.class を削除する

**脆弱性を緩和する最善の方法は、Datadog Agent を v7.32.3 (v6.32.3) 以降にアップグレードすることです。**

JndiLookup.class を削除することで [CVE-2021-44228 と CVE-2021-45046 を完全に緩和します][2]。

**注**: 7.32.3/6.32.3 では、この緩和策は必要ありません。これらのバージョンでは、JMXFetch は log4j v2.12.2 を使用しており、CVE-2021-45046 または CVE-2021-44228 の影響を受けません。

### Linux と macOS

以下のコードを bash スクリプト `jndi_cleanup.sh` として保存し、スクリプトを実行すると、提供された jmxfetch.jar が所定の位置にパッチされます。

```bash
#!/bin/bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)

TARGET="/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar"
JNDI_CLASS="org/apache/logging/log4j/core/lookup/JndiLookup.class"

set -e

VALIDATE=0
if [ $# -eq 1 ]; then
    case "$1" in
        -c)
            VALIDATE=1 ;;
        *)
            echo "$1 is not a supported option"
            exit 1 ;;
    esac
fi

if ! command -v zip &> /dev/null
then

    if [[ ! -z $YUM_CMD ]]; then
        yum install zip
    elif [[ ! -z $APT_GET_CMD ]]; then
        apt-get update
        apt-get -y install zip
    fi
fi

if [ $VALIDATE -eq 0 ]; then
    zip -q -d $TARGET $JNDI_CLASS
else
    if [ -z $(zip -sf /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar  | grep -i jndilookup.class) ]; then
        echo "The $TARGET JAR is now safe to run.";
    else
        echo "The $TARGET JAR is not safe to run as it still contains $JNDI_CLASS!";
        exit 1;
    fi
fi

exit 0;

```

スクリプトを実行可能にします。
```bash
chmod +x ./jndi_cleanup.sh
```

以下を実行して、jmxfetch.jar から JndiLogger.class を削除します。

```bash
sudo ./jndi_cleanup.sh
```

以下を実行することで JndiLogger.class が削除されたことを検証します。

```bash
.\jndi_cleanup.sh -c
```

操作が成功した場合、期待される出力は次のとおりです。

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

最後に、`sudo systemctl restart datadog-agent` (Linux systemd ベースのシステム)、`sudo restart datadog-agent` (Linux upstart ベースのシステム) またはメニューバーの Datadog Agent アプリ (macOS) で Datadog Agent サービスを再起動します。

### Windows

以下の PowerShell コードを `jndi_cleanup.ps1` という名前で保存します。

```powershell
Param(
    [Parameter(Mandatory=$false)]
    [Switch]$Validate

)

[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression')

$zipfile = "C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar"
$files   = "JndiLookup.class"

$stream = New-Object IO.FileStream($zipfile, [IO.FileMode]::Open)
$update_mode   = [IO.Compression.ZipArchiveMode]::Update
$read_mode   = [IO.Compression.ZipArchiveMode]::Read

if ($Validate -eq $true) {
    $mode = $read_mode
} else {
    $mode = $update_mode
}

$zip    = New-Object IO.Compression.ZipArchive($stream, $mode)

if ($Validate -eq $true) {
    $found = New-Object System.Collections.Generic.List[System.Object]
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $found.Add($_.Name) }

    if ($found.Count -eq 0) {
        Write-Output "The $zipfile is now safe to run."
    } else {
        Write-Output "Dangerous file still present, something failed during the JNDI cleanup."
    }
} else {
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $_.Delete() }
}

$zip.Dispose()
$stream.Close()
$stream.Dispose()
```

**昇格** (管理者として実行) した PowerShell から、パッチを適用する前に Datadog Agent のサービスを停止します。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" stopservice
```

jmxfetch.jar から JndiLogger.class を削除するパッチを適用します。

```powershell
.\jndi_cleanup.ps1
```

以下を実行することで JndiLogger.class が削除されたことを検証します。

```powershell
.\jndi_cleanup.ps1 -Validate
```

操作が成功した場合、期待される出力は次のとおりです。

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

最後に、Datadog Agent サービスを起動して、変更を適用します。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" start-service
```

### AIX

`Jmxfetch.jar` は AIX エージェントのインストールバンドルに含まれていますが、AIX エージェント内には `jmxfetch` を実行するコードはありません。手動で `jmxfetch` プロセスを起動しない場合は、`jmxfetch.jar` は使用されないので `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar` から削除してかまいません。

### コンテナ化されたエコシステム

Datadog Agent をコンテナ (Kubernetes、Nomad、vanilla Docker など) として実行し、JMX バージョン (イメージ名は`-jmx`で終わる) を使用する場合、JndiLookup.class を削除するには Datadog Agent のカスタムイメージを構築する必要があります。

以下の Dockerfile を使用して、カスタムイメージを構築します。

```
ARG AGENT_VERSION=7.32.2

FROM gcr.io/datadoghq/agent:$AGENT_VERSION-jmx

RUN apt update && apt install zip -y

RUN zip -q -d /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar org/apache/logging/log4j/core/lookup/JndiLookup.class

RUN apt purge zip -y
```

Dockerfile がある場所から、ビルド、タグ付け、コンテナレジストリへのカスタムイメージのプッシュを進めます。
例えば、`7.21.1` を実行している場合

```
docker build -t <Your_Container_Registry>/agent:7.21.1-jmx-patched --build-arg AGENT_VERSION=7.21.1 .
docker push <Your_Container_Registry>/agent:7.21.1-jmx-patched
```

そして、このパッチを当てたイメージをクラスターで使用します。

NB: これは Linux でのみ動作し、イメージを構築するマシンのアーキテクチャを使用します。複数のアーキテクチャをサポートする必要がある場合は、専用のマシンか `Docker buildx` のようなツールを使用してください。


# LOG4J_FORMAT_MSG_NO_LOOKUPS 環境変数を設定する

**脆弱性を緩和する最善の方法は、Datadog Agent を v7.32.3 (v6.32.3) 以降にアップグレードすることです。**

**注**: v7.32.2 または v6.32.2 を実行している場合、厳密にはこれらの手順を実行する必要はありません。Agent v7.32.2 (および v6.32.2) は、同じ結果を達成する[プロパティで jmxfetch を起動します][3]。ただし、どのような場合でも、Datadog Agent を v7.32.3 (v6.32.3) 以降にアップグレードすることが最良の選択肢となります。

**注**: 環境変数 `LOG4J_FORMAT_MSG_NO_LOOKUPS` を `true` に設定すると、リモートでコードが実行される危険性を緩和できますが、完全な緩和策ではありません。

## ホストのインストール

Linux の場合、手順は init システムおよびディストリビューションに依存します。

### Systemd ベースのシステム:

#### RedHat/CentOS 7 および 8、Amazon Linux 2、SUSE 12+、Ubuntu 16.04+/Debian 8+

1. 以下の内容のオーバーライドファイルを `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf` に作成します。
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. systemd のサービス定義を再読み込みします: `sudo systemctl daemon-reload`
3. datadog-agent サービスを再起動します: `sudo systemctl restart datadog-agent`


### Upstart ベースのシステム:

Linux のディストリビューションによって、操作方法が異なります。

#### Ubuntu 14.04

1. 以下の内容のオーバーライドファイルを `/etc/init/datadog-agent.override` に作成します。
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. datadog-agent サービスを停止して起動します: `sudo stop datadog-agent && sudo start datadog-agent`

**注**: `start` と `stop` を使用してください。`restart` はサービス構成の変更を拾わないからです。

#### RedHat/Centos 6、Amazon Linux 1:

1. 既存の `/etc/init/datadog-agent.conf` ファイルの末尾に、以下の行を追加します。
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. datadog-agent サービスを停止して起動します: `sudo stop datadog-agent && sudo start datadog-agent`

**注**: `start` と `stop` を使用してください。`restart` はサービス構成の変更を拾わないからです。

**注**: Agent を再インストール、アップグレード、またはダウングレードすると `/etc/init/datadog-agent.conf` ファイルは上書きされます。Agent を v7.32.3/v6.32.3 以上にアップグレードするまで、Agent をアップグレード、ダウングレード、再インストールするとこの手順を再度実行しなければなりません。

### Windows

1. マシン上で管理者用の PowerShell を実行します。
2. 次のスニペットを実行します。
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Datadog Agent サービスを再起動して、変更を適用します。

**注**: これは、ホスト上で実行されているすべての JVM に適用されます。

### AIX

`Jmxfetch.jar` は AIX エージェントのインストールバンドルに含まれていますが、AIX エージェント内には `jmxfetch` を実行するコードはありません。手動で `jmxfetch` プロセスを起動しない場合は、`jmxfetch.jar` は使用されないので `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar` から削除してかまいません。

手動で `jmxfetch.jar` を実行する場合は、Java プロセスに以下のフラグを渡してください: `‐Dlog4j2.formatMsgNoLookups=True`


## コンテナ化された Agent

**注**: 環境変数 LOG4J_FORMAT_MSG_NO_LOOKUPS を true に設定すると、リモートでコードが実行される危険性を緩和できますが、完全な緩和策ではありません。

### Docker (Linux および Windows)

datadog-agent コンテナを実行する際に、`docker run` コマンドに以下の環境変数を追加して指定します: `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### Kubernetes

環境変数 `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` を `agent` コンテナ、またはすべての Datadog コンテナで設定します。Datadog の公式 Helm チャートで、`datadog.env` の値の下に、環境変数を追加します。例:

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```

## お使いの Agent のバージョンが脆弱かどうかの確認

### ダッシュボードを使用した場合

Datadog Agent (>= 6.17.0 - <= 6.32.2、>= 7.17.0 - <= 7.32.2) が推奨バージョン (6.32.3/7.32.3 以降) で、Log4j の脆弱なバージョンで動作していないか確認するには、以下のダッシュボードテンプレートを Datadog アカウントに[インポート][4]します。

[**Datadog Agent Version Check ダッシュボードテンプレート**][5]
</br>
</br>
{{< img src="agent/faq/dashboard.png" alt="Datadog Agent Version Check ダッシュボードで脆弱な Agent を表示" >}}

このダッシュボードの複数のバージョンを複数の Datadog アカウントまたはホスト用に作成するには、ダッシュボード API を使用して作成プロセスを自動化することができます。JSON ファイルが保存されているディレクトリで、以下のコマンドを実行します。

```curl
curl -X POST "https://api.datadoghq.com/api/v1/dashboard" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @DatadogAgentVersionCheck.json
```

**注**: Datadog Agent Version Check ダッシュボードでは、Datadog Agent の旧バージョン (v5) は脆弱性がないため、表示されません。

### CLI を使用した場合

Agent CLI の `version` サブコマンドを使用して、特定の Agent のバージョン情報を確認することもできます。詳細については、[Agent CLI ドキュメント][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://logging.apache.org/log4j/2.x/security.html
[3]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst#7322--6322
[4]: /ja/dashboards/#copy-import-or-export-dashboard-json
[5]: /resources/json/agent-version-dashboard.json
[6]: /ja/agent/guide/agent-commands/?tab=agentv6v7#other-commands
