---
"app_id": "splunk"
"app_uuid": "a3e6047c-501a-4a70-a465-19c0f117d1ac"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "70"
    "source_type_name": "Splunk"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "splunk"
"integration_id": "splunk"
"integration_title": "Splunk"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "splunk"
"public_title": "Splunk"
"short_description": "Capture events from Splunk and overlay them onto key metrics graphs."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": "Capture events from Splunk and overlay them onto key metrics graphs."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/integrate-splunk-datadog-put-microscope-application-monitoring/"
  "support": "README.md#Support"
  "title": "Splunk"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Connect your Splunk log monitoring to be able to:

- Get notified of your reports.
- Correlate these reports with your other metrics
- Collaborate with your team on those events

## Setup

### Installation

To receive your reports from Splunk into Datadog, you need to have the `datadog` python library installed on your splunk server:

```bash
pip install datadog
```

Once it is done, [get your api key and an application key][1] and drop the following `dog-splunk.sh` script into \$SPLUNK_HOME/bin/scripts

```bash

export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

Make sure the script is executable and owned by the `splunk` user and group.

Once the script is in place, create a new report or navigate to an existing report. Click the **Edit Schedule** and check the checkbox to **Schedule the Report**. When you get to the option to **Run a Script**, enter `dog-splunk.sh` in the Filename textbox. Click **Save** and you should see the results start appearing in your Event Stream.

## Troubleshooting

If you see an error code on each run of `runshellscript` in `splunkd.log`, try adding `> dog_splunk_trace.txt 2>&1` to the end of the last command. This creates a `$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt` file, which provides more detail about the problem.

If the trace file has something like the usage help for the `dog` command followed by `dog: error: unrecognized arguments: OR failed OR severe`, add single quotes around `\$SPLUNK_ARG_3` on the last line.

If the trace file includes a Traceback that ends with `pkg_resources.DistributionNotFound` or something similar, add three `unset`s to the top of your `dog-splunk.sh` script:

```bash
#!/bin/bash
unset PYTHONHOME
unset PYTHONPATH
unset LD_LIBRARY_PATH
export API_KEY=YOURAPIKEYHERE
export APP_KEY=YOURAPPKEYHERE

dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
" from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
 --aggregation_key $SPLUNK_ARG_3 --type splunk
```

## Further Reading

### Knowledge base

The script file uses variables made available by Splunk. If you would like to customize the message, see the following table of variables:

|                |                                                                             |
| :------------- | :-------------------------------------------------------------------------- |
| \$SPLUNK_ARG_0 | Script Name                                                                 |
| \$SPLUNK_ARG_1 | Number of events returned                                                   |
| \$SPLUNK_ARG_2 | Search terms                                                                |
| \$SPLUNK_ARG_3 | Fully qualified query string                                                |
| \$SPLUNK_ARG_4 | Name of saved search                                                        |
| \$SPLUNK_ARG_5 | Trigger reason (for example, "The number of events was greater than 1")     |
| \$SPLUNK_ARG_6 | Browser URL to view the saved search                                        |
| \$SPLUNK_ARG_7 | _option removed in version 3.6_                                             |
| \$SPLUNK_ARG_8 | File in which the results for this search are stored (contains raw results) |

You can modify the text of the events by for example using datadog's @mention to notify people of these reports.

---

## Further reading

- [Correlate metrics and logs with Datadog and Splunk][2]

_This documentation verified on October 28, 2015 using the [Splunk Enterprise AMI on AWS][3]_

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://www.datadoghq.com/blog/integrate-splunk-datadog-put-microscope-application-monitoring/
[3]: https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3

