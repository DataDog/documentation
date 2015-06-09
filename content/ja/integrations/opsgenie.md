---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-OpsGenie Integration
integration_title: OpsGenie
kind: integration
---
<style>
.class {
	padding-bottom: 5px;
}
</style>
<div id="int-overview">
<h2>Overview</h2>

Create alerts using @opsgenie:
<ul>
<li> From your event stream</li>
<li> By taking a snapshot</li>
<li> When a metric alert is triggered</li>
</ul>

</div>

<div id="int-configuration">

<h2>Configuration</h3>
<h3>Create a Datadog integration in OpsGenie</h3>
		<ol>
			<li class="step"> Log in to your OpsGenie account and go to the <a href="https://www.opsgenie.com/integration/index">OpsGenie Integrations</a> page.</li>
			<li class="step"> As seen below, filter for Datadog and click on the tile.</li>
			<img src="/static/images/opsgenie-int-index.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;">
			<li class="step"> Enter your Datadog API key from the <a href="https://app.datadoghq.com/account/settings#api">Integrations > APIs page</a> in the dedicated field. The key looks like this:
			</li>
			<img src="/static/images/where-is-dd-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;">
			<li class="step"> Choose the recipients in OpsGenie and set up your filters.</li>
			<li class="step"> Change the name of the integration if necessary.</li>
			<li class="step"> Save the configuration.</li>
			<li class="step"> Copy the red key and the name. You will use this in Datadog.</li>
			<img src="/static/images/opsgenie-add-api-key.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:10px;">
			<li class="step"> Add more DataDog integrations on OpsGenie by going to the <a href="https://www.opsgenie.com/integration/index">OpsGenie Integrations</a> page and repeating the steps above.</li>
		</ol>
<h4>List the integration(s) you made in OpsGenie in Datadog</h4>
		<ol>
			<li class="step">In Datadog, select the OpsGenie tile on <a href="https://app.datadoghq.com/account/settings">Account Integrations</a>.</li>
			<li class="step">In the dialog box that pops up, click on the Configuration tab.
			<li class="step">Paste the key(s) provided for each Datadog integration (created in OpsGenie) in the <b>"Datadog Integration Key"</b> field, and enter the <b>"Datadog Integration Name"</b>.</li>
			<img src="/static/images/datadog-add-opsgenie-key.png" style="width:100% border:1px #777777;padding-top:15px;">
		</ol>

</div>
<div>

<h2>How to Use Datadog and OpsGenie Together</h2>
<h3>Create, acknowledge and close  OpsGenie alerts from Datadog</h3>
	<p>Create an OpsGenie alert by putting @opsgenie-service_name or @opsgenie in the <b>Say What’s Happening</b> field, section 5, in the Edit Metric Alert. When this alert is triggered in Datadog, an alert will be sent to the recipients in your OpsGenie service.</p>
		<br/><img src="/static/images/og_metric_alert.png" style="width:100% border:1px #777777;padding-top:15px;padding-bottom:20px;"><br/>
	<p> Acknowledge or close OpsGenie alerts from Datadog using @opsgenie-acknowledge or @opsgenie-close mentions in the Comments field of an OpsGenie event in Datadog.</p>
		<br/><img src="/static/images/dd_ack_og_alert.png" style="width:100% border:1px #777777;padding-bottom:10px;"><br/>

<h3>Receive, acknowledge and close Datadog alerts created by OpsGenie</h3>
	<p> Set-up alerts in OpsGenie. When that alert is triggered, an event will be created in Datadog. The tags and description field from the OpsGenie alert will be carried over to Datadog. </p>
	<br/><img src="/static/images/og_create_alert_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;"><br/>

	<p>Acknowledge and close OpsGenie alerts from OpsGenie. When you do this, the associated event in Datadog will be updated with the username of the person who closed this alert.</p>
	<br/><img src="/static/images/og_closed_dd_updated.png" style="width:100% border:1px #777777;padding-bottom:10px;"><br/>

</div>
