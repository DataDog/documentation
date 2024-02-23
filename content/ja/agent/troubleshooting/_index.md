---
aliases:
- /ja/agent/faq/agent-s-are-no-longer-reporting-data
- /ja/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/hostname_containers/
  tag: ドキュメント
  text: コンテナにおける Agent のホスト名解決
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent デバッグモード
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: Agent フレアの送信
- link: /agent/troubleshooting/permissions/
  tag: ドキュメント
  text: Agent のアクセス許可に関する問題
- link: /agent/troubleshooting/site/
  tag: ドキュメント
  text: Agent サイトをチェック
- link: /agent/troubleshooting/ntp/
  tag: ドキュメント
  text: Agent の NTP 関連問題
- link: /agent/troubleshooting/agent_check_status/
  tag: ドキュメント
  text: Agent チェックのステータスを確認
- link: /agent/troubleshooting/high_memory_usage/
  tag: Documentation
  text: CPU やメモリの消費量が多い
kind: documentation
title: Agent のトラブルシューティング
---

<mrk mid="39" mtype="seg">Datadog Agent をまだインストールしていない場合は、[こちら][1]のページにアクセスし、指示に従ってインストールを進めてください。</mrk><mrk mid="40" mtype="seg">Agent をインストールしたばかりの場合は、メトリクスが表示されるまでに数分かかることがあります。</mrk><mrk mid="41" mtype="seg">メトリクスについて確認する場合は、まず[メトリクスエクスプローラー][2]をご覧ください。</mrk>

何か問題が起きないか心配な場合は、先に以下のチェックリストをご確認ください。

* Agent コンテナが起動後すぐに停止していませんか？[ホスト名][3]の検出の問題である可能性があります。
* ホストがインターネットに接続している、またはプロキシ経由でアクセスできる。
* プロキシを使用している場合、その[プロキシに対して Agent が構成されている][4]。
* `datadog.yaml` コンフィギュレーションファイルに設定されている Datadog API キーは、[ご使用の Datadog プラットフォームに対応する API キー][5]ですか？
* `datadog.yaml` コンフィギュレーションファイルに設定されているサイトが、[所属する組織のものと一致][6]しますか？
* ホストで実行されている Datadog Agent は 1 つだけである。
* yaml 構成ファイルの編集後に Datadog Agent を再起動した。

上記すべての条件を満たす場合は、[ステータスコマンドを実行][7]して、Agent とインテグレーションの状態を詳細に確認します。[Agent ログ][8]を直接チェックしたり、デバッグモードを有効にして、[Agent から詳細なログを取得][9]することもできます。

それでも問題がはっきりしない場合は、Agent から[フレア][11]で [Datadog のサポートチーム][10]にご連絡ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /ja/agent/troubleshooting/hostname_containers/
[4]: /ja/agent/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/agent/troubleshooting/site/
[7]: /ja/agent/guide/agent-commands/#agent-status-and-information
[8]: /ja/agent/guide/agent-log-files/
[9]: /ja/agent/troubleshooting/debug_mode/
[10]: /ja/help/
[11]: /ja/agent/troubleshooting/send_a_flare/