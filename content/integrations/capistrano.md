---
title: Datadog-Capistrano Integration
integration_title: Capistrano
kind: integration
doclevel: basic
newhlevel: true
---
# Overview

[Capistrano](http://capistranorb.com) is a remote server automation and deployment tool written in Ruby.

Install the Capistrano Datadog integration to:

  * Capture and search for deploy events in your event stream
  * Overlay deploy events with other metrics within dashboards to identify which deploys affect your application's performance

Once you enable this integration for a given `Capfile`, each Capistrano task that completes will be submitted as an event to Datadog. Role information and logging output are submitted, too.

# Installation

Install the `dogapi` Ruby gem:

        sudo gem install dogapi --version ">=1.10.0"

# Configuration

Add the following to the beginning of any `Capfile` whose tasks you want to send to Datadog:

        require "capistrano/datadog"
        set :datadog_api_key, "${your_api_key}"

# Validation

After you've configured your `Capfile` and have run at least one Capistrano task:

1. Navigate to your [events stream](https://app.datadoghq.com/event/stream).
2. Either enter `sources:capistrano` in the Search bar, or click 'Capistrano' in the FROM list of integrations on the left.
3. Either enter `priority:all` in the Search bar, or click 'All' in the PRIORITY list on the left. Capistrano tasks are submitted with Low priority by default, so if you're only viewing Normal priority events - which you will be, by default - you won't see your Capistrano tasks in the event stream.

{{< img src="capistranoevents.gif" >}}

