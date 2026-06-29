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
- link: /security/automation_pipelines/mute
  tag: Documentation
  text: Règles de mise en sourdine
- link: /security/automation_pipelines/security_inbox
  tag: Documentation
  text: Ajouter des règles à Security Inbox
- link: /security/automation_pipelines/set_due_date
  tag: Documentation
  text: Fixer des règles pour les dates d'échéance
title: Pipelines d'automatisation des détections
---

Automation Pipelines vous permet de configurer des règles automatiques pour les nouvelles détections, accélérant ainsi les efforts de tri et de remédiation à grande échelle.

## Disponibilité

Automation Pipelines est disponible pour :

- Mauvaises configurations
- Les chemins d'attaque
- Les risques liés aux identités
- Vulnérabilités
- Les vulnérabilités du code de l'application
- Les vulnérabilités des bibliothèques de l'application
- Les vulnérabilités des images de conteneur
- Les détections de sécurité liées aux API
- La vulnérabilité des hosts

## Fonctionnement

Automation Pipelines fonctionne selon un système basé sur des règles qui vous permet d'automatiser la gestion des nouvelles détections. Voici son mode de fonctionnement :

- **Configuration des règles** : chaque règle se compose de plusieurs critères, conçus pour filtrer les détections selon des attributs spécifiques. Dans une règle, les critères sont combinés selon un opérateur logique AND. Cependant, si un critère comprend plusieurs valeurs, celles-ci sont interprétées comme un opérateur logique OR. Cette structure vous offre la flexibilité nécessaire pour créer des règles parfaitement adaptées à vos besoins.
- **Évaluation des règles** : Automation Pipelines évalue les détections en fonction des règles, dans l'ordre dans lequel vous les avez définies. Chaque détection est traitée en parcourant la liste jusqu'à ce qu'une règle corresponde, déclenchant alors l'action spécifiée, comme la mise en sourdine des problèmes non urgents ou la mise en évidence des menaces critiques. Les règles Automation Pipelines s'appliquent immédiatement aux nouvelles détections. Pour les détections existantes, la mise à jour peut prendre jusqu'à deux heures.

## Cas d'utilisation

### Mettre en sourdine les détections non urgentes pour se concentrer sur l'essentiel

Réduisez la fatigue liée aux alertes et hiérarchisez les menaces critiques en mettant automatiquement en sourdine les détections non urgentes. Cela vous permet :

- **D'ignorer automatiquement les problèmes à faible priorité** : mettez en sourdine les faux positifs connus, les risques acceptés et autres détections ne nécessitant pas d'action immédiate. Aucun examen manuel n'est nécessaire.
- **De donner la priorité aux véritables menaces** : concentrez-vous sur les alertes à fort impact nécessitant une enquête et une remédiation.
- **De désencombrer votre flux d'alertes** : éliminez le bruit généré par les faux positifs, les ressources non critiques, les environnements de test ou de préproduction, et les ressources éphémères qui déclenchent des alertes sans présenter de risque durable.

### Personnaliser Security Inbox pour mettre en avant ce qui est important pour votre organisation

Personnalisez Security Inbox en définissant des conditions spécifiques qui déterminent les problèmes de sécurité à mettre en avant. Cela vous permet :

- **De faire remonter les problèmes non capturés par défaut** : mettez en évidence les problèmes qui pourraient passer inaperçus avec les règles de détection standard ou personnalisées, afin de ne manquer aucun problème critique.
- **De renforcer la conformité et adresser les préoccupations clés** : ciblez les problèmes ayant un impact sur la conformité réglementaire ou sur des systèmes métier critiques, quelle que soit leur sévérité.
- **De prioriser les risques actuels** : concentrez-vous sur les menaces immédiates, comme les risques d'identité après un incident ou les détections critiques au niveau sectoriel.

### Définir des dates d'échéance pour les détections afin de respecter vos SLA de sécurité

Attribuez des échéances de remédiation aux détections pour améliorer la responsabilisation et garantir le respect de vos politiques de sécurité. Cela vous permet :

- **D'assurer une conformité intégrée** : appliquez automatiquement des dates d'échéance conformes aux normes du secteur, telles que FedRAMP, PCI, et d'autres.
- **De renforcer la responsabilisation entre les équipes** : utilisez les SLA pour garantir une remédiation rapide sans relances constantes, en définissant clairement les attentes pour les équipes de sécurité et d'ingénierie.
- **De favoriser une gestion proactive des risques** : encouragez des délais de réponse plus courts et réduisez l'exposition en utilisant les SLA pour hiérarchiser et suivre les efforts de remédiation.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}