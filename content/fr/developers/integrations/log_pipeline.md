---
aliases:
- /fr/logs/faq/partner_log_integration
- /fr/developers/integrations/log_integration/
description: Découvrez comment créer un pipeline d'intégration de logs Datadog.
further_reading:
- link: /integrations/#cat-log-collection
  tag: Documentation
  text: Voir les intégrations de logs Datadog déjà disponibles
- link: /logs/explorer/facets/
  tag: Documentation
  text: En savoir plus sur les facettes de logs
- link: /logs/explorer/
  tag: Documentation
  text: En savoir plus sur le Log Explorer
- link: /logs/log_configuration/pipelines/
  tag: Documentation
  text: En savoir plus sur les pipelines de logs
title: Créer un pipeline de log
---
## Présentation

Ce guide accompagne les partenaires technologiques dans la création d'un pipeline de log pour une intégration qui envoie des logs à Datadog. Un pipeline de log est requis pour traiter, structurer et enrichir les logs afin d'en optimiser l'utilisation.

## Meilleures pratiques
1. Utilisez les [endpoints][23] pris en charge par Datadog pour les logs.
   - L'intégration doit utiliser l'un des endpoints de collecte de logs pris en charge par Datadog.
   - Vous pouvez aussi utiliser le [endpoint HTTP de collecte de logs][1] pour envoyer des logs à Datadog.
2. Assurez la compatibilité avec tous les sites Datadog.
   - Veillez à permettre aux utilisateurs de choisir le site Datadog approprié lorsque nécessaire.
   - Consultez la section [Débuter avec les sites Datadog][2] pour connaître des détails spécifiques à chaque site.
   - Le endpoint de site Datadog pour la collecte de logs est : `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`
3. Permettez aux utilisateurs d'ajouter des tags personnalisés.
   - Les tags doivent être définis comme des attributs clé-valeur dans le corps JSON de la charge utile du log. 
   - Si les logs sont envoyés via l'API, les tags peuvent également être définis à l'aide du paramètre de requête `ddtags=<TAGS>`.
4. Définissez le tag source des logs de l'intégration.
   - Définissez le tag source comme le nom de l'intégration, par exemple `source: okta`.
   - Le tag source doit :
     - Utiliser uniquement des minuscules
     - Ne pas être modifiable par l'utilisateur (à utiliser dans les pipelines et dashboards)
5. Ne transmettez pas de logs avec des tableaux dans le corps JSON.
   - Bien que les tableaux soient pris en charge, ils ne peuvent pas être utilisés comme facettes, ce qui limite les options de filtrage.
6. Protégez les clés d'API et les clés d'application Datadog.
   - Les clés d'API Datadog ne doivent jamais apparaître dans les logs. Transmettez-les uniquement via l'en-tête de la requête ou dans le chemin HTTP.
   - Les clés d'application ne doivent pas être utilisées pour envoyer des logs.

## Créer des ressources pour l'intégration de logs
Les ressources d'intégration de logs comprennent :
1. [Des pipelines][13] - Pour traiter et structurer les logs.
2. [Des facettes][12] - Attributs utilisés pour filtrer et rechercher les logs.
Les intégrations créées par des partenaires technologiques doivent respecter la [convention de nommage standard][17] de Datadog afin de garantir la compatibilité avec les dashboards intégrés.

<div class="alert alert-danger">Pour être examinées par l'équipe chargée des intégrations chez Datadog, les intégrations de logs doivent inclure des ressources et comporter des processeurs de pipeline ou des facettes.</div>

### Présentation des pipelines

Les logs envoyés à Datadog passent par des [pipelines de logs][13] avec des processeurs qui permettent de parser, remapper et extraire les attributs, pour enrichir et uniformiser les logs sur toute la plateforme.

#### Créer un pipeline
1. Accédez à la page [**Pipelines**][3] et sélectionnez New Pipeline.
2. Dans le champ Filter, saisissez le tag source unique des logs. Par exemple, `source:okta` pour l'intégration Okta.
3. [Facultatif] Ajoutez des tags et une description pour plus de clarté.
4. Cliquez sur **Create**.

Important : assurez-vous que les logs envoyés via l'intégration sont tagués avant ingestion.

#### Ajouter des processeurs de pipeline
1. Consultez les [attributs standard Datadog][6] pour connaître les bonnes pratiques en matière de de structuration des logs.
   > Les attributs standard sont des attributs réservés qui s'appliquent sur l'ensemble de la plateforme. 
3. Cliquez sur **Add Processor** et choisissez parmi les options suivantes :
   - Attribute Remapper – Mappe les attributs de logs personnalisés vers les attributs standard Datadog.
   - Service Remapper – Garantit que les logs sont associés au bon nom de service.
   - Date Remapper – Attribue le bon horodatage aux logs.
   - Status Remapper – Mappe les statuts de logs vers les attributs standard Datadog.
   - Message Remapper – Affecte les logs au bon attribut de message.
4. Si les logs ne sont pas au format JSON, utilisez un processeur Grok parser pour extraire les attributs. Les processeurs Grok extraient les attributs et enrichissent les logs avant le mappage ou tout autre traitement.

Pour un traitement plus poussé, vous pouvez utiliser :
- Arithmetic Processor – Réalise des calculs sur les attributs des logs.
- String Builder Processor – Combine plusieurs attributs texte en une seule chaîne.

**Conseils**
- Utilisez `preserveSource:false` pour retirer les attributs sources après remappage, ce qui limite les conflits et doublons.
- Pour optimiser le parsing Grok, n'utilisez pas de correspondances globales ou génériques (*wildcard matchers*).

Utilisez les processeurs dans vos pipelines pour enrichir et restructurer vos données, et générer des attributs de logs. Pour consulter la liste complète des processeurs de logs, consultez la documentation relative aux [processeurs][10]. 

##### Prérequis

Mapper les attributs de logs de l'application vers les attributs standard de Datadog
: Utilisez l'[Attribute Remapper][5] pour associer les clés d'attributs aux [attributs standard de Datadog][6] lorsque c'est possible. Par exemple, un attribut contenant l'adresse IP du client d'un service réseau doit être remappé vers `network.client.ip`.

Mapper le tag `service` du log vers le nom du service générant les données de télémétrie 
: Utilisez le [Service Remapper][7] pour remapper l'attribut `service`. Lorsque la source et le [service][26] partagent la même valeur, remappez le tag `service` vers le tag `source`. Les tags `service` doivent être en minuscules.

Mapper l'horodatage interne des logs sur l'horodatage officiel Datadog
Utilisez le [Date Remapper][4] pour définir l'horodatage officiel des logs. Si un horodatage ne correspond pas à un [attribut standard de date][28], Datadog utilisera l'heure d'ingestion.

Mapper les attributs de statut personnalisés des logs sur l'attribut `status` officiel de Datadog
Utilisez un [Status Remapper][25] pour remapper le champ `status`, ou un [processeur de catégorie][19] si les statuts sont groupés (comme les codes HTTP).

Mapper l'attribut de message personnalisé des logs sur l'attribut `message` officiel de Datadog
Utilisez le [message remapper][9] pour définir le champ de message officiel lorsqu'il diffère du champ par défaut, afin de permettre les recherches textuelles.

Attribuer un espace de nommage aux attributs personnalisés dans les logs
Les attributs génériques qui ne correspondent pas à un [attribut standard Datadog][6] doivent être placés dans un espace de nommage s'ils sont mappés à des [facettes][14]. Par exemple, `file` devient `integration_name.file`.
Utilisez l'[Attribute Remapper][5] pour définir les clés avec un espace de nommage. 

1. Développez le pipeline nouvellement créé et cliquez sur **Add Processor** pour commencer à ajouter des processeurs.
2. Si les logs de l'intégration ne sont pas au format JSON, ajoutez le [processeur Grok][8] pour extraire les informations d'attribut. Les processeurs Grok analysent les attributs et enrichissent les logs avant le remappage ou tout autre traitement.
3. Après avoir extrait les attributs, remappez-les vers les [attributs standard de Datadog][6] à l'aide des [Attribute Remappers][5].
4. Définissez l'horodatage officiel Datadog des logs de l'intégration à l'aide du [Date Remapper][4].
5. Pour un traitement avancé et des transformations de données, utilisez des [processeurs][10] supplémentaires.
Par exemple, l'`Arithmetic Processor` peut servir à effectuer des calculs, et le `String Builder Processor` à combiner plusieurs attributs en une chaîne unique.

**Conseils**
* Utilisez `preserveSource:false` pour retirer les attributs sources après remappage, ce qui limite les conflits et doublons.
* Pour de meilleures performances de parsing Grok, évitez les correspondances larges comme `%{data:}` ou `%{regex(".*"):}`. Privilégiez des expressions ciblées.
* Suivez le cours gratuit [Des analyses plus poussées grâce au traitement des logs][20] pour apprendre à écrire des processeurs et exploiter les attributs standard. 

### Présentation des facettes

Les facettes sont des attributs qualitatifs ou quantitatifs spécifiques permettant de filtrer et d'affiner les résultats de recherche. Même si les facettes ne sont pas requises pour le filtrage, elles jouent un rôle essentiel dans la compréhension des axes de recherche disponibles. 

Les facettes basées sur des attributs standard sont ajoutées automatiquement par Datadog lorsqu'un pipeline est publié. Vérifiez si l'attribut doit être remappé vers un [attribut standard de Datadog][6]. 

Tous les attributs ne sont pas destinés à être utilisés comme facettes. Les besoins en facettes dans les intégrations se concentrent sur deux aspects :
* Les facettes offrent une interface simple pour filtrer les logs. Elles sont utilisées dans les fonctions de saisie semi-automatique de Log Management, ce qui permet aux utilisateurs de retrouver et d'agréger les informations clés contenues dans leurs logs.
* Elles offrent également la possibilité de donner un nom plus lisible à des attributs peu explicites. Par exemple, `@deviceCPUper` devient `Device CPU Utilization Percentage`.

Les [facettes][12] peuvent être créées dans le [Log Explorer][16].

#### Créer des facettes

Un bon paramétrage des facettes renforce l'efficacité des logs indexés dans les fonctions d'analyse, de surveillance et d'agrégation de la solution Log Management de Datadog.

Elles améliorent la recherche des logs applicatifs en alimentant les fonctions de saisie automatique dans Log Management.

<div class="alert alert-info">Les facettes quantitatives, appelées « Mesures », permettent aux utilisateurs de filtrer les logs selon une plage de valeurs numériques à l'aide d'opérateurs relationnels. Par exemple, une mesure appliquée à un attribut de latence permet de rechercher tous les logs dont la durée dépasse un certain seuil. </div>

##### Prérequis

Les attributs mappés à des facettes personnalisées doivent d'abord être placés dans un espace de nommage
Les attributs personnalisés génériques qui ne correspondent pas à un [attribut standard de Datadog][6] doivent être placés dans un espace de nommage lorsqu'ils sont associés à des [facettes][14] personnalisées. Un [Attribute Remapper][5] peut être utilisé pour ajouter l'espace de nommage correspondant au nom de l'intégration.  
Par exemple, `attribute_name` devient `integration_name.attribute_name`.

Les facettes personnalisées ne doivent pas dupliquer une facette Datadog existante
Pour éviter les doublons avec les facettes Datadog existantes, ne créez pas de facettes personnalisées correspondant à des attributs déjà associés à des [attributs standard de Datadog][6].

Les facettes personnalisées doivent être regroupées sous le nom `source`
Lors de la création d'une facette personnalisée, vous devez lui attribuer un groupe. Définissez la valeur du champ `Group` sur `source`, identique au nom de l'intégration.

Les facettes personnalisées doivent avoir le même type de données que l'attribut mappé
Définissez le type de données de la facette (String, Boolean, Double ou Integer) en fonction du type de l'attribut mappé. Un type incorrect empêche la facette de fonctionner comme prévu et peut entraîner un affichage erroné.

**Ajouter une facette ou une mesure**

1. Cliquez sur un log contenant l'attribut pour lequel vous souhaitez ajouter une facette ou une mesure.
2. Dans le panneau des logs, cliquez sur l'icône d'engrenage à côté de l'attribut.
3. Sélectionnez **Create facet/measure for @attribute**.
4. S'il s'agit d'une mesure, cliquez sur **Advanced options** pour définir l'unité. Sélectionnez l'unité en fonction de ce que représente l'attribut.
**Remarque** : l'[unité][11] d'une mesure doit correspondre à la signification de l'attribut.
5. Indiquez un **groupe de facette** pour faciliter la navigation dans la liste des facettes. Si le groupe n'existe pas encore, sélectionnez **New group**, saisissez un nom identique au tag source, puis ajoutez une description.
6. Pour créer la facette, cliquez sur **Add**.

#### Configurer et modifier les facettes

1. Dans le panneau des logs, cliquez sur l'icône d'engrenage à côté de l'attribut à configurer ou à regrouper.
2. Sélectionnez **Edit facet/measure for @attribute**. S'il n'y a pas encore de facette pour l'attribut, sélectionnez **Create facet/measure for @attribute**.
3. Cliquez sur **Add** ou **Update** lorsque vous avez terminé.

**Conseils**
* Il est recommandé d'attribuer une [unité][27] aux mesures lorsque c'est pertinent. Les familles disponibles sont `TIME` et `BYTES`, avec des unités telles que `millisecond` ou `gibibyte`.
* Les facettes peuvent avoir une description. Une description claire aide les utilisateurs à mieux comprendre comment exploiter la facette.
* Si vous remappez un attribut et conservez l'original avec l'option `preserveSource:true`, définissez une facette sur un seul des deux uniquement.
* Lors de la configuration manuelle des facettes dans les fichiers `.yaml` d'un pipeline, notez qu'elles sont associées à une `source`. Cela indique l'origine de l'attribut, comme `log` pour les attributs ou `tag` pour les tags.

## Exporter votre pipeline de logs

Survolez le pipeline à exporter et sélectionnez **export pipeline**.

{{< img src="developers/integrations/export_pipeline.png" alt="Cliquez sur l'icône Export Pipeline pour exporter votre pipeline de logs dans Datadog" width="50%">}}

L'exportation d'un pipeline de logs génère deux fichiers YAML :
-**pipeline-name.yaml** : le pipeline de logs, incluant les facettes personnalisées, les Attribute Remappers et les parsers Grok. 
-**pipeline_name_test.yaml** : les logs bruts fournis en exemple et une section result vide.

Remarque : selon votre navigateur, vous devrez peut-être ajuster les paramètres pour autoriser le téléchargement de fichiers.

## Importer votre pipeline de logs
Accédez à la plateforme de développement d’intégrations, puis dans l’onglet **Data** > **Submitted logs**, indiquez la source des logs et importez les deux fichiers exportés à l’étape précédente.

{{< img src="developers/integrations/data_tab.png" alt="L'onglet Data dans la plateforme de développement d'intégrations" style="width:100%;" >}}



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/latest/logs/#send-logs
[2]: https://docs.datadoghq.com/fr/getting_started/site/
[3]: https://app.datadoghq.com/logs/pipelines
[4]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#log-date-remapper
[5]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#remapper
[6]: https://docs.datadoghq.com/fr/standard-attributes?product=log+management
[7]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#service-remapper
[8]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#grok-parser
[9]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#log-message-remapper
[10]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/
[11]: https://docs.datadoghq.com/fr/logs/explorer/facets/#units
[12]: https://docs.datadoghq.com/fr/logs/explorer/facets/
[13]: https://docs.datadoghq.com/fr/logs/log_configuration/pipelines/
[14]: https://docs.datadoghq.com/fr/glossary/#facet
[15]: https://docs.datadoghq.com/fr/glossary/#measure
[16]: https://docs.datadoghq.com/fr/logs/explorer/
[17]: https://docs.datadoghq.com/fr/logs/log_configuration/attributes_naming_convention/#standard-attributes
[18]: https://docs.datadoghq.com/fr/developers/integrations/?tab=integrations
[19]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#category-processor
[20]: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
[21]: https://partners.datadoghq.com/
[22]: https://docs.datadoghq.com/fr/developers/integrations/
[23]: https://docs.datadoghq.com/fr/logs/log_collection/?tab=http#additional-configuration-options
[24]: https://docs.datadoghq.com/fr/logs/explorer/search_syntax/#arrays
[25]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui#log-status-remapper
[26]: https://docs.datadoghq.com/fr/getting_started/tagging/#overview
[27]: https://docs.datadoghq.com/fr/logs/explorer/facets/#units
[28]: https://docs.datadoghq.com/fr/logs/log_configuration/pipelines/?tab=date#date-attribute