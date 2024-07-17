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
title: Agent のトラブルシューティング
---

If you have not yet installed the Datadog Agent, go [to the dedicated Agent integration page][1] for installation instructions. If you just installed the Agent, it may take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer][2].

If you think you might be experiencing issues, follow this checklist first:

* Is your Agent container stopping right after starting? It can be a [hostname][3] detection issue.
* Is your host connected to the internet or able to access it through a proxy?
* If using a proxy: is your [Agent configured for this proxy][4]?
* Is the Datadog API key set up in your `datadog.yaml` configuration file [the API key corresponding to your Datadog platform][5]?
* Is the site configured in your `datadog.yaml` configuration file [matching the one from your organization][6]?
* Is there only one Datadog Agent running on your host?
* Did you restart the Datadog Agent after editing a yaml configuration file?

If the answer to all questions above is `yes`, then [run the status command][7] for more details about your Agent and its integrations status. You can also check the [Agent logs][8] directly and enable debug mode to [get more logging from the Agent][9].

If you're still unsure about the issue, you may reach out to the [Datadog support team][10] with [a flare][11] from your Agent.

## Further Reading

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