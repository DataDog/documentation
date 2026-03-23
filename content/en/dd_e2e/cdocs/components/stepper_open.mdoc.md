---
title: Stepper test (open stepper)
---

{% stepper open=true %}

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

{% /stepper %}
