---
description: Simuler des requêtes gRPC pour surveiller les endpoints d'API publics
  et internes
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Présentation de la surveillance Synthetic Datadog
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: Blog
  text: Surveiller vos API gRPC avec Datadog
- link: https://learn.datadoghq.com/course/view.php?id=39
  tag: Centre d'apprentissage
  text: Présentation des tests Synthetic
- link: /synthetics/private_locations
  tag: Documentation
  text: Exécuter des checks de santé gRPC sur des endpoints internes
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: Blog
  text: Surveiller des API gRPC avec la surveillance Synthetic Datadog
title: Checks de santé GRPC
---
## Présentation

Les checks de santé gRPC permettent de vérifier l'intégrité des services gRPC. Ils indiquent si vos services et serveurs gRPC sont réactifs, en cours d'exécution et à même de traiter des appels de procédure à distance (Remote Procedure Calls ou RPC).

Vous pouvez mettre en œuvre le mécanisme de checks de santé sous la forme d'un service gRPC sur un serveur gRPC. Accédez au [référentiel gRPC open source][1] pour découvrir l'exemple de fichier proto conçu par la communauté gRPC pour les checks de santé.

Les tests de check de santé gRPC peuvent être exécutés depuis des [emplacements gérés][2] et des [emplacements privés][3], selon que vous souhaitez exécuter le test à l'extérieur ou à l'intérieur de votre réseau. Les tests gRPC peuvent être exécutés selon un programme, à la demande ou directement dans vos [pipelines de CI/CD][4].

<div class="alert alert-warning">
N'hésitez pas à expliquer à l'<a href="https://docs.datadoghq.com/help/">équipe d'assistance</a> comment vous utilisez les tests Synthetic pour vos gRPC.
</div>

## Configuration

Après avoir choisi de créer un test de check de santé `gRPC`, définissez la requête de votre test.

### Définir la requête

1. Indiquez le **host** et le **port** sur lesquels vous souhaitez exécuter votre test de check de santé. Par défaut, le port est défini sur `50051`.
2. Saisissez le nom du service auquel vous souhaitez envoyer un check de santé. Ne remplissez pas ce champ si vous souhaitez envoyer un check de santé au serveur gRPC.

3. **Attribuez un nom** à votre test de check de santé gRPC.

4. Ajoutez des **tags** `env` et tout autre tag de votre choix à votre test de check de santé gRPC. Vous pourrez ensuite utiliser ces tags pour filtrer rapidement vos tests Synthetic depuis la [page d'accueil de la surveillance Synthetic][5].

{{< img src="synthetics/api_tests/grpc_test_config.png" alt="Définir une requête gRPC" style="width:90%;" >}}

Cliquez sur **Test Service** pour essayer la configuration de requête. Un aperçu de la réponse s'affiche sur le côté droit de votre écran.

### Définir des assertions

Les assertions définissent un résultat de test escompté. Lorsque vous cliquez sur **Test Service**, des assertions basées sur `response time` et `healthcheck status` sont ajoutées en fonction de la réponse obtenue. Vous devez définir au moins une assertion à surveiller pour votre test.

| Type                    | Opérateur                                        | Type de valeur                           |
|-------------------------|-------------------------------------------------|--------------------------------------|
| response time           | `is less than`                                  | _Nombre entier (ms)_                       |
| healthcheck status      | `is`, `is not`                                  | _Nombre entier (ms)_                       |

Vous pouvez créer jusqu'à 20 assertions par test API en cliquant sur **New Assertion** ou en sélectionnant directement l'aperçu de la réponse :

{{< img src="synthetics/api_tests/assertions_grpc.png" alt="Définir des assertions pour déterminer la réussite ou l'échec de votre test gRPC" style="width:90%;" >}}

Si un test ne contient pas d'assertion sur le corps de la réponse, la charge utile du corps est abandonnée et le temps de réponse associé à la requête est renvoyé, dans la limite du délai d'expiration défini par le worker Synthetic.

Si un test contient une assertion sur le corps de la réponse et que le délai d'expiration est atteint, une erreur `Assertions on the body/response cannot be run beyond this limit` apparaît.

### Sélectionner des emplacements

Sélectionnez les **emplacements** à partir desquels vous souhaitez exécuter votre test de check de santé gRPC. Les tests de check de santé gRPC peuvent être exécutés depuis des [emplacements gérés][2] et des [emplacements privés][3], selon que vous souhaitez exécuter le test de check de santé à l'extérieur ou à l'intérieur de votre réseau.

### Indiquer la fréquence du test

Les tests de check de santé gRPC peuvent être exécutés :

* **Selon un programme**, pour vous assurer que vos utilisateurs peuvent toujours accéder à vos principaux services. Sélectionnez la fréquence à laquelle vous souhaitez que Datadog exécute votre test gRPC.
* [**Dans vos pipelines de CI/CD**][4], pour déployer votre code sans craindre de dégrader l'expérience de vos utilisateurs.
* **À la demande**, afin d'exécuter les tests au moment le plus opportun pour votre équipe.

### Définir des conditions d'alerte

Définissez des conditions d'alerte afin de spécifier les circonstances dans lesquelles vous souhaitez qu'un test de check de santé échoue et déclenche une alerte.

#### Règle d'alerte

Lorsque vous définissez les conditions d'alerte sur `An alert is triggered if any assertion fails for X minutes from any n of N locations`, une alerte se déclenche uniquement si les deux conditions suivantes se vérifient :

* Au moins un emplacement a donné lieu à un échec (au moins une assertion a échoué) au cours des *X* dernières minutes
* À un moment au cours des *X* dernières minutes, au moins *n* emplacements ont donné lieu à un échec.

#### Nouvelle tentative rapide

Votre test de check de santé peut déclencher `X` nouvelles tentatives après `Y` ms en cas d'échec. Cet intervalle peut être personnalisé en fonction de vos préférences en matière d'alertes.

La disponibilité d'un emplacement est calculée pour chaque évaluation (quels que soient les résultats du dernier test avant l'évaluation). La disponibilité totale est calculée selon les conditions d'alerte configurées. Les notifications envoyées se basent sur la disponibilité totale.

### Informer votre équipe

Votre test envoie une notification selon les [conditions d'alerte](#definir-des-conditions-d-alerte) définies au préalable. Référez-vous à cette section pour définir les conditions et le message à envoyer à vos équipes.

1. [Tout comme pour les monitors][6], sélectionnez **les utilisateurs et/ou services** qui doivent recevoir des notifications. Pour ce faire, ajoutez `@notification` au message, ou cherchez des membres d'équipe ou des intégrations connectées à l'aide de la liste déroulante.

2. Saisissez un **message** de notification pour le test de check de santé. Ce champ accepte [le format de mise en forme Markdown][7] standard ainsi que les [variables conditionnelles][8] suivantes :

    | Variable conditionnelle       | Description                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | S'affiche lorsque le test envoie une alerte.                                            |
    | `{{^is_alert}}`            | S'affiche lorsque le test n'envoie pas d'alerte.                                          |
    | `{{#is_recovery}}`         | S'affiche lorsque le test est rétabli depuis un état d'alerte.                             |
    | `{{^is_recovery}}`         | S'affiche lorsque le test n'est pas rétabli depuis un état d'alerte.                           |

3. Indiquez une fréquence de **renvoi du message de notification** en cas d'échec d'un test de check de santé. Si vous ne souhaitez pas renvoyer de notification en cas d'échec, définissez l'option sur `Never renotify if the monitor has not been resolved`.

Cliquez sur **Save** pour enregistrer et démarrer votre test de check de santé.

## Variables

### Créer des variables locales

Vous pouvez créer des variables locales en cliquant sur **Create Local Variable** en haut à droite du formulaire de configuration de votre test de check de santé. Vous pouvez définir leurs valeurs sur l'un des builtins disponibles ci-dessous :

`{{ numeric(n) }}`
: Génère une chaîne numérique de `n` chiffres.

`{{ alphabetic(n) }}`
: Génère une chaîne alphabétique de `n` lettres.

`{{ alphanumeric(n) }}`
: Génère une chaîne alphanumérique de `n` caractères.

`{{ date(n, format) }}`
: Génère une date dans l'un des formats acceptés. Sa valeur correspond à la date d'initiation du test + `n` jours.

`{{ timestamp(n, unit) }}`
: Génère un timestamp dans l'une des unités acceptées. Sa valeur correspond au timestamp d'initiation du test +/- `n` unités choisies.

### Utiliser des variables

Les [variables globales définies sur la page `Settings`][9] et les [variables définies localement](#creer-des-variables-locales) peuvent être utilisées dans l'URL, les options avancées et les assertions de vos tests gRPC.

Pour afficher votre liste de variables, tapez `{{` dans le champ souhaité :

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Utiliser des variables dans les tests API" video="true" width="90%" >}}

## Échec de test

Un test de check de santé est considéré comme `FAILED` s'il ne répond pas à une ou plusieurs de ses assertions ou si la requête a échoué prématurément. Dans certains cas, le test de check de santé peut en effet échouer sans que les assertions n'aient pu être comparées à l'endpoint.

Voici la liste des erreurs concernées :

`gRPC specific errors`
: La norme gRPC inclut une liste de codes de statut spécifiques. Cette liste est indiquée dans la [documentation officielle][10] (en anglais).

`CONNRESET`
: La connexion a été interrompue de façon soudaine par le serveur à distance. Causes possibles : erreur ou défaillance du serveur Web lors de la réponse ou perte de connectivité du serveur Web.

`DNS`
: L'entrée DNS est introuvable pour l'URL du test. Causes possibles : URL du test mal configurée ou configuration des entrées DNS incorrecte.

`INVALID_REQUEST`
: La configuration du test n'est pas valide (par exemple, en raison d'une faute de frappe dans l'URL).

`SSL`
: La connexion SSL n'a pas pu être établie. [Pour en savoir plus, consultez la page relative aux erreurs][11].

`TIMEOUT`
: La requête n'a pas pu être effectuée dans un délai raisonnable. Deux types d'erreurs `TIMEOUT` peuvent se produire :
  - `TIMEOUT: The request couldn’t be completed in a reasonable time.` indique que la durée de la requête a dépassé le délai d'expiration défini (par défaut, 60 secondes).
  Pour chaque requête, seules les étapes terminées sont affichées dans la cascade réseau. Par exemple, si rien d'autre que `Total response time` ne s'affiche, cela signifie que l'expiration est survenue durant la résolution DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indique que la durée du test (requête + assertions) a atteint la durée maximale de 60,5 secondes.

## Autorisations

Par défaut, seuls les utilisateurs disposant des [rôles Admin ou Standard Datadog][12] peuvent créer, modifier et supprimer des tests de check de santé gRPC Synthetic. Pour que votre utilisateur puisse effectuer ces opérations, vous devez donc lui accorder l'un de ces deux [rôles par défaut][12]. 

Si vous utilisez des [rôles personnalisés][13], ajoutez votre utilisateur à un rôle personnalisé disposant des autorisations `synthetics_read` et `synthetics_write`.

## Restreindre l'accès

Les clients qui ont configuré des [rôles personnalisés][14] sur leur compte peuvent utiliser la fonctionnalité de restriction d'accès.

Vous pouvez limiter l'accès d'un test Browser à certains rôles de votre organisation. Lors de la création du test Browser, choisissez les rôles (en plus de votre utilisateur) auxquels vous souhaitez attribuer des autorisations de lecture/écriture pour votre test.

{{< img src="synthetics/settings/restrict_access.png" alt="Définir des autorisations pour votre test" style="width:70%;" >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /fr/api/v1/synthetics/#get-all-locations-public-and-private
[3]: /fr/synthetics/private_locations
[4]: /fr/synthetics/cicd_testing
[5]: /fr/synthetics/search/#search
[6]: /fr/monitors/notify/#notify-your-team
[7]: https://www.markdownguide.org/basic-syntax/
[8]: /fr/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[9]: /fr/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /fr/synthetics/api_tests/errors/#ssl-errors
[12]: /fr/account_management/rbac/
[13]: /fr/account_management/rbac#custom-roles
[14]: /fr/account_management/rbac/#create-a-custom-role