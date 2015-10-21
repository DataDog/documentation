

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
    "menu_references_libraries" => {
      "en" => "Libraries", 
      "ja" => "APIライブラリー",  
    },
    "menu_references_monitoring" => {
      "en" => "Monitoring", 
      "ja" => "Monitoring",  
    },
    "menu_references_graphing" => {
      "en" => "Graphing", 
      "ja" => "グラフ表示入門",  
    },
    "menu_references_host_names" => {
      "en" => "Host Names", 
      "ja" => "グラフ表示入門",  
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
    "footer_switch_language" => {
      "en" => "日本語ドキュメントへのリンク。", 
      "ja" => "Read the docs in English",  
    }, 
    "footer_let_us_know" => {
      "en" => "Let us know.", 
      "ja" => "にてご連絡を頂けると幸いです。",  
    }, 
    "footer_need_some_help" => {
      "en" => "Need some help? ", 
      "ja" => "お問い合わせ",  
    }, 
    "footer_get_in_touch" => {
      "en" => "Get in touch.", 
      "ja" => "お困りの場合は、",  
    }, 
    "footer_mistake_in_the_docs" => {
      "en" => "Mistake in the docs?", 
      "ja" => "ページに掲載した方法にて、お気軽にお声がけ下さい。",  
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
    }

  }
  local_phrases = {}
  localize.each do | key, val |
    local_phrases[key] = val[language]
  end
  return local_phrases
end


