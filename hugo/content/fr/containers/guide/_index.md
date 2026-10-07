---
description: Liste de guides pour la configuration et le paramétrage de la surveillance
  des conteneurs
disable_toc: true
private: true
title: Guides sur les conteneurs
---

{{< whatsnext desc="Guides généraux sur les conteneurs :" >}}
    {{< nextlink href="/containers/guide/kubernetes_daemonset" >}}Installer et configurer manuellement l'Agent Datadog sur Kubernetes avec DaemonSet{{< /nextlink >}}
    {{< nextlink href="/containers/guide/build-container-agent" >}}Créer une image de l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-management" >}}Gestion de la découverte de conteneurs{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-advanced" >}}Configuration avancée du Datadog Operator{{< /nextlink >}}
    {{< nextlink href="/containers/guide/container-images-for-docker-environments" >}}Images de conteneur pour les environnements Docker{{< /nextlink >}}
    {{< nextlink href="/containers/guide/compose-and-the-datadog-agent" >}}Compose et l'Agent Datadog{{< /nextlink >}}
    {{< nextlink href="/containers/guide/docker-deprecation" >}}Abandon de Docker dans Kubernetes{{< /nextlink >}}
    {{< nextlink href="/containers/guide/podman-support-with-docker-integration" >}}Utiliser l'intégration Docker avec le runtime de conteneur Podman{{< /nextlink >}}
    {{< nextlink href="/containers/guide/readonly-root-filesystem" >}}Exécuter l'Agent Datadog avec un système de fichiers racine en lecture seule{{< /nextlink >}}
    {{< nextlink href="/containers/guide/changing_container_registry" >}}Modifier votre registre de conteneurs{{< /nextlink >}}
    {{< nextlink href="/containers/guide/sync_container_images" >}}Synchroniser les images Datadog avec un registre privé{{< /nextlink >}}
    {{< nextlink href="/containers/guide/how-to-import-datadog-resources-into-terraform/" >}}Importer des ressources Datadog dans Terraform{{< /nextlink >}}
    {{< nextlink href="/containers/guide/manage-datadogpodautoscaler-with-terraform/" >}}Gérer DatadogPodAutoscaler avec Terraform{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-cluster-name-detection/" >}}Détection du nom de cluster Kubernetes{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-legacy/" >}}Kubernetes Legacy{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides Autodiscovery :" >}}
    {{< nextlink href="/containers/guide/autodiscovery-with-jmx" >}}Autodiscovery avec JMX{{< /nextlink >}}
    {{< nextlink href="/containers/guide/ad_identifiers" >}}Identifiants de conteneur : appliquer un modèle de fichier de configuration Autodiscovery à un conteneur spécifique{{< /nextlink >}}
    {{< nextlink href="/containers/guide/template_variables" >}}Variables de modèle Autodiscovery : renseigner dynamiquement les paramètres de configuration{{< /nextlink >}}
    {{< nextlink href="/containers/guide/auto_conf" >}}Configuration automatique d'Autodiscovery : configuration de base par défaut pour les intégrations courantes{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-examples" >}}Exemples détaillés de modèles Autodiscovery{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides sur l'Agent de cluster :" >}}
    {{< nextlink href="/containers/guide/cluster_agent_autoscaling_metrics" >}}Autoscaling avec des métriques custom et externes dans l'Agent de cluster{{< /nextlink >}}
    {{< nextlink href="/containers/guide/clustercheckrunners" >}}Cluster Checks Runners{{< /nextlink >}}
    {{< nextlink href="/containers/guide/cluster_agent_disable_admission_controller" >}}Désactiver le contrôleur d'admission Datadog avec l'Agent de cluster{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides sur l'opérateur :" >}}
    {{< nextlink href="/containers/guide/datadogoperator_migration" >}}Migration vers la version 1.0 du Datadog Operator{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-eks-addon" >}}Installer l'Agent Datadog sur Amazon EKS avec le module complémentaire Datadog Operator{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Guides AWS :" >}}
    {{< nextlink href="/containers/guide/aws-batch-ecs-fargate" >}}AWS Batch avec ECS Fargate et l'Agent Datadog{{< /nextlink >}}
{{< /whatsnext >}}