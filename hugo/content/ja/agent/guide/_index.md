---
cascade:
  algolia:
    category: Guide
    rank: 70
    subcategory: Agent Guides
description: Datadog Agent の設定、インストール、トラブルシューティング、および高度な機能を網羅した包括的なガイド集です。
disable_toc: true
private: true
title: Agent ガイド
---
{{< header-list header="設定ガイド" >}}
    {{< nextlink href="agent/guide/setup_remote_config" >}}Fleet Automation 用 Remote Configuration のセットアップ{{< /nextlink >}}
    {{< nextlink href="agent/guide/environment-variables" >}}Agent 環境変数{{< /nextlink >}}
    {{< nextlink href="agent/guide/rshell" >}}Agent 制限付きシェル (rshell){{< /nextlink >}}
    {{< nextlink href="agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity" >}}インターネット接続が制限されているサーバーへの Agent のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/ansible_standalone_role/" >}}スタンドアロンの Datadog ロールを使用した Ansible のセットアップ{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-retry/" >}}Agent の再試行およびバッファリングロジック {{< /nextlink >}}
    {{< nextlink href="agent/guide/how-do-i-uninstall-the-agent" >}}Agent をアンインストールするにはどうすればよいですか{{< /nextlink >}}
    {{< nextlink href="agent/guide/linux-key-rotation-2024" >}}Linux キーローテーション 2024{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Windows ガイド" >}}
    {{< nextlink href="agent/guide/datadog-agent-manager-windows" >}}Windows 対応 Datadog Agent Manager{{< /nextlink >}}
    {{< nextlink href="agent/guide/windows-agent-ddagent-user" >}}Datadog Windows Agent ユーザー{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="クラウドインフラストラクチャーガイド" >}}
    {{< nextlink href="agent/guide/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/" >}}Google Cloud SQL で dd-agent mysql チェックを設定することはできますか{{< /nextlink >}}
    {{< nextlink href="/agent/guide/heroku-ruby" >}}Datadog による Heroku 上の Ruby on Rails アプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="agent/guide/heroku-troubleshooting/" >}}Datadog-Heroku Buildpack のトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="agent/guide/private-link" >}}AWS PrivateLink を介した Datadog への安全なテレメトリの転送{{< /nextlink >}}
    {{< nextlink href="agent/guide/azure-private-link" >}}Azure Private Link を介した Datadog への接続{{< /nextlink >}}
    {{< nextlink href="agent/guide/why-should-i-install-the-agent-on-my-cloud-instances" >}}クラウドインスタンスに Datadog Agent をインストールする理由は何ですか{{< /nextlink >}}
    {{< nextlink href="agent/guide/gcp-private-service-connect" >}}GCP Private Service Connect を介した Datadog への接続{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="インテグレーションガイド" >}}
    {{< nextlink href="agent/guide/use-community-integrations" >}}コミュニティインテグレーションの使用{{< /nextlink >}}
    {{< nextlink href="agent/guide/integration-management" >}}インテグレーション管理{{< /nextlink >}}
{{< /header-list >}}

{{< whatsnext desc="Agent バージョン管理ガイド:" >}}
    {{< nextlink href="agent/guide/version_differences" >}}Agent のバージョンによる違い{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_agent_fleet_automation" >}} Datadog Agent のアップグレード {{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-v6-python-3" >}}Python バージョン管理: Datadog Agent v6 での Python 3 の使用{{< /nextlink >}}
    {{< nextlink href="agent/guide/python-3" >}}Python 2 から 3 へのカスタムチェック移行{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 6 ガイド" >}}
    {{< nextlink href="agent/guide/install-agent-6" >}}Agent 6 のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-commands" >}}Agent 6 のコマンド{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-configuration-files" >}}Agent 6 の構成ファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-6-log-files" >}}Agent 6 のログファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/upgrade_to_agent_6" >}}Agent 6 へのアップグレード{{< /nextlink >}}
{{< /header-list >}}

{{< header-list header="Agent 5 ガイド" >}}
    {{< nextlink href="agent/guide/agent-5-architecture" >}}Agent 5 のアーキテクチャ{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-commands" >}}Agent 5 のコマンド{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-configuration-files" >}}Agent 5 の構成ファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-log-files" >}}Agent 5 のログファイル{{< /nextlink >}}
    {{< nextlink href="agent/guide/install-agent-5" >}}Agent 5 のインストール{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-ports" >}}Agent 5 のポート{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-proxy" >}}Agent 5 のプロキシ構成{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-flare" >}}Agent 5 flare の送信{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-autodiscovery" >}}Agent 5 での Autodiscovery{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-kubernetes-basic-agent-usage" >}}Agent 5 における Kubernetes での基本的な Agent 使用方法{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-check-status" >}}Agent 5 における Agent チェックに関するトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-permissions-issues" >}}Agent 5 の権限に関する問題{{< /nextlink >}}
    {{< nextlink href="agent/guide/agent-5-debug-mode" >}}Agent 5 のデバッグモード{{< /nextlink >}}
    {{< nextlink href="agent/guide/dogstream" >}}Dogstream{{< /nextlink >}}
{{< /header-list >}}