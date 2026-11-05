---
description: Datadog の Supply Chain Firewall 用 GitHub Action を使用して、悪意のあるパッケージが CI/CD
  ランナーに流入することを防止します。
disable_toc: false
further_reading:
- link: /security/code_security/#supply-chain-security-preview
  tag: ドキュメント
  text: Supply Chain Security
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: ブログ
  text: 'Supply-Chain Firewall の紹介: 開発者を悪意のあるオープンソースパッケージから保護する'
- link: https://www.datadoghq.com/blog/supply-chain-firewall-code-security/
  tag: ブログ
  text: Supply Chain Firewall と Datadog Code Security を使用して、組織全体で悪意のあるパッケージを阻止する
is_beta: true
title: Supply Chain Firewall GitHub Action
---
Supply Chain Firewall GitHub Action は、Datadog の [Supply Chain Firewall][1] (SCFW) をインストールし、それ以降のすべてのワークフローステップでサポートされているパッケージマネージャーのコマンドをインターセプトするように構成します。有効な場合、SCFW はサポートされている各パッケージマネージャーコマンドを実行前に検査します。

<div class="alert alert-info">このアクションは Linux ランナーと macOS ランナーのみをサポートしています。</div>

## 使用方法 {#usage}

```yaml
steps:
  - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      version: '3.1.0'
      package-managers: npm,pip

  # npm and pip commands are inspected by SCFW before they run.
  # Flagged packages are blocked; other installs proceed normally.
  - run: pip install -r requirements.txt
  - run: npm install
```

### Supply Chain Security インテグレーションを構成する{#configure-the-supply-chain-security-integration}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="プレビューに参加しましょう。">}}
このフォームを使用して、Supply Chain Security (プレビュー版) への参加リクエストを送信してください。
{{< /callout >}}

```yaml
steps:
  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      dd-codesec-logger: 'true'
      dd-api-key: ${{ secrets.DD_API_KEY }}
      dd-app-key: ${{ secrets.DD_APP_KEY }}
      dd-site: {{< region-param key="dd_site" >}}
```

### `SCFW_HOME` ディレクトリをキャッシュする{#cache-the-scfw-home-directory}

`SCFW_HOME` をキャッシュすると、実行のたびに検証ツールのデータを再取得せずに済みます。

```yaml
steps:
  - uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
    with:
      path: ~/.scfw
      key: scfw-${{ runner.os }}

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      scfw-home: ~/.scfw
```

## 仕組み{#how-it-works}

1. **インストール**: Supply Chain Firewall CLI は、`pipx` により分離された Python 環境にインストールされます。これにより、プロジェクトの依存関係に干渉することがありません。

2. **ラップ**: 要求された各パッケージマネージャーに対して、このアクションは一時ディレクトリに軽量なラッパースクリプトを書き込み、そのディレクトリを `PATH` の先頭に追加します。それ以降、これらのパッケージマネージャーを呼び出すすべてのステップは、自動的に Supply Chain Firewall を経由してルーティングされます。

   各ラッパーは、呼び出し時に `PATH` からそれ自体のディレクトリを削除してからバイナリを検索することで実際のバイナリを特定し、その特定されたパスを `scfw run --executable` に渡します。これにより、Supply Chain Firewall がラッパーを再度呼び出すことなく、実際のバイナリを呼び出すようになります。

   `source .venv/bin/activate` などを使用して Python 仮想環境をアクティブ化すると、そのステップの残りの期間にわたり Supply Chain Firewall のラッパーよりも優先されます。仮想環境内で実行されるコマンドには、明示的に `scfw run pip install ...` を使用してください。

3. **構成**: `DD_API_KEY` や `SCFW_HOME` などの関連する環境変数は、後続のステップで使用できるように `GITHUB_ENV` に書き込まれます。

   `GITHUB_ENV` に書き込まれた環境変数は、ジョブ内のそれ以降のすべてのステップ (このアクションの後に実行されるサードパーティアクションを含む) からアクセス可能です。`dd-api-key` または `dd-app-key` を指定する場合は、ワークフロー内でその後に続くアクションに不審な動作や侵害の兆候がないかを監査してください。

## 入力 {#inputs}

| 入力 | 説明 | デフォルト |
|-------|-------------|---------|
| `version` | インストールする SCFW のバージョン。`"latest"` を使用するか、特定のリリースに固定します (例: `"3.1.0"`)。| `latest` |
| `package-managers` | インターセプトするパッケージマネージャーのカンマ区切りリスト。サポート対象: `npm`、`pip`、`poetry`。| `npm,pip,poetry` |
| `error-on-block` | インストールがブロックされたときに、ゼロ以外の終了コードでワークフローステップを失敗させます。| `true` |
| `dd-api-key` | ファイアウォールイベントを Datadog HTTP または Code Security API に転送するための Datadog API キー。次のキーを使用してください: `${{ secrets.DD_API_KEY }}`. | — |
| `dd-app-key` | Datadog application key for forwarding firewall events to the Datadog Code Security API. Use `${{ secrets.DD_APP_KEY }}`. | — |
| `dd-api-logger` | When `"true"`, enables SCFW's Datadog HTTP API logger. Requires `dd-api-key`. | `false` |
| `dd-codesec-logger` | When `"true"`, enables SCFW's Datadog Code Security logger. Requires `dd-api-key` and `dd-app-key`. | `false` |
| `dd-site` | Datadog サイト ({{< region-param key="dd_site" code="true" >}})。`dd-api-logger` と `dd-codesec-logger` の両方で使用されます。| `datadoghq.com` |
| `dd-log-level` | Datadog に転送するファイアウォールイベントを制御します。`ALLOW` の場合はすべてのイベントがログに記録され、`BLOCK` の場合はブロックされたイベントのみがログに記録されます。| `ALLOW` |
| `scfw-home` | SCFW のローカルキャッシュのディレクトリ。実行間で検証データの取得を高速化するために、キャッシュされたディレクトリを指定します。| — |
| `on-warning` | 警告レベルの検出結果に対して SCFW が実行すべきアクション: `ALLOW` または `BLOCK`。非対話型環境ではデフォルトで `BLOCK` になります。| — |
| `package-minimum-age` | インストールが許可されるまでに必要なパッケージバージョンの最小経過時間 (時間単位)。| `24` |
| `dd-env` | 転送されるすべてのファイアウォールイベントに付加される Datadog 環境タグ。| `ci` |
| `dd-log-attributes` | 転送されるすべての Datadog ログイベントに付加されるカスタム属性からなる JSON オブジェクト (例: `'{"team":"security"}'`)。| — |

## 出力 {#outputs}

| 出力 | 説明 |
|--------|-------------|
| `scfw-version` | インストールされている Supply Chain Firewall のバージョン。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/supply-chain-firewall