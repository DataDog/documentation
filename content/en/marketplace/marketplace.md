# Marketplace

## Introduction to the Datadog Marketplace

The Datadog Marketplace is a digital marketplace where Datadog Technology Partners can list their integrations, software, and services to Datadog users. 

Before joining the Datadog Marketplace, you first need to join the [Datadog Partner Network](https://www.datadoghq.com/partner/) Technology Track. As a Datadog Technology Partner, you can develop an integration and create a tile listing that includes your offering. 

Datadog customers can then access your tile through the Datadog app either through our [Integrations](https://app.datadoghq.com/account/settings) page or through the [Datadog Marketplace](https://app.datadoghq.com/marketplace). While the Integrations page includes integrations built by Datadog and Technology Partners at no cost, the Marketplace is a commercial platform for Datadog customers and Technology Partners to buy and sell a variety of offerings, including integrations, software, and services. 

Follow these steps to develop and publish your Marketplace offering: 


## Apply for Sandbox Account
All Technology Partners can request a dedicated sandbox Datadog account to aid in their development. To request a sandbox:

1. Create a free Datadog [trial account](https://www.datadoghq.com/free-datadog-trial/) using the same email address as your Technology Partner application
2. Log into the [Datadog Partner Portal](https://partners.datadoghq.com/English/)
3. On your personal homepage, click on the “Learn More” button under “Sandbox Access”
4. Select “Request Sandbox Upgrade”

Converting an account to a developer sandbox may take up to one or two business days. Please contact [Datadog Support](https://docs.datadoghq.com/help/) with any questions.


## Develop your Integration

### Resources

In addition to this documentation, you can learn more about developing Datadog integrations by taking the following steps:

* Attend our on-demand [“Introduction to Datadog Integrations”](https://learn.datadoghq.com/course/view.php?id=38) course on the [Datadog Learning Center](https://learn.datadoghq.com/).
* Review our example pull-request in the [Marketplace repository](https://github.com/DataDog/marketplace) with annotations and best practices (this link is only available to Technology Partners that have have completed the Marketplace Listing Agreement in the Datadog Partner Portal)
* Explore existing integrations built by other Technology Partners in our [Integrations Extras repository](https://github.com/DataDog/integrations-extras)
* Join our Marketplace Engineering Office Hours through the [Datadog public Slack](https://chat.datadoghq.com/)

### The Development Process

1. [Choose the type of Marketplace offering you would like to list](#1-choose-an-integration-type)
2. [Build a bi-directional integration](#2-build-a-bi-directional-integration)
3. [Clone either the Marketplace or the Integrations Extras repository](#3-clone-either-the-marketplace-or-the-integrations-extras-repository)
4. [Install the Datadog Development Toolkit](#4-install-and-run-the-datadog-development-toolkit)
5. [Populate the tile scaffolding with metadata and out-of-the-box assets (like  dashboards and monitors)](#5-populate-the-tile-scaffolding)
6. [Submit a pull-request](#6-submit-a-pull-request)
7. [Approve tile for release](#7-approve-tile-for-release)

### 1. Choose an integration type

There are a few different ways to integrate with Datadog. Depending on the use case and type of integration, choose the approach that makes the most sense for your offering. 

#### [**1. Datadog Agent-based Integration**](https://docs.datadoghq.com/developers/integrations/)

##### [OpenMetrics check](https://docs.datadoghq.com/developers/prometheus/)
* A OpenMetrics check is suitable for gathering telemetry data from existing applications that expose metrics using the Open Metrics standard.

##### [Python Check](https://docs.datadoghq.com/developers/integrations/new_check_howto/?tab=configurationtemplate#write-the-check)
* A Python check is suitable for monitoring services or products that do not expose metrics in a standard format. The Python check is used to collect telemetry data from various APIs or command line tools.

##### [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent)
* DogStatsD is suitable for applications that already emit telemetry using the StatsD protocol. Datadog adds additional Datadog-specific extensions to the StatsD protocol including:
    * Histogram Metric Type
    * Service Checks
    * Events
    * Tagging

#### [**2. Datadog REST API Integration**](https://docs.datadoghq.com/api/)
An API integration fits well for enriching and submitting data from your backend, or pulling data directly out of Datadog. API integrations also work well for building a connector between Datadog and another SaaS platform. 

**Note:** that a Datadog API Key is required to submit data to a Datadog API endpoint, while an App Key is required for querying data from Datadog, or for creating resources within the Datadog App.

#### **3. Tile Only Listing**
For Marketplace offerings that include a standalone SaaS or services offering, with no exchange of data, only a tile is needed. The Development Toolkit offers a command option to create tile-only scaffolding: ddev create -t tile "<Offering Name>" 

### 2. Build a bi-directional integration

While pulling information from Datadog may also be useful, to be listed on the Datadog Integrations page or the Marketplace, the integration must be bi-directional. That is, it must also push data into Datadog. 

Integrations can send the following data to Datadog:

1. [Metrics](https://docs.datadoghq.com/api/latest/metrics/)
2. [Logs](https://docs.datadoghq.com/api/)
3. [Events](https://docs.datadoghq.com/api/latest/events/)
4. [Service Checks](https://docs.datadoghq.com/api/latest/service-checks/)
5. [Traces](https://docs.datadoghq.com/api/latest/tracing/)
6. [Incidents](https://docs.datadoghq.com/api/latest/incidents/)
7. [Security Events](https://docs.datadoghq.com/api/latest/security-monitoring/)

### 3. Clone either the Marketplace or the Integrations Extras repository

Datadog integrations can be developed for either our private [Marketplace repository](https://github.com/DataDog/marketplace) or our open source [Integrations Extras repository](https://github.com/DataDog/integrations-extras). 

The process for building an integration is the same for each repository, with Marketplace offerings requiring a few more files and fields (like pricing). Remember to point to the intended repository when you clone and submit your pull-request.

Technology Partners can request access to the private Marketplace repository by emailing marketplace@datadog.com.


### 4. Install and Run the Datadog Development Toolkit

The Datadog Development Toolkit command (“ddev”) allows you to create scaffolding when you are first developing your integration, by spinning up a skeleton of all the assets and metadata for your tile.

Ensure that Python 3.8 or higher is installed.	

The latest released version may be installed from [PyPI](https://pypi.org/project/datadog-checks-dev/):

`python -m pip install --upgrade "datadog-checks-dev[cli]`

You will need to set the location of to the cloned repository:

#### Marketplace:
`ddev config set marketplace /path/to/marketplace`

`ddev config set repo marketplace`

#### Integrations-Extras:
`ddev config set extras /path/to/integrations-extras`

`ddev config set repo extras`

#### Tile Only Listing
For standalone software and services--or if your integration is using the Datadog API and does not contain any Python code--the Development Toolkit supports a tile-only command. 
`ddev create -t` 

#### Full Integration
For the complete integration scaffolding run: 

`ddev create <Offering Name>`

### 5. Populate the Tile Scaffolding

The ddev commands in the previous section generate a skeleton of folders and files that make up your tile assets:

#### README.md

* Include “Overview,” “Setup,” and “Support” sections with H2 headings (## in Markdown).
* The “Overview" heading should clearly describe the value your offering provides users, as well as how it can be used together with Datadog for more comprehensive observability. We recommend adding images of your software or dashboards in action. This section will be displayed in the “Overview” tab of your tile.
* The “Setup” heading should provide straightforward configuration steps for users to install or use your offering. This section will be displayed in the “Configuration” tab of your tile.
* The “Support” heading should identify a contact for support, and possibly an option to submit product feedback. This section will be displayed in the “Support” tab of your tile. 

#### images/
* Store all images used in your README.md file in this folder. 

#### Manifest.json
* JSON object including elements for `display_name`, `public_title`, `author`, and more.
* More information about manifest.json fields can be found in our [Integrations Assets Reference](https://docs.datadoghq.com/developers/integrations/check_references/#manifest-file)
* Details on the pricing object are described in the private [Marketplace README](https://github.com/DataDog/marketplace/blob/master/README.md#faq).

#### Metadata.csv
* Contains a list of the out-of-the-box metrics included in an integration, including the metric name, type, interval, and unit. 
* More information about metadata.csv fields can be found in our [Integrations Assets Reference](https://docs.datadoghq.com/developers/integrations/check_references/#manifest-file). 
* **Note:** All Marketplace metrics count as custom metrics. 

#### Dashboards and Monitors
* Contain the out-of-the-box dashboards and monitors (alerts) for your integration. 
* You can create dashboards and monitors directly in your sandbox account and export them as JSON files. 
* See our [Dashboarding Best Practices](https://datadoghq.dev/integrations-core/guidelines/dashboards/) document for details.

#### Logo
* Consists of an SVG, which our DesignOps team implements throughout the Datadog app for both light and dark modes. 
* **Note:** Technology Partners are responsible for the licensing of the logos they submit.  

#### Changelog.md
* Captures release notes and version information, and displays this in the “Release Notes” tab of your tile. Add release notes in descending order (latest version at the top).

#### Additional Marketplace files 
* The Technology Partner’s own End User License Agreement (EULA) is required for all Marketplace offerings.


### 6. Submit a Pull-Request

Submit a pull request containing your integration assets either to the [Marketplace repository](https://github.com/DataDog/marketplace), or to [Integrations Extras repository](https://github.com/DataDog/integrations-extras). 

Each repository runs automatic tests to verify that your pull request is in good shape. You can run these same tests locally with the command `ddev validate all`. Once the PR is passing all checks, our Engineering team will begin their review, where they will identify blockers to release, as well as make suggestions around best practices. 

If you need access to Azure DevOps for the Marketplace repository, please leave a comment in the PR and our engineering team will provide access. 


### 7. Approve Tile for Release

When the pull-request tile has been approved by our Engineering and Product teams, your tile will be enabled for your sandbox account. This will allow you to validate and view the integration tile in the Datadog Marketplace and make changes before it goes live.


## Coordinate Go-to-Market Opportunities
Once an official bi-directional integration is live, Technology Partners have the option of meeting with Datadog’s Partner Marketing Team to coordinate a joint go-to-market strategy, including:


* A Datadog quote for partner press releases
* A Blog Post in the [Datadog Monitor](https://www.datadoghq.com/blog/)
* A Datadog speaker for a partner webinar
* Amplification of social media posts


## Contact
Please reach out to us at techpartners@datadoghq.com if you have any questions.
