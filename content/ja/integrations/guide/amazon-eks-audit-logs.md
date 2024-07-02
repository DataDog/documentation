---
title: Amazon EKS 監査ログのログ収集
---

## 概要

Amazon EKS 監査ログは、クラスター管理者に EKS クラスター内のアクションを把握させます。Amazon EKS 監査ログのログ収集を有効にすると、[Datadog Cloud SIEM][1] をセットアップして使用し、EKS クラスター内で発生した不当なアクションや緊急の脅威を監視することができます。

## セットアップ

### Amazon EKS 監査ログ

#### 新しいクラスター

1. Amazon EKS クラスターをお持ちでない場合は、[Amazon EKS クラスターの作成][2]のドキュメントに従って作成してください。
1. セットアップの際、Configure logging ページで、**Audit logs** を有効にします。

#### 既存のクラスター

1. すでに Amazon EKS クラスターを構成している場合は、[Amazon EKSコンソール][2]でクラスターに移動します。
1. EKS クラスターをクリックします。
1. **Logging** タブをクリックします。
1. **Manage logging** ボタンをクリックします。
1. **Audit** オプションを **Enabled** にトグルし、**Save changes** ボタンをクリックします。

### Datadog AWS インテグレーション

次に、AWS とのインテグレーションを設定します。[AWS インテグレーションの設定][3]のドキュメントに従います。

### Datadog Forwarder

AWS インテグレーションのセットアップが完了したら、Datadog Forwarder のインストールと構成を行います。Datadog Forwarder のインストール][4]のドキュメントに従います。

**注**: Lambda ARN は、[セットアップトリガー][5]のステップで必要となります。Lambda ARN は、AWS コンソールで [Lambda > Functions > `Your_Function_Name`][6] に移動することで利用可能です。Function ARN は Function overview に記載されています。

## ログエクスプローラー

Amazon EKS 監査ログ、Datadog AWS インテグレーション、Datadog Forwarder のセットアップが完了すると、EKS 監査ログが [Datadog ログエクスプローラー][7]で利用可能になります。

**注**: ログがログエクスプローラーにストリーミングされるまでに数秒かかる場合があります。

ログエクスプローラーで EKS 監査ログのみを表示するには、ログエクスプローラーの検索で `source:kubernetes.aduit` をクエリするか、ファセットパネルの **Source** で `kubernetes.audit` ファセットを選択して EKS 監査ログでフィルタリングします。

## Cloud SIEM

Datadog Cloud SIEM を使用することで、EKS クラスターに対する潜在的な構成ミスや標的型攻撃を検出することができます。

Cloud SIEM で Amazon EKS 監査ログの監視を開始するには、Cloud SIEM をセットアップして、構成ミスや脅威が検出されるたびに[セキュリティシグナルエクスプローラー][10]に[セキュリティシグナル][9]を生成するカスタム[ログ検出ルール][8]を作成します。

### セットアップ

Cloud SIEM のセットアップと設定を行います。アプリ内の [Cloud SIEM のセットアップと構成方法][1]を参照してください。

Cloud SIEM がセットアップされ、構成されると、ゼロから新しい Cloud SIEM ルールを作成するか、ログエクスプローラーのクエリを新しいルールにエクスポートすることができます。

### セキュリティ監視ルールの確認

環境で脅威を検知している、すぐに使える [Cloud SIEM 検出ルール][11]をご覧ください。これらのルールの検索、編集、複製については、[検出ルールの作成と管理][12]を参照してください。

### Cloud SIEM のルールを新規に作成する

ルールを作成するには、アプリ内の [Rule Setup and Configuration][13] ページに移動してください。設定を完了するには、[ログ検出ルールのドキュメント][14]を参照してください。

### ログエクスプローラーでクエリをルールにエクスポートする

1. ログエクスプローラーの検索バーでクエリを作成します。例えば、`source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]` でフィルタリングします。
1. **Export** ボタンをクリックし、**Export to detection rule** を選択します。
1. この機能は、クエリをエクスポートして、ログ検出ルール設定の 2 番目のステップで定義します。検出方法を選択します。この例では、**New Value** を選択します。Detect new value ドロップダウンメニューで `@usr.name` 属性を選択します。これにより、ユーザーがポッドに対して exec を実行したときに初めてアラートが出されます。最初のアラートの後、Datadog は同じユーザーに対して再度アラートを出すことはありません。また、これらのイベントがユーザー定義のしきい値を超えたときに検出するには、検出方法に **threshold rule** を使用します。
1. [ログ検出ルールのドキュメント][14]に従って、残りのルール構成を完了させる方法を学びます。

[1]: /ja/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /ja/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /ja/logs/guide/forwarder/
[5]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /ja/security/cloud_siem/log_detection_rules/
[9]: /ja/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /ja/security/default_rules/#cat-cloud-siem
[12]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#choose-a-detection-method