---
description: Estimez le nombre de requêtes PUT de stockage d'objets générées par les
  indexeurs et les compacteurs de BYOC Logs
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: Documentation
  text: Dimensionnement du cluster BYOC Logs
- link: /byoc-logs/introduction/architecture/
  tag: Documentation
  text: En savoir plus sur l'architecture de BYOC Logs
title: Estimation des requêtes de stockage d'objets
---
{{< jqmath-vanilla >}}

## Présentation {#overview}

Le stockage d'objets (Amazon S3, Google Cloud Storage, Azure Blob Storage) facture à la fois les **données stockées** et les **requêtes API**. Cette page estime les **requêtes PUT** générées sur le chemin d'écriture par les **indexeurs** et les **compacteurs**.

## Indexeurs {#indexers}

Chaque indexeur exécute plusieurs **pipelines d'indexation**, un par vCPU. Toutes les 30 secondes (le délai d'expiration de validation par défaut), chaque pipeline téléverse un fichier d'index (un *split*) vers le stockage d'objets :

$$\text\"splits par pipeline par jour\" = {86400} / 30 = 2880$$

Un indexeur à 4 vCPU exécute 4 pipelines, il téléverse donc **11 520 splits par jour**.

Les splits stockent des données **compressées** (3x ou plus). À des volumes typiques, ils restent en dessous du seuil multipart de 128 Mio et sont téléversés en une **seule requête PUT**. Les splits plus volumineux utilisent le téléversement multipart et coûtent 3 requêtes PUT ou plus.

## Compacteurs {#compactors}

Les compacteurs **fusionnent 10 splits en 1**, de manière répétée, sur trois *générations* (gén 1, 2, 3). Les splits fusionnés sont volumineux (plus de 1 Go) et utilisent le téléversement multipart, donc chacun coûte 3 requêtes PUT ou plus.

Le fan-in de 10:1 signifie que chaque génération produit 10 fois moins de splits que la précédente. Au total, la compaction ajoute environ **un tiers de requêtes PUT supplémentaires** aux splits des indexeurs.

## Estimations de requêtes {#request-estimates}

Les estimations suivantes supposent :

- **8 Mo/s par vCPU d'indexeur**, donc un indexeur à 4 vCPU soutient 32 Mo/s, soit ~2,8 To/jour. Voir [Dimensionnement du cluster][1].
- **4 pipelines d'indexation** par indexeur, avec le délai d'expiration de validation par défaut de 30 secondes
- Un prix PUT de **$0.005 pour 1 000 requêtes** (S3 Standard, `us-east-1`)

Chaque indexeur téléverse 11 520 splits par jour. La compaction ajoute environ un tiers de requêtes PUT supplémentaires, pour un total de **~15 360 requêtes PUT par indexeur par jour** :

| Volume quotidien | Indexeurs (4 vCPU chacun) | Total des requêtes PUT par jour | Coût PUT approx. par mois |
|-------------|-------------------------|----------------------------|----------------------------|
| **1 To/jour** | 1 | ~15 000 | ~$2|
| **10 To/jour** | 4 | ~61 000 | ~$9|
| **100 To/jour** | 37 | ~568 000 | ~$85|

<div class="alert alert-tip">
Les requêtes PUT évoluent en fonction du <strong>nombre de pipelines et de la cadence de validation, et non du volume d'ingestion brut</strong>. Augmenter le délai d'expiration de validation (par exemple, à 60 secondes) réduit approximativement de moitié le nombre de requêtes, au prix d'une latence de recherche plus élevée.
</div>

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/byoc-logs/operate/sizing/#indexers