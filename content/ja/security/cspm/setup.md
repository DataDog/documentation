---
aliases:
- /ja/security_platform/cspm/getting_started
- /ja/security/cspm/getting_started
further_reading:
- link: security/default_rules
  tag: Documentation
  text: デフォルトのクラウドコンフィギュレーションコンプライアンスルールについて
- link: security/cspm/findings
  tag: Documentation
  text: CSPM 検出結果を検索および調査
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentation
  text: フレームワークおよび業界のベンチマークの詳細
- link: /getting_started/cloud_security_management
  tag: Documentation
  text: Cloud Security Management の概要
kind: documentation
title: CSPM のセットアップ
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

クラウドセキュリティポスチャ管理 (CSPM) は、お使いのクラウドリソースにおける現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの検知などをサポートします。

## クラウドリソースの CSPM を有効にする

CSPM は、AWS、Azure、Google Cloud、Docker、Kubernetes などのクラウドプロバイダーと既存の Datadog インテグレーションを使用して、エージェントレスオンボーディングを提供します。CSPM の構成方法の詳細については、クラウドプロバイダーを選択し、指示に従ってください。

{{< tabs >}}
{{% tab "AWS" %}}

### Datadog AWS インテグレーションのセットアップ

まだの場合は、[Amazon Web Services インテグレーション][1]を設定します。CSPM の場合は、リソース収集に必要な[必要な権限][2]も追加する必要があります。

### AWS に対して CSPM を有効にする

次のいずれかの方法で、AWS アカウントに対して CSPM を有効にします。

#### セキュリティ設定

1. **Security** > **Setup** に移動します。
2. [アプリ内の説明][3]に従い、アカウントに対して CSPM を有効にします。
3. **Setup** > **Cloud Providers** タブで、**[AWS][4]** タイルをクリックします。
4. AWS アカウントで CSPM を有効にするには、**Collect Resources** のトグルをオンにします。

#### AWS インテグレーションタイル

1. AWS インテグレーションタイルで、AWS アカウントを選択し、**Resource Collection** をクリックします。
2. CSPM のリソース収集を有効にするには、**Cloud Security Posture Management Collection** を選択します。
3. **保存**をクリックします。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=amazon-web-services

{{% /tab %}}

{{% tab "Azure" %}}

### Datadog Azure インテグレーションのセットアップ

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

**注**: Azure コンプライアンスルールのフルセットにアクセスするには、Microsoft Graph API の `Application.Read.All`、`Directory.Read.All` 、`Group.Read.All`、`Policy.Read.All`、`User.Read.All` の権限を有効にする必要があります。

### Azure に対して CSPM を有効にする

次のいずれかの方法で、Azure サブスクリプションに対して CSPM を有効にします。

#### セキュリティ設定

1. **Security** > **Setup** に移動します。
2. [アプリ内の説明][2]に従い、アカウントに対して CSPM を有効にします。
3. **Setup** > **Cloud Providers** タブで、**[Azure][3]** タイルをクリックします。
4. **CSPM Enabled** のトグルをオンにして、Azure サブスクリプションに対して CSPM を有効にします。

#### Azure インテグレーションタイル

1. Azure インテグレーションタイルで、Azure アプリを 1 つ選択します。
2. **Resource Collection** で、**Enable resource collection for Cloud Security Posture Management** のチェックボックスを選択します。
3. **Update Configuration** をクリックします。

[1]: https://docs.datadoghq.com/ja/integrations/azure
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=azure

{{% /tab %}}

{{% tab "Google Cloud" %}}

### Datadog Google Cloud インテグレーションのセットアップ

Datadog Google Cloud インテグレーションでは、サービスアカウントを使用して、Google Cloud と Datadog の間の API 接続を作成します。CSPM のメトリクス収集を有効にするには、サービスアカウントを作成し、Datadog にサービスアカウントの資格情報を提供することで、自動的に API 呼び出しが開始します。

**注**: 監視するプロジェクトで、[Google Cloud の課金][4]、[Cloud Monitoring API][5]、[Compute Engine API][6]、[Cloud Asset API][7] がすべて有効になっている必要があります。

#### Google Cloud

1. Datadog インテグレーションをセットアップする Google Cloud プロジェクトの [Google Cloud 認証情報ページ][8]に移動します。
2. **Create credentials** をクリックし、**Service account** を選択します。
3. サービスアカウントに一意の名前を付け、**Create and Continue** をクリックします。
4. サービスアカウントに以下のロールを追加し、**Continue** をクリックします。
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
5. ページ下部のサービスアカウントを選択します。
6. **Keys** タブで、**New Key** をクリックし、**Create new key** を選択します。
7. **JSON** を選択し、**Create** をクリックすると、JSON キーがダウンロードされます。

#### Datadog

1. Datadog で、[Datadog Google Cloud インテグレーションタイル][9]に移動します。
2. **Configuration** タブで、サービスアカウントを探し、**Upload Private Key File** を選択し、プロジェクトを Datadog とインテグレーションします。
3. JSON ファイルをアップロードし、**Update Configuration** をクリックします。
4. 複数のプロジェクトを監視する場合は、次の方法のいずれかを使用します。
    - 複数のサービスアカウントを使用する場合は、上のプロセスを繰り返します。
    - 同じサービスアカウントを使用する場合は、ダウンロードした JSON ファイルで `project_id` を更新します。次に、手順 1 ～ 3 の説明に従って、このファイルを Datadog にアップロードします。

### Google Cloud に対して CSPM を有効にする

次のいずれかの方法で、Google Cloud プロジェクトに対して CSPM を有効にします。

#### セキュリティ設定

1. **Security** > **Setup** に移動します。
2. [アプリ内の説明][2]に従い、アカウントに対して CSPM を有効にします。
3. **Setup** > **Cloud Providers** タブで、**[Google Cloud Platform][3]** タイルをクリックします。
4. **CSPM Enabled** のトグルをオンにして、Google Cloud プロジェクトに対して CSPM を有効にします。

#### Google Cloud インテグレーションタイル

1. Google Cloud インテグレーションタイルで、Google Cloud プロジェクトを 1 つ選択します。
2. **Enable resource collection for Cloud Security Posture Management** (クラウドセキュリティポスチャ管理のためにリソースの収集を有効にする) で、**Resource collection** のチェックボックスをオンにします。
3. **Update Configuration** をクリックします。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=google-cloud-platform
[4]: https://support.google.com/cloud/answer/6293499?hl=en
[5]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[6]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[7]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[8]: https://console.cloud.google.com/apis/credentials
[9]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}

{{% tab "Docker" %}}

### Docker に対して CSPM を有効にする

1. **Security** > **Setup** に移動します。
2. [アプリ内の説明][1]に従い、アカウントに対して CSPM を有効にします。
3. **Setup** > **Host and containers** タブで、**[Docker][2]** タイルをクリックします。
4. **Select API key** をクリックして、CSPM で使用する API キーを選択します。
5. 自動生成されたコマンドをコピーし、Docker 環境で実行して CSPM を有効にします。

[1]: https://app.datadoghq.com/security/configuration
[2]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=docker

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Kubernetes に対して CSPM を有効にする

1. [Datadog Agent][1] (バージョン 7.27 以上) のインストールがまだの場合は、先にインストールを行います。
2. **Security** > **Setup** に移動します。
3. [アプリ内の説明][2]に従い、アカウントに対して CSPM を有効にします。
4. `values.yaml` ファイルの `datadog` セクションに以下を追加します。
    ```yaml
    # values.yaml file
    datadog:
    [...]
      # Add this to enable Cloud Security Posture Management and Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
    ```

5. Agent を再起動します。

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=kubernetes

{{% /tab %}}
{{< /tabs >}}

## 最初の結果の表示

CSPM は、15 分～4 時間間隔 (タイプによって異なる) でリソースを評価します。スキャンが完了するとすぐに、スキャンごとの新たな所見が生成されます。

クラウドリソースに関する所見を表示するには、[CSPM ホームページ][1] に移動します。

{{< img src="security/cspm/summary_page.png" alt="Cloud Security Posture Management サマリーページ" width="100%">}}

## デフォルトのコンプライアンスルールについて

CSPM では、クラウドリソースを評価し、潜在的なコンフィギュレーションミスを特定する[すぐに使えるコンプライアンスルール][2]が一揃い用意されているため、直ちに修復手順を実行できます。コンフィギュレーションコンプライアンスルールが新たに追加された場合は、自動的にアカウントにインポートされます。

デフォルトのコンプライアンスルールをクラウドプロバイダーごとに絞り込む方法

1. **Security** > **Posture Management** > **Compliance Rules** に移動します。
2. **Tag** ファセットから次のいずれかの値を選択します。
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

デフォルトのコンプライアンスルールに目を通した後は、[Security Findings Explorer][3] でクラウドのコンフィギュレーションミスを確認して対策を行い、 [各ルールが自社の環境をどのようにスキャンするかをカスタマイズ][4]して、[通知ターゲットを設定][5]することができます。

## CSPM の無効化

CSPM を無効にした後も、これまでの知見やホームページはアプリ内で利用可能であり、追加の請求費用は発生しません。

クラウドプロバイダーの CSPM を無効にするには

- **AWS**: **Setup** > **Cloud Providers** タブで、**AWS** タイルをクリックし、AWS アカウントの **Collect Resources** トグルをオフにします。
- **Azure**: **Setup** > **Cloud Providers** タブで、**Azure** タイルをクリックし、Azure サブスクリプションの **CSPM Enabled** トグルをオフにします。
- **Google Cloud**: **Setup** > **Cloud Providers** タブで、**Google Cloud Platform** タイルをクリックし、Google Cloud プロジェクトの **CSPM Enabled** トグルをオフにします。
- **Docker**: Docker の構成で `DD_COMPLIANCE_CONFIG_ENABLED` を `false` に設定します。
- **Kubernetes**: `values.yaml` ファイルの `datadog` セクションで、 `compliance` > `enabled` を `false` に設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /ja/security/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /ja/security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /ja/security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules