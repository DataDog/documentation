<div class="alert alert-info">

**Install the dd-apm agent skill**

If you use an AI coding agent such as Claude Code or Cursor, install the `dd-apm` skill to have your agent guide you through installing the Datadog Agent, instrumenting your applications, and verifying that traces arrive in Datadog.

```shell
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
```

Installing requires [Node.js](https://nodejs.org/). Restart your coding agent afterward to load the skill. For the full list of Datadog agent skills, see the [agent-skills repository](https://github.com/datadog-labs/agent-skills).

</div>
