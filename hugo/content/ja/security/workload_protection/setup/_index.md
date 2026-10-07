---
aliases:
- /ja/security/workload_protection/setup/agent
- /ja/security/workload_protection/supported_linux_distributions
- /ja/security/threats/supported_linux_distributions
description: Datadog で Workload Protection を有効にし、保護対象のワークロードに Datadog Agent をデプロイします。
disable_toc: false
title: Workload Protection のセットアップ
---
{{< partial name="security-platform/WP-billing-note.html" >}}

Workload Protection は、Datadog Agent を通じてランタイムアクティビティを収集します。セットアップとは、Datadog で製品を有効にし、保護対象のワークロードに Agent をデプロイすることを意味します。

Agent が実行されたら、プレイグラウンドスクリプトを使用して Workload Protection を安全に試すことができます。検出した脅威に対して Agent が対処できるようにする Enforcement 機能を利用するには、別途アクセス権限が必要です。

Agent が収集したアクティビティの取り扱いについては、「[Workload Protection の仕組み][6]」を参照してください。

## 要件 {#requirements}

Workload Protection は Datadog Agent を利用してワークロードを監視し、脅威の検出とセキュリティ態勢の監視のためにセキュリティ関連のイベントを収集します。

<div class="alert alert-info">Datadog では、Infrastructure Monitoring が有効になっていない組織またはサブ組織で Workload Protection を実行することは推奨されません。</div>

### Agent のオプション {#agent-options}

Workload Protection は、環境やオペレーティングシステムに応じて 3 つの異なる構成を提供しています。
- **Linux** では、**eBPF Agent** をインストールします。これにより、最高のパフォーマンスと機能サポートが実現します。
- **AWS Fargate** では、Datadog Agent をサイドカーとしてインストールし、**cws-instrumentation** トレーサーでワークロードをインスツルメンテーションします。Fargate では eBPF へのアクセスが提供されないため、このトレーサーは代わりに ptrace を使用します。
- **Windows** では、Workload Protection エージェントが Windows ドライバーをインストールしてイベントとテレメトリを収集します。

### Linux サポート {#linux-support}

Linux では、一部のクラウドコンピューティングサービスが eBPF へのアクセスを制限しているため、Linux カーネルのバージョンとディストリビューションのバージョン、および基盤となるクラウド環境 (該当する場合) を確認する必要があります。

#### 対応 Linux ディストリビューション {#supported-linux-distributions}

| Linux ディストリビューション                                           | 対応バージョン                    |
|---------------------------------------------------------------|---------------------------------------|
| Ubuntu LTS                                                    | 18.04、20.04、22.04、24.04、またはそれ以降 |
| Debian                                                        | 10 以降                         |
| Amazon Linux 2                                                | カーネル 4.14 以降               |
| Amazon Linux 2023                                             | すべてのバージョン                          |
| SUSE Linux Enterprise Server                                  | 12 および 15                             |
| Red Hat Enterprise Linux                                      | 7、8、9                           |
| Oracle Linux                                                  | 7、8、9                           |
| CentOS                                                        | 7                                     |
| Google Container Optimized OS (GKE でデフォルト)                | 93 以降                         |

**注:**

- カスタムカーネルをビルドすると、Agent が適切に機能するために必要な重要なフックポイントが変更される可能性があります。そのため、動作は保証されません。
- Workload Protection には、Linux カーネルバージョン 4.14.0 以降が必要です。
- カーネルバージョンが古いディストリビューションでも、必要な eBPF 機能がバックポートされていれば、Workload Protection を実行できます。ただし、一部の機能にはより新しいカーネルバージョンが必要となる場合があるため、機能が制限された状態で動作します。たとえば、CentOS/RHEL 7 は eBPF 機能がバックポートされたカーネル 3.10 を使用しておりサポート対象となりますが、ネットワーク監視などの一部の機能は無効になります。
- Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性の問題については、「[Workload Protection のトラブルシューティング][2]」を参照してください。

#### 対応クラウド環境 {#supported-cloud-environments}

| クラウド環境                      | 対応状況 |
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (cws-instrumentation トレーサーを使用)                    |
| Azure Virtual Machines (Azure VMs)      | ✅                    |
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    |

**注:**

- これらのクラウド環境で使用される基盤となる Linux ディストリビューションとシステム構成は、Workload Protection がサポートされているかどうかを判断する主要な要因です。
- Linux ディストリビューションやカーネルバージョンを選択できるクラウド環境では、上記の要件を満たす構成を選択してください。

### Windows のサポート {#windows-support}

Workload Protection の Windows エージェントは、Windows Server 2019 以降をサポートしています。

## Datadog で Workload Protection を有効にする {#enable-workload-protection-in-datadog}

Workload Protection の利用を開始するには、Datadog で Workload Protection 製品を有効にする必要があります。そのためには、Datadog アカウントにログインし、[Get Started][1] をクリックします。Datadog の Agent デプロイ手順に従うか、詳細についてこのページに戻って確認することができます。

<div class="alert alert-info">Workload Protection を有効にするには、Org Management <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">権限</a>が必要です。</div>

## Datadog Agent をデプロイする {#deploy-the-datadog-agent}

### Linux {#linux}

以下の手順に従って、Datadog Agent で Workload Protection の eBPF エージェントを有効にします。

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/kubernetes/" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="/security/workload_protection/setup/docker/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/security/workload_protection/setup/ecs_ec2/" src="integrations_logos/amazon_ecs.png" alt="ECS EC2" >}}
  {{< image-card href="/security/workload_protection/setup/linux_ebpf/" src="integrations_logos/linux.png" alt="Linux eBPF" >}}
{{< /card-grid >}}

### AWS Fargate {#aws-fargate}

以下の手順に従って、AWS Fargate 上で Workload Protection の cws-instrumentation トレーサーをセットアップします。

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/fargate/" src="integrations_logos/amazon_fargate.png" alt="Amazon Fargate" >}}
{{< /card-grid >}}

### Windows {#windows}

以下の手順に従って、Datadog Agent で Workload Protection の Windows エージェントを有効にします。

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/windows/" src="integrations_logos/windows.png" alt="Windows" >}}
{{< /card-grid >}}

## 次のステップ {#next-steps}

セットアップ完了後は、Workload Protection の機能を試したり、環境に合わせて Agent を設定したり、あるいは Automated response 機能へのアクセスをリクエストしたりすることができます。

### Workload Protection を試す{#explore-workload-protection}

Datadog では、Workload Protection の機能や能力を実際に体験して学習できるプレイグラウンドを提供しています。このプレイグラウンドでは、テスト環境で安全に実行できるさまざまなシナリオを提供しており、Workload Protection が検出し、保護できる脅威や実際の攻撃をシミュレートします。開始するには、「[プレイグラウンドのリポジトリ][3]」を参照してください。

### Agent を構成する {#configure-the-agent}

[高度な Agent 設定ページ][5] では、ご自身の環境やニーズに合わせて Agent を設定および調整する方法を説明しています。

### 自動応答を有効にする {#enable-automated-response}

<div class="alert alert-danger">Automated response を有効にするには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>にお問い合わせください。</div>

Automated response へのアクセス権が付与されたら、[Automated response][4] ページを参照してください。

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /ja/security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /ja/security/workload_protection/respond_and_report/#automated-response
[5]: /ja/security/workload_protection/setup/advanced_configuration
[6]: /ja/security/workload_protection/#evaluating-activity