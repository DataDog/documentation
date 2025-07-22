<div class="alert alert-warning">Observability Pipelines は gzip (レベル 6) アルゴリズムを使用してログを圧縮します。</div>

以下のフィールドはオプションです。
1. データを格納する Splunk インデックスの名前を入力します。このインデックスは、使用している HEC で許可されている必要があります。ログを特定のフィールドに基づいて異なるインデックスにルーティングする場合は、[テンプレート構文][10051]を参照してください。
1. タイムスタンプを自動的に抽出するかどうかを選択します。`true` に設定すると、Splunk はメッセージからタイムスタンプを必要な形式 `yyyy-mm-dd hh:mm:ss` で抽出します。
1. 必要に応じて、Splunk のデフォルト値を上書きする場合は `sourcetype` を設定します。HEC データの場合の Splunk のデフォルト値は `httpevent` です。ログを特定のフィールドに基づいて異なるソースタイプにルーティングする場合は、[テンプレート構文][10051]を参照してください。

[10051]: /observability_pipelines/destinations/#template-syntax
