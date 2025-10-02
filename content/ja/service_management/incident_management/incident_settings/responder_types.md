---
further_reading:
- link: /service_management/incident_management/describe/#response-team
  tag: ドキュメント
  text: インシデントを記述する
title: Responder Types
---

## 概要

Incident Commander や Communications Lead などの特定のロールを割り当てることで、より整理された構造的なレスポンスが可能になります。通知や責任を直ちに適切な担当者に振り向けられるため、混乱や遅延を減らすことができます。

Responder Types 設定では、インシデント対応者に[カスタムロールを割り当てる][1]ことができ、インシデントごとにそのロールを一人が担当するか複数人が担当するかを指定できます。これらのロールは [Role Based Access Control (RBAC)][2] システムとは無関係です。

## ロール

Responder Types により、独自のインシデント対応プロセスで定義した責務に基づいて、対応者は自分の役割を理解できます。デフォルトでは、2 つのロールが存在します。

1. `Incident Commander` - 対応チームのリーダーを務める責任者
2. `Responder` - インシデントの調査やその根本的な問題の解決に積極的に貢献している人

**注:** `Incident Commander` Responder Type は Incident Settings に表示され、説明をカスタマイズできます。`Incident Commander` は Responder Type として削除できず、その名前や `One person role` としてのステータスも変更できません。`Responder` ロールは、他のロールが割り当てられていない場合の汎用フォールバックロールであり、Incident Settings には表示されません。

## Responder Type の作成

1. [**Incident Settings > Responder Types**][3] に移動します。
1. テーブル下部の **+ Add Responder Type** をクリックします。
2. 新しい対応者タイプに名前を付けます。
3. 対応者タイプが `One person role` か `Multi person role` かを選択します。`One person role` はインシデントごとに 1 人が持つことができ、`Multi person role` はインシデントごとに無制限に持つことができます。
4. 対応者タイプに説明をつけます。この説明は、チームメイトに割り当てるロールを選択するための UI に表示されます。
5. **Save** をクリックします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/incident_management/incident_details/#response-team-section
[2]: /ja/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types