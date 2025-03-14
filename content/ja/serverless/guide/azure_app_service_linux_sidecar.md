---
further_reading:
- link: /integrations/azure_app_services/
  tag: ドキュメント
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: ドキュメント
  text: Azure App Service Environment
title: Azure App Service - Linux コンテナをサイドカーパターンでインスツルメントする
---

<div class="alert alert-info">Azure App Service コンテナを <code>serverless-init</code> でインスツルメントするには、<a href="/serverless/azure_app_services/azure_app_services_container">Instrument Azure App Service - Linux Container with serverless-init</a> を参照してください。</div>

## 概要

このインストルメンテーション方法では、Azure の[サイドカーパターン][1]を使用して、コンテナ化された Linux Azure App Service ワークロードを監視します。

### 前提条件

- Azure App Service アプリケーションがコンテナ化されていること
- [Datadog のトレーシングライブラリでサポートされている][2]プログラミング言語を使用していること
- [Datadog API キー][3]を所有していること

## アプリケーションをインスツルメントする

1. [Datadog トレーサー][11]をコンテナ化されたアプリケーションに統合する
1. [Linux Web App を作成][12]する
1. [Datadog 環境変数][13]をアプリケーション設定として追加する
1. [Datadog サイドカー][14]を追加する

### Datadog トレーサーを統合する

1. メインアプリケーションの Dockerfile に以下の行を追加してください。

   {{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}

```dockerfile
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

   これにより、アプリケーションコンテナ内に Datadog トレーサーがインストールおよび設定されます。

2. イメージをビルドし、お好みのコンテナレジストリにプッシュします。

#### Dockerfile の完全なサンプル

{{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}
```dockerfile
# ステージ 1: アプリケーションをビルドする
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# プロジェクトファイルをコピーし、依存関係を復元する
COPY *.csproj ./
RUN dotnet restore

# 残りのソースコードをコピーする
COPY . .

# アプリケーションをビルドする
RUN dotnet publish -c Release -o out

# ステージ 2: ランタイムイメージを作成する
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# ステージ 1 からビルド成果物をコピーする
COPY --from=build /app/out ./

# Datadog 固有の設定
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.49.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz

# アプリケーションのエントリポイントを設定する
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Linux Web App を作成する

1. Azure ポータルで **App Services** に移動し、**Create** を選択します。
1. **Basics** タブで、必要事項を入力します。
   - **Publish** には **Container** を選択します。
   - **Operating System** には **Linux** を選択します。
   続いて、**Next: Container >** を選択します。
1. **Container** タブで、必要事項を入力します。
   - **Sidecar support** には **Enabled** を選択します。
   - **Image Source** には、使用するレジストリを選択します。
   - コンテナイメージの **Registry**、**Image**、**Tag**、および **Port** を指定します。
1. **Review + create** を選択した後、**Create** を選択します。

### Datadog 環境変数を追加する

1. Azure ポータルで、対象のアプリを選択します。

2. 左側のメニューで **Configuration** > **Application settings** を選択します。

3. 以下の環境変数をアプリケーション設定として追加します。

   `DD_API_KEY` (**必須**)
   : あなたの [Datadog API キー][3]。 <br/>
   または、API キー (およびその他の機密情報) を Azure Key Vault から取得することもできます。詳細は [Azure App Service で Key Vault の参照をアプリケーション設定として使用する][4]を参照してください。

   `DD_SITE` 
   : {{< region-param key="dd_site" code="true" >}} <br/>
   あなたの [Datadog サイト][5]に対応します。デフォルトは `datadoghq.com` です。

   `DD_SERVICE` 
   : Datadog の [Software Catalog][6] に表示するサービス名を指定します。[統合サービスタグ付け][7]を参照してください。

   `DD_ENV` 
   : `staging` や `prod` など、環境を表す名前です。[統合サービスタグ付け][7]を参照してください。

   `DD_SERVERLESS_LOG_PATH` 
   : `/home/Logfile/*.log` <br/>
   アプリケーションログを書き出すパスを指定します。この場所を変更した場合は、この設定にカスタムパスを指定してください。

   `DD_DOTNET_TRACER_HOME` (**必須**)
   : `/datadog/tracer`

   `DD_TRACE_LOG_DIRECTORY` (**必須**)
   : `/home/Logfiles/dotnet`

   `CORECLR_ENABLE_PROFILING` (**必須**)
   : `1`

   `CORECLR_PROFILER` (**必須**)
   : `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

   `CORECLR_PROFILER_PATH` (**必須**)
   : `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so`


### Datadog サイドカーを追加する

1. Azure ポータルで、対象のアプリを選択します。
1. 左側のメニューで **Deployment Center** を選択します。
1. **Add** を選択します。**Add container** の下で、以下の詳細を入力します。
   - **Name**: `datadog`
   - **Image source**: `Docker Hub` などのレジストリ
   - **Image type**: Public
   - **Registry server URL**: `sitecontainerssampleacr.azurecr.io`
   - **Image and tag**: `datadog-dotnet:2.0`
   - **Port**: `8126`
1. **Apply** を選択します。

## 次のステップ

アプリケーションのインスツルメンテーションが完了したら、Datadog の [Serverless > Azure][8] ページに移動し、可観測性データを確認してください。アプリケーションログは [Log Explorer][9] に、トレースは [Trace Explorer][10] で確認できます。

[1]: https://azure.github.io/AppService/2024/04/04/Public-Preview-Sidecars-Webjobs.html
[2]: /ja/tracing/trace_collection/library_config
[3]: /ja/account_management/api-app-keys/
[4]: https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references
[5]: /ja/getting_started/site/
[6]: https://app.datadoghq.com/services
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/functions?cloud=azure
[9]: https://app.datadoghq.com/logs
[10]: https://app.datadoghq.com/apm/traces
[11]: #integrate-the-datadog-tracer
[12]: #create-your-linux-web-app
[13]: #add-datadog-environment-variables
[14]: #add-the-datadog-sidecar