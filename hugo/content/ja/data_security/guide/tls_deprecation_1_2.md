---
title: TLS バージョン < 1.2 に関する非推奨のお知らせ
---


## 概要

TLS (Transport Layer Security) は、Web トラフィックを保護するために使用される重要なセキュリティプロトコルです。これは、情報を交換するクライアントとサーバーの間で転送中のデータの機密性と整合性を提供します。Datadog は、2022 年 6 月 30 日から、パブリック向けの Datadog アプリケーション全体で、1.2 以下の古いバージョンの TLS (SSLv3、TLS v1.0、TLS v1.1) のサポートを無効化します。古いプロトコルが無効になった後、サポートされていないクライアントを使用して Datadog に接続した場合、接続エラーメッセージが表示されます。

### 非推奨の理由

これらのプロトコルは、お客様が安全な接続チャンネルを使用して Datadog に接続することを確実にするために、非推奨となっています。これは、2021 年 3 月 25 日をもってこれらのプロトコルを非推奨にするというインターネット技術タスクフォース (IETF) の決定に従っています。([https://datatracker.ietf.org/doc/rfc8996/][1])

## クライアントとの互換性

[How's my SSL? API][2] の説明に従って、選択したクライアントを確認してください。

## ブラウザサポート

最近のブラウザは、以前から TLS v1.2 をサポートしています。「〜を使用できますか」[互換性マトリックス][3]を参照して、お使いの特定のブラウザとバージョンが影響を受けるかどうかを判断してください。
## Agent サポート

### Agent v6 と v7

Agent v6 と v7 のすべてのバージョンは、TLS v1.2 をサポートしています。

### Agent v5

#### パッケージ化またはコンテナ化された Agent v5

下記でインストールした Agent v5 の全バージョンで TLS v1.2 をサポートしています。

* DEB/RPM パッケージ
* Windows MSI インストーラー
* 公式コンテナイメージ


#### Agent v5 ソースインストール

[ソースインストールスクリプト][4]でインストールした場合、Agent v5 はシステムの Python と OpenSSL に依存します。したがって、TLS v1.2 のサポートは、システムにインストールされた Python と OpenSSL のバージョンに依存します。

システムの Python が TLS v1.2 をサポートしているかどうか (したがって、ソースインストールされた Agent が TLS v1.2 をサポートしているかどうか) を確認するには、システムシェルから次のコマンドを実行します。

`python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` 

このコマンドは、TLS v1.2 がサポートされていれば `TLS 1.2` を、そうでなければ古い TLS バージョンかエラーを出力します。TLS v1.2 がサポートされていない場合は、システムの Python と OpenSSL をアップグレードするか、Agent を v7 にアップグレードしてください。

## 対応言語・ツール
### Openssl

OpenSSL は、Python、Ruby、PHP、Curl など多くのツールで使用されている汎用暗号およびセキュア通信のためのライブラリです。TLS v1.2 は OpenSSL 1.0.1 からサポートされています。詳細は [OpenSSL の変更点][5]を参照してください。

### Python

TLS v1.2 のサポートは、システムにインストールされている Python と OpenSSL のバージョンに依存します。

* 3.x と OpenSSL 1.0.1+ の場合、Python 3.4+
* 2.x と OpenSSL 1.0.1+ の場合、Python 2.7.9+

Python シェルから `python -c "import json, urllib2; print json.load(urllib2.urlopen('https://www.howsmyssl.com/a/check'))['tls_version']"` を実行することが可能です。TLS v1.2 がサポートされていない場合、システムの Python と OpenSSL をアップグレードしてください。

### Golang

新しいバージョンの Go (1.13 以上) を使用している場合、Go はすでにデフォルトで TLS v1.2 をサポートしているので、変更は必要ありません。

古いバージョンの Go を使用する場合は、TLS クライアント構成の MinVersion を設定して、TLS v1.2 を明示的に使用するようにします。

```
TLSClientConfig: &tls.Config{
        MinVersion: tls.VersionTLS12,
    }
```

### Java

アプリケーションが Java 1.7 または Java 1.6 (update 111 以降) で動作している場合、JVM 起動時に `https.protocols` システムプロパティを設定すると、`HttpsURLConnection` クラスを使用して行う接続に追加プロトコルを有効にすることができます。例えば、`Dhttps.protocols=TLSv1.2` を設定します。

Update 111 以前の Java 1.6、またはそれ以前のバージョンでアプリケーションを実行する場合、TLS 1.1 および 1.2 はサポートされません。そのため、アプリケーションが動作する Java のバージョンを更新する必要があります。

### .NET

組み込みの .NET クライアントを使用している場合は、[さまざまなバージョンの .NET フレームワークで TLS v1.2 にアップグレードする方法][6]に関する Microsoft ガイドをお読みください。

### Powershell

TLS v1.2 の Powershell サポートは、システムにインストールされている .NET のバージョンに依存します。正確な要件は、Microsoft の [.NET による TLS のベストプラクティス][7]ガイドをお読みください。

現在のセッションで最近のバージョンの TLS を有効にするには

```
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
[System.Net.ServicePointManager]::SecurityProtocol
Ssl3, Tls, TLs11, Tls12
```

また、Github で公開されている[コミュニティ Powershell モジュール][8]には、それを実現するものもあります。

この設定を永続化するには、[Office Online Server の TLS の有効化][9]に関する Microsoft のドキュメントに従って、レジストリを編集します。

32 ビット版 .Net Framework (バージョン 4 以上) の場合

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Wow6432Node\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

64 ビット版 .Net Framework (バージョン 4 以上) の場合

`Set-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\.NetFramework\v4.0.30319' -Name 'SchUseStrongCrypto' -Value '1' -Type DWord`

**注:** これを有効にするためには、システムを再起動する必要があります。

[1]: https://datatracker.ietf.org/doc/rfc8996/
[2]: https://www.howsmyssl.com/s/api.html
[3]: https://caniuse.com/tls1-2
[4]: https://github.com/DataDog/dd-agent/blob/5.32.8/packaging/datadog-agent/source/setup_agent.sh
[5]: https://www.openssl.org/news/changelog.html#openssl-101.
[6]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls#configuring-security-via-appcontext-switches-for-net-framework-46-or-later-versions
[7]: https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls
[8]: https://github.com/markekraus/BetterTls
[9]: https://docs.microsoft.com/en-us/officeonlineserver/enable-tls-1-1-and-tls-1-2-support-in-office-online-server