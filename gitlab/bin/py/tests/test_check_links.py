# crawler = ImageCheck(
#     src_path=os.environ['CORP'] + '/public/',
#     files="/Users/michaelwhetten/Datadog/web/hugo/corp-hugo/public/about/contact/index.html",
#     processes=1,
#     domain="https://www.datadoghq.com/",
#     static_domain="https://don08600y3gfm.cloudfront.net/",
#     check_all="True",
#     verbose="True",
#     external="True"
# )
# results = crawler.crawl_site()
# errors = [l for l in results if l[1] == 'error']
# warnings = [l for l in results if l[1] == 'warn']
#
# with open('/tmp/warn_links', 'w') as error_log:
#     for link in warnings:
#         error_log.write("{0}\n".format(link[0]))
# pass
