---
description: 一般的な Code Analysis の問題をトラブルシュートする方法、およびサポートとの連携方法を学びましょう。
further_reading:
- link: /code_analysis/
  tag: ドキュメント
  text: Code Analysis について
- link: /code_analysis/static_analysis/
  tag: ドキュメント
  text: Static Analysis について
- link: /code_analysis/software_composition_analysis/
  tag: ドキュメント
  text: Software Composition Analysis について
title: Code Analysis トラブルシューティング
---

## 概要

Datadog Code Analysis のセットアップまたは構成で問題が発生した場合は、このページを使用してトラブルシューティングを開始してください。引き続き問題がある場合は、[Datadog サポート][1]にお問い合わせください。

## 静的分析

Datadog Static Analyzer に関する問題がある場合、サポートおよびお客様担当カスタマーサクセスマネージャーへのバグ報告には以下の情報を含めてください。

- `static-analysis.datadog.yml` ファイル
- ローカルまたは CI/CD パイプラインで実行した静的分析ツール (CLI など) の出力
- 生成された SARIF ファイル (利用可能な場合)
- リポジトリの URL (パブリックまたはプライベート)
- 分析を実行したブランチ名
- Datadog Static Analyzer を実行した正確なコマンドライン

### パフォーマンスの問題

パフォーマンス上の問題が発生している場合、コマンドラインから静的分析ツールを実行するときに `--performance-statistics` フラグを有効にすることができます。

パフォーマンスに関する問題の場合、以下の情報を含めてください。

- `static-analysis.datadog.yml` ファイル
- ローカルまたは CI/CD パイプラインで実行した静的分析ツール (CLI など) の出力
- リポジトリの URL (パブリックまたはプライベート)

**注**: [Static Analysis と GitHub Actions][2] を使用している場合、[`enable_performance_statistics`][3] パラメーターを true に設定してください。

### ブロッキングする問題

パフォーマンスに関係しない問題、または Datadog Static Analyzer が終了しない場合は、`--debug true --performance-statistics` フラグを付けて Datadog Static Analyzer を実行してください。

### アナライザ実行時に 403 エラーが発生

アナライザと `datadog-ci` を実行する際に、変数 `DD_APP_KEY`、`DD_API_KEY`、`DD_SITE` が正しく指定されていることを確認してください。

### SARIF アップロードに関する問題

<div class="alert alert-info">
  SARIF インポートは、Snyk、CodeQL、Semgrep、Checkov、Gitleaks、Sysdig でテスト済みです。その他の SARIF 対応ツールで問題が発生した場合は、<a href="/help">Datadog サポート</a>までお問い合わせください。
</div>

サードパーティーの静的分析ツールから Datadog へ結果をアップロードする際は、相互運用可能な[静的分析結果交換形式 (SARIF)][5] であることを確認してください。Node.js バージョン 14 以降が必要です。

SARIF レポートをアップロードするには、以下の手順に従ってください。

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

### `GLIBC_X.YY not found` エラーメッセージ

CI パイプラインで Static Analyzer を実行した際、以下のようなエラーメッセージが表示される場合:

```
version `GLIBC_X.YY' not found
```

これは以下のいずれかを意味します。

- 古いバージョンの glibc を含む Linux ディストリビューションで CI パイプラインを実行している場合。この場合、Datadog は最新バージョンへのアップグレードを推奨します。アナライザは常に Ubuntu/Debian 系システムの最新バージョンで動作します。
- glibc に依存しない Linux ディストリビューション (Alpine Linux など) で CI パイプラインを実行している場合。代わりに、
  glibc の最新バージョンをサポートするディストリビューション (安定版 Ubuntu など) で CI パイプラインを実行してください。

### Datadog UI に結果が表示されない

**GitHub 以外のリポジトリで Code Analysis を実行している場合**、最初のスキャンがデフォルトブランチ (`master`、`main`、`prod`、`production` など) 上で行われていることを確認してください。デフォルトブランチでコミットした後、非デフォルトブランチが分析されます。常に [Repository Settings][4] でアプリ内からデフォルトブランチを構成できます。

Datadog のアナライザを使用している場合、[差分認識スキャン][6]がデフォルトで有効になっています。CI パイプライン内でツールを実行している場合、`datadog-ci` が分析対象リポジトリの**ルートで**実行されていることを確認してください。


## Software Composition Analysis

Datadog Software Composition Analysis に関する問題については、サポートおよびお客様担当カスタマーサクセスマネージャーへのバグ報告に以下の情報を含めてください。

- ローカルまたは CI/CD パイプラインで実行した SCA ツール (CLI など) の出力
- 生成された SBOM ファイル (ある場合)
- リポジトリの URL (パブリックまたはプライベート)
- 分析を実行したブランチ名
- リポジトリ内の依存関係ファイル一覧 (`package-lock.json`、`requirements.txt`、`pom.xml` など)

### SBOM アップロードに関する問題
[Datadog SBOM ジェネレータ][7]を推奨しますが、Datadog は任意の SBOM ファイルの取り込みをサポートしています。ファイルが Cyclone-DX 1.4 または Cyclone-DX 1.5 形式に準拠していることを確認してください。

SBOM ファイルの取り込みは以下のサードパーティーツールで検証済みです。
- [osv-scanner][7]
- [trivy][8]

SBOM ファイルを Datadog に取り込むには、以下の手順に従ってください。

1. `datadog-ci` CLI をインストールします (Node.js がインストールされている必要があります)。
2. `DD_SITE`、`DD_API_KEY`、`DD_APP_KEY` 環境変数が設定されていることを確認します。
3. ツールを呼び出して、ファイルを Datadog にアップロードします。
ツールのインストールと呼び出しは以下の 2 つのコマンドで行えます。
```bash
# datadog-ci をインストール
npm install -g @datadog/datadog-ci

# SBOM ファイルをアップロード
datadog-ci sbom upload /path/to/sbom-file.json
```

### Datadog UI に結果が表示されない

**GitHub 以外のリポジトリで Code Analysis を実行している場合**、最初のスキャンがデフォルトブランチ (`master`、`main`、`prod`、`production` など) 上で行われていることを確認してください。デフォルトブランチにコミットした後、非デフォルトブランチが分析されます。

常に [Repository Settings][4] でアプリ内からデフォルトブランチを構成できます。

### C# プロジェクトでパッケージが検出されない

当社の SBOM ジェネレータ ([`osv-scanner`][7]) は、`packages.lock.json` ファイルから依存関係を抽出します。このファイルがない場合は、プロジェクト定義を更新して生成することができます。`packages.lock.json` ファイルを生成するためには、[プロジェクト定義を更新する手順][9]に従ってください。

生成されたロックファイルは [`osv-scanner`][7] によって依存関係を抽出し、SBOM を生成するために使用されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/code_analysis/static_analysis/github_actions
[3]: /ja/code_analysis/static_analysis/github_actions#inputs
[4]: https://app.datadoghq.com/ci/settings/repository
[5]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[6]: https://docs.datadoghq.com/ja/code_analysis/static_analysis/setup/#diff-aware-scanning
[7]: https://github.com/DataDog/osv-scanner
[8]: https://github.com/aquasecurity/trivy
[9]: https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#enabling-the-lock-file