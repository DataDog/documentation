# Style Guide for Documentation Site

This document is a guide to writing and editing documentation for the Datadog Documentation site, https://docs.datadoghq.com (aka, the Docs site). Treat this as a guide, not a hard-and-fast rulebook; you should strive to follow what's prescribed here, but there are exceptions to most rules.

## Style and Tone

The purpose of the Docs site is to clearly inform readers about how to use Datadog, and how Datadog works under the hood. The Docs site is NOT intended to:

* Sell or market Datadog (i.e. why to use Datadog).
* Make the reader feel nice. When you must choose between politeness and clarity, choose clarity.
* Impress the reader with fancy words and drawn out sentences.

The [Dos](#dos) and [Donts](#donts) serve the main purpose: **to clearly inform readers.**

## Language

* Use the American English **en_US** dialect when writing documentation, code comments, [wiki entries][1], etc. in the English language. This is the default language for all `*.md` files.  
* Use the Standard French **fr_FR** dialect when writing in the French language. This is the language in all `*.fr.md` files.

### RFC 2119

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in the documentation are to be interpreted as described in [RFC 2119][2]. When writing in languages other than English, a best-effort must be made to adhere to this RFC.

## Dos

* **Be plain and direct**: Say exactly what you mean using plain speech. Don't leave the reader guessing:

    * **BAD**: Please note the Datadog Agent includes DogStatsD, which serves as a StatsD forwarder. This integration is intended for monitoring external StatsD servers, and is not needed to send metrics to Datadog using the StatsD protocol.
    * **GOOD**: This integration does NOT help you forward application metrics from StatsD servers to Datadog; to do that, configure your StatsD server to forward metrics to DogStatsD.

* **Be concise**: Omit needless words. Less is more:

    * **BAD**: This integration offers you the ability to monitor the health and availability of a StatsD server.
    * **GOOD**: This integration monitors the health and availability of a StatsD server.
    * **BAD**: The ddtrace library includes support for a number of web frameworks.
    * **GOOD**: The ddtrace library supports a number of web frameworks.

* **Treat the reader as an equal**: Don't assume the reader is stupid. We have a technical audience, so don't spend too many words on something that's fairly common knowledge (e.g. what `p95` means). Likewise, don't assume the reader is clairvoyant-that's why they're reading docs. Avoid hedging statements and disclaimers, e.g. "As you probably know..."

* **Provide examples**: Don't make an abstract statement and then leave the reader hanging, e.g. "Often, two monitors grouped by different tags tend to have reporting sources whose tag values never overlap". Append an explanation: "(e.g. web04 and web05 for a monitor grouped by host, dev and prod for a monitor grouped by environment)".

* **Be imperative, not beckoning**: When leading into a discussion of a feature, phrases like 'you can' are ok, but when you finally get to the step-by-step instructions, command the reader:
    
    * **BAD**: You must configure this thing, and you may want to configure that thing.
    * **GOOD**: Configure this thing. Optionally, configure that thing.

* **Avoid saying "please"**: No need to say "Please configure the following".

## Donts

* **Don't wax philosophical**: Think pieces and pontification belong on the corporate blog.

* **Don't sell Datadog**: Don't try to dazzle the reader with marketing speak or platitudes, e.g. "Visualize your data in real time"

* **Don't constantly explain basic Datadog features**: Outside of introductory material, don't tell readers again and again that metrics submitted to Datadog may be graphed alongside other metrics, have events overlayed onto them, etc. It's okay to point out cases that are compelling and specific, e.g. "Overlay Jenkins deploys onto a graph of your application response times", but don't re-explain Datadog; instead, provide a useful description that enhances understanding of the feature. 
    * **BAD**: "Bring Lighttpd metrics to Datadog to: 1) Visualize your web server performance. 2) Correlate the performance of Lighttpd with the rest of your applications."

* **Don't subtly hint at the past or future state of features/support**: When we implement or deprecate a major feature, it's good to point it out, e.g. "The `docker_daemon` check replaces the `docker` check beginning with Agent version X.Y.Z.". Avoid temporal words like "currently", "now", etc. Just describe how things are:
    * **BAD**: Currently, you can add up to 10 monitors in a composite monitor (more will be supported in the future).
    * **GOOD**: You can add up to 10 monitors in a composite monitor.
    * **BAD**: You can now add up to 20 monitors in a composite monitor.
    * **GOOD**: You can add up to 20 monitors in a composite monitor.

* **Avoid first-person pronouns**: Avoid "we", "us", and "our". "You" and "your" is good (even encouraged), though don't use excessively.
    * **BAD**: Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. Pro plan members can visit the APM page in Datadog to begin a free 14-day trial.
    * **GOOD**: Datadog APM is included in Enterprise plans or as an upgrade from Pro plans. If you have a Pro plan, visit the APM page in Datadog to begin a free 14-day trial.

* **Avoid the passive voice**: Prefer the active voice. If you think your sentence is in the passive voice, add the phrase "by zombies." If it still makes grammatical sense, it's in the passive voice. For example, "metrics are sent to the Datadog Agent `by zombies`"
    * **BAD**: "With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent."
    * **GOOD**: "With infrastructure monitoring, the Datadog Agent receives metrics and forwards them to Datadog. Similarly, the Datadog Agent can also receive tracing metrics."

* **Don't refer to multi-part integrations as a singular thing**: For multi-component integrations-especially those whose components are not interdependent-do not refer vaguely to "the integration".
    * **BAD**: Installing the Cloud Foundry Integration could increase the number of VMs...
    * **BETTER**: Integrating with Cloud Foundry could increase the number of VMs...
    * **GOOD** [describe which component]: Installing the Datadog Agent BOSH release could increase the number of VMs...

* **Don't write vague link text**: Let readers know where you're sending them. Any sentence containing a link should read just as well if it didn't contain the link.
    * **BAD**: To learn more about tagging, see [here].
    * **GOOD**: To learn more about tagging, see the [Guide to Tagging].

## Conventions

This section sets the record straight (for the Docs site, not for all humankind) on grammar and punctuation details that are often a matter of subjective preference.

* **Use the Oxford/Harvard/serial comma**:
    * **BAD**: "Metrics, events and service checks".
    * **GOOD**: "Metrics, events, and service checks."

* **Use the em dash (—) with no spaces between adjacent words**: 
    * **BAD**: "The rest - Ok, Skipped, and No Data - are not alert-worthy". 
    * **GOOD**: "The rest—Ok, Skipped, and No Data—are not alert-worthy."

* **Use the present tense**: Avoid future tense most of the time. 
    * **BAD**: "Once you enable the integration, the Agent will start sending metrics to Datadog." 
    * **GOOD**: "Once you enable the integration, the Agent starts sending metrics to Datadog."

* **Code substitution**: When adding something to a code block that isn't meant literally, use the format `<DATADOG_API_KEY>`. *Don't* use `$DATADOG_API_KEY`, `{DATADOG API KEY}`, and certainly not the naked `DATADOG_API_KEY`.

* **Numbers**: Use words for single digit numbers (zero through nine ). Use numbers for multiple digit numbers (10 and above), decimals (0.9, 1.5, 10.3, etc.), and percents (1%, 1.5%, 10%, etc.). Do not use commas in four figure numbers, for example, `5000`.

### RFC 2606

A top level domain (TLD) in an example must reference a TLD permanently reserved for such purposes. As described in [RFC 2606][3] four TLD names are reserved:

* `.test`
* `.example`
* `.invalid`
* `.localhost`

Same goes for second level domain names, three are reserved: 

* `example.com`
* `example.net`
* `example.org`

## Words and Phrases

The [Gobwords Style Guide][4] is an index of commonly mis-capitalized, mispunctuated, and misused words that often appear on the corporate blog. Use this word guide when writing for the Docs site, too.

Otherwise, here are some words and phrases to avoid or use sparingly:

| Word to avoid        | Workaround                                                                                 |
|----------------------|--------------------------------------------------------------------------------------------|
| Currently            | Just omit it                                                                               |
| Refer to/visit       | When preceding a link; use "See" or "Read"                                                 |
| A number of          | This is vague. Slightly less vague: "a few", "several", "many".                            |
| [in the] Datadog app | No need for the definite article; use "[in] Datadog".                                      |
| Product              | When referencing Datadog (e.g. "the Datadog product"), omit it or use "service"            |
| Please               | There's no reason to plead with the reader; maybe they'll read the docs, maybe they won't. |
| Utilize              | Don't utilize utilize when you can use use.                                                |


## Formatting

### Headers

| Level                    | Case          |
|--------------------------|---------------|
| `<h1>` / `# Header`      | Title Case    |
| `<h2>` / `## Header`     | Sentence case |
| `<h3>` / `### Header`    | Sentence case |
| `<h4>` / `#### Header`   | Sentence case |
| `<h5>` / `##### Header`  | Sentence case |
| `<h6>` / `###### Header` | Sentence case |

### Text

Use text formatting to clarify and enhance content.

| Formatting         | Rule                                                                                                                    | Example                                               |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `` `backquote` `` | Used every time there is code related content in some text                                                              | Use the `foo` parameter                               |
| `**Bold**`        | Subjectively pointing the reader to something that they shouldn't miss.                                                   | **This is important**, not that.                      |
| `*Italic*` or `_Italic_`        | Literally translated words, default values, functions, settings, and page names.                                        | Go the the *setting* page in your Datadog application |
| `[Link][3]`       | Links must be specified using the reference format (i.e. in the footnote) in order to aid [the translation process][5]. | Text with [a link][1]                                 |


### Fixed-width

Images are displayed on the full width of a page by default. If your image doesn't need to be that large, use the `style="width:XX%;"` parameter within the image partial in order to scale the image proportionally.

Learn more about [image partials][6].

[1]: https://github.com/DataDog/documentation/wiki
[2]: https://tools.ietf.org/html/rfc2119
[3]: https://tools.ietf.org/html/rfc2606
[4]: https://github.com/DataDog/gobwords/wiki/Style-guide
[5]: https://github.com/DataDog/documentation/wiki/Translations-Overview
[6]: https://github.com/DataDog/documentation/wiki/Import-an-Image
