---
description: Datadog Static Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: ソースコードインテグレーションについて
is_beta: true
kind: documentation
title: Static Analysis
---

## 概要

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis は非公開ベータ版です。サポート言語は Python のみです。アクセスをリクエストするには、<a href="/help">サポートにご連絡ください</a>。
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

静的解析は、プログラムを実行する必要なく、プログラムの本番前のコードを解析するクリアボックスなソフトウェアテスト手法です。静的解析は、保守性の問題を特定し、ソフトウェア開発ライフサイクル (SDLC) の早い段階でコーディングのベストプラクティスを遵守することで、最高品質のコードのみが本番環境に投入されるようにします。

Static Analysis を使用することで、組織には次のような利点があります。

* Static Analysis は、組織のコード標準を遵守するための推測作業を排除し、開発チームが開発者のベロシティに大きな影響を与えることなく、コンプライアンスに準拠したコードを出荷できるようにします。
* Static Analysis により、長期間にわたってより読みやすいコードベースを維持できるため、組織の新しい開発者はより早くチームに加わることができます。
* 開発者がコードに新たな欠陥を持ち込むリスクが最小化されるため、コードの保守性が向上し、組織のソフトウェアが長期にわたって信頼できるようになります。

## インテグレーション

{{< whatsnext desc="Static Analysis を使用すると、さまざまな言語のコードレビューのフィードバックを任意の CI プラットフォームプロバイダーにインテグレーションできます。以下のインテグレーションについてはドキュメントを参照してください。">}}
    {{< nextlink href="continuous_integration/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="continuous_integration/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
{{< /whatsnext >}}

## セットアップ

Datadog Static Analysis を使用するには、リポジトリのルートディレクトリに `static-analysis.datadog.yml` ファイルを追加して、使用するルールセットを指定します。

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

たとえば、Python のルールの場合:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

[Datadog API とアプリケーションキー][4]を構成し、それぞれの CI プロバイダーで Static Analysis を実行します。

{{< tabs >}}
{{% tab "CircleCI Orbs" %}}

CircleCI で Static Analysis を実行するには、[CircleCI Orb のセットアップ手順を参照してください][101]。

[101]: /ja/continuous_integration/static_analysis/circleci_orbs

{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub で Static Analysis を実行するには、[GitHub Action のセットアップ手順を参照してください][101]。

[101]: /ja/continuous_integration/static_analysis/github_actions/

{{% /tab %}}
{{% tab "その他" %}}

CircleCI Orbs や GitHub Actions を使用しない場合は、CI パイプラインプラットフォームで Datadog CLI を直接実行することができます。

前提条件:

- UnZip
- Node.js 14 以降
- Java 17 以降

以下の環境変数を構成します。

| 名前         | 説明                                                                                                                | 必須 |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Datadog API キー。このキーは [Datadog 組織][101]によって作成され、シークレットとして保存する必要があります。              | はい     |
| `DD_APP_KEY` | Datadog アプリケーションキー。このキーは [Datadog 組織][102]によって作成され、シークレットとして保存する必要があります。      | はい     |

以下の入力を行います。

| 名前         | 説明                                                                                                                | 必須 | デフォルト         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | 結果をタグ付けするサービス名。                                                                                | はい     |                 |
| `env`     | 結果をタグ付けする環境。この入力には `ci` が便利です。                                                                           | ✕    | `none`          |
| `site`    | 情報を送信する [Datadog サイト][103]。Datadog サイトは {{< region-param key="dd_site" code="true" >}} です。                                                                                 | ✕    | {{< region-param key="dd_site" code="true" >}}  |

CI パイプラインに以下を追加します。

```bash
# 依存関係をインストール
npm install -g @datadog/datadog-ci
curl -L http://dtdg.co/latest-static-analyzer > /tmp/ddog-static-analyzer
unzip /tmp/ddog-static-analyzer -d /tmp

# Static Analysis を実行 (プリインストールされた JVM が必要)
/tmp/cli-1.0-SNAPSHOT/bin/cli --directory . -t true -o results.sarif -f sarif

# 結果をアップロード
datadog-ci sarif upload results.sarif --service "$DD_SERVICE" --env "$DD_ENV" --site "$DD_SITE"
```

[101]: /ja/account_management/api-app-keys/#api-keys
[102]: /ja/account_management/api-app-keys/#application-keys
[103]: /ja/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### サードパーティの静的分析結果を Datadog へアップロードする

サードパーティの静的分析ツールから Datadog に分析結果を送信することができます (相互運用可能な [Static Analysis Results Interchange Format (SARIF) 形式][5]であることが条件)。

SARIF レポートをアップロードするには

1. [`DD_API_KEY` 変数と `DD_APP_KEY` 変数が定義されている][4]ことを確認します。
2. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

3. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
4. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env> --site <dd-site>
   ```

## CI パイプラインでの Static Analysis の実行

Datadog Static Analysis は [`datadog-ci` CLI][2] を使用して CI パイプラインで実行され、Datadog のデフォルトのルールセットに対してコードをチェックします。

### 結果の検索とフィルター

CI パイプラインを構成して Datadog Static Analyzer を実行すると、[Static Analysis Results ページ][1]に違反が表示されます。結果をフィルターするには、リストの左側にあるファセットを使用するか、検索します。

各違反は、CI パイプラインが実行されたリポジトリの特定のコミットとブランチに関連付けられています。行はコミットごとの違反を表します。

違反をクリックすると、違反の範囲と発生場所に関する情報を含むサイドパネルが開きます。

違反の内容は以下のタブで表示されます。

* Source Code: 違反の説明と原因となったコードの行。問題のコードスニペットを確認するには、[Datadog GitHub アプリ][3]を構成します。
* Fix: 可能であれば、違反を解決するための 1 つまたは複数のコード修正 (コピーして貼り付けることができます)。
* Event: Static Analysis 違反イベントに関する JSON メタデータ。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/static-analysis
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ja/integrations/github/
[4]: /ja/account_management/api-app-keys/
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif