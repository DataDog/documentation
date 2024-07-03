---
aliases:
- /ja/agent/faq/agent-s-are-no-longer-reporting-data
- /ja/agent/faq/common-windows-agent-installation-error-1721
further_reading:
- link: /agent/troubleshooting/hostname_containers/
  tag: Documentation
  text: Agent hostname resolution in containers
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Agent Debug Mode
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentation
  text: Send an Agent Flare
- link: /agent/troubleshooting/permissions/
  tag: Documentation
  text: Agent Permission Issues
- link: /agent/troubleshooting/site/
  tag: Documentation
  text: Check Agent Site
- link: /agent/troubleshooting/ntp/
  tag: Documentation
  text: Agent NTP issues
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentation
  text: Get the Status of an Agent Check
- link: /agent/troubleshooting/high_memory_usage/
  tag: Documentation
  text: High CPU or memory consumption
title: Agent Troubleshooting
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

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://app.datadoghq.com/metric/explorer
[3]: /ja/agent/troubleshooting/hostname_containers/
[4]: /ja/agent/configuration/proxy/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/agent/troubleshooting/site/
[7]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[8]: /ja/agent/configuration/agent-log-files/
[9]: /ja/agent/troubleshooting/debug_mode/
[10]: /ja/help/
[11]: /ja/agent/troubleshooting/send_a_flare/