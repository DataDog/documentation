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

## Join the Datadog partner network
Before joining the Datadog Marketplace, you first need to join the [Datadog Partner Network][1] Technology Track. As a Datadog Technology Partner, you can develop an integration or create a tile only listing that includes your SaaS or services offering. 

Datadog customers can then access your tile through the Datadog site either through the [Integrations page][2] or through the [Datadog Marketplace][3]. While the Integrations page includes integrations built by Datadog and Technology Partners at no cost, the Marketplace is a commercial platform for Datadog customers and Technology Partners to buy and sell a variety of offerings, including integrations, software, and services. 

Follow these steps to develop and publish your Integrations page or Marketplace offering: 

## Apply for a sandbox account

All Technology Partners can request a dedicated sandbox Datadog account to aid in their development. To request a sandbox:

1. Log into the [Datadog Partner Portal][4].
2. On your personal homepage, click on the "Learn More" button under "Sandbox Access".
3. Select "Request Sandbox Upgrade".

Creating a developer sandbox may take up to one or two business days. Contact [Datadog Support][5] with any questions.

**Note:** If you are already a member of a Datadog organization (including a trial org), you may need to switch to your newly created sandbox, following the instructions on [switching between orgs][6].

Once your sandbox is created, you can [invite new members][7] from your organization to collaborate with.

## Develop your integration or create a Marketplace tile only listing

### Resources

In addition to this documentation, you can learn more about developing Datadog integrations by taking the following steps:

* Attend the on-demand ["Introduction to Datadog Integrations"][8] course on the [Datadog Learning Center][9].
* Review the example pull-request in the [Marketplace repository][10] with annotations and best practices (this link is only available to Technology Partners that have completed the Marketplace Listing Agreement in the Datadog Partner Portal).
* Explore existing integrations built by other Technology Partners in the [Integrations Extras repository][11].
* Join the Marketplace Engineering Office Hours through the [Datadog public Slack][12].

### Development process

1. [Choose the type of Marketplace offering you would like to list](#choose-an-integration-type-or-tile-only-listing)
2. [Build a bi-directional integration](#build-a-bi-directional-integration)
3. [Clone the Marketplace repository or fork the Integrations Extras repository](#clone-either-the-marketplace-or-the-integrations-extras-repository)
4. [Install the Datadog Development Toolkit](#install-and-run-the-datadog-development-toolkit)
5. [Populate the tile scaffolding with metadata and out-of-the-box assets (like dashboards and monitors)](#populate-the-tile-scaffolding)
6. [Submit a pull-request](#submit-a-pull-request)
7. [Approve tile for release](#approve-tile-for-release)

### Choose an integration type or tile only listing

There are a few different ways to list on the Datadog Integrations or Marketplace pages. Depending on the use case, choose the approach that makes the most sense for your offering. 

#### [Datadog Agent-based integration][13]

##### [OpenMetrics check][14]

* A OpenMetrics check is suitable for gathering telemetry data from existing applications that expose metrics using the Open Metrics standard.

##### [Python check][15]

* A Python check is suitable for monitoring services or products that do not expose metrics in a standard format. The Python check is used to collect telemetry data from various APIs or command line tools.

##### [DogStatsD][16]

* DogStatsD is suitable for applications that already emit telemetry using the StatsD protocol. Datadog adds additional Datadog-specific extensions to the StatsD protocol including:
    * Histogram Metric Type
    * Service Checks
    * Events
    * Tagging

#### [Datadog REST API integration][17]

An API integration fits well for enriching and submitting data from your backend, or pulling data directly out of Datadog. API integrations also work well for building a connector between Datadog and another SaaS platform. 

**Note**: A Datadog API key is required to submit data to a Datadog API endpoint, while an application key is required for querying data from Datadog, or for creating resources within the Datadog site.

#### Tile only listing

For Marketplace offerings that include a standalone SaaS or services offering, with no exchange of data, only a tile is needed. The Development Toolkit offers a command option to create tile-only scaffolding: `ddev create -t tile "<Offering Name>"`

### Build a bi-directional integration

While pulling information from Datadog may also be useful, integrations must be bi-directional. That is, it must also push data into Datadog. 

Integrations can send the following data to Datadog:

1. [Metrics][18]
2. [Logs][17]
3. [Events][19]
4. [Service Checks][20]
5. [Traces][21]
6. [Incidents][22]
7. [Security Events][23]

**Note:** A bi-directional integration is not required for Marketplace tile-only listings, such as standalone SaaS licenses and professional services offerings. 

### Clone the Marketplace repository or fork the integrations-extras repository

Datadog integrations can be developed for either the private [Marketplace repository][10] or open-source [integrations-extras repository][11].

The process for building an integration is the same for each repository, with Marketplace offerings requiring a few more files and fields (like pricing). Remember to point to the intended repository when you clone and submit your pull request.

Technology Partners can request access to the private Marketplace repository by emailing marketplace@datadog.com.

### Install and run the Datadog development toolkit

The Datadog Development Toolkit command (`ddev`) allows you to create scaffolding when you are first developing your integration, by spinning up a skeleton of all the assets and metadata for your tile.

Ensure that [Python 3.8 or higher][24] is installed.	

To avoid potential environment conflicts, in the directory where you cloned the repository, create a virtual environment by running: 

```
python3 -m pip install virtualenv --user
```

Install the latest released version of the Datadog Development Toolkit from [PyPI][25] by running:

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
ddev create -t tile -v2 "<Offering Name>"
```

#### Full integration

To generate a complete integration scaffolding, from the `marketplace` or `integrations-extras` directory specified above, run: 

```
ddev create -v2 "<Offering Name>"
```

### Populate the tile scaffolding

The ddev commands in the previous section generate a skeleton of folders and files that make up your tile assets:

#### README

* Include "Overview," "Setup," and "Support" sections with H2 headings (## in Markdown).
* The "Overview" heading should clearly describe the value your offering provides users, as well as how it can be used together with Datadog for more comprehensive observability. It is recommended to add images of your software or dashboards in action. This section is displayed in the "Overview" tab of your tile.
* The "Setup" heading should provide straightforward configuration steps for users to install or use your offering. This section is displayed in the "Configuration" tab of your tile.
* The "Support" heading should identify a contact for support, and possibly an option to submit product feedback. This section is displayed in the "Support" tab of your tile. 

#### Images

* Store all images used in your `README.md` file in the `images` folder. 
* **Note:** Don't include spaces in the name of image files.

#### Manifest

* JSON object including elements for `display_name`, `public_title`, `author`, and more.
* More information about `manifest.json` fields can be found in the [Integrations Assets Reference][26].
* Details on the pricing object are described in the private [Marketplace README][27].

#### Metadata

* Contains a list of the out-of-the-box metrics included in an integration, such as the metric name, type, interval, and unit. 
* More information about `metadata.csv` fields can be found in the [Integrations Assets Reference][26].
* **Note:** All Marketplace metrics count as custom metrics. 

#### Dashboards and monitors

* Contain the out-of-the-box dashboards and monitors (alerts) for your integration. 
* You can create dashboards and monitors directly in your sandbox account and export them as JSON files. 
* See [Dashboarding Best Practices][28] for details.

#### Logos

* Consists of at least one SVG, which the Datadog DesignOps team implements throughout the Datadog site for both light and dark modes. Logo SVG files can be added to the `assets` directory, or you can place them in a `logos` sub-directory under `assets`.
* **Note:** Technology Partners are responsible for the licensing of the logos they submit.  

#### Changelog

* Captures release notes and version information, and displays this in the "Release Notes" tab of your tile. Add release notes in descending order (latest version at the top).

#### Code owners

* Lives in the shared `.github` directory and defines the individuals or teams that are responsible for code in the repository. See GitHub's documentation [About code owners][29] for help with syntax.

#### Additional Marketplace files

* The Technology Partner's own End User License Agreement (EULA) is required for all Marketplace offerings.

### Submit a pull request

Submit a pull request containing your integration assets either to the [Marketplace repository][10], or to [Integrations Extras repository][11]. 

Each repository runs automatic tests to verify that your pull request is in good shape. You can run these same tests locally with the command `ddev validate all`. Once the PR is passing all checks, the Datadog Engineering team reviews to identify blockers to release and makes suggestions around best practices.

If you need access to Azure DevOps for the Marketplace repository, leave a comment in the PR to request access. 

### Approve tile for release

When the Datadog Engineering and Product teams approve your pull-request, the tile is enabled for your sandbox account. This allows you to validate and view the integration tile in the Datadog Marketplace and make changes before it goes live.

## Coordinate go-to-market opportunities

Once a Marketplace tile is live, Technology Partners have the option of meeting with Datadog's Partner Marketing Team to coordinate a joint go-to-market strategy, including:

* A Datadog quote for partner press releases
* A Blog Post in the [Datadog Monitor][30]
* Amplification of social media posts

## Contact

Email techpartners@datadoghq.com if you have any questions.

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
[12]: https://chat.datadoghq.com/
[13]: /developers/integrations/
[14]: /developers/custom_checks/prometheus/
[15]: /developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check
[16]: /developers/dogstatsd/?tab=hostagent
[17]: /api/latest/logs/
[18]: /api/latest/metrics/
[19]: /api/latest/events/
[20]: /api/latest/service-checks/
[21]: /api/latest/tracing/
[22]: /api/latest/incidents/
[23]: /api/latest/security-monitoring/
[24]: https://www.python.org/downloads/
[25]: https://pypi.org/project/datadog-checks-dev/
[26]: /developers/integrations/check_references/#manifest-file
[27]: https://github.com/DataDog/marketplace/blob/master/README.md#faq
[28]: https://datadoghq.dev/integrations-core/guidelines/dashboards/
[29]: https://help.github.com/articles/about-codeowners/
[30]: https://www.datadoghq.com/blog/
