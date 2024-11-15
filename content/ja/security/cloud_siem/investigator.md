---
aliases:
- /ja/security_platform/cloud_siem/cloud_security_investigator/
- /ja/security_platform/cloud_siem/cloud_siem_investigator/
- /ja/security_platform/cloud_siem/investigator/
- /ja/security/cloud_siem/cloud_security_investigator/
- /ja/security/cloud_siem/cloud_siem_investigator/
further_reading:
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: ドキュメント
  text: Cloud SIEM のための AWS の構成
- link: /cloud_siem/explorer/
  tag: Documentation
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: https://www.datadoghq.com/blog/visualize-cloud-activity-datadog-cloud-siem-investigator/
  tag: ブログ
  text: Datadog Cloud SIEM Investigator でクラウド環境のアクティビティを視覚化する
title: Investigator
---

## 概要

セキュリティシグナルがユーザーやリソースによる不審なアクティビティをアラートした場合、調査時によく聞かれる質問に次のようなものがあります。

- ユーザーが他のアカウントにアクセスしていないか？
- その特定の時間帯に、ユーザーは他にどのようなアクションを起こしたのか？
- ユーザーがリソースに対して行うすべてのアクションは何か？
- どのようなユーザーがこのリソースと交流しているのか？

For example, suppose you receive a security signal that someone changed the configuration of an Amazon S3 bucket so that it is accessible by everyone, but the action was taken by an assumed role. To investigate, look into who took the action and what other activities they did recently, as that could indicate compromised credentials.

Cloud SIEM Investigator は、影響を受けるエンティティから別のエンティティにピボットするためのグラフィカルインターフェイスを提供し、ユーザーの行動とそれが環境に与える影響を確認することができます。


## アクティビティを視覚化し、調査する

{{< tabs >}}
{{% tab "AWS" %}}

1. **Security** > **Cloud SIEM** に移動し、[**Investigator**][1] タブをクリックします。

2. **In** フィールドのドロップダウンメニューで、エンティティタイプを選択します。

3. エンティティを選択するか、**Investigate** フィールドに特定のエンティティ名を入力すると、そのエンティティに関連するアクティビティの図が表示されます。

4. ノードをクリックし、**View related logs** または **View in Log Explorer** を選択すると、関連するログを見ることができます。アクションでフィルターをかけるには、**and filter by** ドロップダウンメニューを使用します。

[1]: https://app.datadoghq.com/security/investigator/aws

{{% /tab %}}

{{% tab "GCP" %}}

1. **Security** > **Cloud SIEM** に移動し、**Investigator** タブ、そして [**GCP**][1] タブをクリックします。

2. **In** フィールドのドロップダウンメニューで、エンティティタイプを選択します。

3. エンティティを選択するか、**Investigate** フィールドに特定のエンティティ名を入力すると、そのエンティティに関連するアクティビティの図が表示されます。

4. ノードをクリックし、**View related logs** または **View in Log Explorer** を選択すると、関連するログを見ることができます。アクションでフィルターをかけるには、**and filter by** ドロップダウンメニューを使用します。

[1]: https://app.datadoghq.com/security/investigator/gcp
{{% /tab %}}

{{% tab "Azure" %}}

1. **Security** > **Cloud SIEM** に移動し、**Investigator** タブ、そして [**Azure**][1] タブをクリックします。

2. **In** フィールドのドロップダウンメニューで、エンティティタイプを選択します。

3. エンティティを選択するか、**Investigate** フィールドに特定のエンティティ名を入力すると、そのエンティティに関連するアクティビティの図が表示されます。

4. ノードをクリックし、**View related logs** または **View in Log Explorer** を選択すると、関連するログを見ることができます。アクションでフィルターをかけるには、**and filter by** ドロップダウンメニューを使用します。

[1]: https://app.datadoghq.com/security/investigator/azure
{{% /tab %}}

{{< /tabs >}}

また、セキュリティシグナルから直接 Cloud SIEM Investigator に移動することができます。セキュリティシグナルパネルで、**Investigate user activity** (ここで `user` は問題のユーザー ID) をクリックすると、特定のユーザー ID にフィルターがかかった Investigator ビューが表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}