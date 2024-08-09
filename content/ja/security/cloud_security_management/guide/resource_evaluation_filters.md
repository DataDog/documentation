---
further_reading:
- link: /security/cloud_security_management/guide
  tag: ドキュメント
  text: Cloud Security Management ガイド
- link: /security/cloud_security_management/setup
  tag: ドキュメント
  text: Cloud Security Management の設定
title: フィルターを使用して評価からリソースを除外する
---

リソースタグを使用して、Cloud Security Management (CSM) による評価にリソースを含めたり除外したりするフィルターを作成できます。フィルターはカンマで区切られた `key:value` のペアのリストとして指定する必要があります。

**注**:

- リソース評価フィルターは、クラウドインテグレーションによってスキャンされるホストでのみ使用できます。
- タグはリソースに直接適用する必要があります。フィルターは、Datadog で追加されたユーザータグを考慮しません。唯一の例外は、 AWS と Google Cloud Platform のインテグレーションタイルに追加されたタグです。

| 形式                       | 値        |
|------------------------------|--------------|
| 許可リスト                    | `key:value`  |
| ブロックリスト                    | `!key:value` |
| 1 文字のワイルドカード    | `?`          |
| 複数文字のワイルドカード | `*`          |

許可リストでは、CSM がリソースを評価するためにリソースに適用する必要があるタグを指定できます。許可リストタグは OR ステートメントとして評価されます。つまり、リソースを評価するには、許可リストタグが少なくとも 1 つ存在する必要があります。一方、ブロックリストタグは AND ステートメントとして評価され、許可リストタグよりも優先されます。

**例**:

- `!env:staging` は `env:staging` タグを持つリソースを除外します。
- `datadog:monitored, env:prod*` は、これらのタグを少なくとも 1 つ持つリソースのメトリクスを収集します。
- `!env:staging, !testing` は、`env:staging` タグと `testing` タグの両方を持つリソースを除外します。
- `datadog:monitored !region:us-east1` は、リソースに `region:us-east1` タグが適用されていない限り、`datadog:monitored` タグを持つリソースのメトリクスを収集します。

## 評価からリソースを除外

{{< tabs >}}
{{% tab "AWS" %}}

1. [**Cloud Security Management Setup** ページ][1]で、**Cloud accounts** をクリックします。
2. **AWS** セクションを展開します。
3. **Resource Evaluation Filters (Optional)** の下で、フィルターを追加したいアカウントの **Plus** (+) アイコンをクリックします。
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. [**Cloud Security Management Setup** ページ][1]で、**Cloud accounts** をクリックします。
2. **Azure** セクションを展開します。
3. サブスクリプションを展開します。
3. **Resource Evaluation Filters (Optional)** の下で、**Plus** (+) アイコンをクリックします。
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. [**Cloud Security Management Setup** ページ][1]で、**Cloud accounts** をクリックします。
2. **GCP** セクションを展開します。
3. プロジェクトを展開します。
3. **Resource Evaluation Filters (Optional)** の下で、**Plus** (+) アイコンをクリックします。
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}