---
title: How do I set up the Agent to run as a system service on MacOS?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

On MacOS, the Datadog Agent is installed as a user service (for the user that runs the install instructions). This allows the Datadog Agent GUI application to work (while logged in to the MacOS GUI as the user that performed the install), but the main drawback is that the Agent only runs when the user that performed the install is logged in using the MacOS GUI.

Because of this, by default the Datadog Agent doesn't run in cases where no GUI access to the MacOS host is available. Additional steps are therefore required when installing & running the MacOS Datadog Agent with no GUI access.

## Install

1. Connect to the host and [follow the Agent installation instructions][1] to install the MacOS Datadog Agent.

2. As the user that ran the install, execute the following bash script:

```sh
#!/bin/bash

echo "Moving the Datadog Agent service for the $USER user to a system service"
# Move the per-user service definition installed by the Agent to a system service
sudo mv /Users/$USER/Library/LaunchAgents/com.datadoghq.agent.plist /Library/LaunchDaemons/com.datadoghq.agent.plist

echo "Setting the Datadog Agent service to run as the $USER user"
# By default, system services run as root.
# This plist file modification is needed to make the Agent not run as root, but as the current user.
sudo plutil -insert UserName -string "$USER" /Library/LaunchDaemons/com.datadoghq.agent.plist

echo "Setting permissions on the Datadog Agent service file"
# Put the correct permissions on the plist file.
# Otherwise launchctl will refuse running commands for this service.
sudo chown root:staff /Library/LaunchDaemons/com.datadoghq.agent.plist

echo "Enabling the Datadog Agent service"
# Enable the service: makes sure it runs on reboot
sudo launchctl enable system/com.datadoghq.agent

echo "Loading & launching the Datadog Agent service"
# Load the service: this starts the Agent
sudo launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist
```

This script reconfigures the Datadog Agent service to run as a launch daemon, with the following properties:
- the service is automatically started when the host starts
- the Agent processes run as the user that ran the above script (to avoid running as root)
- the Datadog Agent GUI application won't be available.


## Operations

To operate the Datadog Agent service once the following script is executed, run (as the `root` user, or with `sudo`):

- `launchctl list com.datadoghq.agent` to print the service status.

- `launchctl stop com.datadoghq.agent` to stop the Agent.

- `launchctl start com.datadoghq.agent` to start the Agent.

- `launchctl disable system/com.datadoghq.agent` to disable the Agent (ie. the above list / start / stop commands won’t work, and the service won’t be started when the host reboots). 

- `launchctl enable system/com.datadoghq.agent` then `launchctl load /Library/LaunchDaemons/com.datadoghq.agent.plist` to enable the Agent.

[1]: https://app.datadoghq.com/account/settings#agent