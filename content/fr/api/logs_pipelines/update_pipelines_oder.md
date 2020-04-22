---
title: Mettre à jour la séquence des pipelines
type: apicontent
order: 25.2
external_redirect: "/api/#mettre-a-jour-la-sequence-des-pipelines"
---

## Mettre à jour la séquence des pipelines

Mettez à jour la séquence de vos pipelines. Les logs étant traités de manière séquentielle, la réorganisation d'un pipeline peut changer la structure et le contenu des données traitées par les autres pipelines et leurs processeurs.

**Remarque** : la méthode `PUT` permet de mettre à jour la séquence de vos pipelines en **remplaçant** votre séquence actuelle par la nouvelle, envoyée à votre organisation Datadog.

**ARGUMENTS** :

* **`pipeline_ids`** [*obligatoire*] :
    un tableau ordonné de chaînes `<ID_PIPELINE>`. L'ordre des identifiants de pipeline dans le tableau définit l'ordre de traitement des pipelines par Datadog.
