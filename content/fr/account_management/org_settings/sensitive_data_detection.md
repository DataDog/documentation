---
title: Scanner de données sensibles
kind: documentation
beta: true
aliases:
  - /fr/logs/log_configuration/sensitive_data_detection
further_reading:
  - link: /security/logs/
    tag: Documentation
    text: Sécurité
  - link: /logs/explorer/
    tag: Documentation
    text: Log Explorer
  - link: https://www.datadoghq.com/blog/sensitive-data-scanner/
    tag: Blog
    text: Créer une stratégie de conformité des données moderne avec la solution scanner de données sensibles de Datadog
---
## Présentation

Les données sensibles, telles que les numéros de carte bancaire, les codes bancaires, les clés d'API ou encore les tokens OAuth, sont souvent exposées accidentellement dans les logs d'application et les événements de trace. Cela peut engendrer des risques financiers pour votre organisation et nuire à sa confidentialité.

Les entreprises sont souvent tenues d'identifier, de corriger et d'empêcher toute exposition de ces données au sein de leurs logs afin de respecter les stratégies organisationnelles, les exigences de conformité et les réglementations sectorielles en place et de protéger leur confidentialité. C'est notamment le cas des sociétés évoluant dans le secteur banquier, les services financiers, la santé ou encore le domaine des assurances.

## Scanner de données sensibles

Le scanner de données sensibles est un service de détection d'expressions en temps réel que vous pouvez utiliser pour identifier, taguer et éventuellement censurer ou hacher des données sensibles. Cette implémentation permet à vos équipes de conformité et de sécurité de mettre en place une ligne de défense contre les fuites de données sensibles en dehors de votre organisation.

Le scanner de données sensibles est disponible dans les [paramètres d'organisation][1]. La bibliothèque du scanner comprend un large éventail de règles pour les expressions couramment détectées, comme les adresses e-mail, les numéros de carte bancaire, les clés d'API, les tokens d'autorisation, etc.

{{< img src="logs/sensitive_data_scanner/sensitive_data_scanner3.png" alt="Scanner de données sensibles dans les paramètres d'organisation" style="width:90%;">}}

### Configurer des groupes d'analyse

- **Définissez des groupes d'analyse :** personnalisez les critères de détection des données à l'aide de pipelines. Définissez une requête pour déterminer les logs à inclure dans le contexte de la règle. Consultez la section [Syntaxe de recherche de logs][2] pour découvrir la syntaxe à utiliser pour effectuer des recherches.
- **Définissez une règle d'analyse :** créez une règle à l'aide d'expressions régulières prédéfinies provenant de la bibliothèque du scanner Datadog ou créez une règle personnalisée.

### Règles personnalisées

- **Définissez une règle :** indiquez l'expression régulière à détecter dans les événements de log. Utilisez des échantillons de données pour vérifier que votre expression régulière est valide.
- **Définissez un contexte :** indiquez si vous souhaitez analyser l'ensemble de l'événement de log, ou simplement certains attributs de log. Vous pouvez également choisir d'exclure des attributs spécifiques de l'analyse.
- **Ajoutez des tags :** spécifiez les tags à associer aux événements de log qui contiennent des valeurs correspondant à l'expression régulière définie. Datadog vous conseille d'utiliser le tag `sensitive_data`. Ces tags peuvent ensuite être utilisés dans les recherches, dashboards et monitors.
- **Effectuez des opérations sur les valeurs correspondantes :** (facultatif) vous pouvez censurer ou hacher les valeurs correspondantes. Si vous choisissez de les censurer, indiquez le texte fictif à insérer à la place des valeurs. Ces dernières peuvent ainsi être censurées ou hachées avant leur stockage dans Datadog ou leur envoi à votre archive.
- **Attribuez un nom à la règle :** fournissez un nom lisible pour la règle.

{{< img src="logs/sensitive_data_scanner/scanner_custom_rule2.png" alt="Une règle personnalisée du scanner de données sensibles" style="width:90%;">}}

### Bibliothèque du scanner

Sélectionnez la règle de votre choix dans la bibliothèque du scanner et cliquez sur **Add** pour commencer à la personnaliser.
{{< img src="logs/sensitive_data_scanner/scanner_library.png" alt="Bibliothèque du scanner"  style="width:90%;">}}

### Autorisations

Par défaut, les utilisateurs disposant du rôle Admin Datadog sont autorisés à consulter et à définir des règles d'analyse. Pour que d'autres utilisateurs puissent en faire de même, accordez-leur l'autorisation Data Scanner sous **Access Management**. Consultez la [documentation relative au RBAC personnalisé][3] pour en savoir plus sur les rôles et les autorisations.

{{< img src="logs/sensitive_data_scanner/scanner_permission.png" alt="Autorisations pour le scanner de données sensibles" style="width:90%;">}}

### Utiliser des tags avec un RBAC basé sur des requêtes

Contrôlez les utilisateurs pouvant accéder aux événements de log contenant des données sensibles. Utilisez les tags ajoutés par le scanner de données sensibles pour créer des requêtes appliquant une logique RBAC et restreindre l'accès de certaines personnes ou équipes, jusqu'à ce que les données dépassent leur période de rétention.

**Remarques :**
- Les règles que vous ajoutez ou modifiez affectent uniquement les données envoyées à Datadog après l'application des règles.
- Le scanner de données sensibles ne modifie en aucun cas les règles que vous définissez directement sur l'Agent Datadog.
- Le nettoyage et le hachage d'attributs dans les événements de log sont irréversibles. Testez vos règles sur un échantillon de données avant de les activer sur des données de production.
- Pour désactiver complètement le scanner de données sensibles, désactivez chaque groupe d'analyse et règle d'analyse en désactivant l'interrupteur en regard de chaque élément.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[2]: /fr/logs/explorer/search_syntax/
[3]: /fr/logs/guide/logs-rbac-permissions/?tab=ui#overview