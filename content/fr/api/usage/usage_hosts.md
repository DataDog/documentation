---
title: Obtenir l'utilisation horaire pour les hosts et conteneurs
type: apicontent
order: 34.1
external_redirect: /api/#obtenir-l-utilisation-horaire-pour-des-hosts-et-conteneurs
---

## Obtenir l'utilisation horaire pour les hosts et conteneurs

Obtenez l'utilisation horaire pour les hosts et conteneurs.

**ARGUMENTS**:

* **`start_hr`** [*obligatoire*] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation commençant à cette heure
* **`end_hr`** [*facultatif*, *défaut*=**1d+start_hr**] :
    datetime au format ISO-8601, UTC, à l'heure près : [AAAA-MM-JJThh] pour une utilisation se terminant AVANT cette heure

**RÉPONSE** :

* **`container_count`** :
    indique le nombre total de conteneurs qui ont transmis des données via l'intégration Docker durant cette heure.
* **`host_count`** :
    contient le nombre total de hosts d'infrastructure facturables qui ont transmis des données durant une heure spécifiée.
    Il s'agit de la somme de `agent_host_count`, `aws_host_count` et `gcp_host_count`.
* **`hour`** :
    l'heure de l'utilisation.
* **`apm_host_count`** :
    indique le nombre total de hosts utilisant l'APM durant l'heure spécifiée. Ces hosts sont comptés comme facturables (sauf durant les périodes d'essai).
* **`agent_host_count`** :
    contient le nombre total de hosts d'infrastructure qui ont transmis des données durant une heure spécifiée et qui exécutaient l'Agent Datadog.
* **`gcp_host_count`** :
    contient le nombre total de hosts d'infrastructure qui ont transmis des données via l'intégration Google Cloud (et qui n'exécutaient PAS l'Agent Datadog).
* **`aws_host_count`** :
    contient le nombre total de hosts d'infrastructure qui ont transmis des données via l'intégration AWS (et qui n'exécutaient PAS l'Agent Datadog).
    Lorsque les hosts AWS ou GCP exécutent également l'Agent Datadog, ils sont considérés comme hosts de l'Agent et non comme hosts AWS ou GCP.
