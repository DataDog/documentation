---
title: Code Sessions
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-ai-dev-agent/"
    tag: "Blog"
    text: "Automatically identify issues and generate fixes with the Bits AI Dev Agent"
---

## Overview
A code session in Datadog captures a segment of work with the [Bits AI Dev Agent][1], including its analysis and code changes. You can start a session from the Code Sessions page or within [supported Datadog products][2], then view and manage your sessions on Code Sessions.

{{< img src="bits_ai/dev_agent/code_sessions_overview.png" alt="A tab titled 'Code Sessions' shows a text field with suggestions underneath" style="width:100%;" >}}

Access the Code Sessions page at **Bits AI** > **Dev Agent** > [**Code Sessions**][3]. Ensure you've completed the [Bits AI Dev Agent Setup][4] instructions.

## Start a code session
You can start a code session:
- With a freeform prompt, on the Code Sessions page
- That follows a pre-defined workflow, by invoking Bits AI Dev Agent in a [supported Datadog product][2]

### From the Code Sessions page
To start a code session with a freeform prompt on the Code Sessions page:
1. Click **Bits AI** > **Dev Agent** > [**Code Sessions**][3].
1. Enter a prompt in the **Code with Bits** prompt field, or generate a prompt by clicking a **Suggestions** card.
   - If you have enabled **Proactive Fixes** (in **Settings**) and a proactive fix has been generated for a repository your GitHub team is a [code owner][5] of, **Suggestions** is replaced with **Proactive Fixes**.
1. In the **Select repo (required)** field, select a code repository for Bits AI Dev Agent to work in.
1. (Optional) Set additional configurations:
   - Branch: select a branch for Bits AI Dev Agent to clone, work off of, and submit PRs against. If you don't select a branch, your repository's [default branch][6] is used.
   - Model: select an LLM model for Bits AI Dev Agent to use.
1. Click the upward arrow or press `Enter`.

## View and manage your code sessions
On the Code Sessions page, view your past sessions in the **My Sessions** panel. A session appears here when at least one of the following is true:
- You [started][7] the session
- You interacted with the session in some way, such as participating in the conversation or creating an associated PR

Click a session to view its details, including your chat history with Bits AI Dev Agent and its code changes. From here, you can continue the conversation where you left off.

To remove a code session from the **My Sessions** list:
- If you started the session, archive it by clicking {{< img src="bits_ai/dev_agent/archive_icon.png" inline="true" style="width:24px">}} (**Archive for everyone**).
  - To view archived sessions, click {{< img src="bits_ai/dev_agent/filter_icon.png" inline="true" style="width:24px">}} (**Filter sessions**), then **Archived Sessions**.
- If you didn't start the session, click {{< img src="bits_ai/dev_agent/unwatch_icon.png" inline="true" style="width:24px">}} (**Unwatch session**).

[1]: /bits_ai/bits_ai_dev_agent/
[2]: /bits_ai/bits_ai_dev_agent/#supported-datadog-products
[3]: https://app.datadoghq.com/code
[4]: /bits_ai/bits_ai_dev_agent/setup/
[5]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[6]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches#about-the-default-branch
[7]: #start-a-code-session
