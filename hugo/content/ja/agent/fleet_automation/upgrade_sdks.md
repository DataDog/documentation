---
description: APM、Profiler、Dynamic Instrumentation を支える SDK をリモートでアップグレードします。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
site_support_id: fleet-automation-standard-features
title: SDK のアップグレード
---
{{< callout url="https://www.datadoghq.com/product-preview/remote-upgrade-of-sdk-versions/" btn_hidden="false" header="プレビューに参加しましょう。" >}}
APM、Profiler、Dynamic Instrumentation などを支える SDK をリモートでアップグレードします。アクセスをリクエストしてプレビューに参加します。
{{< /callout >}}

Fleet Automation は、APM、Continuous Profiler、Dynamic Instrumentation などを支える SDK のリモートアップグレードを一元管理することができます。サービスの SDK バージョンを最新の状態に保つことで、最新機能、パフォーマンス向上、バグ修正、セキュリティアップデートのメリットを享受することができます。

<div class="alert alert-info">
SDK アップグレードのスケジュール設定はサポートされていません。
</div>

## 前提条件 {#prerequisites}

- サービスは [Single Step Instrumentation (SSI)][1] でインスツルメントされている必要があります。
- サービスは Linux または Windows VM 上で実行されている必要があります。コンテナ環境または Kubernetes 環境での SDK のリモートアップグレードはサポートされていません。

## SDK バージョンのアップグレード {#upgrade-sdk-versions}

1. Fleet Automation で [Upgrades][2] タブを開き、[{{< ui >}}Upgrade Now{{< /ui >}}] をクリックします。

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="Upgrade Now ボタンが表示されている Upgrades タブ。" style="width:100%;" >}}

1. {{< ui >}}SDK language{{< /ui >}} と {{< ui >}}version{{< /ui >}} を選択してます。一度に更新できる言語 SDK は 1 つのみです。

   {{< img src="agent/fleet_automation/sdk-upgrade-language.png" alt="SDK の言語とバージョンを選択するドロップダウン。" style="width:100%;" >}}

1. アップグレードするホストを選択します。ホスト情報またはタグでフィルタリングして、特定のグループを絞り込みます。

   {{< img src="agent/fleet_automation/sdk-upgrade-hosts.png" alt="アップグレードするサービスのリストを絞り込むためのフィルタリングオプションを備えたサービス選択画面。" style="width:100%;" >}}

1. デプロイメント計画を確認し、[{{< ui >}}Upgrade Hosts{{< /ui >}}] をクリックしてアップグレードを開始します。

   {{< img src="agent/fleet_automation/sdk-upgrade-plan.png" alt="SDK アップグレード用にステージングされたサービスリストを表示するデプロイメント計画ビュー。" style="width:100%;" >}}

1. サービスを再起動して、アップグレードされた SDK の使用を開始します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: https://app.datadoghq.com/fleet/agent-upgrades