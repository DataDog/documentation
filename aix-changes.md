# Changes

## create legacy page for Unix Agent on old AIX versions


## https://docs.datadoghq.com/agent/supported_platforms

- Add section for AIX
- Distinction between Agent 7 (supported on 7.2 TL5+ and onward) and Agent 6 and 5 (refer to Unix Agent for them, link to a legacy page)

## https://docs.datadoghq.com/agent/supported_platforms/aix/

- `ibm_was` is only supported on the Unix Agent (not JMX Fetch yet for Agent 7)
- replace unix agent mentions and update uninstall commands
- check if log file names are the same like `dd-aix-install.log` and `dd-aix-uninstall.log` (probably not)
- update the screenshot of feet automation page

## hugo/content/en/agent/faq/log4j_mitigation.md

- Mention unix agent for AIX sections
- mention only for old versions of AIX

## https://docs.datadoghq.com/agent/configuration/agent-configuration-files/

- change example config to `datadog-agent_aix.yaml.example`

## hugo/content/en/agent/configuration/agent-commands.md

- Add restart command for AIX

## hugo/content/en/agent/guide/install-agent-6.md

- Add ref to the Agent 7 page just in case

## hugo/content/en/agent/guide/install-agent-5.md

- Add ref to the Agent 7 page just in case
