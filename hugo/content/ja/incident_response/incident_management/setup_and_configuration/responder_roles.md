---
aliases:
- /ja/incident_response/incident_management/setup_and_configuration/responder_types/
- /ja/service_management/incident_management/incident_settings/responder_types/
- /ja/incident_response/incident_management/incident_settings/responder_types
further_reading:
- link: /incident_response/incident_management/investigate/describe/#response-team
  tag: ドキュメント
  text: インシデントを記述する
title: 担当者ロール
---
## 概要{#overview}

インシデントコマンダーやコミュニケーションリードなどの特定のロールを割り当てることで、より組織的で構造化された対応が可能になります。通知や責任を適切な担当者に即座に割り当てることができるため、混乱や遅延の軽減に役立ちます。

担当者ロール設定では、[インシデントの担当者に割り当てる][1]カスタムロールを作成し、それらのロールをインシデントごとに 1 人が保持するのか、複数人が保持するのかを指定できます。これらのロールは、[Role Based Access Control (RBAC)][2] システムと無関係です。

## ロール{#roles}

担当者ロールは、独自のインシデント対応プロセスで定義した責務に基づいて、担当者が自分の責任を理解するのに役立ちます。デフォルトでは、2 つのロールが存在します。

1. `Incident Commander`- 対応チームを指揮する責任者
2. `Responder`- インシデントの調査および根本原因の解決に積極的に貢献するメンバー

**注:** `Incident Commander` の担当者ロールはインシデント設定に表示されるため、説明をカスタマイズできます。`Incident Commander` は担当者ロールとして削除することはできず、その名前や `One person role` としてのステータスを変更することもできません。`Responder` ロールは、担当者に別のロールが割り当てられていない場合の汎用的なフォールバックロールであり、インシデント設定には表示されません。

## 担当者ロールを作成する{#create-a-responder-role}

1. [**[Incident Settings] (インシデント設定) > [Responder Roles] (担当者ロール)**][3] に移動します。
1. テーブル下部の [**+ Add Responder Role**] (担当者ロールを追加) をクリックします。
2. 新しい担当者ロールに名前を付けます。
3. その担当者ロールが `One person role` か `Multi person role` かを選択します。`One person role` はインシデントごとに 1 人のみが保持できますが、`Multi person role` はインシデントごとに無制限の人数が保持できます。
4. 担当者ロールの説明を入力します。この説明は、チームメンバーに割り当てるロールを選択するための UI に表示されます。
5. [**Save**] (保存) をクリックします。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/incident_management/investigate/response_team
[2]: /ja/account_management/rbac/?tab=datadogapplication#pagetitle
[3]: https://app.datadoghq.com/incidents/settings#Responder-Types