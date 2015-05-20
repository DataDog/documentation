---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Desk Integration
integration_title: Desk
kind: integration
---
<div id="int-overview">
<h2>Overview</h2>
<p>Connect Desk to Datadog to:</p>
<ul>
  <li>Receive new case events in the event stream</li>
  <li>Visualize case stats by user and status</li>
  <li>View trends in support tickets alongside DevOps issues</li>
</ul>

</div>

<div id="int-configuration">
<h2>Configuration</h2>

<p>From your Desk account, add an API application on the Settings -> API -> My Applications page (you made need administrator privileges.<br />
Fill out the form as shown, leaving the latter two URL fields blank. Desk should then generate a consumer key, consumer secret, access token, and access secret for your application.<br /><br/>
<img src="/static/images/desk_config.png" style="width:100%; border:1px solid #777777"/><br/><br/>

Then from your Datadog account, enter the corresponding information on the <a target="_blank" href="https://app.datadoghq.com/account/settings#integrations/desk">Desk tile</a>. You will also need to enter your company's unique Desk domain name.<br/>
Hit the install button, and then you're all set! You will soon be able to select desk.* metrics on a custom dashboard or view them on the provided <a target="_blank" href="https://app.datadoghq.com/screen/integration/desk">Desk dashboard</a>. (You can also read about this integration on <a target="_blank" href="https://www.datadoghq.com/2015/02/keep-support-team-page-salesforce-desk-integration/">our blog</a>.)</p>
</div>
