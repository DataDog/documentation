---
title: CERTIFICATE_VERIFY_FAILEDエラー
kind: faq
---

CERTIFICATE_VERIFY_FAILEDのエラーに関しまして

### エラーの発生原因

2020年5月30日 10時45分（UTC）にDatadog証明書のクロス署名で使用されるルート証明書の有効期限が切れ、一部のお客様のAgentがDatadogへ接続できなくなりました。このルート証明書は、一部のAgentバージョンに直接インストールされているため、接続を修正するにはお客様に実施して頂く対応があります。

### 影響を受けるバージョン

Agentバージョン3.6.xから5.32.6までは有効期限切れのルート証明書を直接インストールしており、影響を受けています。
Agentバージョン6.xおよび7.xは影響を受けず、アップデートの必要がありません。

### 影響を受けるホストの検索方法

お客様のDatadogアカウントで影響を受けているAgentバージョンをインストールしているホストをクエリする[Pythonスクリプト][1]を用意しました。このスクリプトは、Datadog Agentバージョン5.32.7より以前のバージョンをインストールしているホストを検索し、ホスト名をバージョンの順にファイルに出力します。

1. [Pythonスクリプト][1]をダウンロードする
2. ローカルターミナルもしくはシェルで下記のコマンドを実行する
USサイト: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us`
EUサイト: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu`
3. CSVはhosts_agents.csvというファイルに出力される

APIとApp Keyを[こちら][4]から取得します（EUサイトは`.eu`で）。

### Agentをアップグレードせずに対応する方法

本問題の修正を含む最新のAgent 5バージョンを準備していますが、アップグレードしたくない場合はこちらの手順をご参照ください。こちらの手順は直接インストールされたAgentのルート証明書を削除します。

Linuxの場合：
シェルで下記のコマンドを実行します。
```shell
sudo rm /opt/datadog-agent/agent/datadog-cert.pem && sudo service datadog-agent restart
```

Windowsの場合：

Using PowerShell, take the following actions:
PowerShellで下記のコマンドを実行します。

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
net stop /y datadogagent ; net start /y datadogagent
```

WindowsのGUIの場合：

C:\Program Files (x86)\Datadog\Datadog Agent\files\にあるdatadog-cert.pemを削除します。その後に、Windows Service ManagerでDatadog Agentのサービスを再起動します。

### Agentをアップグレードして対応する方法

Agent 5.32.7バージョンにアップグレードします。

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`  
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`  
Windows (5.12.0より新しいバージョン): Datadog [Agent installer][7]をダウンロードする. `start /wait msiexec /qn /i ddagent-cli-latest.msi`  
その他のプラットフォームや構成については、[こちら][8]に詳細があります。

[Agent 7][2]バージョンにアップグレードします。

[Agent 6][3]バージョンにアップグレードします。

**注意：**Agent 6 and 7における下位互換性のない変更点については、Agent CHANGELOGをご確認ください。

### 証明書を削除した後でも、Agentをアップグレードする必要はありますか。

最新のAgentバージョンにアップグレードすることを推奨します。自動更新が設定されているデプロイメントについては、自動的にAgent 5.32.7バージョンにアップグレードします。
 
### 証明書を削除し後でも、SSL通信は暗号化されますか。

証明書を削除した後でも、Agentからの通信が暗号化されます。この証明書は、クライアントのデフォルト証明書で、SSL接続するには必須ではありません。Datadog AgentのエンドポイントはSSLでの通信のみを受信しています。

[1]: https://static.datadoghq.com/find_agents_with_connectivity_problems.py
[2]: /agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[3]: /agent/versions/upgrade_to_agent_v6/?tab=linux
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.eu/account/settings#api
[6]: https://github.com/DataDog/dd-agent/releases/tag/5.32.7
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[8]: https://app.datadoghq.com/account/settings?agent_version=5#agent
