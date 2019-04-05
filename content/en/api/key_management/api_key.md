---
title: API Keys
type: apicontent
order: 16.1
external_redirect: /api/#api-keys
---

## API Keys

Manage all your API Key with the following endpoints:

* To **get** all API keys available for your account:

    **`GET /api/v1/api_key`**

* To **get** a given API key:

    **`GET /api/v1/api_key/<API_KEY>`**

* To **edit** an API Key name:

    **`POST /api/v1/api_key/<API_KEY>`**

* To **delete** an API Key from Datadog:

    **`DELETE /api/v1/api_key/<API_KEY>`**

##### ARGUMENTS

* **`name`** [*required*]:

    Name of your API key.
