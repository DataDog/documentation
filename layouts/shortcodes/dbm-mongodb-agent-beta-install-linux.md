To install the beta version of the Datadog Agent on a Linux host, run the following command.

```shell
# Override the following environment variables
export DD_REPO_URL=datad0g.com
export DD_AGENT_DIST_CHANNEL=beta
export DD_AGENT_MAJOR_VERSION=7
export DD_AGENT_MINOR_VERSION="56.0~dbm~mongo~1.1"

DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
