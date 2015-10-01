---
title: Guide to Tagging
kind: guide
listorder: 12
sidebar:
  nav:
    - header: Guide to Agent Checks
    - text: Overview
      href: "#overview"
    - text: Setup
      href: "#setup"
    - text: Agent Check Interface
      href: "#interface"
    - text: Configuration
      href: "#config"
    - text: Directory Structure
      href: "#directory"
    - text: Your First Check
      href: "#first"
    - text: An HTTP Check
      href: "#http"
---

## Overview
Tagging is used throughout the Datadog product to make it easier to subset and query the machines and metrics that you have to monitor. Without the ability to assign and filter based on tags, finding the problems that exist in your environment and narrowing them down enough to discover the true causes would be extremely difficult.

## How to assign tags
There are three primary ways to assign tags: in the configuration, in the UI, and using the API, though the UI and API only allow you to assign tags at the host level. The recommended method is via the configuration files.

### Assigning tags using the configuration files
The Datadog integrations are all configured via the yaml configuration files located in your agent directories. For more about where to look for your configuration files, refer [to this article][agentinstall]. You can define tags in the configuration file for the overall agent as well as for each integration. In all cases, there is a tag dictionary with a list of tags you want assigned at that level. Any tag you assign to the agent will apply to every integration on that agent's host.

Dictionaries with lists of values have two different yet functionally equivalent forms:

    tags: firsttag, secondtag, thirdtag

or

    tags:
      - firsttag
      - secondtag
      - thirdtag

You will see both forms in the configuration files.

Each tag can be anything you like but you will have the best success with tagging if your tags are key:value pairs. Keys could represent the role, or function, or region, or application and the value is the instance of that role, function, region, or application. Here are some examples of good tags:

    region:east
    region:nw
    application:database
    database:primary
    role:sobotka

The reason why you should use key value pairs instead of simply values will become apparent when you start using the tags to filter and group metrics and machines. That said, you are not required to use key value pairs and simple values are valid.

### Assigning host tags in the UI
You can also assign tags to hosts, but not to integrations in the UI. To assign tags in the UI, start by going to the Infrastructure List page. Click on any host and then click the Update Host Tags button. In the host overlay that appears, click Edit Tags and make the changes you wish.

### Assigning host tags using the API
You can also assign tags to hosts, but not to integrations using the API. The endpoints you want to work with are /tags/hosts and depending on whether you PUT, POST, or DELETE you will update, add, or delete tags for the chosen host. For more details on using the Tags endpoints in the API, [review this document][tagsapi]

## How to use tags
After you have assigned tags at the host and integration level, you can start using them to filter and group in interesting ways. There are several places you can use tags:

- Events List
- Dashboards
- Infrastructure List
- Host Map
- Monitors

### Using tags in the Events List
The Events List will show you all the events that have occured in your environment over the time period specified. This can be overwhelming so you can use tags to filter down the list based on the tags you have assigned. You can enter any text you want in the search box above the Event List and a full text search will be performed. You can also enter ```tags:``` followed by a tag to see all the events that come from a host or integration with that tag. The example in the image is the tag role:sobotka. So the search text is ```tags:role:sobotka```.

![Events List and Tags](/static/images/eventtags.png)

### Using tags in Dashboards
You can use tags to narrow down the metrics to display on a dashboard grapm, or to create groups of metrics to display. To narrow down the metrics to display, enter the tag in the over: textbox. You will now be looking at a chosen metric over all the hosts that have that particular tag assigned. To group using tags, enter the key part of the tag in the group: textbox. For instance, if you have a timeseries graph and you have assigned the tags ```role:database```, ```role:frontend```, and ```role:loadbalancer```, you will get one line in your timeseries graph representing all the machines with the database, another of machines wth the frontend, and third of machines with the loadbalancer.

![Tags in Dashboards](/static/images/dashboardtags.png)

You can also use tags to overlay events on the dashboard. This works in exactly the same way as in the Events List. Simply enter ```tags:``` followed by the tag and you will see the corresponding events overlaid as vertical bars on each graph.

### Using tags in the Infrastructure List and the Host Map

To filter the list of hosts in the Infrastructure list, enter a tag in the filter textbox at the top of the page. You can also group the hosts by entering the key portion of the tag in the group by textbox. So if you enter role in the group box, you will see each role as a group heading followed by the hosts with that tag.

![Tags in the Infrastructure List](/static/images/infrastructuretags.png)

### Using tags in Monitors

When defining a monitor, you can use tags to allow the monitor to apply to any subset of hosts across your environment.

![Tags in Monitors](/static/images/monitortags.png)

[tagsapi]: /api#tags
[agentinstall]: https://app.datadoghq.com/account/settings#agent
