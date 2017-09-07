---
title: Datadog-Postfix Integration
integration_title: Postfix
kind: integration
doclevel: basic
git_integration_title: postfix
newhlevel: true
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/postfix/postfixgraph.png" alt="Postfix Graph" >}}

## Overview

Get metrics from Postfix in real time to monitor the messages pending in your Postfix mail queues.

{{< insert-example-links >}}

## Setup
### Configuration

1.  Make sure that the user that dd-agent runs has sudo access for the 'find' command.
2.  Configure the Agent to connect to Postfix. Edit `conf.d/postfix.yaml`:
{{< highlight yaml>}}
        # The user running dd-agent must have passwordless sudo access for the find
        # command to run the postfix check.  Here's an example:
        #
        # example /etc/sudoers entry:
        #  dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/incoming -type f
        #  dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/active -type f
        #  dd-agent ALL=(postfix) NOPASSWD:/usr/bin/find /var/spool/postfix/deferred -type f
        #
        # Redhat/CentOS/Amazon Linux flavours will need to add:
        #          Defaults:dd-agent !requiretty

        init_config:

        instances:
          - directory: /var/spool/postfix
            queues:
              - incoming
              - active
              - deferred
            tags:
              - optional_tag1
              - optional_tag2
          - directory: /var/spool/postfix-2
            queues:
              - incoming
              - active
              - deferred
            tags:
              - optional_tag3
              - optional_tag4
{{< /highlight >}}

3.  Restart the Agent

### Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  postfix
  -------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git >}}
