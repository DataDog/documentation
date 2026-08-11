---
further_reading:
- link: /profiler
  tag: ドキュメント
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: ドキュメント
  text: プロファイルの比較
title: Go - プロファイルガイド最適化 (PGO) で本番環境の CPU 使用量を最大 14% 削減
---

## 概要

[Go 1.21][1] から、Go コンパイラは profile-guided optimization (PGO) をサポートしています。

PGO は、本番ワークロードの CPU プロファイルから特に高負荷と判定されたコードに対して、追加の最適化を適用します。これは [Datadog Go Continuous Profiler][2] と互換性があり、本番ビルドで使用できます。

## PGO の仕組み

PGO の動作に関する主なポイントは以下のとおりです。

- PGO を有効にして Go プログラムをビルドすると、コンパイラは `default.pgo` という名前の pprof CPU プロファイルを探し、それを使用してより最適化されたバイナリを生成します。
- 典型的なプログラムでは、最適化後に CPU 使用時間が 2～14% 程度削減されると想定されます。PGO は現在も積極的に開発が進められており、将来的にはより大きな CPU 削減が期待されます。Datadog はこの取り組みを[積極的にサポートしています][3]。
- PGO では、代表的なプロファイルを使用することで最良の結果が得られます。ただし、代表的でないプロファイルや古いプロファイル (ソフトウェアの以前のバージョンから取得したもの) を使用しても、PGO を使用しない場合より遅くなることはないと想定されています。
- PGO 最適化済みアプリケーションから取得したプロファイルを使用しても、最適化や逆最適化が繰り返されるような「最適化サイクル」は発生しないと想定されています。これは反復的安定性 (iterative stability) と呼ばれます。

詳細は、[Go PGO ドキュメント][4]を参照してください。

## PGO の有効化

PGO は標準の Go コンパイラオプションで、Datadog からダウンロードしたプロファイルを手動で使用することも可能です。Datadog は、`datadog-pgo` というツールを用意しており、最新かつ最も代表的なプロファイルを使用してすべてのサービスで PGO を有効化するのに役立ちます。

`datadog-pgo` ツールを使った PGO の有効化手順

1. [API とアプリケーションキー][5] に記載のとおり、少なくとも `continuous_profiler_pgo_read` スコープを付与した API キーとアプリケーションキーを作成します。
2. `DD_API_KEY`、`DD_APP_KEY`、`DD_SITE` を CI プロバイダーのシークレット環境変数機能で設定します。
3. ビルドステップの前に `datadog-pgo` を実行します。
   例えば、`prod` 環境で動作する `foo` サービスがあり、そのメインパッケージが `./cmd/foo` にある場合は、ビルドステップに以下のように追加します。

   ```
   go run github.com/DataDog/datadog-pgo@latest "service:foo env:prod" ./cmd/foo/default.pgo
   ```

Go ツールチェーンはメインパッケージ内にある `default.pgo` を自動的に読み込むため、`go build` ステップを変更する必要はありません。

詳しくは [datadog-pgo GitHub リポジトリ][6]を参照してください。

## PGO が有効になっているかの確認

PGO が有効になっているかを確認するには、[pgo タグが true に設定されていない Go プロファイルを検索][7]します。

`pgo` タグは dd-trace-go 1.61.0 で実装されたため、このバージョンより前のプロファイルでは `pgo:false` は表示されません。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tip.golang.org/doc/go1.21
[2]: /ja/profiler/enabling/go
[3]: https://github.com/golang/go/issues/65532
[4]: https://go.dev/doc/pgo
[5]: /ja/account_management/api-app-keys
[6]: https://github.com/DataDog/datadog-pgo?tab=readme-ov-file#getting-started
[7]: https://app.datadoghq.com/profiling/explorer?query=runtime%3Ago%20-pgo%3Atrue%20&viz=stream