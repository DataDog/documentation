---
aliases:
- /ja/security/cspm/custom_rules
- /ja/security/misconfigurations/custom_rules
cascade:
  algolia:
    rank: 30
    subcategory: Cloud Security Posture Management
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: Guide
  text: Start writing your own Rego rules
- link: security/default_rules
  tag: Documentation
  text: Explore default CSM Misconfigurations cloud configuration compliance rules
- link: security/misconfigurations/frameworks_and_benchmarks
  tag: Documentation
  text: Learn about frameworks and industry benchmarks
is_beta: true
title: Create Custom Rules
---

## 概要

To extend the rules being applied to your environment to evaluate your security posture, you can clone compliance rules and edit the copies, and you can create your own rules from scratch.
To view the list of the available resource types for your custom rules, see [Cloud Resources Schema][8]. 

## ルールの複製

ルールを複製するには

1. Find the rule you want to copy by doing one of the following:
   - Navigate to the [**Misconfigurations Rules**][1] page. Select a rule you want to copy to open its details page.
   - Navigate to the [**Misconfigurations Explorer**][2]. Select a misconfiguration to open its details, then select **Edit Rule**.
2. 新しいルールのために必要な変更を行います。
3. 詳細ページの一番下までスクロールして、**Clone Rule** をクリックします。

## ルールの作成

ルールを一から作成するには

1. Navigate to the [**Misconfigurations Rules**][1] page.
2. 右上の **New Rule** をクリックします。
3. ルールの種類として、**Cloud Configuration** を選択します。
4. ルールを記述するクラウドリソースタイプを指定します。
5. Policy as Code 言語である [Rego][3] を使用して、ゼロから、または Datadog のテンプレートを使用して、ルールロジックを記述します。詳しくは、[Rego によるカスタムルールの作成][4]を参照してください。リソースを "pass"、"fail"、"skip" としてマークすることができることに注意してください。マークを付けなかった場合、リソースは "skip" として解釈されます。

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="カスタムルールの手順" width="100%">}}

6. 特定のリソースを誤構成に含める、または誤構成から除外するクエリを指定することで、無害なアクティビティを除外することができます。
7. リソースを選択し、**Test Rule** をクリックすることで、ルールのロジックを検証することができます。どのリソースが合格し、失敗したかを、対応するリソースタグとともに確認できます。
8. ルールの重大度 (`Critical`、`High`、`Medium`、`Low`、または `Info`) を指定します。
9. ファセットを選択し (リソースタイプごと、アカウント ID ごとなど)、シグナルを送る[通知先を指定][5]します。
10. **Say what's happening** では、通知のための説明を書き、通知オプションを使用して有用なものにします。詳しくは、[通知][6]をご覧ください。
11. 結果の誤構成に適用するタグを指定します。詳しくは、[誤構成のタグ付け](#tagging-misconfigurations)を参照してください。
12. **Save Rule** をクリックします。

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="カスタムルールの手順" width="100%">}}

## 誤構成のタグ付け

CSM Misconfigurations コンプライアンスルールを作成、複製、または修正するときに、誤構成に適用するタグを指定して、誤構成をタグでグループ化、フィルター、および検索できるようにすることができます。ルールを複製する場合、一部のタグは新しいルールに引き継がれ、他のタグは引き継がれません (以下の表を参照)。

ほぼすべての Key-Value をタグとして割り当てることができます。次の表は、一般的なセキュリティシナリオで有用なタグを示したものです。

| キー              | 有効な値                                                                                                             | 説明                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`、`false`                                                                                                          | 組織の総合的なポスチャスコアを計算するときに、ルールを含めるかどうかを示します。複製されたルールに自動的に追加されます。                    |
| `security`       | `compliance`                                                                                                             | [セキュリティシグナルページ][7]での誤構成を分類しています。削除はできません。                                                                   |
| `requirement`    | 文字列                                                                                                                   | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する要件を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。 |
| `cloud_provider` | `aws`、`gcp`、`azure`                                                                                                    | 削除できません。リソースの種類によって自動的に設定されます。                                                                                      |
| `control`        | 文字列                                                                                                                   | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する制御を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。     |
| `source`         | String from a defined set given by cloud providers as listed in the [Source facet in the Misconfigurations Explorer][2]. | 削除できません。複製されたルールに自動的に追加されます。クラウドプロバイダーごとにルールをグループ化することができます。                                                |
| `framework`      | 文字列                                                                                                                   | カスタムルールには許可されません。ルールが属するコンプライアンスフレームワークを示します。複製されたルールには自動的に追加されません。                       |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /ja/security/cloud_security_management/guide/writing_rego_rules/
[5]: /ja/security/cloud_security_management/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[6]: /ja/security/notifications/
[7]: https://app.datadoghq.com/security/
[8]: /ja/infrastructure/resource_catalog/schema/