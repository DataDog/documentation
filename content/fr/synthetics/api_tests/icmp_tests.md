---
aliases:
- /fr/synthetics/icmp_test
- /fr/synthetics/icmp_check
description: Surveillez la disponibilité de vos hosts et diagnostiquez les problèmes
  réseau.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des pings ICMP sur des endpoints internes
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
title: Tests ICMP
---

## Présentation

Les tests ICMP vous permettent de surveiller la disponibilité de vos hosts et de diagnostiquer les problèmes de communication réseau. En appliquant des assertions sur les valeurs d'un ou de plusieurs pings ICMP vers votre endpoint, Datadog peut vous aider à détecter les problèmes de connectivité, les durées d'aller-retour qui dépassent la limite de latence, ainsi que les changements inattendus de configuration du pare-feu de sécurité. Les tests peuvent également surveiller le nombre de hops réseau (TTL) requis pour se connecter à votre host et afficher les résultats du traceroute, afin de visualiser les détails de chaque hop réseau durant l'itinéraire.

Les tests ICMP peuvent être exécutés depuis des [emplacements gérés](#selectionner-des-emplacements) et des [emplacements privés][1], selon que vous souhaitez déclencher vos pings ICMP vers vos endpoints depuis l'extérieur ou au sein de votre réseau. L'exécution des tests ICMP peut être planifiée, peut s'effectuer à la demande ou peut être lancée directement depuis vos [pipelines de CI/CD][2].

## Configuration

Après avoir choisi de créer un test `ICMP`, définissez la requête de votre test.

### Définir la requête

1. Indiquez le **nom de domaine** ou l'**adresse IP** sur lequel ou laquelle vous souhaitez exécuter votre test.
2. Cochez ou décochez l'option **Track number of network hops (TTL)**. Lorsque cette option est cochée, elle active une sonde traceroute afin de découvrir toutes les passerelles qui se trouvent sur le chemin jusqu'à la destination du host.
3. Sélectionnez le **nombre de pings** à déclencher lors de chaque session du test. Par défaut, cette valeur est définie sur quatre. Vous pouvez choisir de la diminuer ou de l'augmenter. Elle ne peut pas dépasser dix.
4. **Attribuez un nom** à votre test ICMP.
5. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test ICMP. Vous pourrez par la suite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][3].

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="Définir la requête ICMP" style="width:90%;" >}}

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Cliquez sur **Test URL** pour ajouter les assertions de base pour `latency`, `packet loss` et `packet received`. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type          | Agrégation    |Opérateur                                                                               | Type de valeur       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| latency         | `avg`, `max`, `min` ou `stddev` (à savoir `jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | _Nombre entier (ms)_    |
| packet loss     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Pourcentage (%)_ |
| packet received | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Nombre entier_        |
| network hops    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Nombre entier_        |

Vous pouvez créer jusqu'à 20 assertions par test API en cliquant sur **New Assertion** ou en sélectionnant directement l'aperçu de la réponse : 

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="Définir des assertions pour déterminer la réussite ou l'échec de votre test ICMP" style="width:90%;" >}}

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

Si un test contient une assertion sur le corps de la réponse et que le délai d'expiration est atteint, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test ICMP. Les tests ICMP peuvent être exécutés depuis des emplacements gérés et des [emplacements privés][1], selon que vous souhaitez déclencher vos pings ICMP à l'extérieur ou au sein de votre réseau.

{{% managed-locations %}} 

### Indiquer la fréquence du test

Les tests ICMP peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux services. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test ICMP.
* [**Dans vos pipelines de CI/CD**][2].
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour votre équipe.

### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if your test fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes.
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Configurer le monitor de test

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Cette section vous permet de définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][4], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][5] standard ainsi que les [variables conditionnelles][6] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |
    | `{{#is_renotify}}`         | S'affiche lorsque le monitor renvoie des notifications.                                   |
    | `{{^is_renotify}}`          | S'affiche lorsque le monitor ne renvoie pas de notification.                                   |
    | `{{#is_priority}}`         | S'affiche lorsque le monitor correspond à la priorité (P1 à P5).                  |
    | `{{^is_priority}}`         | S'affiche lorsque le monitor ne correspond pas à la priorité (P1 à P5).                  |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

4. Cliquez sur **Create** pour enregistrer la configuration de votre test et votre monitor.

Pour en savoir plus, consultez la section [Utiliser les monitors de test Synthetic][7].

## Variables

### Créer des variables locales

Pour créer une variable locale, cliquez sur **Create Local Variable** en haut à droite de l'interface. Vous pouvez sélectionner l'un des builtins suivants :

`{{ numeric(n) }}`
: Génère une chaîne numérique de `n` chiffres.

`{{ alphabetic(n) }}`
: Génère une chaîne alphabétique de `n` lettres.

`{{ alphanumeric(n) }}`
: Génère une chaîne alphanumérique de `n` caractères.

`{{ uuid }}`
: Génère un identifiant unique universel (UUID) de version 4.

`{{ date(n unit, format) }}`
: Génère une date dans l'un des formats acceptés de Datadog. Sa valeur correspond à la date UTC d'initiation du test + ou - `n` unités.

`{{ timestamp(n, unit) }}` 
: Génère un timestamp dans l'une des unités acceptées de Datadog. Sa valeur correspond au timestamp UTC d'initiation du test +/-  `n` unités.

Pour obfusquer les valeurs des variables locales dans les résultats des tests, sélectionnez **Hide and obfuscate variable value**. Une fois la chaîne de la variable définie, cliquez sur **Add Variable**.

### Utiliser des variables

Les [variables globales définies sur la page `Settings`][8] peuvent être utilisées dans l'URL et les assertions de vos tests ICMP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utiliser des variables dans les tests API" video="true" width="90%" >}}

## Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint.

Voici la liste des erreurs concernées :

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, ou configuration des entrées DNS incorrecte.

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][9] peuvent créer, modifier et supprimer des tests ICMP Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][9].

Si vous utilisez des [rôles personnalisés][10], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][11] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez faire en sorte que certains rôles au sein de votre organisation ne puissent pas accéder à un test ICMP. Lors de la création du test ICMP, choisissez les rôles (en plus des utilisateurs) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations
[2]: /fr/synthetics/cicd_integrations
[3]: /fr/synthetics/search/#search
[4]: /fr/monitors/notify/#notify-your-team
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /fr/synthetics/guide/synthetic-test-monitors
[8]: /fr/synthetics/settings/#global-variables
[9]: /fr/account_management/rbac/
[10]: /fr/account_management/rbac#custom-roles
[11]: /fr/account_management/rbac/#create-a-custom-role