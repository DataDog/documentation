---
title: Create an API Integration
type: documentation
further_reading:
- link: "https://partners.datadoghq.com/"
  tag: "Partner Network"
  text: "Datadog Partner Network"
- link: "/developers/integrations/marketplace"
  tag: "Documentation"
  text: "Learn about the Datadog Marketplace"
- link: "/developers/integrations/oauth_for_integrations"
  tag: "Documentation"
  text: "Learn about using OAuth for integrations"
---

## Overview

You can use [Datadog API endpoints][1] to programmatically send data to Datadog, manage your account, and visualize data collected from an API integration. 

API integrations send the following types of data to Datadog:

- [Metrics][2]
- [Logs & Log Pipelines][3]
- [Events][4]
- [Service Checks][5]
- [Traces][6]
- [Incidents][7]
- [Security Events][8]

This page provides instructions for creating an API integration in the `marketplace` repository. For more information about why you would want to create an API-based integration, see [Creating your own solution][9].

## Setup


## Create an OAuth client

Datadog recommends setting up an [OAuth client][13] to securely authorize third-party application access for your integrations. For more information, see [OAuth for Integrations][14] and [Authorization Endpoints][15].

## Set up a directory and clone the Marketplace repository

1. Create a `dd` directory:

   {{< code-block lang="shell" >}}mkdir $HOME/dd{{< /code-block >}}
   
   The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

2. Clone the `marketplace` repository:

   {{< code-block lang="shell" >}}git clone git@github.com:DataDog/marketplace.git{{< /code-block >}}

## Install and configure the Datadog development toolkit

The Datadog Development Toolkit command (`ddev`) allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata.

Before you begin, make sure you meet the following prerequisites:

- [Python v3.8 or later][16]
- A Python virtual environment is recommended to avoid potential environment conflicts. The instructions below use `venv`, which comes packaged with Python v3.3 and later on most operating systems.

Install and configure the development toolkit:

1. Make sure you're inside the `marketplace` directory:
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}

2. Set up a Python virtual environment:
   {{< code-block lang="shell" >}}
   python3 -m venv venv
   . venv/bin/activate{{< /code-block >}}

   You can exit the virtual environment at any time by running `deactivate`.

3. Install the [Developer Toolkit][17]:
   {{< code-block lang="shell" >}}pip3 install "datadog-checks-dev[cli]"{{< /code-block >}}

   If you are using the Z Shell, you may need to use escaped characters by running `pip3 install datadog-checks-dev\[cli\]`.

4. Set `marketplace` as the default working repository:
   {{< code-block lang="shell" >}}
   ddev config set marketplace $HOME/dd/marketplace
   ddev config set repo marketplace{{< /code-block >}}

   If you used a directory other than `$HOME/dd` to clone the `marketplace` directory, use the following command to set your working repository:

   {{< code-block lang="shell" >}}
   ddev config set marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace{{< /code-block >}}

## Populate the integration tile scaffolding

Run the `ddev` command to generate a skeleton of the folders and files needed for your integration. The options you use with the command are different depending on what type of integration you are developing. For a full list of the files created by the `ddev` command, see [Integrations assets][18]. Since all the code is hosted on the partner's end, only a tile-only listing is required.

### Create an informational tile only listing

To create the informational tile-only listing's scaffolding:

1. Make sure you're inside the `marketplace` directory:
   {{< code-block lang="shell" >}}cd $HOME/dd/marketplace{{< /code-block >}}
2. Run the `ddev` command with the `-t tile` option
   {{< code-block lang="shell" >}}ddev create -t tile "<Offering Name>"{{< /code-block >}}

## Complete the necessary integration asset files

Make sure that the following required assets for your integration are complete:

### README

Once you have created a `README.md` file, add the following sections as H2s (`##`) and fill out the content that is displayed in the Marketplace tile:

| Header Name | Header |
|-------------|--------|
| Overview | Write a description under an `## Overview` header that describes the value your offering provides to users and benefits to purchasing and installing the API integration in the Datadog Marketplace (for example, out-of-the-box dashboards, logs, alerts, and more). <br><br>This information is displayed in the **Overview** tab on the integration tile. |
| Setup | Include all the steps to setting up your Marketplace integration that includes information divided into H3 headings (`###`). Standard topics include:<br><br>- Installing the integration using the in-app integration tile. <br>- Configuring the integration with the appropriate roles and permissions in your Datadog organization.<br>- Accessing out-of-the-box Datadog features that users who purchased and installed the integration can access (such as metrics, events, monitors, logs, dashboards, and more).|
| Uninstallation | Include all the steps to uninstalling your Marketplace integration. This information is displayed in the **Configure** tab on the integration tile.|
| Data Collected  | Specify the types of data collected by your Marketplace integration that includes information about out-of-the-box metrics, events, or service checks. <br><br>You can include additional types of data collected such as logs, monitors, dashboards, and more. If your Marketplace integration does not provide any of these, you do not need to add a Data Collected section. |
| Support | Provide contact information that includes an email to your Support team, a phone number to your company, a link to your company's documentation or blog post, and more help information in a bulleted list format. |

### Media Carousel

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

Technology Partners can add up to eight images (seven if you are including a video) in an integration tile's media carousel.

The images must meet the following requirements:

| Image Requirements | Description                                                                                                                                       |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Type               | `.jpg` or `.png`.                                                                                                                                 |
| Size               | The average is around 500KB. The maximum image size is 1MB.                                                                                       |
| Dimensions         | The aspect ratio must be 16:9 exactly and fit these specifications:<br><br>- Width: 1440px<br>- Minimum height: 810px<br>- Maximum height: 2560px |
| Name               | Use letters, numbers, underscores, and hyphens. Do not use spaces.                                                                           |
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

For more information, see [Integrations Assets Reference][18].

## Open a pull request

Once you have access to the [`marketplace` repository][19], open a pull request that adds images (such as logos and images) and asset files (such as `Changelog.md`, `README.md`, and `manifest.json`) to your API integration's tile-only listing in the [Marketplace page][20]. Automatic tests run checks to verify that your pull request is in good shape and contains all the required content to be updated.

## Review process

Once your pull request passes all the checks, reviewers from the `Datadog/marketplace-product-management`, `Datadog/marketplace-review`, and `Datadog/documentation` teams provide suggestions and feedback on best practices.

Once you have addressed the feedback and re-requested reviews, these reviewers approve your pull request.

## Coordinate GTM opportunities

Once a Marketplace tile is live, Technology Partners can meet with Datadog's Partner Marketing team to coordinate a joint go-to-market (GTM) strategy, which includes the following:

- A Datadog quote for partner press releases
- A blog post on the [Datadog Monitor][21]
- Amplification of social media posts

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/using-the-api/
[2]: /api/latest/metrics/
[3]: /logs/faq/partner_log_integration/
[4]: /api/latest/events/
[5]: /api/latest/service-checks/
[6]: /tracing/guide/send_traces_to_agent_by_api/
[7]: /api/latest/incidents/
[8]: /api/latest/security-monitoring/
[9]: /developers/#creating-your-own-solution
[13]: /developers/authorization/
[14]: /developers/integrations/oauth_for_integrations/
[15]: /developers/authorization/oauth2_endpoints/
[16]: https://www.python.org/downloads/
[17]: https://pypi.org/project/datadog-checks-dev/
[18]: /developers/integrations/check_references/#manifest-file
[19]: https://github.com/DataDog/marketplace/
[20]: https://app.datadoghq.com/integrations
[21]: https://datadoghq.com/blog/
