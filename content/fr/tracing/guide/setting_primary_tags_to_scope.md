---
title: Configurer les tags primaires
kind: documentation
aliases:
  - /fr/tracing/advanced/setting_primary_tags_to_scope/
further_reading:
  - link: /tracing/connect_logs_and_traces/
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: /tracing/manual_instrumentation/
    tags: Enrichir vos traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: /tracing/opentracing/
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: /tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
## Définition

Vous avez la possibilité de filtrer l'intégralité des données associées à une application APM Datadog selon plusieurs dimensions. Ces dimensions comprennent les statistiques agrégées (telles que le nombre de requêtes/seconde, la latence, le taux d'erreur ou le score Apdex) et les [traces][1] visibles. Elles se configurent à l'aide de tags primaires, qui offrent une visibilité encore plus détaillée sur le comportement de votre application. Les tags primaires peuvent être utilisés pour un environnement, une zone de disponibilité, un datacenter, etc.

Les tags primaires respectent un autre ensemble de règles que celles des [tags Datadog][2] standards.

## Configuration

### Environnement

L'environnement à partir duquel vous recueillez vos traces constitue le tag primaire obligatoire par défaut. Sa clé de tag est `env`. Par défaut, sa valeur pour des données sans tag est `env:none`.

#### Environnement du traceur

Nous vous conseillons d'utiliser le traceur pour définir le tag `env`. Cette méthode offre une plus grande flexibilité, car la définition du tag `env` réside dans le runtime réel du service.

Si la variable `DD_ENV` est exposée au processus de votre service, le traceur l'utilisera automatiquement. Consultez la section [Tagging de service unifié][3] pour en savoir plus sur la définition de `DD_ENV` et d'autres variables d'environnement de service standard.

Vous pouvez également définir manuellement le tag `env` comme tag global pour le traceur dans le code. Pour en savoir plus, consultez la [documentation relative à l'assignation de tags dans l'APM][4].

#### Environnement de l'Agent

Le tag `env` peut être défini dans la configuration de votre Agent.
**Toutefois, si `env` est déjà présent dans les données de trace, alors il remplacera tout tag `env` défini dans l'Agent.**

Options :

1. Configuration de l'Agent de premier niveau :

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Environnements conteneurisés** : l'Agent prend également en charge la configuration du tag `env` de premier niveau par le biais de la variable d'environnement `DD_ENV`.

2. Tag du host de l'Agent :

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Environnements conteneurisés** : l'Agent prend également en charge la configuration de `tags` de premier niveau par le biais de la variable d'environnement `DD_TAGS`.

#### Afficher des données selon un environnement

Les environnements apparaissent en haut des pages APM. Utilisez la liste déroulante `env` pour filtrer les données affichées sur la page actuelle.

## Ajouter un deuxième tag primaire dans Datadog

Si vous ajoutez un tag de host autre que `env:<ENVIRONNEMENT>` à vos traces, celui-ci peut être défini comme tag primaire en plus du tag d'environnement. Accédez à la page [APM Settings][5] pour définir, modifier ou supprimer vos tags primaires.

Remarque :

* Seuls les administrateurs d'organisation peuvent accéder à cette page.
* Les modifications peuvent prendre jusqu'à deux heures avant d'être appliquées dans l'IU.

Si vous modifiez un tag primaire défini, prenez en compte ce qui suit :

* Vous ne pourrez plus accéder aux données historiques de l'APM agrégées par ce tag primaire.
* Les monitors d'APM associés à l'ancien tag afficheront le statut _No Data_.

### Afficher des données selon un tag primaire

Les tags primaires apparaissent en haut des pages APM. Utilisez ces sélecteurs pour filtrer les données affichées sur la page actuelle. Pour afficher les données sans tag primaire, choisissez `<NOM_TAG>:*` dans la liste déroulante.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/getting_started/tagging/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/getting_started/tagging/assigning_tags/#traces
[5]: https://app.datadoghq.com/apm/settings