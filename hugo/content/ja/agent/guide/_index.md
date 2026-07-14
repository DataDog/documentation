---
cascade:
  algolia:
    category: Guide
    rank: 70
    subcategory: Agent Guides
description: Datadog Agent の構成、インストール、トラブルシューティング、および高度な機能に関する包括的なガイドのコレクション。
disable_toc: true
private: true
title: Agent ガイド
---
{{< header-list header="構成ガイド" >}}
    {{< nextlink href="agent/guide/setup_remote_config" >}}Fleet Automation の Remote Configuration を設定する{{< /nextlink >}}
    {{< nextlink href="agent/guide/environment-variables" >}}Agent 環境変数{{< /nextlink >}}
    {{< nextlink href="agent/guide/datadog-disaster-recovery" >}}Datadog 災害復旧{{< /nextlink >}}
    {{< nextlink href="agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity" >}}インターネット接続が制限されているサーバーへの Agent のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/ansible_standalone_role/" >}}Ansible でスタンドアロンの Datadog ロールを使用してセットアップする{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-retry/" >}}Agent の再試行とバッファリングロジック {{< /nextlink >}}
    {{< nextlink href="agent/guide/how-do-i-uninstall-the-agent" >}}Agent をアンインストールするにはどうすればよいですか{{< /nextlink >}}
    {{< nextlink href="agent/guide/linux-key-rotation-2024" >}}Linux キーローテーション 2024{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Windows ガイド" >}}
    {{< nextlink href="agent/guide/datadog-agent-manager-windows" >}}Windows 用 Datadog Agent Manager{{< /nextlink >}}
    {{< nextlink href="agent/guide/windows-agent-ddagent-user" >}}Datadog Windows Agent ユーザー{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="クラウドインフラストラクチャーガイド" >}}
    {{< nextlink href="agent/guide/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/" >}}Google CloudSQL で dd-agent mysql チェックをセットアップできますか{{< /nextlink >}}
    {{< nextlink href="/agent/guide/heroku-ruby" >}}Datadog で Heroku の Ruby on Rails アプリケーションをインスツルメント{{< /nextlink >}}
    {{< nextlink href="agent/guide/heroku-troubleshooting/" >}}Datadog-Heroku Buildpack のトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="agent/guide/private-link" >}}AWS PrivateLink を介して Datadog にテレメトリを安全に転送する{{< /nextlink >}}
    {{< nextlink href="agent/guide/azure-private-link" >}}Azure Private Link を介して Datadog に接続する{{< /nextlink >}}
    {{< nextlink href="agent/guide/why-should-i-install-the-agent-on-my-cloud-instances" >}}クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか{{< /nextlink >}}
    {{< nextlink href="agent/guide/gcp-private-service-connect" >}}GCP Private Service Connect 経由で Datadog に接続する{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="インテグレーションガイド" >}}
    {{< nextlink href="agent/guide/use-community-integrations" >}}コミュニティインテグレーションを使用する{{< /nextlink >}}
    {{< nextlink href="agent/guide/integration-management" >}}インテグレーション管理{{< /nextlink >}}
{{< /header-list >}}

{{< whatsnext desc="Agent バージョンガイド:" >}}
    {{< nextlink href="agent/guide/version_differences" >}}Agent バージョンの違い{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_agent_fleet_automation" >}} Datadog Agent のアップグレード {{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-v6-python-3" >}}Python のバージョン管理: Datadog Agent v6 で Python 3 を使用する{{< /nextlink >}}
    {{< nextlink href="agent/guide/python-3" >}}Python 2 から 3 へのカスタムチェックの移行{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 6 のガイド" >}}
    {{< nextlink href="agent/guide/install-agent-6" >}}Agent 6 のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-commands" >}}Agent 6 のコマンド{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-configuration-files" >}}Agent 6 の構成ファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-log-files" >}}Agent 6 のログファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_to_agent_6" >}}Agent 6 へのアップグレード{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 5 のガイド" >}}
    {{< nextlink href="agent/guide/agent-5-architecture" >}}Agent 5 のアーキテクチャ{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-commands" >}}Agent 5 のコマンド{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-configuration-files" >}}Agent 5 の構成ファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-log-files" >}}Agent 5 のログファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/install-agent-5" >}}Agent 5 のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-ports" >}}Agent 5 のポート{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-proxy" >}}Agent 5 プロキシの構成{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-flare" >}}Agent 5 フレアの送信{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-autodiscovery" >}}Agent 5 における Autodiscovery{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-kubernetes-basic-agent-usage" >}}Agent 5 と Kubernetes での基本的な Agent の利用方法{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-check-status" >}}Agent 5 での Agent チェックのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-permissions-issues" >}}Agent 5 のアクセス許可に関する問題{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-debug-mode" >}}Agent 5 デバッグモード{{< /nextlink >}}
    {{< nextlink href="agent/guide/dogstream" >}}Dogstream{{< /nextlink >}}
{{< /header-list >}}