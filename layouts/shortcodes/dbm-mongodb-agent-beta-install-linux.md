To install the beta version of the Datadog Agent on a Linux host, run the following command. Replace `<DD_API_KEY>` with your [Datadog API key][1].

```shell
# Override the following environment variables
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MAJOR_VERSION=7
export DD_AGENT_MINOR_VERSION="55.0~dbm~mongo~0.1"

DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[1]: /account_management/api-app-keys/
