---
title: Stepper test (closed stepper)
---

## Overview

This is a test page used to verify the behavior of a closed stepper (stepper with no `open` attribute).

## Test cases

- The stepper displays only the first step if its `open` attribute is `false` or not present.
- The `stepper-finished` content is not displayed if the steps are not completed.
- The stepper advances the active step when the user clicks `Next`.
- The stepper rewinds when the user clicks `Previous`.
- The user can expand the steps.
- The user can collapse the steps, and their previous active step is preserved.
- The user can manually set the active step by clicking a step title, allowing them to skip steps.
- When all steps are completed, the `stepper-finished` content displays.
- The `stepper-finished` content hides itself if the user manually rewinds the active step.
- The user can reset the stepper.
- All of the above steps also work using just keyboard navigation.

## Stepper component

{% stepper %}

{% step title="Install the database" %}
Run the following command to install FakeDB:

```shell
curl -fsSL https://fakedb.example.com/install.sh | bash
```

After the installation completes, verify that FakeDB is running:

```shell
fakedb --version
```
{% /step %}

{% step title="Configure the database" %}

Create a configuration file for FakeDB:

{% tabs %}

{% tab label="YAML" %}
```yaml
fakedb:
  host: localhost
  port: 5432
  database: mydb
  username: admin
  password: secret
  max_connections: 100
  timeout: 30s
```
{% /tab %}

{% tab label="JSON" %}
```json
{
  "fakedb": {
    "host": "localhost",
    "port": 5432,
    "database": "mydb",
    "username": "admin",
    "password": "secret",
    "max_connections": 100,
    "timeout": "30s"
  }
}
```
{% /tab %}
{% /tabs %}

{% /step %}

{% step title="Connect to the database" %}
Start the FakeDB service and open a connection:

```shell
fakedb start
fakedb connect --host localhost --port 5432 --database mydb --username admin
```

To verify the connection is working, run a test query:

```shell
fakedb query "SELECT 1;"
```
{% /step %}

{% stepper-finished %}
You're all set. Happy databasing!
{% /stepper-finished %}

{% /stepper %}