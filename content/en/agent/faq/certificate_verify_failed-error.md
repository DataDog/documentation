---
title: CERTIFICATE_VERIFY_FAILED error
kind: faq
---

### What happened?

On Saturday May 30th, 2020, at 10:48 UTC, an SSL root certificate used to cross-sign some of the Datadog certificates expired, and caused some of your Agents to lose connectivity with Datadog endpoints. Because this root certificate is embedded in certain Agent versions, you will need to take action to restore connectivity.

### What versions of the Agent are affected?

Agent versions spanning 3.6.x to 5.32.6 embed the expired certificate and are affected.

Agent versions 6.x and 7.x are fine and don’t need to be updated.

### How can I find a list of hosts running affected Agent versions?

Datadog has published a [Python script][1] that queries your Datadog account for hosts running impacted Agent versions. It finds hosts that run the Datadog Agent with version less than 5.32.7, and writes their hostnames to a file ordered by version.

1. Download the [Python script][1].
2. Run it in your local terminal or shell. The script works with Python 2 and 3.
Datadog US: `python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site us`
Datadog EU: `python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site eu`
3. Find the CSV output in `hosts_agents.csv`.

Get the API and application key [from your account settings page][2]. If you are using the EU site, see your [EU account settings page][3].

### Fixing by upgrading to Agent 5.32.7

If you are currently running Agent 5.x on a 64-bit host, Datadog recommends upgrading to Agent 5.32.7+. This ensures that the Agent continues to function in a variety of different scenarios, with the minimum amount of changes.

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`
Windows (from versions > 5.12.0): Download the Datadog [Agent installer][4]. `start /wait msiexec /qn /i ddagent-cli-latest.msi`
More platforms and configuration management options detailed [here][5].

The last compatible Agent released for 32-bit systems was 5.10.1. Follow the `Fixing without upgrading the Agent` instructions for 32-bit hosts.

### Fixing without upgrading the Agent

#### Linux

```shell
sudo rm /opt/datadog-agent/agent/datadog-cert.pem && sudo service datadog-agent restart
```

#### Windows

*Using the CLI*

Using PowerShell, take the following actions for Agent `>= 5.12.0`:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

Note that for Agent versions `<= 5.11`, the location will be different.
For users on the 32-bit Agent `<= 5.11` on 64-bit Windows the steps are:

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

For all other users on Agent `<= 5.11` the steps are:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

If your Agent is configured to use a proxy, see the additional step in the [dedicated section below](#additional-step-if-the-windows-agent-5-x-is-configured-to-use-a-proxy-or-the-curl-http-client).

*Using the Windows GUI*

Delete `datadog-cert.pem`. You can locate this file in:

* Agent >=5.12.x:
  * 64-bit Windows: `C:\Program Files\Datadog\Datadog Agent\agent\`
  * 32-bit Windows: The Datadog Agent was not available for 32-bit Windows systems starting in Agent 5.12
* Agent <= 5.11.x:
  * 64-bit Windows: `C:\Program Files (x86)\Datadog\Datadog Agent\files\`
  * 32-bit Windows: `C:\Program Files\Datadog\Datadog Agent\files\`

Once the file is removed, restart the Datadog Service from the Windows Service Manager.

If your Agent is configured to use a proxy, see the additional step in the [dedicated section below](#additional-step-if-the-windows-agent-5-x-is-configured-to-use-a-proxy-or-the-curl-http-client).

#### Verifying with the script

You can re-run the script described above with `--check-old-agents-working` to see if those Agents have started reporting again and which still need attention:

```shell
python find_agents_with_connectivity_problems.py --api-key API_KEY --application-key APPLICATION_KEY --site US_OR_EU --check-old-agents-working
```

Note that this can take a long time if you have many potentially affected hosts.

### Fixing by upgrading to Agent 6 or 7

You can upgrade to [Agent 7][6] or [Agent 6][7] to resolve this issue, but *see the Agent CHANGELOG for backward incompatible changes for Agent 6 and 7.*

### Should I upgrade my Agent even if I deleted the certificate?

Datadog recommends keeping up to date and updating to the latest version of the Agent. Deployments set to auto-update will do so with 5.32.7.

### Am I still encrypting traffic with SSL even if I delete the certificate?

Yes. The certificate is just a preset for the client to use and is not necessary to connect via SSL. Datadog Agent endpoints only accept SSL traffic.

### Additional step if the Windows Agent 5.x is configured to use a proxy or the curl http client

On Windows, with Agent 5.x, removing the certificate file alone is not enough if the Agent is configured to either:

* use a proxy with the `proxy_host` configuration option in `datadog.conf` or the `HTTPS_PROXY` environment variable, or
* use the curl http client with the `use_curl_http_client: yes` configuration option in `datadog.conf`

Note: `datadog.conf` is located in `C:\ProgramData\Datadog\datadog.conf`.

In this case, take this additional action:

* Windows Agent v5, >= 5.12.x: replace the datadog-cert.pem file with the version that is shipped in 5.32.7. Using the Powershell CLI:

```shell
Invoke-WebRequest -Uri f"https://raw.githubusercontent.com/DataDog/dd-agent/5.32.7/datadog-cert.pem" -OutFile "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

* Windows Agent v5, <= 5.11.x: set the following option in `datadog.conf`:
  * 64-bit Windows: `ca_certs: C:\Program Files (x86)\Datadog\Datadog Agent\files\ca-certificates.crt`
  * 32-bit Windows: `ca_certs: C:\Program Files\Datadog\Datadog Agent\files\ca-certificates.crt`


[1]: https://static.datadoghq.com/find_agents_with_connectivity_problems.py
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.eu/account/settings#api
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://app.datadoghq.com/account/settings?agent_version=5#agent
[6]: /agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[7]: /agent/versions/upgrade_to_agent_v6/?tab=linux
