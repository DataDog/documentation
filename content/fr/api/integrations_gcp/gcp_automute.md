---
title: Définir la désactivation automatique de l'intégration GCP
type: apicontent
order: 17.4
external_redirect: "/api/#set-gcp-integration-automute"
---

## Définir la désactivation automatique de l'intégration GCP

Activez ou annulez la désactivation automatique pour une intégration Datadog/GCP donnée.

**ARGUMENTS**:

* **`project_id`** [*requis*] :

    L'ID de votre projet Google Cloud indiquée dans la clé de votre compte de service JSON.

* **`client_email`** [*obligatoire*] :

    L'adresse e-mail indiquée dans la clé de votre compte de service JSON.

* **`automute`** [*facultatif*, *défaut*=**false**] :

    Désactive les monitors lors des arrêts planifiés de l'instance GCE.
