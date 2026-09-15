If you are using a cloud CI provider without access to the underlying worker nodes, such as GitHub Actions or CircleCI, configure the library to use the Agentless mode. For this, set the following environment variables:

<div class="alert alert-warning">
<p>Set these variables before starting the test process. For parallel test runners, set them on the parent process so every worker inherits them.</p>
<p><code>DD_CIVISIBILITY_AGENTLESS_ENABLED=true</code> selects Agentless transport. <code>DD_API_KEY</code> provides authentication but does not enable Agentless mode.</p>
</div>

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required for Agentless mode)
: Enables Agentless mode to send test results directly to Datadog.<br/>
**Default**: `false`

`DD_API_KEY` (Required for Agentless mode)
: The Datadog API key used to authenticate test result uploads.<br/>
**Default**: `(empty)`

If you use a Datadog site other than US1, set the following variable:

`DD_SITE` (Optional for Agentless mode)
: The [Datadog site][102] to upload test results to. Set this configuration when using a site other than US1.<br/>
**Default**: `datadoghq.com`<br/>


[102]: /getting_started/site/
