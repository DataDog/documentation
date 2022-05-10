---
title: Marketplace
type: documentation
further_reading:
- link: "https://www.datadoghq.com/partner/"
  tag: "Partner page"
  text: "Datadog Partner Network"
- link: "https://www.datadoghq.com/blog/datadog-marketplace/"
  tag: "blog"
  text: "Expand your monitoring reach with the Datadog Marketplace"
---

The Datadog Marketplace is a digital marketplace where Datadog Technology Partners can list their data integrations, software, and professional services to Datadog users. 

## Join the Datadog partner network
Before joining the Datadog Marketplace, you first need to join the [Datadog Partner Network][1] Technology Track. As a Datadog Technology Partner, you can develop a data integration, a Datadog App, or list your SaaS license or professional services offering. 

Datadog customers can then access your tile through the Datadog site either through the [Integrations page][2] or through the [Datadog Marketplace][3]. While the Integrations page includes data integrations and Datadog Apps built by Datadog and Technology Partners at no cost, the Marketplace is a commercial platform for Datadog customers and Technology Partners to buy and sell a variety of offerings, including data integrations, Datadog Apps, software, and professional services. 

Follow these steps to develop and publish your offering on the Integrations page or Datadog Marketplace: 

## Apply for a sandbox account

All Technology Partners can request a dedicated sandbox Datadog account to aid in their development. To request a sandbox:

1. Log into the [Datadog Partner Portal][4].
2. On your personal homepage, click on the "Learn More" button under "Sandbox Access".
3. Select "Request Sandbox Upgrade".

Creating a developer sandbox may take up to one or two business days. Contact [Datadog Support][5] with any questions.

**Note:** If you are already a member of a Datadog organization (including a trial org), you may need to switch to your newly created sandbox, following the instructions on [switching between orgs][6].

Once your sandbox is created, you can [invite new members][7] from your organization to collaborate with.

## Develop your offering

### Resources

In addition to this documentation, you can learn more about developing Datadog integrations and other offerings by taking the following steps:

* Attend the on-demand ["Introduction to Datadog Integrations"][8] course on the [Datadog Learning Center][9].
* Review the example pull-request in the [Marketplace repository][10] with annotations and best practices (this link is only available to Technology Partners that have completed the Marketplace Listing Agreement in the Datadog Partner Portal).
* Explore existing integrations built by other Technology Partners in the [Integrations Extras repository][11].
* Review the documentation on [Datadog Apps][12] if you are interested in building a custom widget that integrates external data and actions onto Datadog dashboards. 
* Join the Marketplace Engineering Office Hours through the [Datadog public Slack][13].

### Development process

1. [Choose the type of offering you would like to list](#choose-an-offering-type)
2. [Build a bi-directional data integration](#build-a-bi-directional-data-integration)
3. [Clone the Marketplace repository or fork the Integrations Extras repository](#clone-the-marketplace-repository-or-fork-the-integrations-extras-repository)
4. [Install the Datadog Development Toolkit](#install-and-run-the-datadog-development-toolkit)
5. [Populate the tile scaffolding with metadata and out-of-the-box assets (like dashboards and monitors)](#populate-the-tile-scaffolding)
6. [Submit a pull-request](#submit-a-pull-request)
7. [Approve tile for release](#approve-tile-for-release)

### Choose an offering type 

There are a few different types of offerings that you can list on the Datadog Integrations or Marketplace pages:
1. Data integration (can be a [Datadog Agent-based integration](#datadog-agent-based-integration) or a [REST API integration](#datadog-rest-api-integration))
2. [Datadog App](#datadog-app)
3. SaaS license or subscription (Marketplace only)
4. Professional services (Marketplace only)

Regardless of the type of offering that you're developing, you'll build out a tile on the Marktplace or Integrations page that represents your listing. You can see an example of a Marketplace tile below:

{{< img src="developers/marketplace/marketplace-tile-example.png" alt="Example Marketplace tile"  >}}

Depending on the use case, choose the approach that makes the most sense for your offering. 

If you're developing an offering that does not use the Datadog Agent, such as a Datadog App, SaaS license, professional service, or an API-based integration, you will need to create a [tile-only listing](#tile-only-listing).

#### Datadog Agent-based integration

For general information, read [Introduction to Agent-based Integrations][14].

##### OpenMetrics check

* An [OpenMetrics check][15] is suitable for gathering telemetry data from existing applications that expose metrics using the Open Metrics standard.

##### Python check

* A [Python check][16] is suitable for monitoring services or products that do not expose metrics in a standard format. The Python check is used to collect telemetry data from various APIs or command line tools.

##### DogStatsD

* [DogStatsD][17] is suitable for applications that already emit telemetry using the StatsD protocol. Datadog adds additional Datadog-specific extensions to the StatsD protocol including:
    * Histogram Metric Type
    * Service Checks
    * Events
    * Tagging

#### Datadog REST API integration

An [API integration][18] fits well for enriching and submitting data from your backend, or pulling data directly out of Datadog. API integrations also work well for building a connector between Datadog and another SaaS platform. 

Since API integrations do not use the Datadog Agent to collect data, you will need to create a [tile only listing](#tile-only-listing) once your development work is complete. 

**Note**: A Datadog API key is required to submit data to a Datadog API endpoint, while an application key is required for querying data from Datadog, or for creating resources within the Datadog site.

#### Datadog App

[Datadog Apps][12] are custom dashboard widgets that are developed in the [Datadog Developer Platform][19]. Once your Datadog App is ready to publish, you will need to create a [tile only listing](#tile-only-listing) on either the Marketplace or Integrations page.

#### Tile only listing

For offerings that are not using the Datadog Agent to collect data, only a tile is needed. Tile only listings include SaaS licenses and professional services offerings, Datadog Apps, and API-based integrations that require users to do all of the integration configuration and installation outside of Datadog. 

The Datadog Development Toolkit offers a command option to create tile-only scaffolding: `ddev create -t tile -v2 "<Offering Name>"`. When this command is used, you'll only receive the files related to populating your tile, rather than the files used to build out a full Agent-based data integration.


### Build a bi-directional data integration

While pulling information from Datadog may be useful, integrations must be bi-directional. That is, it must also push data into Datadog. 

Integrations can send the following data to Datadog:

1. [Metrics][20]
2. [Logs][21]
3. [Events][22]
4. [Service Checks][23]
5. [Traces][24]
6. [Incidents][25]
7. [Security Events][26]

**Note:** A bi-directional data integration is not required for Marketplace tile-only listings, such as standalone SaaS licenses and professional services offerings. 

### Clone the Marketplace repository or fork the integrations-extras repository

Datadog integrations can be developed for either the private [Marketplace repository][10] or open-source [integrations-extras repository][11].

The process for building a data integration is the same for each repository, with Marketplace offerings requiring a few more files and fields (like pricing). Remember to point to the intended repository when you submit your pull request.

Technology Partners can request access to the private Marketplace repository by emailing marketplace@datadog.com.

### Install and run the Datadog development toolkit

The Datadog Development Toolkit command (`ddev`) allows you to create scaffolding when you are first developing your data integration, by spinning up a skeleton of all the assets and metadata for your tile.

Ensure that [Python 3.8 or higher][27] is installed.	

To avoid potential environment conflicts, in the directory where you cloned the repository, create a virtual environment by running: 

```
python3 -m pip install virtualenv --user
```

Install the latest released version of the Datadog Development Toolkit from [PyPI][28] by running:

```
python -m pip install --upgrade "datadog-checks-dev[cli]"
```

**Note:** If you are using Z shell, you may need to use escape characters: 

```
python -m pip install --upgrade datadog-checks-dev\[cli\]
``` 

Set the location of to the cloned repository:

#### Marketplace

```
ddev config set marketplace /path/to/marketplace_directory
ddev config set repo marketplace
```

#### `integrations-extras`

```
ddev config set extras /path/to/integrations-extras_directory
ddev config set repo extras
```

#### Tile only listing 

For standalone SaaS licenses, Datadog Apps, and professional services--or if your data integration is using the Datadog API and does not use the Datadog Agent--the Development Toolkit supports a tile-only command. 

In the `marketplace` or `integrations-extras` directory you specified above, run: 

```
ddev create -t tile -v2 "<Offering Name>"
```

#### Full data integration

To generate a complete data integration scaffolding, from the `marketplace` or `integrations-extras` directory specified above, run: 

```
ddev create -v2 "<Offering Name>"
```

### Populate the tile scaffolding

The ddev commands in the previous section generate a skeleton of folders and files that make up your tile assets:

#### README

* Include "Overview," "Setup," and "Support" sections with H2 headings (## in Markdown).
* The "Overview" heading should clearly describe the value your offering provides users, as well as how it can be used together with Datadog for more comprehensive observability. This section is displayed in the "Overview" tab of your tile.
* The "Setup" heading should provide straightforward configuration steps for users to install or use your offering. This section is displayed in the "Configuration" tab of your tile.
* The "Support" heading should identify a contact for support, and possibly an option to submit product feedback. This section is displayed in the "Support" tab of your tile. 

#### Media

* Store all images used in your `README.md` file in the `images` folder. 
* For Marketplace listings, and any [offering using manifest version 2][29], you may add one video to your listing. See [Media Carousel Requirements](#media-carousel-requirements) for details.  
* **Note:** Don't include spaces in the name of image files.
* **Note:** If you are listing on the Marketplace, do not place images in the "Overview" section of your `README.md` file. Instead, these images should be placed in the media carousel by adding them to the `media` object in your `manifest.json` file. 

#### Manifest

* JSON object including elements for `display_name`, `public_title`, `author`, and more.
* More information about `manifest.json` fields can be found in the [Integrations Assets Reference][30].
* Details on the pricing object are described in the private [Marketplace README][31].

#### Metadata

* Contains a list of the out-of-the-box metrics included in a data integration, such as the metric name, type, interval, and unit. 
* More information about `metadata.csv` fields can be found in the [Integrations Assets Reference][30].
* **Note:** All Marketplace metrics count as custom metrics. 

#### Dashboards and monitors

* Contains the out-of-the-box dashboards and monitors (alerts) for your data integration. 
* You can create dashboards and monitors directly in your sandbox account and export them as JSON files. 
* See [Dashboarding Best Practices][32] for details.

#### Logos

* Consists of at least one SVG, which the Datadog DesignOps team implements throughout the Datadog site for both light and dark modes. Logo SVG files can be added to the `assets` directory, or you can place them in a `logos` sub-directory under `assets`.
* **Note:** Technology Partners are responsible for the licensing of the logos they submit.  

#### Changelog

* Captures release notes and version information, and displays this in the "Release Notes" tab of your tile. Add release notes in descending order (latest version at the top).

#### Code owners

* Lives in the shared `.github` directory and defines the individuals or teams that are responsible for code in the repository. See GitHub's documentation [About code owners][33] for help with syntax.

#### Additional Marketplace files
* The Technology Partner's own End User License Agreement (EULA) is required for all Marketplace offerings.

#### Media carousel requirements
If you've followed the commands on this page to create your listing using the `-v2` flag, you will have access to a media carousel on your tile. The media carousel has specific requirements for images and videos:

* You may add one video to your tile.
  - To add a video to your listing, it must meet the following requirements:
    - File type: MP4 H.264
    - File size: Max 1 video; 1 GB maximum size
    - File dimensions: The aspect ratio must be exactly 16:9, and the resolution must be 1920x1080 or higher
    - File name: partnerName-appName.mp4
    - Run time: Recommendation of 60 seconds or less
    - Description: 300 characters maximum
  - Do not upload your video to your pull request. Instead, send a copy of your video (or a download link) to marketplace@datadog.com. Our team will respond with a `vimeo_link` that you can add to your manifest.json file to include the video in your listing. 
* You can display up to 8 images (7 if you're including a video) on your tile in the media carousel. 
  - Images must meet the following requirements to display in the media carousel: 
    - File type: .jpg or .png
    - File size: ~500 KB per image, with a max of 1 MB per image
    - File dimensions: The aspect ratio must be 16:9 minimum, with these constraints:
      - Width: 1440px
      - Min height: 810px
      - Max height: 2560px
    - File name: Use only letters, numbers, underscores, and hyphens
    - Color mode: RGB
    - Color profile: sRGB
    - Description: 300 characters maximum

### Submit a pull request

Submit a pull request containing all of your files either to the [Marketplace repository][10], or to [Integrations Extras repository][11]. 

Each repository runs automatic tests to verify that your pull request is in good shape. You can run these same tests locally with the command `ddev validate all`. Once the PR is passing all checks, the Datadog Engineering team reviews to identify blockers to release and makes suggestions around best practices.

If you need access to Azure DevOps for the Marketplace repository, leave a comment in the PR to request access. 

### Approve tile for release

When the Datadog Engineering and Product teams approve your pull-request, the tile is enabled for your sandbox account. This allows you to validate and view your tile in the Datadog Marketplace and make changes before it goes live.

## Coordinate go-to-market opportunities

Once a Marketplace tile is live, Technology Partners have the option of meeting with Datadog's Partner Marketing Team to coordinate a joint go-to-market strategy, including:

* A Datadog quote for partner press releases
* A Blog Post in the [Datadog Monitor][34]
* Amplification of social media posts

## Contact

Email marketplace@datadog.com if you have any questions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/partner/
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/marketplace
[4]: https://partners.datadoghq.com/English/
[5]: /help/
[6]: /account_management/org_switching/
[7]: /account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/course/view.php?id=38
[9]: https://learn.datadoghq.com/
[10]: https://github.com/DataDog/marketplace
[11]: https://github.com/DataDog/integrations-extras
[12]: /developers/datadog_apps
[13]: https://chat.datadoghq.com/
[14]: /developers/integrations/
[15]: /developers/custom_checks/prometheus/
[16]: /developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[17]: /developers/dogstatsd/?tab=hostagent
[18]: /api/latest/
[19]: https://app.datadoghq.com/apps
[20]: /api/latest/metrics/
[21]: /api/latest/logs/
[22]: /api/latest/events/
[23]: /api/latest/service-checks/
[24]: /api/latest/tracing/
[25]: /api/latest/incidents/
[26]: /api/latest/security-monitoring/
[27]: https://www.python.org/downloads/
[28]: https://pypi.org/project/datadog-checks-dev/
[29]: /developers/integrations/check_references/?tab=manifestversion2#manifest-file
[30]: /developers/integrations/check_references/#manifest-file
[31]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[32]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[33]: https://help.github.com/articles/about-codeowners/
[34]: https://www.datadoghq.com/blog/
