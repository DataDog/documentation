---
algolia:
  tags:
  - automation pipelines
  - findings automation
  - findings pipelines
  - finding automation
aliases:
- /fr/security/vulnerability_pipeline
further_reading:
- link: /security/automation_pipelines/modify_severity
  tag: Documentation
  text: Règles de modification de la gravité
- link: /security/automation_pipelines/mute
  tag: Documentation
  text: Règles de mise en sourdine
- link: /security/automation_pipelines/set_due_date
  tag: Documentation
  text: Fixer des règles pour les dates d'échéance
- link: /security/automation_pipelines/security_inbox
  tag: Documentation
  text: Ajouter des règles à Security Inbox
- link: /security/automation_pipelines/create_ticket
  tag: Documentation
  text: Règles de création de tickets
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Empêchez les erreurs de configuration cloud d'atteindre la production avec
    Datadog IaC Security.
title: Pipelines d'automatisation des détections
---
Automation Pipelines vous permet de configurer des règles automatiques pour les nouvelles détections, accélérant ainsi les efforts de tri et de remédiation à grande échelle.

## Disponibilité {#availability}

Automation Pipelines est disponible pour :

- Vulnérabilités du code à l'exécution
- Vulnérabilités du code statique
- Vulnérabilités des bibliothèques
- Secrets
- Infrastructure en tant que code
- Vulnérabilités des images de conteneur
- Vulnérabilités des hosts
- Mauvaises configurations
- Chemins d'attaque
- Risques liés à l'identité
- Sécurité des API
- Activité de la charge de travail

## Fonctionnement {#how-it-works}

Automation Pipelines fonctionne via un système basé sur des règles qui vous permet d'automatiser la gestion des nouvelles constatations. Voici comment cela fonctionne :

- **Configuration des règles** : Chaque règle se compose de plusieurs critères, conçus pour filtrer les constatations en fonction d'attributs spécifiques. Au sein d'une règle, la combinaison de ces critères fonctionne comme un ET logique ; cependant, si des critères incluent plusieurs valeurs, ces valeurs fonctionnent comme un OU logique. Cette structure vous donne la flexibilité de créer des règles qui ciblent précisément vos besoins.
- **Correspondance des règles** : Automation Pipelines évalue les constatations par rapport à vos règles dans l'ordre où vous les avez listées. À mesure que chaque constatation est traitée, Automation Pipelines parcourt la liste jusqu'à ce qu'il trouve une règle correspondante, moment auquel l'action spécifiée — telle que la mise en sourdine des problèmes non urgents ou la mise en évidence des menaces critiques — est déclenchée. Les règles des pipelines d'automatisation s'appliquent immédiatement aux nouvelles constatations. Pour les constatations existantes, les mises à jour peuvent prendre jusqu'à deux heures.

## Cas d'utilisation {#use-cases}

### Ajustez la gravité des constatations pour refléter votre contexte métier {#adjust-finding-severities-to-reflect-your-business-context}

Remplacez la gravité par défaut des constatations pour correspondre au profil de risque de votre organisation. Cela vous permet de :

- **Déclasser les constatations à faible risque** : Réduisez la gravité des constatations sur des environnements isolés, qui présentent un risque réel limité.
- **Surclasser les cibles à haute valeur** : Augmentez la gravité des constatations sur les systèmes critiques, tels que les bases de données contenant des informations personnellement identifiables ou les services ayant des exigences de conformité élevées.
- **Calibrez la gravité selon les priorités de votre organisation** : Établissez des normes de gravité cohérentes pour refléter les priorités de votre organisation, plutôt que de vous fier uniquement à la notation prête à l'emploi.

### Mettez en sourdine les constatations non urgentes pour vous concentrer sur ce qui compte {#mute-non-urgent-findings-to-focus-on-what-matters}

Réduisez la fatigue liée aux alertes et priorisez les menaces critiques en mettant automatiquement en sourdine les constatations non urgentes. Cela vous permet de :

- **Ignorez automatiquement les constatations de faible priorité** : Supprimez les faux positifs connus, les risques acceptés et autres constatations qui ne nécessitent pas d'action immédiate. Aucun examen manuel n'est nécessaire.
- **Priorisez les menaces réelles** : Maintenez votre attention sur les alertes à fort impact qui nécessitent une enquête et une remédiation.
- **Désencombrez votre flux d'alertes** : Éliminez le bruit provenant des faux positifs, des ressources non critiques, des environnements de test ou de pré-production, et des ressources éphémères qui déclenchent des alertes mais ne présentent aucun risque à long terme.

### Définissez des dates d'échéance pour les constatations afin de les aligner sur vos SLA de sécurité {#set-due-dates-for-findings-to-align-with-your-security-slas}

Attribuez des délais de remédiation aux constatations pour améliorer la responsabilité et rester conforme à vos politiques de sécurité. Cela vous permet de :

- **Restez conforme par conception** : Appliquez automatiquement des dates d'échéance conformes aux normes du secteur, telles que FedRAMP, PCI, et autres.
- **Responsabilisez les équipes** : Utilisez les SLA pour garantir une remédiation rapide sans suivi constant, en donnant à la sécurité et à l'ingénierie des attentes claires.
- **Promouvez une gestion proactive des risques** : Encouragez des temps de réponse plus rapides et réduisez l'exposition en utilisant les SLA pour prioriser et suivre les efforts de remédiation.

### Personnalisez la boîte de réception Security pour mettre en évidence ce qui est important pour votre organisation {#customize-the-security-inbox-to-highlight-whats-important-to-your-organization}

Datadog fournit un ensemble de règles de boîte de réception par défaut qui alimentent la boîte de réception Security. Vous pouvez examiner ces règles, désactiver celles qui ne correspondent pas à votre organisation et ajouter vos propres règles qui définissent les constatations mises en évidence. Cela vous permet de :

- **Faites remonter les constatations non capturées par défaut** : Utilisez des règles personnalisées pour mettre en évidence les constatations que les règles par défaut ne détectent pas, afin de garantir que les constatations critiques ne soient pas négligées.
- **Renforcer la conformité et traiter les préoccupations clés du système** : Traitez les préoccupations affectant la conformité réglementaire ou les systèmes commerciaux importants, quelle que soit leur gravité.
- **Priorisez les risques actuels** : Concentrez-vous sur les menaces immédiates, telles que les risques d'identité après un incident ou les constatations à l'échelle de l'industrie.

### Créez automatiquement des tickets pour acheminer les constatations vers les workflows d'ingénierie {#automatically-create-tickets-to-route-findings-into-engineering-workflows}

Acheminez directement les constatations de sécurité vers Jira ou Case Management dès qu'elles sont découvertes. Cela vous permet de :

- **Éliminez le triage manuel** : Générez automatiquement des tickets pour les constatations qui correspondent à vos critères, supprimant ainsi le besoin pour les équipes de sécurité de créer des tickets manuellement.
- **Intégrez aux workflows d'ingénierie existants** : rejoignez les équipes d'ingénierie là où elles travaillent déjà en acheminant le travail de sécurité vers les mêmes outils qu'elles utilisent pour d'autres tâches.
- **Réduisez le temps de remédiation** : Intégrez les constatations dans les files d'attente d'ingénierie immédiatement après leur détection, éliminant ainsi le délai entre la découverte et l'attribution.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}