---
title: Splunk Migration
description: "Translate Splunk SPL queries into Datadog syntax and convert Splunk alerts and dashboards into Datadog monitors and dashboards."
further_reading:
- link: "/logs/explorer/search_syntax/"
  tag: "Documentation"
  text: "Log search syntax"
- link: "/ddsql_editor/"
  tag: "Documentation"
  text: "DDSQL Editor"
- link: "/monitors/types/log/"
  tag: "Documentation"
  text: "Log monitors"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
---

## Overview

The Migration App translates Splunk Processing Language (SPL) into Datadog query syntax and converts Splunk assets into their Datadog equivalents. It provides two tools:

| Tool | Use case |
|------|-----------|
| [Single Translation][1] | Translate a single SPL query and see the Datadog equivalent with an explanation of how the translation was built. |
| [Batch Migration][2] | Import batches of Splunk alerts and dashboards, review the translated results, and publish them as Datadog monitors and dashboards. |

The Migration App parses and converts queries deterministically with translation libraries, not a large language model. Each query is translated into [log search syntax][3] when possible for use with the Log Explorer, log monitors, and dashboard widgets. Analytically complex queries that log search syntax cannot express fall back to [DDSQL][4].

## Translate a single query

Use Single Translation as a sandbox for SPL. It is designed for exploring translation behavior rather than for migrating an inventory of assets.

1. Go to [Logs > Single Translation][1].
2. Paste an SPL query into the query box, or select one of the provided examples.
3. Click {{< ui >}}Translate{{< /ui >}}.

{{< img src="logs/splunk_migration/single-translation.mp4" alt="An SPL query is entered in the Single Translation page and translated, showing the Translation preview chart, the translated Datadog query, and the Translated SPL" video="true" width="100%" >}}

The page returns:

- The translated Datadog query, in the search bar above the {{< ui >}}Translation preview{{< /ui >}} chart, in log search syntax or DDSQL.
- {{< ui >}}Translation preview{{< /ui >}}: the data matching the translated query, over a time range you control. Click {{< ui >}}View in Log Explorer{{< /ui >}} to continue in the [Log Explorer][5].
- {{< ui >}}Translated SPL{{< /ui >}}: your original SPL, annotated with anything the translator changed or could not translate, such as stripped indexes or unsupported commands.
- {{< ui >}}How did we translate?{{< /ui >}}: an explanation of which SPL commands produced which parts of the Datadog query.

## Migrate assets in batch

The Batch Migration tool migrates many Splunk assets at once. You upload your Splunk inventory as CSV files, and the tool groups them into a named batch. It translates each asset in the batch, and you review and publish the results to Datadog. The following resource types are supported:

| Splunk resource | Datadog equivalent | Notes |
|-----------------|--------------------|-------|
| Alert (saved search) | [Monitor][6] | Translates to a log monitor when possible, and to an analysis monitor with a DDSQL query otherwise. |
| Dashboard | [Dashboard][7] | Both Studio (JSON) and Classic (XML) dashboards are supported. Each panel is translated independently. |
| Search macro | None | Macros expand the SPL in your alerts and dashboards before translation. They are not published as Datadog assets. |

### Export your assets from Splunk

Export each resource type from Splunk as a separate CSV file:

1. Sign in to Splunk and open the Search app.
2. Run the query for the resource type you want to export:

   Alerts:
   ```
   | rest /services/saved/searches splunk_server=local
   | table
     title
     eai:acl.owner
     eai:acl.app
     search
     triggered_alert_count
     alert_condition
     alert_threshold
     alert_comparator
     alert_type
     actions
     action.email.to
     action.email.message.alert
     action.slack.param.channel
     action.slackparam.message
     description
   ```

   Dashboards:
   ```
   | rest /servicesNS/admin/search/data/ui/views
   | spath input=eai:data path=dashboard.definition output=definition
   | spath input=eai:data path=dashboard output=dashboard_xml
   | where isnotnull(definition) OR (isnull(definition) AND isnotnull(dashboard_xml))
   | eval result=if(isnotnull(definition), definition, 'eai:data')
   | eval type=if(isnotnull(definition), "studio", "legacy")
   | eval title=if(type=="studio", json_extract(result, "title"), null())
   | eval description=if(type=="studio", json_extract(result, "description"), null())
   | spath input=result path=dashboard.label output=xml_title
   | spath input=result path=dashboard.description output=xml_description
   | eval title=coalesce(title, xml_title)
   | eval description=coalesce(description, xml_description)
   | fields type,title,description,result
   ```

   Macros:
   ```
   | rest /servicesNS/-/-/admin/macros count=0 splunk_server=local
   | table definition author disabled title args updated eai:appName validation
   ```

3. Confirm the results contain the assets you want to migrate.
4. Above the results, click the export button, select the CSV format, and download the file.
5. Repeat for each resource type. Export the macros query if any of your alerts or dashboards use search macros.

The same instructions, with screenshots of the Splunk UI, are available in the import wizard under {{< ui >}}How to export your assets from Splunk?{{< /ui >}}.

### Import your assets into Datadog

1. Go to [Logs > Batch Migration][2] and click {{< ui >}}Start migration{{< /ui >}}.
2. In {{< ui >}}Upload your assets from Splunk{{< /ui >}}, add your alert and dashboard CSV files. Upload as many files as you need, but leave the macros file out of this step.
3. In {{< ui >}}Macros file{{< /ui >}}, upload the macros CSV, if you have one.
4. In {{< ui >}}Name your import{{< /ui >}}, give the batch a name that identifies it later.
5. Click {{< ui >}}Import{{< /ui >}}.

{{< img src="logs/splunk_migration/import-wizard.png" alt="The Import page, with steps for uploading assets from Splunk, uploading a macros file, and naming the import" style="width:100%;" >}}

Translation starts as soon as the batch is created and runs in the background. You can close the page and come back to it.

### Review and publish

Open a batch to see every resource it contains and the state of its translation:

| Status | Meaning |
|--------|---------|
| Pending | The resource is queued for translation. |
| In progress | The resource is being translated. |
| Translated | A Datadog equivalent is ready to review and publish. |
| Published | The resource exists in Datadog. The batch links to it. |
| Error | The resource could not be translated. |

Click a resource to see its original SPL, the translated query, and the explanation of the translation. Review the translation before publishing, because a translated query is not guaranteed to return the same results as the Splunk original. Publishing creates the monitor or dashboard in your Datadog organization.

A dashboard carries a status for each of its widgets, and publishes as a single dashboard. Open it to see which widgets translated and which returned an error.

{{< img src="logs/splunk_migration/dashboard-widget-review.png" alt="A translated dashboard in a batch, showing a summary of three translated widgets and two errors, above a table listing the status of each widget" style="width:100%;" >}}

Resources in an error state cannot be published, and a translation cannot be edited in Datadog before it is published. To correct a resource, fix it at the source and import it again:

1. Correct the asset in Splunk and export it again, or edit the exported CSV directly. Editing the CSV is often faster for a small fix, such as renaming an index or attribute to match the one in Datadog.
2. Delete the original batch if you want to reuse its name.
3. Import the corrected file as a new batch.

## Translation gaps

A translated query is a faithful conversion of the SPL, not a guarantee of identical results. These gaps account for most of the differences:

Logs have a different shape in each platform
: Pipelines, processors, and log-shipping agents differ between the two platforms. As a result, the attributes available on a log differ. The translator preserves attribute names as written, other than mapping [standard attributes][8]. If a Datadog pipeline does not produce an attribute the Splunk query relies on, the translated query returns no results. Add the missing [processors][9] to your Datadog pipelines.

Indexes do not match
: Splunk index names rarely map one-to-one onto Datadog [log indexes][10]. An index filter that does not resolve causes a query error. The translator strips index terms that have no Datadog equivalent and flags them as a warning. Review the warning and scope the query with tags or attributes instead.

There is not enough sample data
: A query that runs against an index with little matching data returns an empty preview, which makes the translation hard to verify. Confirm the relevant logs reach Datadog before you assess a translation.

The SPL command is not supported
: Support covers a large inventory of SPL commands and continues to expand. When a command has no Datadog equivalent, the translator returns as much of the query as it can and flags the unsupported portion.

## Permissions

Publishing a translated resource requires the permission for the asset being created: `monitors_write` for monitors, and `dashboards_write` for dashboards. See [Role Based Access Control][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/query-translator
[2]: https://app.datadoghq.com/logs/batch-migration
[3]: /logs/explorer/search_syntax/
[4]: /ddsql_editor/
[5]: /logs/explorer/
[6]: /monitors/types/log/
[7]: /dashboards/
[8]: /standard-attributes/
[9]: /logs/log_configuration/processors/
[10]: /logs/log_configuration/indexes/
[11]: /account_management/rbac/permissions/
