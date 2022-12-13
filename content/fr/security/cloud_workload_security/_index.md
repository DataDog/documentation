---
title: Cloud Workload Security
kind: documentation
---
## Présentation

La solution Workload Security de Datadog détecte en temps réel les menaces pesant sur vos workloads de production. Elle vous permet de surveiller l'activité des fichiers et des processus dans l'ensemble de votre environnement afin d'identifier en temps réel les menaces ciblant votre infrastructure, notamment vos instances AWS EC2, conteneurs Docker ou clusters Kubernetes, au niveau du kernel. Utilisez la fonctionnalité **File Integrity Monitoring (FIM)** pour visualiser les modifications apportées aux fichiers et répertoires clés, et la fonctionnalité **Process Execution Monitoring** pour surveiller l'exécution des processus afin d'identifier les activités suspectes, malveillantes ou anormales.

{{< img src="security_platform/cws/workload_security_rules.png" alt="Règles Cloud Workload Security dans l'application Datadog" width="100%">}}

La solution Workload Security repose sur l'Agent Datadog. Si vous utilisez déjà Datadog pour surveiller votre environnement, vous n'avez donc pas besoin d'ajouter de nouvelles ressources ni d'intégrer de nouveaux agents. Si vous n'avez pas encore configuré l'Agent Datadog, [commencez par suivre ces étapes][1]. Avec la plateforme Datadog, vous pouvez associer les fonctionnalités de détection en temps réel des menaces aux métriques, logs, traces et autres données de télémétrie, afin de visualiser tout le contexte associé à une attaque potentielle ciblant vos workloads.

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_workload_security/getting_started">}}Configuration complète de Cloud Workload Security{{< /nextlink >}}
  {{< nextlink href="/security_platform/cloud_workload_security/workload_security_rules">}}En savoir plus sur les règles Cloud Workload Security{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-workload-security">}}Commencer à utiliser des règles Cloud Workload Security prédéfinies{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/agent/