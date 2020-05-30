---
title: CERTIFICATE_VERIFY_FAILED error
kind: faq
---

CERTIFICATE_VERIFY_FAILED error
CERTIFICATE_VERIFY_FAILEDのエラー

### What happened?

エラーの詳細や原因

On Saturday May 30th, 2020, at 10:48 UTC, an SSL root certificate used to cross-sign some of the Datadog certificates expired, and caused some of your agents to lose connectivity with Datadog endpoints. Because this root certificate is embedded in certain agents versions, you will need to take action to restore connectivity.
２０２０年５月３０日１０時４５分（UTC時間）にDatadogの証明書をクロス署名されたルート証明書が有効期限切れて、一部のお客様のAgentがDatadogへの接続がなくなりました。有効期限切れるルート証明書が一部のAgentのバージョンには直接にインストールされたから、接続が有効にするために、直す方法が必要になります。

### What versions of the Agent are affected?

影響されたバージョンは？
Agent versions spanning 3.6.x to 5.32.6 embed the expired certificate and are affected.
Agent versions 6.x and 7.x are fine and don’t need to be updated.
3.6版から5.32.6版までのバージョンは有効期限切れるルート証明書が直接にインストールされたから、直す必要になります。

全ての６版と７版のAgentは影響されていません。影響されていないAgentが直す必要になりません。

### How can I find a list of hosts running affected Agent versions?

影響されたホストのリストを検索する方法。

We have published a python script that queries your Datadog account for hosts running impacted agent versions. It finds hosts that run Datadog Agent with version less than 5.32.7, and writes their hostnames to a file ordered by version.
お客様のDatadogアカウントにあるホストの中に影響されているAgentがインストールされているホストリストを取得するスクリプトを準備しました。Pythonのスクリプトが5.32.6版より古いAgent がインストールされているホストをファイルに書き込みます。
Download the python script.
Run it in your local terminal or shell.
US Datacenter: python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us
EU Datacenter: python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu
Find the CSV output in hosts_agents.csv.
手順
Pythonのスクリプトをダウンロードする
シェルで下記のコマンドを実行します
USのサイト: python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us
EUのサイト: python3 find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu
CSVの出力がhosts_agents.csvというファイルにあります。
Get the API and APP key here (or here for EU site).
お客様のAPIとApp Keyはこちらのリンクにあります。（EUのサイトはこちら）

### Fixing without upgrading the Agent
Agentをアップグレードなしでの直す方法

We’re actively working on a new version of agent 5 but if you’d like to address this without an update, the following is the quickest path to resolution.
Agent 5の新しいバージョンを準備していますが、アップグレードしたくない場合にはこちらの手順を参考にしてください。こちらの手順は直接にインストールされたAgentのルート証明書を削除します。
 
 
On Linux:
Linuxの場合
シェルで下記のコマンドを実行します。
sudo rm /opt/datadog-agent/agent/datadog-cert.pem && sudo service datadog-agent restart
On Windows:
Windowsの場合
Using PowerShell, take the following actions:
PowerShellで下記のコマンドを実行します。
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
net stop /y datadogagent ; net start /y datadogagent
Or through the Windows GUI:
WindowsのGUIで：
Delete datadog-cert.pem. You can locate this in: C:\Program Files (x86)\Datadog\Datadog Agent\files\. Once removed, simply restart the Datadog Service from the Windows Service Manager.
C:\Program Files (x86)\Datadog\Datadog Agent\files\にあるdatadog-cert.pemというルート証明書を削除します。削除した後で、Windows Service ManagerでDatadog Agentのサービスを再起動します。

### Fixing by upgrading the Agent
Agentをアップグレードする方法で直し方

Upgrade to Agent 5.32.7.
Agent 5.32.7版までアップグレード
Upgrade to Agent 7.
Agent ７版までアップグレード
Upgrade to Agent 6.
Agent ６版までアップグレード
NOTE: See Agent CHANGELOG for backward incompatible changes for Agent 6 and 7.
注意：Agent 6 and 7までアップグレードするとき、過去のバージョンより非対応な変更をAgentのChangelogに参考にしてください。

### Should I update my agent even if I deleted the certificate?

証明書を削除すると、Agentをアップグレードが必要になりますか。
We recommend keeping up to date and updating to the latest version of the agent. Deployments set to auto-update will do so with 5.32.7.
証明書を削除しても、最新のAgentバージョに保たれていることを推薦します。自動的にアップデートする設定にしたツールがある場合、5.32.7版のAgentをリリースされたとき、普通に自動的にAgentがアップグレードされます。
 
### Am I still encrypting traffic with SSL even if I delete the certificate?
証明書を削除しても、SSLの通信がエンクリプトされていますか。

Yes. The certificate is just a preset for the client to use and is not necessary to connect via SSL. Datadog agent endpoints only accept SSL traffic.
証明書を削除しても、Agentからの通信がエンクリプトされています。デフォルトでクライントが使用する証明書ですので、SSLで接続する時には必要ではありません。Agentの取得したデータをDatadogのサーバまでの送信はSSLでの通信しか受信できません。

