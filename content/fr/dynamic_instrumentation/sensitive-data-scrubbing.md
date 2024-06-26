---
further_reading:
- link: /dynamic_instrumentation/enabling/
  tag: Documentation
  text: Configurer l'instrumentation dynamique
- link: /sensitive_data_scanner/
  tag: Documentation
  text: Scanner de données sensibles
kind: documentation
title: Nettoyage de données sensibles pour l'instrumentation dynamique
---

## Présentation

L'instrumentation dynamique de Datadog améliore les fonctionnalités d'observabilité et de debugging de vos applications, grâce à la collecte de données de variables à des emplacements de code arbitraires dans les environnements de production. Cette fonctionnalité vous permet également de créer et d'évaluer des expressions en temps réel, et d'intégrer leurs sorties à des messages de log ou de les ajouter en tant que tags de span.

Si l'instrumentation dynamique est particulièrement puissante, elle présente tout de même un risque de fuite, intentionnelle ou non, de données sensibles. Outre ses fonctionnalités éprouvées de collecte de données des différentes solutions, l'instrumentation dynamique est dotée de mécanismes dédiés à la protection de vos données sensibles.

Ce n'est qu'en comprenant et en configurant correctement ces mécanismes de censure que vous serez en mesure d'utiliser l'instrumentation dynamique en toute confiance et sécurité.

## Censure basée sur des identifiants

### Comportement par défaut

L'instrumentation dynamique censure automatiquement les valeurs associées à certains identifiants jugés sensibles, comme `password` et `accessToken`. Consultez [la liste complète des identifiants censurés][1].

### Censure personnalisée des identifiants

Vous pouvez également personnaliser la censure en spécifiant des identifiants supplémentaires. Dans l'environnement de votre application (et non pas dans `datadog-agent`), définissez la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` sur une liste d'identifiants séparés par des virgules, tels que `firstName,lastName,phoneNumber`.

La censure s'applique de manière universelle, quelle que soit la manière dont l'identifiant est utilisé dans le code (en tant qu'arguments de méthode, de variables locales, d'attributs de classe, de clés de dictionnaire, etc.). Les valeurs associées sont censurées dans votre infrastructure et ne sont pas importées dans Datadog.

## Censure basée sur des classes ou types spécifiques

Certaines classes peuvent intrinsèquement contenir des informations sensibles (une classe `UserCredentials`, par exemple). Toujours dans l'environnement de votre application (et non pas dans `datadog-agent`), définissez la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` sur une liste de types sensibles séparés par des virgules, comme `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Avantages de la censure basée sur des classes :

- Les variables des types spécifiés sont censurées. Leur contenu n'est pas importé dans Datadog.
- Cela empêche la définition de sondes au sein des emplacements de code des classes censurées.

## Censure basée sur des valeurs de variable avec le scanner de données sensibles

Le [scanner de données sensibles][3] identifie et censure les informations sensibles en fonction d'expressions régulières spécifiques.

### Configuration initiale

Pendant la [configuration initiale de l'instrumentation dynamique][2], vous avez la possibilité de configurer les règles par défaut du scanner de données sensibles pour l'instrumentation dynamique. Ces règles analysent des expressions régulières courantes renvoyant des données vraisemblablement sensibles, telles que les adresses e-mail ou les tokens JWT.

### Personnaliser le scanner de données sensibles

Vous pouvez désactiver les règles par défaut ou créer d'autres règles à l'aide du [scanner de données sensibles][4]. Pour créer une règle de scanner de données sensibles pour l'instrumentation dynamique, appliquez un filtre `source:dd_debugger`.

**Remarque** : le scanner de données sensibles de Datadog procède à la censure _après_ que les informations sont importées dans Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: /fr/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner