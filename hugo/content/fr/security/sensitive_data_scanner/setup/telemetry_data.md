---
aliases:
- /fr/sensitive_data_scanner/setup/telemetry_data
- /fr/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /fr/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /fr/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /fr/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
description: Configurez les groupes et les règles du Sensitive Data Scanner pour détecter
  et masquer les données sensibles dans les Datadog logs, les APM spans, les événements
  RUM et les événements issus d'Event Management. Couvre les autorisations, les ressources
  Terraform, l'échantillonnage et les espaces de nommage exclus.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentation
  text: En savoir plus sur les règles de bibliothèque prédéfinies
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentation
  text: En savoir plus sur la création de règles personnalisées
title: Configurer le Sensitive Data Scanner pour les données de télémétrie
---
## Présentation {#overview}

Le Sensitive Data Scanner dans le Cloud analyse les données de télémétrie, telles que vos application logs, événements APM, événements RUM et événements issus d'Event Management. Les données pouvant être analysées et masquées sont :

- **Logs** : tout contenu de log structuré et non structuré, y compris les messages de log et les valeurs d'attributs
- **APM** : valeurs d'attributs de span uniquement
- **RUM** : valeurs d'attributs d'événement uniquement
- **Events** : valeurs d'attributs d'événement uniquement

Il est possible de définir des taux d'échantillonnage entre 10 % et 99 % pour chaque produit. Cela permet de gérer les coûts lors de la prise en main en réduisant la quantité de données analysées à la recherche d'informations sensibles.

Pour chaque règle d'analyse, l'une des actions suivantes peut être appliquée aux données sensibles détectées :

- **Masquer** : remplacez l'intégralité des données détectées par un jeton de votre choix, tel que `[sensitive_data]`.
- **Masquage partiel** : remplacez une partie spécifique de toutes les valeurs correspondantes.
- **Hachage** : remplacez l'intégralité des données détectées par un identifiant unique non réversible.
- **Mask** (disponible pour les logs, les spans APM et les événements RUM) : obfusquez toutes les valeurs correspondantes. Les utilisateurs disposant de l'autorisation `Data Scanner Unmask` peuvent dés-obfusquer (démasquer) et consulter ces données dans Datadog. Consultez [Mask action](#mask-action) pour plus d'informations.

**Remarques** :
- Lors de l'analyse de données échantillonnées, vous ne pourrez pas sélectionner des actions Mask visant à masquer les données analysées.
- Le Sensitive Data Scanner n'analyse pas les valeurs entières, flottantes et doubles. Si le nombre est au format chaîne, la chaîne est analysée.

Vous envoyez des logs et des événements au backend Datadog, les données quittent donc votre environnement avant d'être masquées. Les logs et les événements sont analysés et masqués dans le backend Datadog lors du traitement, de sorte que les données sensibles sont masquées avant que les événements ne soient indexés et affichés dans l'interface utilisateur de Datadog.

Si vous ne souhaitez pas que les données quittent votre environnement avant d'être masquées, utilisez [Observability Pipelines][12] et le processeur [Sensitive Data Scanner][13] pour analyser et masquer les données sensibles. Consultez [Set Up Pipelines][14] pour savoir comment configurer un pipeline et ses composants.

Pour utiliser le Sensitive Data Scanner dans le Cloud, configurez un groupe d'analyse pour définir les données à analyser, puis ajoutez des règles d'analyse pour déterminer les informations sensibles à faire correspondre dans les données.

Ce document aborde les points suivants :

- Les [autorisations](#permissions) requises pour afficher et configurer le Sensitive Data Scanner.
- [Ajout d'un groupe d'analyse](#add-a-scanning-group)
- [Ajout de règles d'analyse](#add-scanning-rules)
- [Comment contrôler l'accès aux logs contenant des données sensibles](#control-access-to-logs-with-sensitive-data)
- [Comment masquer les données sensibles dans les tags](#redact-sensitive-data-in-tags)

## Configuration {#setup}

### Autorisations{#permissions}

Par défaut, les utilisateurs disposant du rôle Datadog Admin ont accès à l'affichage et à la configuration des règles d'analyse. Pour autoriser d'autres utilisateurs, accordez les autorisations `data_scanner_read` ou `data_scanner_write` sous [Compliance][1] à un rôle personnalisé. Consultez [Access Control][2] pour plus de détails sur la configuration des rôles et des autorisations.

Si une règle d'analyse utilise l'action **mask** pour les données sensibles correspondantes, les utilisateurs disposant de l'autorisation `data_scanner_unmask` peuvent démasquer et afficher les données dans Datadog. **Remarque** : Datadog déconseille l'utilisation de l'action **mask** pour les identifiants, sauf si vous avez prévu de répondre à toute fuite d'identifiants et de les renouveler. Consultez [Mask action](#mask-action) pour plus d'informations.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Les sections des autorisations de conformité affichant les autorisations de lecture et d'écriture du scanner de données" style="width:80%;">}}

### Configuration guidée {#guided-setup}

Lorsque vous configurez le Sensitive Data Scanner pour la première fois, ou lorsque votre organisation n'a aucun groupe d'analyse configuré, Datadog propose une configuration guidée dans l'application. Ouvrez la page des paramètres du [Sensitive Data Scanner][5] et suivez les étapes à l'écran pour sélectionner les données que vous souhaitez analyser, créer un groupe d'analyse et ajouter des règles d'analyse. C'est la méthode recommandée pour commencer.

Pour configurer manuellement des groupes et des règles d'analyse, ou pour ajuster une configuration existante, suivez les sections ci-dessous.

### Ajouter un groupe d'analyse {#add-a-scanning-group}

Un groupe d'analyse détermine quelles données analyser. Il se compose d'un filtre de requête, d'un ensemble de boutons pour activer l'analyse pour les logs, APM, RUM et les événements, ainsi que de l'option permettant de définir des taux d'échantillonnage entre 10 % et 99 % pour chaque produit. Consultez la documentation sur la [Log Search Syntax][3] pour en savoir plus sur les filtres de requête.

Pour Terraform, consultez la ressource [Datadog Sensitive Data Scanner group][4].

Pour configurer un groupe d'analyse, effectuez les étapes suivantes :

1. Accédez à la page des paramètres du [Sensitive Data Scanner][5].
1. Cliquez sur {{< ui >}}Add scanning group{{< /ui >}}. Sinon, cliquez sur le menu déroulant {{< ui >}}Add{{< /ui >}} dans le coin supérieur droit de la page et sélectionnez {{< ui >}}Add Scanning Group{{< /ui >}}.
1. Saisissez un filtre de requête pour les données que vous souhaitez analyser. En haut, cliquez sur {{< ui >}}APM Spans{{< /ui >}} pour prévisualiser les spans filtrés. Cliquez sur {{< ui >}}Logs{{< /ui >}} pour voir les logs filtrés.
1. Saisissez un nom et une description pour le groupe.
1. Cliquez sur les boutons d'option pour activer le Sensitive Data Scanner pour les produits souhaités (par exemple, les logs, les spans APM, les événements RUM et les événements Datadog).
1. Définissez éventuellement un taux d'échantillonnage de 10 à 99 % pour les produits souhaités. Lorsque vous ajoutez des règles d'analyse à un groupe pour lequel l'échantillonnage est activé, vous ne pourrez pas sélectionner d'actions Mask visant à masquer les données qu'il analyse. Pour masquer les correspondances, vous devez choisir d'analyser toutes les données correspondant au filtre de requête de votre groupe.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

Par défaut, un groupe d'analyse nouvellement créé est désactivé. Pour activer un groupe d'analyse, cliquez sur le bouton bascule correspondant sur le côté droit.

### Ajouter des règles d'analyse {#add-scanning-rules}

Une règle d'analyse détermine quelles informations sensibles doivent correspondre au sein des données définies par un groupe d'analyse. Vous pouvez ajouter des règles d'analyse prédéfinies à partir de la bibliothèque de règles d'analyse de Datadog ou créer vos propres règles à l'aide de modèles d'expression régulière (regex). Les données sont analysées au moment de l'ingestion pendant le traitement. Pour les logs, cela signifie que l'analyse est effectuée avant l'indexation et les autres décisions de routage.

Dans la mesure du possible, utilisez les règles de bibliothèque prêtes à l'emploi de Datadog. Ces règles sont des règles prédéfinies qui détectent des modèles courants tels que les adresses e-mail, les numéros de carte de crédit, les clés d'API, les jetons d'autorisation, les informations réseau et sur les appareils, et plus encore. Chaque règle dispose de mots-clés recommandés pour le dictionnaire de mots-clés afin d'affiner la précision de la correspondance. Vous pouvez également [ajouter vos propres mots-clés](#add-custom-keywords).

Pour Terraform, consultez la ressource [Datadog Sensitive Data Scanner rule][6].


**Remarque** : Sensitive Data Scanner prend en charge jusqu'à 750 règles d'analyse par organisation pour les données de télémétrie (Logs, APM, RUM et Events). Cette limite s'applique à tous les groupes d'analyse.

Pour ajouter des règles d'analyse, effectuez les étapes suivantes :

1. Accédez à la page des paramètres du [Sensitive Data Scanner][5].
1. Cliquez sur le groupe d'analyse dans lequel vous souhaitez ajouter les règles d'analyse.
1. Cliquez sur {{< ui >}}Add Scanning Rule{{< /ui >}}. Sinon, cliquez sur le menu déroulant {{< ui >}}Add{{< /ui >}} dans le coin supérieur droit de la page et sélectionnez {{< ui >}}Add Scanning Rule{{< /ui >}}.
1. Sélectionnez si vous souhaitez ajouter une règle de bibliothèque ou créer une règle d'analyse personnalisée.

{{% collapse-content title="Ajouter des règles de bibliothèque" level="p" id="add-library-rules" %}}

La bibliothèque de règles d'analyse contient des règles prédéfinies pour détecter des modèles courants tels que les adresses e-mail, les numéros de carte de crédit, les clés d'API, les jetons d'autorisation, et plus encore.

1. Sélectionnez un groupe d'analyse si vous n'avez pas créé cette règle au sein d'un groupe d'analyse.
1. Dans le menu déroulant {{< ui >}}Priority{{< /ui >}}, sélectionnez le niveau de priorité de la règle en fonction de vos besoins métier.
1. Dans la section {{< ui >}}Add Library Rules{{< /ui >}}, sélectionnez les règles de bibliothèque que vous souhaitez utiliser.
{{% sds-scanning-rule %}}
1. Cliquez sur {{< ui >}}Add Rules{{< /ui >}}.

#### Ajouter des mots-clés personnalisés {#add-custom-keywords}

Les [mots-clés recommandés][15] sont utilisés par défaut lorsque des règles de bibliothèque sont ajoutées. Après avoir ajouté des règles de bibliothèque, vous pouvez modifier chaque règle séparément et ajouter ou supprimer des mots-clés du dictionnaire de mots-clés. Par exemple, si vous recherchez un numéro de carte de crédit Visa à seize chiffres, vous pouvez ajouter des mots-clés tels que `visa`, `credit` et `card`.

1. Accédez à la page des paramètres du [Sensitive Data Scanner][5].
1. Cliquez sur le groupe d'analyse contenant la règle que vous souhaitez modifier.
1. Survolez la règle, puis cliquez sur l'icône en forme de crayon.
1. Dans la section {{< ui >}}Match Conditions{{< /ui >}}, cliquez sur {{< ui >}}Custom Keywords{{< /ui >}}.
    - Pour ajouter des mots-clés, saisissez un mot-clé et cliquez sur l'icône plus pour l'ajouter à la liste.
    - Pour supprimer des mots-clés, cliquez sur le **X** à côté du mot-clé que vous souhaitez supprimer.
    - Vous pouvez également exiger que ces mots-clés se trouvent à un nombre de caractères spécifié d'une correspondance. Par défaut, les mots-clés doivent se trouver dans les 30 caractères précédant une valeur correspondante.
    - Pour les événements structurés, les mots-clés sont également mis en correspondance avec les noms d'attributs dans le chemin de l'événement. Les séparateurs tels que `-`, `_` et `.` dans les noms d'attributs comptent comme des limites de mots, donc le mot-clé `card` correspond à un attribut nommé `card_number` ou `card-type`. La limite de caractères ne s'applique pas à la correspondance des noms d'attributs.
    - **Remarque** : Vous ne pouvez pas avoir plus de 20 mots-clés pour une règle.
1. Dans la section {{< ui >}}Type or paste event data to test the rule{{< /ui >}}, ajoutez des données d'événement pour évaluer votre règle et ajoutez des mots-clés pour affiner les conditions de correspondance.
1. Cliquez sur {{< ui >}}Update{{< /ui >}}.

#### Ajouter des suppressions {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="Ajouter une règle personnalisée" level="p" id="add-custom-rule"%}}
Vous pouvez créer des règles d'analyse personnalisées à l'aide de motifs regex pour rechercher des données sensibles.

1. Sélectionnez un groupe d'analyse si vous n'avez pas créé cette règle au sein d'un groupe d'analyse.
1. Saisissez un nom pour la règle.
1. Dans le menu déroulant {{< ui >}}Priority{{< /ui >}}, sélectionnez le niveau de priorité de la règle en fonction de vos besoins métier.
1. (Facultatif) Saisissez une description pour la règle.
1. Dans la section {{< ui >}}Match conditions{{< /ui >}}, spécifiez le motif regex à utiliser pour la correspondance avec les événements dans le champ {{< ui >}}Regex pattern{{< /ui >}}. Définissez des motifs regex aussi précis que possible, car les motifs génériques entraînent davantage de faux positifs.<br>
    Sensitive Data Scanner prend en charge les expressions régulières compatibles Perl (PCRE), mais les motifs suivants ne sont pas pris en charge :
    - Rétro-références et sous-expressions de capture (lookarounds)
    - Assertions arbitraires de largeur nulle
    - Références de sous-routine et motifs récursifs
    - Motifs conditionnels
    - Verbes de contrôle de retour sur trace (backtracking)
    - La directive `\C` « single-byte » (qui rompt les séquences UTF-8)
    - La correspondance de nouvelle ligne `\R`
    - La directive de réinitialisation du début de correspondance `\K`
    - Appels et code intégré
    - Groupement atomique et quantificateurs possessifs
1. Pour {{< ui >}}Check surrounding match context for keywords to reduce noise{{< /ui >}}, ajoutez des mots-clés afin d'affiner la précision de la détection lors de la correspondance avec les conditions regex. Par exemple, si vous recherchez un numéro de carte de crédit Visa à seize chiffres, vous pouvez ajouter des mots-clés tels que `visa`, `credit` et `card`.
    - Pour ajouter des mots-clés, saisissez un mot-clé et cliquez sur l'icône plus pour l'ajouter à la liste.
    - Pour supprimer des mots-clés, cliquez sur le **X** à côté du mot-clé que vous souhaitez supprimer.
    - Vous pouvez également exiger que ces mots-clés se trouvent à un nombre de caractères spécifié d'une correspondance. Par défaut, les mots-clés doivent se trouver dans les 30 caractères précédant une valeur correspondante.
    - Pour les événements structurés, les mots-clés sont également mis en correspondance avec les noms d'attributs dans le chemin de l'événement. Les séparateurs tels que `-`, `_` et `.` dans les noms d'attributs comptent comme des limites de mots, donc le mot-clé `card` correspond à un attribut nommé `card_number` ou `card-type`. La limite de caractères ne s'applique pas à la correspondance des noms d'attributs.
      **Remarque** : Vous ne pouvez pas avoir plus de 20 mots-clés pour une règle.
{{% sds-suppressions %}}
1. Dans la section {{< ui >}}Type or paste event data to test the rule{{< /ui >}}, ajoutez des données d'événement pour évaluer votre règle et ajoutez des mots-clés pour affiner les conditions de correspondance.
{{% sds-scanning-rule %}}
1. Cliquez sur {{< ui >}}Add Rule{{< /ui >}}.

{{% /collapse-content %}}

**Remarques** :

- Toutes les règles que vous ajoutez ou mettez à jour n'affectent que les données arrivant dans Datadog après la définition de la règle.
- Le Sensitive Data Scanner n'affecte aucune règle que vous définissez directement sur le Datadog Agent.
- Une fois les règles ajoutées, assurez-vous que les commutateurs de vos groupes d'analyse sont activés pour commencer l'analyse.
- Lorsque vous ajoutez des règles à un groupe d'analyse avec l'échantillonnage activé, vous ne pourrez pas sélectionner les actions **redact**, **partially redact** ou **hash**. Pour une obfuscation complète, désactivez l'échantillonnage dans les paramètres de votre groupe d'analyse.

Consultez [Investigate Sensitive Data Findings][7] pour plus de détails sur le tri des données sensibles à l'aide de la page [Findings][8].

#### Espaces de nommage exclus {#excluded-namespaces}

Il existe des mots-clés réservés requis par la plateforme Datadog pour ses fonctionnalités. Si l'un de ces mots figure dans un log en cours d'analyse, les 30 caractères suivant le mot correspondant sont ignorés et ne sont pas expurgés. Par exemple, ce qui suit le mot `date` dans un log est généralement l'horodatage de l'événement. Si l'horodatage est accidentellement expurgé, cela entraînerait des problèmes de traitement du log et d'interrogation ultérieure. Par conséquent, le comportement pour les espaces de nommage exclus consiste à empêcher l'expurgation involontaire d'informations importantes pour la fonctionnalité du produit.

Les espaces de nommage exclus sont :

{{% tabs %}}
{{% tab "Logs" %}}

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`
- `x-datadog-trace-id`
- `contextMap.dd.span_id`
- `contextMap.dd.trace_id`

{{% /tab %}}
{{% tab "Spans" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.ai_guard`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`
- `x-datadog-trace-id`
- `x-datadog-parent-id`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### Supprimer des correspondances spécifiques pour ignorer les données dont le risque est accepté {#suppress-specific-matches-to-ignore-risk-accepted-data}

Utilisez les suppressions pour ignorer les correspondances de données sensibles que vous considérez comme opérationnellement sûres (par exemple : domaines de messagerie internes ou plages d'adresses IP privées).

**Remarques** :
- Les correspondances supprimées ne sont ni expurgées, ni masquées, ni hachées.
- Les correspondances supprimées sont exclues de la page Findings, des tableaux de bord, des alertes et des autres workflows de reporting.
- Les suppressions sont définies par règle au sein d'un groupe d'analyse.

#### Analyser ou exclure des attributs spécifiques {#scan-or-exclude-specific-attributes}

Pour rendre les correspondances plus précises, vous pouvez également effectuer l'une des opérations suivantes :

- Analyser l'événement entier mais exclure certains attributs de l'analyse. Par exemple, si vous recherchez des informations personnellement identifiables (PII) comme des adresses physiques, vous souhaiterez peut-être exclure des attributs tels que `ip_address`.
- Recherchez des attributs spécifiques pour restreindre le périmètre des données analysées. Par exemple, si vous recherchez des adresses physiques, vous pouvez choisir des attributs spécifiques tels que `street` et `city`.

**Remarque** : N'utilisez pas le préfixe `@` dans le chemin de l'attribut lors de la spécification des noms d'attributs. Par exemple, utilisez `function.request.body.password` au lieu de `@function.request.body.password`. Le préfixe `@` utilisé dans les requêtes de recherche et d'autres parties de Datadog n'est pas pris en charge dans ce champ.

### Modifier les règles d'analyse {#edit-scanning-rules}

Pour modifier les règles d'analyse :

1. Accédez à la page des paramètres du [Sensitive Data Scanner][5].
1. Survolez la règle d'analyse que vous souhaitez modifier et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} (crayon).
1. Apportez les modifications souhaitées à la règle. Selon le type de règle que vous modifiez, consultez [Ajouter des règles de bibliothèque](#add-library-rules) ou [Ajouter une règle personnalisée](#add-custom-rule) pour plus d'informations sur chaque section de configuration.
1. Cliquez sur {{< ui >}}Update{{< /ui >}}.

## Contrôler l'accès aux logs contenant des données sensibles {#control-access-to-logs-with-sensitive-data}

Pour contrôler qui peut accéder aux logs contenant des données sensibles, utilisez les tags ajoutés par le Sensitive Data Scanner pour créer des requêtes avec le contrôle d'accès basé sur les rôles (RBAC). Vous pouvez restreindre l'accès à des personnes ou des équipes spécifiques jusqu'à ce que les données soient expirées après la période de rétention. Consultez [Comment configurer le RBAC pour les logs][9] pour plus d'informations.

### Action de masquage {#mask-action}

{{% sds-mask-action %}}

## Masquez les données sensibles dans les tags {#redact-sensitive-data-in-tags}

Pour masquer les données sensibles contenues dans les tags, vous devez [remapper][10] le tag vers un attribut, puis masquer l'attribut. Décochez `Preserve source attribute` dans le processeur de remappage afin que le tag ne soit pas conservé lors du remappage.

Pour remapper le tag vers un attribut:

1. Accédez à votre [log pipeline][11].
2. Cliquez sur {{< ui >}}Add Processor{{< /ui >}}.
3. Sélectionnez {{< ui >}}Remapper{{< /ui >}} dans le menu déroulant du type de processeur.
4. Nommez le processeur.
5. Sélectionnez {{< ui >}}Tag key(s){{< /ui >}}.
6. Saisissez la clé de tag.
7. Saisissez un nom pour l'attribut vers lequel la clé de tag est remappée.
8. Désactivez {{< ui >}}Preserve source attribute{{< /ui >}}.
9. Cliquez sur {{< ui >}}Create{{< /ui >}}.

Pour masquer l'attribut :

1. Accédez à votre [groupe d'analyse][5].
2. Cliquez sur {{< ui >}}Add Scanning Rule{{< /ui >}}.
3. Cochez les règles de bibliothèque que vous souhaitez utiliser.
4. Sélectionnez {{< ui >}}Specific Attributes{{< /ui >}} pour {{< ui >}}Scan entire event or portion of it{{< /ui >}}.
5. Saisissez le nom de l'attribut que vous avez créé précédemment pour spécifier que vous souhaitez qu'il soit analysé. **Remarque** : N'utilisez pas le préfixe `@` dans le chemin de l'attribut. Par exemple, utilisez `function.request.body.password` au lieu de `@function.request.body.password`. 
6. Sélectionnez l'action souhaitée en cas de correspondance.
7. Ajoutez facultativement des tags.
8. Cliquez sur {{< ui >}}Add Rules{{< /ui >}}.

## Réhydratation des logs {#log-rehydration}

Lorsque vous réhydratez des logs à partir d'une archive, le Sensitive Data Scanner ne réanalyse pas ces logs. Au lieu de cela, Datadog restaure les logs exactement tels qu'ils ont été écrits dans l'archive.

Si votre archive est configurée pour inclure des [tags Datadog][16], et que vos règles d'analyse ont ajouté des tags lorsque les logs ont été initialement ingérés et traités par le Sensitive Data Scanner, vous pouvez utiliser ces tags pour identifier quels logs réhydratés contenaient précédemment des données sensibles. Cela vous permet de filtrer les logs réhydratés à l'aide de requêtes telles que `sensitive_data:<rule_tag_name>`.

Les métadonnées des données sensibles correspondantes ne sont pas stockées dans les logs archivés, les correspondances de données sensibles ne sont donc pas mises en évidence lorsque ces logs sont réhydratés. Le format d'archive contient uniquement la charge utile originale du log et tous les tags préservés. Il n'inclut pas les informations de positionnement que le Sensitive Data Scanner utilise dans l'interface utilisateur de Datadog pour mettre visuellement en évidence les valeurs détectées.

Ce que vous pouvez faire avec les logs réhydratés :

- Si des tags ont été inclus dans l'archive, filtrez les logs ayant précédemment correspondu aux règles d'analyse :
- Enquêtez sur des événements historiques contenant des données sensibles.

Ce que vous **ne pouvez pas** faire avec les logs réhydratés :

- Afficher dans l'interface utilisateur les correspondances de données sensibles mises en évidence en ligne : les correspondances restent obfusquées même si mask, redact, partially redact ou hash a été choisi comme action lors de la correspondance.
- Déclenchez des analyses rétroactives : le Sensitive Data Scanner ne réanalyse pas les logs réhydratés.

## Désactiver le Sensitive Data Scanner {#disable-sensitive-data-scanner}

Pour désactiver complètement le Sensitive Data Scanner, réglez le commutateur sur **off** pour chaque Scanning Group afin qu'ils soient désactivés.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#compliance
[2]: /fr/account_management/rbac/
[3]: /fr/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /fr/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /fr/logs/guide/logs-rbac/
[10]: /fr/logs/log_configuration/processors/remapper/
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /fr/observability_pipelines/
[13]: /fr/observability_pipelines/processors/sensitive_data_scanner/
[14]: /fr/observability_pipelines/configuration/set_up_pipelines/
[15]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /fr/logs/log_configuration/archives/?tab=awss3#datadog-tags