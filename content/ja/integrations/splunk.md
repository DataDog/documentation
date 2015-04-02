---
title: Datadog-Splunk Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---


<div id="int-overview">
<h3>Overview</h3>

Connect your Splunk log monitoring to be able to:
<ul>
<li> Get notified of your reports. </li>
<li> Correlate these reports with your other metrics</li>
<li> Collaborate with your team on thse events </li>
</ul>
</div>


<p>To receive your reports from Splunk into Datadog, you need to have <code>dogapi</code> installed</p>
<p><pre class="linux"><code>pip install dogapi</code></pre></p>

<p>Once it is done, <a href="https://app.datadoghq.com/account/settings#api">get your api key and an application key </a>and drop the following
 <code>dog-splunk.sh</code> script into $SPLUNK_HOME/bin/scripts</p>
<p>
    <pre class="linux"><code>#!/bin/bash
API_KEY= your_api_key
APP_KEY= your_application_key
dog --api-key $API_KEY --application-key $APP_KEY event post \
"Found $SPLUNK_ARG_1 events in splunk" \
"Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5, from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
--aggregation_key $SPLUNK_ARG_3 --type splunk</code></pre>
</p>

<p>You can modify the text of the events by for example using datadog's @mention to notify people of these reports.
<br/>Refer <a href="https://wiki.splunk.com/Community:Use_Splunk_alerts_with_scripts_to_create_a_ticket_in_your_ticketing_system">here</a>
to see the information available from Splunk.</p>
<p> You can now configure your splunk reports to exectue this script in order to get published into Datadog</p>
