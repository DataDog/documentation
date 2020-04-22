---
title: Mettre à jour une intégration GCP
type: apicontent
order: 18.4
external_redirect: "/api/#mettre-a-jour-une-integration-gcp"
---

## Mettre à jour une intégration GCP

Endpoint de mise à jour pour GCP. Utilisez-le pour activer ou désactiver la désactivation automatique pour une certaine intégration Datadog/GCP, ainsi que pour modifier host_filters.

**ARGUMENTS** :

* **`project_id`** [*obligatoire*] :

    L'ID de votre projet Google Cloud indiquée dans la clé de votre compte de service JSON.

* **`client_email`** [*obligatoire*] :

    L'adresse e-mail indiquée dans la clé de votre compte de service JSON.

* **`automute`** [*facultatif*, *défaut*=**false**] :

    Désactive les monitors lors des arrêts planifiés de l'instance GCE.

* **`host_filters`** [*facultatif*] :

    Limite les instances GCE qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.
