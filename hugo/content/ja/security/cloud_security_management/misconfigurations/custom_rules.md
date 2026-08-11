---
aliases:
- /ja/security/cspm/custom_rules
- /ja/security/misconfigurations/custom_rules
cascade:
  algolia:
    rank: 30
    subcategory: クラウドセキュリティポスチャ管理
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: ガイド
  text: 独自の Rego ルールを作成する
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの Cloud Security Misconfigurations クラウド構成コンプライアンス ルールを確認する
- link: security/misconfigurations/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークの詳細
is_beta: true
title: カスタムルールを作成する
---

## 概要

セキュリティ体制を評価するために環境に適用されているルールを拡張するには、コンプライアンスルールをクローンしてコピーを編集したり、最初から独自のルールを作成することができます。
カスタムルールで使用可能なリソースタイプの一覧を表示するには、[Cloud Resources Schema][8] を参照してください。

## ルールの複製

ルールを複製するには

1. コピーしたいルールを探すには、次のいずれかの方法を行います。
   - [**Misconfigurations Rules**][1] ページに移動します。コピーしたいルールを選択し、その詳細ページを開きます。
   - [**Misconfigurations explorer**][2] に移動します。誤構成を選択して詳細を開き、 **Edit Rule** を選択します。
2. 新しいルールのために必要な変更を行います。
3. 詳細ページの一番下までスクロールして、**Clone Rule** をクリックします。

## ルールの作成

ルールを一から作成するには

1. [**Misconfigurations Rules**][1] ページに移動します。
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

Cloud Security Misconfigurations のコンプライアンス ルールを作成・複製・変更する際は、誤構成に適用するタグを指定できます。タグで誤構成をグループ化、フィルタリング、検索できます。ルールを複製すると、一部のタグは新しいルールに引き継がれますが、引き継がれないものもあります (下表を参照)。

ほぼすべての Key-Value をタグとして割り当てることができます。次の表は、一般的なセキュリティシナリオで有用なタグを示したものです。

| キー              | 有効な値                                                                                                             | 説明                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`、`false`                                                                                                          | 組織の総合的なポスチャスコアを計算するときに、ルールを含めるかどうかを示します。複製されたルールに自動的に追加されます。                    |
| `security`       | `compliance`                                                                                                             | [セキュリティシグナルページ][7]での誤構成を分類しています。削除はできません。                                                                   |
| `requirement`    | 文字列                                                                                                                   | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する要件を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。 |
| `cloud_provider` | `aws`、`gcp`、`azure`                                                                                                    | 削除できません。リソースの種類によって自動的に設定されます。                                                                                      |
| `control`        | 文字列                                                                                                                   | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する制御を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。     |
| `source`         | [Misconfigurations Explorer の Source ファセット][2]に記載されている、クラウドプロバイダーから提供された定義済みのセットからの文字列。 | 削除できません。複製されたルールに自動的に追加されます。クラウドプロバイダーごとにルールをグループ化することができます。                                                |
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