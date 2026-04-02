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
description: Datadog Static Code Analysis について学ぶことで、コードが本番環境に到達する前に、コードの品質問題やセキュリティ脆弱性をスキャンすることができます。
is_beta: false
title: Static Code Analysis (SAST) のセットアップ
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要
Datadog SAST をアプリ内でセットアップするには、[**Security** > **Code Security**][1] に移動してください。

## 静的コード解析スキャンを実行する場所を選択する

### Datadogホスティングによるスキャン

GitHub リポジトリの場合、Datadog のインフラ上で直接 Datadog Static Code Analysis スキャンを実行できます。開始するには、[**Code Security** ページ][1]に移動してください。

### CI パイプラインでスキャンする
Datadog Static Code Analysis は、[`datadog-ci` CLI][8] を使用して CI パイプライン上で実行されます。

まず、Datadog API とアプリケーションキーを設定します。`DD_APP_KEY` と `DD_API_KEY` をシークレットとして追加し、Datadog アプリケーションキーに `code_analysis_read` スコープがあることを確認してください。

次に、下記の使用する CI プロバイダごとの手順に従って、Static Code Analysis を実行してください。

{{< whatsnext desc="使用している CI プロバイダに応じた手順を参照:">}}
    {{< nextlink href="security/code_security/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## ソースコード管理プロバイダを選択する
Datadog Static Code Analysis はすべてのソースコード管理プロバイダをサポートしており、GitHub をネイティブにサポートしています。
### GitHub インテグレーションのセットアップ
ソースコード管理プロバイダが GitHub の場合、[GitHub インテグレーションタイル][9]を使用して GitHub App を設定し、[ソースコードインテグレーション][10]を構成してインラインのコードスニペットを表示し、[プルリクエストコメント][11]を有効にする必要があります。

GitHub App をインストールする際、以下のパーミッションが特定の機能を有効にするために必要です:

- `Content: Read`: Datadog でコードスニペットを表示するために必要
- `Pull Request: Read & Write`: Datadog が [プルリクエストコメント][11]を使用してプルリクエスト内で直接違反に対するフィードバックを追加し、[脆弱性の修正][12]用のプルリクエストを作成できるようにするために必要

### その他のソースコード管理プロバイダ
他のソースコード管理プロバイダを使用している場合は、`datadog-ci` CLI ツールを使用して CI パイプライン内で Static Code Analysis を実行し、Datadog に[その結果をアップロード](#upload-third-party-static-analysis-results-to-datadog)してください。
**Code Security** ページに結果が表示されるようになる前に、デフォルトブランチ上で一度リポジトリの解析を実行する**必要があります**。

## 設定のカスタマイズ

デフォルトでは、Datadog Static Code Analysis はプログラミング言語ごとの [Datadog のデフォルトルールセット][6]を使用してリポジトリをスキャンします。実行するルールセットやルールの選択・無視、その他のパラメータを自由にカスタマイズできます。これらの設定はリポジトリ内または Datadog アプリ上で行えます。

### 設定の場所

Datadog Static Code Analysis は、Datadog 内、またはリポジトリの**ルートディレクトリ**に配置されたファイルのいずれかで設定できます。

設定には以下の3つのレベルがあります:

* 組織 (Org) レベルの設定 (Datadog)
* リポジトリ レベルの設定 (Datadog)
* リポジトリ レベルの設定 (リポジトリファイル)

すべて同じ YAML 形式を使用し、**順番**に基づいてオーバーレイ/パッチマージが行われます。たとえば、以下の2つのサンプル YAML ファイルを見てみましょう:

```yaml
rulesets:
 - A
   rules:
      foo:
        ignore: ["**"]
        args: ["my_arg1", "my_arg2"]
```

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
        bar:
            only: ["the_only_file.file"]
 - B

```

最初のファイルに対して2番目のファイルを順にマージ (オーバーレイ/パッチ方式) すると、最終的に以下のようになります:

```yaml
rulesets:
 - A
    rules:
        foo:
            ignore: ["my_ignored_file.file"]
            args: ["my_arg1", "my_arg2"]
        bar:
            only: ["the_only_file.file"]
 - B


```

ご覧のとおり、最初のファイルの `ignore: ["**"]` は競合が発生したため、後に読み込まれたファイルの `ignore: ["my_ignored_file.file"]` に上書きされています。一方で、最初のファイルにある `args` フィールドは競合する値がないためそのまま保持されています。

#### 組織 (Org) レベルの設定

{{< img src="/security/code_security/org-wide-configuration2.png" alt="作成されたルール" style="width:100%;" >}}

組織レベルでの設定は、解析対象となるすべてのリポジトリに適用されます。必ず実行したいルールや、グローバルで除外すべきパス/ファイルを定義するのに適した場所です。

#### リポジトリ レベルの設定

{{< img src="/security/code_security/org-wide-configuration2.png" alt="作成されたルール" style="width:100%;" >}}

リポジトリ レベルの設定は、選択した特定のリポジトリのみに適用されます。これらの設定は組織レベルの設定とマージされ、リポジトリ レベルの設定が優先されます。リポジトリ特有の詳細を上書きしたり、そのリポジトリだけに固有のルールを追加したい場合に有用です。

#### リポジトリ レベルの設定 (ファイル)

組織とリポジトリ レベルで提供される設定に加え、リポジトリのルートにある ``static-analysis.datadog.yml`` ファイルで設定を定義することもできます。このファイルは Datadog 上で定義したリポジトリ レベルの設定より優先されます。リポジトリのファイルベース設定は、ルールの設定を変更しながらセットアップやテストを繰り返す場合に便利です。

### 設定フォーマット

以下の設定フォーマットは、組織レベル、リポジトリ レベル、リポジトリ レベル(ファイル) のすべてに共通して適用されます。

設定ファイルの全体的な構造は以下のとおりです:

```yaml
rulesets:
  - ruleset-name # デフォルト設定で実行したいルールセット
  - ruleset-name:
    # このルールセットを特定のパス/ファイルのみに適用する
    only:
      - "path/example"
      - "**/*.file"
    # このルールセットを特定のパス/ファイルでは適用しない
    ignore:
      - "path/example"
      - "**/*.file"
  - ruleset-name:
    rules:
      rule-name:
        # このルールを特定のパス/ファイルのみに適用する
        only:
          - "path/example"
          - "**/*.file"
        # このルールを特定のパス/ファイルでは適用しない
        ignore:
          - "path/example"
          - "**/*.file"
        arguments:
          # ルールの引数を値に設定
          argument-name: value
      rule-name:
        arguments:
          # 異なるサブツリーに対して異なる引数値を設定する
          argument-name:
            # デフォルト(リポジトリのルート)は value_1
            /: value_1
            # 特定のパスには value_2 を設定
            path/example: value_2
# すべてのルールセットを以下のパス/ファイルのみに対して解析する
only:
  - "path/example"
  - "**/*.file"
# すべてのルールセットで以下のパス/ファイルを解析対象外にする
ignore:
  - "path/example"
  - "**/*.file"
```




この YAML 設定ファイルでは、以下のトップレベルキーがサポートされます:

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `rulesets` | Array | 解析対象のルールセット一覧。文字列 (ルールセット名) または詳細設定を含むオブジェクトのいずれかを要素として指定できます。 | *必須* |
| `only` | Array | ファイルパスまたはグロブパターンのリスト。指定した場合、すべてのルールセットにおいてこれらにマッチするファイルだけが解析されます。 | なし |
| `ignore` | Array | ファイルパスまたはグロブパターンのリスト。すべてのルールセットにおいて、これらにマッチするファイルは解析対象から除外されます。 | なし |

*注:* ここで示した `only` と `ignore` は、設定ファイル全体に適用されるファイルフィルタとして機能します。

---

## ルールセットの設定

`rulesets` 配列の各要素は、次のいずれかの方法で定義できます:

1. **シンプルなルールセット宣言**: たとえば `ruleset-name` のように単なる文字列を指定すると、そのルールセットはデフォルト設定で実行されます。
2. **詳細なルールセット オブジェクト:** キーをルールセット名、値を追加の設定を含むオブジェクトとして指定します。詳細設定可能なプロパティは以下のとおりです:

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| ------------------ | -------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| `only` | Array | ファイルパスまたはグロブパターンのリスト。このルールセットでは、これらのパターンに一致するファイルのみ解析対象にします。 | なし |
| `ignore` | Array | ファイルパスまたはグロブパターンのリスト。このルールセットの解析対象から除外するファイルを指定します。 | なし |
| `rules` | Object | 個々のルール名とその設定オブジェクトのマッピングです。 | なし |

---

## ルールの設定

ルールセットの `rules` プロパティの中で、それぞれのルールは名前と設定によって定義されます。各ルールで利用できるプロパティは以下のとおりです:

| **プロパティ** | **タイプ** | **説明** | **デフォルト** |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------- | ----------------- |
| `only` | Array | ファイルパスまたはグロブパターンのリスト。このルールは、これらのパターンに一致するファイルにのみ適用されます。 | なし |
| `ignore` | Array | ファイルパスまたはグロブパターンのリスト。このルールの適用対象から除外するファイルを指定します。 | なし |
| `arguments` | Object | ルールのパラメータと値を指定します。スカラー値またはパス単位で指定することができます。 | なし |

---

## 引数 (arguments) の設定

ルールの引数は次の2通りの形式で定義できます:

1. **固定値 (Static Value):** 引数に直接値を割り当てます。

   ```yaml
   arguments:
     argument-name: value
   ```
2. **パスごとの値割り当て (Path-Specific Mapping):**
   ファイルパスに応じて異なる値を設定します。特別なキー `/` はデフォルト値 (リポジトリルートに適用) を示します。

   ```yaml
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   ```

| **キー** | **タイプ** | **説明** | **デフォルト** |
| ----------------- | -------------- | ------------------------------------------------------------------------- | ----------------- |
| `/` | Any | 特定のパスに一致しない場合に使用されるデフォルトの引数値です。 | なし |
| `specific path` | Any | 指定したパスまたはグロブパターンに一致するファイルに対して設定される引数値です。 | なし |

---



設定例

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style:
    rules:
      max-function-lines:
        # max-function-lines ルールを以下のファイルでは適用しない
        ignore:
          - "src/main/util/process.py"
          - "src/main/util/datetime.py"
        arguments:
          # max-function-lines のしきい値を 150 行に設定
          max-lines: 150
      max-class-lines:
        arguments:
          # max-class-lines ルールのしきい値をサブツリーごとに変更
          max-lines:
            # デフォルト (リポジトリのルート) は 200 行
            /: 200
            # src/main/backend 配下は 100 行
            src/main/backend: 100
  - python-inclusive
  - python-django:
    # python-django ルールセットを以下のパスのみに適用
    only:
      - "src/main/backend"
      - "src/main/django"
    # 以下のパターンにマッチするファイルには python-django ルールセットを適用しない
    ignore:
      - "src/main/backend/util/*.py"
# ソースコードのみ解析対象にする
only:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# サードパーティや生成ファイルは解析対象外
ignore:
  - "lib/third_party"
  - "**/*.generated.py"
  - "**/*.pb.py"
```


| 名前 | 説明 | 必須 | デフォルト |
| -------------------- | ------------------------------------------------------------------------------------------- | --------- | --------- |
| `rulesets` | ルールセット名および設定のリスト。[利用可能なすべてのルールセットはこちら][6]。 | `true` | |
| `ignore` | 無視するパスやグロブパターンのリスト。これらに一致するファイルは解析されません。 | `false` | |
| `only` | 解析対象とするパスやグロブパターンのリスト。これらに一致するファイルのみ解析されます。 | `false` | |
| `ignore-gitignore` | `.gitignore` に記載されたパスを解析対象外として扱わないようにするかどうかを指定します。 | `false` | `false` |
| `max-file-size-kb` | 指定したサイズ(kB)より大きいファイルを無視します。 | `false` | `200` |

`static-analysis.datadog.yml` ファイル内で使用できる**ルールセット (ruleset)** オプションは以下のとおりです:

| 名前 | 説明 | 必須 |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| `rules` | ルールセットに属する各ルールの設定リストです。 | `false` |
| `ignore` | このルールセットだけで無視するパスやグロブパターンのリスト。該当するファイルは解析されません。 | `false` |
| `only` | このルールセットだけで解析対象にするパスやグロブパターンのリスト。該当するファイルのみ解析します。 | `false` |

同様に、**ルール (rule)** 単位で設定できるオプションは以下のとおりです:

| 名前 | 説明 | 必須 |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | --------- |
| `ignore` | このルールだけで無視するパスやグロブパターンのリスト。該当するファイルは解析されません。 | `false` |
| `only` | このルールだけで解析対象にするパスやグロブパターンのリスト。該当するファイルのみ解析します。 | `false` |
| `arguments` | カスタマイズ可能な引数をサポートするルールに対して値を指定するマップです。 | `false` |

`arguments` フィールドのマップは、引数の名前をキーとし、値として文字列またはマップを指定します:

* リポジトリ全体で同じ値を設定する場合は、単純に文字列として指定します。
* リポジトリ内の異なるサブツリーごとに値を変えたい場合は、サブツリーのプレフィックスをキーとして、そこに適用する値をマップ形式で指定します。

### 違反の無視

#### リポジトリ単位で無視する
`static-analysis.datadog.yml` ファイルに無視ルールを追加します。以下の例では、`javascript-express/reduce-server-fingerprinting` というルールをすべてのディレクトリに対して無視しています。

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "**"
```

#### ファイルやディレクトリ単位で無視する
`static-analysis.datadog.yml` ファイルに無視ルールを追加します。下記の例では、`javascript-express/reduce-server-fingerprinting` というルールを特定のファイルに対して無視しています。パスによる無視の詳しい方法については、[設定のカスタマイズセクション](#customize-your-configuration)を参照してください。

```
rulesets:
  - javascript-express:
    rules:
      reduce-server-fingerprinting:
        ignore: "ad-server/src/app.js"
```

#### 特定の違反インスタンスを無視する

特定の違反インスタンスを無視するには、対象行の上に `no-dd-sa` コメントを入れます。こうすると、その行からは違反が検出されなくなります。以下の Python コード例では、`foo = 1` の行が Static Code Analysis スキャンで無視されます。

```python
#no-dd-sa
foo = 1
bar = 2
```

また、`no-dd-sa` を使って特定のルールだけを無視することもできます。その場合は、無視したいルール名を `<rule-name>` の代わりに指定します。

`no-dd-sa:<rule-name>`

たとえば、以下の JavaScript コード例では、`my_foo = 1` は `javascript-code-style/assignment-name` ルール以外のすべてのルールで解析されます。このルールは開発者に [snake_case][7] ではなく [camelCase][6] を使うよう指示するものです。

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## Datadog のサービスやチームに結果を関連付ける
### サービスへの関連付け
Datadog は、以下の仕組みを用いて静的コードおよびライブラリスキャンの結果を該当するサービスに関連付けます。

1. [Software Catalog を用いたコード配置場所の特定](#identifying-the-code-location-in-the-software-catalog)
2. [他の Datadog 製品内でのファイル使用パターンの検出](#detecting-file-usage-patterns)
3. [ファイルパスやリポジトリ名からサービス名を検索](#detecting-service-name-in-paths-and-repository-names)

いずれか1つの方法で関連付けに成功すると、それ以降のマッピングは行われません。それぞれのマッピング方法は以下で詳しく説明します。

#### Software Catalog でコード配置場所を特定する

Software Catalog の [スキーマバージョン `v3`][14] 以降では、サービスがどのリポジトリに存在し、どのパスを含むかを `codeLocations` セクションで定義できます。

`paths` 属性には、リポジトリ内のパスとマッチするグロブパターンのリストを指定します。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
  name: my-service
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
{{< /code-block >}}

#### ファイル使用パターンの検出

Datadog は Error Tracking などの追加機能でファイルの使用状況を検出し、実行時のサービスとファイルを関連付けます。たとえば、`foo` というサービスがあり、ログやスタックトレースの中に `/modules/foo/bar.py` というファイルパスが含まれている場合、Datadog は `/modules/foo/bar.py` をサービス `foo` に関連付けます。




#### パスやリポジトリ名からサービス名を検出する

Datadog はパスやリポジトリ名に含まれるサービス名を検出し、一致があればファイルをそのサービスに関連付けます。

たとえば、`myservice` というサービスがあって、リポジトリ URL が `https://github.com/myorganization/myservice.git` の場合は、リポジトリ内のすべてのファイルが `myservice` に関連付けられます。



もしリポジトリとの一致が見つからなかった場合、Datadog はファイルの `path` を調べて一致するサービスを検索します。たとえば、`myservice` というサービス名が存在し、ファイルパスが `/path/to/myservice/foo.py` であれば、パスの一部に `myservice` が含まれるためファイルは `myservice` に関連付けられます。パスに 2 つのサービス名が含まれている場合は、ファイル名に近いほうのサービス名が選択されます。



### チームへの関連付け

Datadog は、違反や脆弱性が検出された際に、そのファイルが関連付けられているサービスにひも付いたチームを自動的に関連付けます。たとえば、`domains/ecommerce/apps/myservice/foo.py` が `myservice` に関連付けられていれば、このファイルで見つかった違反はチーム `myservice` に関連付けられます。



サービスやチームが見つからない場合は、リポジトリ内の `CODEOWNERS` ファイルが使用されます。このファイルにより、Git プロバイダ上でどのチームがどのファイルを所有するかが決定されます。

**注**: この機能を正しく動作させるには、Git プロバイダのチームと [Datadog のチーム][10]を正しくマッピングしておく必要があります。

## 差分(diff)-Aware スキャン

差分スキャンを使用すると、Datadog の静的アナライザは機能ブランチ内でコミットによって変更されたファイルだけをスキャンします。これにより、リポジトリ全体を毎回スキャンしなくてよいので、スキャン時間が大幅に短縮されます。CI パイプラインで差分スキャンを有効にするには、以下の手順に従ってください:

1. `DD_APP_KEY`、`DD_SITE`、`DD_API_KEY` の各変数を CI パイプラインで設定してください。
2. 静的アナライザを呼び出す前に `datadog-ci git-metadata upload` を実行します。これにより、Datadog バックエンドが必要とする Git メタデータが準備されます。ファイル数を算出するのに Git メタデータが必須です。
3. datadog-static-analyzer を呼び出す際に `--diff-aware` フラグを付けて実行してください。

以下はコマンド実行例です (これらはすべて Git リポジトリ内で実行してください):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**注:** 差分スキャンが実行できない場合は、ディレクトリ全体がスキャン対象となります。

## サードパーティ製静的解析の結果を Datadog にアップロードする

<div class="alert alert-info">
  SARIF インポートは Snyk、CodeQL、Semgrep、Checkov、Gitleaks、Sysdig でテスト済みです。他の SARIF に準拠したツールで問題がある場合は <a href="/help">Datadog サポート</a>にお問い合わせください。
</div>

相互運用可能な[静的分析結果交換形式 (SARIF)][2] であることを条件に、サードパーティーの静的分析ツールから Datadog へ結果を送信することができます。Node.js バージョン 14 以降が必要です。

SARIF レポートをアップロードするには

1. [`DD_API_KEY` 変数と `DD_APP_KEY` 変数が定義されている][4]ことを確認します。
2. 必要に応じて [`DD_SITE` 変数][7]を設定します (デフォルトは `datadoghq.com`)。
3. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

<!-- ## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /ja/developers/ide_plugins/idea/#static-analysis
[4]: /ja/account_management/api-app-keys/
[6]: /ja/security/code_security/static_analysis/static_analysis_rules
[7]: /ja/getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /ja/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /ja/integrations/guide/source-code-integration
[11]: /ja/security/code_security/dev_tool_int/github_pull_requests
[12]: /ja/security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[14]: https://docs.datadoghq.com/ja/software_catalog/service_definitions/v3-0/