---
title: Sync resources across Datadog organizations
disable_toc: false
further_reading:
- link: "/agent/guide/"
  tag: "Documentation"
  text: "Agent guides"
- link: "https://docs.datadoghq.com/account_management/multi_organization/"
  tag: "Blog"
  text: "Best practices for managing Datadog organizations at scale"
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/billing/usage_details"
  tag: "Documentation"
---

## Overview 
Use the `datadog-sync-cli` tool to copy your dashboards, monitors and other configurations from your primary Datadog account to your secondary Datadog account. 

You can determine the frequency and timing of syncing based on your business requirements. However, regular syncing is essential to ensure that your secondary account is up-to-date in the event of an outage. 

Datadog recommends syncing your accounts on a daily basis.

<div class="alert alert-warning"> <strong>Note:</strong> The <code>datadog-sync-cli</code> tool is used to migrate resources across organizations, regardless of datacenter. It cannot, nor is it intended to, transfer any ingested data, such as logs, metrics etc. The source organization will not be modified, but the destination organization will have resources created and updated by the <code>sync</code> command.</div>

## Supported resources and site URLs

Before you begin, confirm that both the **resource** you are migrating and the **source/destination API URLs** you are using are supported by the `sync-cli` tool:

{{% collapse-content title="List of supported resources" level="h5" expanded=true id="id-for-resources" %}}

| Resource                               | Description                                               |
|--------------------------------------- |-----------------------------------------------------------|
| authn_mappings                         | Sync Datadog authn mappings.                              |
| dashboard_lists                        | Sync Datadog dashboard lists.                             |
| dashboards                             | Sync Datadog dashboards.                                  |
| downtime_schedules                     | Sync Datadog downtimes.                                   |
| downtimes (**deprecated**)             | Sync Datadog downtimes.                                   |
| host_tags                              | Sync Datadog host tags.                                   |
| logs_archives                | Sync Datadog logs archives. Requires GCP, Azure, or AWS integration.|
| logs_archives_order                    | Sync Datadog logs archives order.                         |
| logs_custom_pipelines (**deprecated**) | Sync Datadog logs custom pipelines.                       |
| logs_indexes                           | Sync Datadog logs indexes.                                |
| logs_indexes_order                     | Sync Datadog logs indexes order.                          |
| logs_metrics                           | Sync Datadog logs metrics.                                |
| logs_pipelines                         | Sync Datadog logs OOTB integration and custom pipelines.  |
| logs_pipelines_order                   | Sync Datadog logs pipelines order.                        |
| logs_restriction_queries               | Sync Datadog logs restriction queries.                    |
| metric_percentiles                     | Sync Datadog metric percentiles.                          |
| metric_tag_configurations              | Sync Datadog metric tags configurations.                  |
| metrics_metadata                       | Sync Datadog metric metadata.                             |
| monitors                               | Sync Datadog monitors.                                    |
| notebooks                              | Sync Datadog notebooks.                                   |
| powerpacks                             | Sync Datadog powerpacks.                                  |
| restriction_policies                   | Sync Datadog restriction policies.                        |
| roles                                  | Sync Datadog roles.                                       |
| sensitive_data_scanner_groups          | Sync SDS groups                                           |
| sensitive_data_scanner_groups_order    | Sync SDS groups order                                     |
| sensitive_data_scanner_rules           | Sync SDS rules                                            |
| service_level_objectives               | Sync Datadog SLOs.                                        |
| slo_corrections                        | Sync Datadog SLO corrections.                             |
| spans_metrics                          | Sync Datadog spans metrics.                               |
| synthetics_global_variables            | Sync Datadog synthetic global variables.                  |
| synthetics_private_locations           | Sync Datadog synthetic private locations.                 |
| synthetics_tests                       | Sync Datadog synthetic tests.                             |
| teams                                  | Sync Datadog teams (excluding permissions).               |
| team_memberships                       | Sync Datadog team memberships.                            |
| users                                  | Sync Datadog users.                                       |

**Note:** `logs_custom_pipelines` resource has been deprecated in favor of `logs_pipelines` resource which supports both OOTB integration and custom pipelines. To migrate to the new resource, rename the existing state files from `logs_custom_pipelines.json` to `logs_pipelines.json` for both source and destination files.
{{% /collapse-content %}} 

{{% collapse-content title="List of source and destination API URLs" level="h5" expanded=true id="id-for-resources" %}}
These are the Available URL's for the source and destination API URLs when syncing your organization:

| Site    | Site URL                    | Site Parameter      | Location |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Germany) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japan |


For all available regions, see [Getting Started with Datadog Sites][1].
[1]: https://docs.datadoghq.com/getting_started/site/
{{% /collapse-content %}} 

<br>

## Install the datadog-sync-cli tool

The `datadog-sync-cli` tool can be installed from [source](#installing-from-source), [releases](#installing-from-releases), and [using Docker and builing an image](#installing-using-docker):


{{% collapse-content title="Installing from source" level="h5" expanded=true id="id-for-anchoring" %}}
Installing from source requires Python `v3.9+`


1. Clone the project repo and CD into the directory 

   ```shell
   git clone https://github.com/DataDog/datadog-sync-cli.git
   cd datadog-sync-cli
   ```
  

2. Install `datadog-sync-cli` tool using pip 

   ```shell
   pip install .
   ```

3. Invoke the cli tool using 
   ```shell
   datadog-sync <command> <options>
   ```
{{% /collapse-content %}} 


{{% collapse-content title="Installing from releases" level="h5" expanded=true id="id-for-anchoring" %}}

{{< tabs >}}
{{% tab "MacOS and Linux" %}}

1. Download the executable from the [Releases page][1]

2. Provide the executable with executable permission 
   ```shell
   chmod +x datadog-sync-cli-{system-name}-{machine-type}
   ```

3. Move the executable to your bin directory 
   ```shell
   sudo mv datadog-sync-cli-{system-name}-{machine-type} /usr/local/bin/datadog-sync
   ```

4. Invoke the CLI tool using
   ```shell
   datadog-sync <command> <options>
   ```

[1]: https://github.com/DataDog/datadog-sync-cli/releases
{{% /tab %}}

{{% tab "Windows" %}}

1. Download the executable with extension `.exe` from the [Releases page][1]

2. Add the directory containing the exe file to your [path][2]

3. Invoke the CLI tool in `cmd/powershell` using the file name and omitting the extension: 
   ```shell
   datadog-sync-cli-windows-amd64 <command> <options>
   ```

[1]: https://github.com/DataDog/datadog-sync-cli/releases
[2]: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/path
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 


{{% collapse-content title="Installing using Docker" level="h5" expanded=true id="id-for-anchoring" %}}

1. Clone the project repo and CD into the directory 

   ```shell
   git clone https://github.com/DataDog/datadog-sync-cli.git 
   cd datadog-sync-cli
   ```

2. Build the provided Dockerfile

   ``` shell
   docker build . -t datadog-sync
   ```

3. Run the Docker image using entrypoint below:
   ```
    docker run --rm -v <PATH_TO_WORKING_DIR>:/datadog-sync:rw \
      -e DD_SOURCE_API_KEY=<DATADOG_API_KEY> \
      -e DD_SOURCE_APP_KEY=<DATADOG_APP_KEY> \
      -e DD_SOURCE_API_URL=<DATADOG_API_URL> \
      -e DD_DESTINATION_API_KEY=<DATADOG_API_KEY> \
      -e DD_DESTINATION_APP_KEY=<DATADOG_APP_KEY> \
      -e DD_DESTINATION_API_URL=<DATADOG_API_URL> \
      datadog-sync:latest <command> <options>
   ```
The docker run command mounts a specified <PATH_TO_WORKING_DIR> working directory to the container.
{{% /collapse-content %}} 

<br>

## How to use the datadog-sync-cli tool

### Steps to sync your resources 

1. Run the `import` command to read the specified resources from the source organization and store them locally into JSON files in the directory `resources/source`.

2. Run the `sync` command which will use the stored files from previous `import` command to create/modify the resources on the destination organization. The pushed resources are saved in the directory resources/destination.
   - (unless `--force-missing-dependencies` flag is passed)(`WHAT IS THIS REFERENCING?`)

3. The migrate command will run an `import` followed immediately by a `sync`.

4. The reset command will delete resources at the destination; however, by default it backs up those resources first and fails if it cannot. You can (but probably shouldn't) skip the backup by using the --do-not-backup flag.

<div class="alert alert-warning"> <strong>Note:</strong> <br>The sync-cli tool uses the <code>resources</code> directory as the source of truth for determining what resources need to be created and modified. This directory should not be removed or corrupted.</div>

### Example usage

This example uses US1 as the source URL and the EU as the destination URL. Your source and destinations may be different. See the list of [supported source and destination API URLs](#supported-resources-and-site-urls) for more information. 

```shell
# Import resources from parent organization and store them locally
$ datadog-sync import \
    --source-api-key="..." \
    --source-app-key="..." \
    --source-api-url="https://api.datadoghq.com" # this is an example of a source url, yours may be different

> 2024-03-14 14:53:54,280 - INFO - Starting import...
> ...
> 2024-03-14 15:00:46,100 - INFO - Finished import

# Check diff output to see what resources will be created/modified
$ datadog-sync diffs \
    --destination-api-key="..." \
    --destination-app-key="..." \
    --destination-api-url="https://api.datadoghq.eu" #this is an example of a destination url, yours may be different

> 2024-03-14 15:46:22,014 - INFO - Starting diffs...
> ...
> 2024-03-14 14:51:15,379 - INFO - Finished diffs

# Sync the resources to the child organization from locally stored files and save the output locally
$ datadog-sync sync \
    --destination-api-key="..." \
    --destination-app-key="..." \
    --destination-api-url="https://api.datadoghq.eu"

> 2024-03-14 14:55:56,535 - INFO - Starting sync...
> ...
> 2024-03-14 14:56:00,797 - INFO - Finished sync: 1 successes, 0 errors
```


### Filter the data collected
By default all resources are imported and synced. You can use the filtering option to specify what resources are migrated. Filtering is done on two levels:
- [top resources level filtering](#top-resources-level-filtering) (`--resources` filter option)
- [individual resource level filtering](#per-resource-level-filtering) (`--filter` filter option)

#### Top resources level filtering
By default all resources are imported, synced, etc. If you would like to perform actions on a specific top level resource, or subset of resources, use `--resources` option. 

For example, the command `datadog-sync import --resources="dashboard_lists,dashboards"` will import ALL dashboards and dashboard lists in your Datadog organization.


#### Individual resource level filtering
Individual resources can be further filtered using the `--filter `flag. For example, the following command will import ALL dashboards and ONLY dashboard lists with the `name` attribute equal to `My custom list`:

```shell
datadog-sync import --resources="dashboards,dashboard_lists" --filter='Type=dashboard_lists;Name=name;Value=My custom list'
```

The filter option `--filter` accepts a string made up of `key=value` pairs separated by `;` as seen in the example here:

```shell
--filter 'Type=<resource>;Name=<attribute_name>;Value=<attribute_value>;Operator=<operator>'
```
<div class="alert alert-info">

##### SubString and ExactMatch Deprecation

In future releases the `SubString` and `ExactMatch` Operator will be removed in favor of the `Value` key. This is because the `Value` key supports regex so both of these scenarios are covered by just writing the appropriate regex.  Below is an example:

For example, if you would like to filter for monitors that have the `filter test` in the `name` attribute:

| Operator           | Command                                                                       |
| -------------------| ------------------------------------------------------------------------------|
| `SubString`        | `--filter 'Type=monitors;Name=name;Value=filter test;Operator=SubString'`     |
| Using `Value`      | `--filter 'Type=monitors;Name=name;Value=.*filter test.*`                     |
| `ExactMatch` <br>    | `--filter 'Type=monitors;Name=name;Value=filter test;Operator=ExactMatch'`    |
| Using `Value`      | `--filter 'Type=monitors;Name=name;Value=^filter test$`                       |

</div>

### List of available keys

Type `REQUIRED`
: Resource such as Monitors, Dashboards, and more.

Name `REQUIRED`
: Attribute key to filter on. This can be any attribute represented in dot notation such as `attributes.user_count`.

Value `REQUIRED`
: Regex to filter attribute value by. Note: special regex characters need to be escaped if filtering by raw string.

Operator
: All invalid operator's default to ExactMatch. Available operators are:
: - `Not`: Match not equal to Value.
: - `SubString` (_Deprecated_): Sub string matching. This operator will be removed in future releases. See SubString and ExactMatch Deprecation section.
: - `ExactMatch` (_Deprecated_): Exact string match. This operator will be removed in future releases. See SubString and ExactMatch Deprecation section.

By default, if multiple filters are passed for the same resource, OR logic is applied to the filters. This behavior can be adjusted using the `--filter-operator` option.


## Additional configurations 
### Using custom configuration instead of options 
You can use a custom configuration text file in place of using `options`. This is an example config file for a `US1` source URL and `EU` destination URL:

```shell
destination_api_url="https://api.datadoghq.eu"
destination_api_key="<API_KEY>"
destination_app_key="<APP_KEY>"
source_api_key="<API_KEY>"
source_app_key="<APP_KEY>"
source_api_url="https://api.datadoghq.com"
filter=["Type=Dashboards;Name=title;Value=Test screenboard", "Type=Monitors;Name=tags;Value=sync:true"]
```

Then, run: 

```shell
datadog-sync import --config config
```

### Using the cleanup flag to sync changes from the source destination
The tool's `sync` command provides a cleanup flag (`--cleanup`). Passing the cleanup flag will delete resources from the destination organization which have been removed from the source organization. The resources to be deleted are determined based on the difference between the [state files](#) of source and destination organization.

For example, `ResourceA` and `ResourceB` are imported and synced, followed by deleting `ResourceA` from the source organization. Running the `import` command will update the source organizations state file to only include `ResourceB`. The following `sync --cleanup=Force` command will now delete `ResourceA` from the destination organization.


### Verify your Datadog disaster recovery (DDR) status 

By default all commands check the Datadog Disaster Recovery (DDR) status of both the source and destination organizations before running. This behavior is controlled by the boolean flag `--verify-ddr-status` or the environment variable `DD_VERIFY_DDR_STATUS`. 


### State files [Avoid data duplication while keeping data seperation]

By default, a `resources` directory is generated in the current working directory of the user. This directory contains `json` mapping of resources between the source and destination organization. To avoid duplication and loss of mapping, this directory should be retained between tool usage. To override these directories use the `--source-resources-path` and `--destination-resource-path`.

When running againts multiple destination organizations, a seperate working directory should be used to ensure seperation of data. 

## Best practices
### Resource subsets must be migrated with their dependencies
Many Datadog resources are interdependent. For example, some Datadog resource can reference `roles` and `dashboards`, which includes widgets that may use monitors or synthetics data. The datadog-sync tool syncs these resources in order to ensure dependencies are not broken.

If importing/syncing subset of resources, users should ensure that dependent resources are imported and synced as well.

See [Supported resources](#supported-resources) section below for potential resource dependencies.

{{% collapse-content title="List of potential resources dependencies" level="h5" expanded=true id="id-for-resources" %}}

| Resource                               | Dependencies                                                     |
|----------------------------------------|------------------------------------------------------------------|
| authn_mappings                         | roles, teams                                                     |
| dashboard_lists                        | dashboards                                                       |
| dashboards                             | monitors, roles, powerpacks, service_level_objectives            |
| downtime_schedules                     | monitors                                                         |
| downtimes (**deprecated**)             | monitors                                                         |
| host_tags                              | -                                                                |
| logs_archives                          | - (Requires manual setup of AWS, GCP or Azure integration)       |
| logs_archives_order                    | logs_archives                                                    |
| logs_custom_pipelines (**deprecated**) | -                                                                |
| logs_indexes                           | -                                                                |
| logs_indexes_order                     | logs_indexes                                                     |
| logs_metrics                           | -                                                                |
| logs_pipelines                         | -                                                                |
| logs_pipelines_order                   | logs_pipelines                                                   |
| logs_restriction_queries               | roles                                                            |
| metric_percentiles                     | -                                                                |
| metric_tag_configurations              | -                                                                |
| metrics_metadata                       | -                                                                |
| monitors                               | roles, service_level_objectives                                  |
| notebooks                              | -                                                                |
| powerpacks                             | monitors, service_level_objectives                               |
| restriction_policies                   | dashboards, service_level_objectives, notebooks, users, roles    |
| roles                                  | -                                                                |
| sensitive_data_scanner_groups          | -                                                                |
| sensitive_data_scanner_groups_order    | sensitive_data_scanner_groups                                    |
| sensitive_data_scanner_rules           | sensitive_data_scanner_groups                                    |
| service_level_objectives               | monitors, synthetics_tests                                       |
| slo_corrections                        | service_level_objectives                                         |
| spans_metrics                          | -                                                                |
| synthetics_global_variables            | synthetics_tests                                                 |
| synthetics_private_locations           | -                                                                |
| synthetics_tests                       | synthetics_private_locations, synthetics_global_variables, roles |
| teams                                  | -                                                                |
| team_memberships                       | teams, users                                                     |
| users                                  | roles                                                            |

{{% /collapse-content %}} 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/site/


