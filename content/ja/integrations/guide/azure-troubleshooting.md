---
aliases:
- /ja/integrations/faq/azure-troubleshooting
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Azure integration
title: Azure Troubleshooting
---

## テナント名の検索

1. [portal.azure.com][1] に移動します。
2. 左側のサイドバーで、**Azure Active Directory** を選択します。
3. **Basic information** の下にある、**Name** の値を探します。

## ログインできない

Azure インテグレーションをインストールしようとしてログインエラーが発生した場合は、[Datadog サポート][3]にお問い合わせください。可能であれば、スクリーンショットを添付してください。

## メトリクスがない

監視するサブスクリプションの Azure アプリケーションに読み取り権限を与えるなど、インストールプロセスが完了したことを確認します。

ARM でデプロイされた仮想マシンの場合は、診断をオンにし、収集したい仮想マシンのメトリクスを選択する必要もあります。手順については、以下の**診断の有効化**を参照してください。

その他の欠落したメトリクスについては、メトリクスに関する以下の情報を添えて、[Datadog サポート][3]にお問い合わせください。
- ディメンション
- リソースグループ
- リソース名
- サブスクリプション ID またはサブスクリプション名 

Azure Monitor からメトリクスのグラフが表示されるスクリーンショットを添付してください。**重要**: スクリーンショットでは、1 分間のデータポイントをグラフ化してください。


### 診断の有効化

診断をオンにすると、ARM にデプロイされた VM は、CPU、ネットワークなどのメトリクスを含むログ情報を収集することができます。以下の手順に従ってください。

1. [Azure ポータル][1]に移動して、VM を探します。
2. **Monitoring** セクションの下にある **Diagnostics settings** をクリックします。
3. ストレージアカウントを選び、**Enable guest-level monitoring** をクリックします。
4. デフォルトでは、基本的なメトリクスとログが有効になっています。お好みで調整してください。
5. **Save** をクリックすると、変更内容が保存されます。

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="azure diagnostics settings overview が表示され、No storage account が Pick storage account の下にハイライトされ、enable guest level monitoring が有効になっている" style="width:70%">}}

## 自動ログ収集

### 命名の競合

デフォルトパラメーターの 1 つと同じリソース名を持つ Azure リソースがあると、名前の競合が発生する可能性があります。Azure では、リソースが個々のサブスクリプション内でリソース名を共有することは許可されていません。Datadog では、環境内にまだ存在しない一意の名前でデフォルトパラメーターの名前を変更することをお勧めします。

たとえば、`datadog-eventhub` という名前の Eventhub を既に所有している場合は、-EventhubName フラグを使用して Eventhub リソースのデフォルト名を変更します。

{{< code-block lang="powershell" filename="例" >}}

./resource_deploy.ps1 -ApiKey <your_api_key> -SubscriptionId <your_subscription_id> -EventhubName <new-name>

{{< /code-block >}}

**注:** [オプションのパラメーター][4]セクションに移動して、構成可能なパラメーターのリストを見つけます。

**注:** この失敗が原因でスクリプトを再実行する場合は、リソースグループ全体を削除して、新しい実行を作成することもお勧めします。

### 未登録のリソースプロバイダー

エラー **The subscription is not registered to use namespace 'Microsoft.EventHub'** が原因でスクリプトの実行が失敗した場合:

Azure には、各サービスのリソースプロバイダーがあります。たとえば、Azure EventHub の場合は `Microsoft.EventHub` です。Azure サブスクリプションが必要なリソースプロバイダーに登録されていない場合、スクリプトは失敗します。この問題は、リソースプロバイダーに登録することで修正できます。CloudShell でこのコマンドを実行します。

{{< code-block lang="powershell" filename="例" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}

### ログの割り当て超過

スクリプトは正常にインストールされたのに、ログエクスプローラー内にアクティビティ/プラットフォームログが表示されない場合

ログ保持の [1 日の割り当て][5]を超えていないことを確認します。

**注:** スクリプトの実行後、5 分以上経ってからログエクスプローラーでログの検索を開始することをお勧めします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com
[2]: https://manage.windowsazure.com
[3]: /ja/help/
[4]: /ja/integrations/azure/?tab=azurecliv20#optional-parameters
[5]: /ja/logs/indexes/#set-daily-quota