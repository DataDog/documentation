---
disable_toc: true
private: true
title: コンテナガイド
---

{{< whatsnext desc="一般的なコンテナガイド:" >}}
    {{< nextlink href="/containers/guide/kubernetes_daemonset" >}}DaemonSet を使用して Kubernetes に Datadog Agent を手動でインストールして構成する{{< /nextlink >}}
    {{< nextlink href="/containers/guide/build-container-agent" >}}Datadog Agent イメージを作成する{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-management" >}}コンテナディスカバリーの管理{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-advanced" >}}Datadog Operator の高度な設定方法{{< /nextlink >}}
    {{< nextlink href="/containers/guide/container-images-for-docker-environments" >}}Docker 環境向けのコンテナイメージ{{< /nextlink >}}
    {{< nextlink href="/containers/guide/compose-and-the-datadog-agent" >}}Compose と Datadog Agent{{< /nextlink >}}
    {{< nextlink href="/containers/guide/docker-deprecation" >}}Kubernetes での Docker の非推奨化{{< /nextlink >}}
    {{< nextlink href="/containers/guide/podman-support-with-docker-integration" >}}Podman コンテナランタイムでの Docker インテグレーションの使用{{< /nextlink >}}
    {{< nextlink href="/containers/guide/changing_container_registry" >}}コンテナレジストリの変更{{< /nextlink >}}
    {{< nextlink href="/containers/guide/sync_container_images" >}}Datadog のイメージをプライベートレジストリと同期する{{< /nextlink >}}
    {{< nextlink href="/containers/guide/how-to-import-datadog-resources-into-terraform/" >}}Datadog リソースを Terraform にインポートする方法{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-cluster-name-detection/" >}}Kubernetes クラスター名の検出{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-legacy/" >}}Kubernetes レガシー{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="オートディスカバリーガイド:" >}}
    {{< nextlink href="/containers/guide/autodiscovery-with-jmx" >}}JMX によるオートディスカバリー{{< /nextlink >}}
    {{< nextlink href="/containers/guide/ad_identifiers" >}}コンテナ識別子: オートディスカバリーコンフィギュレーションファイルテンプレートを特定のコンテナに適用{{< /nextlink >}}
    {{< nextlink href="/containers/guide/template_variables" >}}オートディスカバリーテンプレート変数: 構成設定を動的に入力{{< /nextlink >}}
    {{< nextlink href="/containers/guide/auto_conf" >}}オートディスカバリー自動構成: 一般的なインテグレーションのためのデフォルト基本構成{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-examples" >}}オートディスカバリーテンプレートの詳細な例{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Cluster Agent ガイド:" >}}
    {{< nextlink href="/containers/guide/cluster_agent_autoscaling_metrics" >}}Cluster Agent でカスタムおよび外部メトリクスを使用したオートスケーリング{{< /nextlink >}}
    {{< nextlink href="/containers/guide/clustercheckrunners" >}}クラスターチェックランナー{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Operator ガイド:" >}}
    {{< nextlink href="/containers/guide/datadogoperator_migration" >}}Datadog Operator のバージョン 1.0 への移行{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-eks-addon" >}}Datadog Operator アドオンを使用して Amazon EKS に Datadog Agent をインストールする{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="AWS ガイド:" >}}
    {{< nextlink href="/containers/guide/aws-batch-ecs-fargate" >}}AWS Batch と ECS Fargate および Datadog Agent {{< /nextlink >}}
{{< /whatsnext >}}