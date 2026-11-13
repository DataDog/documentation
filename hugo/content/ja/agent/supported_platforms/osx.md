---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /ja/guides/basic_agent_usage/osx/
- /ja/agent/basic_agent_usage/osx/
further_reading:
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process/
  tag: ドキュメント
  text: プロセスの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースの収集
- link: /agent/architecture/#agent-architecture
  tag: ドキュメント
  text: Agent のアーキテクチャを詳しく見る
- link: /agent/configuration/network#configure-ports
  tag: ドキュメント
  text: インバウンドポートの構成
os: osx
platform: OS X
title: macOS
---
## 概要 {#overview}

このページでは、macOS 向け Datadog Agent の基本的な機能について説明します。サポートされている macOS のディストリビューションとバージョンの完全なリストについては、[サポートされているプラットフォーム][5] のドキュメントを参照してください。

## Agent のインストール {#install-the-agent}
macOS に Datadog Agent をインストールするには、[Fleet Automation のアプリ内手順][6] に従い、生成されたスクリプトをホストで実行してください。

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="macOS ホストに Datadog Agent をインストールするためのアプリ内手順。" style="width:90%;">}}

<div class="alert alert-info">
Agent は、 <code>/opt/datadog-agent</code>にあるサンドボックスにインストールされます。追加の監視を行う場合は、Agent ユーザーに <code>_dd-agent</code> ファイルまたはディレクトリへのアクセス権を付与してください。
</div>


## コマンド {#commands}

`launchctl` サービスマネージャーが Agent のライフサイクルを制御します。その他のコマンドは、Agent バイナリ、systray アプリ、または Web GUI から実行できます。


| 説明          | コマンド          |
|----------------------|------------------|
| Agent をサービスとして起動する           | `sudo launchctl kickstart system/com.datadoghq.agent` |
| サービスとして実行中の Agent を停止する    | `sudo launchctl kill SIGTERM system/com.datadoghq.agent`  |
| サービスとして実行中の Agent を再起動する | `sudo launchctl kickstart -k system/com.datadoghq.agent` |
| Agent サービスのステータス            | `sudo launchctl print system/com.datadoghq.agent` |
| 実行中の Agent のステータスページ       | `sudo datadog-agent status` または Web GUI                    |
| Flare を送信する                         | `sudo datadog-agent flare` または Web GUI                     |
| コマンドの使用方法を表示する              | `datadog-agent --help`                               |
| チェックを実行する                        | `sudo datadog-agent check <CHECK_NAME>`                   |


## 構成 {#configuration}

[Datadog Agent 構成ファイル][7] は `/opt/datadog-agent` にあります。この YAML ファイルには、Datadog にデータを送信するために使用されるホスト全体の次のような接続情報が含まれています。

- `api_key`: お使いの組織の [Datadog API キー][8]
- `site`: ターゲットの Datadog リージョン (例: `datadoghq.com`、`datadoghq.eu`、`ddog-gov.com`、`us2.ddog-gov.com`)
- `proxy`: アウトバウンドトラフィック用の HTTP/HTTPS プロキシエンドポイント ([Datadog Agent プロキシ構成][9] を参照)
- デフォルトのタグ、ログレベル、および Datadog 構成。

`/opt/datadog-agent/etc/datadog.yaml.example` にある完全なコメント付きのリファレンスファイルには、比較やコピーアンドペーストに使用できるすべてのオプションが記載されています。または、GitHub の [macOS 用 Agent 構成サンプルファイル][10] を参照してください。

### インテグレーションファイル {#integration-files}
インテグレーション用の構成ファイルは `/opt/datadog-agent/etc/conf.d/` にあります。各インテグレーションには、それぞれサブディレクトリ `<INTEGRATION>.d/` があり、次のものが含まれています。
- `conf.yaml`: インテグレーションがメトリクスとログを収集する方法を制御するアクティブな構成
-  `conf.yaml.example`: サポートされているキーとデフォルトを示すサンプル



## Agent のアンインストール {#uninstall-the-agent}

Agent をアンインストールするには、次のスクリプトを実行します。

```shell
curl -L https://install.datadoghq.com/scripts/uninstall_mac_os.sh | bash
```

## トラブルシューティング {#troubleshooting}

トラブルシューティングの手順については、[Agent トラブルシューティングのドキュメント][2] を参照してください。

## 埋め込み Agent の使用 {#working-with-the-embedded-agent}

Agent には `/opt/datadog-agent/embedded/` に埋め込まれた Python 環境が含まれています。`python` や `pip` などの一般的なバイナリは、`/opt/datadog-agent/embedded/bin/` に含まれています。

詳細については、[埋め込み Agent へのパッケージの追加方法][3] の手順を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /ja/agent/troubleshooting/
[3]: /ja/extend/guide/custom-python-package/
[4]: /ja/integrations/
[5]: https://docs.datadoghq.com/ja/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /ja/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[11]: https://install.datadoghq.com/scripts/uninstall_mac_os.sh