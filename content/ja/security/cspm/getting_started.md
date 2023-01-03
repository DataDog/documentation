---
aliases:
- /ja/security_platform/cspm/getting_started
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトのクラウドコンフィギュレーション検出ルールについて
- link: security/cspm/findings
  tag: ドキュメント
  text: CSPM 検出結果を検索および調査
- link: security/cspm/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークについて
kind: documentation
title: CSPM の概要
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

Cloud Security Posture Management (CSPM) は、クラウドリソースの現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの検知などをサポートします。

## クラウドリソースで CSPM を有効にする

CSPM は、AWS、Azure、GCP、Docker、Kubernetesなどのクラウドプロバイダーとの既存の Datadog インテグレーションを利用して、エージェントレスなオンボーディングを提供します。CSPM の構成方法の詳細を見るには、お使いのクラウドプロバイダーを選択し、説明に従ってください。

{{< tabs >}}
{{% tab "AWS" %}}

### Datadog AWS インテグレーションのセットアップ

[Amazon Web Services インテグレーション][1]のセットアップがまだの場合は、先にセットアップを行ってください。また、CSPM を利用する場合は、リソース収集のために[必要なアクセス許可][2]を追加する必要があります。

### AWS に対して CSPM を有効にする

次のいずれかの方法で、AWS アカウントに対して CSPM を有効にします。

#### セキュリティのセットアップとコンフィギュレーション

1. **Security** > **Setup & Configuration** に移動します。
2. [アプリ内の説明][3]に従い、アカウントに対して CSPM を有効にします。
3. **Setup & Configuration** > **Cloud Providers** タブで、**[AWS][4]** タイルをクリックします。
4. AWS アカウントに対して CSPM を有効にするために、**Collect Resources** のトグルをオンにします。

#### AWS インテグレーションタイル

1. AWS インテグレーションタイルで、AWS アカウントを 1 つ選択し、**Resource Collection** をクリックします。
2. **Cloud Security Posture Management Collection** を選択し、CSPM のためのリソース収集を有効にします。
3. **Save** をクリックします。

**注**: CSPM を無効にするには、AWS アカウントに対して **Collect Resources** のトグルをオフにします。以前の所見およびホームページは引き続きアプリ内で利用可能となりますが、追加の費用が請求されることはありません。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=amazon-web-services

{{% /tab %}}

{{% tab "Azure" %}}

### Datadog Azure インテグレーションのセットアップ

[Microsoft Azure integration][1] のセットアップがまだの場合は、先にセットアップを行ってください。

### Azure に対して CSPM を有効にする

次のいずれかの方法で、Azure サブスクリプションに対して CSPM を有効にします。

#### セキュリティのセットアップとコンフィギュレーション

1. **Security** > **Setup & Configuration** に移動します。
2. [アプリ内の説明][2]に従い、アカウントに対して CSPM を有効にします。
3. **Setup & Configuration** > **Cloud Providers** タブで、**[Azure][3]** タイルをクリックします。
4. **CSPM Enabled** のトグルをオンにして、Azure サブスクリプションに対して CSPM を有効にします。

#### Azure インテグレーションタイル

1. Azure インテグレーションタイルで、Azure アプリを 1 つ選択します。
2. **Resource Collection** で、**Enable resource collection for Cloud Security Posture Management** (クラウドセキュリティポスチャ管理のためにリソースの収集を有効にする) のチェックボックスをオンにします。
3. **Update Configuration** をクリックします。

**注**: CSPM を無効にするには、 Azure サブスクリプションに対して **CSPM Enabled** のトグルをオフにします。以前の所見およびホームページは引き続きアプリ内で利用可能となりますが、追加の費用が請求されることはありません。

[1]: https://docs.datadoghq.com/ja/integrations/azure
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=azure

{{% /tab %}}

{{% tab "GCP" %}}

<div class="alert alert-warning">
CSPM の GCP 対応は公開ベータ版です。
</div>

### Datadog GCP インテグレーションのセットアップ

[Google Cloud Platform インテグレーション][1]のセットアップがまだの場合は、先にセットアップを行い、[メトリクスの収集][2]を有効にするための手順が正常に完了したことを確認してください。

### CCP に対して CSPM を有効にする

次のいずれかの方法で、GCP プロジェクトに対して CSPM を有効にします。

### セキュリティのセットアップとコンフィギュレーション

1. **Security** > **Setup & Configuration** に移動します。
2. [アプリ内の説明][3]に従い、アカウントに対して CSPM を有効にします。
3. **Setup & Configuration** > **Cloud Providers** タブで、**[GCP][4]** タイルをクリックします。
4. **CSPM Enabled** のトグルをオンにして、GCP プロジェクトに対して CSPM を有効にします。

### GCP インテグレーションタイル

1. GCP インテグレーションタイルで、GCP プロジェクトを 1 つ選択します。
2. **Enable resource collection for Cloud Security Posture Management** (クラウドセキュリティポスチャ管理のためにリソースの収集を有効にする) で、**Resource collection** のチェックボックスをオンにします。
3. **Update Configuration** をクリックします。

**注**: CSPM を無効にするには、GCP プロジェクトに対して **CSPM Enabled** のトグルをオフにします。以前の所見およびホームページは引き続きアプリ内で利用可能となりますが、追加の費用が請求されることはありません。

[1]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/ja/integrations/google_cloud_platform/#metric-collection
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/configuration?sectionId=secureCloudEnvironment&secure-cloud-environment=google-cloud-platform

{{< /tabs >}}

{{% tab "Docker" %}}

### Docker に対して CSPM を有効にする

1. **Security** > **Setup & Configuration** に移動します。
2. [アプリ内の説明][1]に従い、アカウントに対して CSPM を有効にします。
3. **Setup & Configuration** > **Host and containers** タブで、**[Docker][2]** タイルをクリックします。
4. **Select API key** をクリックして、CSPM で使用する API キーを選択します。
5. 自動生成されたコマンドをコピーし、Docker 環境で実行して CSPM を有効にします。

**注**: CSPM を無効にするには、`DD_COMPLIANCE_CONFIG_ENABLED` を `false` に設定します。以前の所見およびホームページは引き続きアプリ内で利用可能となりますが、追加の費用が請求されることはありません。

[1]: https://app.datadoghq.com/security/configuration
[2]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=docker

{{< /tabs >}}

{{% tab "Kubernetes" %}}

### Kubernetes に対して CSPM を有効にする

1. [Datadog Agent][1] (バージョン 7.27 以上) のインストールがまだの場合は、先にインストールを行います。
2. **Security** > **Setup & Configuration** に移動します。
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

**注**: CSPM を無効にするには、`compliance` > `enabled`  を `false` に設定します。以前の所見およびホームページは引き続きアプリ内で利用可能となりますが、追加の費用が請求されることはありません。

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://app.datadoghq.com/security/configuration
[3]: https://app.datadoghq.com/security/configuration?sectionId=secureHostsAndContainers&secure-cloud-environment=google-cloud-platform&secure-hosts-and-containers=kubernetes

{{% /tab %}}
{{< /tabs >}}

## 最初の結果の表示

CSPM は、15 分～4 時間間隔 (タイプによって異なる) でリソースを評価します。スキャンが完了するとすぐに、スキャンごとの新たな所見が生成されます。

クラウドリソースに関する所見を表示するには、[CSPM ホームページ][1] に移動します。

{{< img src="security/cspm/summary_page.png" alt="Cloud Security Posture Management サマリーページ" width="100%">}}

## デフォルトの検出ルールについて

CSPM では、クラウドリソースを評価し、潜在的なコンフィギュレーションミスを特定する[独自の検出ルール][2]が一揃い用意されているため、直ちに修復手順を実行できます。コンフィギュレーション検出ルールが新たに追加された場合は、自動的にアカウントにインポートされます。

デフォルトの検出ルールをクラウドプロバイダーごとに絞り込む方法

1. **Security** > **Detection Rules** に移動します。
2. **Tag** ファセットから次のいずれかの値を選択します。
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **GCP**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

デフォルトの検出ルールに目を通した後は、[Security Findings Explorer][3] でクラウドのコンフィギュレーションミスを確認して対策を行い、 [各ルールが自社の環境をどのようにスキャンするかをカスタマイズ][4]して、[通知ターゲットを設定][5]することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: /ja/security/default_rules/#cat-posture-management-cloud
[3]: https://app.datadoghq.com/security/compliance?time=now
[4]: /ja/security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[5]: /ja/security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules