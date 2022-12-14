---
aliases:
- /ja/security_platform/cloud_siem/cloud_security_investigator/
- /ja/security_platform/cloud_siem/cloud_siem_investigator/
further_reading:
- link: /cloud_siem/explorer/
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
kind: documentation
title: Investigator
---

## 概要

<div class="alert alert-warning">Cloud SIEM Investigator は現在、AWS CloudTrail のログにのみ対応しています。</div>

セキュリティシグナルがユーザーやリソースによる不審なアクティビティをアラートした場合、調査時によく聞かれる質問に次のようなものがあります。

- ユーザーが他のアカウントにアクセスしていないか？
- その特定の時間帯に、ユーザーは他にどのようなアクションを起こしたのか？
- ユーザーがリソースに対して行うすべてのアクションは何か？
- どのようなユーザーがこのリソースと交流しているのか？

例えば、誰かが AWS S3 バケットの構成を変更し、誰でもアクセスできるようにしたが、そのアクションは想定された役割によって行われたというセキュリティシグナルを受け取ったとします。調査するには、誰がアクションを起こしたか、そして彼らが最近行った他のアクティビティを調べます。それは侵害された資格情報を示す可能性があるからです。

Cloud SIEM Investigator は、影響を受けるエンティティから別のエンティティにピボットするためのグラフィカルインターフェイスを提供し、ユーザーの行動とそれが環境に与える影響を確認することができます。


## アクティビティを視覚化し、調査する

1. **Security** > **Cloud SIEM** に移動し、[**Investigator** タブ][1]をクリックします。

2. **In** フィールドのドロップダウンメニューで、エンティティタイプを選択します。

3. エンティティを選択するか、**Investigate** フィールドに特定のエンティティ名を入力すると、そのエンティティに関連するアクティビティのグラフが表示されます。**Assumed Role** エンティティの場合、`AccessKeyID` を選択するか、`AccessKeyID` を **for** フィールドに入力します。

4. ノードをクリックし、**Show list of logs** または **View in Log Explorer** を選択すると、関連するログを見ることができます。サービスノードをクリックした場合、**Investigate service** をクリックすると、そのサービスの Investigator ビューにピボットします。アクションでフィルタリングするには、**and filter by** ドロップダウンメニューを使用します。

また、セキュリティシグナルから直接 Cloud SIEM Investigator に移動することができます。セキュリティシグナルパネルで、**Investigate user activity** (ここで `user` は問題のユーザー ID) をクリックすると、特定のユーザー ID にフィルターがかかった Investigator ビューが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/csi/aws