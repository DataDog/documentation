---
aliases:
- /fr/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /fr/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /fr/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /fr/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /fr/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /fr/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /fr/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /fr/security/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
description: Personnalisez les logs ingérés que Cloud SIEM analyse en configurant
  des filtres Security ou des filtres d'index de logs. Couvre le produit Cloud SIEM
  qui s'applique à votre organisation, UI and API configuration, les champs de filtre
  pris en charge et non pris en charge, ainsi que les modèles courants pour AWS, Azure,
  Google Cloud, les fournisseurs d'identité, et plus encore.
further_reading:
- link: /security/detection_rules/
  tag: Documentation
  text: Règles de détection
- link: /security/cloud_siem/ingest_and_enrich/content_packs
  tag: Documentation
  text: Paquets de contenu
- link: /security/cloud_siem/guide/determine-cloud-siem-product/
  tag: Documentation
  text: Déterminez le produit Cloud SIEM utilisé par votre organisation
title: Personnalisez les logs analysés par Cloud SIEM
---
## Présentation {#overview}

Cloud SIEM analyse les logs ingérés pour détecter les menaces à l'aide de [règles de détection][1]. La plupart des organisations s'appuient sur des [Content Packs][7] pour gérer les logs que Cloud SIEM analyse ; chaque Content Pack inclut des filtres prédéfinis pour la source de logs qu'il couvre. Si vous avez besoin d'un contrôle plus granulaire (par exemple, pour exclure un environnement ou pour restreindre l'analyse à un ensemble de logs personnalisé), configurez le filtrage des logs directement.

## Outils de filtrage et méthodes de configuration {#filtering-tools-and-configuration-methods}

Les outils de filtrage et les méthodes de configuration disponibles dépendent de votre produit Cloud SIEM :

| Produit Cloud SIEM    | Outil de filtrage                           | Méthodes de configuration                                                                                                 |
|-----------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Autonome            | Filtres d'index de logs (pas de filtres Security) | [UI de configuration des logs](#cloud-siem-standalone-filter-the-cloud-siem-index)                                            |
| Module complémentaire avec Flex Logs | Filtres Security                         | [UI](#configure-security-filters-in-the-ui-add-on-with-flex-logs) et [API](#configure-security-filters-with-the-api) |
| Legacy                | Filtres Security                         | [API](#configure-security-filters-with-the-api)                                                                       |

L'offre autonome avec 12 mois de rétention est le produit par défaut pour les nouvelles organisations Cloud SIEM. Si vous ne savez pas quel produit Cloud SIEM votre organisation utilise, consultez [Déterminer le produit Cloud SIEM utilisé par votre organisation][2].

<div class="alert alert-info">Les filtres Security et les filtres d'index de logs contrôlent uniquement les logs analysés par Cloud SIEM. Les logs générés par le Datadog Agent pour Workload Protection (<code>source:runtime-security-agent</code>) et Cloud Security Misconfigurations (<code>source:compliance-agent</code>) ne sont pas facturés en tant que logs analysés, quelle que soit la configuration du filtre.</div>

### Cloud SIEM Standalone : Filtrer l'index Cloud SIEM {#cloud-siem-standalone-filter-the-cloud-siem-index}

Cloud SIEM Standalone n'utilise pas de filtres Security. Les organisations Cloud SIEM Standalone contrôlent les logs que Cloud SIEM analyse en configurant un filtre d'index sur l'index de logs Cloud SIEM.

Un filtre d'index est une requête qui spécifie quels logs entrent dans l'index. Les logs qui ne correspondent pas au filtre ne sont pas indexés et ne sont donc pas analysés par Cloud SIEM. La syntaxe de requête est identique à la syntaxe de recherche de logs Datadog standard :

Pour des instructions de configuration complètes, consultez [Filtres d'index][3] dans la documentation de configuration des logs :

**Ce guide ne s'applique pas à Cloud SIEM Standalone.**

## Fonctionnement des filtres Security {#how-security-filters-work}

Les filtres Security spécifient les logs ingérés que Cloud SIEM analyse. Cloud SIEM évalue chaque log ingéré par rapport à tous les filtres Security activés.

Les filtres Security sont **inclusifs** : Datadog analyse un log si celui-ci correspond à au moins un filtre Security activé et n'est pas supprimé par une exclusion sur ce filtre. Un filtre Security se compose de trois parties :

- Une **requête** qui sélectionne les logs auxquels le filtre correspond.
- Zéro ou plusieurs **filtres d'exclusion**, chacun avec sa propre requête. Un log correspondant à la requête principale est exclu de l'analyse s'il correspond également à une requête d'exclusion.
- Un **statut** (actif ou inactif). Les filtres inactifs sont ignorés par Cloud SIEM mais restent enregistrés pour une utilisation ultérieure.

Cloud SIEM marque chaque log ingéré avec `datadog.cloud_siem:true` ou `datadog.cloud_siem:false`, selon que les filtres Security ont sélectionné le log pour l'analyse. Vous pouvez utiliser ce tag dans Logs Explorer pour vérifier l'effet de vos filtres Security sur un log spécifique.

### Limitations des requêtes de filtre Security {#limitations-on-security-filter-queries}

Datadog évalue les filtres Security avant que Cloud SIEM n'applique l'enrichissement geoIP, threat intel et OCSF observable. Les champs renseignés par l'enrichissement ne sont pas présents dans le log lorsque les filtres Security l'évaluent ; par conséquent, les requêtes des filtres Security ne peuvent pas s'y référer de manière fiable. La contrainte s'applique de deux manières distinctes :

- **Champs non présents au moment de l'évaluation du filtre.** Ces champs sont renseignés uniquement par l'enrichissement standard de Cloud SIEM, qui s'exécute après les filtres Security. Une requête de filtre Security qui référence l'un de ces champs ne correspond à aucun log.
  - `network.ip.list`
  - `network.ip.attributes`
  - `network.client.is_private_network_ip`
  - `network.destination.is_private_network_ip`
  - `ocsf.observables`
  - `ocsf.type_uid`

  Pour filtrer sur ces catégories de données, réécrivez la requête en utilisant des attributs présents au moment de l'ingestion, tels que `source`, `service`, `host`, les tags et les attributs de log analysés.

- **Champs dont la disponibilité dépend de la configuration du pipeline.** Ces champs peuvent être renseignés soit par un processeur Logs Pipeline (avant les filtres Security), soit par l'enrichissement standard de Cloud SIEM (après les filtres Security). Le fait qu'une requête de filtre Security sur l'un de ces champs fonctionne dépend de la configuration du processeur de pipeline correspondant.
  - `network.client.geoip` (et sous-attributs tels que `network.client.geoip.country.iso_code`)
  - `threat_intel.results`
  - `threat_intel.indicators_matched`

  Pour rendre ces champs disponibles pour les requêtes de filtre Security, configurez le processeur d'enrichissement GeoIP ou Threat Intel correspondant dans votre [Logs Pipeline][8]. Une fois le processeur en place, les champs sont renseignés avant l'exécution des filtres Security.

L'enrichissement GeoIP de Cloud SIEM utilise le même GeoIPFilter et la même base de données IPinfo qu'un processeur GeoIP de Logs Pipeline, de sorte que les données GeoIP sont identiques, quel que soit le chemin qui les alimente. La solution de contournement pour threat intel est différente : un Pipeline Threat Intel Enrichment processor s'appuie sur vos propres sources threat intel (voir [Apportez votre propre renseignement sur les menaces][9] pour obtenir des conseils de configuration), ce qui produit un ensemble de correspondances différent de celui de threat intel out-of-the-box, gérée par Datadog, de Cloud SIEM. Si vous vous fiez à threat intel out-of-the-box de Cloud SIEM, la mise en correspondance ne peut pas être déplacée en amont des filtres Security.

L'évaluation de pré-enrichissement s'applique uniquement aux filtres Security. Les règles de détection, les règles de suppression et les requêtes de signal s'exécutent sur le log post-enrichissement et peuvent continuer à référencer ces champs.

## Configurer les filtres Security dans l'UI (module complémentaire avec Flex Logs) {#configure-security-filters-in-the-ui-add-on-with-flex-logs}

**S'applique à :** Module complémentaire Cloud SIEM avec Flex Logs. Les organisations utilisant Cloud SIEM Legacy doivent configurer les filtres Security via l'[API](#configure-security-filters-with-the-api).

<div class="alert alert-info">Pour la plupart des cas d'utilisation, le moyen le plus simple de gérer les logs analysés par Cloud SIEM consiste à activer ou désactiver les <a href="/security/cloud_siem/ingest_and_enrich/content_packs">Content Packs</a>. Chaque Content Pack gère son propre filtre Security ; ainsi, l'activation ou la désactivation d'un Content Pack ajoute ou supprime automatiquement le filtre correspondant. L'UI des filtres Security décrite ci-dessous est fournie pour un réglage précis et un contrôle personnalisé des logs au-delà de ce que couvrent les Content Packs.</div>

La section {{< ui >}}Security Filters Configuration{{< /ui >}} répertorie chaque filtre Security, sa requête, ses exclusions et son état d'activation actuel. Un volet {{< ui >}}Preview{{< /ui >}} en bas de la section diffuse les logs qui atteignent l'analyse Cloud SIEM après l'application de chaque filtre activé. Utilisez le volet {{< ui >}}Preview{{< /ui >}} pour valider que votre configuration de filtre produit le résultat attendu.

{{< img src="security/cloud_siem/guide/siem_settings_page_security_filters.png" alt="La section Configuration des filtres Security de la page des paramètres de Cloud SIEM, affichant une liste de filtres configurés avec des colonnes pour le nom, les filtres et l'état actif, suivie d'un volet de prévisualisation diffusant les logs correspondants" style="width:100%;" >}}

### Créer un filtre Security {#create-a-security-filter}

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [**Settings**][4].
1. Faites défiler jusqu'à la section **Configuration des filtres Security** et cliquez dessus pour la développer.
1. Dans la section **Configuration des filtres Security**, cliquez sur {{< ui >}}\+ New Security Filter{{< /ui >}}. La fenêtre {{< ui >}}New Security Filter{{< /ui >}} s'ouvre.
1. Dans la fenêtre **Nouveau filtre Security**, saisissez :
   - **Nom:** Un nom court et descriptif (par exemple, `AWS CloudTrail`).
   - **Requête:** La requête de log qui sélectionne les logs que Cloud SIEM doit analyser (par exemple, `source:cloudtrail`).
   - **Filtres d'exclusion** (facultatif) : Une ou plusieurs requêtes d'exclusion qui soustraient des logs de la correspondance du filtre. Pour en ajouter un, cliquez sur {{< ui >}}\+ New Exclusion Filter{{< /ui >}} et saisissez une requête d'exclusion.
   - **Statut du filtre:** Réglez sur {{< ui >}}Active{{< /ui >}} pour activer le filtre lors de l'enregistrement.
1. Consultez le volet **Prévisualisation** pour confirmer que le filtre correspond aux logs attendus.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="security/cloud_siem/guide/siem_settings_add_security-filter_empty.png" alt="La boîte de dialogue Nouveau filtre Security avec les champs Nom et Requête vides, aucun filtre d'exclusion, le statut du filtre réglé sur Actif et un volet Prévisualisation affichant les statistiques d'ingestion des logs en temps réel" style="width:100%;" >}}

### Modifier ou désactiver un filtre Security {#edit-or-disable-a-security-filter}

1. Dans la section **Configuration des filtres Security**, cliquez sur **Modifier** {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} l'icône sur la ligne du filtre.
2. Dans la boîte de dialogue **Modifier le filtre Security**, mettez à jour le nom, la requête, les exclusions ou le statut du filtre.
3. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour désactiver un filtre sans le supprimer, réglez **Statut du filtre** sur inactif. Le filtre reste enregistré afin que vous puissiez le réactiver ultérieurement.

### Supprimer un filtre Security {#delete-a-security-filter}

Dans la section **Configuration des filtres Security**, cliquez sur l'icône **Supprimer** {{< img src="icons/delete.png" inline="true" style="width:14px;">}} sur la ligne du filtre, puis confirmez la suppression.

Le filtre intégré `all ingested logs` ne peut pas être supprimé, mais vous pouvez le désactiver.

## Configurer les filtres Security avec l'API {#configure-security-filters-with-the-api}

**S'applique à:** Cloud SIEM Add-on avec Flex Logs et Cloud SIEM Legacy.

Lorsque vous travaillez avec l'API, vous devez comprendre quelle version de Cloud SIEM vous utilisez. Les versions affectent la logique des filtres Security, et Cloud SIEM analyse uniquement les logs en fonction de la logique des filtres présents.
- Pour **Add-on avec Flex Logs**, aucun filtre Security n'est présent lors de votre première intégration. Chaque pack de contenu que vous activez ajoute un filtre Security afin que Cloud SIEM puisse analyser ces logs.
- **Legacy** fonctionne différemment. Il est fourni avec un filtre par défaut qui permet d'analyser tous les logs. Datadog recommande d'ajouter des filtres d'exclusion au filtre par défaut pour réduire vos volumes de logs.

### Prérequis pour l'API Cloud SIEM {#prerequisites-for-the-cloud-siem-api}

- Une clé d'API et une clé d'application provenant d'un utilisateur administrateur. Les deux sont disponibles sur la [page des clés d'API de votre compte Datadog][5]. Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` dans les exemples de cette section par votre clé d'API et votre clé d'application.
- `curl` installé sur la machine exécutant les exemples. Pour des exemples dans d'autres langages, consultez la [documentation de l'API Security Monitoring][6].

<div class="alert alert-info">Plusieurs des charges utiles de l'API Security Filter incluent un <code>version</code> attribut. <code>version</code> est facultatif : si vous l'omettez, l'API met à jour la dernière version du filtre. Inclure <code>version</code> lorsque vous souhaitez que la requête ne réussisse que par rapport à une version spécifique connue (par exemple, pour éviter d'écraser des modifications simultanées).</div>

### Créer un filtre Security personnalisé {#create-a-custom-security-filter}

Les filtres Security personnalisés indiquent à Cloud SIEM quels logs il doit analyser. Cet exemple d'appel crée un filtre qui correspond à `source:cloudtrail`, afin que Cloud SIEM analyse les logs provenant d'AWS CloudTrail.

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

Exemple de réponse :

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

### Ajoutez une exclusion à un filtre Security existant {#add-an-exclusion-to-an-existing-security-filter}

Vous pouvez affiner les filtres Security existants à l'aide de filtres d'exclusion. Ils sont utiles pour supprimer les logs que la requête du filtre principal traiterait autrement. Cet exemple exclut les logs marqués `env:staging`.

1. Obtenez les filtres Security existants pour trouver le `id` du filtre :
   ```bash
   curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
   ```

   Example response:

   ```json
   {
       "data": [
           {
               "attributes": {
                   "is_enabled": true,
                   "is_builtin": true,
                   "name": "all ingested logs",
                   "filtered_data_type": "logs",
                   "exclusion_filters": [],
                   "version": 1,
                   "query": "*"
               },
               "type": "security_filters",
               "id": "l6l-rmx-mqx"
           }
       ]
   }
   ```

   Dans l'exemple de réponse, le filtre `id` est `l6l-rmx-mqx`. Chaque organisation possède ses propres identifiants de filtre uniques ; récupérez donc toujours le `id` actuel avant d'envoyer une requête PATCH.
2. Appliquez un PATCH au filtre pour ajouter l'exclusion. Remplacez `<FILTER_ID>` par le `id` renvoyé par la requête de liste :
   ```bash
   curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
   --header 'Content-Type: application/json' \
   --header 'DD-API-KEY: <DATADOG_API_KEY>' \
   --header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
   --data-raw '{
       "data": {
           "attributes": {
                "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 1
           },
           "type": "security_filters"
       }
   }'
   ```

   Example response:

   ```json
   {
       "data": {
           "attributes": {
               "is_enabled": true,
               "is_builtin": true,
               "name": "all ingested logs",
               "filtered_data_type": "logs",
               "exclusion_filters": [
                   {
                       "query": "env:staging",
                       "name": "exclude env:staging"
                   }
               ],
               "version": 2,
               "query": "*"
           },
           "type": "security_filters",
           "id": "<FILTER_ID>"
       }
   }
   ```

### Désactiver un filtre Security {#disable-a-security-filter}

Vous pouvez activer et désactiver les filtres Security pour contrôler si leurs logs associés sont analysés. Vous pouvez désactiver un filtre tout en le conservant dans votre liste en définissant son attribut `is_enabled` sur `false` :

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

Exemple de réponse :

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### Supprimer un filtre Security {#delete-a-security-filter-1}

Pour supprimer un filtre Security personnalisé, envoyez une requête DELETE avec le `id` du filtre :

```bash
curl -L -X DELETE 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/<FILTER_ID>' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

Une requête réussie renvoie `HTTP 204 No Content`.

## Dépanner les filtres Security {#troubleshoot-security-filters}

Si un log que vous attendez de Cloud SIEM qu'il analyse ne produit pas de signaux, effectuez ces vérifications dans l'ordre :

1. **Vérifiez que les filtres Security ont sélectionné le log pour analyse.** Ouvrez le log dans le Log Explorer et vérifiez la valeur de `datadog.cloud_siem`.
   - Si le tag est `false`, le log a été exclu par les filtres Security. Examinez votre ensemble de filtres et confirmez qu'au moins un filtre activé correspond au log et qu'aucune exclusion ne le supprime.
   - Si le tag est `true`, le log a été sélectionné pour analyse et le problème se situe en aval des filtres Security (par exemple, aucune règle de détection n'a correspondu).
2. **Vérifiez si votre requête de filtre fait référence à un champ non pris en charge.** Voir [Limitations sur les requêtes de filtre Security](#limitations-on-security-filter-queries).
   - Une requête sur un champ non présent au moment de l'évaluation du filtre renvoie zéro résultat.
   - Une requête sur un champ dont la disponibilité dépend de la configuration du pipeline ne renvoie des résultats que lorsque le processeur de pipeline correspondant est configuré.
3. **Validez l'effet combiné de tous les filtres.**
   - Dans l'interface utilisateur, développez le volet **Prévisualisation** dans la section {{< ui >}}Security Filters Configuration{{< /ui >}} pour diffuser les logs qui atteignent l'analyse après l'application de chaque filtre activé.
   - Avec l'API, envoyez une requête `GET` pour lister tous les filtres et examiner les charges utiles `query` et `exclusion_filters` combinées.

## Tags et attributs utiles pour les requêtes de filtre Security {#useful-tags-and-attributes-for-security-filter-queries}

Si vous restreignez l'analyse à des catégories spécifiques de logs, veillez à ne pas exclure les logs contenant des utilisateurs, des entités ou des sources précieux pour la sécurité. Les tableaux de cette section répertorient les requêtes courantes que vous pouvez utiliser ou adapter.

### Utilisateurs et entités clés pour les requêtes de filtres Security {#key-users-and-entities-for-security-filter-queries}

| Nom              | Requête                                           |
| ----------------- | ----------------------------------------------- |
| Tous les événements nommés  | `@evt.name:*`                                   |
| Toutes les adresses IP client    | `@network.client.ip:*`                          |
| Toutes les adresses IP de destination | `@network.destination.ip:*`                   |
| Tous les utilisateurs         | `@usr.id:* OR @usr.name:* OR @usr.email:*`      |
| Tous les hosts         | `host:* OR instance-id:*`                       |

### Sources de sécurité clés pour les requêtes de filtres Security {#key-security-sources-for-security-filter-queries}

| Nom                    | Requête                                            |
| ----------------------- | ------------------------------------------------ |
| Logs de sécurité AWS       | `source:(cloudtrail OR guardduty OR route53)`    |
| Logs réseau AWS        | `source:(vpc OR waf OR elb OR alb)`              |
| Logs Google Cloud       | `source:gcp*`                                    |
| Logs Azure              | `source:azure*`                                  |
| Logs d'audit Kubernetes   | `source:kubernetes.audit`                        |
| Logs du fournisseur d'identité  | `source:(okta OR gsuite OR auth0)`               |
| Logs CDN                | `source:(cloudfront OR cloudflare OR fastly)`    |
| Logs du serveur web         | `source:(nginx* OR apache OR iis)`               |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/#cat-cloud-siem
[2]: /fr/security/cloud_siem/guide/determine-cloud-siem-product/
[3]: /fr/logs/log_configuration/indexes/#indexes-filters
[4]: https://app.datadoghq.com/security/configuration/siem/setup
[5]: /fr/account_management/api-app-keys/
[6]: /fr/api/latest/security-monitoring/#get-all-security-filters
[7]: /fr/security/cloud_siem/ingest_and_enrich/content_packs
[8]: /fr/logs/log_configuration/pipelines/
[9]: /fr/security/cloud_siem/ingest_and_enrich/threat_intelligence/