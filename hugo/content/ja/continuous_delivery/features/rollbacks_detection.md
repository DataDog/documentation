---
description: CD Visibility がデプロイメントのロールバックを検知する仕組みを確認します。
further_reading:
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: Learn how to query and visualize deployments
title: Rollback Detection
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility はプレビュー段階です。この機能に興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

## 概要

特定のデプロイメントがロールバックしているタイミングを把握できると、次の点で役立ちます:
- サービス全体で、デプロイの安定性とロールバックの発生頻度を把握できる。
- ロールバックにつながるデプロイの問題パターンを特定できる。

ロールバックを検知するために、Datadog は同じサービスと環境に対して現在のデプロイメント バージョンを、直前までにデプロイされていたバージョンと比較します。ロールバックは、次の 2 つが両方成り立つ場合に判定されます:
- 現在のバージョンが直前のバージョンと異なること。同じバージョンを再デプロイしただけの場合はロールバックにしないためです。
- 現在のバージョンが、過去にデプロイされたことのあるバージョンと一致すること。

`@deployment.is_rollback` タグを使って、[Deployment Executions][1] でロールバックとなったデプロイメントを検索できます:

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Deployment Executions ページのロールバック インジケーター" style="width:100%;">}}

イベント詳細では、より詳しい情報も確認できます:

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="ロールバック詳細" style="width:100%;">}}

## 要件

ロールバック検知は、次の条件をすべて満たすデプロイメントで機能します:
- サービス (`@deployment.service`)
- 環境 (`@deployment.env`)
- バージョン識別子 (`@deployment.version`)

### CI ベースのプロバイダー向けのバージョン
CI ベースのプロバイダーでは、Datadog は `datadog ci` コマンドに渡す `--revision` パラメーターを使用します。このパラメーターには、デプロイメントを識別するバージョン情報 (コミット SHA、イメージ タグ、バージョン番号など) を指定してください。

### Argo CD 向けのバージョン
Argo CD のデプロイメントでは、Datadog は関連付けられたイメージのバージョンを使ってロールバックを検知します。Datadog はデプロイメントから "main" イメージを特定し、そこからバージョン タグを抽出します。

Argo CD のデプロイメントでロールバック検知を有効にするには、[Argo CD の監視ドキュメント][3] で説明しているとおり、[`datadog-ci deployment correlate-image` コマンド][2] を使ってイメージをコミットと関連付ける必要があります。

イメージが正しく関連付けられると、Datadog はイメージ メタデータからバージョン タグを取り込み、それをロールバック検知に利用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /ja/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines