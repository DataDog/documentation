import * as core from '@actions/core';
import * as httpm from '@actions/http-client';
import { context, getOctokit } from '@actions/github';

process.on('unhandledRejection', handleError);
main().catch(handleError);

async function main(): Promise<any> {
    const http: httpm.HttpClient = new httpm.HttpClient('merge-readiness-notification');

    if (context.payload.pull_request == null) {
        console.log('No pull request found in the context');
        return;
    }

    const apiToken = core.getInput('api-token', { required: true });
    const slackWebhookUrl = core.getInput('slack-webhook-url', { required: true });

    const github = getOctokit(apiToken, {});

    // Get the docs team members
    const { data: members } = await github.rest.teams.listMembersInOrg({
        org: context.repo.owner,
        team_slug: 'documentation'
    });
    const teamMemberLogins = members.map((member) => member.login);
    console.log(`Docs team members retrieved: ${teamMemberLogins.join(', ')}`);

    // If the person who removed the label is a docs team member,
    // skip the Slack notification
    const actor = context.actor;
    console.log(`Label removal performed by: ${actor}`);

    // Get the list of reviewers who have approved the PR
    const { data: reviews } = await github.rest.pulls.listReviews({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number
    });

    let isApproved = false;

    // Check whether any of the docs team members
    // have approved the PR
    for (const review of reviews) {
        if (review.state === 'APPROVED') {
            if (review.user == null) {
                continue;
            }
            const approverLogin = review.user.login;
            if (teamMemberLogins.includes(approverLogin)) {
                isApproved = true;
                console.log(`The PR is approved by a docs team member: ${approverLogin}. Notifying Slack ...`);
                break;
            }
        }
    }

    // If no one on the docs team has approved it yet,
    // skip the Slack notification
    if (!isApproved) {
        console.log('No docs team members have approved the PR yet, skipping Slack notification.');
        return;
    }

    // Notify Slack that a reviewed PR is ready to merge
    const body = {
        prLink: context.payload.pull_request._links.html.href
    };
    const slackResponse = await http.postJson(slackWebhookUrl, body);
    console.log('Response code from Slack:', slackResponse.statusCode);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err: any): void {
    console.error(err);
    core.setFailed(`Unhandled error: ${err}`);
}
