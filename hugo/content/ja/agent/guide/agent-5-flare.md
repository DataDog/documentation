---
aliases:
- /ja/agent/guide/windows-flare-agent-5
disable_toc: false
private: true
title: Agent 5 フレアを送信
---

このページでは、 Agent 5 が使用するポートについて説明します。 Agent の最新バージョンに関する情報は、 [フレアを送信][1]を参照してください。

| プラットフォーム   | コマンド                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <ポッド名> -it /etc/init.d/datadog-agent flare <ケース_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| SUSE       | `sudo service datadog-agent flare <CASE_ID>`                            |
| ソース     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | 詳細は [Windows セクション](#windows)を参照してください。                                             |

**注**: Linux ベースのシステムを使用していて `service` ラッパーコマンドが利用できない場合は、 [代替案の一覧][3]を参照してください。

## Windows

Datadog のサポートチームに Windows のログと構成のコピーを送信するには、次の手順に従います。

* Datadog Agent Manager を開きます。

* Actions を選択します。

* Flare を選択します。

* チケット番号を入力します (お持ちでない場合は、値をゼロのままにしてください)。

* Datadog へのログインに使用するメールアドレスを入力します。

{{< img src="agent/faq/windows_flare.jpg" alt="Windows フレア" style="width:70%;">}}

PowerShell では、次の flare コマンドを使用できます。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

cmd.exe では、次のようにします。

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### フレアのアップロードの失敗

flare コマンドの出力で、圧縮されたフレアアーカイブが保存されているディレクトリがわかります。Datadog へのファイルアップロードに失敗した場合は、このディレクトリからファイルを取得して、メールの添付ファイルとして手動で追加することができます。フレアファイルの保存場所 (共通) :
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

Windows で古いバージョンの Agent を使用している場合、このファイルの場所を見つけるには、Agent の Python コマンドプロンプトから以下を実行します。

**ステップ 1**:

* Agent v5.12+ の場合:
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* 古いバージョンの Agent の場合:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**ステップ 2**:

```python
import tempfile
print tempfile.gettempdir()
```

例:

{{< img src="agent/faq/flare_fail.png" alt="フレア失敗" style="width:70%;">}}

Agent の最新バージョンに関する情報については、 [Windows ドキュメント][2]を参照してください。

[1]: /ja/agent/troubleshooting/send_a_flare
[2]: /ja/agent/basic_agent_usage/windows/#agent-v5
[3]: /ja/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands