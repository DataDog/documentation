---
title: Datadog-TeamCity Integration
integration_title: TeamCity
kind: integration
newhlevel: true
git_integration_title: teamcity
---

## Overview

Connect TeamCity to Datadog to create events for each build in order to:

* Monitor the status of your builds and deployments
* Collect stats and bind tags to every step of your builds.

## Installation

## Configuration

1. Configure the Agent to connect to TeamCity

        init_config:

        # Add your different projects in here to monitor their build
        # success with Datadog events
        instances:
            # A custom unique name per build configuration that will show
            # in the events
          - name: My Website

            # Specify the server name of your teamcity instance here
            # Guest authentication must be on if you want the check to be able to get data
            # When using the optional basic_http_authentication use
            # server: user:password@teamcity.mycompany.com
            server: teamcity.mycompany.com

            # This is the internal build ID of the build configuration you wish to track.
            # You can find it labelled as "Build configuration ID" when editing the configuration in question.
            build_configuration: MyWebsite_Deploy

            # Optional, this turns on basic http authentication. Defaults to False.
            # basic_http_authentication: true

            # Optional, if you wish to override the host that is affected by this build configuration.
            # Defaults to the host that the agent is running on.
            # host_affected: msicalweb6

            # Optional, this changes the event message slightly to specify that TeamCity was used to deploy something
            # rather than just that a successful build happened
            # is_deployment: true

            # Optional, this turns off ssl certificate validation. Defaults to True.
            # ssl_validation: false

            # Optional, any additional tags you'd like to add to the event
            # tags:
            #   - test


2. Restart the Agent

{{< insert-example-links >}}

## Validation

Execute the `datadog info` command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      teamcity
      --------
          - instance #0 [OK]
          - Collected 0 metrics & 1 events

## Metrics

This integration only create events. It will not return any metrics.
