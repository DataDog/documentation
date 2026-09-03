---
description: Simulez des connexions UDP sur vos hosts
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: https://www.datadoghq.com/blog/udp-websocket-api-tests/
  tag: Blog
  text: Exécuter des tests UDP et WebSocket pour surveiller les applications pour
    lesquelles la latence est un facteur essentiel
- link: /getting_started/synthetics/api_test/
  tag: Documentation
  text: Débuter avec les tests API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: En savoir plus sur les monitors de test Synthetic
title: Tests UDP
---
## Présentation

Les tests UDP vous permettent de vérifier que des connexions UDP de bas niveau peuvent être établies avec les ports de hosts donnés. Vous pouvez ainsi vous assurer que les services essentiels situés sur des ports UDP demeurent disponibles. Grâce aux données intégrées relatives aux temps de réponse, vous pouvez surveiller les performances de vos applications réseau et recevoir des alertes en cas de lenteur inattendue.

Le trafic UDP normal transmet des informations d'une source à une destination, sans exiger de confirmation. Pour surveiller vos services UDP, Datadog vous conseille d'exécuter un processus sur le host destinataire qui effectue une écoute sur le port UDP et envoie la réponse. Une fois ce processus configuré, vous pouvez créer un test UDP et définir une assertion basée sur la réponse attendue.

Les tests UDP peuvent être exécutés depuis des [emplacements gérés](#selectionner-des-emplacements) et des [emplacements privés][1], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau. Les tests UDP peuvent être exécutés selon un programme, à la demande ou directement dans vos [pipelines de CI/CD][2].

## Configuration

Après avoir choisi de créer un test `UDP`, définissez la requête de votre test.

### Définir la requête

1. Indiquez le **host** et le **port** sur lesquels vous souhaitez exécuter votre test. Par défaut, le port est défini sur `53`.
2. Saisissez la chaîne que vous souhaitez envoyer dans votre test.
3. Spécifiez le délai (en secondes) avant l'expiration du test (facultatif).
4. **Attribuez un nom** à votre test UDP.
5. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test UDP. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][3].

{{< img src="synthetics/api_tests/udp_test_config.png" alt="Définir une requête UDP" style="width:90%;" >}}

Cliquez sur **Test URL** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur **Test URL**, une assertion de base pour `response time` est ajoutée. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type            | Opérateur                                                                        | Type de valeur                        |
|-----------------|---------------------------------------------------------------------------------|-----------------------------------|
| response time   | `is less than`                                                                  | *Nombre entier (ms)*                    |
| chaîne de réponse | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`| *Chaîne* <br> *[Regex][4]*        |

Sélectionnez directement l'aperçu de la réponse ou cliquez sur **New Assertion** pour créer une assertion. Vous pouvez créer jusqu'à 20 assertions par test UDP.

{{< img src="synthetics/api_tests/udp_assertions.png" alt="Définir des assertions pour déterminer la réussite ou l'échec de votre test UDP" style="width:90%;" >}}

Pour appliquer une logique `OR` dans une assertion, utilisez le comparateur `matches regex` ou `does not match regex` et définissez une expression régulière avec plusieurs valeurs attendues pour le même type d'assertion, comme `(0|100)`. Le test est réussi si la valeur de l'assertion sur la chaîne de réponse correspond à 0 ou 100.

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

Si un test contient une assertion sur le corps de la réponse et que le délai d'expiration est atteint, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test UDP. Les tests UDP peuvent être exécutés depuis des emplacements gérés et des [emplacements privés][1], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau.

{{% managed-locations %}} 

### Indiquer la fréquence du test

Les tests UDP peuvent être exécutés :

- **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux services. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test UDP.
- [**Dans vos pipelines de CI/CD**][2].
- **À la demande**, afin d'exécuter les tests au moment le plus opportun pour votre équipe.

### Définir des conditions d'alerte

Vous pouvez définir des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test échoue et déclenche une alerte.

#### Nouvelle tentative rapide

Votre test peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if your test fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

### Configurer le monitor de test

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Cette section vous permet de définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][5], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test. Ce champ accepte [le format de mise en forme Markdown][6] standard ainsi que les [variables conditionnelles][7] suivantes :

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

Pour en savoir plus, consultez la section [Utiliser les monitors de test Synthetic][8].

{{% synthetics-variables %}}

### Utiliser des variables

Les [variables globales définies sur la page **Settings**][7] peuvent être utilisées dans l'URL et les assertions de vos tests UDP.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité.

## Échec de test

Un test est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint.

Voici la liste des erreurs concernées :

`CONNRESET`
: La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée, ou configuration des entrées DNS incorrecte.

`INVALID_REQUEST` 
: La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).

`TIMEOUT`
: La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreurs `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indique que la durée de la requête a dépassé le délai d'expiration défini (par défaut, 60 secondes).
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si rien d'autre que `Total response time` ne s'affiche, cela signifie que l'expiration est survenue durant la résolution DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée du test (requête + assertions) a atteint la durée maximale (60,5 secondes).

## Autorisations

Par défaut, seuls les utilisateurs disposant des rôles Admin ou Standard Datadog peuvent créer, modifier et supprimer des tests UDP Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][9]. 

Si vous utilisez des [rôles personnalisés][10], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

### Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][11] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez limiter l'accès d'un test UDP à certains rôles de votre organisation. Lors de la création du test UDP, choisissez les rôles (en plus de votre utilisateur) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/private_locations/
[2]: /fr/synthetics/cicd_integrations
[3]: /fr/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /fr/monitors/notify/#notify-your-team
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /fr/synthetics/settings/#global-variables
[8]: /fr/synthetics/guide/synthetic-test-monitors
[9]: /fr/account_management/rbac/
[10]: /fr/account_management/rbac#custom-roles
[11]: /fr/account_management/rbac/#create-a-custom-role