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

<div class="alert alert-info">Cloud SIEM Investigator は、AWS CloudTrail ログと Google Cloud Audit ログをサポートしています。</div>

セキュリティシグナルがユーザーやリソースによる不審なアクティビティをアラートした場合、調査時によく聞かれる質問に次のようなものがあります。

- ユーザーが他のアカウントにアクセスしていないか？
- その特定の時間帯に、ユーザーは他にどのようなアクションを起こしたのか？
- ユーザーがリソースに対して行うすべてのアクションは何か？
- どのようなユーザーがこのリソースと交流しているのか？

例えば、誰かが AWS S3 バケットの構成を変更し、誰でもアクセスできるようにしたが、そのアクションは想定された役割によって行われたというセキュリティシグナルを受け取ったとします。調査するには、誰がアクションを起こしたか、そして彼らが最近行った他のアクティビティを調べます。それは侵害された資格情報を示す可能性があるからです。

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
{{< /tabs >}}

また、セキュリティシグナルから直接 Cloud SIEM Investigator に移動することができます。セキュリティシグナルパネルで、**Investigate user activity** (ここで `user` は問題のユーザー ID) をクリックすると、特定のユーザー ID にフィルターがかかった Investigator ビューが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}