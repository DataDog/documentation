# Style Guide for Documentation Site

This document is a guide to writing and editing documentation for the Datadog Documentation site, docs.datadoghq.com (aka, the Docs site). Treat it as a guide, not a hard-and-fast rulebook; you should strive to follow what’s prescribed here, but there are exceptions to most rules.

## Style and Tone
The Docs site’s purpose is to clearly inform readers on how to use Datadog, and how Datadog works under the hood, its purpose is NOT:

* To sell or market Datadog (i.e. why to use Datadog)
* To make the reader feel nice. When you must choose between politeness and clarity, choose clarity.
* To impress the reader with fancy words and drawn out sentences.

The following Dos and Donts, when applied, serve the main purpose: **to clearly inform readers.**

## Dos

* **Be plain and direct**: Say exactly what you mean using plain speech. Don’t leave the reader guessing:

    * **NO**: Please note the Datadog Agent includes DogStatsD, which serves as a StatsD forwarder. This integration is intended for monitoring external StatsD servers, and is not needed to send metrics to Datadog using the StatsD protocol.
    * **YES**: This integration does NOT help you forward application metrics from StatsD servers to Datadog; to do that, configure your StatsD server to forward metrics to DogStatsD.

* **Be concise**: Omit needless words. Less is more:

    * **NO**: This integration offers you the ability to monitor the health and availability of a StatsD server.
    * **YES**: This integration monitors the health and availability of a StatsD server.
    * **NO**: The ddtrace library includes support for a number of web frameworks.
    * **YES***: The ddtrace library supports a number of web frameworks.

* **Treat the reader as an equal**: Don’t assume the reader is stupid; We have a  technical audience, so don’t spend too many words on something that’s fairly common knowledge, e.g. what p95 means. Likewise, don’t assume the reader is super smart or clairvoyant; we have a technical audience, but smart people don’t know plenty of things (that’s why they’re reading docs). Avoid hedging and disclaimers, e.g. “As you probably know...”

* **Provide examples**: Don’t make an abstract statement like this and then leave the reader hanging: “Often, two monitors grouped by different tags tend to have reporting sources whose tag values never overlap”. Append: “(e.g. web04 and web05 for a monitor grouped by host, dev and prod for a monitor grouped by environment)”

* **Be imperative, not beckoning**:  When leading into a discussion of a feature, phrases like ‘you can’ are ok, but when you finally get to the step-by-step instructions, command the reader:
    
    * **NO**: You must configure the following; You may want to configure the following
    *  YES**: Configure the following; Optionally, configure the following
Avoid ‘Please’ in almost all cases; no need to say “Please configure the following”

## Donts

* **Don’t wax philosophical**: Think pieces and pontification belong on the corporate blog.

* **Don’t sell Datadog**: Don’t try to dazzle the reader with marketing speak or platitudes, e.g. “Visualize your data in real time”

* **Don’t constantly explain basic Datadog features**: Outside of “Datadog 101” style material, don’t tell readers again and again that metrics submitted to Datadog may be graphed alongside other metrics, have events overlayed onto them, etc. It’s okay to point out cases that are compelling and specific—“Overlay Jenkins deploys onto a graph of your application response times”—but don’t generically re-explain Datadog in lieu of actually taking the time to understand a feature and then providing a useful description. 
    * **NO**: “Bring Lighttpd metrics to Datadog to: 1) Visualize your web server performance. 2) Correlate the performance of Lighttpd with the rest of your applications.”

* **Don’t subtly hint at the past or future state of features/support**: When we implement or deprecate a major feature, it’s good to point it out: “The docker_daemon check replaces the docker check beginning with Agent version X.Y.Z.” Otherwise, avoid “currently”, “now”, etc. Just describe how things are today:
    * **NO**: Currently, you can add up to 10 monitors in a composite monitor (more will be supported in the future).
    * **YES**: You can add up to 10 monitors in a composite monitor.
    * **NO**: You can now add up to 20 monitors in a composite monitor.
    * **YES**: You can add up to 20 monitors in a composite monitor.

* **Rarely use ‘we’**: Same goes for ‘us’/’our’, too.‘You’/’your’ is good, even encouraged (though don’t use excessively).
    **NO**: Datadog APM is included in our Enterprise plan or as an upgrade to our Pro plan. Pro plan members can visit the APM page in Datadog to begin a free 14-day trial.
    **YES**: Datadog APM is included in Enterprise plans or as an upgrade from Pro plans. If you have a Pro plan, visit the APM page in Datadog to begin a free 14-day trial.

* **Don’t use passive voice**: No need to avoid it at all costs, but use active voice most often.
    * **NO**: “With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent.”
    * **YES**: “With infrastructure monitoring, the Datadog Agent receives metrics and forwards them to Datadog. Similarly, the Datadog Agent can also receive tracing metrics.

* **Don’t refer to multi-part integrations as a singular thing**:For multi-component integrations—especially those whose components are not interdependent—never vaguely refer to “the” integration:
    * **NO**: Installing the Cloud Foundry Integration could increase the number of VMs...
    * **BETTER**: Integrating with Cloud Foundry could increase the number of VMs...
    * **BEST** [describe which component]: Installing the Datadog Agent BOSH release could increase the number of VMs…

* **Don’t write vague link text**: Let readers know where you’re sending them. Any sentence containing a link should read just as well if it didn’t contain the link.
    * **NO**: To learn more about tagging, see [here].
    * **YES**: To learn more about tagging, see the [Guide to Tagging].

## Conventions
This section sets the record straight (for the Docs site, not for all humankind) on grammar and punctuation details that are often a matter of subjective preference from one organization—or one person—to another.

* **Use the Oxford/Harvard comma**:
    *  **NO**: “Metrics, events and service checks”. YES: “Metrics, events, and service checks.”

* **Use the em dash (—) with no spaces between adjacent words**: 
    * **NO**: “The rest - Ok, Skipped, Ignored, and No Data - are not alert-worthy”. 
    * **YES**: “The rest—Ok, Skipped, Ignored, and No Data—are not alert-worthy.”

* **Use the present tense**: Avoid future tense most of the time. 
    * **NO**: “Once you enable the integration, the Agent will start sending metrics to Datadog.” 
    * **YES**: “Once you enable the integration, the Agent starts sending metrics to Datadog.”

* **Code substitution**: When adding something to a code block that isn’t meant literally, use the format <DATADOG_API_KEY>. Don’t use $DATADOG_API_KEY, {DATADOG API KEY}, and certainly not the naked DATADOG_API_KEY.

## Words and Phrases
The [Gobwords Style Guide](https://github.com/DataDog/gobwords/tree/master/style-guide) is an index of commonly mis-capitalized, mispunctuated, and misused words that often appear on the corporate blog. Use this word guide when writing for the Docs site, too.

Otherwise, here are some words and phrases to avoid or use sparingly:

* Currently (omit)
* Refer to/visit (when preceding a link; use ‘See’ or ‘Read’)
* A number of (This is vague. Slightly less vague: ‘a few’, ‘several’, ‘many’)
Datadog app/in the Datadog app (use Datadog/in Datadog)
product (in reference to Datadog, i.e. ‘the Datadog product’; omit, or use ‘service’)
* Integration (in the context of describing/discussing Agent checks; use ‘check’)
* Please, use please sparingly: it’s a knee-jerk word we all sprinkle around: “For more information, please read the documentation.” There’s no reason to plead with users here. Maybe they’ll read the docs, maybe they won’t. 