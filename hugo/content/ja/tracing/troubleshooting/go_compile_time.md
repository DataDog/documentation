---
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
  tag: ドキュメント
  text: Go アプリケーションのトレース
title: Go コンパイル タイム インスツルメンテーションのトラブル シューティング
---

## 概要

このガイドでは、 [Orchestrion][1] が管理するビルドのトラブル シューティング方法を説明します。これらの手順は、ビルド プロセスに関するインサイトを Datadog が収集するのに役立ち、不具合報告の支援にもなります。

<div class="alert alert-danger"> 生成されたファイルには、ソース コードや依存関係名など、機微なプロジェクト情報が含まれる場合があります。このような情報を公開で共有することに懸念がある場合は、Datadog サポートに連絡し、非公開でデータを共有してください。 </div>

## ワーク ツリーの保持

Orchestrion は、 `go build` のワーク ツリーにビルド時の変換を記録します。ビルド後に `go` ツールチェーンがこのディレクトリをクリーンアップしないようにするには、 `-work` フラグを使用します :

```shell
orchestrion go build -work ./...
WORK=/tmp/go-build2455442813
```

ワーク ツリーの場所は、ビルドの開始時に `WORK=` として出力されます。このディレクトリには、ビルドされた各 `go` パッケージごとのサブディレクトリが含まれ、これらは *ステージ ディレクトリ* と呼ばれます。

## ワーク ツリーの内容

Orchestrion がソース ファイルにコードを挿入すると、変更済みファイルは `orchestrion/src` サブディレクトリ内のパッケージのステージ ディレクトリ ( `$WORK/b###` ) に書き出されます。パッケージのインポート構成が変更された場合、元のファイルは `.original` サフィックス付きで保持されます。これらの可読なファイルを確認することで、 Orchestrion の動作を検証できます。解釈の支援が必要な場合は Datadog サポートにお問い合わせください。

## ログ設定

### ログ レベル

Orchestrion のログ出力は、 `ORCHESTRION_LOG_LEVEL` 環境変数または `--log-level` フラグで制御できます :

| レベル | 説明 |
|-------|-------------|
| `NONE`, `OFF` (デフォルト) | ログ出力なし |
| `ERROR` | エラー情報のみ |
| `WARN` | エラーと警告 |
| `INFO` | エラー、警告、および情報メッセージ |
| `DEBUG` | 詳細なロギング |
| `TRACE` | 極めて詳細なロギング |

<div class="alert alert-danger"> <code>ORCHESTRION_LOG_LEVEL</code> を <code>DEBUG</code> または <code>TRACE</code> レベルに設定すると、ビルド パフォーマンスに大きな影響を与える可能性があります。通常運用ではこれらの設定は推奨されません。 </div>

### ログ ファイル出力

`ORCHESTRION_LOG_FILE` 環境変数または `--log-file` フラグに希望のファイル パスを設定すると、ログ メッセージをコンソールではなくファイルに書き出せます。

<div class="alert alert-info"> <code>ORCHESTRION_LOG_FILE</code> を設定すると、 <code>ORCHESTRION_LOG_LEVEL</code> のデフォルト値は <code>WARN</code> に変更されます。 </div>

ログ ファイル パスには `$PID` または `${PID}` トークンを含めることができ、これはロギング プロセスの PID に置き換えられます。これによりファイルの競合が減りますが、大規模なプロジェクトでは複数のログ ファイルが作成されます。

ファイル パスに `$PID` が含まれているかどうかに関係なく、ロギングは既存のファイルを上書きせず追記します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/orchestrion