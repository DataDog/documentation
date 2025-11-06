---
algolia:
  tags:
  - static analysis
  - static analysis rules
  - static application security testing
  - SAST
aliases:
- /ja/continuous_integration/static_analysis
- /ja/static_analysis
description: Datadog Static Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: ソースコードインテグレーションについて
is_beta: false
title: Static Analysis セットアップ
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要
Datadog Static Analysis をセットアップするには、[**Software Delivery** > **Code Analysis**][1] に移動します。

## Static Analysis のスキャンの実行先を選択
### Datadog ホスト型スキャンでの実行

{{< callout url="#" header="false" btn_hidden="true" >}}
  Datadog ホスト型の Static Analysis スキャンはプレビュー段階です。アクセスのリクエストはカスタマー サクセス マネージャーに連絡してください。
{{< /callout >}}

Datadog のインフラストラクチャ上で直接 Datadog Static Analysis のスキャンを実行できます。開始するには、[**Code Analysis** ページ][1] に移動します。

### CI パイプラインでスキャン
Datadog Static Analysis は [`datadog-ci` CLI][8] を使用して CI パイプラインで実行されます。[Datadog API キー と アプリケーション キー (`code_analysis_read` スコープが必要)][3] を設定し、各 CI プロバイダで Static Analysis を実行します。

{{< whatsnext desc="CI プロバイダに応じた手順を参照してください:" >}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}汎用 CI プロバイダ{{< /nextlink >}}
{{< /whatsnext >}}

## ソース コード管理プロバイダの選択
Datadog Static Analysis はすべてのソース コード管理プロバイダをサポートし、GitHub にはネイティブ サポートがあります。
### GitHub 連携を設定
ソース コード管理プロバイダが GitHub の場合、[GitHub integration タイル][9] から GitHub App を構成し、[source code integration][10] をセットアップして、インライン コード スニペットを表示し、[pull request comments][11] を有効にする必要があります。

GitHub App をインストールする際、特定の機能を有効にするために次の権限が必要です:

- `Content: Read`: Datadog に表示される コード スニペットを確認できるようにします
- `Pull Request: Read & Write`: [pull request comments][11] を使用して違反に対するフィードバックをあなたの Pull Requests に直接追加できるようにし、さらに [脆弱性を修正][12] するための Pull Requests を作成できるようにします

### その他のソース コード管理プロバイダ
別のソース コード管理プロバイダを使用している場合は、`datadog-ci` CLI ツールを使用して CI パイプラインで Static Analysis を実行し、Datadog に[結果をアップロード](#upload-third-party-static-analysis-results-to-datadog) してください。
結果が **Code Analysis** ページに表示され始める前に、デフォルト ブランチでリポジトリの解析を **必ず** 実行する必要があります。

## 構成をカスタマイズ
既定では、Datadog Static Analysis は使用しているプログラミング言語向けの [Datadog の ルール セット][6] でリポジトリをスキャンします。適用する ルール セットと適用範囲をカスタマイズするには、リポジトリの **ルート ディレクトリ** に `static-analysis.datadog.yml` ファイルを追加します。

`static-analysis.datadog.yml` ファイルには、次の **グローバル** オプションを含めることができます:

| 名前               | 説明                                                                                | 必須 | デフォルト |
|--------------------|--------------------------------------------------------------------------------------------|----------|---------|
| `rulesets`         | ルール セット名と構成の一覧。 [利用可能な ルール セットをすべて表示][6]。              | `true`   |         |
| `ignore`           | 無視するパス プレフィックスおよび glob パターンの一覧。 一致したファイルは解析されません。  | `false`  |         |
| `only`             | 解析対象とするパス プレフィックスおよび glob パターンの一覧。 一致したファイルのみ解析されます。| `false`  |         |
| `ignore-gitignore` | 特定のファイルの解析をスキップするために `.gitignore` ファイルに記載されたパスを使用しないようにします。        | `false`  | `false` |
| `max-file-size-kb` | 指定サイズ (kB 単位) より大きいファイルを無視します。                                    | `false`  | `200`   |

`static-analysis.datadog.yml` ファイルには、次の **ruleset** オプションを含めることができます:

| 名前               | 説明                                                                                                          | 必須 |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `rules`            | この ruleset に属するルールの構成の一覧。                                                        | `false`  |
| `ignore`           | この ルール セットに対して無視するパス プレフィックスおよび glob パターン。 該当するファイルは解析されません。  | `false`  |
| `only`             | この ルール セットに対して解析するパス プレフィックスおよび glob パターン。 該当するファイルのみ解析されます。| `false`  |

`static-analysis.datadog.yml` ファイルには、次の **rule** オプションを含めることができます:

| 名前               | 説明                                                                                                          | 必須 |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `ignore`           | このルールに対して無視するパス プレフィックスおよび glob パターン。 該当するファイルは解析されません。     | `false`  |
| `only`             | このルールに対して解析するパス プレフィックスおよび glob パターン。 該当するファイルのみ解析されます。   | `false`  |
| `arguments`        | カスタマイズ可能な引数をサポートするルール向けの値のマップ。                                                       | `false`  |

`arguments` フィールドのマップは、引数の名前をキーとし、その値は文字列またはマップです:

* リポジトリ全体に対して値を設定するには、文字列として指定します。
* リポジトリ内のサブツリーごとに異なる値を設定するには、サブツリー プレフィックスから、そのサブツリー内でその引数が持つ値へのマップとして指定します。

`static-analysis.datadog.yml` ファイルの完全な構造は次のとおりです:

```yaml
rulesets:
  - ruleset-name
  - ruleset-name:
    # 次のパス / ファイルにのみこの ルール セットを適用します
    only:
      - "path/example"
      - "**/*.file"
    # 次のパス / ファイルではこの ルール セットを適用しません
    ignore:
      - "path/example"
      - "**/*.file"
  - ruleset-name:
    rules:
      rule-name:
        # 次のパス / ファイルにのみこのルールを適用します
        only:
          - "path/example"
          - "**/*.file"
        # 次のパス / ファイルではこのルールを適用しません
        ignore:
          - "path/example"
          - "**/*.file"
        arguments:
          # ルールの引数を value に設定します
          argument-name: value
      rule-name:
        arguments:
          # 異なるサブ ツリーで異なる引数値を設定します
          argument-name:
            # 既定では value_1 を設定します (リポジトリの root パス)
            /: value_1
            # 特定のパスでは value_2 を設定します
            path/example: value_2
# 次のパス / ファイル内にあるもののみを解析します (いずれの ルール セットでも)
only:
  - "path/example"
  - "**/*.file"
# 次のパス / ファイル内にあるものは解析しません (いずれの ルール セットでも)
ignore:
  - "path/example"
  - "**/*.file"
```

例の構成ファイル:

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style:
    rules:
      max-function-lines:
        # 次のファイルには ルール max-function-lines を適用しません
        ignore:
          - "src/main/util/process.py"
          - "src/main/util/datetime.py"
        arguments:
          # ルール max-function-lines のしきい値を 150 行に設定します
          max-lines: 150
      max-class-lines:
        arguments:
          # ルール max-class-lines のしきい値をサブ ツリーごとに変えます
          max-lines:
            # 既定ではしきい値を 200 行に設定します (リポジトリの root パス)
            /: 200
            # src/main/backend ではしきい値を 100 行に設定します
            src/main/backend: 100
  - python-inclusive
  - python-django:
    # 次のパスにのみ python-django ルール セットを適用します
    only:
      - "src/main/backend"
      - "src/main/django"
    # 次のパターンに一致するファイルでは python-django ルール セットを適用しません
    ignore:
      - "src/main/backend/util/*.py"
# ソース ファイルのみを解析します
only:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# サード パーティ または生成されたファイルは解析しません
ignore:
  - "lib/third_party"
  - "**/*.generated.py"
  - "**/*.pb.py"
```

### 違反の無視
#### リポジトリ単位で無視
`static-analysis.datadog.yml` ファイルに ignore ルールを追加します。以下の例では、すべてのディレクトリに対して `javascript-express/reduce-server-fingerprinting` ルールを無視します。

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "**"
```

#### ファイルまたはディレクトリで無視
`static-analysis.datadog.yml` ファイルに ignore ルールを追加します。以下の例では、このファイルに対して `javascript-express/reduce-server-fingerprinting` ルールを無視します。パスでの無視方法の詳細は、[構成のカスタマイズ セクション](#customize-your-configuration) を参照してください。

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "ad-server/src/app.js"
```

#### 特定のインスタンスを無視

違反の特定のインスタンスを無視するには、無視したいコード行の上に `no-dd-sa` というコメントを記述します。これにより、その行から違反が生成されることはなくなります。たとえば、次の Python コード スニペットでは、`foo = 1` の行は Static Analysis スキャンで無視されます。

```python
#no-dd-sa
foo = 1
bar = 2
```

すべてのルールを無視するのではなく、特定のルールだけを無視するために `no-dd-sa` を使用することもできます。その場合は、次のテンプレートで `<rule-name>` を無視したいルール名に置き換えて指定します:

`no-dd-sa:<rule-name>`

たとえば、次の JavaScript コード スニペットでは、`my_foo = 1` の行は `javascript-code-style/assignment-name` ルールを除くすべてのルールで解析されます。このルールは、開発者に [キャメル ケース][6] を [スネーク ケース][7] の代わりに使用するよう指示します。

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## サード パーティの Static Analysis 結果を Datadog にアップロード

<div class="alert alert-info">
  SARIF インポートは Snyk、CodeQL、Semgrep、Checkov、Gitleaks、Sysdig でテスト済みです。他の SARIF 準拠ツールで問題が発生した場合は <a href="/help">Datadog サポート</a> までお問い合わせください。
</div>

相互運用可能な[静的分析結果交換形式 (SARIF)][2] であることを条件に、サードパーティーの静的分析ツールから Datadog へ結果を送信することができます。Node.js バージョン 14 以降が必要です。

SARIF レポートをアップロードするには

1. [`DD_API_KEY` 変数と `DD_APP_KEY` 変数が定義されている][4]ことを確認します。
2. Optionally, set a [`DD_SITE` variable][7] (this default to `datadoghq.com`).
3. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## Diff-aware スキャン

Diff-aware スキャンでは、Datadog の static analyzer がフィーチャー ブランチのコミットで変更されたファイルのみをスキャンします。これにより、毎回のスキャンでリポジトリ内のすべてのファイルを解析しないため、スキャン時間が大幅に短縮されます。CI パイプラインで Diff-aware スキャンを有効にするには、次の手順に従ってください:

1. CI パイプラインで `DD_APP_KEY`、`DD_SITE`、`DD_API_KEY` 変数が設定されていることを確認します。
2. static analyzer を起動する前に `datadog-ci git-metadata upload` の呼び出しを追加します。このコマンドは、Datadog バック エンドで Git メタ データを利用できるようにします。解析対象ファイル数を算出するには、Git メタ データが必要です。
3. datadog-static-analyzer がフラグ `--diff-aware` 付きで呼び出されることを確認します。

コマンド シーケンスの例 (これらのコマンドは Git リポジトリ内で実行する必要があります):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**注:** Diff-aware スキャンを完了できない場合は、ディレクトリ全体がスキャンされます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/setup/code-analysis
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /ja/developers/ide_plugins/idea/#static-analysis
[4]: /ja/account_management/api-app-keys/
[6]: /ja/code_analysis/static_analysis_rules
[7]: /ja/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /ja/integrations/guide/source-code-integration
[11]: /ja/code_analysis/github_pull_requests/
[12]: /ja/code_analysis/github_pull_requests#fixing-a-vulnerability-directly-from-datadog