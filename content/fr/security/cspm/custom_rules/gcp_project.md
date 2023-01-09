---
aliases:
- /fr/security_platform/cspm/custom_rules/gcp_project
kind: documentation
title: gcp_project
---

## `ancestors`
**Type** : `UNORDERED_LIST_STRING`<br>
## `create_time`
**Type** : `TIMESTAMP`<br>
    **Description** : Sortie uniquement. Date de création.<br>
    **Nom GCP** : `createTime`<br>
## `delete_time`
**Type** : `TIMESTAMP`<br>
    **Description** : Sortie uniquement. La date à laquelle la demande de suppression de cette ressource a été effectuée.<br>
    **Nom GCP** : `deleteTime`<br>
## `etag`
**Type** : `STRING`<br>
    **Description** : Sortie uniquement. Un checksum calculé par le serveur en fonction de la valeur actuelle de la ressource projet. Peut être envoyé en même temps qu'une demande de mise à jour ou de suppression pour vérifier que le client possède une valeur à jour avant de continuer.<br>
    **Nom GCP** : `etag`<br>
## `gcp_display_name`
**Type** : `STRING`<br>
    **Description** : Facultatif. Nom d'affichage du projet, attribué par un utilisateur. Lorsqu'il est présent, doit comporter entre 4 et 30 caractères. Caractères autorisés : lettres minuscules et majuscules, chiffres, tirets, guillemets simples, guillemets doubles, espaces et points d'exclamation. Exemple : `Mon projet`<br>
    **Facultatif** : `displayName`<br>
## `labels`
**Type** : `UNORDERED_LIST_STRING`<br>
## `name`
**Type** : `STRING`<br>
    **Description** : Sortie uniquement. Le nom de ressource unique du projet. Correspond à un nombre généré en int64 avec le préfixe `projects/`. Exemple : `projects/415104041262`<br>
    **Nom GCP** : `name`<br>
## `organization_id`
**Type** : `STRING`<br>
## `parent`
**Type** : `STRING`<br>
## `project_id`
**Type** : `STRING`<br>
## `project_number`
**Type** : `STRING`<br>
## `resource_name`
**Type** : `STRING`<br>
## `state`
**Type** : `STRING`<br>
    **Description** : Sortie uniquement. Le statut du cycle de vie du projet. <br>
    **Nom GCP** : `state`<br>
        **Valeurs autorisées** :<br>
  - `STATE_UNSPECIFIED` - Statut non spécifié. Permet uniquement de filtrer les valeurs non définies.<br>
  - `ACTIVE` - Le projet est actif. Il s'agit du statut normal.<br>
  - `DELETE_REQUESTED` - Une demande de suppression du projet a été effectuée par un utilisateur (en invoquant `DeleteProject`) ou par le système (Google Cloud Platform). La demande peut généralement être annulée en invoquant `UndeleteProject`.<br>
## `tags`
**Type** : `UNORDERED_LIST_STRING`<br>
## `update_time`
**Type** : `TIMESTAMP`<br>
    **Description** : Sortie uniquement. La dernière date de modification de cette ressource.<br>
    **Nom GCP** : `updateTime`<br>