---
title: Configurer les tags primaires
kind: documentation
aliases:
  - /fr/tracing/advanced/setting_primary_tags_to_scope/
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tags: Enrichir vos traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
## Définition

Vous avez la possibilité de filtrer l'intégralité des données associées à une application APM Datadog selon plusieurs dimensions. Ces dimensions comprennent les statistiques agrégées (telles que le nombre de requêtes/seconde, la latence, le taux d'erreur ou le score Apdex) et les [traces][1] visibles. Elles se configurent à l'aide de tags primaires, qui offrent une visibilité encore plus détaillée sur le comportement de votre application. Les tags primaires peuvent être utilisés pour un environnement, une zone de disponibilité, un datacenter, etc.

Les tags primaires respectent un autre ensemble de règles que celles des [tags Datadog][2] standards.

## Configuration

### Environnement

L'environnement à partir duquel vous recueillez vos traces constitue le tag primaire obligatoire par défaut. Sa clé de tag est `env`. Par défaut, sa valeur pour des données sans tag est `env:none`.
Il existe différentes façons de spécifier un environnement lors de l'envoi de données :

1. Tag de host :
  Utilisez un tag de host au format `env:<ENVIRONNEMENT>` pour taguer l'ensemble des traces de l'Agent correspondant.

2. Configuration de l'Agent :
  Remplacez le tag par défaut utilisé par l'Agent dans [le fichier de configuration de l'Agent][3]. Cela permet de taguer toutes les traces transmises à l'Agent, ce qui ignore la valeur du tag du host.

    ```yaml
    apm_config:
      env: "<ENVIRONMENT>"
    ```

3. Par trace :
  Lorsque vous envoyez une seule trace, spécifiez un environnement en taguant l'une de ses spans avec la clé de métadonnées `env`. Cela ignore la configuration de l'Agent et la valeur du tag du host (le cas échéant). Consultez la [documentation relative aux tags des traces][4] pour découvrir comment assigner un tag à vos traces.

#### Afficher les données selon un environnement

Les environnements apparaissent en haut des pages APM. Utilisez la liste déroulante pour filtrer les données affichées sur la page actuelle.

{{< img src="tracing/guide/setting_primary_tags/envs_tracing_screen.png" alt="Tracing d'environnements"  style="width:80%;">}}

## Ajouter un deuxième tag primaire dans Datadog

Si vous ajoutez un tag de host autre que `env:<ENVIRONNEMENT>` à vos traces, celui-ci peut être défini comme tag primaire en plus du tag d'environnement. Accédez à la page [APM Settings][5] pour définir, modifier ou supprimer vos tags primaires.

Remarque :

* Seuls les administrateurs d'organisation peuvent accéder à cette page.
* Les modifications peuvent prendre jusqu'à deux heures avant d'être appliquées dans l'IU.

Si vous modifiez un tag primaire défini, prenez en compte ce qui suit :

* Vous ne pourrez plus accéder aux données historiques de l'APM agrégées par ce tag primaire.
* Les monitors d'APM associés à l'ancien tag afficheront le statut _No Data_.

### Afficher les données selon un tag primaire

Les tags primaires apparaissent en haut des pages APM. Utilisez ces sélecteurs pour filtrer les données affichées sur la page actuelle. Pour afficher les données sans tag primaire, choisissez `<NOM_TAG>:*` dans la liste déroulante (comme illustré ci-dessous).

{{< img src="tracing/guide/setting_primary_tags/primary_tags_ui.png" alt="IU tags primaires"  style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tagging
[3]: /fr/agent/guide/agent-configuration-files/
[4]: /fr/tagging/assigning_tags/#traces
[5]: https://app.datadoghq.com/apm/settings