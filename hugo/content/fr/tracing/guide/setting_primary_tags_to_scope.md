---
aliases:
- /fr/tracing/advanced/setting_primary_tags_to_scope/
description: Apprenez à définir des tags principaux pour délimiter et filtrer les
  données APM à travers différents environnements, services et versions pour une meilleure
  organisation.
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: Documentation
  text: Associer vos logs à vos traces
- link: /tracing/manual_instrumentation/
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: /tracing/opentracing/
  tag: Documentation
  text: Implémenter Opentracing dans vos applications
- link: /tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Configurer les tags primaires
---
## Définition {#definition}

Plusieurs dimensions sont disponibles pour délimiter une application Datadog APM entière. Celles-ci incluent des statistiques agrégées (telles que les requêtes/seconde, la latence, le taux d'erreur, le score Apdex) et les [traces][1] visibles. Ces dimensions sont configurées via des tags principaux qui vous permettent d'obtenir une vue encore plus précise du comportement de votre application. Les cas d'utilisation des tags principaux incluent l'environnement, la zone de disponibilité, le centre de données, etc.

Les tags primaires respectent un autre ensemble de règles que celles des [tags Datadog][2] standards.

## Configuration {#setup}

### Environnement {#environment}

Le tag principal par défaut et obligatoire est l'environnement à partir duquel vos traces sont collectées. Sa clé de tag est `env`, et sa valeur par défaut pour les données sans tag est `env:none`.

#### Environnement du Tracer {#tracer-environment}

Datadog recommande que le SDK définisse `env`. Cela permet également une plus grande flexibilité, car la définition de `env` se trouve dans l'environnement d'exécution du service.

Si `DD_ENV` est exposé au processus de votre service, le SDK l'utilisera automatiquement. Consultez [Unified Service Tagging][3] pour en savoir plus sur la définition de `DD_ENV` et d'autres variables d'environnement de service standard.

Vous pouvez également définir manuellement `env` comme tag global pour le SDK dans le code. Consultez [assigning tags in APM][4] pour plus d'informations.

#### Environnement de l'Agent {#agent-environment}

Le tag `env` peut être défini dans la configuration de votre Agent.
**Ne définissez pas de tags `env` différents sur le Tracer et l'Agent. Cela peut entraîner un étiquetage en double sur les [métriques de trace][5].**

Options :

1. Configuration de l'Agent au niveau supérieur :

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Containerized environments**: The Agent also supports configuration of the top-level `env` through the environment variable `DD_ENV`.

2. Tag d'host de l'Agent:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Containerized environments**: The Agent also supports configuration of top-level `tags` through the environment variable `DD_TAGS`.

#### Données par environnement {#data-by-environment}

Les environnements apparaissent en haut des pages APM. Utilisez le `env` menu déroulant pour définir le périmètre des données affichées sur la page actuelle.

## Ajoutez des tags principaux supplémentaires dans Datadog {#add-additional-primary-tags-in-datadog}

Si vous devez agréger vos métriques de trace sur des dimensions supplémentaires, Datadog recommande de configurer des tags principaux supplémentaires en plus du tag principal obligatoire `env:<ENVIRONMENT>`. Une fois configuré, un second menu déroulant est disponible dans {{< ui >}}Catalog Performance{{< /ui >}} l'onglet. 

Accédez à la page [APM Settings][6] pour définir, modifier ou supprimer vos tags principaux.

**Note** :

* Seuls les administrateurs de l'organisation ont accès à cette page.
* Les modifications peuvent prendre jusqu'à deux heures pour être reflétées dans l'interface utilisateur.
* Le SDK ajoute toujours les tags `resource`, `name` et `service` aux spans. Datadog recommande de ne jamais les ajouter en tant que tags au niveau de l'host pour éviter toute confusion.
* Les tags principaux supplémentaires prennent en charge jusqu'à 100 valeurs uniques par tag. Consultez les [APM data volume guidelines][9] pour plus de détails.
* Les tags principaux supplémentaires peuvent être des tags d'host ou de conteneur. Les tags au niveau du span ajoutés par le SDK ne peuvent pas être utilisés comme tags principaux.

Si vous modifiez un tag primaire défini, prenez en compte ce qui suit :

* Les données APM historiques agrégées par le tag précédemment défini ne sont plus accessibles.
* Tous les monitors APM associés au tag précédent affichent un statut de {{< ui >}}No Data{{< /ui >}}.

## Tags principaux supplémentaires basés sur les conteneurs {#container-based-additional-primary-tags}

Vous pouvez indexer vos métriques de trace en fonction des tags dérivés des conteneurs Docker et des métadonnées de pod Kubernetes sur les plateformes basées sur Linux.

Les tags principaux basés sur les conteneurs sont activés par défaut dans les versions 7.65.0 et ultérieures de le Datadog Agent. Accédez à la page [APM Settings][6] et sélectionnez le tag principal supplémentaire que vous souhaitez utiliser. Il peut s'écouler jusqu'à deux heures avant que les modifications apportées à ce paramètre ne prennent effet.

Vous pouvez filtrer vos services dans le [Catalog][7] par le tag envoyé par vos services conteneurisés. Les métriques de trace utilisées par les dashboards et les monitors peuvent également être agrégées par le tag principal du conteneur.

**Remarque** : Les valeurs des tags principaux ne doivent pas contenir de lettres majuscules ou de caractères spéciaux (à l'exception des traits de soulignement, des signes moins, des deux-points, des points et des barres obliques). Si c'est le cas, certaines fonctionnalités pourraient ne pas fonctionner correctement.

### Désactiver les tags principaux basés sur les conteneurs {#disable-container-based-primary-tags}

Pour désactiver les tags principaux basés sur les conteneurs, configurez la fonctionnalité `disable_cid_stats` APM et redémarrez l'Agent. Si `DD_APM_FEATURES` est déjà défini, ajoutez `disable_cid_stats` à sa liste séparée par des virgules. La procédure dépend de la manière dont vous avez installé l'Agent :

{{< tabs >}}
{{% tab "Helm" %}}

Ajoutez ce qui suit à votre fichier values :

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}

{{% tab "Kubernetes (sans Helm)" %}}

Utilisez la variable d'environnement suivante dans le DaemonSet de l'Agent. Si vous exécutez un conteneur par processus Agent, ajoutez la variable d'environnement suivante à tous les conteneurs. Sinon, ajoutez-la au conteneur de l'Agent.

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Ajoutez ce qui suit à votre fichier [docker-compose.yml][1] :

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES=disable_cid_stats
```


[1]: /fr/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "Avec des variables d'environnement" %}}

Si vous configurez l'Agent avec des variables d'environnement, comme c'est souvent le cas avec les installations Docker et ECS, transmettez la variable d'environnement suivante à l'Agent de trace.

```
DD_APM_FEATURES=disable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

### Étiquettes personnalisées en tant que tags {#custom-labels-as-tags}

Si ce n'est pas déjà fait, vous pouvez également configurer l'Agent pour envoyer des labels de conteneur ou de Pod en tant que tags personnalisés pour vos traces avec [Assigning Tags][8].

## Afficher les données par tag principal {#view-data-by-primary-tag}

Les tags principaux apparaissent en haut des pages APM. Utilisez ces sélecteurs pour filtrer les données affichées sur la page actuelle. Pour afficher toutes les données indépendamment d'un tag principal, choisissez `<TAG_NAME>:*` dans le menu déroulant.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="Le menu déroulant affichant les options pour sélectionner un périmètre avec le deuxième tag principal." style="width:90%;">}}


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/getting_started/tagging/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/getting_started/tagging/assigning_tags/#traces
[5]: /fr/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings/default-settings
[7]: https://app.datadoghq.com/services
[8]: /fr/getting_started/tagging/assigning_tags
[9]: /fr/tracing/troubleshooting/#data-volume-guidelines