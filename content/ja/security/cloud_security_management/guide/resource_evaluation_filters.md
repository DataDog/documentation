---
further_reading:
- link: /security/cloud_security_management/guide
  tag: Documentation
  text: Cloud Security Management Guides
- link: /security/cloud_security_management/setup
  tag: Documentation
  text: Setting Up Cloud Security Management
title: Use Filters to Exclude Resources from Evaluation
---

You can use resource tags to create filters that include or exclude resources from being evaluated by Cloud Security Management (CSM). The filters must be specified as a comma-separated list of `key:value` pairs.

**注**:

- Resource evaluation filters can only be used with hosts that are scanned by cloud integrations.
- Tags must be applied directly to the resource. The filters do not take into account user tags added in Datadog. The only exception is for tags added on the integration tiles for AWS and Google Cloud Platform.

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

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. **AWS** セクションを展開します。
3. Under **Resource Evaluation Filters (Optional)**, click the **Plus** (+) icon for the account you want to add the filter to.
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. **Azure** セクションを展開します。
3. Expand a subscription.
3. **Resource Evaluation Filters (Optional)** の下で、**Plus** (+) アイコンをクリックします。
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. On the [**Cloud Security Management Setup** page][1], click **Cloud accounts**.
2. **GCP** セクションを展開します。
3. Expand a project.
3. **Resource Evaluation Filters (Optional)** の下で、**Plus** (+) アイコンをクリックします。
4. 許可リストまたはブロックリストにしたいタグの `key:value` のペアをカンマで区切ったリストを入力します。
5. **Save** をクリックします。

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}