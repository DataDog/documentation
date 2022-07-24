---
aliases:
- /fr/logs/log_configuration/sensitive_data_detection
beta: true
further_reading:
- link: /security/logs/
  tag: Documentation
  text: Sécurité
- link: /logs/explorer/
  tag: Documentation
  text: Log Explorer
- link: https://www.datadoghq.com/blog/sensitive-data-scanner/
  tag: Blog
  text: Créer une stratégie de conformité des données moderne avec la solution scanner
    de données sensibles de Datadog
- link: https://www.datadoghq.com/blog/sensitive-data-management-best-practices/
  tag: Blog
  text: Meilleures pratiques en matière de gestion des données sensibles
kind: documentation
title: Scanner de données sensibles
---

## Présentation

Les données sensibles, telles que les numéros de carte bancaire, les codes bancaires et les clés d'API, sont souvent exposées accidentellement dans les logs d'application et les événements de trace. Cela peut engendrer des risques financiers pour votre organisation et nuire à sa confidentialité.

Les entreprises sont souvent tenues d'identifier, de corriger et d'empêcher toute exposition de ces données au sein de leurs logs afin de respecter les stratégies organisationnelles, les exigences de conformité et les réglementations sectorielles en place, et de protéger leur confidentialité. C'est notamment le cas des sociétés évoluant dans le secteur banquier, dans les services financiers, dans la santé ou encore dans les assurances.

## Scanner de données sensibles

Le scanner de données sensibles est un service de détection de patterns en temps réel que vous pouvez utiliser pour identifier, taguer et éventuellement censurer ou hacher des données sensibles. Les équipes Sécurité et Conformité peuvent implémenter le scanner de données sensibles pour mettre en place une ligne de défense afin d'empêcher les fuites de données et de limiter les risques de non-conformité.

Le scanner de données sensibles est accessible depuis les [paramètres d'organisation][1].

{{< img src="logs/sensitive_data_scanner/sds_main_apr_22.png" alt="Scanner de données sensibles dans les paramètres d'organisation" style="width:90%;">}}

### Configuration

- **Définissez des groupes d'analyse** : un groupe d'analyse est composé d'une requête de filtre définissant les types de logs à analyser, ainsi que d'un ensemble de règles d'analyse indiquant les types de données sensibles à analyser au sein de ces logs. Consultez la section [Syntaxe de recherche de logs][2] pour en savoir plus sur les requêtes de filtre.
- **Définissez des règles d'analyse** : ajoutez à un groupe d'analyse des règles d'analyse prédéfinies depuis la bibliothèque de règles d'analyse Datadog. Vous avez également la possibilité de créer de toutes pièces vos propres règles afin de baser votre analyse sur des patterns d'expressions régulières.

### Règles d'analyse personnalisées

- **Définissez un pattern :** indiquez le pattern d'expression régulière à détecter dans les événements de log. Utilisez des échantillons de données pour vérifier que votre pattern d'expression régulière est valide.
- **Définissez une portée** : indiquez si vous souhaitez analyser l'ensemble de l'événement de log, ou simplement certains attributs de log. Vous pouvez également choisir d'exclure des attributs spécifiques de l'analyse.
- **Ajoutez des tags** : spécifiez les tags à associer aux événements de log qui contiennent des valeurs correspondant au pattern d'expression régulière défini. Datadog vous conseille d'utiliser les tags `sensitive_data` et `sensitive_data_category`. Ces tags peuvent ensuite être utilisés dans les recherches, dashboards et monitors.
- **Traitez les valeurs correspondantes** : vous avez la possibilité de censurer l'intégralité ou une partie des valeurs correspondantes, ou encore de les hacher.  Pour censurer les valeurs, indiquez le texte à afficher à la place des valeurs. Si vous optez pour une censure partielle, spécifiez la position (début/fin) et la longueur (nombre de caractères) de la censure des valeurs correspondantes. Les opérations de censure, de censure partielle et de hachage sont toutes les trois irréversibles.
- **Attribuez un nom à la règle :** fournissez un nom lisible pour la règle.

{{< img src="logs/sensitive_data_scanner/sds_rule_apr_22.png" alt="Une règle personnalisée du scanner de données sensibles" style="width:90%;">}}

### Règles d'analyse prêtes à l'emploi

La bibliothèque de règles d'analyse rassemble un nombre croissant de règles prédéfinies gérées par Datadog. Celles-ci permettent de détecter des patterns courants, comme des adresses e-mails, des numéros de carte bancaire, des clés d'API, des tokens d'autorisation, et plus encore.
{{< img src="logs/sensitive_data_scanner/sds_library_apr_22.png" alt="Bibliothèque de règles d'analyse" style="width:90%;">}}

### Autorisations

Par défaut, les utilisateurs disposant du rôle Admin Datadog sont autorisés à consulter et à définir des règles d'analyse. Pour que d'autres utilisateurs puissent en faire de même, accordez-leur l'autorisation Data Scanner sous **Access Management**. Consultez la [documentation relative au RBAC personnalisé][3] pour en savoir plus sur les rôles et les autorisations.

{{< img src="logs/sensitive_data_scanner/scanner_permission.png" alt="Autorisations pour le scanner de données sensibles" style="width:90%;">}}

### Utiliser des tags avec un RBAC basé sur des requêtes

Contrôlez les utilisateurs pouvant accéder aux événements de log contenant des données sensibles. Utilisez les tags ajoutés par le scanner de données sensibles pour créer des requêtes appliquant une logique RBAC et restreindre l'accès de certaines personnes ou équipes, jusqu'à ce que les données dépassent leur période de rétention.

### Dashboard prêt à l'emploi

Lorsque le scanner de données sensibles est activé, un [dashboard][4] prêt à l'emploi est automatiquement ajouté à votre compte. Il synthétise les découvertes sur les données sensibles.

{{<img src="account_management/sensitive_data_scanner/sdslight.png" alt="Dashboard de synthèse sur le scanner de données sensibles" style="width:70%;">}}

Pour consulter ce dashboard, accédez à **Dashboards > Dashboards List** et cherchez `Sensitive Data Scanner Overview`.

**Remarques :**
- Les règles que vous ajoutez ou modifiez affectent uniquement les données envoyées à Datadog après l'application des règles.
- Le scanner de données sensibles ne modifie en aucun cas les règles que vous définissez directement sur l'Agent Datadog.
- Pour désactiver complètement le scanner de données sensibles, désactivez chaque groupe d'analyse et règle d'analyse en désactivant l'interrupteur en regard de chaque élément.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/logs/guide/logs-rbac-permissions/?tab=ui#overview
[4]: https://app.datadoghq.com/dash/integration/sensitive_data_scanner