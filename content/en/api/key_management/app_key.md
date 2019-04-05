---
title: APP Keys
type: apicontent
order: 16.2
external_redirect: /api/#app-keys
---

## API Keys

Manage all your APP Key with the following endpoints:

* To **get** all APP keys available for your account:

    **`GET /api/v1/application_key`**

* To **get** a given APP key:

    **`GET /api/v1/application_key/<APP_KEY>`**

* To **edit** an APP Key name:

    **`POST /api/v1/application_key/<APP_KEY>`**

* To **delete** an APP Key from Datadog:

    **`DELETE /api/v1/application_key/<APP_KEY>`**

##### ARGUMENTS

* **`name`** [*required*]:

    Name of your APP key.
