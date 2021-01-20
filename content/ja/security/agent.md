---
title: Agent のセキュリティ
kind: documentation
description: Datadog Agent のセキュリティ対策
aliases:
  - /ja/agent/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Datadog に送信されるデータの主要カテゴリを確認する
---
<div class="alert alert-info">このページは Datadog のセキュリティに関するものです。セキュリティ監視製品をお探しの場合は、<a href="/security_monitoring" target="_blank">セキュリティ監視セクション</a>をご覧ください。</div>

この記事は、[データセキュリティに関するドキュメントシリーズ][1]の一部です。

お客様は、ローカルにインストールされた [Agent][2] または [HTTP API][3] を使用して Datadog サービスにデータを送信できます。Datadog を使用する上で Datadog Agent を必ず使用しなければならないわけではありませんが、大半のお客様が Agent を利用しています。ここでは、安全な環境を維持するためにお客様が利用できる主なセキュリティ機能について説明します。

## Agent ディストリビューション

Agent の公式リポジトリおよび/またはバイナリパッケージは署名されています。次の公開鍵のいずれかに対して署名を確認して、ディストリビューションチャンネルを確認します。

- APT リポジトリメタデータ:
  - [A2923DFF56EDA6E76E55E492D3A80E30382E94DE](https://keyserver.ubuntu.com/pks/lookup?op=hget&search=d1402d39517b9f8888abfc98d6936dab)
  - [D75CEA17048B9ACBF186794B32637D44F14F620E](https://keyserver.ubuntu.com/pks/lookup?op=hget&search=3e8510ce571008616b42bd67916e83f8)
- RPM packages and repo metadata:
  - [C6559B690CA882F023BDF3F63F4D1729FD4BF915](https://yum.datadoghq.com/DATADOG_RPM_KEY_20200908.public)
  - [A4C0B90D7443CF6E4E8AA341F1068E14E09422B3](https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public)
  - [60A389A44A0C32BAE3C03F0B069B56F54172A230](https://yum.datadoghq.com/DATADOG_RPM_KEY.public) (Agent 6 and older only)
- Windows MSI:
  - DigiCert certificate fingerprint 21fe8679bdfb16b879a87df228003758b62abf5e
- MacOS PKG:
  - Apple 証明書のフィンガープリント FDD2ADF623EA75E62C6DC6DBFBA7520CA549AB7314E660D78B0E3DCCF15B2FBA

## 情報セキュリティ

Datadog Agent は、デフォルトで、TLS で暗号化された TCP 接続を介して Datadog にデータを送信します。バージョン 6 では、Datadog への接続時に TLS 1.2 を強制するように Agent を設定できます。たとえば、PCI の要件を満たすために、"強力な暗号化" を使用する必要がある場合は、Agent v6 を使用し、Agent の構成ファイルで `force_tls_12: true` を設定してください。

## ネットワークとプロキシ

Datadog は SaaS 製品です。監視データを送信するには、お客様のネットワークから公共のインターネットへのアウトバウンド接続を確立する必要があります。トラフィックは常に Agent から Datadog へと開始され、デフォルトでは、TLS で暗号化された TCP 接続を介して行われます。Datadog から Agent へのセッションが開始されることはありません。ファイアウォールを構成して必要な Datadog のドメインとポートをホワイトリストに登録する方法については、Agent の[ネットワーク][4]のページを参照してください。さらに、公共のインターネットに直接接続していないホスト、またはアウトバウンドトラフィックが制限されているホストを監視する場合は、監視データを[プロキシ][5]経由で送信することを検討してください。

## Agent ログの難読化

Datadog Agent は、[Agent のトラブルシューティング][6]をサポートするため、必要に応じてローカルにログを生成します。安全対策として、これらのローカルログは、何らかの資格情報 (API キー、パスワード、トークンキーワードなど) を表している可能性があるいくつかのキーワードとパターンを使用してフィルターされた後、難読化されてからディスクに書き込まれます。

## ローカル HTTPS サーバー

Agent v6 は、実行中の Agent と Agent ツール (たとえば、`datadog-agent` コマンド) の間の通信を容易にするために、ローカル HTTPS API を公開しています。API サーバーは、ローカルネットワークインターフェイス (`localhost/127.0.0.1`) からのみアクセスすることができ、Agent を実行しているユーザーだけが読み取ることができるトークンを使用して認証が強制されます。ローカル HTTPS API への通信は、`localhost` 上での傍受から保護するため、転送時に暗号化されます。

## Agent GUI

Agent v6 には、デフォルトでグラフィカルユーザーインターフェイス (GUI) が付属しており、デフォルトの Web ブラウザで起動します。この GUI は、GUI を起動するユーザーが、Agent の構成ファイルを開く権限も含めて、正しいユーザーアクセス許可を持つ場合にのみ起動されます。GUI には、ローカルネットワークインターフェイス (`localhost/127.0.0.1`) からのみアクセスできます。最後に、GUI は、GUI サーバーとのすべての通信を認証し、クロスサイトリクエストフォージェリ (CSRF) 攻撃から防御するために使用するトークンを生成して保存するため、ユーザーの cookie を有効にする必要があります。必要に応じて、GUI を完全に無効にすることもできます。

## Agent のセキュリティスキャン

Datadog の脆弱性管理プログラムには、サポート用インフラストラクチャー/アプリケーションコンポーネントの定期評価が含まれています。たとえば、サポート用コアサービスのアクティブスキャンを行います。Datadog のセキュリティチームは、Datadog の脆弱性管理ポリシーに従って月 1 回のスキャンを実施して、構成やソフトウェアの脆弱性を特定し、見つかった脆弱性の修正状況を追跡します。

特に Container Agent に関しては、Datadog は [CoreOS の Clair][7] と [snyk.io][8] を使用して定期的に脆弱性統計情報の分析を実施しています。さらに、Container Agent を [Docker Trusted Registry][9] や [Red Hat Container Catalog][10] にリリースする際にセキュリティスキャンを利用しています。Datadog の社内脆弱性管理プログラムに加えて、Datadog はコンテナセキュリティベンダーとも連携しています。

Detadog のセキュリティにバグを発見された場合は、[security@datadoghq.com][11] にご連絡ください。24 時間以内に対応いたします。Datadog との通信を暗号化する必要がある場合は、Datadog の [PGP キー][12]をダウンロードできます。発見した問題が解決されるまで、問題を公表されないようにお願いいたします。

## 機密情報管理

Agent の構成ファイルに機密情報がプレーンテキストで格納されることを避ける必要がある場合は、[機密情報管理][13]パッケージを利用できます。このパッケージを使用すると、Agent は、ユーザー提供の実行プログラムを呼び出して機密情報の取得や解読を処理してから、処理した機密情報をメモリにロードします。ユーザーは、任意のキー管理サービス、認証方法、継続的インテグレーションワークフローを使用して、柔軟に実行プログラムを設計できます。

詳細については、[秘密情報管理][14]のドキュメントを参照してください。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/
[2]: /ja/agent/
[3]: /ja/api/
[4]: /ja/agent/faq/network/
[5]: /ja/agent/proxy/
[6]: /ja/agent/troubleshooting/
[7]: https://coreos.com/clair
[8]: https://snyk.io
[9]: https://docs.docker.com/v17.09/datacenter/dtr/2.4/guides
[10]: https://access.redhat.com/containers
[11]: mailto:security@datadoghq.com
[12]: https://www.datadoghq.com/8869756E.asc.txt
[13]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md
[14]: /ja/agent/guide/secrets-management/