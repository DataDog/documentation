---
description: LLM Observability ダッシュボードを Datadog アカウントなしでローカルで実行し、ブラウザでコーディングエージェントとアプリケーションのトレースを検査します。
further_reading:
- link: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
  tag: GitHub
  text: GitHub の Lapdog README
- link: /llm_observability/instrumentation/sdk
  tag: ドキュメント
  text: LLM Observability SDK を使用したアプリケーションのインスツルメンテーション
- link: /llm_observability/instrumentation/auto_instrumentation
  tag: ドキュメント
  text: LLM Observability のための自動インスツルメンテーション
title: Lapdog
---
## 概要 {#overview}

Lapdog は LLM Observability のためのローカル開発ツールです。`localhost:8126` でエージェントを実行し、LLM アプリケーションまたはコーディングエージェント (Claude Code、Codex、Pi など) からすべてのスパン、プロンプト、ツールコール、コストをキャプチャして、[lapdog.datadoghq.com](https://lapdog.datadoghq.com) のブラウザダッシュボードにストリーミングします。Datadog アカウントは必要ありません。

Lapdog はオープンソースの [Datadog APM テストエージェント][1]に基づいています。キャプチャされたテレメトリを Datadog に転送することもでき、同じデータが LLM Observability に本番トラフィックと共に表示されます。

## 得られるもの {#what-you-get}

- プロンプト、ツールコール、応答を含むセッションごとのトレース
- 入力、出力、キャッシュヒット別のトークン使用量と推定コスト
- 権限の摩擦: ゲート付きツールコールと待機時間
- セッション中のコンテキストウィンドウ使用量とキャッシュヒット率
- 実行中のコーディングエージェントのライブステータス (実行中、アイドル、ブロック)

## インストール {#install}

{{< tabs >}}
{{% tab "Homebrew (macOS)" %}}

```shell
brew install datadog/lapdog/lapdog
```
{{% /tab %}}
{{% tab "pip / pipx" %}}

```shell
pipx install ddapm-test-agent
# or: pip install ddapm-test-agent
```
{{% /tab %}}
{{< /tabs >}}

Docker、ソースから、その他のインストールパスについては、[Lapdog インストールガイド][1]を参照してください。

## コーディングエージェントを実行する {#run-a-coding-agent}

Lapdog はコーディングエージェントをエンドツーエンドでインスツルメントします。プロンプト、ツールコール、権限の各リクエストは、ダッシュボードから再生できるセッションのスパンになります。

{{< tabs >}}
{{% tab "Claude Code" %}}

```shell
lapdog claude
```
ローカルエージェントを起動し、Claude Code の Lapdog プラグインをインストールし、Claude Code を起動します。
{{% /tab %}}
{{% tab "Codex" %}}

```shell
lapdog codex
```
ローカルエージェントを起動し、すべての LLM リクエスト、ツールコール、ステップをセッションにキャプチャする OpenAI 互換のプロキシと JSONL ウォッチャーを使用して Codex を起動します。
{{% /tab %}}
{{% tab "Pi" %}}

```shell
lapdog pi
```
ローカルエージェントを起動し、Pi の Lapdog 拡張機能をインストールし、`LAPDOG_URL` が構成された Pi を起動します。
{{% /tab %}}
{{% tab "その他" %}}

```shell
lapdog python my_app.py
```
`ddtrace` の自動インスツルメンテーションをローカルエージェントに指定して任意のコマンドを実行します。開発中に独自の LLM 駆動アプリケーションをインスツルメントするのに便利です。
{{% /tab %}}
{{< /tabs >}}

**注**: `lapdog claude` と `lapdog codex` はプロキシ経由です。ローカル Lapdog エージェントはライブモデルリクエストパスに配置されています。コーディングエージェントが終了するまで Lapdog の実行を継続します。セッション中に Lapdog を停止または終了すると、起動されたコーディングエージェントによるモデル呼び出しの進行が停止する可能性があります。Lapdog を再起動してからコーディングエージェントを再起動します。`lapdog pi` およびフックのみのセットアップは、Lapdog がダウンするとフェイルオープンします。コーディングエージェントの実行が継続されますが、キャプチャデータは失われます。

## セッションを表示する {#view-sessions}

セッションの実行中に [lapdog.datadoghq.com](https://lapdog.datadoghq.com) を開きます。ダッシュボードは `localhost:8126` のローカルエージェントから直接読み取ります。ログインや Datadog アカウントは必要ありません。

ローカルポートを変更した場合は、ダッシュボードヘッダーの {{< ui >}}Collecting sessions{{< /ui >}} バッジからオーバーライドします。

## Datadog にイベントを転送する {#forward-events-to-datadog}

キャプチャされたイベントを Datadog の LLM Observability にデュアルシップするには、API キーを設定して `--forward` を渡します。

```shell
DD_API_KEY=<YOUR_API_KEY> lapdog --forward claude
```

転送されたスパンには `source:lapdog` のタグが付けられるため、開発セッションと本番トラフィックを区別できます。

## 便利なコマンド {#useful-commands}

| コマンド | 機能 |
| --- | --- |
| `lapdog claude` | キャプチャが接続された状態で Claude Code を起動する |
| `lapdog codex` | OpenAI プロキシと JSONL ウォッチャーが接続された状態で Codex を起動する |
| `lapdog pi` | Lapdog 拡張機能がインストールされた状態で Pi を起動する |
| `lapdog python app.py` | トレースインスツルメンテーションを使用して任意のアプリケーションを実行する |
| `lapdog start` | バックグラウンドでローカルエージェントを起動する |
| `lapdog stop` | バックグラウンドエージェントを停止する |
| `lapdog status` | エージェントが実行されているかどうかを表示する |

オプションの完全なリストを表示するには、`lapdog --help` を実行してください。

## アンインストール {#uninstall}

Lapdog とそれによってホームディレクトリに書き込まれた状態を削除するには、次の手順に従います。パッケージマネージャー (Homebrew、pip、または pipx) は、そのマネージャーでインストールしたものだけをクリーンアップします。`~/.lapdog/`、Claude Code プラグイン、pi 拡張機能は対象になりません。

1. ローカルエージェントを停止します。

   ```shell
   lapdog stop
   ```

2. Claude Code プラグインを削除します (インストールされている場合)。

   ```shell
   claude plugin uninstall lapdog@lapdog
   claude plugin marketplace remove lapdog
   ```

3. pi 拡張機能を削除します (`lapdog pi` を実行した場合のみ)。

   ```shell
   rm -f ~/.pi/agent/extensions/lapdog.ts
   ```

4. Lapdog 作業ディレクトリを削除します。

   ```shell
   rm -rf ~/.lapdog
   ```

5. パッケージをアンインストールします。

   {{< tabs >}}
   {{% tab "Homebrew (macOS)" %}}
   ```shell
   brew uninstall lapdog
   brew untap datadog/lapdog
   ```
   {{% /tab %}}
   {{% tab "pip / pipx" %}}
   ```shell
   pipx uninstall ddapm-test-agent
   # or: pip uninstall ddapm-test-agent
   ```
   {{% /tab %}}
   {{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md