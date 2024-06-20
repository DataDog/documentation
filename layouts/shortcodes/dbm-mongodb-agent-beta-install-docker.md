To install the beta version of the containerized Datadog Agent, run the following command. Replace `<DD_API_KEY>` with your [Datadog API key][1].

```shell
# Override the following environment variables
export DD_API_KEY=<DD_API_KEY>
export DD_AGENT_VERSION=7.55.0-dbm-mongo-1.0

docker pull "datadog/agent:${DD_AGENT_VERSION}"
```

[1]: /account_management/api-app-keys/
