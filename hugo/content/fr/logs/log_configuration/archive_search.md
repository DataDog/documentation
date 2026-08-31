---
description: Recherchez et analysez instantanément les journaux des archives à long
  terme sans réindexation.
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Explorez les journaux dans Datadog
- link: /logs/log_configuration/archives/
  tag: Documentation
  text: Configurez les archives de journaux
- link: /logs/indexes/
  tag: Documentation
  text: Gérez la conservation et l'indexation des journaux
title: Recherche d'archives
---
## Aperçu {#overview}

La recherche d'archives vous permet d'interroger les journaux directement à partir des archives de stockage d'objets à long terme, sans les réhydrater au préalable. Utilisez la recherche d'archives pour **un accès immédiat aux journaux archivés**, pour des enquêtes, des audits ou des dépannages au-delà de votre période de conservation d'indexation.

La recherche d'archives diffère de la réhydratation en diffusant les résultats en temps réel pendant que les données sont analysées, plutôt qu'en s'exécutant comme un travail de lot en arrière-plan. C'est plus rentable, ne facturant que pour l'analyse elle-même avec les 100 000 premiers journaux conservés temporairement sans coût, et plus rapide.

Lorsque vous lancez une recherche

* Les journaux s'affichent sur une page de résultats dédiée.
* Jusqu'à **100 000 journaux** sont conservés pendant **24 heures**.
* Vous pouvez optionnellement **Réhydrater les résultats** avant ou après la recherche pour les conserver plus longtemps et les rendre disponibles dans tout Datadog.

Cette fonctionnalité prend en charge les journaux archivés via

- [Datadog Log Management archives][1]
- [Observability Pipelines archives][2]

### Cas d'utilisation typiques {#typical-use-cases}

La recherche d'archives est idéale lorsque vous devez interroger des journaux stockés dans une archive externe.
Les cas d'utilisation courants incluent :

- **Investigations d'incidents :** Récupérez les journaux liés à un `transaction_id`, `user_id` ou `session_id` qui tombent en dehors de votre conservation d'indexation.<br>
  *Exemple : Interrogez les journaux d'il y a trois semaines en utilisant un `user_id` spécifique, même si votre conservation indexée n'est que de 15 jours.*

- **Analyse de sécurité :** Examinez les journaux archivés pour enquêter sur les tentatives de connexion ou d'autres activités par IP ou utilisateur.<br>
  *Exemple : Récupérez toutes les tentatives de connexion d'une adresse IP spécifique au cours des 12 derniers mois.*

- **Conformité et support d'audit :** Accédez aux journaux clients ou de facturation archivés pour des audits sans réindexer de manière permanente de grands volumes de données.<br>
  *Exemple : Interrogez les journaux liés aux factures (`customer_id:12345`, `service:billing`) des 18 derniers mois pour un audit fiscal.*

## Prérequis {#prerequisites}

Avant d'utiliser la recherche d'archives :

1. Configurez une archive externe (Amazon S3, Azure Storage ou Google Cloud Storage). Voir [Log Archives][3].
1. Assurez-vous que Datadog a la permission de lire depuis l'archive, voir [Permissions spécifiques au cloud](#cloud-specific-permissions).
   * **Amazon S3 :** Délégation de rôle IAM
   * **Azure Storage :** Azure AD avec le rôle *Contributeur de données de blob de stockage*
   * **Google Cloud Storage :**Compte de service avec le rôle *Visualiseur d'objets de stockage*

### Permissions {#permissions}

Exécuter une **Archive Search** nécessite la **`logs_write_historical_views`** permission. C'est une **permission** globale, mais les utilisateurs ne peuvent rechercher des journaux dans les archives que pour lesquelles ils disposent également de la **Logs Read Archive** permission.

Les résultats de la recherche d'archives sont visibles par tous les utilisateurs de votre organisation qui ont accès à la fonctionnalité de recherche d'archives. Cependant, **les requêtes de restriction**, telles que les filtres de sécurité des journaux et les restrictions de données configurées dans Datadog, sont toujours appliquées sur la page de résultats et s'appliquent à tous les utilisateurs. Cela signifie que chaque utilisateur ne peut voir que les journaux qu'il est autorisé à consulter en fonction des permissions et des filtres à l'échelle de l'organisation.

Pour plus d'informations sur les contrôles d'accès et la sécurité des journaux, consultez [Comment configurer RBAC pour les journaux][6].

## Lancement d'une recherche {#launching-a-search}

1. Allez à [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Archive Search{{< /ui >}} > {{< ui >}}New Search{{< /ui >}}][4].
2. Sélectionnez une archive et une plage horaire.
3. Entrez une requête, comme `user_id:abc123`.
4. (Optionnel) Renommez la recherche.
5. Sous {{< ui >}}Mode{{< /ui >}}, choisissez le type de recherche que vous souhaitez effectuer.
   - Choisissez {{< ui >}}Search{{< /ui >}} pour récupérer les résultats en temps réel, avec jusqu'à 100 000 journaux conservés pendant 24 heures.
   - Choisissez {{< ui >}}Search & Rehydration{{< /ui >}} pour réhydrater les résultats pour un accès complet à la plateforme et une conservation personnalisée.
6. Cliquez sur {{< ui >}}Search{{< /ui >}}.

Les journaux s'affichent sur la page des résultats en temps réel. Une barre de progression indique l'état de l'analyse, et vous pouvez annuler la recherche à tout moment.

## Aperçu de la requête {#query-preview}

Lorsque vous effectuez une recherche, Datadog télécharge un petit échantillon (jusqu'à 1 000 journaux) de l'archive et de la plage horaire sélectionnées.
Utilisez cet aperçu pour vérifier la syntaxe de la requête, inspecter la structure des journaux et ajuster les filtres.

**Remarque** : L'échantillon d'aperçu peut ne pas inclure les journaux qui correspondent à votre requête. C'est uniquement pour validation et exploration.

## Voir et conserver les résultats {#view-and-retain-results}

Par défaut, vous êtes facturé uniquement pour l'analyse. Les 100 000 premiers journaux sont stockés temporairement (24 heures) sans frais et accessibles directement depuis la page des résultats de recherche d'archive, où vous pouvez cliquer sur n'importe quel journal pour voir ses détails complets et son contexte. Après 24 heures, les résultats expirent automatiquement.

Pour conserver plus de données ou accéder aux journaux dans d'autres produits Datadog, choisissez l'une des options suivantes :

- **Réhydratez avant le lancement** :
  Conservez plus de 100 000 journaux, définissez une période de conservation personnalisée (par exemple, 7, 15 ou 30 jours) et accédez immédiatement aux résultats sur la plateforme.
- **Réhydratez après l'achèvement** :
  Pendant la fenêtre de 24 heures, vous pouvez réhydrater les résultats pour prolonger la conservation et les rendre disponibles dans Log Explorer, Dashboards et Notebooks.

## Analysez les résultats {#analyze-results}

Après avoir lancé une recherche, les journaux s'affichent sur la page {{< ui >}}Archive Search Results{{< /ui >}}. Depuis cette page, vous pouvez utiliser des filtres pour affiner les résultats et ouvrir des détails spécifiques des journaux pour enquêter sur les problèmes.

### Limitations {#limitations}

Bien que la recherche d'archives donne accès aux journaux archivés, elle a des capacités analytiques limitées par rapport aux journaux indexés :

- **Pas d'agrégations ni d'analyses** : Vous ne pouvez pas exécuter d'agrégations, créer des visualisations ou effectuer des analyses avancées directement sur les résultats de la recherche d'archives.
- **Page des résultats uniquement** : Les résultats de la recherche d'archives ne sont disponibles que sur la page des résultats dédiée et ne peuvent pas être interrogés depuis d'autres parties de la plateforme Datadog (comme Dashboards, Notebooks ou Log Explorer).

Pour activer des analyses complètes et une visibilité sur l'ensemble de la plateforme, vous devez réhydrater les résultats de recherche (soit avant de lancer la recherche, soit après l'achèvement dans la fenêtre de 24 heures). Lorsque réhydratés, vos journaux deviennent disponibles dans tous les produits Datadog avec des capacités complètes d'agrégation, de visualisation et d'analytique.

## Gérer les recherches {#manage-searches}

<!-- {{< img src="path/to/your/image-name-here.png" alt="Votre description d'image" style="width:100%;" >}} -->

Depuis le [{{< ui >}}Archive Search list view{{< /ui >}}][5], vous pouvez :

- **Annuler** une recherche en cours : préserve les journaux déjà récupérés.
- **Dupliquer** une recherche : ouvre le formulaire de création de recherche d'archive avec les mêmes paramètres pour des relances efficaces.

## Performance de recherche et optimisation {#search-performance-and-optimization}

La recherche d'archive analyse les fichiers journaux archivés dans votre plage horaire sélectionnée. **Le volume de scan** fait référence à la taille totale des fichiers lus lors d'une requête. De grands volumes de scan peuvent augmenter à la fois le temps de recherche et les coûts de sortie dans le cloud.

Pour optimiser la performance et réduire les coûts :
* **Réduisez la plage horaire :** Limitez votre recherche à la plus petite fenêtre possible.
* **Définir les limites de scan :** Les administrateurs avec `Logs Write Archives` des permissions peuvent définir une taille de scan maximale par archive dans le {{< ui >}}Settings{{< /ui >}}.
* **Utiliser les attributs de partition (Aperçu) :** La manière la plus efficace d'accélérer les recherches sur des données à faible cardinalité comme `service`, `env` ou `status`. Datadog ignore les partitions entières qui ne correspondent pas à votre requête.
* **Utiliser les attributs de recherche (Aperçu) :** La manière la plus efficace d'accélérer les recherches sur des données à haute cardinalité comme `trace_id` ou `user_id`.
* **Utiliser la compression zstd :** Les archives utilisent par défaut la compression zstd, ce qui réduit le volume de scan et les coûts de sortie dans le cloud par rapport à gzip. Si votre archive utilise gzip, consultez [Archives de journaux][9] pour passer à zstd.

**Remarque** : Seuls les journaux archivés après la configuration des attributs de partition ou de recherche bénéficient des recherches accélérées. Les journaux archivés avant cette configuration ne sont pas affectés.


### Accélérez les recherches avec les attributs de partition {#accelerate-searches-with-partition-attributes}

Vous pouvez configurer **les attributs de partition** sur vos archives pour regrouper les journaux par valeurs de champs à faible cardinalité au moment de l'écriture. Utilisez des attributs comme `service`, `source`, `env` ou `status`.

Les journaux qui partagent les mêmes valeurs de partition sont co-localisés dans le stockage. Lorsque vous effectuez une recherche, Datadog évalue votre requête par rapport aux métadonnées de partition et ignore les partitions qui ne correspondent pas, réduisant ainsi le volume total de données analysées.

Pour configurer cela, consultez la documentation sur les [Archives de journaux][8].

### Accélérez les recherches avec Lookup Attributes {#accelerate-searches-with-lookup-attributes}

Vous pouvez configurer les **Lookup Attributes** sur vos archives pour ignorer les blocs de données non pertinents dans votre bucket de stockage. Par exemple, si vous configurez `trace_id` ou `user_id`, vous réduisez considérablement le volume de données analysées et diminuez les frais de transfert sortant de votre fournisseur de cloud.

Pour configurer cela, consultez la documentation sur les [Archives de journaux][7].

### Attributs de partition vs. Attributs de recherche {#partition-vs-lookup-attributes}

| | Partition | Lookup |
|---|---|---|
| Cardinalité | Faible (dizaines à centaines) | Élevée (millions de valeurs) |
| Attributs typiques | `service`, `source`, `env`, `status` | `trace_id`, `container_id`, `user_id`, `transaction_id` |
| Comment cela aide | Élimine des partitions entières de l'analyse | Identifie des entrées de journal individuelles |
| Mieux utilisé pour | Filtrage large par environnement/service | Investigations ad hoc sur des identifiants spécifiques |

Pour des performances de recherche maximales, combinez les deux : les attributs de partition restreignent le champ de recherche aux segments de données pertinents, tandis que les Lookup attributes vous permettent de trouver instantanément des journaux spécifiques au sein de ces segments.

### Limite par défaut pour la Réhydratation des résultats {#default-limit-for-rehydration-of-results}

Les administrateurs ayant la `Logs Write Archives` permission peuvent configurer des contrôles par défaut pour garantir une utilisation efficace de {{< ui >}}Archive Search{{< /ui >}} au sein des équipes. Cliquez {{< ui >}}Settings{{< /ui >}} pour configurer :

- {{< ui >}}Default Rehydration volume limit{{< /ui >}} : Définissez le nombre par défaut de journaux (en millions) pouvant être réhydratés par recherche d'archive en mode {{< ui >}}Search & Rehydration{{< /ui >}}. Si la limite est atteinte, la recherche d'archive s'arrête automatiquement, mais les journaux déjà réhydratés restent accessibles. Les administrateurs peuvent également autoriser que cette limite soit modifiée lors de la création d'une recherche d'archive.

- {{< ui >}}Rehydration retention periods{{< /ui >}} : Choisissez quelles périodes de conservation sont disponibles lors de la réhydratation des résultats. Seules les durées sélectionnées (par exemple, 3, 7, 15, 30, 45, 60, 90 ou 180 jours) apparaissent dans le menu déroulant lors de la sélection de la durée pendant laquelle les journaux doivent rester recherchables dans Datadog.

## Autorisations spécifiques au cloud {#cloud-specific-permissions}

Datadog nécessite l'autorisation de lire vos archives pour rechercher du contenu à partir de celles-ci. Cette autorisation peut être modifiée à tout moment.

{{< tabs >}}
{{% tab "Amazon S3" %}}

Pour réhydrater les événements de journal à partir de vos archives, Datadog utilise le rôle IAM dans votre compte AWS que vous avez configuré pour [votre intégration AWS][1]. Si vous n'avez pas encore créé ce rôle, [suivez ces étapes pour le faire][2]. Pour permettre à ce rôle de réhydrater les événements de journal à partir de vos archives, ajoutez la déclaration d'autorisation suivante à ses politiques IAM. Assurez-vous de modifier les noms de bucket et, si vous le souhaitez, de spécifier les chemins contenant vos archives de journaux.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DatadogUploadAndRehydrateLogArchives",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
        "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
      ]
    },
    {
      "Sid": "DatadogRehydrateLogArchivesListBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": [
        "arn:aws:s3:::<MY_BUCKET_NAME_1>",
        "arn:aws:s3:::<MY_BUCKET_NAME_2>"
      ]
    }
  ]
}
```

### Ajout de la délégation de rôle aux archives S3 {#adding-role-delegation-to-s3-archives}

Datadog ne prend en charge que la recherche à partir d'archives qui ont été configurées pour utiliser la délégation de rôle afin d'accorder l'accès. Après avoir modifié votre rôle IAM Datadog pour inclure la politique IAM ci-dessus, assurez-vous que chaque archive dans votre [page de configuration des archives][3] a la bonne combinaison de compte AWS + rôle.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: /fr/integrations/amazon-web-services/#aws-iam-permissions
[3]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Stockage Azure" %}}

Datadog utilise un groupe Azure AD avec le rôle de contributeur de données de blob de stockage limité au compte de stockage de vos archives pour rechercher des événements de journal. Vous pouvez accorder ce rôle à votre compte de service Datadog depuis la page de contrôle d'accès (IAM) de votre compte de stockage en [attribuant le rôle de contributeur de données de blob de stockage à votre application d'intégration Datadog][1].

[1]: /fr/logs/archives/?tab=azurestorage#create-and-configure-a-storage-bucket
{{% /tab %}}

{{% tab "Stockage Google Cloud" %}}

Pour rechercher des événements de journal à partir de vos archives, Datadog utilise un compte de service avec le rôle de visualiseur d'objets de stockage. Vous pouvez accorder ce rôle à votre compte de service Datadog depuis la [page d'administration IAM de Google Cloud][1] en modifiant les autorisations du compte de service, en ajoutant un autre rôle, puis en sélectionnant {{< ui >}}Storage{{< /ui >}} > {{< ui >}}Storage Object Viewer{{< /ui >}}.

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/archives/?tab=awss3
[2]: /fr/observability_pipelines/destinations/datadog_archives/?tab=docker
[3]: /fr/logs/log_configuration/archives/?tab=awss3
[4]: https://app.datadoghq.com/logs/archive-search/new
[5]: https://app.datadoghq.com/logs/archive-search/
[6]: /fr/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[7]: /fr/logs/log_configuration/archives/?tab=awss3#archive-search-lookup-attribute
[8]: /fr/logs/log_configuration/archives/?tab=awss3#archive-search-partition-attribute
[9]: /fr/logs/log_configuration/archives/?tab=awss3#compression