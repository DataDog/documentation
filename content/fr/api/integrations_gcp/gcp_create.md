---
title: Créer une intégration GCP
type: apicontent
order: 17.2
external_redirect: '/api/#creer-une-integration-gcp'
---
## Créer une intégration GCP

Créer une intégration Datadog/Google Cloud Platform.

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle de votre organisation Datadog.
* La méthode `PUT` permet de mettre à jour la configuration de votre intégration en **remplaçant** votre configuration actuelle par une nouvelle, envoyée à votre organisation Datadog.

**ARGUMENTS**:

Toutes les valeurs des champs suivants sont fournies par le fichier de clé du compte de service JSON créé dans la [console GCP des comptes de service][1]. Consultez les [instructions d'installation de l'intégration Datadog/Google Cloud Platform][2] pour découvrir comment générer une clé pour votre organisation.
Pour davantage d'informations, consultez la [documentation relative au compte de service Google Cloud][3] (en anglais).

* **`type`** [*obligatoire*] :

   La valeur de `service_account` indiquée dans la clé de votre compte de service JSON.

* **`project_id`** [*obligatoire*] :

    L'ID de votre projet Google Cloud indiquée dans la clé de votre compte de service JSON.

* **`private_key_id`** [*obligatoire*] :

    L'ID de votre clé privée indiquée dans la clé de votre compte de service JSON.

* **`private_key`** [*obligatoire*] :

    Le nom de votre clé privée indiquée dans la clé de votre compte de service JSON.

* **`client_email`** [*obligatoire*] :

    L'adresse e-mail indiquée dans la clé de votre compte de service JSON.

* **`client_id`** [*requis*] :

    L'ID indiquée dans la clé de votre compte de service JSON.

* **`auth_uri`** [*obligatoire*] :

    Doit être `https://accounts.google.com/o/oauth2/auth`.

* **`token_uri`** [*obligatoire*] :

    Doit être `https://accounts.google.com/o/oauth2/token`.

* **`auth_provider_x509_cert_url`** [*obligatoire*] :

    Doit être `https://www.googleapis.com/oauth2/v1/certs`.

* **`client_x509_cert_url`** [*obligatoire*] :

    Doit être `https://www.googleapis.com/robot/v1/metadata/x509/<E-MAIL_CLIENT>`, où `<E-MAIL_CLIENT>` correspond à l'adresse e-mail indiquée dans la clé de votre compte de service JSON.

* **`host_filters`** [*facultatif*] :

    Limite les instances GCE qui sont transmises à Datadog à l'aide de tags. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog.

* **`automute`** [*facultatif*, *défaut*=**false**] :

    Désactive les monitors lors des arrêts planifiés de l'instance GCE.

[1]: https://console.cloud.google.com/iam-admin/serviceaccounts
[2]: /fr/integrations/google_cloud_platform/#installation
[3]: https://cloud.google.com/iam/docs/creating-managing-service-account-keys