---
title: Getting Started with Dashboards
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/enrol/index.php?id=8"
  tag: "Learning"
  text: "Self-paced online learning: Building Better Dashboards"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards basics"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Tell a story about data with Notebooks"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your graphs outside of Datadog"
---

## Overview

Even before you started using Datadog, you probably read about, heard talk of, or saw demos of Datadog dashboards. That's because dashboards are central to what Datadog does. For all the powerful metrics data and all the monitor alerts, what matters most is the conversations you have with your coworkers, your bosses, your service providers, or your customers about what those things mean and what actions to take as a result of knowing about them. Well-made dashboards can launch those conversations.

Key to getting started setting up effective dashboards is knowing what kinds of conversations you want to have. What questions do you ask yourself regularly? What does your management chain ask you about? What do your customers complain about that you want early knowledge of? When a problem happens, what series of questions helps you dive down and find the solution? 

If you’ve been tasked with creating a dashboard about a certain aspect of your infrastructure or applications, start by finding out what questions people have about it. Creating a good dashboard is about bringing the answers to these questions to the surface. Also important is not cramming all those conversations into the same dashboard. Create separate dashboards to show answers to different kinds of questions.

This guide describes three key types of dashboards that many Datadog users create: team dashboards, executive dashboards, and troubleshooting dashboards. These aren't formal types of dashboards; there's no "Create an Executive Dashboard" button anywhere in the Datadog app. But these three types reflect major use cases for dashboards, and each suggests a different approach to creating the dashboards themselves.

This guide gets you started on a path to making dashboards that can guide real conversations, not just fill screen space. These basic dashboards will help your team talk about things that really matter to you, show your managers the value you (and Datadog) bring to your organization, and get to the bottom of problems quickly.

After you've had some success creating basic dashboards, you can explore mixing and matching the approaches to meet your needs.

## Prerequisites

If you haven't already, create a [Datadog account][1]. Install an agent on a host, and an integration for something running on that host.

## Team dashboards

A team dashboard is one that helps you and you teammates focus on the right work. It reminds you what's high priority, what needs attention now, and what you're succeeding at.

The first step in creating any dashboard is figuring out what you want it to show. That might sound obvious, but when you first start looking at Datadog dashboard options, you may get stuck either on a blank screen with nowhere to begin, or with an unending list of dashboards with infinite graphs and charts and numbers, none of which on its own answers the specific questions you have.

So, talk amongst your team. Find out what people most frequently need to find out that today they have to dig for.

Second, for the infrastructure you monitor, check out the out-of-the-box dashboards that are provided with Datadog. Go to **Dashboards > Dashboards list** and search for the name of an integration you have added, for example `Redis`, or a feature you use, for example `RUM`. Browse the search results for dashboards marked *Preset* and see if at least some of the graphs show the answers you're looking for.

## Executive dashboards

Questions you might ask and answer:

 - Are you working on the most important things?
 - Are you progressing toward goals?
 - Are you meeting SLOs?
 - Are you scaling?
 - How much is X service costing us?

Enable drilling down.

## Troubleshooting dashboard

Questions you might ask and answer

 - What parts of our infrastructure need replacing?
 - Why does our app performance always suffer Wednesdays at 3ET? 
 - What action link can we build into the DB to repair that each week? (Runbook)
 - Why are so many users dropping off at X point?

Often starts as a scratch pad of things you know. Start from a monitoring result, create Db or add to existing Db

Add event overlays

Correlations

Use links to create an action for runbook-like solutions

## How to

Play with some different formats: tables, top lists, host map, service map

SLO and its SLIs; one SLO per dashboard, ability to drill down

Link from one db to another for a deeper dive, eg drill down into infra maps for different archs, geos

Why are my whole number metrics showing as decimals? 

## Good artists copy, great artists steal.

When you find a graph or other dashboard widget that shows the answers you need for your dashboard, put your mouse somewhere on it, and copy it by typing Command + C. Paste it into an existing dashboard by opening the dashboard (create a new one if you need) and typing Command + V. This creates an unlinked copy; changes to make to this widget on your own dashboard don't affect the source widget.

Got a cool RUM graph? Split it up by geo/region (or other tag?) side-by-side.

Datadog provides many out-of-the-box dashboards for features and integrations. See the links in an out-of-the-box dashboard's title drop-down to find more information about how people are using them. Also, people working in your organization have probably created some useful ones too. If you find one that suits your needs very well, just needs a few refinements, clone it. Edit the clone to add template variables or other filters. Delete graphs you don't use, copy in widgets you like from other graphs.

## Timeboards and Screenboards

Keep in mind the difference between timeboards and screenboards. ...

## What the metrics mean

See a metric available in the dashboard, look up the docs to see what it means, see related metrics, decide to use it.

## Using tags to refine

... (template variables)

## Think outside the timegraphed metrics

Time-based line and bar graphs are useful, but dashboards offer so much more. Try:

 - Numbers
 - Tables
 - Top lists

Also, you can graph things besides metrics. Try:

 - Log events overlay
 - Service Level Objectives and Indicators
 - correlation graphs
 - graph number of log errors, critical errors, purchases, website flow

Refining: choosing functions, aggregation: slicing and dicing across time and "space"

## Create multiple dashboards quickly

- copy and modify the json
- code them using the API

## How to

Group widgets together in a collapsible section

Use Slack integration to import db into slack channel

Daily rollup (use rollup function)

Log queries to dashboard

[1]: https://app.datadoghq.com/
