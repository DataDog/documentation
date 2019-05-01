---
title: "Google\_Cloud\_Platform"
type: apicontent
order: 15.3
external_redirect: '/api/#google-cloud-platform'
---
## Google Cloud Platform

Configurez votre intégration Datadog/Google Cloud Platform directement avec l'API Datadog.  
[En savoir plus sur l'intégration Datadog/Google Cloud Platform][1].

**Remarque** :

* La méthode `POST` permet de mettre à jour la configuration de votre intégration en **ajoutant** votre nouvelle configuration à celle déjà existante dans votre organisation Datadog.

* La méthode `PUT` permet de mettre à jour la configuration de votre intégration actuelle dans votre organisation Datadog.

##### ARGUMENTS

Toutes les valeurs des champs suivants sont fournies par le fichier de clé du compte de service JSON créé dans la [console GCP des comptes de service][2]. Consultez les [instructions d'installation de l'intégration Datadog/Google Cloud Platform][3] pour découvrir comment générer une clé pour votre organisation. 
Pour davantage d'informations, consultez la [documentation relative au compte de service Google Cloud][4] (en anglais).

* **`type`** [*obligatoire*] :

    Doit correspondre à `service_account`. Peut être trouvé dans la clé de votre compte de service JSON.

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

[1]: /fr/integrations/google_cloud_platform
[2]: https://console.cloud.google.com/iam-admin/serviceaccounts
[3]: /fr/integrations/google_cloud_platform/#installation
[4]: https://cloud.google.com/iam/docs/creating-managing-service-account-keys