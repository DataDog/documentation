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

The Datadog Marketplace is a digital marketplace where Datadog Technology Partners can list their integrations, software, and services to Datadog users. 

Before joining the Datadog Marketplace, you first need to join the [Datadog Partner Network][1] Technology Track. As a Datadog Technology Partner, you can develop an integration and create a tile listing that includes your offering. 

Datadog customers can then access your tile through the Datadog app either through our [Integrations][2] page or through the [Datadog Marketplace][3]. While the Integrations page includes integrations built by Datadog and Technology Partners at no cost, the Marketplace is a commercial platform for Datadog customers and Technology Partners to buy and sell a variety of offerings, including integrations, software, and services. 

Follow these steps to develop and publish your Marketplace offering: 

## Apply for a sandbox account

All Technology Partners can request a dedicated sandbox Datadog account to aid in their development. To request a sandbox:

1. Create a free Datadog [trial account][4] using the same email address as your Technology Partner application
2. Log into the [Datadog Partner Portal][5]
3. On your personal homepage, click on the “Learn More” button under “Sandbox Access”
4. Select “Request Sandbox Upgrade”

Converting an account to a developer sandbox may take up to one or two business days. Please contact [Datadog Support][6] with any questions.

## Develop your integration

### Resources

In addition to this documentation, you can learn more about developing Datadog integrations by taking the following steps:

* Attend our on-demand [“Introduction to Datadog Integrations”][7] course on the [Datadog Learning Center][8].
* Review our example pull-request in the [Marketplace repository][9] with annotations and best practices (this link is only available to Technology Partners that have completed the Marketplace Listing Agreement in the Datadog Partner Portal).
* Explore existing integrations built by other Technology Partners in our [Integrations Extras repository][10].
* Join our Marketplace Engineering Office Hours through the [Datadog public Slack][11].

### Development process

1. [Choose the type of Marketplace offering you would like to list](#choose-an-integration-type)
2. [Build a bi-directional integration](#build-a-bi-directional-integration)
3. [Clone the Marketplace repository or fork the Integrations Extras repository](#clone-either-the-marketplace-or-the-integrations-extras-repository)
4. [Install the Datadog Development Toolkit](#install-and-run-the-datadog-development-toolkit)
5. [Populate the tile scaffolding with metadata and out-of-the-box assets (like  dashboards and monitors)](#populate-the-tile-scaffolding)
6. [Submit a pull-request](#submit-a-pull-request)
7. [Approve tile for release](#approve-tile-for-release)

### Choose an integration type

There are a few different ways to integrate with Datadog. Depending on the use case and type of integration, choose the approach that makes the most sense for your offering. 

#### [Datadog Agent-based integration][12]

##### [OpenMetrics check][13]

* A OpenMetrics check is suitable for gathering telemetry data from existing applications that expose metrics using the Open Metrics standard.

##### [Python check][14]

* A Python check is suitable for monitoring services or products that do not expose metrics in a standard format. The Python check is used to collect telemetry data from various APIs or command line tools.

##### [DogStatsD][15]

* DogStatsD is suitable for applications that already emit telemetry using the StatsD protocol. Datadog adds additional Datadog-specific extensions to the StatsD protocol including:
    * Histogram Metric Type
    * Service Checks
    * Events
    * Tagging

#### [Datadog REST API integration][16]

An API integration fits well for enriching and submitting data from your backend, or pulling data directly out of Datadog. API integrations also work well for building a connector between Datadog and another SaaS platform. 

**Note:** that a Datadog API Key is required to submit data to a Datadog API endpoint, while an App Key is required for querying data from Datadog, or for creating resources within the Datadog App.

#### Tile only listing

For Marketplace offerings that include a standalone SaaS or services offering, with no exchange of data, only a tile is needed. The Development Toolkit offers a command option to create tile-only scaffolding: `ddev create -t tile "<Offering Name>"`

### Build a bi-directional integration

While pulling information from Datadog may also be useful, to be listed on the Datadog Integrations page or the Marketplace, the integration must be bi-directional. That is, it must also push data into Datadog. 

Integrations can send the following data to Datadog:

1. [Metrics][17]
2. [Logs][16]
3. [Events][18]
4. [Service Checks][19]
5. [Traces][20]
6. [Incidents][21]
7. [Security Events][22]

### Clone the Marketplace repository or fork the integrations-extras repository

Datadog integrations can be developed for either our private [Marketplace repository][9] or our open source [integrations-extras repository][10].

The process for building an integration is the same for each repository, with Marketplace offerings requiring a few more files and fields (like pricing). Remember to point to the intended repository when you clone and submit your pull request.

Technology Partners can request access to the private Marketplace repository by emailing marketplace@datadog.com.

### Install and run the Datadog development toolkit

The Datadog Development Toolkit command (`ddev`) allows you to create scaffolding when you are first developing your integration, by spinning up a skeleton of all the assets and metadata for your tile.

Ensure that [Python 3.8 or higher][23] is installed.	

To avoid potential environment conflicts, in the directory where you cloned the repository, create a virtual environment by running: 

```
python3 -m pip install virtualenv --user
```

Install the latest released version of the Datadog Development Toolkit from [PyPI][24] by running:

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

For standalone software and services--or if your integration is using the Datadog API and does not contain any Python code--the Development Toolkit supports a tile-only command. 

In the `marketplace` or `integrations-extras` directory you specified above, run: 

```
ddev create -t tile "<Offering Name>"
```

#### Full integration

To generate a complete integration scaffolding, from the `marketplace` or `integrations-extras` directory specified above, run: 

```
ddev create "<Offering Name>"
```

### Populate the tile scaffolding

The ddev commands in the previous section generate a skeleton of folders and files that make up your tile assets:

#### README

* Include “Overview,” “Setup,” and “Support” sections with H2 headings (## in Markdown).
* The “Overview" heading should clearly describe the value your offering provides users, as well as how it can be used together with Datadog for more comprehensive observability. We recommend adding images of your software or dashboards in action. This section will be displayed in the “Overview” tab of your tile.
* The “Setup” heading should provide straightforward configuration steps for users to install or use your offering. This section will be displayed in the “Configuration” tab of your tile.
* The “Support” heading should identify a contact for support, and possibly an option to submit product feedback. This section will be displayed in the “Support” tab of your tile. 

#### Images

* Store all images used in your `README.md` file in the `images` folder. 
* **Note:** Don't include spaces in the name of image files.

#### Manifest

* JSON object including elements for `display_name`, `public_title`, `author`, and more.
* More information about `manifest.json` fields can be found in our [Integrations Assets Reference][25]
* Details on the pricing object are described in the private [Marketplace README][26].

#### Metadata

* Contains a list of the out-of-the-box metrics included in an integration, such as the metric name, type, interval, and unit. 
* More information about `metadata.csv` fields can be found in our [Integrations Assets Reference][25].
* **Note:** All Marketplace metrics count as custom metrics. 

#### Dashboards and monitors

* Contain the out-of-the-box dashboards and monitors (alerts) for your integration. 
* You can create dashboards and monitors directly in your sandbox account and export them as JSON files. 
* See our [Dashboarding Best Practices][27] document for details.

#### Logos

* Consists of at least one SVG, which our DesignOps team implements throughout the Datadog app for both light and dark modes. Logo SVG files can be added to the `assets` directory, or you can place them in a `logos` sub-directory under `assets`.
* **Note:** Technology Partners are responsible for the licensing of the logos they submit.  

#### Changelog

* Captures release notes and version information, and displays this in the “Release Notes” tab of your tile. Add release notes in descending order (latest version at the top).

#### Codeowners

* Lives in the shared `.github` directory and defines the individuals or teams that are responsible for code in the repository. See [Github's documentation][28] for help with syntax.

#### Additional Marketplace files

* The Technology Partner’s own End User License Agreement (EULA) is required for all Marketplace offerings.

### Submit a pull request

Submit a pull request containing your integration assets either to the [Marketplace repository][9], or to [Integrations Extras repository][10]. 

Each repository runs automatic tests to verify that your pull request is in good shape. You can run these same tests locally with the command `ddev validate all`. Once the PR is passing all checks, our Engineering team will begin their review, where they will identify blockers to release, as well as make suggestions around best practices. 

If you need access to Azure DevOps for the Marketplace repository, please leave a comment in the PR and our engineering team will provide access. 

### Approve tile for release

When the pull-request tile has been approved by our Engineering and Product teams, your tile will be enabled for your sandbox account. This will allow you to validate and view the integration tile in the Datadog Marketplace and make changes before it goes live.

## Coordinate go-to-market opportunities

Once an official bi-directional integration is live, Technology Partners have the option of meeting with Datadog’s Partner Marketing Team to coordinate a joint go-to-market strategy, including:

* A Datadog quote for partner press releases
* A Blog Post in the [Datadog Monitor][29]
* A Datadog speaker for a partner webinar
* Amplification of social media posts

## Contact

Please reach out to us at techpartners@datadoghq.com if you have any questions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/partner/
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/marketplace
[4]: https://www.datadoghq.com/free-datadog-trial/
[5]: https://partners.datadoghq.com/English/
[6]: /help/
[7]: https://learn.datadoghq.com/course/view.php?id=38
[8]: https://learn.datadoghq.com/
[9]: https://github.com/DataDog/marketplace
[10]: https://github.com/DataDog/integrations-extras
[11]: https://chat.datadoghq.com/
[12]: /developers/integrations/
[13]: /developers/custom_checks/prometheus/
[14]: /developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[15]: /developers/dogstatsd/?tab=hostagent
[16]: /api/
[17]: /api/latest/metrics/
[18]: /api/latest/events/
[19]: /api/latest/service-checks/
[20]: /api/latest/tracing/
[21]: /api/latest/incidents/
[22]: /api/latest/security-monitoring/
[23]: https://www.python.org/downloads/
[24]: https://pypi.org/project/datadog-checks-dev/
[25]: /developers/integrations/check_references/#manifest-file
[26]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[27]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[28]: https://help.github.com/articles/about-codeowners/
[29]: https://www.datadoghq.com/blog/
