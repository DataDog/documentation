---
title: Develop A Marketplace Offering
type: documentation
description: Learn how to develop and publish an offering on the Datadog Marketplace.
further_reading:
- link: "https://www.datadoghq.com/partner/"
  tag: "Partner Network"
  text: "Datadog Partner Network"
- link: "https://www.datadoghq.com/blog/datadog-marketplace/"
  tag: "Blog"
  text: "Expand your monitoring reach with the Datadog Marketplace"
- link: "/developers/marketplace/"
  tag: "Documentation"
  text: "Learn about the Datadog Marketplace"
---

## Overview

This page walks you through how to develop an offering on the Datadog Marketplace. If you have any questions, reach out to <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>.

## Development process

1. [Choose a type of offering to list](#select-an-offering).
2. Build an [Agent-based integration](#build-an-agent-based-integration), a [REST API-based integration](#build-a-rest-api-integration), a [Datadog App](#build-a-datadog-app), an [informational tile-only listing](#build-an-informational-tile-only-listing), or a [bi-directional data integration](#build-a-bi-directional-data-integration).
3. [Access the Marketplace repository and set up a directory](#set-up-a-directory-and-clone-the-marketplace-repository).
4. [Install and run the Datadog Development Toolkit command](#install-and-run-the-datadog-development-toolkit).
5. Create an [information tile-only listing](#create-an-informational-tile-only-listing) or a [full data integration](#create-a-full-data-integration).
6. [Populate the integration tile scaffolding](#populate-the-tile-scaffolding). 
7. [Open a pull request](#open-a-pull-request).
8. [Review feedback and request approval to merge the pull request and release the integration tile](#obtain-approval-to-merge). 
9. [Coordinate go-to-market opportunities with Partner Marketing](#coordinate-gtm-opportunities).

### Select an offering

A standard Marketplace integration tile appears with the following format:

{{< img src="developers/marketplace/marketplace-tile-example.png" alt="Example Marketplace tile" style="width:30%" >}}

Choose from the following offering types to create an integration tile that represents your listing on the [Datadog Marketplace][1]:

- A [Datadog Agent-based integration](#build-an-agent-based-integration)
- A [REST API integration](#build-a-rest-api-integration)
- A [Datadog App](#build-a-datadog-app)
- [SaaS license or subscription](#build-an-informational-tile-only-listing)
- [Professional services](#build-a-bi-directional-data-integration)

### Build an Agent-based integration

{{< tabs >}}
{{% tab "Datadog Agent-Based Integration" %}}

An [OpenMetrics check][1] is suitable for gathering telemetry data from existing applications that expose metrics using the Open Metrics standard.


[1]: https://docs.datadoghq.com/developers/custom_checks/prometheus/
{{% /tab %}}
{{% tab "Python Check" %}}

A [Python check][1] is suitable for monitoring services or products that do not expose metrics in a standard format. The Python check is used to collect telemetry data from various APIs or command line tools.


[1]: https://docs.datadoghq.com/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
{{% /tab %}}
{{% tab "DogStatsD" %}}

[DogStatsD][1] is suitable for applications that already emit telemetry using the StatsD protocol. 

Datadog adds additional Datadog-specific extensions to the StatsD protocol, including the following:

- Histogram Metric Type
- Service Checks
- Events
- Tagging


[1]: https://docs.datadoghq.com/developers/dogstatsd/
{{% /tab %}}
{{< /tabs >}}

For more information about Datadog Agent-based integrations, see [Introduction to Agent-based Integrations][3].

### Build a REST API integration

Use an [API integration][4] to enrich and submit data from your backend, or pull data directly out of Datadog. API integrations work well in building a connector between Datadog and another SaaS platform.
 
Since API integrations do not use the Datadog Agent to collect data, you need to create an [informational tile-only listing](#) once your development work is complete.
 
A Datadog API key is required to submit data to a Datadog API endpoint, and an application key is required to query data from Datadog or create resources on the Datadog site. Optionally, you can setup [OAuth for a data integration][5] in a Marketplace tile instead.

### Build a Datadog App

[Datadog Apps][6] are custom dashboard widgets that are developed in the [Datadog Developer Platform][7]. Once your Datadog App is ready to publish, you need to create an informational tile-only listing on the **Integrations** or **Marketplace** page.

### Build an informational tile-only listing

If you are developing an offering that does not use the Datadog Agent (such as a Datadog App, SaaS license, professional service, or an API-based integration) to collect data, you only need to create an informational tile listing. These tile-only listings require Datadog users to install and configure the integration outside of Datadog.

The Datadog Development Toolkit offers a command option to create tile-only scaffolding: `ddev create -t tile "<Offering Name>"`. When using this command, you only receive the files related to your tile, instead of all the files used to build a full Agent-based data integration.

### Build a bi-directional data integration

All Datadog integrations must be bi-directional, meaning that integrations can pull data from and push data into Datadog, except for informational tile-only listings on the Datadog Marketplace, such as a standalone SaaS license or a professional service offering. 

Integrations send the following types of data to Datadog:

- [Metrics][8]
- [Logs][9]
- [Events][10]
- [Service Checks][11]
- [Traces][12]
- [Incidents][13]
- [Security Events][14]

For more information about requesting accessing to the Marketplace repository, see the [Marketplace documentation][15].

### Set up a directory and clone the Marketplace repository

The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps. 

Once you have been granted access to the [Marketplace repository][16], create the `dd` directory and clone the `marketplace` repo by using `git clone git@github.com:DataDog/marketplace.git`. 

### Install and run the Datadog development toolkit

The Datadog Development Toolkit command (`ddev`) allows you to create scaffolding when you are developing a data integration by generating a skeleton of your integration tile's assets and metadata.

First, ensure that [Python v3.8 and later][17] is installed. To avoid potential environment conflicts, create a virtual environment in the directory where you cloned the Marketplace repository by running `python3 -m pip install virtualenv --user`.

Then, name and activate the virtual environment with these commands:

```python
virtualenv [name of env]
source [name of env]/bin/activate
```

To install the latest released version of the Datadog Development Toolkit from [PyPI][18], run `python -m pip install --upgrade "datadog-checks-dev[cli]"`.

If you are using the Z Shell, you may need to use escaped characters by running `python -m pip install --upgrade datadog-checks-dev\[cli\]`.

To set the location of the cloned repository directory: 

```python
ddev config set marketplace [/path/to/marketplace_directory]
ddev config set repo marketplace
```

### Create an informational tile only listing

For standalone SaaS licenses, Datadog Apps, professional services, and Datadog REST API-based integrations, the Datadog Development Toolkit creates the scaffolding for an informational tile-only listing. To create the informational tile-only listing's scaffolding, run `ddev create -t tile -v2 "<Offering Name>"` in the `marketplace` directory specified above.

### Create a full data integration

To generate a complete data integration's scaffolding, run `ddev create -v2 "<Offering Name>"` from the `marketplace` directory specified above.

### Populate the tile scaffolding

The `ddev` command generates a skeleton of the following folders and files belonging to your integration tile's assets.

{{% integration-assets %}}

#### README

After creating a `README.md` file, follow these instructions to complete your listing:

1. Write a description under an `## Overview` header that describes the value your offering provides to users and benefits to purchasing and installing the integration in the Datadog Marketplace (for example, out-of-the-box dashboards for more comprehensive observability, replays of user sessions, logs, alerts, and more). This information is displayed in the **Overview** tab on the integration tile.
2. Include all the steps to setting up your Marketplace integration under a `##Setup` header that includes information divided into H3 headings (`###`) about installing the integration using the in-app integration tile, configuring the integration with the appropriate roles and permissions in your Datadog organization, out-of-the-box Datadog features that users who purchased and installed the integration can access (such as metrics, events, monitors, logs, dashboards, and more), and uninstalling the integration.
3. Specify the types of data collected by your Marketplace integration under a `##Data Collected` header that includes information divided into H3 headings (`###`) about out-of-the-box metrics, events, and service checks. You can optionally include additional types of data collected such as logs, monitors, and dashboards. If your Marketplace integration does not provide these, use the following text in that particular section: `The [Datadog Marketplace] integration does not include any [events or service checks]`.
4. At the end of the README, provide some contact information under a `###Support` header that includes an email to contact Support, a phone number to your company, or a link to your company's documentation or blog post.

#### Media Carousel

A media carousel of images and a video is included in your integration tile. 

Technology Partners can add a video to an integration tile. Do not upload the video in your pull request. Instead, send a copy or a download link of your video to <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>. The Marketplace team replies with a `vimeo_link` which you can add in the `manifest.json` file to include the video in the media carousel.

The video must meet the following requirements:

| Video Requirements | Description                                                                           |
|--------------------|---------------------------------------------------------------------------------------|
| Type               | MP4 H.264                                                                             |
| Size               | The maximum video size is 1GB.                                                        |
| Dimensions         | The aspect ratio must be 16:9 exactly and the resolution must be 1920x1080 or higher. |
| Name               | The video file name must be `partnerName-appName.mp4`.                                |
| Video Length       | The maximum video length is 60 seconds.                                               |
| Description        | The maximum number of characters allowed is 300.                                      |

Technology Partners can add up to eight images (seven if you are including a video) in an integration tile's media carousel. When naming image files, do not use spaces. Instead, use underscores (`_`). 

The images must meet the following requirements:

| Image Requirements | Description                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Type               | `.jpg` or `.png`.                                                                                                                                 |
| Size               | The average is around 500KB. The maximum image size is 1MB.                                                                                       |
| Dimensions         | The aspect ratio must be 16:9 exactly and fit these specifications:<br><br>- Width: 1440px<br>- Minimum height: 810px<br>- Maximum height: 2560px |
| Name               | Use letters, numbers, underscores, and hyphens. Spaces are not allowed.                                                                           |
| Color Mode         | RGB                                                                                                                                               |
| Color Profile      | sRGB                                                                                                                                              |
| Description        | The maximum number of characters allowed is 300.                                                                                                  |

Follow this template to define the `media` object in the media carousel which includes an image, a video thumbnail, and a video:

{{< code-block lang="json" filename="manifest.json" collapsible="true" >}}
"media": [
      {
        "media_type": "image",
        "caption": "A Datadog Marketplace Integration OOTB Dashboard",
        "image_url": "images/integration_name_image_name.png"
      },
      {
        "media_type": "video",
        "caption": "A Datadog Marketplace Integration Overview Video",
        "image_url": "images/integration_name_video_thumbnail.png",
        "vimeo_id": 123456789
      },
    ],
{{< /code-block >}}

For more information, see [Integrations Assets Reference][19].

### Open a pull request

Open a pull request that contains your integration tile's asset files (including images) in the [`marketplace` repository][16]. Automatic tests run checks in Azure DevOps pipelines to verify that your pull request is in good shape and contains all the required content to be updated.

To request access to the Azure DevOps pipeline, leave a comment in the pull request requesting access.

### Obtain approval to merge

Once your pull request passes all the checks, reviewers from the `Datadog/agent-integrations`, `Datadog/marketplace-review`, and `Datadog/documentation` teams provide suggestions and feedback on best practices. 

Once you have addressed the feedback and re-requested reviews, these reviewers approve your pull request. Contact the Marketplace team if you would like to preview the integration tile in your sandbox account. This allows you to validate and preview additional changes in the integration tile on the Datadog Marketplace before your pull request is merged. 

### Coordinate GTM opportunities

Once a Marketplace tile is live, Technology Partners can meet with Datadog's Partner Marketing team to coordinate a joint go-to-market (GTM) strategy, which includes the following:

- A Datadog quote for partner press releases
- A blog post on the [Datadog Monitor][20]
- Amplification of social media posts

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/marketplace/
[3]: /developers/integrations/
[4]: /api/latest/
[5]: /developers/integrations/oauth_for_data_integrations/
[6]: /developers/datadog_apps/
[7]: https://app.datadoghq.com/apps/
[8]: /api/latest/metrics/
[9]: /api/latest/logs/
[10]: /api/latest/events/
[11]: /api/latest/service-checks/
[12]: /tracing/guide/send_traces_to_agent_by_api/
[13]: /api/latest/incidents/
[14]: /api/latest/security-monitoring/
[15]: /developers/marketplace/#request-access-to-marketplace
[16]: https://github.com/Datadog/marketplace
[17]: https://www.python.org/downloads/
[18]: https://pypi.org/project/datadog-checks-dev/
[19]: /developers/integrations/check_references/#manifest-file
[20]: https://datadoghq.com/blog/
