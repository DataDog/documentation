---
aliases:
- /fr/security/workload_protection/setup/agent
- /fr/security/workload_protection/supported_linux_distributions
- /fr/security/threats/supported_linux_distributions
description: Activez Workload Protection dans Datadog, puis déployez le Datadog Agent
  sur les charges de travail que vous souhaitez protéger.
disable_toc: false
title: Mise en place de Workload Protection
---
{{< partial name="security-platform/WP-billing-note.html" >}}

Workload Protection collecte l'activité d'exécution via le Datadog Agent. La configuration consiste à activer Workload Protection dans Datadog, puis à déployer l'Agent sur les charges de travail que vous souhaitez protéger.

Une fois l'Agent en cours d'exécution, vous pouvez essayer Workload Protection en toute sécurité à l'aide des scripts de démonstration. Enforcement, qui permet à l'Agent d'agir sur les menaces qu'il détecte, nécessite un accès distinct.

Pour savoir ce qu'il advient de l'activité collectée par l'Agent, consultez [Comment fonctionne Workload Protection][6].

## Prérequis {#requirements}

Workload Protection s'appuie sur le Datadog Agent pour surveiller vos charges de travail et collecter des événements pertinents pour la sécurité afin de détecter les menaces et de surveiller la posture de sécurité.

<div class="alert alert-info">Datadog déconseille d'exécuter Workload Protection sur une organisation ou une sous-organisation pour laquelle Infrastructure Monitoring n'est pas activé.</div>

### Options de l'Agent {#agent-options}

Workload Protection propose 3 variantes différentes en fonction de votre environnement et de votre système d'exploitation :
- Sur **Linux**, installez **l'agent eBPF**. Il offre les meilleures performances et la meilleure prise en charge des fonctionnalités.
- Sur **AWS Fargate**, installez le Datadog Agent en tant que sidecar et instrumentez les charges de travail avec le traceur **cws-instrumentation**. Fargate ne fournissant pas d'accès eBPF, ce traceur utilise ptrace à la place.
- Sur **Windows**, l'agent Workload Protection installe un pilote Windows pour collecter les événements et la télémétrie.

### Prise en charge de Linux {#linux-support}

Sur Linux, vous devez vérifier la version du noyau Linux et la version de la distribution, ainsi que l'environnement cloud sous-jacent (le cas échéant), car certains services de cloud computing empêchent l'accès à eBPF.

#### Distributions Linux prises en charge {#supported-linux-distributions}

| Distributions Linux                                           | Versions prises en charge                    |
|---------------------------------------------------------------|---------------------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04, 24.04 et versions ultérieures |
| Debian                                                        | 10 et versions ultérieures                         |
| Amazon Linux 2                                                | Noyaux 4.14 et versions ultérieures               |
| Amazon Linux 2023                                             | Toutes versions                          |
| SUSE Linux Enterprise Server                                  | 12 et 15                             |
| Red Hat Enterprise Linux                                      | 7, 8 et 9                           |
| Oracle Linux                                                  | 7, 8 et 9                           |
| CentOS                                                        | 7                                     |
| Google Container Optimized OS (par défaut sur GKE)                | 93 et versions ultérieures                         |

**Remarques :**

- Les versions personnalisées du noyau peuvent modifier des points d'ancrage critiques dont l'Agent a besoin pour fonctionner correctement. La prise en charge n'est pas garantie.
- Workload Protection nécessite une version 4.14.0 ou ultérieure du noyau Linux.
- Sur les distributions dotées d'une version de noyau plus ancienne, Workload Protection peut fonctionner si les fonctionnalités eBPF requises ont été rétroportées. Cependant, il fonctionnera en mode dégradé, car certaines fonctionnalités peuvent nécessiter une version de noyau plus récente. Par exemple, CentOS/RHEL 7 utilise le noyau 3.10 avec des fonctionnalités eBPF rétroportées et est pris en charge, mais certaines fonctionnalités, telles que la surveillance réseau, sont désactivées.
- Pour les problèmes de compatibilité avec un plugin réseau Kubernetes personnalisé comme Cilium ou Calico, consultez [Dépannage de Workload Protection][2].

#### Environnements cloud pris en charge {#supported-cloud-environments}

| Environnements cloud                      | Pris en charge |
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (en utilisant le traceur cws-instrumentation)                    |
| Machines virtuelles Azure (VM Azure)      | ✅                    |
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    |

**Remarques :**

- La distribution Linux et la configuration système sous-jacentes utilisées par ces environnements cloud sont les principaux facteurs déterminant si Workload Protection est pris en charge.
- Pour les environnements cloud où vous pouvez choisir la distribution Linux et la version du noyau, sélectionnez une configuration qui répond aux exigences listées ci-dessus.

### Prise en charge de Windows {#windows-support}

L'agent Windows de Workload Protection prend en charge Windows Server 2019 et versions ultérieures.

## Activer Workload Protection dans Datadog {#enable-workload-protection-in-datadog}

Pour commencer avec Workload Protection, vous devez activer le produit Workload Protection dans Datadog. Pour ce faire, connectez-vous à votre compte Datadog et cliquez sur [Commencer][1]. Vous pouvez suivre les étapes de déploiement de l'Agent dans Datadog, ou revenir sur cette page pour plus de détails.

<div class="alert alert-info">L'activation de Workload Protection nécessite l'autorisation <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">Org Management</a>.</div>

## Déployer le Datadog Agent {#deploy-the-datadog-agent}

### Linux {#linux}

Utilisez les instructions suivantes pour activer l'agent eBPF de Workload Protection dans le Datadog Agent.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/kubernetes/" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="/security/workload_protection/setup/docker/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/security/workload_protection/setup/ecs_ec2/" src="integrations_logos/amazon_ecs.png" alt="ECS EC2" >}}
  {{< image-card href="/security/workload_protection/setup/linux_ebpf/" src="integrations_logos/linux.png" alt="Linux eBPF" >}}
{{< /card-grid >}}

### AWS Fargate {#aws-fargate}

Utilisez les instructions suivantes pour configurer le traceur cws-instrumentation de Workload Protection sur AWS Fargate.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/fargate/" src="integrations_logos/amazon_fargate.png" alt="Amazon Fargate" >}}
{{< /card-grid >}}

### Windows {#windows}

Utilisez les instructions suivantes pour activer l'agent Windows de Workload Protection dans le Datadog Agent.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/windows/" src="integrations_logos/windows.png" alt="Windows" >}}
{{< /card-grid >}}

## Étapes suivantes {#next-steps}

Après la configuration, vous pouvez explorer Workload Protection, configurer l'Agent pour votre environnement ou demander l'accès à la réponse automatisée.

### Explorer Workload Protection {#explore-workload-protection}

Datadog propose un environnement de test pour découvrir Workload Protection et apprendre ses fonctionnalités. L'environnement de test propose divers scénarios que vous pouvez exécuter en toute sécurité dans un environnement de test, simulant des menaces et des attaques réelles que Workload Protection peut détecter et contre lesquelles il peut vous protéger. Consultez le [dépôt de l'environnement de test][3] pour commencer.

### Configurez l'Agent {#configure-the-agent}

La [page de configuration avancée de l'Agent][5] décrit comment configurer et ajuster l'Agent pour mieux l'adapter à votre environnement et à vos besoins.

### Activer la réponse automatisée {#enable-automated-response}

<div class="alert alert-danger">Contactez <a href="https://docs.datadoghq.com/help/">le support Datadog</a> pour activer la réponse automatisée.</div>

Une fois que l'accès à la réponse automatisée vous a été accordé, consultez la page [Automated response][4].

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /fr/security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /fr/security/workload_protection/respond_and_report/#automated-response
[5]: /fr/security/workload_protection/setup/advanced_configuration
[6]: /fr/security/workload_protection/#evaluating-activity