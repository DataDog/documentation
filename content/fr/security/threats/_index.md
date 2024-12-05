---
aliases:
- /fr/security_platform/cloud_workload_security/
- /fr/security/cloud_workload_security/
- /fr/security/cloud_workload_security/agent_expressions
- /fr/security/cloud_workload_security/backend/
- /fr/security/threats/security_profiles
- /fr/security/threats/runtime_anomaly_detection
title: Cloud Security Management Threats
---

Cloud Security Management Threats (CSM Threats) permet de surveiller l'activité des fichiers, du réseau et des processus au sein de votre environnement afin de détecter les menaces pour votre infrastructure en temps réel. La fonctionnalité de détection des menaces en temps réel de CSM Threats peut être combinée aux métriques, logs, traces et autres données de télémétrie de la plateforme Datadog pour obtenir une vue d'ensemble complète d'une attaque potentielle ciblant vos workloads.

## Détecter en temps réel les menaces sur vos workloads de production

Surveillez l'activité des fichiers et des processus au niveau du kernel pour détecter les menaces pesant sur votre infrastructure, notamment sur les instances Amazon EC2, les conteneurs Docker et les clusters Kubernetes. Associez CSM Threats à la solution [Network Performance Monitoring][9] afin de détecter les activités suspectes au niveau du réseau avant qu'un workload ne soit compromis.

CSM Threats tire parti de l'Agent Datadog pour surveiller votre environnement. Si vous ne l'avez pas encore fait, [commencez par configurer l'Agent Datadog][2] sur un [système d'exploitation compatible][1]. Dans le cadre de la solution CSM Threats, l'Agent Datadog procède à quatre types de surveillance :

1. **Surveillance de l'exécution des processus** : analyse l'exécution des processus afin de détecter en temps réel les activités malveillantes sur vos hosts et conteneurs.
2. **Surveillance de l'intégrité des fichiers** : analyse en temps en réel les modifications apportées à certains fichiers et répertoires essentiels sur vos hosts et conteneurs.
3. **Surveillance de l'activité DNS** : analyse le trafic réseau afin de détecter en temps réel les activités malveillantes sur vos hosts et conteneurs.
4. **Surveillance de l'activité du kernel** : analyse en temps réel les attaques au niveau du kernel, comme les hijacking de processus, le breakout de conteneurs, etc.

{{< img src="security/csm/csm_overview_2.png" alt="La section Security Inbox de la vue d'ensemble de Cloud Security Management, avec la liste des problèmes de sécurité à résoudre triés par importance" width="100%">}}

## Gérer les règles de détection prêtes à l'emploi et personnalisées

CSM Threats intègre plus de 50 règles de détection prêtes à l'emploi qui sont mises à jour par une équipe d'experts en sécurité. Les règles détectent les risques majeurs afin que vous puissiez immédiatement prendre les mesures adéquates. Le règles d'expression de l'Agent définissent les activités de workload devant être analysées, tandis que les règles de détection backend analysent les activités et identifient les techniques d'attaque ainsi que d'autres comportements à risque.

Utilisez la [configuration à distance][7] pour déployer automatiquement les nouvelles règles et celles mises à jour dans l'Agent. [Personnalisez les règles][5] en définissant la manière dont chaque règle surveille l'activité des processus, du réseau et des fichiers, [créez des règles sur mesure][6] et [configurez des notifications en temps réel](#configurer-des-notifications-en-temps-reel) 

{{< img src="security/cws/threats_detection_rules.png" alt="Règles de détection de CSM Threats das l'application Datadog" width="100%">}}

## Configurer des notifications en temps réel

[Envoyez des notifications en temps réel][3] lorsqu'une menace est détectée dans votre environnement de manière à ce que vos équipes puissent prendre les mesures adéquates pour réduire les risques. Les notifications peuvent être envoyées sur les canaux suivants : [Slack, adresse e-mail, PagerDuty, webhooks et plus encore][4].

Utilisez des template variables et le format Markdown pour [personnaliser le message des notifications][5]. Modifiez, désactivez et supprimez des règles de notification existantes, ou créez de nouvelles règles et définissez une logique personnalisée pour le déclenchement de notifications en fonction du degré de gravité et du type de règle.

## Étudier les signaux de sécurité et résoudre les problèmes associés

Étudiez les signaux de sécurité et triez-les dans le [Signals Explorer][8]. Consultez des informations détaillées sur les fichiers ou processus affectés, visualisez les signaux et logs associés, et découvrez les étapes de remédiation.

{{< img src="security/cws/signals_explorer.png" alt="Page Signals Explorer de CSM" width="100%">}}

## Prise en main

{{< whatsnext >}}
  {{< nextlink href="/security/threats/setup">}}Configurer Cloud Security Management{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Autorisations des rôles Datadog pour CSM Threats{{< /nextlink >}}
  {{< nextlink href="/security/threats/workload_security_rules">}}En savoir plus sur les règles de détection de CSM Threats{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}Commencer à utiliser les règles de détection prêtes à l'emploi de CSM Threats{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Débuter avec Cloud Security Management{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security/threats/setup/?tab=kuberneteshelm#prerequisites
[2]: /fr/agent/
[3]: /fr/security/notifications/
[4]: /fr/security/notifications/#notification-channels
[5]: /fr/security/notifications/#detection-rule-notifications
[6]: /fr/security/threats/agent_expressions
[7]: /fr/security/threats/setup
[8]: /fr/security/threats/security_signals
[9]: /fr/network_monitoring/performance/