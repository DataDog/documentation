---
description: Oracle Exadata のデータベースモニタリングをインストールして構成する
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Basic Oracle インテグレーション
is_beta: true
private: true
title: Oracle Exadata のデータベースモニタリングの設定
---

{{< site-region region="gov" >}}
データベースモニタリングはこのサイトでサポートされていません。</div>
{{< /site-region >}}

<div class="alert alert-info">
このページで説明されている機能は非公開ベータ版です。
</div>

データベースモニタリングは、クエリサンプルを公開することで、Oracle データベースを深く可視化し、さまざまなワークロードをプロファイリングして問題を診断します。

## セットアップ

データベースでデータベースモニタリングを有効にするには、以下の手順を実行します。

### マルチノード Exadata

[Oracle RAC][8] の手順に従って、各ノードの Agent を構成します。

### シングルノード Exadata

[セルフホスト Oracle データベース][7]の手順に従って Agent を構成します。

### 検証

[Agent の status サブコマンドを実行][5]し、**Checks** セクションで `oracle-dbm` を探します。Datadog の[データベース][6]のページへ移動して開始します。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle-dbm.d/conf.yaml.example
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /ja/database_monitoring/setup_oracle/selfhosted
[8]: /ja/database_monitoring/setup_oracle/rac

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}