---
description: インラインと事前設定された Deployment Gates を比較し、選択した構成ソースのセットアップ手順に従ってください。
further_reading:
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: デプロイメントゲート API リファレンス
title: デプロイゲートをセットアップする
---
Deployment Gates の定義場所を選択し、セットアップ手順に従ってください。2つの構成ソースの比較については、[構成ソース][1]を参照してください。

{{< whatsnext desc="Deployment Gates をセットアップする:" >}}
    {{< nextlink href="/deployment_gates/setup/inline" >}}<u>Inline</u>: Datadog でセットアップせずに、デプロイ構成内でゲートとルールを定義します。{{< /nextlink >}}
    {{< nextlink href="/deployment_gates/setup/preconfigured" >}}<u>Preconfigured</u>: UI、API、または Terraform を使用して、Datadog でゲートとルールを作成します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/deployment_gates/#configuration-sources