"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const httpm = __importStar(require("@actions/http-client"));
const github_1 = require("@actions/github");
process.on('unhandledRejection', handleError);
main().catch(handleError);
async function main() {
    const http = new httpm.HttpClient('merge-readiness-notification');
    if (github_1.context.payload.pull_request == null) {
        console.log('No pull request found in the context');
        return;
    }
    const apiToken = core.getInput('api-token', { required: true });
    const slackWebhookUrl = core.getInput('slack-webhook-url', { required: true });
    const github = (0, github_1.getOctokit)(apiToken, {});
    // Get the docs team members
    const { data: members } = await github.rest.teams.listMembersInOrg({
        org: github_1.context.repo.owner,
        team_slug: 'documentation'
    });
    const teamMemberLogins = members.map((member) => member.login);
    // If the person who removed the label is a docs team member,
    // skip the Slack notification
    const actor = github_1.context.actor;
    console.log(`Actor: ${actor}`);
    // Get the list of reviewers who have approved the PR
    const { data: reviews } = await github.rest.pulls.listReviews({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        pull_number: github_1.context.payload.pull_request.number
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
                console.log(`PR was approved by a docs team member: ${approverLogin}.`);
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
        prLink: github_1.context.payload.pull_request._links.html.href
    };
    const slackResponse = await http.postJson(slackWebhookUrl, body);
    console.log('Response code from Slack:', slackResponse.statusCode);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err) {
    console.error(err);
    core.setFailed(`Unhandled error: ${err}`);
}
