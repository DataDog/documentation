---
last_modified: 2015/06/09
translation_status: original
language: ja
title: Datadog-Capistrano Integration
integration_title: Capistrano
kind: integration
doclevel: complete
---

### Overview
{:#int-overview}

Install the Capistrano Datadog integration to:

- Capture and search for deploy events in your event stream
- Correlate deploy events withe metric changes on dashboards

### Configuration
{:#int-configuration}

Installing the Capistrano integration for a particular Capfile will capture each Capistrano task that that Capfile runs, including the roles that the task applies to and any logging output that it emits and submits them as events to Datadog at the end of the execution of all the tasks.

- Install the `dogapi` Ruby gem (version &gt;= 1.10.0):

        sudo gem install dogapi --version "&gt;=1.10.0"

- Add this to the beginning of your `Capfile`:

        require "capistrano/datadog" set :datadog_api_key, "${api_key}"
