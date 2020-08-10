---
title: CERTIFICATE_VERIFY_FAILED エラー
kind: faq
---
### 事象

2020 年 5 月 30 日土曜日の 10:48 UTC に、Datadog 証明書の一部に相互署名するために使用される SSL ルート証明書が期限切れになり、一部の Agent が Datadog エンドポイントとの接続を失いました。このルート証明書は特定の Agent バージョンに埋め込まれているため、接続を回復するには対応が必要です。

### 影響を受ける Agent のバージョン

3.6.x から 5.32.6 までの Agent バージョンには、期限切れの証明書が埋め込まれており、影響があります。

Agent バージョン 6.x と 7.x は問題なく、更新する必要はありません。

### 影響を受ける Agent バージョンを実行しているホストのリストを見つけるには？

Datadog UI の [Agent バージョンリスト][1]を使用して、ホスト名、そのホストが実行している Agent のバージョン、およびそのホストのステータスを確認してください。

**注**: 影響を受ける Agent バージョンを実行しているホストについて Datadog アカウントにクエリを実行する以前推奨されていた Python スクリプトは、アプリケーションで使用できるようになったリストを優先して非推奨になりました。

### Agent 5.32.7 へのアップグレードによる修正

現在 64 ビットホストで Agent 5.x を実行している場合、Datadog は Agent 5.32.7 以降へのアップグレードを推奨しています。これにより、最小限の変更で、Agent がさまざまな異なるシナリオで機能し続けることが保証されます。

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`
Windows (バージョン > 5.12.0): Datadog [Agent インストーラー][2]をダウンロードします。`start /wait msiexec /qn /i ddagent-cli-latest.msi`
他のプラットフォームやコンフィギュレーション管理オプションの詳細については、[Agent のインストールページ][3]をご覧ください。

32 ビットシステム用にリリースされた最新の互換 Agent は 5.10.1 でした。32 ビットホストの場合は、`Agent をアップグレードせずに修正する` の手順に従ってください。

### Agent をアップグレードせずに修正する

#### Linux

```shell
sudo rm -f /opt/datadog-agent/agent/datadog-cert.pem && sudo /etc/init.d/datadog-agent restart
```

#### Windows

Agent がプロキシを使用するように構成されている場合は、代わりに[下記の専用セクション](#windows-agent-5-x-configured-to-use-a-proxy-or-the-curl-http-client)に従ってください。

*CLI の使用*

PowerShell を使用して、Agent `>= 5.12.0` に対して次のアクションを実行します。

```shell
rm "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

Agent バージョン `<= 5.11` の場合は、場所が異なります。64 ビット Windows 上の 32 ビット Agent `<= 5.11` のユーザーの場合、手順は次のとおりです。

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

Agent `<= 5.11` の他のすべてのユーザーの手順は次のとおりです。

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*Windows GUI の使用*

`datadog-cert.pem` を削除します。このファイルは次の場所にあります。

* Agent `>=5.12.0`:
  * 64 ビット Windows: `C:\Program Files\Datadog\Datadog Agent\agent\`
  * 32 ビット Windows: Agent 5.12 以降の Datadog Agent は、32 ビットの Windows システムには対応していません。
* Agent `<= 5.11.x`:
  * 64 ビット Windows: `C:\Program Files (x86)\Datadog\Datadog Agent\files\`
  * 32 ビット Windows: `C:\Program Files\Datadog\Datadog Agent\files\`

ファイルが削除されたら、Windows サービスマネージャーから Datadog サービスを再起動します。

### Agent 6 または 7 へのアップグレードによる修正

[Agent 7][4] または [Agent 6][5] にアップグレードすることでこの問題を解決できますが、*Agent 6 および 7 の下位互換性のない変更については、Agent CHANGELOG を参照してください。*

### 証明書を削除した場合でも、Agent をアップグレードする必要がありますか？

Datadog は、Agent を最新の状態に保ち、最新バージョンに更新することをお勧めします。自動更新に設定されているデプロイの場合、5.32.7 で更新されます。

### 証明書を削除しても、トラフィックは SSL で暗号化されますか？

はい。証明書は、クライアントが使用するためのプリセットであり、SSL 経由で接続する必要はありません。Datadog Agent エンドポイントは SSL トラフィックのみを受け入れます。

### プロキシまたは curl http クライアントを使用するように構成された Windows Agent 5.x

Agent が次のいずれかのように構成されている場合、このセクションは Windows Agent 5.x (`<= 5.32.6`) に適用されます。

* `datadog.conf` の `proxy_host` コンフィギュレーションオプションまたは `HTTPS_PROXY` 環境変数でプロキシを使用する、または
* `datadog.conf` の `use_curl_http_client: yes` コンフィギュレーションオプションで curl HTTP クライアントを使用する

注: `datadog.conf` は `C:\ProgramData\Datadog\datadog.conf` にあります。

この場合、`datadog-cert.pem` を削除しても、Agent は Datadog への接続を回復できません。代わりに、次のアクションを実行します。

* Windows Agent v5, `>= 5.12.0`: `datadog-cert.pem` ファイルを 5.32.7 に付属しているバージョンに置き換えます。Powershell CLI の使用:

```shell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/5.32.7/datadog-cert.pem" -OutFile "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

* Windows Agent v5, `<= 5.11.x`: Agent が提供する `Datadog Agent Manager` プログラムを使用するか、`datadog.conf` ファイルを直接編集して、`datadog.conf` に次のオプションを設定します。
  * 64 ビット Windows: `ca_certs: C:\Program Files (x86)\Datadog\Datadog Agent\files\ca-certificates.crt`
  * 32 ビット Windows: `ca_certs: C:\Program Files\Datadog\Datadog Agent\files\ca-certificates.crt`

  `datadog.conf` が更新された後、Windows サービスマネージャーから Datadog サービスを再起動します。


[1]: https://app.datadoghq.com/agent-versions
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[3]: https://app.datadoghq.com/account/settings?agent_version=5#agent
[4]: /ja/agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[5]: /ja/agent/versions/upgrade_to_agent_v6/?tab=linux