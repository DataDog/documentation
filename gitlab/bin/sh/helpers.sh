# post URL to preview site as status to Github
github_preview_status() {
    start_step

    echo "---------"
    echo "Posting preview URL to Github status" # https://www.netlifycms.org/blog/2019/02/deploy-preview-links

    post_data='{"state": "success", "description": "Deploy Preview Ready!", "context": "guacbot/preview", "target_url": "https://docs-staging.datadoghq.com/'${CI_COMMIT_REF_NAME}'"}'

    curl --header "Authorization: token $(get_secret 'github_token')" \
        --data "${post_data}" \
        https://api.github.com/repos/DataDog/documentation/statuses/${CI_COMMIT_SHA}

    pass_step  "${FUNCNAME}"
}
