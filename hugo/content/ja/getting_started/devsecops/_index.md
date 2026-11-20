---
title: DevSecOps バンドルの概要
---

このガイドでは、DevSecOps バンドルの概要と、インストールおよび設定手順に関するリンクを紹介しています。

## APM DevSecOps

APM DevSecOps バンドルは、[Application Security Management (ASM)][2] の [Software Composition Analysis (SCA)][10] の機能と [Application Performance Monitoring (APM)][4] を組み合わせたものです。

{{< tabs >}}
{{% tab "APM DevSecOps" %}}

APM DevSecOps には、[APM][1]、[Universal Service Monitoring][2]、そして [ASM][4] の [Software Composition Analysis (SCA)][3] 機能が含まれています。

### セットアップ

APM DevSecOps を始めるには、APM と Universal Service Monitoring 用に [Datadog Agent をインストールおよび設定][5]してください。詳細な手順については、以下のドキュメントを参照してください:

- [APM][6]
- [Universal Service Monitoring][7]

Agent をインストールした後、環境で Software Composition Analysis (SCA) を有効にしてください。

- [Software Composition Analysis (SCA)][10]

### 次のステップ

APM DevSecOps に含まれる機能の詳細についてはこちらをご覧ください。

- [APM Metrics][9]: トレースアプリケーションメトリクスの詳細について
- [Universal Service Monitoring][2]: サービスのヘルスメトリクスを可視化
- [Software Composition Analysis (SCA)][3]: サービスのオープンソース依存関係に存在する脆弱性を検出

[1]: /ja/tracing/
[2]: /ja/universal_service_monitoring/
[3]: /ja/security/application_security/vulnerability_management/
[4]: /ja/security/application_security
[5]: /ja/agent/
[6]: /ja/tracing/trace_collection/
[7]: /ja/universal_service_monitoring/setup/
[9]: /ja/tracing/metrics/
[10]: /ja/getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{% tab "APM DevSecOps Pro" %}}

APM DevSecOps Pro には、[APM][1]、[Universal Service Monitoring][2]、[Data Streams Monitoring][3]、そして [ASM][5] の [Software Composition Analysis (SCA)][4] 機能が含まれています。

### セットアップ

APM DevSecOps Pro を始めるには、APM、Universal Service Monitoring、Data Streams Monitoring 用に [Datadog Agent をインストールおよび設定][6]してください。詳細な手順については、以下のドキュメントを参照してください。

- [APM][7]
- [Universal Service Monitoring][8]
- [Data Streams Monitoring][9]

Agent をインストールした後、環境で Software Composition Analysis (SCA) を設定してください。

- [Software Composition Analysis (SCA)][10]

#### 次のステップ

APM DevSecOps Pro に含まれる機能の詳細についてはこちらをご覧ください。

- [APM Metrics][11]: トレースアプリケーションメトリクスの詳細を確認
- [Universal Service Monitoring][2]: サービスのヘルスメトリクスを可視化
- [Data Streams Monitoring][3]: パイプラインを大規模に把握・管理
- [Software Composition Analysis (SCA)][4]: サービスのオープンソース依存関係にある脆弱性を検出

[1]: /ja/tracing/
[2]: /ja/universal_service_monitoring/
[3]: /ja/data_streams/
[4]: /ja/security/application_security/vulnerability_management/
[5]: /ja/security/application_security
[6]: /ja/agent/
[7]: /ja/tracing/trace_collection/
[8]: /ja/universal_service_monitoring/setup/
[9]: /ja/data_streams/#setup
[10]: /ja/getting_started/application_security/vulnerability_management/
[11]: /ja/tracing/metrics/

{{% /tab %}}
{{% tab "APM DevSecOps Enterprise" %}}

APM DevSecOps Enterprise には、[APM][1]、[Universal Service Monitoring][2]、[Data Streams Monitoring][3]、[Continuous Profiler][4]、そして [ASM][6] の [Software Composition Analysis (SCA)][5] 機能が含まれています。

### セットアップ

APM DevSecOps Enterprise を始めるには、APM、Universal Service Monitoring、Continuous Profiler、Data Streams Monitoring 用に [Datadog Agent をインストールおよび設定][7]してください。詳細な手順については、以下のドキュメントを参照してください。

- [APM][8]
- [Universal Service Monitoring][9]
- [Data Streams Monitoring][10]
- [Continuous Profiler][11]

Agent をインストールした後、環境で ASM を設定してください。

- [Application Security Management][14]

### 次のステップ

APM DevSecOps Enterprise に含まれる機能の詳細についてはこちらをご覧ください。

- [APM Metrics][13]: トレースアプリケーションメトリクスの詳細を確認
- [Universal Service Monitoring][2]: サービスのヘルスメトリクスを可視化
- [Data Streams Monitoring][3]: パイプラインを大規模に把握・管理
- [Continuous Profiler][4]: 本番環境におけるコードパフォーマンスの最適化
- [Software Composition Analysis (SCA)][5]: サービスのオープンソース依存関係にある脆弱性を検出

[1]: /ja/tracing/
[2]: /ja/universal_service_monitoring/
[3]: /ja/data_streams/
[4]: /ja/profiler/
[5]: /ja/security/application_security/vulnerability_management/
[6]: /ja/security/application_security
[7]: /ja/agent/
[8]: /ja/tracing/trace_collection/
[9]: /ja/universal_service_monitoring/setup/
[10]: /ja/data_streams/#setup
[11]: /ja/profiler/enabling
[13]: /ja/tracing/metrics/
[14]: /ja/getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{< /tabs >}}

<br>

## Infrastructure DevSecOps

Infrastructure DevSecOps バンドルは、[Cloud Security Management (CSM)][3] のセキュリティ機能とインフラストラクチャー監視を組み合わせたものです。

{{< tabs >}}
{{% tab "Infrastructure DevSecOps Pro" %}}

Infrastructure DevSecOps Pro には、[Containers][1]、[Serverless][2]、[CSM Pro][3] が含まれ、{{< translate key="integration_count" >}} [を超える標準インテグレーション][4]も利用できます。

### セットアップ

Infrastructure DevSecOps Pro を始めるには、Containers と Serverless 用に [Datadog Agent をインストールおよび設定][5]してください。また、ご利用のサービスに対してインテグレーションも設定する必要があります。詳しい手順については、以下のドキュメントを参照してください。

- [Containers][1]
- [Serverless][2]
- [Integrations][4]

Agent をインストールした後、環境に合わせて CSM Pro を設定してください。

- [Cloud Security Management Pro][6]

### 次のステップ

Infrastructure DevSecOps Pro に含まれる機能の詳細については、次を参照してください。

- [Infrastructure List][7]: ホストのアクティビティを表示
- [Metrics][8]: メトリクスの調査と理解
- [Host and Container Maps][9]: ホストやコンテナを可視化
- [Live Containers][10]: 環境全体のコンテナをリアルタイムで可視化
- [Serverless][2]: サーバーレスアプリケーションを支えるマネージドサービスを包括的に可視化
- [Cloud Security Management][11]: クラウド全体でリアルタイムの脅威検知と継続的な構成監査を実施

[1]: /ja/containers/
[2]: /ja/serverless/
[3]: /ja/security/cloud_security_management/setup/
[4]: /ja/integrations/
[5]: /ja/agent/
[6]: /ja/security/cloud_security_management/setup/csm_pro
[7]: /ja/infrastructure/list/
[8]: /ja/metrics/
[9]: /ja/infrastructure/hostmap/
[10]: /ja/infrastructure/containers/
[11]: /ja/security/cloud_security_management/

{{% /tab %}}
{{% tab "Infrastructure DevSecOps Enterprise" %}}

Infrastructure DevSecOps Enterprise には、[Containers][1]、[Serverless][2]、[Live Processes][3]、[CSM Enterprise][4] が含まれ、{{< translate key="integration_count" >}} [を超える標準インテグレーション][5]も利用できます。

### セットアップ

Infrastructure DevSecOps Enterprise を始めるには、Containers、Serverless、Live Processes 用に [Datadog Agent をインストールおよび設定][6]してください。また、ご利用のサービスに対してインテグレーションも設定する必要があります。詳しい手順については、以下のドキュメントを参照してください。

- [Containers][1]
- [Serverless][2]
- [Live Processes][7]
- [Integrations][5]

Agent をインストールした後、環境に合わせて CSM Enterprise を設定してください。

- [Cloud Security Management Enterprise][8]

### 次のステップ

Infrastructure DevSecOps Enterprise に含まれる機能の詳細については、次を参照してください。

- [Infrastructure List][9]: ホストのアクティビティを表示
- [Metrics][10]: メトリクスの調査と理解
- [Metric Correlations][11]: 異常な動きをする他のメトリクスを検索し、問題の潜在的な根本原因を特定
- [Host and Container Maps][12]: ホストやコンテナを可視化
- [Live Containers][13]: 環境全体のコンテナをリアルタイムで可視化
- [Live Processes][14]: インフラストラクチャー上で稼働しているプロセスをリアルタイムで可視化
- [Serverless][2]: サーバーレス環境を支えるすべてのマネージドサービスを包括的に可視化
- [Watchdog][15]: アプリケーションおよびインフラストラクチャーの潜在的な問題を自動検出
- [Cloud Security Management][16]: クラウドインフラストラクチャー全体にわたるリアルタイムの脅威検出と継続的な構成監査

[1]: /ja/containers/
[2]: /ja/serverless/
[3]: /ja/infrastructure/process/
[4]: /ja/security/cloud_security_management/setup/
[5]: /ja/integrations/
[6]: /ja/agent/
[7]: /ja/infrastructure/process/?tab=linuxwindows#installation
[8]: /ja/security/cloud_security_management/setup/csm_enterprise
[9]: /ja/infrastructure/list/
[10]: /ja/metrics/
[11]: /ja/dashboards/correlations/
[12]: /ja/infrastructure/hostmap/
[13]: /ja/infrastructure/containers/
[14]: /ja/infrastructure/process/
[15]: /ja/watchdog/
[16]: /ja/security/cloud_security_management/

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/security/application_security/vulnerability_management/
[2]: /ja/security/application_security
[3]: /ja/security/cloud_security_management/
[4]: /ja/tracing
[10]: /ja/security/code_security/software_composition_analysis/