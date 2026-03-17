---
title: Public Artifact Vulnerabilities
---

## Présentation

La page Public Artifact Vulnerabilities permet de consulter les informations de vulnérabilité et de réponse pour les artefacts et bibliothèques publics de Datadog. C'est l'emplacement de référence pour :

- Savoir quelles vulnérabilités affectent un artefact donné (par image/version)
- Savoir quels artefacts sont affectés par une CVE donnée
- Consulter le statut, la justification, l'impact et les actions pour chaque vulnérabilité

Cette fonctionnalité est en version bêta.

## Accès

La page Public Artifact Vulnerabilities est accessible depuis la page d'aide, sous **Public Artifact Vulnerabilities**.

![Page d'aide avec le lien Public Artifact Vulnerabilities](/images/data_security/public_artifact_vulnerabilities/help-page.png)

![Page Public Artifact Vulnerabilities](/images/data_security/public_artifact_vulnerabilities/public-artifact-vulnerabilities-page.png)

## Deux modes d'utilisation

### 1. Recherche par image et version (centrée sur l'artefact)

Utilisez ce mode pour afficher toutes les vulnérabilités d'un artefact et d'une version donnés (par exemple, l'image Agent Datadog version 7.52.0).

- **Image** : Choisissez un artefact dans le menu déroulant **Image** (par exemple, agent, cluster-agent, synthetic-private-location-worker). La liste provient des artefacts publics disponibles.
- **Version** : Choisissez une **Version** pour cette image. Les versions sont triées des plus récentes aux plus anciennes.

Le tableau affiche une ligne par vulnérabilité affectant cette image/version.

**Colonnes du tableau (par image/version) :**

| Colonne | Rôle |
|---------|------|
| Severity | Gravité de la vulnérabilité (par ex. Critical, High, Medium, Low, Info). |
| Vulnerability | CVE ou identifiant de vulnérabilité et nom. |
| Platform | Plateforme(s) concernée(s) (par ex. Linux, Windows). La colonne Platform affiche aussi la liste des variantes affectées par la CVE (par ex. fips, jmx, servercore). |
| Status | Statut actuel : par ex. Not affected, Affected, Fixed, Under investigation. |
| Additional Information | Informations complémentaires sur le statut de la CVE et la justification si besoin. Par exemple, si le statut est component_not_present, cette colonne explique pourquoi la CVE n'affecte pas l'artefact et comment cette conclusion a été établie. Certains statuts n'ont pas d'information complémentaire (par ex. Under investigation signifie que l'impact de la CVE est encore en cours d'analyse). |

Vous pouvez utiliser la zone de recherche/filtre au-dessus du tableau pour filtrer les lignes par mot-clé.

![Recherche par image et version](/images/data_security/public_artifact_vulnerabilities/by-image-version.png)

### 2. Recherche par CVE (centrée sur la CVE)

Utilisez ce mode lorsque vous avez un identifiant CVE et souhaitez voir quels artefacts/versions sont affectés et quelle est notre réponse pour chacun.

1. Dans la zone de recherche en haut du tableau, saisissez un ou plusieurs identifiants CVE (par ex. `CVE-2024-1234` ou `CVE-2024-1234, CVE-2024-5678` pour plusieurs).
2. Cliquez sur **Find CVE in artifacts**.

Le tableau passe en mode CVE et affiche une ligne par combinaison (CVE, artefact, version, statut).

**Colonnes du tableau (par CVE) :**

| Colonne | Rôle |
|---------|------|
| CVE | L'identifiant CVE. |
| Artifact Name | Nom de l'artefact (par ex. agent, nom de bibliothèque). |
| Version | Version de l'artefact. |
| Platform | Plateforme(s) pour cette ligne (par ex. Linux, Windows). |
| Status | Statut pour cette CVE/artefact/version (par ex. Not affected, Affected, Fixed, Under investigation). |
| Additional Information | Informations complémentaires sur le statut de la CVE et la justification si besoin. |

Après une recherche par CVE, le filtre du tableau est réinitialisé pour afficher toutes les lignes renvoyées. Vous pouvez saisir à nouveau dans la zone de recherche pour filtrer les résultats affichés.

![Recherche par CVE](/images/data_security/public_artifact_vulnerabilities/by-cve.png)

## Artefacts disponibles (images)

Le menu déroulant **Image** est alimenté par la liste des artefacts publics suivis. Si un artefact attendu n'apparaît pas, contactez l'[assistance Datadog](/help) pour demander son ajout.

## Options et actions sur la page

| Option ou action | Description |
|------------------|-------------|
| **Search / global filter** | Filtrer les lignes du tableau par tout texte. En mode « par image/version », la même zone de recherche est utilisée avant de cliquer sur **Find CVE in artifacts** pour lancer une recherche par CVE. |
| **Find CVE in artifacts** | Lance une recherche par CVE avec la valeur actuelle de la zone de recherche (plusieurs CVE séparées par des virgules). Utile uniquement pour une recherche par CVE. |
| **Pagination** | Utilisez la pagination du tableau pour parcourir les grands jeux de résultats (par ex. 50 lignes par page). |
| **Resizable columns** | Vous pouvez redimensionner les colonnes pour une meilleure lisibilité. |
