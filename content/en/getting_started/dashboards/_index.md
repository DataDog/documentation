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

Consider the following three distinct types of dashboards that many Datadog users create: 

 - **Team dashboards** - A team dashboard is one that helps you and you teammates focus on the right work. It reminds you what's high priority, what needs attention now, and what you're succeeding at. Make a dashboard (or multiple) with the information that people most frequently need they have to dig for. SLO and SLI details make for an excellent team dashboard.

 - **Executive dashboards** - A dashboard connected to real-time data is a powerful tool for guiding conversations with managers and executives. A good executive dashboard can show that you are working on the most important things, how much a service you use is costing or helping, and whether you're progressing toward goals, meeting your SLOs, and scaling effectively. Executive dashboards are most effective when they answer these questions at the highest level and are interconnected to enable drilling down.

 - **Troubleshooting dashboards** -  Troubleshooting dashboards often start as a scratch pad of things you know, and gradually builds as you discover more. 

These aren't formal types of dashboards; there's no "Create an Executive Dashboard" button anywhere in the Datadog app. But these three types reflect major use cases for dashboards, and each suggests a different approach to creating the dashboards themselves.

This guide gets you started on a path to making dashboards that can guide real conversations, not just fill screen space. These basic dashboards will help your team talk about things that really matter to you, show your managers the value you (and Datadog) bring to your organization, and get to the bottom of problems quickly.

## Prerequisites

If you haven't already, create a [Datadog account][1]. Install an agent on a host, and an integration for something running on that host.

## Planning

The first step in creating any dashboard is figuring out what you want it to show. That might sound obvious, but when you first start looking at Datadog dashboard options, you may get stuck either on a blank screen with nowhere to begin, or with an unending list of dashboards with infinite graphs and charts and numbers, none of which on its own answers the specific questions you have.

Decide if your dashboard will be a timeboard (all graphs on the same time scale) or screenboard (wider variety of widgets, different time scales). 

For a troubleshooting dashboard, start with what you know: a graph or widget from another dashboard or view that shows a problem--you'll be drilling down from there to find your solution.

## Copy or steal

If you're browsing a dashboard and find a widget that shows the answers you need for your dashboard, put your mouse somewhere on it, and copy it by typing Command + C. Paste it into your dashboard by opening the dashboard and typing Command + V. This creates an unlinked copy; changes you make to this widget on your own dashboard don't affect the source widget.

Also, people working in your organization have probably created some useful graphs and dashboards too. If you find one that suits your needs very well, just needs a few refinements, clone it. Edit the clone to add template variables or other filters. Delete graphs you don't use, copy in widgets you like from other graphs, move things around to suit you.

Many Datadog views provide _Export to Dashboard_ options for data they show. For example, the Logs Explorer and Log Analytics views have share options to export logs lists and metrics to a Dashboard.

## Explore out-of-the-box dashboards

Datadog provides many out-of-the-box dashboards for features and integrations. For the infrastructure you monitor, check out the out-of-the-box dashboards that are provided with Datadog:

1. Go to **Dashboards > Dashboards list** and search for the name of an integration you have added, for example `Redis`, or a feature you use, for example `RUM`. 
2. Browse the search results for dashboards marked *Preset* and see if at least some of the graphs show the answers you're looking for.
3. Explore the links in the out-of-the-box dashboard's title drop-down to find more information about how people are using them.
4. Click **Clone** to create a copy of the out-of-the-box dashboard so that you can change and customize it.

## Figuring out what a metric means

See a metric available in the dashboard, look up the docs to see what it means, see related metrics, decide to use it.

## Refining

Refining: choosing functions, aggregation: slicing and dicing across time and "space."

Template variables.

Split up a graph by tag (geo, for example). Got a cool RUM graph? Split it up by geo/region (or other tag?) side-by-side.

Axes and colors.

Group widgets together in a collapsible section.

Rollups Why are my whole number metrics showing as decimals? Daily rollup (use rollup function).

## Try something not strictly metrics

Play with some different formats: tables, top lists, host map, service map

Time-based line and bar graphs are useful, but dashboards offer so much more. Try:

 - Numbers
 - Tables
 - Top lists
 - Log queries to dashboard
 - graph number of log errors, critical errors, purchases, website flow

## Troubleshooting dashboards tips

 - What parts of our infrastructure need replacing?
 - Why does our app performance always suffer Wednesdays at 3ET? 
 - What action link can we build into the DB to repair that each week? (Runbook)
 - Why are so many users dropping off at X point?

Often starts as a scratch pad of things you know. Start from a monitoring result, create Db or add to existing Db

Add event overlays

Correlations

Use links to create an action for runbook-like solutions

## How to SLI/Os

SLO and its SLIs; one SLO per dashboard, ability to drill down

## Link and drill down

Link from one db to another for a deeper dive, eg drill down into infra maps for different archs, geos

## Create multiple dashboards quickly

- copy and modify the json
- code them using the API

## Integrate with your team communications

Use Slack integration to import db into slack channel

[1]: https://app.datadoghq.com/
