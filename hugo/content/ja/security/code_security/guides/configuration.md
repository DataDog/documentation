---
description: Datadog Code Security 構成のリファレンス。スキーマ、構成場所、優先順位を含みます。
disable_toc: false
further_reading:
- link: /security/code_security/static_analysis/configuration/
  tag: ドキュメント
  text: Static Code Analysis (SAST) 構成
- link: /security/code_security/software_composition_analysis/configuration/
  tag: ドキュメント
  text: Software Composition Analysis (SCA) 構成
- link: /security/code_security/iac_security/configuration/
  tag: ドキュメント
  text: Infrastructure as Code (IaC) Security 構成
- link: /security/code_security/secret_scanning/configuration/
  tag: ドキュメント
  text: Secret Scanning 構成
title: Code Security 構成リファレンス
---
Datadog Code Security は、Datadog 内、リポジトリのルートにあるファイル内、またはその両方の場所で構成できます。

## 構成スキーマ {#configuration-schema}

構成ファイルは `schema-version` キーで始まり、その後に構成する各製品のトップレベルキーが続く必要があります。構成する製品と一致するスキーマバージョンを使用してください。

| スキーマバージョン | サポートされている製品 |
|---|---|
| `v1.0` | SAST |
| `v1.1` | SAST、SCA |
| `v1.2` | SAST、SCA、IaC Security |
| `v1.3` | SAST、SCA、IaC Security |
| `v1.4` | SAST、SCA、IaC Security |
| `v1.5` | SAST、SCA、IaC Security、Secret Scanning |

すべての新しい構成には `schema-version: v1.5` を使用してください。`v1.4` と同じ製品をサポートし、Secret Scanning が追加されています。バージョン `v1.4` では IaC ルール用のルールごとの `arguments` が追加され、`v1.3` ではルールごとのパススコープ設定、ルールごとの重大度オーバーライド、プラットフォームフィルターなどの IaC 構成オプションが追加されました。IaC Security 固有のフィールドについては [IaC Security 構成][3]を、Secret Scanning 固有のフィールドについては [Secret Scanning 構成][4]を参照してください。

次の例は、トップレベルの構造を示しています。

```yaml
schema-version: v1.5
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
iac:
  # Infrastructure as Code (IaC) Security configuration
secrets:
  # Secret Scanning configuration
```

`sast`、`sca`、`iac`、および `secrets` のセクションはオプションです。組織レベル、リポジトリレベル、リポジトリファイルなど、どの構成場所にも 1 つ以上のセクションを含めることができます。`sast` セクションは、Datadog ホスト型スキャンの AI ネイティブ SAST ルールセットも制御します。`secrets` セクションは、シークレットのスキャン対象となるファイルを制御します。ルール自体は Datadog で設定されます。各セクションの完全なスキーマについては、[Static Code Analysis (SAST) 構成][1]、[Software Composition Analysis (SCA) 構成][2]、[IaC Security 構成][3]、および [Secret Scanning 構成][4]を参照してください。SAST ページには、AI ネイティブ SAST ルールセット名も一覧表示されています。

## 構成の定義場所 {#where-to-define-configurations}

構成には 3 つのレベルがあります。

* 組織レベルの構成 (Datadog)
* リポジトリレベルの構成 (Datadog)
* リポジトリレベルの構成 (リポジトリファイル)

これら 3 つの場所すべてで同じ YAML スキーマが使用され、順番にマージされます ([構成のマージ方法](#how-configurations-merge)を参照してください)。

### 組織レベルの構成 {#org-level-configuration}

{{< img src="/security/code_security/org-level-configuration.png" alt="Datadog Code Security の組織レベル構成エディター。" style="width:100%;" >}}

組織レベルの構成は、組織内のすべてのリポジトリに適用されます。組織レベルの構成を使用して、組織全体のルールを定義し、無視するグローバルなパスやファイルを指定します。

### リポジトリレベルの構成 {#repository-level-configuration}

{{< img src="/security/code_security/repo-level-configuration.png" alt="Datadog Code Security のリポジトリレベル構成エディター。" style="width:100%;" >}}

リポジトリレベルの構成は、選択したリポジトリにのみ適用され、組織レベルの構成よりも優先されます。これらは組織の構成とマージされ、リポジトリの設定が組織のデフォルト設定を上書きします。リポジトリレベルの構成を使用して、リポジトリ固有のオーバーライドを定義したり、そのリポジトリにのみ適用されるルールを追加したりします。

### リポジトリレベルの構成 (ファイル) {#repository-level-configuration-file}

`code-security.datadog.yaml` ファイルは、リポジトリのルートに構成を保存します。これは、Datadog で定義された組織レベルおよびリポジトリレベルの構成よりも優先されます。

## 構成のマージ方法 {#how-configurations-merge}

構成は、優先順位が低い順から高い順に、次の順序でマージされます。

1. **組織レベル**
1. **リポジトリレベル**
1. **リポジトリレベルのファイル** (`code-security.datadog.yaml`)

構成の各フィールドについて、マージの動作はフィールドのタイプによって異なります。

| フィールドタイプ | マージの動作 | フィールドの例 |
|---|---|---|
| リスト | 重複を除外して連結 | `use-rulesets`、`ignore-rulesets`、`ignore-rules`、`ignore-paths`、`only-paths`、`ignore-platforms`、`only-platforms` |
| スカラー値 (文字列、数値、ブール値) | 優先順位が最も高い構成の値が使用されます | `use-default-rulesets`、`use-gitignore`、`max-file-size-kb`、`category` |
| マップ | 再帰的にマージ | `ruleset-configs`、`rule-configs`、`arguments` |

フィールドの全リストについては、[Static Code Analysis (SAST) 構成][1]、[Software Composition Analysis (SCA) 構成][2]、および [IaC Security 構成][3] を参照してください。

次の例は、構成がどのようにマージされるかを示しています。

#### 組織レベル {#org-level}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
sca:
  ignore-paths:
    - "vendor/"
iac:
  ignore-rules:
    - A
  global-config:
    ignore-paths:
      - "examples/"
```

#### リポジトリレベル {#repo-level}

```yaml
schema-version: v1.4
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "third_party/"
iac:
  ignore-rules:
    - B
  global-config:
    ignore-paths:
      - "generated/"
```

#### マージ結果 {#merged-result}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "vendor/"
    - "third_party/"
iac:
  ignore-rules:
    - A
    - B
  global-config:
    ignore-paths:
      - "examples/"
      - "generated/"
```

この例は、上の表に示されている各マージルールを示しています。

- **リストは連結されます**: `use-rulesets` は `[A, B]` にマージされ、SCA `ignore-paths` は `["vendor/", "third_party/"]` にマージされ、IaC `ignore-rules` は `[A, B]` にマージされます。
- **スカラーは優先順位が最も高い値を使用します**: `maxCount: 22` (リポジトリレベル) が `maxCount: 10` (組織レベル) を上書きします。
- **マップは再帰的にマージされます**: `foo`ルール設定は、組織レベルの `ignore-paths` を保持しつつ、リポジトリレベルの `maxCount: 22` を適用します。`bar` のような新しいエントリは、リポジトリレベルから追加されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis/configuration/
[2]: /ja/security/code_security/software_composition_analysis/configuration/
[3]: /ja/security/code_security/iac_security/configuration/
[4]: /ja/security/code_security/secret_scanning/configuration/