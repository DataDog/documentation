---
description: Inline と Preconfigured の Deployment Gates を比較し、選択した構成ソースのセットアップ手順に従ってください。
further_reading:
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: デプロイメントゲート API リファレンス
title: デプロイゲートをセットアップする
---
Deployment Gates の定義場所を選択し、セットアップ手順に従ってください。Inline と Preconfigured のゲートの違いについては、[ゲート構成の保存場所][1]を参照してください。

{{< whatsnext desc="Deployment Gates をセットアップする:" >}}
    {{< nextlink href="/deployment_gates/setup/inline" >}}<u>Inline</u>: Datadog でのセットアップなしで、デプロイ構成内にゲートとルールを定義します。{{< /nextlink >}}
    {{< nextlink href="/deployment_gates/setup/preconfigured" >}}<u>Preconfigured</u>: UI、API、または Terraform を使用して、Datadog 内にゲートとルールを作成します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/deployment_gates/#where-gate-configurations-are-stored