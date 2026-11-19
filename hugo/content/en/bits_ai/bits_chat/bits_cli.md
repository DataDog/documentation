---
title: Bits CLI
description: "Use Bits CLI to chat with Bits in your terminal, with access to your Datadog data and your local project files."
further_reading:
- link: "/bits_ai/bits_chat/"
  tag: "Documentation"
  text: "Bits Chat"
- link: "https://github.com/datadog-labs/bits-cli"
  tag: "GitHub"
  text: "Bits CLI repository"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Bits CLI is in Preview.
{{< /callout >}}

## Overview

Bits CLI brings Bits to your terminal. Ask Bits a question in natural language, and Bits answers using your Datadog data and the files in your current project. Bits can also edit files and run commands on your machine.

{{< img src="bits_ai/bits_chat/bits_cli.png" alt="The Bits CLI start screen in a terminal, showing the version, site, and authentication method, a list of recent conversations to resume, and the Ask Bits prompt." style="width:80%;" >}}

The source code, releases, and issue tracker for Bits CLI are in the [bits-cli GitHub repository][1].

Use Bits CLI to:

- Investigate an alert or incident while you look at the code that produced it.
- Query logs, metrics, and traces without leaving the terminal.
- Ask Bits to propose and apply a fix, approving each change before Bits makes it.
- Continue a Bits Chat conversation from Datadog in your terminal, or open a terminal conversation in Datadog.

### When to use Bits CLI

Bits CLI is Datadog's own agent. The Datadog tools are built in, and Bits CLI works with your local files and commands. Other Datadog command-line options work differently:

- **[Datadog MCP Server][3]**: Gives another vendor's agent, such as Claude Code or Codex, access to Datadog tools. Use the MCP Server when you want to keep working in an agent that you already use.
- **[Pup][4]**: A command-line client for Datadog APIs. Pup doesn't include Bits.

Use Bits CLI when you want capabilities that are specific to Bits, such as:

- Adding Datadog-specific context to your prompts, such as mentioning a service, monitor, incident, or dashboard with `@` to add it to your question
- Interacting with Bits Chat from both your terminal and Datadog, with the option to alternate between the two in the same conversation
- Signing in with your Datadog account, without needing to create API keys or configure a connection for another agent

## Requirements

- macOS (Intel or Apple silicon), Linux (x86_64 or arm64), or Windows (x86_64).
- A Datadog user whose role has the **Bits Chat Access** permission. See [Bits Chat permissions][5].

Bits CLI uses your Datadog role to fetch data, the same way Bits Chat does. It can only read or change the Datadog resources that your role allows.

Bits CLI usage consumes [AI Credits][6].

## Install

On macOS or Linux, install Bits CLI with Homebrew:

```shell
brew tap datadog-labs/pack
brew install datadog-labs/pack/bits
```

For Windows, standalone binaries, and update instructions, see [Installation][7] in the bits-cli repository.

## Sign in

The first time you run `bits`, choose your [Datadog site][8] and sign in through your browser. Bits CLI uses OAuth, so you don't need to create or manage API keys. Bits CLI stores your sign-in in your operating system's credential store.

After you sign in, Bits CLI has the same Datadog tools as Bits Chat.

## Use Bits CLI

Start Bits CLI from the project you want to work on:

```shell
cd <PROJECT_DIRECTORY>
bits
```

Type a prompt and press <kbd>Enter</kbd>. To add Datadog context, type `@` and search for a service, monitor, incident, or dashboard. To attach an image, drop it onto the prompt.

## Bits CLI commands

Use the following commands in a Bits CLI session:

| Command | Description |
| --- | --- |
| `/new` | Start a new conversation. |
| `/resume` | Pick a recent conversation to continue. |
| `/fork` or `/branch` | Copy the current conversation and continue in the copy. The original conversation doesn't change. |
| `/rename` | Rename the current conversation. |
| `/web` | Open the current conversation in Datadog. |
| `exit`, `quit`, or <kbd>Ctrl</kbd>+<kbd>D</kbd> | Quit Bits CLI. |

For all commands and flags, run `bits --help`.

## Continue a conversation between Datadog and your terminal

Bits CLI conversations are Bits Chat conversations, so you can move a conversation between Bits Chat in Datadog and your terminal at any point. For example, start investigating an alert in Bits Chat. Then, open the same conversation from the service's repository and ask Bits to find and fix the code that caused the alert.

- **From Datadog to your terminal**: Run `/resume` and pick the conversation, or start Bits CLI with the conversation's ID. Bits keeps the full conversation history.

  ```shell
  bits --conversation <CONVERSATION_ID>
  ```

- **From your terminal to Datadog**: Run `/web` to open the current conversation in Datadog.

To try a different approach without changing the original conversation, run `/fork` to continue in a copy.

Conversations stay in your [Bits Chat history][9], are private by default, and follow the same sharing rules as other Bits Chat conversations.

## Approve actions

Bits asks for your approval before it reads a file in your project, edits a file, or runs a command. Each request shows the file or the full command, and where it runs.

| Action | When Bits asks | Notes |
| --- | --- | --- |
| Read a file | Before reading any file in your project | Bits receives the contents of approved files as part of the conversation. |
| Edit a file | Before creating or changing a file in your project | Bits shows a diff of the change. |
| Run a command | Before running a shell command | The command runs on your machine with your user's permissions. |

When Bits asks for approval, you can approve the single action, or approve that type of action for the rest of the session. To approve all actions for the rest of the session without prompts, select {{< ui >}}Switch to full access{{< /ui >}}.

<div class="alert alert-warning">File tools are limited to your project directory, but shell commands are not. A shell command can read or change anything that your user account can access. Read each command before you approve it.</div>

## Project instructions and skills

To give Bits instructions for a project, such as how to build and test it, add an `AGENTS.md` or `CLAUDE.md` file to the project root. Bits CLI loads the file automatically at the start of each session, without an approval prompt.

Skills that you add appear as slash commands. To see the skills available in the current session, type `/`.

## Feedback

Report bugs and request features in [GitHub Issues][10]. For release notes for each version, see [GitHub Releases][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/datadog-labs/bits-cli
[2]: /integrations/guide/source-code-integration/
[3]: /mcp_server/
[4]: /cli/
[5]: /bits_ai/bits_chat/#permissions
[6]: /account_management/billing/ai_credits/
[7]: https://github.com/datadog-labs/bits-cli#installation
[8]: /getting_started/site/
[9]: /bits_ai/bits_chat/#chat-history
[10]: https://github.com/datadog-labs/bits-cli/issues
[11]: https://github.com/datadog-labs/bits-cli/releases
