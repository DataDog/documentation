---
title: Getting Started with a Team Dashboard
kind: documentation
further_reading:
    - link: ''
      tag: 'Documentation'
      text: ''
---

## Why create a team dashboard

A team dashboard is one designed to help you and you teammates focus on the right work. It reminds you what's most important, what needs attention, and what you're succeeding at.

The first step in creating any dashboard is figuring out what you want it to show. That might sound obvious, but when you first start looking at Datadog dashboard options, you may get stuck either on a blank screen with nowhere to begin, or with an unending list of dashboards with infinite graphs and charts and numbers, none of which answer the questions you have.

So, talk amongst your team. Find out what people most frequently need to find out that today they have to dig for.

Second, for the infrastructure you monitor, check out the default dashboards that are provided with Datadog. Go to **Dashboards > Dashboards list** and search for the name of an integration you have added, for example, `Redis`, or a feature you use, for example `RUM`. Browse the search results for dashboards marked *Preset* and see if at least some of the graphs show the answers you're looking for.

## Good artists copy

When you find a graph or other dashboard widget that shows the answers you need for your team dashboard, put your mouse somewhere on it, and copy it by typing Command + C. Paste it into an existing dashboard by opening the dashboard (create a new one if you need) and typing Command + V. This creates an unlinked copy; changes to make to this widget on your own dashboard don't affect the source widget.

Got a cool RUM graph? Split it up by geo/region (or other tag?) side-by-side.

## Great artists steal

Datadog provides many default dashboards for features and integrations. See the links in the title drop-down to find more information about how people are using them. Also, people working in your organization have probably created some useful ones too. If you find one that suits your needs very well, just needs a few refinements, clone it. Edit the clone to add template variables or other filters. Delete graphs you don't use, copy in widgets you like from other graphs.

## Timeboards and Screenboards

Keep in mind the difference between timeboards and screenboards. ...

## What the metrics mean

See a metric available in the dashboard, look up the docs to see what it means, see related metrics, decide to use it.

## Using tags to refine

...

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

