---
title: CSPM の概要
kind: documentation
further_reading:
  - link: security_platform/default_rules
    tag: ドキュメント
    text: デフォルトのクラウドコンフィギュレーションルールについて
  - link: security_platform/cspm/findings
    tag: ドキュメント
    text: CSPM 検出結果を検索および調査
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: ドキュメント
    text: フレームワークおよび業界のベンチマークについて
---
{{< site-region region="us" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理 は、現在<a href="https://app.datadoghq.com/security/configuration">公開ベータ版</a>です。
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在 US1-FED、US3、EU では利用できません。
</div>
{{< /site-region >}}

## 概要

[はじめにのページ][1]に移動し、スキャンするための環境を構成します。

{{< img src="security_platform/cspm/getting_started/posture-management-setup.png" alt="CSPMのセットアップページ" style="width:100%;">}}

## セットアップ

### 製品のコンフィギュレーション

`Posture Management` を選択します。製品のチェックボックスをオンにすると、一度に複数の製品を構成できます。

### クラウド環境を評価

クラウド環境の誤構成を検出します。このセクションでは、クラウドプロバイダーからリソースコンフィギュレーションのデータを収集する方法を説明します。リソースコンフィギュレーションの収集により、Datadog は Datadog のすぐに使える[クラウドコンフィギュレーションルール][2]を使いユーザーの環境を評価できます。

### ホストとコンテナを評価

ホストやコンテナのセキュリティ態勢を評価します。このセクションでは、ホストやコンテナをスキャンするための、Datadog Agent の構成方法を説明します。Agent により、Datadog のすぐに使える[インフラストラクチャーコンフィギュレーションルール][3]を使い、Datadog はホストやコンテナの状態を継続的に評価できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration?config_k9_configuration=true&detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=compliance_monitoring
[2]: /ja/security_platform/default_rules#cat-cloud-configuration
[3]: /ja/security_platform/default_rules#cat-infrastructure-configuration