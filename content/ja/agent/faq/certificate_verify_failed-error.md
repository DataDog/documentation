---
title: CERTIFICATE_VERIFY_FAILED エラー
kind: faq
---

CERTIFICATE_VERIFY_FAILED のエラーに関しまして

### エラーの発生原因

2020年5月30日 10時45分（UTC）に Datadog 証明書のクロス署名で使用されるルート証明書の有効期限が切れ、一部のお客様の Agent が Datadog へ接続できなくなりました。このルート証明書は、一部の Agent バージョンに直接インストールされているため、接続を修正するにはお客様に実施して頂く対応があります。

### 影響を受けるバージョン

Agent 3.6.x から 5.32.6 までは有効期限切れのルート証明書を直接インストールしており、影響を受けています。
Agent 6.x および 7.x は影響を受けず、アップデートの必要がありません。

### 影響を受けるホストの検索方法

お客様の Datadog アカウントで影響を受けている Agent バージョンをインストールしているホストを検索するために、Webアプリで[Agent Versionsのページ][1]を用意しました。ホスト名やAgentバージョンやAgentの状態を表示されているページです。

注意：以前、影響を受けるホストをクエリするPythonのスクリプトを用意しましたが、アプリ内のページの正確度の方が高いですので、[Agent Versionsのページ][1]を参考にしてください。

### Agent 5.32.7 にアップグレードして対応する方法

現状 Agent 5.x を使用している場合、Agent 5.32.7+ へのアップグレードを推奨します。新しいバージョンの Agent を使用することにより、様々な場面におけるより安定した稼働を期待できます。

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`
Windows (5.12.0より新しいバージョン): Datadog [Agent installer][7]をダウンロードする. `start /wait msiexec /qn /i ddagent-cli-latest.msi`
その他のプラットフォームや構成については、[こちら][8]に詳細があります。

### Agent をアップグレードせずに対応する方法

*Linux*

```shell
sudo rm -f /opt/datadog-agent/agent/datadog-cert.pem && sudo /etc/init.d/datadog-agent restart
```

*Windows CLI*

Agent `>= 5.12.0` の場合は、PowerShell で下記のコマンドを実行します。

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
net stop /y datadogagent ; net start /y datadogagent
```

Agent `<= 5.11` を使用している場合、場所が異なります。
64-bit の Windows において、32-bit の Agent `<= 5.11` を使用している場合:

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

Agent `<= 5.11` を使用している場合:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*Windows GUI*

`C:\Program Files (x86)\Datadog\Datadog Agent\files\` にある `datadog-cert.pem` を削除します。
（64-bit の Windows において、32-bit の Agent `<= 5.11` を使用している場合、場所は `C:\Program Files(x86)\Datadog\Datadog Agent\files\` です。Agent `<= 5.11` を使用している場合、場所は`C:\Program Files\Datadog\Datadog Agent\files\`です）。証明書を削除した後に、Windows Service Manager で Datadog Agent のサービスを再起動します。

### Agent 6 / Agent 7 にアップグレードして対応する方法

[Agent 6][3] もしくは[Agent 7][2] にアップグレードして本問題を回避します。Agent 6 / Agent 7 における下位互換性のない変更点については、Agent CHANGELOG をご確認ください。

### 証明書を削除した後でも、Agentをアップグレードする必要はありますか。

最新のAgentバージョンにアップグレードすることを推奨します。自動更新が設定されているデプロイメントについては、自動的に Agent 5.32.7 にアップグレードします。

### 証明書を削除し後でも、SSL通信は暗号化されますか。

証明書を削除した後でも、Agent からの通信が暗号化されます。この証明書は、クライアントのデフォルト証明書で、SSL 接続するには必須ではありません。Datadog Agent のエンドポイントは SSL での通信のみを受信しています。

[1]: https://app.datadoghq.com/agent-versions
[2]: /agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[3]: /agent/versions/upgrade_to_agent_v6/?tab=linux
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.eu/account/settings#api
[6]: https://github.com/DataDog/dd-agent/releases/tag/5.32.7
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[8]: https://app.datadoghq.com/account/settings?agent_version=5#agent
