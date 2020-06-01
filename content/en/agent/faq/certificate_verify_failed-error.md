---
title: CERTIFICATE_VERIFY_FAILED error
kind: faq
---

### What happened?

On Saturday May 30th, 2020, at 10:48 UTC, an SSL root certificate used to cross-sign some of the Datadog certificates expired, and caused some of your agents to lose connectivity with Datadog endpoints. Because this root certificate is embedded in certain agents versions, you will need to take action to restore connectivity.

### What versions of the Agent are affected?

Agent versions spanning 3.6.x to 5.32.6 embed the expired certificate and are affected.

Agent versions 6.x and 7.x are fine and don’t need to be updated.

### How can I find a list of hosts running affected Agent versions?

We have published a [python script][1] that queries your Datadog account for hosts running impacted agent versions. It finds hosts that run Datadog Agent with version less than 5.32.7, and writes their hostnames to a file ordered by version.

1. Download the [python script][1].
2. Run it in your local terminal or shell. The script works with Python 2 and 3.
Datadog US: `python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us`  
Datadog EU: `python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu`  
3. Find the CSV output in `hosts_agents.csv`.

Get the API and APP key [here][4] (`.eu` for EU site).

### Fixing by upgrading to Agent 5.32.7

If you are currently running Agent 5.x, we recommend upgrading to Agent 5.32.7+. This ensures that the Agent continues to function in a variety of different scenarios, with the minimum amount of changes.

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`  
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`  
Windows (from versions > 5.12.0): Download the Datadog [Agent installer][7]. `start /wait msiexec /qn /i ddagent-cli-latest.msi`  
More platforms and configuration management options detailed [here][8].

### Fixing without upgrading the Agent

*Linux*

```shell
sudo rm /opt/datadog-agent/agent/datadog-cert.pem && sudo service datadog-agent restart
```

*Windows CLI*

Using PowerShell, take the following actions:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

Note that for Agent versions <= 5.10, when running on 64 bit windows, the steps will be:

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*Windows GUI*

Delete `datadog-cert.pem`. You can locate this in: `C:\Program Files\Datadog\Datadog Agent\files\`. 
(For Agent versions <= 5.10, the location is `C:\Program Files(x86)\Datadog\Datadog Agent\Files\`.)
Once removed, simply restart the Datadog Service from the Windows Service Manager.

*Verifying with the script*

You can re-run the script describe above with `--check-old-agents-working` to see if those agents have started reporting again and which still need attention:

```shell
python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site US_OR_EU --check-old-agents-working  
```

Please note that this can take a long time if you have many potentially affected hosts.

### Fixing by upgrading to Agent 6 or 7

You can upgrade to [Agent 7][2] or [Agent 6][3] to resolve this issue but *please see the Agent CHANGELOG for backward incompatible changes for Agent 6 and 7.*

### Should I upgrade my Agent even if I deleted the certificate?

We recommend keeping up to date and updating to the latest version of the Agent. Deployments set to auto-update will do so with 5.32.7.

### Am I still encrypting traffic with SSL even if I delete the certificate?

Yes. The certificate is just a preset for the client to use and is not necessary to connect via SSL. Datadog agent endpoints only accept SSL traffic.

[1]: https://static.datadoghq.com/find_agents_with_connectivity_problems.py
[2]: /agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[3]: /agent/versions/upgrade_to_agent_v6/?tab=linux
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.eu/account/settings#api
[6]: https://github.com/DataDog/dd-agent/releases/tag/5.32.7
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[8]: https://app.datadoghq.com/account/settings?agent_version=5#agent
