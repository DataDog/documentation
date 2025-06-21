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

## Setup

The `datadog-sync-cli` tool can be installed from:
- [source](#installing-from-source)
- [releases](#installing-from-releases)
- [using Docker and builing an image](#installing-using-docker)

### Installing from source

{{% collapse-content title="Source installation steps" level="h5" expanded=true id="id-for-anchoring" %}}
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


### Installing from releases

{{% collapse-content title="Releases installation steps" level="h5" expanded=true id="id-for-anchoring" %}}

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

### Installing using Docker

{{% collapse-content title="Docker installation steps" level="h5" expanded=true id="id-for-anchoring" %}}

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


## Usage 

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


### Syncing your resources 

1. Run the `import` command to read the specified resources from the source organization and store them locally into JSON files in the directory `resources/source`.

2. Run the `sync` command which will use the stored files from previous `import` command to create/modify the resources on the destination organization. The pushed resources are saved in the directory resources/destination.
   - (unless `--force-missing-dependencies flag is passed`)(`WHAT IS THIS REFERENCING?`)

3. The migrate command will run an `import` followed immediately by a `sync`.

4. The reset command will delete resources at the destination; however, by default it backs up those resources first and fails if it cannot. You can (but probably shouldn't) skip the backup by using the --do-not-backup flag.

<div class="alert alert-warning"> <strong>Note:</strong> <br>The sync-cli tool uses the <code>resources</code> directory as the source of truth for determining what resources need to be created and modified. This directory should not be removed or corrupted.</div>

### Example usage

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

<!-- ----------------------------------------- -->
<!-- NEEDS TO BE REVIEWED FOR CONTENT AND FLOW -->
<!-- ----------------------------------------- -->
## Filtering the data collected
Filtering is done on two levels, at top resources level and per individual resource level using `--resources` and `--filter` respectively.


### Top resources level filtering
By default all resources are imported, synced, etc. If you would like to perform actions on a specific top level resource, or subset of resources, use `--resources` option. 

For example, the command `datadog-sync import --resources="dashboard_lists,dashboards"` will import ALL dashboards and dashboard lists in your Datadog organization.


### Per resource level filtering
Individual resources can be further filtered using the `--filter `flag. For example, the following command `datadog-sync import --resources="dashboards,dashboard_lists" --filter='Type=dashboard_lists;Name=name;Value=My custom list'`, will import ALL dashboards and ONLY dashboard lists with the `name` attribute equal to `My custom list`.


Filter option (`--filter`) accepts a string made up of `key=value` pairs separated by `;`.

```
--filter 'Type=<resource>;Name=<attribute_name>;Value=<attribute_value>;Operator=<operator>'
```

### Available keys:

`Type`
: Resource such as Monitors, Dashboards, and more. [required]

`Name`
: Attribute key to filter on. This can be any attribute represented in dot notation (such as attributes.user_count). [required]

`Value`
: Regex to filter attribute value by. Note: special regex characters need to be escaped if filtering by raw string. [required]

`Operator`
: Available operators are below. All invalid operator's default to ExactMatch.
- `Not`: Match not equal to Value.
- `SubString` (_Deprecated_): Sub string matching. (This operator will be removed in future releases. See SubString and ExactMatch Deprecation section.)
- `ExactMatch` (_Deprecated_): Exact string match. (This operator will be removed in future releases. See SubString and ExactMatch Deprecation section.)

By default, if multiple filters are passed for the same resource, OR logic is applied to the filters. This behavior can be adjusted using the --filter-operator option.








## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/site/


