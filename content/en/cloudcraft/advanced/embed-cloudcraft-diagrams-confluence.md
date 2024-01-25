---
title: Embed Cloudcraft diagrams into Confluence
kind: guide
---

By embedding an existing Cloudcraft diagram in Confluence, you can provide direct access for authorized users without a Cloudcraft subscription, while also keeping a master copy of documentation for your infrastructure.

This article will guide you through the process of embedding your up-to-date Cloudcraft diagram into Confluence.

## Embed your diagram

With your diagram open in Cloudcraft, click the blue **Export button** and then selection the **Get shareable link** option.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/export-diagram.png" alt="Screenshot of a portion of Cloudcraft's UI with an export button highlighted by an arrow." responsive="true" style="width:100%;">}}

Toggle the **Disabled, the blueprint is private** option to make your diagram public, and then select the **Embed into Confluence, dashboard or wiki** option. In this window you can also select to allow interactions and to include blueprint documentation, if you added any—those are optional.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/shareable-link.png" alt="Screenshot of a Cloudcraft interface for sharing a cloud infrastructure blueprint with options for embedding into Confluence and enabling diagram interactions." responsive="true" style="width:100%;">}}

Copy the generated link to your clipboard and head to your [Confluence dashboard][1].

<section class="alert alert-danger">
  <p>Anyone with this link can access the content of your blueprint, so make sure to keep it safe; treat it like a password. If you think someone unauthorized had access to the link, click the <strong>Invalidate existing links</strong> button in the <strong>Share blueprint via link</strong> window.</p>
</section>

Once in the dashboard, you can create a new Confluence page or add the diagram to an existing page. While this document focus on a new page, the steps should be similar for an existing one.

On the menu at the top of the page, click on the blue **Create** button.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/new-confluence-page.png" alt="Screenshot highlighting the Create button on Confluence collaborative software interface." responsive="true" style="width:100%;">}}

The default view for a new page is **Edit mode**, which is the mode you need to switch to if you are using an existing page. Click the **Insert** icon, followed by the **View more** option.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/more-options.png" alt="Screenshot of Confluence's interface with a highlighted 'plus' icon indicating the option to insert elements such as code snippets, tables, and other elements." responsive="true" style="width:100%;">}}

In the **Select macro** window, search for "iframe" and then select the option that appears.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/iframe-macro.png" alt="Confluence interface showing the 'Select macro' dialog with iframe option highlighted for embedding content on a webpage." responsive="true" style="width:100%;">}}

On the next prompt you will need to configure iFrame macro. The blueprint link you copied earlier is the only required information, but you can customize the macro further if you prefer.

Insert the link you copied earlier in the **URL** field. While not required, some other options, like height, width, and frameborder are highly recommended. [Read the iFrame macro documentation to learn more][2].

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/configure-iframe.png" alt="Screenshot of an 'Insert Iframe Macro' interface with a preview of iframe content on Confluence." responsive="true" style="width:100%;">}}

When you are satisfied with the results, click the **Insert** button at the bottom of the window.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/insert-iframe.png" alt="Screenshot of the Insert macro window in Confluence with a highlighted button arrow indicating the 'Insert' option." responsive="true" style="width:100%;">}}

And that is it! When publishing or previewing the Confluence page, your Cloudcraft blueprint should be fully integrated with it.

{{< img src="cloudcraft/advanced/embed-cloudcraft-diagrams-confluence/confluence-blueprint.png" alt="Interactive Cloudcraft diagram embedded into a Confluence page via iframe illustrating a network architecture blueprint." responsive="true" style="width:100%;">}}

If you have any questions or trouble with the process, [get in touch with our support team][3], and we will be happy to help.

## Common questions

**Is the shareable link feature safe to use?**

The shared link is considered a shared secret and anyone who has it can access your diagram until you revoke it.

The shared link feature is disabled by default and is not guessable or subject to dictionary or brute force attacks. The link is made up of the random 128-bit identifier for the diagram, to which is added another 128-bit shared secret key that can be rotated and revoked from the same dialog where you enable the link.

Together, these security layers make the discovery of links through brute force or any kind of dictionary attacks infeasible, but if the link is inadvertently shared in a public space, like a wiki that is made public, we also instruct web crawlers not to index the shared diagrams to prevent them from, for example, showing up in Google search results.

In summary, treat the link like a strong password: it is not possible for third parties to force or crawl it, but you want to be careful not to give it out accidentally.

[1]: https://www.atlassian.com/software/confluence
[2]: https://support.atlassian.com/confluence-cloud/docs/insert-the-iframe-macro/
[3]: https://app.cloudcraft.co/app/support
