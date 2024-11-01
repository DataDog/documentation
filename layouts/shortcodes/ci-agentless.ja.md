GitHub Actions や CircleCI など、基盤となるワーカーノードにアクセスできないクラウド CI プロバイダーを使用している場合は、Agentless モードを使用するようにライブラリを構成します。そのためには、以下の環境変数を設定します。

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (必須)
: Agentless モードを有効または無効にします。<br/>
**デフォルト**: `false`

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][101]。<br/>
**デフォルト**: `(empty)`

さらに、データを送信する [Datadog サイト][102]を構成します。

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][102]。<br/>
**デフォルト**: `datadoghq.com`<br/>


[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: /getting_started/site/
