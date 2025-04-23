---
title: インフラストラクチャーモニタリングなしでの CSM セットアップ
---

Agent を使用する場合・しない場合にかかわらず Cloud Security Management (CSM) をセットアップできるように加えて、インフラストラクチャーモニタリングを使用しない形で CSM をセットアップすることも可能です。

## AWS アカウントでの CSM セットアップ

1. Datadog の [AWS Integration 構成ページ][2]に移動します。 
1. **Configuration** タブで、CSM を有効にしたいアカウントを選択します。 

   必要なアカウントが表示されない場合は、**Add AWS Account(s)** をクリックして画面の指示に従い、アカウントを追加してください。 
1. 選択したアカウントのインフラストラクチャーモニタリングをオフにするには、アカウント番号の下にある **Metric Collection** タブに移動し、**disable metric collection** のリンクをクリックします。続けて **Disable Metric Collection** をクリックし、確認します。 
1. **Resource Collection** タブで、**Cloud Security Management** の横にある **Enable** をクリックします。Cloud Security Management Setup ページにリダイレクトされ、選択したアカウント向けのセットアップダイアログが自動的に開きます。 
1. セットアップダイアログで、**Enable Resource Scanning** トグルをオンに切り替えます。 
1. **Done** をクリックしてセットアップを完了します。

**Note**: CSM の設定において、[リソース評価フィルター][1]を設定することで、セキュリティが必要なホスト数を制限できます。

## Azure サブスクリプションでの CSM セットアップ

1. Datadog の [Azure Integration 構成ページ][3]に移動します。 
1. CSM を有効にしたいクライアント ID またはサブスクリプションを選択します。 

   必要なクライアント ID が表示されない場合は、**Add New App Registration** をクリックして画面の指示に従い、クライアント ID を追加してください。 
1. 選択したアカウントのインフラストラクチャーモニタリングをオフにするには、クライアント ID の下にある **Metric Collection** タブで **Enable Metric Collection** のトグルをオフに切り替えます。 
1. **Resource Collection** タブで、**Cloud Security Management** の横にある **Enable** をクリックします。Cloud Security Management Setup ページにリダイレクトされ、Cloud Integrations セクション内の選択した Azure サブスクリプションまで自動でスクロールします。 
1. **Resource Scanning** トグルをオンに切り替えます。 
1. **Done** をクリックしてセットアップを完了します。

**注**: CSM の設定において、[リソース評価フィルター][1]を設定することで、セキュリティが必要なホスト数を制限できます。

## Google Cloud Platform アカウントでの CSM セットアップ

1. Datadog の [Google Cloud Platform 構成ページ][4]に移動します。 
1. CSM を有効にしたいサービスアカウントを選択します。 

   必要なアカウントが表示されない場合は、**Add GCP Account** をクリックして画面の指示に従い、アカウントを追加してください。 
1. 選択したアカウントのインフラストラクチャーモニタリングをオフにするには、アカウント名の下にある **Metric Collection** タブに移動し、Metric Collection テーブルの上にある **Disable All** をクリックします。 
1. **Resource Collection** タブで、**Cloud Security Management** の横にある **Enable** をクリックします。Cloud Security Management Setup ページにリダイレクトされ、Cloud Integrations セクション内の選択した Google Cloud Platform プロジェクトまで自動でスクロールします。 
1. **Resource Scanning** トグルをオンに切り替えます。 
1. **Done** をクリックしてセットアップを完了します。

**注**: CSM の設定において、[リソース評価フィルター][1]を設定することで、セキュリティが必要なホスト数を制限できます。

[1]: /ja/security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://app.datadoghq.com/integrations/google-cloud-platform