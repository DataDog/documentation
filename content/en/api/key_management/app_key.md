---
title: Application keys
type: apicontent
order: 16.2
external_redirect: /api/#app-keys
---

## Application keys

Manage all your application key with the following endpoints:

* To **get** all application keys available for your account:

    **`GET /api/v1/application_key`**

* To **get** a given application key:

    **`GET /api/v1/application_key/<APP_KEY>`**

* To **edit** an application key name:

    **`POST /api/v1/application_key/<APP_KEY>`**

* To **delete** an application key from Datadog:

    **`DELETE /api/v1/application_key/<APP_KEY>`**

##### ARGUMENTS

* **`name`** [*required*]:

    Name of your application key.
