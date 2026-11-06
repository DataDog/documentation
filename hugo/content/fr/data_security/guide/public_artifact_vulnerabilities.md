---
description: Recherchez des informations sur les CVE et les vulnérabilités des artefacts
  Datadog accessibles au public.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-public-artifact-vulnerabilities-openvex/
  tag: Blog
  text: Réduisez le bruit lié aux CVE avec les évaluations OpenVEX dans Datadog
title: Vulnérabilités des artefacts publics
---
La page Vulnérabilités des artefacts publics vous permet de consulter les informations sur les vulnérabilités et les réponses pour les artefacts et bibliothèques Datadog accessibles au public. Utilisez-la pour rechercher :

- Quelles vulnérabilités affectent un artefact donné (par image/version)
- Quels artefacts sont affectés par une CVE donnée
- Statut, justification, impact et déclarations d'action pour chaque vulnérabilité

## Comment accéder à {#how-to-access}

La page Vulnérabilités des artefacts publics est accessible via la page Aide sous {{< ui >}}Public Artifact Vulnerabilities{{< /ui >}}.

## Utilisation de la page {#using-the-page}

### Recherche par artefact {#look-up-by-artifact}

Utilisez la vue par artefact pour voir toutes les vulnérabilités d'une famille, d'une image et d'une version spécifiques (par exemple, la version 7.52.0 de l'image du Datadog Agent).

- {{< ui >}}Family{{< /ui >}} : Choisissez une catégorie telle que {{< ui >}}Agent platform{{< /ui >}}, {{< ui >}}APM library injection{{< /ui >}}, {{< ui >}}Private action runners{{< /ui >}}, {{< ui >}}Telemetry collectors{{< /ui >}}, {{< ui >}}Serverless{{< /ui >}}, {{< ui >}}Private deployments{{< /ui >}} ou {{< ui >}}Build & CI{{< /ui >}}. Votre sélection restreint la liste déroulante {{< ui >}}Image{{< /ui >}}.
- {{< ui >}}Image{{< /ui >}} : Choisissez une image dans la famille sélectionnée. La liste est établie à partir des artefacts publics disponibles.
- {{< ui >}}Version{{< /ui >}} : Choisissez une version de l'image sélectionnée. Les versions sont triées de la plus récente à la plus ancienne.

Le tableau se charge et affiche une ligne par vulnérabilité affectant cette image et cette version.

<div class="alert alert-tip">Pour filtrer vos résultats actuels, saisissez un mot-clé dans la zone de recherche sans cliquer sur {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/artifact-view.png" alt="Recherche par artefact" style="width:100%;" >}}

**Colonnes du tableau (par image/version) :**

| Colonne | Objet |
|--------|---------|
| Gravité | Gravité de la vulnérabilité (par exemple, Critique, Haute, Moyenne, Faible et Info). |
| Vulnérabilité | Identifiant et nom de la CVE ou de la vulnérabilité. |
| Plateforme | Plateformes applicables. Survolez une valeur de plateforme pour voir les variantes spécifiques qu'elle couvre, y compris les builds FIPS et non-FIPS. |
| Statut | Statut actuel : par exemple, Non affecté, Affecté, Corrigé et En cours d'investigation. |
| Informations supplémentaires | Plus d'informations sur le statut de la CVE et justification du statut si nécessaire. Par exemple, si le statut est component_not_present, cette colonne explique pourquoi la CVE n'affecte pas l'artefact et comment cette conclusion a été atteinte. Certains statuts, tels que « En cours d'investigation », ne disposent pas d'informations supplémentaires car l'impact est toujours en cours d'analyse. |

### Recherche par CVE {#look-up-by-cve}

Utilisez la vue CVE pour trouver quels artefacts et versions sont affectés par des vulnérabilités spécifiques, ainsi que le statut pour chacun.

1. Dans la zone de recherche en haut du tableau, saisissez un ou plusieurs identifiants CVE (par exemple, `CVE-2024-1234` ou `CVE-2024-1234, CVE-2024-5678` pour plusieurs).
2. Cliquez sur {{< ui >}}Find CVE in artifacts{{< /ui >}}.

Le tableau bascule en mode CVE et affiche une ligne par combinaison de CVE, d'artefact et de version.

<div class="alert alert-tip">Pour filtrer vos résultats actuels, saisissez un mot-clé dans la zone de recherche sans cliquer sur {{< ui >}}Find CVE in artifacts{{< /ui >}}.</div>

{{< img src="data_security/public_artifact_vulnerabilities/cve-view.png" alt="Recherche par CVE" style="width:100%;" >}}

**Colonnes du tableau (par CVE) :**

| Colonne | Objet |
|--------|---------|
| CVE | L'identifiant CVE. |
| Nom de l'artefact | Nom de l'artefact (par exemple, agent, nom de bibliothèque). |
| Version | Version de l'artefact. |
| Plateforme | Plateformes applicables. Survolez une valeur de plateforme pour voir les variantes spécifiques qu'elle couvre, y compris les builds FIPS et non-FIPS. |
| Statut | Statut pour ce CVE/artefact/cette version (par exemple, Non affecté, Affecté, Corrigé et En cours d'investigation). |
| Informations supplémentaires | Plus d'informations sur le statut de la CVE et justification du statut si nécessaire. |


## Artefacts disponibles (images) {#available-artifacts-images}

La liste déroulante **Image** est alimentée à partir de la liste des artefacts publics suivis. Public Artifact Vulnerabilities prend en charge les **10 dernières versions** des images publiques suivies. Si un artefact attendu est manquant, contactez le [support Datadog][1] pour demander son ajout.

## Options et actions sur la page {#options-and-actions-on-the-page}

| Option ou action | Description |
|------------------|-------------|
| {{< ui >}}Search / global filter{{< /ui >}} | Filtrer les lignes du tableau par n'importe quel texte. En mode « par image/version », la même zone de recherche est utilisée avant de cliquer sur {{< ui >}}Find CVE in artifacts{{< /ui >}} pour exécuter une recherche de CVE. |
| {{< ui >}}Find CVE in artifacts{{< /ui >}} | Exécute une recherche de CVE en utilisant la valeur actuelle de la zone de recherche (prend en charge les ID de CVE séparés par des virgules). Pertinent uniquement lorsque vous souhaitez effectuer une recherche par CVE. |
| {{< ui >}}Pagination{{< /ui >}} | Utilisez la pagination du tableau pour parcourir les grands ensembles de résultats (par exemple, 50 lignes par page). |
| {{< ui >}}Resizable columns{{< /ui >}} | Vous pouvez redimensionner les largeurs des colonnes pour une meilleure lisibilité. |

[1]: /fr/help

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}