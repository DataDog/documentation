---
aliases:
- /fr/security_platform/cloud_workload_security/
- /fr/security/cloud_workload_security/
- /fr/security/cloud_workload_security/agent_expressions
- /fr/security/cloud_workload_security/backend/
- /fr/security/threats/security_profiles
- /fr/security/threats/runtime_anomaly_detection
- /fr/security/threats/
- /fr/security/threats/agent
- /fr/security/workload_protection/agent
cascade:
- _target:
    path: /security/workload_protection/backend_linux
  aliases:
  - /security/threats/backend_linux
- _target:
    path: /security/workload_protection/backend_windows
  aliases:
  - /security/threats/backend_windows
- _target:
    path: /security/workload_protection/linux_expressions
  aliases:
  - /security/threats/linux_expressions
- _target:
    path: /security/workload_protection/windows_expressions
  aliases:
  - /security/threats/windows_expressions
description: Détectez et répondez aux menaces à l'exécution sur vos hosts, conteneurs
  et charges de travail serverless avec Datadog Workload Protection.
further_reading:
- link: https://www.datadoghq.com/blog/workload-protection-investigation/
  tag: Blog
  text: Transformez des signaux d'exécution fragmentés en scénarios d'attaque cohérents
    avec Datadog Workload Protection
- link: https://www.datadoghq.com/blog/workload-protection-findings
  tag: Blog
  text: Identifiez et corrigez les problèmes de posture à l'exécution avec Workload
    Protection Findings
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: Centre d'apprentissage
  text: Détectez les compromissions de hosts et de conteneurs avec Workload Protection
- link: https://learn.datadoghq.com/courses/workload-protection-enable-manage
  tag: Centre d'apprentissage
  text: Activez et gérez Workload Protection
title: Workload Protection
---
Datadog Workload Protection offre une visibilité et une défense en temps réel pour votre infrastructure en surveillant en continu l'activité des fichiers, du réseau et des processus dans vos environnements. Il détecte les menaces au moment où elles surviennent, générant des signaux de sécurité et des constatations. Utilisez-les pour identifier, enquêter et arrêter les comportements malveillants avant qu'ils n'impactent vos charges de travail.

Workload Protection fait partie de la plateforme Datadog Security. Les signaux sont corrélés avec les analyses de mauvaise configuration, les évaluations de vulnérabilité et les constatations de sécurité du code, afin que vous puissiez lier les attaques à l'exécution aux faiblesses préexistantes. Comme il s'exécute sur la plateforme Datadog, il se connecte également à vos métriques, traces et logs d'infrastructure. Ce contexte vous aide à comprendre la portée d'une menace et à reconstituer le scénario de l'attaque.

## Au-delà de la détection des menaces à l'exécution {#beyond-runtime-threat-detection}

Workload Protection ne se limite pas à la détection des menaces à l'exécution. De nombreuses organisations l'utilisent dans divers cas d'utilisation opérationnels et de sécurité :

- **Validation de la conformité :** Workload Protection vous aide à valider la conformité avec des cadres réglementaires tels que PCI, FedRAMP et SOC 2 en surveillant en continu l'activité à l'exécution pour détecter les violations de politiques, les configurations risquées et les changements non autorisés.

- **Posture de sécurité à l'exécution :** Workload Protection améliore votre posture de sécurité en identifiant les pratiques d'exécution non sécurisées et les dérives de configuration sensibles, vous aidant à détecter les faiblesses avant qu'elles ne puissent être exploitées.

- **Surveillance de l'infrastructure :** Workload Protection suit tout type de comportement à l'exécution, qu'il soit lié à la sécurité ou non. Du débogage de charges de travail personnalisées à la surveillance des processus au niveau du système et des sessions utilisateur à distance, il offre une visibilité en temps réel sur le fonctionnement de vos environnements.

{{< img src="security/workload_protection/k8s_remote_access.png" alt="Répartition des sessions utilisateur à distance Kubernetes" width="100%">}}

## Fonctionnement {#how-it-works}

Workload Protection évalue l'activité qu'il collecte à deux endroits : sur le Datadog Agent et dans Datadog.

### Économiser les ressources par conception {#saving-resources-by-design}

Les règles de détection de Workload Protection sont complexes et corrèlent plusieurs points de données dans le temps et entre les processus. Cette complexité entraînerait des demandes de ressources de calcul considérables sur le host de l'Agent si toutes les règles y étaient évaluées.

Datadog résout ce problème en maintenant l'Agent léger grâce à des règles efficaces qui filtrent les activités non pertinentes pour la sécurité de vos charges de travail et en traitant l'activité restante à l'aide de règles de détection des menaces et de recherche sur le backend Datadog. Les règles de l'Agent sont organisées en [politiques][14], que vous déployez avec {{< tooltip glossary="Remote Configuration" case="title" >}} ou manuellement. Vous pouvez gérer les règles et les politiques dans Datadog, dans les fichiers de configuration de l'Agent ou avec le fournisseur Terraform Datadog.

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Vue d'ensemble de l'architecture de Workload Protection" width="100%">}}

### Collecte de l'activité d'exécution {#collecting-runtime-activity}

Le Datadog Agent collecte l'activité d'exécution de vos charges de travail. Le mécanisme de collecte dépend de la plateforme :

- **Linux** : l'Agent eBPF, qui offre la prise en charge des fonctionnalités la plus étendue.
- **AWS Fargate** : le traceur cws-instrumentation. Fargate ne fournissant pas d'accès eBPF, cet Agent utilise ptrace à la place. Il couvre les principales fonctionnalités de Workload Protection, notamment la surveillance de l'intégrité des fichiers et la surveillance de l'exécution des processus.
- **Windows** : un pilote Windows.

Sur Linux et Windows, Workload Protection couvre plus de 40 types d'événements, englobant l'activité des processus, du système de fichiers, du noyau et du réseau. Pour connaître les distributions, les versions et les environnements cloud pris en charge par chaque Agent, consultez [Setup][1].

### Évaluation de l'activité {#evaluating-activity}

Les règles de l'Agent effectuent un filtrage léger afin de s'exécuter efficacement sur chaque host. Datadog évalue les corrélations les plus complexes dans le temps et les processus :

1. Les [règles d'agent][6] évaluent l'activité du système sur le host de l'Agent.
2. Lorsqu'une activité correspond à une expression de règle d'agent, l'Agent génère un [événement d'agent][7] et le transmet à Datadog.
3. Datadog évalue les événements d'agent par rapport aux [règles de détection][8] et aux [règles de constatation][9].
4. Si une règle de détection correspond, un signal est généré et affiché dans [Signaux][10]. Si un attribut d'événement d'agent correspond à un [indicateur de cybermenace][13], l'indicateur correspondant est également affiché.
5. Si une règle de constatation correspond, une constatation est générée et affichée dans [Constatations][11].
6. Toutes les [règles de notification][12] correspondant à la gravité, au type de règle, aux tags et aux attributs du signal sont déclenchées.

Workload Protection est fourni avec plus de 350 règles d'agent et 200 règles de détection, couvrant la plupart des tactiques et techniques MITRE ATT&CK. Vous pouvez également écrire les vôtres, y compris des machines à états intégrées à l'Agent qui alertent uniquement sur des indicateurs de compromission complexes.

### Répondre aux menaces {#responding-to-threats}

Les actions de réponse s'exécutent dans l'Agent. L'Agent peut terminer un processus ou un conteneur, ou bloquer le trafic réseau à l'aide d'un filtre basé sur eBPF. Vous pouvez déclencher ces actions de deux manières :

- **La réponse automatisée** associe une action à une règle d'agent, de sorte que l'Agent agit dès que la règle correspond.
- **La réponse manuelle** vous permet d'agir à partir d'un signal une fois qu'il est généré.

Les deux nécessitent que l'application des règles soit activée dans l'Agent. Voir [Répondre aux menaces][4].

Vous pouvez également répondre depuis Datadog au lieu de l'Agent. Déclenchez un [workflow][15] à partir d'un signal, ou intégrez les signaux à vos pipelines de réponse existants. Consultez [Signal actions][16].

## Étapes suivantes {#next-steps}

### Configuration {#setup}

Commencez par le guide [Setup][1]. Il couvre les environnements pris en charge, la manière de déployer l'Agent et comment expérimenter les fonctionnalités de Workload Protection à l'aide des scripts d'expérimentation.

### Détecter et surveiller {#detect-and-monitor}

Lisez les pages [Detect and Monitor][2] pour comprendre comment les événements de l'agent se traduisent en signaux et constatations Workload Protection. Ces pages vous aident à explorer les détections intégrées (OOTB) et à créer votre propre logique de détection.

### Enquêter et trier {#investigate-and-triage}

Consultez les pages [Investigate and Triage][3] pour découvrir les Explorers et les vues intégrées disponibles dans Workload Protection. Ces pages vous aident à tirer le meilleur parti des événements, signaux et constatations générés par la plateforme.

### Répondre aux menaces {#respond-to-threats}

La page [Respond to Threats][4] explique comment configurer une réponse automatisée et manuelle. Elle couvre les exigences d'application de l'Agent, les actions de réponse disponibles et la manière d'interpréter leurs résultats.

### Couverture {#coverage}

Utilisez [Coverage][5] pour obtenir une vue unifiée et en temps réel de la posture de Workload Protection sur les hosts, les conteneurs et les charges de travail serverless. Identifiez les problèmes de déploiement de politiques, les actifs non protégés et les lacunes de détection avant qu'ils ne deviennent des risques exploitables.

### Guides {#guides}

{{< whatsnext desc="Exemples basés sur des cas d'utilisation pour vous aider à découvrir et à en apprendre davantage sur Workload Protection :" >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Bonnes pratiques pour le réglage des signaux de sécurité de Workload Protection{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/security/workload_protection/setup
[2]: /fr/security/workload_protection/detect_and_monitor
[3]: /fr/security/workload_protection/investigate_and_triage
[4]: /fr/security/workload_protection/respond_and_report
[5]: /fr/security/workload_protection/inventory
[6]: /fr/security/workload_protection/detect_and_monitor/agent_rules
[7]: /fr/security/workload_protection/investigate_and_triage/agent_events
[8]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[9]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[10]: /fr/security/workload_protection/investigate_and_triage/security_signals
[11]: /fr/security/workload_protection/investigate_and_triage/security_findings
[12]: /fr/security/notifications/rules
[13]: /fr/security/workload_protection/detect_and_monitor/threat_intelligence
[14]: /fr/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[15]: /fr/actions/workflows/
[16]: /fr/security/workload_protection/investigate_and_triage/security_signals/actions