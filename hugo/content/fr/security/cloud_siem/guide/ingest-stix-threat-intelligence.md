---
description: 'Envoyez vos propres renseignements sur les menaces à Cloud SIEM sous
  forme de bundles STIX 2.1 : Couvre l''endpoint d''ingestion, l''authentification,
  les types d''indicateurs et modèles pris en charge, les tableaux de référence que
  Datadog génère pour chaque type d''indicateur, ainsi que la manière de les configurer
  ou de les supprimer.'
disable_toc: false
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: Documentation
  text: Apportez vos propres renseignements sur les menaces à Cloud SIEM
- link: /security/threat_intelligence/
  tag: Documentation
  text: Renseignements sur les menaces dans Datadog Security
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentation
  text: Enquêtez sur les indicateurs avec l'IOC Explorer
- link: /reference_tables/
  tag: Documentation
  text: Créer et gérer des tableaux de référence
title: Ingérez des renseignements sur les menaces STIX
---
## Présentation {#overview}

Si votre organisation gère des renseignements sur les menaces dans une plateforme de renseignements sur les menaces (TIP), vous pouvez les envoyer à Cloud SIEM sous forme de bundles [STIX 2.1][1]. Cloud SIEM utilise les indicateurs ingérés pour [enrichir vos logs][2] et les affiche dans l'[IOC Explorer][3]

Utilisez l'ingestion STIX lorsque votre plateforme produit déjà du STIX, ou lorsque vous souhaitez qu'un script ou un job planifié envoie des mises à jour incrémentielles. Pour importer des indicateurs sous forme de fichiers CSV ou les synchroniser depuis un stockage cloud, consultez [Apportez vos propres renseignements sur les menaces à Cloud SIEM][2].

## Fonctionnement {#how-it-works}

Après avoir envoyé un bundle STIX 2.1 à l'[endpoint d'ingestion](#send-indicators), Datadog le traite comme suit. Aucune configuration préalable dans Datadog n'est requise.

1. Datadog identifie le flux à partir de l'en-tête `ti_vendor` requis.
2. Datadog génère une [Reference Table][4] pour chaque type d'indicateur dans votre flux, nommée `threat_intel_stix_<TI_VENDOR>_<INDICATOR_TYPE>`. Comme un bundle peut contenir plusieurs types d'indicateurs, une seule requête peut alimenter plusieurs tableaux.
3. Datadog enregistre chaque tableau généré et l'active automatiquement pour l'enrichissement de Cloud SIEM.
4. Les requêtes ultérieures pour le même `ti_vendor` mettent à jour les tableaux existants et conservent les choix de configuration que vous avez effectués.

Par exemple, un flux envoyé avec `ti_vendor: acme` contenant des indicateurs d'adresse IP, de domaine et de SHA-256 produit les tableaux suivantes :

| Type d'indicateur | Reference Table générée |
|---|---|
| Adresse IP | `threat_intel_stix_acme_ip_address` |
| Domaine | `threat_intel_stix_acme_domain` |
| Hachage de fichier SHA-256 | `threat_intel_stix_acme_sha256` |

Les tableaux deviennent disponibles quelques minutes après votre première requête. L'enrichissement s'applique aux logs que Cloud SIEM reçoit après l'activation d'un tableau ; il ne s'applique donc pas aux logs reçus précédemment.

## Prérequis {#prerequisites}

- Cloud SIEM est activé pour votre organisation.
- Une [clé d'API][5] Datadog et une [clé d'application][6]. La clé d'application doit disposer de l'autorisation « Reference Tables Write ».

## Envoyer des indicateurs {#send-indicators}

`POST https://api.{{< region-param key="dd_site" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">L'URL de l'endpoint varie selon le site. Utilisez le site Datadog approprié pour votre organisation.</div>

### En-têtes {#headers}

| En-tête | Requis | Description |
|---|---|---|
| `DD-API-KEY` | Oui | Votre clé d'API Datadog. |
| `DD-APPLICATION-KEY` | Oui | Une clé d'application avec l'autorisation Reference Tables Write. |
| `ti_vendor` | Oui | Identifie le flux ; par exemple, le nom de votre plateforme. Utilisez 10 caractères ou moins, avec uniquement des lettres minuscules et des chiffres. |
| `Content-Type` | Oui | `application/json` |
| `Content-Encoding` | Non | Défini sur `gzip` pour envoyer un corps compressé. Aucun autre encodage n'est pris en charge. |

### Corps de la requête {#request-body}

Le corps est un bundle STIX 2.1 `bundle` d'objets STIX. Chaque requête est un lot incrémentiel, et un bundle peut mélanger des indicateurs de différents types.

```json
{
  "type": "bundle",
  "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
      "pattern_type": "stix",
      "pattern": "[ipv4-addr:value = '198.51.100.1']",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T00:00:00Z"
    }
  ]
}
```

L'endpoint a les exigences et limites suivantes :

- Le bundle doit être au format STIX 2.1. Si le bundle contient un `spec_version` autre que `2.1`, Datadog rejette la requête. Si un objet individuel contient un `spec_version` autre que `2.1`, Datadog ignore cet objet.
- La taille maximale du corps de la requête est de 50 Mo.

### Types d'indicateurs et modèles pris en charge {#supported-indicator-types-and-patterns}

Datadog lit le `pattern` STIX sur chaque indicateur pour déterminer son type et sa valeur. Cloud SIEM ingère les adresses IP (IPv4 et IPv6), les domaines et les hachages de fichier SHA-256.

Datadog extrait les valeurs exactes des comparaisons `=` et `IN`. Il accepte également les expressions `OR` et importe chaque valeur comme un indicateur distinct. `AND` entre crochets n'est pas pris en charge.

```json
"pattern": "[ipv4-addr:value = '198.51.100.1'] OR [domain-name:value IN ('example.com', 'example.net')]"
```

Les modèles utilisant la négation, les plages, la correspondance par caractères génériques, la correspondance par expression régulière, les relations de sous-réseau, les checks d'existence, les qualificateurs temporels ou `FOLLOWEDBY` ne sont pas pris en charge. Si une partie d'un modèle utilise une expression non prise en charge, Datadog ignore l'objet indicateur.

La réponse compte les objets non pris en charge comme `unsupported` et les modèles non analysables comme `invalid`. Vérifiez ces nombres pour confirmer que votre flux a été ingéré comme prévu.

### Comment les champs STIX correspondent aux colonnes de la Reference Table {#how-stix-fields-map-to-reference-table-columns}

| Colonne de la Reference Table | Remplie à partir de |
|---|---|
| Valeur de l'indicateur | La valeur extraite du `pattern` de l'indicateur. |
| `intention` | Le champ `indicator_types`. `malicious-activity` correspond à `malicious` ; `benign` correspond à `benign` ; et toute autre valeur ou un champ absent correspond à `suspicious`. |
| `source` | L'en-tête `ti_vendor`, stocké sous `{"name": "<TI_VENDOR>"}`. |
| `category` | Défini sur `custom`. |
| `additional_data` | Les champs STIX qui n'ont pas de colonne dédiée, y compris `stix_id`, `created`, `modified`, `valid_from`, `confidence`, `labels`, `indicator_types`, `object_marking_refs`, `kill_chain_phases` et `external_references`. |

Le champ optionnel `valid_until` définit une expiration pour l'indicateur, et Datadog supprime l'indicateur après ce délai. Un indicateur envoyé sans `valid_until` n'expire pas automatiquement.

### Mettre à jour et révoquer des indicateurs {#update-and-revoke-indicators}

- Pour mettre à jour les détails d'un indicateur, renvoyez l'indicateur avec les champs mis à jour. Datadog écrase la ligne existante pour cette valeur d'indicateur.
- Pour supprimer un indicateur, envoyez-le avec `"revoked": true`. Datadog supprime l'indicateur de la Reference Table.

L'envoi du même bundle plusieurs fois ne crée pas de lignes en double.

### Réponse {#response}

Une requête réussie renvoie `200 OK` et un résumé de la façon dont Datadog a traité le bundle :

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "acme",
    "attributes": {
      "accepted": 3,
      "unsupported": 1,
      "invalid": 0
    }
  }
}
```

| Attribut | Description |
|---|---|
| `accepted` | Le nombre d'objets indicateurs pris en charge que Datadog a acceptés pour traitement. Ce décompte inclut les nouveaux indicateurs, les mises à jour et les révocations. Un objet peut produire plus d'un indicateur lorsque son modèle utilise `IN` ou `OR`. |
| `unsupported` | Nombre d'objets indicateurs que Datadog a ignorés car leur type, leur modèle ou leur version STIX au niveau de l'objet n'est pas pris en charge. |
| `invalid` | Nombre d'objets indicateurs dont le modèle n'a pas pu être analysé par Datadog. |

Une réponse `200` signifie que Datadog a accepté le bundle. Les indicateurs non pris en charge et invalides apparaissent dans ces comptes au lieu de provoquer l'échec de la requête. Vérifiez les comptes pour confirmer que votre flux a été ingéré comme prévu.

### Exemple de requête {#example-request}

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  --header "DD-API-KEY: <DATADOG_API_KEY>" \
  --header "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --header "Content-Type: application/json" \
  --header "ti_vendor: acme" \
  --data '{
    "type": "bundle",
    "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
    "objects": [
      {
        "type": "indicator",
        "spec_version": "2.1",
        "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
        "pattern_type": "stix",
        "pattern": "[ipv4-addr:value = '198.51.100.1']",
        "indicator_types": ["malicious-activity"],
        "valid_from": "2026-01-01T00:00:00Z"
      }
    ]
  }'
```

Pour envoyer un flux volumineux plus efficacement, compressez le corps et définissez `Content-Encoding: gzip`.

### Limites de débit {#rate-limits}

L'endpoint accepte 10 requêtes par seconde pour chaque clé d'API. Les requêtes dépassant cette limite reçoivent une réponse `429 Too Many Requests`.

### Réponses d'erreur {#error-responses}

| Statut | Raison |
|---|---|
| `400 Bad Request` | Le corps n'est pas un JSON valide, le bundle contient un `spec_version` autre que `2.1`, l'en-tête `ti_vendor` est manquant ou invalide, ou le `Content-Encoding` n'est pas pris en charge. |
| `401 Unauthorized` | La requête ne contient pas d'identifiants valides. |
| `403 Forbidden` | La clé d'application ne dispose pas de l'autorisation Reference Tables Write. |
| `413 Request Entity Too Large` | Le corps de la requête est supérieur à 50 Mo. |
| `429 Too Many Requests` | La requête a dépassé la limite de débit pour la clé d'API. |

## Configurer les Reference Tables générées {#configure-the-generated-reference-tables}

Gérez les tableaux générés par l'ingestion sur la page de configuration [Threat Intelligence][7]. Chaque tableau dispose d'un interrupteur qui contrôle si Cloud SIEM l'utilise pour enrichir les logs. Utilisez cette page pour examiner quels flux sont actifs, pour désactiver temporairement un flux ou pour activer un tableau que l'ingestion a laissé désactivé.

Vos paramètres d'enrichissement ont priorité sur l'ingestion. Une fois qu'un tableau existe, les requêtes ultérieures ajoutent et mettent à jour des indicateurs, mais ne modifient jamais le commutateur d'enrichissement. Un tableau que vous désactivez reste désactivé jusqu'à ce que vous l'activiez à nouveau.

L'ingestion STIX gère les lignes dans les Reference Tables générées. Les modifications manuelles apportées à ces lignes ne sont pas conservées et sont écrasées par les requêtes d'ingestion ultérieures. Pour ajouter, mettre à jour ou supprimer des indicateurs, envoyez les modifications via l'endpoint d'ingestion STIX.

Pour inspecter les indicateurs ingérés, ouvrez le tableau depuis [Reference Tables][8], ou recherchez les indicateurs dans [IOC Explorer][3].

### Si vous atteignez la limite de Reference Tables {#if-you-reach-the-reference-table-limit}

Cloud SIEM enrichit les logs avec jusqu'à 10 Reference Tables de renseignement sur les menaces à la fois. Si l'ingestion génère un tableau alors que votre organisation a déjà atteint cette limite, Datadog crée et remplit tout de même le tableau. Il n'active pas automatiquement le tableau pour l'enrichissement, et le tableau apparaît sur la page [Threat Intelligence][7] dans un état désactivé.

Pour activer un tel tableau, désactivez un tableau dont vous n'avez plus besoin sur la page [Threat Intelligence][7], puis activez la nouvelle.

## Arrêtez l'ingestion d'un flux {#stop-ingesting-a-feed}

Vos requêtes pilotent l'ingestion, donc la suppression d'un flux nécessite deux étapes, dans cet ordre :

1. Arrêtez d'envoyer des bundles pour ce `ti_vendor`.
2. Supprimez les Reference Tables que Datadog a générées pour le flux depuis [Reference Tables][8].

Effectuez les étapes dans cet ordre. Si vous supprimez un tableau alors que des requêtes pour le même `ti_vendor` arrivent toujours, la requête suivante génère à nouveau le tableau.

Pour arrêter d'enrichir les logs sans rien supprimer, désactivez plutôt les tableaux sur la page [Threat Intelligence][7]. Cela permet de conserver les indicateurs ingérés à la disposition de l'IOC Explorer et de reprendre l'enrichissement plus tard.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /fr/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /fr/security/cloud_siem/triage_and_investigate/ioc_explorer/
[4]: /fr/reference_tables/
[5]: /fr/account_management/api-app-keys/#api-keys
[6]: /fr/account_management/api-app-keys/#application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
[8]: https://app.datadoghq.com/reference-tables