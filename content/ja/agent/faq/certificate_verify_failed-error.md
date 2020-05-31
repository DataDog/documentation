---
title: CERTIFICATE_VERIFY_FAILED error
kind: faq
---

CERTIFICATE_VERIFY_FAILED error
CERTIFICATE_VERIFY_FAILEDのエラーに関しまして

### What happened?

エラーの発生原因

On Saturday May 30th, 2020, at 10:48 UTC, an SSL root certificate used to cross-sign some of the Datadog certificates expired, and caused some of your agents to lose connectivity with Datadog endpoints. Because this root certificate is embedded in certain agents versions, you will need to take action to restore connectivity.
2020年5月30日 10時45分（UTC）にDatadog証明書のクロス署名で使用されるルート証明書の有効期限が切れ、一部のお客様のAgentがDatadogへ接続できなくなりました。このルート証明書は、一部のAgentバージョンに直接インストールされているため、接続を修正するにはお客様に実施して頂く対応があります。

### What versions of the Agent are affected?

影響を受けるバージョン

Agent versions spanning 3.6.x to 5.32.6 embed the expired certificate and are affected.
Agent versions 6.x and 7.x are fine and don’t need to be updated.
Agentバージョン3.6.xから5.32.6までは有効期限切れのルート証明書を直接インストールしており、影響を受けています。
Agentバージョン6.xおよび7.xは影響を受けず、アップデートの必要がありません。

### How can I find a list of hosts running affected Agent versions?

影響を受けるホストの検索方法

We have published a [python script][1] that queries your Datadog account for hosts running impacted agent versions. It finds hosts that run Datadog Agent with version less than 5.32.7, and writes their hostnames to a file ordered by version.
お客様のDatadogアカウントで影響を受けているAgentバージョンをインストールしているホストをクエリするPythonスクリプトを用意しました。このスクリプトは、Datadog Agentバージョン5.32.7より以前のバージョンをインストールしているホストを検索し、ホスト名をバージョンの順にファイルに出力します。

1. Download the [python script][1].
2. Run it in your local terminal or shell.
US Datacenter: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us`
EU Datacenter: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu`
3. Find the CSV output in hosts_agents.csv.

1. [Pythonスクリプト][1]をダウンロードする
2. ローカルターミナルもしくはシェルで下記のコマンドを実行する
USサイト: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us`
EUサイト: `python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu`
3. CSVはhosts_agents.csvというファイルに出力される

Get the API and APP key [here][4] (`.eu` for EU site).
APIとApp Keyを[こちら][4]から取得します（EUサイトは`.eu`で）。

### Fixing without upgrading the Agent

Agentをアップグレードせずに対応する方法

We’re actively working on a new version of agent 5 but if you’d like to address this without an update, the following is the quickest path to resolution.
本問題の修正を含む最新のAgent 5バージョンを準備していますが、アップグレードしたくない場合はこちらの手順をご参照ください。こちらの手順は直接インストールされたAgentのルート証明書を削除します。
 
 
On Linux:
Linuxの場合
シェルで下記のコマンドを実行します。
```shell
sudo rm /opt/datadog-agent/agent/datadog-cert.pem && sudo service datadog-agent restart
```

On Windows:
Windowsの場合

Using PowerShell, take the following actions:
PowerShellで下記のコマンドを実行します。

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
net stop /y datadogagent ; net start /y datadogagent
```

Or through the Windows GUI:
WindowsのGUIで：

Delete datadog-cert.pem. You can locate this in: C:\Program Files (x86)\Datadog\Datadog Agent\files\. Once removed, simply restart the Datadog Service from the Windows Service Manager.
C:\Program Files (x86)\Datadog\Datadog Agent\files\にあるdatadog-cert.pemを削除します。その後に、Windows Service ManagerでDatadog Agentのサービスを再起動します。

### Fixing by upgrading the Agent

Agentをアップグレードして対応する方法

Upgrade to Agent 5.32.7.
Agent 5.32.7バージョンにアップグレードします。
Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`  
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`  
Windows (from versions > 5.12.0): Download the Datadog [Agent installer][7]. `start /wait msiexec /qn /i ddagent-cli-latest.msi`  
More platforms and configuration management options detailed [here][8].

Upgrade to [Agent 7][2].
[Agent 7][2]バージョンにアップグレードします。
Upgrade to [Agent 6][3].
[Agent 6][3]バージョンにアップグレードします。

**NOTE:** See Agent CHANGELOG for backward incompatible changes for Agent 6 and 7.
**注意：**Agent 6 and 7における下位互換性のない変更点については、Agent CHANGELOGをご確認ください。

### Should I update my agent even if I deleted the certificate?

証明書を削除した後でも、Agentをアップグレードする必要はありますか。

We recommend keeping up to date and updating to the latest version of the agent. Deployments set to auto-update will do so with 5.32.7.
最新のAgentバージョンにアップグレードすることを推奨します。自動更新が設定されているデプロイメントについては、自動的にAgent 5.32.7バージョンにアップグレードします。
 
### Am I still encrypting traffic with SSL even if I delete the certificate?

証明書を削除した後でも、SSL通信は暗号化されますか。

Yes. The certificate is just a preset for the client to use and is not necessary to connect via SSL. Datadog agent endpoints only accept SSL traffic.
証明書を削除した後でも、Agentからの通信が暗号化されます。この証明書は、クライアントのデフォルト証明書で、SSL接続するには必須ではありません。Datadog AgentのエンドポイントはSSLでの通信のみを受信しています。

[1]: https://static.datadoghq.com/find_agents_with_connectivity_problems.py
[2]: /agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[3]: /agent/versions/upgrade_to_agent_v6/?tab=linux
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.eu/account/settings#api
[6]: https://github.com/DataDog/dd-agent/releases/tag/5.32.7
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[8]: https://app.datadoghq.com/account/settings?agent_version=5#agent
