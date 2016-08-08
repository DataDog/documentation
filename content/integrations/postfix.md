---
title: Datadog-Postfix Integration
integration_title: Postfix
kind: integration
doclevel: basic
git_integration_title: postfix
newhlevel: true
---
# Overview

![Postfix Graph](/static/images/postfixgraph.png)

Get metrics from Postfix in real time to monitor the messages pending in your Postfix mail queues.

<%= insert_example_links%>

# Configuration

1.  Make sure that the user that dd-agent runs has sudo access for the 'find' command.
1.  Configure the Agent to connect to Postfix. Edit conf.d/postfix.yaml:

        # The user running dd-agent must have passwordless sudo access for the find
        # command to run the postfix check.  Here's an example:
        #
        # example /etc/sudoers entry:
        #          dd-agent ALL=(ALL) NOPASSWD:/usr/bin/find

        # The user running dd-agent must have passwordless sudo access for the find
        # command to run the postfix check.  Here's an example:
        #
        # example /etc/sudoers entry:
        #          dd-agent ALL=(ALL) NOPASSWD:/usr/bin/find
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

1.  Restart the Agent

# Validation

1.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          postfix
          -------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

# Metrics

<%= get_metrics_from_git() %>
