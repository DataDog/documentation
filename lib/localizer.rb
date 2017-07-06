

def get_language()
  language = "en"
  if item.identifier.match('/ja/')
    language = "ja"
  end
  return language
end

def get_local_hash(language)
  localize = {
    "menu_guides" => {
      "en" => "Guides",
      "ja" => "ガイド",
    },
    "menu_references" => {
      "en" => "References",
      "ja" => "レファレンス",
    },
    "menu_references_api" => {
      "en" => "API",
      "ja" => "APIレファレンス",
    },
    "menu_references_tracing" => {
      "en" => "Tracing (APM)",
      "ja" => "Tracing (APM)",
    },
    "menu_references_libraries" => {
      "en" => "Libraries",
      "ja" => "APIライブラリー",
    },
    "menu_references_monitoring" => {
      "en" => "Monitoring",
      "ja" => "アラート設定",
    },
    "menu_references_graphing" => {
      "en" => "Graphing",
      "ja" => "グラフ表示入門",
    },
    "menu_references_graphingjson" => {
      "en" => "Graphing using JSON",
      "ja" => "JSONを使ったグラフの設定",
    },
    "menu_references_host_names" => {
      "en" => "Host Names",
      "ja" => "ホスト名について",
    },
    "menu_references_integrations" => {
      "en" => "Integrations",
      "ja" => "インテグレーション",
    },
    "menu_references_dogstatsd" => {
      "en" => "DogStatsD",
      "ja" => "DogStatsDの解説",
    },
    "menu_references_examples" => {
      "en" => "Examples",
      "ja" => "サンプルコード",
    },
    "menu_references_videos" => {
      "en" => "Videos",
      "ja" => "ビデオ",
    },
    "menu_references_billing" => {
      "en" => "Billing",
      "ja" => "課金に関するFAQ",
    },
    "menu_references_faq" => {
      "en" => "FAQ",
      "ja" => "FAQ",
    },
    "menu_help" => {
      "en" => "Help",
      "ja" => "お問い合わせ",
    },
    "btn_signup" => {
      "en" => "Sign Up",
      "ja" => "新規登録",
    },
    "btn_signin" => {
      "en" => "Sign In",
      "ja" => "ログイン",
    },
    "btn_support_login" => {
      "en" => "Support Login",
      "ja" => "サポートログイン",
    },
    "btn_free_trial" => {
      "en" => "Free Trial",
      "ja" => "無料体験",
    },
    "footer_switch_language" => {
      "en" => "日本語ドキュメントへのリンク。",
      "ja" => "Read the docs in English",
    },
    "footer_need_some_help" => {
      "en" => "Need some help? ",
      "ja" => "お困りの場合は、",
    },
    "footer_mistake_in_the_docs" => {
      "en" => "Mistake in the docs?",
      "ja" => "ドキュメント内の不備を見つけた場合は、",
    },
    "footer_get_in_touch" => {
      "en" => "Get in touch.",
      "ja" => "お気軽にお声がけ下さい。",
    },
    "footer_let_us_know" => {
      "en" => "Let us know.",
      "ja" => "ご連絡を頂けると助かります。",
    },
    "integrations_other_integrations" => {
      "en" => "Other Integrations",
      "ja" => "インテグレーション",
    },
    "integrations_toggle_to_show_integrations" => {
      "en" => "Toggle to show integrations",
      "ja" => "Toggle to show integrations",
    },
    "integrations_back_to_overview" => {
      "en" => "Back to Overview",
      "ja" => "インテックスへ戻る",
    },
    "integrations_basic_level_integrations" => {
      "en" => "basic level integration",
      "ja" => "basic level integration",
    },
    "videos_return_to_all_video_groups" => {
      "en" => "Return to All Video Groups.",
      "ja" => "Return to All Video Groups.",
    },
    "examples_return_to_all_example_groups" => {
      "en" => "Return to All Example Groups.",
      "ja" => "Return to All Example Groups.",
    },
    "agentusage_agent_guides_by_platform" => {
      "en" => "Agent Guides by Platform",
      "ja" => "Agent インストールガイド",
    },
    "agentusage_from_source" => {
      "en" => "From Source",
      "ja" => "Agent インストールガイド",
    },

    "customnav_tracingnav_tracing" => {
      "en" => "Tracing (APM)",
      "ja" => "Tracing (APM)",
    },
    "customnav_tracingnav_install" => {
      "en" => "Installation & Configuration",
      "ja" => "Installation & Configuration",
    },
    "customnav_tracingnav_terminology" => {
      "en" => "Terminology",
      "ja" => "Terminology",
    },
    "customnav_tracingnav_faq" => {
      "en" => "Frequently Asked Questions",
      "ja" => "Frequently Asked Questions",
    },
    "customnav_tracingnav_langs" => {
      "en" => "Supported Languages",
      "ja" => "Supported Languages",
    },
    "customnav_tracingnav_go" => {
      "en" => "Go",
      "ja" => "Go",
    },
    "customnav_tracingnav_py" => {
      "en" => "Python",
      "ja" => "Python",
    },
    "customnav_tracingnav_rb" => {
      "en" => "Ruby",
      "ja" => "Ruby",
    },
    "customnav_tracingnav_api" => {
      "en" => "Tracing API",
      "ja" => "Tracing API",
    },

  }
  local_phrases = {}
  localize.each do | key, val |
    local_phrases[key] = val[language]
  end
  return local_phrases
end


