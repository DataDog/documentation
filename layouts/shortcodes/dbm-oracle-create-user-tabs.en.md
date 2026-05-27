If you already have the legacy Oracle integration installed, skip this step, because the user already exists.

Create a read-only login to connect to your server and grant the required permissions:

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}