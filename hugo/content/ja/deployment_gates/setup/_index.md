---
description: Just-In-Time (JIT) と事前設定されたデプロイゲートを比較し、選択したモードのセットアップ手順に従ってください。
further_reading:
- link: /deployment_gates/setup/jit
  tag: ドキュメント
  text: Just-In-Time (JIT) デプロイメントゲートをセットアップする
- link: /deployment_gates/setup/preconfigured
  tag: ドキュメント
  text: 事前構成されたデプロイメントゲートをセットアップする
- link: /deployment_gates/explore
  tag: ドキュメント
  text: デプロイメントゲートエクスプローラーについて
- link: /api/latest/deployment-gates
  tag: API リファレンス
  text: デプロイメントゲート API リファレンス
title: デプロイゲートをセットアップする
---
デプロイゲートには主に 2 つのコンポーネントがあります。

- **Gate** は、サービスと環境 (およびオプションの識別子) に対して定義され、1 つ以上のルールを評価してデプロイメントを続行するかどうかを判断します。
- **Rule** は、ゲートの一部として実行される評価の一種です。たとえば、一連のモニターのステータスを確認したり、デプロイされたバージョンに対して APM の障害デプロイ検出分析を実行したりします。

ゲートの評価は非同期で行われます。API は評価 ID を即座に返しますが、実際の評価結果 (`pass` または `fail`) は、ルールの実行に伴い時間をかけて確定します。

## デプロイゲートの評価モード{#deployment-gate-evaluation-modes}
デプロイゲートは、Just-In-Time (JIT) と事前設定の 2 つの評価モードをサポートしています。


| | **[JIT][1]** (デフォルト) | **[事前設定][2]** |
|---|---|---|
| **ルールの配置場所** | デプロイ構成内または CI ステップ内にインラインで配置| Datadog 内に永続化 (UI、API、または Terraform) |
| **Datadog でのセットアップ** | なし | 事前にゲートとルールを作成 |
| **最適な用途** | Rules-as-code、デプロイごとの柔軟な構成、ゲート構成を自チームで管理する場合 | サービス間でのルールの共有、一元管理、CI 以外でのルール編集|
| **評価方法** | 評価リクエストでルールを送信する| サービス、環境、およびオプションの識別子でゲートを参照する|

必要に応じて、ゲートごとに異なるモードを使用できます。

どこから始めればよいかわからない場合は、JIT を使用します。Datadog でのセットアップは不要で、デプロイ構成内で直接ルールを反復的に調整できます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/deployment_gates/setup/jit
[2]: /ja/deployment_gates/setup/preconfigured