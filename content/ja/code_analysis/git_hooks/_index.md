---
description: エラーのあるコードのマージを防ぐ
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
title: Git フック
---

## 概要

[Git フック](https://git-scm.com/docs/githooks)は、ユーザーがコードをリポジトリにコミットしたり、リモートロケーションにプッシュする前に実行されるプログラムです。Git フックは一般的に、リモートブランチにプッシュされる前にコードを検証し、要件を強制するために使用されます。

Datadog Code Analysis は、コードがプッシュまたはコミットされる前に、静的解析の違反や機密情報をチェックする Git フックを提供します。Datadog Code Analysis の Git フックは、最新のコミットとデフォルトブランチのコードをチェックし、検出したエラーをすべて表示します。

Datadog Git フックは、コーディングエラー、脆弱性、または機密情報を含むコードをプッシュする前に開発者に警告します。エラーのあるコードをコミットすると、ユーザーの端末に次のようなプロンプトが表示されます。

{{< img src="code_analysis/git_hooks/git_hook.png" alt="Datadog Git フックが脆弱性を検出" style="width:100%;">}}

## セットアップ

1. リリースページまたは [Datadog Static Analyzer リリース](https://github.com/DataDog/datadog-static-analyzer/releases)から `datadog-git-hook` プログラムを
ダウンロードします。
2. プログラムをコンピュータにインストールします。
3. 以下のスクリプトをリポジトリに `.git/hooks/pre-push` ファイルとして追加します。**注:** このスクリプトは、`datadog-static-analyzer-git-hook` バイナリが `/usr/local/bin/datadog-static-analyzer-git-hook` に存在することを前提としています。

```bash
#!/bin/sh

# リポジトリのルートパスを取得
repo_path=$(git rev-parse --show-toplevel)

# ユーザー入力が可能であることを確認
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --static-analysis --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

このプログラムは以下のパラメーターを受け入れます。

 - `--confirmation`: Git フックのチェックをオーバーライドするかどうかについて、ユーザーに確認を求めます。
 - `--default-branch`: デフォルトのブランチ名を指定します。
 - `--static-analysis`: 静的解析を有効にします。
 - `--secrets`: 機密情報の検出を有効にします (非公開ベータ版)。
 - `--output <file>`: コミットで検出された問題を SARIF ファイルにエクスポートします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}