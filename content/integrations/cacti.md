---
title: Datadog-Cacti Integration
integration_title: Cacti
kind: integration
doclevel: basic
git_integration_title: cacti
---
## Overview

Connect Cacti to Datadog to:

* Visualize Cacti metrics in Datadog.
* Correlate metrics captured by Cacti with the rest of your applications.

## Installation

The Cacti check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Cacti servers.

## Configuration

To capture Cacti metrics you need to install the Datadog Agent.

1. Create a datadog user with read-only rights to the Cacti database
{{< highlight sql >}}
sudo mysql -e "create user 'datadog'@'localhost' identified by '<password>';"
sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
{{< /highlight >}}

2. Check user and rights
{{< highlight sql >}}
mysql -u datadog --password=<password> -e "show status" | grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || echo -e "\033[0;31mCannot connect to MySQL\033[0m"

mysql -u datadog --password=<password> -D cacti -e "select * from data_template_data limit 1" && echo -e "\033[0;32mMySQL grant - OK\033[0m" || echo -e "\033[0;31mMissing SELECT grant\033[0m"
{{< /highlight >}}

3. Configure the Agent to connect to MySQL, edit `conf.d/cacti.yaml`
{{< highlight yaml>}}
init_config:

instances:
    -   mysql_host: localhost
        mysql_user: datadog
        mysql_password: 
    Generate Password

        rrd_path: /path/to/cacti/rra
        #field_names:
        #    - ifName
        #    - dskDevice
        #    - ifIndex
        #rrd_whitelist: /path/to/rrd_whitelist.txt
{{< /highlight >}}

3. Give the dd-agent user access to the RRD files
{{< highlight shell >}}
sudo gpasswd -a dd-agent www-data
sudo chmod -R g+rx /var/lib/cacti/rra/
sudo su - dd-agent -c 'if [ -r /var/lib/cacti/rra/ ];
then echo -e "\033[0;31mdd-agent can read the RRD files\033[0m";
else echo -e "\033[0;31mdd-agent can not read the RRD files\033[0m";
fi'
{{< /highlight >}}

Find more information about this integration [here](https://app.datadoghq.com/account/settings#integrations/cacti):

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

{{< highlight shell >}}
Checks
======

  [...]

  cacti
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}
