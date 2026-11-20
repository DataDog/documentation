---
description: Amazon EKS 監査ログのログ収集を有効にして、Datadog Cloud SIEM でクラスターのアクションを監視します。
title: Amazon EKS 監査ログのログ収集
---
## 概要 {#overview}

Amazon EKS 監査ログは、クラスター管理者に EKS クラスター内のアクションに関するインサイトを提供します。Amazon EKS 監査ログのログ収集を有効にすると、[Datadog Cloud SIEM][1] をセットアップして使用し、EKS クラスター内で発生する不当なアクションや差し迫った脅威を監視することができます。

## セットアップ {#setup}

### Amazon EKS 監査ログ {#amazon-eks-audit-logs}

#### 新しいクラスター {#new-cluster}

1. Amazon EKS クラスターをお持ちでない場合は、[Amazon EKS クラスターの作成][2]のドキュメントに従ってクラスターを作成してください。
1. セットアップの際、Configure logging ページで、**Audit logs** を有効にします。

#### 既存のクラスター {#existing-cluster}

1. すでに Amazon EKS クラスターを構成している場合は、[Amazon EKS コンソール][2]でクラスターに移動します。
1. EKS クラスターをクリックします。
1. **Logging** タブをクリックします。
1. **Manage logging** ボタンをクリックします。
1. **Audit** オプションを **Enabled** に切り替え、**Save changes** ボタンをクリックします。

### Datadog AWS インテグレーション {#datadog-aws-integration}

次に、AWS インテグレーションをセットアップします。[AWS インテグレーションのセットアップ][3]のドキュメントに従います。

### Datadog Forwarder {#datadog-forwarder}

AWS インテグレーションのセットアップが完了したら、Datadog Forwarder のインストールと構成を行います。[Datadog Forwarder のインストール][4]のドキュメントに従います。

**注**: [トリガーのセットアップ][5]ステップには、Lambda ARN が必要です。Lambda ARN は、AWS コンソールの [Lambda > Functions > `Your_Function_Name`][6] に移動することで利用できます。Function ARN は、Function overview に記載されています。

## ログエクスプローラー {#log-explorer}

Amazon EKS 監査ログ、Datadog AWS インテグレーション、Datadog Forwarder のセットアップが完了すると、EKS 監査ログが [Datadog ログエクスプローラー][7] で利用可能になります。

**注**: ログがログエクスプローラーにストリーミングされるまでに数秒かかる場合があります。

ログエクスプローラーで EKS 監査ログのみを表示するには、ログエクスプローラーの検索で `source:kubernetes.audit` をクエリするか、ファセットパネルの**ソース**で `kubernetes.audit` ファセットを選択して EKS 監査ログでフィルタリングします。

## Cloud SIEM {#cloud-siem}

Datadog Cloud SIEM を使用することで、EKS クラスターに対する潜在的な構成ミスや標的型攻撃を検出することができます。

Cloud SIEM を使用して Amazon EKS 監査ログの監視を開始するには、Cloud SIEM をセットアップして、構成ミスや脅威が検出されるたびに[セキュリティシグナルエクスプローラー][10]に[セキュリティシグナル][9]を生成するカスタム[ログ検出ルール][8]を作成します。

### セットアップ {#setup-1}

Cloud SIEM のセットアップと構成を行います。アプリ内の [Cloud SIEM のセットアップと構成の手順][1]を参照してください。

Cloud SIEM がセットアップと構成が完了すると、ゼロから新しい Cloud SIEM ルールを作成するか、Log Explorer のクエリを新しいルールにエクスポートすることができます。

### セキュリティ監視ルールの確認 {#review-security-monitoring-rules}

環境内の脅威を検出している、すぐに使える [Cloud SIEM 検出ルール][11]を参照してください。これらのルールの検索、編集、クローン作成の詳細については、[検出ルールの作成と管理][12]を参照してください。

### Cloud SIEM のルールを新規に作成する {#create-a-new-cloud-siem-rule}

ルールを作成するには、アプリ内の [Rule Setup and Configuration][13] ページに移動します。セットアップを完了するには、[ログ検出ルールに関するドキュメント][14]を参照してください。

### ログエクスプローラーでクエリをルールにエクスポートする {#export-a-query-to-a-rule-in-log-explorer}

1. ログエクスプローラーで、検索バーにクエリを作成します。たとえば、`source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]` でフィルタリングします。
1. **Export** ボタンをクリックし、**Export to detection rule** を選択します。
1. この機能は、クエリをエクスポートし、それをログ検出ルールのセットアップの 2 番目のステップで定義します。検出方法を選択する。この場合は、**New Value** を選択してください。Detect new value ドロップダウンメニューで `@usr.name` 属性を選択します。これにより、ユーザーが初めて Pod でコマンドを実行したときにアラートが送信されます。最初のアラートの後、Datadog は同じユーザーに再度アラートを送信することはありません。あるいは、これらのイベントがユーザー定義のしきい値を超えたときに検出するには、検出方法として**しきい値ルール**を使用してください。
1. 残りのルール構成を完了する方法については、[ログ検出ルールのドキュメント][14]を参照してください。

[1]: /ja/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /ja/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /ja/logs/guide/forwarder/
[5]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[9]: /ja/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /ja/security/default_rules/#cat-cloud-siem
[12]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#create-a-rule