---
title: Datadog Process Monitoring
kind: guide
listorder: 16
beta: true
---

### Introduction
 
The new Datadog Process Monitor allows for real time process-level visibility. After installing a small secondary agent, information from a host’s /proc file system will be streamed into Datadog and presented in a table at [https://app.datadoghq.com/process](https://app.datadoghq.com/process).  
 
The table can be searched and filtered and processes can be aggregated on tags associated with the hosts that they are running on.
 
Each row in the table can be expanded for more contextual information about an individual process.
 
Checking “show summary graphs” at the top of the page will graph metrics for all processes that are shown in the table. 

<img src="/static/images/process/live_process_preview.png" style="width:100%; border:1px solid #777777"/>

### One-step Installation
 
Supports: **Amazon Linux, CentOS, Debian, RHEL, Ubuntu**

    $ sudo DD_API_KEY=<your-api-key> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-process-agent-install/master/install_agent.sh)"

### Usage

To start the Agent:

    $ sudo /etc/init.d/dd-process-agent start
 
To stop the Agent: 
  
    $ sudo /etc/init.d/dd-process-agent stop
 
To check if the Agent is running:

    $ sudo /etc/init.d/dd-process-agent status

### Updating
  
**Amazon Linux, RHEL, CentOS**

    $ sudo yum makecache
    $ sudo yum update dd-process-agent
 
**Debian, Ubuntu**

    $ sudo apt-get update
    $ sudo apt-get upgrade dd-process-agent
 
### Removing

**Amazon Linux, RHEL, CentOS**

    $ sudo yum remove dd-process-agent
 
**Debian, Ubuntu**

    $ sudo apt-get remove dd-process-agent
 
### Notes/known issues
 
- `dd-agent` must be running when `dd-process-agent` is started for a host’s process information to appear in the “Live Processes” table.
 
- `dd-process-agent` must install as a privileged user. Not doing so will not correctly initialize /etc/dd-agent/dd-process-agent.ini. 
  
- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.
 
- To change the user that dd-process-agent runs under, change the argument passed to --user on line 36 in /etc/init.d/dd-process-agent and stop/start the agent.
 
- Container metadata is not currently available. This will be re-introduced in early releases.
 
- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.
