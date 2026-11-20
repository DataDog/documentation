アプリケーションが setuptools でパッケージ化されている場合

1. [`dd-trace` パッケージ](https://github.com/DataDog/dd-trace-py)をインストールします。
1. 最初のインポートとして `setup.py` ファイルに `import ddtrace.sourcecode.setuptools_auto` を追加します。
1. 環境変数 `DD_MAIN_PACKAGE` にプライマリ Python パッケージの名前を設定します。

アプリケーションが統一された Python プロジェクト設定ファイルを使用している場合

1. `hatch-datadog-build-metadata` プラグインをインストールして、git メタデータを埋め込むように構成します。プロジェクトにすでに URL がある場合は、それを動的なものとして再構成し、別の構成セクションに移動します。詳しくは、[プラグインソースコード](https://github.com/DataDog/hatch-datadog-build-metadata#readme)を参照してください。
1. 環境変数 `DD_MAIN_PACKAGE` にプライマリ Python パッケージの名前を設定します。
