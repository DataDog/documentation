---
categories:
  - プロファイリング
  - セキュリティ
description: Snyk による脆弱性プロファイルとレポート
doc_link: 'https://docs.datadoghq.com/integrations/snyk/'
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/snyk.md'
has_logo: true
integration_title: Snyk
is_public: true
kind: インテグレーション
name: snyk
public_title: Datadog-Snyk インテグレーション
short_description: Snyk による脆弱性プロファイルとレポート
version: '1.0'
integration_id: snyk
further_reading:
  - link: 'https://www.datadoghq.com/partner/snyk/'
    tag: パートナーページ
    text: Datadog による Snyk モニタリング
---
## 概要

Snyk インテグレーションにより、[Datadog Continuous Profiler][1] で Java ライブラリの脆弱性を検出することが可能になります。[Snyk の Intel Vulnerability DB][2] を使用して CVE (共通の脆弱性と危険度: Common Vulnerabilities and Exposures) 分析が実行されます。

## セットアップ

### インストール

1. [Snyk アカウント][3]を作成。

2. 以下の[セットアップガイド][4]に従い、[Datadog Continuous Profiler][1] を有効にします。Datadog Continues Profiler をご利用のお客様のみがインテグレーションを使用できます。

3. [`datadog-ci`][5] および [`snyk`][6] をインストール:

{{< code-block lang="bash" >}}
npm install --save-dev @datadog/datadog-ci snyk
{{< /code-block >}}

4. ご使用のビルドで、[Snyk CLI を認証][7]:

{{< code-block lang="bash" >}}
snyk auth ”$YOUR_SNYK_TOKEN”
{{< /code-block >}}

### コンフィギュレーション

1. ご使用のビルドで[依存関係グラフファイルを生成][8]:

{{< code-block lang="bash" >}}
snyk test --print-deps --json > deps.json
{{< /code-block >}}

複数プロジェクトのリポジトリがある場合は、Snyk コマンドに `--file=<package file>` を追加します（例: `--file=<pom.xml>`）。詳しくは、[Snyk ドキュメント][9]を参照してください。

2. 正確な分析には、デプロイメントのバージョンとサービスタグを追加します。詳細は[統合サービスのタグ付け][10]をご確認ください。

3. 最後に、依存関係のグラフを Datadog にアップロードします。

{{< code-block lang="bash" >}}
datadog-ci dependencies upload deps.json --source snyk --service <SERVICE> --release-version <VERSION>
{{< /code-block >}}

デフォルトで、このコマンドはリクエストを Datadog US に送信します。Datadog EU をご利用の場合は、 `DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。

サービスのデプロイ後数分すると、[Profiles][11] ページの “Vulnerability” 列が生成され、そのサービスの最高レベルの脆弱性が表示されます。サービスの CVE 脆弱性に関する詳細は、サイドバーの Analysis タブで確認できます（サービスの詳細ビュー）。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/tracing/profiler/
[2]: https://snyk.io/product/vulnerability-database/
[3]: https://snyk.io/signup?utm_medium=Partner&utm_source=Datadog&utm_campaign=Datadog-Profiler-2020
[4]: https://docs.datadoghq.com/ja/tracing/profiler/#getting-started
[5]: https://github.com/DataDog/datadog-ci
[6]: https://support.snyk.io/hc/en-us/articles/360003812538-Install-the-Snyk-CLI
[7]: https://support.snyk.io/hc/en-us/articles/360004008258
[8]: https://support.snyk.io/hc/en-us/articles/360003817357-Snyk-for-Java-Gradle-Maven-#UUID-95b4d4f4-3959-49fe-fffb-d6c9e8160c5a
[9]: https://support.snyk.io/hc/en-us/articles/360003812578-CLI-reference
[10]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[11]: https://app.datadoghq.com/profiling
[12]: /ja/help/