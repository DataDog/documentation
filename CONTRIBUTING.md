# Style Guide for Documentation Site

This document is a guide to writing and editing documentation for the [Datadog Documentation site][7] (Docs site). Treat this as a guide rather than a rulebook. You should strive to follow what's prescribed, but there are exceptions to most rules.

Some of these guidelines are enforced by [the Datadog docs implementation of the Vale linter][4]. After you make a PR, check its **Files changed** tab to see and fix warnings and errors flagged by the linter.

## Language

- Use the American English **en_US** dialect when writing documentation, code comments, [wiki entries][1], and more in the English language. This is the default language for all `*.md` files.  
- Don't contribute updates to the translated content (fr, ja, ko), as the content in github is not the managed source. If there is a mistake in the English, fix the English. If the mistake is only in the translated version, let us know and we will get it addressed in the source.

## General principles

### Style and tone

The purpose of the Docs site is to clearly inform readers about how to use Datadog. The Docs site is NOT intended to:

- Sell or market Datadog
- Make the reader feel nice. When you must choose between politeness and clarity, choose clarity.
- Impress the reader with fancy words and drawn out sentences.

### Content

**Be plain and direct**: Say exactly what you mean using plain speech. Don't leave the reader guessing.
- **Recommended**: This integration does NOT help you forward application metrics from StatsD servers to Datadog; to do that, configure your StatsD server to forward metrics to DogStatsD.
- **Not recommended**: Please note the Datadog Agent includes DogStatsD, which serves as a StatsD forwarder. This integration is intended for monitoring external StatsD servers, and is not needed to send metrics to Datadog using the StatsD protocol.

**Be concise**: Omit needless words. Less is more:
- **Recommended**: This integration monitors the health and availability of a StatsD server.
- **Not recommended**: This integration offers you the ability to monitor the health and availability of a StatsD server.
- **Recommended**: The `ddtrace` library supports several web frameworks.
- **Not recommended**: The `ddtrace` library includes support for a number of web frameworks.

**Treat the reader as an equal**: Assume the reader is knowledgeable. Datadog has a technical audience, so don't spend too many words on something that's fairly common knowledge, for example, the meaning of `p95`. Likewise, don't assume the reader is clairvoyant—that's why they're reading docs. Avoid hedging statements and disclaimers, such as "As you probably know..."

**Provide examples**: Don't make an abstract statement and then leave the reader guessing.
- **Recommended**: "Often, two monitors grouped by different tags have reporting sources whose tag values never overlap, for example, `web04` and `web05` for a monitor grouped by host, or `dev` and `prod` for a monitor grouped by environment."
- **Not recommended**: "Often, two monitors grouped by different tags have reporting sources whose tag values never overlap."

**Be imperative, not beckoning**: When leading into a discussion of a feature, phrases like "you can" are ok, but when you finally get to the step-by-step instructions, command the reader:
- **Recommended**: Configure this thing. Optionally, configure that thing.
- **Not recommended**: You must configure this thing, and you may want to configure that thing.

**Don't wax philosophical**: Think pieces and pontification don't belong on the Docs site.

**Don't constantly explain basic Datadog features**: Outside of introductory material, don't tell readers again and again that metrics submitted to Datadog may be graphed alongside other metrics, have events overlaid onto them, etc. It's okay to point out cases that are compelling and specific, such as "Overlay Jenkins deploys onto a graph of your application response times", but don't re-explain Datadog; instead, provide a useful description that enhances understanding of the feature.

**Don't refer to multi-part integrations as a singular thing**: For multi-component integrations-especially those whose components are not interdependent-do not refer vaguely to "the integration".
- **Recommended**: [describe which component]: Installing the Datadog Agent BOSH release could increase the number of VMs...
- **OK**: Integrating with Cloud Foundry could increase the number of VMs...
- **Not recommended**: Installing the Cloud Foundry Integration could increase the number of VMs...

## Wording and grammar

### Abbreviations

Avoid using Latin abbreviations "i.e." or "e.g.". Use "that is" or "for example" instead.

### Active voice

Avoid using passive voice in favor of active voice. If you think your sentence is in the passive voice, add the phrase "by zombies". If it still makes grammatical sense, it's in the passive voice. For example, "metrics are sent to the Datadog Agent `by zombies`"
- **Recommended**: "With infrastructure monitoring, the Datadog Agent receives metrics and forwards them to Datadog. Similarly, the Datadog Agent can also receive tracing metrics."
- **Not recommended**: "With Datadog infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog Agent."

### Inclusive language

Use inclusive language unless you are referencing third-party technologies such as Redis' master/slave nodes. The Datadog docs follow the inclusive language best practices described in the [Terminology, Power and Inclusive Language](https://datatracker.ietf.org/doc/draft-knodel-terminology) document from the Center for Democracy & Technology.
- **Recommended**: "Primary/secondary, disallowlist/allowlist"
- **Not recommended**: "Master/slave, blacklist/whitelist"

### Pronouns

#### Gender

Use gender-neutral pronouns as appropriate. Avoid using "he", "him", "his", "she", and "her". Also avoid using combination pronouns such as "he/she" or "(s)he" or similar. Use "they" or "them" instead.

#### First and second person pronouns

Avoid first-person pronouns such as "I", "me", "mine", "we", "us", and "our". Use second-person pronouns "you" and "your" (often implied).
- **Recommended**: Datadog APM is included in Enterprise plans or as an upgrade from Pro plans. If you have a Pro plan, visit the APM page in Datadog to begin a free 14-day trial.
- **Not recommended**: Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. Pro plan members can visit the APM page in Datadog to begin a free 14-day trial.

Adding "You can" to the start of an instruction changes it to a suggestion. Be intentional about your use of each kind of sentence:
- **Instruction**: Change the environment variable value in your `datadog.yaml` file.
- **Suggestion**: You can change the environment variable value in your `datadog.yaml` file.

Don't overuse "your" when talking about the items a person interacts with when using Datadog. "Your infrastructure" is okay in moderation. Too much "your Agent" or "your application" is overly familiar. Try "the" instead and see if it works just as well.

### Tense

Avoid temporal words like "currently", "now", "will", etc. Describe the present state of the product.
- **Recommended**: "Once you enable the integration, the Agent starts sending metrics to Datadog."
- **Not recommended**: "Once you enable the integration, the Agent will start sending metrics to Datadog."
- **Recommended**: You can add up to 10 monitors in a composite monitor.
- **Not recommended**: Currently, you can add up to 10 monitors in a composite monitor (more will be supported in the future).
- **Recommended**: You can add up to 20 monitors in a composite monitor.
- **Not recommended**: You can now add up to 20 monitors in a composite monitor.

**Note**: When Datadog implements or deprecates a major feature, it's good to point it out, for example: "The `docker` check replaces the `docker_daemon` check beginning with Agent version X.Y.Z.".

### Words and phrases

The [datadog-vale][4] repo contains a set of linting rules for Vale based on the Documentation Style Guide. You can refer to the rules when writing for the Docs site.

Otherwise, here are some words and phrases to avoid or use sparingly:

| Word to avoid        | Workaround                                                                                 |
|----------------------|--------------------------------------------------------------------------------------------|
| Refer to/visit       | When preceding a link; use "See" or "Read"                                                 |
| A number of          | This is vague. Slightly less vague: "a few", "several", "many".                            |
| [in the] Datadog app | No need for the definite article; use "[in] Datadog".                                      |
| Product              | When referencing Datadog (e.g. "the Datadog product"), omit it or use "service"            |
| Please               | There's no reason to plead with the reader; maybe they'll read the docs, maybe they won't. |
| Utilize              | Don't utilize utilize when you can use use.                                                |

#### RFC 2119

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the documentation are to be interpreted as described in [RFC 2119][2]. When writing in languages other than English, a best-effort must be made to adhere to this RFC.

#### RFC 2606

A top level domain (TLD) in an example must reference a TLD permanently reserved for such purposes. As described in [RFC 2606][3] four TLD names are reserved:
- `.test`
- `.example`
- `.invalid`
- `.localhost`

Same goes for second level domain names, three are reserved: 
- `example.com`
- `example.net`
- `example.org`

## Punctuation

This section sets the record straight (for the Docs site, not for all humankind) on grammar and punctuation details that are often a matter of subjective preference.

### Commas

Use the Oxford/Harvard/serial comma:
- **Recommended**: "Metrics, events, and service checks."
- **Not recommended**: "Metrics, events and service checks".

### Dashes

Use the em dash (—) with no spaces between adjacent words
- **Recommended**: "The rest—Ok, Skipped, and No Data—are not alert-worthy."
- **Not recommended**: "The rest - Ok, Skipped, and No Data - are not alert-worthy".

### Spaces

Only one space between sentences (not two).

## Formatting

### Code substitution

When adding something to a code block that isn't meant literally, use the format `<DATADOG_API_KEY>`. _Don't_ use `$DATADOG_API_KEY`, `{DATADOG API KEY}`, or `DATADOG_API_KEY`.

### Headers

| Level                    | Case          |
|--------------------------|---------------|
| `<h1>` / `# Header`      | Title Case    |
| `<h2>` / `## Header`     | Sentence case |
| `<h3>` / `### Header`    | Sentence case |
| `<h4>` / `#### Header`   | Sentence case |
| `<h5>` / `##### Header`  | Sentence case |
| `<h6>` / `###### Header` | Sentence case |

### Images

Images are displayed on the full width of a page by default. If your image doesn't need to be that large, use the `style="width:XX%;"` parameter within the image partial to scale the image proportionally.

See the documentation wiki to learn more about [image partials][6].

### Links

Avoid vague link text, let readers know where you're sending them. Any sentence containing a link should read just as well if it didn't contain the link.
- **Recommended**: To learn more about tagging, see the `[Guide to Tagging]`.
- **Not recommended**: To learn more about tagging, see `[here]`.

### Numbers

Use words for single digit numbers (zero through nine). Use numbers for multiple digit numbers (10 and above), decimals (0.9, 1.5, 10.3, etc.), and percents (1%, 1.5%, 10%, etc.). Do not use commas in four figure numbers, for example, `5000`.

### Text

Use text formatting to clarify and enhance content.

| Formatting        | Rule                                                                                                           | Example                                               |
|-------------------|----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `` `backquote` `` | Used for code related content within a sentence.                                                               | Use the `foo` parameter                               |
| `**Bold**`        | Subjectively pointing the reader to something important.                                                       | **This is important**, not that.                      |
| `_Italic_`        | Literally translated words, default values, functions, settings, and page names.                               | Go to the *setting* page in your Datadog application |
| `[Link][3]`       | Links must be specified using the reference format (in the footnote) to aid with the [translation process][5]. | Text with `[a link][1]`                               |


[1]: https://github.com/DataDog/documentation/wiki
[2]: https://tools.ietf.org/html/rfc2119
[3]: https://tools.ietf.org/html/rfc2606
[4]: https://github.com/DataDog/datadog-vale
[5]: https://github.com/DataDog/documentation/wiki/Translations-Overview
[6]: https://github.com/DataDog/documentation/wiki/Import-an-Image-or-a-mp4-video
[7]: https://docs.datadoghq.com/
