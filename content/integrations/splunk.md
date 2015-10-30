---
title: Datadog-Splunk Integration
integration_title: Splunk

kind: integration
---


### Overview
{: int-overview}

Connect your Splunk log monitoring to be able to:

* Get notified of your reports. 
* Correlate these reports with your other metrics
* Collaborate with your team on thse events 


### Installation

To receive your reports from Splunk into Datadog, you need to have ```datadog``` installed:

    #!shell
    pip install datadog


Once it is done, [get your api key and an application key](https://app.datadoghq.com/account/settings#api) and drop the following ```dog-splunk.sh``` script into $SPLUNK_HOME/bin/scripts
    
    #!shell
    #!/bin/bash
    export API_KEY=YOURAPIKEYHERE
    export APP_KEY=YOURAPPKEYHERE
    dog --api-key $API_KEY --application-key $APP_KEY event post \
    "Found $SPLUNK_ARG_1 events in splunk" \
    "Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5," \
    " from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
     --aggregation_key $SPLUNK_ARG_3 --type splunk


Make sure the script is executable and owned by the ```splunk``` user and group. 

Once the script is in place, create a new report or navigate to an existing report. Click the **Edit Schedule** and check the checkbox to **Schedule the Report**. When you get to the option to **Run a Script**, enter ```dog-splunk.sh``` in the Filename textbox. Click **Save** and you should see the results start appearing in your Event Stream. 

### Troubleshooting

If you see an error code on each run of runshellscript in splunkd.log, try adding ``` > dog_splunk_trace.txt 2>&1``` to the end of the last command. This will create a ```$SPLUNK_HOME/etc/apps/search/bin/dog_splunk_trace.txt``` file. You will get more detail about the problem in this file.

If the trace file has something like the usage help for the ```dog``` command followed by ```dog: error: unrecognized arguments: OR failed OR severe```, you probably will need to add single quotes around $SPLUNK_ARG_3 on the last line. 

If the trace file include a Traceback that ends with ```pkg_resources.DistributionNotFound``` or something similar, add 3 unsets to the top of your dog-splunk.sh script to make it look like this:

    #!shell
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



### Customizing

The script file uses variables made available by Splunk. If you would like to customize the message, refer to the following table of variables:


| $SPLUNK_ARG_0 | Script Name |
| $SPLUNK_ARG_1 | Number of events returned |
| $SPLUNK_ARG_2 | Search terms |
| $SPLUNK_ARG_3 | Fully qualified query string |
| $SPLUNK_ARG_4 | Name of saved search |
| $SPLUNK_ARG_5 | Trigger reason (for example, "The number of events was greater than 1") |
| $SPLUNK_ARG_6 | Browser URL to view the saved search |
| $SPLUNK_ARG_7 | *option removed in version 3.6* |
| $SPLUNK_ARG_8 | File in which the results for this search are stored (contains raw results) |
{: .table}


You can modify the text of the events by for example using datadog's @mention to notify people of these reports.


------

*This documentation verified on October 28, 2015 using the [Splunk Enterprise AMI on AWS](https://aws.amazon.com/marketplace/pp/B00PUXWXNE/ref=sp_mpg_product_title?ie=UTF8&sr=0-3)*
