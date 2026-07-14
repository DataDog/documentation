---
aliases:
- /ja/integrations/amazon_eks
app_id: amazon-eks
categories:
- aws
- cloud
- 構成とデプロイ
- incident-teams
- kubernetes
- log collection
- オーケストレーション
custom_kind: integration
description: Amazon EKS は、AWS 上で Kubernetes を簡単に実行できるようにするマネージド サービスです
further_reading:
- link: https://www.datadoghq.com/blog/announcing-eks
  tag: blog
  text: Datadog で Amazon EKS を監視する
- link: https://www.datadoghq.com/blog/eks-cluster-metrics
  tag: blog
  text: Amazon EKS 監視で重要なメトリクス
- link: https://docs.datadoghq.com/integrations/eks_fargate/
  tag: documentation
  text: Amazon EKS on AWS Fargate
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Amazon EKS
---
![EKS ダッシュボード](https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png)

## 概要

Amazon Elastic Kubernetes Service (EKS) は、標準 Kubernetes 環境のデプロイとメンテナンスを部分的に自動化するためのマネージド型 Kubernetes サービスです。既存の Kubernetes アプリケーションを EKS に移行する場合、あるいは新しいクラスターをデプロイする場合も、Datadog は EKS 環境のリアルタイムの監視を支援します。

## セットアップ

Datadog はすでに Kubernetes と AWS の両方に対応しているため、EKS の監視にもそのまま活用できます。Kubernetes クラスター内で Agent を実行していて、今後 EKS へ移行する予定がある場合でも、Datadog で継続してクラスターを監視できます。

さらに、[Amazon EKS Managed Node Groups](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html) と [Amazon EKS on AWS Outposts](https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html) にも対応しています。

### EKS Anywhere

セットアップ手順については、[Amazon EKS Anywhere インテグレーション](https://docs.datadoghq.com/integrations/eks_anywhere/) を参照してください。

### メトリクスの収集

EKS を監視するには、次のいずれかの Datadog インテグレーションを設定し、さらに EKS とあわせて利用している他の AWS サービス (たとえば [ELB](https://docs.datadoghq.com/integrations/amazon_elb/)) のインテグレーションも設定する必要があります。

- [Kubernetes](https://docs.datadoghq.com/integrations/kubernetes/)
- [AWS](https://docs.datadoghq.com/integrations/amazon_web_services/)
- [Amazon EC2](https://docs.datadoghq.com/integrations/amazon_ec2/)

### ログ収集

_Agent バージョン 6.0 以降で利用可能_

セットアップは Kubernetes とまったく同じです。
すべてのコンテナからログ収集を始めるには、Datadog Agent の [環境変数](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#log-collection-setup) を使用します。

DaemonSets を活用すると、[すべてのノードに Datadog Agent を自動デプロイ](https://docs.datadoghq.com/agent/basic_agent_usage/kubernetes/#container-installation) することもできます。

これらの環境変数の詳細や、さらに高度な設定オプションについては、[コンテナ ログ収集の手順](https://docs.datadoghq.com/logs/log_collection/docker/#option-2-container-installation) を参照してください。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

- [Datadog で Amazon EKS を監視する](https://www.datadoghq.com/blog/announcing-eks)
- [Amazon EKS 監視で重要なメトリクス](https://www.datadoghq.com/blog/eks-cluster-metrics)
- [AWS Fargate 上の Amazon EKS](https://docs.datadoghq.com/integrations/eks_fargate/)