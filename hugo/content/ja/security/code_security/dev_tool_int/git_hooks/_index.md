---
aliases:
- /ja/code_analysis/git_hooks/
description: エラーのあるコードのマージを防ぐ
title: Git フック
---

## 概要

[Git フック](https://git-scm.com/docs/githooks)は、ユーザーがコードをリポジトリにコミットしたり、リモートロケーションにプッシュする前に実行されるプログラムです。Git フックは一般的に、リモートブランチにプッシュされる前にコードを検証し、要件を強制するために使用されます。

Datadog Code Security は、コードがプッシュまたはコミットされる前に、静的コード解析 (SAST) の違反やシークレットの有無をチェックする Git フックを提供します。Code Security の Git フックは、最新のコミットおよびデフォルト ブランチのコードをチェックし、検出した問題をフラグ付けします。

Datadog Git フックは、コーディングエラー、脆弱性、または機密情報を含むコードをプッシュする前に開発者に警告します。エラーのあるコードをコミットすると、ユーザーの端末に次のようなプロンプトが表示されます。

{{< img src="code_security/git_hooks/git_hook.png" alt="Datadog Git フックが脆弱性を検出" style="width:100%;">}}

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
 - `--static-analysis`: 静的コード解析を有効にします。
 - `--secrets`: シークレットの検出を有効にします (プレビュー版 - [Datadog サポート][1] までご連絡ください)。
 - `--output <file>`: コミットで検出された問題を SARIF ファイルにエクスポートします。

[1]: https://www.datadoghq.com/support/