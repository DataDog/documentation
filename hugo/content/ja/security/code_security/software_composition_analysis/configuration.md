---
description: Datadog Software Composition Analysis (SCA) の構成に関するリファレンスドキュメント。パス、エコシステム、パッケージの除外設定について説明します。
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: ドキュメント
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: ドキュメント
  text: Code Security 構成リファレンス
title: Software Composition Analysis (SCA) 構成
---
Datadog Software Composition Analysis (SCA) は、コード内のオープンソースライブラリとその脆弱性を検出します。Static SCA 分析から特定のパス、エコシステム、またはパッケージを除外できます。これらの設定は、Datadog または `code-security.datadog.yaml` ファイルの Code Security 構成で、`sca` キーの下に指定します。

`sca` キーは `schema-version: v1.1` で導入され、以下のフィールドをサポートしています。各フィールドには独自の最小 `schema-version` があるため、構成するフィールドで必要とされる最も高いバージョンを使用してください。

| **プロパティ** | **タイプ** | **説明** | **デフォルト** | **最小 `schema-version`** |
| --- | --- | --- | --- | --- |
| `ignore-paths` | 配列 | Static SCA 分析から除外するファイルパスまたは glob パターン。| なし | `v1.1` |
| `ignore-ecosystems` | 配列 | Static SCA 分析から除外するエコシステム (`npm`、`Go`、`PyPI`など)。| なし | `v1.7` |
| `ignore-packages` | 配列 | バージョンに関係なく、Static SCA 分析から除外するパッケージ。各エントリは `<ecosystem>:<name>` 形式を使用します (例: `npm:lodash`)。| なし | `v1.7` |

例:

{{< code-block lang="yaml" >}}
schema-version: v1.7
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
  ignore-ecosystems:
    - "npm"
  ignore-packages:
    - "Go:golang.org/x/text"
{{< /code-block >}}

<div class="alert alert-warning"> <code>ignore-ecosystems</code> と <code>ignore-packages</code> のエコシステム名およびパッケージ名は、大文字と小文字を区別して照合されます。たとえば、<code>go:golang.org/x/text</code> は <code>Go</code> エコシステムとは一致せず、 <code>npm:Lodash</code> は <code>lodash</code> パッケージとは一致しません。</div>

SCA スキャナーを CLI から直接実行する場合、同等の `--exclude`、`--exclude-ecosystem`、および `--exclude-package` フラグは、上記で構成された除外設定と結合されます。

構成場所、優先順位、マージの詳細については、[Code Security 構成リファレンス][1]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/guides/configuration/