To install the beta version of the containerized Datadog Agent, run the following command.
Replace `<DD_API_KEY>` with your [Datadog API key][1] and `<DD_SITE>` with your [Datadog site][2].

```shell
# Override the following environment variables
export DD_API_KEY=<DD_API_KEY>
export DD_SITE=<DD_SITE>
export DD_AGENT_VERSION=7.56.0-dbm-mongo-1.3

docker pull "datadog/agent:${DD_AGENT_VERSION}"
```

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
