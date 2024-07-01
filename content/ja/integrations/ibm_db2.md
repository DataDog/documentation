---
"app_id": "ibm-db2"
"app_uuid": "e588293a-833f-4888-a7b4-2208e087059a"
"assets":
  "dashboards":
    "IBM Db2 Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": ibm_db2.connection.active
      "metadata_path": metadata.csv
      "prefix": ibm_db2.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10054"
    "source_type_name": IBM Db2
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ibm_db2"
"integration_id": "ibm-db2"
"integration_title": "IBM Db2"
"integration_version": "2.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "ibm_db2"
"public_title": "IBM Db2"
"short_description": "Monitor table space, buffer pool, and other metrics from your IBM Db2 database."
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor table space, buffer pool, and other metrics from your IBM Db2 database.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": IBM Db2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![default dashboard][1]

## Overview

This check monitors [IBM Db2][2] through the Datadog Agent.

## Setup

### Installation

The IBM Db2 check is included in the [Datadog Agent][3] package.

#### Dependencies

The [ibm_db][4] client library is required. To install it, ensure you have a working compiler and run:

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.1.0
```

Note: If you are on an Agent running Python 2, use `ibm_db==3.0.1` instead of `ibm_db=3.1.0`.

##### Windows

For Agent versions <= 6.11:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

For Agent versions >= 6.12 and < 7.0:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install ibm_db==3.0.1
```

For Agent versions >= 7.0:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.1.0
```

On Linux there may be need for XML functionality. If you encounter errors during
the build process, install `libxslt-dev` (or `libxslt-devel` for RPM).

#### Enable monitoring

The IBM Db2 integration pulls data using the following table functions: 
* `MON_GET_TABLESPACE`
* `MON_GET_TRANSACTION_LOG`
* `MON_GET_BUFFERPOOL`
* `MON_GET_DATABASE`
* `MON_GET_INSTANCE`

For more information about these table functions, see the [official IBM documentation][5].

To monitor a Db2 instance, create a Db2 user with either the `EXECUTE` permission on the above five table functions, or grant the Db2 user one of the following roles:
* `DATAACCESS` authority
* `DBADM` authority
* `SQLADM` authority

To monitor the health of an instance, its associated databases, and database objects, enable the database system monitor switches for each of the objects you want to monitor: 
* Statement
* Lock
* Tables
* Buffer pool

Switch to the instance master user and run these commands at the `db2` prompt:

```text
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

Next, run `get dbm cfg` and you should see the following:

```text
 Default database monitor switches
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = OFF
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = OFF
 Monitor health of instance and databases   (HEALTH_MON) = ON
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `ibm_db2.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your `ibm_db2` performance data. See the [sample ibm_db2.d/conf.yaml][1] for all available configuration options.

2. [Restart the Agent][2].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `ibm_db2.d/conf.yaml` file to start collecting your IBM Db2 logs:

   ```yaml
   logs:
     - type: file
       path: /home/db2inst1/sqllib/db2dump/db2diag.log
       source: ibm_db2
       service: db2sysc
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])
   ```

3. [Restart the Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_db2`                                                                                                     |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"db": "<DB_NAME>", "username":"<USERNAME>", "password":"<PASSWORD>", "host":"%%host%%", "port":"%%port%%"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_db2", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][6] and look for `ibm_db2` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "ibm_db2" >}}


### Events

- `ibm_db2.tablespace_state_change` is triggered whenever the state of a tablespace changes.

### Service Checks
{{< get-service-checks-from-git "ibm_db2" >}}


## Troubleshooting

### CLI Driver SQL1531N error

If you encounter an issue that produces error logs like the following:

```
2023-08-10 23:34:47 UTC | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | ibm_db2:c051131490335a94 | (ibm_db2.py:563) | Unable to connect to database `datadog` as user `db2inst1`: [IBM][CLI Driver] SQL1531N  The connection failed because the name specified with the DSN connection string keyword could not be found in either the db2dsdriver.cfg configuration file or the db2cli.ini configuration file.  Data source name specified in the connection string: "DATADOG". SQLCODE=-1531
```

Then it's most likely caused by one of the following scenarios:
- The configuration (conf.yaml) is missing a host and port configuration
- The CLI Driver isn't able to locate the database due to the absence of `db2cli.ini` and `db2dsdriver.cfg`

The Agent requires the information in both of the above scenarios to determine where to properly connect to the database. To solve this issue, you can either include a host and port parameter for every instance of the `ibm_db2` check experiencing this issue. Alternatively, if you want to use the DSNs defined in either the `db2cli.ini` or `db2dsdriver.cfg` files, you can copy those files over to the `clidriver` directory that the Agent uses. Under normal circumstances, that directory is located at `/opt/datadog-agent/embedded/lib/python3.9/site-packages/clidriver/cfg` for Linux.

### Installing `ibm_db` client library offline

If you're in an air gapped environment, or on a restricted network where it's not possible to run `pip install ibm_db==x.y.z` where `x.y.z` is the version number, you can install `ibm_db` using the following method:


1. On a machine with network access, download the source tarballs for [the `ibm_db` library][7] and [the ODBC and CLI][8]. The ODBC and CLI are required to be downloaded separately because the `ibm_db` library requires them, but it cannot download them via `pip`. The following script installs the archive file for `ibm_db==x.y.z` on a Linux machine, where `x.y.z` is the version number:

   ```
   curl -Lo ibm_db.tar.gz https://github.com/ibmdb/python-ibmdb/archive/refs/tags/vx.y.z.tar.gz

   curl -Lo linuxx64_odbc_cli.tar.gz https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
   ```

1. Transport the two files over to the restricted host, and then extract the archive.

   ```
   tar -xvf ibm_db.tar.gz

   tar -xvf linuxx64_odbc_cli.tar.gz
   ```

1. Set the `IBM_DB_HOME` environment variable to the location of where `/clidriver` was extracted from `linuxx64_odbc_cli.tar.gz`. This will prevent the `ibm_db` library from installing a new version of the ODBC and CLI since that would fail.

   ```
   export IBM_DB_HOME=/path/to/clidriver
   ```

1. Using the embedded [`pip`][9] on the Agent, install the `ibm_db` library locally. This library's files are contained within the extracted `python-ibmdb-x.y.z` from `ibm_db.tar.gz`.

   ```
   /opt/datadog-agent/embedded/bin/pip install --no-index --no-deps --no-build-isolation  /path/to/python-ibmdb-x.y.z/IBM_DB/ibm_db/
   ```

If you get the following error:

```
  error: subprocess-exited-with-error

  × Preparing metadata (pyproject.toml) did not run successfully.
  | exit code: 1
   -> [8 lines of output]
      Detected 64-bit Python
      Detected platform = linux, uname = x86_64
      Downloading https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
       Downloading DSDriver from url =  https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
      Pre-requisite check [which gcc] : Failed

      No Gcc installation detected.
      Please install gcc and continue with the installation of the ibm_db.
      [end of output]
```

You may need to install `gcc`.

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor IBM DB2 with Datadog][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/ibmdb/python-ibmdb
[5]: https://www.ibm.com/docs/en/db2oc?topic=views-monitor-procedures-functions
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://pypi.org/project/ibm-db/#files
[8]: https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/
[9]: https://docs.datadoghq.com/developers/guide/custom-python-package/?tab=linux
[10]: https://docs.datadoghq.com/help/
[11]: https://www.datadoghq.com/blog/monitor-db2-with-datadog
