---
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application & API Protection で脅威から保護する
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: ユーザーアクティビティの追跡
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: 標準提供 (OOTB) の Application & API Protection ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application & API Protection のトラブルシューティング
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: Datadog Application & API Protection の仕組み
title: Datadog トレーシングライブラリを使用した Application & API Protection の有効化
type: multi-code-lang
---

## 前提条件

Application & API Protection をセットアップする前に、次の前提条件を満たしていることを確認してください:
- **Datadog Agent:** [Datadog Agent][2] をインストールし、アプリケーションのオペレーティング システム、コンテナ、クラウド、または仮想環境に合わせて構成していること。
- **サポートされるトレーシングライブラリ:** アプリケーションまたはサービスで使用されている Datadog トレーシングライブラリが、該当アプリケーションまたはサービスの言語向けの Application & API Protection 機能に対応している必要があります。詳細については、[Library Compatibility][1] のページを参照してください。

## APM トレーシングなしで AAP を利用する

APM トレース機能を使用せずに Application & API Protection を使用したい場合は、トレーシングを無効にしてデプロイすることができます。

1. 環境変数 `DD_APPSEC_ENABLED=true` に加えて、環境変数 `DD_APM_TRACING_ENABLED=false` を使用してトレーシングライブラリを構成します。
2. この構成により、Datadog に送信される APM データの量は、App and API Protection 製品が必要とする最小限の量に削減されます。

詳細は、[スタンドアロンの App and API Protection][3]を参照してください。

## 言語固有の設定

ご使用の言語およびインフラストラクチャータイプで Application & API Protection を有効にする方法の詳細を確認するには、アプリケーションの言語を選択してください。

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/setup/compatibility
[2]: /ja/agent/
[3]: /ja/security/application_security/guide/standalone_application_security/