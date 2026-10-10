---
description: CD Visibility がどのようにデプロイのロールバックを検出するかを学びます。
further_reading:
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer
  tag: ドキュメント
  text: デプロイのクエリと可視化の方法を学びます。
title: ロールバック検出
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しましょう。" >}}
CD Visibility はプレビュー版です。この機能に関心がある場合は、フォームに記入してアクセスをリクエストしてください。
{{< /callout >}}

## 概要 {#overview}

特定のデプロイがいつロールバックを実行しているかを知ることは、以下に役立ちます。
- サービス全体のデプロイの安定性とロールバックの頻度を把握します。
- ロールバックにつながるデプロイの問題のパターンを特定します。

ロールバックを検出するために、Datadog は現在のデプロイバージョンを、同じサービスおよび環境に対して以前にデプロイされたバージョンと比較します。ロールバックは、以下の両方が発生したときに識別されます。
- 現在のバージョンが以前のバージョンと異なっています。これにより、同じバージョンを再デプロイしてもロールバックとはみなされなくなります。
- 現在のバージョンが、以前にデプロイされたバージョンと一致しています。

[Deployment Executions][1] で `@deployment.is_rollback` タグを使用して、ロールバックされたデプロイを検索できます。

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Deployment Executions ページのロールバックインジケーター" style="width:100%;">}}

イベント詳細でより詳細な情報を確認することもできます。

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="ロールバックの詳細" style="width:100%;">}}

## 要件 {#requirements}

ロールバック検出は、以下のすべてを備えたデプロイに対して機能します。
- サービス (`@deployment.service`)
- 環境 (`@deployment.env`)
- バージョン識別子 (`@deployment.version`)

### CI ベースのプロバイダーのバージョン {#version-for-ci-based-providers}
CIベースのプロバイダーの場合、Datadogは`--revision`コマンドに渡す`datadog ci`パラメーターを使用します。このパラメーターには、デプロイメントのバージョン識別子（コミットSHA、イメージタグ、バージョン番号など）を含める必要があります。

### Argo CDのバージョン{#version-for-argo-cd}
Argo CDデプロイメントの場合、Datadogは関連付けられたイメージからバージョンを使用してロールバックを検出します。Datadogはデプロイメントから「メイン」イメージを特定し、そこからバージョンタグを抽出します。

Argo CDデプロイメントのロールバック検出を有効にするには、[Argo CDモニタリングドキュメント][3]で説明されているように、[`datadog-ci deployment correlate-image`コマンド][2]を使用してイメージとコミットを関連付ける必要があります。イメージの関連付けには、Argo CD v3.1.0以降が必要です。

イメージが適切に関連付けられると、Datadogはイメージメタデータからバージョンタグを取り込み、それをロールバック検出に使用します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
[2]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[3]: /ja/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines