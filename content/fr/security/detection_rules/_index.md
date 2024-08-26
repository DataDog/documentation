---
aliases:
- /fr/security_monitoring/detection_rules/
- /fr/cloud_siem/detection_rules/
- /fr/security_platform/detection_rules/
- /fr/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: Documentation
  text: Explorer les règles de détection par défaut
- link: /security/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de sécurité
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: Blog
  text: Détection des abus de fonctionnalité avec Datadog
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: Blog
  text: Détecter les activités de connexion suspectes grâce aux règles de détection
    de voyage impossible
products:
- icon: cloud-security-management
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Règles de détection
---

{{< product-availability >}}

Les règles de détection définissent la logique conditionnelle appliquée à l'ensemble des configurations cloud et des logs ingérés. Lorsque le scénario d'une règle se réalise sur une période donnée, un signal de sécurité est généré. Ces signaux sont accessibles depuis le [Signals Explorer][16].

## Règles de détection prêtes à l'emploi

Datadog fournit des [règles de détection prêtes à l'emploi][1] afin de signaler les attaques et dʼéventuels problèmes de configuration. Lorsque de nouvelles règles de détection sont publiées, elles sont automatiquement importées dans votre compte, dans votre bibliothèque Application Security Management, ainsi que dans l'Agent, selon votre configuration.

Les règles de détection prêtes à l'emploi sont disponibles pour les solutions de sécurité suivantes :

- [Cloud SIEM][2] se sert de la détection des logs pour analyser les logs ingérés en temps réel.
- Cloud Security Management (CSM) :
    - La solution [CSM Misconfigurations][4] exploite des règles de détection de configuration cloud et d'infrastructure pour analyser l'intégrité de votre environnement cloud.
    - La solution [CSM Threats][5] tire profit des règles de détection et de l'Agent Datadog pour surveiller et évaluer de façon active l'activité système.
    - La solution [CSM Identity Risks][14] utilise les règles de détection pour identifier les risques IAM encourus par votre infrastructure cloud.
- [Application Security Management][6] (ASM) tire profit de la solution [APM][7] Datadog, de l'[Agent Datadog][8] et des règles de détection afin d'identifier les menaces à l'encontre de l'environnement de votre application.

## Règle de détection en version bêta

L'équipe de sécurité de Datadog ajoute régulièrement de nouvelles règles de détection prêtes à l'emploi visant à garantir votre sécurité. Bien que chaque règle vise à détecter efficacement les problèmes liés à la publication de nouvelles intégrations et d'autres fonctionnalités, il est nécessaire d'observer les capacités de détection à grande échelle d'une règle avant de la rendre disponible pour tous. Ainsi, l'équipe de sécurité Datadog est à même d'optimiser ou de supprimer les mécanismes de détection qui ne répondent pas aux normes établies.

## Règles de détection personnalisées

Dans certaines situations, il peut être pertinent de personnaliser une règle en fonction de votre environnement ou workload. Par exemple, si vous utilisez la solution ASM, vous pouvez choisir de personnaliser une règle visant à détecter les utilisateurs qui effectuent des opérations sensibles dans une région où votre organisation n'est pas présente.

Pour [créer des règles personnalisées](#creer-des-regles-de-detection), vous pouvez dupliquer des règles par défaut et modifier les doublons, ou créer de toutes pièces vos propres règles.

## Rechercher et filtrer des règles de détection

Pour consulter dans Datadog les règles de détection prêtes à l'emploi et personnalisées, accédez à la page [**Security Settings**][15]. Les règles de chaque solution (Application Security, Cloud Security Management et Cloud SIEM) sont répertoriées sur des pages distinctes.

Pour rechercher et filtrer des règles, utilisez la zone de recherche et les facettes afin de créer une requête basée sur une valeur. Par exemple, pour afficher uniquement les règles d'un certain type, passez votre curseur sur le type de règle, puis sélectionnez `only`. Vous pouvez également appliquer un filtre basé sur des facettes, comme `source` et `severity`, pendant l'analyse et le tri de problèmes en cours.

{{< img src="security/default_detection_rules.png" alt="La page Configuration, avec les règles de détection par défaut et personnalisées de Cloud SIEM" width="100%">}}

## Créer des règles de détection

Pour créer une règle de détection personnalisée, cliquez sur le bouton **New Rule** dans le coin supérieur droit de la page Detection Rules. Vous pouvez également [dupliquer une règle par défaut ou personnalisée](#dupliquer-une-regle) afin de l'utiliser comme modèle.

Pour obtenir des instructions détaillées, consultez la documentation relative aux solutions suivantes :

- [Cloud SIEM][3]
- [ASM][11]
- [CSM Misconfigurations][12]
- [CSM Threats][13]

## Gérer les règles de détection

### Activer ou désactiver des règles

Pour activer ou désactiver une règle, cliquez sur le bouton en regard du nom de la règle.

Vous pouvez également activer ou désactiver plusieurs règles à la fois :

1. Cliquez sur **Select Rules**.
1. Sélectionnez les règles à activer ou désactiver.
1. Cliquez sur le menu déroulant **Edit Rules**.
1. Sélectionnez **Enable Rules** pour activer les règles ou **Disable Rules** pour les désactiver.

### Modifier une règle

Pour les règles de détection prête à l'emploi, il est uniquement possible d'ajouter ou de modifier une requête de suppression. Pour mettre à jour une requête, ajuster des déclencheurs ou gérer les notifications, vous pouvez [dupliquer la règle par défaut](#dupliquer-une-regle) et l'utiliser comme modèle pour créer une règle personnalisée. [Désactivez ensuite la règle par défaut](#activer-ou-desactiver-des-regles).

- Pour modifier une règle par défaut, cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Edit default rule**.
- Pour modifier une règle personnalisée, cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Edit default rule**.

### Dupliquer une règle

Pour dupliquer une règle personnalisée, cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Clone rule**.

La duplication d'une règle vous permet notamment d'apporter de légères modifications à ses paramètres afin de modifier la détection. Par exemple, vous pouvez dupliquer une règle de détection de logs en remplaçant son paramètre **Threshold** par **Anomaly**, afin d'ajouter une nouvelle dimension à la détection des menaces tout en conservant les mêmes requêtes et déclencheurs.

### Supprimer une règle

Pour supprimer une règle personnalisée, cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Delete rule**.

**Remarque** : seules les règles personnalisées peuvent être supprimées. Pour ne plus voir une règle par défaut, vous devez [la désactiver](#activer-ou-desactiver-des-regles).

### Restreindre les autorisations de modification

Par défaut, les utilisateurs disposent d'un accès complet aux règles de détection. Pour limiter les [rôles][10] pouvant modifier une règle spécifique, et ainsi bénéficier d'un contrôle plus granulaire, procédez comme suit :

1. Cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis le menu déroulant, sélectionnez les rôles, équipes ou utilisateurs autorisés à modifier la règle de sécurité.
1. Cliquez sur **Add**.
1. Cliquez sur **Save**.

**Remarque** : afin de toujours pouvoir modifier la règle, vous devez inclure au moins un de vos rôles avant d'enregistrer vos modifications.

Pour rétablir l'accès à une règle, procédez comme suit :

1. Cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

### Visualiser les signaux générés

Pour visualiser les signaux de sécurité d'une règle dans le [Signals Explorer][16], cliquez sur l'icône des trois points verticaux, puis sélectionnez **View generated signals**. Cette fonctionnalité est particulièrement utile pour corréler des signaux avec différentes sources en fonction d'une règle spécifique, ou encore pour procéder à l'audit de plusieurs règles.

### Exporter une règle au format JSON

Pour exporter la copie d'une règle au format JSON, cliquez sur l'icône des trois points verticaux de la règle, puis sélectionnez **Export as JSON**.

## Obsolescence des règles

Des audits de toutes les règles de détection sont régulièrement effectués afin de maintenir un signal de haute fidélité. Les règles obsolètes sont remplacées par une règle améliorée.

Le processus d'obsolescence des règles suit les étapes suivantes : 

1. Un avertissement avec la date d'obsolescence est ajouté à la règle. Cet avertissement s'affiche à différents endroits de l'interface :
    - Dans la section **Rule Details > Playbook** du volet latéral des signaux
    - Dans le volet latéral des problèmes de configuration (CSM Misconfigurations uniquement)
    - Dans l'[éditeur de règle][15] de la règle en question
2. Lorsqu'une règle devient obsolète, elle reste disponible pendant 15 mois avant d'être supprimée, car les signaux sont conservés pendant cette durée. Durant cette période, vous pouvez réactiver la règle en [la dupliquant](#dupliquer-une-regle) dans l'interface.
3. Après que la règle a été supprimée, vous ne pouvez plus la dupliquer ni la réactiver.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/
[2]: /fr/security/cloud_siem/
[3]: /fr/security/cloud_siem/log_detection_rules/
[4]: /fr/security/cloud_security_management/misconfigurations/
[5]: /fr/security/threats/
[6]: /fr/security/application_security/
[7]: /fr/tracing/
[8]: /fr/agent/
[9]: https://app.datadoghq.com/security/configuration/rules
[10]: /fr/account_management/rbac/
[11]: /fr/security/application_security/threats/custom_rules/
[12]: /fr/security/cloud_security_management/misconfigurations/custom_rules
[13]: /fr/security/threats/workload_security_rules?tab=host#create-custom-rules
[14]: /fr/security/cloud_security_management/identity_risks/
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security